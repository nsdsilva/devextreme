import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxSelectBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';
import { EstadoCidadeService } from 'src/app/shared/services/estado-cidade.service';

import notify from 'devextreme/ui/notify';
import { Estado } from 'src/app/shared/interfaces/estado';
import { Cidade } from 'src/app/shared/interfaces/cidade';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss']
})
export class SelectboxComponent {

  estado: Estado[] = [];
  cidade: Cidade[] = [];
  estadoSelecionado: any;


  constructor(private service: EstadoCidadeService) {
    this.listaEstados();
  }

  listaEstados() {
    this.service.listarEstado().subscribe((estados: Estado[]) => {
      this.estado = estados;
    });
  }


  ListaCidade(siglaEstado: string): void {
    this.estadoSelecionado = siglaEstado;

    if (this.estadoSelecionado) {
      this.service.listarCidade(this.estadoSelecionado).subscribe((cidades) => {
        this.cidade = cidades;
      });
    } else {
      this.cidade = [];
    }
  }


  onValueChangedCidade(e: any) {
    notify(`The value is changed to: "${e.value}"`);
  }
}



@NgModule({
  imports: [  BrowserModule, DxSelectBoxModule, DxTextBoxModule, DxTemplateModule ],
  exports: [ SelectboxComponent ],
  declarations: [ SelectboxComponent ]
})
export class SelectboxModule {}
