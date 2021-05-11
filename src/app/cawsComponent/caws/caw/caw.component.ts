import { Component, Input, OnInit } from "@angular/core";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { UserModel } from "src/models/user.model";
import { CawService } from "../../caw.service";

import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
    selector: 'CawComponent',
    templateUrl: './caw.component.html',
    styleUrls: ['./caw.component.scss']
})

export class CawComponent implements OnInit {

    @Input() message: {
        messageId: string,
        cawMessage: string,
        timestamp: string,
        totalLikes: number,
        userId: UserModel
    };

    solidHeart = solidHeart;
    emptyHeart = emptyHeart;

    messageLiked: boolean = false;

    constructor(private cawService: CawService) {

    }

    ngOnInit() {
        const userLikeMessages: string[] = this.message.userId.likesMessages;
        if(userLikeMessages.includes(this.message.messageId)){
            this.messageLiked = true;
        }else{
            this.messageLiked = false;
        }
    }

    likeMessage() {
        this.messageLiked = !this.messageLiked;

        //Change user here  = this.message.userId.userId
        if(this.messageLiked){
            this.message.totalLikes += 1;            
            this.cawService.likeCaw(this.message.userId.userId, this.message.messageId)
                .subscribe(r => {
                    console.log("likeCaw", r)
                    this.cawService.getCawById(this.message.messageId)
                    .pipe(
                        map(messageObject => {
                            return ({ 
                                ...messageObject.message,
                                messageId: messageObject.message._id
                            })
                        })
                    )
                    .subscribe(message => {
                        console.log("getCawID", message)
                        this.message = message;
                    })
                }, e => {
                    this.message.totalLikes -= 1;  
                })
        }else {
            this.message.totalLikes -= 1;   
            this.cawService.unlikeCaw(this.message.userId.userId, this.message.messageId)
            .subscribe(r => {
                console.log("unlikeCaw", r)
                this.cawService.getCawById(this.message.messageId)
                    .pipe(
                        map(messageObject => {
                            return messageObject.message
                        })
                    )
                    .subscribe(message => {
                        console.log("unlike getCawID", message)
                        this.message = message;
                    })
            }, e => {
                this.message.totalLikes += 1;  
            })
            

        }

    }

}