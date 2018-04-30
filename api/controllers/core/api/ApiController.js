

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

            console.log('return full product list ', data);

            var result = {};

            //result.products = data;

            //result.templateToInclude = 'product_list';
            //result.pathToInclude = '../product/list.ejs';
            //return res.view(pathTemplateBackCore + 'commun-back/main.ejs', result);



            return res.json(data);

        });







    }

}