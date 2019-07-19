import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'; 
import { DOCUMENT } from "@angular/common";
import { GruposService, datosConsulta, IntegrantesSchema, grupoSchema} from '../../services/grupos.service';
import { ModalComponent} from '../modal/modal.component';
declare var $;

@Component({
  selector: 'app-tipogrupo',
  templateUrl: './tipogrupo.component.html',
  styleUrls: ['./tipogrupo.component.css']
})
export class TipogrupoComponent implements OnInit {
  integrante:IntegrantesSchema;
  Integrantes:Array<IntegrantesSchema>=[];
  tipo_grupo = {
    availableOptions: [
        { id: 0, name: 'Público' },
        { id: 1, name: 'Privado' }
    ],
    selectedOption: { id: 0, name: 'Público' }
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

  constructor(public dialogRef:MatDialogRef<TipogrupoComponent>, @Inject(MAT_DIALOG_DATA) public data:any, @Inject(DOCUMENT) private document:any, public dialog:MatDialog) { 
    
  }

  onNoClick():void{
    this.dialogRef.close({estado:false});
    //this.data.estado=false;
  }

  ngOnInit() {
    console.log(this.data) 
    this.integrante = this.inicializarintegrate();
  }


    /**mantenimiento de integrantes  de grupo */
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

  addIntegrantes(grupo){
    console.log(grupo.Integrantes.length);
    console.log(this.data.pasajeros)
    //this.paraver= grupo.Integrantes.length;
    if(this.data.pasajeros!=undefined){
      for(var index=1; index<= this.data.pasajeros; index++){
        if(grupo.Integrantes!=0 || grupo.Integrantes!=undefined){
          console.log(index);
          console.log(grupo.Integrantes.length + index);
          //console.log(this.integrante.nro)
          var nro = grupo.Integrantes.length + index;
          console.log(nro)
          this.addIntegrante(nro,grupo)
        }else{
          var nro1 = index;
          this.addIntegrante(nro1,grupo);
        }
      }
      for(var index1=0; index1<this.Integrantes.length; index1++){
        grupo.Integrantes.push(this.Integrantes[index1]);
      }
    }
    //this.Integrantes=[];
      this.openDialog();
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
    this.integrante.Costos = this.data.paquete.Costos;
    this.integrante.DsctoEdad=0;
    delete this.integrante._id;
    console.log(this.integrante)
    this.Integrantes.push(this.integrante);
    this.integrante= this.inicializarintegrate();
    console.log(this.data.grupo.Integrantes);
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
      var varporcentaje1= (this.data.pasajeros*factor * parseFloat(this.data.paquete.Costo.toString()))/100;
      valormoment1= parseFloat(this.data.paquete.Costo.toString())- varporcentaje1;
      return valormoment1;
    }else if(indice==-1){
      valormoment1= parseFloat(this.data.paquete.Costo.toString())-(parseFloat(this.data.paquete.FactorDescuento.toString())*this.data.pasajeros)
      return valormoment1;
    }
  }

  openDialog():void{
    this.onNoClick();
    const dialogRef= this.dialog.open(ModalComponent,{
      width:'800px',
      data:this.data
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }
}
