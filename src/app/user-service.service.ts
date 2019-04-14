import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from './User';
import { Course } from './Course';
import { Classroom } from './Classroom';
import { Section } from './Section';
import { Category } from './Category';
import { Quiz } from './Quiz';
import { Question } from './Question';
import { Answer } from './Answer';
import { Lecture } from './Lecture';
import { fileContent } from './fileContent';
import { StudentSubmission} from './StudentSubmission';

@Injectable()
export class UserServiceService {
	//private baseUrl = 'http://localhost:8080';
  private baseUrl = 'https://graduation-server.herokuapp.com';

  constructor(private http: Http) { }

  registerUser(userData: User){
    return this.http.post(this.baseUrl + '/auth/register?first_name='+userData.firstName+'&last_name='+userData.lastName+'&email='+userData.email+'&username='+userData.username+'&password='+userData.password+'&gender='+userData.gender+'&date_of_birth='+userData.dateOfBirth,userData)
      .toPromise().then(response => response.json() as User,error=> {console.log(error.text());error.text() as string});
  }

  loginUser(email: string,password: string): Promise<string> {
    return this.http.get(this.baseUrl + '/auth/login?email='+email+ '&password='+ password)
      .toPromise().then(response => response.text() as string);
  }

  addCourse(token: string,courseData: Course):Promise<string> {
    return this.http.post(
      this.baseUrl + '/teacher/courses?token='+token+ '&title='+courseData.title+ '&detailed_title='+courseData.detailed_title+ '&description='+courseData.description+ '&category='+courseData.category+ '&level='+courseData.level,courseData).toPromise().then(response => response.text() as string);
  }

  addCourseForClassroom(token: string,courseData: Course) : Promise<string>{
    return this.http.post(
      this.baseUrl + '/teacher/courses?token='+token+ '&title='+courseData.title+ '&detailed_title='+courseData.detailed_title+ '&description='+courseData.description+ '&category='+courseData.category+ '&level='+courseData.level,courseData).toPromise().then(response => response.text() as string);
    }

  addClassroom(token: string,classroomData: Classroom):Promise<string> {
    return this.http.post(
      this.baseUrl + '/teacher/classrooms?token='+token+ '&classroom_name='+classroomData.classroomName,classroomData).toPromise().then(response => response.text() as string);
  }

  getCourses(token: string):  Promise<Course[]> {
    return this.http.get(this.baseUrl + '/teacher/courses?token='+token)
      .toPromise()
      .then(response => response.json() as Course[]);
  }

  getClassrooms(token: string):  Promise<Classroom[]> {
    return this.http.get(this.baseUrl + '/teacher/classrooms?token='+token)
      .toPromise()
      .then(response => response.json() as Classroom[]);
  }

  getChildren(token: string):  Promise<User[]> {
    return this.http.get(this.baseUrl + '/parent/children?token='+token)
      .toPromise()
      .then(response => response.json() as User[]);
  }

    
  addChild(token: string,childData: User):Promise<string> {
    return this.http.post(
      this.baseUrl + '/parent/add_child?token='+token+ '&first_name='+childData.firstName+'&date_of_birth='+childData.dateOfBirth+'&email='+childData.email+'&password='+childData.password+'&username='+childData.username+'&gender='+1+'&grade='+childData.grade,childData).toPromise().then(response => response.text() as string);
  }


  logoutUser(token: string):Promise<string>{
  	return this.http.get(this.baseUrl + '/auth/logout?token='+token)
      .toPromise().then(response => response.text() as string);
  }

  topCourses(): Promise<Course[]> {
    return this.http.get(this.baseUrl + '/top_rated_courses')
      .toPromise()
      .then(response => response.json() as Course[]);
  }

  newCourses(): Promise<Course[]> {
    return this.http.get(
      this.baseUrl + '/new_courses').toPromise().then(response => response.json() as Course[]);
  }

  suggestedCourses(): Promise<Course[]> {
    return this.http.get(
      this.baseUrl + '/hot_courses').toPromise().then(response => response.json() as Course[]);
  }

  getUserData(token: string):  Promise<User> {
    return this.http.get(this.baseUrl + '/profile?token='+token)
      .toPromise()
      .then(response => response.json() as User);
  }

