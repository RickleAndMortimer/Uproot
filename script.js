//user defined parameters
//TODO create html to replace these default values with values from html page.
let app_id = "c5e04ed9";
let app_key = "46970fda2dfed7dbe461c83764d02533";
let results_per_page = 20;
let jobs = [];

function displayResults() {
	var job_box = document.getElementById("results");
	//for loops creates the job listings by creating html elements and attaching it to the middle of the page.
	traits = ['company', 'location', 'created', 'title', 'description', 'category', 'min_salary', 'max_salary']
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
				  default:
					child.innerHTML = value;
				}
				child.setAttribute("class", key);
				search_result.appendChild(child);
			  }
			}
			search_result.setAttribute("class", "search_result")
			job_box.appendChild(search_result);
		  }
		}
	}
	else {
		no_results_message = document.createElement("p")
		no_results_message.innerHTML = "No results found.";
		job_box.appendChild(no_results_message);
	}  
}

function onClick() {
  //creates network request and receives a response in JSON, then stores all the jobs found in the JSON format
  let country = document.getElementById("country").value;
  let job_type = document.getElementById("job_type").value;
  //extracts user input to be send a query to Adzuna's Job Search API endpoint
  let search_minsalary = document.getElementById("salary_min").value;
  let search_maxsalary = document.getElementById("salary_max").value;
  let search = document.getElementById("what").value;
  let search_location = document.getElementById("where").value;
  var paramString = "?app_id=" + app_id + "&app_key=" + app_key + "&results_per_page=" + results_per_page + "&what=" + search + "&content-type=" + "application/text"
  paramString += "&where=" + search_location + job_type;
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
		displayResults()
    }
  }
  xhttp.open("GET", "https://api.adzuna.com/v1/api/jobs/" + country + "/search/1" + paramString, true);
  xhttp.send();
}