import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ship } from '../ship/ship.model';
import { Observable } from 'rxjs';
import {User} from "../user/user.model";

@Injectable()
export class ShipListService {
  private applicationID = '774e1e9d18a61e9f385584a1d8705404';
  //BaldKeeper
  private accountId = '82883503';
  private accessToken = 'da40742dc4ee92bf910372cde81afb013c5240e1';

  //       'account_id' : '105565609',//Keeper1973

//    private url = ` https://api.worldofwarships.ru/wows/encyclopedia/ships/`;
  private urlShips = `https://api.korabli.su/wows/encyclopedia/ships/`;
  private urlUsers = `https://api.korabli.su/wows/account/list/`;
  private urlOptions = `https://api.korabli.su/wows/encyclopedia/info/?fields=774e1e9d18a61e9f385584a1d8705404`;
  private urlUserInfo =`https://api.korabli.su/wows/account/info/`;

  private urlGetUserToken =`https://api.tanki.su/wot/auth/login/`;
//  https://api.tanki.su/wot/auth/login/?application_id=774e1e9d18a61e9f385584a1d8705404

//  https://api.tanki.su/wot/auth/login/?application_id=774e1e9d18a61e9f385584a1d8705404&redirect_uri=https%3A%2F%2Fdevelopers.lesta.ru%2Freference%2Fall%2Fwot%2Fauth%2Flogin%2F
//    6a97fbbefa2afff35388ce2829a4ebb7165a4cbd
  constructor(public http: HttpClient) { }

  getShipList(params): Observable<Ship[]> {
    return this.http.get<Ship[]>(`${this.urlShips}`, {params : {
        'application_id': this.applicationID,
        ...params
      }});
  }

  getUserList(params): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlUsers}`, {params : {
        'application_id': this.applicationID,
        ...params
      }});
  }

  getUserInfo(accountId): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlUserInfo}`, {params : {
        'application_id': this.applicationID,
        'account_id' : accountId,
        'access_token' : 'da40742dc4ee92bf910372cde81afb013c5240e1',
        'extra' : 'private.port',
       }});
  }

  getUserToken(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlGetUserToken}`, {params : {
        'application_id': this.applicationID,
        'display' : 'page',
       // 'nofollow' : '1',
        'redirect_uri' : 'http://localhost:4200/',

      }});
  }

}

