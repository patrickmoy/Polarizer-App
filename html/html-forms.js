var isMobile = false; //initiate as false
// device detection

if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
	/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
	isMobile = true;
}

function hideMenu() {
	jQuery('#button-menu').fadeOut();
	jQuery('#overlay').css("background-image", "url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png')");
}

function propositionForm(opinionId) {
	
	console.log('enter proposition');

	jQuery('body').append(`
		<div id="propositionForm" style="position: absolute; top:0; left: 0px;
		padding: 20px; margin-left: 300px; border: #fff; border-style: solid;
		border-width: 1px; color: #F0F3F5; z-index: 30; font-family: DPTFont;
		font-size: 18px; background-color: #005B9888;">Please enter your proposition:
		<br><form id="proposition"><textarea style="font-family: DPTFont;
		font-size: 18px;" name="proposition" cols="64" rows="4" width= "500px"
		height="150px" class="proposition"></textarea>
		<input type="hidden" id="opinionId" name="opinionId" value="${opinionId}">
		<br><input type="submit" value="Send">
		<input type="button" value="close window" name="close window" id="ClosePropositionForm"></form></div>
	`);
	
	jQuery(".proposition").focus();

	jQuery(document).one('click', "#ClosePropositionForm", function(event) {
		propositionFormOpen = 0;
		jQuery('#propositionForm').remove();
		focusAtCanvas();
		event.preventDefault();
	});

	jQuery(document).on('keydown', '.proposition', function(event) {
		var n = jQuery('.proposition').val().length;
		if(n >= 512) {
			jQuery('.proposition').css({ "background-color": "#f88" });
			if(event.keyCode != 8
			&& event.keyCode != 127
			&& event.keyCode != 37
			&& event.keyCode != 38
			&& event.keyCode != 39
			&& event.keyCode != 40) {
				event.preventDefault();
			}
		} else {
			jQuery('.proposition').css({ "background-color": "#fff" });
		}
		if(event.keyCode == 27) {
			jQuery('#propositionForm').remove();
			focusAtCanvas();
			event.preventDefault();
		}
		/*
		if(event.keyCode == 10 || event.keyCode == 13) {
			event.preventDefault();
		}
		*/
	});

	jQuery(document).on('submit', 'form#proposition', function(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		var proposition = jQuery('.proposition').val();
		var opinionId = jQuery('#opinionId').val();
		if(proposition) {
			dpt.postDialog(proposition, whoami.dptUUID, opinionId);
		}
		jQuery('#propositionForm').remove();
		focusAtCanvas();
	});
}

function topicForm() {
	console.log('enter topic');

	if(isMobile) {
		jQuery('body').append(`
			<div id="topicForm" style="position: fixed;
			top: 0px; left: 0px; padding: 0px;  margin-left: 5%; margin-top: 25%; 
			color: #000; width: 33%; z-index: 2; font-family: DPTFont; font-size: 18px;
			background-color: #005B9888;">New topic:<br><form id="topic">
			<textarea style="font-family: DPTFont; font-size: 18px;" name="topic"
			cols="43" rows="12" class="topic"   margin: 0 auto;></textarea><br>
			<input type="submit" value="Send"></form></div>
		`);

	} else {
		jQuery('body').append(`
			<div id="topicForm" style="position: absolute;
			top: 0px; left: 0px; padding: 20px; margin-left: 300px; border: #fff;
			border-style: solid; border-width: 1px; color: #F0F3F5; z-index: 2;
			font-family: DPTFont; font-size: 18px; background-color: #005B9888;">
			Please enter a new topic:<br><form id="topic">
			<textarea style="font-family: DPTFont; font-size: 18px;" name="topic"
			cols="51" rows="4" class="topic"></textarea><br><input type="submit" value="Send">
			<input type="button" value="close window" name="close window"
			id="CloseTopicForm"></form></div>
		`);
	}
	jQuery(".topic").focus();

	jQuery(document).one('click', "#CloseTopicForm", function(event) {
		topicFormOpen = 0;
		jQuery('#topicForm').remove();
		focusAtCanvas();
		event.preventDefault();
	});

	jQuery(document).on('keydown', '.topic', function(event) {
		var n = jQuery('.topic').val().length;
		if(n >= 512) {
			jQuery('.topic').css({ "background-color": "#f88" });
			if(event.keyCode != 8
			&& event.keyCode != 127
			&& event.keyCode != 37
			&& event.keyCode != 38
			&& event.keyCode != 39
			&& event.keyCode != 40) {
				event.preventDefault();
			}
		} else {
			jQuery('.topic').css({ "background-color": "#fff" });
		}
		if(event.keyCode == 27) {
			jQuery('#topicForm').remove();
			focusAtCanvas();
			event.preventDefault();
		}
		/*
		if(event.keyCode == 10 || event.keyCode == 13) {
			event.preventDefault();
		}
		*/
	});

	jQuery(document).on('submit', 'form#topic', function(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		var topic = jQuery('.topic').val();
		if(topic) {
			dpt.postTopic(topic);
		}
		jQuery('#topicForm').remove();
		focusAtCanvas();

	});
}

