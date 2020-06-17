import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { SignIn } from './components/SignIn'
import { Register } from './components/Register'
import { Messages } from './components/Messages'


export const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <header className="App-header">
            {/* the login page */}
            <Route path="/SignIn" exact>
              <SignIn />
            </Route>

            {/* the register page */}
            <Route path="/" exact>
              <Register />
            </Route>

            {/* message page */}
            {/* Pass the name from the register form to Messages */}
            <Route path="/Messages" exact>
              <Messages />
            </Route>
          </header>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

//export default App;
