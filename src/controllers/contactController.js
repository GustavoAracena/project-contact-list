const { async } = require('regenerator-runtime');
const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('contact', {
        contact: {}
    });
};

exports.register = async (req, res) => {

    // res.send('Contact registered.');

    try {
        const contact = new Contact(req.body);

        await contact.register();
        console.log(contact);
        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(function() {
                return res.redirect('/contact/index');
            });
            return;
        }

        req.flash('success', 'Contact registered successfully.');
        req.session.save(function() {
            return res.redirect(`/contact/index/${contact.contact._id}`);
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async function(req,res) {
    try {
        if(!req.params.id) return res.render('404');
        const contact = await Contact.idSearch(req.params.id);
        if(!contact) return res.render('404');
        res.render('contact', { contact });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.edit = async function(req,res) {
    try {
        if(!req.params.id) return res.render('404');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);
        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(function() {
                return res.redirect(`/contact/index/${contact.contact._id}`);
            });
            return;
        }

        req.flash('success', 'Contact edited successfully.');
        req.session.save(function() {
            return res.redirect(`/contact/index/${contact.contact._id}`);
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.delete = async function(req,res) {
    try {
        if(!req.params.id) return res.render('404');
        const contact = await Contact.delete(req.params.id);
        if(!contact) return res.render('404');
        req.flash('success', 'Contact deleted successfully.');
        req.session.save(function() {
            return res.redirect('/');
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};
