const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, previousHash= ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;

    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce ).toString();
    }

    mineBlock(dificultad){
        while ( this.hash.substring(0,dificultad) !== Array(dificultad + 1).join("0") ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }   
        console.log("Block mined: "+this.hash);
    }

}


class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.dificultad = 2;
    }

    createGenesisBlock(){
        return new Block(0, "01/02/2021", "Bloque inicial", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.dificultad);
        //newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

        }
        return true;
    }

}


let cartera = new Blockchain();

console.log("Minando Block 1 .....");
cartera.addBlock(new Block(1, "29/07/1989", {amount:10}));


console.log("Minando Block 2 .....");

cartera.addBlock(new Block(2, "29/07/1989", {amount:100}));


//console.log("Es bloque es valido?"+ cartera.isChainValid());

//cartera.chain[1].data = { amount: 10000 };
//cartera.chain[1].hash = cartera.chain[1].calculateHash();


//console.log("Es bloque es  valido?"+ cartera.isChainValid());

//console.log(JSON.stringify(cartera, null, 4 ));
