// import React, { useState, useEffect, useCallback } from "react";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// import { Modal, Form, Input, Select, Button } from "antd";
// import Pagination from "../../../components/admin/pagination/Pagination";
// import Table from "../../../components/admin/table/Table";
// import Filter from "../../../components/admin/filter/Filter";
// import config from "../../../config";
// import {
//   getAllCategories,
//   getParentCategories,
//   createCategory,
//   getAllProducts,
//   //   deleteCategory,
// } from "../../../services/api/categoryService";

// const { Option } = Select;

// const AdminUserList = () => {
//   const [data, setData] = useState([]);
//   const [checkedRow, setCheckedRow] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [parentCategories, setParentCategories] = useState([]);
//   const [form] = Form.useForm();
//   const [proData, setProData] = useState([]);
//   const [validData, setValidData] = useState([]);
//   const [chooseRow, setChooseRow] = useState(null);
//   const [pageData, setPageData] = useState([]);
//   const [rowActive, setRowActive] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchData = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       // Lấy tất cả danh mục
//       const categories = await getAllCategories();
//       const categoriesArray = Array.isArray(categories) ? categories : [];
//       setData(categoriesArray);

//       // Lấy danh sách danh mục cha
//       let parentCats = [];
//       try {
//         parentCats = await getParentCategories();
//         if (!Array.isArray(parentCats)) {
//           console.error("parentCategories is not an array:", parentCats);
//           parentCats = [];
//         }
//       } catch (error) {
//         console.error("Error fetching parent categories:", error);
//         parentCats = [];
//       }
//       setParentCategories(parentCats);

//       // Lấy tất cả sản phẩm
//       const products = await getAllCategories();
//       const productsArray = Array.isArray(products.products)
//         ? products.products
//         : [];
//       setProData(productsArray);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setData([]);
//       setProData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const addCate = useCallback(
//     async (values) => {
//       try {
//         const res = await createCategory({
//           name: values.name,
//           slug: values.slug,
//           parentId: values.parentId || null,
//         });
//         if (res.status === 201) {
//           setModalVisible(false);
//           form.resetFields();
//           fetchData();
//           Swal.fire({
//             title: "Thêm thành công!",
//             icon: "success",
//             showConfirmButton: false,
//             timer: 1500,
//             timerProgressBar: true,
//           });
//         }
//       } catch (err) {
//         console.error("Error in addCate:", err);
//         Swal.fire({
//           title: "Thêm không thành công!",
//           text:
//             err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.",
//           icon: "error",
//           showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//         });
//       }
//     },
//     [fetchData, form],
//   );

//   //   const handleDeleteData = async () => {
//   //     try {
//   //       if (checkedRow.length === 0) {
//   //         Swal.fire({
//   //           title: "Thông báo!",
//   //           text: "Bạn chưa chọn dữ liệu cần xóa.",
//   //           icon: "info",
//   //           timer: 1500,
//   //           showConfirmButton: false,
//   //         });
//   //       } else {
//   //         Swal.fire({
//   //           title: "Nhắc nhở",
//   //           text: "Bạn có chắc chắn muốn xóa không?",
//   //           icon: "info",
//   //           showCancelButton: true,
//   //           confirmButtonText: "Xóa bỏ!",
//   //           cancelButtonText: "Hủy bỏ",
//   //           reverseButtons: true,
//   //           timerProgressBar: true,
//   //         }).then((result) => {
//   //           if (result.isConfirmed) {
//   //             deleteData(checkedRow);
//   //             Swal.fire({
//   //               title: "Xóa thành công!",
//   //               icon: "success",
//   //               timer: 1500,
//   //               showConfirmButton: false,
//   //             });
//   //           }
//   //         });
//   //       }
//   //     } catch (error) {
//   //       Swal.fire({
//   //         title: "Xóa thất bại!",
//   //         icon: "error",
//   //         showConfirmButton: false,
//   //         timer: 1500,
//   //         timerProgressBar: true,
//   //       });
//   //     }
//   //   };

//   //   const deleteData = async (ids) => {
//   //     try {
//   //       const res = await Promise.all(
//   //         ids.map(async (id) => {
//   //           await deleteCategory(id);
//   //           return true;
//   //         }),
//   //       );
//   //       if (res.every((success) => success)) {
//   //         document
//   //           .querySelectorAll("input[type='checkbox']")
//   //           .forEach((ckb) => (ckb.checked = false));
//   //         setCheckedRow([]);
//   //         setData(data.filter((d) => !checkedRow.includes(d.id)));
//   //       } else {
//   //         console.log("Lỗi xóa danh mục");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error deleting categories:", error);
//   //     }
//   //   };

