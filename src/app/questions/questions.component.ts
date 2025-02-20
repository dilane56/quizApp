import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../services/questionService';
import {Question} from '../models/Question';

import {NgForOf, NgStyle} from '@angular/common';
import {nanoid} from 'nanoid';


@Component({
  selector: 'app-questions',
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './questions.component.html',
  standalone: true,
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent implements OnInit {
  constructor(private questionService: QuestionService) {
  }
    style ={
    backgroundColor : "#94D7A2"
  }

  style1 ={
    backgroundColor : ""
  }
  display = true; // Exemple de valeur pour display
  questions!: any[];
  formatedQuestions!: Question[];

  ngOnInit(): void {
      this.questionService.getAllQuestions().subscribe(

      (response) =>{
        console.log(response);
        this.questions = response.results.map(
          elmt =>{
            const answers = [];
            let rep = {
              ishold: false,
              value: decodeURIComponent(elmt.correct_answer),
              id: nanoid(),
              correct: true
            };
            answers.push(rep);
            elmt.incorrect_answers.forEach(element => {
              rep = {
                ishold: false,
                value: decodeURIComponent(element),
                id: nanoid(),
                correct: false
              };
              answers.push(rep);
            });
            this.shuffleArray(answers);
            return {

              title: decodeURIComponent(elmt.question),
              correct: decodeURIComponent(elmt.correct_answer),
              answers: answers,
              id: nanoid()
            };
          }
        );
        console.log(this.questions);
      }

    )



  }
  // nanoid():number {
  //   return Math.floor(Math.random()*10000)
  // }
  shuffleArray(array:any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange
    }
    return array;
  }
  getStyle(answer: any) {
    return this.display && answer.correct ? { 'background-color': 'green' } : { 'background-color': 'red' };
  }
  chooseAnswer(questionId: number, answerId: number) {
    // Implémentez ici la logique pour choisir la réponse
  }


}
