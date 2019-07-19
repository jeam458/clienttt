import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'; 
import { paqueteSchema, UbicacionGps} from '../../services/tours.service';
import { GruposService, IntegrantesSchema, PagosSchema, PagadorSchema} from '../../services/grupos.service';
import { ClientesService,clienteSchema} from '../../services/clientes.service';
import { UsuariosService, userSchema} from '../../services/usuarios.service';
import { PagospaypalService} from '../../services/pagospaypal.service';
import { DOCUMENT } from '@angular/common';
declare var $;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  montofactor:any;
  pasarcheck:boolean;
  pasajeros:any;
  pasajerostemp:any;
  integrante:IntegrantesSchema;
  Integrantes:Array<IntegrantesSchema>=[];
  cliente:clienteSchema;
  user:userSchema;
  pagador:any;
  paymett:any={};
  paquete:paqueteSchema;
  contadorexistente:any=0;
  maximopasajero:any=0;
  pagosIntegrante:PagosSchema;
  AcumuladoPagar:Number

  select_sexo = {
    availableOptions: [
        { id: '0', name: 'Masculino' },
        { id: '1', name: 'Femenino' }
    ]
  }
  tipo_documento = {
    availableOptions: [
        { id: 0, name: 'Cédula/DNI' },
        { id: 1, name: 'Pasaporte' },
        { id: 2, name: 'Carnet de extranjería' }
    ],
    selectedOption: { id: 0, name: 'Cédula/DNI' }
  }
  select_pais = {
    availableOptions: [
        { id: "AD", name: "Andorra" },
        { id: "AE", name: "United Arab Emirates" },
        { id: "AF", name: "Afghanistan" },
        { id: "AG", name: "Antigua and Barbuda" },
        { id: "AI", name: "Anguilla" },
        { id: "AL", name: "Albania" },
        { id: "AM", name: "Armenia" },
        { id: "AN", name: "Netherlands Antilles" },
        { id: "AO", name: "Angola" },
        { id: "AQ", name: "Antarctica" },
        { id: "AS", name: "American Samoa" },
        { id: "AR", name: "Argentina" },
        { id: "AT", name: "Austria" },
        { id: "AU", name: "Australia" },
        { id: "AW", name: "Aruba" },
        { id: "AX", name: "Åland Islands" },
        { id: "AZ", name: "Azerbaijan" },
        { id: "BA", name: "Bosnia and Herzegovina" },
        { id: "BB", name: "Barbados" },
        { id: "BD", name: "Bangladesh" },
        { id: "BE", name: "Belgium" },
        { id: "BF", name: "Burkina Faso" },
        { id: "BG", name: "Bulgaria" },
        { id: "BH", name: "Bahrain" },
        { id: "BI", name: "Burundi" },
        { id: "BJ", name: "Benin" },
        { id: "BL", name: "Saint Barthélemy" },
        { id: "BM", name: "Bermuda" },
        { id: "BN", name: "Brunei Darussalam" },
        { id: "BO", name: "Bolivia, Plurinational State of" },
        { id: "BQ", name: "Caribbean Netherlands" },
        { id: "BR", name: "Brazil" },
        { id: "BS", name: "Bahamas" },
        { id: "BT", name: "Bhutan" },
        { id: "BV", name: "Bouvet Island" },
        { id: "BW", name: "Botswana" },
        { id: "BY", name: "Belarus" },
        { id: "BZ", name: "Belize" },
        { id: "CA", name: "Canada" },
        { id: "CC", name: "Cocos (Keeling) Islands" },
        { id: "CD", name: "Congo, the Democratic Republic of the" },
        { id: "CF", name: "Central African Republic" },
        { id: "CG", name: "Congo" },
        { id: "CH", name: "Switzerland" },
        { id: "CI", name: "Côte D'Ivoire" },
        { id: "CK", name: "Cook Islands" },
        { id: "CL", name: "Chile" },
        { id: "CM", name: "Cameroon" },
        { id: "CN", name: "China" },
        { id: "CO", name: "Colombia" },
        { id: "CR", name: "Costa Rica" },
        { id: "CU", name: "Cuba" },
        { id: "CV", name: "Cape Verde" },
        { id: "CW", name: "Curaçao" },
        { id: "CX", name: "Christmas Island" },
        { id: "CY", name: "Cyprus" },
        { id: "CZ", name: "Czech Republic" },
        { id: "DE", name: "Germany" },
        { id: "DJ", name: "Djibouti" },
        { id: "DK", name: "Denmark" },
        { id: "DM", name: "Dominica" },
        { id: "DO", name: "Dominican Republic" },
        { id: "DZ", name: "Algeria" },
        { id: "EC", name: "Ecuador" },
        { id: "EE", name: "Estonia" },
        { id: "EG", name: "Egypt" },
        { id: "EH", name: "Western Sahara" },
        { id: "ER", name: "Eritrea" },
        { id: "ES", name: "Spain" },
        { id: "ET", name: "Ethiopia" },
        { id: "EU", name: "Europe" },
        { id: "FI", name: "Finland" },
        { id: "FJ", name: "Fiji" },
        { id: "FK", name: "Falkland Islands (Malvinas)" },
        { id: "FM", name: "Micronesia, Federated States of" },
        { id: "FO", name: "Faroe Islands" },
        { id: "FR", name: "France" },
        { id: "GA", name: "Gabon" },
        { id: "GB", name: "United Kingdom" },
        { id: "GD", name: "Grenada" },
        { id: "GE", name: "Georgia" },
        { id: "GF", name: "French Guiana" },
        { id: "GG", name: "Guernsey" },
        { id: "GH", name: "Ghana" },
        { id: "GI", name: "Gibraltar" },
        { id: "GL", name: "Greenland" },
        { id: "GM", name: "Gambia" },
        { id: "GN", name: "Guinea" },
        { id: "GP", name: "Guadeloupe" },
        { id: "GQ", name: "Equatorial Guinea" },
        { id: "GR", name: "Greece" },
        { id: "GS", name: "South Georgia and the South Sandwich Islands" },
        { id: "GT", name: "Guatemala" },
        { id: "GU", name: "Guam" },
        { id: "GW", name: "Guinea-Bissau" },
        { id: "GY", name: "Guyana" },
        { id: "HK", name: "Hong Kong" },
        { id: "HM", name: "Heard Island and McDonald Islands" },
        { id: "HN", name: "Honduras" },
        { id: "HR", name: "Croatia" },
        { id: "HT", name: "Haiti" },
        { id: "HU", name: "Hungary" },
        { id: "ID", name: "Indonesia" },
        { id: "IE", name: "Ireland" },
        { id: "IL", name: "Israel" },
        { id: "IM", name: "Isle of Man" },
        { id: "IN", name: "India" },
        { id: "IO", name: "British Indian Ocean Territory" },
        { id: "IQ", name: "Iraq" },
        { id: "IR", name: "Iran, Islamic Republic of" },
        { id: "IS", name: "Iceland" },
        { id: "IT", name: "Italy" },
        { id: "JE", name: "Jersey" },
        { id: "JM", name: "Jamaica" },
        { id: "JO", name: "Jordan" },
        { id: "JP", name: "Japan" },
        { id: "KE", name: "Kenya" },
        { id: "KG", name: "Kyrgyzstan" },
        { id: "KH", name: "Cambodia" },
        { id: "KI", name: "Kiribati" },
        { id: "KM", name: "Comoros" },
        { id: "KN", name: "Saint Kitts and Nevis" },
        { id: "KP", name: "Korea, Democratic People's Republic of" },
        { id: "KR", name: "Korea, Republic of" },
        { id: "KW", name: "Kuwait" },
        { id: "KY", name: "Cayman Islands" },
        { id: "KZ", name: "Kazakhstan" },
        { id: "LA", name: "Lao People's Democratic Republic" },
        { id: "LB", name: "Lebanon" },
        { id: "LC", name: "Saint Lucia" },
        { id: "LI", name: "Liechtenstein" },
        { id: "LK", name: "Sri Lanka" },
        { id: "LR", name: "Liberia" },
        { id: "LS", name: "Lesotho" },
        { id: "LT", name: "Lithuania" },
        { id: "LU", name: "Luxembourg" },
        { id: "LV", name: "Latvia" },
        { id: "LY", name: "Libya" },
        { id: "MA", name: "Morocco" },
        { id: "MC", name: "Monaco" },
        { id: "MD", name: "Moldova, Republic of" },
        { id: "ME", name: "Montenegro" },
        { id: "MF", name: "Saint Martin" },
        { id: "MG", name: "Madagascar" },
        { id: "MH", name: "Marshall Islands" },
        { id: "MK", name: "Macedonia, the former Yugoslav Republic of" },
        { id: "ML", name: "Mali" },
        { id: "MM", name: "Myanmar" },
        { id: "MN", name: "Mongolia" },
        { id: "MO", name: "Macao" },
        { id: "MP", name: "Northern Mariana Islands" },
        { id: "MQ", name: "Martinique" },
        { id: "MR", name: "Mauritania" },
        { id: "MS", name: "Montserrat" },
        { id: "MT", name: "Malta" },
        { id: "MU", name: "Mauritius" },
        { id: "MV", name: "Maldives" },
        { id: "MW", name: "Malawi" },
        { id: "MX", name: "Mexico" },
        { id: "MY", name: "Malaysia" },
        { id: "MZ", name: "Mozambique" },
        { id: "NA", name: "Namibia" },
        { id: "NC", name: "New Caledonia" },
        { id: "NE", name: "Niger" },
        { id: "NF", name: "Norfolk Island" },
        { id: "NG", name: "Nigeria" },
        { id: "NI", name: "Nicaragua" },
        { id: "NL", name: "Netherlands" },
        { id: "NO", name: "Norway" },
        { id: "NP", name: "Nepal" },
        { id: "NR", name: "Nauru" },
        { id: "NU", name: "Niue" },
        { id: "NZ", name: "New Zealand" },
        { id: "OM", name: "Oman" },
        { id: "PA", name: "Panama" },
        { id: "PE", name: "Peru" },
        { id: "PF", name: "French Polynesia" },
        { id: "PG", name: "Papua New Guinea" },
        { id: "PH", name: "Philippines" },
        { id: "PK", name: "Pakistan" },
        { id: "PL", name: "Poland" },
        { id: "PM", name: "Saint Pierre and Miquelon" },
        { id: "PN", name: "Pitcairn" },
        { id: "PR", name: "Puerto Rico" },
        { id: "PS", name: "Palestine" },
        { id: "PT", name: "Portugal" },
        { id: "PW", name: "Palau" },
        { id: "PY", name: "Paraguay" },
        { id: "QA", name: "Qatar" },
        { id: "RE", name: "Réunion" },
        { id: "RO", name: "Romania" },
        { id: "RS", name: "Serbia" },
        { id: "RU", name: "Russian Federation" },
        { id: "RW", name: "Rwanda" },
        { id: "SA", name: "Saudi Arabia" },
        { id: "SB", name: "Solomon Islands" },
        { id: "SC", name: "Seychelles" },
        { id: "SD", name: "Sudan" },
        { id: "SE", name: "Sweden" },
        { id: "SG", name: "Singapore" },
        { id: "SH", name: "Saint Helena, Ascension and Tristan da Cunha" },
        { id: "SI", name: "Slovenia" },
        { id: "SJ", name: "Svalbard and Jan Mayen Islands" },
        { id: "SK", name: "Slovakia" },
        { id: "SL", name: "Sierra Leone" },
        { id: "SM", name: "San Marino" },
        { id: "SN", name: "Senegal" },
        { id: "SO", name: "Somalia" },
        { id: "SR", name: "Suriname" },
        { id: "SS", name: "South Sudan" },
        { id: "ST", name: "Sao Tome and Principe" },
        { id: "SV", name: "El Salvador" },
        { id: "SX", name: "Sint Maarten (Dutch part)" },
        { id: "SY", name: "Syrian Arab Republic" },
        { id: "SZ", name: "Swaziland" },
        { id: "TC", name: "Turks and Caicos Islands" },
        { id: "TD", name: "Chad" },
        { id: "TF", name: "French Southern Territories" },
        { id: "TG", name: "Togo" },
        { id: "TH", name: "Thailand" },
        { id: "TJ", name: "Tajikistan" },
        { id: "TK", name: "Tokelau" },
        { id: "TL", name: "Timor-Leste" },
        { id: "TM", name: "Turkmenistan" },
        { id: "TN", name: "Tunisia" },
        { id: "TO", name: "Tonga" },
        { id: "TR", name: "Turkey" },
        { id: "TT", name: "Trinidad and Tobago" },
        { id: "TV", name: "Tuvalu" },
        { id: "TW", name: "Taiwan" },
        { id: "TZ", name: "Tanzania, United Republic of" },
        { id: "UA", name: "Ukraine" },
        { id: "UG", name: "Uganda" },
        { id: "UM", name: "US Minor Outlying Islands" },
        { id: "US", name: "United States" },
        { id: "UY", name: "Uruguay" },
        { id: "UZ", name: "Uzbekistan" },
        { id: "VA", name: "Holy See (Vatican City State)" },
        { id: "VC", name: "Saint Vincent and the Grenadines" },
        { id: "VE", name: "Venezuela, Bolivarian Republic of" },
        { id: "VG", name: "Virgin Islands, British" },
        { id: "VI", name: "Virgin Islands, U.S." },
        { id: "VN", name: "Viet Nam" },
        { id: "VU", name: "Vanuatu" },
        { id: "WF", name: "Wallis and Futuna Islands" },
        { id: "XK", name: "Kosovo" },
        { id: "WS", name: "Samoa" },
        { id: "YE", name: "Yemen" },
        { id: "YT", name: "Mayotte" },
        { id: "ZA", name: "South Africa" },
        { id: "ZM", name: "Zambia" },
        { id: "ZW", name: "Zimbabwe" }
    ]
  }
  
  
  tipo_grupo = {
    availableOptions: [
        { id: '0', name: 'Público' },
        { id: '1', name: 'Privado' }
    ],
    selectedOption: { id: '0', name: 'Público' }
  }
  
  estado_grupo = {
    availableOptions: [
        { id: '0', name: 'activo' },
        { id: '1', name: 'suspendido' },
        { id: '2', name: 'cancelado' },
        { id: '3', name: 'Cerrado' }
    ],
    selectedOption: { id: '0', name: 'activo' }
  };
  
  tipo_inclusion = {
    availableOptions: [
        { id: '0', name: 'Incluye' },
        { id: '1', name: 'No Incluye' }
  
    ],
    selectedOption: { id: '0', name: 'Incluye' }
  }
  
  estado_paquete = {
    availableOptions: [
        { id: '0', name: 'disponible' },
        { id: '1', name: 'fuera de temporada' },
        { id: '2', name: 'promoción' }
    ],
    selectedOption: { id: '0', name: 'disponible' },
  }

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private userservice:UsuariosService, private clienteservice:ClientesService, private pagoservice:PagospaypalService, private gruposervice:GruposService, @Inject(DOCUMENT) private document: any) { }

    onNoClick():void{
      this.dialogRef.close({estado:false});
      //this.data.estado=false;
    }

  ngOnInit() {
    $(document).ready(function(){
      $('select').formSelect();
    });
    this.montofactor=0;
    this.pasarcheck=false;
    this.user=this.inicializarusuario();
    this.cliente= this.inicializarcliente();
    this.paquete= this.inicializarPaquete();
    this.integrante = this.inicializarintegrate();
    this.pagosIntegrante= this.inicializarPagosSchema();
    console.log(this.data)
    this.data.grupo.TotalPago=0;
    this.pasajeros= this.data.pasajeros;
    this.pasajerostemp=this.data.pasajeros;
    this.paquete= this.data.paquete;
    this.pasajerostemp=this.data.pasajeros;
    console.log("el temporal", this.pasajerostemp)
    this.maximopasajeros();
  }
  /**
   * buscar maximo numeero a añadir
   */
  maximopasajeros(){
    for(var index=0;index<this.data.grupo.Integrantes.length;index++){
      if(this.data.grupo.Integrantes[index].Dni!=""){
          this.contadorexistente=this.contadorexistente+1;
      }
    }
    console.log(this.data.paquete.NroPasajeros);
    console.log(this.contadorexistente)
    this.maximopasajero= this.data.paquete.NroPasajeros-this.contadorexistente;
    console.log(this.maximopasajero)
  }

  modificarpasajeros(pasajeros){
    console.log("modificando", pasajeros);
    console.log("pasajeros modificable", this.pasajeros);
    if(pasajeros!=null){
      console.log(this.pasajerostemp);
      var cuantos=0;
      console.log(cuantos)
      if(this.pasajerostemp>pasajeros){
        cuantos= this.pasajerostemp-pasajeros; 
        console.log("elementos a ser eliminados",cuantos);
        for(var i=1;i<=cuantos;i++){
          this.data.grupo.Integrantes.splice(this.data.grupo.Integrantes.length-1,1);
        }
        this.pasajerostemp=pasajeros;
        console.log(this.porfactpago(this.data.grupo))
        this.actualizarmontodell();
      }else{
        cuantos=pasajeros-this.pasajerostemp;
        this.addIntegrantes(cuantos,this.data.grupo);
        this.pasajerostemp=pasajeros;
      }
    }
  }

  /**mantenimiento de integrantes  de grupo */
  inicializarpagador(){
    let pagador: PagadorSchema;
    return pagador={
     AM:"",
     AP:"",
     Dni:"",
     Nombre:""
    }
  }
  inicializarPagosSchema(){
    let pagos: PagosSchema;
    return pagos={
      codigo:"",
      estado:"",
      fecha:new Date(),
      mediopago:"",
      monto:0,
      pagador:this.inicializarpagador(),
      paymetkey:""
    }
  }
  inicializarintegrate(){
    let integrante:IntegrantesSchema;
    return integrante={
    _id:'',
    nro:0,
    Nombre:'',
    AP:'',
    AM:'',
    Nacionalidad:'',
    Sexo:'',
    Edad:0,
    TipoDocumento:0,
    Dni:'',
    Correo:'',
    Celular:'',
    CodEstudiante:'',
    TotalPago: 0,
    PorPagar:0 ,
    Costos:[],
    Pagos:[],
    DsctoEdad:0,
    IdCliente:'',
    Mensaje:''
    }
  }
   /**
   * inicializamos el paquete
   */
  inicializargps(){
    let ubicaciongps: UbicacionGps;
    return ubicaciongps={
      lat:0,
      lng:0
    }
  }
  inicializarPaquete(){
    let paquete: paqueteSchema;
    return paquete={
      _id:'',
      Alojamiento:0,
      Autor:'',
      CodigoViaje:'',
      Costo:0,
      CostoOperativo:0,
      Costos:[],
      Descripcion:'',
      DiasMargen:0,
      DiasTrek:0,
      Dificultad:'',
      Estado:'',
      FactorDescuento:'',
      Frase:'',
      Nombre:'',
      NroPasajeros:0,
      Recomendaciones:'',
      TipoServicio:'',
      Transporte:[],
      Ubicacion:[],
      UbicacionGps:this.inicializargps(),
      fecha:new Date(),
      galeria:[],
      imagen:'',
      img:'',
      inclusiones:[],
      itinerario:[],
      video:''
    }
  }
  /**
   * @param inicializar usuario
   */
  inicializarusuario(){
    let usuario:userSchema;
    return usuario={
      Creador:'',
      apellidos:'',
      celular:0,
      email:'',
      fechaInscripcion:new Date(),
      nombres:'',
      password:'',
      picture:'',
      tipo:''
    }
  }

  /**
   * cambiar estados
   */
  cambiarAdelante(){
    this.pasarcheck=true;
  }

  cambiarAtras(){
    this.pasarcheck=false;
  }

  /**
   * 
   * @param  inicializar clientes
   */
  inicializarcliente(){
    let cliente:clienteSchema;
    return cliente={
     AM:'',
     AP:'',
     Celular:0,
     CodEstudiante:'',
     Correo:'',
     Creador:'',
     Direccion:'',
     Dni:'',
     Edad:0,
     Gerente:'',
     Nacionalidad:'',
     Nombre:'',
     Referencia:'',
     Ruc:0,
     Sexo:'',
     TipoDocumento:0,
     Web:'',
     fecha: new Date(),
     imagen:'',
     img:'',
     tipo:0
    }
  }

  addIntegrantes(cuantos,grupo){
    console.log(grupo.Integrantes.length);
    console.log(this.pasajeros)
    for(var index=1; index<= cuantos; index++){
      if(grupo.Integrantes!=0 || grupo.Integrantes!=undefined){
        console.log(grupo.Integrantes.length + index);
        //console.log(this.integrante.nro)
        var nro = grupo.Integrantes.length + index;
        this.addIntegrante(nro,grupo)
      }else{
        var nro1 = index;
        this.addIntegrante(nro1,grupo);
      }
    }
    for(var index=0; index<this.Integrantes.length; index++){
      grupo.Integrantes.push(this.Integrantes[index]);
    }
    this.actualizarmonto(grupo);
    this.Integrantes=[];
  }

  actualizarmonto(grupo){
    this.montofactor=grupo.Integrantes[grupo.Integrantes.length-1].TotalPago;
    console.log(this.montofactor);
    for(var index1=0; index1<grupo.Integrantes.length;index1++){
      if(grupo.Integrantes[index1]._id==undefined){
        grupo.Integrantes[index1].TotalPago=this.montofactor;
      grupo.Integrantes[index1].PorPagar=this.montofactor;
      }
    }
  }
  actualizarmontodell(){
    this.montofactor= this.porfactpago(this.data.grupo);
    for(var index1=0; index1<this.data.grupo.Integrantes.length;index1++){
      if(this.data.grupo.Integrantes[index1]._id==undefined){
        this.data.grupo.Integrantes[index1].TotalPago=this.montofactor;
        this.data.grupo.Integrantes[index1].PorPagar=this.montofactor;
      }
    }
  }

  addIntegrante(nro,grupo){
    this.integrante.nro=nro;
    this.integrante.Nombre='';
    this.integrante.AP='';
    this.integrante.AM='';
    this.integrante.Nacionalidad='';
    this.integrante.Sexo='';
    this.integrante.Edad=0;
    this.integrante.TipoDocumento=0;
    this.integrante.Dni='';
    this.integrante.Correo='';
    this.integrante.Celular='';
    this.integrante.CodEstudiante='';
    this.integrante.TotalPago= this.porfactpago(grupo);
    this.integrante.PorPagar= this.porfactpago(grupo);
    this.integrante.Costos=[];
    this.integrante.Pagos=[];
    this.integrante.Costos = this.paquete.Costos;
    this.integrante.DsctoEdad=0;
    delete this.integrante._id;
    console.log(this.integrante)
    this.Integrantes.push(this.integrante);
    this.integrante= this.inicializarintegrate();
    console.log(this.Integrantes);
  }


  /**
   * calculo de pago por factor
   */
  porfactpago(grupo){
    var valormoment1;
    var indice= grupo.FactorDescuento.indexOf('%');
    if(indice!=-1){
      var facto = grupo.FactorDescuento;
      facto.slice(indice,1)
      var factor = parseFloat(facto);
      var varporcentaje1= (this.pasajeros*factor * parseFloat(this.paquete.Costo.toString()))/100;
      valormoment1= parseFloat(this.paquete.Costo.toString())- varporcentaje1;
      return valormoment1;
    }else if(indice==-1){
      valormoment1= parseFloat(this.paquete.Costo.toString())-(parseFloat(this.paquete.FactorDescuento.toString())*this.pasajeros)
      return valormoment1;
    }
  }

  /**
   * check pagar
   */

   checkpago(values:any,inte){
     console.log(values.currentTarget.checked);
     console.log(inte)
     if(values.currentTarget.checked==true){
       this.data.grupo.TotalPago=this.data.grupo.TotalPago+inte.TotalPago;
       this.pagador = { Dni: this.data.grupo.Integrantes[this.contadorexistente].Dni, Nombre: this.data.grupo.Integrantes[this.contadorexistente].Nombre, AP: this.data.grupo.Integrantes[this.contadorexistente].AP, AM: this.data.grupo.Integrantes[this.contadorexistente].AM }
       for(var i=0; i<this.data.grupo.Integrantes.length;i++){
         if(inte.nro == this.data.grupo.Integrantes[i].nro){
             this.pagosIntegrante.fecha=new Date();
             this.pagosIntegrante.monto=inte.TotalPago;
             this.pagosIntegrante.paymetkey={};
             this.pagosIntegrante.codigo="";
             this.pagosIntegrante.estado="1";
             this.pagosIntegrante.mediopago="1";
             this.pagosIntegrante.pagador= this.pagador;
            this.data.grupo.Integrantes[i].Pagos.push(this.pagosIntegrante);
            break;
         }
       }
       console.log(this.data.grupo.TotalPago);
       console.log(inte)
     }else if(values.currentTarget.checked==false){
       this.data.grupo.TotalPago= this.data.grupo.TotalPago-inte.TotalPago;
       this.pagador= undefined;
       for(var i=0; i<this.data.grupo.Integrantes.length;i++){
        if(inte.nro == this.data.grupo.Integrantes[i].nro){
          for(var j=0; j<this.data.grupo.Integrantes[i].Pagos.length;j++){
            this.data.grupo.Integrantes[i].Pagos.splice(j,1)
          }
        }
       }
       console.log(this.data.grupo.TotalPago)
       console.log(inte)
     }
   }
   /**
    * mostrar integrantes
    *
    */
   mostrarintegrantes(integrante){
     if(this.data.paraver<integrante.nro || integrante._id==undefined){
       return true;
     }else{
       return false;
     }
   }

   /**
    * 
    * @param mosstrar primer y segundo panel de datos
    */
    

   /**
    * crear cliente
    */
   crearCliente(integrante) {
    this.cliente = this.inicializarcliente();
    this.cliente.tipo = 0;
    this.cliente.Nombre = integrante.Nombre;
    this.cliente.AP = integrante.AP;
    this.cliente.AM = integrante.AM;
    this.cliente.TipoDocumento = integrante.TipoDocumento;
    this.cliente.Dni = integrante.Dni;
    this.cliente.Edad = integrante.Edad;
    this.cliente.Sexo = integrante.Sexo;
    this.cliente.Nacionalidad = integrante.Nacionalidad;
    this.cliente.Correo = integrante.Correo;
    this.cliente.Celular = integrante.Celular;
    console.log(this.cliente)
    this.clienteservice.createclient(this.cliente).subscribe(res=>{
      console.log(res);
    });
}

