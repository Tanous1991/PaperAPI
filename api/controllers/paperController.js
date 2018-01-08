var mongoose = require('mongoose');
var Paper = mongoose.model('Papers');

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
    console.log("-- get list of papers : " + req.body + " --");
    console.log(req.body);
    Paper.find({ 'id': { $in: list.list} }, function (err, paper) {
        console.log(paper);
        res.json(paper);
    }).limit(5);
};

exports.search = function (req, res) {
    var mot = req.body;
    console.log("search for paper : " + mot);
    Paper.find({ $text: { $search: mot.search } }, { score: { $meta: "textScore" } }, function (err, paper) {
        res.json(paper);
    }).limit(5);
};

exports.read_a_paper = function (req, res) {
    console.log("get by id : " + req.params.paperId);
    Paper.findOne({id:req.params.paperId}, function (err, paper) {
        if (err)
            res.send(err);
        res.json(paper);
    });
};
