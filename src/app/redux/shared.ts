import { createFeatureSelector, createSelector, createAction, createReducer, on, props } from '@ngrx/store';
import { SharedState } from "../interfaces";

const initialSharedState:SharedState = {
  loading:false,
  toast:{
    isError:false,
    message:"",
    color:"var(--error)"
  }
}

enum SharedTypes{
  LOADING = "LOADING",
  ERROR = "ERROR",
}

export const loading = createAction(SharedTypes.LOADING, props<{ loading:boolean }>())
export const error = createAction(SharedTypes.ERROR, props<{ message:string, color:string, isError:boolean }>())

const sharedReducer = createReducer(
  initialSharedState,
  on(loading,(state,action)=>{
    return {
      ...state,
      loading:action.loading
    }
  }),
  on(error,(state,action) => {
    return{
      ...state,
      toast:{
        message:action.message,
        isError:action.isError,
        color:action.color
      }
    }
  })
)

export function SharedReducer(state:SharedState | undefined,action: any){
  return sharedReducer(state,action)
}

const getState = createFeatureSelector<SharedState>("shared")

export const getLoading = createSelector(getState,(state)=>{
  return state.loading
})

export const getToast = createSelector(getState,(state)=>{
  return state.toast
})


