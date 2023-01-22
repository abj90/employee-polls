import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { handleInitialData } from "../../../actions/shared";
import QuestionCard from "../../../components/question-card";
import { IHome, IState, Question } from "../../../interfaces";
import "./style.css";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Home = ({ dispatch, anwseredQuestion, unAnwseredQuestion }: IHome) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="home-container">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Unanswered polls" value="1" />
              <Tab label="Answered polls" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="box">
              <div className="box-title">New Questions</div>
              <div className="box-content">
                {unAnwseredQuestion?.map((question: Question) => (
                  <QuestionCard
                    key={question?.id}
                    question={question}
                    isUnAnwseredQuestion={true}
                  />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="box">
              <div className="box-title">Done</div>
              <div className="box-content">
                {anwseredQuestion?.map((question: Question) => (
                  <QuestionCard
                    key={question?.id}
                    question={question}
                    isUnAnwseredQuestion={false}
                  />
                ))}
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }: IState) => {
  const questionsArray = Object.keys(questions || {});
  let anwseredQuestionArray = authedUser.user
    ? Object.keys(users[authedUser.user?.id]?.answers || {})
    : [];

  let unAnwseredQuestionArray = questionsArray.filter((question) => {
    let itemFound: boolean = true;
    for (let i = 0; i < anwseredQuestionArray.length; i++) {
      if (question === anwseredQuestionArray[i]) {
        itemFound = false;
      }
    }
    return itemFound;
  });

  return {
    anwseredQuestion: anwseredQuestionArray
      .map((questionId: string) => questions[questionId])
      .sort(
        (a: Question, b: Question) =>
          +new Date(b.timestamp).getTime() - +new Date(a.timestamp).getTime()
      ),
    unAnwseredQuestion: unAnwseredQuestionArray
      .map((questionId: string) => questions[questionId])
      .sort(
        (a: Question, b: Question) =>
          +new Date(b.timestamp).getTime() - +new Date(a.timestamp).getTime()
      ),
  };
};

export default connect(mapStateToProps)(Home);
