export interface Task {
  id?: string;
  title: string;
  description: string;
  list: 'todo' | 'inProgress' | 'done';
}
