//******************************************************************************
//		User Data
//******************************************************************************

var probabilityOfSuccess = 0.01;
var guaranteedSuccessAt = 150;
var numberOfSuccesses = 30;

//******************************************************************************
//		Variables
//******************************************************************************

var odds = [];
var totalOdds = [];
var sum = 0;
var results = document.getElementById("results");

var calculator = {


	//**************************************************************************
	//	Calculate the repartition of successes
	//
	calculateOdds: function(probabilityOfSuccess, max){
		let probabilityOfFailure = 1 - probabilityOfSuccess;
		let odds = [];
		let proba = 1;

		proba *= probabilityOfFailure;
		success = 1 - proba;
		odds[0] = [ proba, success ];

		for(let i = 1; i < max; i++){
			proba *= probabilityOfFailure;
			success = odds[i-1][0] - proba;
			odds[i] = [ proba, success ];
		}

		proba = 0;
		success = odds[max-1][0] - proba;
		odds[max] = [ proba, success ];

		for (let i = odds.length - 1; i >= 0; i--) {
			odds[i]= odds[i][1];
		}

		return odds;
	},



	//**************************************************************************
	//	Merges odds n times
	//
	mergeOdds: function(oddsA, oddsB, n){
		n--;
		if(n <= 0){
			return oddsA;
		}

		//initialising array
		let totalOdds = [];
		let maxA = oddsA.length - 1;
		let maxB = oddsB.length - 1;
		let max = maxA + maxB;
		for (let i = 0; i <= max; i++){
			totalOdds.push(0);
		}

		//calculating every possibility and adding them together
		for (let a = 0; a <= maxA; a++){
			for (let b = 0; b <= maxB; b++){
				totalOdds[(a + b)] += (oddsA[a] * oddsB[b]);
			}
		}

		totalOdds = this.mergeOdds(totalOdds, oddsB, n);

		return totalOdds;
	},

	//**************************************************************************
	//	check sum
	//
	checksum: function(odds){
		let sum = 0;
		for (var i = odds.length - 1; i >= 0; i--) {
			sum += odds[i];
		}
		return sum;
	},

	//**************************************************************************
	//	print odds
	//
	printOdds: function(odds){
		for (let i = 0; i < odds.length; i++) {
			results.append(i+"; "+odds[i]);
			results.append(document.createElement('br'));
		}
	}
};

odds = calculator.calculateOdds(probabilityOfSuccess, guaranteedSuccessAt);
//sum = calculator.checksum(odds);
totalOdds = calculator.mergeOdds(odds, odds, numberOfSuccesses);
//sum = calculator.checksum(totalOdds);
calculator.printOdds(totalOdds);
