import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isOn: boolean;
  loading: boolean;

  constructor(private authService: AuthService,
              private router: Router) {  }

  ngOnInit() {
    this.isOn = !this.isOn
  }

  onSubmit(authForm){
    this.loading = true
    this.authService.login(authForm.value.email, authForm.value.password)
      .subscribe(res => {
        console.log("User data coming in from authService: ", res);
        this.router.navigate(['/dashboard'])
        this.loading = false;
      });
    console.log("Data coming in the form html file: ", authForm.value)
  }
}
