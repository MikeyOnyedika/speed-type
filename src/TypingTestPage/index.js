import React from 'react'
import TypingTestPanel from './components/TypingTestPanel/'
import Header from '../sharedComponents/Header/'
import Main from '../sharedComponents/Main/'
import TypingTestSettings from './components/TypingTestSettings/'
import { useState } from 'react'
import { useEffect } from 'react'

const TypingTestPage = () => {
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
        {isGameSet || <TypingTestSettings setMode={setMode} setTime={setTime} />}
        {time && mode && <TypingTestPanel time={time} mode={mode} />}
      </Main>
    </>
  )
}

export default TypingTestPage