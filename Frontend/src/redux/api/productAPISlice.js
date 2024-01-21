import { PRODUCT_URL, UPLOAD_URL } from "../features/constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword }) => ({
            url: `${ PRODUCT_URL }`,
            params: { keyword } 
            }),

            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),

        getProductById: builder.query({
            query: (productId) => `${PRODUCT_URL}/${productId}`,
            providesTags: (result, error, productId) => [
                {type: "Product", id: productId}
            ],
        }),

        allProducts: builder.query({
            query: () => `${PRODUCT_URL}/allproducts`
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),

        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}`,
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["Product"]
        })

    })
})