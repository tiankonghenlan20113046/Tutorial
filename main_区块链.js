// JScript source code

const sha256 = require('crypto-js/sha256')
//区块block
class Block{

	constructor(data,previousHash){ //constructor的用法
		this.data = data
		this.previousHash = previousHash
		this.hash = this.computeHash()
	}

	computeHash(){
		return sha256(this.data+this.previousHash).toString()
	}
}



//区块的链
//生成祖先区块

class Chain{
	constructor(){
		this.chain = [this.bigBang()]
	}

	bigBang(){
		const genesisBlock = new Block('我是祖先','')
		return genesisBlock
	}
	//找到前一个block的hash
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}

	//添加区块到区块链
	addBlockToChain(newBlock){
		//data
		//找到最近一个block的hash
		//这个hash是新区块的previoushash
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.computeHash();
		this.chain.push(newBlock)
	}
	//验证当前区块的信息是否合法
	//当前的数据有没有被篡改
	//要验证previoushash是否等于previous区块的hash
	validateChain(){
		if(this.chain.length===1){
			if(this.chain[0].hash!== this.chain[0].computeHash()){
				return false;
			}
			return true;
		}
		//从第二个区块开始验证
		//this.chain[1]是第二个区块
		//开始验证第二个区块
		//验证到最后一个区块this.chain.length-1
		for(let  i=1;i<=this.chain.length-1; i++){ //let关键字什么意思
			const blockToValidate = this.chain[i]
			//当前区块数据有没有被篡改
			if(blockToValidate.hash!==blockToValidate.computeHash()){
				console.log('数据被篡改')
				return false;
			}
			//我们要验证区块的previoushash和previous区块的hash是否相等
			const previousBlock = this.chain[i-1]
			if(blockToValidate.previousHash!==previousBlock.hash){
				console.log('前后区块断裂')
				return false
			}
		}
		return true


	}
}

const luotuoChain = new Chain();
//console.log(luotuoChain)
const block2 = new Block('给第二个链转账100元')
luotuoChain.addBlockToChain(block2)

const block3 = new Block('给第三个区块转账8000','')
luotuoChain.addBlockToChain(block3)
console.log(luotuoChain)
//console.log(luotuoChain.validateChain())
//console.log(block)

//尝试篡改这个luotuochain区块链

luotuoChain.chain[1].data = "给你8百万"
luotuoChain.chain[1].hash=luotuoChain.chain[1].computeHash()
console.log(luotuoChain)
console.log(luotuoChain.validateChain())