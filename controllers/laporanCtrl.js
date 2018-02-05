var Laporan = require('./../models/laporan.js');

var success = {
    code: 200,
    message: 'success'
};

var _composeLaporan = function(req) {
    var foto = "";
    var laporan = new Laporan();
    laporan.geometry.coordinates = [req.body.lng, req.body.lat];
    laporan.properties.insiden = req.body.insiden;
    laporan.properties.pukul = req.body.pukul;
    laporan.properties.tanggal = req.body.tanggal;
    laporan.properties.foto = foto;
    laporan.properties.severity = req.body.severity;
    laporan.properties.sumber = req.body.sumber;
    laporan.properties.keterangan = req.body.keterangan;
    laporan.properties.orientasi = req.body.orientasi;
    return laporan;
}

var _tanggalQuery = function(que) {
    var query = {
        "properties.tanggal": {}
    }
    if(que.hasOwnProperty('min')) {
        query["properties.tanggal"].$gte = new Date(que.min);
    }
    if(que.hasOwnProperty('max')) {
        query["properties.tanggal"].$lte = new Date(que.max);
    }
    return query;
}

var _bufferQuery = function(que) {
    var query = {
        geometry: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [que.lng, que.lat]
                },
                $maxDistance: que.dist
            }
        }
    }
    return query;
}

exports.lapor = function(req, res) {
    var laporan = _composeLaporan(req);
    laporan.save(function(err, data) {
        if(err) {
            console.log(err);
            res.json(err);
        } 
        success.data = data;
        res.json(success);
    });
};

exports.verify = function(req, res) {
    var laporan = _composeLaporan(req);
    laporan.save(function(err, data) {
        if(err) {
            console.log(err);
            res.json(err);
        }

        var verifyInfo = {
            _id_konfirm: data._id,
            _id_user: req.body._id_user
        }

        Laporan.findOneAndUpdate(
            {_id: req.body._id_laporan}, 
            {$push: {"properties.konfirmasi": verifyInfo}}, 
            {upsert: true}, 
            function(err, data) {
                if(err) {
                    console.log(err);
                    res.json(err);
                }
                success.data = data;
                res.json(success);
            });
    });
};

exports.getAll = function(req, res) {
    Laporan.find(function(err, data) {
        if(err) {
            console.log(err);
            res.json(err);
        }
        success.data = data;
        res.json(success);
    });
};

exports.getByQuery = function(req, res) {
    const availableQuery = ["tanggal", "buffer"];
    var reqQuery = Object.keys(req.body);
    var query = [];
    for(var i=reqQuery.length-1; i>=0; i--) {
        if(!availableQuery.includes(reqQuery[i])){
            reqQuery.splice(i, 1);
        }
        if(reqQuery[i]=='tanggal') {
            query.push(_tanggalQuery(req.body.tanggal));
        } else if(reqQuery[i]=='buffer') {
            query.push(_bufferQuery(req.body.buffer));
        }
    }
    if(query.length==1) {
        query = query[0];
    } else {
        query = {
            $and: query
        };
    } 
    Laporan.find(query, function(err, data) {
        if(err) {
            console.log(err);
            res.json(err);
        }
        success.data = data;
        res.json(success);
    });
};
