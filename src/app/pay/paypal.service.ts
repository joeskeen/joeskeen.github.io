import { Injectable } from '@angular/core';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PayPalService {
  async getPayPal(): Promise<PayPalNamespace> {
    let payPal: PayPalNamespace | null;
    try {
      payPal = await loadScript({
        'client-id': environment.payPalClientId,
        currency: 'USD',
      });
    } catch (error) {
      throw new Error(
        `Error loading PayPal JS SDK Script (error returned: ${error})`
      );
    }
    if (!payPal) {
      throw new Error(
        'Error loading PayPal JS SDK Script (value returned is null)'
      );
    }
    return payPal;
  }
}
