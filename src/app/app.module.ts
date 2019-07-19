import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/notauth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NguCarouselModule } from '@ngu/carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FlickityModule } from 'ngx-flickity';

import { NgxCarouselModule } from 'ngx-carousel';
import { InlineSVGModule } from 'ng-inline-svg';

import { OwlModule } from 'ngx-owl-carousel';
 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetallepaqueteComponent } from './components/detallepaquete/detallepaquete.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,} from '@angular/material';
import { ModalComponent } from './components/modal/modal.component';
import { TipogrupoComponent } from './components/tipogrupo/tipogrupo.component';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    SidebarComponent,
    DetallepaqueteComponent,
    ModalComponent,
    TipogrupoComponent,
    FooterComponent,
    CatalogoComponent
  ],
  entryComponents: [ModalComponent,TipogrupoComponent],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    NguCarouselModule,
    CarouselModule,
    BrowserAnimationsModule,
    SwiperModule,
    BrowserModule,
    FlickityModule,
    OwlModule,
    NgxCarouselModule,
    InlineSVGModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    SlickCarouselModule
  ],
  providers: [AuthService,AuthGuard,NotAuthGuard,
     {
       provide: SWIPER_CONFIG,
       useValue: DEFAULT_SWIPER_CONFIG
     }
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  
})
export class AppModule { }
