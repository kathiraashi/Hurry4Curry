var CryptoJS = require("crypto-js");
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var FranchiseeStockModel = require('./../../Models/Stock/FranchiseeStock.Model');
var PurchaseOrderModel = require('./../../Models/PurchaseOrder/purchaseorder.model');
var PurchaseRequestModel = require('./../../Models/PurchaseRequest/PurchaseRequest.model');
var mongoose = require('mongoose');

exports.PurchaseRequest_Create = function(req, res) {
    
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false, Message: "User Details cannot be empty"});
    } else if(!ReceivingData.Hub_Id || ReceivingData.Hub_Id === '') {
        res.status(400).send({Status: false, Message: "Hub Details cannot be empty"});
    } else if(!ReceivingData.Expected_Date || ReceivingData.Expected_Date === '') {
        res.status(400).send({Status: false, Message: "Expected Date Details cannot be empty"});
    } else {
        PurchaseRequestModel.PurchaseRequestSchema.find({}, {PurchaseRequest_RefNo_Length: 1}, {sort: {PurchaseRequest_RefNo_Length: -1}, limit: 1})
        .exec(function(PurchaseRequest_RefNo_Length_Err, PurchaseRequest_RefNo_Length_Result){
            if(PurchaseRequest_RefNo_Length_Err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Creation Query Error', 'FranchiseePurchaseBill.controller.js', err);
                res.status(400).send({Status: false, Message: "Some error occurred while creating the Franchisee Purchase request!."});
                console.log(err);
                
            }
            else {
                var number = 1;
                if(PurchaseRequest_RefNo_Length_Result.length > 0) {
                    number = PurchaseRequest_RefNo_Length_Result[0].PurchaseRequest_RefNo_Length + 1;
                }
                const PurchaseRequest_RefNo_LastNumber = number.toString().padStart(3, 0);
                const PurchaseRequest_RefNo_Number = "Ref-" + PurchaseRequest_RefNo_LastNumber;
                
                var PurchaseRequestCreate = new PurchaseRequestModel.PurchaseRequestSchema({
                    Hub_Id: mongoose.Types.ObjectId(ReceivingData.Hub_Id),
                    User_Id: mongoose.Types.ObjectId(ReceivingData.User_Id),
                    PurchaseRequest_RefNo: PurchaseRequest_RefNo_Number,
                    PurchaseRequest_RefNo_Length: PurchaseRequest_RefNo_LastNumber,
                    PurchaseRequest_Date: ReceivingData.PurchaseRequest_Date,
                    Expected_Date: ReceivingData.Expected_Date,
                    PurchaseRequest_Status: 'Requested',
                    If_Approved: false,
                    Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    Active_Status: true,
                    If_Deleted: false,
                });
                PurchaseRequestCreate.save(function(err, result){
                    if(err) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Purchase Request Creation Query Error', 'PurchaseRequest.controller.js', err);
                        res.status(400).send({Status: false, Message: "Some error occurred while creating the  Purchase Request!."});
                        console.log(err);
                    }
                    else {
                        const FindStock = (selectedProducts) => Promise.all(
                            selectedProducts.map(obj => CurrentStock(obj))
                        ).then(response => {
                            const itemArray = response.map(obj => {                           
                                const newObj = {
                                   PurchaseRequest_Id: result._id,
                                   Product_Id: mongoose.Types.ObjectId(obj.Product._id),
                                   Stock_Id: mongoose.Types.ObjectId(obj.Product.Stock_Id),
                                   UnitOfMeasure: mongoose.Types.ObjectId(obj.Product.UnitOfMeasure._id),
                                   Quantity: parseInt(obj.Quantity),
                                   Approved_Quantity: parseInt(obj.Quantity),
                                   Approval_Status: parseInt(obj.Quantity),
                                   Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                                   Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                                   Active_Status: true,
                                   If_Deleted: false
                                };          
                                return newObj;
                             });
              
                             PurchaseRequestModel.PurchaseRequest_ProductsSchema.collection.insert(itemArray, function(err_2, result_2) {
                                if(err_2) {
                                   ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Purchase Bill Product Creation Query Error', 'FranchiseePurchaseBill.controller.js', err_2);
                                   res.status(400).send({Status: false, Message: "Some error occurred while creating the Franchisee Purchase Bill Product!."});
                                } else {
                                   var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                                   ReturnData = ReturnData.toString();
                                   res.status(200).send({Status: true, Message: 'New Purchase Requested Successfully Created' });
                                }
                             });   
                      });
                      const CurrentStock = (info) => Promise.all([ 
                        FranchiseeStockModel.FranchiseeStockSchema.findOne({Product_Id: info.Product._id})
                     ]).then(response=> {
                        info = JSON.parse(JSON.stringify(info));
                        if(response[0] !== null) {
                           info.Product.Stock_Id = response[0]._id;
                           return info;
                        } else {
                           async function GetStockId(info_one) {
                              return await StoreStockId(info_one).then(response => { 
                                    info.Product.Stock_Id = response;
                                    return info;
                              });  
                           }
                           function StoreStockId(Info) {
                              return new Promise( (resolve, reject) => {
                                    var Stock = new FranchiseeStockModel.FranchiseeStockSchema({
                                          FranchiseeUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                                          Product_Id: mongoose.Types.ObjectId(Info.Product._id),
                                          Current_Quantity: 0,
                                          UnitOfMeasure: Info.Product.UnitOfMeasure._id,
                                          Active_Status: true,
                                          If_Deleted: false,
                                       });
                                       Stock.save(function(err_1, result_1) {
                                          if(err_1) {
                                             reject(err_1);
                                          }else {
                                             resolve(result_1._id);
                                          }
                                       });
                              });
                           }
                           return GetStockId(info);
                        }
                     });
                     FindStock(ReceivingData.items);
                    }
                }) 
            }
        });
    }
}
// Purchase Request List
exports.PurchaseRequest_List = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
       res.status(400).send({Status: false , Message: "User detail cannot be empty"});
    }
    else {
        
        PurchaseRequestModel.PurchaseRequestSchema.find({'User_Id': mongoose.Types.ObjectId(ReceivingData.User_Id)}, 
        {User_Id: 1, Hub_Id: 1,PurchaseRequest_Date: 1, Expected_Date: 1, PurchaseRequest_Status: 1, PurchaseRequest_RefNo: 1}, {})
        .populate({path: 'Hub_Id', select: ['Name']})
        .populate({path: 'User_Id', select: ['Name']})
        .exec(function(err, result) {
            if(err){
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, ' Purchase Request Data Find Query Error', 'PurchaseRequest.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The  Purchase Request Data!."});
            }
            else {
                var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                ReturnData = ReturnData.toString();                
                res.status(200).send({Status: true, Response: ReturnData });                
            }
        });
    }
}

