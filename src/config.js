const config = {
    API_URL: "http://localhost:3000/api/",
    LIMIT: 10,
    TABLE_USER_COL: [
        {
            header: "Họ tên",
            key: "fullName",
        },
        {
            header: "Email",
            key: "email",
        },
        {
            header: "SĐT",
            key: "phone",
        },
        {
            header: "Trạng thái",
            key: "verified",
        },
        {
            header: "Ngày tạo",
            key: "createdAt",
        },
    ],
    TABLE_BOOK_COL: [
        {
            header: "Tên sách",
            key: "title",
        },
        {
            header: "Tác giả",
            key: "author",
        },
        {
            header: "Danh mục",
            key: "category",
        },
        {
            header: "Xuất bản",
            key: "publicationYear",
        },
        {
            header: "Đánh giá",
            key: "ratings",
        },
        {
            header: "Trạng thái",
            key: "status",
        },
        {
            header: "Ngày tạo",
            key: "createdAt",
        },
    ],
};

export default config;
