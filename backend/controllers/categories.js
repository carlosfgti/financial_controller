const mongoose = require('mongoose')

module.exports = app => {
    const Category = app.models.category

    const index = (req, res, next) => {
        Category.find()
            .then(categories => {
                return res.status(200)
                            .json({
                                data: categories
                            })
            })
            .catch(error => {
                return res.status(500).json({error: error})
            })
    }

    const store = (req, res, next) => {
        const category = new Category(req.body || req.query)
        category.save()
            .then(result => {
                return res.status(201).json({
                    message: 'Category Created OK',
                    data: category,
                })
            })
            .catch(error => {
                return res.status(error.statusCode || 500).json({
                    message: error,
                })
            })
    }


    const find = (req, res) => {
        Category.findById(req.params.id)
            .then(category => {
                return res.status(200).json({
                    data: category,
                })
            })
            .catch(error => {
                return res.status(error.statusCode || 500).json({
                    message: error,
                })
            })
    }


    const update = (req, res) => { 
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(403).json({
                message: 'Invalid id',
            })
        }
              
        // Category.update({_id: req.params.id}, req.body)
        Category.findByIdAndUpdate(req.params.id, req.body)
            .then(response => {
                if (!response) {
                    const error = new Error
                    error.statusCode = 404
                    error.message = 'Not find category'
                    throw error
                }
                
                return res.status(200).json({
                    message: 'Updated OK',
                })
            })
            .catch(error => {
                return res.status(error.statusCode || 500).json({
                    message: error.message || error,
                })
            })
    }


    const destroy = (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(403).json({
                message: 'Invalid id',
            })
        }
             
        // Category.update({_id: req.params.id}, req.body)
        Category.findOneAndDelete({_id: req.params.id})
            .then(response => {
                if (!response) {
                    const error = new Error
                    error.statusCode = 404
                    error.message = 'Not find category'
                    throw error
                }
                
                return res.status(200).json({
                    message: 'Deleted OK',
                })
            })
            .catch(error => {
                return res.status(error.statusCode || 500).json({
                    message: error.message || error,
                })
            })
    }

    return { index, store, find, update, destroy }
}