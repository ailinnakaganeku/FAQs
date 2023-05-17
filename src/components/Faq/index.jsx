import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import classNames from "classnames";

const FAQ_QUESTIONS = [
  {
    question: "What initially sparked my interest in programming?",
    answer:
      "My interest in programming was initially sparked as a hobby while watching YouTube videos. I started with Python tutorials and gradually honed my skills. As I discussed this passion with my friends, they sought my help in creating websites for their clothing stores using a content management system (CMS). Then, one day, I stumbled upon a course called 'Introduction to HTML5' offered by the University of Michigan. It was at that precise moment when I realized my deep desire to explore this field even further. Since then, my programming journey has continued to evolve and flourish.",
    isOpen: false,
  },
  {
    question:
      "What do I enjoy most about being a developer and working in the field of programming?",
    answer:
      "What I find most enjoyable about being a developer and working in the field of programming is the perpetual opportunity for learning and personal growth. The ever-changing landscape of technology ensures that there is always something new to explore and innovative technologies to delve into. Additionally, I truly value the flexibility and remote work options that programming offers. This allows me to maintain a healthy work-life balance and the freedom to work from anywhere in the world. Moreover, the fast-paced nature of the field excites me greatly. With technology constantly evolving, as a developer, I have the privilege of staying at the forefront of these advancements and actively contributing to shaping the future.",
    isOpen: false,
  },
  {
    question: "How do I approach learning new programming languages or technologies?",
    answer: "When it comes to learning new programming languages or technologies, I take a proactive approach. I begin by researching and gathering relevant resources such as YouTube tutorials, documentation, and articles. Hands-on practice is crucial to me, so I fully immerse myself in coding exercises and personal projects to apply what I learn and gain practical experience. I actively engage with programming communities through Discord server communities. This enables me to exchange knowledge, seek advice, and stay up to date with the latest trends and best practices. Collaborating with fellow developers provides valuable insights and diverse perspectives, fostering a continuous learning environment.",
    isOpen: false,
  },
];

const FAQ = () => {
  const [questions, setQuestions] = useState(FAQ_QUESTIONS);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, isOpen: !q.isOpen } : { ...q, isOpen: false }
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
    "w-full px-6 py-3 mb-4 pl-8 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
  );
  const answerClasses = (index) =>
    classNames(
      "p-4 bg-white rounded-md shadow-md mt-2",
      questions[index].isOpen ? "block" : "hidden"
    );

  return (
    <div className={faqClasses}>
      <h2 className="text-5xl font-semibold mb-8 text-gray-800 text-center">
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
            <motion.div
              className={buttonClasses}
              onClick={() => handleToggle(index)}
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {q.question}
              </h3>
              <span className={arrowClasses(index)}>
                <FiChevronDown className="w-4 h-4 text-gray-500" />
              </span>
            </motion.div>
            {q.isOpen && (
              <div className={answerClasses(index)}>
                <p className="text-gray-700">{q.answer}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FAQ;
