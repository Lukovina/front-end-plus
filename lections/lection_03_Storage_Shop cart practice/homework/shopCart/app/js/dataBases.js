function connectDB(f){
	var request = indexedDB.open("Goods_DB", 3);
	request.onerror = function(err){
		console.log(err);
	};
	request.onsuccess = function(){
		f(request.result);
	}
	request.onupgradeneeded = function(e){
        var data_default = e.currentTarget.result.createObjectStore("goods", { 
            keyPath: "key",
            autoIncrement: true
        });
        
        for (let item of JSON.parse(localStorage.getItem("goods"))) {
            data_default.add(item);
        }

		connectDB(f);
	}
}

// connectDB(function(db) {
//     var transaction = db.transaction(["goods"], "readwrite")
//      .objectStore('goods');
//     transaction.add(info);
// });

module.exports = { 
    connectDB
};
