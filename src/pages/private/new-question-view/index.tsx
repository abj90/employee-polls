import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { INewQuestion } from "../../../interfaces";

import "./style.css";
import { handleAddQuestion } from "../../../actions/shared";

const NewQuestion = ({ dispatch }: INewQuestion) => {
  const navigate = useNavigate();
  const [questionOptions, setQuestionOptions] = useState({
    optionOne: "",
    optionTwo: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, name } = event.target;
    setQuestionOptions({ ...questionOptions, [name]: value });
  };

  const handleSubmmit = (event: React.FormEvent): void => {
    event.preventDefault();
    dispatch(
      handleAddQuestion(questionOptions.optionOne, questionOptions.optionTwo)
    );
    navigate("/home");
  };

  const isDisabled = (): boolean => {
    const { optionOne, optionTwo } = questionOptions;

    return optionOne === "" || optionTwo === "";
  };

  return (
    <div className="new-question-container">
      <div className="question-template">
        <div>
          <h3>Would You Rather</h3>
          <h4>Create Your Own Poll</h4>
        </div>

        <form className="new-question-form" onSubmit={handleSubmmit}>
          <TextField
            sx={{ mt: 4, width: 800 }}
            fullWidth
            label="First Option"
            name="optionOne"
            value={questionOptions.optionOne}
            onChange={handleInputChange}
            inputProps={{ "data-testid": "optionOne-input" }}
          />
          <TextField
            sx={{ mt: 4, width: 800 }}
            fullWidth
            label="Second Option"
            name="optionTwo"
            value={questionOptions.optionTwo}
            onChange={handleInputChange}
            inputProps={{ "data-testid": "optionTwo-input" }}
          />
          <Button
            sx={{ mt: 4, width: 200 }}
            type="submit"
            variant="outlined"
            size="large"
            disabled={isDisabled()}
            data-testid="submit-btn"
          >
            Submit Answer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default connect()(NewQuestion);
