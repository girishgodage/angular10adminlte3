import { Component, OnInit,Renderer2, ViewChild  } from '@angular/core';
import { stringify } from 'querystring';
import { AppSettings } from 'src/app/shared/appsettings';
import { AppSettingsService } from 'src/app/shared/appsettings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public sidebarMenuOpened = true;
  public sidebarControlOpened = false;
  defaultBgColor:string;
  defaultTxtColor:string;
  defaultHyperlinkColor:string;
  defaultSidebarColor:string;
  defaultBrandlogoColor:string
  defaultNavBottomBorder:string
  defaultNavStyle:string
  defaultText:string
  noNavbarValue:string
  textValue:string

  settings: AppSettings;

  @ViewChild('contentWrapper', { static: false }) contentWrapper;

  constructor(private renderer: Renderer2,
              private appSettingsService: AppSettingsService) {

               }

  ngOnInit(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
      this.getNavDefaultColor();

      this.renderer.addClass(
        document.querySelector('app-root'),
        this.defaultHyperlinkColor
      );

      this.renderer.addClass(
        document.querySelector('app-root'),
        this.defaultText
      );

      this.renderer.addClass(
        document.querySelector('.nav-pills'),
        this.defaultNavStyle
    ); 
  }

  getNavDefaultColor(){
    this.appSettingsService.getSettings()
      .subscribe(settings => this.settings = settings,
      () => null,
      () => {
        this.defaultBgColor = this.settings.defaultNavbgColor;
        this.defaultTxtColor = this.settings.defaultNavtxtColor;
        this.defaultHyperlinkColor=this.settings.defaultLinkColor;
        this.defaultSidebarColor=this.settings.defaultSidebarColor;
        this.defaultBrandlogoColor = this.settings.defaultBrandlogoColor;
        this.defaultNavBottomBorder= this.settings.defaultNavBottomBorder;
        this.defaultText = this.settings.defaultText;
        this.defaultNavStyle = this.settings.defaultNavStyle;
      });
  }

  mainSidebarHeight(height) {
    // this.renderer.setStyle(
    //   this.contentWrapper.nativeElement,
    //   'min-height',
    //   height - 114 + 'px'
    // );
  }

  toggleControlSidebar(){
    if (this.sidebarControlOpened) {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'control-sidebar-slide-open'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'control-sidebar-collapse'
      );
      this.sidebarControlOpened = false;
    } else {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'control-sidebar-collapse'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'control-sidebar-slide-open'
      );
      this.sidebarControlOpened = true;
    }    
  }
  noNavbar(value){    
    this.renderer.removeClass(
      document.querySelector('.navbar'),
      this.defaultNavBottomBorder
    );    
    if(value){
      this.noNavbarValue="border-bottom-0";
    }else{
      this.noNavbarValue="border-bottom-1";
    }   
    this.renderer.addClass(
        document.querySelector('.navbar'),
        this.noNavbarValue
    ); 
    
    this.saveNoNavBarSetting(this.noNavbarValue);
  }

  saveNoNavBarSetting(data)
  {
    this.settings.defaultNavBottomBorder = data;
    this.appSettingsService.saveSettings(this.settings);
  }

  smallText(value){    
    this.renderer.removeClass(
      document.querySelector('app-root'),
      this.defaultText
    );    
    if(value){
      this.textValue="text-sm";
    }else{
      this.textValue="text-mm";
    }   
    this.renderer.addClass(
        document.querySelector('app-root'),
        this.textValue
    ); 
    
    this.saveSmallTextSetting(this.textValue);
  }

  saveSmallTextSetting(data)
  {
    this.settings.defaultText = data;
    this.appSettingsService.saveSettings(this.settings);
  }

  sideNavStyle(data){   
    var navbarstyle; 


    this.renderer.removeClass(
      document.querySelector('.nav-pills'),
      this.defaultNavStyle
    );  
    
    navbarstyle= data.navstyle;
    if(data.boolCheck){

      this.renderer.addClass(
        document.querySelector('.nav-pills'),
        data.navstyle
    );       
    }else{
        this.renderer.removeClass(
          document.querySelector('.nav-pills'),
          data.navstyle
      ); 
    }   
       
    this.saveNavStyleSetting(navbarstyle);
  }

  saveNavStyleSetting(navstyle)
  {
    this.settings.defaultNavStyle = navstyle;
    this.appSettingsService.saveSettings(this.settings);
  }

  brandlogoVarientClick(brandlogocolor){
    if(this.defaultBrandlogoColor != "")
    {
      this.renderer.removeClass(
        document.querySelector('.brand-link'),
        this.defaultBrandlogoColor
      );
    }    

    this.renderer.addClass(
      document.querySelector('.brand-link'),
      brandlogocolor
    );
      this.saveBrandlogoVarientSetting(brandlogocolor);
  }

  saveBrandlogoVarientSetting(brandlogocolor)
  {
    this.settings.defaultBrandlogoColor = brandlogocolor;
    this.appSettingsService.saveSettings(this.settings);
  }

  reset(){
    this.appSettingsService.deleteSettings();
  }

  sidebarVarientClick(sidebarcolor){
    this.renderer.removeClass(
      document.querySelector('.main-sidebar'),
      this.defaultSidebarColor
    );

    this.renderer.addClass(
      document.querySelector('.main-sidebar'),
      sidebarcolor
    );
      this.saveSidebarVarientSetting(sidebarcolor);
  }

  saveSidebarVarientSetting(sidebarcolor)
  {
    this.settings.defaultSidebarColor = sidebarcolor;
    this.appSettingsService.saveSettings(this.settings);
  }

  accentColorClick(hypetlinkColor){

    this.renderer.removeClass(
      document.querySelector('app-root'),
      this.defaultHyperlinkColor
    );

    this.renderer.addClass(
      document.querySelector('app-root'),
      hypetlinkColor
    );
      this.saveAccentVarientSetting(hypetlinkColor);
  }

  saveAccentVarientSetting(linkColor)
  {
    this.settings.defaultLinkColor = linkColor;
    this.appSettingsService.saveSettings(this.settings);
  }

  navVarientClick(navcolor){
    this.getNavDefaultColor();
    
    this.renderer.removeClass(
      document.querySelector('.navbar'),
      this.defaultBgColor
    );
    this.renderer.removeClass(
      document.querySelector('.navbar'),
      this.defaultTxtColor
    );
   
    this.renderer.addClass(
      document.querySelector('.navbar'),
      navcolor.bgcolor
    );
    this.renderer.addClass(
      document.querySelector('.navbar'),
      navcolor.txtcolor
    ); 
    this.saveNavVarientSettings(navcolor);  
  }

  saveNavVarientSettings(navcolor): void {
    
    this.settings.defaultNavbgColor = navcolor.bgcolor;
    this.settings.defaultNavtxtColor = navcolor.txtcolor;
    this.appSettingsService.saveSettings(this.settings);
  }

  toggleMenuSidebar() {
    if (this.sidebarMenuOpened) {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.sidebarMenuOpened = false;
    } else {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.sidebarMenuOpened = true;
    }
  }

}
