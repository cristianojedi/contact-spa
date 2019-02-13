import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Login } from "../models/login";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  public login: Login;
  public errors: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onAuthenticate() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      let login = Object.assign({}, this.login, this.loginForm.value);

      this.userService.authenticate(login)
        .subscribe(
          result => { this.onAuthenticateComplete(result) },
          error => { this.onErrorComplete(error) }
        );
    }
  }

  onAuthenticateComplete(res: any): void {
    // Zera os dados do formulário
    this.loginForm.reset();

    // Zera a coleção de erros
    this.errors = [];

    // Grava o e-mail e o nome no localStorage
    localStorage.setItem('user.email', res.email);
    localStorage.setItem('user.name', res.name);

    // Redireciona para a página Home
    this.router.navigate(['/']);
  }

  onErrorComplete(error: any) {
    console.log(error)
    this.errors = JSON.parse(error._body).errors;
  }
}
