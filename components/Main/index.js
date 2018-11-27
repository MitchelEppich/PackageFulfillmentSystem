import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faInfo,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faMinus, faInfo);

const Main = props => {  

  let showCompanies = () => {    
    let arr = [];
    let companies = props.companies;
    for (let i = 0; i < companies.length; i++){
      arr.push(
        <div className="w-1/8 h-10 p-2 justify-center border-semi-transparent flex items-center border-r-2 font-bold cursor-pointer hover:bg-semi-transparent leading-normal leading-normal uppercase"> {companies[i].nick} <span className="qtd-tag">  {companies[i].orders}</span>
        </div>
      )
    } return arr
     
  }

  console.log(props.companies[0].name)

  
  return (
    <div className="w-full bg-grey-light overflow-x-hidden">
      
      <div className="bg-blue w-full mx-auto inline-flex justify-center text-white"> 
        <div className="w-newScreen inline-flex ml-6 mt-4 justify-center mb-2">
            <div className="w-3/4 mt-2">
                <h2 className="text-white p-2">Package Fulfillment Internal System</h2>
                <p className="p-3 ">Welcome Chuck Norris, please select an option:</p>                
            </div>
            <div className="w-1/4 mt-6 text-right mr-12">
                <a className="text-white p-2 bg-semi-transparent font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue">Logout</a>
                
            </div>
        </div>
        
      </div>
      
      <div style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: "0",
        right: "0",
        height: "800px"
      }}
      className="w-newScreen h-halfscreen text-white mt-16">
        <div 
        style={{
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
        className="inline-flex w-full bg-blue-new justify-between">            
            {showCompanies()}
          </div>

          <div className="inline-block w-full h-650 bg-white text-black overflow-y-auto">
            <div className="inline-flex w-full p-1 bg-grey-darker uppercase text-white text-sm absolute"> 
              <div className="w-1/5 pl-2">Number</div>
              <div className="w-3/5 pl-2">Order Number</div>
              <div className="w-1/5 text-center mr-4">Action</div>              
            </div>
            <div className="inline-flex w-full p-2 items-center  bg-grey-lighter mt-8"> 
              <div className="w-1/5 pl-2">1</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>
            <div className="inline-flex w-full items-center p-2"> 
              <div className="w-1/5 pl-2">2</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>
            <div className="inline-flex w-full items-center p-2 bg-grey-lighter"> 
              <div className="w-1/5 pl-2">3</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>
            <div className="inline-flex w-full items-center p-2"> 
              <div className="w-1/5 pl-2">4</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>            
            <div className="inline-flex w-full items-center p-2 bg-grey-lighter"> 
              <div className="w-1/5 pl-2">5</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>
            <div className="inline-flex w-full items-center p-2"> 
              <div className="w-1/5 pl-2">6</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>            
            <div className="inline-flex w-full items-center p-2 bg-grey-lighter"> 
              <div className="w-1/5 pl-2">7</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>
            <div className="inline-flex w-full items-center p-2"> 
              <div className="w-1/5 pl-2">8</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>            
            <div className="inline-flex w-full items-center p-2 bg-grey-lighter"> 
              <div className="w-1/5 pl-2">9</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>
            <div className="inline-flex w-full items-center p-2"> 
              <div className="w-1/5 pl-2">10</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>            
            <div className="inline-flex w-full items-center p-2 bg-grey-lighter"> 
              <div className="w-1/5 pl-2">11</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>
            <div className="inline-flex w-full items-center p-2"> 
              <div className="w-1/5 pl-2">12</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>            
            <div className="inline-flex w-full items-center p-2 bg-grey-lighter"> 
              <div className="w-1/5 pl-2">13</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>
            <div className="inline-flex w-full items-center p-2"> 
              <div className="w-1/5 pl-2">14</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>            
                     
            <div className="inline-flex w-full items-center p-2 bg-grey-lighter"> 
              <div className="w-1/5 pl-2">15</div>
              <div className="w-3/5 pl-2">Order #455454</div>
              <div className="w-1/5 pl-2"> 
              <div onClick={()=>{
                props.toggleScreen()
              }}
              className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue">Claim</div></div>              
            </div>
                      
            
            
          </div>          
          
        </div> 
        
    </div>
   
  );
};

export default Main;
