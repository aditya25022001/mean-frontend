import { LoginReducer } from './redux/login';
import { AuthState, SharedState } from './interfaces';
import { SharedReducer } from './redux/shared';

export interface AppState {
  login: AuthState;
  register: AuthState;
  loading:boolean,
  
}

export const initialState = {
  user:JSON.parse(localStorage.getItem("userInfo") || '{}')
}

export const appReducer = {
  login: LoginReducer,
  shared: SharedReducer
};
