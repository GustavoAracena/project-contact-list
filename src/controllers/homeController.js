const HomeModel = require('../models/HomeModel');

// HomeModel.create({
// 	title: 'One more title',
// 	description: 'One more description'
// })
// .then(data => console.log(`${data} saved in documents`))
// .catch(e => console.log(e));

exports.homePage = (req, res) => {
	res.render('index', {
		title: 'This is the home page <span style="color:red;">title</span>',
	});
};

exports.homePagePost = (req, res) => {
	res.send(`Received submit ${req.body}`);
};
