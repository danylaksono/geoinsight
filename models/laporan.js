var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skemaLaporan = new Schema({
    type: {type: String, default: "Feature"},
    geometry: {
        type: {type: String, default: "Point"},
        coordinates: [Number]
    },
    properties: {
        id_laporan: {type: String, required: true, unique: true},
        insiden: {type: String, required: true},
        pukul: {type: String, required: true, unique: true},
        tanggal: Date,
        foto: [String],
        severity: Number,
        sumber: {type: String, enum: ["satelit", "pengguna"]},
        keterangan: String,
        orientasi: Number,
        konfirmasi: [{
	        id_konfirm: {type: String},
            user_konfirm: {type: String}
    	}]
    }
},
{
	timestamp: true
});

skemaLaporan.index({"geometry.coordinates": "2d"})
var Laporan = mongoose.model("Laporan", skemaLaporan);
module.exports = Laporan;
