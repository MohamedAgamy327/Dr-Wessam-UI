import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/HTTP';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RepositoryService {

  data: any;

  constructor(private http: HttpClient) { }

  get(url: string, params?: any) {
    const requestUrl = this.generateUrl(
      `${environment.serverUrl + url}`,
      params
    );
    
    return this.http.get(requestUrl);
  }
   getById(url: string, params?: any) {
    const requestUrl = this.generateUrl(
      `${environment.serverUrl + url}`,
      params
    );
    
    return this.http.get(requestUrl+"/"+params);
  }

  delete(url: string, params?: any) {
    const requestUrl = this.generateUrl(
      `${environment.serverUrl + url}`,
      params
    );
    return this.http.delete(requestUrl);
  }

  post(url: string, entity?: any, params?: any) {
    const requestUrl = this.generateUrl(
      `${environment.serverUrl + url}`,
      params
    );
    return this.http.post(requestUrl, entity);
  }

  put(url: string, entity?: any, params?: any) {
    const requestUrl = this.generateUrl(
      `${environment.serverUrl + url}`,
      params
    );
    return this.http.put(requestUrl, entity);
  }

  private generateUrl(url: string, params: any) {
    let requestUrl: string;
    requestUrl = `${url}?`;
    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        const value = params[param];
        requestUrl += `${param}=${value}&`;
      }
    }
    requestUrl = requestUrl.slice(0, -1);
    return requestUrl;
  }

}
