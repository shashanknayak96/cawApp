import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { CawService } from "../caw.service";

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
        const userId = localStorage.getItem('user_id'); 
        this.getCaws(userId);
        this.cawService.newCawAdded.subscribe(r => {
            this.getCaws(userId);            
        });
    }

    getCaws(userId){
        this.cawService.getCaws(userId)
            .subscribe(response => {
                console.log(response);
                this.cawService.newCawAdded.subscribe(r => {
                    
                });
                this.messages = response.message;
            })
    }


}