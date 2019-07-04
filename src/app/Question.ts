import { Answer } from './Answer';
export class Question {
	id:string;
	quiz_id:string;
	question_body:string;
	is_multiple_choice:boolean;
	multipleChoice:boolean;
	question_mark:Number;
	mark:Number;
	answers:Answer[];
	questionId:Number;
	question_reference:string;
	question_level:Number;
}