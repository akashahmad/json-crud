const bodyParser = require('body-parser');
const cors = require('cors');
const team = require('./controllers/team');


exports = module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

     app.get('/api/teamm', team.get);
     app.get('/api/teamm/:id', team.getOne);
     app.post('/api/teamm', team.post);
    app.put('/api/teamm', team.put);
    app.delete('/api/teamm', team.delete);
};