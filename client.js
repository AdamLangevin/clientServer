
var express         = require('express');
var app             = express();
const { spawn }     = require('child_process');
var bodyparser      = require('body-parser');
var cl		    = require('scp2');
var exec	    = require('ssh-exec');

//execute the raspberry still calls

const ls = spawn('raspistill', ['-vf', '-hf', '-o', '/home/pi/Desktop/uploads/Test.jpg']);

ls.stdout.on('data', (data) => {
	console.log(`stdout: ${data}`);
});

var prog = 'node C:\\Users\\py120\\Desktop\\Dev\\robotServer\\server.js'
var file = '../uploads/Test.jpg';

if(ls) {

var opts = {
	username: 'py120',
	//host: '172.17.123.59',
	host: '192.168.0.218',
	port: '22',
	password: 'Darkloli1',
	path: 'c:/Users/py120/Desktop/Dev/robotServer/public/uploads'
};

//execute SCP here?
cl.scp(file, opts, (res, err) =>{
    if(err){
        console.log('Error transfering file: ', err);
	  		return;
    }
    console.log('Transfered file');

  	exec(prog, {
		 	user: 'py120',
			host: '192.168.0.218',
			port: '22',
			password: 'Darkloli1'
    }, (err, stdout, stderr) => {
	  if(err) {
			console.log('Error: ', err);
			return;
	  }
	  if(stderr) {
			console.log('Something happened! ', stderr);
			return;
  	  }
  	  console.log('Executed: ', stdout);
    });
  });
};
