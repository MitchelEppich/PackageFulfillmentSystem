import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faInfo,
  faAngleLeft,
  faAngleDown,
  faAngleUp,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import { onError } from "../../node_modules/apollo-link-error";

const Screen = props => {
  let generateSingleItem = item => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: " center",
          alignItems: " center"
        }}
        className="inline-flex flex bg-white items-center w-full mx-auto my-2 p-1 pl-12"
        key={item.name}
      >
        <div
          style={{
            width: "40%"
          }}
          className=""
        >
          <p className="text-lg ml-6">{item.description}</p>
        </div>
        <div
          style={{
            width: "20%"
          }}
          className=""
        >
          <p className="text-lg ml-12">{item.name}</p>
        </div>
        <div
          style={{
            width: "30%"
          }}
          className="inline-flex ml-4 flex items-center"
        >
          <div style={{ width: "180px" }}>
            <label className="mr-2">Complete here:</label>
          </div>
          <div>
            <p className="">
              {props.nav.focusCompany.id}04
              <input
                type="number"
                onChange={e => {
                  if (e.target.value.toString().length > 4)
                    e.target.value = e.target.value.substr(0, 4);
                }}
                size="3"
                name="sttNumber"
                placeholder="XXXX"
                className={`ml-2 p-3 px-1 w-16 ${
                  props.item.missedItems.includes(item.name) ? "bg-red" : ""
                }`}
              />
            </p>
          </div>
        </div>
        <div
          style={{
            width: "10%"
          }}
          className=""
        >
          <p className="flex items-center">{item.quantity} Package</p>
        </div>
      </div>
    );
  };

  let generateSubItem = (itemRef, number, name, value) => {
    // console.log(value);
    let _used = false;
    let item = (
      <div
        className="bg-semi-transparent w-full flex items-center mt-1 h-12 inline-flex"
        key={`${name}${number + 1}`}
      >
        <div style={{width: "73%"}} className="ml-1 pl-16">
          <p>Package #{number + 1}</p>
        </div>
        <div className="w-1/2 inline-flex flex pl-2 items-center">
          <div style={{ width: "180px" }}>
            <label className="mr-2">Complete here:</label>
          </div>
          <div>
            <p className="">
              {props.nav.focusCompany.id}04
              <input
                type="number"
                value={value}
                onChange={e => {
                  if (e.target.value.toString().length > 4)
                    e.target.value = e.target.value.substr(0, 4);
                  props.setItemValue({
                    itemValues: props.item.itemValues,
                    key: `${name}-${number}`,
                    value: e.target.value
                  });
                }}
                onBlur={() => {
                  props.setMultiItemBase({
                    key: name,
                    value: props.item.itemBaseList[name],
                    itemBaseList: props.item.itemBaseList,
                    itemValues: props.item.itemValues,
                    item: itemRef
                  });
                }}
                size="3"
                name="sttNumber"
                placeholder="XXXX"
                className={`ml-2 p-3 px-1 w-16 ${
                  props.item.missedItems.includes(`${name}-${number}`)
                    ? "bg-red"
                    : ""
                }`}
              />
            </p>
          </div>
        </div>
      </div>
    );
    return { item, used: _used };
  };

  let generateMultiItem = item => {
    let arr = [];
    for (let i = 0; i < item.quantity; i++) {
      let valueEntry = props.item.itemValues[`${item.name}-${i}`];
      let _sub = generateSubItem(
        item,
        i,
        item.name,
        valueEntry != null ? valueEntry.value : ""
      );
      if (_sub.used) values.shift();
      arr.push(_sub.item);
    }

    return (
      <div
        className="bg-white items-center w-full mx-auto my-2 p-1 pl-12"
        key={item.name}
      >
        <div className="inline-flex w-full flex items-center">
          <div
            style={{
              width: "40%"
            }}
            className="flex items-center cursor-pointer hover:opacity-50"
            onClick={() => {
              props.expandItem({
                item: item.name,
                expandItems: props.item.expandItems
              });
            }}
          >
            <p className="text-lg ml-5 flex items-center">
            {props.item.expandItems.includes(item.name) 
            ? 
              <FontAwesomeIcon icon={faAngleDown} className="fa-lg mr-2" /> 
            : 
              <FontAwesomeIcon icon={faAngleRight} className="fa-lg mr-2" /> 
            }            
              {item.description}
            </p>
          </div>
          <div
          style={{
            width: "20%"
          }}
          className=""
        >
          <p className="text-lg ml-12">{item.name}</p>
        </div>
          
          <div
            style={{
              width: "30%"
            }}
            className="ml-4 flex items-center inline-flex"
          >
            <div style={{ width: "180px" }}>
              <label className="mr-2">Insert Base Value:</label>
            </div>
            <div>
              <p className="">
                {props.nav.focusCompany.id}04
                <input
                  type="number"
                  value={props.item.itemBaseList[item.name]}
                  onChange={e => {
                    if (e.target.value.toString().length > 4)
                      e.target.value = e.target.value.substr(0, 4);

                    props.setMultiItemBase({
                      key: item.name,
                      value: e.target.value,
                      itemBaseList: props.item.itemBaseList,
                      itemValues: props.item.itemValues,
                      item: item
                    });
                  }}
                  size="30"
                  name="rangeMin"
                  placeholder="XXXX"
                  maxLength="4"
                  className={`p-3 ml-2 px-1 mr-5  w-16 ${
                    props.item.missedItems.includes(`${item.name}-0`)
                      ? "bg-orange"
                      : ""
                  }`}
                />
              </p>
            </div>
          </div>
          <div
            style={{
              width: "10%"
            }}
            className=""
          >
            <p className="flex items-center">{item.quantity} Packages</p>
          </div>
        </div>
        {props.item.expandItems.includes(item.name) ? (
          <div className="w-full overflow-y-auto mt-2 mx-0 bg-grey-light ">
            {arr}
          </div>
        ) : null}
      </div>
    );
  };

  let populateItems = itemList => {
    let companies = [];
    for (let company in itemList) {
      let quantities = [];
      for (let quantity in itemList[company]) {
        let items = [];
        for (let item of Object.values(itemList[company][quantity])) {        
          items.push(
            <div>
              {item.quantity == 1
                ? generateSingleItem(item)
                : generateMultiItem(item)}
            </div>
          );
        }
        let key = `${company}-${quantity}`;  
        
        let len = Object.keys(props.nav.focusOrder.item_list[company][quantity])
        let qty = len.length       
        // console.log("teste", props.item.expandItems)
       
        quantities.push(
          <div>
            <div
              className="w-full cursor-pointer mt-2 p-2 pl-10 text-lg mx-0 bg-grey-light hover:bg-grey-lighter"
              onClick={() => {                
                props.expandItem({
                  item: key,
                  expandItems: props.item.expandItems                  
                });               
              }}
            >
              <span>
              {props.item.expandItems.includes(key) 
                ?
                  <FontAwesomeIcon icon={faAngleDown} className="fa-lg mr-2" /> 
                :
                  <FontAwesomeIcon icon={faAngleRight} className="fa-lg mr-2" /> 
                }
                {quantity} Packs</span> 
              
              <span className="text-right text-grey-dark pin-r"> - ({qty} {qty == 1 ? "Item" : "Items" })</span> 

            </div>
            {props.item.expandItems.includes(key) ? items : null}
          </div>
        );
      }
      let key = company;
      companies.push(
        <div>
          <div
            className="w-full cursor-pointer mt-2 p-2 pl-6 text-lg mx-0 bg-blue-new text-white hover:bg-grey-dark"
            onClick={() => {              
              props.expandItem({
                item: key,
                expandItems: props.item.expandItems                
              });            
            }}
          >
          {props.item.expandItems.includes(key) 
            ? 
              <FontAwesomeIcon icon={faAngleDown} className="fa-lg mr-2" /> 
            : 
              <FontAwesomeIcon icon={faAngleRight} className="fa-lg mr-2" /> 
            }
            {company}
          </div>
          {props.item.expandItems.includes(key) ? quantities : null}
        </div>
      );
    }

    return companies;
  };

  let showOrder = () => {
    let order = props.nav.focusOrder;
    if (order == null) return;
    return (
      <div>
        <div className="w-full bg-blue-new h-10 mb-6 inline-flex flex items-center">
          <div
            onClick={() => {
              props.toggleScreen();
              props.clearItem();
            }}
            className="w-1/3 h-10 inline-flex"
          >
            <h4 className="p-2 text-white px-4  uppercase text-lg bg-red flex items-center hover:bg-semi-transparent cursor-pointer">
              <FontAwesomeIcon icon={faAngleLeft} className="fa-2x mr-4" />
              Back
            </h4>
          </div>
          <div className="w-1/3 text-center text-white font-bold text-lg">
            <p>{props.nav.focusCompany.name.toUpperCase()}</p>
          </div>
          <div className="w-1/3 text-right mr-6">
            <h4 className="p-2 text-white uppercase text-lg">
              #{order.invoice_number} order
            </h4>
          </div>
        </div>
        <div className="inline-block w-full h-650 bg-white text-black overflow-y-auto">
          <div className="inline-flex w-full absolute pin-l pin-t p-1 mt-10 bg-grey-darker uppercase text-white text-sm">
            <div 
            style={{width:"40%"}}
            className="w-1/4 pl-24">Description</div>
            <div 
            style={{width:"20%"}}
            className="w-1/4 pl-10">Strain Code</div>
            <div 
            style={{width:"30%"}}
            className="w-1/4 pl-24">STT Number</div>
            <div 
            style={{width:"10%"}}
            className="w-1/4">Quantity</div>
          </div>
          {populateItems(order.item_list)}
        </div>
      </div>
    );
  };

  return (
   
    <div
      style={{
        // borderRadius: "10px",
        overflow: "hidden",
        background: "whitesmoke",
        boxShadow: "0px 0px 10px #cecece"
      }}
      className="w-newScreen h-newScreen bg-white z-50 mt-6 align-absolute"
    >
      {showOrder()}
      <div
        className="w-40 p-1 pin-b pin-r bg-blue-new absolute mr-8 mb-4 cursor-pointer hover:bg-blue"
        onClick={() => {
          props.verifyItemList({
            itemList: props.item.itemValues,
            order: props.nav.focusOrder
          });
        }}
      >
        <p className="uppercase p-2 text-center text-white font-bold">
          Finalize
        </p>
      </div>
      <div
        className="w-40 p-1 pin-b pin-l ml-4 text-black absolute mr-8 mb-4 cursor-pointer hover:bg-blue"        
      >  <p>Total Packages: {props.nav.focusOrder != null ? props.nav.focusOrder.total_items : ""}</p>       
        
      </div> {console.log(props)}
    </div>
  );
};

export default Screen;
