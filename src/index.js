import React, { createContext, useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ForgetPage from './component/forget-page';
import SetNewPassword from './component/set-password-page';
import 'bootstrap/dist/css/bootstrap.min.css';


const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      const updatedState = state.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
      localStorage.setItem("databasePF", JSON.stringify(updatedState));
      return updatedState;
    default:
      return state
  }
}

const emailContext = createContext(null);
export { emailContext };

const AppRouter = () => {




  useEffect(() => {
    const found = localStorage.getItem("databasePF");
    if (!found) {
      const database = [
        {
          id: "a6f34b54-7aed-47c1-82c7-d168696ca698",
          email: "itachiuchiha@gmail.com",
          token: "",
          password: "amatharasu"
        },
        {
          id: "1e0da3b2-e7f0-4578-9e65-e03f629ad3ad",
          email: "uchiha@gmail.com",
          token: "",
          password: "clan"
        },
        {
          id: "1e0da6b2-e7f0-4578-9e65-e03f639dd3at",
          email: "gowthamtrm01@gmail.com",
          token: "",
          password: "check"
        }
      ]
      localStorage.setItem("databasePF", JSON.stringify(database));
    }
  }, [])



  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("databasePF")));

  return (
    <Router>
      {console.log(state)}
      <emailContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path='/'>
            <ForgetPage />
          </Route>
          <Route exact path='/setnewpassword/:token/:id'>
            <SetNewPassword />
          </Route>
        </Switch>
      </emailContext.Provider>
    </Router>
  );
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

