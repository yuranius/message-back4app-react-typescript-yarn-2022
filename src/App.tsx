
import { BrowserRouter as Router} from "react-router-dom";
import React, { useEffect} from "react";
import {NavbarComponent} from "./components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetCheckLoginUserAction} from "./store/authReducer";
import { stateUserType} from "./types/stateTypes";
import {useRoutes} from "./routes";





function App():JSX.Element {
  const { token , avatar  } = useSelector((state:stateUserType) => state.user)
  const dispatch = useDispatch()
  const routes = useRoutes(token);


  useEffect( () => {
    dispatch(AsyncSetCheckLoginUserAction())
  },[dispatch, avatar])

  return (
      <Router>
        { !!token && <NavbarComponent /> }
        <div className="container">{routes}</div>
      </Router>
  );
}

export default App;

