import React from 'react';
import {Route, Routes} from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Success from "./Auth/Success";

  const App = () => {

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