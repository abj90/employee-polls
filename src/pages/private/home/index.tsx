import { useEffect } from "react";
import { connect } from "react-redux";

import { handleInitialData } from "../../../actions/shared";
import QuestionCard from "../../../components/question-card";
import { IHome, IState, Question } from "../../../interfaces";
import "./style.css";

const Home = ({ dispatch, anwseredQuestion, unAnwseredQuestion }: IHome) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <div className="home-container">
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
      .sort((a, b) => b.timestamp - a.timestamp),
    unAnwseredQuestion: unAnwseredQuestionArray
      .map((questionId: string) => questions[questionId])
      .sort((a, b) => a.timestamp - b.timestamp),
  };
};

export default connect(mapStateToProps)(Home);
