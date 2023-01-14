import { ACTION } from "../enums";
import { AunthedUserActions, AuthState } from "../interfaces";

export function authedUser(
  state: AuthState = {
    isAuthUser: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user")!) || null,
  },
  action: AunthedUserActions
): AuthState {
  switch (action.type) {
    case ACTION.LOGGING_USER:
      localStorage.setItem("user", JSON.stringify(action.authedUser));
      return { ...state, isAuthUser: true, user: action.authedUser };
    case ACTION.LOGOUT_USER:
      localStorage.removeItem("user");
      return { ...state, isAuthUser: false, user: null };
    default:
      return state;
  }
}
