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
<<<<<<< HEAD
  pseudo = "";
  mdp = "";
  mail = "";

  //
  recherche= '';
  livre="";

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
    this.livre="";
  }


=======
  title = 'testangular';
  pseudo = "";
  mdp = "";
  recherche= '';
  /*livres = [
    {
      titre: 'test',
      auteur:'test2'
    }
    
  ]*/
  livres=[];
>>>>>>> a442a3b00d13c1ca23d9b1389193344af7ca51dc

  saisiPseudoConnection(event: KeyboardEvent){
    this.pseudo = (event.target as HTMLInputElement).value;
  }
<<<<<<< HEAD
=======

>>>>>>> a442a3b00d13c1ca23d9b1389193344af7ca51dc
  saisiMDPConnection(event: KeyboardEvent){
    this.mdp = (event.target as HTMLInputElement).value;
  }
  saisiMailConnection(event: KeyboardEvent){
    this.mail = (event.target as HTMLInputElement).value;
  }

<<<<<<< HEAD
  WriteBook(event: KeyboardEvent){
    this.recherche = (event.target as HTMLInputElement).value;
  }

  constructor(private http: HttpClient){}


  creationCompte1(){
    document.getElementById("ConnectionBlock").style.display = "none";
    document.getElementById("InscriptionBlock").style.display = "block";
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
          console.log(res);
          this.resInscription = "Inscription réussi"
          this.resetAConnection();
        })
      }else{
        this.resInscription = "Pseudo ou Mail déjà utilisé!"
      }
    })
  }
=======


  WriteBook(event: KeyboardEvent){
    this.recherche = (event.target as HTMLInputElement).value;
  }


  constructor(private http: HttpClient){}
  
>>>>>>> a442a3b00d13c1ca23d9b1389193344af7ca51dc



  connection() {
    let parametres = new HttpParams();
    parametres = parametres.append('id', this.pseudo);
    parametres = parametres.append('mdp', this.mdp);
    //console.log(parametres);
    this.http.get("http://localhost:3000/connection", { params: parametres, responseType: "text"} )
    .subscribe(res => {
      
      var json = JSON.parse(res);
      
      if(res != "[]"){
        this.resConnection = "Connecté";
        document.getElementById("ConnectionBlock").style.display = "none";
        document.getElementById("RechercheLivre").style.display = "block";
        
      }else{
        this.resConnection = "Echec de connexion";
      }    
    })
  }
<<<<<<< HEAD
=======

  test() {
  let parametres = new HttpParams();
  parametres = parametres.append('pseudo', this.pseudo);
  

  console.log(parametres);
  this.http.get("http://localhost:3000/getUser", { params: parametres} )
  //this.http.get("http://localhost:3000/getUser", { responseType: 'text' })
  .subscribe(res => { console.log(res);
})}

>>>>>>> a442a3b00d13c1ca23d9b1389193344af7ca51dc

cherche(){
  let parametres = new HttpParams();
  parametres = parametres.append('recherche',this.recherche);

  this.http.get("http://localhost:3000/getLivre", { params: parametres} )
  .subscribe(res => { console.log(res);
    this.livres = [
      {
        titre: res[0].titre,
        auteur:res[0].auteur,
        id: res[0].idLivre
      },      
    ]
  
  
})}

ajouter(){
  let parametres = new HttpParams();
}

}


  
    