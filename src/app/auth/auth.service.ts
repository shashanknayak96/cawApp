import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserModel } from "src/models/user.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    api_key = 'AIzaSyBqnwWTBmQ1CJTqdqFPU0Ww92cGnwmzWws';
    signedUp: boolean = false;
    userToken: string;
    userId: string;

    constructor(private http: HttpClient, private router: Router) { }

    public get signedUpCheck(): boolean {
        return this.signedUp;
    }
    
    public get getUserToken() : string {
        return this.userToken;
    }
    
    public get getUserId() : string {
        return this.userId;
    }

    signup(user: UserModel) {
        this.http.post('http://localhost:3000/user/signup',
            {
                userTag: user.userTag,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            })
            .subscribe(
                (response) => {
                    this.signedUp = true;
                    this.router.navigate(['/login']);
                },
                (error) => {
                    console.log(error);
                })
    }

    login(email: string, password: string) {
        this.http.post<{message: string, token: string, id: string}>('http://localhost:3000/user/login',
            {
                email: email,
                password: password,
            })
            .subscribe(r => {
                this.userToken = r.token;
                this.userId = r.id;

                localStorage.setItem('user_token', r.token);
                localStorage.setItem('user_id', r.id);
                this.router.navigate(['/home']);
            })
    }

    logout(){
        localStorage.clear();
    }

}