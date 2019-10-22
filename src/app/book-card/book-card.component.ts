import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gb-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book;
  autherName;

  constructor() { }

  ngOnInit() {
    console.log(this.book);
    if (this.book.authors.length > 0) {
      this.autherName = this.book.authors[0].name;
    }
  }

  getSingleBook() {
    window.open(this.book.formats['text/html; charset=utf-8']);
  }

}
