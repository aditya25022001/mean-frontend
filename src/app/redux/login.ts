import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, createAction, createReducer, on, props, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from "rxjs/operators"
import { AuthState, User } from "../interfaces";
import { UserService } from "../services/user.service";
import { AppState, initialState } from "../app.state";
import { loading } from "./shared";
import { error } from "./shared";
import { of } from "rxjs";

enum LoginTypes{
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT"
}

export const loginRequest = createAction(LoginTypes.LOGIN_REQUEST,props<{ email:String, password:String }>())
export const loginSuccess = createAction(LoginTypes.LOGIN_SUCCESS,props<{ user:User }>())
export const logout = createAction(LoginTypes.LOGOUT)
export const loginFail = createAction(LoginTypes.LOGIN_FAIL,props<{ message:String }>())

const loginReducer = createReducer(
  initialState,
  on(loginSuccess,(state,action)=>{
    return {
      ...state,
      user:action.user
    }
  }),
  on(logout,(state) => {
    localStorage.removeItem("userInfo");
    return{
      ...state,
      user:{}
    }
  }),
  on(loginFail,(state,action) => {
    return{
      ...state,
      message:action.message
    }
  })
)

export function LoginReducer(state: AuthState | undefined,action: any){
  return loginReducer(state,action)
}

@Injectable()
export class AuthEffect{

  constructor(private actions:Actions, private userService:UserService, private store:Store<AppState>) {}

  login = createEffect(() => {
    return this.actions
    .pipe(ofType(loginRequest),
      exhaustMap((action) => {
        return this.userService.login(action.email,action.password).pipe(
          map((data) => {
            localStorage.setItem('userInfo',JSON.stringify(data.user))
            this.store.dispatch(loading({ loading:false }))
            return loginSuccess({user:data.user})
          }),
          catchError((err) => {
            this.store.dispatch(loading({ loading:false }))
            return of(error({ message:err.error.message, isError:true, color:"var(--error)" }));
          })
        )
    }))
  })

}

const getUserState = createFeatureSelector<AuthState>("login")
export const getUser = createSelector(getUserState,(state)=>{
  return state.user
})