/**
 * crear usuario
 */
crearUsuario = function(datos) {
  this.user = this.inicializarusuario();
  this.user.email = datos.Correo;
  this.user.password = this.userservice.randomPassword(11);
  this.user.nombres = datos.Nombre;
  this.user.apellidos = datos.AP + " " + datos.AM;
  this.user.tipo = "cliente";
  this.user.celular = datos.Celular;
  console.log(this.user)
  this.userservice.authregister(this.user).subscribe(res=>{
    console.log(res)
  })
}
/**
 * creando estructura de pago
 */
crearPaymet(paquete, grupo) {
  console.log()
  this.paymett = {};
  this.paymett = {
      paquete: paquete.Nombre,
      grupo: grupo.Nombre,
      montopagar: grupo.TotalPago,
      descripcion: "Tour completamente asegurado por Turism"
  }
  console.log(this.paymett)
}

/**
 * creando url y redireccionando
 */
sendpay(payment,grupo){
 this.pagoservice.generarurl(payment).subscribe(res=>{
   console.log(res);
   console.log(grupo.Integrantes)
   console.log(this.pagador);
   for(var i=0;i< grupo.Integrantes.length;i++){
     console.log(i);
     console.log(grupo.Integrantes[i].Pagos);
     for(var j=0; j<grupo.Integrantes[i].Pagos.length;j++){
       console.log(j)
       console.log(grupo.Integrantes[i].Pagos[j].pagador)
       if(this.pagador==grupo.Integrantes[i].Pagos[j].pagador){
         grupo.Integrantes[i].Pagos[j].codigo=res.idpago;
       }
     }
   }
   this.gruposervice.updateCodigo(grupo).subscribe(data=>{
     console.log(data)
   })
   this.guardarclius();
   this.document.location.href= res.urlpago;
 })
}
/**
 * modulo de actualizazion del grupo
 */
