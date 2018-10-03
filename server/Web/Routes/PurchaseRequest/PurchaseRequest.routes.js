module.exports = function(app) {
    var Controller = require('./../../Controller/PurchaseRequest/PurchaseRequest.controller.js');

    app.post('/API/Purchase_Request/Purchase_Request_Create', Controller.PurchaseRequest_Create);
    app.post('/API/Purchase_Request/Purchase_Request_List', Controller.PurchaseRequest_List);
    app.post('/API/Purchase_Request/Purchase_Request_View', Controller.PurchaseRequest_View);
    app.post('/API/Purchase_Request/Purchase_Request_Update', Controller.PurchaseRequest_Update);
}