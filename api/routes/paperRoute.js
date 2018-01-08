module.exports = function (app) {
    var Papers = require('../controllers/paperController');

    app.route('/papers').get(Papers.list_all_papers);
    app.route('/papers/list').post(Papers.list_papers);
    app.route('/papers').post(Papers.search);

    app.route('/papers/:paperId').get(Papers.read_a_paper);
};