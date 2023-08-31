import { Nota } from './../../../interfaces/nota';
import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DxAutocompleteModule, DxBulletModule, DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormComponent, DxFormModule, DxNumberBoxModule, DxPopupModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';

import notify from 'devextreme/ui/notify';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { NotaService } from 'src/app/shared/services/nota.service';
import { Location } from '@angular/common';
import { ItensModule } from '../../itens/itens.component';
import { Cliente } from '../../../interfaces/cliente';

import { Itens } from '../../../interfaces/itens';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-form-nota',
  templateUrl: './form-nota.component.html',
  styleUrls: ['./form-nota.component.scss']
})
export class FormNotaComponent implements OnInit {

  @ViewChild(DxFormComponent, { static: false }) form! : DxFormComponent;


  notas!: Nota;
  listaClientes: Cliente[] = [];
  clienteSalvo?: string;
  dataSource: Itens[] = [];
  dataSourceProdutos: any[] = [];
  nome = '';


  constructor(private clienteService: ClienteService,
              private produtoService: ProdutoService,
              private service: NotaService,
              private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.notas = {id: 0, cliente: {}, itens: [], numero: 0, data: new Date(), valor_total: 0};

    this.service.getById(this.activatedRoute.snapshot.params['id']).subscribe(
      notas => {
        this.notas = notas;
        this.dataSource = notas.itens;

        for (const i of notas.itens) {
          const produto = i.produto?.descricao;
          this.dataSourceProdutos.push(produto);
          console.log(this.dataSourceProdutos);
        }

        this.clienteSalvo = this.notas.cliente.nome;
        console.log(this.clienteSalvo);
      });

      this.updateProdutoInfo();
  }


  updateClientesInfo(e: any) {
    const cliente = e.value;

      this.clienteService.getByNome(cliente).subscribe((resultado) => {
          this.listaClientes = resultado;
      });
  }


  updateProdutoInfo() {
    this.produtoService.listarProdutos().subscribe(produtos => {
      this.dataSourceProdutos = produtos;
    });
  }


  novoCliente() {
    this.router.navigate(['/novo-cliente']);
  }


  salvar() {

  }


  cancelar() {
    this.form.instance.resetValues();
  }


  voltar() {
    this.location.back();
  }
}




@NgModule({
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule,DxFormModule,
              DxNumberBoxModule, DxTextBoxModule,DxAutocompleteModule, DxDateBoxModule, ItensModule, DxPopupModule ],
  exports: [ FormNotaComponent ],
  declarations: [ FormNotaComponent ]
})
export class FormNotaModule {}

