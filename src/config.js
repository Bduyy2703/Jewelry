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
    SHORT_TABLE_PRODUCT_COL: [
        {
            header: "Mã sản phẩm",
            key: "product_code",
        },
        {
            header: "Tên sản phẩm",
            key: "product_name",
        },
        {
            header: "Giá bán",
            key: "product_sale_price",
        },
        {
            header: "Số lượng",
            key: "quantiry",
        },
        {
            header: "Tổng",
            key: "total_price",
        },
    ],
    TABLE_CATE_COL: [
        {
            header: "Tên danh mục",
            key: "category_name",
        },
    ],
    TABLE_INVOICE_COL: [
        {
            header: "Mã đơn",
            key: "orderCode",
        },
        {
            header: "Người mua",
            key: "username",
        },
        {
            header: "Trạng thái",
            key: "status",
        },
        {
            header: "Giá trị",
            key: "amountToPay",
        },
        {
            header: "Phương thức",
            key: "paymentMethod",
        },
        {
            header: "Ngày tạo",
            key: "createdAt",
        },
    ],
};

export default config;
