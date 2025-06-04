'use strict';

import logger from "../utils/logger.js";//importing logger
import accounts from './accounts.js';

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Start page loading!");
    
    if (loggedInUser) {
      const viewData = {
        title: "Welcome to the Playlist app!",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture:loggedInUser.picture,
      };
      response.render('start', viewData);
    }
    else response.redirect('/');    
},
  
};

export default start;// exportin gthis file so we can use it later in the project