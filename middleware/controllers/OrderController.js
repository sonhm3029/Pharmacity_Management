
const User = require('../model/Authentication');
const Products = require('../model/Products');
const Invoices = require('../model/Invoices');

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
        var list_products_name;
        var list_products_price;
        if(!Array.isArray(formData.product_code)) {
            list_products_code = [formData.product_code];
            list_products_quantity = [formData.product_quantity];
            list_products_name = [formData.product_name];
            list_products_price = [formData.product_price];

        }
        else {
            list_products_code = formData.product_code;
            list_products_quantity = formData.product_quantity;
            list_products_name = formData.product_name;
            list_products_price = formData.product_price;
        }

        for(var i = 0; i<list_products_code.length; i++) {
            var temp_product = {};
            temp_product.product_code = list_products_code[i];
            temp_product.product_quantity = list_products_quantity[i];
            temp_product.product_name = list_products_name[i];
            temp_product.product_price = list_products_price[i];
            list_products.push(temp_product);
        }

        //Update product quantity after take from product db
        let changed_products = Products.find({product_code: list_products_code});
        changed_products.exec()
            .then(products => {

                let old_products_quantity = products.map(product => Number(product.product_quantity));
                var new_products_quantity = [];

                for(let i = 0; i<old_products_quantity.length; i++) {
                    products[i].product_quantity = (Number(old_products_quantity[i]) - Number(list_products_quantity[i]));
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
        formData.list_products = list_products;
        formData.invoice_status = 'Đã xử lý';

        // Save data
        const newData = new Invoices(formData);
        newData.save()
            .then(() => {
                res.redirect('/order');
            })
            .catch((error) => {
                res.send(error);
            })
    }

    showInvoice(req, res, next) {

        Invoices.findOne({invoice_code: req.params.id})
            .then( invoice => {
                invoice = invoice.toObject();
                res.render('invoice', {
                    invoice,
                    layout: 'staff_layout'
                })
            })
    }

    deleteInvoice(req, res, next) {
        Invoices.deleteOne({invoice_code: req.params.id})
            .then(() => {
                res.redirect('/order');
            })
            .catch(next);
    }


}

module.exports = new OrderController;
