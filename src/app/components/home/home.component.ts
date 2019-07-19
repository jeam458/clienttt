import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { AuthService} from '../../services/auth.service';

import { ToursService , Home, paqueteSchema} from '../../services/tours.service';
import { GruposService, datosConsulta, IntegrantesSchema, grupoSchema} from '../../services/grupos.service';
import { switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";
import M from 'materialize-css';
import { NgxCarousel } from 'ngx-carousel';
declare var $:any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  imageToShow: any;
  imageToShow1: any;
  isImageLoading: boolean;
  isLoading = false;
  paquetes:Array<paqueteSchema>=[];
  datoshome: any={};
  resultados:Array<paqueteSchema>=[];
  buscadorForm:FormGroup;
  slides = [
    {img: "../../../assets/img/lock.jpeg"},
    {img: "../../../assets/img/lock.jpeg"},
    {img: "../../../assets/img/lock.jpeg"},
    {img: "../../../assets/img/lock.jpeg"},
    {img: "../../../assets/img/lock.jpeg"},
    {img: "../../../assets/img/lock.jpeg"},
    {img: "../../../assets/img/lock.jpeg"},
    {img: "../../../assets/img/lock.jpeg"}
  ];
  grupos: any;

  public carouselTileTwoItems: Array<any> = [];
public carouselTileTwo: NgxCarousel={
  grid: { xs: 1, sm: 3, md: 4, lg: 6, all: 230 },
  speed: 600,
  interval: 3000,
  point: {
    visible: true
  },
  load: 2,
  touch: true
};

customOptions2: any = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  margin:1,
  autoplay:true,
  center: true,
  autoplayTimeout:4500,
  navText: ["<div class='prev-slide'></div>", "<div class='next-slide'></div>"],
  autoplayHoverPause:true,
  autoHeight: true,
  autoHeightClass: 'owl-height',
  responsive: {
    0: {
      items: 1
    }
  }
}

  datoslimpioshome(){
    this.datoshome.Correo = '';
    this.datoshome.Descripcion ='';
    this.datoshome.Facebook ='';
    this.datoshome.Google ='';
    this.datoshome.Instagram ='';
    this.datoshome.Nombre ='';
    this.datoshome.Twitter ='';
    this.datoshome.galeria =[];
  }
  constructor(public authService:AuthService, private tours:ToursService,private gruposService:GruposService, private fb:FormBuilder, private satinizer:DomSanitizer, private readonly router:Router) {
     
  }

  ngOnInit() {
    this.buscadorForm =this.fb.group({
      buscadorInput:null
    })
    this.listarComponentesHome();
    this.listasPaquetes();
    this.buscadorForm.get('buscadorInput')
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.tours.getBuscador(value)
      .pipe(
        finalize(() => this.isLoading = false),
        ))
    )
    .subscribe(datos => {
      this.resultados = datos;
      for(var index=0; index<this.resultados.length;index++){
        this.getimagen1(this.resultados[index].imagen)
      }
    });
    $(document).ready(function(){
      $('.carousel').carousel(
      {
        dist: 0,
        padding: 0,
        fullWidth: true,
        indicators: true,
        duration: 100,
      }
      );
    });

    this.ListarPorFechasInit();
  }

  ngAfterViewInit(){
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: false
   });


   // move next carousel
   $('.moveNextCarousel').click(function(e){
      e.preventDefault();
      e.stopPropagation();
      $('.carousel').carousel('next');
   });

   // move prev carousel
   $('.movePrevCarousel').click(function(e){
      e.preventDefault();
      e.stopPropagation();
      $('.carousel').carousel('prev');
   });
    this.autoplay()   
}
autoplay() {
  $('.carousel').carousel('next');
  setTimeout(this.autoplay, 4500);
  }

  displayFn(datos) {
    if (datos) { return datos; }
  }

 

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
   }
  getimagen(id){
    this.isImageLoading=true;
    this.tours.getDescargarImagen(id).subscribe(data=>{
      //this.createImageFromBlob(data);
      console.log(data)
      var unsafeImageUrl = URL.createObjectURL(data);
      this.imageToShow = this.satinizer.bypassSecurityTrustUrl(unsafeImageUrl);
      for(var index=0; index< this.paquetes.length; index++){
        if(id===this.paquetes[index].imagen){
          this.paquetes[index].img=this.imageToShow;
          break;
        }
      }
      this.isImageLoading=false;
    },error => {
      this.isImageLoading=true;
      console.log(error);
    })
  }

  getimagen1(id){
    this.isImageLoading=true;
    this.tours.getDescargarImagen(id).subscribe(data=>{
      //this.createImageFromBlob(data);
      console.log(data)
      var unsafeImageUrl = URL.createObjectURL(data);
      this.imageToShow1 = this.satinizer.bypassSecurityTrustUrl(unsafeImageUrl);
      for(var index=0; index< this.resultados.length; index++){
        if(id===this.resultados[index].imagen){
          this.resultados[index].img=this.imageToShow1;
          break;
        }
      }
      this.isImageLoading=false;
    },error => {
      this.isImageLoading=true;
      console.log(error);
    })
  }

  gotodetalle(id):void{
    this.router.navigate(["detallepaquete",id]);
  }

  listarComponentesHome(){
    this.tours.getHomes().subscribe(data=>{
      console.log(data[0]);
      this.datoshome = data[0];
    })
  }
  listasPaquetes(){
    this.tours.getpaquetes().subscribe(data=>{
      this.paquetes=data;  
      console.log(this.paquetes)
      for(var index=0; index<this.paquetes.length;index++){
        this.getimagen(this.paquetes[index].imagen)
      }
    })
  }
  buscadorPaquetes(cadena){
    this.tours.getBuscador(cadena).subscribe(data=>{
      console.log(data);
    })
  }


  /**lista inicial de grupos */
  ListarPorFechasInit(){
    var init = new Date(Date.now());
    init.setHours(0);
    init.setMinutes(0);
    var fin1= new Date(Date.now());
    var mes = fin1.getMonth()+1;
    //init.setMonth(mes-2);
    fin1.setMonth(mes);
    fin1.setHours(18);
    fin1.setMinutes(59);
    console.log(init, 'hasta: ',fin1);
    var fechas={startDate:init.toJSON(), endDate: fin1.toJSON()};
    this.gruposService.getgruposfechasGeneral(fechas).subscribe(data=>{
      this.grupos=data;
      console.log(this.grupos);
      this.showNotification('bottom','center','Bienvenido, busca tu grupo porfavor!');
      if(this.grupos.length==0){
        this.showNotification('bottom','center','no tenemos grupos en estas fechas, intenta con otra fecha porfavor')
      }else{
        this.showNotification('bottom','center','tenemos '+this.grupos.length+' grupos en estas fecha, elige el mejor!')
      }
    })
  }

  porfactpago1(grupo){
    //console.log(grupo)
    var valormoment1;
    var indice= grupo.FactorDescuento.indexOf('%');
    if(indice!=-1){
      var facto = grupo.FactorDescuento;
      facto.slice(indice,1)
      var factor = parseFloat(facto);
      var varporcentaje1= (grupo.Integrantes.length*factor * parseFloat(grupo.PorPagar.toString()))/100;
      valormoment1= parseFloat(grupo.PorPagar.toString())- varporcentaje1;
      //console.log(valormoment1)
      return valormoment1;
      
    }else if(indice==-1){
      valormoment1= parseFloat(grupo.PorPagar.toString())-(parseFloat(grupo.FactorDescuento.toString())*grupo.Integrantes.length)
      //console.log(valormoment1)
      return valormoment1;
      
    }
  }

  /**
   * notificacion
   */

  showNotification(from: any, align: any, messaje:any) {
    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

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

}
