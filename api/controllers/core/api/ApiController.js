

var CoreReadDbService = require('../../../services/core/back/CoreReadDbService');
var CoreInsertDbService = require('../../../services/core/back/CoreInsertDbService');
var ModulePaymentPaypalService = require('../../../services/core/api/ModulePaymentPaypalService');
var pathTemplateBackCore =  sails.config.globals.templatePathFrontCore;
var _ = require('underscore');


const async = require('promise-async')

module.exports = {

    test: function (req, res) {

        var data = {'data':'test'};
        return res.ok(data);
    },

    // return a json containing all the product
    product: function ( req, res){

        CoreReadDbService.getProductList().then(function (data) {

            console.log('ApiController - product', data);

            return res.json(data);

        });

    },


    category: function ( req, res){

        CoreReadDbService.getCategoryList().then(function (data) {

            console.log('ApiController - category ', data);

            return res.json(data);

        });

    },





}