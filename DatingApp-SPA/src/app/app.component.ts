import { Component ,OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from './_models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  jwtHelper=new JwtHelperService();
  title = 'DatingApp-SPA';
  constructor(private authService:AuthService,private elementRef: ElementRef){}
  ngOnInit(): void {
    const token=localStorage.getItem('token');
    const user:User=JSON.parse( localStorage.getItem('user'));
    if(token){
      this.authService.decodedToken=this.jwtHelper.decodeToken(token);
    }
    if(user){
      this.authService.currentUser=user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5F5F5';
    //this.elementRef.nativeElement.ownerDocument.body.style.opacity=0.4;
 }
}
