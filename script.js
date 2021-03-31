//job class to store job information with
class Job {
  constructor(salary_min, salary_max, description, location, title, contract, url) {
    this.salary_min = salary_min;
    this.salary_max = salary_max;
    this.description = description;
    this.location = location;
    this.title = title;
    this.contract = contract;
    this.url = url;
  }
}
//user defined parameters
//TODO create html to replace these default values with values from html page.
let app_id = "c5e04ed9";
let app_key = "46970fda2dfed7dbe461c83764d02533";
let results_per_page = 20;
let search_minsalary = 0;
let search_maxsalary = 0;
let search = "mcdonalds";
let search_location = "";
let search_position_title = "";
let search_contract = "";
let fulltime = 1;
let permanent = 1;
let parttime = 1;

let jobs = [];

function onClick() {
  //creates network request and receives a response in JSON, then stores all the jobs found in the JSON format
  var paramString = "?app_id=" + app_id + "&app_key=" + app_key + "&results_per_page=" + results_per_page + "&what=" + search + "&content-type=" + "application/text"
  var xhttp = new XMLHttpRequest();

  //deletes preexisting nodes
  parent = document.getElementById("results")
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  xhttp.onreadystatechange = function () {
    jobs = [];
    if (this.readyState == 4 && this.status == 200) {
      console.log("Ready");
      console.log(xhttp.response);
      json = JSON.parse(xhttp.response);
      console.log(json);
      console.log(json["results"][0]);
      results = json["results"];
      console.log(results);
      console.log(json["results"][0]["salary_max"]);
      for (let i in results) {
        search_result = json["results"][i];
        salary_min = search_result['salary_min'];
        salary_max = search_result['salary_max'];
        description = search_result['description']
        s = search_result['location'];
        title = search_result['title'];
        contract = search_result['contract_time'];
        let job = new Job(salary_min, salary_max, description, s, title, contract)
        console.log(job)
        jobs.push(job);
      }
    }
    //creates blocks of information for each job found in the search results
    for (i in jobs) {
      job = jobs[i]
      var search_result = document.createElement("div")
      var title = document.createElement("p");
      title.innerHTML = job.title;
      var description = document.createElement("p");
      description.innerHTML = job.description;
      var salary_min = document.createElement("p");
      salary_min.innerHTML = job.salary_min;
      var salary_max = document.createElement("p");
      salary_max.innerHTML = job.salary_max;
      var contract = document.createElement("p");
      contract.innerHTML = job.contract
      var job_box = document.getElementById("results");
      search_result.appendChild(title)
      search_result.appendChild(description)
      search_result.appendChild(salary_min)
      search_result.appendChild(salary_max)
      search_result.appendChild(contract)

      job_box.appendChild(search_result)
    }
  };
  xhttp.open("GET", "https://api.adzuna.com/v1/api/jobs/gb/search/1" + paramString, true);
  xhttp.send();
}