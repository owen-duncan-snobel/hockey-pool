FROM node:18

WORKDIR /app

# Copy the package.json file
COPY ./mount/package*.json ./

# install the package.json dependencies
RUN npm install

# copy the entire contents of mount over
COPY mount/ ./

RUN npx prisma generate

# run package.json watch command
CMD ["npm", "run", "watch"]

