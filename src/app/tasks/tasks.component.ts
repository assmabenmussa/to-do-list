import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  title = 'to-do-list';

  taskets: String[];

  onSubmit(task){
    this.taskets.push(task);
    this.taskets = task;
    console.log("Output: ", this.taskets)
    task.reset();
  }
}
