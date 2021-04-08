let myStorage = window.localStorage;

function displayList() {
	var job_box = document.getElementById("results");
	//for loops creates the job listings by creating html elements and attaching it to the middle of the page.
	traits = ['company', 'location', 'created', 'title', 'description', 'category', 'salary_min', 'salary_max']
	
	if (myStorage.length > 0) {
		for (let key of Object.keys(myStorage)) {
		  //iterates each job in the jobs array.
		  console.log(myStorage.getItem(key));
		  job = JSON.parse(myStorage.getItem(key));
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
		  }
			remove_button = document.createElement("button");
			remove_button.innerHTML = "Remove from list"
			remove_button.setAttribute("onclick", "onRemoveFromList(" + job.id + ")");
			job_element.appendChild(remove_button)
			job_element.setAttribute("id", job.id);
			job_element.setAttribute("class", "list")
			job_box.appendChild(job_element);
		}
	}
	else {
		no_items_p = document.createElement("p");
		no_items_p.innerHTML = 'Your list is looking empty, start finding jobs <a href="filter.html">here.</a>'
		no_items_p.setAttribute("id", "no_results");
		job_box.appendChild(job_element);
	}
}
function onRemoveFromList(id) {
	myStorage.removeItem(id);
	document.getElementById(id).remove();
	console.log("Removed: " + id)
}