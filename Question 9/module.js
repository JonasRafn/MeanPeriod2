var moduleFile = require('./moduleFile.js');

moduleFile(process.argv[2], process.argv[3], function (err, data) {
    if (err)
        return console.error("Error: " + err);

    data.forEach(function (entry) {
        console.log(entry);
    })
});