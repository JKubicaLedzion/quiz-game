import React from "react"

export default function Question({questionText, id, answears, checkIfCorrect, markedAnswear}) {

    const answearsElements = answears.map(answear => (
        <p 
            className={`answear${markedAnswear === answear? "-marked" : ""}`}
            onClick={() => checkIfCorrect(id, answear)}>
            {answear}
        </p>
    ))

    return (
        <div>
            <p className="question">{questionText}</p>
            <div className="answears">
                {answearsElements}
            </div>
        </div>
    )
}