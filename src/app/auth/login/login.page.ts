import { Component, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface FormGroupProps {
  document: FormControl<string | null>;
  password: FormControl<string | null>;
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
    private alertController: AlertController,
    private router: Router
  ) {}

  onChangeShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  public isFetching: boolean = false;

  ngOnInit() {
    this.formSignIn = new FormGroup({
      document: new FormControl('', [
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
    });
  }

  async onSignIn() {
    try {
      this.isFetching = true;
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      const alert = await this.alertController.create({
        message: 'Login realizado',
        cssClass: 'alert-success',
      });

      await alert.present();
      await this.router.navigate(['tabs']);
    } catch (error) {
      console.error(error);

      const alert = await this.alertController.create({
        message: String(error),
      });
      await alert.present();
    } finally {
      this.isFetching = false;
    }
  }
}
