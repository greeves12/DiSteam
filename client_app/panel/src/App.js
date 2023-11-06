import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import SignIn from "./Pages/Auth/SignIn";
import Success from "./Pages/Auth/Success";
import Server from "./Pages/Server/Server";

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
                  <Route path={"/server/:id"} element={<Server GlobalState={{GlobalState}}/>}/>
              </Routes>
            </div>
        );
  }

export default App;