import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Pagination from "../../../components/admin/pagination/Pagination";
import Table from "../../../components/admin/table/Table";
import Filter from "../../../components/admin/filter/Filter";
import Modal from "../../../components/admin/modal/Modal";
import config from "../../../config";

const AdminUserList = () => {
    const API_URL = `${config.API_URL}/admin`;
    const [data, setData] = useState([]);
    const [checkedRow, setCheckedRow] = useState([]);
    let [modal, setModal] = useState(false);
    const [chooseRow, setChooseRow] = useState([]);
    const [initialValues, setInitialValues] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`${API_URL}/getAllCategories`);
            setData(res.data.categories);
            setInitialValues({
                category_name: {
                    label: "Tên danh mục",
                    type: "text",
                    value: "",
                },
                category_slug: {
                    label: "Slug",
                    type: "text",
                    value: "",
                },
                category_type: {
                    label: "Loại",
                    type: "select",
                    value: "material",
                    options: ["material", "audience", "category", "style"],
                    options_value: [
                        "material",
                        "audience",
                        "category",
                        "style",
                    ],
                },
            });
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }, [API_URL]);

    const addCate = useCallback(
        async ({ category_name, category_slug, category_type }) => {
            try {
                const res = await axios.post(
                    `${config.API_URL}categories/create`,
                    {
                        category_name: category_name,
                        category_slug: category_slug,
                        category_type: category_type,
                    }
                );
                if (res.status === 200) {
                    setModal(false);
                    // Fetch lại toàn bộ data sau khi thêm
                    fetchData();
                    Swal.fire({
                        title: "Thêm người dùng thành công!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500, // Tự tắt sau 2 giây
                        timerProgressBar: true,
                    });
                }
            } catch (err) {
                Swal.fire({
                    title: "Thêm không thành công!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
            }
        },
        [API_URL, fetchData]
    );

    const handleDeleteData = async () => {
        try {
            if (checkedRow.length === 0) {
                Swal.fire({
                    title: "Thông báo!",
                    text: "Bạn chưa chọn dữ liệu cần xóa.",
                    icon: "info",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    title: "Nhắc nhở",
                    text: "Bạn có chắc chắn muốn xóa không?",
                    icon: "info",
                    showCancelButton: true, // Show cancel button
                    confirmButtonText: "Xóa bỏ!",
                    cancelButtonText: "Hủy bỏ",
                    reverseButtons: true, // Optional: makes cancel button appear on the left
                    timerProgressBar: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteData(checkedRow);
                        Swal.fire({
                            title: "Xóa thành công!",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Xóa thất bại!",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
        }
    };

    const deleteData = async (ids) => {
        const res = ids.every(async (id) => {
            await axios.delete(`${config.API_URL}categories/${id}`);
            return true;
        });
        if (res === true) {
            // Uncheck các checkbox đã chọn
            document
                .querySelectorAll("input[type='checkbox']")
                .forEach((ckb) => (ckb.checked = false));
            setCheckedRow([]);

            // Set lại data
            setData(data.filter((d) => !checkedRow.includes(d._id)));
        } else {
            console.log("Lỗi xóa danh mục");
        }
    };

    const handleCheck = (e) => {
        e.stopPropagation();
        setCheckedRow(
            Array.from(
                document.querySelectorAll("input[name='ckb-data']:checked")
            ).map((checkbox) => {
                console.log(checkbox.value);
                return checkbox.value;
            })
        );
    };

    const handleCheckAll = (e) => {
        const checked = e.target.checked;
        if (!checked) {
            document
                .querySelectorAll("input[name='ckb-data']")
                .forEach((ckb) => (ckb.checked = false));
            setCheckedRow([]);
        } else {
            document
                .querySelectorAll("input[name='ckb-data']")
                .forEach((ckb) => (ckb.checked = true));
            setCheckedRow(Array.from(data.map((row) => row._id)));
        }
    };

    const handleParentCateClick = async (rowId) => {
        setChooseRow(rowId);
    };

    useEffect(() => {
        fetchData(); // Gọi hàm fetchData
    }, [addCate, fetchData, data]);
    return (
        <div className='wrapper'>
            <header className='admin-header'>
                <div className='container'>
                    <h2>QUẢN LÝ DANH MỤC</h2>
                </div>
            </header>
            <main className='main'>
                <div className='container'>
                    <div className='card col col-6'>
                        <div className='card-header'>
                            <div className='card-btns'>
                                <button
                                    className='admin-btn'
                                    onClick={() => setModal(true)}
                                >
                                    Thêm
                                </button>
                                <button
                                    className='admin-btn del-btn'
                                    onClick={handleDeleteData}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='card-table'>
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type='checkbox'
                                                onClick={(e) =>
                                                    handleCheckAll(e)
                                                }
                                            />
                                        </th>
                                        {config.TABLE_CATE_COL.map((col) => (
                                            <th key={col.key}>{col.header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        data.map((row, index) => (
                                            <tr
                                                key={index}
                                                className='table-row'
                                                onClick={() =>
                                                    handleParentCateClick(
                                                        row._id
                                                    )
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                <td>
                                                    <input
                                                        type='checkbox'
                                                        name='ckb-data'
                                                        value={row._id}
                                                        onClick={(e) =>
                                                            handleCheck(e)
                                                        }
                                                    />
                                                </td>
                                                {config.TABLE_CATE_COL.map(
                                                    (col) => (
                                                        <td key={col.key}>
                                                            {row[col.key]}
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='2'>Không tìm thấy</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card col col-6'>
                        <div className='card-header'>
                            <h2>DANH MỤC CON</h2>
                        </div>
                        <div className='card-body'>
                            <table className='card-table'>
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type='checkbox'
                                                onClick={(e) =>
                                                    handleCheckAll(e)
                                                }
                                            />
                                        </th>
                                        {config.TABLE_CATE_COL.map((col) => (
                                            <th key={col.key}>{col.header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) =>
                                        row.category_parentId === chooseRow ? (
                                            <tr
                                                key={index}
                                                className='table-row'
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <td>
                                                    <input
                                                        type='checkbox'
                                                        name='ckb-data'
                                                        value={row._id}
                                                        onClick={(e) =>
                                                            handleCheck(e)
                                                        }
                                                    />
                                                </td>
                                                {config.TABLE_CATE_COL.map(
                                                    (col) => (
                                                        <td key={col.key}>
                                                            {row[col.key]}
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        ) : (
                                            <></>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal
                        modal={modal}
                        setModal={setModal}
                        title={"Thêm danh mục"}
                        initialValues={initialValues}
                        handleAdd={addCate}
                    />
                </div>
            </main>
        </div>
    );
};

export default AdminUserList;
