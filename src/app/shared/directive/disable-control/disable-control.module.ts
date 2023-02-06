import { DisabledControlDirective } from './disable-control-directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [DisabledControlDirective],
  imports: [CommonModule],
  exports: [DisabledControlDirective]
})

export class DisabledControlModule{

}
