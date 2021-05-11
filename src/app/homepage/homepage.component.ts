import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'Homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})

export class HomePage implements OnInit {

    constructor(private auth: AuthService) {

    }

    ngOnInit(){
        console.log(this.auth.getUserId);
    }

}