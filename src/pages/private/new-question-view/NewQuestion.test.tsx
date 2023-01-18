/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { store } from "../../..";
import NewQuestion from "./index";
import { MemoryRouter } from "react-router";

describe("NewQuestion", () => {
  it("keeps the submit button disabled when only optionOne is provided", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    );

    const opntionOneInput = screen.getByTestId("optionOne-input");
    fireEvent.change(opntionOneInput, { target: { value: "go on holidays" } });
    const submitBtn = screen.getByTestId("submit-btn");
    expect(submitBtn).toHaveClass("Mui-disabled");
  });

  it("enables the submit button when the form is filled out", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    );

    const opntionOneInput = screen.getByTestId("optionOne-input");
    fireEvent.change(opntionOneInput, { target: { value: "go on holidays" } });

    const optionTwoInput = screen.getByTestId("optionTwo-input");
    fireEvent.change(optionTwoInput, { target: { value: "stay at home" } });

    const submitBtn = screen.getByTestId("submit-btn");
    expect(submitBtn).not.toHaveClass("Mui-disabled");
  });
});

export {};
