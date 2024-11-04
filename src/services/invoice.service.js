const Invoice = require("../models/invoice.model");


// Hàm cập nhật trạng thái hóa đơn
const updateInvoiceStatus = async (invoiceId, status) => {
    try {
        const updatedInvoice = await Invoice.findOneAndUpdate(
            { _id: invoiceId },
            { status },
            { new: true } // `new: true` sẽ trả về tài liệu đã được cập nhật
        );
        return updatedInvoice;
    } catch (error) {
        console.log(error);
        return null; // Trả về null nếu có lỗi
    }
};

module.exports = {
    updateInvoiceStatus,
}