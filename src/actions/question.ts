import { ACTION } from "../enums";
import {
  AddQuestionAction,
  Question,
  Questions,
  ReceiveQuestionsAction,
  SaveQuestionAction,
} from "../interfaces";

export const receiveQuestions = (
  questions: Questions
): ReceiveQuestionsAction => ({
  type: ACTION.RECEIVE_QUESTIONS,
  questions,
});

export const saveAnswer = (
  authedUser: string,
  questionId: string,
  answer: string
): SaveQuestionAction => ({
  type: ACTION.SAVE_QUESTION_ANSWER,
  questionId,
  answer,
  authedUser,
});

export const addQuestion = (question: Question): AddQuestionAction => ({
  type: ACTION.ADD_QUESTION,
  question,
});
