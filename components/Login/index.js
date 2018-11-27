import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faMinus,
  faInfo,
  faUserLock
} from "@fortawesome/free-solid-svg-icons";


const Login = props => {
    return (
        <div className="bg-blue-new h-screen w-full relative overflow-x-hidden overflow-y-hidden">
            <div className="align-absolute bg-white w-450 h-450 mt-64">
                <div className="text-center p-2">
                    <FontAwesomeIcon icon={faUserLock} className="fa-7x mt-12 mb-6 text-almost-transparent" />
                    <h2 className="p-2">Package Fulfillment System</h2>
                    <p>Please, enter with your login and password</p>
                </div>
                <div className="text-center">
                    <div className="p-2 mt-20"><input type="text" placeholder="Username" className="p-2 w-2/3"/></div>
                    {/* <div className="p-2"><input type="text" placeholder="Password" className="p-2 w-2/3"/></div> */}
                </div>
                <div className="bg-blue-new text-white mt-2 p-2 text-center mx-auto w-2/3 justify-center cursor-pointer hover:bg-blue">
                    Login
                </div>
                
                
            </div>
        </div>
    )
}

export default Login;