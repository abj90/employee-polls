import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IQuestionCard } from "../../interfaces";
import { formatDate } from "../../util/helper";

import "./style.css";

const QuestionCard = ({ question }: IQuestionCard) => {
  const navigate = useNavigate();
  const navigateTo = (id: string) => {
    navigate(`/question/${id}`);
  };

  return (
    <div className="question-card">
      <div className="content-wraper">
        <div className="title-card">{question.author}</div>
        <div className="time">{formatDate(question.timestamp)}</div>
      </div>
      <div className="btn-wraper">
        <Button
          size="large"
          variant="outlined"
          onClick={() => navigateTo(question.id)}
        >
          Show
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
