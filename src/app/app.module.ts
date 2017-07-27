import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SensorComponent } from './sensor/sensor.component';
import { ShoplistComponent } from './shoplist/shoplist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { UserComponent } from './user/user.component';
import { ServerloadComponent } from './serverload/serverload.component';
import { ChatComponent } from './chat/chat.component';

import { Ng2EmojiModule } from 'ng2-emoji';
import { HorizonService } from './horizon.service';
import { EventService } from './event.service';
import { UserService } from './user.service';
import { SensorService } from './sensor.service';
import { DeviceComponent } from './device/device.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomeComponent,
    SensorComponent,
    ShoplistComponent,
    DashboardComponent,
    UserComponent,
    ServerloadComponent,
    ChatComponent,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AmChartsModule,
    MomentModule,
    Ng2EmojiModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'shoplist', component: ShoplistComponent}
    ])
  ],
  providers: [EventService, HorizonService, UserService, SensorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
