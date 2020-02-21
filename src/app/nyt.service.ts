import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NytService {
  constructor(
    private http: HttpClient
  ) { }
  getArticles(section: string = 'home') {
    let params: HttpParams = new HttpParams();
    params = params.set('api-key', environment.apikey);
    return this.http.get(`${environment.apiUrl}/topstories/v2/${section}.json`, { params });
  }
}
