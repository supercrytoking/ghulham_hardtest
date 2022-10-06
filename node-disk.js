var native = require('./build/Release/node_disk.node');

function callDiskInfo(path, callback) {
	native.getDiskInfo(path, callback);
}

function callDiskInfoPromise(path) {
	if(typeof Promise !== 'function') {
		throw new Exception('Promise not exists. Please use callback.');
		return;
	}
	return new Promise(function(resolve, reject){
		callDiskInfo(path, function(err, result){
			if(err) reject(result && result.message);
			else resolve(result);
		});
	});
}

exports.getDisk = function(path, callback) {
	var param_num = arguments.length;
	var param_err = false; 
	var arg_type = typeof path;
	var promise = null;
	switch(param_num) {
		case 0: promise = callDiskInfoPromise('');break;
		case 1: 
			arg_type === 'function' ? callDiskInfo('', path) : 
			arg_type === 'string' ? (promise = callDiskInfoPromise(path)) : (param_err = true);
			break;
		case 2: arg_type == 'string' && typeof callback === 'function' ? 
			callDiskInfo(path, callback) : (param_err = true);
		break;
		default: param_err = true;
	}
	if(param_err) throw new Exception('Param error.');
	if(promise) return promise;
};
