import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  Cconexion="https://turismoproy.herokuapp.com/";
  constructor(private http:Http, private httpClient: HttpClient) { }
  getHomes(){
    return this.http.get(this.Cconexion + 'homes').map(res=>res.json());
  }

  getpaquetes(){
    return this.http.get(this.Cconexion + 'paquetes').map(res=>res.json());
  }

  getpaquete(id){
    return this.http.get(this.Cconexion + 'paquete/' + id).map(res=>res.json());
  }

  getBuscador(buscador){
    console.log(buscador);
    return this.http.get(this.Cconexion + 'paquetes/' + buscador).map(res=>res.json());
  }

  getDescargarImagen(id): Observable <Blob> {
    return this.httpClient.get(this.Cconexion + 'descargar/' + id, { responseType: 'blob' });
  }

  getpaquetesportipo(id){
    return this.http.get(this.Cconexion+'tiposerviciosId/'+id).map(res=>res.json());
  }

}

export interface Home{
    _id:String,
    Nombre: String,
    Descripcion: String,
    Correo: String,
    Facebook: String,
    Instagram: String,
    Twitter: String,
    Google: String,
    galeria: Array<galeriaHome>
}
export interface galeriaHome{
  _id:String,
  recomendacion: String, 
  descripcion: String, 
  imagen: String, 
  img: String
}

export interface paqueteSchema{
  _id:String,
  Nombre: String,
  Ubicacion: Array<UbicacionSchema>,
  UbicacionGps: UbicacionGps,
  Descripcion: String,
  Frase: String,
  DiasMargen: Number,
  Dificultad: String,
  Costo: Number,
  CostoOperativo: Number,
  FactorDescuento: String,
  TipoServicio: String,
  Recomendaciones: String,
  CodigoViaje: String,
  DiasTrek: Number,
  Alojamiento: Number,
  NroPasajeros: Number,
  Transporte: [],
  Autor: String,
  Estado: String,
  video: String,
  imagen: String,
  img: String,
  galeria: Array<galeria>,
  itinerario: Array<itinerario>,
  inclusiones: Array<inclusiones>,
  Costos: Array<costos>,
  fecha:  Date
}

export interface UbicacionGps{
  lat: Number, 
  lng: Number
}

export interface galeria{
  imagen:String,
  img:String
}

export interface itinerario {
  nrodia: String, 
  tipo: String, 
  detalle: String, 
  icono: String, 
  tipoalojamiento:  tipoalojamiento
}

export interface tipoalojamiento{
  alojamiento:String,
  detalle:String
}

export interface inclusiones{
  tipo:String,
  detalletipo:String
}

export interface costos{
  id:String,
  Proveedor:String,
  Costo: Number,
  total:Number
}

export interface UbicacionSchema{
text:String,
id:Number
}