import { Injectable } from '@angular/core';
import { User } from './User';
import { Headers, Http } from '@angular/http';
import { Course } from './Course';
import { Classroom } from './Classroom';
import { Section } from './Section';

@Injectable()
export class UserServiceService {
	//private baseUrl = 'http://localhost:8080';
  private baseUrl = 'https://graduation-server.herokuapp.com';


  constructor(private http: Http) { }

  registerUser(userData: User): Promise<User> {

    return this.http.post(this.baseUrl + '/auth/register?first_name='+userData.firstName+'&last_name='+userData.lastName+'&email='+userData.email+'&username='+userData.username+'&password='+userData.password+'&gender='+userData.gender+'&date_of_birth='+userData.dateOfBirth,userData)
      .toPromise().then(response => response.json() as User);
  }

  loginUser(email: string,password: string): Promise<string> {
    return this.http.get(this.baseUrl + '/auth/login?email='+email+ '&password='+ password)
      .toPromise().then(response => response.text() as string);
  }

  addCourse(token: string,courseData: Course):Promise<string> {
    
    return this.http.post(this.baseUrl + '/teacher/courses?token='+token+ '&title='+courseData.title+ '&detailed_title='+courseData.detailed_title+ '&description='+courseData.description+ '&category='+courseData.category+ '&level='+courseData.level,courseData).toPromise().then(response => response.text() as string);
  }

  addCourseForClassroom(token: string,courseData: Course) : Promise<string>{

    return this.http.post(this.baseUrl + '/teacher/courses?token='+token+ '&title='+courseData.title+ '&detailed_title='+courseData.detailed_title+ '&description='+courseData.description+ '&category='+courseData.category+ '&level='+courseData.level,courseData).toPromise().then(response => response.text() as string);

  }

  addClassroom(token: string,classroomData: Classroom):Promise<string> {
    return this.http.post(this.baseUrl + '/teacher/classrooms?token='+token+ '&classroom_name='+classroomData.classroomName,classroomData).toPromise().then(response => response.text() as string);
  }

  getCourses(token: string):  Promise<Course[]> {
    return this.http.get(this.baseUrl + '/teacher/courses?token='+token)
      .toPromise()
      .then(response => response.json() as Course[]);

  }
b
  getClassrooms(token: string):  Promise<Classroom[]> {
    return this.http.get(this.baseUrl + '/teacher/classrooms?token='+token)
      .toPromise()
      .then(response => response.json() as Classroom[]);
  }

  getChildren(token: string):  Promise<User[]> {
    console.log(this.baseUrl + '/parent/children?token='+token);
    return this.http.get(this.baseUrl + '/parent/children?token='+token)
      .toPromise()
      .then(response => response.json() as User[]);
  }

    
  addChild(token: string,childData: User):Promise<string> {
    return this.http.post(this.baseUrl + '/parent/add_child?token='+token+ '&first_name='+childData.firstName+'&date_of_birth='+childData.dateOfBirth+'&email='+childData.email+'&password='+childData.password+'&username='+childData.username+'&gender='+1+'&grade='+childData.grade,childData).toPromise().then(response => response.text() as string);
  }


  logoutUser(token: string):Promise<string>{
  	return this.http.get(this.baseUrl + '/auth/logout?token='+token)
      .toPromise().then(response => response.text() as string);
  }

  topCourses(): Promise<Course[]> {
    return this.http.get(this.baseUrl + '/new_courses')
      .toPromise()
      .then(response => response.json() as Course[]);
  }

  newCourses(): Promise<Course[]> {
    return this.http.get(this.baseUrl + '/hot_courses').toPromise().then(response => response.json() as Course[]);
  }

  suggestedCourses(): Promise<Course[]> {
    return this.http.get(this.baseUrl + '/hot_courses').toPromise().then(response => response.json() as Course[]);
  }

  getUserData(token: string):  Promise<User> {
    return this.http.get(this.baseUrl + '/profile?token='+token)
      .toPromise()
      .then(response => response.json() as User);
  }

  addSectionForCourse(token: string,courseId:string,section:Section):  Promise<string>{
    
    return this.http.post(this.baseUrl + '/teacher/section?token='+token+ '&course_id='+courseId+ '&section_title='+section.title,section).toPromise().then(response => response.text() as string);

  }

  deleteSection(id: Number,token:string):  Promise<string> {
    return this.http.delete(this.baseUrl + '/teacher/section?token='+token+'&section_id='+id)
      .toPromise()
      .then(response => response.json() as string);
  }

  getCourseById(token:string,courseId:string): Promise<Course> {
    return this.http.get(this.baseUrl + '/course?token='+token+'&course_id='+courseId)
      .toPromise()
      .then(response => response.json() as Course);
  }

  enrollIntoCourse(token:string,course:Course): Promise<Course> {
    console.log(this.baseUrl + '/student/enroll_course?token='+token+'&course_id='+course.courseId,course);
    return this.http.post(this.baseUrl + '/student/enroll_course?token='+token+'&course_id='+course.courseId,course)
      .toPromise()
      .then(response => response.json() as Course);
  }

  getEnrolledCourses(token:string):Promise<Course>{
    return this.http.get(this.baseUrl + '/student/courses?token='+token)
    .toPromise()
    .then(response => response.json() as Course);

  }

  getCoursesByCategory(category:string):Promise<Course[]>{
    return this.http.get(this.baseUrl + '/category_courses?category='+category)
    .toPromise()
    .then(response => response.json() as Course[]);
  }

  enrollChildInCourse(child:User,courseId:Number,token:string):Promise<string>{
  return this.http.post(this.baseUrl + '/parent/enroll_child_course?token='+token+'&first_name='+child.firstName+'&course_id='+courseId,child)
    .toPromise()
    .then(response => response.json() as string);
  }
}
