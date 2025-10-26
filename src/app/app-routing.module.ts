import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { OuterlayoutComponent } from './layout/outerlayout/outerlayout.component';

import { UpdateComponent } from './admin/student/update/update.component';
import { ListComponent } from './admin/student/list/list.component';
import { HomeComponent } from './admin/home/home.component';
import { AddComponent } from './admin/student/add/add.component';
import { AdminchatComponent } from './admin/adminchat/adminchat.component';
import { StudentlayoutComponent } from './layout/studentlayout/studentlayout.component';
import { StudenthomeComponent } from './student/studenthome/studenthome.component';
import { StudentchatComponent } from './student/studentchat/studentchat.component';
import { AboutComponent } from './outer/about/about.component';
import { LoginFormComponent } from './outer/login-form/login-form.component';
import { OuterContactComponent } from './outer/outer-contact/outer-contact.component';
import { OuterHomeComponent } from './outer/outer-home/outer-home.component';
import { SingupFormComponent } from './outer/singup-form/singup-form.component';
import { StudentloginComponent } from './outer/studentlogin/studentlogin.component';
import { StudentsignupComponent } from './outer/studentsignup/studentsignup.component';
import { StdprofileComponent } from './student/stdprofile/stdprofile.component';
import { AdminresetpassComponent } from './admin/adminresetpass/adminresetpass.component';
import { AdminprofileupdateComponent } from './admin/adminprofileupdate/adminprofileupdate.component';
import { StdresetpassComponent } from './student/stdresetpass/stdresetpass.component';
import { TeacherlayoutComponent } from './layout/teacherlayout/teacherlayout.component';
import { TeacherhomeComponent } from './teacher/teacherhome/teacherhome.component';
import { TeacherloginComponent } from './outer/teacherlogin/teacherlogin.component';
import { TeacherregisterComponent } from './outer/teacherregister/teacherregister.component';
import { TeacherlistComponent } from './admin/teacher/teacherlist/teacherlist.component';
import { TeacheraddComponent } from './admin/teacher/teacheradd/teacheradd.component';
import { TeacherupdateComponent } from './admin/teacher/teacherupdate/teacherupdate.component';
import { AddcoursesComponent } from './admin/course/addcourses/addcourses.component';
import { ListcourseComponent } from './admin/course/listcourse/listcourse.component';
import { UpdatecourseComponent } from './admin/course/updatecourse/updatecourse.component';
import { StudentattendanceComponent } from './teacher/studentattendance/studentattendance.component';
import { TeacherchatComponent } from './teacher/teacherchat/teacherchat.component';
import { AttendanceComponent } from './admin/attendance/attendance.component';
import { StdattendanceComponent } from './student/stdattendance/stdattendance.component';
import { TeachersubjectassignmentComponent } from './teacher/teachersubjectassignment/teachersubjectassignment.component';
import { AssignmentComponent } from './student/assignment/assignment.component';
import { StdsubjectComponent } from './student/stdsubject/stdsubject.component';
import { StudentmarksComponent } from './student/studentmarks/studentmarks.component';
import { AddstudentsmarksComponent } from './teacher/addstudentsmarks/addstudentsmarks.component';



const routes: Routes = [
// +++++++++++ Admin page +++++++++++++
  { 
    path: 'admin',
    component: AdminlayoutComponent, 
    children: [
      // { path: 'profile', component: , outlet: 'sidebar' },
      { path: 'home', component: HomeComponent },
      { path: 'student/add', component: AddComponent },
      { path: 'student/update/:id', component: UpdateComponent },
      { path: 'student/list', component: ListComponent },
      { path: 'adminchat', component: AdminchatComponent },
      { path: 'attendance', component: AttendanceComponent},
      { path: 'course/addcourses', component: AddcoursesComponent },
      { path: 'course/listcourse', component: ListcourseComponent },
      { path: 'course/updatecourse/:id', component: UpdatecourseComponent },
      {path:'adminprofileupdate',component:AdminprofileupdateComponent},
      {path:'adminresetpass',component:AdminresetpassComponent},
      { path: 'teacher/teacherlist', component: TeacherlistComponent },
      {path:'teacher/teacheradd',component:TeacheraddComponent},
      {path:'teacher/teacherupdate/:id',component:TeacherupdateComponent},
      { path: '', redirectTo: 'home', pathMatch:'full' }
    ]
},


// +++++++++++++++++ Student page +++++++++++++++++++++++++++

  {
    path:'student',
    component:StudentlayoutComponent,
    children:[
      {path:'studenthome',component:StudenthomeComponent},
      {path:'studentchat',component:StudentchatComponent},
      {path:'stdprofile',component:StdprofileComponent},
      {path:'stdresetpass',component:StdresetpassComponent},
      {path:'stdattendance',component:StdattendanceComponent},
      {path:'assignment',component:AssignmentComponent},
      {path:'stdsubject',component:StdsubjectComponent},
      {path:'studentmarks',component:StudentmarksComponent},
      {path:'',redirectTo:'home',pathMatch:'full'}
    ]
  },

  // +++++++++++++++++ Teacher page +++++++++++++++++++++++++++

  {
    path:'teacher',
    component:TeacherlayoutComponent,
    children:[
      {path:'teacherhome',component:TeacherhomeComponent},
      {path:'student/list',component:ListComponent},
      {path:'studentattendance',component:StudentattendanceComponent},
      {path:'addstudentsmarks',component:AddstudentsmarksComponent},
      {path:'teacherchat',component:TeacherchatComponent},
      {path:'teachersubjectassignment',component:TeachersubjectassignmentComponent},
      {path:'',redirectTo:'home',pathMatch:'full'}
    ]
  },
  // +++++++++++ outer page/Home page +++++++++++++++++++
  { 
    path: '',
    component: OuterlayoutComponent, 
    children: [
      {path:'outer-home', component:OuterHomeComponent},
      {path:'outer-contact', component:OuterContactComponent},
      {path:'about', component:AboutComponent},
      {path:'login-form', component:LoginFormComponent},
      {path:'singup-form', component:SingupFormComponent},
      // {path:'studentlogin', component:StudentloginComponent},
      {path:'studentsignup', component:StudentsignupComponent},
      // {path:'teacherlogin', component:TeacherloginComponent},
      {path:'teacherregister', component:TeacherregisterComponent},
      { path: '', redirectTo: 'outer-home', pathMatch:'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
