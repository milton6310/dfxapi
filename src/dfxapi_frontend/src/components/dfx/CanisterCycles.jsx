import React from "react";
import AddFabricatedCycles from "./AddFabricatedCycles";

function CanisterCycles(props) {

    const listOfCanisters = props.canisters;

    return (
        <div className="component">
            <h2>Cycles</h2>
            {listOfCanisters ? listOfCanisters.map((item, index) => {
                return <AddFabricatedCycles key={index} name={item} />
            }) : <br />}
        </div>
    );
}

export default CanisterCycles;