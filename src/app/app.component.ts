import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
  selector: 'app-root-two',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
  title = 'eAtmApp';
}
