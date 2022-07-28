import './styles.css'
import React from 'react'
import { useEffect } from 'react'
import easy from '../../../utilities/easy.json'
import mid from '../../../utilities/mid.json'
import hard from '../../../utilities/hard.json'
import { useRef } from 'react'
import { useReducer } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'


let timerId;

const defaultState = {
    words: [],
    wordCount: -1,
    currentWord: null,
    timeRemainingInSec: 61,
    timeRemaining: "",
    currentWordSpan: null,
    wronglyTypedWords: [],
    correctlyTypedWords: [],
    gameState: "NONE",
    isGameLoaded: true
}

function generateWords(mode) {
    switch (mode) {
        case "easy":
            return easy;
        case "mid":
            return mid;
        case "hard":
            return hard;
        default:
            throw new Error("Mode is undefined")
    }
}

function reducer(state, action) {
    switch (action.type) {
        case "setGameState":
            return { ...state, gameState: action.payload }
        case "setWords":
            return { ...state, words: action.words }
        case "countDown":
            let timeInSec = state.timeRemainingInSec

            let min = Math.floor(timeInSec / 60)
            if (min < 10) {
                min = "0" + min
            }
            let sec = Math.floor(timeInSec % 60)
            if (sec < 10) {
                sec = "0" + sec
            }

            timeInSec = state.timeRemainingInSec - 1
            return { ...state, timeRemaining: `${min}:${sec}`, timeRemainingInSec: timeInSec }
        case "moveToNextWord":
            const wordCount = state.wordCount + 1;
            const currentWord = state.words[wordCount]
            const currentWordSpan = action.payload.current.querySelector(`span[word-index="${wordCount}"]`)
            return { ...state, wordCount, currentWord, currentWordSpan }
        case "addToWronglyTypedWords":
            return { ...state, wronglyTypedWords: [...state.wronglyTypedWords, action.payload] }
        default:
            throw new Error("Action type not defined")
    }

}


const TypingTestPanelState = createContext(null)

const TypingTestPanel = ({ mode = "easy" }) => {
    const wordsPanelRef = useRef(null)
    const [state, dispatch] = useReducer(reducer, defaultState)
    const [userInputText, setUserInputText] = useState("")

    useEffect(() => {
        dispatch({ type: "setWords", words: generateWords(mode) })
    }, [mode])

    const memoisedMatchText = useCallback(() => {
        const userText = userInputText.trim()
        const incorrectLettersArray = []
        let loopLength = 0;

        if (userText.length <= state.currentWord.length) {
            loopLength = userText.length
        } else {
            loopLength = state.currentWord.length
        }

        for (let i = 0; i < loopLength; i++) {
            if (userText[i] !== state.currentWord[i]) {
                incorrectLettersArray.push(userText[i])
            }
        }

        // add the extra letters from the userText to the incorrectletters array if user typed more letters than the word has
        if (userText.length > state.currentWord.length) {
            incorrectLettersArray.push(
                ...userText.slice(state.currentWord.length, userText.length)
            )
        }

        return incorrectLettersArray;
    }, [userInputText, state.currentWord])


    function keyListener(key) {
        // start countdown timer and move wordcount to 0 at the first keystroke
        if (state.wordCount === -1) {
            dispatch({ type: "setGameState", payload: "running" })
            // start the countdown timer
        }


        // if the spacebar was pressed
        if (key === " ") {
            // check that input box contains any actual text before moving to the next word
            if (userInputText.trim() !== "") {
                removeCSSClass(state.currentWordSpan, "highlight-current")
                if (userInputText.trim() !== state.currentWord) {
                    addCSSClass(state.currentWordSpan, "highlight-wrong")
                } else {
                    addCSSClass(state.currentWordSpan, "highlight-correct")
                }
                dispatch({ type: "moveToNextWord", payload: wordsPanelRef })
            }

            clearInputField();
        }
    }


    // starts the game once the state of state.gameState is "running"
    useEffect(() => {
        if (state.gameState === "running" && state.wordCount === -1) {
            dispatch({ type: "moveToNextWord", payload: wordsPanelRef })
            timerId = setInterval(() => {
                if (state.timeRemainingInSec > 0) {
                    dispatch({ type: "countDown" })
                }
            }, 1000);
        }
    }, [state.gameState, state.wordCount, state.timeRemainingInSec])


    // stop game when state.timeRemainingInSec is less than 0
    useEffect(() => {
        console.log(state.timeRemainingInSec)
        if (state.timeRemainingInSec < 0) {
            dispatch({ type: "setGameState", payload: "stopped" })
        }
    }, [state.timeRemainingInSec])


    // does stuff when the game stops
    useEffect(() => {
        if (state.gameState === "stopped") {
            clearInterval(timerId)
            hideGamePanel()
            calculateResult()
        }
    }, [state.gameState])

    function hideGamePanel() {

    }

    function calculateResult() {
        console.log("game STopped")
    }

    // runs when program advances to the new word
    useEffect(() => {
        if (state.currentWordSpan !== null) {
            addCSSClass(state.currentWordSpan, "highlight-current")

            // pulls the words panel up if text has flowed to the next line
            wordsPanelRef.current.style.top = -state.currentWordSpan.offsetTop + "px";
        }
    }, [state.currentWordSpan])


    // runs after setUserInputText() finishes running
    useEffect(() => {
        // prevents running immediately component is rendered since state.currentWord will 
        // be set when user starts actually typing stuff
        if (state.currentWordSpan !== null && userInputText.length !== 0) {
            // color current word <span> depending of whether user made a typo or not
            const wrongLetters = memoisedMatchText()

            if (wrongLetters.length !== 0) {
                addCSSClass(state.currentWordSpan, "highlight-wrong")
            } else {
                removeCSSClass(state.currentWordSpan, "highlight-wrong")
            }

        }

    }, [userInputText, state.currentWordSpan, memoisedMatchText])

    function removeCSSClass(element, cssClass) {
        element.classList.remove(cssClass)
    }

    function addCSSClass(element, cssClass) {
        if (!element.classList.contains(cssClass)) {
            element.classList.add(cssClass)
        }
    }


    function clearInputField() {
        setUserInputText('')
    }



    return (
        <div className='typing-text-panel'>

            {state.isGameLoaded === true &&
                <TypingTestPanelState.Provider value={state}>
                    <TextDisplay wordsPanelRef={wordsPanelRef} />
                </TypingTestPanelState.Provider>
            }

            <div className="controls">
                <input autoComplete="off" type="text" id="text-input" onKeyDownCapture={(e) => keyListener(e.key)} onChange={(e) => setUserInputText(e.target.value)} value={userInputText} />
                <div>
                    <h3 id='time-remaining'>{state.timeRemaining || "00:00"}</h3>
                    <button id="restart-btn" className='btn'>Restart</button>
                </div>
            </div>
        </div>

    )
}



function TextDisplay({ wordsPanelRef }) {
    const parentState = useContext(TypingTestPanelState)
    return (
        <div className='text-display'>
            <div className="words" ref={wordsPanelRef}> {parentState.words.map((word, index) => <span word-index={index} key={index}>{word}</span>)} </div>
        </div>
    )
}


export default TypingTestPanel