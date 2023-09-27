# Home Builders API

API for Home Construction Supplies built using Node, Express, and MongoDB

### Project Structure

- app.js (root)
- data.json (Sample data)
- controllers
  - Endpoint Controller Logic
- database
  - Database Connection and Auto-population Functions
- middlewares
  - Custom Middlewares
- models
  - Structure of Documents in the Collection
- public
  - Static Content for the Landing Page
- routes
  - API Endpoint

### Installation & Requirements

Fork the repository to create a copy in your own profile
<br>
Clone your forked repository into your computer:

```
(via HTTPS)
git clone https://github.com/<USERNAME>/<FORKED_REPOSITORY_NAME>.git

(via SSH)
git clone git@github.com:<USERNAME>/<FORKED_REPOSITORY_NAME>.git
```

<br>

Install the dependencies:

```
npm install
```

<br>

Create a database in MongoDB, preferably with the name <b>"home-builders"</b>
<br>
Create a database user and assign a unique password thats easy to remember
<br>
Get the connection string, replacing the < password > with your assigned password
<br>
Assign a collection name, preferably <b>"home-builders"</b> and write it in the connection string between the "/" and "?"
<br><br>
<i>(Your connection string should look something like this:)</i>

```
mongodb+srv://<USERNAME>:<PASSWORD>@home-builders...mongodb.net/<COLLECTION_NAME>?retryWrites=true&w=majority
```

<br>

Create a .env file and define a variable, preferably <b>"MONGO_URI"</b>
<br>
Assign the MongoDB connection string as the environment variable's value
<br><br>
<i>(Your .env file should look something like this:)</i>

```
MONGO_URI="mongodb+srv://<USERNAME>:<PASSWORD>@home-builders...mongodb.net/<COLLECTION_NAME>?retryWrites=true&w=majority"
```

<br>

Run the project:

```
npm start
```
