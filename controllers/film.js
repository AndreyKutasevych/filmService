'use strict';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger.js';//importing logger
import filmStore from '../models/film-store.js';//importing film-store so we can use its database properties
import accounts from './accounts.js';

const film = {//consturcting film object so we can use it on the dashboard page(this will be the page where we are redirected after we press view button)
  createView(request, response) {
    const filmlistId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Film id = ' + filmlistId);
    
    const viewData = {
      title: 'Filmlist',
      singleFilm: filmStore.getFilm(filmlistId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture:loggedInUser.picture,
    };

    response.render('film', viewData);
},
  addFilm(request, response) {
    const filmId = request.params.id;
    const film = filmStore.getFilm(filmId);
    const newFilm = {
      id: uuidv4(),
      title: request.body.film,
      director: request.body.director,
      release: request.body.release_date,
      duration: request.body.duration,
    };
    filmStore.addFilm(filmId, newFilm);
    response.redirect('/film/' + filmId);
},
  deleteFilm(request, response) {
    const filmlistId = request.params.id;
    const filmId = request.params.filmid;
    logger.debug(`Deleting Film  $(filmId} from Filmlist ${filmlistId}`);
    filmStore.removeFilm(filmlistId, filmId);
    response.redirect('/film/' + filmlistId);
},
  updateFilm(request, response) {
    const filmlistId = request.params.id;
    const filmId = request.params.filmid;
    logger.debug("updating film " + filmId);
    const updatedFilm = {
      id: filmId,
      title: request.body.title,
      director: request.body.director,
      release: request.body.release,
      duration: request.body.duration
    };
    filmStore.editFilm(filmlistId, filmId, updatedFilm);
    response.redirect('/film/' + filmlistId);
}
};

export default film;//exporting the film so we can use it on our dashboard menu