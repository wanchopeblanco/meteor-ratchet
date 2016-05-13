Ratchet = {};

Ratchet.alerts = {};
Ratchet.alerts.callbacks = [];

Ratchet.alerts.loading = function(title = 'Cargando...', options = {}){
	if(!options.image){
		options.image = '/images/defaults/loader.png';
	}

    // Remove any previously created alert
    $('.alert-overlay').remove();

    // Append the new alert to the document body
    $('body').append(
        '<div class="alert-overlay">'+
            '<div class="alert-box">'+
                '<div class="label">'+
                    title+
                '</div>'+
                '<div class="loader">'+
                    '<div class="element-animation">'+
                        '<img src="'+options.image+'" width="1180" height="70">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    );

	setTimeout(function(){
		$('.alert-overlay').addClass('active');
		$('.alert-box').addClass('alert-box-in');
	}, 10);

	if(options.timeout){
		setTimeout(function(){
			Ratchet.alerts.hide();
		}, options.timeout);
	}
}

Ratchet.alerts.alert = function(title = 'Cargando...', options = {}){
	if(!options.description){
		options.description = '';
	}

	if(!options.pText){
		options.pText = 'OK';
	}

	if(options.callback){
		Ratchet.alerts.callbacks[0] = options.callback;
	}else{
		Ratchet.alerts.callbacks[0] = function() {
			console.log('No callback setup');
		}
	}

	// Remove any previously created alert
	$('.alert-overlay').remove();

	// Append the new alert to the document body
	$('body').append(
		'<div class="alert-overlay">'+
			'<div class="alert-box">'+
				'<div class="label">'+
					title+
				'</div>'+
				'<div class="alert-box-content">'
					+options.description+
				'</div>'+
				'<div class="alert-box-buttons">'+
					'<a class="btn btn-positive btn-block" onClick="Ratchet.alerts.callbacks[0](); Ratchet.alerts.hide();">'
					+options.pText+
					'</a>'+
				'</div>'+
			'</div>'+
		'</div>'
	);

	setTimeout(function(){
		$('.alert-overlay').addClass('active');
		$('.alert-box').addClass('alert-box-in');
	}, 10);

	if(options.timeout){
		setTimeout(function(){
			Ratchet.alerts.hide();
		}, options.timeout);
	}
}


Ratchet.alerts.confirmation = function(title = 'Precaución', text = '', options = {pText: 'Aceptar', nText: 'Cancelar'}) {
	if(!options.pText || !options.nText){
		console.log('Debes configurar la alerta correctamente');
		return;
	}

	// CALLBACKS
	if(options.pCallback){
		Ratchet.alerts.callbacks[0] = options.pCallback;
	}else{
		Ratchet.alerts.callbacks[0] = function() {
			console.log('positive');
		}
	}

	if(options.nCallback){
		Ratchet.alerts.callbacks[1] = options.nCallback;
	}else{
		Ratchet.alerts.callbacks[1] = function() {
			console.log('negative');
		}
	}

	// Remove any previously created alert
	$('.alert-overlay').remove();

	// Append the new alert to the document body
    $('body').append(
        '<div class="alert-overlay">'+
            '<div class="alert-box">'+
                '<div class="label">'
                    +title+
                '</div>'+
                '<div class="alert-box-content">'
                    +text+
                '</div>'+
                '<div class="alert-box-buttons">'+
                    '<div class="button-left">'+
                        '<a class="btn idc-alert btn-negative btn-block btn-outlined" onClick="Ratchet.alerts.callbacks[1](); Ratchet.alerts.hide();">'
                            +options.nText+
                        '</a>'+
                    '</div>'+
                    '<div class="button-right">'+
                        '<a class="btn idc-alert btn-positive btn-block" onClick="Ratchet.alerts.callbacks[0](); Ratchet.alerts.hide();">'
                        +options.pText+
                        '</a>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    );

	// Add active class to alert-overlay to animate
	setTimeout(function() {
		$('.alert-overlay').addClass('active');
		$('.alert-box').addClass('alert-box-in');
	}, 10);
}


Ratchet.alerts.hide = function() {
	$('.alert-box').removeClass('alert-box-in').addClass('alert-box-out');
	$('.alert-overlay').removeClass('active');

	Ratchet.alerts.callbacks = [];

	setTimeout(function() {
		$('.alert-overlay').remove();
	}, 500);
}


/*
 *
 * Action-Sheet Component
 * Display an iOS like actionsheet with options
 * Every option has text, destructive, and callback
 * Accetps title text, cancel text, and options
 *
 */
Ratchet.alerts.actionSheet  = function(title = 'Action Sheet', cancel = 'Cancelar', options = []) {
	if(options.length > 6){
		console.log('The actionsheet can have maximun 6 options');
		return;
	}

	// Remove all previously created callbacks
	Ratchet.alerts.callbacks = [];

	// Set the intro of the actionsheet
    let intro =
        '<div class="alert-overlay">'+
            '<div class="action-sheet-wrapper">'+
                '<div class="action-sheet action-sheet-has-icons" style="">'+
                    '<div class="action-sheet-group action-sheet-options">'+
                        '<div class="action-sheet-title">'+
                            title+
                        '</div>';

	// Create the var to store the actionsheet options HTML
	let optionsHTML = '';

	let i = 0;
	for(option of options){
		let cssClass = 'button action-sheet-option';

		if(option.destructive){
			cssClass = 'button destructive action-sheet-option';
		}

		optionsHTML =   optionsHTML+
		'<button class="'+ cssClass +'" onClick="Ratchet.alerts.callbacks['+i+'](); Ratchet.alerts.hideActionSheet();">'+
		option.text+
		'</button>';

		if(option.callback){
			Ratchet.alerts.callbacks.push(option.callback);
		}else{
			Ratchet.alerts.callbacks.push(function(){
				console.log('No callback set for index: '+i);
			});
		}

		i++;
	}

    // Set the footer of the actionsheet
    const footer =  '</div>'+
                    '<div class="action-sheet-group action-sheet-cancel">'+
                        '<button class="button activated" onClick="Ratchet.alerts.hideActionSheet();">'+
                            cancel+
                        '</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';

	// Group all the actionsheet HTML to create it
	const html = intro + optionsHTML + footer;

	// Remove any previously created alert
	$('.alert-overlay').remove();

	// Append the new alert to the document body
	$('body').append(html);

	// Add active class to alert-overlay to animate the background overlay
	setTimeout(function() {
		$('.alert-overlay').addClass('active');
	}, 10);

	// Add active class to actionsheet to animate it
	setTimeout(function() {
		$('.action-sheet-wrapper').addClass('action-sheet-up');
	}, 300);
}

Ratchet.alerts.hideActionSheet = function() {
	$('.action-sheet-wrapper').removeClass('action-sheet-up');

	setTimeout(function() {
		$('.alert-overlay').removeClass('active');
	}, 300);


	Ratchet.alerts.callbacks = null;

	setTimeout(function() {
		$('.alert-overlay').remove();
	}, 800);
}







jQuery.fn.extend({
	navigation(options = {goBack: true}) {
		const element = this[0];

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

					if(options.goBack == true){
						window.history.back();
					}
				}, 200);

				// If is final set initial to true again
				isInitial = true;
			}else if(event.isFinal){// If drag end but x is less than 50 return to left auto
				$(element).css('left', 'auto');

				// If is final set initial to true again
				isInitial = true;
			}
		});
	},
});


