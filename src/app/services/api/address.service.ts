import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalNotifications } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl: string = "https://nominatim.openstreetmap.org/";

  public getAddress(lat:string, lon: string): Promise<any> {
    let url: string = 
      this.baseUrl +
      "reverse?format=json&" +
      "lat=" + lat +
      "&" +
      "lon=" + lon;

    return this.http
      .get(url)
      .toPromise()
      .then(
        data => data as any
      )
      .catch(this.catchErr);
  }

  private catchErr(error: any): Promise<any> {
    console.error("Error", error);
    return Promise.reject(error.message || error);
  }
}
