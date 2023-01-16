import { _saveQuestion } from "./_DATA";

describe("_saveQuestion", () => {
  it("will return question correctly formatted", async () => {
    const param = {
      optionOneText: "change job",
      optionTwoText: "stay at your job",
      author: "Andrea",
    };
    var result = await _saveQuestion(param);
    expect(result.author).toBe("Andrea");
  });
});