jQuery.fn.extend({
	loader(type = 'diamond') {
		const html =
		'<div class="diamond-loader">'+
			'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="diamond-loader-svg" x="0px" y="0px" width="150px" height="150px" viewBox="0 0 213.235 241.176" enable-background="new 0 0 213.235 241.176" xml:space="preserve" fill="#0057B8">'+
				'<path d="M108.581,64.968V14.124l44.007,25.422L108.581,64.968"/>'+
				'<path fill-opacity="0.9" d="M153.591,92.101V41.258L109.582,66.68L153.591,92.101"/>'+
				'<path d="M155.586,92.062V41.221l44.009,25.42L155.586,92.062"/>'+
				'<path fill-opacity="0.7" d="M200.299,119.14V68.297l-44.004,25.421L200.299,119.14"/>'+
				'<path fill-opacity="0.85" d="M155.586,146.255V95.412l44.009,25.422L155.586,146.255"/>'+
				'<path fill-opacity="0.7" d="M200.299,173.35v-50.844l-44.004,25.422L200.299,173.35"/>'+
				'<path fill-opacity="0.6" d="M155.586,200.482v-50.84l44.009,25.417L155.586,200.482"/>'+
				'<path fill-opacity="0.5" d="M153.591,200.521v-50.84l-44.009,25.418L153.591,200.521"/>'+
				'<path fill-opacity="0.6" d="M108.581,227.696v-50.844l44.007,25.421L108.581,227.696"/>'+
				'<path fill-opacity="0.5" d="M106.62,227.696v-50.844l-44.005,25.421L106.62,227.696"/>'+
				'<path fill-opacity="0.7" d="M61.562,200.553V149.71l44.007,25.423L61.562,200.553"/>'+
				'<path fill-opacity="0.7" d="M59.709,200.56v-50.843l-44.008,25.422L59.709,200.56"/>'+
				'<path fill-opacity="0.7" d="M14.699,173.467v-50.843l44.01,25.42L14.699,173.467"/>'+
				'<path fill-opacity="0.5" d="M59.709,146.235V95.392l-44.008,25.42L59.709,146.235"/>'+
				'<path fill-opacity="0.7" d="M14.699,119.141V68.297l44.01,25.421L14.699,119.141"/>'+
				'<path fill-opacity="0.6" d="M59.709,92.101V41.258L15.701,66.68L59.709,92.101"/>'+
				'<path fill-opacity="0.85" d="M61.562,92.092V41.249l44.007,25.419L61.562,92.092"/>'+
				'<path fill-opacity="0.9" d="M106.62,64.968V14.124L62.614,39.546L106.62,64.968"/>'+
			'</svg>'+
		'</div>';
		if(type == 'diamond'){
			this.html(html);
		}

		return;
	},
});
