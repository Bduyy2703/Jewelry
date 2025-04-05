import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { Modal, Form, Input, Select, Button } from "antd";
import config from "../../../config";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/api/categoryService";
import Table from "../../../components/admin/table/Table";
import Pagination from "../../../components/admin/pagination/Pagination";

const { Option } = Select;

const AdminUserList = () => {
  const [data, setData] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [form] = Form.useForm();
  const [validData, setValidData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [chooseRow, setChooseRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const categories = await getAllCategories();
      const categoriesArray = Array.isArray(categories) ? categories : [];
      console.log("Categories fetched:", categoriesArray);
      setData(categoriesArray);

      const parentCats = Array.isArray(categories) ? categories : [];
      setParentCategories(parentCats);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
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
        if (res) {
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

  const editCate = useCallback(
    async (values) => {
      try {
        const res = await updateCategory(selectedCategory.id, {
          name: values.name,
          slug: values.slug,
          parentId: values.parentId || null,
        });
        if (res) {
          setModalVisible(false);
          setSelectedCategory(null);
          form.resetFields();
          fetchData();
          setModalMode("add");
          Swal.fire({
            title: "Cập nhật thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } catch (err) {
        console.error("Error in editCate:", err);
        Swal.fire({
          title: "Cập nhật không thành công!",
          text:
            err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    },
    [fetchData, selectedCategory],
  );

  const handleDelete = useCallback(async () => {
    if (checkedRow.length === 0) {
      Swal.fire({
        title: "Chưa chọn danh mục!",
        text: "Vui lòng chọn ít nhất một danh mục để xóa.",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      return;
    }

    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể khôi phục danh mục sau khi xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(
            checkedRow.map(async (id) => {
              await deleteCategory(id);
            }),
          );

          fetchData();

          setCheckedRow([]);
          document
            .querySelectorAll("input[type='checkbox']")
            .forEach((ckb) => (ckb.checked = false));

          Swal.fire({
            title: "Xóa thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        } catch (err) {
          console.error("Error in handleDelete:", err);
          Swal.fire({
            title: "Xóa không thành công!",
            text:
              err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
      }
    });
  }, [checkedRow, fetchData]);

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
      const allIds = [];
      // Include both parent and child categories
      data.forEach((row) => {
        allIds.push(row.id);
        if (row.children && row.children.length > 0) {
          row.children.forEach((child) => allIds.push(child.id));
        }
      });
      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((ckb) => (ckb.checked = true));
      setCheckedRow(allIds);
    }
  };

  const handleParentCateClick = (rowId) => {
    setChooseRow(rowId);
  };

  const handleEditCategory = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    form.setFieldsValue({
      name: category.name,
      slug: category.slug,
      parentId: category.parentId || null,
    });
    setModalVisible(true);
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
    setModalMode("add");
    setSelectedCategory(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setModalMode("add");
    setSelectedCategory(null);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    if (modalMode === "add") {
      addCate(values);
    } else {
      editCate(values);
    }
  };

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
      <div className="main">
        <div className="container">
          <div className="col col-4">
            <div className="card">
              <div className="card-header">
                <h2>DANH MỤC</h2>
                <div className="card-btns">
                  <button className="admin-btn" onClick={handleOpenModal}>
                    Thêm
                  </button>
                  <button className="admin-btn del-btn" onClick={handleDelete}>
                    Xóa
                  </button>
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
                          onClick={() => {
                            handleParentCateClick(row.id);
                            handleEditCategory(row);
                          }}
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
                          onClick={() => handleEditCategory(row)}
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
            title={modalMode === "add" ? "Thêm danh mục" : "Chỉnh sửa danh mục"}
            open={modalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
                  {modalMode === "add" ? "Xác nhận" : "Cập nhật"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
