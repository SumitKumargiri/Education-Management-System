import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {  AttendanceStatus, DetailedAttendance, Student, StudentAttendanceSummary, StudentSubjectMarks,TeacherCourseSubject, attendanceTeacherStatuses } from '../types/student';
import { sha512 } from 'js-sha512';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl="https://localhost:7166";

  
  constructor(private http:HttpClient) { }

  // ++++++++++++++++ Student services api +++++++++++++++++++++

  getStudents(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/student/getall`, data);
  }

  deleteStudent(studentId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/Student/deletebyid${studentId}`;
    return this.http.delete(deleteUrl);
  }

  addStudent(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Student/add`, formData);
  }

  userlogin(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/userlogin`,data);
  }

  studentregister(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/userregister`,data);
  }


  updateProfileImage(username: string, profileImage: string): Observable<any> {
    const payload = {username: username,profileImage: profileImage};
    return this.http.post(`${this.apiUrl}/Student/uploadProfileImage`, payload);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Student/updateProfiledetails`, data);
  }

  studentresetPassword(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Student/Resetpassword`, data);
  }


  getStudentAttendanceSummary(date: string): Observable<StudentAttendanceSummary> {
    return this.http.get<StudentAttendanceSummary>(`${this.apiUrl}/Student/studentsattendancesummary?date=${date}`);
  }


  addStudentAttendance(attendanceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Student/addstudentattendance`, attendanceData);
  }

  getAttendanceByUsername(username: string): Observable<AttendanceStatus[]> {
    return this.http.get<AttendanceStatus[]>(`${this.apiUrl}/Student/datewiseattendance${username}`);
  }

  getStudentSubjectMarks(username: string): Observable<StudentSubjectMarks[]> {
    return this.http.get<StudentSubjectMarks[]>(`${this.apiUrl}/Student/marks${username}`);
  }
  getStudentDetails(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/Student/details`);
  }

// +++++++++++++++++  Admin Services api ++++++++++++++++++++++

getAdminData(data:any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/Admin/getalladmindata`, data);
}

  login(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/adminlogin`,data);
  }
  adminregister(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/adminregister`,data);
  }


  getDistrictCounts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/dashboard/chartgraph`);
  }  
  
  adminupdateProfileImage(username: string, profileImage: string): Observable<any> {
    const payload = {username: username,profileImage: profileImage};
    return this.http.post(`${this.apiUrl}/Admin/uploadProfileImage`, payload);
  }

  adminupdateProfiledetails(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Admin/updateProfiledetails`, data);
  } 


  AdminresetPassword(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Admin/Resetpassword`, data);
  }

  addCourse(courseData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Admin/coursesubjectadd`, courseData);
  }
  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/getallcourses`);
  }

  updateCourse(course: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Admin/updateCourse/${course.id}`, course);
  }

  getSubjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/getsubject`);
  }

  addSubject(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/subjectadd`);
  }



  // +++++++++++++++  Teacher service api ++++++++++++++++++++++++++++++++


  teacherlogin(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/teacherlogin`,data);
  }

  teacherregister(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/teacherregister`,data);
  }

  getteacher(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Teacher/getall`, data);
  }

  addTeacher(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Teacher/add`, formData);
  }
  deleteTeacher(teacherId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/Teacher/deletebyid${teacherId}`;
    return this.http.delete(deleteUrl);
  }

  getAttendanceSummaryByDate(date: Date): Observable<attendanceTeacherStatuses> {
    const formattedDate = date.toISOString().split('T')[0]; 
    return this.http.get<attendanceTeacherStatuses>(`${this.apiUrl}/Teacher/teacherattendancesummary`, {params: {date: formattedDate }
    });
  }

  getDetailedAttendance(date: string): Observable<DetailedAttendance> {
    return this.http.get<DetailedAttendance>(`${this.apiUrl}/Teacher/teacherattendancesummary`, {params: { date }});
  }

    
  addTeacherAttendance(attendanceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Teacher/addteacherattendance`, attendanceData);
  }
  getTeacherAttendanceByUsername(username: string): Observable<AttendanceStatus[]> {
    return this.http.get<AttendanceStatus[]>(`${this.apiUrl}/Teacher/datewiseattendance${username}`);
  }


  getTeacherCourseSubjects(): Observable<TeacherCourseSubject[]> {
    return this.http.get<TeacherCourseSubject[]>(`${this.apiUrl}/Teacher/coursesubjects`);
  }

  uploadAssignment(firstname: string, subjectname: string, assignment: string): Observable<any> {
    const payload = {firstname: firstname,subjectname: subjectname,assignment: assignment};
    return this.http.post(`${this.apiUrl}/Teacher/assignsubject`, payload);
  }

  getTeacherSubjectAssignments(): Observable<TeacherCourseSubject[]> {
    return this.http.get<TeacherCourseSubject[]>(`${this.apiUrl}/Teacher/assignments`);
  }


  updateStudentMarks(studentMarks: StudentSubjectMarks): Observable<any> {
    return this.http.post(`${this.apiUrl}/Teacher/update`, studentMarks);
  }
}
