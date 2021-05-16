import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserActions {

    backend_url = environment.backend_url;

    constructor(private http: HttpClient){}

    getUserByNameOrTag(queryString: string){
        return this.http.get<any>(this.backend_url+ '/restuser/getUserByNameOrTag' + '?queryString=' + queryString);
    }

    followUser(mainUser: string, followUser:string){
        this.http.post(this.backend_url + '/restuser/followUser', {
            mainUser, followUser
        })
        .subscribe(r => {
            console.log(r);
        })
    }

    unfollowUser(mainUser: string, unfollowUser:string){
        this.http.post(this.backend_url  + '/restuser/unfollowUser', {
            mainUser, unfollowUser
        })
        .subscribe(r => {
            console.log(r);
        })
    }
}