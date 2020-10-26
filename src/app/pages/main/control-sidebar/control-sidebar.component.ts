import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-sidebar',
  templateUrl: './control-sidebar.component.html',
  styleUrls: ['./control-sidebar.component.css']
})
export class ControlSidebarComponent implements OnInit {
  
  @Output() noNavbar: EventEmitter<any> = new EventEmitter<any>();
  @Output() smallText: EventEmitter<any> = new EventEmitter<any>();
  @Output() sideNavStyle: EventEmitter<any> = new EventEmitter<any>();

  @Output() navVarientClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() accentColorClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() sidebarVarientClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() brandlogoVarientClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() reset: EventEmitter<any> = new EventEmitter<any>();
 


  constructor() { }
  

  ngOnInit(): void {
  }
  onNoNavbar(event){
    this.noNavbar.emit(event.srcElement.checked);
  }
  onSmallText(event){
    this.smallText.emit(event.srcElement.checked);
  }
  onSideNavStyle(event,navstyle){
    var boolCheck= event.srcElement.checked;
    this.sideNavStyle.emit({boolCheck,navstyle});
  }

  onClick(bgcolor,txtcolor){
    this.navVarientClick.emit({bgcolor,txtcolor});
  }

  onAccentColorClick(linkcolor){
    this.accentColorClick.emit(linkcolor);
  }

  onSidebarVarientClick(sidebarcolor){
    this.sidebarVarientClick.emit(sidebarcolor);
  }

  onBrandlogoVarientClick(brandlogocolor)
  {
    this.brandlogoVarientClick.emit(brandlogocolor);
  }
  onReset()
  {
    this.reset.emit();
  }


}
