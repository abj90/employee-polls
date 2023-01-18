import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("will return question correctly formatted", async () => {
    const param = {
      optionOneText: "change job",
      optionTwoText: "stay at your job",
      author: "Andrea",
    };
    var result = await _saveQuestion(param);
    expect(result.author).toBe("Andrea");
    expect(result.optionOne.text).toBe("change job");
    expect(result.optionTwo.text).toBe("stay at your job");
  });

  it("will return error if incorrect data is passed to the function", async () => {
    const param = {
      optionOneText: "change job",
      optionTwoText: "",
      author: "",
    };
    var result = _saveQuestion(param);
    await expect(result).rejects.toBe("Required data was not provided");
  });
});

describe("_saveQuestionAnswer", () => {
  it("will return true if correctly data is passed to the function", async () => {
    const param = {
      authedUser: "sarahedo",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "become a superhero",
    };
    var result = await _saveQuestionAnswer(param);
    expect(result).toBe(true);
  });

  it("will return an error if incorrect data is passed to the fucntion", async () => {
    const param = {
      authedUser: "sarahedo",
      qid: "",
      answer: "become a superhero",
    };
    var result = _saveQuestionAnswer(param);
    await expect(result).rejects.toBe(
      "An error has occurred, please provided the required data"
    );
  });
});
