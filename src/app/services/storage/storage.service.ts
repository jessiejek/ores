import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { AESEncryptDecryptServiceService } from "../encryption/aesencrypt-decrypt-service.service";

const { Storage } = Plugins;
@Injectable({
  providedIn: "root",
})

export class StorageService {
  drCode: any;
  constructor(
    public aes:AESEncryptDecryptServiceService
    ) {}

  // Store the value
  async store(storageKey: string, value: any) {
    console.log(storageKey);
    console.log(value);

    const encryptedValue = this.aes.encrypt(value);
    localStorage.setItem(storageKey,encryptedValue);
  }

  // Get the value
  async get(storageKey: string) {
    console.log(storageKey);
    return JSON.parse(this.aes.decrypt(localStorage.getItem(storageKey)));

  }

  async removeStorageItem(storageKey: string) {
    await Storage.remove({ key: storageKey });
  }

  // Clear storage
  async clear() {
    await Storage.clear();
  }
}
