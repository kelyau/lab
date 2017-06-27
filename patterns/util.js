(function(){
	if (!Object.create){
		Object.create = function(o){
			var Fn = function(){}
			Fn.prototype = o;
			return new Fn;
		}
	}
})()