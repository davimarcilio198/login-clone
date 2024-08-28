import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  initialNavigationItems = [
    {
      href: '/',
      name: 'Cartão Virtual',
      icon: 'carteira',
    },
    {
      href: '/',
      name: 'Guia Médico',
      icon: 'guia-medico',
    },
    {
      href: '/',
      name: 'Consulta Já',
      icon: 'consulta-ja',
    },
    {
      href: '/',
      name: 'Telemedicina',
      icon: 'telemedicina',
    },
    {
      href: '/',
      name: 'Débito em Conta',
      icon: 'debito-conta',
    },
    {
      href: '/',
      name: 'Planos',
      icon: 'planos',
    },
    {
      href: '/',
      name: 'Finanças',
      icon: 'financas',
    },
    {
      href: '/',
      name: 'Atualização Cadastral',
      icon: 'atualizacao-cadastral',
    },
    {
      href: '/',
      name: 'Ajuda',
      icon: 'ajuda',
    },
  ];

  navigationItems = this.initialNavigationItems;

  searchText = new FormControl('');

  constructor() {}

  ngOnInit() {
    this.searchText.valueChanges.subscribe((val) => {
      console.log(val);
      console.log('change');

      this.navigationItems = this.initialNavigationItems.filter((item) =>
        item.name.toLocaleLowerCase().includes((val ?? '').toLocaleLowerCase())
      );
    });
  }
}
