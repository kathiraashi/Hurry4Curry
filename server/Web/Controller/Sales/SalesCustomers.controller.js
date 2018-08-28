var CryptoJS = require("crypto-js");
var SalesCustomerModel = require('./../../Models/Sales/SalesCustomers.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');


// ************************************************** Customers *****************************************************
// Customers Create -----------------------------------------------
   exports.Customers_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Customer_Name || ReceivingData.Customer_Name === '' ) {
         res.status(400).send({Status: false, Message: "Customer Name can not be empty" });
      } else if(!ReceivingData.Contact_No || ReceivingData.Contact_No === '' ) {
         res.status(400).send({Status: false, Message: "Contact No can not be empty" });
      } else if(!ReceivingData.GST_No || ReceivingData.GST_No === '' ) {
         res.status(400).send({Status: false, Message: "GST No can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_Customers = new SalesCustomerModel.CustomersSchema({
            Customer_Name: ReceivingData.Customer_Name, 
            Contact_No: ReceivingData.Contact_No, 
            GST_No: ReceivingData.GST_No, 
            Email_Id: ReceivingData.Email_Id, 
            Address: ReceivingData.Address, 
            Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_Customers.save(function(err, result) { // Customers Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sales Customers Creation Query Error', 'SalesCustomers.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Customers!."});
            } else {
               SalesCustomerModel.CustomersSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Customers FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'sales Customers Find Query Error', 'SalesCustomers.controller.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Customers!."});
                  } else {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
                  }
               });
            }
         });
      }
   };
