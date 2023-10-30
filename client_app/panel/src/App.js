import React from 'react';
import {Route, Routes} from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Success from "./Auth/Success";
import Server from "./Contents/Server";

export const DiscordContext = React.createContext("");

  const App = () => {

    return (
        <div className='font-roboto'>
          <Routes>
              <Route path={"/"} element={<SignIn />}/>
              <Route path={"/auth"} element={<SignIn />} />
              <Route path={"/success"} element={<Success />} />
              <Route path={"/server/:id"} element={<Server />}/>
          </Routes>
        </div>
    );
  }

export default App;