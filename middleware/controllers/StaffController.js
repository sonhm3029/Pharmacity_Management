
const User = require('../model/Authentication');
const Products = require('../model/Products');
const Staffs = require('../model/Staff');
const Report = require('../model/Reports');
const ReportsFiles = require('../model/ReportFiles');

const fs = require('fs');

const cloudinary = require('../cloudinary');
const Reports = require('../model/Reports');

function deleteTempFile(path) {
    fs.unlink(path, function (err) {
        console.log(path);
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('Temp File deleted!');
    });
}

class StaffController {

    

    show(req, res, next) {

        User.findOne({_id: req.cookies.userId})
            .then((auth)=> {
                if(auth.role != 'Staff') {
                    res.redirect('/manager');
                    return;
                }
                
                Products.find({})
                    .then( (products) => {
                        products = products.map( product => product.toObject());
                            //change date and time 
                            res.locals.page_number = 1;
                            res.render('product_manage', {
                                products,
                                layout: 'staff_layout'
                            });
                            
                    })
                    .catch(next);


            })
            .catch(next);
        
    }

    show_product(req, res, next) {
        Products.find({})
            .then( (products) => {
                products = products.map( product => product.toObject());
                var page_index = [];
                for(var i = 1; i<= Math.ceil((products.length)/20); i++) {
                    page_index.push(i);
                }
                let page_number = (req.query.page) ||1;
                const product_perpage = 20;

                products = products.slice((page_number-1)*product_perpage, (page_number-1)*product_perpage + product_perpage );
                
                
                res.locals.page_number = page_number;
                res.render('product_manage', {
                    products,
                    page_index,
                    layout: 'staff_layout'
                });
            })
            .catch(next);
    }


    show_import_report_page(req, res, next) {
        Staffs.find({})
            .then(staffs => {

                staffs = staffs.map( staff => staff.toObject());

                res.render('create_import', {
                    layout: 'staff_layout',
                    staffs
                });
            })
            .catch(next)
    }

    async save_import_report(req, res, next) {
        const formData = req.body;

        var result_files = [];
        for(let i = 0; i< req.files.length; i++) {

            var file =
             await cloudinary.v2.uploader.upload(
                (req.files[i]).path,
                {
                    folder:"reports"
                }
             );

            deleteTempFile((req.files[i]).path);
            var file_result = {
                url: file.secure_url,
                id: file.public_id
            }

            result_files.push(file_result);
        }


        // Save new record in reports table
        const newReport = new Report(formData);
        await newReport.save()
            .then((report) => {
                result_files =
                    result_files.map(file => {
                        file.report_link = report.report_link;
                        return file;
                    });
                // Save new record in reportfiles table
                ReportsFiles.insertMany(result_files);
                res.redirect('/staff/my-report');
            })
            .catch(next);
        
    }

    show_my_report_page(req, res, next) {

        Report.find({})
            .then( (reports) => {

                reports = reports.map( report => report.toObject());

                res.render('report_list',
                {
                    layout:"staff_layout",
                    reports
                });
            })
        
    }

    show_report_detail(req, res, next) {
        Report.findOne({report_link: req.params.report_link})
            .then(report => {
                
                report = report.toObject();
                Staffs.findOne({staff_code: report.staff_code })
                    .then( async(staff) => {

                        staff = staff.toObject();
                        let report_files =
                            await ReportsFiles.find({
                                report_link: report.report_link
                            });
                        report_files =
                            report_files.map(file => file.toObject());

                        res.render('report_detail', {
                            layout:'staff_layout',
                            report,
                            staff,
                            report_files
                        });
                    })
                
            })
            .catch(next)
    }

}

module.exports = new StaffController;
