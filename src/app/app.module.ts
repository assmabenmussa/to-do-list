import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { QuillModule } from "ngx-quill";
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { TasksService } from './services/tasks.service';
import { AuthGuard } from './services/authguard';

const appRoutes: Routes = [
  {
    path: 'login', component: AuthComponent
  },
  {
    path: 'dashboard', component: TasksComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TasksComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    QuillModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
