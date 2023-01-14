import { ACTION } from "../enums";
import { UserActions, Users } from "../interfaces";

export default function users(state: Users = {}, action: UserActions): Users {
  switch (action.type) {
    case ACTION.RECEIVE_USER:
      return { ...state, ...action.users };
    case ACTION.ADD_USER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions?.concat(
            action.question.id
          ),
        },
      };
    case ACTION.SAVE_USER_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.questionId]: action.answer,
          },
        },
      };
    default:
      return state;
  }
}
