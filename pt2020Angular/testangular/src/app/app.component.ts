import { Component } from '@angular/core';

import { HttpClient} from '@angular/common/http';
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
    const params = {
      param1: this.pseudo,
      responseType: 'text'
    }
  this.http.get("http://localhost:3000/getUser", { params })
  //this.http.get("http://localhost:3000/getUser", { responseType: 'text' })
  .subscribe(res => { console.log(res);
})}

}


