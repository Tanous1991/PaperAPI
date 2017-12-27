var mongoose = require('mongoose');
var Paper = mongoose.model('Papers');
var tmp = [];
var incitation = [];
var outcitation =[];

exports.list_all_papers = function (req, res, next) {
    console.log("--info-- get all papers");
    Paper.find({}, function (err, paper) {
        if (err)
            res.send(err);
        res.json(paper);
    }).limit(40);
};

exports.search = function(req, res, next) {
    var mot = req.body;
    console.log("\x1b[34m","--info-- search for paper");
    console.log(mot);
    Paper.find({$text:{$search:mot.search}},{ score: { $meta: "textScore" }}, function (err, paper) {
        if (err)
            res.send(err);
        res.json(paper);
        console.log("\x1b[36m","--info-- search for paper ");
    }).limit(40);
};

exports.read_a_paper = function (req, res, next) {
    console.log("--info-- get paper with id : " + req.params.paperId);
    Paper.findById(req.params.paperId, function (err, paper) {
        if (err)
            res.send(err);
        res.json(paper);
    });
};
