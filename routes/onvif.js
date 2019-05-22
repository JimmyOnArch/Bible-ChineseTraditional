var express = require('express');
var router = express.Router();
const onvif = require('node-onvif');

/* GET users listing. */
router.get('/onvifDiscovery', function(req, res, next) {
	console.log('Start the discovery process.');
	// Find the ONVIF network cameras.
	// It will take about 3 seconds.
	onvif.startProbe().then((device_info_list) => {
	  console.log(device_info_list.length + ' devices were found.');
	  // Show the device name and the URL of the end point.
	  device_info_list.forEach((info) => {
	    console.log('- ' + info.urn);
	    console.log('  - ' + info.name);
	    console.log('  - ' + info.xaddrs[0]);
	  });
	}).catch((error) => {
	  console.error(error);
	});
  	res.send('respond with a resource');
});

router.post('/onvifDiscovery', function(req, res, next) {
	console.log('Start the discovery process.');
	// Find the ONVIF network cameras.
	// It will take about 3 seconds.
	onvif.startProbe().then((device_info_list) => {
		var onvifDevice = [];
		console.log(device_info_list.length + ' devices were found.');
		// Show the device name and the URL of the end point.
		device_info_list.forEach((info) => {
			console.log('- ' + info.urn);
			console.log('  - ' + info.name);
			console.log('  - ' + info.xaddrs[0]);
			onvifDevice.push(info);
		});
	  	return res.json({
			message: "onvifDiscovery successful",
			onvifDevice: onvifDevice,
			status: 200 
		});
	}).catch((error) => {
		console.error(error);
		return res.json({
			message: "Something wrong at onvifDiscovery",
			status: 500 
		});
	});
});

module.exports = router;
