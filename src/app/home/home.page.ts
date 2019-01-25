import { Component } from '@angular/core';
import {
  IMqttMessage as MqttMessage,
  MqttModule,
  MqttService
} from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { Injectable, Inject, forwardRef } from '@angular/core';
@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  _mqttSubscription = {};
  _mqttSubscription2 = {};
  _mqttData={};

  constructor(private _mqtt: MqttService) {
    this._mqtt.connect({ username: 'temp_user', password: 'temppass' });
    this._mqttSubscription = this._mqtt.observe('KU_TEMP/869627035362912/status')
      .subscribe((mqttData: MqttMessage) => {
        console.log(mqttData.payload.toString());

      })
    this._mqttSubscription2 = this._mqtt.observe('KU_TEMP/869627035362912/Hbeat')
      .subscribe((mqttData: MqttMessage) => {
         let data=JSON.parse(mqttData.payload.toString()); 
          console.log(this._mqttData);
         this._mqttData=data;     
        })
        
  }

  publishSwitch(status) {
    this._mqtt.unsafePublish('KU_TEMP/869627035362912/switch/s', status);
  }

}


