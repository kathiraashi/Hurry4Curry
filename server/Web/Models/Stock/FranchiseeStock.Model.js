var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FranchiseeStockSchema = mongoose.Schema({
      Product_Id: { type: Schema.Types.ObjectId, ref: 'Products'},
      Current_Quantity: { type: Number, require: true},
      UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
      FranchiseeUser_Id: { type : Schema.Types.ObjectId, ref: 'Franchisee' },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);

var FranchiseStockHistorySchema = mongoose.Schema({
      FranchiseeProduct_Stock_Id: {type: Schema.Types.ObjectId, ref: 'Franchisee_Product_Stock'},
      Product_Id: {type: Schema.Types.ObjectId, ref: 'Products'},
      Previous_Quantity: { type: String, require: true},
      Current_Quantity: { type: String, require: true },
      Added_Quantity: { type: Number },
      Removed_Quantity: { type: Number },
      Reference_Id: { type: String },
      History_From: { type: String, required: true}, // Customer_Bill, Wastage, Direct_Update, Purchase_Receive
      UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
      FranchiseeUser_Id: { type: Schema.Types.ObjectId, ref: 'Franchise'},
      Active_Status: { type: Boolean, require: true},
      If_Deleted: { type: Boolean, require: true}
   },
   { timestamps: true }
);

var VarFranchiseeStockSchema = mongoose.model('Franchisee_Product_Stock', FranchiseeStockSchema, 'Franchisee_Product_Stock');
var VarFranchiseeStockHistorySchema = mongoose.model('Franchisee_Product_Stock_History', FranchiseStockHistorySchema, 'Franchisee_Product_Stock_History');

module.exports = {
   FranchiseeStockSchema : VarFranchiseeStockSchema,
   FranchiseeStockHistorySchema : VarFranchiseeStockHistorySchema
};