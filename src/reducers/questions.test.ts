import { ACTION } from "../enums";
import {
  AddQuestionAction,
  ReceiveQuestionsAction,
  SaveQuestionAction,
} from "../interfaces";
import {
  mockQuestionsState_1,
  mockQuestionsState_2,
  mockQuestionsState_3,
  newQuestion,
} from "../test/mockData";
import questions from "./questions";

describe("questions reducer", () => {
  it("should handle RECEIVE_QUESTIONS and add questions to the state slice", () => {
    const receriveQuestion: ReceiveQuestionsAction = {
      type: ACTION.RECEIVE_QUESTIONS,
      questions: mockQuestionsState_1,
    };
    expect(questions({}, receriveQuestion)).toEqual(mockQuestionsState_1);
  });

  it("should handle ADD_QUESTION and add question to the state slice", () => {
    const addQuestion: AddQuestionAction = {
      type: ACTION.ADD_QUESTION,
      question: newQuestion,
    };
    expect(questions({}, addQuestion)).toEqual(mockQuestionsState_2);
  });

  it("should handle SAVE_QUESTION_ANSWER and update question to the state slice", () => {
    const saveAnswer: SaveQuestionAction = {
      type: ACTION.SAVE_QUESTION_ANSWER,
      questionId: "z5dz1jeuz73e1d38s5oi7",
      answer: "optionOne",
      authedUser: "tylermcginnis",
    };
    expect(questions(mockQuestionsState_2, saveAnswer)).toEqual(
      mockQuestionsState_3
    );
  });
});

export {};
