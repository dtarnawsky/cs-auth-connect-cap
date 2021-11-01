import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BrowserVault, Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  config: IdentityVaultConfig = {
    key: 'io.ionic.ac-bio',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Biometrics,
    lockAfterBackgrounded: 3000,
    shouldClearVaultAfterTooManyFailedAttempts: false,
    customPasscodeInvalidUnlockAttempts: 10,
    unlockVaultOnLoad: true,
  };

  vault: Vault | BrowserVault;

  constructor(private platform: Platform) {    
    this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(this.config) : new Vault(this.config);
    this.vault.onLock(() => {
      console.log('Vault was locked');
    });
    this.vault.onUnlock(() => {
      console.log('Vault was unlocked');
    });
    this.vault.onError((err) => {
      console.log('Vault error', err);
    });
    Device.setHideScreenOnBackground(true);
  }
}
