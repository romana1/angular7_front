import { Injectable } from '@angular/core'
import { TokenService } from './token.service'
import { HttpService } from './http.service'
import { UrlService } from './url.service'
import { Observable, BehaviorSubject } from 'rxjs'
import { map, distinctUntilChanged, delay } from 'rxjs/operators'
import { User } from '../models/user.model'
import { ApiService } from './api.service';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authenticatedUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  
  constructor(
    private tokenService: TokenService, 
    private apiService: ApiService,
    private urls: UrlService) { }

  isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable().pipe(distinctUntilChanged());

  authenticatedUser: Observable<User> = this.authenticatedUserSubject.asObservable().pipe(distinctUntilChanged());

  mock: Boolean = true;
  predefinedUser: User = { 
    email: "admin",
    username: "admin",
    bio: "admin",
    image: "admin",
    password: "123",
    token: "123"
  }
  pUser = of(this.predefinedUser);

  setAuthenticatedUser(user: User) {
      this.isAuthenticatedSubject.next(true);
      this.authenticatedUserSubject.next(user);
      this.tokenService.setToken(user.token);
      return user;  
  }

  logInIfAlreadyAuthenticated() {
    if (this.tokenService.tokenExists()) {
      this.apiService.getCurrentUser().
        subscribe(
          user => this.setAuthenticatedUser(user),
          err => this.logOut()
        );
    }
  }

  logIn(email: string, password: string): Observable<any> {
    const data = { user: { email, password } };
    if (this.mock === true && email === "admin") {
      return this.pUser.pipe(map(user => this.setAuthenticatedUser(user)));
    };
    
    return this.apiService.login(data).
      pipe(map(user => this.setAuthenticatedUser(user)));
  }

  logOut() {
    this.tokenService.removeToken();
    this.isAuthenticatedSubject.next(false);
    this.authenticatedUserSubject.next(null);
  }

  // signUpAndLogin(userDetails: any): Observable<any> {
  //   return this.apiService.signUp({ user: userDetails }).
  //     pipe(delay(3000)).  
  //     pipe(map(user => this.setAuthenticatedUser(user)));
  // }

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getAuthenticatedUser(): User {
    return this.authenticatedUserSubject.value;
  }
}
