/**
 * Created by alex on 01.08.2015.
 */

var paginator = require("paginator"),
    _ = require('lodash'),
    express = require('express');

var router = express.Router();

module.exports = function (model) {
    var ctrl = new Controller(model);
    return ctrl;
};

function Controller(model) {
    var controller = {
        list: paginator.controller(model.find()),
        create: function (req, res, next) {
            var m = new model(req.body);

            m.save()
                .then(function (result) {
                    res.status(201);
                    res.json(result);
                }, next)

        },
        read: function (req, res, next) {
            load(model, req.params.id || req.query.id)
                .then(function (result) {
                    res.status(200);
                    res.json(result)
                }, next)
        },
        update: function (req, res, next) {
            load(model, req.params.id || req.query.id)
                .then(function (result) {
                    _.assign(result, req.body);
                    return result.save();
                }, next)
                .then(function (result) {
                    res.status(203);
                    res.json(result)
                }, next)
        },
        delete: function (req, res, next) {
            load(model, req.params.id || req.query.id)
                .then(function (result) {
                    return result.remove();
                }, next)
                .then(function () {
                    res.status(203);
                    res.end();
                }, next)
        }
    };

    return controller;
}

function load(model, id) {
    return model.findOne({
        _id: id
    }).exec();
}