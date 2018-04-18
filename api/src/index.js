// Express as the application's boilerplate
const express = require("express");

// Morgan for some logging
const morgan = require("morgan")

// Mongoose for Mongodb support
const mongoose = require("mongoose");

// GraphQl support from Apollo
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

// BodyParser for parsing our response body
const bodyParser = require("body-parser");

// Figlet for awesomes texts in the console
const figlet = require("figlet");

// The whole application configuration
const config = require("./config");

const schema = require("./schema");

// The Express application
const app = express();

// Using Morgan to log the requests in the console
app.use(morgan("tiny"));

// Our GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// Our GraphiQL endpoint for Query visualising purpose
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// The init function that just boot our application
const init = async () => {

    await mongoose.connect(config.MONGODB_ADDRESS)
            .catch(console.warn.bind(console, "Failed to connect to the database:"));

    // Just starting the server
    await app.listen(config.PORT);

    // Using Figlet to make a beautiful "Express" text in the console
    // Then printing the port at where our application is running
    const title = figlet("Instagrim !", (err, data) => {
        if (err) {
            return console.log("Damn, sorry the awesome Express title failed to render...");
        }
        console.log(data);
        console.log(`Your application is now running at ${config.PORT}, go at: http://localhost:${config.PORT}/`);
    });
}

// Simply init and run the application
init();
