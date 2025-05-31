import { Component, OnInit, Output, EventEmitter, Input, HostListener, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { UserService } from '../../../user/services/user.service';
import { SessionService } from 'src/app/features/http-services/session.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SearchComponentComponent } from '../../../components/search-component/search-component.component';
import { CountdownService } from 'src/app/features/http-services/countdown.service';
import { NotificationPopupComponent } from '../../../components/notification-popup/notification-popup.component';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onConfirm = new EventEmitter();
  isSidebarOpen: boolean = true;
  isShowheader: boolean = true;
  searchKeyword: string = '';
  isShowSabmenu: boolean = false;
  bsModalRef?: BsModalRef;
  showCurrentPath = {
    menu:'',
    sabmenu: ''
  }
  menuList: any;
  isShowSubmenu: boolean = false;
  isShowHeader: boolean = false;
  userType: string;
  isloading: boolean = false;


  constructor(
    private Location:Location,
    private sharedService : SharedService,
    private userService : UserService,
    private sessionService : SessionService,
    private modalService: BsModalService,
    private route: Router,
    private countDownservice : CountdownService,
    private shardService : SharedService
  ) { }

  ngOnInit(): void {
    this.userType =  localStorage.getItem('userType')
      let payload = {
        UserID:parseInt(localStorage.getItem('user_Id') || ''),
        AppId: 3,
        MenuVersion: 'v1',
      };
      this.userService.getMenuList(payload).subscribe((res: any) => {
        if(!res) {
          this.route.navigateByUrl('/login')
        }
        this.menuList  = res?.body?.data       
      });
 
  }

  showHeader() {
    this.isShowHeader = true;
    
  }

  closeHeader() {
    this.isShowHeader = false;
  }

  /**
   * sidebar event
   */
  onShowHeader = () => {
    this.isShowheader = false;
  }

  /**
   * admin logout method
   */
  logout(){
    this.sessionService.logout();
    this.countDownservice.stopTimer();
    
  }

  removeSidebar() {    
    this.isSidebarOpen = !this.isSidebarOpen;
    this.onConfirm.emit(this.isSidebarOpen);
  }

  onShowSabmenu() {
    this.isShowSabmenu = !this.isShowSabmenu
  }

  modifyHeaderurl(value : any){
    const url = value;
    const modifiedUrl = url.replace(/\.aspx$/, "");   
     
    return modifiedUrl
  }

  showSubmenu() {
    this.isShowSubmenu = true; 
  }

  openSearchModal(){
    const initialState: ModalOptions = {
      initialState: {
       

      },
    };
    this.bsModalRef = this.modalService.show(
      SearchComponentComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }

  openNotification(){
    this.isloading = true
    let payload = {
      "TimeRecorded":this.shardService.formatedTime(new Date()) 
    }
    this.userService.alertcall(payload).subscribe((res: any) => {     
      this.isloading = false
      const initialState: ModalOptions = {
        initialState: {
          data: res.body?.data,
        },
      };
      this.bsModalRef = this.modalService.show(
        NotificationPopupComponent,
        Object.assign(initialState, { class: "modal-dialog-right" })
      );
    }) 
  
  }
}
