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
                <table className="dfx-table">
                    <thead>
                        <tr>
                            <th className="dfx-th">Item</th>
                            <th className="dfx-th">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="dfx-td" style={{ whiteSpace: "nowrap" }}>Ledger ID</td>
                            <td className="dfx-td">{id}</td>
                        </tr>
                        <tr>
                            <td className="dfx-td" style={{ whiteSpace: "nowrap" }}>Balance</td>
                            <td className="dfx-td">{balance}</td>
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
        <div className="component">
            <h2>Ledger</h2>
            {ledgerInfo}
        </div>
    );
}

export default Ledger;