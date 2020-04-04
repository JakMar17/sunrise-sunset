import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeConvertService {

  constructor() { }

  public transformDate(apiTime: string): string {
    let time: any = apiTime.split(/[\s:]+/);
    if (time[0].length == 1)
      time[0] = "0" + time[0];

    if (time[time.length -1] == "PM")
      time[0] = (Number(time[0]) + 12);
    
    let date = new Date(null, null, null, time[0], Number(time[1]));
    let zoneOffset = new Date().getTimezoneOffset() * -1;

    date.setHours(date.getHours() + (zoneOffset / 60));

    if(zoneOffset % 60 != 0 || zoneOffset % 60 != -0) {
      let minutes = date.getMinutes() + 30;
      if (minutes >= 60) {
        date.setHours(date.getHours() + 1);
        minutes -= 60;
      }
      date.setMinutes(minutes)
    }

    let hours = date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours();
    let min = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes();
    return hours + ":" + min;
  }
}
