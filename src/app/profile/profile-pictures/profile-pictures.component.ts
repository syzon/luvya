import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DBService } from 'src/services/db.service';
import { DomSanitizer } from '@angular/platform-browser';

class ImageSnipped {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-profile-pictures',
  templateUrl: './profile-pictures.component.html',
  styleUrls: ['./profile-pictures.component.scss']
})
export class ProfilePicturesComponent implements OnInit {

  selectedImage: ImageSnipped;

  constructor(private dbService: DBService,
    private sanitizer: DomSanitizer
  ) { }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
    this.selectedImage = this.dbService.getAccount().img;
    // this.selectedImage = account.image;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedImage = new ImageSnipped(event.target.result, file);
      this.uploadImage();
    });

    reader.readAsDataURL(file);

  }

  uploadImage() {
    // this.dbService.updateUser(this.dbService.getLoggedInUserEmail(), this.user);
    if (this.selectedImage !== undefined) {
      const img = {
        "img": {
          "src": this.selectedImage.src,
          "file": this.selectedImage.file
        }
      }
      this.dbService.updateUserData(img);
    }
  }

  // TODO: noch lauffähig machen
  public config = {
    ImageName: 'Some image',
    AspectRatios: ["4:3", "16:9"],
    ImageUrl: 'https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg',
    ImageType: 'image/jpeg'
  }

  public close() {

  }

  public getEditedFile(file: File) {

  }
}