//Create an array method to check if an element exists in this array
var has = function(array, value) {

	var i;

	for (var i = 0; i < array.length; i++) {
		if (array[i] === value) {
			return true;
		}
	}
	return false;
};

exports.has = has;