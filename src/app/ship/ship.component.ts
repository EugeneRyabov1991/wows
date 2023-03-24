import { Component, Input, OnInit } from '@angular/core';
import { Ship } from './ship.model';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit  {

  @Input() ship: any;

  constructor() { }

  ngOnInit() {  }
}
