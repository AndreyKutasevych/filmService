"use strict";
//importing logger and single filmpage controller to use them here and to ahve access to them
import logger from "./utils/logger.js";
import film from './controllers/film.js';
//importin gexpress framework and creating a new instance in express router
import express from "express";
const routes = express.Router();
//importing all other page controllers
import start from "./controllers/start.js";
import dashboard from "./controllers/dashboard.js";
import about from "./controllers/about.js";
import accounts from './controllers/accounts.js';
//assigning routes for our pages, and calling CreateView functions in each of them(function that creates a page)
routes.get('/start', start.createView);
routes.get("/dashboard", dashboard.createView);
routes.get("/about", about.createView);
routes.get('/film/:id', film.createView);
routes.post('/film/:id/addfilm', film.addFilm);
routes.post('/dashboard/addfilmlist', dashboard.addFilmlist);
routes.get('/dashboard/deletefilmlist/:id', dashboard.deleteFilmlist);
routes.get('/', accounts.index);
routes.get('/login', accounts.login);
routes.get('/signup', accounts.signup);
routes.get('/logout', accounts.logout);
routes.post('/register', accounts.register);
routes.post('/authenticate', accounts.authenticate);
routes.get('/film/:id/deletefilm/:filmid', film.deleteFilm);
routes.post('/film/:id/updatefilm/:filmid', film.updateFilm);
routes.post('/dashboard/editfilmlist/:id', dashboard.updateFilmlist);
//assigning an error page route
routes.get("/error", (request, response, error) =>
  response.status(404).end("Page not found.")
);
export default routes;
// exporting this file so it can be used on other project pages