function opinionForm() {
	console.log('enter opinion');

	jQuery('body').append(`
		<div id="opinionForm" style="position: absolute;
		top: 0px; left: 0px; padding: 20px; margin-left: 300px; border: #fff;
		border-style: solid; border-width: 1px; color: #F0F3F5; z-index: 2;
		font-family: DPTFont; font-size: 18px; background-color: #005B9888;">
		Please enter a new opinion:<br> <form id="opinion">
		<textarea style="font-family: DPTFont; font-size: 18px;" name="opinion"
		cols="52" rows="4" class="opinion"></textarea><br><input type="submit"
		value="Send"> <input type="button" value="close window" name="close window"
		id="CloseOpinionForm"></form></div>
	`);

	jQuery(".opinion").focus();

	jQuery(document).one('click', "#CloseOpinionForm", function(event) {
		opinionFormOpen = 0;
		jQuery('#opinionForm').remove();
		focusAtCanvas();
		event.preventDefault();
	});

	jQuery(document).on('keydown', '.opinion', function(event) {
		var n = jQuery('.opinion').val().length;
		if(n >= 512) {
			jQuery('.opinion').css({ "background-color": "#f88" });
			if(event.keyCode != 8
			&& event.keyCode != 127
			&& event.keyCode != 37
			&& event.keyCode != 38
			&& event.keyCode != 39
			&& event.keyCode != 40) {
				event.preventDefault();
			}
		} else {
			jQuery('.opinion').css({ "background-color": "#fff" });
		}
		if(event.keyCode == 27) {
			jQuery('#opinionForm').remove();
			event.preventDefault();
		}
		/*
		if(event.keyCode == 10 || event.keyCode == 13) {
			event.preventDefault();
		}
		*/
	});

	jQuery(document).on('submit', 'form#opinion', function(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		var opinion = jQuery('.opinion').val();
		if(opinion) {
			dpt.postOpinion(currentTopic, opinion);
		}
		jQuery('#opinionForm').remove();
	});
}

function loadDialogList(restObj) {
	var dialog = '';
	var menuEntry = '';
	var dialogs = restObj.data.data;


	jQuery('body').append(`<div id="dialogMenu"></div>`);

	jQuery('#dialogMenu').empty();

	for(var i = 0; i < dialogs.length; i++) {

		menuEntry = `
			<span class="myDialogs" id="${dialogs[i].dialog}">
			<i>proposition:</i><h2>${dialogs[i].opinionProposition}</h2></span>
		`;

		dialog = `
			<u style="font-size: 32px">Dialog Info</u><br><br>
			<i>proposition:</i><br><h2>${dialogs[i].opinionProposition}<h2>
			<i>topic:</i><br>${dialogs[i].topic}<br><br>
		`;

		if(dialogs[i].initiator == 'me') {
			
			dialog += `
				<i>my opinion:</i><br>${dialogs[i].initiatorOpinion}<br><br>
				<i>other's opinion:</i><br><h2>${dialogs[i].recipientOpinion}<h2>
				<i>initiator:</i> me<br><br>
			`;

		} else {

			dialog += `
				<i>my opinion:</i><br>${dialogs[i].recipientOpinion}<br><br>		
				<i>other's opinion:</i><br><h2>${dialogs[i].initiatorOpinion}<h2>
				<i>initiator:</i> other<br><br>
			`;
		}

		dialog += `<i>status:</i> ${dialogs[i].status}`;

		myDialogMenu[dialogs[i].dialog] = {
			dialog: dialogs[i].dialog,
			topic: dialogs[i].topic,
			initiatorOpinion: dialogs[i].initiatorOpinion,
			recipientOpinion: dialogs[i].recipientOpinion,
			menuEntry: menuEntry,
			description: dialog
		};

		jQuery('#dialogMenu').append(menuEntry);
	}
}

