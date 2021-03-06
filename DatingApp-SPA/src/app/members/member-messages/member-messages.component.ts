import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/_models/user';


@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input()recipientUser: User;
  messages: Message[];
  newMessage: any = {};
  constructor(private userService: UserService ,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    const currentUserId= +this.authService.decodedToken.nameid;
    console.log(currentUserId);
    this.userService.getMessageThread(this.authService.decodedToken.nameid,
        this.recipientUser.id)
        .pipe(
          tap(message=>{
          for( let i=0; i < message.length ; i++) {
               if(message[i].isRead === false && message[i].recipientId === currentUserId){
                 this.userService.MarkAsRead(currentUserId, message[i].id);
                 console.log(message[i].recipientId);
               }
               
            }
            
          })
        )
        .subscribe(messages=>{
            this.messages=messages;
        },error=>{
          this.alertify.error(error);
        })

                                      
  }
  sendMessage(){
    this.newMessage.recipientId=this.recipientUser.id;
    this.userService.sendMessage(this.authService.decodedToken.nameid,this.newMessage)
    .subscribe((message: Message)=>{
      //debugger;
      this.messages.unshift(message);
      this.newMessage.content = '';
    },error=>{
      this.alertify.error(error);
    });
  }

}
