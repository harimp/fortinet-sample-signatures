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

// Initialize and run server
dataController.formatSignatures();
app.listen(3000, () => {
  logger.info('Server running on 3000');
});
