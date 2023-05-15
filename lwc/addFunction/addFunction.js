import { LightningElement, track } from 'lwc';

export default class addFunction extends LightningElement {

          @track functionRecord = {
                Name: '',
                Function_Coordinator__c:'',
                Start_DateTime__c: null,
                Maxseats__c: null,
                Venue__c: '',
                Function_Detail__c: '',
            }

            manageChange(function1) {
                let value = function1.target.value;
                let name = function1.target.name;
                this.functionRecord[name] = value;
            }

            managelookup(function1){
                let selectedRecId = function1.detail.selectedRecId;
                let parentField = function1.detail.parentField;
                this.functionRecord[parentField] = selectedRecId;
            }
}
