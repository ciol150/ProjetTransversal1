var expect    = require("chai").expect;
var assert = require("assert");
var request = require("request");

describe("On vérifie que les requètes envoient les bonnes infos", function(){
    it("On trouve les 2 livres 'prince'", function(){ 
        var url = 'http://localhost:3000/getLivre?recherche=prince';
        var expectedResult = '[{"idLivre":9,"titre":"Le petit prince","etat":"bon","langue":"francais","edition":"Gallimard","isbn":null,"resume":null,"parution":null,"nbPages":120,"disponible":1,"donneur":"RosalieDickson","auteur":"5","redonneur":"lolo"},{"idLivre":10,"titre":"Le prince","etat":"bon","langue":"francais","edition":"Folio","isbn":null,"resume":null,"parution":null,"nbPages":null,"disponible":1,"donneur":"JanetteSalas","auteur":"9","redonneur":null}]';
        request(url, function(error, response, body){
            assert.equal( body, expectedResult, "Normalement ça devrait etre égal");
        });
    })
    it("On vérifie que l'on reçoit les recommandations auxquels on s'attend", function(){
        var url = 'http://localhost:3000/getRecommandations?pseudo=lolo';
        var expectedResult = '[{"idLivre":4,"titre":"Dune","etat":"Bon","langue":"francais","edition":"Pocket","isbn":"2266233203","resume":null,"parution":null,"nbPages":832,"disponible":1,"donneur":"LoicDavid","auteur":"1","redonneur":"lolo"},{"idLivre":11,"titre":"Le meilleur des mondes","etat":null,"langue":"francais","edition":"Pocket","isbn":null,"resume":null,"parution":null,"nbPages":null,"disponible":1,"donneur":"JerriLevine","auteur":"2","redonneur":null}]' ;
        request(url, function(error, response, body){
            assert.equal( body, expectedResult, "Normalement ça devrait etre egal");
        });
    })
})