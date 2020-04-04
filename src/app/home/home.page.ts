import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private screenOrientation: ScreenOrientation,
    private menuController: MenuController
  ) {}

  public fav:boolean = false;
  public currentLatitude: any;
  public currentLongitude: any;

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
  }
  

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getLocation();
  }
}
