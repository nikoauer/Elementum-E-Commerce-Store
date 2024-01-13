import { fetchBaseQuery, createApi } from "@redduxjs/toolkit/query/react";
import { BASE_URL } from "../features/constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
