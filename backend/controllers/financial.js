const mongoose = require('mongoose')

module.exports = app => {
    const Financial = app.models.financial

    const index = (req, res, next) => {
        Financial.find()
            .then(financials => {
                return res.status(200)
                            .json({
                                data: financials
                            })
            })
            .catch(error => {
                return res.status(500).json({error: error})
            })
    }

    const store = (req, res, next) => {
        const financial = new Financial(req.body || req.query)
        financial.save()
            .then(result => {
                return res.status(201).json({
                    message: 'Financial Created OK',
                    data: financial,
                })
            })
            .catch(error => {
                return res.status(error.statusCode || 500).json({
                    message: error,
                })
            })
    }


    const find = (req, res) => {
        Financial.findById(req.params.id)
            .then(financial => {
                return res.status(200).json({
                    data: financial,
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
              
        // Financial.update({_id: req.params.id}, req.body)
        Financial.findByIdAndUpdate(req.params.id, req.body)
            .then(response => {
                if (!response) {
                    const error = new Error
                    error.statusCode = 404
                    error.message = 'Not find Financial'
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
             
        // Financial.update({_id: req.params.id}, req.body)
        Financial.findOneAndDelete({_id: req.params.id})
            .then(response => {
                if (!response) {
                    const error = new Error
                    error.statusCode = 404
                    error.message = 'Not find Financial'
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