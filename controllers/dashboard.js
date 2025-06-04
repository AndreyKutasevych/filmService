"use strict";
import { v4 as uuidv4 } from "uuid";
import logger from "../utils/logger.js"; //importing logger
import filmStore from "../models/film-store.js"; //importing filmStore database controller, sso we get acces to database and its parameters
import accounts from "./accounts.js";

const dashboard = {
  // constructing dashboard object and its Viewdata metod which creates a view on the page
  createView(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "Filmlist Dashboard",
        films: filmStore.getUserFilmlists(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture:loggedInUser.picture,
      };
      logger.info("about to render" + viewData.films);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },
  addFilmlist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
    const timestamp = new Date();
    const newFilmlist = {
      userid: loggedInUser.id,
      id: uuidv4(),
      title: request.body.title,
      films: [],
      date: timestamp,
      picture: request.files.picture,
    };

    filmStore.addFilmlist(newFilmlist,function () {
        response.redirect("/dashboard");
      });
  },
  deleteFilmlist(request, response) {
    const filmId = request.params.id;
    logger.debug(`Deleting Film ${filmId}`);
    filmStore.removeFilmlist(filmId);
    response.redirect("/dashboard");
  },
  updateFilmlist(request, response) {
    const filmlistId = request.params.id;
    logger.debug("updating filmlist " + filmlistId);
    const filmlist = filmStore.getFilmlist(filmlistId);
    logger.debug("got filmlist contents" + filmlist);
    const updatedFilmlist = {
      title: request.body.title,
      id: filmlistId,
      films: filmlist.films,
    };
    filmStore.editFilmlist(filmlistId, updatedFilmlist);
    response.redirect("/dashboard/");
  },
};

export default dashboard;
//exporting this file so we can use it in the project
