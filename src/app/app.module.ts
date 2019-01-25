import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment as ENV } from '../environments/environment'
import {
  IMqttMessage as MqttMessage,
  MqttModule,
  MqttService,
  IMqttServiceOptions as MqttServiceOptions
} from 'ngx-mqtt';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
export const MQTT_SERVICE_OPTIONS: MqttServiceOptions = {
  connectOnCreate: false,
  hostname: ENV.MQTT_HOST,
  port: ENV.MQTT_PORT,
  protocol: ENV.MQTT_SECURED ? 'wss' : 'ws',
  path: ENV.MQTT_PATH,
};
export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
