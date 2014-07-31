(function (homeController) {

    var data = require("../data");

    homeController.init = function(app) {
        app.get('/', function (req, res) {
            data.getNodeCategories(function(err, results) {
                res.render("jade/index", {
                    title: "Express + Jade",
                    error: err,
                    categories: results,
                    newCategoryError: req.flash('newCategoryError')
                });
            });
        });

        app.get('/notes/:categoryName', function (req, res) {
            var categoryName = req.params.categoryName;
            res.render('jade/notes', {title: categoryName});
        });

        app.post('/newCategory', function(req, res) {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function (err) {
               if(err) {
                   console.log(err);
                   req.flash('newCategoryError', err)
                   res.redirect('/');
               } else {
                   res.redirect('/notes/' + categoryName);
               }
            });
        });
    }
})(module.exports);
