import React from "react"

export default function Question(props) {

    const answearsElements = props.answears.map(answear => (
        <p 
            className={`answear${props.markedAnswear === answear? "-marked" : ""}`}
            onClick={() => props.checkIfCorrect(props.id, answear)}>
            {answear}
        </p>
    ))

    return (
        <div>
            <p className="question">{props.questionText}</p>
            <div className="answears">
                {answearsElements}
            </div>
        </div>
    )
}