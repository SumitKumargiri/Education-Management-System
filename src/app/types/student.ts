export interface Student{
  id:number;
  username:string;
  firstname:string;
  lastname:string;
  email:string;
  districtname:string;
  districtcode:number;
  statename:string;
  statecode:number;
  mobile:number;
  gender:string;
  
  departmentname: string;
  departmentid: number;
  subjectname: string | null;
  subjectid: number | null;

  marks?: number;
  a1marks?: number;
  a2marks?: number;
  a3marks?: number;
}

export interface DistrictCount {
    districtname: string;
    district_count: number;
  }


// +++++++++++++++++ using for chat  +++++++++++

  export interface ChatMessage {
    user: string;
    message: string;
    read: boolean;
  }




  export interface ResetPasswordModel {
    oldPassword: string;
    newPassword: string;
  }


  //+++++++++++++++++  using for the teacher ++++++++++++++

  export interface teacher{
    status: string;
    id:number;
    firstname:string;
    lastname:string;
    username:string;
    email:string;
    gender:string;
    districtname:string;
    districtcode:number;
    statename:string;
    statecode:number;
    mobile:number;
    qualifications:string;
  }


  // attendance-summary.model.ts

  export interface AttendanceStatus {
    teacherId: any;
    studentId:any;
    username:string;
    status: string;
    date: string;
    departmentName:string;
  }
  
  
  export interface attendanceTeacherStatuses {
    AttendanceStatuses: any;
    attendanceTeacherStatuses: AttendanceStatus[];
    totalPresent: number;
    totalAbsent: number;
  }
  export interface StudentAttendanceSummary {
    attendanceDetails: any;
    AttendanceStatuses: any;
    attendanceStatuses: AttendanceStatus[];
    totalPresent: number;
    totalAbsent: number;
  }

  export interface attendanceStatuses{
    AttendanceStatuses: any;
    attendanceStatuses:AttendanceStatus[];
    totalPresent:number;
    totalAbsent:number;
  }



  
export interface DetailedAttendance {
  teacherId: number;
  studentId:number;
  attendanceStatus: string;
  username:string;
  date:string
}


export interface TeacherCourseSubject {
  username:string;
  firstname: string;
  lastname: string;
  name: string;
  subjectname: string;
  assignment:string;
  departmentname:string;
  semester:number;
  marks: number;
}

export interface StudentSubjectMarks {
  firstname: string;
  departmentname: string;
  subjectname: string;
  marks: number;
  a1marks:number;
  a2marks:number;
  a3marks:number;
}






  




  
  
  
