import { Dispatch } from "redux";
import {
  AddQuestionAction,
  AddUserQuestion,
  IState,
  Question,
  ReceiveQuestionsAction,
  ReceiveUsersAction,
  SaveQuestionAction,
  SaveUserAnswerAction,
} from "../interfaces";
import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer,
} from "../server/api";

import { receiveQuestions, saveAnswer } from "./question";
import { addUserQuestion, receiverUsers, saveUserAnswer } from "./users";
import { addQuestion } from "../actions/question";

export function handleInitialData() {
  return (dispatch: Dispatch<ReceiveUsersAction | ReceiveQuestionsAction>) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiverUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export const handleSaveQuestionAnswer =
  (questionId: string, answer: string) =>
  (
    dispatch: Dispatch<SaveQuestionAction | SaveUserAnswerAction>,
    getState: () => IState
  ) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser: authedUser.user?.id,
      qid: questionId,
      answer,
    })
      .then(() => {
        dispatch(saveAnswer(authedUser.user?.id!, questionId, answer));
        dispatch(saveUserAnswer(authedUser.user?.id!, questionId, answer));
      })
      .catch(() => {
        alert("There was an error responding the question. Try again.");
      });
  };

export const handleAddQuestion =
  (optionOneText: string, optionTwoText: string) =>
  (
    dispatch: Dispatch<AddQuestionAction | AddUserQuestion>,
    getState: () => IState
  ) => {
    const { authedUser } = getState();

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser.user?.id,
    })
      .then((question: Question) => {
        dispatch(addQuestion(question));
        dispatch(addUserQuestion(question, authedUser.user?.id!));
      })
      .catch(() => {
        alert("There was an error responding the question. Try again.");
      });
  };
