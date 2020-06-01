import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model:any ={};
username:any;
  constructor(public authService:AuthService,
               private alertify:AlertifyService) { }

  ngOnInit() {
  }
  login(){
    this.authService.login(this.model).subscribe(next =>{
      console.log('logged in successfully');
      this.alertify.success('logged in successfully');
     // this.username=this.authService.decodedToken.unique_name;
    },error=>{
      console.log(error);
      this.alertify.error(error);

    });
  }
  loggedIn(){
   return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
    this.alertify.message('logged out');
  }

}
