import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import FUN_OBJECT from '@salesforce/schema/Function__c';
import Name_F from '@salesforce/schema/Function__c.Name__c';
import Function_Coordinator__c from '@salesforce/schema/Function__c.Function_Coordinator__c';
import Start_DateTime__c from '@salesforce/schema/Function__c.Start_DateTime__c';
import Maxseats__c from '@salesforce/schema/Function__c.Maxseats__c';
import Venue__c from '@salesforce/schema/Function__c.Venue__c';
import Function_Detail__c from '@salesforce/schema/Function__c.Function_Detail__c';

import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class addFunction extends NavigationMixin(LightningElement) {

          @track functionRecord = {
                Name: '',
                Function_Coordinator__c:'',
                Start_DateTime__c: null,
                Maxseats__c: null,
                Venue__c: '',
                Function_Detail__c: '',
            }

          @track errors;  

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

            handleclick(){
                const fields = {};
                fields[Name_F.fieldApiName] = this.eventRecord.Name;
                fields[Function_Coordinator__c.fieldApiName] = this.eventRecord.Function_Coordinator__c;
                fields[Start_DateTime__c.fieldApiName] = this.eventRecord.Start_DateTime__c;
                fields[Maxseats__c.fieldApiName] = this.eventRecord.Maxseats__c;
                fields[Venue__c.fieldApiName] = this.eventRecord.Venue__c;
                fields[Function_Detail__c.fieldApiName] = this.eventRecord.Function_Detail__c;
        
                const functionRecord = { apiName: FUN_OBJECT.objectApiName, fields };
        
                createRecord(functionRecord)
                    .then((functionRec) => {
                        this.dispatchEvent(new ShowToastEvent({
                            title: 'Record Saved',
                            message: 'Event Draft is Ready',
                            variant: 'success'
                        }));
                        this[NavigationMixin.Navigate]({
                            type: 'standard__recordPage',
                            attributes: {
                                actionName: "view",
                                recordId: functionRec.id
                            }
                        });
                    }).catch((err) => {
                        this.errors = JSON.stringify(err);
                        this.dispatchEvent(new ShowToastEvent({
                            title: 'Error Occured',
                            message: this.errors,
                            variant: 'error'
                        }));
                    });
            }
            }
