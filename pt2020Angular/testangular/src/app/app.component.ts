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

cherche(){
  let parametres = new HttpParams();
  parametres = parametres.append('recherche',this.recherche);

  this.http.get("http://localhost:3000/getLivre", { params: parametres} )
  .subscribe(res => { console.log(res);
  
})}
}

