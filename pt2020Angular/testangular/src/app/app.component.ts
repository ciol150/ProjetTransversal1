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
<<<<<<< HEAD
  pseudo = "";
  mdp = "";
=======
  pseudo = '';
  recherche= '';
>>>>>>> 80073f8f08afa2b6080c01d06fa5b261d9379fe2

  saisiPseudoConnection(event: KeyboardEvent){
    this.pseudo = (event.target as HTMLInputElement).value;
  }
<<<<<<< HEAD
  saisiMDPConnection(event: KeyboardEvent){
    this.mdp = (event.target as HTMLInputElement).value;
  }


=======
  WriteBook(event: KeyboardEvent){
    this.recherche = (event.target as HTMLInputElement).value;
  }
>>>>>>> 80073f8f08afa2b6080c01d06fa5b261d9379fe2

  constructor(private http: HttpClient){}
<<<<<<< HEAD



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
=======
  test() {
  let parametres = new HttpParams();
  parametres = parametres.append('pseudo', this.pseudo);
  

  console.log(parametres);
  this.http.get("http://localhost:3000/getUser", { params: parametres} )
  //this.http.get("http://localhost:3000/getUser", { responseType: 'text' })
  .subscribe(res => { console.log(res);
})}
>>>>>>> 80073f8f08afa2b6080c01d06fa5b261d9379fe2

cherche(){
  let parametres = new HttpParams();
  parametres = parametres.append('recherche',this.recherche);

  this.http.get("http://localhost:3000/getLivre", { params: parametres} )
  .subscribe(res => { console.log(res);
  
})}
}

