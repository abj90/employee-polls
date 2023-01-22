import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/public/login";
import Home from "./pages/private/home";
import LeaderBoardPage from "./pages/private/leader-board-page";
import NewQuestion from "./pages/private/new-question-view";
import QuestionDetail from "./pages/private/question-detail-page";
import NavBar from "./components/Navbar";
import NotFound from "./components/not-found";
import "./App.css";

import RequireAuth from "./routes";

const App = () => {
  return (
    <Fragment>
      <div className="app-container">
        <div>
          <NavBar />
          <Routes>
            <Route index path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/leaderboard" element={<LeaderBoardPage />} />
              <Route path="/add" element={<NewQuestion />} />
              <Route path="questions/:id" element={<QuestionDetail />} />
            </Route>
            <Route path="" element={<Navigate to="/login" replace />} />
            {/*ask*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
