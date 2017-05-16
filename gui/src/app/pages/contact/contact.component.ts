import { Component } from '@angular/core';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  backgroundImagePath = "../../assets/images/background/rsz_background.jpg";

  lat: number = 51.678418;
  lng: number = 7.809007;
}