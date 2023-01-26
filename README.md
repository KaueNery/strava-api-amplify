# AMPLIFY API FOR STRAVA
This is an amplify api for authenticating, connecting and using the strava api. 

How to use: 

1 - Configure your strava account for using the api : https://www.strava.com/settings/api

2 - Set the information in the functions needed - stravaauth and getstravatoken

const config = {
    client_id: 101037,
    client_secret: '123312312312',
    redirect_uri: 'https://fvea7xt782.execute-api.us-east-2.amazonaws.com/dev/gettoken',
    scopes: ['read','activity:read_all'],
};

3 - When the api is up and running locally, access the endpoint /dev/auth

e.g.: https://fvea7xt782.execute-api.us-east-2.amazonaws.com/dev/auh


This endpoint will return the user accessToken that we will use in the next calls:

{"accessToken":"c0b02da07707701bd491af742e1fb78850a03577","userId":9523970}


4 - With the token in hand, call the "/getData" endpoint

e.g.: https://fvea7xt782.execute-api.us-east-2.amazonaws.com/dev/getData?token=c0b02da07707701bd491af742e1fb78850a03577&before=2023-02-01&after=2023-01-01

note that the parameters for this endpoint are: 

- token REQUIRED (which we got in the "/auth" endpoint)
- before NOT REQUIRED (which is used for filtering activities that have taken place before a certain time.)
- after NOT REQUIRED (which is used for filtering activities that have taken place after a certain time.)
- page NOT REQUIRED page number.
- perPage NOT REQUIRED Number of items per page.