import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { USERS_FOR_LOGIN } from "../../../constants";
import { logingUser } from "../../../actions/authedUser";
import { AuthedUser, ILogin } from "../../../interfaces";

import "./style.css";

const Login = ({ dispatch }: ILogin) => {
  const navigate = useNavigate();
  const handleLogin = (userToBeLooged: AuthedUser) => {
    dispatch(logingUser(userToBeLooged));
    navigate("/home");
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
