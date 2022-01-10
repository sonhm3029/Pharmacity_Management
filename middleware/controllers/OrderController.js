
const User = require('../model/Authentication');
const Products = require('../model/Products');
const Invoices = require('../model/Invoices');
const InvoicesDetails = require('../model/InvoicesDetails');
class OrderController {


    show(req, res, next) {
        var products_code_list;
        var products_name_list;
        var products_price_list;
        

        Products.find({})
            .then(products => {
                var str = 'OK';
                products_code_list = products.map( product => {
                    product = product.toObject();
                    return product.product_code
                });
                products_name_list = products.map( product => {
                    product = product.toObject();
                    return product.product_name;
                });
                products_price_list = products.map( product => {
                    product = product.toObject();
                    return product.product_price_out;
                });

                //Take invoices after create
                Invoices.find({})
                    .then( invoices => {
                        
                        invoices = invoices.map( invoice => {
                            invoice = invoice.toObject();
                            return invoice;
                        })

                        var page_index = [];
                        var page_number = Math.ceil((invoices.length)/20);
                        for(let i = 0; i<page_number; i++) {
                            page_index.push(i + 1);
                        }

                        res.render('order',{
                            product_code_list: JSON.stringify(products_code_list),
                            product_name_list: JSON.stringify(products_name_list),
                            product_price_list: JSON.stringify(products_price_list),
                            invoices,
                            page_index,
                            layout:'staff_layout'
                        })
                    })
                    .catch(next);


                
            })
   

        

    }

    saveInvoice(req, res, next) {

        //Pre processing data
        const formData = req.body;
        
        // Take product_id and quantity from req.body
        // And change to list_products to save
        var list_products = [];
        var list_products_code;
        var list_products_quantity;
        var update_products_quantity;
        // var list_products_name;
        var list_products_price;

        if(!Array.isArray(formData.product_code)) {
            list_products_code = [formData.product_code];
            list_products_quantity = [formData.product_quantity];
            // list_products_name = [formData.product_name];
            list_products_price = [formData.product_price];
        }
        else {
            list_products_code = formData.product_code;
            list_products_quantity = formData.product_quantity;
            // list_products_name = formData.product_name;
            list_products_price = formData.product_price;
        }

        // Make new record in InvoiceDetails collections:
        for(var i = 0; i<list_products_code.length; i++) {
            var new_product = {};
            new_product.invoice_code = formData.invoice_code;
            new_product.product_code = list_products_code[i];
            new_product.invoice_product_quantity = list_products_quantity[i];
            new_product.invoice_product_total = 
                Number(list_products_quantity[i]) * Number(list_products_price[i]);

            list_products.push(new_product);
        }

        //Update product quantity after take from product db
        let changed_products = Products.find({product_code: list_products_code});
        changed_products.exec()
            .then(products => {

                let old_products_quantity =
                    products.map(product => Number(product.product_quantity));
                var new_products_quantity = [];

                for(let i = 0; i<old_products_quantity.length; i++) {
                    products[i].product_quantity =
                        (Number(old_products_quantity[i]) - Number(list_products_quantity[i]));
                }
            
                //UPdate db
                products.forEach(function(product) {
                    Products.updateOne({product_code: product.product_code},product )
                        .then(()=>{
                            console.log('OK');
                        })
                        .catch(next);
                })
            })
            .catch(next);


        // Delete old invoice field
        delete formData.product_code;
        delete formData.product_quantity;
        delete formData.product_price;
        delete formData.product_name;
        // Create new  invoice field
        formData.invoice_status = 'Đã xử lý';

        // Save data
        const newInvoice = new Invoices(formData);
        
        // Save to order_details table
        InvoicesDetails.insertMany(list_products);

        // Save to orders table
        newInvoice.save()
            .then(() => {
                res.redirect('/order');
            })
            .catch((error) => {
                res.send(error);
            })
    }

   showInvoice(req, res, next) {

        Invoices.findOne({invoice_code: req.params.id})
            .then( (invoice) => {

                if(invoice) {
                    invoice = invoice.toObject();
                    // Find products of invoice
                    InvoicesDetails.find({invoice_code: invoice.invoice_code})
                        .then(async (list_products) => {

                            list_products = list_products.map((product) => {
                                return product.toObject();
                            });

                            var list_products_code =
                                list_products.map(product => product.product_code);
                            var products_detail =
                                await Products.find({product_code: list_products_code});
                            products_detail = products_detail.map(
                                detail => detail.toObject()
                            )
                            for(let i = 0; i< list_products_code.length; i++) {
                                list_products[i].product_price =
                                    products_detail[i].product_price_out;
                                list_products[i].product_name = 
                                    products_detail[i].product_name;
                            }
                            res.render('invoice', {
                                list_products,
                                invoice,
                                layout: 'staff_layout'
                            })
                        })
                        .catch(next);
                }
                else {
                    next();
                }
            })
            .catch(next);
    }

    deleteInvoice(req, res, next) {
        // Delete invoice
        Invoices.deleteOne({invoice_code: req.params.id})
            .then(async() => {
                // Delete invoice detail
                await InvoicesDetails.deleteMany({invoice_code: req.params.id});
                res.redirect('/order');
            })
            .catch(next);
    }


}

module.exports = new OrderController;
