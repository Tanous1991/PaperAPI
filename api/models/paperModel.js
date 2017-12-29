var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PapersSchema = new Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  paperAbstract: {
    type: String
  },
  keyPhrases: {
    type: [String]
  },
  authors: {
    type: [{
      ids: {
        type: Number
      },
      name: {
        type: String
      }
    }]
  },
  inCitations: {
    type: [String]
  },
  outCitations: {
    type: [String]
  },
  year: {
    type: Number
  },
  s2Url: {
    type: String
  },
  venue: {
    type: String
  },
  journalName: {
    type: String
  },
  journalVolume: {
    type: String
  },
  journalPages: {
    type: String
  }
});

module.exports = mongoose.model('Papers', PapersSchema);