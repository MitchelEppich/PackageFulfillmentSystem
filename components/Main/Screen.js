import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faInfo,  
  faAngleLeft,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";


const Screen = props => {
    return (
        <div 
        style={{
            borderRadius: "10px",            
            overflow: "hidden",
            background: "whitesmoke",
            boxShadow: "0px 0px 10px #cecece",
        }}
        className="w-newScreen h-newScreen bg-white z-50 mt-6 align-absolute">
            <div className="w-full bg-blue-new h-10 mb-6 inline-flex flex items-center">
                <div 
                onClick={()=>{
                    props.toggleScreen()
                }}
                className="w-1/3 h-10 inline-flex">
                    <h4 className="p-2 text-white uppercase text-lg flex items-center hover:bg-semi-transparent cursor-pointer">
                    <FontAwesomeIcon icon={faAngleLeft} className="fa-2x mr-4" />Back</h4>
                </div>
                <div className="w-1/3 text-center text-white font-bold text-lg">
                    <p>CROP KING SEEDS</p>
                </div>
                <div className="w-1/3 text-right mr-6"> 
                    <h4 className="p-2 text-white uppercase text-lg">#21884 order</h4>
                </div>
            </div>
            <div className="inline-flex w-full absolute pin-l pin-t p-1 mt-10 bg-grey-darker uppercase text-white text-sm"> 
              <div className="w-1/2 pl-24">Strain Name</div>             
              <div className="w-1/2">STT Number</div>              
            </div>
            <div             
            style={{               
                display: "flex",
                justifyContent:" center",
                alignItems:" center",                           
                }}
            className="inline-flex flex bg-white items-center w-full mx-auto my-2 p-1">
                <div className="w-1/2">
                    <p className="text-lg ml-24">Northern Lights Auto Flower</p>
                </div>
                <div className="w-1/2 inline-flex flex items-center">
                    <div className="w-40">
                        <label className="mr-2">Complete here:</label>
                    </div> 
                    <div className="w-full">                    
                        <p className="">704
                            <input type="text"  maxLength="4" size="3" name="sttNumber" placeholder="XXXX" className="ml-2 p-3 px-1"/>
                        </p>
                    </div>
                </div>
            </div>
            <div 
            className="bg-white items-center w-full mx-auto my-2 p-1">
                <div className="inline-flex w-full">
                    <div className="w-1/2 flex items-center">
                        <p className="text-lg ml-24 flex items-center">
                            <FontAwesomeIcon icon={faAngleDown} className="fa-lg mr-2 cursor-pointer"
                            onClick={()=>{
                                props.toggleShowMoreMultipleFields()
                            }} 
                            />
                            Purple Kush Auto Flower
                        </p>
                    </div>
                    <div className="w-1/2 flex items-center inline-flex">
                        <div className="w-40">
                            <label className="mr-2">Insert Range:</label> 
                        </div>
                        <div className="w-full">
                            <p className="">704
                            <input type="text" size="3" name="rangeMin" placeholder="XXXX" maxLength="4" className="p-3 ml-2 px-1 mr-5"/> to <span className="ml-5">704</span><input type="text" size="3" name="rangeMax" placeholder="XXXX" maxLength="4" className="p-3 ml-2 px-1"/>
                            </p>
                        </div>  
                    </div>
                </div>
                
                {props.showMoreMultipleFields ? 
                <div className="w-full overflow-y-auto mt-2 mx-0 bg-grey-light ">
                    <div className="bg-semi-transparent w-full flex items-center mt-1 h-12 inline-flex">
                        <div className="w-1/2 pl-24">
                            <p>Package #1</p> 
                        </div>
                        <div className="w-1/2 inline-flex flex items-center">
                            <div className="w-40">
                                <label className="mr-2">Complete here:</label> 
                            </div>
                            <div className="w-full">
                                <p className="">704
                                    <input type="text"  maxLength="4" size="3" name="sttNumber" placeholder="XXXX" className="ml-2 p-3 px-1"/>
                                </p>
                            </div>                              
                        </div>                
                    </div>
                    
                    <div className="bg-semi-transparent w-full flex items-center mt-1 h-12 inline-flex">
                        <div className="w-1/2 pl-24">
                            <p>Package #2</p> 
                        </div>
                        <div className="w-1/2 inline-flex flex items-center">
                            <div className="w-40">
                                <label className="mr-2">Complete here:</label> 
                            </div>
                            <div className="w-full">
                                <p className="">704
                                    <input type="text"  maxLength="4" size="3" name="sttNumber" placeholder="XXXX" className="ml-2 p-3 px-1"/>
                                </p>
                            </div>                              
                        </div>                
                    </div>
                    <div className="bg-semi-transparent w-full flex items-center mt-1 h-12 inline-flex">
                        <div className="w-1/2 pl-24">
                            <p>Package #3</p> 
                        </div>
                        <div className="w-1/2 inline-flex flex items-center">
                            <div className="w-40">
                                <label className="mr-2">Complete here:</label> 
                            </div>
                            <div className="w-full">
                                <p className="">704
                                    <input type="text"  maxLength="4" size="3" name="sttNumber" placeholder="XXXX" className="ml-2 p-3 px-1"/>
                                </p>                                
                            </div>                              
                        </div>                
                    </div>
                    <div className="bg-semi-transparent w-full flex items-center mt-1 h-12 inline-flex">
                        <div className="w-1/2 pl-24">
                            <p>Package #4</p> 
                        </div>
                        <div className="w-1/2 inline-flex flex items-center">
                            <div className="w-40">
                                <label className="mr-2">Complete here:</label> 
                            </div>
                            <div className="w-full">
                                <p className="">704
                                    <input type="text"  maxLength="4" size="3" name="sttNumber" placeholder="XXXX" className="ml-2 p-3 px-1"/>
                                </p>
                            </div>                              
                        </div>                
                    </div>
                    <div className="bg-semi-transparent w-full flex items-center mt-1 h-12 inline-flex">
                        <div className="w-1/2 pl-24">
                            <p>Package #5</p> 
                        </div>
                        <div className="w-1/2 inline-flex flex items-center">
                            <div className="w-40">
                                <label className="mr-2">Complete here:</label> 
                            </div>
                            <div className="w-full">
                                <p className="">704
                                    <input type="text"  maxLength="4" size="3" name="sttNumber" placeholder="XXXX" className="ml-2 p-3 px-1"/>
                                </p>
                            </div>                              
                        </div>                
                    </div>
                    
                    
                    
                </div> : null }
                
            </div>   
            <div className="w-40 p-1 pin-b pin-r bg-blue-new absolute mr-8 mb-4 cursor-pointer hover:bg-blue">
                <p className="uppercase p-2 text-center text-white font-bold">Finalize</p>
            </div>         
        </div>
    )
}

export default Screen