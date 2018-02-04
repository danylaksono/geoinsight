var pengguna = require('./controllers/penggunaCtrl');
var laporan = require('./controllers/laporanCtrl');

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

    return router;
}
