import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore/'; 
import { Student } from './student.model';



@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private angularFirestore: AngularFirestore) { }

 getStudenDoc(id){
 return this.angularFirestore
 .collection('student-collection')
 .doc(id)
 .valueChanges()
}

getStudentList(){
  return this.angularFirestore
  .collection("student-collection")
  .snapshotChanges();
}

createStuden(student: Student){
  return new Promise<any>((resolve,reject) =>{
    this.angularFirestore
    .collection("student-collection")
    .add(student)
    .then(response => {console.log(response)}, error => reject (error));
  });
}

deleteStudent(student){
  return this.angularFirestore
  .collection("student-collection")
  .doc(student.id)
  .delete();
}

updateStudent(Student: Student,id){
  return this.angularFirestore
  .collection("student-collection")
  .doc(id)
  .update({
  name: Student.name,
  email: Student.email,
  Student_course: Student.student_course,
  fees: Student.fees
});
}

}
