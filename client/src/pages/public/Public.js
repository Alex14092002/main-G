import React from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  Footer,
  Header,
  MobileToolbar,
  Navigation,
  UpperHeader,
} from "../../components";

const Public = () => {
  const [search ,setSearch ] = useState(null)
  const [productSearch, setProductSearch] = useState(null);

  const handleSearch = async () =>{
     
    try {
      if (search) {
        const data = {
          searchProduct: search,
        };
  
        const response = await fetch("http://localhost:5000/api/search/searchproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const result = await response.json();
         
          setProductSearch(result);
         
        } else {
          console.error("Yêu cầu không thành công.");
        }
      } else {
        console.error("Không tìm thấy giá trị 'keySearch' trong localStorage.");
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện yêu cầu: ", error);
    }

  }
  console.log(productSearch);

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center ">
        <UpperHeader />
        <Header setSearch={setSearch} handleSearch={handleSearch}  />
        <Navigation />
        <div className="w-full flex flex-col items-center bg-webBackground py-4">
          <Outlet productSearch={productSearch}  />
        </div>
        <Footer />
        <MobileToolbar />
      </div>
    </>
  );
};

export default Public;
