const express = require('express');
const ZKLib = require('node-zklib');
const db = require('./common/connectdb');


const app = express();

// PORT
const PORT = 3000;

    // connect the biometric machine
const ip = `10.1.0.160`;
const port = 4370;
const timeout = 10000;

let zkInstance = new ZKLib(ip,port,timeout,4000);


// routes

// get users

app.get('/',(request, response)=>{
    response.send("helloe");
});
app.get(`/users`,async(request, response)=>{

    try {
        // Create socket to machine 
        await zkInstance.createSocket()

        // get users from the machine
        response.send(await zkInstance.getUsers());
    } catch(e){
        response.sendStatus(401);
    }    
});

// get attendance records
app.get(`/attendances`, async(request, response)=>{
    try {
        // Create socket to machine 
        await zkInstance.createSocket()

        // get users from the machine
        const logs = await zkInstance.getAttendances()
        // console.log(typeof(logs));
        let attendancesData = logs.data;

        response.send(attendancesData);
    } catch(e){
        response.sendStatus(401);
    }

});

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});

