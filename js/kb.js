/*

                                                                                         
                                                                                         
UUUUUUUU     UUUUUUUU                         ffffffffffffffff       RRRRRRRRRRRRRRRRR   
U::::::U     U::::::U                        f::::::::::::::::f      R::::::::::::::::R  
U::::::U     U::::::U                       f::::::::::::::::::f     R::::::RRRRRR:::::R 
UU:::::U     U:::::UU                       f::::::fffffff:::::f     RR:::::R     R:::::R
 U:::::U     U:::::U         ooooooooooo    f:::::f       ffffff       R::::R     R:::::R
 U:::::D     D:::::U       oo:::::::::::oo  f:::::f                    R::::R     R:::::R
 U:::::D     D:::::U      o:::::::::::::::of:::::::ffffff              R::::RRRRRR:::::R 
 U:::::D     D:::::U      o:::::ooooo:::::of::::::::::::f              R:::::::::::::RR  
 U:::::D     D:::::U      o::::o     o::::of::::::::::::f              R::::RRRRRR:::::R 
 U:::::D     D:::::U      o::::o     o::::of:::::::ffffff              R::::R     R:::::R
 U:::::D     D:::::U      o::::o     o::::o f:::::f                    R::::R     R:::::R
 U::::::U   U::::::U      o::::o     o::::o f:::::f                    R::::R     R:::::R
 U:::::::UUU:::::::U      o:::::ooooo:::::of:::::::f                 RR:::::R     R:::::R
  UU:::::::::::::UU       o:::::::::::::::of:::::::f                 R::::::R     R:::::R
    UU:::::::::UU          oo:::::::::::oo f:::::::f                 R::::::R     R:::::R
      UUUUUUUUU              ooooooooooo   fffffffff                 RRRRRRRR     RRRRRRR
                                                                                         
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
* Author: Muhammad Ahmed
* Filename: kb.js
* App : OBA - Knowledge Base 
*/




var token = localStorage.getItem('oba-token');
var GLOBAL_GA;
var GLOBAL_SGA;
var baseUrl = "https://maciag.ursse.org/api";

//GET data from the server
$.ajax({
	type: "GET",
	url: baseUrl + "/forms/grad_attributes",
	headers: {
		'Authorization': 'Bearer ' + token
	},
	success: function (response) {
		console.log(response);
		GLOBAL_GA = response.result;

		$.ajax({
			type: "GET",
			url: baseUrl + "/forms/indicators",
			headers: {
				'Authorization': 'Bearer ' + token
			},
			dataType: "JSON",
			success: function (response) {
				GLOBAL_SGA = response.result;
				interfaceDB(GLOBAL_GA, response.result);
			}

		});
	}
});

//Map server response to front end render compatible 
function interfaceDB(res1, res2) {
	GLOBAL_GA = res1;
	var sub_ga = res2;

	$.each(GLOBAL_GA, function (indexInArray, valueOfElement) {
		var gn = valueOfElement.number;

		var new_sga = sub_ga.filter(filterByNumb.bind(this, gn));
		valueOfElement.sub_ga = new_sga;
	});
	responseHandler(GLOBAL_GA);
}

//Filter ga by number
function filterByNumb(n, item) {
	if (Math.trunc(item.number) == n) {
		return true;
	}
	return false;
}


// Render GAs and Indicators from server response
function responseHandler(resp) {

	if (resp == null) {
		var err = $(`<div class="card">	<div class="card-body">	Something Went Wrong :/ ... Retrying... (ERR: NO DATA RECEIVED)
					</div>`);
		$('#GA_MASTER').append(err);
		setTimeout(function () {
			location.reload(true);
		}, 1500);

	}
	resp.GA = GLOBAL_GA;
	$.each(resp.GA, function (indexInArray, valueOfElement) {
		createGA(valueOfElement.number, valueOfElement.title);
		$.each(resp.GA[indexInArray].sub_ga, function (indexInSubArray, el) {
			createSubGA(resp.GA[indexInArray].sub_ga[indexInSubArray]);
		});


	});
	if (editAccess()) {
		renderAddOption();
	}

}

