module.exports = app => {
    app.route('/financials')
        // .all()
        .get(app.controllers.financial.index)
        .post(app.controllers.financial.store)

    app.route('/financials/:id')
        .get(app.controllers.financial.find)
        .put(app.controllers.financial.update)
        .delete(app.controllers.financial.destroy)
}