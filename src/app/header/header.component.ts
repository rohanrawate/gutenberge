import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() filterControl;

  constructor() { }

  ngOnInit() {
  }

}
