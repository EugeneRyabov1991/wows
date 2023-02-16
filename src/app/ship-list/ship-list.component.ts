import { Component, OnInit } from '@angular/core';
import { Ship } from '../ship/ship.model';
import { ShipListService } from '../ship-list/ship-list.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.css']
})
export class ShipsComponent implements OnInit {

  shipHeader = '';
  targetNation = '';
  allowFindShip = false;
  products: any = [];
  ships: Ship[];

  constructor(private httpClient: HttpClient,
              private shipListService: ShipListService
    ) { }

    // Описание здесь
    //         https://developers.wargaming.net/
    //  Текст запроса для поиска кораблей
    //         https://api.worldofwarships.ru/wows/encyclopedia/ships/?application_id=774e1e9d18a61e9f385584a1d8705404&nation=usa
    //         http://api.korabli.su/wows/encyclopedia/ships/?application_id=774e1e9d18a61e9f385584a1d8705404&nation=usa

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      nation: new FormControl(null, { validators: [Validators.required] }),
      level:  new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onClickLoadShipList() {
    console.log('Go!!!!!!!!!!!');
    this.ships = [];
//    this.httpClient.get('assets/wows.json').subscribe(data => {
    const filter =  {
        nation: this.form.value.nation,
        tier:  this.form.value.level,
      };
    this.shipListService.getShipList(filter).subscribe(data => {
      this.products = data;
      const jsonContent = data['data'];
      let i = 0;
      for (const key in jsonContent) {
        if (Object.prototype.hasOwnProperty.call(jsonContent, key)) {
          const element = jsonContent[key];
          console.log(element['tier'] + ' === ' + filter.tier);

          if (+element['tier'] === +filter.tier) {
            let newShip: Ship;
            newShip = new Ship();
            newShip.id = i;
            newShip.tier = element['tier'];
            newShip.name = element['name'];
            const elementImages = element['images'];
            newShip.smallImage = elementImages['small'];
            this.ships.push(newShip);
            i++;
          }
        }
      }
    });
  }
  onUpdateTargetNation(event: Event) {
     this.allowFindShip = ((<HTMLInputElement>event.target).value.length > 0);
  }
}
