import { Employe } from "../models/employe";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: 'root'
})


export class EmployeService{
    private apiServeUrl = environment.apiBaseUrl;
    
    constructor(private http:HttpClient) {}

    public getEmployes():Observable<Employe[]>{
        return this.http.get<Employe[]>(`${this.apiServeUrl}/employee`);
    }

    public addEmploye(employe:Employe):Observable<Employe>{
        return this.http.post<Employe>(`${this.apiServeUrl}/employee/add`,employe);
    }

    public updateEmploye(employe:Employe):Observable<Employe>{
        return this.http.put<Employe>(`${this.apiServeUrl}/employee/update`,employe);
    }

    public deleteEmploye(employeId:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServeUrl}/employee/delete/${employeId}`);
    }
}