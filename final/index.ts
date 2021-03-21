import * as CryptoJS from "crypto-js";
import { create } from "node:domain";
class Block{
    /*블록을 생성하지 않아도 사용가능한 method , static필수 */ 
    static calculateBlockHash = (
        index:number,
        previousHash:string,
        timestamp:number,
        data:string
        ):string => 
        CryptoJS.SHA256(index+previousHash+timestamp+data).toString();
    static validateStructure = (aBlock : Block) : boolean => 
    typeof aBlock.index==="number" && 
    typeof aBlock.hash ==="string" && 
    typeof aBlock.previousHash ==="string"&&
    typeof aBlock.timestamp ==="number"&&
    typeof aBlock.data ==="string";

    public index:number;
    public hash : string;
    public previousHash:string;
    public data : string;
    public timestamp : number;

    constructor(
        index : number,
        hash : string,
        previousHash :string,
        data:string,
        timestamp:number
    ){
        this.index=index;
        this.hash=hash;
        this.previousHash=previousHash;
        this.data = data;
        this.timestamp = timestamp;

    }
}
const genesisBlock : Block = new Block(0,"20202020202","","Hello",123456);

let blockchain : [Block] = [genesisBlock]; //TS는 Block만 블록체인에 추가하도록 체크함(push작동X)


const getBlockchain = ():Block[]=>blockchain; // Block배열 리턴

const getLatestBlock = () :Block =>blockchain[blockchain.length-1]; //Block한개 리턴

const getNewTimeStamp = (): number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data:string) : Block =>{
    const previousBlock : Block = getLatestBlock();
    const newIndex : number = previousBlock.index +1;
    const newTimestamp : number = getNewTimeStamp();
    const newHash : string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
        );
        const newBlock :Block = new Block(
            newIndex,
            newHash,
            previousBlock.hash,
            data,
            newTimestamp
            );
            addBlock(newBlock);
            return newBlock;

};
const getHashforBlock = (aBlock:Block):String => Block.calculateBlockHash(aBlock.index,aBlock.previousHash,aBlock.timestamp,aBlock.data);
//블록들은 자신의 전 블록으로의 링크가 존재 , 이함수는 제공되고 있는 블록이 유효한지 아닌지 판단
const isBlockValid =  (
    candidateBlock : Block, 
    previousBlock :Block 
): boolean => {
    if(!Block.validateStructure(candidateBlock)){
        return false;//candidate블록, previous블록을 받고 유효하지 않으면  False리턴
    }
    else if(previousBlock.index+1 !== candidateBlock.index){
        return false;
    }
    else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;

    }
    // 따로 해쉬 계산해서, 들어온 블록의 해쉬가 실제로 있는지 체크
    else if(getHashforBlock(candidateBlock)!==candidateBlock.hash){
        return false;
    }
    else{
        return true;
    }
  };
  //블록체인에 블록 추가
  const addBlock = (candidateBlock:Block):void =>{
      if(isBlockValid(candidateBlock,getLatestBlock())){
          blockchain.push(candidateBlock);
      }
  }
  createNewBlock("second Block");
  createNewBlock("third block");
  createNewBlock("fourth block");

  console.log(blockchain);
  
export{};
