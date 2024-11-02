import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import styles from "./ProductList.module.scss"; 
import { fetchProducts, getSaleProducts } from "../../services/api/productService"; 
import Pagination from "./PaginationProp"; 
import FilterSidebar from "./FilterSidebar";

function ProductList() {
  const location = useLocation(); 
  const [state, setState] = useState({
    isSale: location.state?.isSale || false,
    someOtherState: false // Bạn có thể thêm nhiều trạng thái khác ở đây
  });
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const limit = 16; 

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        let data;
        if (state.isSale) {
          data = await getSaleProducts(limit, currentPage);
        } else {
          data = await fetchProducts(1, currentPage);
        }
        setProducts(data.data.products);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        setError("Có lỗi xảy ra khi tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [currentPage, state]); // Chạy hàm mỗi khi currentPage hoặc state thay đổi

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  const updateState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  if (loading) return <p>Đang tải sản phẩm...</p>; 
  if (error) return <p>{error}</p>; 

  return (
    <div className={styles.mainContent}>
      <div className={styles.row}>
        <FilterSidebar />
        <div className={styles.productSection}>
          <div className={styles.productHeader}>
            <h2>Sản phẩm quà tặng</h2>
            <select className={styles.sortSelect}>
              <option>Sắp xếp: Mặc định</option>
            </select>
          </div>
          <div className={styles.productGrid}>
            {products.length === 0 ? (
              <p>Không có sản phẩm nào.</p>
            ) : (
              products.map((product) => (
                <div key={product._id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <img
                      src={
                        product.product_details.product_images[0]?.secure_url ||
                        "https://via.placeholder.com/300"
                      }
                      alt={product.product_name}
                    />
                    {product.product_isAvailable && (
                      <svg
                        className={styles.videoIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <h2 className={styles.productName}>{product.product_name}</h2>
                    <p className={styles.productPrice}>
                      {product.product_sale_price.toLocaleString("vi-VN")}đ
                    </p>
                    <p className={styles.productShortDescription}>
                      {product.product_short_description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />{" "}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
