const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
	name: { type: String, require: true },
	lastName: { type: String, require: false, default: '' },
	email: { type: String, require: false, default: '' },
	telephone: { type: String, require: false, default: '' },
	createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
	this.body = body;
	this.errors = [];
	this.contact = null;
}

Contact.idSearch = async function(id) {
	if(typeof id !== 'string')	return;
	const user = await ContactModel.findById(id);
	return user;
};

Contact.prototype.register = async function() {
	this.isValid();
	if(this.errors.length > 0) return;
	this.contact = await ContactModel.create(this.body);
};

Contact.prototype.isValid =  function() {
	this.cleanUp();

	if(!this.body.name) this.errors.push('Name is a required field.');
	if(!this.body.email && !this.body.telephone) this.errors.push('At least one contact is required: email or telephone.');
	if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email is not valid.');
};

Contact.prototype.cleanUp = function() {
	for(const key in this.body) {
		if(typeof this.body[key] !== 'string') {
			this.body[key] = '';
		}
	}

	this.body = {
		name: this.body.name,
		lastName: this.body.lastName,
		email: this.body.email,
		telephone: this.body.telephone,
	};
};

Contact.prototype.edit = async function(id) {
	if(typeof id !== 'string') return;
	this.isValid();
	if(this.errors.length > 0) {
		this.contact = await Contact.idSearch(id);
		return;
	}
	this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
};

module.exports = Contact;
