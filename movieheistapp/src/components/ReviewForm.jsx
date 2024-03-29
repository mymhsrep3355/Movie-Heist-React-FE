// import React, { useState } from "react";

// const ReviewForm = ({ onClose, onSubmit }) => {
//   const [answers, setAnswers] = useState({});
//   const [review, setReview] = useState("");

//   const questions = [
//     {
//       id: 1,
//       question: "How did you like the plot?",
//       options: ["Excellent", "Good", "Average", "Poor"],
//     },
//     {
//       id: 2,
//       question: "Rate the acting performance:",
//       options: ["5 (Excellent)", "4 (Good)", "3 (Average)", "2 (Below Average)", "1 (Poor)"],
//     },
//   ];

//   const handleChange = (questionId, answer) => {
//     setAnswers({ ...answers, [questionId]: answer });
//   };

//   const handleSubmit = () => {
//     onSubmit({ answers, review });
//   };

//   return (
//     <div className="modal fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="modal-content bg-white p-8 rounded-lg">
//         <span className="close absolute top-2 right-2 text-gray-600 cursor-pointer" onClick={onClose}>
//           &times;
//         </span>
//         <h2 className="text-2xl mb-4">Review Questions</h2>
//         <form>
//           {questions.map((q) => (
//             <div key={q.id} className="mb-4">
//               <label className="block mb-2">{q.question}</label>
//               <select
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 onChange={(e) => handleChange(q.id, e.target.value)}
//               >
//                 {q.options.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ))}
//           <div className="mb-4">
//             <label className="block mb-2">Your Review:</label>
//             <textarea
//               className="w-full p-2 border border-gray-300 rounded-md"
//               rows="4"
//               onChange={(e) => setReview(e.target.value)}
//             ></textarea>
//           </div>
//           <button
//             type="button"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReviewForm;

import React, { useState } from "react";

const ReviewForm = ({ onClose, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      "correct_option": "a",
      "options": [
        "A) Neo",
        "B) Morpheus",
        "C) Trinity",
        "D) Agent Smith"
      ],
      "question": "In the movie \"Matrix,\" what is the name of the protagonist played by Keanu Reeves?"
    },
    {
      "correct_option": "c",
      "options": [
        "A) Christopher Nolan",
        "B) James Cameron",
        "C) The Wachowskis",
        "D) Steven Spielberg"
      ],
      "question": "Who directed the movie \"Matrix\"?"
    },
    {
      "correct_option": "a",
      "options": [
        "A) The Matrix",
        "B) The Simulation",
        "C) The Grid",
        "D) The Illusion"
      ],
      "question": "What is the simulated reality that humans are living in called in \"Matrix\"?"
    },
    {
      "correct_option": "a",
      "options": [
        "A) Morpheus",
        "B) Trinity",
        "C) Agent Smith",
        "D) Cypher"
      ],
      "question": "Which character offers Neo the choice between a red pill and a blue pill in \"Matrix\"?"
    },
    {
      "correct_option": "d",
      "options": [
        "D) \"Red pill or blue pill?\""
      ],
      "question": "\""
    }
  ];

  const handleChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div className="modal fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="modal-content text-black bg-white p-8 rounded-lg">
        <span
          className="close absolute top-2 right-2 text-gray-600 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl mb-4">Review Questions</h2>
        <form>
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="mb-2 font-bold">{q.question}</p>
              {q.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`question-${q.id}-option-${index}`}
                    name={`question-${q.id}`}
                    value={option}
                    onChange={() => handleChange(q.id, option)}
                    className="mr-2"
                  />
                  <label htmlFor={`question-${q.id}-option-${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
