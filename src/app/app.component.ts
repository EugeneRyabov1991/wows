import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ship } from './ship/ship.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'WoWS economic adviser :)';
  products: any = [];
  Ships: Ship[] = [];
//  pr$: Observable<any>;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    /*
        this.httpClient.get('assets/wows.json').subscribe(data => {
         this.products = data;
    //     console.log(this.products);
         const jsonContent = data['data'];
         for (const key in jsonContent) {
           if (Object.prototype.hasOwnProperty.call(jsonContent, key)) {
             const element = jsonContent[key];
             let newShip: Ship;
             newShip = new Ship();
             newShip.name = element['name'];
             const elementImages = element['images'];
             newShip.smallImage = elementImages['small'];

             this.Ships.push(newShip);
           }
         }
         // tslint:disable-next-line:forin

          this.Ships.forEach(function (value) {
            console.log(value);
          });
         });
    */
  }
}
