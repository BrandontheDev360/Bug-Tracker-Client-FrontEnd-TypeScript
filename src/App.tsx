import React, { useState, useEffect} from 'react'
import './App.css'
import Auth from './components/Auth/Auth'
import "bootstrap/dist/css/bootstrap.css"
import Dashboard from './components/Dashboard/Dashboard'

const App: React.FunctionComponent = (): JSX.Element => {
  const [sessionToken, setSessionToken] = useState<string | null>('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken)
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }


  const loggedInView = () => {
    if (sessionToken === localStorage.getItem('token')) {
      return <Dashboard sessionToken={sessionToken} clearToken={clearToken} />
    } else {
      return <Auth updateToken={updateToken}/>
    }
  }
  
  return (
    <>
      {loggedInView()}
    </>
  );
}

export default App;
