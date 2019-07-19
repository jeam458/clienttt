import { costos } from './tours.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var ubicacion;

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  Cconexion="https://turismoproy.herokuapp.com/";
  //Cconexion="http://localhost:4000/"
  
  constructor(private http:Http, private httpClient: HttpClient) { }

  getgruposfechas(fechas){
    console.log(fechas);
    return this.http.get(this.Cconexion+'gruposFechaPaquete/'+ fechas.startDate + '/' + fechas.endDate + '/' + fechas.Paquete,fechas).map(res=>res.json())
   }

   getgruposfechasGeneral(fechas){
     console.log(fechas)
     return this.http.get(this.Cconexion+'gruposFecha/'+fechas.startDate+'/'+fechas.endDate, fechas).map(res=>res.json())
   }

   createGrupo(grupo){
     return this.http.post(this.Cconexion+'grupo',grupo).map(res=>res.json());
   }

   updateCodigo(grupo){
     console.log(grupo);
     return this.http.put(this.Cconexion+'grupoIdPago/'+grupo._id,grupo).map(res=>res.json())
   }

   updateInte(grupo){
     console.log(grupo)
    return this.http.put(this.Cconexion+'grupoInte/'+grupo._id,grupo).map(res=>res.json())
   }

   nroGrupos(){
     return this.http.get(this.Cconexion+'nrogrupos').map(res=>res.json())
   }
  
   
   
   getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
  
}

export interface datosConsulta{
  startDate: Date,
  endDate: Date,
  Paquete: String,
  pasajeros:Number
}

export interface grupoSchema{
    _id:String,  
    Paquete: String
    Nombre: String,
    TipoGrupo: Number,
    Estado: Number,
    MaxIntegrantes: Number,
    FactorDescuento: String,
    FechaInicio: Date,
    Ubicacion: String,
    UbicacionGps: { lat: Number, lng: Number },
    TotalPago: Number,
    PorPagar: Number,
    Integrantes: Array<IntegrantesSchema>,
    FechaMargen: Date,
    FechaInicioTour: Date,
    IdCreador: String,
    Creador: String,
    imagen: String,
    img: String,
    fecha: Date
}

export interface IntegrantesSchema{
  _id:String,
  IdCliente: String,
  Nombre: String,
  AP: String,
  AM: String,
  TipoDocumento: Number,
  CodEstudiante: String,
  Dni: String,
  Edad: Number,
  Sexo: String,
  Nacionalidad: String,
  Correo: String,
  Celular: String,
  DsctoEdad: Number,
  TotalPago: Number,
  PorPagar: Number,
  Pagos: Array<any>,
  Costos: Array<any>,
  Mensaje: String,
  nro: Number
}

export interface PagosSchema{
  fecha: Date,
  monto: Number,
  codigo: String,
  estado: String, 
  mediopago: String, 
  pagador: PagadorSchema, 
  paymetkey: {} 
}

export interface PagadorSchema{
  Dni: String, 
  Nombre: String, 
  AP: String, 
  AM: String 
}
export interface CostosSchema{
  id: String, 
  Proveedor: String, 
  Costo: {}, 
  Pagos: Array<any>
}

export interface pagoPayPalSchema{
  nro: Number, 
  monto: String, 
  codigo: String, 
  estado: Number
}

