import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  model = {
    task: '',
    checked: false,
  };
  
  taskets: any[] = [];

  ngOnInit() {
  if(localStorage.getItem('TASK')){
      this.taskets = JSON.parse(localStorage.getItem('TASK'));
      console.log(this.taskets);
    }
  }

  onSubmit(formdata){
    console.log("Specific task: ", formdata.value);
    if(this.taskets.length < 1){
      this.taskets = [{
        task: formdata.value.task,
        description: formdata.value.description,
        checked: false,
      }];
    } else {
      this.taskets.push({
        task: formdata.value.task,
        description: formdata.value.description,
        checked: false,
      });
    }
    // task.reset();
    console.log("Tasks array: ", this.taskets);
    this.saveTaskets();
  }

  saveTaskets(){
    localStorage.setItem('TASK', JSON.stringify(this.taskets));
  }
  submitExampleForm(formdata){
    console.log("submit Example Form value: ", formdata.value);
    formdata.reset();
  }
  
}
