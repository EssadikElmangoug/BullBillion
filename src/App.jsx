import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from '../components/Home'
import Chat from '../components/Chat'
import Login from '../components/Login'
import Register from '../components/Register'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* <nav>
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
