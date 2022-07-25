import React from 'react'
import TypingTestPanel from './components/TypingTestPanel/'
import Header from '../sharedComponents/Header/'
import Main from '../sharedComponents/Main/'

const TypingTestPage = () => {
  return (
    <>
      <Header />
      <Main>
        <TypingTestPanel />
      </Main>
    </>
  )
}

export default TypingTestPage