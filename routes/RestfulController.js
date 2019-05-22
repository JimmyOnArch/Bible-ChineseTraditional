var express = require('express');
var router = express.Router();
var exec = require('child_process');
var spawn  = require('child_process').spawn;
var command = 'powershell.exe Get-WmiObject Win32_Battery';

router.post('/ws/batteryChargeStatus', function(req, res, next) {
	console.log("batteryChargeStatus");
	try{
		var returnStr = "";
		var child = spawn('powershell.exe', ["-command", "Get-WmiObject Win32_Battery"]);
		child.stdout.on("data",function(data){
			console.log("Powershell Data: " + data);
			returnStr += data;
		});
		child.stderr.on("data",function(data){
		    console.log("Powershell Errors: " + data);
		});
		child.on("exit",function(){
		    console.log("Powershell Script finished");
			return res.json({ chargeStatus: returnStr });
		});
		child.stdin.end(); 
	}
	catch(e){
		console.log(e);
		console.log("error");
		return res.json({ chargeStatus: "" });
	}
});


router.post('/ws/testPostAPI', function(req, res, next) {
	try{
		return res.json({ 
			message: "Hello this is test message from battery Agent",
			status: 200, 
		});
	}
	catch(e){
		console.log(e);
		console.log("error");
		return res.json({
			message: "Something wrong at testAPI",
			status: 500 
		});
	}
});

module.exports = router;
