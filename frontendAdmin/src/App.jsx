import { FlightDetailsForm } from './pages/FlightForm'
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/flightupdate" element = {<FlightDetailsForm/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App