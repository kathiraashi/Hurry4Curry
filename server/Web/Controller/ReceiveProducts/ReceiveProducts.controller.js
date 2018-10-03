var CryptoJS = require("crypto-js");
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var FranchiseeStockModel = require('./../../Models/Stock/FranchiseeStock.Model');
var FranchiseeReceiveProductsModel = require('./../../Models/ReceiveProducts/ReceiveProducts.model.js');
var PurchaseRequestModel = require('./../../Models/PurchaseRequest/PurchaseRequest.model');
var mongoose = require('mongoose');

// List
exports.ReceiveProducts_List = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false , Message: "User detail cannot be empty"});
    } else {
        FranchiseeReceiveProductsModel.ReceiveProductsSchema.find({'Franchisee_Id': ReceivingData.User_Id}, {Hub_Id: 1, PurchaseRequest_RefNo: 1, FranchiseeCurrent_Status: 1})
        .populate({path: 'Hub_Id', select: ['Name']})
        .exec(function(err, result) {
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Receive Products Data Find Query Error', 'FranchiseeReceiveProducts.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The  Receive Products Data!."});
            } else {
                var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                ReturnData = ReturnData.toString();                
                res.status(200).send({Status: true, Response: ReturnData });     
            }
        });
    }
}

// view
exports.ReceiveProducts_View = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
console.log(ReceivingData);

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false, Message: "User details cannot be empty"});
    } else if (!ReceivingData.ReceiveProducts_Id || ReceivingData.ReceiveProducts_Id === '') {
        res.status(400).send({Status: false, Message: "Purchase request details cannot be empty"});
    } else {
        FranchiseeReceiveProductsModel.ReceiveProductsSchema.findOne({'Franchisee_Id': ReceivingData.User_Id, '_id': ReceivingData.ReceiveProducts_Id},
        {PurchaseRequest_RefNo: 1, PurchaseRequest_Date: 1, Expected_Date: 1, Delivered_Date: 1, Hub_Id: 1, FranchiseeCurrent_Status: 1})
        .populate({path: 'Hub_Id', select: ['Name']})
        .exec(function(err, result) {
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Receive Products Data Find Query Error', 'FranchiseeReceiveProducts.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The  Receive Products Data!."});
            } else {
                FranchiseeReceiveProductsModel.ReceiveProducts_ProductsSchema.find({'Franchisee_Id': ReceivingData.User_Id, 'DeliverProducts_Id': ReceivingData.ReceiveProducts_Id}, 
                {Product_Id: 1, Deliver_Quantity: 1, Requested_Quantity: 1, })
                .populate({path: 'Product_Id', select: ['Name_withAttribute']})
                .exec(function(err_1, result_1) {
                    if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Receive Products Data Find Query Error', 'FranchiseeReceiveProducts.controller.js', err);
                        res.status(417).send({Status: false, Message: "Some error occurred while Find The  Receive Products Data!."});
                    }
                    else {
                        const _ReturnData = {'ReceiveProducts_Details': result, 'ReceiveProducts_Product_Details': result_1}
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(_ReturnData), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();                
                        res.status(200).send({Status: true, Response: ReturnData });
                    }
                });

            }
        });
    }
}

// Update stock
exports.ReceiveProducts_UpdateStock = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
console.log(ReceivingData);

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false, Message: "User details cannot be empty"});
    } else if (!ReceivingData.ReceiveProducts_Id || ReceivingData.ReceiveProducts_Id === '') {
        res.status(400).send({Status: false, Message: "Purchase request details cannot be empty"});
    } else {
        FranchiseeReceiveProductsModel.ReceiveProducts_ProductsSchema.find({'Franchisee_Id': ReceivingData.User_Id,'DeliverProducts_Id': ReceivingData.ReceiveProducts_Id},{})
        .exec(function(err, result) {
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Receive Products View Find Query Error', 'FranchiseeReceiverProducts.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while updating The Franchisee Receive Products !."});
            } else {
                const UpdateStock = (List) => Promise.all(
                    List.map(obj => UpdateAll(obj))
                ).then(response => {
                    FranchiseeReceiveProductsModel.ReceiveProductsSchema.update({'Franchisee_Id': ReceivingData.User_Id, '_id': ReceivingData.ReceiveProducts_Id}, {$set: {FranchiseeCurrent_Status: 'Received'}})
                    .exec(function(err, result) {
                        if(err) {
                            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Receive Products Update Find Query Error', 'FranchiseeReceiveProducts.controller.js', err);
                            res.status(417).send({Status: false, Message: "Some error occurred while Updating The Franchisee Receive Products View!."});
                        }
                        else {
                            res.status(200).send({Status: true, Response: "Successfully received"});
                        }
                        });
                });

                const UpdateAll = (info) => Promise.all([
                    FranchiseeStockModel.FranchiseeStockSchema.findOne({'Product_Id': info.Product_Id}),
                    FranchiseeStockModel.FranchiseeStockSchema.update({'Product_Id': info.Product_Id}, { $inc: {Current_Quantity: +parseInt(info.Deliver_Quantity)}})
                ]).then( response => {
                    FranchiseeStockModel.FranchiseeStockHistorySchema.create([{
                        FranchiseeProduct_Stock_Id: response[0]._id,
                        FranchiseeUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                        Product_Id: mongoose.Types.ObjectId(response[0].Product_Id),
                        Previous_Quantity: parseInt(response[0].Current_Quantity),
                        Current_Quantity: parseInt(response[0].Current_Quantity) + parseInt(info.Deliver_Quantity),
                        Removed_Quantity: 0,
                        Added_Quantity: parseInt(response[0].Quantity),
                        UnitOfMeasure: mongoose.Types.ObjectId(response[0].UnitOfMeasure),
                        Reference_Id: mongoose.Types.ObjectId(ReceivingData.FranchiseeOrder_Id), // Franchisee Bill Id
                        History_From: 'Franchisee Purchase',
                        Active_Status: true,
                        If_Deleted: false
                    }])
                    return response[0];
                });

                UpdateStock(result)
            }
        });
    }
}