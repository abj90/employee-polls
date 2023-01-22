import { connect } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

import "./style.css";
import {
  ILeaderBoardPage,
  IState,
  Users,
  UserTable,
} from "../../../interfaces";
import { useEffect, useState } from "react";
import { handleInitialData } from "../../../actions/shared";

const LeaderBoardPage = ({
  dispatch,
  userTableData,
  users,
}: ILeaderBoardPage) => {
  const [availableUsers, seUsers] = useState(users);

  useEffect(() => {
    if (Object.keys(availableUsers).length === 0) {
      dispatch(handleInitialData());
    }
  }, [availableUsers]);

  return (
    <div className="leaderboard-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="right">Ansewered</TableCell>
              <TableCell align="right">Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userTableData.map((data: UserTable) => (
              <TableRow
                key={data.user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className="avatar-container">
                    <Avatar alt={data.user.name} src={data.user.avatarURL} />
                    <div className="user-data">
                      <div className="user-name">{data.user.name}</div>
                      <div>{data.user.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">{data.answered}</TableCell>
                <TableCell align="right">{data.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const mapStateToProps = ({ users }: IState) => ({
  users,
  userTableData: getUserTableData(users),
});

const getUserTableData = (users: Users): UserTable[] => {
  let usersTableData: UserTable[] = [];
  for (const key in users) {
    if (Object.prototype.hasOwnProperty.call(users, key)) {
      usersTableData.push({
        user: {
          id: users[key].id!,
          avatarURL: users[key].avatarURL!,
          name: users[key].name!,
        },
        answered: Object.keys(users[key].answers).length,
        created: users[key].questions!.length,
        score:
          Object.keys(users[key].answers).length + users[key].questions!.length,
      });
    }
  }

  return usersTableData.sort(
    (a: UserTable, b: UserTable) => +b.score - +a.score
  );
};

export default connect(mapStateToProps)(LeaderBoardPage);
