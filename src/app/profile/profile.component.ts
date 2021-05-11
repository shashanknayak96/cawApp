import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from "rxjs";
import { UserModel } from "src/models/user.model";
import { AuthService } from "../auth/auth.service";



@Component({
    selector: 'ProfileComponent',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy{
    
    private routeSub: Subscription;
    faEdit = faEdit;
    user: UserModel;
    
    constructor(private route: ActivatedRoute, private auth: AuthService){

    }

    ngOnInit(){
        this.routeSub = this.route.params.subscribe(params => {
            const userId = params['userId']; 
            this.auth.getUserById(userId)
                .subscribe(userResponse => {
                    console.log(userResponse);
                    this.user = userResponse.user;
                })
        })
    }

    ngOnDestroy(){
        this.routeSub.unsubscribe();
    }
}