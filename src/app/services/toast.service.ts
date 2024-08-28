import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async success({ message }: { message: string }) {
    const toast = await this.toastController.create({
      message: message,
      color: 'success',
      position: 'bottom',
      duration: 1500,
    });

    await toast.present();
  }
  async error({ message }: { message: string }) {
    const toast = await this.toastController.create({
      message: message,
      color: 'danger',
      position: 'bottom',
      duration: 1500,
    });

    await toast.present();
  }
}
