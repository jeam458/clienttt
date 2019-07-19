import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposService {
  Cconexion="https://turismoproy.herokuapp.com/"
  constructor(private http: Http, private httpClient: HttpClient) { }

  getTipos(){
   return this.http.get(this.Cconexion + 'tiposervicios').map(res => res.json());
  }

  gettoursportipos(id){
     return this.http.get(this.Cconexion + 'tiposerviciosId/' + id).map(res => res.json())
  }
}

export interface tipoSchema{
  _id:String,
  Tipo:String,
  Descripcion,
  fecha:Date
}



