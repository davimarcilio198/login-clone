import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface FormGroupProps {
  option: FormControl<string | null>;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  constructor() {}

  public items: string[] = [];

  form!: FormGroup<FormGroupProps>;

  public addTodo() {
    const option = this.form.get('option')?.value;

    if (!!option) {
      this.items.push(option);
      localStorage.setItem('todo', JSON.stringify(this.items));
      this.form.reset();
    }
  }

  public remove(item: string) {
    this.items = this.items.filter((e) => e !== item);
    localStorage.setItem('todo', JSON.stringify(this.items));
  }

  ngOnInit() {
    this.form = new FormGroup({
      option: new FormControl('', [Validators.required]),
    });

    this.items = JSON.parse(localStorage.getItem('todo') ?? '[]');
  }
}
