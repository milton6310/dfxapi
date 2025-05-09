import React from "react";
import ExportPEM from "./ExportPEM";

function ExportIdentities(props) {

    const identities = props.list;

    return (
        <div className="component">
            <h2>Identity Export</h2>
            <table>
                <thead>
                    <tr>
                        <th>Canister</th>
                        <th>PEM</th>
                    </tr>
                </thead>
                <tbody>
                    {identities ? identities.map((name, index) => {
                        return (
                            <tr key={index}>
                                <td>{name}</td>
                                <td><ExportPEM name={name} /></td>
                            </tr>
                        );
                    }) : <tr></tr>}
                </tbody>
            </table >
        </div>
    );
}

export default ExportIdentities;