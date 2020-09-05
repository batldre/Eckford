
class Mentor {
	priority;
	constructor(name, industry, seniority,
				location, sex, lgbt,
				email, feedback){
		this.name = name;
		this.industry = industry;
		this.seniority = seniority;
		this.location = location;
		this.sex = sex;
		this.lgbt = lgbt;
		this.email = email;
		this.feedback = feedback;
	}

	/**
	 * Applies 10 point score to any mentor with 
	 * matching gender
	*/
	scoreGender(sex, lgbt){
		let res = 0;
		if(sex == 'No Preference') res = 0;
		else if(sex == this.sex) res += 5;
		if(lgbt == 'Yes' && lgbt == this.sex) res += 5;
		return res;
	}
	/**
	 * Determines relevance between one location to another
	 * Scores are calulated comparing states for
	 * 5 points and cities for another 5 points
	*/
	scoreLocation(mentee) {
		const states = {"AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming"}
		let res = 0;
		
		let menteeLocation = mentee.split(', ');
		let mentorLocation = this.location.split(', ');

		if(menteeLocation[1] in states) menteeLocation[1] = states[menteeLocation[1]];
		if(mentorLocation[1] in states) mentorLocation[1] = states[mentorLocation[1]];

		if(mentorLocation[1] == menteeLocation[1]){
			if(mentorLocation[0] == menteeLocation[0]){
				res+=5;
			}
			res+=5;
		}
		return res;
	}
	/**
	 * Determines how close a mentor's seniority is to
	 * the mentee's requested seniority.
	*/
	scoreSeniority(mentee){
		const groups = ['Entry Level (0 to 1 year)',
		'Associate Level (2 to 4 years)',
		'Junior Level (5 to 10 years)',
		'Senior Level (10+ years)']
		let menteeGroup;
		let mentorGroup;
		for(let i = 0; i < 4; i++){
			if(groups[i] == mentee) menteeGroup = i;
			if(groups[i] == this.seniority) mentorGroup = i;
		}
		const dist = Math.abs(menteeGroup - mentorGroup);
		return 10 - (dist * 3);
	}
	/**
	 * Determines relevancy between one industry to another
	 * Scores are calulated comparing main industries for
	 * 5 points and sub-industries for another 5 points
	*/
	scoreIndustry(mentee) {
		let res = 0;
		if(this.industry[0] == mentee[0]){
			if(this.industry[1] == mentee[1]){
				res+=5;
			}
			res+=5;
		}
		return res;
	}

	getPriority(){
		return this.priority;
	}

	setPriority(priority){
		this.priority = priority;
	}

	getFeedBack(){
		return this.feedback;
	}

	getEmail(){
		return this.email;
	}

	getLgbt(){
		return this.lgbt;
	}

	getName(){
		return this.name;
	}

	getIndustry(){
		return this.industry;
	}

	getLocation(){
		return this.location;
	}

	getSex(){
		return this.sex;
	}

	getSeniority(){
		return this.seniority;
	}
}

