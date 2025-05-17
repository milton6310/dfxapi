# `dfxapi`

This project has been created by Dfinity SDK to illustrate how to use API calls from React frontend to Motoko backend.

Start server.js with "nodemon server.js".

Postman collection of API calls is found under src/dfxapi_frontend/src/assets folder.

Change canister names in the Postman API calls with yours before use.

------------------------------------------------------------------------------------------------------------------------------

# NFT

# To Install and Run the Project

1. start local dfx

```
dfx start --clean
```

2. Run NPM server

```
npm start
```

3. Deploy canisters

Canister NFT id: uxrrr-q7777-77774-qaaaq-cai

CryptoDunk 1: ulvla-h7777-77774-qaacq-cai

2vxsx-fae

pxw5b-qjap2-nvhec-h6unt-kpsji-mwyed-4y5qb-mhzec-begqp-tziqs-uqe

```
dfx deploy nft --argument='("CryptoDunks #123", principal "pxw5b-qjap2-nvhec-h6unt-kpsji-mwyed-4y5qb-mhzec-begqp-tziqs-uqe", (vec {137; 80; 78; 71; 13; 10; 26; 10; 0; 0; 0; 13; 73; 72; 68; 82; 0; 0; 0; 10; 0; 0; 0; 10; 8; 6; 0; 0; 0; 141; 50; 207; 189; 0; 0; 0; 1; 115; 82; 71; 66; 0; 174; 206; 28; 233; 0; 0; 0; 68; 101; 88; 73; 102; 77; 77; 0; 42; 0; 0; 0; 8; 0; 1; 135; 105; 0; 4; 0; 0; 0; 1; 0; 0; 0; 26; 0; 0; 0; 0; 0; 3; 160; 1; 0; 3; 0; 0; 0; 1; 0; 1; 0; 0; 160; 2; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 160; 3; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 0; 0; 0; 0; 59; 120; 184; 245; 0; 0; 0; 113; 73; 68; 65; 84; 24; 25; 133; 143; 203; 13; 128; 48; 12; 67; 147; 94; 97; 30; 24; 0; 198; 134; 1; 96; 30; 56; 151; 56; 212; 85; 68; 17; 88; 106; 243; 241; 235; 39; 42; 183; 114; 137; 12; 106; 73; 236; 105; 98; 227; 152; 6; 193; 42; 114; 40; 214; 126; 50; 52; 8; 74; 183; 108; 158; 159; 243; 40; 253; 186; 75; 122; 131; 64; 0; 160; 192; 168; 109; 241; 47; 244; 154; 152; 112; 237; 159; 252; 105; 64; 95; 48; 61; 12; 3; 61; 167; 244; 38; 33; 43; 148; 96; 3; 71; 8; 102; 4; 43; 140; 164; 168; 250; 23; 219; 242; 38; 84; 91; 18; 112; 63; 0; 0; 0; 0; 73; 69; 78; 68; 174; 66; 96; 130;}))'
```

4. Head to localhost

http://localhost:8080/

# Minter Else HTML

```
 <div className="minter-container">
        <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
          Minted!
        </h3>
        <div className="horizontal-center">
        </div>
      </div>

```

# Loader HTML

```
<div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
```

# Button HTML

```
<div className="Chip-root makeStyles-chipBlue-108 Chip-clickable">
            <span
              onClick={}
              className="form-Chip-label"
            >
              Sell
            </span>
            </div>
```

# Price Input HTML

```
<input
        placeholder="Price in DANG"
        type="number"
        className="price-input"
        value={}
        onChange={}
      />
```

# Price Label HTML

```
<div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
          <span className="disChip-label">23 DANG</span>
        </div>
```

# Creating NFT for Testing

1. Mint an NFT on the command line to get NFT into mapOfNFTs:

