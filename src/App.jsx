import { useEffect, useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Options from './Pages/Options';
import QuestionPage from './Pages/QuestionPage';
import selectionContext from './data/selectionContext';
import themeContext from './data/themeContext';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(10)
  const [theme, setTheme] = useState(false)
 
  //fixing links
  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const jsonData = await response.json();

    // Replace &quot; with "
    // Replace &#039; with '
    const formattedData = jsonData.results.map(result => ({
      ...result,
      question: result.question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&eacute;/g, "é")
        .replace(/&pi;/g, "π")
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&sup2;/g, "²")
        //This json has autism fr!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }));

    setData(formattedData);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};

// Call the fetchData function
fetchData();

    
  }, [category]);

  if (loading) return <div>Please wait...</div>;
  if (!data) return <div>No data available Please check internet connection</div>;

  const modifyQuestionArray = (questionObject) => {
    
    const allAnswers = [questionObject.correct_answer, ...questionObject.incorrect_answers];
    
    // Modify the object to have a single property for answers
    return {
        ...questionObject,
        answers: allAnswers
    };
};



const finalData = data.map(modifyQuestionArray)
  
  console.log(finalData)


  return (
    <themeContext.Provider value = {{theme, setTheme}}>
    <selectionContext.Provider value={{category, setCategory}}>
    <div className='font-roboto'>
      <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/options" element={<Options />} />
      <Route path="/options/questions" element={<QuestionPage  questions = {finalData}/>} />
      </Routes>
      </Router>
    </div>
    </selectionContext.Provider>
    </themeContext.Provider>
  )
}

export default App
