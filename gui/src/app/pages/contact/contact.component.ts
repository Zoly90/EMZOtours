import { Component } from '@angular/core';
import { ContactInformation } from "./contact.model.ts/contact.model";
import { ContactService } from "./service/contact.service";
import { UtilsService } from "../../utils/utils.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UpdateContactInformationModal } from "./update-contact-information-modal/update-contact-information-modal.component";
import { TurismAppConstants } from "../../utils/constants";

@Component({
  selector: 'sd-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  bsModalRef: BsModalRef;
  private contactInformation: ContactInformation = new ContactInformation();
  private days = ['Monday - Friday', 'Saturday', 'Sunday'];
  private token: string;
  private roleAdmin = TurismAppConstants.ADMIN;

  constructor(
    private _contactService: ContactService,
    private _utilsService: UtilsService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this._getContactInformation();
    this.token = this._utilsService.checkAuthAndGetToken();
  }

  public openUpdateContactInformationModal() {
    this.bsModalRef = this.modalService.show(UpdateContactInformationModal);
    this.bsModalRef.content.contactInformation = this.contactInformation;
    this.modalService.onHidden.subscribe(res => this._getContactInformation());
  }

  private _getContactInformation() {
    this._contactService.getContactInformation()
      .subscribe(res => {
        this.contactInformation = res;
        this.contactInformation.workingHours = this.contactInformation.workingHours.split(',');
        this.contactInformation.map.latitude = Number(this.contactInformation.map.latitude)
        this.contactInformation.map.longitude = Number(this.contactInformation.map.longitude)
      });
  }
}