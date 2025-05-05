import React, { useState, useEffect } from "react";
import axios from "axios";

function AddFabricatedCycles(props) {

    const [balance, setBalance] = useState([]);
    const [isDisabled, setDisabled] = useState(false);

    async function getCanisterCycles() {
        try {
            const response = await axios.get(`http://localhost:5000/canister-status/${props.name}`, {
                mode: "cors",
            });
            const items = response.data.others;
            const balance = items.filter((item, index) => item.item == "Balance");
            setBalance(balance[0].value);
        } catch (error) {
            console.log(error);
        }
    }

    async function addCanisterCycles() {
        try {
            const response = await axios.get(`http://localhost:5000/ledger-fab-cycles/${props.name}`, {
                mode: "cors",
            });
            const cycles = response.data.cycles;
            setBalance(cycles.upTo);
            setDisabled(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCanisterCycles();
    }, []);

    function handleButtonClick() {
        setDisabled(true);
        addCanisterCycles();
    }

    return (
        <div>
            <button type="button" onClick={handleButtonClick} disabled={isDisabled}>Add Fabricated Cycles</button>{props.name} : {balance}
        </div>
    );
}

export default AddFabricatedCycles;