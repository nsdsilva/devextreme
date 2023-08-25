import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { lastValueFrom } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import { EditCanceledEvent, SavedEvent } from 'devextreme/ui/data_grid';



@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.scss']
})
export class ListClienteComponent implements OnInit {

  dataSource: Cliente[] = [];
  cliente: Cliente =  { id: 0, nome: '', codigo: '' };


  constructor(private service: ClienteService,
              private router: Router) {}



  ngOnInit(): void {
    this.listaCliente();
  }



  onEditCanceled(e: EditCanceledEvent): void {
    //fecha a tela (botão de cancelar)
  }



  onSaved(e: any): void {
    console.log('salvei', e);
  }


  listaCliente() {
    this.service.listaClientes().subscribe((resposta: Cliente[]) => {
      console.log(resposta);
      this.dataSource = resposta;
    })
  }


  novoCliente() {
    this.router.navigate(['/novo-cliente']);
  }


  editarCliente(e: any) {
    console.log('cliquei');
  }


}





@NgModule({
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule ],
  exports: [ ListClienteComponent ],
  declarations: [ ListClienteComponent ]
})
export class ListClienteModule {}
