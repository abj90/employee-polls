import { connect } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { IRequireAuth, IState } from "../interfaces";

const RequireAuth = ({ isUserLogged }: IRequireAuth) => {
  let auth = isUserLogged;
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

const mapStateToProps = ({ authedUser }: IState) => {
  console.log("auth", authedUser);
  return {
    isUserLogged: authedUser.isAuthUser,
  };
};

export default connect(mapStateToProps)(RequireAuth);
