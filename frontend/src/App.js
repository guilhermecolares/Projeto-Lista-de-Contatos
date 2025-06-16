import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;