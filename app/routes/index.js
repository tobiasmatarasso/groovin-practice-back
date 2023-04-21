
const ObjectId = require('mongodb'),
      authentication = require('./apis.authentication'),
      main = require('./apis.main');

module.exports = function (app, db) {

    authentication(app, db, ObjectId);

    main(app, db, ObjectId);

}
