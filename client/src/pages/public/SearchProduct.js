import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { Pagination, Product } from "../../components";

const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 2,
  300: 2,
};

const SearchProduct = ({productSearch}) => {
 
 
    console.log(productSearch);
  
  const [products, setProducts] = useState(null);
  const fetchProduct = async () => {
    
  };
  
  

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-[calc(100%-20px)] md:w-main bg-white rounded">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid flex mb-[20px]"
        columnClassName="my-masonry-grid_column "
      >
        {products?.products?.map((element) => (
          <Product key={element._id} pid={element.id} productData={element} />
        ))}
      </Masonry>
    </div>
  );
};

export default SearchProduct;
