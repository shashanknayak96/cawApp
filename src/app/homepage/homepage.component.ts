import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'Homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})

export class HomePage implements OnInit {

    currentUser: string;

    constructor(private auth: AuthService) {

    }

    ngOnInit() {
        this.currentUser = this.auth.getUserId;
        this.auth.getUserById(this.currentUser)
            .pipe(
                map(response => {
                    return ({
                        ...response.user,
                        userId: response.user._id
                    })
                })
            )
            .subscribe(user => {
                this.currentUser = user;
            })
    }

}