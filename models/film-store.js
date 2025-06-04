"use strict";

import logger from "../utils/logger.js"; //importing logger
import JsonStore from "./json-store.js"; //importing json-store so we can use it's methods within this page
import cloudinary from "cloudinary";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
} catch (e) {
  logger.info("You must provide a Cloudinary credentials file - see README.md");
  process.exit(1);
}

const filmStore = {
  // constructing the filmStore object with film Collection and films array within this collection
  store: new JsonStore("./models/film-store.json", {
    filmCollection: [],
  }),
  collection: "filmCollection",
  array: "films",

  getAllFilms() {
    //using the json-store methods we can get all information abot films(for dashboard page) and about specific one(for single Film genre page, where we also pass it's id)
    return this.store.findAll(this.collection);
  },
  getFilm(id) {
    return this.store.findOneBy(this.collection, (film) => film.id === id);
  },
  addFilm(id, film) {
    this.store.addItem(this.collection, id, this.array, film);
  },
  async addFilmlist(filmlist, response) {
    function uploader() {
      return new Promise(function (resolve, reject) {
        cloudinary.uploader.upload(
          filmlist.picture.tempFilePath,
          function (result, err) {
            if (err) {
              console.log(err);
            }
            resolve(result);
          }
        );
      });
    }
    let result = await uploader();
    logger.info("cloudinary result", result);
    filmlist.picture = result.url;

    this.store.addCollection(this.collection, filmlist);
    response();
  },
  removeFilmlist(id) {
    const filmlist = this.getFilm(id);
    this.store.removeCollection(this.collection, filmlist);
  },
  removeFilm(id, filmId) {
    this.store.removeItem(this.collection, id, this.array, filmId);
  },
  editFilm(id, filmId, updatedFilm) {
    this.store.editItem(this.collection, id, filmId, this.array, updatedFilm);
  },
  editFilmlist(filmlistId, updatedFilmlist) {
    this.store.editCollection(this.collection, filmlistId, updatedFilmlist);
  },
  getUserFilmlists(userid) {
    return this.store.findBy(
      this.collection,
      (filmlist) => filmlist.userid === userid
    );
  },
};

export default filmStore;
// exporting this file so it can be used everywhere in the project
