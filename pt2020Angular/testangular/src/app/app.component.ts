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

  saisiPseudoConnection(event: KeyboardEvent){
    this.pseudo = (event.target as HTMLInputElement).value;
  }
  saisiMDPConnection(event: KeyboardEvent){
    this.mdp = (event.target as HTMLInputElement).value;
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

}


