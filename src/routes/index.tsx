import { connect } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { logOutUser } from "../actions/authedUser";
import { IRequireAuth, IState } from "../interfaces";

const RequireAuth = ({ isUserLogged, dispatch }: IRequireAuth) => {
  let location = useLocation();
  if (!isUserLogged) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  if (location.key === "default") {
    dispatch(logOutUser());
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return <Outlet />;
};

const mapStateToProps = ({ authedUser }: IState) => {
  return {
    isUserLogged: authedUser.isAuthUser === true,
  };
};

export default connect(mapStateToProps)(RequireAuth);
