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

  fltNation = "USSR";
  shipHeader = '';
  targetNation = '';
  allowFindShip = false;
  products: any = [];
  ships: any = [];


  constructor(private httpClient: HttpClient,
              private shipListService: ShipListService
  ) { }

  // Описание здесь
  //         https://developers.wargaming.net/
  //  Текст запроса для поиска кораблей
  //         https://api.worldofwarships.ru/wows/encyclopedia/ships/?application_id=774e1e9d18a61e9f385584a1d8705404&nation=usa
  //         https://api.korabli.su/wows/encyclopedia/ships/?application_id=774e1e9d18a61e9f385584a1d8705404&page_no=[1-N]

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
      page_no: 5,
//        nation: this.form.value.nation,
//        tier:  this.form.value.level,
    };
    let i = 0;
    for (let pageNo = 1; pageNo <= 7; pageNo++) {
      filter.page_no = pageNo;
      this.shipListService.getShipList(filter).subscribe(data => {
        this.products = data;
        const jsonContent = data['data'];
        for (const key in jsonContent) {
          if (Object.prototype.hasOwnProperty.call(jsonContent, key)) {
            const element = jsonContent[key];
//            let newShip: Ship;
//            newShip = Object.assign({}, element);
            let newShip = {
              'id' : i,
              ...element,
            }
              // newShip =  new Ship();
            // newShip.id = i;
            // newShip.tier = element['tier'];
            // newShip.name = element['name'];
            // newShip.isSpecial = element['is_special'];
            // newShip.isPremium = element['is_premium'];
            // const elementImages = element['images'];
            // newShip.smallImage = elementImages['small'];
            console.log(newShip);
            this.ships.push(newShip);
            i++;
          }
        }
      });
    }
  }
  onUpdateTargetNation(event: Event) {
    this.allowFindShip = ((<HTMLInputElement>event.target).value.length > 0);
  }
}
