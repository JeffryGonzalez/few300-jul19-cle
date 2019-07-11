import { Component, OnInit } from '@angular/core';
import { QuestionModel } from '../../models';
import { MathState, selectQuestionModel, selectAtEndOfQuestions, selectGameOverMan } from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { answerProvided, playAgain } from '../../actions/questions.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  model$: Observable<QuestionModel>;
  atEnd$: Observable<boolean>;
  gameOver$: Observable<boolean>;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {
    this.model$ = this.store.select(selectQuestionModel);
    this.atEnd$ = this.store.select(selectAtEndOfQuestions);
    this.gameOver$ = this.store.select(selectGameOverMan);
  }

  next(guessEl: HTMLInputElement) {
    const guess = guessEl.valueAsNumber;
    this.store.dispatch(answerProvided({ guess }));
    guessEl.value = ''; // clear it out for the next question
    guessEl.focus(); // put there cursor back there
  }

  playAgain() {
    this.store.dispatch(playAgain());
  }

}
