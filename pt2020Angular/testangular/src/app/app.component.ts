import { Component } from '@angular/core';

import { HttpClient, HttpParams} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  
  //Inscription ET Connexion
  resInscription = "";
  resConnection = "";
  pseudo = "";
  mdp = "";
  mail = "";
  futurModo = "";
  role = "";

  //info livre
  titre = "";
  auteur = "";
  etat = "";
  langue = "";
  edition = "";
  ISBN = "";
  resume = "";
  dateParution = "";
  nbPage = "";
  categorie = ""

  messageMenuPrincipal = "";
  messageMenuDonner = "";
  //
  recherche= '';
  /*livres = [
    {
      titre: 'test',
      auteur:'test2'
    }
    
  ]*/
  livres=[];

  resetAConnection(){
    document.getElementById("ConnectionBlock").style.display = "block";
    document.getElementById("RechercheLivre").style.display = "none";
    document.getElementById("InscriptionBlock").style.display = "none";

    this.resInscription = "";
    this.resConnection = "";
    this.pseudo = "";
    this.mdp = "";
    this.mail = "";

    this.recherche= '';
    this.livres=[];
  }

  saisiFuturModo(event: KeyboardEvent){
    this.futurModo = (event.target as HTMLInputElement).value;
  }

  resetAuMenuPrincipal(){
    document.getElementById("MenuPrincipal").style.display = "block";
    document.getElementById("RechercheLivre").style.display = "none";
    document.getElementById("InscriptionBlock").style.display = "none";
    document.getElementById("ConnectionBlock").style.display = "none";
    document.getElementById("MenuDonner").style.display = "none";
    document.getElementById("RechercheLivre").style.display = "none";
    document.getElementById("MenuListe").style.display = "none";
    this.resInscription = "";
    this.resConnection = "";
    this.futurModo = "";

    this.recherche= '';
    this.livres=[];
    this.messageMenuPrincipal="";
    this.messageMenuDonner = "";

    //info livre
    this.titre = "";
    this.auteur = "";
    this.etat = "";
    this.langue = "";
    this.edition = "";
    this.ISBN = "";
    this.resume = "";
    this.dateParution = "";
    this.nbPage = "";
    this.categorie = "";

  }

  saisiPseudoConnection(event: KeyboardEvent){
    this.pseudo = (event.target as HTMLInputElement).value;
  }

  saisiMDPConnection(event: KeyboardEvent){
    this.mdp = (event.target as HTMLInputElement).value;
  }
  saisiMailConnection(event: KeyboardEvent){
    this.mail = (event.target as HTMLInputElement).value;
  }

  WriteBook(event: KeyboardEvent){
    this.recherche = (event.target as HTMLInputElement).value;
  }

  constructor(private http: HttpClient){}


  afficherMenuInscription(){
    document.getElementById("ConnectionBlock").style.display = "none";
    document.getElementById("InscriptionBlock").style.display = "block";
  }
  afficherMenuNomination(){
    // Si est admin, accéder a ce menu sinon erreur
    if(this.role == "admin"){
      document.getElementById("MenuPrincipal").style.display = "none";
      document.getElementById("MenuNominationModo").style.display = "block";
    }else{
      this.messageMenuPrincipal = "Vous n'êtes pas admin et ne pouvez pas nommer de modérateur";
    }
  }
  afficherMenuDonner(){
    document.getElementById("MenuPrincipal").style.display = "none";
    document.getElementById("MenuDonner").style.display = "block";
    this.http.get("http://localhost:3000/getCategorie", {responseType: "text"} )
    .subscribe(res => {
      var select = document.getElementById("selectCategorie");
      //console.log(res);
      var json = JSON.parse(res);
      for (var obj in json){
        //console.log(json[obj].nomCategorie);
        var option = document.createElement("option");
        option.text = json[obj].nomCategorie;
        select.add(option);
        //console.log(select);
      }
      
    })
  }
  afficherMenuChercher(){
    document.getElementById("MenuPrincipal").style.display = "none";
    document.getElementById("RechercheLivre").style.display = "block";
  }

  afficherMenuListe(){
    var liste = document.getElementById("MenuListe");
    let parametres = new HttpParams();
    parametres = parametres.append('pseudo', this.pseudo);
    //console.log(parametres);

    
    
    this.http.get("http://localhost:3000/getListeLivre", { params: parametres } )
    .subscribe(res => {

      liste.innerHTML += "<ul>";
      for(var obj in res){
        //Livre.idLivre, Livre.titre, Livre.auteur
        liste.innerHTML += '<li>' +res[obj].titre + '--->' + res[obj].auteur + '<button (click)="rendreLivre(' + res[obj].idLivre + ')"">Rendre</button></li>';
      }
      

      document.getElementById("MenuPrincipal").style.display = "none";
      document.getElementById("MenuListe").style.display = "block";
      liste.innerHTML += "</ul>";
    })
  }

  rendreLivre(id){
    let parametres = new HttpParams();
    parametres = parametres.append('pseudo', this.pseudo);
    parametres = parametres.append('idLivre', id);
    this.http.delete("http://localhost:3000/removeListeLivre", {params : parametres})
      .subscribe(res => {
        console.log(res);
        this.resetAuMenuPrincipal()
      })
  }

  inscription() {
    //Verifier que le compte n'existe pas déjà
    let parametres = new HttpParams();
    parametres = parametres.append('pseudo', this.pseudo);
    parametres = parametres.append('mail', this.mail);
    //console.log(parametres);
    this.http.get("http://localhost:3000/existeDeja", { params: parametres, responseType: "text"} )
    .subscribe(res => {
      if(res == "[]"){ // aucun Utilisateur n'utilise ce pseudo et ce mail

        this.http.post("http://localhost:3000/addUser", {
          pseudo: this.pseudo,
          mail: this.mail,
          mdp: this.mdp,
        } )
        .subscribe(res => {
          //console.log(res);
          this.resInscription = "Inscription réussi"
          this.resetAConnection();
        })
      }else{
        this.resInscription = "Pseudo ou Mail déjà utilisé!"
      }
    })
  }

  nommerModo(){
    this.http.post("http://localhost:3000/nommerModo", {
          pseudo: this.futurModo
        } )
        .subscribe(res => {
          //console.log(res);
          this.resetAuMenuPrincipal();
        })
  }


  saisiTitre(event: KeyboardEvent){
    this.titre = (event.target as HTMLInputElement).value;
  }
  saisiAuteur(event: KeyboardEvent){
    this.auteur = (event.target as HTMLInputElement).value;
  }
  saisiEtat(event: KeyboardEvent){
    this.etat = (event.target as HTMLInputElement).value;
  }
  saisiLangue(event: KeyboardEvent){
    this.langue = (event.target as HTMLInputElement).value;
  }
  saisiEdition(event: KeyboardEvent){
    this.edition = (event.target as HTMLInputElement).value;
  }
  saisiISBN(event: KeyboardEvent){
    this.ISBN = (event.target as HTMLInputElement).value;
  }
  saisiResume(event: KeyboardEvent){
    this.resume = (event.target as HTMLInputElement).value;
  }
  saisiDate(event: KeyboardEvent){
    this.dateParution = (event.target as HTMLInputElement).value;
  }
  saisiPage(event: KeyboardEvent){
    this.nbPage = (event.target as HTMLInputElement).value;
  }

  donnerLivre(){
    if((this.titre == "")||(this.langue == "")||(this.edition == "")||(this.auteur == "")){
      //Saisi incomplète
      this.messageMenuDonner = "Vous avez oublié de remplir un ou plusieurs champs obligatoires";
    }else{
      //console.log(this.pseudo);
      var titreLivre = this.titre;
      this.http.post("http://localhost:3000/addLivre", {
          titre: this.titre,
          etat: this.etat,
          langue: this.langue,
          edition: this.edition,
          isbn: this.ISBN,
          resume: this.resume,
          dateParution: this.dateParution,
          nbPage: this.nbPage,
          donneur: this.pseudo,
          auteur: this.auteur
        } )
        .subscribe(res => {
          //console.log(res);
          //Enregistrer une catégorie
          var select = document.getElementById("selectCategorie");
          this.categorie = select.options[select.selectedIndex].value;

          let parametres = new HttpParams();
          parametres = parametres.append('pseudo', this.pseudo);
          parametres = parametres.append('titre', titreLivre);
          console.log("Params : " + titreLivre);

          
          this.http.get("http://localhost:3000/getIdLivre", { params: parametres, responseType: "text"} )
          .subscribe(res2 => {
            var json = JSON.parse(res2);
            console.log(res2);
            console.log(json[0]);
            var idLivre = json[0].idLivre;

            this.http.post("http://localhost:3000/addLivreCategorie", {
            categorie: this.categorie,
            idLivre: idLivre })
            .subscribe(res => {
              console.log(res);
            })
          })
          
          
        })
        
        


        
        this.resetAuMenuPrincipal();
    }
    
  }

  listeLivre(){

  }

  connection() {
    let parametres = new HttpParams();
    parametres = parametres.append('id', this.pseudo);
    parametres = parametres.append('mdp', this.mdp);
    //console.log(parametres);
    this.http.get("http://localhost:3000/connection", { params: parametres, responseType: "text"} )
    .subscribe(res => {
      
      if(res != "[]"){
        var json = JSON.parse(res);
        console.log(json[0].role);
        this.role = json[0].role;
        this.resConnection = "Connecté";
        this.resetAuMenuPrincipal();
      }else{
        this.resConnection = "Echec de connexion";
      }    
    })
  }


  /*test() {
  let parametres = new HttpParams();
  parametres = parametres.append('pseudo', this.pseudo);
  

  console.log(parametres);
  this.http.get("http://localhost:3000/getUser", { params: parametres} )
  //this.http.get("http://localhost:3000/getUser", { responseType: 'text' })
  .subscribe(res => { console.log(res);
})}*/


cherche(){
  let parametres = new HttpParams();
  parametres = parametres.append('recherche',this.recherche);

  this.http.get("http://localhost:3000/getLivre", { params: parametres} )
  .subscribe(res => { console.log(res);
    for(var obj in res){
      console.log(res[obj]);
      
    }
    this.livres = [
      {
        titre: res[0].titre,
        auteur:res[0].auteur,
        id: res[0].idLivre
      },      
    ];
  
  
})}

ajouter(id){
  this.http.post( "http://localhost:3000/rendreIndisponible", {idLivre: id } )
  .subscribe(res => {
    console.log(this.pseudo);

    this.http.post("http://localhost:3000/addListeLivre", {
      pseudo: this.pseudo,
      idLivre: id })
    .subscribe(res => {
      //console.log(res);
    })


    
    this.resetAuMenuPrincipal();
  })
  
}

}


  
    