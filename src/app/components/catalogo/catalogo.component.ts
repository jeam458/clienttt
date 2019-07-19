import { Component, OnInit } from '@angular/core';
import { TiposService , tipoSchema} from '../../services/tipos.service';
import { ToursService , Home, paqueteSchema} from '../../services/tours.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";
import { NgxCarousel } from 'ngx-carousel';
declare var $:any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  tipostour:Array<tipoSchema>=[];
  paquetes:Array<paqueteSchema>=[];
  isImageLoading: boolean;
  imageToShow: any;
  snapshotParam:any;

  //varialbes para el carousel
 carouselBannerItems: Array<any> = []
 carouselBanner:NgxCarousel = {
  grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
  slide: 4,
  speed: 500,
  interval: 5000,
  point: {
    visible: true,
    pointStyles: `
      .ngxcarouselPoint {
        list-style-type: none;
        text-align: center;
        padding: 12px;
        margin: 0;
        white-space: nowrap;
        overflow: auto;
        position: absolute;
        width: 100%;
        bottom: 20px;
        left: 0;
        box-sizing: border-box;
      }
      .ngxcarouselPoint li {
        display: inline-block;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.55);
        padding: 5px;
        margin: 0 3px;
        transition: .4s ease all;
      }
      .ngxcarouselPoint li.active {
          background: white;
          width: 10px;
      }
    `
  },
  load: 2,
  custom: 'banner',
  touch: true,
  loop: false,
  easing: 'cubic-bezier(0, 0, 0.2, 1)'
};

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

  constructor(private tiposervice:TiposService,private readonly route: ActivatedRoute,private tours:ToursService,private satinizer:DomSanitizer,private readonly router:Router) { }

  ngOnInit() {
    this.snapshotParam= this.route.snapshot.paramMap.get("id");
    this.ListarTiposTour();
    this.listasPaquetes(this.snapshotParam);
  }

  gotodetalle(id):void{
    this.router.navigate(["detallepaquete",id]);
  }
  /**
   * 
   * @param paquete listar los tipos de tours 
   */
  ListarTiposTour(){
    this.tiposervice.getTipos().subscribe(data=>{
      this.tipostour=data;
      console.log(this.tipostour);
    })
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


  listasPaquetes(id){
    this.tours.getpaquetesportipo(id).subscribe(data=>{
      this.paquetes=data;  
      console.log(this.paquetes)
      for(var index=0; index<this.paquetes.length;index++){
        this.getimagen(this.paquetes[index].imagen)
      }
    })
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
