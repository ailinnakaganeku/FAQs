import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import classNames from "classnames";

const FAQ_QUESTIONS = [
  {
    question: "Question one",
    answer: "This is the answer to my first question.",
    isOpen: false,
  },
  {
    question: "Question two",
    answer: "This is the answer to my second question.",
    isOpen: false,
  },
  {
    question: "Question three",
    answer: "This is the answer to my third question.",
    isOpen: false,
  },
];

const FAQ = () => {
  const [questions, setQuestions] = useState(FAQ_QUESTIONS);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, isOpen: !q.isOpen } : q
      )
    );
  };

  const handleToggle = (index) => {
    toggleFAQ(index);
  };

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const faqClasses = classNames("w-full md:w-2/3 mx-auto");
  const buttonClasses = classNames(
    "flex items-center justify-between w-full p-4 bg-white rounded-md shadow-md focus:outline-none cursor-pointer transition duration-200 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 select-none"
  );
  const arrowClasses = (index) =>
    classNames(
      "w-5 h-5 transition-transform duration-200 ease-in-out transform select-none ml-2",
      questions[index].isOpen ? "rotate-180" : ""
    );
  const searchInputClasses = classNames(
    "w-full px-6 py-2 mb-4 pl-8 bg-gray-100 rounded-md focus:outline-none"
  );

  return (
    <div className={faqClasses}>
      <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
        FAQs
      </h2>
      <div className="flex items-center justify-center mb-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={searchInputClasses}
          />
          <FiSearch className="text-gray-400 absolute transform -translate-y-1/2 left-2" />
        </div>
      </div>
      {filteredQuestions.length === 0 ? (
        <p className="text-center">No results found. Try again.</p>
      ) : (
        filteredQuestions.map((q, index) => (
          <div key={index} className="mb-4">
            <motion.button
              className={buttonClasses}
              onClick={() => handleToggle(index)}
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {q.question}
              </h3>
              <span className={arrowClasses(index)}>
                <FiChevronDown className="w-4 h-4 text-gray-500" />
              </span>
            </motion.button>
            <AnimatePresence>
              {q.isOpen && (
                <motion.div
                  className="p-4 mt-2 bg-white rounded-md shadow-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700">{q.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      )}
    </div>
  );
};

export default FAQ;
