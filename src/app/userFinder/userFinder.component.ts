import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { UserActions } from "./userAction.service";


@Component({
    selector: 'UserFinder',
    templateUrl: './userFinder.component.html',
    styleUrls: ['./userFinder.component.scss']
})
export class UserFinder implements OnInit {

    @Input() currentUser;
    userFinderForm: FormGroup;
    users = []


    ngOnInit() {
        this.userFinderForm = new FormGroup({
            userQuery: new FormControl('')
        })
    }

    constructor(private userActions: UserActions) { }

    findUser(event: Event) {
        event.preventDefault();

        const queryString = this.userFinderForm.value['userQuery'];
        this.userActions.getUserByNameOrTag(queryString)
            .pipe(
                map(response => {
                    return(response.users.map(user => {
                        return({
                            ...user, 
                            userId: user._id
                        })
                    }))
                })
            )
            .subscribe(users => {
                this.users = users;
            })
    }


    clearSearchbar(){
        this.userFinderForm.reset();
    }
    

}