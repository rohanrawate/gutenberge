import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { SearchParams } from './shared/types/github.type';
import { APP_CONFIG } from './shared/injection-tokens';
import { AppConfigGlobal } from './shared/types';
import { GutenbergeResponse } from './shared/types';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(@Inject(APP_CONFIG) public config: AppConfigGlobal,
              private http: HttpClient) { }

  fetchBooks(searchParams): Observable<GutenbergeResponse> {
    console.log(searchParams)

    const params = new HttpParams()
    .set('search', searchParams.searchTerm)
    .set('topic', searchParams.category.params.category)
    .set('mime_type', 'image/jpeg');
    // .set('per_page', String(searchParams.per_page));

    return this.http.get<GutenbergeResponse>(this.config.api.getBooks.url, { params })
     .pipe(
       map((res) => res)
     );
  }

  fetchNextBooks(nextUrl: string) {
    return this.http.get<GutenbergeResponse>(nextUrl)
     .pipe(
       map((res) => res)
     );
  }
}
