import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import {QuestionService} from '../services/questionService';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  numberQuestion!: number;
  category!:number;
  difficulty!: string;
  type!: string;
  apiUrl !: string;
  constructor(private  router: Router,
              private questionService: QuestionService,) {
  }

  OnContinue(form: NgForm) {
    this.router.navigateByUrl("questions");
    this.numberQuestion = form.value.numberQuestion;
    this.category = form.value.category;
    this.difficulty = form.value.difficulty;
    this.type = form.value.type;
    console.log(this.numberQuestion);
    this.apiUrl = `https://opentdb.com/api.php?amount=${this.numberQuestion}&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}`;
    console.log(this.apiUrl);
    this.questionService.apiUrl=this.apiUrl;
    console.log(this.questionService.apiUrl);
  }

  ngOnInit(): void {
    this.numberQuestion = 5;
    this.category = 21;
    this.difficulty = "easy";
    this.type = "multiple";
  }
  getAiUrl (): string{
    return this.apiUrl;
  }
}
