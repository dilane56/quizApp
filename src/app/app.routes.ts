import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {QuestionsComponent} from './questions/questions.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'questions', component: QuestionsComponent},
];
