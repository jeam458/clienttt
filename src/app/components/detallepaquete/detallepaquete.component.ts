import { UbicacionGps, UbicacionSchema } from './../../services/tours.service';
import { Component, OnInit , ViewChild,AfterViewInit} from '@angular/core';
import { ToursService, paqueteSchema} from '../../services/tours.service';
import { ActivatedRoute, Router } from "@angular/router";
import { GruposService, datosConsulta, IntegrantesSchema, grupoSchema} from '../../services/grupos.service';
import { TiposService , tipoSchema} from '../../services/tipos.service'
import { RecomendacionesService, recomendacion,recomendacionesext} from '../../services/recomendaciones.service';
import { FormBuilder, FormGroup,Validator,Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModalComponent} from '../modal/modal.component';
import { TipogrupoComponent } from '../tipogrupo/tipogrupo.component';
import FroalaEditor from 'froala-editor';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { NgxCarousel } from 'ngx-carousel';

declare var $:any;

@Component({
  selector: 'app-detallepaquete',
  templateUrl: './detallepaquete.component.html',
  styleUrls: ['./detallepaquete.component.css']
})
export class DetallepaqueteComponent implements OnInit {

  //cofnfigurar editor
  editorConfig={
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "0",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["fontName", "fontSize", "color"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink", "image", "video"]
    ]
}

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
 boolcreargrupo:boolean;
 cantidadIntegrantes=1;
 form1:FormGroup;
 snapshotParam:any;
 imageToShow:any;
 isLoading=false;
 ubicaciongps:UbicacionGps;
 paquete:paqueteSchema;
 recomendacionObj:recomendacion;
 pasajeros:any;
 integrante:IntegrantesSchema;
 Integrantes:Array<IntegrantesSchema>=[];
 grupos: any;
 grupo:grupoSchema;
 location:any;
 tipostour:Array<tipoSchema>=[];
 datosconsulta:datosConsulta;
 paraver:any;
 datosmodal:any;
 mostrarCrearGrupo:boolean=false;
 consultaForm(){
   this.form1 = this.formBuilder.group({
     pasajeros:[1, Validators.compose([
      Validators.required,
      Validators.min(1)
    ])],
     fecha:['', Validators.compose([
       Validators.required
     ])]
   })
 }

 mySlideOptions={items: 1, dots: true, nav: true};
 
 title = 'ngSlick';
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

  slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1,
    "nextArrow":"<div class='nav-btn prev-slide'></div>",
    "prevArrow":"<div class='nav-btn prev-slide'></div>",
    "dots":true,
    "infinite": false
  };
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/550x360/777777"})
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  slickInit(e) {
    console.log('slick initialized');
  }
  breakpoint(e) {
    console.log('breakpoint');
  }
  afterChange(e) {
    console.log('afterChange');
  }
  beforeChange(e) {
    console.log('beforeChange');
  }

customOptions1: any = {
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  margin:6,
  navSpeed: 700,
  autoplaySpeed:700,
  autoplayTimeout:800,
  center: true,
  loop:true,
  nav: false,
  navText: ["<div class='left'><a class='movePrevCarousel btn-floating green middle-indicator-text waves-effect waves-light content-indicator'><i class='material-icons left  middle-indicator-text'>chevron_left</i></a></div>", "<div class='right'><a  class=' moveNextCarousel btn-floating green  middle-indicator-text waves-effect waves-light content-indicator'><i class='material-icons right middle-indicator-text'>chevron_right</i></a></div>"],
  responsive: {
  400:{
      items:1,
  },
  600:{
      items:3
  },
  1000:{
      items:5,
      nav:false
  }
  }
}
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


