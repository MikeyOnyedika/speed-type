import React from 'react'
import './styles.css'

const UserScore = ({ wpm, accuracy, words, letters }) => {
    const [correctWords, wrongWords] = words
    const [correctLetters, wrongLetters] = letters
    console.log(typeof correctWords, typeof wrongWords, typeof correctLetters, typeof wrongLetters)

    

    return ( 
        <div className='score-board-wrapper'>
            <div className="primary-score-board">
                <div className="main-score score">
                    <div className="score-value">{wpm || 52}</div>
                    <div className="score-title">WPM</div>
                </div>

                <div className="sub-score score">
                    <div className="score-value">{accuracy + "%" || "98%"}</div>
                    <div className="score-title">Accuracy</div>
                </div>

            </div>
            <div className="secondary-score-board">
                <div className="extra">
                    <h4 className='title'>Total Words</h4>
                    <span className='value'>
                        <span className='correct'>{correctWords}</span>
                        <span className='separator'>|</span>
                        <span className='wrong'>{wrongWords}</span>
                    </span>
                </div>
                <div className="extra">
                    <h4 className='title'>Keystrokes</h4>
                    <span className='value'>
                        <span className='correct'>{correctLetters}</span>
                        <span className='separator'>|</span>
                        <span className='wrong'>{wrongLetters}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserScore