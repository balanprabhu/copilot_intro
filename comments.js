// Create web server
// npm install express
// npm install body-parser
// npm install cors
// npm install nodemon
// npm install mongodb
// npm install mongoose
// npm install dotenv
// npm install helmet
// npm install morgan
// npm install cookie-parser

// Importing modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Importing routes
const routes = require("./routes");

// Importing middlewares
const { notFound, errorHandler } = require("./middlewares");

// Configuring dotenv
dotenv.config();

// Creating express app
const app = express();

// Configuring mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Configuring middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cookieParser());

// Configuring routes
app.use(routes);

// Configuring middlewares
app.use(notFound);
app.use(errorHandler);

// Starting server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});