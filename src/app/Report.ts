import { User } from './User';
import { Course } from './Course';
import { Quiz } from './Quiz';
export class Report {
  course: Course;
  child : User;
  parent: User;
  quiz : Quiz;
}