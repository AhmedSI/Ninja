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
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SafePipe } from './safe.pipe';
import { ResultComponent } from './result/result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { StarRatingModule } from 'angular-star-rating';
import { ErrorComponent } from './error/error.component';
import { SavedComponent } from './saved/saved.component';
import { AlternativeSearchComponent } from './alternative-search/alternative-search.component';
import { ReportsComponent } from './reports/reports.component';
import { AccomplishedCoursesComponent } from './accomplished-courses/accomplished-courses.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    ReportsComponent,
    AlternativeSearchComponent,
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


    LectureContentsComponent,


    SafePipe,


    ResultComponent,

     ErrorComponent,

     SavedComponent,

     AlternativeSearchComponent,

     ReportsComponent,

     AccomplishedCoursesComponent,

     LandingComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    OwlModule, 
    PdfViewerModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    RouterModule.forRoot([{
      path:'reports/:id',
      component: ReportsComponent
    },{
      path: 'search/:course',
      component:AlternativeSearchComponent
    },{
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
      component: ClassroomhomeComponentComponent
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
      path: 'quizhome/:id',
      component: QuizhomeComponent
    },{
      path: 'courseContent/:id',
      component: LectureComponent
    },{
      path: 'quizResult/:id',
      component: ResultComponent
    },{
        path:'savedCourses',
        component: SavedComponent
    },{
      path: 'error',  
      component: ErrorComponent 
    },{   
      path: 'accomplishedCourses', 
      component: AccomplishedCoursesComponent  
    },{  
      path: 'landing', 
      component: LandingComponent  
    },{  
      path: '', 
      component: LandingComponent  
    },{  
      path: '**', 
      component: ErrorComponent
    }],
    {
        onSameUrlNavigation: 'reload'
      })
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule { }
