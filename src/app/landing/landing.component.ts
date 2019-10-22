import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { startWith, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '../app.service';
import { GutenbergeResponse } from '../shared/types';

@Component({
  selector: 'gb-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  searchText = new FormControl('', Validators.minLength(1));

  books = [];
  total: number;
  nextUrl;
  categoryHeading;

  constructor(private route: ActivatedRoute,
    private appService: AppService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((data: any) => {
      console.log(data.params.category);
      this.categoryHeading = data.params.category;
      this.getBooks({searchTerm: '', category: data});
    });

    const searchFilter$ = this.searchText.valueChanges.pipe(startWith(''));

    combineLatest(searchFilter$, this.route.paramMap)
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(
      ([searchTerm, params]) => {
        if (!!searchTerm) {
          this.getBooks({searchTerm, category: params});
        } else {
          this.reset();
        }
      },
    );
  }

  getBooks(obj) {
    this.appService.fetchBooks(obj)
    .subscribe((data: GutenbergeResponse) => {
      this.books = data.results;
      this.total = data.count;
      this.nextUrl = data.next;
    });
  }

  reset() {
    this.books = [];
    this.total = 0;
  }

  onScroll() {
    console.log('scrolled');
    this.appService.fetchNextBooks(this.nextUrl)
    .subscribe((data: GutenbergeResponse) => {
      this.books = [...this.books, ...data.results];
      this.total = data.count;
      this.nextUrl = data.next;
    });
  }
}
