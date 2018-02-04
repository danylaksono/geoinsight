var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var skemaPengguna = new Schema({
    // _id_user: {type: String, required: true, unique: true, default: uuid.v1},
    nama: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    foto: String,
    alamat: String,
    hp: {type: String, required: true},
    instansi: String,
    password: String,
    role: String
},
{
   timestamp: true
});

var pengguna = mongoose.model('Pengguna', skemaPengguna);
module.exports = pengguna;
