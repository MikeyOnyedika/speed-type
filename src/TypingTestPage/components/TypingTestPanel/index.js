import './styles.css'
import React from 'react'

const TypingTestPanel = () => {
    return (
        <div className='typing-text-panel'>
            <div className='text-display'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui obcaecati
                deleniti a illo optio aliquid in quam ea magni neque?
            </div>

            <div className="controls">
                <input type="text" id="text-input" />
                <div>
                    <h3 id='time-remaining'>00:00</h3>
                    <button id="restart-btn" className='btn'>Restart</button>
                </div>
            </div>
        </div>
    )
}

export default TypingTestPanel