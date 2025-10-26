import { NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddComponent } from './admin/student/add/add.component';
import { ListComponent } from './admin/student/list/list.component';
import { UpdateComponent } from './admin/student/update/update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminheaderbarComponent } from './layout/adminlayout/adminheaderbar/adminheaderbar.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCaptchaModule } from 'ngx-captcha';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { loginInterceptor } from './Interceptor/login.interceptor';


import { FusionChartsModule } from 'angular-fusioncharts';
import { AdminchatComponent } from './admin/adminchat/adminchat.component';
import { HomeComponent } from './admin/home/home.component';
import { AdminFooterComponent } from './layout/adminlayout/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './layout/adminlayout/admin-header/admin-header.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { FooterComponent } from './layout/outerlayout/footer/footer.component';
import { HeaderComponent } from './layout/outerlayout/header/header.component';
import { OuterlayoutComponent } from './layout/outerlayout/outerlayout.component';
import { StudentheaderComponent } from './layout/studentlayout/studentheader/studentheader.component';
import { StudentlayoutComponent } from './layout/studentlayout/studentlayout.component';
import { StudentsidebarComponent } from './layout/studentlayout/studentsidebar/studentsidebar.component';
import { AboutComponent } from './outer/about/about.component';
import { LoginFormComponent } from './outer/login-form/login-form.component';
import { OuterContactComponent } from './outer/outer-contact/outer-contact.component';
import { OuterHomeComponent } from './outer/outer-home/outer-home.component';
import { SingupFormComponent } from './outer/singup-form/singup-form.component';
import { StudentloginComponent } from './outer/studentlogin/studentlogin.component';
import { StudentsignupComponent } from './outer/studentsignup/studentsignup.component';
import { StudentComponent } from './student/student.component';
import { StudentchatComponent } from './student/studentchat/studentchat.component';
import { StudenthomeComponent } from './student/studenthome/studenthome.component';
import { StdprofileComponent } from './student/stdprofile/stdprofile.component';
import { AdminprofileupdateComponent } from './admin/adminprofileupdate/adminprofileupdate.component';
import { AdminresetpassComponent } from './admin/adminresetpass/adminresetpass.component';
import { StdresetpassComponent } from './student/stdresetpass/stdresetpass.component';
import * as jwt_decode from 'jwt-decode';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { TeacherloginComponent } from './outer/teacherlogin/teacherlogin.component';
import { TeacherlayoutComponent } from './layout/teacherlayout/teacherlayout.component';
import { TeacherregisterComponent } from './outer/teacherregister/teacherregister.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherhomeComponent } from './teacher/teacherhome/teacherhome.component';
import { TeachersidebarComponent } from './layout/teacherlayout/teachersidebar/teachersidebar.component';
import { TeacherheaderComponent } from './layout/teacherlayout/teacherheader/teacherheader.component';
import { TeacherlistComponent } from './admin/teacher/teacherlist/teacherlist.component';
import { TeacherupdateComponent } from './admin/teacher/teacherupdate/teacherupdate.component';
import { TeacheraddComponent } from './admin/teacher/teacheradd/teacheradd.component';
import { AddcoursesComponent } from './admin/course/addcourses/addcourses.component';
import { CourseComponent } from './admin/course/course.component';
import { ListcourseComponent } from './admin/course/listcourse/listcourse.component';
import { UpdatecourseComponent } from './admin/course/updatecourse/updatecourse.component';
import { StudentattendanceComponent } from './teacher/studentattendance/studentattendance.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import { TeacherchatComponent } from './teacher/teacherchat/teacherchat.component';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceComponent } from './admin/attendance/attendance.component';
import { StdattendanceComponent } from './student/stdattendance/stdattendance.component';
import { TeachersubjectassignmentComponent } from './teacher/teachersubjectassignment/teachersubjectassignment.component';
import { AssignmentComponent } from './student/assignment/assignment.component';
import { StdsubjectComponent } from './student/stdsubject/stdsubject.component';
import { StudentmarksComponent } from './student/studentmarks/studentmarks.component';
import { StudentfooterComponent } from './layout/studentlayout/studentfooter/studentfooter.component';
import { AddstudentsmarksComponent } from './teacher/addstudentsmarks/addstudentsmarks.component';
import { TeacherfooterComponent } from './layout/teacherlayout/teacherfooter/teacherfooter.component';

import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AppComponent,
    OuterlayoutComponent,
    OuterContactComponent,
    FooterComponent,
    HeaderComponent,
    LoginFormComponent,
    AdminlayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AddComponent,
    ListComponent,
    UpdateComponent,
    HomeComponent,
    OuterHomeComponent,
    AdminheaderbarComponent,
    SingupFormComponent,
    AboutComponent,
    StudentlayoutComponent,
    // StudentloginComponent,
    StudentsignupComponent,
    StudentComponent,
    StudenthomeComponent,
    StudentsidebarComponent,
    StudentheaderComponent,
    AdminchatComponent,
    StudentchatComponent,
    StdprofileComponent,
    AdminprofileupdateComponent,
    AdminresetpassComponent,
    StdresetpassComponent,
    // TeacherloginComponent,
    TeacherlayoutComponent,
    TeacherregisterComponent,
    TeacherComponent,
    TeacherhomeComponent,
    TeachersidebarComponent,
    TeacherheaderComponent,
    TeacherlistComponent,
    TeacherupdateComponent,
    TeacheraddComponent,
    AddcoursesComponent,
    CourseComponent,
    ListcourseComponent,
    UpdatecourseComponent,
    StudentattendanceComponent,
    TeacherchatComponent,
    AttendanceComponent,
    StdattendanceComponent,
    TeachersubjectassignmentComponent,
    AssignmentComponent,
    StdsubjectComponent,
    StudentmarksComponent,
    StudentfooterComponent,
    AddstudentsmarksComponent,
    TeacherfooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxChartsModule,
    FusionChartsModule,
    FontAwesomeModule,
    MatTabsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    // JwtModule.forRoot({ 
    //   config: {
    //     tokenGetter: () => localStorage.getItem('token'),
    //     allowedDomains: ['localhost:7166'] 
    //   }
    // })
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [
    provideToastr(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: loginInterceptor,
      multi: true
    },
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faDownload, faEye);
  }
}
