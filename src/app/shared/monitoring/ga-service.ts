import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Injectable()
export class GAService {

    constructor(private angulartics2: Angulartics2) { }

    monitor (action, category, label) {
        this.angulartics2.eventTrack.next({
            action: action,
            properties: {
              category: category,
              label: label,
            },
          });
    }
}
