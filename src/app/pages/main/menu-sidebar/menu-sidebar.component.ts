import { Component, OnInit,AfterViewInit, ViewChild, Output, EventEmitter, } from '@angular/core';
import { AppSettings } from 'src/app/shared/appsettings';
import { AppSettingsService } from 'src/app/shared/appsettings.service';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  defaultSidebarColor:string;
  defaultBrandlogoColor:string;
  settings: AppSettings;
  
  constructor(public appService: AppService,
          private appSettingsService: AppSettingsService) {
    
   }

  ngOnInit(): void {
    this.appSettingsService.getSettings()
      .subscribe(settings => this.settings = settings,
      () => null,
      () => {
         this.defaultSidebarColor = this.settings.defaultSidebarColor;
         this.defaultBrandlogoColor =  this.settings.defaultBrandlogoColor;        
      });
      
  }

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }

}
