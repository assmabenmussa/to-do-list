import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser: any;

  constructor(private http: HttpClient) { }

  private JWT_TOKEN = 'JWT_TOKEN';
  private REFRESH_TOKEN = 'REFRESH_TOKEN';
  private USER_TOKEN = 'USER_TOKEN';
  url = 'http://127.0.0.1:5001/api'


  login(username:string, password:string): Observable<any>{

    let body = {
      username: username,
      password: password
    }
    return this.http.post(`${this.url}/login`, body)
        .pipe(
        map(reply => {
          console.log("reply console log:", reply);
          localStorage.setItem(this.JWT_TOKEN, reply['output']);
          this.getUserData();
          return this.getJwtToken();
        })
      );
    }
  
  
  doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  getRefreshToken(){
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  isLoggedIn(){
    return !!this.getJwtToken();
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER_TOKEN);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getUserData(){
    let userID = this.currentJwtTokenData.sub;
    console.log("Getting user data for user ID: ", userID);
    this.http.get(this.url + "/employee/" + userID)
      .pipe(
        map(response => {
          console.log("User data response...", response);
          localStorage.setItem(this.USER_TOKEN, response.toString());
          return response;
        })
      );
  }

  get currentJwtTokenData() {
    const helper = new JwtHelperService();
    let token = localStorage.getItem(this.JWT_TOKEN);
    if(!token) {
      console.log("Access token not found.");
      return null;
    } else {
      console.log("Access token found.");
      return helper.decodeToken(token);
    }
  }

  get currentUserData() {
    const helper = new JwtHelperService();
    let token = localStorage.getItem(this.USER_TOKEN);
    if(!token) {
      console.log("UserData token not found.");
      return null;
    } else {
      console.log("UserData token found.");
      return helper.decodeToken(token);
    }
  }


}
