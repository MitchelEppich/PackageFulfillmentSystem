import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { ResponsivePie, ResponsivePieCanvas } from "@nivo/pie";

import moment from "moment";

const Reports = props => {
  const theme = {
    axis: {
      textColor: "#eee",
      fontSize: "22px",
      tickColor: "#eee"
    },
    grid: {
      stroke: "#888",
      strokeWidth: 1
    }
  };

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
        <div className="inline-flex items-center justify-end w-full pr-6">
          <p className="pr-2">Select the period: </p>
          <input id="date" type="date" />
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
          className="w-1/2 mx-8 mt-4"
        >
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
              <div className="w-1/2 pl-4">744 packages</div>
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
          <div className="w-full p-2 text-right bg-grey-darker">
            <p className="text-white">Total: 7325 packages</p>
          </div>
          <div className="w-full h-300 mt-2 bg-white">
            <ResponsivePieCanvas
              data={[
                {
                  id: "cks",
                  label: "cks",
                  value: 115,
                  color: "hsl(337, 70%, 50%)"
                },
                {
                  id: "snm",
                  label: "snm",
                  value: 27,
                  color: "hsl(74, 70%, 50%)"
                },
                {
                  id: "sunw",
                  label: "sunw",
                  value: 23,
                  color: "hsl(30, 70%, 50%)"
                },
                {
                  id: "wholesale",
                  label: "wholesale",
                  value: 123,
                  color: "hsl(270, 70%, 50%)"
                },
                {
                  id: "bvr",
                  label: "bvr",
                  value: 32,
                  color: "hsl(134, 70%, 50%)"
                },
                {
                  id: "msjc",
                  label: "msjc",
                  value: 12,
                  color: "hsl(104, 20%, 10%)"
                }
              ]}
              margin={{
                top: 40,
                right: 160,
                bottom: 40,
                left: 80
              }}
              pixelRatio={1}
              theme={theme}
              innerRadius={0}
              padAngle={0}
              cornerRadius={1}
              colors="paired"
              colorBy="id"
              borderColor="inherit:darker(0.6)"
              radialLabelsSkipAngle={1}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor="inherit"
              slicesLabelsSkipAngle={1}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              legends={[
                {
                  anchor: "right",
                  direction: "column",
                  translateX: 120,
                  itemWidth: 60,
                  itemHeight: 14,
                  itemsSpacing: 2,
                  symbolSize: 14,
                  symbolShape: "circle"
                }
              ]}
            />
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
          className="w-1/2 mx-8 mt-4"
        >
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
              <div className="w-1/2 pl-8">Bernie</div>
              <div className="w-1/2 pl-4">443 packages</div>
            </div>
            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
              <div className="w-1/2 pl-8">Mitchel</div>
              <div className="w-1/2 pl-4">0.5 package</div>
            </div>
            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
              <div className="w-1/2 pl-8">Ellie</div>
              <div className="w-1/2 pl-4">3432 packages</div>
            </div>
            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
              <div className="w-1/2 pl-8">Andrea</div>
              <div className="w-1/2 pl-4">1465 packages</div>
            </div>
            <div className="inline-flex bg-grey-light w-full mt-1 p-2">
              <div className="w-1/2 pl-8">Tester</div>
              <div className="w-1/2 pl-4">12 packages</div>
            </div>
          </div>
          <div className="w-full p-2 text-right bg-grey-darker">
            <p className="text-white">Total: 4127 packages</p>
          </div>
          <div className="w-full h-300 mt-2 bg-white">
            <ResponsivePieCanvas
              data={[
                {
                  id: "karl",
                  label: "karl",
                  value: 6,
                  color: "hsl(47, 110%, 60%)"
                },
                {
                  id: "phil",
                  label: "phil",
                  value: 50,
                  color: "hsl(44, 20%, 80%)"
                },
                {
                  id: "denman",
                  label: "denman",
                  value: 95,
                  color: "hsl(120, 70%, 20%)"
                },
                {
                  id: "ellie",
                  label: "ellie",
                  value: 29,
                  color: "hsl(210, 70%, 50%)"
                },
                {
                  id: "andrea",
                  label: "andrea",
                  value: 44,
                  color: "hsl(134, 24%, 50%)"
                },
                {
                  id: "bernie",
                  label: "bernie",
                  value: 27,
                  color: "hsl(134, 70%, 50%)"
                }
              ]}
              margin={{
                top: 40,
                right: 160,
                bottom: 40,
                left: 80
              }}
              pixelRatio={1}
              innerRadius={0}
              padAngle={0}
              cornerRadius={1}
              colors="paired"
              colorBy="id"
              borderColor="inherit:darker(0.6)"
              radialLabelsSkipAngle={2}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor="inherit"
              slicesLabelsSkipAngle={2}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              legends={[
                {
                  anchor: "right",
                  direction: "column",
                  translateX: 80,
                  itemWidth: 90,
                  itemHeight: 14,
                  itemsSpacing: 2,
                  symbolSize: 14,
                  symbolShape: "circle"
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
