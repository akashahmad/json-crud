const bodyParser = require('body-parser');
const cors = require('cors');
const team = require('./controllers/team');


exports = module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

     app.get('/api/team', team.get);
     app.get('/api/team/:id', team.getOne);
     app.post('/api/team', team.post);
     app.put('/api/team/:id', team.put);
     app.delete('/api/team/:id', team.delete);
};