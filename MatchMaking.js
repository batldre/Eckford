function input(){
	setTimeout(function(){
		const bestMatch = prompt('Would you like to see the top matches?');
		if(bestMatch == 'No' || bestMatch == 'no') {
			const name = prompt('Which mentee would you like to match?');
			const count = prompt('... and how many matches?');
			matchMake(name, count, false);
		} else bestMatches();
		}, 2000);
}
function bestMatches(){
	let ranking = {}
	for(let mentee of menteeData){
		let menteeOb = createMentee(mentee);
		let mentor = findMatches(menteeOb, 1, true);
		ranking[mentee.fullName] = parseInt(mentor.getPriority());
	}
	// Create items array
	let rank = Object.keys(ranking).map(function(key) {
		return [key, ranking[key]];
	});

	// Sort the array based on the second element
	rank.sort(function(first, second) {
	return second[1] - first[1];
	});

	let count = 1;
	for(let index of rank){
		console.log(count + ": " + 'Mentee - '
		+ index[0] + ' | Priority - ' + index[1]);
		count++;
	}
}

function matchMake(target, count, bestMatchMode) {	
	let mentee = findMentee(target);
	mentee = createMentee(mentee);
	findMatches(mentee, count, false);	
}

function findMentee(name){
	let res = {};
	let count = 0;
	
	for(const mentee of menteeData){
		if(mentee.fullName == name) {
			res = mentee;
			count++;
		}
	}
	if(count > 1) console.log("WARNING: " + name +
	 " has " + count + "submittions!");
	return res;
}
function createMentee(mentee){
	mentee = new Mentee(
		mentee.fullName, 
		[mentee.industry, mentee.subField],
		mentee.seniority,
		mentee.location,
		mentee.sex, mentee.preference,
		mentee.lgbt, mentee.email,
		mentee.feedback);
	return mentee;
}

function assignPriority(mentor, mentee){
	let score = 0;
	let multiplier;
	const preferences = ['industry', 'location', 'seniority', 'sex'];
	for(let preference = 0; preference < 4; preference++){
		switch(preference){
			case 0:	
				multiplier = 2 - .5 * parseInt(mentee.getPreferences().industry);
				score += multiplier * mentor.scoreIndustry(
					mentee.getIndustry());
				continue;
			case 1:	
				multiplier = 2 - .5 * parseInt(mentee.getPreferences().locaton);
				score += multiplier * mentor.scoreLocation(
					mentee.getLocation());
				continue;
			case 2:	
				multiplier = 2 - .5 * parseInt(mentee.getPreferences().seniority);
				score += multiplier * mentor.scoreSeniority(
					mentee.getSeniority());
				continue;

			case 3:	
				multiplier = 2 - .5 * parseInt(mentee.getPreferences().sex);
				score += multiplier * mentor.scoreGender(
					mentee.getSex(), mentee.getLgbt());
		}
	}
	return score;
}

function findMatches(mentee, count, bestMatchMode){
	let queue = new PriorityQueue();
	for(let mentor of mentorData){
		const mentorClass = new Mentor(
			mentor.fullName,
			[mentor.industry, mentor.subField],
			mentor.seniority, mentor.location,
			mentor.sex, mentor.lgbt,
			mentor.email, mentor.feedback);
		const priority = assignPriority(mentorClass, mentee);
		mentorClass.setPriority(priority);
		const node = new Node(mentorClass, priority);
		queue.enqueue(node);
	}
	for(i = 0; i < count; i++){
		let mentor = queue.dequeue().getValue();
		if(bestMatchMode == false){
			console.log('		' + (i+1) + ': '  + mentor.getName());
			formatOutput(mentee, mentor);
		} else return mentor;
	}
}

function formatOutput(mentee, mentor){
	console.log('- - - - - - - - - - - - - - - - - - - - - - - - -');
	console.log('	Mentee on the left || Mentor on the right');
	console.log('Priority: ' + mentor.getPriority());
	console.log('Name: ' + mentee.getName() + ' || '  + mentor.getName());
	console.log('Industry: ' + mentee.getIndustry() + ' || '  + mentor.getIndustry());
	console.log('Seniority: ' + mentee.getSeniority() + ' || '  + mentor.getSeniority());
	console.log('Location: ' + mentee.getLocation() + ' || '  + mentor.getLocation());
	console.log('Sex: ' + mentee.getSex() + ' || '  + mentor.getSex());
	console.log('LGBT: ' + mentee.getLgbt() + ' || '  + mentor.getLgbt());
	const preferences = mentee.getPreferences();
	console.log('Industry: ' + preferences['industry'] + ' Location: ' + preferences['locaton'] + ' Seniority: ' + preferences['seniority'] + ' Sex: ' + preferences['sex']);
	console.log('Mentee Feedback: ' + mentee.getFeedBack());
	console.log('Mentor Feedback: ' + mentor.getFeedBack());
	console.log('- - - - - - - - - - - - - - - - - - - - - - - - -');
}
