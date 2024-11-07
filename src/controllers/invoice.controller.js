const invoiceService = require('../services/invoice.service');

const getAllInvoiceByUser =async (req,res)=>{
    const userId = req.query.userId;
    try {
        const invoices = await invoiceService.getAllInvoicesByUserId(userId);
        if (invoices.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hóa đơn cho người dùng này' });
        }
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

const getInvoiceDetailsById = async (req, res) => {
    const invoiceId = req.query.invoiceId;
    try {
        const invoice = await invoiceService.getInvoiceDetailsById(invoiceId);
        if (!invoice) {
            return res.status(404).json({ message: 'Không tìm thấy hóa đơn với ID này' });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};


module.exports = {
    getAllInvoiceByUser,
    getInvoiceDetailsById,
}