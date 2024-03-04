import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dasgboard from './components/Dasgboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Dasgboard' element={<Dasgboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
