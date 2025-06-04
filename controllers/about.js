'use strict';

import logger from "../utils/logger.js";// importing logger
import appStore from "../models/app-store.js";// importing app-store.js so we can use getAppInfo function
import filmStore from "../models/film-store.js";
import accounts from './accounts.js';
import userStore from '../models/user-store.js';
const about = {//constructing the the about object with functions of app-store.js and passed parameters
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");
    const filmlists = filmStore.getUserFilmlists(loggedInUser.id);
    const filmsTotal = filmStore.getAllFilms();
    const totalUsers = userStore.getAllUsers();

    let numFilmlists = filmlists.length;
    let usersTotal = totalUsers.length;

    let numFilms = 0;
    let numFilmsUser = 0;
    let minFilmlist = Infinity;
    let maxFilmlist = -Infinity;
    let minFilmlistTotal = Infinity;
    let maxFilmlistTotal = -Infinity;
    let minFilmlistTitle = "";
    let maxFilmlistTitle = "";
    let minFilmlistTitleTotal = "";
    let maxFilmlistTitleTotal = "";
    let filmsTotal2 = filmsTotal.length;
    let averageFilmlistsPerUser = filmsTotal2/usersTotal;

    for (let item of filmlists) {
      numFilms += item.films.length;

      if (item.films.length < minFilmlist) {
        minFilmlistTitle = item.title;
        minFilmlist = item.films.length;
      }

      if (item.films.length > maxFilmlist) {
        maxFilmlistTitle = item.title;
        maxFilmlist = item.films.length;
      }
    }
    for (let item of filmsTotal) {
      numFilmsUser += item.films.length;

      if (item.films.length < minFilmlistTotal) {
        minFilmlistTitleTotal = item.title;
        minFilmlistTotal = item.films.length;
      }

      if (item.films.length > maxFilmlistTotal) {
        maxFilmlistTitleTotal = item.title;
        maxFilmlistTotal = item.films.length;
      }
    }

    let averageFilmPerFilmlist = numFilms / numFilmlists;
    const viewData = {
      title: "Filmlists App About",
      displayNumFilmlists: numFilmlists,
      displayNumFilms: numFilms,
      displayaverageFilmPerFilmlist: averageFilmPerFilmlist,
      displayMinFilmlist: minFilmlistTitle,
      displayMaxFilmlist: maxFilmlistTitle,
      displayTotalFilms: filmsTotal2,
      displayAverageFilmlistPerUser:averageFilmlistsPerUser,
      displayMinFilmlistTotal:minFilmlistTitleTotal,
      displayMaxFilmlistTotal:maxFilmlistTitleTotal,
      picture:loggedInUser.picture,
      info: appStore.getAppInfo()
    };
    response.render('about', viewData);//this is whts called when page is opened, and /about is use das a route here
  },
};

export default about;
//exporting this file so we can use it everywhere within the project
