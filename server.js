import express from "express";
import bodyParser from "body-parser";
import { exec } from "child_process";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function executeDfx(cmd) {
    return new Promise(function (resolve, reject) {
        exec(cmd, (err, stdout, stderr) => {
            const output = stdout ? stdout.split('\n') : [];
            const response = {
                err: err,
                stdout: output,
                stderr: stderr
            };
            resolve(JSON.stringify(response));
        });
    });
}

function readDfxJson() {
    return new Promise(function (resolve, reject) {
        const inputFilePath = path.join(process.cwd(), 'dfx.json');
        fs.readFile(inputFilePath, "utf8", (err, data) => {
            resolve(data);
        });
    });
}

function linesToArray(lines) {
    let items = [];
    for (const line of lines) {
        if (line.length > 0) {
            items.push(line);
        }
    }
    return items;
}

function getCleanLine(line) {
    return line.replace(/\x1B(\[[0-9;]*[JKmsu]|\(B)/g, "");
}

app.get("/canister-list", async (req, res) => {
    try {
        const dfx = JSON.parse(await readDfxJson());
        const keys = Object.keys(dfx["canisters"]);
        const result = {
            list: keys,
            ...dfx
        };
        res.send(result);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/id-list", async (req, res) => {
    try {
        const cmd = "dfx identity list";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        // const result = linesToArray(output.stdout);
        const result = linesToArray(output.stdout).filter((item) => item != "IDENTITY_NAME");
        res.json({
            identity: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/ping", async (req, res) => {
    try {
        const cmd = "dfx ping";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        const result = JSON.parse(output.stdout.join(""));
        res.send(result);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/schema", async (req, res) => {
    try {
        const cmd = "dfx schema";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        const result = JSON.parse(output.stdout.join(""));
        res.send(result);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/whoami", async (req, res) => {
    try {
        const cmd = "dfx identity whoami";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        const result = linesToArray(output.stdout);
        res.json({
            identity: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/get-principal", async (req, res) => {
    try {
        const cmd = "dfx identity get-principal";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        const result = linesToArray(output.stdout);
        res.json({
            principal: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/wallet-balance", async (req, res) => {
    try {
        const cmd = "dfx wallet balance";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        let result = linesToArray(output.stdout);
        if (result.length == 0 && output.stderr != null) {
            result = [getCleanLine(output.stderr)];
        }
        res.json({
            walletBalance: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/wallet-addresses", async (req, res) => {
    try {
        const cmd = "dfx wallet addresses";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        let result = linesToArray(output.stdout);
        if (result.length == 0 && output.stderr != null) {
            result = [getCleanLine(output.stderr)];
        }
        res.json({
            walletAddresses: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/wallet-controllers", async (req, res) => {
    try {
        const cmd = "dfx wallet controllers";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        let result = linesToArray(output.stdout);
        if (result.length == 0 && output.stderr != null) {
            result = [getCleanLine(output.stderr)];
        }
        res.json({
            walletControllers: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/wallet-custodians", async (req, res) => {
    try {
        const cmd = "dfx wallet custodians";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        let result = linesToArray(output.stdout);
        if (result.length == 0 && output.stderr != null) {
            result = [getCleanLine(output.stderr)];
        }
        res.json({
            walletCustodians: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/wallet-name", async (req, res) => {
    try {
        const cmd = "dfx wallet name";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        let result = linesToArray(output.stdout);
        if (result.length == 0 && output.stderr != null) {
            result = [getCleanLine(output.stderr)];
        }
        res.json({
            walletName: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/ledger-id", async (req, res) => {
    try {
        const cmd = "dfx ledger account-id";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        const result = linesToArray(output.stdout);
        res.json({
            ledgerId: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/ledger-balance", async (req, res) => {
    try {
        const cmd = "dfx ledger balance";
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        let result = linesToArray(output.stdout);
        if (result.length == 0 && output.stderr != null) {
            result = [getCleanLine(output.stderr)];
        }
        res.json({
            ledgerBalance: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/ledger-fab-cycles/:id", async (req, res) => {
    try {
        const cmd = `dfx ledger fabricate-cycles --canister ${req.params.id}`;
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        let result = linesToArray(output.stdout);
        if (result.length == 0 && output.stderr != null) {
            const items = output.stderr.split(" ");
            let fabricatedCycles;
            let updatedCycles;
            for (let i = 0; i < items.length; i += 1) {
                if (items[i].toLowerCase().indexOf("fabricated") > 0) {
                    fabricatedCycles = items[i + 1] + " cycles";
                } else if (items[i].toLowerCase() == "balance:") {
                    updatedCycles = items[i + 1] + " cycles";
                }
            }
            result = {
                addedBy: fabricatedCycles,
                upTo: updatedCycles
            };
        }
        res.json({
            canister: req.params.id,
            cycles: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/canister/:id", async (req, res) => {
    try {
        const cmd = `dfx canister id ${req.params.id}`;
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        const result = linesToArray(output.stdout);
        res.json({
            canister: req.params.id,
            ID: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/canister-url/:id", async (req, res) => {
    try {
        const cmd = `dfx canister url ${req.params.id}`;
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        const result = linesToArray(output.stdout);
        res.json({
            canister: req.params.id,
            URL: result
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/canister-info/:id", async (req, res) => {
    try {
        const cmd = `dfx canister info ${req.params.id}`;
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        let control = "";
        let hash = "";
        for (const line of output.stdout) {
            if (line.length > 0) {
                let items = line.split(":");
                switch (items[0]) {
                    case "Controllers": control = items[1].trim();
                    case "Module hash": hash = items[1].trim();
                }
            }
        }
        res.json({
            canisterID: req.params.id,
            controllers: control,
            moduleHash: hash
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/canister-status/:id", async (req, res) => {
    try {
        const cmd = `dfx canister status ${req.params.id}`;
        const response = await executeDfx(cmd);
        const output = JSON.parse(response);
        let details = [];
        let status = "";
        for (const line of output.stdout) {
            if (line.length > 0) {
                const items = line.split(":");
                if (items[1] != undefined) {
                    if (items[0] == "Status") {
                        status = items[1];
                    } else {
                        details.push({
                            item: items[0],
                            value: items[1].trim()
                        });
                    }
                }
            }
        }
        res.json({
            canister: req.params.id,
            status: status,
            others: details
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/pem/:id", async (req, res) => {
    try {
        const cmd = `dfx identity export ${req.params.id}`;
        const response = await executeDfx(cmd);
        const result = JSON.parse(response);
        res.json({
            identity: req.params.id,
            PEM: [result.stdout.join("")],
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.listen(port, () => {
    console.log(`Server started, running on Port ${port}.`);
});
