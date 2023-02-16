import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ship } from '../ship/ship.model';
import { Observable } from 'rxjs';

@Injectable()
export class ShipListService {
//    private url = ` https://api.worldofwarships.ru/wows/encyclopedia/ships/`;
  private url = `https://api.korabli.su/wows/encyclopedia/ships/`;
  constructor(public http: HttpClient) { }

  getShipList(params): Observable<Ship[]> {
    return this.http.get<Ship[]>(`${this.url}`, {params : {
        'application_id': '774e1e9d18a61e9f385584a1d8705404',
        'page_no': '1',
        ...params
      }});
  }

  /*
      getWasteUnit(id: number): Observable<WasteUnit> {
          return this.http.get<WasteUnit>(`${this.url}/${id}`);
      }

      addWasteUnit(waste: WasteUnit) {
          return this.http.post(this.url, waste);
      }

      updateWasteUnit(waste: WasteUnit, id: number) {
          return this.http.put(`${this.url}/${id}`, waste);
      }

      deleteWasteUnit(id: number) {
          return this.http.delete(this.url + "/" + id);
      }
  */

}

