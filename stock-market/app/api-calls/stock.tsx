import { Stock } from "../lib/types";
import { fetchData } from "../tools/api";

export const getStocksAPIResponse = () => {
	return fetchData<Stock[]>("/stocks/");
}