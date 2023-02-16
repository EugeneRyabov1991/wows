import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { ShipsComponent } from './ship-list/ship-list.component';
import { ShipComponent } from './ship/ship.component';
import { ShipListService } from './ship-list/ship-list.service';

@NgModule({
  declarations: [
    AppComponent,
    ShipsComponent,
    ShipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ShipListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
