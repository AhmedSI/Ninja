import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserServiceService } from './user-service.service';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { SidebarComponentComponent } from './sidebar-component/sidebar-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { TecherdashboardComponentComponent } from './techerdashboard-component/techerdashboard-component.component';
import { ParentdashboardComponentComponent } from './parentdashboard-component/parentdashboard-component.component';
import { CoursehomeComponentComponent } from './coursehome-component/coursehome-component.component';
import { ClassroomhomeComponentComponent } from './classroomhome-component/classroomhome-component.component';
import { ClassroomdashboardComponentComponent } from './classroomdashboard-component/classroomdashboard-component.component';
import { CoursedashboardComponentComponent } from './coursedashboard-component/coursedashboard-component.component';
import { OwlModule } from 'ngx-owl-carousel';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CategoryComponent } from './category/category.component';
import { MyClassroomsComponent } from './my-classrooms/my-classrooms.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ChildprofileComponent } from './childprofile/childprofile.component';
import { LectureComponent } from './lecture/lecture.component';
import { QuizhomeComponent } from './quizhome/quizhome.component';
import { QuizdashboardComponent } from './quizdashboard/quizdashboard.component';
import { LectureContentsComponent } from './lecture-contents/lecture-contents.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    HomeComponentComponent,
    NavbarComponentComponent,
    SidebarComponentComponent,
    FooterComponentComponent,
    TecherdashboardComponentComponent,
    ParentdashboardComponentComponent,
    CoursehomeComponentComponent,
    ClassroomhomeComponentComponent,
    ClassroomdashboardComponentComponent,
    CoursedashboardComponentComponent,
    ProfileComponent,
    EditprofileComponent,
    MyCoursesComponent,
    CategoryComponent,
    MyClassroomsComponent,

    UploadfileComponent,

    AdmindashboardComponent,

    ChildprofileComponent,

    LectureComponent,


    QuizhomeComponent,


    QuizdashboardComponent,


    LectureContentsComponent
  ],
  imports: [
    BrowserModule,
    OwlModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{
      path: 'register',
      component: RegisterComponentComponent
    },{
      path: 'login',
      component: LoginComponentComponent
    },{
      path: 'home',
      component: HomeComponentComponent
    },{
      path: 'teacherDashboard',
      component: TecherdashboardComponentComponent
    },{
      path: 'parentDashboard',
      component: ParentdashboardComponentComponent
    },{
      path: 'course',
      component: CoursehomeComponentComponent
    },{
      path: 'profile',
      component: ProfileComponent
    },{
      path: 'editprofile',
      component: EditprofileComponent
    },{
      path: 'coursedashboard/:id',
      component: CoursedashboardComponentComponent
    },{
      path: 'classroomdashboard/:id',
      component: ClassroomdashboardComponentComponent
    },{
      path: 'course/:id',
      component: CoursehomeComponentComponent
    },{
      path: 'myCourses',
      component: MyCoursesComponent
    },{
      path: 'classroom/:id',
      component: CoursehomeComponentComponent
    }
    ,{
      path: 'category/:category',
      component: CategoryComponent
    },{
      path: 'myClassrooms',
      component: MyClassroomsComponent
    },{
      path: 'uploadPicture',
      component: UploadfileComponent
    },{
      path: 'admindashboard',
      component: AdmindashboardComponent
    },{
      path: 'childprofile/:id',
      component: ChildprofileComponent
    },{
      path: 'quizdashboard/:id',
      component: QuizdashboardComponent
    },{
      path: 'course/:id/sections',
      component: LectureComponent, children:[
        {path: 'lecture/:id', component:LectureContentsComponent}]
    }])
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
