import React, { useState, useEffect } from "react";
import "./search.css";

const Search = ({ data, setValidData }) => {
  const [searchName, setSearchName] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  useEffect(() => {
    search();
  }, [data, searchName, searchPrice]);

  const search = () => {
    try {
      let searchDatas = data;

      if (searchName) {
        searchDatas = searchDatas.filter((d) =>
          (d.name + "").toLowerCase().includes(searchName.toLowerCase()),
        );
      }

      if (searchPrice) {
        searchDatas = searchDatas.filter((d) =>
          (d.originalPrice + "").includes(searchPrice),
        );
      }

      setValidData(searchDatas);
    } catch (err) {
      console.log("Error in search:", err);
    }
  };

  return (
    <div className="card-search">
      <div className="search-group">
        <input
          type="text"
          className="search"
          placeholder="Tìm kiếm theo tên sản phẩm"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <div className="search-group">
        <input
          type="text"
          className="search"
          placeholder="Tìm kiếm theo giá gốc"
          value={searchPrice}
          onChange={(e) => setSearchPrice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
