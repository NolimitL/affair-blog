import { User, FireBaseAuthResponse } from 'src/app/shared/interfaces';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({providedIn:"root"})
export class AuthService{

  public errorMessage$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient){}

  get token():string{
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if(new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user:User): Observable<any>{
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout(){
    this.setToken(null)
  }

  isAuthenticated():boolean{
    return !!this.token
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error
    switch (message) {
      case 'INVALID_EMAIL':
        this.errorMessage$.next("Email is incorrect.")
        break;
      case 'INVALID_PASSWORD':
        this.errorMessage$.next("Password is incorrect.")
        break;
      case 'EMAIL_NOT_FOUND':
        this.errorMessage$.next("This email does not exist.")
        break;
    }
    return throwError(error)
  }

  private setToken(response: FireBaseAuthResponse | null){
    if (response) {
      const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expiresDate.toString())
    }else{
      localStorage.clear()
    }
  }
}

