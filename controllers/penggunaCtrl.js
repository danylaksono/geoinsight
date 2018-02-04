var Pengguna = require('./../models/pengguna');

var success = {
    code: 200,
    message: 'success'
};

exports.create = function(req, res) {
    var pengguna = new Pengguna();
    pengguna.nama = req.body.nama;
    pengguna.email = req.body.email;
    pengguna.foto = req.body.foto;
    pengguna.alamat = req.body.alamat;
    pengguna.hp = req.body.hp;
    pengguna.instansi = req.body.instansi;
    pengguna.password = req.body.password;
    pengguna.role = req.body.role;

    pengguna.save(function(err, data) {
        if(err) {
           res.send(err);
            console.log(err);
        }
        success.data = data;
        res.json(success);
    });
};

exports.getAll = function(req, res) {
    Pengguna.find(function(err, data) {
        if(err) {
            res.send(err);
            console.log(err);
        }
        success.data = data;
        res.json(success);
    });
};

exports.findById = function(req, res) {
    Pengguna.findOne({'_id':req.params.id}, function(err, data) {
        if(err) {
            res.send(err);
            console.log(err);        
        }
        success.data = data;
        res.json(success);
    });   
};

exports.updateById = function(req, res) {
    Pengguna.findOneAndUpdate({'_id': req.params.id}, req.body, {upsert: true}, function(err, data) {
        if(err) {
            console.log(err);
            res.send(err);
        };
        res.json(success);
    });
};

exports.login = function(req, res) {
    Pengguna.findOne({email: req.body.email, password: req.body.password}, function(err, data) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        if(Object.keys(data).length > 0) {
            success.data = data;
            res.json(success);
        } else {
            res.json({
                code: 403,
                message: 'Firbidden, email or password not found in database'
            });
        };
    });
};
