import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { take, map, first } from "rxjs/operators";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class StorageService {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  test: any;
  localURL: any;
  uploadedImage: File;
  fileName: any;
  selectedFile: any;
  profileUrl: Observable<string | null>;
  constructor(private storage: AngularFireStorage, private authService: AuthService) { }

  async uploadImage(event) {
    const file = event.target.files[0];
    const filePath = file.name;
    await this.storage.upload(filePath, file);
    await this.setUserThumbNails(filePath);
  }

  async setUserThumbNails(path: string) {
    const user = await this.authService.findMe();
    const res = await this.authService.setUserData(user, { photoURL: path, thumb64Path: `thumb@64_${path}`, thumb128Path: `thumb@128_${path}`, thumb256Path: `thumb@256_${path}` });
    const user2 = await this.authService.findMe();
    await this.fetchFile(`thumb@64_${path}`);
    await this.fetchFile(`thumb@128_${path}`);
    await this.fetchFile(`thumb@256_${path}`);
  }

  async fetchFile(name: string) {
    const fileRef = this.storage.ref(name);
    await this.delay(15000);
    let task = fileRef.getDownloadURL();

    task.subscribe(async url => {
      if (url) {
        this.localURL = url;
        await this.setDownloadURL(name, this.localURL);
      } else {
        console.log('Could not find downloadURL');
      }
    })
    return this.localURL;
  }
  async setDownloadURL(fileName: string, input: any) {
    const user = await this.authService.findMe();
    if (fileName.includes('64')) {
      await this.authService.setUserData(user, { thumb64URL: input });
    } else if (fileName.includes('128')) {
      await this.authService.setUserData(user, { thumb128URL: input });
    } else if (fileName.includes('256')) {
      await this.authService.setUserData(user, { thumb256URL: input });
    } else {
      console.log('fileName does not contain supported sizes (64, 128, 256)');
    }
    this.localURL = undefined;
  }

  //Dirty hack to wait for cloud function to complete
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}