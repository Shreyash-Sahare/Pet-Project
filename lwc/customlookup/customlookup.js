import { LightningElement, api, track } from 'lwc';
import searchRecords from '@salesforce/apex/CustomSearchController.searchRecords';

export default class Customlookup extends LightningElement {

    @api objectName = 'Account';
    @api fieldName = 'Name';
    @api iconname = 'standard:record';
    @api label = 'Account';
    @api parentidfield = 'AccountId';

    /* private property */
    @track records;
    @track selectedRecord;

    manageSearch(function1) {

        var searchVal = function1.detail.value;
        searchRecords({
            objName: this.objectName,
            fieldName: this.fieldName,
            searchKey: searchVal
        })
            .then(data => {
                if (data) {
                    let parsedResponse = JSON.parse(data);
                    let searchRecordList = parsedResponse[0];
                    for (let i = 0; i < searchRecordList.length; i++) {
                        let record = searchRecordList[i];
                        record.Name = record[this.fieldName];

                    }
                    this.records = searchRecordList;
                }
            })
            .catch(error => {
                window.console.log(' error ', error);
            });
    }

    manageSelect(function1) {
        var selectedVal = function1.detail.selRec;
        this.selectedRecord = selectedVal;
        let finalRecfunction = new Customfunction('select', {
            detail: { selectedRecordId: this.selectedRecord.Id, parentfield: this.parentidfield }
        });
        this.dispatchFunction(finalRecfunction);
    }

    manageRemove() {
        this.selectedRecord = undefined;
        this.records = undefined;
        let finalRecfunction = new Customfunction('select', {
            detail: { selectedRecordId: undefined, parentfield: this.parentidfield }
        });
        this.dispatchEvent(finalRecfunction);
    }

}
