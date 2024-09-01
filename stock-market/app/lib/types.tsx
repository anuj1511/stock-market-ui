export type loginCreds = {
	email: string,
	password: string
}

export type signupCreds = {
	first_name: string,
	last_name: string,
	email: string,
	password: string
}

export type Stock = {
  id: number;
  name: string;
  total_volume: string;
  unallocated: string;
  price: string;
  sector: number;
}