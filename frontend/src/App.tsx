
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Flight from './pages/Flight'
import Details from './pages/Details'
import './firebase'
import { Appbar } from './component/AppBar'

function App() {
 


  return (
    <div>
      <Appbar></Appbar>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Flight/>}/>
        <Route path='/flight/:id' element={<Details/>}/>
      </Routes>

      
    </BrowserRouter>


    
    </div>
  )
}

export default App
