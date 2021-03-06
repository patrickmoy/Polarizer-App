function opinionContext(context) {
	jQuery("#form").remove();
	jQuery("body").append(`
		<div id="form">
			<div class="opinion-form-layout">
			<i>Opinion:</i>
			<p>
			${context.content}
			</p>
			<br>
			<i>Details:</i>
			${context.opinionContext?context.opinionContext:'<p>none.</p>'}
			<input class="closeButton" type="button" value="&#10005;" name="close" id="closeSettingsForm" >
			</div>
			${context.canInvite?
				`<button id="btn-request-dialog" class="button block">request dialog</button>`
				: ``
			}
		</div>
	`);
	if (whoami.user.preferences.guidedTour) {
		tour.next()
	}
	jQuery("#btn-request-dialog").on('click touch', () => {
		closeOpinion();
		dpt.postDialog('', whoami.dptUUID, context.opinionId, currentTopic);
		if (whoami.user.preferences.guidedTour) {
			tour.next();
		}
	})
	jQuery("#closeSettingsForm").on('click touch', function(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		closeOpinion();
	});
	jQuery("#closeSettingsForm").on('click touch', function(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		closeOpinion();
	});
	/**
	 * Closes opinion modal
	 */
	const closeOpinion = () => {
		jQuery('#form').remove();
		formVisible = false;
	}
}

function opinionEdit(context) {
	if (context == null && myOpinion) {
		context = {
			opinionId: myOpinion._id,
			content: myOpinion.content,
			opinionContext: myOpinion.context
		}
	}
	opinionForm(true, context);
}

function opinionForm(edit, context) {
	console.log('enter opinion');

	jQuery("#form").remove();
	formVisible = true;
	
	var opinion = '';
	var opinionContext = '';
	var opinionIdHidden = '';
	var deleteButton = '';
	if (edit) {
		opinion = context.content;
		opinionContext = context.opinionContext;
		edit = `<input type="hidden" class="edit" name="edit" value="edit" />`;
		opinionIdHidden = `<input type="hidden" class="opinionId" name="opinionId" value="${context.opinionId}" />`;
		//deleteButton = `<input class="button" type="button" value="Delete" name="Delete" id="DeleteOpinion"/>`;
	} else {
		edit = '';
	}
	var opinionContext = '';
	if(context && context.opinionContext) {
		opinionContext = context.opinionContext;
	}
	jQuery('body').append(`
		<div id="form">
		Please enter a new opinion:<br>
		<form id="opinion" class="opinionForm">
		<textarea name="opinion" class="opinion">${opinion}</textarea><br>
		Details:
		<textarea class="opinionContext">${opinionContext}</textarea>
		<input class="button" type="submit" value="Confirm"> 
		<input class="closeButton" type="button" value="&#10005;" name="close window"
		id="CloseOpinionForm">${deleteButton}${edit}${opinionIdHidden}
		</form></div>
	`);
	jQuery(".opinionContext").trumbowyg({
		btns: [
			['formatting'],
			['strong', 'em', 'del'],
			['link'],
			['insertImage'],
			['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
			['unorderedList', 'orderedList'],
		],
		adjustHeight: false,
		defaultLinkTarget: '_blank',
		imageWidthModalEdit: true,
	});

	jQuery(".opinion").focus();

	jQuery(document).on('click', "#CloseOpinionForm", function(event) {
		opinionFormOpen = 0;
		jQuery('#form').remove();
		formVisible = false;
		focusAtCanvas();
		event.preventDefault();
	});

	jQuery(document).on('keydown', '.opinion', function(event) {
		var n = jQuery('.opinion').val().length;
		if (n >= 512) {
			jQuery('.opinion').css({ "background-color": "#f88" });
			if (event.keyCode != 8 &&
				event.keyCode != 127 &&
				event.keyCode != 37 &&
				event.keyCode != 38 &&
				event.keyCode != 39 &&
				event.keyCode != 40) {
				event.preventDefault();
			}
		} else {
			var bg = jQuery('textarea.opinion').css('background-color');
			if (bg != "rgb(255,255,255)") {
				jQuery('textarea.opinion').css({ "background-color": "rgb(255,255,255)" });
			}
		}
		if (event.keyCode == 27) {
			jQuery('#form').remove();
			formVisible = false;
			event.preventDefault();
		}
		if (event.keyCode == 10 || event.keyCode == 13) {
			event.preventDefault();
		}
		if (event.ctrlKey && (event.keyCode == 10 || event.keyCode == 13)) {
			jQuery('form#opinion').submit();
		}
	});

	jQuery(document).on('submit', 'form#opinion', function(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		var opinion = jQuery('.opinion').val();
		var context = jQuery('.opinionContext').val();
		var opinionId = jQuery('.opinionId').val();
		var edit = jQuery('.edit').val();
		if (opinion) {
				console.log("now I should add the opinion");
			if (edit == 'edit') {
				dpt.putOpinion(whoami.dptUUID, opinionId, currentTopic, opinion, context);
			} else {
				dpt.postOpinion(currentTopic, opinion, context);
			}
		}
		jQuery('#form').remove();
		formVisible = false;
		if (whoami.user.preferences.guidedTour) {
			tour.next()
		}
	});
}
