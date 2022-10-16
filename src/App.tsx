
import { BrowserRouter as Router} from "react-router-dom";
import React, { useEffect} from "react";
import {NavbarComponent} from "./components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetCheckLoginUserAction} from "./store/authReducer";
import {stateOverType, stateUserType} from "./types/stateTypes";
import {useRoutes} from "./routes";
import Loader from "./components/loader";




function App():JSX.Element {
  const { token  } = useSelector((state:stateUserType) => state.user)
  const dispatch = useDispatch()
  const routes = useRoutes(token);


  useEffect( () => {
    dispatch(AsyncSetCheckLoginUserAction())
  },[dispatch])

  return (
      <Router>
        { !!token && <NavbarComponent /> }
        <div className="container">{routes}</div>
      </Router>
  );
}

export default App;

