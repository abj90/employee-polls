import { Dispatch } from "redux";
import { ACTION } from "../enums";

export interface AuthState {
  isAuthUser: boolean;
  user: AuthedUser | null;
}

export interface AuthedUser {
  id: string;
  avatarURL: string;
  name: string;
}

export interface User {
  id?: string;
  name?: string;
  avatarURL?: string;
  answers?: any;
  questions?: string[];
}

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: QuestyionOption;
  optionTwo: QuestyionOption;
}

export interface QuestyionOption {
  votes: string[];
  text: string;
}

export type Users = {
  [key: string]: User;
};

export type Questions = {
  [key: string]: Question;
};

export interface IState {
  authedUser: AuthState;
  users: Users;
  questions: Questions;
}

//AunthedUser

export interface LoginAction {
  type: ACTION.LOGGING_USER;
  authedUser: AuthedUser;
}

export interface LogOutAction {
  type: ACTION.LOGOUT_USER;
}

export type AunthedUserActions = LoginAction | LogOutAction;

// Userss

export interface ReceiveUsersAction {
  type: ACTION.RECEIVE_USER;
  users: Users;
}

export interface SaveUserAnswerAction {
  type: ACTION.SAVE_USER_ANSWER;
  questionId: string;
  answer: string;
  authedUser: string;
}

export interface AddUserQuestion {
  type: ACTION.ADD_USER_QUESTION;
  question: Question;
  authedUser: string;
}

export type UserActions =
  | ReceiveUsersAction
  | SaveUserAnswerAction
  | AddUserQuestion;

//QUestions
export interface ReceiveQuestionsAction {
  type: ACTION.RECEIVE_QUESTIONS;
  questions: Questions;
}

export interface AddQuestionAction {
  type: ACTION.ADD_QUESTION;
  question: Question;
}

export interface SaveQuestionAction {
  type: ACTION.SAVE_QUESTION_ANSWER;
  questionId: string;
  answer: string;
  authedUser: string;
}

export interface Empty {}

export type QuestionActions =
  | ReceiveQuestionsAction
  | AddQuestionAction
  | SaveQuestionAction;

export interface IHome {
  dispatch: Dispatch<any>;
  anwseredQuestion: Question[];
  unAnwseredQuestion: Question[];
}

export interface IQuestionCard {
  question: Question;
  isUnAnwseredQuestion: boolean;
}

export interface UserTable {
  user: AuthedUser;
  answered: number;
  created: number;
  score: number;
}

export interface ILeaderBoardPage {
  dispatch: Dispatch<any>;
  userTableData: UserTable[];
  users: Users;
}

export interface IQuestionDetail {
  dispatch: Dispatch<any>;
  question: Question;
  user: User;
  users: Users;
  isUnAnwseredQuestion: boolean;
  numberOfUsers: number;
}

export interface ILogin {
  dispatch: Dispatch<LoginAction>;
}

export interface IRequireAuth {
  isUserLogged: boolean;
}

export interface INewQuestion {
  dispatch: Dispatch<any>;
}

export interface INavBar {
  authedUser: User;
  isUserLogged: boolean;
  dispatch: Dispatch<LogOutAction>;
}
