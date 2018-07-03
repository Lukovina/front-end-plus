function load(URL) {

    return fetch(URL)
            .then(function(response) {
            return (response.json());
            })
} 

module.exports = {
    load
};