require('dotenv').config();
// Extensão que configura as envVars no .env
// ... lembrar de incluir no .gitignora para não compartilhar

const express = require('express');
const app = express();
// Extensão do express que vai ser responsável por gerir o servidor

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING,
	{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to DB')
		app.emit('DB ready');
	})
	.catch(e => console.log(e));
// mongoose, que é a extensão que vai modelar nossos dados e tabelas

const session = require('express-session');
// Extensão para trabalhar com sessões no express permitindo que seja
// ... identificada uma instância do navegador do cliente e que seja
// ... possível salvar cookies de sessão nesse navegador (PC do client)
const MongoStore = require('connect-mongo');
// Ainda sobre sessões, vamos usar o MongoStore pra salvar os
// ... dados de sessões do navegador em um DB e não em memória
// (que é o default), permitindo que salvemos mais dados sem ficar
// ... sem memória para processamento no servidor
const flash = require('connect-flash');
// Flash messages salvos no DB através do uso de sessões;

const routes = require('./routes');
const path = require('path');
// Routes e path são ferramentas para usar caminhos no server e FS

const helmet = require('helmet');
const csrf = require('csurf');
// Extensões de segurança

const { globalMiddleware, checkCsrfError, csrfMiddleware }
	= require('./src/middlewares/middleware');
// Middlewares (MVC Architecture) - funções executadas na rota

app.use(helmet());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
	secret: 'anything_secret_password',
	store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true
	}
});
app.use(sessionOptions);
app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);


app.on('DB ready', () => {
	app.listen(3000, () => {
		console.log('Access in http://localhost:3000');
		console.log('Connected');
	});
});
