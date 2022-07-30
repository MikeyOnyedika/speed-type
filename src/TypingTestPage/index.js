import React from 'react'
import './styles.css'
import TypingTestPanel from './components/TypingTestPanel/'
import Header from '../sharedComponents/Header/'
import Main from '../sharedComponents/Main/'
import TypingTestSettings from './components/TypingTestSettings/'
import { useState } from 'react'
import { useEffect } from 'react'
import settingsIcon from '../assets/settings.svg'

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
        {!isGameSet || (<div className="go-to-settings">
          <button type='button' className="go-to-settings-btn btn" onClick={() => {
            setMode("")
            setTime(-1)
            setIsGameSet(false)
          }}>
            <img src={settingsIcon} alt="" className='settings-icon' />
          </button>
        </div>)}
      </Main>
    </>
  )
}

export default TypingTestPage