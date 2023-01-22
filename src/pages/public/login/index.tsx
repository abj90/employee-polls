import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  PAGE_404,
  QUESTIONS,
  QUESTIONS_ID_PRESENT_IN_DB,
  USERS_FOR_LOGIN,
} from "../../../constants";
import { logingUser } from "../../../actions/authedUser";
import { AuthedUser, ILogin } from "../../../interfaces";

import "./style.css";

const Login = ({ dispatch }: ILogin) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const handleLogin = (userToBeLooged: AuthedUser) => {
    dispatch(logingUser(userToBeLooged));
    navigate(getRedirectPath(state?.path) || "/home");
  };

  const getRedirectPath = (path: string): string | null => {
    if (path?.includes(QUESTIONS)) {
      const questionIdParam = path.slice(11);
      // I have created this array of question IDs since we dont have a proper backend
      const isQuestionIdIncludedInDB =
        QUESTIONS_ID_PRESENT_IN_DB.includes(questionIdParam);
      return isQuestionIdIncludedInDB ? path : PAGE_404;
    } else {
      return path;
    }
  };

  return (
    <div className="login-container">
      <h2>Select user to login</h2>
      <div className="avatars-container">
        {USERS_FOR_LOGIN.map((user) => (
          <div
            key={user.id}
            className="our-team"
            onClick={() => handleLogin(user)}
          >
            <div className="picture">
              <img className="img-fluid" alt={user.name} src={user.avatarURL} />
            </div>
            <div className="team-content">
              <h3 className="name">{user.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect()(Login);
