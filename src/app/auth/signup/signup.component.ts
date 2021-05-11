import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserModel } from "src/models/user.model";
import { AuthService } from "../auth.service";

@Component({
    selector: 'SignupComponent',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

    invalidPassword: boolean = true;
    invalidConfirmPassword: boolean = false;
    signupForm: FormGroup;

    constructor(private auth: AuthService){}

    ngOnInit() {
        this.signupForm = new FormGroup({
            userTag: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl('', [Validators.required]),
        })
    }

    validatePassword() {
        let passwordValue = this.signupForm.get('password').value;

        if (passwordValue.length > 0) {
            this.invalidPassword = /[A-Z]/.test(passwordValue) &&
                /[a-z]/.test(passwordValue) &&
                /[0-9]/.test(passwordValue) &&
                /[^A-Za-z0-9]/.test(passwordValue) &&
                passwordValue.length > 8;
        }
    }

    validateConfirmPassword() {
        if (this.signupForm.value['password'] != this.signupForm.value['confirmPassword']) {
            this.invalidConfirmPassword = true;
        } else { 
            this.invalidConfirmPassword = false;
        }
        console.log(this.invalidConfirmPassword);
    }

    createUser() {
        if(this.signupForm.invalid){
            return;
        } 

        if (this.signupForm.value['password'] != this.signupForm.value['confirmPassword']) {
            this.invalidConfirmPassword = true;
            return;
        }

        const user: UserModel = {
            userTag: this.signupForm.value['userTag'],
            firstName: this.signupForm.value['firstName'],
            lastName: this.signupForm.value['lastName'],
            email: this.signupForm.value['email'],
            password: this.signupForm.value['password'],
        }

        this.auth.signup(user);
    }
}