import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './index.css'
import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}
  
export default App
