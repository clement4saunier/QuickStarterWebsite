import React from "react";
import axios from "axios";

export function useStartonFundingContract(address) {
  const base = "https://api.starton.io/v2";

  const readValue = async (functionName, params) => {
    var data = JSON.stringify({
      functionName: functionName,
      params: params
    });

    var config = {
      method: "post",
      url: base + "/smart-contract/ethereum-ropsten/" + address + "/read",
      withCredentials: false,
      headers: {
        "x-api-key": "1A9iBu2ZpAPX4KLJsBxjrsCbzaEntwL9",
        "Content-Type": "application/json",
      },
      data: data
    };

    try {
      const req = await axios(config);

      return req.data.response;
    } catch (err) {
        console.error(err);
      return err;
    }
  };

  return { readValue };
}
