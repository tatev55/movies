import QuestionBlock from "../question-block/question-block"
import "./questions-section.css"

const QuestionsSection = () => {
    return (
        <div className="questionsSection-container">
            <QuestionBlock
                 question="What is Netflix?"
                 answer= "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
            />
            <QuestionBlock
                question="How much does Netflix cost?"
                answer= "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EUR 7.99 to EUR 11.99 a month. No extra costs, no contracts."
            />
            <QuestionBlock
                question="Where can l watch?"
                answer = "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles"
            />
            <QuestionBlock
                question="How do I cancel?"
                answer= "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
            />
        </div>
    )
}

export default QuestionsSection;