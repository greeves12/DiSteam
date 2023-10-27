import {Routes, Route} from "react-router-dom";
import SignIn from "../Auth/SignIn";
import Success from "../Auth/Sucess";


const Nav = ( ) => {
    const navData = [
        {name: "Login", path: "/auth", element: <SignIn />},
        {name: "Success", path: "/success", element: <Success />}
    ]
    return (
        <Routes>
            {navData.map((link) => {
                return <Route path={link.path} element={link.element}></Route>
            })}
        </Routes>
    )
}

export default Nav;