import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import './responsive.css'
const QuestionPage = ({ questions }) => {
  const [count, setCount] = useState(0);
  const [isAnswer, setIsAnswer] = useState(false);
  const [chosenAnswerIndex, setChosenAnswerIndex] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [finalShuffledOptions, setFinalShuffledOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [correctBg, setCorrectBg] = useState(false);
  const [showBgColor, setShowBgColor] = useState(false);
  const [correctBgChanger, setCorrectBgChanger] = useState(false);

  // Initialize finalShuffledOptions with an empty array
  useEffect(() => {
    setFinalShuffledOptions([]);
  }, []);

  // Shuffle options when questions change
  useEffect(() => {
    if (questions.length > 0) {
      const shuffledOptions = shuffledArray(questions[count].answers);
      setFinalShuffledOptions(shuffledOptions);
    }
  }, [questions, count]);

  // Shuffle the options array
  const shuffledArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  };

  // Handle choosing an answer
  const chooseAnswer = (index) => {
    const chosenAnswer = questions[count].answers[index];
    const isCorrect = chosenAnswer === questions[count].correct_answer;

    if (isCorrect) {
      setScore(score + 1);
      setShowBgColor(true);
      setCorrectBg(true);
    }

    setShowBgColor(true);

    // Set the chosen answer index and correctness
    setChosenAnswerIndex(index);
    setIsAnswer(isCorrect);

    // Show the correct answer only if the selected answer is incorrect
    setShowCorrectAnswer(true);
  };

  // Check if an answer is correct
  const isCorrectAnswer = (index) => {
    return (
      index ===
      questions[count].answers.findIndex(
        (answer) => answer === questions[count].correct_answer
      )
    );
  };

  // Handle clicking on the next question
  const handleCountClick = () => {
    setCount(count + 1);
    setShowCorrectAnswer(false);
    setShowBgColor(false);
    setCorrectBg(false);
  };

  // Display the score page after the quiz
  if (count === 9) {
    return (
      <div className="h-screen w-screen flex justify-center flex-col items-center">
        <h1 className="text-3xl">
          You scored {score} out of 10
          <Link to="/">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mt-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <FaArrowLeft />
            </button>
          </Link>
        </h1>
      </div>
    );
  }

  // Display the quiz questions
  return (
    <div className="flex w-screen h-full">
      <div className="bg-black flex justify-center  number-list-container">
        <ul className="text-white flex justify-center flex-col number-list">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
            <li
              key={number}
              className={`border-white border-2 ${
                count + 1 === number ? "bg-white text-black" : ""
              } rounded-full  flex justify-center m-2 items-center question-number`}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${
          correctBg && showBgColor
            ? "bg-green-200"
            : !correctBg && showBgColor
            ? "bg-red-200"
            : !showBgColor
            ? "bg-white"
            : ""
        } flex justify-center flex-col items-center main-question-page p-4 answer-options`}
      >
        <div className="flex">
          <Link to="/options">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mt-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <FaArrowLeft />
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <h1>Question {count + 1}/10</h1>
          <h1 className="lg:text-3xl main-question">{questions[count].question}</h1>
        </div>
        <div className="answers">
          {finalShuffledOptions.map((option, index) => (
            <button
              onClick={() => chooseAnswer(index)}
              key={index}
              className={`bg-gray-800 lg:w-56 md:w-40 sm:w-40  lg:h-56 md:h-40 sm:h-40 mx-14 hover:bg-gray-700 ${
                showCorrectAnswer && isCorrectAnswer(index)
                  ? "bg-green-500"
                  : ""
              } text-white font-bold py-2 px-4 rounded-md  shadow-lg hover:shadow-xl transition duration-300 ease-in-out main-answer`}
              disabled={showCorrectAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleCountClick}
          className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mt-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
