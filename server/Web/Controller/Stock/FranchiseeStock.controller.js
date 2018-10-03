var CryptoJS = require("crypto-js");
var FranchiseeStockModel = require('./../../Models/Stock/FranchiseeStock.Model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');


// stock create
exports.FranchiseeStock_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));   
   
   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else if (!ReceivingData.Product_Id || ReceivingData.Product_Id === '') {
      res.status(400).send({Status: false, Message:"Product Details can not be empty"});
   }else if (!ReceivingData.Quantity || ReceivingData.Quantity === '') {
      res.status(400).send({Status: false, Message: "Quantity Details can not be empty"});
   }else {
      var FranchiseeStock = new FranchiseeStockModel.FranchiseeStockSchema({
         FranchiseeUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
         Product_Id: mongoose.Types.ObjectId(ReceivingData.Product_Id),
         Current_Quantity: parseInt(ReceivingData.Quantity),
         UnitOfMeasure: mongoose.Types.ObjectId(ReceivingData.UnitOfMeasure),
         Active_Status: true,
         If_Deleted: false,
      });

      FranchiseeStock.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Stock Creation Query Error', 'FranchiseeStock.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Stock!."});
         }else {
            var FranchiseeStockHistory = new FranchiseeStockModel.FranchiseeStockHistorySchema({
               FranchiseeProduct_Stock_Id: result._id,
               FranchiseeUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
               Product_Id: mongoose.Types.ObjectId(ReceivingData.Product_Id),
               Previous_Quantity: 0,
               Current_Quantity: parseInt(ReceivingData.Quantity),
               Added_Quantity: parseInt(ReceivingData.Quantity),
               Removed_Quantity: 0,
               History_From: 'Direct_Update',
               UnitOfMeasure: mongoose.Types.ObjectId(ReceivingData.UnitOfMeasure),
               Active_Status: true,
               If_Deleted: false
            });
            FranchiseeStockHistory.save(function(err_1, result_1){
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Stock History Create query Error', 'FranchiseeStock.controller.js', err_1);
                  res.status(400).send({Status: false, Message: "Some error occurred while creating the Franchisee stock history."});
               }else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};

// stock list
exports.FranchiseeStock_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
    FranchiseeStockModel.FranchiseeStockSchema.find({If_Deleted: false, FranchiseeUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id) }, {}, {sort:{updatedAt: -1}})
      .populate({path: 'Product_Id', select: ['Name_withAttribute']})
      .populate({path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Stock List Find Query Error', 'FranchiseeStock.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Franchisee Stock List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// stock history list
exports.FranchiseeStock_History_List = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.FranchiseeStock_Id || ReceivingData.FranchiseeStock_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Franchisee Stock Details can not be empty" });
   }else {
      StockModel.StockHistorySchema.find({If_Deleted: false, FranchiseeProduct_Stock_Id: mongoose.Types.ObjectId(FranchiseeStock_Id) }, { }, {sort:{Date: -1}})
      .populate({path: 'Product_Id', select: ['Name_withAttribute']})
      .populate({path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Stock History List Find Query Error', 'FranchiseeStock.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Franchisee Stock History List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// stock update
exports.FranchiseeStock_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.Stock_Id || ReceivingData.Stock_Id === '') {
      res.status(400).send({Status: false, Message:"Stock Details can not be empty"});
   }else if (!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: "User Details can not be empty"});
   }else if (!ReceivingData.Quantity || ReceivingData.Quantity === '') {
      res.status(400).send({Status: false, Message: "Quantity Details can not be empty"});
   }else {
         
    FranchiseeStockModel.FranchiseeStockSchema
      .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Stock_Id)}, {}, {})
      .exec(function(err, result){
         if(err) {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Stock Data Find Query Error', 'FranchiseeStock.controller.js', err);
         res.status(417).send({status: false, Message: "Some error occurred while Find The Franchisee Stock Data!."});
         }
         else {
            var Previous_Quantity = result.Current_Quantity;
            result.Current_Quantity = parseInt(result.Current_Quantity) + parseInt(ReceivingData.Quantity);
            result.save(function(err_1, result_1) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Stock Update Query Error', 'FranchiseeStock.controller.js', err_1);
                  res.status(400).send({Status: false, Message: "Some error occurred while Updated the Franchisee Stock Details!."});
               } else {
                  var FranchiseeStockHistory = new FranchiseeStockModel.FranchiseeStockHistorySchema({
                     FranchiseeProduct_Stock_Id: result._id,
                     FranchiseeUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                     Product_Id: mongoose.Types.ObjectId(result.Product_Id),
                     Previous_Quantity: Previous_Quantity,
                     Added_Quantity: parseInt(ReceivingData.Quantity),
                     Current_Quantity: result_1.Current_Quantity,
                     UnitOfMeasure: mongoose.Types.ObjectId(ReceivingData.UnitOfMeasure),
                     Removed_Quantity: 0,
                     History_From: 'Direct_Update',
                     Active_Status: true,
                     If_Deleted: false
                  });
                  FranchiseeStockHistory.save(function(err_2, result_2){
                     if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Stock History creating query Error', 'FranchiseeStock.controller.js', err_2);
                           res.status(400).send({Status: false, Message: "Some error occurred while creating the Franchisee stock history."});
                     }else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      });
   }
}
