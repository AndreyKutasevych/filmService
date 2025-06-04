"use strict";
//importing all nessesaties such as libraries, handlebars, project files etc.
import express from "express";
import { create } from "express-handlebars";
import logger from "./utils/logger.js";
import routes from "./routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
//constructing the main object of our app, where all the routes and functions will go through
const app = express();
const port = 3000;
//pointing that all other external files will go through public folder, which we creted, currently we have style.css and script.js  in it
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));
//configuring handlebars settings, their filenames, usage etc.
const handlebars = create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");
//telling app object to use routes and make all requests through the middlepath "/" of the server
app.use("/", routes);
//listening for incoming connections on a specified port
app.listen(port, () => logger.info("Your app is listening on port " + port));
