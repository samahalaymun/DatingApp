import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model:any ={};
username:any;
  constructor(public authService:AuthService,
               private alertify:AlertifyService,
               private router:Router) { }

  ngOnInit() {
    // this.authService.getUSers().subscribe(next =>{
    //   console.log('get users successfully');
    // });
  }
  login(){
    this.authService.login(this.model).subscribe(next =>{
      console.log('logged in successfully');
      this.alertify.success('logged in successfully');
     // this.username=this.authService.decodedToken.unique_name;
    },error=>{
      console.log(error);
      this.alertify.error(error);

    }, () =>{
      this.router.navigate(['/members']);
    });
  }
  loggedIn(){
   return this.authService.loggedIn();
  }
 
  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
