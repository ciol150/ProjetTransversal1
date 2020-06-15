import { Component } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  
  
  public buttonsListeLivre:Array<string> =[];
  public addResListe(index: number):void {
    this.buttonsListeLivre = [...this.buttonsListeLivre, `${index}`];
  }

  public ListeRecherche:Array<string> =[];
  public addResRecherche(index: number):void {
    this.ListeRecherche = [...this.ListeRecherche, `${index}`];
  }


  //Inscription ET Connexion
  resInscription = "";
  resConnection = "";
  pseudo = "";
  mdp = "";
  mail = "";
  futurModo = "";
  role = "";

  // Infos Livres
  public nomLivres:Array<string> =[];
  public idLivres:Array<string> =[];

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
 
  livres = [];

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
    //console.log("ZUT !");
    document.getElementById("MenuPrincipal").style.display = "block";
    document.getElementById("RechercheLivre").style.display = "none";
    document.getElementById("InscriptionBlock").style.display = "none";
    document.getElementById("ConnectionBlock").style.display = "none";
    document.getElementById("MenuDonner").style.display = "none";
    document.getElementById("RechercheLivre").style.display = "none";
    document.getElementById("MenuListe").style.display = "none";
    document.getElementById("MenuRecommandation").style.display = "none";
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
    this.buttonsListeLivre = [];
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
      var select = document.getElementById("selectCategorie") as HTMLSelectElement;
      //console.log(res);
      var json = JSON.parse(res);
      for (var obj in json){
        //console.log(json[obj].nomCategorie);
        var option = document.createElement("option");
        option.text = json[obj].nomCategorie;
        select.add(option);                       //////////////////////////////////////////////////////////////////////////////////
        //console.log(select);
      }
      
    })
  }
  afficherMenuChercher(){
    document.getElementById("MenuPrincipal").style.display = "none";
    document.getElementById("RechercheLivre").style.display = "block";
    this.recherche = "";

    this.http.get("http://localhost:3000/getCategorie")
    .subscribe(res => {
      var select = document.getElementById("selectCategorieRecherche") as HTMLSelectElement;
      //console.log(res);
      for (var obj in res){
        //console.log(json[obj].nomCategorie);
        var option = document.createElement("option");
        option.text = res[obj].nomCategorie;
        select.add(option);                       //////////////////////////////////////////////////////////////////////////////////
        //console.log(select);
      }
      
    })

    
  }

  afficherMenuRecommandation(){
    document.getElementById("MenuPrincipal").style.display = "none";
    document.getElementById("MenuRecommandation").style.display = "block";
    

    let parametres = new HttpParams();
    this.livres =[];
    parametres = parametres.append('pseudo',this.pseudo);
  
    this.http.get("http://localhost:3000/getRecommandations", { params: parametres} )
    .subscribe(res => { console.log(res);
      for(var obj in res){
        //console.log(res[obj]);
        this.livres = [ ...this.livres, {titre:res[obj].titre, auteur:res[obj].auteur, id:res[obj].idLivre}];
        this.addResRecherche(res[obj].idLivre)
      }
      
    })
  

  }

  afficherMenuListe(){
    
    let parametres = new HttpParams();
    parametres = parametres.append('pseudo', this.pseudo);
    //console.log(parametres);

    
    
    this.http.get("http://localhost:3000/getListeLivre", { params: parametres } )
    .subscribe(res => {
      var liste = document.getElementById("MenuListe");
      var listeDeLivres = "";
      this.nomLivres = [];
      this.idLivres = [];
      
      for(var obj in res){
        this.nomLivres = [... this.nomLivres, `${res[obj].titre}`];
        this.idLivres = [... this.idLivres, `${res[obj].idLivre}`];
        
        this.addResListe(res[obj].idLivre)
     }
      document.getElementById("MenuPrincipal").style.display = "none";
      document.getElementById("MenuListe").style.display = "block";
      
    })
    
  }
  rendreLivre(id){
    this.http.delete("http://localhost:3000/removeListeLivre", { params : {'pseudo' : this.pseudo, 'idLivre' : id} }).subscribe(res => {
        this.http.post("http://localhost:3000/rendreDisponible", {idLivre:id} ).subscribe(res => {
          this.http.post("http://localhost:3000/modifierRedonneur", {idLivre:id, pseudo:this.pseudo} ).subscribe(res => {
            this.http.post("http://localhost:3000/addLivresRendus", {pseudo:this.pseudo, idLivre:id}).subscribe(res => {
              this.resetAuMenuPrincipal();
            })
          })
        })
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
          var select = document.getElementById("selectCategorie") as HTMLSelectElement;
          this.categorie = select.options[select.selectedIndex].value;  ///////////////////////////////////////////////////////////////////

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

  /*
  listeLivre(){

  }
*/
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
  this.livres =[];
  var select = document.getElementById("selectCategorieRecherche") as HTMLSelectElement;
  this.categorie = select.options[select.selectedIndex].value;  

  this.http.get("http://localhost:3000/getLivre", { params: parametres} )
  .subscribe(res => { console.log(res);
    for(var obj in res){
      console.log(res[obj]);
      this.livres = [ ...this.livres, {titre:res[obj].titre, auteur:res[obj].auteur, id:res[obj].idLivre}];
      this.addResRecherche(res[obj].idLivre)
    }
    
  })
}

chercheCategorie(){
  let parametres = new HttpParams();
  
  this.livres =[];
  var select = document.getElementById("selectCategorieRecherche") as HTMLSelectElement;
  this.categorie = select.options[select.selectedIndex].value;  
  parametres = parametres.append('categorie',this.categorie);

  this.http.get("http://localhost:3000/getLivreCat", { params: parametres} )
  .subscribe(res => { console.log(res);
    for(var obj in res){
      console.log(res[obj]);
      this.livres = [ ...this.livres, {titre:res[obj].titre, auteur:res[obj].auteur, id:res[obj].idLivre}];
      this.addResRecherche(res[obj].idLivre)
    }
    
  })
}

supprimerLivre(id){
  if(this.role == "modo" || this.role == "admin"){
    this.http.delete("http://localhost:3000/suppLivre_liste", { params : {'idLivre' : id} })
      .subscribe(res => {
        //console.log(res);
        this.http.delete("http://localhost:3000/suppLivre_rendu", { params : {'idLivre' : id} })
        .subscribe(res => {
          //console.log(res);
          this.http.delete("http://localhost:3000/suppLivre_categorie", { params : {'idLivre' : id} })
          .subscribe(res => {
            //console.log(res);
            this.http.delete("http://localhost:3000/suppLivre", { params : {'idLivre' : id} })
            .subscribe(res => {
              //console.log(res);
              var texte = document.getElementById("TexteRecherche");
              texte.innerHTML = "Livre supprimé."
              this.resetAuMenuPrincipal();
            })
          })
          
        })
      })
  }else{
    var texte = document.getElementById("TexteRecherche");
    texte.innerHTML = "Vous n'avez pas le droit de faire ça."
  }
}

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

