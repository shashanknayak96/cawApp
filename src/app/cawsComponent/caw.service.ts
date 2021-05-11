import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})

export class CawService{
    
    newCawAdded = new EventEmitter();

    constructor(private http: HttpClient, private auth: AuthService){

    }

    newCawAddedGet(): Observable<any>{
        return this.newCawAdded;
    }


    addCaw(cawMessage: string){
        const timestamp = new Date();
        const userId = localStorage.getItem('user_id');
        this.http.post('http://localhost:3000/caw/add', {
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
        return this.http.post<{message: Array<any>}>('http://localhost:3000/caw/get', {
            userId
        });
    }

    likeCaw(userId: string, messageId: string){
        return this.http.post('http://localhost:3000/caw/likeCaw', {
            userId: userId, 
            messageId: messageId
        });
    }

    unlikeCaw(userId: string, messageId: string){
        return this.http.post('http://localhost:3000/caw/unlikeCaw', {
            userId: userId, 
            messageId: messageId
        });
    }

    getCawById(messageId){
        return this.http.get<any>('http://localhost:3000/caw/getCawById' + '?messageId=' + messageId);
    }
}