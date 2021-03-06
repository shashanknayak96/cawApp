import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserModel } from "src/models/user.model";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    api_key = 'AIzaSyBqnwWTBmQ1CJTqdqFPU0Ww92cGnwmzWws';
    // backend_url = 'http://localhost:3000'
    // backend_url_server = 'https://caw-app.herokuapp.com';
    backend_url = environment.backend_url;
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
        if(localStorage.getItem('user_id')){
            this.userId = localStorage.getItem('user_id');
        }
        return this.userId;
    }

    signup(user: UserModel) {
        this.http.post(this.backend_url + '/restuser/signup',
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
        this.http.post<{message: string, token: string, id: string}>(this.backend_url + '/restuser/login',
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

    checkUserTag(userTag){
        return this.http.post<any>(this.backend_url + '/restuser/checkUserTag', {
            userTag: userTag
        });
    }

    getUserById(userId: string){
        return this.http.get<any>(this.backend_url + '/restuser/getUserById' + '?userId=' + userId);
    }

    logout(){
        localStorage.clear();
    }

}