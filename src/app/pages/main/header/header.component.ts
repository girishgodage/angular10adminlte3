import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { AppSettings } from 'src/app/shared/appsettings';
import { AppSettingsService } from 'src/app/shared/appsettings.service';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleControlSidebar: EventEmitter<any> = new EventEmitter<any>();
 
  defaultBgColor:string;
  defaultTxtColor:string;
  defaultNavBottomBorder:string
  
  public searchForm: FormGroup;
  settings: AppSettings;

  constructor(private appService: AppService,
              private appSettingsService: AppSettingsService) {

     }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });
    this.appSettingsService.getSettings()
      .subscribe(settings => this.settings = settings,
      () => null,
      () => {
        this.defaultBgColor = this.settings.defaultNavbgColor;
        this.defaultTxtColor = this.settings.defaultNavtxtColor;
        this.defaultNavBottomBorder = this.settings.defaultNavBottomBorder;  
      });
  }

  logout() {
    this.appService.logout();
  }

}
