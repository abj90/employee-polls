import { ACTION } from "../enums";
import { AuthedUser, LoginAction, LogOutAction } from "../interfaces";

export const logingUser = (authedUser: AuthedUser): LoginAction => ({
  type: ACTION.LOGGING_USER,
  authedUser,
});

export const logOutUser = (): LogOutAction => ({
  type: ACTION.LOGOUT_USER,
});