ActualizarGrupo(){
  console.log(this.data.grupo);
  console.log(this.data.tipo)
  if(this.data.tipo=='upd'){
    this.gruposervice.updateCodigo(this.data.grupo).subscribe(res=>{
      console.log(res);
      this.crearPaymet(this.data.paquete,this.data.grupo);
      this.sendpay(this.paymett,this.data.grupo);
      this.showNotification('bottom','center','gracias por crear el grupo!')
      this.showNotification('bottom','center','Espere un momento porfavor estamos procesando')
      //this.guardarclius();
    })
  } else if(this.data.tipo=='cr'){
    this.data.grupo.IdCreador=this.Integrantes[0].Dni;
    this.data.grupo.Creador=this.Integrantes[0].Nombre + ' ' + this.Integrantes[0].AP + ' ' + this.Integrantes[0].AM;
    this.gruposervice.createGrupo(this.data.grupo).subscribe(res=>{
      console.log(res);
      if(res._id!=undefined){
        this.crearPaymet(this.data.paquete,res);
        this.sendpay(this.paymett,res);
        this.showNotification('bottom','center','gracias por agregarte al grupo!')
        this.showNotification('bottom','center','Espere un momento porfavor estamos procesando')
      }
    })
  }
}

/**
 * guardar la informacion de clientes y usuarios
 * 
 */
  guardarclius(){
    console.log(this.data.grupo.Integrantes);
    for(var i=0; i<this.data.grupo.Integrantes.length;i++){
      this.crearCliente(this.data.grupo.Integrantes[i]);
      this.crearUsuario(this.data.grupo.Integrantes[i]);
    }
  }


  /**
   * mostrar notificacion
   */
  showNotification(from: any, align: any, messaje:any) {
    const type = ['success'];

    const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
        icon: 'notifications',
        message: messaje
    }, {
        type: type[color],
        timer: 2000,
        placement: {
            from: from,
            align: align
        }
    });
}

  /**
   * gestionar las fechas
   */

   restardiasFecha = function(fecha, dias) {
    var fechaa = fecha.setDate(fecha.getDate() - dias);
    return fechaa;
    }
   sumardiasFecha = function(fecha, dias) {
    var fechaa = fecha.setDate(fecha.getDate() + dias);
    return fechaa;
    }

    gestionarfechas(){

    }


}
