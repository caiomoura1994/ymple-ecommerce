/**
 *
 * @description :: Server-side logic for managing api/payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var CoreReadDbService = require('../../../../services/core/back/CoreReadDbService');
var CoreInsertDbService = require('../../../../services/core/back/CoreInsertDbService');
var ModulePaymentPaypalService = require('../../../../services/core/api/ModulePaymentPaypalService');
var pathTemplateBackCore = sails.config.globals.templatePathFrontCore;
var _ = require('underscore');


const async = require('promise-async')

module.exports = {


    confirmation: function (req, res) {


        console.log ("stripeController - req",  req.body);

        var result = {};

        var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

        // Token is created using Checkout or Elements!
        // Get the payment token ID submitted by the form:
        const token = req.body.stripeToken; // Using Express

        console.log( "token", token);

        const charge = stripe.charges.create({
            amount: 999,
            currency: 'usd',
            description: 'Example charge',
            source: token,
        });


        console.log ( "stripeController - charge", charge);


        result.templateToInclude = 'yes';
        result.pathToInclude = '../module/stripe/confirmation.ejs';

        return res.view(pathTemplateBackCore + 'payment/paypal/success.ejs', result);

        //return res.ok('Payment Paypal Confirmation done');

    }

}



