window.onload = function() {
  createGA();
  renderAddOption();
};


function loadGA(obj){
	$(obj).each(createGA(this));
}



function createSubGA(source){
	
	var wrapper = document.createElement('div');
	wrapper.title = "Sub Graduate Attribute";
	wrapper.id = "sub_ga_1.1";
	$(wrapper).addClass('visible');

	
	var ga_instance = document.createElement('div');
	var ga_n = document.createElement('label');
	var ga_title = document.createElement('label');
	var ga_label = document.createElement('label');

	var ga_edit	= document.createElement('div');
	var ga_icon	= document.createElementNS("http://www.w3.org/2000/svg" , "textpath");
		ga_icon = $('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');

	$(ga_instance).attr('id', '1').attr('name', 'grad_attr').addClass(' grad_attr');
	$(ga_n).text('1.1').addClass('sub_n');
	$(ga_title).text('Writing Technical').addClass('sub_title');
	$(ga_edit).addClass('edit_box').append(ga_icon);
	
	
	$(ga_label).addClass('sub_ga_label').append(ga_n).append(ga_title);
	
	$(ga_instance).append(ga_label).append(ga_edit);	
	$(wrapper).append(ga_instance);	
	
	var tar = $(source).siblings('.sub_ga');
	$(tar).append(wrapper);


};

function createGA(){
		
	var wrapper = document.createElement('div');
	wrapper.title = "container_ga";
	wrapper.id = "ga1";
	$(wrapper).addClass('ga');
	
	var ga_instance = document.createElement('div');
	var ga_n_label = document.createElement('label');
	var ga_title_label = document.createElement('div');
	var ga_label = document.createElement('label');
	var sub_ga = 	document.createElement('div');
	var ga_edit	= document.createElement('div');
	var ga_add = document.createElement('div');
	var ga_add_icon = document.createElementNS("http://www.w3.org/2000/svg" , "textpath");
	var ga_icon	= document.createElementNS("http://www.w3.org/2000/svg" , "textpath");
	
	ga_icon = $('<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
	
	ga_add_icon =$('<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
	$(ga_edit).append(ga_add_icon);
	
	$(ga_instance).attr('id', '1').attr('name', 'grad_attr').addClass('grad_attr');
	$(ga_n_label).text('1').addClass('label_numb');
	$(ga_title_label).text('Communications').addClass('label_title');
	$(ga_edit).addClass('edit_box').append(ga_icon);
	$(ga_label).addClass('ga_label');
	
	$(sub_ga).addClass('sub_ga');
	ga_instance.addEventListener('click', function(){ createSubGA(this) } );
	$(ga_label).append(ga_n_label).append(ga_title_label);
	$(ga_instance).append(ga_label).append(ga_edit);	
	$(wrapper).append(ga_instance).append(sub_ga);	
	$("#GA_MASTER").append(wrapper);
	
	console.log('Grad Attr Instance created');
	
};


function renderAddOption(){
	var add_wrapper = document.createElement('div');
	var add_label = $('<label >Add GA</label>');
	var ga_add_icon = document.createElementNS("http://www.w3.org/2000/svg" , "textpath");
		ga_add_icon = $('<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>');
	$(add_wrapper).append(ga_add_icon).append(add_label).addClass('ga_add_btn icon');

	$('#GA_MASTER').append(add_wrapper);
}


function renderModalAdd(){
	/*
	var wrapper = document.createElement('div');
	var container= document.createElement('div');
	var textnode = document.createTextNode('Add a Graduate Attribute');
	var save = document.createElement('button');
	var close = document.createElement('button');

	var form = $('<form method="POST" id="add_form"> </form>');
	var textinput = $('<input type="text" id="add_input value="Enter New Name" /">');
		var textinput =  document.createElement('input'); //$('<form method="POST"> <input class="ga_input"/> </form>');
	
	//$(textnode).text('Add a Graduate Attribute').addClass('modal_heading02');
	$(textinput).addClass('modal_input');
	$(save).addClass('modal_btn').text('Save');
	$(close).addClass('modal_btn').text('Close');
	$(form).append(textinput).append(save).append(close);
	//save.addEventListener('onclick',function (){alert('GA Added!');});
	
	$(container).append(textnode).append(form).addClass('modal_container');
	$(wrapper).append(container);
	*/

	var modal = $('<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="Add a Graduate Attribute">Add a Graduate Attribute</h5>  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">  <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">	</div><div class="modal-footer"> <button type="button" class="btn btn-primary">Save changes</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div> </div>');
	$(modal).attr('id','myModal');
	
	// var test = $('<!-- Modal -->  <div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button>          <h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div>	</div>');
		$('#GA_MASTER').append(modal);

}




function fakeGetRequest(){

	var resp = {
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
			}
		]
	};



	return resp;



}