public show: boolean = true;

  public slides1 = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  public type: string = 'component';

  public disabled: boolean = false;

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };
  public config1: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    breakpoints: {
      // when window width is <= 320px
      320: {
        slidesPerView: 1,
        //spaceBetween: 10
      },
      // when window width is <= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is <= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    },
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;

  estado_grupo = {
    availableOptions: [
        { id: 0, name: 'activo' },
        { id: 1, name: 'suspendido' },
        { id: 2, name: 'cancelado' },
        { id: 3, name: 'Cerrado' }
    ],
    selectedOption: { id: 0, name: 'activo' }
    };

   tipo_grupo = {
    availableOptions: [
        { id: 0, name: 'Público' },
        { id: 1, name: 'Privado' }
    ],
    selectedOption: { id: 0, name: 'Público' }
   }


  constructor(private formBuilder:FormBuilder,private tours:ToursService,private gruposService:GruposService,private readonly route: ActivatedRoute,public dialog: MatDialog, private tiposervice:TiposService, private recomendacionesservice:RecomendacionesService,private readonly router:Router) {
    this.consultaForm();
   }
  
  ngOnInit() {
    this.obtenerubicacion();
    this.boolcreargrupo=false;
  
    this.paquete= this.inicializarPaquete();
    this.integrante = this.inicializarintegrate();
    this.recomendacionObj= this.inicializarRecomen();
    this.ListarTiposTour();
    this.snapshotParam= this.route.snapshot.paramMap.get("id");
    console.log(this.snapshotParam)
    this.getdetalle(this.snapshotParam);
    console.log(this.integrante)

    FroalaEditor.DefineIcon('alert', { SVG_KEY: 'help' });
    FroalaEditor.RegisterCommand('alert', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,

      callback: function () {
        alert('Hello!');
      }
    });
  }


  gotodetalle(id):void{
    this.router.navigate(["relacionados",id]);
  }

  obtenerubicacion(){
    this.gruposService.getPosition().then(pos=>{
      this.location=pos;
    })
  }

  centerCarouselControls() {
    var carouselImage = $('.carousel-card > img');
    var carouselControls = $('.owl-nav > div');
    var carouselHeight = carouselImage.outerHeight();
    var controlHeight = carouselControls.outerHeight();
    var controlMargin = (carouselHeight - controlHeight) / 2;
    carouselControls.css('margin-top', controlMargin);
  }
  public titleOptions: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    toolbarInline: true,
    events: {
      "initialized": () => {
        console.log('initialized');
      },
      "contentChanged": () => {
        console.log("content changed");
      }
    }
  }
  loadconsultaform(){
    let datosconsulta:datosConsulta;
    return datosconsulta={
      Paquete:'',
      startDate:new Date(),
      endDate:new Date(),
      pasajeros:0
    }
  }
  convertirStringFecha(cadena){
    var fecha = cadena.toString();
    var fecha1 = new Date(fecha);
    return fecha1;
  }
  submitconsulta(){
    console.log(this.form1.get('pasajeros').value);
    console.log(this.form1.get('fecha').value);
    this.realizarConsulta();
  }
  /**
   * 
   * @param bool msotrar button crear grupo
   */
  estadocreargrupo(nro){
    if(2<=nro){
      this.boolcreargrupo=true;
    }else {
      this.boolcreargrupo=false;
    }
  }
/**abriendo dialog */
openDialog(grupo):void{
  var tamaño='250px';
  console.log(this.pasajeros)
  if(this.pasajeros!=undefined){
      tamaño='800px';
      const dialogRef= this.dialog.open(ModalComponent,{
        width:tamaño,
        data:{grupo: grupo, pasajeros: this.pasajeros, paquete:this.paquete,paraver:this.paraver,tipo:'upd'}
      });
      dialogRef.afterClosed().subscribe(result=>{
        console.log(result)
        this.cancelarproceso(grupo);
        console.log(grupo);
        //this.datosmodal= result;
      })
  }else {
    this.showNotification('bottom','center','ingresa una cantidad de pasajeros, porfavor!')
  }
  
}

/**abriendo dialgo tipo grupo */

