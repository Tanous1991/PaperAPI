var mongoose = require('mongoose');
var Paper = mongoose.model('Papers');
var fileSave = require('file-save');
var fs = require('fs');

exports.list_all_papers = function (req, res) {
    //console.log("get all papers");
    Paper.find({}, function (err, paper) {
        if (err)
            res.send(err);
        res.json(paper);
    }).limit(40);
};

exports.list_papers = function (req, res) {
    var list = req.body;
    console.log("-- get list of papers --");
    console.log(list.list);
    save(list.list);
    Paper.find({ 'id': { $in: list.list } }, function (err, paper) {
        res.json(paper);
    }).limit(40);
};

exports.search = function (req, res) {
    var mot = req.body;
    console.log("search for paper : " + mot);
    Paper.find({ $text: { $search: mot.search, $language: 'en' } }, { score: { $meta: "textScore" } }, function (err, paper) {
        res.json(paper);
    }).sort({ score: { $meta: "textScore" } }).limit(40);
};

exports.read_a_paper = function (req, res) {
    console.log("get by id : " + req.params.paperId);
    Paper.findOne({ id: req.params.paperId }, function (err, paper) {
        if (err)
            res.send(err);
        res.json(paper);
    });
};

function save(list) {
let path = 'log';  
let buffer = new Buffer(JSON.stringify({list}) + "\n");

fs.open(path, 'a', function(err, fd) {  
    if (err) {
        throw 'could not open file: ' + err;
    }
    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function() {
            console.log('wrote the file successfully');
        });
    });
}); 
}
