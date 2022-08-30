import { ElementSchemaRegistry } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HcToasterService } from '@healthcatalyst/cashmere';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
  OnInitActions,
} from '@paypal/paypal-js';
import { PayPalService } from './paypal.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit, AfterViewInit {
  @ViewChild('paypalButtonContainer', { static: true })
  paypalButtonContainer?: ElementRef;

  readonly amountControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\$?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/),
  ]);
  readonly memoControl = new FormControl('');

  constructor(
    private paypalService: PayPalService,
    private toasterService: HcToasterService
  ) {}

  ngOnInit(): void {}

  async ngAfterViewInit() {
    const element = this.paypalButtonContainer!.nativeElement;
    const paypal = await this.paypalService.getPayPal();
    paypal.Buttons!({
      style: {
        color: 'blue',
        layout: 'vertical',
        label: 'pay',
        shape: 'pill',
      },
      createOrder: (_, actions) => this.createOrder(actions),
      onApprove: async (data, actions) => this.onApproved(data, actions),
      onInit: (_, actions) => {
        this.setButtonEnabled(actions);

        this.amountControl.statusChanges.subscribe(() =>
          this.setButtonEnabled(actions)
        );
      },
      onClick: () => {
        if (this.amountControl.invalid) {
          this.toasterService.addToast({
            type: 'alert',
            header: 'Oops!',
            body: 'Please fill out the form before clicking Pay',
          });
        }
      },
    }).render(element);
  }

  createOrder(actions: CreateOrderActions): Promise<string> {
    const amount: string = this.amountControl.value!;
    return actions.order.create({
      purchase_units: [{ amount: { value: amount, currency_code: 'USD' } }],
    });
  }

  async onApproved(data: OnApproveData, actions: OnApproveActions) {
    const details = await actions.order!.capture();
    switch (details.status) {
      case 'APPROVED':
        break;
      case 'COMPLETED':
        this.toasterService.addToast({
          type: 'success',
          header: 'Thank you!',
          body: 'Your payment has been completed.',
        });
        break;
      case 'PAYER_ACTION_REQUIRED':
        break;
      case 'SAVED':
        break;
      case 'VOIDED':
        break;
    }
  }

  setButtonEnabled(actions: OnInitActions) {
    if (this.amountControl.valid) {
      actions.enable();
    } else {
      actions.disable();
    }
  }
}
