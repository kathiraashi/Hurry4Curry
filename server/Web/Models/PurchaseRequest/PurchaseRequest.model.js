var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FranchiseePurchaseRequestSchema = mongoose.Schema({
    Hub_Id: { type: Schema.Types.ObjectId, ref: 'Hub' },
    User_Id: { type: Schema.Types.ObjectId, ref: 'Franchisee'},
    PurchaseRequest_RefNo: { type: String, unique: true},
    PurchaseRequest_RefNo_Length: { type: Number},
    PurchaseRequest_Date: { type: Date },
    PurchaseRequest_Status: {type: String},
    Expected_Date: { type: Date },
    If_Approved: {type: Boolean, require: true},
    Created_By : { type: Schema.Types.ObjectId, ref: 'Franchisee'},
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Franchisee'},
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },    
    { timestamps : true }
);

var FranchiseePurchaseRequest_ProductsSchema = mongoose.Schema({
   PurchaseRequest_Id: { type: Schema.Types.ObjectId, ref: 'PurchaseRequest' },
   Stock_Id: { type: Schema.Types.ObjectId, ref: 'Franchisee_Product_Stock' }, 
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Products' }, 
   Quantity:{ type: String, required: true },
   Approved_Quantity: { type: String, required: true},
   Approval_Status: {type: Boolean},
   UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
   Created_By : { type: Schema.Types.ObjectId, ref: 'Franchisee', required : true },
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Franchisee', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps : true }
);

var VarPurchaseRequestSchema = mongoose.model('PurchaseRequest' , FranchiseePurchaseRequestSchema, 'FranchiseePurchaseRequestSchema_List');
var VarPurchaseRequest_ProductsSchema = mongoose.model('PurchaseRequest_Products', FranchiseePurchaseRequest_ProductsSchema, 'FranchiseePurchaseRequest_ProductsSchema_List');

module.exports = {
    PurchaseRequestSchema : VarPurchaseRequestSchema,
    PurchaseRequest_ProductsSchema : VarPurchaseRequest_ProductsSchema
}