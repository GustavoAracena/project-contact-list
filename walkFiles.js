const fs = require('fs').promises;
const path = require('path');

// Aqui estamos importando as funções do node, sendo o FileSystem uma delas
// Vamos usar promises no FileSystem para lidar com o tempo de execução

async function readdir(rootDir) {
    rootDir = rootDir || path.resolve(__dirname);
	const files = await fs.readdir(rootDir);
	walk(files, rootDir);
}

async function walk(files, rootDir) {
	for(let file of files) {
		const fileFullPath = path.resolve(rootDir, file)
		const stats = await fs.stat(fileFullPath);

		// if(/\.git/g.test(fileFullPath)) cotinue;
		// if(/node_modules/g.test(fileFullPath)) cotinue;
		//Estamos excluindo as pastas de git e node_modules por regex
		// Pois não queremos trazer os arquivos dessas pastas

		if(stats.isDirectory()) {
			readdir(fileFullPath);
			continue;
		}
		console.log(fileFullPath);
	}
}

readdir('/Users/gustavoaracena/Desktop/JS_Udemy/project-contact-list')
