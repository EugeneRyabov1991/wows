import { Component, Input, OnInit } from '@angular/core';
import { Ship } from './ship.model';
import {MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css'],
})

export class ShipComponent implements OnInit  {

  @Input() ship: any;

  constructor() { }

  ngOnInit() {  }
}
