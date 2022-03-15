import {Component, OnInit} from '@angular/core';
import {User} from "../../entities/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  private user: User = new User();
  public message: string | null = null;
  registerForm: FormGroup;

  constructor(public authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(4)]),
      password: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(4)])
    })
  }

  ngOnInit(): void {
  }

  public addNewAccount() {
    this.user.password = this.registerForm.get("password")?.value;
    this.user.username = this.registerForm.get("username")?.value;
    this.authService.register(this.user).subscribe((data) => {
        this.message = "REGISTERED! " + this.user.username;
      },
      (error) => {
        this.message = error.status + ": " + error.error;
      });
  }

}
