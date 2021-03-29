class Job {
  constructor(salary_min, salary_max, description, location, position_title, contract) {
    this.salary_min = salary_min;
    this.salary_max = salary_max;
    this.description = description;
    this.location = location;
    this.position_title = position_title;
    this.contract = contract;
  }
}

function onClick() {

}

let search_minsalary = 0
let search_maxsalary = 0
let search_location = ""
let search_position_title = ""
let search_contract = ""
let jobs = []

var params = {
  "app_id": ,
  "app_key": ,
  "results-per_page": ,
  "what": ,
  "content-type": "application/json",
  "salary": search_salary,
  "location": search_location,
  "position": search_position_title,
  "contract": search_position_contract
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  jobs = []
  if (this.readyState == 4 && this.status == 200) {
    responseJSON = JSON.parse(xhttp.responseJSON)
    for search_result of xhttp.response["results"] {
      salary_min = search_result['salary_min'];
      salary_max = search_result['salary_max'];
      description = search_result['description']
      location = search_result['location'];
      title = search_result['title'];
      contract = search_result['contract_time'];
      jobs.push(new Job(salary_min, salary_max, location, title, contract))
    }
  }
};
xhttp.open("GET", "https://api.adzuna.com/v1/api/jobs/gb/search/1", true);
xhttp.send();