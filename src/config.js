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
    TABLE_PRODUCT_COL: [
        {
            header: "Mã",
            key: "product_code",
        },
        {
            header: "Tên",
            key: "product_name",
        },
        {
            header: "Danh mục",
            key: "category",
        },
        {
            header: "Giá bán",
            key: "product_sale_price",
        },
        {
            header: "Tình trạng",
            key: "product_isAvailable",
        },
        {
            header: "Ngày tạo",
            key: "createdAt",
        },
    ],
    TABLE_CATE_COL: [
        {
            header: "Tên danh mục",
            key: "category_name",
        },
    ],
};

export default config;
