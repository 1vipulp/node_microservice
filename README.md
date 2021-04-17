# NODE MICRO SERVICE

Stacks:
  1. Node.js with Express.js framework
  2. MongoDB database

To run in local:
  1. Clone repo
  2. Go to folder node_microservice e.g. cd node_microservice
  3. Install node packages  e.g. npm install
  4. Run service: npm run start:dev | ./node_modules/.bin/bunyan

# How middleware works ?

1. For Unauthenticated API
  - We are using shared token. Every unauthenticated API should have Bearer token signed using shared token.
  - On successful verification of Bearer, further request will be fulfilled.

2. For Authenticated API
  - We are using user specific token. Every authenticated API should have Bearer token signed using user specific token.
  - If user login from Android device, client will pass channel in header, server will create 32 character long token and provide back to client
  - Every new requests' Bearer should be signed using token which we received in login response
  - Bearer token should include u (user's _id) and c (channel)
  - Server will fetch user's token data from database and verify user's Bearer

# API Request Examples:

1. Registration API Payload (Unauthenticated)
```sh
curl --location --request POST 'localhost:6745/v1/user/registration' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.lY4HmpQ3-nnxWz5ah6mnjC0L2QuPe03mdUjaXd3KXUg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Vipul Panchal",
    "email": "vipulpanchal.5758@gmail.com",
    "password": "Test@123"
}'
```

2. Login API Payload (Unauthenticated)
```sh
curl --location --request POST 'localhost:6745/v1/user/login' \
--header 'channel: android' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.lY4HmpQ3-nnxWz5ah6mnjC0L2QuPe03mdUjaXd3KXUg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "vipulpanchal.5758@gmail.com",
    "password": "Test@123"
}'
```

3. Get User Profile Payload (Authenticated)
```sh
curl --location --request GET 'localhost:6745/v1/user/profile/607a90ee081b657df9458290' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5kcm9pZCIsInUiOiI2MDdhOTBlZTA4MWI2NTdkZjk0NTgyOTAiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.tphw8saCNDUgO8KKby5Q1AByfOAZeA2Y4XLLlxujQiQ'
```