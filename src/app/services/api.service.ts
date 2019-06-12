import { Injectable } from '@angular/core'
import { HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { HttpService } from './http.service'
import { UrlService } from './url.service'
import { TokenService } from './token.service'
import { User } from '../models/user.model'
import { Article } from '../models/article.model';
import { map } from 'rxjs/operators';
// import { Articles } from 'models/articles.model';
// import { ArticleComment } from 'models/article-comment.model';
// import { Profile } from 'models/profile.model';
 
@Injectable({
  providedIn: 'root'
}) 
export class ApiService {
  
  constructor(
    private http: HttpService, 
    private urls: UrlService,
    private tokenService: TokenService) { }

  getArticles(parameters: { limit: number, offset: number, author?: string, favoritedBy?: string, tag?: string }): Observable<any> {
    const url = this.urls.getArticlesUrl();
    
    const params = {
      limit: parameters.limit.toString(),
      offset: parameters.offset.toString(),
      author: parameters.author,
      favorited: parameters.favoritedBy,
      tag: parameters.tag
    };

    Object.keys(params).forEach(key => !params[key] && delete params[key])

    return this.http.get(url, new HttpParams( { fromObject: params }), this.tokenService.getToken());
  }



  login(data: any): Observable<User> {
    const url = this.urls.getLoginUrl();
    return this.http.post(url, data).
      pipe(map(response => response.user));
  }

  // getArticle(articleSlug: string): Observable<Article> {
  //   const url = this.urls.getArticleUrl(articleSlug);
  //   return this.http.get(url, null, this.tokenService.getToken()).
  //     pipe(map(response => response.article));
  // }

  // signUp(user: any): Observable<User> {
  //   const url = this.urls.getUsersUrl();
  //   return this.http.post(url, user).
  //     pipe(map(response => response.user));
  // }

  updateArticle(article: Article): Observable<Article> {
    const url = this.urls.getArticleUrl(article.slug);
    return this.http.put(url, { article }, this.tokenService.getToken()).
      pipe(map(response => response.article));
  }

  createArticle(article: Article): Observable<Article> {
    const url = this.urls.getArticlesUrl();
    return this.http.post(url, { article }, this.tokenService.getToken()).
      pipe(map(response => response.article));
  }

  // deleteArticle(articleSlug: string): Observable<any> {
  //   const url = this.urls.getArticleUrl(articleSlug);
  //   return this.http.delete(url, this.tokenService.getToken());
  // }

  getCurrentUser(): Observable<User> {
    const url = this.urls.getCurrentUserUrl();
    return this.http.get(url, null, this.tokenService.getToken()).
      pipe(map(response => response.user));
  }

}
