import { Component } from '@angular/core';

import { HttpClient, HttpParams} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  
  title = 'testangular';
  pseudo = '';


  onKey(event: KeyboardEvent) { // with type info
    this.pseudo = (event.target as HTMLInputElement).value;
  }

  
  constructor(private http: HttpClient){}
  test() {
  let parametres = new HttpParams();
  parametres = parametres.append('pseudo', this.pseudo);

  console.log(parametres);
  this.http.get("http://localhost:3000/getUser", { params: parametres} )
  //this.http.get("http://localhost:3000/getUser", { responseType: 'text' })
  .subscribe(res => { console.log(res);
})}

}


