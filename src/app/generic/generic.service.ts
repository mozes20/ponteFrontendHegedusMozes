import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiHandlerService} from "../http-base/api-handler.service";



@Injectable({
  providedIn: 'root',
})
export class GenericService {
  private AppSettings = 'http://localhost:8080/';

  constructor(private apiService: ApiHandlerService) {
  }
  get(endpoint:string){
    return this.apiService.Get(`${this.AppSettings}`+endpoint)
  }

  post(endpoint:string,body?:any){
    return this.apiService.Post(`${this.AppSettings}`+endpoint,body)
  }

  put(endpoint:string,body?:any){
    return this.apiService.Put(`${this.AppSettings}`+endpoint,body)
  }

  delete(endpoint:string){
    return this.apiService.Delete(`${this.AppSettings}`+endpoint)
  }
}
