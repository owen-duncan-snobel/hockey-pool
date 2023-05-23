FROM node:18

WORKDIR /app

# Copy the package.json file
COPY ./package*.json ./

# install the package.json dependencies
RUN npm install

# copy the contents over
COPY prisma ./prisma/
COPY src ./src/
COPY tsconfig.json ./

RUN npx prisma generate

# run package.json watch command
CMD ["npm", "run", "watch"]

