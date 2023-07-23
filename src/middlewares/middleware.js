module.exports.globalMiddleware = (req, res, next) => {
	res.locals.errors = req.flash('errors');
	res.locals.success = req.flash('success');

	next();
};

module.exports.checkCsrfError = (err, req, res, next) => {
	if(err && 'EBADCSRFTOKEN' === err.code) {
		return res.render('404');
	}

	next();
};

module.exports.csrfMiddleware = (req, res, next) => {
	res.locals.csrfToken = req.csrfToken();
	next();
};
