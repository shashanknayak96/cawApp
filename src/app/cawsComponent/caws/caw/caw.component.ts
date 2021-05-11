import { Component, Input, OnInit } from "@angular/core";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { UserModel } from "src/models/user.model";


@Component({
    selector: 'CawComponent',
    templateUrl: './caw.component.html',
    styleUrls: ['./caw.component.scss']
})

export class CawComponent implements OnInit{

    @Input() message: {
        cawMessage: string,
        timestamp: string,
        totalLikes: number,
        userId: UserModel 
    };

    solidHeart = solidHeart;
    emptyHeart = emptyHeart;

    messageLiked: boolean = false;

    ngOnInit(){
    }

    likeMessage(){
        this.messageLiked = !this.messageLiked;
    }

}