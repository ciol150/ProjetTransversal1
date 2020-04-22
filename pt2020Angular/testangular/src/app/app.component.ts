import { Component } from '@angular/core';

import { HttpClient, HttpParams} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  
  resConnection = "";
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

  saisiPseudoConnection(event: KeyboardEvent){
    this.pseudo = (event.target as HTMLInputElement).value;
  }

  saisiMDPConnection(event: KeyboardEvent){
    this.mdp = (event.target as HTMLInputElement).value;
  }



  WriteBook(event: KeyboardEvent){
    this.recherche = (event.target as HTMLInputElement).value;
  }


  constructor(private http: HttpClient){}
  



  connection() {
    let parametres = new HttpParams();
    parametres = parametres.append('id', this.pseudo);
    parametres = parametres.append('mdp', this.mdp);
    //console.log(parametres);
    this.http.get("http://localhost:3000/connection", { params: parametres, responseType: "text"} )
    //this.http.get("http://localhost:3000/getUser", { responseType: 'text' })
    .subscribe(res => {
      if(res != "[]"){
        this.resConnection = "Connecté";
        document.getElementById("ConnectionBlock").style.display = "none";
        
      }else{
        this.resConnection = "Echec de connexion";
      }    
    })
  }

  test() {
  let parametres = new HttpParams();
  parametres = parametres.append('pseudo', this.pseudo);
  

  console.log(parametres);
  this.http.get("http://localhost:3000/getUser", { params: parametres} )
  //this.http.get("http://localhost:3000/getUser", { responseType: 'text' })
  .subscribe(res => { console.log(res);
})}


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


  
    