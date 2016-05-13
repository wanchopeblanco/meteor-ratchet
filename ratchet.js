Ratchet = {};

Ratchet.navigation = function(target) {
	const element = document.getElementById(target);

	if(!element){
		console.log('No target');
		return;
	}

	const hammertime = new Hammer(element);
	let isInitial = true;

	hammertime.on('pan', function(event) {
		event.preventDefault();

		// Dont continue with this event if panning is not near border
		if(isInitial && event.center.x > 30){
			return;
		}

		// Dont continue with this event if going back more than initial x
		if(event.deltaX < 0){
			$(element).css('left', 'auto');
			return;
		}

		// Dont continue with this event if panning over an image
		if(event.target.toString() == '[object HTMLImageElement]'){
			return;
		}

		// Set initial to false
		if(isInitial){
			$(element).addClass('moving');
			isInitial = false;
		}

		// Get the distance swiped
		const x = event.distance;

		// Set the x value to the navigation modal
		$(element).css('left', x+'px');

		// If drag ended and x is over 50px go back
		if(event.isFinal && x > 50){
			$(element).removeClass('active').removeClass('moving');
			setTimeout(function() {
				$(element).css('left', 'auto');
				window.history.back();
			}, 200);

			// If is final set initial to true again
			isInitial = true;
		}else if(event.isFinal){// If drag end but x is less than 50 return to left auto
			$(element).css('left', 'auto');

			// If is final set initial to true again
			isInitial = true;
		}
	});
}
