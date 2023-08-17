import { NgModule, Component, Output, EventEmitter, Input } from '@angular/core';
import { Estado } from '../../interfaces/estado';
import { Cidade } from '../../interfaces/cidade';
import { EstadoCidadeService } from '../../services/estado-cidade.service';
import notify from 'devextreme/ui/notify';
import { BrowserModule } from '@angular/platform-browser';
import { DxSelectBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-cidade-estado',
  templateUrl: './cidade-estado.component.html',
  styleUrls: ['./cidade-estado.component.scss']
})
export class CidadeEstadoComponent {

  @Output() eventoCidade = new EventEmitter<Cidade>();
  @Output() eventoEstado = new EventEmitter<Estado>;


  estado: Estado[] = [];
  cidade: Cidade[] = [];
  estadoSelecionado: any;
  teste: any;


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
    this.teste = this.eventoEstado.emit(this.estadoSelecionado);

    if (this.estadoSelecionado) {
      this.service.listarCidade(this.estadoSelecionado).subscribe((cidades) => {
        this.cidade = cidades;
      });
    } else {
      this.cidade = [];
    }
  }


  selecionarCidade(value: Cidade) {
    this.eventoCidade.emit(value);
  }
}



  @NgModule({
    imports: [  BrowserModule, DxSelectBoxModule, DxTextBoxModule, DxTemplateModule ],
    exports: [ CidadeEstadoComponent ],
    declarations: [ CidadeEstadoComponent ]
  })
  export class CidadeEstadoModule {}

