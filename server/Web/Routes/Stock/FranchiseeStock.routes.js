module.exports = function(app) {
    var Controller = require('./../../Controller/Stock/FranchiseeStock.controller.js');

    app.post('/API/FranchiseeStock/FranchiseeStock_Create', Controller.FranchiseeStock_Create);
    app.post('/API/FranchiseeStock/FranchiseeStock_List', Controller.FranchiseeStock_List);
    app.post('/API/FranchiseeStock/FranchiseeStock_History_List', Controller.FranchiseeStock_History_List);
    app.post('/ApI/FranchiseeStock/FranchiseeStock_Update', Controller.FranchiseeStock_Update);
}