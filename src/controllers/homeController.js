const Contact = require('../models/ContactModel')

exports.index = async (req, res) => {
	const contacts = await Contact.contactsSearch();
	res.render('index', { contacts });
};