  addSectionForCourse(token: string,courseId:string,section:Section):  Promise<string>{
    return this.http.post(
      this.baseUrl + '/teacher/section?token='+token+ '&course_id='+courseId+ '&section_title='+section.title,section).toPromise().then(response => response.text() as string);
  }

  deleteSection(id: Number,token:string):  Promise<string> {
    return this.http.delete(this.baseUrl + '/teacher/section?token='+token+'&section_id='+id)
      .toPromise()
      .then(response => response.text() as string);
  }

  getCourseById(token:string,courseId:string): Promise<Course> {
    return this.http.get(this.baseUrl + '/course?token='+token+'&course_id='+courseId)
      .toPromise()
      .then(response => response.json() as Course);
  }

  enrollIntoCourse(token:string,course:Course): Promise<string> {
    return this.http.post(this.baseUrl + '/student/enroll_course?token='+token+'&course_id='+course.courseId,course)
      .toPromise()
      .then(response => response.text() as string);
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

  enrollClassroom(token: string,classroomData: Classroom):Promise<string> {
    return this.http.post(
      this.baseUrl + '/student/join_classroom?token='+token+ '&passcode='+classroomData.passCode,classroomData).toPromise().then(response => response.text() as string);
  }

  getEnrolledClassroom(token:string):Promise<Classroom>{
    return this.http.get(this.baseUrl + '/student/classrooms?token='+token)
    .toPromise()
    .then(response => response.json() as Classroom);
  }

  pushFileToStorage(file:File,token:string):Promise<String>{

    const formData : FormData = new FormData();
    formData.append('file',file);
    return this.http.post(this.baseUrl + '/prongPic?token='+token,formData).toPromise().then(response => response.text() as string);
  }

  beTeacher(token:string):Promise<String>{
    const formData : FormData = new FormData();
    return this.http.post(this.baseUrl + '/teacher/request_teaching?token='+token,formData).toPromise().then(response => response.text() as string);
  }

  getTeacherRequests(token:string):Promise<Request[]>{
    return this.http.get(this.baseUrl + '/admin/requests?token='+token)
    .toPromise()
    .then(response => response.json() as Request[]);

  }

  acceptTeacher(token:string,id:Number):Promise<String>{
    const formData : FormData = new FormData();
    return this.http.put(this.baseUrl + '/admin/approve_teaching?token='+token+'&user_id='+id,formData).toPromise().then(response => response.text() as string);
  }

  getCategories () :Promise<Category[]>{

    return this.http.get(this.baseUrl+'/categories').toPromise().then(response => response.json() as Category[]);
  }

  getChild(token: string,id:string):  Promise<User> {
    
    return this.http.get(this.baseUrl + '/parent/child?token='+token+'&user_id='+id)
      .toPromise()
      .then(response => response.json() as User);
  }
  enrollChildInClassroom(token:string,passcode:string,name:string): Promise<string>{
    
    const formData : FormData = new FormData();
    return this.http.post(this.baseUrl+'/parent/join_child_classroom?token='+token+'&first_name='+name+'&passcode='+passcode,formData).toPromise().then(
      response=> response.text() as string);
  }

  addQuiz(token:string,sectionId:string,quizData:Quiz): Promise<string>{
    
    return this.http.post(this.baseUrl+'/teacher/quiz?token='+token+'&section_id='+sectionId+'&quiz_title='+quizData.title+'&quiz_instructions='+quizData.instructions+'&quiz_time='+quizData.quizTime,quizData).toPromise().then(
      response=> response.text() as string);
  }

  deleteQuiz(id: Number,token:string):  Promise<string> {
    return this.http.delete(this.baseUrl + '/teacher/quiz?token='+token+'&quiz_id='+id)
      .toPromise()
      .then(response => response.text() as string);
  }

  pushLectureContent(file:File,token:string,id:string):Promise<String>{
    const formData : FormData = new FormData();
    formData.append('file',file);
    return this.http.post(this.baseUrl + '/teacher/file?token='+token+'&section_id='+id,formData).toPromise().then(response => response.text() as string);
  }

  getQuiz(token:string,id:Number):Promise<Quiz>{
    return this.http.get(
    this.baseUrl +'/quiz?token='+token+'&quiz_id='+id).toPromise().then(response=> response.json() as Quiz);
  }

  addQuestion(token:string,question:Question,quizId:Number):Promise<string>{
    return this.http.post(this.baseUrl + '/teacher/question?token='+token+'&quiz_id='+quizId+'&question_body='+question.question_body+'&is_multiple_choice='+question.is_multiple_choice+'&question_mark='+question.question_mark+"&question_level="+question.question_level+"&question_reference="+question.question_reference,question).toPromise().then(response => response.text() as string);
  }

  deleteQuestion(token:string,questionId:string):Promise<string>{
    return this.http.delete(this.baseUrl + '/teacher/question?token='+token+'&question_id='+questionId)
      .toPromise()
      .then(response => response.text() as string);
  }

  addAnswer(token:string,answer:Answer,questionId:string):Promise<string>{
    return this.http.post(this.baseUrl + '/teacher/answer?token='+token+'&question_id='+questionId+'&answer_body='+answer.answer_body+'&is_correct='+answer.is_correct,answer).toPromise().then(response => response.text() as string);
  }

  deleteAnswer(token:string,answerId:string):Promise<string>{
    return this.http.delete(this.baseUrl + '/teacher/answer?token='+token+'&answer_id='+answerId)
      .toPromise()
      .then(response => response.text() as string);
  }

  getLecture(token:string,id:string):Promise<Lecture>{
    return this.http.get(this.baseUrl+"/lecture?token="+token+"&lecture_id="+id).toPromise().then(response => response.json() as Lecture);
  }


  //getLectureContent(token:string,id:Number):Promise<any>{
    //return this.http.get(this.baseUrl+"/teacher/file?token="+token+"&file_id="+id).toPromise().then(response => response['_body']);
  //}


  downloadPDF(token:string,id:Number): any {
    return this.http.get(this.baseUrl+"/teacher/file?token="+token+"&file_id="+id).toPromise().then(
    (res) => {
            console.log(res);
            return new Blob([res['_body']], { type: 'application/pdf' })
        });
  }
  //getLectureContent(token:string,id:Number):Promise<File>{
    //return this.http.get(this.baseUrl+"/teacher/file?token="+token+"&file_id="+id).toPromise().then(response => response['_body'] as File);
  //}

  getLectureContent(token:string,id:Number):Promise<fileContent>{
    return this.http.get(this.baseUrl+"/teacher/file?token="+token+"&file_id="+id).toPromise().then(response => response.json() as fileContent);
  }

  getrequestOfTeaching(token:string):Promise<string>{
    return this.http.get(this.baseUrl+"/teacher/request_teaching?token="+token).toPromise().then(response => response.text() as string);
  }

  startQuiz(token:string,id:Number){
    return this.http.post(this.baseUrl+"/student/quiz/start?token="+token+"&quiz_id="+id,{}).toPromise().then(
      response => response.text() as string
    );

  }

  evaluate(token:string,id:Number,submission:StudentSubmission):Promise<string>{
    return this.http.post(this.baseUrl+"/student/quiz/submit?token="+token+"&quiz_id="+id,submission).toPromise().then(
      response => response.text() as string
    );
  }

  NewCourseInClassroom(token:string,classroomId:string,course:Course){
      return this.http.post(
        this.baseUrl + '/teacher/classroom_courses?token='+token+'&classroom_id='+classroomId+'&title='+course.title+ '&detailed_title='+course.detailed_title+ '&description='+course.description+ '&category='+course.category+ '&level='+course.level,course)
        .toPromise().
        then(response => response.text() as string);
      }

  setQuestionsNumber(token:string,id:Number,num:Number):Promise<string>{
    return this.http.post(this.baseUrl+"/teacher/quiz/no_questions?token="+token+"&quiz_id="+id+"&no_of_questions="+num,{}).toPromise().then(
      response => response.text() as string
    );
  }

  getQuizAsStudent(token:string,quizId:Number):Promise<Quiz>{
    return this.http.get(this.baseUrl+"/student/quiz/generate?token="+token+"&quiz_id="+quizId).toPromise().then(response => response.json() as Quiz);
  }

  getQuizInfoForStudent(token:string,quizId:Number){
    return this.http.get(this.baseUrl+"/student/quiz?token="+token+"&quiz_id="+quizId).toPromise().then(response => response.json().studentMark as string);
  }

}
