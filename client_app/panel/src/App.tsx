import React from 'react';
import Nav from "./Auth/SignIn";
import {Route, Routes} from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Success from "./Auth/Sucess";


const App = () => {
    const navData = [
        {name: "Login", path: "/auth", element: <SignIn />},
        {name: "Success", path: "/success", element: <Success />}
    ]
  return (
      <div className='font-roboto'>
          <Routes>
              <Route path={"/"} element={<SignIn />}/>
              <Route path={"/auth"} element={<SignIn />} />
              <Route path={"/success"} element={<Success />} />
          </Routes>
      </div>
  );
}

export default App;
