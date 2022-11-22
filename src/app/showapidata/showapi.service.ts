import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ShowapiService {

  url='http://www.mocky.io/v2/5ea172973100002d001eeada';
  url2='https://api.publicapis.org/entries';

  constructor(private http:HttpClient) { }

 public getData()
 {
    return this.http.get(this.url);
  }

  public getEntries(){
    return this.http.get(this.url2);
  }
}
