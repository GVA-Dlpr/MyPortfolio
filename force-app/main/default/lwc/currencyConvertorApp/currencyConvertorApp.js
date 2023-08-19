import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList'
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'

export default class CurrencyConvertorApp extends LightningElement {
    currencyImage = currencyConverterAssets +'/currencyConverterAssets/currency.svg'
    countryList = countryCodeList
    countryFrom = "INR"
    countryTo = "USD"

    handleChange(event){
        const {name, value} = event.target
        console.log("name",name)
        console.log("value",value)
        this[name]=value
    }
}