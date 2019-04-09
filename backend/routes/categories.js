module.exports = app => {
    app.route('/categories')
        // .all()
        .get(app.controllers.categories.index)
        .post(app.controllers.categories.store)

    app.route('/categories/:id')
        .get(app.controllers.categories.find)
        .put(app.controllers.categories.update)
        .delete(app.controllers.categories.destroy)
}