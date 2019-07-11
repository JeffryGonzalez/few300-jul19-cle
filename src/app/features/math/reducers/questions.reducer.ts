import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as questionActions from '../actions/questions.actions';

export interface QuestionEntity {
  id: number;
  question: string;
  answer: number;
}
interface MissedQuestion { id: number; providedAnswer: number; }
export interface MathQuestionsState extends EntityState<QuestionEntity> {
  currentQuestionId: number;
  missedQuestions: MissedQuestion[];
}

const initialState: MathQuestionsState = {
  currentQuestionId: 1,
  missedQuestions: [],
  ids: [1, 2, 3, 4, 5],
  entities: {
    1: {
      id: 1,
      question: '1 + 1',
      answer: 2
    },
    2: {
      id: 2,
      question: '3 * 3',
      answer: 9
    },
    3: {
      id: 3,
      question: '18 - 2',
      answer: 16
    },
    4: {
      id: 4,
      question: '32 / 2',
      answer: 16
    },
    5: {
      id: 5,
      question: '20 - 5',
      answer: 15
    }
  }
};

export const adapter = createEntityAdapter<QuestionEntity>();

export const reducer = createReducer(
  initialState,
  on(questionActions.answerProvided, (state, action) => {
    let tempState = { ...state };

    const currentQuestion = state.entities[state.currentQuestionId];

    if (action.guess !== currentQuestion.answer) {
      // add the questionId and their guess to the array of missedQuestions
      tempState = { ...tempState, missedQuestions: [...state.missedQuestions, { id: currentQuestion.id, providedAnswer: action.guess }] };
    }
    const newState = ({ ...tempState, currentQuestionId: state.currentQuestionId + 1 });
    return newState;
  })
);

// TODO: This will blow up way later. REmember this. I'll fix it then.
