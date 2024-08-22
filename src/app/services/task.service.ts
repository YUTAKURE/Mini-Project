import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { Task } from '../task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}
  addTask(task: Task) {
    let userDoc = this.firestore.firestore.collection('tasks').add(task);
    return userDoc;
  }

  getAllTasks(): Observable<any> {
    return of(this.firestore.collection('tasks').get());
  }

  update(task: Task) {
    return this.firestore
      .collection('tasks')
      .doc(task.id)
      .update({ list: task.list });
    // Update list with 'todo' or 'done' or 'in Progress'
  }

  deleteTask(task: Task) {
    return this.firestore
      .collection('tasks')
      .doc(task.id) // According to id
      .delete();
  }
}
