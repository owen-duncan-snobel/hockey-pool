# Hockey Pool

## Set up

To set up the project first, git clone the repository

Copy and paste the .env.example file and rename it to .env
Inside of the file you will need to update the .env to include your environment variables.

By default the db already has local credentials provided inside of the ```docker-compose.yml``` file. Be sure to update these if you are using a seperate host, username or password.


Next, cd into hockey-pool/packages/server if not already there and run ```pnpm run docker:build```

You can then run ```pnpm run docker:up``` on subsequent times to bring up the docker container and ```pnpm run docker:down``` to bring it down.

The services are as follows,

- hockey-pool-backend | ```port: 4000```
- postgres db | ```port: 5432```
- redis | ```port 6379```
- nginx | ```port: 80```


## Run migrations
For the db migrations run,

 ```npx prisma migrate dev```
from the root folder ```/```. 

 **YOU NEED TO RUN FROM THIS FOLDER TO ACCESS THE .env variables.**
 
 Alternatively, run the commands from the terminal inside of the docker container.


 If the prisma client does not update properties in vscode run

 ```npx prisma db push``` 
 
 Also try ```CMD + P``` and restart the prisma server if intelisense still does not appear
 
## Seed DB
to seed the db run, ```npx prisma db seed``` inside of the backend servers docker terminal. 
Or, you can also try to run from the root of the ```mount/``` folder may recieve an error connecting to localhost:5432

## Prisma Studio
to open prisma studio run ```npx prisma studio``` from the root of the /server folder. Does not seem to work in Firefox browser! (Safari and Chrome) 

**YOU NEED TO USE localhost as the host in the .env for DATABASE_URL for it to run**

## Jest
Run ```npm run test``` from within the docker container


## Digital Ocean Deployment

Ensure the Dockerfille path is set in the spec file ex. ```- dockerfile_path: packages/server/Dockerfile```

After deployment, ensure to add the environment variables.

For the managed db create the db "hockeypool"

From the console run, ```npx prisma migrate deploy``` and ```npx prisma db seed```