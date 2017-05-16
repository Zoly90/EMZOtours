import { Component } from '@angular/core';

@Component({
  selector: 'background-image',
  templateUrl: './backgroundImage.component.html',
  styleUrls: ['./backgroundImage.component.css']
})
export class BackgroundImageComponent {

  object = {
    link: "../../../assets/images/background/background.jpg"
  }
}
