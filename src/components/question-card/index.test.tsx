import { render } from "@testing-library/react";
import { newQuestion } from "../../test/mockData";
import QuestionCard from "./index";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("QuestionCard", () => {
  it("will match snapshot", () => {
    const view = render(
      <QuestionCard question={newQuestion} isUnAnwseredQuestion={true} />
    );

    expect(view).toMatchSnapshot();
  });
});

export {};
