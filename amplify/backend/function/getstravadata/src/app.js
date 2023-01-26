/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios');
axios.defaults.baseURL = `https://www.strava.com/api/v3`;
const { stringify } = require('flatted');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

//method for fetching the activities data 
//Receive params = token, before date, after date, page and perPage
//Return json filtered data 
app.get('/getData', async function(req, res) {
    const accessToken = req.query.token;

    const data = await getUserData(accessToken, req.query.before, req.query.after, req.query.page ,req.query.perPage);
    res.send(stringify(data));
});

const getUserData = async ( accessToken, beforeparam, afterparam, page, perPage ) => {
    try {
        //create epoch timestamps
        const before = Math.floor(+new Date(beforeparam) / 1000);
        const after = Math.floor(+new Date(afterparam) / 1000);

        const url = `/athlete/activities`;
        var params = {};
        if(beforeparam) params["before"] = before;
        if(afterparam) params["after"] = after;
        if(page) params["page"] = page;
        if(perPage) params["per_page"] = perPage;

        const response = await axios.get(
            url,
            {
                params : params,
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        );

        return response;
    } catch (error) {
        console.log(error);
    }
};


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
