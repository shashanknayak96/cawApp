import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "src/models/user.model";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'ProfilecardComponent',
    templateUrl: './profilecard.component.html',
    styleUrls: ['./profilecard.component.scss']
})

export class ProfileCardComponent implements OnInit{

    userId: string;
    userObject: UserModel;
    constructor(private auth: AuthService, private router: Router){}

    ngOnInit(){
        this.userId = this.auth.getUserId;
        this.auth.getUserById(this.userId)
            .subscribe(r => {
                this.userObject = r.user;
            })
    }


    logout(){
        this.auth.logout();
        this.router.navigate(['/login']);
    }

}