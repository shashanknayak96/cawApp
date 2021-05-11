import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { CawService } from "../caw.service";
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
    selector: 'CawsComponent',
    templateUrl: './caws.component.html',
    styleUrls: ['./caws.component.scss']
})

export class CawsComponent implements OnInit {
    messages = [];

    constructor(private auth: AuthService, private cawService: CawService) {

    }

    ngOnInit() {
        const userId = this.auth.getUserId;
        this.getCaws(userId);
        this.cawService.newCawAdded.subscribe(r => {
            this.getCaws(userId);
        });
    }

    getCaws(userId) {
        this.cawService.getCaws(userId)
            .pipe(
                map(response => {
                    return (
                        response.message.map(message => {
                            return ({
                                ...message,
                                messageId: message._id
                            })
                        })
                    )
                })
            )
            .subscribe(messages => {
                this.messages = messages;
            })
    }


}