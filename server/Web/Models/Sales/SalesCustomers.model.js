var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Customers Schema
   var CustomersSchema = mongoose.Schema({
      Customer_Name: { type : String , required : true},
      Contact_No: { type : String , required : true},
      GST_No: { type : String , required : true},
      Email_Id: { type : String },
      Address: { type : String },
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarCustomer = mongoose.model('Customers', CustomersSchema, 'Sales_Customers');


   module.exports = {
      CustomersSchema : VarCustomer,
   };