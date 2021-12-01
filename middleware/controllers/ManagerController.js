const User = require('../model/Authentication');
const Staff = require('../model/Staff');
const fs = require('fs');

class ManagerController {

    show(req, res) {
        
        User.findOne({_id: req.cookies.userId})
            .then((auth) => {
                if(auth.role != 'Manager') {
                    res.redirect('/staff')
                    return;
                }
                res.render('dashboard', {layout:'main'});
            })
        
    }


    dashboard(req, res) {
        res.render('dashboard', {layout:'main'});
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