openTipoGrupo():void{
  this.grupo = this.inicializargrupo();
  delete this.grupo._id;
  this.gruposService.nroGrupos().subscribe(res=>{
      const nrogrupos= parseInt(res.nro)+1;
      this.grupo.Nombre=this.paquete.Nombre+' '+nrogrupos;
      const dialogRef= this.dialog.open(TipogrupoComponent,{
        width:'250px',
        data:{grupo:this.grupo,pasajeros:this.pasajeros,paquete:this.paquete,paraver:this.paraver,tipo:'cr'}
      })
      dialogRef.afterClosed().subscribe(result=>{
        console.log(result);
      })
  });
}

/**
 * cancelando proceso eliminando elementos adicionales
 */
cancelarproceso(grupo){
  //console.log("elementos a borrar: ",grupo);
  //grupo.Integrantes.splice(grupo.Integrantes.length-1,1);
  for(var index=1;index<=this.pasajeros;index++){
     grupo.Integrantes.splice(grupo.Integrantes.length-1,1);
  }
}

/**consultar grupos por fecha */
  realizarConsulta(){
    this.datosconsulta= this.loadconsultaform();
    this.datosconsulta.pasajeros=this.form1.get('pasajeros').value;
    this.datosconsulta.endDate= this.form1.get('fecha').value;
    var init = new Date(this.datosconsulta.endDate);
    var fin= new Date(this.datosconsulta.endDate);
    var mes = fin.getMonth()+1;
    init.setMonth(mes-2);
    fin.setMonth(mes);
    fin.setHours(18);
    fin.setMinutes(59);
    this.datosconsulta.startDate=init;
    this.datosconsulta.endDate=fin;
    var fechas ={startDate:this.datosconsulta.startDate, endDate: this.datosconsulta.endDate,Paquete: this.paquete._id}
    console.log(fechas)
    this.gruposService.getgruposfechas(fechas).subscribe(data=>{
      this.grupos=data;
      console.log(this.grupos);
      if(this.grupos.length==0){
        this.showNotification('bottom','center','no tenemos grupos en estas fechas, intenta con otra fecha porfavor')
      }else{
        this.showNotification('bottom','center','tenemos '+this.grupos.length+' grupos en estas fechas, elige el mejor!')
      }
    })
  }
