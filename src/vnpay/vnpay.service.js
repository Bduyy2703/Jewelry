
const crypto = require("crypto");
require('dotenv').config({ path: '.env.development' });
var querystring = require('qs');
const invoiceService = require('../services/invoice.service');

const processPayment = async (invoice) => {
    const date = new Date();
    const { default: dateFormat } = await import("dateformat");
    const createDate = dateFormat(date, "yyyymmddHHMMss");

    const RETURN_URL = "http://localhost:3000/payment";
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = process.env.VNP_TMNCODE;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = Date.now().toString();
    vnp_Params['vnp_OrderInfo'] = invoice._id;
    vnp_Params['vnp_OrderType'] = 'billpayment';
    vnp_Params['vnp_Amount'] = invoice.amountToPay * 100;
    vnp_Params['vnp_ReturnUrl'] = RETURN_URL;
    vnp_Params['vnp_IpAddr'] = '13.160.92.202';
    vnp_Params['vnp_CreateDate'] = createDate;
    // vnp_Params['vnp_BankCode'] = 'NCB';

    vnp_Params = sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });

    var crypto = require('crypto');

    var hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);

    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    vnp_Params['vnp_SecureHash'] = signed;

    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return vnpUrl;
};

const signedParams = (vnp_Params) => {
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });

    var hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);

    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    return {
        secureHash,
        signed,
        vnp_Params,
    };
}
const processVnpayIpn = async (params) => {
    const { secureHash, signed, vnp_Params } = signedParams(params);
    if (secureHash === signed) {
        const rspCode = vnp_Params['vnp_ResponseCode'];
        const orderId = vnp_Params['vnp_OrderInfo'];
        let amount = parseFloat(vnp_Params['vnp_Amount']) / 100;
        
        let invoice = {};
        let message = '';

        if (rspCode === '00') {
            message = "success";
            invoice = await invoiceService.updateInvoiceStatus(orderId, message);
        } else {
            message = 'Không xác định';
        }

        console.log("invoice", invoice);
        return { rspCode, message, invoice };
    } else {
        return { RspCode: '97', Message: 'Mã hash không hợp lệ' };
    }
};

const sortObject = (obj) => {
    var sorted = {};
    var str = [];
    var key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }

    str.sort();

    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }

    return sorted;
};

module.exports = {
    processPayment,
    processVnpayIpn,
}