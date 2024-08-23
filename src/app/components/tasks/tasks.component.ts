import { Component } from '@angular/core';
import { Task } from '../../task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private firestore: AngularFirestore
  ) {}

  showMessage = false;
  submitted = false;
  todo: Task[] = [
    // {
    //   title: 'Buy milk',
    //   description: 'Go to the store and buy milk',
    //   list: '',
    // },
    // {
    //   title: 'Drawing on canvas',
    //   description: 'buy 3 canvas and pens!',
    //   list: '',
    // },
  ];
  inProgress: Task[] = [];
  done: Task[] = [];
  addTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  get title() {
    return this.addTaskForm.get('title')!;
  }
  get description() {
    return this.addTaskForm.get('description')!;
  }
  onSubmit(): void {
    this.submitted = false;
    if (this.addTaskForm.invalid) return;
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) return;
    if (!event.container.data || !event.previousContainer.data) return;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // console.log(event.container)//all parameters
    // console.log(event.container.id)//todo, inProgress, done
    // console.log(event.container.data)//data of new array
    // event.container.data[0].list = event.container.id;
    // We want to update on firebase the status of mission
    this.update(event.container.data[0]);
  }

  getAllTask() {
    let userDoc = this.firestore.firestore.collection('tasks');
    userDoc.get().then((querySnapshot: any) => {
      querySnapshot.forEach(
        (doc: {
          id: any;
          data: () => { (): any; new (): any; [x: string]: any };
        }) => {
          console.log(doc.id, '=>', doc.data());

          let t1: Task = {
            id: doc.id,
            title: doc.data()['title'],
            description: doc.data()['description'],
            list: doc.data()['list'],
          };

          if (t1.list === 'todo') this.todo.push(t1);
          else if (t1.list === 'inProgress') this.inProgress.push(t1);
          else if (t1.list === 'done') this.done.push(t1);
        }
      );
    });
  }

  ngOnInit(): void {
    this.getAllTask();

    this.taskService.firestoreCollection.valueChanges().subscribe((item) => {
      this.tasks = item;
    });
  }

  deleteIt(list: string, task: Task) {
    // Call service function and update the correct list
    this.taskService.deleteTask(task).then((res: any) => {
      if (list === 'todo') {
        var index = this.todo.indexOf(task);
        this.todo.splice(index, 1);
      } else if (list === 'inProgress') {
        var index = this.inProgress.indexOf(task);
        this.inProgress.splice(index, 1);
      } else if (list === 'done') {
        var index = this.inProgress.indexOf(task);
        this.done.splice(index, 1);
      }
    });
  }

  addTask() {
    let title = this.addTaskForm.value['title'];
    let description = this.addTaskForm.value['description'];
    let t: Task = {
      title: title,
      description: description,
      list: 'todo',
    } as Task;
    this.taskService.addTask(t).then((res: { id: string | undefined }) => {
      // Call addTask service
      console.log(res.id);
      t.id = res.id; // Update id of local task
      this.todo.push(t); // Push the task to "todo" list
    });
  }

  update(task: Task) {
    this.taskService.update(task).then((res: any) => {
      console.log(res);
    });
  }

  editTask(a: any, b: any) {}
}
