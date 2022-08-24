import { NgModule } from '@angular/core';
import {
  ButtonModule,
  FormFieldModule,
  IconModule,
  InputModule,
  ListModule,
  NavbarModule,
  ProgressIndicatorsModule,
  TileModule,
  ToasterModule,
} from '@healthcatalyst/cashmere';

@NgModule({
  exports: [
    NavbarModule,
    ButtonModule,
    IconModule,
    FormFieldModule,
    InputModule,
    TileModule,
    ToasterModule,
    ListModule,
    ProgressIndicatorsModule,
  ],
})
export class CashmereModule {}
