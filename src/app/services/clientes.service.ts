import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  Cconexion="https://turismoproy.herokuapp.com/";
  constructor(private http:Http, private httpClient: HttpClient) { }

  createclient(cliente){
    return this.http.post(this.Cconexion+'cliente', cliente).map(res=>res.json());
  }
  getclient(){
    return this.http.get(this.Cconexion+'clientes').map(res=>res.json())
  }
  updateclient(cliente){
    return this.http.put(this.Cconexion+'cliente/'+cliente._id,cliente).map(res=>res.json())
  }
}

export interface clienteSchema{
  tipo: Number,
  Dni: String,
  Ruc: Number,
  Nombre: String,
  AP: String,
  AM: String,
  Gerente: String,
  TipoDocumento: Number,
  CodEstudiante:String,
  Web: String,
  Edad: Number,
  Sexo:String,
  Nacionalidad: String,
  Direccion: String,
  Referencia: String,
  Correo: String,
  Celular: Number,
  imagen: String,
  img: String,
  Creador: String,
  fecha: Date
}
