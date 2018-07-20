let list = JSON.parse(localStorage.getItem("goods"))

function connectDB(){
	var request = indexedDB.open("Goods_DB", 3);
	request.onerror = function(err){
		console.log(err);
	};
	request.onsuccess = function(){
		console.log("db ready")
	}
	request.onupgradeneeded = function(e){
        var data_default = e.currentTarget.result.createObjectStore("goods", { 
            keyPath: "id",
            autoIncrement: true
        });
        
        for (let item of list) {
            data_default.add(item);
        }

		connectDB();
	}
}

module.exports = { 
    connectDB
}
