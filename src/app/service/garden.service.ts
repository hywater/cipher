import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  constructor(private http: HttpClient) { }
  checkResult(result): Promise<any> {
    if (result.code === 0) {
      return result;
    } else {
      return Object.assign(result, { data: [] });
    }
  }
  login(params): Promise<any> {
    return this.http.get('/api/login', { params: params }).toPromise();
  }
  getUserInfo(): Promise<any> {
    return this.http.get('/api/getUserInfo').toPromise();
  }
  
  queryAll(): Promise<any> {
    return this.http.get('/api/queryAll').toPromise().then();
  }
  queryItemByTitle(title): Promise<any> {
    return this.http.get('/api/queryItemByTitle', { params: { title: title } }).toPromise();
  }
  queryItemById(id): Promise<any> {
    return this.http.get('/api/queryItemById', { params: { id: id } }).toPromise();
  }
  saveItem(params): Promise<any> {
    return this.http.post('/api/saveItem', params).toPromise();
  }
  updateItem(params): Promise<any> {
    return this.http.post('/api/updateItem', params).toPromise();
  }
  removeItem(params): Promise<any> {
    return this.http.post('/api/removeItem', params).toPromise();
  }

}
