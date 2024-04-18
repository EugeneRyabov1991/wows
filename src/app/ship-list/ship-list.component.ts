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

  fltNation = "USA";
  shipHeader = '';
  targetNation = '';
  allowFindShip = false;
  products: any = [];
  ships: any = [];
  treeShips: any = [];

  nationList = [
    {id : "japan", name:  "Япония"},
    {id : "usa", name:  "США"},
    {id : "ussr", name:  "СССР"},
    {id : "germany", name:  "Германия",},
    {id : "uk", name:  "Великобритания"},
    {id : "france", name:  "Франция"},
    {id : "pan_asia", name:  "Пан-Азия"},
    {id : "italy", name:  "Италия"},
    {id : "europe", name: "Европа"},
    {id : "netherlands", name:  "Нидерланды"},
    {id : "pan_america", name:  "Пан-Америка"},
    {id : "spain", name:  "Испания"},
    {id : "commonwealth", name: "Содружество"},
  ];
  shipTypeList = [
    {id : "Cruiser", name:  "Крейсер"},
    {id : "AirCarrier", name:  "Авианосец"},
    {id : "Battleship", name:  "Линкор"},
    {id : "Destroyer", name:  "Эсминец"},
    {id : "Submarine", name:  "Подводная лодка"},
  ]


  constructor(private httpClient: HttpClient,
              private shipListService: ShipListService
  ) { }

  // Описание здесь
  //         https://developers.wargaming.net/
  //  Текст запроса для поиска кораблей
  //         https://api.worldofwarships.ru/wows/encyclopedia/ships/?application_id=774e1e9d18a61e9f385584a1d8705404&nation=usa
  //         https://api.korabli.su/wows/encyclopedia/ships/?application_id=774e1e9d18a61e9f385584a1d8705404&page_no=[1-N]
  //  Поиск акаунтов игроков по маске
  //         https://api.korabli.su/wows/account/list/?application_id=774e1e9d18a61e9f385584a1d8705404&search=BaldKeeper
  //  Статка по игроку
  //         https://api.korabli.su/wows/account/info/?application_id=774e1e9d18a61e9f385584a1d8705404&account_id=82883503&extra=private.port&fields=private.port

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      nation: new FormControl( this.fltNation, { validators: [Validators.required] }),
      level:  new FormControl(1, { validators: [Validators.required] }),
    });
  }

  async onClickLoadShipList(nation_) {
    console.log('Go!!!!!!!!!!!');
    this.ships = [];
    const filter =  {
      page_no: 5,
      nation: nation_,
    };
    let i = 0;
    const promiseArray : any[] = [];

    for (let pageNo = 1; pageNo <= 8; pageNo++) {
      filter.page_no = pageNo;
      promiseArray.push(this.shipListService.getShipList(filter).toPromise());
    }

    const data = await Promise.all(promiseArray);
    data.forEach( rec => {
       if (rec.data){
        for (const key in rec.data) {
          if (Object.prototype.hasOwnProperty.call(rec.data, key)) {
            const element = rec.data[key];
            if (!element.is_premium && !element.is_special) {
              let newShip = {
                'id': i,
                'uniqueCode': key,
                ...element,
              }
              if (newShip.images?.small != null) {
                newShip.images.small = newShip.images.small.replace('icons//', 'icons/');
              }
              this.ships.push(newShip);
              i++;
            }
          }

       }
     }
    })
    console.log(this.ships.length);
    //
    // this.ships.forEach((element) => {
    //   console.log(element);
    // });
  }

  onUpdateTargetNation(event: Event) {
    this.allowFindShip = ((<HTMLInputElement>event.target).value.length > 0);
  }

  onChangeNation(event) {
    this.onClickLoadShipList(event.tab.textLabel)
//    this.onClickLoadShipList(this.targetNation)
    console.log(this.targetNation);
  }
}
