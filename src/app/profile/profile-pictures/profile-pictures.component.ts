import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile-pictures',
  templateUrl: './profile-pictures.component.html',
  styleUrls: ['./profile-pictures.component.scss']
})
export class ProfilePicturesComponent implements OnInit {



  constructor(private http: HttpClient) {

  }


  processFile(imageInput: any) {

    const file: File = imageInput.files[0];
  }
















  // selectedFile: File = null;

  // onFileSelected(event) {
  //   this.selectedFile = <File>event.target.files[0];
  // }

  // onUpload(event) {
  //   const fd = new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name)
  //   this.http.post('www...', fd)
  //   .subscribe(res => {
  //     console.log(res)
  //   });
  // }

  ngOnInit() {
  }

}