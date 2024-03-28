
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import themeContext from '../data/themeContext'
import { FaMoon, FaSun } from 'react-icons/fa'
import './responsive.css'


const Home = () => {

const {theme, setTheme} = useContext(themeContext)

  return (
    <div className={`flex justify-center ${theme ? 'bg-gray-800': ''} items-center flex-col bubbles-background`}>
      <button onClick={() => {setTheme(!theme)}} className=" theme-icon bg-none absolute  bg-white text-2xl text-gray-800 font-bold py-2 px-4 rounded-md  shadow-lg hover:shadow-xl transition duration-300 ease-in-out">  {!theme?  <FaMoon/> : <FaSun/> } </button>
      <h1 className={`font-roboto ${theme ? 'text-white ': ''} text-9xl`}>Trivia</h1>
      <p className={`font-roboto ${theme ? 'text-white ': ''} font-roboto text-2xl`}>How much do you really know? </p>
      <Link to='options'>
      <button className={`start bg-gray-800 ${theme ? ' text-gray-700 shadow-md ' : ''} hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mt-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out`}>Let's find out</button>
      </Link>
    </div>
  )
}

export default Home
