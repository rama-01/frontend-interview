import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Routes } from 'react-router-dom'
import App from './routes/App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Routes>
        <App />
    </Routes>,
)
