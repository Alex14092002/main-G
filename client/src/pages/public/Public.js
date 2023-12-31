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
import { useNavigate } from "react-router-dom";

const Public = () => {
  const [search ,setSearch ] = useState(null)
  const [productSearch, setProductSearch] = useState(null);
  const navigate = useNavigate(); 
  const handleSearch = async () =>{
   console.log(search);
    sessionStorage.setItem('keysearch' , search)
    window.location.href = 'http://localhost:3000/search'
    // navigate(`/search`);
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center ">
        <UpperHeader />
        <Header setSearch={setSearch} handleSearch={handleSearch}  />
        <Navigation />
        <div className="w-full flex flex-col items-center bg-webBackground py-4">
          <Outlet search={search}  />
        </div>
        <Footer />
        <MobileToolbar />
      </div>
    </>
  );
};

export default Public;
