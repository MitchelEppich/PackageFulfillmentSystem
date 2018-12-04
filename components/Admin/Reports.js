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

        </div>
    )
}

export default Reports