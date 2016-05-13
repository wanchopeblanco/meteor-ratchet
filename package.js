Package.describe({
	name: 		'indesign:ratchet',
	summary: 	'Ratchet UI Framework for Meteor without Push.js',
	version: 	'0.0.4',
	git: 		'https://github.com/wanchopeblanco/meteor-ratchet'
});

Package.onUse(function (api) {
	api.versionsFrom("0.9.3.1");

	api.use('jquery');
	api.use('ecmascript@0.4.3');

	var path = Npm.require('path');
	var asset_path = path.join('ratchet-2.0.2');
	api.addFiles(path.join(asset_path, 'css', 'ratchet.css'), 'client');
	api.addFiles(path.join(asset_path, 'css', 'ratchet-theme-ios.css'), 'client');
	api.addFiles(path.join(asset_path, 'js', 'ratchet.js'), 'client');

	// Aditionals
	api.addFiles(path.join(asset_path, 'css', 'alert-views.css'), 'client');
	api.addFiles(path.join(asset_path, 'css', 'loaders.css'), 'client');


	// Themes
	// api.addFiles(path.join(asset_path, 'css', 'ratchet-theme-android.scss'), 'client', {isImport: true});
	// api.addFiles(path.join(asset_path, 'css', 'ratchet-theme-ios.scss'), 'client', {isImport: true});

	api.addFiles('./hammer/hammer.js', 'client');
	api.addFiles('./ratchet.js', 'client');
	api.export('Ratchet', 'client');

	// fonts
	api.addAssets(path.join(asset_path, 'fonts', 'ratchicons.eot'), 'client');
	api.addAssets(path.join(asset_path, 'fonts', 'ratchicons.ttf'), 'client');
	api.addAssets(path.join(asset_path, 'fonts', 'ratchicons.svg'), 'client');
	api.addAssets(path.join(asset_path, 'fonts', 'ratchicons.woff'), 'client');

	// XXX this makes the paths to the icon sets absolute. it needs
	// to be included _after_ the standard ratchet css so
	// that its styles take precedence.
	api.addFiles(path.join('ratchet-override.css'), 'client');
});
