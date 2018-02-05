var mongoose = require('mongoose');
var Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

var skemaLaporan = new Schema({
    type: {type: String, default: "Feature"},
    geometry: {
        type: {type: String, default: "Point"},
        coordinates: [Number]
    },
    properties: {
        _id_laporan: ObjectId,
        insiden: {type: String, required: true},
        pukul: Number,
        tanggal: Date,
        foto: [String],
        severity: Number,
        sumber: {type: String, enum: ["satelit", "pengguna"]},
        keterangan: String,
        orientasi: Number,
        konfirmasi: [{
	        _id_konfirm: {type: String},
            _id_user: {type: String}
    	}]
    }
},
{
	timestamp: true
});

skemaLaporan.index({"geometry": "2dsphere"})
var Laporan = mongoose.model("Laporan", skemaLaporan);
module.exports = Laporan;