// purchase requested view
exports.PurchaseRequest_View = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false, Message: "User details cannot be empty"});
    } else if (!ReceivingData.PurchaseRequest_Id || ReceivingData.PurchaseRequest_Id === '') {
        res.status(400).send({Status: false, Message: "Purchase request details cannot be empty"});
    } else {
        PurchaseRequestModel.PurchaseRequestSchema.findOne({'User_Id': mongoose.Types.ObjectId(ReceivingData.User_Id), '_id': mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)}, 
        {User_Id: 1, Hub_Id: 1,PurchaseRequest_Date: 1, Expected_Date: 1, PurchaseRequest_Status: 1, PurchaseRequest_RefNo: 1}, {})
        .populate({path: 'Hub_Id', select: ['Name']})
        .populate({path: 'User_Id', select: ['Name']})
        .exec(function(err, result) {
            if(err){
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, ' Purchase Request Data Find Query Error', 'PurchaseRequest.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The  Purchase Request Data!."});
            }
            else {
               PurchaseRequestModel.PurchaseRequest_ProductsSchema.find({'PurchaseRequest_Id': mongoose.Types.ObjectId(ReceivingData.PurchaseRequest_Id)}, 
               {Quantity: 1, Approved_Quantity: 1, Product_Id: 1})
               .populate({path: 'Product_Id', select: ['Name_withAttribute']})
               .exec(function(err_1, result_1) {
                   if(err_1){
                       ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Data find query error', 'PurchaseRequest.controller.js', err_1);
                       res.status(417).send({Status: false, Message: "Some error in finding product list in purchase request"});
                   }
                   else {
                       const _ReturnData = {'PurchaseRequest_Details': result, 'PurchaseRequest_Product_Details': result_1}
                       var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(_ReturnData), 'SecretKeyOut@123');
                       ReturnData = ReturnData.toString();                
                       res.status(200).send({Status: true, Response: ReturnData });
                   }
               });  
            }
        });
    }
}

