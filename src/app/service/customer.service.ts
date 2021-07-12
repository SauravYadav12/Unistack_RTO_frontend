import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {



  constructor(private http:HttpClient) { }

  backendUrl = 'https://indostar-backend.herokuapp.com/customers';

  getAllRecords(){
    return this.http.get<any>(`${this.backendUrl}/get-all`)
  }

  create(data){
    return this.http.post<any>(`${this.backendUrl}/create`,data);
  }

  update(id,data){
    return this.http.patch<any>(`${this.backendUrl}/update/${id}`,data);
  }

  view(id){
    return this.http.get<any>(`${this.backendUrl}/view/${id}`);
  }

  delete(id,recordData){
    return this.http.patch<any>(`${this.backendUrl}/delete/${id}`,recordData);
  }
}
