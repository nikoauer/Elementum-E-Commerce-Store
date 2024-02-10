import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../../redux/api/productAPISlice";
import {
  setCategories,
  setChecked,
  setProducts,
} from "../../redux/features/shop/shopSlice";
import Loader from "../../components/Loader";
import { useFetchallCategoriesQuery } from "../../redux/api/categoryAPISlice";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchallCategoriesQuery();
  const [priceFilter, setPriceFilter] = useSelector("");
  const getFilteredProducts = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if(!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data))
    }
  }, [categoriesQuery.data, dispatch])

  useEffect(() => {
    if(!checked.length || !radio.length) {
      if(!getFilteredProducts.isLoading) {
        const filteredProducts = getFilteredProducts.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
          )
        }
        )
        dispatch(setProducts(filteredProducts))
      }
    }
  })


  const handleBrand = (brand) => {
    const productsByBrand = getFilteredProducts.data?.filter(
      (product) => product.brand === brand
    )
    dispatch(setProducts(productsByBrand))
  }

  const handleCheck = (value, id) => {
    const updatedCheck = value ? [...checked, id] : checked.filter((c) => c !== id)
    dispatch(setChecked(updatedCheck))
  }

  const 

  return <div>Shop</div>;
};

export default Shop;
