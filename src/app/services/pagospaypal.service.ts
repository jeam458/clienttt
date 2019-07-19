import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagospaypalService {
  Cconexion="https://turismoproy.herokuapp.com/";
 // Cconexion="http://localhost:4000/"
  constructor(private http:Http, private httpClient: HttpClient) { }

  generarurl(pago){
    console.log(pago);
    return this.http.get(this.Cconexion+'paypalPage/'+pago.paquete+"/"+pago.grupo+"/"+pago.montopagar+"/"+pago.descripcion).map(res=>res.json())
  }
}
