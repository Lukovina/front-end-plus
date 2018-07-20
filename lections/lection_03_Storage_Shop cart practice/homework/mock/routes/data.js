let fs = require('fs');
let path = '.';

function pathConcat(pathname) {
	return path + '/' + pathname;
}

function filereader(fsRef, path) {
	return new Promise(function (resolve, reject) {
		fsRef.readFile(path, 'utf8', function (e, d) {

			if (e) reject(e);

			else resolve(JSON.parse(d));
		});
	});
}

function dirreader(fsRef, path){
	return new Promise(function (resolve, reject) {
		fsRef.readdir(path, (err, contents)=>{
			if (err) reject(err);
			else resolve(contents);
		});
	});
}

// function getUserbyId(req, res) {
// 	let path = pathConcat('api' + req.url + '/' + req.method.toLowerCase() + '.json'),
// 		servicePromise = filereader(fs, path);
	
// 	servicePromise
// 		.then((response) => {
// 			res.json(response);
// 		});
// }

function getUsers(req, res) {
		path = pathConcat('api' + req.url)
		dirreader(fs, path)
			.then(response=>response.map(element => {
				let filePath = pathConcat(element + '/' + req.method.toLowerCase() + '.json')
				return filereader(fs, filePath)
			}))
			.then(val=>Promise.all(val))
			.then(files=>res.send(files))
}

async function getUsersWithActions(req, res){
let first,
	last,
	servicePromise,
	path

await dirreader(fs, './api/users')
	.then(data=>{
		first = `./api/users/${data[0]}/${req.method.toLowerCase()}.json`
		last = `./api/users/${data[data.length-1]}/${req.method.toLowerCase()}.json`
	})
	
switch(req.url) {
	case '/users/first': path = first
	break
	case '/users/last': path = last
	break
	}
servicePromise = filereader(fs, path);

	servicePromise
		.then((response) => {
			res.json(response);
		})
		.catch(e=>console.log(e))
}


module.exports = { pathConcat, getUsers, getUsersWithActions };
