import { Component, OnInit } from "@angular/core";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';


@Component({
    selector: 'CawComponent',
    templateUrl: './caw.component.html',
    styleUrls: ['./caw.component.scss']
})

export class CawComponent implements OnInit{
    solidHeart = solidHeart;
    emptyHeart = emptyHeart;

    messageLiked: boolean = false;

    ngOnInit(){

    }

    likeMessage(){
        this.messageLiked = !this.messageLiked;
    }

}