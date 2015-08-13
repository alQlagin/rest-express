/**
 * Created by alex on 01.08.2015.
 */

var paginator = require("paginator-express"),
    _ = require('lodash'),
    express = require('express');

var router = express.Router();

module.exports = function (model, customActions, options) {
    var ctrl = new Controller(model, options);

    _.forOwn(customActions, function (action, name) {
        ctrl[name] = action;
    })

    return ctrl;
};

function Controller(model, customOptions) {
    var options = {};
    _.assign(options, customOptions);
    var controller = {
        list: paginator.controller(model.find().sort({_id: 1}), options.listFilter),
        create: function (req, res, next) {
            var m = new model(req.body);

            m.save()
                .then(function (result) {
                    res.status(201);
                    res.json(result);
                }, next)

        },
        read: function (req, res, next) {
            load(model, req.params.id || req.query.id, req.query.populate)
                .then(function (result) {
                    if (result) {
                        res.status(200);
                        res.json(result)
                    } else {
                        res.status(404);
                        res.end();
                    }
                }, next)
        },
        update: function (req, res, next) {
            load(model, req.params.id || req.query.id)
                .then(function (result) {
                    _.assign(result, req.body);
                    return result.save();
                }, next)
                .then(function (result) {
                    res.status(200);
                    res.json(result)
                }, next)
        },
        delete: function (req, res, next) {
            load(model, req.params.id || req.query.id)
                .then(function (result) {
                    return result.remove();
                }, next)
                .then(function () {
                    res.status(204);
                    res.end();
                }, next)
        }
    };
    return controller;
}

function load(model, id, populate) {
    var q = model.findOne({
        _id: id
    })
    if (populate)
        q.populate(populate)

    return q.exec();
}