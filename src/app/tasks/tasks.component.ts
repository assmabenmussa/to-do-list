import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { ObservableArray } from 'rxjs-array';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  constructor (public tasksService : TasksService) {}
  
  quillConfig = {
    toolbar:  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', { 'list': 'bullet' },
     { 'list': 'ordered'},{ 'indent': '-1'}, { 'indent': '+1' },
      {'direction': 'rtl'}, { 'size': ['small', false, 'large', 'huge'] }, { 'align': [] }]
  };

  taskList: any[] = [];
  check: Boolean
  tests: any[] = ['item 1', 'item 2', 'item 3', 'item 4'];

  ngOnInit() {
  // if(localStorage.getItem('TASK')){
  //     this.task = JSON.parse(localStorage.getItem('TASK'));
  //     console.log(this.task);
  //   }
 
  this.tasksService.getAll()
    .subscribe(res => {
      console.log("Response from getAll function: ", res)
      this.taskList = res
      console.log("this.task.push(res): ", this.taskList)
    })
  }

  onSubmit(formdata){
    console.log("Specific task: ", formdata.value);
    if(this.taskList.length < 1){
      this.taskList = [{
        task: formdata.value.task
      }];
    } else {
      this.taskList.push({
        task: formdata.value.task
      })
    }
    // task.reset();
    console.log("Tasks array: ", this.taskList);
    // this.savetask();
    this.tasksService.postSpecific(formdata.value)
      .subscribe(res => {
        console.log("Response from tasks service: ", res)
      });
    formdata.reset();
  }

  savetask(){
    localStorage.setItem('TASK', JSON.stringify(this.taskList));
  }
  submitExampleForm(formdata){
    console.log("submit Example Form value: ", formdata.value);
    formdata.reset();
  }

  deleteTask(id){
    this.tasksService.delete(id)
      .subscribe(x => {
        console.log("Output from delete route coming in from server: ", x)
      })
  }
  
}
