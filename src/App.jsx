import React from 'react'
import './App.css'
import TypingTest from './TypingTest'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TypingTest />} />
      </Routes>
    </Router>
  )
}

export default App