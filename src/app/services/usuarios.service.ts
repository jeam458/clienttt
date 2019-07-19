import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  Cconexion="https://turismoproy.herokuapp.com/";
  constructor(private http:Http, private httpClient: HttpClient) { }

randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

authlogin(user){
  return this.httpClient.post<{token:  string}>(this.Cconexion+'auth/login',user).pipe(tap(res=>{
    localStorage.setItem('token',res.token);
  }))
}

authregister(user){
  return this.httpClient.post<{token: string}>(this.Cconexion+'auth/signup',user).pipe(tap(res=>{
     console.log("usuario creado", res.token);
    //localStorage.setItem('token',res.token);
  }))
}

logout() {
  localStorage.removeItem('token');
}
public get loggedIn(): boolean{
  return localStorage.getItem('token') !==  null;
}

}

export interface userSchema{
    email: String,
    password:  String, 
    nombres: String,
    apellidos: String,
    tipo: String,
    fechaInscripcion:  Date,
    Creador: String,
    celular: Number,
    picture: String
}
