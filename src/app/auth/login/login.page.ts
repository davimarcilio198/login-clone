import { Component, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

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

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

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
            reject('Usuário não autenticado');
          }
        }, 2000);
      });

      const toast = await this.toastController.create({
        message: 'Login realizado',
        color: 'success',
        position: 'bottom',
        duration: 1500,
      });

      await toast.present();
      await this.router.navigate(['home']);
    } catch (error) {
      console.error(error);

      const toast = await this.toastController.create({
        message: String(error),
        color: 'danger',
        position: 'bottom',
        duration: 1500,
      });
      await toast.present();
    } finally {
      this.isFetching = false;
    }
  }
}
