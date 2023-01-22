import { connect } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { IRequireAuth, IState } from "../interfaces";

const RequireAuth = ({ isUserLogged }: IRequireAuth) => {
  let location = useLocation();

  return isUserLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

const mapStateToProps = ({ authedUser }: IState) => {
  return {
    isUserLogged: authedUser.isAuthUser,
  };
};

export default connect(mapStateToProps)(RequireAuth);
