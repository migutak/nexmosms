// const Nexmo = require('nexmo');
const bodyParser = require('body-parser');
const express= require('express');
const cors= require('cors');

// init app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.post('/', (req, res) => {
    console.log(req.body)
    const accountSid = req.body.accountSid;
    const authToken = req.body.authToken;
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: req.body.body,
        from: req.body.from,
        to: req.body.to
    }, (err, response) => {
        if(err) {
            console.log(err);
            res.json({
                result: 'FAIL',
                response: err
            })
        } else {
            res.json({
                result: 'OK',
                response: response
            })
        }
    })

   /* const nexmo = new Nexmo({
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
    });*/
})

// define port
const port = 7000;

//start server
const server = app.listen(port, () => console.log(`server started on port ${port}`));

