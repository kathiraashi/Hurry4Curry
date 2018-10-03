var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FranchiseeCustomer_BillSchema = mongoose.Schema({
   Customer_Id: { type: Schema.Types.ObjectId, ref: 'Customer' },
   Bill_Number: { type : String },
   Bill_Number_Length: { type: Number},
   Bill_Date: { type : Date },
   Net_Amount: {type: String},
   Payment_Method: {type: String},
   Reference_Number: { type: String },
   Date: {type: Date },
   Created_By : { type: Schema.Types.ObjectId, ref: 'Franchisee'},
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Franchisee'},
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps : true }
);
 var VarFranchiseeCustomer_Bills = mongoose.model('FranchiseeCustomer_Bills' ,FranchiseeCustomer_BillSchema, 'FranchiseeCustomer_Bills');

 var FranchiseeCustomerBill_ProductSchema = mongoose.Schema({
    CustomerBill_Id: {type: Schema.Types.ObjectId, ref: 'HubCustomer_Bills'},
    Product_Id: { type: Schema.Types.ObjectId, ref: 'Products' },
    Price: { type: String},
    Quantity: { type: String},
    Product_Total: {type: String},
    UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },
    { timestamps : true }
);
var VarFranchiseeCustomerBill_Products = mongoose.model('FranchiseeCustomerBill_Products', FranchiseeCustomerBill_ProductSchema, 'FranchiseeCustomerBill_Products_List');

 module.exports = {
   FranchiseeCustomer_BillSchema : VarFranchiseeCustomer_Bills,
   FranchiseeCustomerBill_ProductSchema : VarFranchiseeCustomerBill_Products
 };