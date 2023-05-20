## Run migrations
For the db migrations run,

 ```npx prisma migrate dev --name init --schema ./mount/prisma/schema.prisma```
from the root folder ```/```. 

 **YOU NEED TO RUN FROM THIS FOLDER TO ACCESS THE .env variables.**
 
 Alternatively, run the commands from the terminal inside of the docker container.


 If the prisma client does not update properties run 

 ```npx prisma db push```
 
## Seed DB
to seed the db run, ```npx prisma db seed``` inside of the backend servers docker terminal. 
Or, you can also try to run from the root of the ```mount/``` folder may recieve an error connecting to localhost:5432

## Prisma Studio
to open prisma studio run ```npx prisma studio  --schema ./mount/prisma/schema.prisma``` from the root of the /server folder. Does not seem to work in Firefox browser! (Safari and Chrome) 

**YOU NEED TO USE localhost as the host in the .env for DATABASE_URL for it to run**

## Jest
Run ```npm run test``` from within the docker container