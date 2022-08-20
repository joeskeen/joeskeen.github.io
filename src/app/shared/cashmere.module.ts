import { NgModule } from '@angular/core';
import {
  ButtonModule,
  FormFieldModule,
  IconModule,
  NavbarModule,
  TileModule,
} from '@healthcatalyst/cashmere';

@NgModule({
  exports: [
    NavbarModule,
    ButtonModule,
    IconModule,
    FormFieldModule,
    TileModule,
  ],
})
export class CashmereModule {}
