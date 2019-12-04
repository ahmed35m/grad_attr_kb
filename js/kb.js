var GLOBAL_ACCESS = 3;
var GLOBAL_GA = fakeGetRequest();
window.onload = function () {
	responseHandler(fakeGetRequest()); // When the page is loaded call responseHandler
	//createGA();

};

//loadGA, This function is responsible To load existing graduate attributes from the Data base
function loadGA(obj) {
	$(obj).each(createGA(this));
}


//response Handler, This function will check the data base for graduate attributes and will populate the page with the data collected from the data base. if the data base is empty a warning message will appear
function responseHandler(resp) {

	if (resp == null) {
		var err = $(`<div class="card">	<div class="card-body">	Something Went Wrong :/
					</div>`);
		$('#GA_MASTER').append(err);
	}

	$.each(resp.GA, function (indexInArray, valueOfElement) {
		// consoleconsole.log(resp.GA[indexInArray].title);
		createGA(resp.GA[indexInArray].number, resp.GA[indexInArray].title);
		$.each(resp.GA[indexInArray].sub_ga, function (indexInSubArray, el) {
			createSubGA(resp.GA[indexInArray].sub_ga[indexInSubArray]);
		});


	});
	if (editAcces()) {
		renderAddOption();
	}

}

//createSubGa, This function is responsible for creating the sub graduate attributes after the createGA function is called. It will also add new sub graduate attributes
function createSubGA(data) {

	var wrapper = document.createElement('div');
	wrapper.title = "Sub Graduate Attribute";
	wrapper.id = "sub_ga_1.1";
	$(wrapper).addClass('visible');


	var ga_instance = document.createElement('div');
	var ga_n = document.createElement('label');
	var ga_title = document.createElement('label');
	var ga_label = document.createElement('label');

	if (editAcces()) {
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
	var source = $('#' + src_id); //$('#').siblings();
	var tar = $(source).siblings('.sub_ga');
	$(tar).append(wrapper);


};

//createGA, This fucntion is responsible for creating the main graduate attributes and load their  user interface on the web page. it
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
	if (editAcces()) {
		d.title = title;
		d.number = numb;
		
		
		var ga_add_icon = document.createElementNS("http://www.w3.org/2000/svg", "textpath");
		var ga_edit_icon = document.createElementNS("http://www.w3.org/2000/svg", "textpath");
		ga_edit_icon = $('<div class="edit_ga_btn" id="' + numb + '_edit" ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>');
		ga_add_icon = $('<div class="add_sub_btn" id="' + numb + '_add"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>');
		$(ga_a).append(ga_add_icon);
		$(ga_e).append(ga_edit_icon);
		ga_a.addEventListener('click', function () {
			d.type= 'subga';
			renderModalAdd(d);
		});
		ga_e.addEventListener('click', function () {
			d.type= 'ga';
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


function renderAddOption() {
	var add_wrapper = document.createElement('div');
	var add_label = $('<button type="button" class="btn btn-outline-primary2">Add GA</button>');
	add_wrapper.addEventListener('click', function () {
			let data =new Object;
			data.type = 'ga';
			renderModalAdd(data);
	});
	var ga_add_icon = document.createElementNS("http://www.w3.org/2000/svg", "textpath");
	//ga_add_icon = $('<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>');
	$(add_wrapper).addClass('ga_add_btn').append(add_label);

	$('#GA_MASTER').append(add_wrapper);
}

function submitHandler( e){
	let action = $(e).attr('action')
	let target = $(e).attr('target')

	let p = $(e).parent().parent().parent().find('input')[0]
	let n_title = p.value
	let p_title = $(p).attr('orig_val')
	let n =  $(p).attr('numb')
	if (target == 'ga'	){
		if(action =='save'){
			updateGA(n,p_title,n_title)
		}
		else if (action =='delete'){
			removeGA(n,p_title)
		}
		else if (action =='add'){
			addGA(n_title)
		}
	}
	else if 
	(target == 'subga'	){
		if(action =='save'){
			updateSubGA(n,p_title,n_title)
		}
		else if (action =='delete'){
			removeSubGA(n,p_title)
		}
		else if (action =='add'){
			addSubGA( Math.trunc(n) ,n_title)
		}
	}

	// //post to server 
	// $.post("http:maciag.ursse.org/oba/kb.html", GLOBAL_GA,
	// 	function (data, textStatus, jqXHR) {
	// 		console.log('DATA SUBMITTED')
	// 		//window.reload();
	// 	},
	// 	"json"
	// );
	
}

function renderModalAdd(data) {

	$('.modal').remove();
	var modal = $(`<div class="modal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">
		<h5 class="modal_Add">Add a New Graduate Attribute</h5>  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span></button></div><div class="modal-body">  
			<label>New Attribute:</label>
			<input type="text" numb="`+data.number +`" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" >	
			</div>
			<div class="modal-footer"> 
			<button type="button" action="add" target="`+data.type +`" onclick="submitHandler(this)" class="btn btn-primary">Add</button>
		<button type="button" class="btn btn-secondary" data-dismiss="modal">Discard</button></div></div></div> </div>`);
	$(modal).attr('id', 'myModal');

	// var test = $('<!-- Modal -->  <div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button>          <h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div>	</div>');
	$('#GA_MASTER').append(modal);
	$('#myModal').modal({
		focus: true
	});

}


function renderModalEdit(data) {

	$('.modal').remove();
	var modal = $(`<div class="modal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">
		<h5 class="modal_Add">Modify Graduate Attribute</h5>  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span></button></div><div class="modal-body">  
			<label>Attribute Title:</label>
			<input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value="` + data.title + `"  numb="`+data.number+`" orig_val="`+data.title+`" >	
			</div>
			<div class="modal-footer override_ftr" > 
			<div><button type="button" action="delete" target=`+data.type+` class="btn btn-outline-danger" onclick="submitHandler(this)">Delete</button></div>
			<div><button type="button" action="save" target=`+data.type+` class="btn btn-primary" onclick="submitHandler(this)">Save</button>
		<button type="button" class="btn btn-secondary" data-dismiss="modal">Discard</button></div></div></div></div> </div>`);
	$(modal).attr('id', 'myModal');

	// var test = $('<!-- Modal -->  <div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button>          <h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div>	</div>');
	$('#GA_MASTER').append(modal);
	$('#myModal').modal({
		focus: true
	});

}

function updateGA(numb, prev_title , new_title){

	let temp = GLOBAL_GA;
	$.each(temp.GA, function (indexInArray, grad_attr) { 
		if ( grad_attr.number == numb && grad_attr.title == prev_title){
			grad_attr.title = new_title;		
			console.log(temp.GA)
			return false
		}	
	});
}

function removeGA(numb, prev_title){
	let temp = GLOBAL_GA;
	var index;
	$.each(temp.GA, function (indexInArray, grad_attr) { 
		if (  grad_attr.number == numb && grad_attr.title == prev_title){
			index = indexInArray

		}	
	});
	temp.GA.splice(index ,1);
	$.each(temp.GA, function (indexInArray, grad_attr) { 
		grad_attr.number = indexInArray+1;

	});
	console.log(temp.GA)

}

function addGA(new_title){
	let temp = GLOBAL_GA;
	var new_attr = Object();
	new_attr.id = "";
	new_attr.number = temp.GA.length +1;
	new_attr.title = new_title;
	new_attr.description = "";
	new_attr.sub_ga = [{"number":new_attr.number+0.1 , "title" : "new sub ga" }];
	temp.GA.push(new_attr);
	console.log(temp.GA)

	
}

function updateSubGA( numb, prev_title, new_title){
	let temp = GLOBAL_GA;
	$.each(temp.GA, function (indexInArray, ga_attr) { 

		 if (Math.trunc(numb) == ga_attr.number){
			 $.each(temp.GA[indexInArray].sub_ga, function (index, element) { 
				  if (element.number == numb && element.title==prev_title){
					  element.title = new_title;

					  return false;
				  }
			 });
		 }
	});
	
}

function removeSubGA( numb, prev_title){
	var g_index;
	var sub_index;
	let temp = GLOBAL_GA;
	$.each(temp.GA, function (indexInArray, ga_attr) { 
		 if (Math.trunc(numb) == ga_attr.number){
			 $.each(temp.GA[indexInArray].sub_ga, function (s_index, element) { 
				  if (element.number == numb && element.title==prev_title){
						sub_index = s_index;
						g_index = indexInArray;
					  return false;
				  }
			 });
		 }
	});

	temp.GA[g_index].sub_ga.splice(sub_index,1)

	$.each(temp.GA[g_index].sub_ga, function (indexInArray, element) { 
		element.number =   temp.GA[g_index].number +(indexInArray+1)*.1 ;
	});

//    console.log(temp.GA)
}

function addSubGA(parent , s_title){
	let temp = GLOBAL_GA;
	new_sub_ga = new Object();
	new_sub_ga.title=  s_title;

	$.each(temp.GA, function (indexInArray, ga_attr) { 
		if (parent == ga_attr.number){
			new_sub_ga.number = ga_attr.sub_ga.length*0.10 + ga_attr.number +0.1
			ga_attr.sub_ga.push(new_sub_ga);
		}
	});


}


function toggleVisibility(ref) {
	var sub_ga = $(ref).parent().siblings('.sub_ga');
	$(sub_ga).toggleClass('hidden');


}

function editAcces() {
	let resp = GLOBAL_GA;
	return (resp.access >= 3 ? true : false);
}

function fakeGetRequest() {

	var resp = {
		access: GLOBAL_ACCESS,
		"GA": [{
				"id": "",
				"number": 1,
				"title": "A Knowledgebase for Engineering",
				"description": "A Knowledgebase for EngineeringDemonstrated competence in university level mathematics, natural sciences, engineering fundamentals, and specialized engineering knowledge appropriate to the program. ",
				"sub_ga": [{
						"number": 1.1,
						"title": "Create mathematical expressions to describe physical phenomena (or a physical problem)."
					},
					{
						"number": 1.2,
						"title": "Select and describe appropriate tools to solve mathematical problems that arise from modeling physical phenomena."
					},

					{
						"number": 1.3,
						"title": "Use solution to mathematical problems to inform the (real-world problem) that gave rise to it."
					},
					{
						"number": 1.4,
						"title": "Identify fundamental scientific and engineering principles that govern the performance of a given process or system."
					},
					{
						"number": 1.5,
						"title": "Recall and describe fundamental concepts in natural sciences."
					}

				]
			},
			{
				"id": "",
				"number": 2,
				"title": "Problem Analysis",
				"description": "An ability to use appropriate knowledge and skills to identify, formulate, analyze, and solve complex engineering problems in order to reach substantiated conclusions.",
				"sub_ga": [{
						"number": 2.1,
						"title": "Create processes for solving problems including justified approximations and assumptions.."
					},
					{
						"number": 2.2,
						"title": "Evaluate validity of results and model for error/uncertainty."
					},

					{
						"number": 2.3,
						"title": "Reframe complex problems into interconnected sub-problems, using a systems approach."
					},
					{
						"number": 2.4,
						"title": "Identify known and unknown information, uncertainties, and biases in complex ill-structured problems"
					}

				]
			},
			{
				"id": "",
				"number": 3,
				"title": "Investigation",
				"description": "An ability to conduct investigations of complex problems by methods that include appropriate experiments, analysis and interpretation of data, and synthesis of information in order to reach valid conclusions",
				"sub_ga": [{
						"number": 3.1,
						"title": "Generate working hypotheses and assumptions for engineering problems."
					},
					{
						"number": 3.2,
						"title": "Develop investigations involving information and data gathering, analysis, and/or experimentation."
					},

					{
						"number": 3.3,
						"title": "Analyze and interpret data and information to reach a conclusion using a systems approach."
					},
					{
						"number": 3.4,
						"title": "Identify limitations of the tests and methods used and their impact on the results."
					}

				]
			},
			{
				"id": "",
				"number": 4,
				"title": "Design",
				"description": "An ability to design solutions for complex, open-ended engineering problems and to design systems, components or processes that meet specified needs with appropriate attention to health and safety risks, applicable standards, and economic, environmental, cultural and societal considerations.",
				"sub_ga": [{
						"number": 4.1,
						"title": "Follow a general procedure to design a system, component, or process for a complex open-ended problem."
					},
					{
						"number": 4.2,
						"title": "Identify client and user needs."
					},

					{
						"number": 4.3,
						"title": "Evaluate the design options against project criteria using a systems approach."
					},
					{
						"number": 4.4,
						"title": "Assess design based on requirements, yield, reliability, safety, and impact on environment and society."
					},
					{
						"number": 4.5,
						"title": "Create and test simulations, models, and/or prototypes of the design."
					},
					{
						"number": 4.6,
						"title": "Incorporate client/user feedback into the design."
					}

				]
			},
			{
				"id": "",
				"number": 5,
				"title": "Use of Engineering Tools",
				"description": "An ability to create, select, apply, adapt, and extend appropriate techniques, resources, and modern engineering tools to a range of engineering activities, from simple to complex, with an understanding of the associated limitations. ",
				"sub_ga": [{
						"number": 5.1,
						"title": "Select appropriate measurement devices or techniques to accomplish a task."
					},
					{
						"number": 5.2,
						"title": "Demonstrate correct usage of testing apparatus, databases, models, and/or standards."
					},

					{
						"number": 5.3,
						"title": "Analyze the limitations, uncertainties, and sources of error inherent in engineering tools."
					},
					{
						"number": 5.4,
						"title": "Evaluate appropriateness of results from instrumentation, measurements techniques, models and simulations"
					}

				]
			},
			{
				"id": "",
				"number": 6,
				"title": "Individual and Team Work",
				"description": "An ability to work effectively as a member and leader in teams, preferably in a multi-disciplinary setting.",
				"sub_ga": [{
						"number": 6.1,
						"title": "Assume personal responsibility for one's own work and collective accountability for the team work."
					},
					{
						"number": 6.2,
						"title": "Apply principles of conflict management and personal accountability."
					},

					{
						"number": 6.3,
						"title": "Evaluate team effectiveness and plans for improvement."
					},
					{
						"number": 6.4,
						"title": "Report results as a team, with contributions from all individual efforts."
					}

				]
			},
			{
				"id": "",
				"number": 7,
				"title": "Communication Skills",
				"description": "An ability to communicate complex engineering concepts within the profession and with society at large. Such ability includes reading, writing, speaking and listening, and the ability to comprehend and write effective reports and design documentation, and to give and effectively respond to clear instructions.",
				"sub_ga": [{
						"number": 7.1,
						"title": "Write technical documentation using standard formats, grammar, and mechanics."
					},
					{
						"number": 7.2,
						"title": "Utilize proper referencing and citations in written works."
					},

					{
						"number": 7.3,
						"title": "Deliver clear and organized formal presentations."
					},
					{
						"number": 7.4,
						"title": "Create figures, tables and graphics to engineering report standards."
					},
					{
						"number": 7.5,
						"title": "Uses a suitable format for a technical report."
					}

				]
			},
			{
				"id": "",
				"number": 8,
				"title": "Professionalism",
				"description": "An understanding of the roles and responsibilities of the professional engineer in society, especially the primary role of protection of the public and the public interest.",
				"sub_ga": [{
						"number": 8.1,
						"title": "Recognize protection of the public and public interest in decision making and recommendations."
					},
					{
						"number": 8.2,
						"title": "Identify relevant engineering professional and technical organizations."
					},

					{
						"number": 8.3,
						"title": "Demonstrate awareness of engineering as a regulated profession, including reference to relevant engineering regulations/codes/standards."
					},
					{
						"number": 8.4,
						"title": "Demonstrates accountability through performance (meets deadlines, submits quality work, adheres to requirements, etc.)."
					}

				]
			},
			{
				"id": "",
				"number": 9,
				"title": "Impact of Engineering on Society & the Environment",
				"description": "An ability to analyze social and environmental aspects of engineering activities. Such ability includes an understanding of the interactions that engineering has with the economic, social, health, safety, legal, and cultural aspects of society, the uncertainties in the prediction of such interactions; and the concepts of sustainable design and development and environmental stewardship.",
				"sub_ga": [{
						"number": 9.1,
						"title": "Compare technological alternatives and identify means to mitigate social, environmental, human health and safety impacts."
					},
					{
						"number": 9.2,
						"title": "Balance economic, cultural, societal and technical considerations."
					},

					{
						"number": 9.3,
						"title": "Apply principles of preventive engineering, life cycle analysis, and sustainable development."
					}

				]
			},
			{
				"id": "",
				"number": 10,
				"title": "Ethics and Equitys",
				"description": "An ability to apply professional ethics, accountability, and equity.",
				"sub_ga": [{
						"number": 10.1,
						"title": "Adhere to the principles of academic and professional integrity."
					},
					{
						"number": 10.2,
						"title": "Describe ethical and equity issues and how they affect the individual, organization and the public."
					},

					{
						"number": 10.3,
						"title": "Understand consequences of deviating from professional and organizational codes of conduct."
					},
					{
						"number": 10.4,
						"title": "Comprehend and demonstrate sensitivity to cultural and gender issues."
					}

				]
			},
			{
				"id": "",
				"number": 11,
				"title": "Economics and Project Management",
				"description": "An ability to appropriately incorporate economics and business practices including project, risk and change management into the practice of engineering and to understand their limitations.",
				"sub_ga": [{
						"number": 11.1,
						"title": "Define the project scope, tasks, milestones, and/or required resources."
					},
					{
						"number": 11.2,
						"title": "Determine whether the project is economically viable and attractive."
					},

					{
						"number": 11.3,
						"title": "Comprehend, evaluate, and manage risk."
					},
					{
						"number": 11.4,
						"title": "Plan and schedule a project to bring it in on time and resources."
					},
					{
						"number": 11.5,
						"title": "Outline a quality assurance plan for project management."
					},
					{
						"number": 11.6,
						"title": "Recognize the various types of benefits, costs, and risks in a projects life cycle."
					}

				]
			},
			{
				"id": "",
				"number": 12,
				"title": "Lifelong Learning",
				"description": "An ability to identify and to address their own educational needs in a changing world in ways sufficient to maintain their competence and to allow them to contribute to the advancement of knowledge.",
				"sub_ga": [{
						"number": 12.1,
						"title": "Identify how new knowledge enters the discipline via scholarly and industry related sources."
					},
					{
						"number": 12.2,
						"title": "Recognize the requirements for maintaining professional registration and/or licensing."
					},

					{
						"number": 12.3,
						"title": "Identify deficiencies or gaps of one's understanding and knowledge."
					},
					{
						"number": 12.4,
						"title": "Evaluate information for authenticity, currency and objectivity."
					}

				]
			}
		]
	};



	return resp;



}
