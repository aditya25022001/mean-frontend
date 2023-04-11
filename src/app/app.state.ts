import { LoginReducer } from './redux/login';
import { AuthState } from './interfaces';

export interface AppState {
  auth: AuthState;
}

export const initialState = {
  user:JSON.parse(localStorage.getItem("userInfo") || '{}')
}

export const appReducer = {
  login: LoginReducer,
};
