import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { TeacherCourseSubject } from '../../types/student';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  assignments: TeacherCourseSubject[] = [];

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments() {
    this.studentsService.getTeacherSubjectAssignments()
      .subscribe(data => {
        this.assignments = data;
      });
  }

  downloadFile(assignment: TeacherCourseSubject) {
    try {
      const base64Data = this.extractBase64(assignment.assignment);
      if (this.isValidBase64(base64Data)) {
        const blob = this.b64toBlob(base64Data, 'application/pdf');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'assignment.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Invalid base64 string:', base64Data);
      }
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  }

  viewFile(assignment: TeacherCourseSubject) {
    try {
      const base64Data = this.extractBase64(assignment.assignment);
      if (this.isValidBase64(base64Data)) {
        const blob = this.b64toBlob(base64Data, 'application/pdf');
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        console.error('Invalid base64 string:', base64Data);
      }
    } catch (error) {
      console.error('Failed to view file:', error);
    }
  }

  extractBase64(dataUrl: string): string {
    const regex = /^data:application\/pdf;base64,/;
    return dataUrl.replace(regex, '');
  }

  b64toBlob(b64Data: string, contentType: string): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  isValidBase64(str: string): boolean {
    const base64Pattern = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i;
    return base64Pattern.test(str);
  }
}
