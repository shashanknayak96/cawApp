import { Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import { faCheckCircle as followIcon, faTimesCircle as unfollowIcon, faCrow } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "src/app/auth/auth.service";
import { UserActions } from "../userAction.service";

@Component({
    selector: 'UserFinderItem',
    templateUrl: './userFinderItem.component.html',
    styleUrls: ['./userFinderItem.component.scss']
})

export class UserFinderItem implements OnInit{
    @Input() user;
    @Input() currentUser;
    @Output() buttonClicked: EventEmitter<null> = new EventEmitter();

    followIcon = followIcon;
    unfollowIcon = unfollowIcon;
    faCrow = faCrow;   

    isFollowing: boolean = false;


    constructor(private userActions: UserActions, private auth: AuthService){

    }

    ngOnInit(){ 
        if(this.currentUser.following.includes(this.user.userId)){
            this.isFollowing = true;
        }else{
            this.isFollowing = false;
        }
    }

    followUnfollowUser(){

        if(!this.isFollowing){
            this.userActions.followUser(this.currentUser.userId, this.user.userId);
            this.isFollowing = true;
        }else{
            this.userActions.unfollowUser(this.currentUser.userId, this.user.userId);
            this.isFollowing = false;
        }
        this.buttonClicked.emit();
    }
}