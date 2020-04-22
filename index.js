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
    

    con.query('SELECT `pseudo` FROM `Utilisateur` as u WHERE (u.pseudo = "'+req.query.id 
                +'" OR u.mail = "'+req.query.id 
                +'") AND u.password ="'+req.query.mdp 
                + '";'
    , function (err, results) {

        if (err) throw err;res.send(JSON.stringify(results));
    });
});

app.get('/getLivre',function (req, res){

    con.query('SELECT * FROM `Livre` WHERE `titre` = ?', [req.query.recherche], function (err, results) {
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
