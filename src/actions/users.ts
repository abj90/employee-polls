import { ACTION } from "../enums";
import {
  AddUserQuestion,
  Question,
  ReceiveUsersAction,
  SaveUserAnswerAction,
  Users,
} from "../interfaces";

export const receiverUsers = (users: Users): ReceiveUsersAction => ({
  type: ACTION.RECEIVE_USER,
  users,
});

export const saveUserAnswer = (
  authedUser: string,
  questionId: string,
  answer: string
): SaveUserAnswerAction => ({
  type: ACTION.SAVE_USER_ANSWER,
  questionId,
  answer,
  authedUser,
});

export const addUserQuestion = (
  question: Question,
  authedUser: string
): AddUserQuestion => ({
  type: ACTION.ADD_USER_QUESTION,
  question,
  authedUser,
});
