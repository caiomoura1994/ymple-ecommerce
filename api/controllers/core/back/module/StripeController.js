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

        var idOrder = req.params.idPayment;

        console.log("idOrder", idOrder);
        console.log("stripeController - req", req.body);

        let secretKey = "sk_test_oN51ofGps3tFXiHwJcKw3Yg1";
        let amount = 999;
        let currency = 'eur';
        let description = "Example charge";

        var result = {};

        var stripe = require("stripe")(secretKey);

        // Token is created using Checkout or Elements!
        // Get the payment token ID submitted by the form:
        const token = req.body.stripeToken; // Using Express

        console.log("token", token);

        saveCard(res, secretKey, token);

        let test = 0;

        if (test == 1){

            const charge = stripe.charges.create({
                amount: amount,
                currency: currency,
                description: description,
                source: token,
            });


            charge.then(function (data) {

                    console.log('charge data ', data);
                    console.log("stripeController - charge", charge);
                    result.templateToInclude = 'yes';
                    result.pathToInclude = '';
                    return res.view(pathTemplateBackCore + 'module/stripe/success.ejs', result);

                })

                .catch((err) => {
                // Handle any error that occurred in any of the previous
                // promises in the chain.
                console.log("StripeController - err", err);
            return res.view(pathTemplateBackCore + 'module/stripe/error.ejs', result);
        });

        }
    }
}


function saveCard(res, secretKey, token) {

    var result = {};


    var stripe = require("stripe")(secretKey);

    (async function () {
        // Create a Customer:
        const customer = await stripe.customers.create({
            source: token,
            email: 'paying.user@example.com',
        });

        console.log ( "customer", customer);
        let customerId = customer.id;
        console.log ( "customer id", customerId);

        // Charge the Customer instead of the card:
        const charge = await stripe.charges.create({
            amount: 1000,
            currency: 'eur',
            customer: customerId,
            description: "charge 1"
        }).then(function(data){

            console.log("StripeController - saveCard - charge data", data);
            return res.view(pathTemplateBackCore + 'module/stripe/success.ejs', result);

        }).catch(function(err){
            console.log("saveCard - err", err);
            return res.view(pathTemplateBackCore + 'module/stripe/error.ejs', result);
        });


        /*const charge2 = await stripe.charges.create({
         amount: 1000,
         currency: 'eur',
         customer: customerId,
         description: "charge 2"
         });*/

        // YOUR CODE: Save the customer ID and other info in a database for later.

    })();


}




