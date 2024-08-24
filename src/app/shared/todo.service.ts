import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Task } from '../task';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  firestoreCollection: AngularFirestoreCollection;

  // constructor(private firestore: AngularFirestore) {
  //   this.firestoreCollection = firestore.collection('todos');
  // }

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('tasks');
  }

  addTodo(title: string, description: string) {
    const id = this.firestore.createId();

    const params: Task = {
      id,
      title,
      description,
      list: 'todo',
    };
    this.firestore.collection<Task>('tasks').doc(id).set(params);

    // addTodo(title: string, description: string) {
    //   const id = this.firestore.createId();

    //   const params: Task = {
    //     id,
    //     title,
    //     description,
    //     list: 'todo',
    //   };

    // this.firestoreCollection.add({
    //   id,
    //   title,
    //   description,
    //   list: 'todo',
    // });
    // this.firestore.collection<Task>('todos').doc(id).set(params);
  }

  updateTodoStatus(id: string, newStatus: boolean) {
    this.firestoreCollection.doc(id).update({ isDone: newStatus });
  }

  deleteTodo(id: string) {
    this.firestoreCollection.doc(id).delete();
  }
}
