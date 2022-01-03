import React from "react"
import Question from "./components/Question"

export default function App() {

    const [isWelcomePage, setIsWelcomePage] = React.useState(true)
    const [endGame, setEndGame] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [quizParams, setQuizParams] = React.useState({
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
                    markedAnswear: "Test"
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

    function handleChange(event) {
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
            isCorrect={question.isCorrect}
            correctAnswear={question.correctAnswear}
            checkIfCorrect={checkIfCorrect}
            markedAnswear={question.markedAnswear}/>))

    if (isWelcomePage) {
        return (
            <main className="welcome-page">
                <h1>Quiz game</h1>
                <p>Answear few questions and test yourself.</p>
                <form
                    className="form"
                    onSubmit={startQuiz}>
                    <label htmlFor="count">Select number of questions</label>
                    <input
                        id="count"
                        className="form-count"
                        type="text"
                        placeholder="Number of questions"
                        name="questionsCount"
                        onChange={handleChange}/>
                    <br />
                    <label htmlFor="difficulty">Select difficulty</label>
                    <select
                        id="difficulty"
                        value={quizParams.difficulty}
                        onChange={handleChange}
                        name="difficulty">
                        <option className="option-difficulty" value="easy">easy</option>
                        <option className="option-difficulty" value="medium">medium</option>
                        <option className="option-difficulty" value="hard">hard</option>
                    </select>
                    <br />
                    <button>Start quiz</button>
                </form>
            </main>
        )
    } else {
        return (
            <main className="questions-page">
                <h1>Questions</h1>
                {questionElements}
                {!endGame && <button onClick={checkAnswears}>Check answears</button>}
                {endGame && <p>You scored {score}/{quizParams.questionsCount} correct answears</p>}
                {endGame && <button onClick={startNewGame}>Play again</button>}
            </main>
        )
    }
}