import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ship } from '../ship/ship.model';
import { Observable } from 'rxjs';
import {User} from "../user/user.model";

@Injectable()
export class ShipListService {
//    private url = ` https://api.worldofwarships.ru/wows/encyclopedia/ships/`;
  private urlShips = `https://api.korabli.su/wows/encyclopedia/ships/`;
  private urlUsers = `https://api.korabli.su/wows/account/list/`;
  private urlOptions = `https://api.korabli.su/wows/encyclopedia/info/?fields=774e1e9d18a61e9f385584a1d8705404`;
  constructor(public http: HttpClient) { }

  getShipList(params): Observable<Ship[]> {
    return this.http.get<Ship[]>(`${this.urlShips}`, {params : {
        'application_id': '774e1e9d18a61e9f385584a1d8705404',
        ...params
      }});
  }

  getUserList(params): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlUsers}`, {params : {
        'application_id': '774e1e9d18a61e9f385584a1d8705404',
        ...params
      }});
  }

}

