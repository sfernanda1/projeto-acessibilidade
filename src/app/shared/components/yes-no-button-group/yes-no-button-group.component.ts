import { UniqueIdService } from './../../services/unique-id/unique-id.service';
import { Component, Input, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers:[
    {
      //NG_VALUE_ACCESSOR é um injection token que marca nosso componente para que seja injetado dentro da infraestrutura do formGroup.
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      //forwardRef é usado quando o token ao qual precisamos nos referir para fins de DI é declarado, mas ainda não definido.
      useExisting: forwardRef(() => YesNoButtonGroupComponent)
    }
  ]
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {

  @Input() public value : string = null;
  @Input() public label ='';
  //Para avisar quando ocorre modificação dos valores
  @Output() public valueChange = new EventEmitter<string>();
  public options = YesNoButtonGroupOptions

  public onChange = (value: string) =>{};
  public onTouched = () =>{};

  public id: string = null;

  constructor(uniqueIdService: UniqueIdService) { }
  ngOnInit(): void {
    //Para gerar id único
    this.id = this.uniqueIdService.generateUniqueIdWithPrefix(`yes-no-button-group`)
  }

  public writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }



  public activate(value: string): void{
    this.writeValue(value);
  }

}

enum YesNoButtonGroupOptions{
  YES ='yes',
  NO = 'no'
}
