import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CawService{
    
    newCawAdded = new EventEmitter();
    backend_url = environment.backend_url;


    constructor(private http: HttpClient, private auth: AuthService){

    }

    newCawAddedGet(): Observable<any>{
        return this.newCawAdded;
    }


    addCaw(cawMessage: string){
        const timestamp = new Date();
        const userId = localStorage.getItem('user_id');
        this.http.post(this.backend_url + '/caw/add', {
            cawMessage,
            userId,
            timestamp,
        })
        .subscribe(r => {
            this.newCawAdded.next();
            console.log(r);
        })
    }

    getCaws(userId: string){
        return this.http.get<any>(this.backend_url + '/caw/getCawsForFeed' + '?userId=' + userId );
    }

    likeCaw(userId: string, messageId: string){
        return this.http.post(this.backend_url + '/caw/likeCaw', {
            userId: userId, 
            messageId: messageId
        });
    }

    unlikeCaw(userId: string, messageId: string){
        return this.http.post(this.backend_url + '/caw/unlikeCaw', {
            userId: userId, 
            messageId: messageId
        });
    }

    getCawById(messageId){
        return this.http.get<any>(this.backend_url + '/caw/getCawById' + '?messageId=' + messageId);
    }

    
}