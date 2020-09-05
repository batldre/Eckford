class Mentee{
	constructor(name, industry, seniority,
				location, sex, preferences,
				lgbt, email, feedback){
			this.name = name;
			this.industry = industry;
			this.seniority = seniority;
			this.location = location;
			this.sex = sex;
			this.preferences = preferences;
			this.lgbt = lgbt, 
			this.email = email,
			this.feedback = feedback
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

		getPreferences(){
			return this.preferences;
		}

		getSeniority(){
			return this.seniority;
		}
	}
