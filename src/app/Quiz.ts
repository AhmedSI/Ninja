import { Question } from './Question';
export class Quiz {
  quizId: Number;
  title: string;
  instructions: string;
  time:Number;
  quizTime:Number;
  questions:Question[];
  totalMark:Number;
  no_of_questions:Number;
}