var createGUIScene = function(dptMode) {


	//create home button
	var homeBtn = jQuery('#home-btn');
	homeBtn.show();
	homeBtn.on('click touch', function(event) {
		opinionCamState = currentScene.cameras[0].storeState();
		currentScene.dispose();
		currentScene = __topicScene("topicScene");
		currentScene.name = "topicScene";
		dpt.getTopic();
		event.stopImmediatePropagation();
		event.preventDefault();
		jQuery('#opinionForm').remove();
		jQuery('#topicForm').remove();

		if(isMobile) {
			console.log("mobile behavior!")
			hideMenu();
		}
		focusAtCanvas();
	});


	//create topic button 
	if(dptMode == 'topicScene') {
		jQuery('#new-opinion-btn').hide();
		var newTopicBtn = jQuery('#new-topic-btn');
		newTopicBtn.show();

		newTopicBtn.html(`<img class="btn-icon" src="/topic_white.png">New-Topic`);

		newTopicBtn.on('click touch', function(event) {
			jQuery('#topicForm').remove();

			topicForm();
			event.stopImmediatePropagation();
			event.preventDefault();
			if(isMobile) {
				console.log("mobile behavior!")
				hideMenu();
			}

		});


		//create opinion button 
	} else if(dptMode == 'opinionScene') {

		jQuery('#new-topic-btn').hide();
		var newOpinionBtn = jQuery('#new-opinion-btn');
		newOpinionBtn.show();

		newOpinionBtn.html(`<img class="btn-icon" src="/opinion_white.png">New-Opinion`);
		newOpinionBtn.on('click touch', function(event) {
			jQuery('#opinionForm').remove();

			dpt.opinionPostAllowed(currentTopic);
			// alert(dpt.opinionPostAllowed(currentTopic)) <- returns undefined

			event.stopImmediatePropagation();
			event.preventDefault();
			if(isMobile) {
				console.log("mobile behavior!")
				hideMenu();
			}

		});
	}

	
	//create dialogue button
	var dialoguesBtn = jQuery('#dialogues-btn');
	dialoguesBtn.show();
	dialoguesBtn.on('click touch', function(event) {
		// alert('test')
		if(myDialogsVisible == 'visible') {
			myDialogsVisible = 'hidden';
		} else {
			myDialogsVisible = 'visible';
		}
		jQuery('#dialogMenu').css({ visibility: myDialogsVisible });
		event.stopImmediatePropagation();
		event.preventDefault();
		if(isMobile) {
			console.log("mobile behavior!")
			hideMenu();
		}

	});
}

function pauseEngine() {
	var btn = document.createElement("input");
	//			btn.innerText = "Enable/Disable Joystick";
	btn.style.zIndex = 10;
	btn.style.position = "absolute";
	btn.style.bottom = "50px";
	btn.style.right = "150px";
	btn.width = "50";
	btn.height = "50";
	btn.type = "image";
	btn.src = "/sleep_white.png";
	btn.style.color = "#f00";
	document.body.appendChild(btn);

	// Button toggle logic
	btn.onclick = () => {
		powerSave = !powerSave;
	}
}


jQuery(document).on("click touch", "span.myDialogs", function(event) {
	jQuery('#dialogInfo').remove();
	jQuery('#dialogForm').remove();
	focusAtCanvas();
	currentDialog = myDialogMenu[event.currentTarget.id];
	dpt.getDialog(currentDialog.dialog);
	event.stopImmediatePropagation();
	event.preventDefault();
});

//mobile version menu details

jQuery('#overlay').on('click touch', function() {
	if(jQuery('#button-menu').is(":hidden")) {
		jQuery('#button-menu').fadeIn();
		jQuery('#overlay').css("background-image", "url()");
		jQuery('#topicForm').remove();
	}
});
