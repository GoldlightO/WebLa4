import {Component, OnInit} from '@angular/core';
import {User} from "../../entities/user";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  private user: User = new User();
  public message: string | null = null;

  loginForm: FormGroup;

  constructor(public authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(4)]),
      password: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(4)])
    });

  }

  ngOnInit(): void {
    //todo
  }

  public auth() {
    this.user.password = this.loginForm.get("password")?.value;
    this.user.username = this.loginForm.get("username")?.value;
    this.authService.logIn(this.user).subscribe((data) => {
      },
      (error) => {
        if (error.status == 200) {
          // @ts-ignore
            this.authService.addUser(this.user.username, "Bearer_" + error.error.text)
          this.router.navigate(['/main'])
        } else {
          this.message = error.status + ": " + error.error;
        }
      });
  }

}
