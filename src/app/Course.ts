import { Section } from './Section';
import { User } from "./User";
import { Picture } from "./Picture";
export class Course {
  courseId: string;
  publisher: User;
  title: string;
  detailedTitle: string;
  description: string;
  category: string;
  level:Number;
  sections:Section[];
  rate:number;
  role:string;
  course_picture:Picture;
}