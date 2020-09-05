 // Client ID and API key from the Developer Console
      var CLIENT_ID = '792215563694-b8qqec3mt20tb19t8cdaeu29bmaacgb4.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyD3SrcUVsyKesef2RW9RWFIH0YyPTJwsrM';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          console.log(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
		  listMajors(); //fetch spreadsheet data
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

let test;
const data = {mentee: [], mentor: []}
function listMajors() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1JU0PSGiHKHWhvUE8_Q94y0s70sjlrQf71xB98vU7mdY',
        range: 'Form Responses 1!A1:AH',
    }).then(function(response) {
        var range = response.result;
		console.log()
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
            	var row = range.values[i];
				formatData(row);
            }
        } else {
        	console.log('No data found.');
        }
    }, function(response) {
        console.log('Error: ' + response.result.error.message);
    });
}

function formatData(row) {
	if(row[3] == "Mentor"){
		formatted = {
			email: row[1],
			fullName: row[2],
			location: row[4],
			industry: row[5],
			subField: nonEmpty(row, 6, 11),
			sex: row[20],
			lgbt: row[21],
			seniority: row[22],
			feedback: row[23]
		}
		data.mentor.push(formatted);
	} else if(row[3] == "Mentee"){
		formatted = {
			email: row[1],
			fullName: row[2],
			location: row[12],
			industry: row[13],
			subField: nonEmpty(row, 14, 19),
			sex: row[25],
			lgbt: row[26],
			seniority: row[27],
			preference: {
				'industry': row[28],
				'location': row[29],
				'seniority': row[30],
				'sex': row[31]},
			feedback: row[32]
		}
		data.mentee.push(formatted);
	}
}

function nonEmpty(row, start, end){
	for(let i = start; i <= end; i++) {
		if(row[i] != "") return row[i];
	}
}
