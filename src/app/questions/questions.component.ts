import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../services/questionService';


import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {nanoid} from 'nanoid';
import {Answer} from '../models/Answer';
import {RouterLink} from '@angular/router';



@Component({
  selector: 'app-questions',
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    RouterLink
  ],
  templateUrl: './questions.component.html',
  standalone: true,
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent implements OnInit {
  constructor(private questionService: QuestionService) {
  }

  style = {
    backgroundColor: "#94D7A2"
  }

  display = false; // Exemple de valeur pour display
  questions!: any[];
  result !: any;


  ngOnInit(): void {
    this.result = {
      display: false,
      value: 0
    }
    this.questionService.getAllQuestions().subscribe(
      (response) => {
        console.log(response);
        this.questions = response.results.map(
          elmt => {
            const answers = [];
            let rep = {
              isHold: false,
              value: decodeURIComponent(elmt.correct_answer),
              id: nanoid(),
              correct: true
            };
            answers.push(rep);
            elmt.incorrect_answers.forEach(element => {
              rep = {
                isHold: false,
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
        // Enregistrer les questions dans localStorage
        localStorage.setItem('questions', JSON.stringify(this.questions));
      }
    )

    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      this.questions = JSON.parse(storedQuestions);
    } else {
      this.questionService.getAllQuestions().subscribe(
        (response) => {
          console.log(response);
          this.questions = response.results.map((elmt) => {
            const answers = [];
            let rep = {
              isHold: false,
              value: decodeURIComponent(elmt.correct_answer),
              id: nanoid(),
              correct: true,
            };
            answers.push(rep);
            elmt.incorrect_answers.forEach((element) => {
              rep = {
                isHold: false,
                value: decodeURIComponent(element),
                id: nanoid(),
                correct: false,
              };
              answers.push(rep);
            });
            this.shuffleArray(answers);
            return {
              title: decodeURIComponent(elmt.question),
              correct: decodeURIComponent(elmt.correct_answer),
              answers: answers,
              id: nanoid(),
            };
          });
          console.log(this.questions);
          // Enregistrer les questions dans localStorage
          localStorage.setItem('questions', JSON.stringify(this.questions));
        }
      );
    }


  }

  // nanoid():number {
  //   return Math.floor(Math.random()*10000)
  // }
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange
    }
    return array;
  }

  getStyle(answer: any): any {
    if (this.display && answer.correct) {
      return { 'background-color': '#94D7A2' };
    }
  }





  checkResult(): void {
    this.display = true
    const buttons = document.getElementsByClassName('active') as HTMLCollectionOf<HTMLElement>;
    let nbrdept = 0;
    this.questions.forEach((question, index) => {
      question.answers.forEach((answer: Answer) => {
        if (answer.isHold) {
          if (answer.correct) {
            nbrdept++;
            buttons[index].style.backgroundColor = '#94D7A2';
          } else {
            if (buttons[index]) {
              buttons[index].style.backgroundColor = '#e59898';
            }
          }
        }
      });
    });
    this.result = {
      display: true,
      value: nbrdept
    };
  }

  chooseAnswer(questionId: string, answerId: string): void {
    this.questions = this.questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          answers: question.answers.map((answer : Answer) => {
            if (answer.id === answerId) {
              return { ...answer, isHold: !answer.isHold };
            } else {
              return { ...answer, isHold: false };
            }
          })
        };
      }
      return question;
    });
  }



}