```
dfx canister call dfxapi_backend mint '(vec {137; 80; 78; 71; 13; 10; 26; 10; 0; 0; 0; 13; 73; 72; 68; 82; 0; 0; 0; 10; 0; 0; 0; 10; 8; 6; 0; 0; 0; 141; 50; 207; 189; 0; 0; 0; 1; 115; 82; 71; 66; 0; 174; 206; 28; 233; 0; 0; 0; 68; 101; 88; 73; 102; 77; 77; 0; 42; 0; 0; 0; 8; 0; 1; 135; 105; 0; 4; 0; 0; 0; 1; 0; 0; 0; 26; 0; 0; 0; 0; 0; 3; 160; 1; 0; 3; 0; 0; 0; 1; 0; 1; 0; 0; 160; 2; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 160; 3; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 0; 0; 0; 0; 59; 120; 184; 245; 0; 0; 0; 113; 73; 68; 65; 84; 24; 25; 133; 143; 203; 13; 128; 48; 12; 67; 147; 94; 97; 30; 24; 0; 198; 134; 1; 96; 30; 56; 151; 56; 212; 85; 68; 17; 88; 106; 243; 241; 235; 39; 42; 183; 114; 137; 12; 106; 73; 236; 105; 98; 227; 152; 6; 193; 42; 114; 40; 214; 126; 50; 52; 8; 74; 183; 108; 158; 159; 243; 40; 253; 186; 75; 122; 131; 64; 0; 160; 192; 168; 109; 241; 47; 244; 154; 152; 112; 237; 159; 252; 105; 64; 95; 48; 61; 12; 3; 61; 167; 244; 38; 33; 43; 148; 96; 3; 71; 8; 102; 4; 43; 140; 164; 168; 250; 23; 219; 242; 38; 84; 91; 18; 112; 63; 0; 0; 0; 0; 73; 69; 78; 68; 174; 66; 96; 130;}, "CryptoDunks #123")'
```
returnedprincipal: ufxgi-4p777-77774-qaadq-cai
returnedprincipal: xhc3x-m7777-77774-qaaiq-cai

2. List the item into mapOfListings:

```
dfx canister call opend listItem '(principal "<REPLACE WITH NFT CANISTER ID>", 2)'

// minted principal
dfx canister call dfxapi_backend listItem '(principal "xhc3x-m7777-77774-qaaiq-cai", 2)'
```

3. Get OpenD canister ID:

```
dfx canister id dfxapi_backend
```
u6s2n-gx777-77774-qaaba-cai
uxrrr-q7777-77774-qaaaq-cai

4. Transfer NFT to OpenD:

```
dfx canister call <REPLACE WITH NFT CANISTER ID> transferOwnership '(principal "<REPLACE WITH OPEND CANISTER ID>", true)'
```
dfx canister call ufxgi-4p777-77774-qaadq-cai transferOwnership '(principal "u6s2n-gx777-77774-qaaba-cai", true)'
dfx canister call xhc3x-m7777-77774-qaaiq-cai transferOwnership '(principal "uxrrr-q7777-77774-qaaaq-cai", true)'

# Conneting to the Token Canister

1. Copy over the token declarations folder

2. Set the token canister id into the <REPLACE WITH TOKEN CANISTER ID>

```
const dangPrincipal = Principal.fromText("<REPLACE WITH TOKEN CANISTER ID>");

--------------------------------------------------------------------------------------------

# Token transfer

Token transfer is a canister that can transfer ICRC-1 tokens from its account to other accounts. It is an example of a canister that uses an ICRC-1 ledger canister. Sample code is available in [Motoko](https://github.com/dfinity/examples/tree/master/motoko/token_transfer) and [Rust](https://github.com/dfinity/examples/tree/master/rust/token_transfer).

## Architecture

The sample code revolves around one core transfer function which takes as input the amount of tokens to transfer, the `Account` to which to transfer tokens and returns either success or an error in case e.g. the token transfer canister doesn’t have enough tokens to do the transfer. In case of success, a unique identifier of the transaction is returned.

This sample will use the Motoko variant.

## Prerequisites
This example requires an installation of:

- [x] Install the [IC SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/index.mdx).

Begin by opening a terminal window.

## Step 1: Setup the project environment

Start a local instance of the Internet Computer and create a new project with the commands:

```bash
dfx start --background
dfx new --type=motoko token_transfer --no-frontend
cd token_transfer
```

## Step 2: Determine ICRC-1 ledger file locations

> [!TIP]
> [Learn more about how to setup the ICRC-1 ledger locally](https://internetcomputer.org/docs/current/developer-docs/defi/icrc-1/icrc1-ledger-setup)

Go to the [releases overview](https://dashboard.internetcomputer.org/releases) and copy the latest replica binary revision.

The URL for the ledger Wasm module is `https://download.dfinity.systems/ic/<REVISION>/canisters/ic-icrc1-ledger.wasm.gz`.

