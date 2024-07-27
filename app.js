const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 80;

app.use(express.json()); 

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/timeline.html');
});

// TO DO:
// fetch data from firebase db, not a static one.
app.get('/data', (req, res)=>{
    res.sendFile(__dirname + '/data.json');
});

// TO DO:
// add data to firebase db, not using a static one.
app.post('/addEvt', (req, res)=>{
    console.log(req.body);
    let name = req.body.name;
    let desc = req.body.desc;
    let date = req.body.date;

    let valid = true;
    // make sure data's format is valid
    if (name.length <= 0 || desc.length <= 0 || Date(date) == undefined) {
        valid = false;
    }

    let added = false;
    if (valid) {
        // ## add event

        let newEvt = {"date": date, "value": name, "desc": desc};
        // update file
        let data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));
        console.log(data);
        data['events'].push(newEvt);
        fs.writeFileSync(__dirname + '/data.json', JSON.stringify(data));

        added = true;
    }

    // send OK
    res.send({'added': added});
});

app.listen(PORT, (err) => {
    if (err)
        throw err;
    
    console.log('listening on port: ' + PORT);
});