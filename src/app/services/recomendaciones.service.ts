import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  Cconexion="https://turismoproy.herokuapp.com/";
  constructor(private http:Http, private httpClient: HttpClient) { }
  getRecomendacion(id){
    return this.http.get(this.Cconexion + 'recomendacion/'+id).map(res=>res.json());
  }
  
}

export interface recomendacion{
  _id:String,
  Titulo:String,
  Descripcion:String,
  Recomendaciones:Array<recomendacionesext>,
  fecha:Date
}

export interface recomendacionesext{
  importancia:String,
  nombre:String,
  descripcion:String
}
