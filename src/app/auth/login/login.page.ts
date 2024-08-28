import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

interface FormGroupProps {
  document: FormControl<string | null>;
  password: FormControl<string | null>;
  isRememberMe: FormControl<boolean | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formSignIn!: FormGroup<FormGroupProps>;

  isShowPassword = false;

  submitted = false;

  constructor(private toastService: ToastService, private router: Router) {}

  onChangeShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  public isFetching: boolean = false;

  ngOnInit() {
    const documentFromLocalStorage: { document: string } = JSON.parse(
      localStorage.getItem('@login-clone:1.0.0/remember-me') ?? '{}'
    );

    this.formSignIn = new FormGroup({
      document: new FormControl(documentFromLocalStorage.document ?? '', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(/^[0-9]+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      isRememberMe: new FormControl(!!documentFromLocalStorage.document),
    });
  }

  async onSignIn() {
    try {
      this.isFetching = true;

      const userInDatabase = {
        document: '11111111111',
        password: '12345',
      };

      const isRememberMe = this.formSignIn.get('isRememberMe')?.value;
      const document = this.formSignIn.get('document')?.value;
      const password = this.formSignIn.get('password')?.value;

      if (isRememberMe) {
        localStorage.setItem(
          '@login-clone:1.0.0/remember-me',
          JSON.stringify({
            document,
          })
        );
      }

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            document === userInDatabase.document &&
            password === userInDatabase.password
          ) {
            resolve('resolve');
          } else {
            reject('CPF e ou senha Incorretos.');
          }
        }, 2000);
      });

      await this.toastService.success({
        message: 'Login realizado com sucesso',
      });

      await this.router.navigate(['home']);
    } catch (error) {
      console.error(error);

      await this.toastService.error({
        message: String(error),
      });
    } finally {
      this.isFetching = false;
    }
  }
}
