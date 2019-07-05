export interface fancyQuiz {
  quizId:number;
}
export class Section {
  sectionId: Number;
  title: string;
  fancyQuiz:fancyQuiz;
}