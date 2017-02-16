const express = require('express');
const morgan = require('morgan');
const logger = require('./src/logger');
const path = require('path');
const validate = require('express-validation');
const dataController = require('./src/data-controller');
const schema = require('./src/schema');

const app = express();

app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signature/:id', (req, res) => {
  res.render('signature', { data: req.params.id });
});

app.get('/data', validate(schema.data), (req, res) => {
  if (req.query.searchType !== 'undefined' && req.query.searchQuery !== 'undefined') {
    res.json(dataController.getData(req.query.offset, req.query.pagesize, {
      type: req.query.searchType,
      query: req.query.searchQuery,
    }));
  } else {
    res.json(dataController.getData(req.query.offset, req.query.pagesize));
  }
});

app.get('/stats', (req, res) => {
  res.json(dataController.getStats());
});

// Initialize and run server
const port = process.env.PORT || 3000;

dataController.formatSignatures();
dataController.gatherStatInfo();
app.listen(port, () => {
  logger.info('Server running on 3000');
});
