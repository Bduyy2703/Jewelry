const Invoice = require("../models/invoice.model");
const crypto = require("crypto");
require('dotenv').config({ path: '.env.development' });

const processPayment = async (invoice) => {

    const date = new Date();
    const { default: dateFormat } = await import("dateformat");

    const createDate = dateFormat(date, "yyyymmddHHmmss");
    const expDate = parseInt(dateFormat(date, "yyyymmddHHmmss")) + 100000;

    const LOCALE = "vn";
    const CURR_CODE = "VND";
    const ORDER_ID = dateFormat(date, "HHmmss");
    const ORDER_TYPE = "200000";
    const RETURN_URL = "http://localhost:3000/cart";
    let vnpUrl = process.env.VNP_URL;

    const vnp_Params = {};
    vnp_Params["vnp_Amount"] = invoice.amountToPay * 100;
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_CurrCode"] = CURR_CODE;
    vnp_Params["vnp_ExpireDate"] = expDate.toString();
    vnp_Params["vnp_IpAddr"] = "13.160.92.202";
    vnp_Params["vnp_Locale"] = LOCALE;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan don hang";
    vnp_Params["vnp_OrderType"] = ORDER_TYPE;
    vnp_Params["vnp_ReturnUrl"] = RETURN_URL;
    vnp_Params["vnp_TmnCode"] = process.env.VNP_TMNCODE;
    vnp_Params["vnp_TxnRef"] = ORDER_ID;
    vnp_Params["vnp_Version"] = "2.1.0";


    const signData = new URLSearchParams(vnp_Params).toString();
    const hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);
    console.log(process.env.VNP_HASHSECRET);
    var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    console.log(signed);
    vnp_Params["vnp_SecureHash"] = signed;

    vnpUrl += "?" + new URLSearchParams(vnp_Params).toString();
    return vnpUrl;
}

module.exports = {
    processPayment,
}