The URL for the ledger .did file is `https://raw.githubusercontent.com/dfinity/ic/<REVISION>/rs/rosetta-api/icrc1/ledger/ledger.did`.

**OPTIONAL:**
If you want to make sure, you have the latest ICRC-1 ledger files you can run the following script.

```sh
curl -o download_latest_icrc1_ledger.sh "https://raw.githubusercontent.com/dfinity/ic/69988ae40e4cc0db7ef758da7dd5c0606075e926/rs/rosetta-api/scripts/download_latest_icrc1_ledger.sh"
chmod +x download_latest_icrc1_ledger.sh
./download_latest_icrc1_ledger.sh
```

## Step 3: Configure the `dfx.json` file to use the ledger

Replace its contents with this but adapt the URLs to be the ones you determined in step 2:

```json
{
    "canisters": {
        "token_transfer_backend": {
            "main": "src/token_transfer_backend/main.mo",
            "type": "motoko",
            "dependencies": ["icrc1_ledger_canister"]
        },
        "icrc1_ledger_canister": {
            "type": "custom",
            "candid": "https://raw.githubusercontent.com/dfinity/ic/<REVISION>/rs/rosetta-api/icrc1/ledger/ledger.did",
            "wasm": "https://download.dfinity.systems/ic/<REVISION>/canisters/ic-icrc1-ledger.wasm.gz"
        }
    },
    "defaults": {
        "build": {
            "args": "",
            "packtool": ""
        }
    },
    "output_env_file": ".env",
    "version": 1
}
```

If you chose to download the ICRC-1 ledger files with the script, you need to replace the Candid and Wasm file entries:

```json
...
"candid": icrc1_ledger.did,
"wasm" : icrc1_ledger.wasm.gz,
  ...
```

## Step 4: Use the anonymous identity as the minting account

```bash
export MINTER=$(dfx --identity anonymous identity get-principal)
```

> [!TIP]
> Transfers from the minting account will create Mint transactions. Transfers to the minting account will create Burn transactions.


## Step 5: Record your default identity's principal to mint an initial balance to when deploying the ledger

```bash
export DEFAULT=$(dfx identity get-principal)
```

## Step 6: Deploy the ICRC-1 ledger locally

Take a moment to read the details of the call made below. Not only are you deploying an ICRC-1 ledger canister, you are also:

-   Setting the minting account to the anonymous principal you saved in a previous step (`MINTER`)
-   Minting 100 tokens to the DEFAULT principal
-   Setting the transfer fee to 0.0001 tokens
-   Naming the token Local ICRC1 / L-ICRC1

```bash
dfx deploy icrc1_ledger_canister --argument "(variant { Init =
record {
     token_symbol = \"ICRC1\";
     token_name = \"L-ICRC1\";
     minting_account = record { owner = principal \"${MINTER}\" };
     transfer_fee = 10_000;
     metadata = vec {};
     initial_balances = vec { record { record { owner = principal \"${DEFAULT}\"; }; 10_000_000_000; }; };
     archive_options = record {
         num_blocks_to_archive = 1000;
         trigger_threshold = 2000;
         controller_id = principal \"${MINTER}\";
     };
 }
})"
```

If successful, the output should be:

```bash
Deployed canisters.
URLs:
  Backend canister via Candid interface:
    icrc1_ledger_canister: http://127.0.0.1:4943/?canisterId=bnz7o-iuaaa-aaaaa-qaaaa-cai&id=mxzaz-hqaaa-aaaar-qaada-cai
```

## Step 7: Verify that the ledger canister is healthy and working as expected by using the command

