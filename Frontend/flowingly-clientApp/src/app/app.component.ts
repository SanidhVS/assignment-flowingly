import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharCount } from './CharacterClass';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flowingly-clientApp';

  constructor(private http : HttpClient, private toastr : ToastrService) {
  }
  baseUrl = 'https://localhost:44380/api/Main/';
  stringVal : string = "";
  displayValue : CharCount[] = [];


  generatecharacterTable(){
    this.stringVal = this.stringVal.trim();
    console.log(this.stringVal);
    if(this.stringVal.length !== 0){
      var formdata = new FormData();
      formdata.append('value', this.stringVal)
      this.http.post( this.baseUrl + 'calculate', formdata).subscribe(res => {
        var jsonResult = JSON.stringify(res);
        this.displayValue = JSON.parse(jsonResult);
        this.toastr.success("Count of each characters in the sentence is calculated and displayed in the table");
      },
      err =>{
        console.log(err.error);
        this.toastr.error("Error while calculating the number of characters!!");
        this.stringVal = "";
      } )
    }
    else{
      this.toastr.error("Please enter atleast a character!!")
      this.stringVal = "";
    }

  }
}
