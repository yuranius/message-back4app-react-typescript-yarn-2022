
import { BrowserRouter as Router} from "react-router-dom";
import React, {ReactHTML, useEffect} from "react";
import {NavbarComponent} from "./components/Navbar";
import {TOKEN_DATA, USER_DATA} from "./config";
import {useDispatch, useSelector} from "react-redux";
import {setAuthUser} from "./store/authReducer";
import {stateUserType} from "./types/stateTypes";
import {useRoutes} from "./routes";




function App():JSX.Element {
  const { token  } = useSelector((state:stateUserType) => state.user)
  const userData = JSON.parse(localStorage.getItem(USER_DATA) as string)
  const tokenData = JSON.parse(localStorage.getItem(TOKEN_DATA) as string)
  const dispatch = useDispatch()
  const routes = useRoutes(token);

  useEffect(() => {
    if (userData && tokenData) {
      const user = {token: tokenData.token, userId: userData.userId, userLogin:userData.userLogin, avatar:userData.avatar}
      dispatch(setAuthUser(user))
    }
  }, [token])

  return (
      <Router>
        { !!token && <NavbarComponent /> }
        <div className="container">{routes}</div>
      </Router>
  );
}

export default App;

