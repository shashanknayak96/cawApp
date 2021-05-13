import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserActions {

    constructor(private http: HttpClient){}

    getUserByNameOrTag(queryString: string){
        return this.http.get<any>('http://localhost:3000/user/getUserByNameOrTag' + '?queryString=' + queryString);
    }

    followUser(mainUser: string, followUser:string){
        this.http.post('http://localhost:3000/user/followUser', {
            mainUser, followUser
        })
        .subscribe(r => {
            console.log(r);
        })
    }

    unfollowUser(mainUser: string, unfollowUser:string){
        this.http.post('http://localhost:3000/user/unfollowUser', {
            mainUser, unfollowUser
        })
        .subscribe(r => {
            console.log(r);
        })
    }
}