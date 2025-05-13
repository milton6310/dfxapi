import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Icrc1Ledger "canister:icrc1_ledger_canister";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Blob "mo:base/Blob";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import IC "ic:aaaaa-aa";

//Actor
actor DfxAPI {

  private type Listing = {
    itemOwner: Principal;
    itemPrice: Nat;
  };

  var mapOfNFTs = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
  var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
  var mapofListings = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

  public shared(msg) func mint(imageData: [Nat8], name: Text) : async Principal {
    let owner : Principal = msg.caller;
    Debug.print(debug_show(owner));

    Debug.print(debug_show(Cycles.balance()));
    Cycles.add<system>(801_000_000_000);
    let newNFT = await NFTActorClass.NFT(name, owner, imageData);
    Debug.print(debug_show(Cycles.balance()));

    let newNFTPrincipal = await newNFT.getCanisterId();
    mapOfNFTs.put(newNFTPrincipal, newNFT);
    addToOwnershipMap(owner, newNFTPrincipal);

    return newNFTPrincipal;
  };

  private func addToOwnershipMap(owner: Principal, nftId: Principal) {
    var ownedNFTs : List.List<Principal> = switch(mapOfOwners.get(owner)) {
      case(null) {List.nil<Principal>()};
      case(?result) {result};
    };
    ownedNFTs := List.push(nftId, ownedNFTs);
    mapOfOwners.put(owner, ownedNFTs);
  };

  public query func getOwnedNFTs(user: Principal) : async [Principal] {
    var userNFTs : List.List<Principal> = switch(mapOfOwners.get(user)) {
      case(null) {List.nil<Principal>()};
      case(?result) {result};
    };
    return List.toArray(userNFTs);
  };

  public query func getListedNFTs() : async [Principal] {
    let ids = Iter.toArray(mapofListings.keys());
    return ids;
  };

  public shared(msg) func listItem(id: Principal, price: Nat) : async Text {
    var item : NFTActorClass.NFT = switch(mapOfNFTs.get(id)) {
      case (null) { return "NFT does not exist." };
      case (?result) { result };
    };
    let owner = await item.getOwner();
    if (Principal.equal(owner, msg.caller)) {
      let newListing : Listing = {
        itemOwner = owner;
        itemPrice = price;
      };
      mapofListings.put(id, newListing);
      return "Success";
    } else {
      return "You don't have NFTs.";
    }
  };

  public query func getCanisterID() : async Principal {
    return Principal.fromActor(DfxAPI);
  };

  public query func isListed(id: Principal) : async Bool {
    if (mapofListings.get(id) == null) {
      return false;
    } else {
      return true;
    }
  };

  public query func getOriginalOwner(id: Principal) : async Principal {
    var listing : Listing = switch(mapofListings.get(id)) {
      case (null) { return Principal.fromText("") };
      case (?result) { result };
    };
    return listing.itemOwner;
  };

  public query func getListedNFTPrice(id: Principal) : async Nat {
    var listing : Listing = switch(mapofListings.get(id)) {
      case (null) { return 0 };
      case (?result) { result };
    };
    return listing.itemPrice;
  };

  public shared(msg) func completePurchase(id: Principal, ownerId: Principal, newOwnerId: Principal) : async Text {
    if (Principal.equal(ownerId, msg.caller)) {
      Debug.print("owner id is equal to msg.caller");
    };
    var purchasedNFT : NFTActorClass.NFT = switch(mapOfNFTs.get(id)) {
      case (null) {return "NFT does not exist."};
      case (?result) {result};
    };
    let transferResult = await purchasedNFT.transferOwnership(newOwnerId);
    if (transferResult == "Success") {
      mapofListings.delete(id);
      var ownedNFTs : List.List<Principal> = switch(mapOfOwners.get(ownerId)) {
        case (null) {List.nil<Principal>()};
        case (?result) {result};
      };
      ownedNFTs := List.filter(ownedNFTs, func (listItemId: Principal) : Bool {
        return listItemId != id;
      });
      addToOwnershipMap(newOwnerId, id);
      return "Success";
    } else {
      return transferResult;
    }
  };

  type TransferArgs = {
    amount : Nat;
    toAccount : Icrc1Ledger.Account;
  };

  public shared ({ caller }) func transferFromCaller(args : TransferArgs) : async Result.Result<Icrc1Ledger.BlockIndex, Text> {
    Debug.print(
      "Transferring "
      # debug_show (args.amount)
      # " tokens to account"
      # debug_show (args.toAccount)
    );

    let transferFromArgs : Icrc1Ledger.TransferFromArgs = {
      // the account we want to transfer tokens from (in this case we assume the caller approved the canister to spend funds on their behalf)
      from = {
        owner = caller;
        subaccount = null;
      };
      // can be used to distinguish between transactions
      memo = null;
      // the amount we want to transfer
      amount = args.amount;
      // the subaccount we want to spend the tokens from (in this case we assume the default subaccount has been approved)
      spender_subaccount = null;
      // if not specified, the default fee for the canister is used
      fee = null;
      // we take the principal and subaccount from the arguments and convert them into an account identifier
      to = args.toAccount;
      // a timestamp indicating when the transaction was created by the caller; if it is not specified by the caller then this is set to the current ICP time
      created_at_time = null;
    };

    try {
      // initiate the transfer
      let transferFromResult = await Icrc1Ledger.icrc2_transfer_from(transferFromArgs);

      // check if the transfer was successfull
      switch (transferFromResult) {
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

  //This method sends a GET request to a URL with a free API we can test.
  //This method returns Coinbase data on the exchange rate between USD and ICP
  //for a certain day.
  //The API response looks like this:
  //  [
  //     [
  //         1682978460, <-- start timestamp
  //         5.714, <-- lowest price during time range
  //         5.718, <-- highest price during range
  //         5.714, <-- price at open
  //         5.714, <-- price at close
  //         243.5678 <-- volume of ICP traded
  //     ],
  // ]

  //function to transform the response
  public query func transform({
    context : Blob;
    response : IC.http_request_result;
  }) : async IC.http_request_result {
    {
      response with headers = []; // not intersted in the headers
    };
  };

  public func get_icp_usd_exchange() : async Text {

    //1. SETUP ARGUMENTS FOR HTTP GET request
    let ONE_MINUTE : Nat64 = 60;
    let start_timestamp : Nat64 = 1682978460; //May 1, 2023 22:01:00 GMT
    let host : Text = "api.exchange.coinbase.com";
    let url = "https://" # host # "/products/ICP-USD/candles?start=" # Nat64.toText(start_timestamp) # "&end=" # Nat64.toText(start_timestamp) # "&granularity=" # Nat64.toText(ONE_MINUTE);

    // 1.2 prepare headers for the system http_request call
    let request_headers = [
      { name = "User-Agent"; value = "price-feed" },
    ];

    // 1.3 The HTTP request
    let http_request : IC.http_request_args = {
      url = url;
      max_response_bytes = null; //optional for request
      headers = request_headers;
      body = null; //optional for request
      method = #get;
      transform = ?{
        function = transform;
        context = Blob.fromArray([]);
      };
    };

    //2. ADD CYCLES TO PAY FOR HTTP REQUEST

    //IC management canister will make the HTTP request so it needs cycles
    //See: https://internetcomputer.org/docs/current/motoko/main/cycles

    //The way Cycles.add() works is that it adds those cycles to the next asynchronous call
    //See:
    // - https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request
    // - https://internetcomputer.org/docs/current/references/https-outcalls-how-it-works#pricing
    // - https://internetcomputer.org/docs/current/developer-docs/gas-cost
    Cycles.add<system>(230_949_972_000);

    //3. MAKE HTTPS REQUEST AND WAIT FOR RESPONSE
    let http_response : IC.http_request_result = await IC.http_request(http_request);

    //4. DECODE THE RESPONSE

    //As per the type declarations, the BODY in the HTTP response
    //comes back as Blob. Type signature:

    //public type http_request_result = {
    //     status : Nat;
    //     headers : [HttpHeader];
    //     body : Blob;
    // };

    //We need to decode that Blob that is the body into readable text.
    //To do this, we:
    //  1. Use Text.decodeUtf8() method to convert the Blob to a ?Text optional
    //  2. We use a switch to explicitly call out both cases of decoding the Blob into ?Text
    let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
      case (null) { "No value returned" };
      case (?y) { y };
    };

    //5. RETURN RESPONSE OF THE BODY
    //The API response will looks like this:
    //
    // ("[[1682978460,5.714,5.718,5.714,5.714,243.5678]]")
    //
    //The API response looks like this:
    //  [
    //     [
    //         1682978460, <-- start timestamp
    //         5.714, <-- lowest price during time range
    //         5.718, <-- highest price during range
    //         5.714, <-- price at open
    //         5.714, <-- price at close
    //         243.5678 <-- volume of ICP traded
    //     ],
    // ]
    decoded_text;
  };

  //PULIC METHOD
  //This method sends a POST request to a URL with a free API we can test.
  public func send_http_post_request() : async Text {

    //1. SETUP ARGUMENTS FOR HTTP GET request

    // 1.1 Setup the URL and its query parameters
    //This URL is used because it allows us to inspect the HTTP request sent from the canister
    let host : Text = "putsreq.com";
    let url = "https://putsreq.com/aL1QS5IbaQd4NTqN3a81"; //HTTP that accepts IPV6

    // 1.2 prepare headers for the system http_request call

    //idempotency keys should be unique so we create a function that generates them.
    let idempotency_key : Text = generateUUID();
    let request_headers = [
      { name = "User-Agent"; value = "http_post_sample" },
      { name = "Content-Type"; value = "application/json" },
      { name = "Idempotency-Key"; value = idempotency_key },
    ];

    // The request body is a Blob, so we do the following:
    // 1. Write a JSON string
    // 2. Convert Text into a Blob
    let request_body_json : Text = "{ \"name\" : \"Grogu\", \"force_sensitive\" : \"true\" }";
    let request_body = Text.encodeUtf8(request_body_json);

    // 1.3 The HTTP request
    let http_request : IC.http_request_args = {
      url = url;
      max_response_bytes = null; //optional for request
      headers = request_headers;
      //note: type of `body` is ?Blob so we pass it here as "?request_body" instead of "request_body"
      body = ?request_body;
      method = #post;
      transform = ?{
        function = transform;
        context = Blob.fromArray([]);
      };
    };

    //2. ADD CYCLES TO PAY FOR HTTP REQUEST

    //IC management canister will make the HTTP request so it needs cycles
    //See: https://internetcomputer.org/docs/current/motoko/main/cycles

    //The way Cycles.add() works is that it adds those cycles to the next asynchronous call
    //See: 
    // - https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request
    // - https://internetcomputer.org/docs/current/references/https-outcalls-how-it-works#pricing
    // - https://internetcomputer.org/docs/current/developer-docs/gas-cost
    Cycles.add<system>(230_850_258_000);

    //3. MAKE HTTPS REQUEST AND WAIT FOR RESPONSE
    let http_response : IC.http_request_result = await IC.http_request(http_request);

    //4. DECODE THE RESPONSE

    //As per the type declarations, the BODY in the HTTP response
    //comes back as Blob. Type signature:

    //public type http_request_result = {
    //     status : Nat;
    //     headers : [HttpHeader];
    //     body : Blob;
    // };

    //We need to decode that Blob that is the body into readable text.
    //To do this, we:
    //  1. Use Text.decodeUtf8() method to convert the Blob to a ?Text optional
    //  2. We use a switch to explicitly call out both cases of decoding the Blob into ?Text
    let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
      case (null) { "No value returned" };
      case (?y) { y };
    };

    //5. RETURN RESPONSE OF THE BODY
    let result : Text = decoded_text # ". See more info of the request sent at: " # url # "/inspect";
    result;
  };

  //PRIVATE HELPER FUNCTION
  //Helper method that generates a Universally Unique Identifier
  //this method is used for the Idempotency Key used in the request headers of the POST request.
  //For the purposes of this exercise, it returns a constant, but in practice it should return unique identifiers
  func generateUUID() : Text {
    "UUID-123456789";
  };
};
