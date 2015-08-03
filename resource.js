var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash');

module.exports = function (modelName, fields, indexes, statics) {
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
    return mongoose.model(modelName, modelSchema);
};