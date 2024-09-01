"use client";

import * as React from "react";
import { fetchData } from "../tools/api";
import { Stock } from "../lib/types";
import { getStocksAPIResponse } from "../api-calls/stock";

export default function Home() {

  const [stocks, setStocks] = React.useState<Stock[]>([]);

  // const callAPI = async() => {
  //   try {
  //     const res = await axios.get("http://127.0.0.1:8000/polls/stocks/");
  //     const data = res.data;
  //     console.log(data);
  //     setStocks(data);
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  React.useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await getStocksAPIResponse();
        console.log(response.data)
        setStocks(response.data)
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, [])

  return (
    <>
      Stocks
      <ul>
        {stocks.map((stock, index) => (
          <div key = {index}>
            <li>{stock.id}</li>
            <li>{stock.name}</li>
            <li>{stock.total_volume}</li>
            <li>{stock.unallocated}</li>
            <li>{stock.price}</li>
            <li>{stock.sector}</li>
          </div>
        ))}
      </ul>
    </>
  );
}
