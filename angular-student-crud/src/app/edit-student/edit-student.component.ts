import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  public editForm: FormGroup;
  studentRefe: any;

 constructor(
   public studentService: StudentService,
   public formBuilder: FormBuilder,
   private act: ActivatedRoute,
   private router: Router
 ) { 
   this.editForm = this.formBuilder.group({
     name: [''],
     email:[''],
     student_course: [''],
     fees : ['']
   })
 }

 ngOnInit(): void {
   const id = this.act.snapshot.paramMap.get('id');

   this.studentService.getStudenDoc(id).subscribe(res => {
     this.studentRefe = res;
     this.editForm = this.formBuilder.group({
       name:[this.studentRefe.name],
       email:[this.studentRefe.email],
       student_course:[this.studentRefe.student_course],
       fees:[this.studentRefe.fees]
     })
   })
  }

  obSubmit(){
    const id = this.act.snapshot.paramMap.get('id');

    this.studentService.updateStudent(this.editForm.value, id);
    this.router.navigate(['list-student']);

 };

}
