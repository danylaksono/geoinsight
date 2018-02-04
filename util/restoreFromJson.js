var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/geoinsight_test');

function splice(str, start, delCount, newSubStr) {
    return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
};

module.exports = function(path, db) {
    var promise = new Promise(function(resolve, reject) {
        console.log(path, db);
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) reject(err);
            var datas = JSON.parse(data);
            console.log("found "+datas.length+" data");
            if(db == "pengguna") {
                var pengguna = require("../models/pengguna");
            } else if(db == "laporan") {
                var Laporan = require("../models/laporan");
                for(var i=0; i<datas.length; i++) {
                    console.log("data "+i+"...");
                    var tgl = datas[i].tanggal.split("/");
                    var jam = datas[i].pukul.toString()+"+00:00";
                    if(jam.length<10) jam = "0"+jam;
                    jam = splice(jam, 2, 0, ":");
                    tgl=new Date(tgl[2]+"-"+tgl[1]+"-"+tgl[0]+"T"+jam);
                    console.log(tgl);
                    var lapor = new Laporan({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [datas[i].lng, datas[i].lat]
                        },
                        properties: {
                            id_laporan: datas[i].id_laporan,
                            insiden: datas[i].kejadian,
                            pukul: datas[i].pukul,
                            tanggal: tgl,
                            foto: datas[i].foto || null,
                            severity: datas[i].severity,
                            sumber: datas[i].tipe_laporan,
                            keterangan: datas[i].keterangan || null,
                            orientasi: datas[i].orientasi || null                        
                        }
                    });
                    lapor.save(function(err, data){
                        if(err) {
                            console.log(err);
                            reject(err)
                        };
                        console.log("done");
                    });
                    resolve('done');
                }
            }
        });
    });
    return promise;
}