> [!TIP]
> [Learn more about how to interact with the ICRC-1 ledger](https://internetcomputer.org/docs/current/developer-docs/defi/icrc-1/using-icrc1-ledger#icrc-1-and-icrc-1-extension-endpoints).

````bash
dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {
  owner = principal \"${DEFAULT}\";
  }
)"
```

The output should be:

```bash
(10_000_000_000 : nat)
````

## Step 8: Prepare the token transfer canister

Replace the contents of the `src/token_transfer_backend/main.mo` file with the following:

```motoko
import Icrc1Ledger "canister:icrc1_ledger_canister";
import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Error "mo:base/Error";

actor {

  type TransferArgs = {
    amount : Nat;
    toAccount : Icrc1Ledger.Account;
  };

  public shared func transfer(args : TransferArgs) : async Result.Result<Icrc1Ledger.BlockIndex, Text> {
    Debug.print(
      "Transferring "
      # debug_show (args.amount)
      # " tokens to account"
      # debug_show (args.toAccount)
    );

    let transferArgs : Icrc1Ledger.TransferArg = {
      // can be used to distinguish between transactions
      memo = null;
      // the amount we want to transfer
      amount = args.amount;
      // we want to transfer tokens from the default subaccount of the canister
      from_subaccount = null;
      // if not specified, the default fee for the canister is used
      fee = null;
      // the account we want to transfer tokens to
      to = args.toAccount;
      // a timestamp indicating when the transaction was created by the caller; if it is not specified by the caller then this is set to the current ICP time
      created_at_time = null;
    };

    try {
      // initiate the transfer
      let transferResult = await Icrc1Ledger.icrc1_transfer(transferArgs);

      // check if the transfer was successfull
      switch (transferResult) {
        case (#Err(transferError)) {
          return #err("Couldn't transfer funds:\n" # debug_show (transferError));
        };
        case (#Ok(blockIndex)) { return #ok blockIndex };
      };
    } catch (error : Error) {
      // catch any errors that might occur during the transfer
      return #err("Reject message: " # Error.message(error));
    };
  };
};

```

## Step 9: Deploy the token transfer canister

```bash
dfx deploy token_transfer_backend
```

## Step 10: Transfer funds to your canister

> [!TIP]
> Make sure that you are using the default `dfx` account that we minted tokens to in step 6 for the following steps.

Make the following call to transfer 10 tokens to the canister:

```bash
dfx canister call icrc1_ledger_canister icrc1_transfer "(record {
  to = record {
    owner = principal \"$(dfx canister id token_transfer_backend)\";
  };
  amount = 1_000_000_000;
})"
```

If successful, the output should be:

```bash
(variant { Ok = 1 : nat })
```

## Step 11: Transfer funds from the canister

Now that the canister owns tokens on the ledger, you can transfer 1 token from the canister to another account, in this case back to the default account:

```bash
dfx canister call token_transfer_backend transfer "(record {
  amount = 100_000_000;
  toAccount = record {
    owner = principal \"$(dfx identity get-principal)\";
  };
})"
```

## Security considerations and best practices

If you base your application on this example, we recommend you familiarize yourself with and adhere to the [security best practices](https://internetcomputer.org/docs/current/references/security/) for developing on the Internet Computer. This example may not implement all the best practices.

For example, the following aspects are particularly relevant for this app:

-   [Inter-canister calls and rollbacks](https://internetcomputer.org/docs/current/developer-docs/security/security-best-practices/overview), since issues around inter-canister calls (here the ledger) can e.g. lead to time-of-check time-of-use or double spending security bugs.
-   [Certify query responses if they are relevant for security](https://internetcomputer.org/docs/current/references/security/general-security-best-practices#certify-query-responses-if-they-are-relevant-for-security), since this is essential when e.g. displaying important financial data in the frontend that may be used by users to decide on future transactions. In this example, this is e.g. relevant for the call to `canisterBalance`.
-   [Use a decentralized governance system like SNS to make a canister have a decentralized controller](https://internetcomputer.org/docs/current/developer-docs/security/security-best-practices/overview), since decentralizing control is a fundamental aspect of decentralized finance applications.


------------------------------------------------------------------------------

Welcome to your new `dfxapi` project and to the Internet Computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with `dfxapi`, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd dfxapi/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
