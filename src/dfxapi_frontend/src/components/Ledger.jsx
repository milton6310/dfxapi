import React, { useEffect, useState } from "react";
import axios from "axios";

function Ledger() {

    const [ledgerInfo, setLedgerInfo] = useState();

    async function getLedgerInfo() {
        try {
            let response = await axios.get("http://localhost:5000/ledger-id", {
                mode: "cors",
            });
            const id = response.data.ledgerId;

            response = await axios.get("http://localhost:5000/ledger-balance", {
                mode: "cors",
            });
            const balance = response.data.ledgerBalance;

            setLedgerInfo(
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ledger ID</td>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <td>Balance</td>
                            <td>{balance}</td>
                        </tr>
                    </tbody>
                </table>
            );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLedgerInfo();
    }, []);

    return (
        <div>
            <h2>Ledger</h2>
            {ledgerInfo}
        </div>
    );
}

export default Ledger;