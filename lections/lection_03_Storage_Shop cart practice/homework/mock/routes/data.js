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
	let promises = [],
		path = pathConcat('api' + req.url)
		
	fs.readdir(path, (err, contents)=>{
		contents.forEach(file=>{
		let filePath = pathConcat('api' + req.url + '/' + file + '/' + req.method.toLowerCase() + '.json')

			promises.push(filereader(fs, filePath, 'utf8')) })
			Promise.all(promises)
				.then((data)=>res.json(data))
	})
	
}

function getUsersWithActions(req, res){

console.log(req)

}


module.exports = { pathConcat, getUserbyId, getUsers, getUsersWithActions };
