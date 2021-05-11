import { Component, Input } from "@angular/core";

@Component({
    selector: 'UserFinderItem',
    templateUrl: './userFinderItem.component.html',
    styleUrls: ['./userFinderItem.component.scss']
})

export class UserFinderItem{
    @Input() user;

    
}