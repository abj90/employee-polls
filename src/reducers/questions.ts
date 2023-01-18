import { ACTION } from "../enums";
import { QuestionActions, Questions } from "../interfaces";

export default function questions(
  state: Questions = {},
  action: QuestionActions
) {
  switch (action.type) {
    case ACTION.RECEIVE_QUESTIONS:
      return { ...state, ...action?.questions };
    case ACTION.ADD_QUESTION:
      return { ...state, [action.question.id]: action.question };
    case ACTION.SAVE_QUESTION_ANSWER:
      const selectedOption =
        action.answer === "optionOne" ? "optionOne" : "optionTwo";
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][selectedOption],
            votes: state[action.questionId][selectedOption].votes.concat(
              action.authedUser
            ),
          },
        },
      };
    default:
      return state;
  }
}
