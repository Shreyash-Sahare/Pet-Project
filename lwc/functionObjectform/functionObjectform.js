import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import ACCOUNT_OBJECT from '@salesforce/schema/Account'
//import NAME_FIELD1 from '@salesforce/schema/Account.Name'
//import TYPE_FIELD from '@salesforce/schema/Account.Type'

import FUNCTION_OBJECT from '@salesforce/schema/Function__c'
import NAME_FIELD from '@salesforce/schema/Function__c.Function_Name__c'
import FUNCTION_COORDINATOR_FIELD from '@salesforce/schema/Function__c.Function_Coordinator__c'
import START_DATE_TIME_FIELD from '@salesforce/schema/Function__c.Start_DateTime__c'
import MAX_SEATS_FIELD from '@salesforce/schema/Function__c.Maxseats__c'
import VENUE_FIELD from '@salesforce/schema/Function__c.Venue__c'
import FUNCTION_DETAIL_FIELD from '@salesforce/schema/Function__c.Function_Detail__c'
export default class FunctionObjectForm extends LightningElement {

    @api recordId
  //  @api objectApiName
    objectName = FUNCTION_OBJECT
    fieldList = [NAME_FIELD, FUNCTION_COORDINATOR_FIELD, START_DATE_TIME_FIELD, MAX_SEATS_FIELD, VENUE_FIELD, FUNCTION_DETAIL_FIELD]

    successHandler(event){
        console.log(event.detail.id)
        const toastEvent = new ShowToastEvent({
            title:"Function Created",
           // message:"Record Id: "+ event.detail.id,
            variant:"success" 
        })
        this.dispatchEvent(toastEvent)
        return this;
    }

}
