import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";


@Component({
    selector: 'LoginComponent',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    displaySignupMessage: boolean = false;

    constructor(private auth: AuthService){

    } 
    
    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        })
        this.displaySignupMessage = this.auth.signedUpCheck;
    }

    loginUser(){
        const email = this.loginForm.get('email').value; 
        const password = this.loginForm.get('password').value; 
        console.log(email, password);
        this.auth.login(email, password);
    }

    closeSignupDialog(){
        this.displaySignupMessage = false;
    }
}

