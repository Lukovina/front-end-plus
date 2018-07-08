function load(method, path) {

    let xhr = new XMLHttpRequest();

    xhr.open(method, path, true);
    let async = new Promise(function(resolve, reject){
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) {
                return;
            }

            resolve(JSON.parse(xhr.responseText));
        }
    });

    xhr.send();

    return async;
}

module.exports = { 
    load
};
