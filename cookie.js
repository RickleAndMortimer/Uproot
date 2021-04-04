//parses the cookie into a json file
//cookie string: {list: []}
list_json = JSON.parse(document.cookie);
function displayList() {
	//for loops creates the job listings by creating html elements and attaching it to the middle of the page.
	traits = ['company', 'location', 'created', 'title', 'description', 'category', 'salary_min', 'salary_max']
	for (i in list) {
	  //iterates each job in the jobs array.
	  job = list_json.list[i]
	  job_element = document.createElement("div");
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
			  case 'max_salary':
				child.innerHTML = "💲" + value;
				break;
			  default:
				child.innerHTML = value;
				break;
			}
			child.setAttribute("class", key);
			job_element.appendChild(child);
		  }
		}
		remove_button = document.createElement("button");
		remove_button.innerHTML = "Remove from list"
		remove_button.onclick = onRemoveFromList(job);
		job_element.setAttribute("class", "list")
		job_box.appendChild(job_element);
	  }
	}
}
function onRemoveFromList(job) {
	list_json.list.remove(job);
	document.cookie = JSON.stringify(list_json);
}