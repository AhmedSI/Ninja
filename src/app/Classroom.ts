import { Course } from './Course';
import{Picture} from './Picture';
export interface creator{
  firstName:string;
  lastName:string;
}
export class Classroom {
  classroomId :string;
  courses: Course[];
  creatorId: string;
  classroomName: string;
  passCode: string; 
  classroom_picture:Picture;
  creator:creator;
  coursesNumber:number;
}