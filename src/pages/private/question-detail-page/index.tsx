import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { IQuestionDetail, IState, Users } from "../../../interfaces";
import {
  handleInitialData,
  handleSaveQuestionAnswer,
} from "../../../actions/shared";

import "./style.css";
import { isEmptyObj } from "../../../util/helper";

const withRouter = (Component: any) => {
  const ComponentWithRouterProp = (props: any) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionDetail = ({
  question,
  user,
  users,
  dispatch,
}: IQuestionDetail) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<string>("");
  const [availableUsers, seUsers] = useState<Users>(users);

  useEffect(() => {
    if (isEmptyObj(availableUsers)) {
      dispatch(handleInitialData());
    }
  }, [availableUsers]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = (event.target as HTMLInputElement).value;
    setAnswer(value);
  };

  const handleSubmmit = () => {
    dispatch(handleSaveQuestionAnswer(question.id, answer));
    navigate("/home");
  };

  return (
    <div className="question-detail-container">
      <div className="question-container">
        <div className="Name">
          <h2>Poll by {user?.id}</h2>
        </div>
        <div>
          <Avatar
            alt={user?.name}
            src={user?.avatarURL}
            sx={{ width: 170, height: 170 }}
          />
        </div>
        <h2> Would You Rather</h2>
        <div className="radio-group-container">
          <FormControl sx={{ mt: 3 }} className="form" onSubmit={handleSubmmit}>
            <RadioGroup
              row
              aria-label="gender"
              name="gender1"
              value={answer}
              onChange={handleChange}
            >
              <div className="test">
                <FormControlLabel
                  value={"optionOne"}
                  control={<Radio />}
                  label={question?.optionOne.text}
                  labelPlacement="top"
                />
                <FormControlLabel
                  value={"optionTwo"}
                  control={<Radio />}
                  label={question?.optionTwo.text}
                  labelPlacement="top"
                />
              </div>
            </RadioGroup>
            <Button
              sx={{ mt: 3, width: 200 }}
              type="submit"
              variant="outlined"
              size="large"
              onClick={handleSubmmit}
              disabled={!answer}
            >
              Submit Answer
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users }: IState, props: any) => {
  const { id } = props.router.params;
  const question = questions[id];
  const user = users[question?.author];
  return {
    question,
    user,
    users,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionDetail));
