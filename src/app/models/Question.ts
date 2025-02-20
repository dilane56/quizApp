export class Question {
  constructor(
    public type: string,
    public difficulty: string,
    public category: string,
    public question: string,
    public correct_answer: string,
    public incorrect_answers: string[],) { }
}
