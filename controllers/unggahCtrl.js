var path = require('path');

exports.upload = function(req, res) {
    var data = req.files || [req.file];
    for(var i=0; i<data.length; i++) {
        delete data[i].destination;
        delete data[i].path;
    };
    res.json({
        code: 200,
        message: 'success',
        data: data 
    })
};
