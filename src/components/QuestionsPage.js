import React from "react"
import '../questions_page.css';

export default function QuestionsPage({questionElements, endGame, checkAnswears, score, questionsCount, startNewGame}) {
    return (
        <main className="questions-page">
            <h1>Questions</h1>
            {questionElements}
            {!endGame && <button onClick={checkAnswears}>Check answears</button>}
            {endGame &&
            <>
                <p>You scored {score}/{questionsCount} correct answears</p>
                <button onClick={startNewGame}>Play again</button>
            </>}
        </main>
    )
}