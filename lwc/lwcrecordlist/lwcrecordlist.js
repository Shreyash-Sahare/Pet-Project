import { LightningElement, api } from "lwc";

export default class lwcrecordlist extends LightningElement {
  /* Public Property to pass the single record & iconname */
  @api rec;
  @api iconname = "standard:account";
  @api parentidfield;

  manageSelect() {
    let selectfunction = new Customfunction("select", {
      detail: {
        selRec: this.rec,
        parent: this.parentidfield
      }
    });
    this.dispatchfunction(selectfunction);
  }

  manageRemove() {
    let selectfunction = new Customfunction("select", {
      detail: {
        selRec: undefined,
        parent: this.parentidfield
      }
    });
    this.dispatchfunction(selectfunction);
  }
}
