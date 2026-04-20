import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AppPage, Home } from './pages'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route path='/app' element={<AppPage/>}/>
      </Routes>
    </Router>
  )
}

export default App