import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScoresModel } from '../../models';
import { Store } from '@ngrx/store';
import { MathState, selectScoresModel } from '../../reducers';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  scoresModel$: Observable<ScoresModel>;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {
    this.scoresModel$ = this.store.select(selectScoresModel);
  }

}
