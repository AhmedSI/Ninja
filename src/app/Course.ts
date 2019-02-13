import { Section } from './Section';
import { User } from "./User";

export class Course {
  courseId: string;
  publisher: User;
  title: string;
  detailed_title: string;
  description: string;
  category: string;
  level:Number;
  sections:Section[]
}