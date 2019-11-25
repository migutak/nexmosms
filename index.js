const Nexmo = require('nexmo');
const bodyParser = require('body-parser');
const express= require('express');

// init app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', (req, res) => {
    const from = req.body.from
    const to = req.body.to;
    const text = req.body.text

    const nexmo = new Nexmo({
        apiKey: req.body.api_key,
        apiSecret: req.body.api_secret,
      }, {debug: true});

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if(err) {
            console.log(err);
            res.json({
                error: err
            })
        } else {
            console.log('responseData', responseData);
            res.json(responseData)
        }
    });

})

// define port
const port = 7000;

//start server
const server = app.listen(port, () => console.log(`server started on port ${port}`));

