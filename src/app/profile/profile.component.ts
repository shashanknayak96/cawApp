import { Component } from "@angular/core";
import { faEdit } from '@fortawesome/free-solid-svg-icons';



@Component({
    selector: 'ProfileComponent',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent{
    faEdit = faEdit;

}