# Cartracker Backend for SWT-P
## Info
#### Deploy with docker
Deploy the backend locally by running `sudo docker-compose build --no-cache && sudo docker-compose up -d --force-recreate` in WSL.

#### MongoDB Address
The MongoDB Address for MongoDbCompass: `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`


## CRUD Routes
Server running on port 9090
### CREATE / POST

Login: `https://tim-eggers.de:9090/api/v1/login`

Create Position: `https://tim-eggers.de:9090/api/v1/pos`

Create User: `https://tim-eggers.de:9090/api/v1/user`

Create Zone: `https://tim-eggers.de:9090/api/v1/zone`

### READ / GET
Get Latest User Position: `https://tim-eggers.de:9090/api/v1/pos`

Get Route: `https://tim-eggers.de:9090/api/v1/route/<id>&&<hours>&&<minutes>`

Get Users: `https://tim-eggers.de:9090/api/v1/users`

Get Zones: `https://tim-eggers.de:9090/api/v1/zones`

### UPDATE / PUT
Update User: `https://tim-eggers.de:9090/api/v1/user/<id>`

Update Zone: `https://tim-eggers.de:9090/api/v1/zone/<id>`

### DELETE
Delete User: `https://tim-eggers.de:9090/api/v1/user/<id>`

Delete Zone: `https://tim-eggers.de:9090/api/v1/zone/<id>`