//   const handleCheck = (e) => {
//     e.stopPropagation();
//     setCheckedRow(
//       Array.from(
//         document.querySelectorAll("input[name='ckb-data']:checked"),
//       ).map((checkbox) => {
//         return checkbox.value;
//       }),
//     );
//   };

//   const handleCheckAll = (e) => {
//     const checked = e.target.checked;
//     if (!checked) {
//       document
//         .querySelectorAll("input[type='checkbox']")
//         .forEach((ckb) => (ckb.checked = false));
//       setCheckedRow([]);
//     } else {
//       document
//         .querySelectorAll("input[type='checkbox']")
//         .forEach((ckb) => (ckb.checked = true));
//       setCheckedRow(Array.from(data.map((row) => row.id)));
//     }
//   };

//   const handleParentCateClick = (rowId) => {
//     setRowActive(rowId);
//     setChooseRow(rowId);
//     const cateProduct = proData.filter((p) => p.product_category._id === rowId);
//     setValidData(cateProduct);
//     setPageData(cateProduct.slice(0, config.LIMIT));
//   };

//   const handleChildCateClick = (rowId) => {
//     setRowActive(rowId);
//     const cateProduct = proData.filter((p) => p.product_category._id === rowId);
//     setValidData(cateProduct);
//     setPageData(cateProduct.slice(0, config.LIMIT));
//   };

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleOpenModal = () => {
//     if (isLoading) {
//       Swal.fire({
//         title: "Đang tải dữ liệu...",
//         text: "Vui lòng chờ một chút trước khi mở modal.",
//         icon: "info",
//         showConfirmButton: false,
//         timer: 1500,
//         timerProgressBar: true,
//       });
//       return;
//     }
//     setModalVisible(true);
//   };

//   const handleCancel = () => {
//     setModalVisible(false);
//     form.resetFields();
//   };

//   // Lấy danh mục con từ danh mục cha được chọn
//   const getChildCategories = () => {
//     if (!chooseRow) return [];
//     const selectedCategory = data.find((cat) => cat.id === chooseRow);
//     return selectedCategory ? selectedCategory.children || [] : [];
//   };
//   console.log("data", data);

//   return (
//     <div className="wrapper">
//       <header className="admin-header">
//         <div className="container">
//           <h2>QUẢN LÝ DANH MỤC</h2>
//         </div>
//       </header>
//       <main className="main">
//         <div className="container">
//           <div className="col col-4">
//             <div className="card">
//               <div className="card-header">
//                 <h2>DANH MỤC</h2>
//                 <div className="card-btns">
//                   <button className="admin-btn" onClick={handleOpenModal}>
//                     Thêm
//                   </button>
//                   <button
//                     className="admin-btn del-btn"
//                     // onClick={handleDeleteData}
//                   >
//                     Xóa
//                   </button>
//                 </div>
//               </div>
//               <div className="card-body">
//                 <table className="card-table">
//                   <thead>
//                     <tr>
//                       <th>
//                         <input
//                           type="checkbox"
//                           onClick={(e) => handleCheckAll(e)}
//                         />
//                       </th>
//                       {config.TABLE_CATE_COL.map((col) => (
//                         <th key={col.key}>{col.header}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Array.isArray(data) && data.length > 0 ? (
//                       data.map((row, index) => {
//                         console.log("row", row);

//                         return (
//                           <tr
//                             key={index}
//                             className={`table-row ${rowActive === row.id ? "active" : ""}`}
//                             onClick={() => handleParentCateClick(row.id)}
//                             style={{
//                               cursor: "pointer",
//                             }}
//                           >
//                             <td>
//                               <input
//                                 type="checkbox"
//                                 name="ckb-data"
//                                 value={row.id}
//                                 onClick={(e) => handleCheck(e)}
//                               />
//                             </td>
//                             {config.TABLE_CATE_COL.map((col) => (
//                               <td key={col.key}>{row[col.key]}</td>
//                             ))}
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan={config.TABLE_CATE_COL.length + 1}>
//                           Không tìm thấy
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="col col-3">
//             <div className="card">
//               <div className="card-header">
//                 <h2>DANH MỤC CON</h2>
//               </div>
//               <div className="card-body">
//                 <table className="card-table">
//                   <thead>
//                     <tr>
//                       <th>
//                         <input
//                           type="checkbox"
//                           onClick={(e) => handleCheckAll(e)}
//                         />
//                       </th>
//                       {config.TABLE_CATE_COL.map((col) => (
//                         <th key={col.key}>{col.header}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Array.isArray(getChildCategories()) &&
//                     getChildCategories().length > 0 ? (
//                       getChildCategories().map((row, index) => (
//                         <tr
//                           key={index}
//                           className={`table-row ${rowActive === row.id ? "active" : ""}`}
//                           style={{
//                             cursor: "pointer",
//                           }}
//                           onClick={() => handleChildCateClick(row.id)}
//                         >
//                           <td>
//                             <input
//                               type="checkbox"
//                               name="ckb-data"
//                               value={row.id}
//                               onClick={(e) => handleCheck(e)}
//                             />
//                           </td>
//                           {config.TABLE_CATE_COL.map((col) => (
//                             <td key={col.key}>{row[col.key]}</td>
//                           ))}
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={config.TABLE_CATE_COL.length + 1}>
//                           Không tìm thấy
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="col col-6">
//             <div className="card">
//               <div className="card-header">
//                 <h2>DANH SÁCH SẢN PHẨM</h2>
//               </div>
//               <div className="card-body">
//                 <Table
//                   rows={pageData}
//                   columns={config.TABLE_PRODUCT_COL}
//                   rowLink={`/admin/product`}
//                 />
//               </div>
//               <div className="card-footer">
//                 <div className="card-display-count"></div>
//                 <Pagination data={validData} setPageData={setPageData} />
//               </div>
//             </div>
//           </div>

//           <Modal
//             title="Thêm danh mục"
//             visible={modalVisible}
//             onCancel={handleCancel}
//             footer={null}
//           >
//             <Form form={form} layout="vertical" onFinish={addCate}>
//               <Form.Item
//                 label="Tên danh mục"
//                 name="name"
//                 rules={[
//                   { required: true, message: "Vui lòng nhập tên danh mục!" },
//                 ]}
//               >
//                 <Input placeholder="Nhập tên danh mục" />
//               </Form.Item>
//               <Form.Item
//                 label="Slug"
//                 name="slug"
//                 rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
//               >
//                 <Input placeholder="Nhập slug" />
//               </Form.Item>
//               <Form.Item label="Danh mục cha" name="parentId">
//                 <Select placeholder="Chọn danh mục cha" allowClear>
//                   <Option value={null}>Không có danh mục cha</Option>
//                   {parentCategories.map((cat) => (
//                     <Option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item>
//                 <Button key="cancel" onClick={handleCancel}>
//                   Hủy
//                 </Button>
//                 <Button type="primary" htmlType="submit">
//                   Xác nhận
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Modal>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminUserList;

import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { Modal, Form, Input, Select, Button } from "antd";
import config from "../../../config";
import {
  getAllCategories,
  createCategory,
} from "../../../services/api/categoryService";
import Table from "../../../components/admin/table/Table";
import Pagination from "../../../components/admin/pagination/Pagination";

const { Option } = Select;

const AdminUserList = () => {
  const [data, setData] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [form] = Form.useForm();
  const [validData, setValidData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [chooseRow, setChooseRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Lấy tất cả danh mục
      const categories = await getAllCategories();
      const categoriesArray = Array.isArray(categories) ? categories : [];
      console.log("Categories fetched:", categoriesArray);
      setData(categoriesArray);

      // Lấy danh sách danh mục cha (tạm thời dùng cùng API getAllCategories)
      const parentCats = Array.isArray(categories) ? categories : [];
      setParentCategories(parentCats);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      // Hiển thị thông báo lỗi
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Phiên đăng nhập hết hạn",
          text: "Vui lòng đăng nhập lại.",
          icon: "warning",
          confirmButtonText: "Đăng nhập",
        }).then(() => {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        });
      } else {
        Swal.fire({
          title: "Lỗi!",
          text: "Không thể lấy dữ liệu danh mục. Vui lòng thử lại.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCate = useCallback(
    async (values) => {
      try {
        const res = await createCategory({
          name: values.name,
          slug: values.slug,
          parentId: values.parentId || null,
        });
        if (res.status === 201) {
          setModalVisible(false);
          form.resetFields();
          fetchData();
          Swal.fire({
            title: "Thêm thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } catch (err) {
        console.error("Error in addCate:", err);
        Swal.fire({
          title: "Thêm không thành công!",
          text:
            err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    },
    [fetchData, form],
  );

  const handleCheck = (e) => {
    e.stopPropagation();
    setCheckedRow(
      Array.from(
        document.querySelectorAll("input[name='ckb-data']:checked"),
      ).map((checkbox) => {
        return checkbox.value;
      }),
    );
  };

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    if (!checked) {
      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((ckb) => (ckb.checked = false));
      setCheckedRow([]);
    } else {
      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((ckb) => (ckb.checked = true));
      setCheckedRow(Array.from(data.map((row) => row.id)));
    }
  };

  const handleParentCateClick = (rowId) => {
    setChooseRow(rowId);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = () => {
    if (isLoading) {
      Swal.fire({
        title: "Đang tải dữ liệu...",
        text: "Vui lòng chờ một chút trước khi mở modal.",
        icon: "info",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      return;
    }
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  // Lấy danh mục con từ danh mục cha được chọn
  const getChildCategories = () => {
    if (!chooseRow) return [];
    const selectedCategory = data.find((cat) => cat.id === chooseRow);
    return selectedCategory ? selectedCategory.children || [] : [];
  };

  return (
    <div className="wrapper">
      <header className="admin-header">
        <div className="container">
          <h2>QUẢN LÝ DANH MỤC</h2>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <div className="col col-4">
            <div className="card">
              <div className="card-header">
                <h2>DANH MỤC</h2>
                <div className="card-btns">
                  <button className="admin-btn" onClick={handleOpenModal}>
                    Thêm
                  </button>
                  <button className="admin-btn del-btn">Xóa</button>
                </div>
              </div>
              <div className="card-body">
                <table className="card-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onClick={(e) => handleCheckAll(e)}
                        />
                      </th>
                      {config.TABLE_CATE_COL.map((col) => (
                        <th key={col.key}>{col.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                      data.map((row, index) => (
                        <tr
                          key={index}
                          className={`table-row ${chooseRow === row.id ? "active" : ""}`}
                          onClick={() => handleParentCateClick(row.id)}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <td>
                            <input
                              type="checkbox"
                              name="ckb-data"
                              value={row.id}
                              onClick={(e) => handleCheck(e)}
                            />
                          </td>
                          {config.TABLE_CATE_COL.map((col) => (
                            <td key={col.key}>{row[col.key]}</td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={config.TABLE_CATE_COL.length + 1}>
                          Không tìm thấy
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col col-3">
            <div className="card">
              <div className="card-header">
                <h2>DANH MỤC CON</h2>
              </div>
              <div className="card-body">
                <table className="card-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onClick={(e) => handleCheckAll(e)}
                        />
                      </th>
                      {config.TABLE_CATE_COL.map((col) => (
                        <th key={col.key}>{col.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(getChildCategories()) &&
                    getChildCategories().length > 0 ? (
                      getChildCategories().map((row, index) => (
                        <tr
                          key={index}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <td>
                            <input
                              type="checkbox"
                              name="ckb-data"
                              value={row.id}
                              onClick={(e) => handleCheck(e)}
                            />
                          </td>
                          {config.TABLE_CATE_COL.map((col) => (
                            <td key={col.key}>{row[col.key]}</td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={config.TABLE_CATE_COL.length + 1}>
                          Không tìm thấy
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col col-6">
            <div className="card">
              <div className="card-header">
                <h2>DANH SÁCH SẢN PHẨM</h2>
              </div>
              <div className="card-body">
                <Table
                  rows={pageData}
                  columns={config.TABLE_PRODUCT_COL}
                  rowLink={`/admin/product`}
                />
              </div>
              <div className="card-footer">
                <div className="card-display-count"></div>
                <Pagination data={validData} setPageData={setPageData} />
              </div>
            </div>
          </div>

          <Modal
            title="Thêm danh mục"
            visible={modalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} layout="vertical" onFinish={addCate}>
              <Form.Item
                label="Tên danh mục"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên danh mục!" },
                ]}
              >
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>
              <Form.Item
                label="Slug"
                name="slug"
                rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
              >
                <Input placeholder="Nhập slug" />
              </Form.Item>
              <Form.Item label="Danh mục cha" name="parentId">
                <Select placeholder="Chọn danh mục cha" allowClear>
                  <Option value={null}>Không có danh mục cha</Option>
                  {parentCategories.map((cat) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button key="cancel" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default AdminUserList;
