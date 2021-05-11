import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'ProfilecardComponent',
    templateUrl: './profilecard.component.html',
    styleUrls: ['./profilecard.component.scss']
})

export class ProfileCardComponent implements OnInit{

    userId: string;
    constructor(private auth: AuthService){}

    ngOnInit(){
        this.userId = this.auth.getUserId;
    }

}