// purchase requested update
exports.PurchaseRequest_Update = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
  
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false, Message: "User details cannot be empty"});
    } else {
        PurchaseRequestModel.PurchaseRequestSchema.findOne({User_Id: ReceivingData.User_Id, _id: ReceivingData.PurchaseRequest_Id}, {})
        .exec(function(err, result) {
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Request Data find query error', 'PurchaseRequest.controller.js', err_1);
                res.status(417).send({Status: false, Message: "Some error in finding product list in purchase request"});
            }
            else {
                const findProduct = (Product_Data) => Promise.all(
                Product_Data.map(obj => updateProduct(obj))   
                ).then(response => {                    
                    var PurchaseOrder = new PurchaseOrderModel.PurchaseOrderSchema({
                        Hub_Id: mongoose.Types.ObjectId(result.Hub_Id),
                        Franchisee_Id: mongoose.Types.ObjectId(result.User_Id),
                        PurchaseRequest_RefNo: result.PurchaseRequest_RefNo,
                        PurchaseRequest_Date: result.PurchaseRequest_Date,
                        Expected_Date: result.Expected_Date,
                        Current_Status: 'Request',
                        Created_By : mongoose.Types.ObjectId(result.User_Id),
                        Last_Modified_By : mongoose.Types.ObjectId(result.User_Id),
                        Active_Status: true,
                        If_Deleted: false,
                    });
                    PurchaseOrder.save(function(err_1, result_1) {
                        if(err_1) {
                            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Purchase Request Creation Query Error', 'PurchaseRequest.controller.js', err);
                            res.status(400).send({Status: false, Message: "Some error occurred while creating the  Purchase Request!."});
                            console.log(err_1);
                            
                        }
                        else {
                            PurchaseRequestModel.PurchaseRequestSchema.update({User_Id: ReceivingData.User_Id, _id: ReceivingData.PurchaseRequest_Id}, {$set: {PurchaseRequest_Status: 'Approved'}})
                            .exec(function(err_2, result_2) {
                                if(err_2) {
                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Purchase Order Creation Query Error', 'PurchaseRequest.controller.js', err);
                                    res.status(400).send({Status: false, Message: "Some error occurred while creating the  Purchase order!."});
                                }
                                else {
                                    PurchaseRequestModel.PurchaseRequest_ProductsSchema.find({PurchaseRequest_Id: ReceivingData.PurchaseRequest_Id})
                                    .exec((err_3, result_3)=>{
                                    if(err_3) {
                                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Purchase Order Creation Query Error', 'PurchaseRequest.controller.js', err);
                                        res.status(400).send({Status: false, Message: "Some error occurred while creating the  Purchase order!."});
                                    }
                                    else {
                                        const listProduct = (listItem) => Promise.all(
                                            listItem.map(obj => getList(obj))
                                        ).then( response => {
                                            const itemArray_1 = response.map(obj_1 => {
                                                const newObj_1 = {
                                                    PurchaseRequest_Id: mongoose.Types.ObjectId(result_1._id),
                                                    Product_Id: mongoose.Types.ObjectId(obj_1.Product_Id),
                                                    Requested_Quantity: obj_1.Approved_Quantity,
                                                    UnitOfMeasure: mongoose.Types.ObjectId(obj_1.UnitOfMeasure),
                                                    Created_By:  mongoose.Types.ObjectId(obj_1.Created_By),
                                                    Last_Modified_By: mongoose.Types.ObjectId(obj_1.Last_Modified_By),
                                                    Active_Status: true,
                                                    If_Deleted: false
                                                }
                                                return newObj_1;
                                            });
                                            PurchaseOrderModel.PurchaseOrder_ProductsSchema.collection.insert(itemArray_1, function(err_3, result_3) {
                                                if(err_3) {
                                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Purchase Order Creation Query Error', 'PurchaseRequest.controller.js', err);
                                                    res.status(400).send({Status: false, Message: "Some error occurred while creating the  Purchase order!."});
                                                } else {
                                                    res.status(200).send({Status: true, Response: "Successfully placed order" });                
                                                }
                                            })

                                        });
                                        const getList = (info) => Promise.all([
                                            PurchaseRequestModel.PurchaseRequest_ProductsSchema.findOne({ Product_Id: info. Product_Id,  PurchaseRequest_Id: info. PurchaseRequest_Id }),
                                        ]).then(response => {
                                            info = JSON.parse(JSON.stringify(info));
                                            return info
                                        });
                                        listProduct(result_3)
                                    }
                                    });
                                }
                            });
                        }
                    });
                });
                const updateProduct = (info) => Promise.all([
                    PurchaseRequestModel.PurchaseRequest_ProductsSchema.update({'_id': info._id}, {$set: {Approved_Quantity: info.Approved_Quantity}})
                    .exec()
                ]).then(response => {
                    return info;
                });
                findProduct(ReceivingData['Product_Data'].Products);
            }
        });
    }
}