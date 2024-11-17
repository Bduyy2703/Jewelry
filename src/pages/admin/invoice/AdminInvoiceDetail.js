import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faChevronLeft,
    faArrowUpWideShort,
    faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";

const AdminInvoiceDetail = () => {
    const API_URL = "http://localhost:8080/admin/user";
    const { id } = useParams();
    const [user, setUser] = useState([]);

    const fetchUser = useCallback(async () => {
        // Fetch user được chọn
        try {
            const res = await axios.get(`${API_URL}/${id}`);
            setUser(res.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }

        try {
            const res = await axios.get(`http://localhost:8080/admin/user`);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [id]);

    // MAIN
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const formik = useFormik({
        enableReinitialize: true, // Cho phép thay đổi initialValues khi user thay đổi
        initialValues: {
            username: user.username || "",
            password: user.password || "",
            email: user.email || "",
            role: user.role || "",
            fullName: user.fullName || "",
            address: user.address || "",
            dateOfBirth: user.dateOfBirth || "1999-01-01",
            status: user.status || "",
            createdAt: user.createdAt || "1999-01-01",
        },
        validationSchema: Yup.object({
            username: Yup.string().required(),
            password: Yup.string().required(),
            email: Yup.string().required(),
            role: Yup.string().required(),
            fullName: Yup.string().required(),
            address: Yup.string().required(),
            dateOfBirth: Yup.date().required(),
            status: Yup.string().required(),
            createdAt: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            try {
                Swal.fire({
                    title: "Nhắc nhở",
                    text: "Bạn có chắc chắn muốn cập nhật thông tin không?",
                    icon: "info",
                    showCancelButton: true, // Show cancel button
                    confirmButtonText: "Cập nhập!",
                    cancelButtonText: "Hủy bỏ",
                    reverseButtons: true, // Optional: makes cancel button appear on the left
                    timerProgressBar: true,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.put(API_URL, {
                            user: { ...values, _id: id },
                        });
                        Swal.fire({
                            title: "Cập nhập thành công!",
                            text: "Bạn đã cập nhật thông tin thành công.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                });
            } catch (error) {
                Swal.fire({
                    title: "Error Adding User!",
                    text: "There was an issue adding the user.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
            }
        },
    });

    const handleReset = () => {
        formik.resetForm();
    };

    return (
        <div className='wrapper'>
            <header className='admin-header'>
                <div className='container'>
                    <h2>Thông tin người dùng</h2>
                </div>
            </header>
            <main className='admin-main'>
                <div className='container'>
                    <div className='card col col-4'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='modal-form-header'>
                                <h2>Thông tin chi tiết</h2>
                            </div>
                            <div className='modal-form-body'>
                                <label>Tên đăng nhập</label>
                                <input
                                    className='disabled'
                                    type='text'
                                    name='username'
                                    placeholder='user'
                                    required
                                    {...formik.getFieldProps("username")}
                                    disabled
                                />
                                <label>Mật khẩu</label>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='user@123'
                                    required
                                    {...formik.getFieldProps("password")}
                                />
                                <label>Email</label>
                                <input
                                    className='disabled'
                                    type='email'
                                    name='email'
                                    placeholder='email@gmail.com'
                                    required
                                    {...formik.getFieldProps("email")}
                                    disabled
                                />
                                <label>Vai trò</label>
                                <select
                                    name='role'
                                    {...formik.getFieldProps("role")}
                                >
                                    <option value='admin' label='admin' />
                                    <option value='user' label='user' />
                                </select>
                                <label>Họ tên</label>
                                <input
                                    type='text'
                                    name='fullName'
                                    placeholder='Nguyễn Văn A'
                                    required
                                    {...formik.getFieldProps("fullName")}
                                />
                                <label>Địa chỉ</label>
                                <input
                                    type='text'
                                    name='address'
                                    placeholder='Số 1 VVN, Linh Chiểu, Gò Vấp'
                                    {...formik.getFieldProps("address")}
                                />
                                <label>Ngày sinh</label>
                                <input
                                    type='date'
                                    name='dateOfBirth'
                                    value={formik.values.dateOfBirth}
                                    {...formik.getFieldProps("dateOfBirth")}
                                />
                                <label>Trạng thái</label>
                                <select
                                    name='status'
                                    {...formik.getFieldProps("status")}
                                >
                                    <option
                                        value='Đang hoạt động'
                                        label='Đang hoạt động'
                                    />
                                    <option
                                        value='Chưa kích hoạt'
                                        label='Chưa kích hoạt'
                                    />
                                    <option value='Đã khóa' label='Đã khóa' />
                                </select>
                                <label>Ngày tạo</label>
                                <input
                                    className='disabled'
                                    type='text'
                                    name='createdAt'
                                    value={formik.values.createdAt}
                                    {...formik.getFieldProps("createdAt")}
                                    disabled
                                />
                            </div>
                            <div className='modal-form-footer'>
                                <button
                                    type='button'
                                    onClick={handleReset}
                                    className='admin-btn res-btn'
                                >
                                    Reset
                                </button>
                                <button type='submit' className='admin-btn'>
                                    Cập nhập
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='card col col-8'></div>
                </div>
            </main>
        </div>
    );
};

export default AdminInvoiceDetail;
