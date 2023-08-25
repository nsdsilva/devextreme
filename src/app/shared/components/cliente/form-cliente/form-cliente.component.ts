import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxBulletModule, DxButtonModule, DxFormComponent, DxFormModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';
import { Location } from '@angular/common';


import notify from 'devextreme/ui/notify';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';



@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

  @ViewChild(DxFormComponent, { static: false }) form! : DxFormComponent;

  cliente!: Cliente;
  isPredefined = true;
  predefinedPosition = 'bottom center';
  direction = 'up-push';
  sucesso: string[] = ['success'];

  coordinatePosition: object = {
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  };


  constructor(private service: ClienteService,
              private location: Location) {}



  ngOnInit(): void {
    this.cliente = { id: 0, nome: '', codigo: '' };
  }


  ngAfterViewInit() {
    this.form.instance.validate();
  }



  voltar(): void {
    this.location.back();
  }


  cancelar(): void {
    this.form.instance.resetValues();
  }


  onChangeClienteNome(nome: any) {
    console.log(nome);
  }


  salvar() {
    this.service.salvarClientes(this.cliente).subscribe(resposta => {
      if (resposta) {
        this.showSucesso();
        this.voltar();
      }
    });
  }


  showSucesso() {
    const position: any = this.isPredefined ? this.predefinedPosition : this.coordinatePosition;
    const direction: any = this.direction;

    notify({
      message: 'Cliente Salvo com sucesso!',
      height: 45,
      width: 500,
      minWidth: 150,
      type: this.sucesso[Math.floor(Math.random() * 4)],
      displayTime: 3500,
      animation: {
        show: {
          type: 'fade', duration: 400, from: 0, to: 1,
        },
        hide: { type: 'fade', duration: 40, to: 0 },
      },
    },
    { position, direction });
  }
}



@NgModule({
  imports: [  BrowserModule, DxTemplateModule, DxBulletModule, DxButtonModule, DxFormModule,  DxTextBoxModule ],
  exports: [ FormClienteComponent ],
  declarations: [ FormClienteComponent ]
})
export class FormClienteModule {}

