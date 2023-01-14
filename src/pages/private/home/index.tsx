import { useEffect } from "react";
import { connect } from "react-redux";

import { handleInitialData } from "../../../actions/shared";
import QuestionCard from "../../../components/question-card";
import { IHome, IState } from "../../../interfaces";
import { getArraySortedBytimestamp } from "../../../util/helper";
import "./style.css";

const Home = ({
  dispatch,
  questions,
  anwseredQuestion,
  unAnwseredQuestion,
}: IHome) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <div className="home-container">
      <div className="box">
        <div className="box-title">New Questions</div>
        <div className="box-content">
          {unAnwseredQuestion.map((questionId: string) => (
            <QuestionCard key={questionId} question={questions[questionId]} />
          ))}
        </div>
      </div>
      <div className="box">
        <div className="box-title">Done</div>
        <div className="box-content">
          {anwseredQuestion?.map((questionId: string) => (
            <QuestionCard key={questionId} question={questions[questionId]} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }: IState) => {
  const questionsArray = Object.keys(questions || {});
  const anwseredQuestionArray = authedUser.user
    ? Object.keys(users[authedUser.user?.id]?.answers || {})
    : [];
  const unAnwseredQuestionArray = questionsArray.filter((question) => {
    let itemFound: boolean = true;
    for (let i = 0; i < anwseredQuestionArray.length; i++) {
      if (question === anwseredQuestionArray[i]) {
        itemFound = false;
      }
    }
    return itemFound;
  });

  return {
    anwseredQuestion: getArraySortedBytimestamp(anwseredQuestionArray),
    unAnwseredQuestion: getArraySortedBytimestamp(unAnwseredQuestionArray),
    questions,
  };
};

export default connect(mapStateToProps)(Home);
