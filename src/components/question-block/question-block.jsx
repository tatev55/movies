import { useState } from "react";

import "./question-block.css";

const QuestionBlock = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleQuestionBlock = () => {
        setIsOpen(prevState => !prevState);
    }
    return(
        <div className = {`question-block-container ${isOpen ? "open" : ""}`} onClick = {handleQuestionBlock} >
            <div className="question-block-header">
                <div className = 'question-block-children' >
                    {question}
                </div>
                <i
                    className = "fas fa-chevron-right"
                    
                    >
                </i>
            </div>
            {isOpen && (
                <div className="answer">
                    {answer}
                </div>
            )}
        </div>
    )
}
export default QuestionBlock;


