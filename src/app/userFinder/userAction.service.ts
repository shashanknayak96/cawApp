import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserActions {

    backend_url_server = 'https://caw-app.herokuapp.com';


    constructor(private http: HttpClient){}

    getUserByNameOrTag(queryString: string){
        return this.http.get<any>(this.backend_url_server+ '/restuser/getUserByNameOrTag' + '?queryString=' + queryString);
    }

    followUser(mainUser: string, followUser:string){
        this.http.post(this.backend_url_server + '/restuser/followUser', {
            mainUser, followUser
        })
        .subscribe(r => {
            console.log(r);
        })
    }

    unfollowUser(mainUser: string, unfollowUser:string){
        this.http.post(this.backend_url_server  + '/restuser/unfollowUser', {
            mainUser, unfollowUser
        })
        .subscribe(r => {
            console.log(r);
        })
    }
}