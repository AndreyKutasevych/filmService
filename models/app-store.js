'use strict';

import logger from '../utils/logger.js';//importing logger
import JsonStore from './json-store.js';//importing json-store.js so we can manage our databases and metods from jsonstore

const appStore = {//constructing an app-store object assigning it an app-store.json database, info collection from this database and creators array from this collection

  store: new JsonStore('./models/app-store.json', { info: {} }),
  collection: 'info',
  array: 'creators',

  getAppInfo() {//function for gathering information about this app based collection that we are passing to it
    return this.store.findAll(this.collection);
  },

};

export default appStore;// exporting this file so we can use it's methods in the website