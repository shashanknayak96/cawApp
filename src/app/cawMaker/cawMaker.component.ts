import { Component } from "@angular/core";

@Component({
    selector: 'CawMaker',
    templateUrl: './cawMaker.component.html',
    styleUrls: ['./cawMaker.component.scss']
})

export class CawMaker{
    
    totalTextAreaLength: number = 180;

    textAreaUpdate(textValue){
        this.totalTextAreaLength = 180;
        this.totalTextAreaLength = this.totalTextAreaLength - textValue.value.length;
    }
}