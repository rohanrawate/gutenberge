import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'gb-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {

  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  get element() {
    return this.host.nativeElement;
  }

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) { }

  ngOnInit() {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) =>
    entry.isIntersecting && this.scrolled.emit(), options
    );

    this.observer.observe(this.anchor.nativeElement);
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

}
