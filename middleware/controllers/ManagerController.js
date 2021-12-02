const User = require('../model/Authentication');
const Staff = require('../model/Staff');
const Orders = require('../model/Invoices');
const Products = require('../model/Products');
const fs = require('fs');



function print() {;
    console.log('Ok')
}
class ManagerController {

    show(req, res) {
        res.redirect('/manager/dashboard');
        
    }


    dashboard(req, res,next) {
        
        var orders_list;
        //Take order form db
        Orders.find({})
            .then( orders => {
                orders_list = orders.map(order => order.toObject());
            });
        
        Products.find({})
            .then( products => {

                products = products.map( product => product.toObject());

                //Current month, year
                const current = new Date();
                const current_month = current.getMonth() + 1;
                const current_year = current.getFullYear();
                //Number of successed orders this month
                let month_orders =
                     orders_list.filter(order => {
                         return ((order.invoice_date).getMonth() + 1) === current_month;
                    });
                // Revenue this month
                let revenue = month_orders.reduce(function(total, order) {
                    return total + order.invoice_cost;
                }, 0);
                //Number of product import this month
                let products_this_month =
                        products.filter( product => {
                            return (product.createdAt !== undefined)&&(product.createdAt).getMonth() === (current_month - 1);
                        });
                //Revenue for each month:
                let revenue_all_month = [0,0,0,0,0,0,0,0,0,0,0,0];
                for(let i = 0; i<12; i++) {
                    revenue_all_month[i] =
                         orders_list.reduce(function(total, order) {
                            if((order.invoice_date).getMonth() == i) {
                                return total + order.invoice_cost;
                            }
                            else {
                                return total + 0;
                            }
                         },0)
                }
                //standardized revenue to million VND
                revenue_all_month = revenue_all_month.map(revenue => revenue/1000000);

                res.render('dashboard', {
                    revenue_all_month,
                    products_this_month,
                    revenue,
                    month_orders,
                    orders_list,
                    products,
                    layout:'main'
                })
            })
            .catch(next);
    }

    showStaff(req,res,next) {
        
        Staff.find({})
            .then(staffs => {
                staffs = staffs.map( staff => staff.toObject());
                res.render('staff_management', {
                    staffs,
                    layout: 'main'
                })
            })
            .catch(next)
    }

    saveStaffInfo(req,res,next) {
        const formData = req.body;
        formData.staff_img = '/static/' +  req.file.path.split('\\').slice(1).join('/');
        
        const newStaff = new Staff(formData);
        newStaff.save()
            .then(() => {
                //Refresh page:  back to the page the request came from.
                res.redirect(req.get('referer'));
            })
            .catch(next);
    }

    showEditPage(req, res, next) {
        
        Staff.findOne({staff_code: req.params.id})
            .then(staff => {
                staff = staff.toObject();
                res.render('staff_edit', {
                    staff,
                    layout: 'main'
                })
            })
            .catch(next)
    }

    updateStaffInfo(req, res, next) {
        const formData = req.body;

        if(req.file) {
            //if update image, delete the old one
            Staff.findOne({staff_code: req.params.id})
                .then(staff => {
                    var old_img = 'public/' + staff.staff_img.split('/').slice(2).join('/');
                    fs.unlink(old_img, function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('File deleted!');
                    });
                })
                .catch()
            //UPdate with the new one
            formData.staff_img = '/static/' + req.file.path.split('\\').slice(1).join('/');
        }

        Staff.updateOne({staff_code: req.params.id}, formData)
            .then(()=> {
                res.redirect('/manager/staff-management');
            })
            .catch( error => {
                res.redirect(req.get('referer'));
            });
    }

    deleteStaffInfo(req, res, next) {
        Staff.deleteOne({staff_code: req.params.id})
            .then(() => {
                res.redirect('/manager/staff-management');
            })
            .catch(next);
    }
}

module.exports = new ManagerController;
