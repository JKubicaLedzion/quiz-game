import React, {useState} from "react"
import Question from "./components/Question"
import WelcomePage from "./components/WelcomePage"
import QuestionsPage from "./components/QuestionsPage"

export default function App() {
    const [isWelcomePage, setIsWelcomePage] = useState(true)
    const [endGame, setEndGame] = useState(false)
    const [questions, setQuestions] = useState([])
    const [score, setScore] = useState(0)
    const [quizParams, setQuizParams] = useState({
        questionsCount: 5,
        difficulty: "easy"
    })

    function startQuiz() {
        fetch(`https://opentdb.com/api.php?amount=${quizParams.questionsCount}&difficulty=${quizParams.difficulty}`)
        .then(response => response.json())
        .then(data => getNewQuestions(data.results))

        setIsWelcomePage(false)
        setEndGame(false)
    }

    function getNewQuestions(results) {
        setQuestions(results.map(
            result => {
                let answears = [...result.incorrect_answers, result.correct_answer]
                return ({
                    questionText: result.question,
                    correctAnswear: result.correct_answer,
                    answears: shuffleArray(answears),
                    isCorrect: false,
                    id: results.indexOf(result),
                    markedAnswear: ""
                })
            }
        ))
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function checkAnswears() {
        let partialScore = 0
        for (let i = 0; i < questions.length; i++) {
            if(questions[i].isCorrect) {
                partialScore++
            }
        }

        setScore(partialScore)
        setEndGame(true)
    }

    function startNewGame() {
        setIsWelcomePage(true)
        setScore(0)
    }

    function checkIfCorrect(id, newMarkedAnswear) {
        setQuestions(
            prevQuestions => prevQuestions.map(
                prevQuestion => 
                    prevQuestion.id === id ?
                        {...prevQuestion,
                        markedAnswear: newMarkedAnswear,
                        isCorrect: newMarkedAnswear === prevQuestion.correctAnswear}
                        : prevQuestion))
    }

    function onQuizParamsChange(event) {
        event.preventDefault()
        const {name, value} = event.target
        setQuizParams(prevQuizParams => (
            {...prevQuizParams,
            [name]: value}
        ))
    }

    const questionElements = questions.map(question => (
        <Question
            key={question.id}
            questionText={question.questionText}
            id={question.id}
            answears={question.answears}
            checkIfCorrect={checkIfCorrect}
            markedAnswear={question.markedAnswear}
        />
    ))

    return (
        <main>
            {isWelcomePage && 
             <WelcomePage 
             startQuiz={startQuiz}
             onQuizParamsChange={onQuizParamsChange}
             difficulty={quizParams.difficulty}
             questionsCount={quizParams.questionsCount}
         />}
            {!isWelcomePage && 
            <QuestionsPage
            questionElements={questionElements}
            endGame={endGame}
            checkAnswears={checkAnswears}
            score={score}
            questionsCount={quizParams.questionsCount}
            startNewGame={startNewGame}
        />}
        </main>
    )
}