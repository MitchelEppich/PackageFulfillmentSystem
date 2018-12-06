import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

const Reports = props => {
    return (
        <div
            style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                overflow: "hidden",
                background: "whitesmoke",
                boxShadow: "0px 0px 10px #cecece"
            }}
            className="w-newScreen h-newScreen bg-white z-60 mt-16 align-absolute"
        >
            <div className="w-full inline-flex flex items-center bg-blue-new relative">
                <div
                onClick={() => {
                    props.setVisibleScreen(null);
                    props.clearItem();
                }}
                className="w-1/3 h-10 inline-flex"
                >
                    <h4 className="p-2 text-white uppercase text-lg bg-red flex items-center hover:bg-semi-transparent cursor-pointer">
                        <FontAwesomeIcon icon={faAngleLeft} className="fa-2x mr-4" />
                        Back
                    </h4>
                </div>
                <div className="bg-blue-new w-1/3 text-white p-2 text-center uppercase">
                    <h3>Reports</h3>
                </div>                
            </div>
            <div className="w-full p-2 pl-10 text-center ">
                <div className="inline-flex items-center w-full">
                    <p className="pr-2">Select the period: </p>
                    <input id="date" type="date"/>
                </div>
            </div>
            <div className="inline-flex w-full">
                <div 
                style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid #e6e6e6",
                    boxShadow: "0px 1px 1px rgba(206, 206, 206, 0.25)"
                }}
                class="w-1/2 mx-8 mt-4">
                    <div className="w-full h-10 bg-blue-new text-white text-center p-2 relative">
                        <h3>Packages Done by Employees</h3>
                    </div>
                    <div className="bg-white w-full relative">  
                        <div className="bg-grey-darker w-full text-white inline-flex absolute p-1 text-sm uppercase">
                            <div className="w-1/2 pl-8">Name</div>
                            <div className="w-1/2 pl-4">Quantity</div>
                        </div>   
                    </div>
                    <div className="h-200 bg-white w-full overflow-y-auto mt-6">
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">Karl</div>
                                <div className="w-1/2 pl-4">02 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">Joseph</div>
                                <div className="w-1/2 pl-4">142 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">Smigol</div>
                                <div className="w-1/2 pl-4">443 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">Mitchel</div>
                                <div className="w-1/2 pl-4">0.5 package</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">Pikachu</div>
                                <div className="w-1/2 pl-4">3432 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">Test</div>
                                <div className="w-1/2 pl-4">1465 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">Obama</div>
                                <div className="w-1/2 pl-4">12 packages</div>
                            
                            </div>  
                        </div>
                        <div className="w-full p-2 text-right">
                            <p>Total: 4500 packages</p>
                        </div>
                </div>

                <div 
                style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid #e6e6e6",
                    boxShadow: "0px 1px 1px rgba(206, 206, 206, 0.25)"
                }}
                class="w-1/2 mx-8 mt-4">
                    <div className="w-full h-10 bg-blue-new text-white text-center p-2 ">
                        <h3>Seeds Sold by Brand</h3>
                    </div>
                    <div className="bg-white w-full relative">  
                        <div className="bg-grey-darker w-full text-white inline-flex absolute p-1 text-sm uppercase">
                            <div className="w-1/2 pl-8">Name</div>
                            <div className="w-1/2 pl-4">Quantity</div>
                        </div>   
                    </div>
                    <div className="h-200 bg-white w-full overflow-y-auto mt-6">
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">CKS</div>
                                <div className="w-1/2 pl-4">02 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">SNM</div>
                                <div className="w-1/2 pl-4">142 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">BVR</div>
                                <div className="w-1/2 pl-4">443 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">MSJC</div>
                                <div className="w-1/2 pl-4">0.5 package</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">SUNW</div>
                                <div className="w-1/2 pl-4">3432 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">MSJCC</div>
                                <div className="w-1/2 pl-4">1465 packages</div>
                            
                            </div>  
                            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
                                <div className="w-1/2 pl-8">WHOLESALE</div>
                                <div className="w-1/2 pl-4">12 packages</div>
                            
                            </div>  
                        </div>
                        <div className="w-full p-2 text-right">
                            <p>Total: 4500 packages</p>
                        </div>
                </div>            
            </div>

        </div>
    )
}

export default Reports