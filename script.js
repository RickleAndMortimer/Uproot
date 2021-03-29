//job class to store job information with
class Job {
  constructor(salary_min, salary_max, description, location, title, contract) {
    this.salary_min = salary_min;
    this.salary_max = salary_max;
    this.description = description;
    this.location = location;
    this.title = title;
    this.contract = contract;
  }
}
//user defined parameters
//TODO create html to replace these default values with values from html page.
let results_per_page= 20

let search_minsalary = 0
let search_maxsalary = 0
let search = ""
let search_location = ""
let search_position_title = ""
let search_contract = ""

let fulltime = 0
let permanent = 0
let parttime = 0
let jobs = []
//request body to send to Adzuna API.
var params = {
  "app_id": ,
  "app_key": ,
  "results_per_page": results_per_page,
  "what": search,
  "content-type": "application/json",
  "salary": search_salary,
  "location": search_location,
  "position": search_position_title,
  "contract": search_position_contract
}
//creates network request and receives a response in JSON, then stores all the jobs found in the JSON format
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  jobs = []
  if (this.readyState == 4 && this.status == 200) {
    for search_result of xhttp.responseJSON["results"] {
      salary_min = search_result['salary_min'];
      salary_max = search_result['salary_max'];
      description = search_result['description']
      location = search_result['location'];
      title = search_result['title'];
      contract = search_result['contract_time'];
      jobs.push(new Job(salary_min, salary_max, description, location, title, contract));
    }
  }
};
xhttp.open("GET", "https://api.adzuna.com/v1/api/jobs/gb/search/1", true);
xhttp.send();
//creates blocks of information for each job found in the search results
for job in jobs {
  var results = document.getElementById("results");
  var result_div = document.createElement("div");
  result_div.appendChild(document.createElement("p").appendChild(document.createTextNode(job.title)).setAttribute("id", "title"))
  result_div.appendChild(document.createElement("p").appendChild(document.createTextNode(job.description)).setAttribute("id", "description"))
  result_div.appendChild(document.createElement("p").appendChild(document.createTextNode(job.contract)).setAttribute("id", "contract"))
  result_div.appendChild(document.createElement("p").appendChild(document.createTextNode
  (job.salary_max)).setAttribute("id", "money"))
  result_div.appendChild(document.createElement("p").appendChild(document.createTextNode(job.salary_min)).setAttribute("id", "money"))
  result_div.appendChild(document.createElement("p").appendChild(document.createTextNode(job.location)).setAttribute("id", "location"))
  results.appendChild(result_div)
}