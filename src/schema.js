const joi = require('joi');

const schema = {
  data: joi.object().keys({
    offset: joi.number().min(0).integer().optional(),
    pagesize: joi.number().min(10).max(100).integer()
      .optional(),
    searchType: joi.string().insensitive().min(1).optional(),
    searchQuery: joi.string().insensitive().min(1).optional(),
  }),
};

module.exports = schema;
