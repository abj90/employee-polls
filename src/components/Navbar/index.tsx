import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import "./style.css";
import { logOutUser } from "../../actions/authedUser";

const NavBar = ({ authedUser, isUserLogged, dispatch }: any) => {
  const navigate = useNavigate();

  const goTo = (pageToNavigate: string) => {
    navigate(`/${pageToNavigate}`);
  };

  const logOut = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        {isUserLogged ? (
          <Toolbar>
            <Button
              onClick={() => goTo("home")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={() => goTo("leaderboard")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Leaderboard
            </Button>
            <Button
              onClick={() => goTo("add")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              New
            </Button>

            <div className="avatar-container">
              <div className="avatar-menu">
                <Avatar alt={authedUser.name} src={authedUser.avatarURL} />
                <span className="avatar-name">{authedUser.name}</span>
              </div>
              <Button color="inherit" onClick={logOut}>
                LogOut
              </Button>
            </div>
          </Toolbar>
        ) : (
          <Toolbar></Toolbar>
        )}
      </AppBar>
    </Box>
  );
};

const mapStateToProps = ({ authedUser }: any) => ({
  authedUser: authedUser.user,
  isUserLogged: authedUser.isAuthUser === true,
});

export default connect(mapStateToProps)(NavBar);
