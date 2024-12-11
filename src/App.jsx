import { useState } from 'react'
// import './App.css'
import WeatherApiApp from './Components/WeatherApiApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WeatherApiApp />
    </>
  )
}

export default App
