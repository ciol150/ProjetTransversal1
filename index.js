const express = require('express'); 
const app = express();
const bodyParser= require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));


const mysql= require('mysql');
let con = mysql.createConnection({
    host: "10.194.69.15",
    user: "g7",
    password: "TxCPJKqTRA0MA2fh",
    database: "g7"
});



/*
app.post('/addProfil', function (req, res) {
    var postData= req.body;
    con.query('INSERT INTO Utilisateur SET ?', postData, function (error, results, fields) {
        if (error) 
            throw error;
        res.send(results);
    });
});
*/
app.use(function(req, res, next) {res.header("Access-Control-Allow-Origin", "*");res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");next();});


app.get('/', function (req, res) {
    con.query('select * from Utilisateur ', 
    [req.params.id], 
    function (err, results) {
        if (err) throw err;res.send(JSON.stringify(results));
    });
});



app.get('/connection', function (req, res) {
    con.query('SELECT `pseudo`, `role` FROM `Utilisateur` as u WHERE (u.pseudo = "'+req.query.id 
                +'" OR u.mail = "'+req.query.id 
                +'") AND u.password ="'+req.query.mdp 
                +'";'
    , function (err, results) {

        if (err) throw err;res.send(JSON.stringify(results));
    });
});

app.get('/existeDeja', function (req, res) {
    con.query('SELECT `pseudo` FROM `Utilisateur` as u WHERE (u.pseudo = "'+req.query.pseudo 
                +'" OR u.mail = "'+req.query.mail 
                +'");'
    , function (err, results) {
        if (err) throw err;res.send(JSON.stringify(results));
    });
});

app.post('/addUser', function (req, res) {
    con.query('INSERT INTO Utilisateur SET pseudo = "'+req.body.pseudo
                +'", password ="'+req.body.mdp
                +'", mail ="'+req.body.mail
                +'";'
    , function (error, results, fields) {
        if (error) 
            throw error;
        res.send(results);
    });
});

app.post('/addLivre', function (req, res) {
    var etat = "";
    var isbn = "";
    var resume = "";
    var parution = "";
    var nbPages = "";
    if(req.body.etat != ""){
        etat = ', etat ="'+req.body.etat + '"';
    }
    if(req.body.isbn != ""){
        isbn = ', isbn ="'+req.body.isbn + '"';
    }
    if(req.body.resume != ""){
        resume = ', resume ="'+req.body.resume + '"';
    }
    if(req.body.dateParution != ""){
        parution = ', parution ='+req.body.dateParution;
    }
    if(req.body.nbPage != ""){
        nbPages = ', nbPages ='+req.body.nbPage;
    }
    
    con.query('INSERT INTO Livre SET titre = "'+req.body.titre + '"'
                +etat
                +', langue ="'+req.body.langue + '"'
                +', edition ="'+req.body.edition + '"'
                +isbn
                +resume
                +parution
                +nbPages
                +', donneur ="'+req.body.donneur + '"'
                +', auteur ="'+req.body.auteur + '";'
    , function (error, results, fields) {
        if (error) 
            throw error;
        res.send(results);
    });
});

app.post('/addLivreCategorie', function (req, res) {
    con.query('INSERT INTO LivreCategorie SET nomCategorie = "'+req.body.categorie
                +'", idLivre ="'+req.body.idLivre
                +'";'
    , function (error, results, fields) {
        if (error) 
            throw error;
        res.send(results);
    });
});

app.get('/getIdLivre',function (req, res){
    console.log(req.query);
    con.query('SELECT `idLivre` FROM `Livre` WHERE `titre` = "'+req.query.titre
    +'" AND `donneur` = "' + req.query.pseudo + '" ORDER BY idLivre DESC;'
    , function (err, results) {
        if (err) throw err;res.send(JSON.stringify(results));
    });
});


app.post('/nommerModo', function (req, res) {
    con.query('UPDATE Utilisateur SET role = "modo" WHERE `pseudo` = "'+req.body.pseudo + '";'
    , function (error, results, fields) {
        if (error) 
            throw error;
        res.send(results);
    });
});

app.get('/getLivre',function (req, res){
    con.query('SELECT * FROM `Livre` WHERE `titre` LIKE "%'+req.query.recherche+'%";', function (err, results) {
        if (err) throw err;res.send(JSON.stringify(results));
    });
});

app.get('/getCategorie',function (req, res){

    con.query('SELECT `nomCategorie` FROM `Categorie`', function (err, results) {
        if (err) throw err;res.send(JSON.stringify(results));
    });
});

/*
app.get('/', function(req, res, next){
    res.render('index.html');
});

*/


con.connect(function(err) {
    if (err) 
        throw err;
    console.log('Connected!');
});

app.listen(3000, function () { console.log('Example app listening on port 3000! ') })
