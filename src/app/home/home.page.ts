import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@capacitor/core';
import { SunAPIService } from '../services/api/sun-api.service';
import { SunriseSunset } from '../classes/SunriseSunset';
import { TimeConvertService } from '../services/timeConvert/time-convert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private screenOrientation: ScreenOrientation,
    private menuController: MenuController,
    private sunAPI: SunAPIService,
    private timeConverter: TimeConvertService
  ) {}

  public fav:boolean = false;
  public currentLatitude: any;
  public currentLongitude: any;

  public sun: SunriseSunset;

  public spinner: boolean = false;

  public setFav(): void {
    if(this.fav)
      this.fav = false;
    else
      this.fav = true;
  }

  public toggleMenu(): void {
    this.menuController.toggle();
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.currentLatitude = position.coords.latitude;
    this.currentLongitude = position.coords.longitude;
  }
  
  async getTodaySunInfo() {
    await this.getLocation();
    this.sunAPI.getTodayData(this.currentLatitude, this.currentLongitude).then(
      (data) => {
        console.log(data);
        this.sun = data.results;
        this.sun.sunrise = this.timeConverter.transformDate(this.sun.sunrise);
        this.sun.solar_noon = this.timeConverter.transformDate(this.sun.solar_noon);
        this.sun.sunset = this.timeConverter.transformDate(this.sun.sunset);
        this.spinner = false;
      }
    )
  }

  public refreshData(event) {
    this.spinner = true;
    this.getTodaySunInfo();
    
    event.target.complete();
  }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getTodaySunInfo();
  }
}
