import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CawService } from "../caw.service";

@Component({
    selector: 'CawMaker',
    templateUrl: './cawMaker.component.html',
    styleUrls: ['./cawMaker.component.scss']
})

export class CawMaker implements OnInit{
    
    totalTextAreaLength: number = 180;
    cawFormGroup: FormGroup;

    constructor(private cawService: CawService){

    }

    ngOnInit(){
        this.cawFormGroup = new FormGroup({
            cawMessage: new FormControl('', Validators.required)
        })
    }

    textAreaUpdate(textValue){
        this.totalTextAreaLength = 180;
        this.totalTextAreaLength = this.totalTextAreaLength - textValue.value.length;
    }

    addCaw(){
        const cawMessage = this.cawFormGroup.value['cawMessage'];
        this.cawService.addCaw(cawMessage);
        this.cawFormGroup.reset();
    }

    public isEmojiPickerVisible: boolean;
    
    public addEmoji(event) {
        let message = this.cawFormGroup.value['cawMessage'];
        message = `${message}${event.emoji.native}`;
        this.cawFormGroup.setValue({cawMessage: message})
        this.isEmojiPickerVisible = false;
     }
}