//Render Indicator or SubGA
function createSubGA(data) {

	var wrapper = document.createElement('div');
	wrapper.title = "Sub Graduate Attribute";
	wrapper.id = "sub_ga_" + data.number;
	$(wrapper).addClass('visible');

	var ga_instance = document.createElement('div');
	var ga_n = document.createElement('label');
	var ga_title = document.createElement('label');
	var ga_label = document.createElement('label');

	if (editAccess()) {
		var ga_edit = document.createElement('div');
		ga_edit.title = "Edit Sub Attribute";
		var ga_icon = document.createElementNS("http://www.w3.org/2000/svg", "textpath");
		ga_icon = $('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
		$(ga_edit).addClass('edit_box').append(ga_icon);
		let d = new Object();
		d.title = data.title;
		d.number = data.number;
		d.type = 'subga';
		ga_edit.addEventListener('click', function () {
			renderModalEdit(d);
		});
	}
	$(ga_instance).attr('id', data.number).attr('name', 'grad_attr').addClass(' grad_attr');
	$(ga_n).text(data.number).addClass('sub_n');
	$(ga_title).text(data.title).addClass('sub_title');

	$(ga_label).addClass('sub_ga_label').append(ga_n).append(ga_title);

	$(ga_instance).append(ga_label).append(ga_edit);
	$(wrapper).append(ga_instance);

	var src_id = Math.trunc(data.number);
	var source = $('#' + src_id);
	var tar = $(source).siblings('.sub_ga');
	$(tar).append(wrapper);


};

//Render Graduate Attribute
function createGA(numb, title) {
	var wrapper = document.createElement('div');
	wrapper.id = "ga1";
	$(wrapper).addClass('ga');

	var ga_instance = document.createElement('div');
	var ga_n_label = document.createElement('label');
	var ga_title = document.createElement('div');
	var ga_label = document.createElement('div');
	ga_label.title = 'Gaduate Attribute - click to toggle sub attributes';
	var sub_ga = document.createElement('div');
	var ga_edit = document.createElement('div');
	var ga_a = document.createElement('div');
	var ga_e = document.createElement('div');
	ga_a.title = 'Add a sub attribute';
	ga_e.title = 'Edit Graduate Attribute';
	var d = new Object();
	if (editAccess()) {
		d.title = title;
		d.number = numb;
		var ga_add_icon = document.createElementNS("http://www.w3.org/2000/svg", "textpath");
		var ga_edit_icon = document.createElementNS("http://www.w3.org/2000/svg", "textpath");
		ga_edit_icon = $('<div class="edit_ga_btn" id="' + numb + '_edit" ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>');
		ga_add_icon = $('<div class="add_sub_btn" id="' + numb + '_add"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>');
		$(ga_a).append(ga_add_icon);
		$(ga_e).append(ga_edit_icon);
		ga_a.addEventListener('click', function () {
			d.type = 'subga';
			renderModalAdd(d);
		});
		ga_e.addEventListener('click', function () {
			d.type = 'ga';
			renderModalEdit(d);
		});

		$(ga_edit).append(ga_a);
	}
	$(ga_instance).attr('id', numb).attr('name', 'grad_attr').addClass('grad_attr');
	$(ga_n_label).text(numb).addClass('label_numb');
	$(ga_title).text(title).addClass('label_title');
	$(ga_edit).addClass('edit_box_m').append(ga_a).append(ga_e);
	$(ga_label).addClass('ga_label');

	$(sub_ga).addClass('sub_ga');
	ga_label.addEventListener('click', function () {
		toggleVisibility(this)
	});
	$(ga_label).append(ga_n_label).append(ga_title);
	$(ga_instance).append(ga_label).append(ga_edit);
	$(wrapper).append(ga_instance).append(sub_ga);
	$("#GA_MASTER").append(wrapper);
	// console.log('Grad Attr Instance created');

};

//Render add GA button
function renderAddOption() {
	var add_wrapper = document.createElement('div');
	var add_label = $('<button type="button" class="btn btn-outline-primary2">Add GA</button>');
	add_wrapper.addEventListener('click', function () {
		let data = new Object;
		data.type = 'ga';
		renderModalAdd(data);
	});
	var ga_add_icon = document.createElementNS("http://www.w3.org/2000/svg", "textpath");
	//ga_add_icon = $('<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>');
	$(add_wrapper).addClass('ga_add_btn').append(add_label);

	$('#GA_MASTER').append(add_wrapper);
}

// Handler event on CRUD related buttons
function submitHandler(e) {
	let action = $(e).attr('action')
	let target = $(e).attr('target')

	let p = $(e).parent().parent().parent().find('input')[0]
	let n_title = p.value
	let p_title = $(p).attr('orig_val')
	let n = $(p).attr('numb')
	if (target == 'ga') {
		if (action == 'save') {
			updateGA(n, p_title, n_title)
		} else if (action == 'delete') {
			removeGA(n, p_title)
		} else if (action == 'add') {
			addGA(n_title)
		}
	} else if (target == 'subga') {
		if (action == 'save') {
			updateSubGA(n, p_title, n_title)
		} else if (action == 'delete') {
			removeSubGA(n, p_title)
		} else if (action == 'add') {
			addSubGA(Math.trunc(n), n_title)
		}
	}

}

//Render Modal for additions
function renderModalAdd(data) {

	let modal_heading;
	if (data.type == 'ga') {
		modal_heading = 'Graduate Attribute'
	} else {
		modal_heading = 'Indicator'
	}

	$('.modal').remove();
	var modal = $(`<div class="modal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">
		<h5 class="modal_Add">Add a New ` + modal_heading + `</h5>  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span></button></div><div class="modal-body">  
			<label>New ` + modal_heading + `:</label>
			<input type="text" numb="` + data.number + `" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" >	
			</div>
			<div class="modal-footer"> 
			<button type="button" action="add" target="` + data.type + `" onclick="submitHandler(this)" class="btn btn-primary">Add</button>
		<button type="button" class="btn btn-secondary" data-dismiss="modal">Discard</button></div></div></div> </div>`);
	$(modal).attr('id', 'myModal');

	$('#GA_MASTER').append(modal);
	$('#myModal').modal({
		focus: true
	});

}

//Render Modal for edits
function renderModalEdit(data) {
	let modal_heading;
	if (data.type == 'ga') {
		modal_heading = 'Graduate Attribute'
	} else {
		modal_heading = 'Indicator'
	}

	$('.modal').remove();
	var modal = $(`<div class="modal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">
		<h5 class="modal_Add">Modify ` + modal_heading + `</h5>  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span></button></div><div class="modal-body">  
			<label>Title:</label>
			<input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value="` + data.title + `"  numb="` + data.number + `" orig_val="` + data.title + `" >	
			</div>
			<div class="modal-footer override_ftr" > 
			<div><button type="button" action="delete" target=` + data.type + ` class="btn btn-outline-danger" onclick="submitHandler(this)">Delete</button></div>
			<div><button type="button" action="save" target=` + data.type + ` class="btn btn-primary" onclick="submitHandler(this)">Save</button>
		<button type="button" class="btn btn-secondary" data-dismiss="modal">Discard</button></div></div></div></div> </div>`);
	$(modal).attr('id', 'myModal');

	$('#GA_MASTER').append(modal);
	$('#myModal').modal({
		focus: true
	});

}

// Update GA and PUT to server
function updateGA(numb, prev_title, new_title) {

	let temp = GLOBAL_GA;
	$.each(temp.GA, function (indexInArray, grad_attr) {
		if (grad_attr.number == numb && grad_attr.title == prev_title) {
			grad_attr.title = new_title;
			console.log(temp.GA)
			return false
		}
	});
	let data = {
		"graduate_attribute": {
			"number": numb,
			"title": new_title
		}
	};
	///PUT TO SERVER
	$.ajax({
		type: "PUT",
		url: baseUrl + "/forms/grad_attribute",
		headers: {
			'Authorization': 'Bearer ' + token
		},
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json',
		success: function (response) {
			requestComplete()
		},
		error: function (response) {
			alert("Something went wrong :/ " + response);
		}
	});

}

//Remove GA and DELETE to server
function removeGA(numb, prev_title) {
	let temp = GLOBAL_GA;
	var index;
	$.each(temp.GA, function (indexInArray, grad_attr) {
		if (grad_attr.number == numb && grad_attr.title == prev_title) {
			index = indexInArray

		}
	});
	temp.GA.splice(index, 1);
	$.each(temp.GA, function (indexInArray, grad_attr) {
		grad_attr.number = indexInArray + 1;

	});
	// console.log(temp.GA)

	///DELETE Request TO SERVER
	let data = {
		"graduate_attribute": {
			"number": numb,
			"title": prev_title
		}
	};
	$.ajax({
		type: "DELETE",
		url: baseUrl + "/forms/grad_attribute" + "/" + numb,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json',
		success: function (response) {
			requestComplete()
		},
		error: function (response) {
			alert("Something went wrong :/" + response.errors);
		}
	});
}

// Add GA and POST to server
function addGA(new_title) {
	let temp = GLOBAL_GA;
	var new_attr = Object();
	new_attr.id = "";
	new_attr.number = temp.GA.length + 1;
	new_attr.title = new_title;
	new_attr.description = "";
	new_attr.sub_ga = [{
		"number": new_attr.number + 0.1,
		"title": "new sub ga"
	}];
	temp.GA.push(new_attr);
	console.log(temp.GA)
	let data = {
		"graduate_attribute": {
			"number": new_attr.number,
			"title": new_attr.title
		}
	};
	///POST TO SERVER
	$.ajax({
		type: "POST",
		url: baseUrl + "/forms/grad_attribute",
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType: "json",
		success: function (response) {
			requestComplete()
		},
		error: function (response) {
			alert("Something went wrong :/");
		}
	});

}

// Update Indicator and PUT to server
function updateSubGA(numb, prev_title, new_title) {
	let temp = GLOBAL_GA;
	$.each(temp.GA, function (indexInArray, ga_attr) {

		if (Math.trunc(numb) == ga_attr.number) {
			$.each(temp.GA[indexInArray].sub_ga, function (index, element) {
				if (element.number == numb && element.title == prev_title) {
					element.title = new_title;

					return false;
				}
			});
		}
	});

	let data = {
		'indicator': {
			"number": numb,
			"title": new_title
		}
	};

	///PUT TO SERVER
	$.ajax({
		type: "PUT",
		url: baseUrl + "/forms/indicator",
		headers: {
			'Authorization': 'Bearer ' + token
		},
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json',
		success: function (response) {
			requestComplete()
		},
		error: function (response) {
			alert("Something went wrong :/");
		}
	});


}

//Remove Indicator and DELETE to server
function removeSubGA(numb, prev_title) {
	var g_index;
	var sub_index;
	let temp = GLOBAL_GA;
	$.each(temp.GA, function (indexInArray, ga_attr) {
		if (Math.trunc(numb) == ga_attr.number) {
			$.each(temp.GA[indexInArray].sub_ga, function (s_index, element) {
				if (element.number == numb && element.title == prev_title) {
					sub_index = s_index;
					g_index = indexInArray;
					return false;
				}
			});
		}
	});

	temp.GA[g_index].sub_ga.splice(sub_index, 1)

	$.each(temp.GA[g_index].sub_ga, function (indexInArray, element) {
		element.number = temp.GA[g_index].number + (indexInArray + 1) * .1;
	});

	///DELETE Request TO SERVER
	$.ajax({
		type: "DELETE",
		url: baseUrl + "/forms/indicator" + "/" + numb,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		success: function (response) {
			requestComplete()
		},
		error: function (response) {
			alert("Something went wrong :/");
		}
	});

}

// Add Indicator and POST to server
function addSubGA(parent, s_title) {
	let temp = GLOBAL_GA;
	new_sub_ga = new Object();
	new_sub_ga.title = s_title;

	$.each(temp.GA, function (indexInArray, ga_attr) {
		if (parent == ga_attr.number) {
			new_sub_ga.number = ga_attr.sub_ga.length * 0.10 + ga_attr.number + 0.1
			ga_attr.sub_ga.push(new_sub_ga);
		}
	});
	let data = {
		"indicator": {
			"title": new_sub_ga.title,
			"number": Number(new_sub_ga.number.toFixed(2))
		}
	};
	///POST TO SERVER
	$.ajax({
		type: "POST",
		url: baseUrl + "/forms/indicator",
		headers: {
			'Authorization': 'Bearer ' + token
		},
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: 'application/json',
		success: function (response) {
			requestComplete()
		},
		error: function (response) {
			console.log(response);
			alert("Something went wrong :/");
		}
	});


}

// Handle front end after any request to server 
function requestComplete() {
	$('.modal').modal('hide');
	setTimeout(function () {
		location.reload(true);
	}, 500);
}

// Toggle GA drawer
function toggleVisibility(ref) {
	var sub_ga = $(ref).parent().siblings('.sub_ga');
	$(sub_ga).toggleClass('hidden');
}

// Rendering check for different access
function editAccess() {
	let resp = localStorage.getItem('role')
	return (resp == 'Staff' || resp == 'admin' ? true : false)
}