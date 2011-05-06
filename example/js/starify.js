/*
* starify 0.1.0
* by mrchess
* https://github.com/mrchess
*
* starify depends on raty
* https://github.com/wbotelhos/raty
*/

// config, element to starify, element that will hold the tips
(function() { 
	var starify = function(config) {
		var el = config.el;
		var tipEl = config.tipEl;
		var configClick = config.click;
		var ratyConfig = config;

		var descriptors =  config.hintList;
		//overwrite click
		ratyConfig.click = function(v) {
			this.raty.choice = parseInt(v, 10); // this saves choice so we can use it in tip el

			configClick(v);	
		};
		
		el.raty(ratyConfig); // init raty
		
		//attach hover events when u move on and off stars
		$('.'+el.attr('id')).hover(
			function() {
				tipEl.text($(this).attr('title'));
			},
			function() {
				var choice = $(el).raty.choice; 
				if(el.raty.choice) {
					var text = descriptors[choice-1];
					$(tipEl).text(text);
				} else {
					$(tipEl).text('');
				}
			}
		);	
	};
	
	$.extend({
		starify : starify
	});
}());