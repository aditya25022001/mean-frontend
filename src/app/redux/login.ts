import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, createAction, createReducer, on, props } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from "rxjs/operators"
import { AuthState, User } from "../interfaces";
import { UserService } from "../services/user.service";
import { initialState } from "../app.state";

enum LoginTypes{
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
}

export const loginRequest = createAction(LoginTypes.LOGIN_REQUEST,props<{ email:String, password:String }>())
export const loginSuccess = createAction(LoginTypes.LOGIN_SUCCESS,props<{ user:User }>())
export const loginFail = createAction(LoginTypes.LOGIN_FAIL,props<{ message:String }>())

const loginReducer = createReducer(
  initialState,
  on(loginSuccess,(state,action)=>{
    return {
      ...state,
      user:action.user
    }
  }),
  on(loginFail,(state,action) => {
    return{
      ...state,
      message:action.message
    }
  })
)

export function LoginReducer(state: { user: User; } | undefined,action: any){
  return loginReducer(state,action)
}

@Injectable()
export class AuthEffect{

  constructor(private actions:Actions, private userService:UserService) {}

  login = createEffect(() => {
    return this.actions
    .pipe(ofType(loginRequest),
      exhaustMap((action) => {
        return this.userService.login(action.email,action.password)
        .pipe(map((data) => {
          localStorage.setItem('userInfo',JSON.stringify(data.user))
          return loginSuccess({user:data.user})
        }))
    }))
  })
}

const getUserState = createFeatureSelector<AuthState>("auth")

export const getUser = createSelector(getUserState,(state)=>{
  return state.user
})


