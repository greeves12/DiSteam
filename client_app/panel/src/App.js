import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Success from "./Auth/Success";
import Server from "./Contents/Server";

  const App = () => {

      const [discord, setDiscord] = useState("");
      const [servers, setServers] = useState([]);
      const [api, setApi] = useState({})
      const GlobalState = {
        discord, setDiscord, servers, setServers, api, setApi
      };


      return (
            <div className='font-roboto'>
              <Routes>
                  <Route path={"/"} element={<SignIn  />}/>
                  <Route path={"/auth"} element={<SignIn />} />
                  <Route path={"/success"} element={<Success GlobalState={GlobalState}/>} />
                  <Route path={"/server/:id"} element={<Server />}/>
              </Routes>
            </div>
        );
  }

export default App;