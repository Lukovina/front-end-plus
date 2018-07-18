    var model = [];

function initialCondition() {
    return model
}

function load(method, path) {

    let xhr = new XMLHttpRequest();

    xhr.open(method, path, true);
    let async = new Promise(function(resolve, reject){
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) {
                return;
            }
            if(xhr.status!==200) {
               reject()
            }
            let res =  JSON.parse(xhr.responseText)
            resolve(res);
        }
    });

    xhr.send();

    return async;
}


module.exports = { 
    load, 
    initialCondition
};
