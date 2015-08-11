var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash');

module.exports = function (modelName, fields, indexes, statics, methods) {
    var modelSchema = new Schema(fields);
    if (undefined !== indexes) {
        indexes.forEach(function (index) {
            modelSchema.index(index[0], index[1]);
        });
    }

    if (undefined !== statics) {
        _.forOwn(statics, function(item, name){
            modelSchema.statics[name] = item;
        });
    }

    if (undefined !== methods) {
        _.forOwn(methods, function(item, name){
            modelSchema.methods[name] = item;
        });
    }
    return mongoose.model(modelName, modelSchema);
};