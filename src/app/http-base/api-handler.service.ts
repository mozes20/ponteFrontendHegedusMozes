import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";
import { tap } from "rxjs/internal/operators/tap";
import {IApiBaseActions, ParamsType} from "../interfaces/IApiBaseActions.interface";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService implements IApiBaseActions {
  constructor(public httpClient: HttpClient,private router: Router) {
  }

  Get(url: string, params?: ParamsType) {
    return this.httpClient
      .get(url, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x), (error) => this.HandleResponse(error)));
  }


  GetAll(url: string, params?: ParamsType) {
    return this.httpClient
      .get(url, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x),(error) => this.HandleResponse(error)));
  }

  Post(url: string, data: any, params?: ParamsType) {
    return this.httpClient
      .post(url, data, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x),(error) => this.HandleResponse(error)));
  }

  Delete(url: string, params?: ParamsType) {
    return this.httpClient
      .delete(url, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x),(error) => this.HandleResponse(error)));
  }

  Put(url: string, data: any, params?: ParamsType) {
    return this.httpClient
      .put(url, data, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x),(error) => this.HandleResponse(error)));
  }

  HandleResponse(response: any) {
    console.log("response")
    if (response.status === 500) {
      console.error('Internal Server Error')
    }
    if (response.status === 401) {
      console.error('Unauthorized')
    }
    if (response.status === 403) {
      console.log('Forbidden')
      localStorage.removeItem('token')
      this.router.navigate(['/auth'])
    }
  }

  createParams(params?: ParamsType) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.append(key, value);
      });
    }
    return httpParams;
  }
}
