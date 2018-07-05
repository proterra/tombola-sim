'use strict';

const _ = require('lodash');

function fillBucket(numberTickets,exludeList=[]){

    let bucket=[];
    for (let i=0; i<numberTickets;i++){
        let tn = _.padStart(i+1,3,'0');
        
        let lastDigit = tn.slice(-1);
        if (!exludeList.includes(lastDigit)) {
            bucket.push(`ticket-${tn}`);
        }
    }

    return _.shuffle(bucket);
}

function lastWinningTicket(bucket,winnerList=[]){
    let index = _.findLastIndex(bucket, function(o) { 
        let lastDigit = o.slice(-1);
        return winnerList.includes(lastDigit); 
    });

    return (index+1);
}

function winningDraws(bucket,winnerList=[]){
    let draws=[];
	for (let i=0;i<bucket.length;i++){
		let lastDigit = bucket[i].slice(-1);
		if (winnerList.includes(lastDigit)){
			draws.push(`draw-${_.padStart(i+1,3,'0')}`)
		}
	}
	return draws;
}

let numberOfTickets=250;
let numberOfIterations=5;
let results={};

for (let iteration=0;iteration<numberOfIterations;iteration++){
    let bucket = fillBucket(numberOfTickets);
    // for (let i=0; i<bucket.length; i++){
    //     console.log(`Draw ${i+1} == ${bucket[i]}`)
    // }
    
    //let lastWinning = lastWinningTicket(bucket,['0','5']);
    //let k = `draw-${_.padStart(lastWinning,3,'0')}`;
    winningDraws(bucket,['0','5']).forEach((k)=>{
    	    if (results[k] ){
    	     results[k]++;
    	    }else {
    	     results[k]=1;   
    	    }
    })

}


const ordered = {};
Object.keys(results).sort().forEach(function(key) {
  ordered[key] = results[key];
});

console.log(JSON.stringify(ordered));
console.log('['+Object.keys(ordered).join('","')+']');
console.log('['+Object.values(ordered).join(',')+']');

