import { Component } from "@angular/core";

@Component({
    selector: 'UserFinder',
    templateUrl: './userFinder.component.html',
    styleUrls: ['./userFinder.component.scss']
})
export class UserFinder{
    
    user = [
        {name: 'Shashank Nayak', tag: '@shash'},
        {name: 'Arya Bhagwat', tag: '@anb'},
        {name: 'Shashank2Undercover', tag: '@notShash'},
    ]

}