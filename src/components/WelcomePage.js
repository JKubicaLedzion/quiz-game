import React from "react"
import '../welcome_page.css';

export default function WelcomePage({startQuiz, onQuizParamsChange, difficulty}) {
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
                    onChange={onQuizParamsChange}
                />
                <label htmlFor="difficulty">Select difficulty</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={onQuizParamsChange}
                    name="difficulty">
                    <option className="option-difficulty" value="easy">easy</option>
                    <option className="option-difficulty" value="medium">medium</option>
                    <option className="option-difficulty" value="hard">hard</option>
                </select>
                <button>Start quiz</button>
            </form>
        </main>
    )
}