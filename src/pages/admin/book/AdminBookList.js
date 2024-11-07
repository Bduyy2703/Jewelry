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
    const API_URL = `${config.API_URL}/book`;
    const [data, setData] = useState([]);
    const [validData, setValidData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [checkedRow, setCheckedRow] = useState([]);
    let [modal, setModal] = useState(false);
    const [filters, setFilters] = useState([]);
    const [initialValues, setInitialValues] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(API_URL);
            setData(res.data.data);
            setValidData(res.data.data);
            setPageData(res.data.data.slice(0, config.LIMIT));

            const resCate = await axios.get(`${config.API_URL}/category`);
            setFilters([
                {
                    name: "Trạng thái",
                    type: "status",
                    standards: ["Tất cả", "Có sẵn", "Ngừng cung cấp"],
                },
                {
                    name: "Danh mục",
                    type: "category",
                    standards: [
                        "Tất cả",
                        ...resCate.data.data.map((d) => d.name),
                    ],
                },
            ]);
            setInitialValues({
                title: { label: "Tên sách", type: "text", value: "" },
                author: { label: "Tác giả", type: "text", value: "" },
                description: { label: "Mô tả", type: "text", value: "" },
                category: {
                    label: "Danh mục",
                    type: "select",
                    value: "",
                    options: [...resCate.data.data.map((d) => d.name)],
                },
                publicationYear: {
                    label: "Xuất bản",
                    type: "number",
                    value: "1990",
                },
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [API_URL]);
    const standardSearch = ["title", "author", "category"];
    const standardSort = [
        { name: "Tên sách", type: "title" },
        { name: "Tác giả", type: "author" },
        { name: "Năm xuất bản", type: "publicationYear" },
        { name: "Đánh giá", type: "ratings" },
    ];

    const validationSchema = Yup.object(
        Object.keys(initialValues).reduce((schema, field) => {
            schema[field] = Yup.string().required(
                `${initialValues[field].label} là bắt buộc`
            );
            return schema;
        }, {})
    );

    const addUser = useCallback(
        async ({
            username,
            password,
            email,
            fullName,
            address,
            dateOfBirth,
        }) => {
            try {
                const res = await axios.post(API_URL, {
                    username: username,
                    password: password,
                    email: email,
                    fullName: fullName,
                    address: address,
                    dateOfBirth: dateOfBirth,
                });
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
        const res = await axios.delete(API_URL, {
            data: { ids: ids },
        });
        if (res.status === 200) {
            // Uncheck các checkbox đã chọn
            document
                .querySelectorAll("input[type='checkbox']")
                .forEach((ckb) => (ckb.checked = false));
            setCheckedRow([]);

            // Set lại users
            setData(data.filter((d) => !checkedRow.includes(d._id)));
            setValidData(validData.filter((d) => !checkedRow.includes(d._id)));
        } else {
            console.log(res.data.message);
        }
    };

    useEffect(() => {
        fetchData(); // Gọi hàm fetchData
    }, [addUser, fetchData]);
    return (
        <div className='wrapper'>
            <header className='admin-header'>
                <div className='container'>
                    <h2>QUẢN LÝ SÁCH</h2>
                </div>
            </header>
            <main className='main'>
                <div className='container'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='card-tools'>
                                <Filter
                                    filters={filters}
                                    data={data}
                                    validData={validData}
                                    setValidData={setValidData}
                                    standardSearch={standardSearch}
                                    standardSort={standardSort}
                                />
                            </div>
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
                            <Table
                                rows={pageData}
                                columns={config.TABLE_BOOK_COL}
                                rowLink={`/admin/book`}
                                setChecked={setCheckedRow}
                            />
                        </div>
                        <div className='card-footer'>
                            <div className='card-display-count'></div>
                            <Pagination
                                data={validData}
                                setPageData={setPageData}
                            />
                        </div>
                    </div>
                    <Modal
                        modal={modal}
                        setModal={setModal}
                        title={"Thêm sách"}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        handleAdd={addUser}
                    />
                </div>
            </main>
        </div>
    );
};

export default AdminUserList;
