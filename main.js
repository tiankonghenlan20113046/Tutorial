// JScript source code reference:https://github.com/ycraaron/LuotuoCoin
const sha256 = require("crypto-js/sha256");

console.log("luotuo1经过的哈希运算的值："+sha256('luotuo1').toString())
console.log("luotuo2经过的哈希运算的值："+sha256('luotuo2').toString())
//对于不同的输入，即使变化小，结果也非常不同
//对于相同的输入，输出结果相同

//现在要得到一个哈希运算后的结果是0开头的输入，那么这个输入是多少
//得到前4位为0的哈希值，输入应该是多少，需要计算多少次

function proofOfWork(){
	let data = "luotuo"
	let x =1
	while(true){
		if(sha256(data+x).toString().substring(0,3)!='000'){
			x = x+1
		}
		else{
			console.log("得到的输入值为："+sha256(data+x).toString())
			console.log("需要计算"+x+"次可以得到以0开头的哈希值")
			break
		}
	}
}
proofOfWork()
