//user defined parameters
//TODO create html to replace these default values with values from html page.
let app_id = "c5e04ed9";
let app_key = "46970fda2dfed7dbe461c83764d02533";
let results_per_page = 20;
let jobs = [];

myStorage = window.localStorage;

function displayResults(array) {
	var job_box = document.getElementById("results");
	//for loops creates the job listings by creating html elements and attaching it to the middle of the page.
	traits = ['company', 'location', 'created', 'title', 'description', 'category', 'salary_min', 'id']
	if (count > 0) {
		count_display = document.createElement("p")
		count_display.innerHTML = count +" results found.";
		job_box.appendChild(count_display);
		for (i in jobs) {
		  //iterates each job in the jobs array.
		  job = jobs[i]
		  search_result = document.createElement("div");
		  //for loop loops through the keys of job and creates <p> elements that display the value of that key 
		 for (let [key, value] of Object.entries(job)) {
			var child = document.createElement("p");
			if (traits.includes(key)) {
			  if (value != undefined) {
				switch (key) {
				  case 'company':
					child.innerHTML = value.display_name;
					break;
				  case 'location':
					child.innerHTML = value.display_name;
					break;
				  case 'category':
					child.innerHTML = value.label;
					break;
				  case 'title':
					child.innerHTML = "<a href=" + job.redirect_url + ">" + value + "</a>";
					break;
				  case 'created':
					child.innerHTML = "Created at: " + value;
					break;
				  case 'min_salary':
					child.innerHTML = "💲" + value;
					break;
				  default:
					child.innerHTML = value;
					break;
				}
				child.setAttribute("class", key);
				search_result.appendChild(child);
			  }
			}
			
			//TODO add a button that saves objects to a list
			search_result.setAttribute("class", "search_result")
		  }
		  	add_button = document.createElement("button");
			add_button.innerHTML = "Add to List"
			add_button.setAttribute("onclick", "onAddToList(" + JSON.stringify(job) + ")");
			search_result.appendChild(add_button)
			job_box.appendChild(search_result);
		}
	}
	else {
		no_results_message = document.createElement("p")
		no_results_message.innerHTML = "No results found.";
		job_box.appendChild(no_results_message);
	}  
}

function onAddToList(job) {
	if (myStorage.getItem(job.id) == null) {
		myStorage.setItem(job.id, JSON.stringify(job));
		console.log("Added " + job.id);
	}
	else {
		console.log("Error: Already added")
	}
	console.log(job);
}

function displayAllJobs() {
	for (let key of Object.keys(myStorage)) {
		console.log("Key: " + key + " Value: " + myStorage.getItem(key));
	}
}

function clearList() {
	for (let key of Object.keys(myStorage)) {
		myStorage.removeItem(key);
	}
}

function onClick() {
  //creates network request and receives a response in JSON, then stores all the jobs found in the JSON format
  let country = document.getElementById("country").value;
  let job_type = document.getElementById("job_type").value;
  let page = document.getElementById("page").value;
  //extracts user input to be send a query to Adzuna's Job Search API endpoint
  let search_minsalary = document.getElementById("salary_min").value;
  let search = document.getElementById("what").value;
  let search_location = document.getElementById("where").value;
  let sort_by = document.getElementById("sort_by").value;
  
  var paramString = "?app_id=" + app_id + "&app_key=" + app_key + "&results_per_page=" + results_per_page + "&what=" + search + "&content-type=" + "application/text"
  paramString += "&where=" + search_location + job_type + "&sort_by=" + sort_by;
  var xhttp = new XMLHttpRequest();
  //deletes preexisting nodes
  parent = document.getElementById("results")
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  xhttp.onreadystatechange = function () {
    jobs = [];
    count = 0;
	if (this.readyState == 4 && this.status == 200) {
      json = JSON.parse(xhttp.response);
	  count = json.count;
      results = json["results"];
	  for (let i in results) {
        search_result = json["results"][i];
        jobs.push(search_result);
      }
		document.getElementById("page").max = parseInt(count / results_per_page)
		displayResults();
    }
  }
  xhttp.open("GET", "https://api.adzuna.com/v1/api/jobs/" + country + "/search/" + page + paramString, true);
  xhttp.send();
}