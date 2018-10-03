module.exports = function(app) {
    var Controller = require('./../../Controller/ReceiveProducts/ReceiveProducts.controller.js');

    app.post('/API/Receive_Products/Receive_Products_List', Controller.ReceiveProducts_List);
    app.post('/API/Receive_Products/Receive_Products_View',  Controller.ReceiveProducts_View);
    app.post('/API/Receive_Products/Receive_Products_UpdateStock',  Controller.ReceiveProducts_UpdateStock);
   
}