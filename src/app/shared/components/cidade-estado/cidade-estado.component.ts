import { NgModule, Component, Output, EventEmitter } from '@angular/core';
import { Estado } from '../../interfaces/estado';
import { Cidade } from '../../interfaces/cidade';
import { EstadoCidadeService } from '../../services/estado-cidade.service';
import { BrowserModule } from '@angular/platform-browser';
import { DxSelectBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-cidade-estado',
  templateUrl: './cidade-estado.component.html',
  styleUrls: ['./cidade-estado.component.scss']
})
export class CidadeEstadoComponent {

  @Output() eventoCidade = new EventEmitter<Cidade>();
  @Output() eventoEstado = new EventEmitter<Estado>();


  estado: any[] = [];
  cidade: Cidade[] = [];
  estadoSelecionado: any;
  estadoPadrao: string = 'MG';


  constructor(private service: EstadoCidadeService) {
    this.listaEstados();
  }



  listaEstados() {
    this.service.listarEstado().subscribe((estados: Estado[]) => {
      this.estado = estados.map(nome => ({
        display: `${nome.nome} - ${nome.sigla}`
      }));
      this.listarCidadesDoEstadoPadrao();
    });
  }


  ListaCidade(siglaEstado: string): void { //listando as cidades quando é alterado o estado selecionado do seu valor padrão
    this.estadoSelecionado = siglaEstado;
    this.eventoEstado.emit(this.estadoSelecionado);

    if (this.estadoSelecionado) {
      this.service.listarCidade(this.estadoSelecionado).subscribe((cidades) => {
        this.cidade = cidades;
      });
    } else {
      this.cidade = [];
    }
  }


  listarCidadesDoEstadoPadrao() { //listando as cidades quando eu tenho um valor padrão no meu selectbox
    this.estadoSelecionado = this.estadoPadrao;
    this.eventoEstado.emit(this.estadoSelecionado);

    this.service.listarCidade(this.estadoPadrao).subscribe((data: any[]) => {
      this.cidade = data;
    });
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

