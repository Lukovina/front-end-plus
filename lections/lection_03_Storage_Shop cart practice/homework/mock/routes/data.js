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

// function getBuildings(req, res) {
// 	let path = pathConcat('api' + req.route.path + '/' + req.method.toLowerCase() + '.json'),
// 		servicePromise = filereader(fs, path);

// 	console.log(path);
	
// 	servicePromise
// 		.then((response) => {
// 			// let newList = response.results.filter(item => item.price);

// 			// response.results = newList;

// 			return response;
// 		})
// 		.then((response) => {
// 			res.json(response);
// 		});
// }


function getUserbyId(req, res) {
	let path = pathConcat('api' + req.url + '/' + req.method.toLowerCase() + '.json'),
		servicePromise = filereader(fs, path);

	console.log(req);
	
	servicePromise
		.then((response) => {
			res.json(response);
		});
}

function getUsers(req, res) {


	fs.readFile('./users/001/get.json', 'utf8', function(err, contents) {
		console.log(contents);
	});
	
	// let path = pathConcat('api' + req.url + '/' + req.method.toLowerCase() + '.json'),
	// 	servicePromise = filereader(fs, path);

	// console.log(req);
	
	// servicePromise
	// 	.then((response) => {
	// 		res.json(response);
	// 	});
}


module.exports = { pathConcat, getUserbyId, getUsers };