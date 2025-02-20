import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Question} from '../models/Question';
import {Observable, tap} from 'rxjs';
import {ApiResponse} from '../models/ApiResponse';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class QuestionService {
  constructor(private http: HttpClient) {

  }
  reponseApi! : ApiResponse;
  formatedQuestion: Question[]=[];
  apiUrl!: string;
  setApiUrl(form: NgForm) {
    this.apiUrl = form.value.apiUrl;
  }
  getApiUrl(): string {
    return this.apiUrl;
  }
  getAllQuestions():Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}`).pipe(
      tap(reponse =>{
        this.reponseApi = reponse;
        //console.log('données recuperées:', this.questions)
      }
      )
    );
  }
  logAllQuestions(): void {
    this.getAllQuestions().subscribe(
      questions => {
        this.reponseApi = questions;
        console.log('données recuperées:', this.reponseApi);
      },
      error => {
        console.log("Erreur lors de la recuperation des données");
       });
  }



}