/**consultar detalle del paquete */
  getdetalle(id){
    this.tours.getpaquete(id).subscribe(data=>{
      console.log(data)
      this.paquete= data;
      this.ListarPorFechasInit(this.paquete._id);
      this.getrecomendaciones(this.paquete.Recomendaciones);
    })
  }
  getrecomendaciones(id){
    this.recomendacionesservice.getRecomendacion(id).subscribe(data=>{
      this.recomendacionObj=data[0];
      console.log(this.recomendacionObj);
    })
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
/**lista inicial de grupos */
  ListarPorFechasInit(paquete){
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
    console.log(paquete);
    var fechas={startDate:init.toJSON(), endDate: fin1.toJSON(),Paquete: paquete};
    this.gruposService.getgruposfechas(fechas).subscribe(data=>{
      this.grupos=data;
      console.log(this.grupos);
      this.showNotification('bottom','center','Bienvenido a '+this.paquete.Nombre +' Tour busca tu grupo porfavor!');
      if(this.grupos.length==0){
        this.showNotification('bottom','center','no tenemos grupos en estas fechas, intenta con otra fecha porfavor')
      }else{
        this.showNotification('bottom','center','tenemos '+this.grupos.length+' grupos en estas fecha, elige el mejor!')
      }
    })
  }
  /**validar la cantidad de pasajeros */
  VNumbPasajero(nro){
    if(2<=nro){
     this.mostrarCrearGrupo=true;
    }else if(nro<2){
      this.mostrarCrearGrupo=false;
    }
  }
  /**
   * calculo de pago por factor
   */
  porfactpago(grupo){
    console.log(grupo)
    var valormoment1;
    var indice= grupo.FactorDescuento.indexOf('%');
    if(indice!=-1){
      var facto = grupo.FactorDescuento;
      facto.slice(indice,1)
      var factor = parseFloat(facto);
      var varporcentaje1= (this.pasajeros*factor * parseFloat(this.paquete.Costo.toString()))/100;
      valormoment1= parseFloat(this.paquete.Costo.toString())- varporcentaje1;
      console.log(valormoment1)
      return valormoment1;
      
    }else if(indice==-1){
      valormoment1= parseFloat(this.paquete.Costo.toString())-(parseFloat(this.paquete.FactorDescuento.toString())*this.pasajeros)
      console.log(valormoment1)
      return valormoment1;
      
    }
  }
  porfactpago1(grupo){
    //console.log(grupo)
    var valormoment1;
    var indice= grupo.FactorDescuento.indexOf('%');
    if(indice!=-1){
      var facto = grupo.FactorDescuento;
      facto.slice(indice,1)
      var factor = parseFloat(facto);
      var varporcentaje1= (grupo.Integrantes.length*factor * parseFloat(this.paquete.Costo.toString()))/100;
      valormoment1= parseFloat(this.paquete.Costo.toString())- varporcentaje1;
      //console.log(valormoment1)
      return valormoment1;
      
    }else if(indice==-1){
      valormoment1= parseFloat(this.paquete.Costo.toString())-(parseFloat(this.paquete.FactorDescuento.toString())*grupo.Integrantes.length)
      //console.log(valormoment1)
      return valormoment1;
      
    }
  }
  /**
   * inicializamos el paquete
   */
  inicializarubic(){
    let ubicacionschema:UbicacionSchema;
    return ubicacionschema={
      text:'',
      id:0
    }
  }
  inicializargps(){
    let ubicaciongps: UbicacionGps;
    return ubicaciongps={
      lat:0,
      lng:0
    }
  }

  inicializargrupo(){
    //console.log(this.gruposService.nroGrupos());
    
    let grupo: grupoSchema;
    return grupo={
      Creador:'',
      Estado:0,
      FactorDescuento:'',
      FechaInicio:new Date(),
      FechaInicioTour:new Date(),
      FechaMargen:new Date(),
      IdCreador:'',
      Integrantes:[],
      MaxIntegrantes:this.paquete.NroPasajeros,
      Nombre:this.paquete.Nombre,
      Paquete:this.paquete._id,
      PorPagar:0,
      TipoGrupo:0,
      TotalPago:0,
      Ubicacion:'',
      UbicacionGps:this.location,
      _id:'',
      fecha: new Date,
      imagen:'',
      img:''
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
      Ubicacion:[this.inicializarubic()],
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
  
  inicializarlistarecom(){
    let listarecom:recomendacionesext;
    listarecom={
      descripcion:'',
      importancia:'',
      nombre:''
    }
  }

  inicializarRecomen(){
    let recomendacion:recomendacion;
    return recomendacion={
      Descripcion:'',
      Recomendaciones:[],
      Titulo:'',
      _id:'',
      fecha: new Date()
    }
  }

  

  addIntegrantes(grupo){
    console.log(grupo.Integrantes.length);
    console.log(this.pasajeros)
    this.paraver= grupo.Integrantes.length;
    if(this.pasajeros!=undefined){
      for(var index=1; index<= this.pasajeros; index++){
        if(grupo.Integrantes!=0 || grupo.Integrantes!=undefined){
          console.log(index);
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
    }
    this.Integrantes=[];
      this.openDialog(grupo);
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


  /**
   * constroles del carrousel 
   */

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleDirection(): void {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView(): void {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  public toggleOverlayControls(): void {
    if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
    }

    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.setIndex(0);
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.setIndex(0);
    }
  }

  public toggleKeyboardControl(): void {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl(): void {
    this.config.mousewheel = !this.config.mousewheel;
  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

}
