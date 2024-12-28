import { useState } from "react";

export default function DirectFamily({ onNext }) {
  const questions = [
    "Are one or more of your parents living?",
    "Are you married and is your spouse living?",
    "Do you have any children?",
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [additionalInputs, setAdditionalInputs] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelection = (option) => {
    setSelectedOption(option);
    console.log(`Selected option for "${currentQuestion}": ${option}`);
    if (option === "Yes") {
      setAdditionalInputs([{ firstName: "", lastName: "", age: "", gender: "" }]);
    } else {
      setAdditionalInputs([]);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...additionalInputs];
    updatedInputs[index] = { ...updatedInputs[index], [field]: value };
    setAdditionalInputs(updatedInputs);
    console.log(`Updated ${field} for entry ${index}:`, updatedInputs[index]);
  };

  const addNewInput = () => {
    setAdditionalInputs([
      ...additionalInputs,
      { firstName: "", lastName: "", age: "", gender: "" },
    ]);
  };

  const handleNext = () => {
    setAnswers({
      ...answers,
      [currentQuestion]: selectedOption === "Yes" ? additionalInputs : selectedOption,
    });

    console.log("Answers so far:", {
      ...answers,
      [currentQuestion]: selectedOption === "Yes" ? additionalInputs : selectedOption,
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setAdditionalInputs([]);
    } else {
      console.log("Final Answers:", {
        ...answers,
        [currentQuestion]: selectedOption === "Yes" ? additionalInputs : selectedOption,
      });
      onNext({
        ...answers,
        [currentQuestion]: selectedOption === "Yes" ? additionalInputs : selectedOption,
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Direct Family</h2>
      <form>
        <h2 className="text-xl font-bold mb-4">{currentQuestion}</h2>

        {additionalInputs.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <label className="cursor-pointer h-20 relative flex items-center gap-4 rounded-md bg-neutral-50 p-2 hover:scale-105 transition-transform text-neutral-600 dark:text-neutral-300 dark:bg-blue-900 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-neutral-900 peer-checked:border peer-checked:border-blue-600 dark:peer-checked:border-white dark:peer-checked:text-white dark:peer-checked:bg-white/5 border border-neutral-300 dark:border-neutral-700">
              <input
                type="radio"
                id="yes"
                aria-describedby="windowsDescription"
                className="peer h-12 w-12 ml-4"
                name="answer"
                value="Yes"
                checked={selectedOption === "Yes"}
                onChange={() => handleSelection("Yes")}
              />
              <div className="flex flex-col">
                <h3 className="text-2xl text-black dark:text-white ml-4" aria-hidden="true">
                  Yes
                </h3>
              </div>
            </label>

            <label className="cursor-pointer h-20 relative flex items-center gap-4 rounded-md bg-neutral-50 p-2 hover:scale-105 transition-transform text-neutral-600 dark:text-neutral-300 dark:bg-blue-900 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-neutral-900 peer-checked:border peer-checked:border-blue-600 dark:peer-checked:border-white dark:peer-checked:text-white dark:peer-checked:bg-white/5 border border-neutral-300 dark:border-neutral-700">
              <input
                type="radio"
                id="no"
                aria-describedby="windowsDescription"
                className="peer h-12 w-12 ml-4"
                name="answer"
                value="No"
                checked={selectedOption === "No"}
                onChange={() => handleSelection("No")}
              />
              <div className="flex flex-col">
                <h3 className="text-2xl text-black dark:text-white ml-4" aria-hidden="true">
                  No
                </h3>
              </div>
            </label>
          </div>
        )}

        {additionalInputs.map((input, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{`Details for ${currentQuestion.toLowerCase().replace("?", "")}`}</h3>
            <input
              type="text"
              placeholder="First Name"
              value={input.firstName || ""}
              onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={input.lastName || ""}
              onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Age"
              value={input.age || ""}
              onChange={(e) => handleInputChange(index, "age", e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Gender"
              value={input.gender || ""}
              onChange={(e) => handleInputChange(index, "gender", e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
          </div>
        ))}

        {additionalInputs.length > 0 && (
          <button
            type="button"
            onClick={addNewInput}
            className="mt-4 mr-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            {currentQuestionIndex === 0 && "Add Parent"}
            {currentQuestionIndex === 1 && "Add Spouse"}
            {currentQuestionIndex === 2 && "Add Child"}
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
}
