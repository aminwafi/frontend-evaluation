import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private serverUrl = environment.serverUrl + environment.apiUrl;
    private headers = new HttpHeaders();

    private uri = {
        uni: this.serverUrl + '/uni'
    };

    constructor(private http: HttpClient) { 
        this.headers.append("Content-Type", "multipart/form-data");
        this.headers.append("Accept", "application/json");
    }

    getAllDetails() {
        return this.http.get(`${this.uri.uni}/all`);
    }
}
