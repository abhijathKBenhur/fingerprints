export default class Fingerprint{
    constructor(options){
        this.title = options.name
        this.category = options.category
        this.description = options.tokenDescription
        this.cost = Number(window.web3.utils.fromWei(options.price.toString(), 'ether')).toFixed(2)  
        this.supply = Number(options.amount)  
        this.filePath = options.uri
    }
}