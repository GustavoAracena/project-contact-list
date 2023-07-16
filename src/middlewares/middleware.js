module.exports.globalMiddleware = (req, res, next) => {
	console.log('Global middleware');

	next();
};

module.exports.checkCsrfError = (err, req, res, next) => {
	if(err && 'EBADCSRFTOKEN' === err.code) {
		return res.render('404');
	}
};

module.exports.csrfMiddleware = (req, res, next) => {
	res.locals.csrfToken = req.csrfToken();
	next();
};
