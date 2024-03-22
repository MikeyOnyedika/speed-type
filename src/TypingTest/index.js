import React from 'react'
import TypingTestPanel from './components/TypingTestPanel/'
import Header from '../components/Header'
import Main from '../components/Main'
import TypingTestSettings from './components/TypingTestSettings/'
import { useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'

export const TypingTestPageContext = createContext();

export default function TypingTest(){
  const [mode, setMode] = useState("")
  const [time, setTime] = useState(-1)

  const [isGameSet, setIsGameSet] = useState(false)


  useEffect(() => {
    if (mode !== "" && time !== -1) {
      setIsGameSet(true)
    }

  }, [mode, time])

  return (
    <>
      <Header />
      <Main>
        {/* displayed when game is not set */}
        {isGameSet ||
          <TypingTestSettings setMode={setMode} setTime={setTime} />
        }
        {/* displayed only when time and mode has been set */}
        {time && mode &&
          <TypingTestPageContext.Provider value={{ setMode, setTime, setIsGameSet }}>
            <TypingTestPanel time={time} mode={mode} />
          </TypingTestPageContext.Provider>
        }
      </Main>
    </>
  )
}