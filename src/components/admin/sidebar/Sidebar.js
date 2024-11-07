import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
    const location = useLocation();
    const lastPathSegment = location.pathname.split("/").pop(); // Lấy phần cuối cùng của đường dẫn
    const [activeLink, setActiveLink] = useState(lastPathSegment);

    const handleLickClick = (link) => {
        setActiveLink(link);
    };

    return (
        <aside className='sidebar'>
            <div className='info'>Admin information</div>
            <div className='toolbar'>
                <Link
                    className={activeLink === "user" ? "active" : null}
                    to='/admin/user'
                    onClick={() => handleLickClick("user")}
                >
                    Người dùng
                </Link>
                <Link
                    className={activeLink === "book" ? "active" : null}
                    to='/admin/book'
                    onClick={() => handleLickClick("book")}
                >
                    Sách
                </Link>
                <Link
                    className={activeLink === "history" ? "active" : null}
                    to='/admin/history'
                    onClick={() => handleLickClick("history")}
                >
                    Lịch sử
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
