var path = require('path');
var multer = require('multer');
var imageFilter = require('./utils/imageFilter');
var upload = multer({dest: path.join(__dirname, 'tmp'), fileFilter: imageFilter});

var pengguna = require('./controllers/penggunaCtrl');
var laporan = require('./controllers/laporanCtrl');
var unggah = require('./controllers/unggahCtrl');

module.exports = function(app, express) {
    var router = app;

    // TEST
    router.get('/', function(req, res){
        res.send('it works, amazing *-*');
    });

    // ROUTE PENGGUNA
    router.get('/api/pengguna', pengguna.getAll);
    router.post('/api/pengguna/create', pengguna.create);
    router.get('/api/pengguna/:id', pengguna.findById);
    router.post('/api/pengguna/:id/update', pengguna.updateById);
    router.post('/api/pengguna/login', pengguna.login);

    // ROUTE LAPORAN
    router.get('/api/laporan', laporan.getAll);
    router.post('/api/laporan/lapor', laporan.lapor);
    router.post('/api/laporan/verify', laporan.verify);

    // ROUTE UTILITY
    router.post('/api/unggah/single', upload.single('file'), unggah.upload);
    router.post('/api/unggah/multi', upload.array('file'), unggah.upload);

    return router;
}
