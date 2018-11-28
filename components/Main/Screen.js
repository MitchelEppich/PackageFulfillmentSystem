import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faInfo,
  faAngleLeft,
  faAngleDown
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
        className="inline-flex flex bg-white items-center w-full mx-auto my-2 p-1"
        key={item.name}
      >
        <div
          style={{
            width: "50%"
          }}
          className=""
        >
          <p className="text-lg ml-12">{item.description}</p>
        </div>
        <div
          style={{
            width: "35%"
          }}
          className="inline-flex ml-4 flex items-center"
        >
          <div style={{ width: "180px" }}>
            <label className="mr-2">Complete here:</label>
          </div>
          <div className="w-32">
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
                className="ml-2 p-3 px-1"
              />
            </p>
          </div>
        </div>
        <div
          style={{
            width: "15%"
          }}
          className=""
        >
          <p className="flex items-center">{item.quantity} Package</p>
        </div>
      </div>
    );
  };

  let generateSubItem = (itemRef, number, name, value) => {
    console.log(value);
    let _used = false;
    let item = (
      <div
        className="bg-semi-transparent w-full flex items-center mt-1 h-12 inline-flex"
        key={`${name}${number + 1}`}
      >
        <div className="w-1/2 pl-16">
          <p>Package #{number + 1}</p>
        </div>
        <div className="w-1/2 inline-flex flex pl-2 items-center">
          <div style={{ width: "180px" }}>
            <label className="mr-2">Complete here:</label>
          </div>
          <div className="w-32">
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
                className="ml-2 p-3 px-1"
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
        className="bg-white items-center w-full mx-auto my-2 p-1"
        key={item.name}
      >
        <div className="inline-flex w-full flex items-center">
          <div
            style={{
              width: "50%"
            }}
            className="flex items-center cursor-pointer hover:opacity-50"
            onClick={() => {
              props.expandItem({
                item: item.name,
                expandItems: props.item.expandItems
              });
            }}
          >
            <p className="text-lg ml-10 flex items-center">
              <FontAwesomeIcon icon={faAngleDown} className="fa-lg mr-2" />
              {item.description}
            </p>
          </div>
          <div
            style={{
              width: "35%"
            }}
            className="ml-4 flex items-center inline-flex"
          >
            <div style={{ width: "180px" }}>
              <label className="mr-2">Insert Base Value:</label>
            </div>
            <div className="w-32">
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
                  size="3"
                  name="rangeMin"
                  placeholder="XXXX"
                  maxLength="4"
                  className="p-3 ml-2 px-1 mr-5"
                />
              </p>
            </div>
          </div>
          <div
            style={{
              width: "15%"
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

  let populateItems = items => {
    let arr = [];
    for (let item of items) {
      arr.push(
        item.quantity == 1 ? generateSingleItem(item) : generateMultiItem(item)
      );
    }
    return arr;
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
            <h4 className="p-2 text-white uppercase text-lg bg-red flex items-center hover:bg-semi-transparent cursor-pointer">
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
            <div className="w-1/2 pl-24">Strain Name</div>
            <div className="w-1/2">STT Number</div>
          </div>
          {populateItems(order.item_list)}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        borderRadius: "10px",
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
    </div>
  );
};

export default Screen;
