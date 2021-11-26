const contractAddress = 'TA973PMBmojHPxmWUgq7Efxe5HXn1bKfa4'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;