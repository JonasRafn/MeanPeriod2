var path = require('path');
var fs = require('fs');


module.exports = function (pathFile, extension, callback) {


    fs.readdir(pathFile, function (err, data) {
        if (err) {
            return callback(err);
        }

        var filtered = [];

        data.forEach(function (entry) {
            if (path.extname(entry) === '.' + extension) {
                filtered.push(entry);
            }
        })
        return callback(null, filtered);
    });
}
