import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SunAPIService {

  constructor(
    private http: HttpClient
  ) { }

  private baseURL: string = "https://api.sunrise-sunset.org/json?";
  
  public getTodayData(lat: string, lng: string): Promise<any> {
    let url = 
      this.baseURL + 
      "lat=" + lat +
      "&" +
      "lng=" + lng +
      "&date=today";

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
