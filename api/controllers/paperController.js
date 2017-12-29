var mongoose = require('mongoose');
var Paper = mongoose.model('Papers');

exports.list_all_papers = function (req, res) {
    console.log("get all papers");
    Paper.find({}, function (err, paper) {
        if (err)
            res.send(err);
        res.json(paper);
    }).limit(40);
};

exports.search = function (req, res) {
    console.log("search for paper");
    var mot = req.body;
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
