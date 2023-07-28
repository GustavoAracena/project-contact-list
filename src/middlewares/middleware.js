module.exports.globalMiddleware = (req, res, next) => {
	res.locals.errors = req.flash('errors');
	res.locals.success = req.flash('success');
	res.locals.user = req.session.user;
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

module.exports.loginRequired = (req, res, next) => {
	if(!req.session.user) {
		req.flash('errors', 'You must be logged in.');
		// It's a good practice to always save the sessions before give a redirect.
		req.session.save( () => res.redirect('/login/index'));
		return;
	}

	next();
};
