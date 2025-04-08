import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, Input, Button, Upload, Pagination } from "antd";
import Swal from "sweetalert2";
import Table from "../../../components/admin/table/Table";
import Filter from "../../../components/admin/filter/Filter";
import config from "../../../config";
import { PlusOutlined } from "@ant-design/icons";
import {
  addProduct,
  deleteProduct,
  getProductList,
  updateProduct,
} from "../../../services/api/productService";
import { Select } from "antd";
import { getAllCategories } from "../../../services/api/categoryService";
import styles from "./index.module.scss";
const { Option, OptGroup } = Select;

const AdminProductList = () => {
  const [data, setData] = useState([]);
  const [validData, setValidData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = config.LIMIT || 10;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        setCategories(result);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const standardSort = ["name", "originalPrice"];

  const fetchData = useCallback(async () => {
    try {
      const res = await getProductList(currentPage, limit);
      const items = res?.data || [];
      const processedItems = items.map((item) => ({
        ...item,
        originalPrice: Number(item.originalPrice) || 0,
      }));
      setData(processedItems);
      setValidData(processedItems);
      setTotal(res?.total || items.length || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
      setValidData([]);
    }
  }, [currentPage, limit]);

  const handleAddProduct = async (values) => {
    const { name, originalPrice, images, categoryId } = values;

    const productData = {
      name,
      originalPrice,
      categoryId,
      images:
        images && Array.isArray(images) ? images.map((file) => file.name) : [],
    };

    try {
      const res = await addProduct(productData);
      if (res) {
        setModalVisible(false);
        form.resetFields();
        fetchData();
        Swal.fire({
          title: "Thêm sản phẩm thành công!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleUpdateProduct = async (values) => {
    const { name, originalPrice, images, categoryId } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("originalPrice", originalPrice);
    formData.append("categoryId", categoryId);
    if (images && Array.isArray(images)) {
      images.forEach((fileObj) => {
        formData.append("images", fileObj.originFileObj);
      });
    }

    try {
      const res = await updateProduct(currentProduct.id, formData);
      if (res) {
        setEditModalVisible(false);
        editForm.resetFields();
        setCurrentProduct(null);
        fetchData();
        Swal.fire({
          title: "Cập nhật sản phẩm thành công!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text: error.message,
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  const handleDeleteData = async () => {
    if (!Array.isArray(checkedRow) || checkedRow.length === 0) {
      Swal.fire({
        title: "Thông báo",
        text: "Vui lòng chọn ít nhất một sản phẩm để xóa.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (confirm.isConfirmed) {
      try {
        await Promise.all(checkedRow.map((id) => deleteProduct(id)));
        Swal.fire({
          title: "Đã xóa!",
          text: "Sản phẩm đã được xóa thành công.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchData();
        setCheckedRow([]);
      } catch (error) {
        Swal.fire({
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi xóa sản phẩm.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    editForm.setFieldsValue({
      name: product.name,
      originalPrice: product.originalPrice,
      categoryId: product?.category?.name,
      images: product.images.map((url, index) => ({
        uid: index,
        name: `image-${index}`,
        status: "done",
        url,
      })),
    });
    setEditModalVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="wrapper">
      <header className="admin-header">
        <div className="container">
          <h2>QUẢN LÝ SẢN PHẨM</h2>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="card-tools">
                <Filter
                  filters={filters}
                  data={data}
                  validData={validData}
                  setValidData={setValidData}
                  standardSort={standardSort}
                  searchFields={[
                    { key: "name", placeholder: "Tìm kiếm theo tên sản phẩm" },
                    {
                      key: "originalPrice",
                      placeholder: "Tìm kiếm theo giá gốc",
                    },
                  ]}
                />
              </div>
              <div className="card-btns">
                <Button
                  className="admin-btn"
                  onClick={() => setModalVisible(true)}
                >
                  Thêm
                </Button>
                <Button
                  className="admin-btn del-btn"
                  onClick={handleDeleteData}
                >
                  Xóa
                </Button>
              </div>
            </div>
            <div className="card-body">
              <Table
                rows={validData}
                columns={[
                  {
                    key: "name",
                    header: "Tên sản phẩm",
                    render: (row) => row.name,
                  },
                  {
                    key: "finalPrice",
                    header: "Giá sản phẩm",
                    render: (row) => row.finalPrice,
                  },
                ]}
                setChecked={setCheckedRow}
                onEdit={handleEdit}
              />
            </div>
            <div className={styles.pagination}>
              <Pagination
                current={currentPage}
                pageSize={limit}
                total={total}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>

          <Modal
            title="Thêm sản phẩm"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
          >
            <Form form={form} layout="vertical" onFinish={handleAddProduct}>
              <Form.Item
                label="Hình ảnh"
                name="images"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  const fileList = Array.isArray(e) ? e : e?.fileList || [];
                  const files = fileList
                    .filter((file) => file.originFileObj)
                    .map((file) => file.originFileObj);
                  return files;
                }}
                rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
              >
                <Upload
                  listType="picture"
                  beforeUpload={() => false} // Ngăn upload tự động
                  multiple
                  accept="image/*" // Chỉ chấp nhận file ảnh
                >
                  <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map((cat) =>
                    cat.children.length > 0 ? (
                      <OptGroup key={cat.id} label={cat.name}>
                        {cat.children.map((child) => (
                          <Option key={child.id} value={child.id}>
                            {child.name}
                          </Option>
                        ))}
                      </OptGroup>
                    ) : null,
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                label="Giá sản phẩm"
                name="originalPrice"
                rules={[
                  { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Thêm sản phẩm
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Chỉnh sửa sản phẩm"
            visible={editModalVisible}
            onCancel={() => {
              setEditModalVisible(false);
              setCurrentProduct(null);
              editForm.resetFields();
            }}
            footer={null}
          >
            <Form
              form={editForm}
              layout="vertical"
              onFinish={handleUpdateProduct}
            >
              <Form.Item
                label="Hình ảnh"
                name="images"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) return e;
                  return e?.fileList;
                }}
              >
                <Upload listType="picture" beforeUpload={() => false} multiple>
                  <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map((cat) => (
                    <Select.Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Giá sản phẩm"
                name="originalPrice"
                rules={[
                  { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cập nhật sản phẩm
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default AdminProductList;
