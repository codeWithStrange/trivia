import { FaArrowLeft,} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import selectionContext from '../data/selectionContext'
import { nanoid } from 'nanoid'
import themeContext from '../data/themeContext'
import './responsive.css'

const Options = () => {
  const {category,  setCategory} = useContext(selectionContext)
  const {theme, setTheme} = useContext(themeContext)
  const [isFullHeight, setIsFullHeight] = useState(false);
 
 //For one styling ignore
  useEffect(() => {
    const contentHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;

    if (contentHeight > viewportHeight) {
      setIsFullHeight(true);
    } else {
      setIsFullHeight(false);
    }
  }, []);

  const categoryArray = [{title: 'General knowledge', key:9}, {title: 'Maths', key:19}, {title: 'History', key:23}, {title: 'Geography', key:22}, {title: 'Sports', key:21}, {title: 'Anime', key:31}]
  const handleCategory = (category) => {
    setCategory(category)
  }

  const displayOptions = categoryArray.map((category) => {
    return (
      <Link key={nanoid()} to='questions'>
        <button
          onClick={() => setCategory(category.key)}
          key={nanoid()}
          className={`category-select bg-gray-800 ${theme ? 'bg-white text-gray-800' : 'text-white'}   hover:bg-gray-700 font-bold py-2 px-4 rounded-md  shadow-lg hover:shadow-xl transition duration-300 ease-in-out`}
        >
          {category.title}
        </button>
      </Link>
    );
  });
  

  return (
    <div className={`flex ${theme ? 'bg-gray-800' : '' } ${!isFullHeight ? 'h-screen' : 'h-full'} p-8 flex-col`}>
      <div className='options-heading relative flex items-center justify-center'>
        <Link to='/'>
      <button className={`option-home absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 w-10 h-10 flex text-3xl justify-center items-center mx-10 hover:bg-gray-700 ${theme ? 'bg-gray-400 text-gray-800' : 'bg-gray-800 text-white'} text-white font-bold py-2 px-4 rounded-md mt-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out`}><FaArrowLeft className='text-2xl'/></button>
      </Link>
      <h1 className={`categoryh1 ${theme ? 'text-white' : ''}  font-bold`}>Pick a category</h1>
      </div>
        <div className="category-wrapper flex-wrap flex ">
           {displayOptions}
        </div>
    </div>
  )
}

export default Options
