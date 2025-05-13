import React from "react";
import ExportPEM from "./ExportPEM";

function ExportIdentities(props) {

    const identities = props.list;

    return (
        <div className="component">
            <h2>Identity Export</h2>
            <table className="dfx-table">
                <thead>
                    <tr>
                        <th className="dfx-th">Canister</th>
                        <th className="dfx-th">PEM</th>
                    </tr>
                </thead>
                <tbody>
                    {identities ? identities.map((name, index) => {
                        return (
                            <tr key={index}>
                                <td className="dfx-td">{name}</td>
                                <td className="dfx-td"><ExportPEM name={name} /></td>
                            </tr>
                        );
                    }) : <tr></tr>}
                </tbody>
            </table >
        </div>
    );
}

export default ExportIdentities;