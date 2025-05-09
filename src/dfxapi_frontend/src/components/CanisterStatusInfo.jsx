import React from "react";
import CanisterStatus from "./CanisterStatus";

function CanisterStatusInfo(props) {

    const listOfCanisters = props.canisters;

    return (
        <div className="component">
            <h2>Canister Status</h2>
            {listOfCanisters ? listOfCanisters.map((item, index) => {
                return <CanisterStatus key={index} name={item} />
            }) : <br />}
        </div>
    );
}

export default CanisterStatusInfo;