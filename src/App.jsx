import { createContext,useState, } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import HomePage from './pages/Home';
import UserDashboard from './pages/Userdashboard';
import SignupPage from './pages/Signup';
import SignInPage from './pages/Signin';
import NotFound from './pages/Notfound';

export const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function App() {

  const [userData,setUserData] = useState({})

  const getDetails = (details)=>{
    setUserData(details.user)
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/dashboard' element={<UserDashboard userData = {userData} />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SignInPage getDetails={getDetails} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;