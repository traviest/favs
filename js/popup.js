/* site overlay / popups */
function popup(kind) {
	var error = false,
		popupContent = '';
	
	
	
	// CLEAN UP!
	// move FUNCTIONS to main js page
	// just use for true popup - displaying info (process in main js)
	
	
	
	switch(kind)
	{
		case 'signup':
		{
			/***** PHP to register account, redirect to the users 'new' 'home' page *****/
			popupContent = '<h4>Sign Up</h4>\n<form method="" action="" id="newUser"><table>'
				+ '<tr><td>Name</td><td><input type="text" name="name" value="" /></td></tr>'
				+ '<tr class="error"><td colspan="2"><labe for="name"></label></td></tr>'
				+ '<tr><td>Username:</td><td><input type="text" name="username" value="" /></td></tr>'
				+ '<tr class="error"><td colspan="2"><labe for="username"></label></td></tr>'
				+ '<tr><td>Password:</td><td><input type="password" name="password" value="" /></td></tr>'
				+ '<tr class="error"><td colspan="2"><label for="password"></label></td></tr>'
				+ '<tr><td>Confirm Password:</td><td><input type="password" name="password_confirm" value="" /></td></tr>'
				+ '<tr><td>Email:</td><td><input type="text" name="email" value="" /></td></tr>'
				+ '<tr class="error"><td colspan="2"><label for="email"></label></td></tr>'
				+ '<tr><td colspan="2"><input type="button" name="new_user" value="Register" onclick="popup(\'confirm_signup\')"/></td></tr>'
				+ '</table></form>';
			break;
		}
		case 'confirm_signup':
		{
			var name = $('#newUser').find('input[name=name]').val().trim(),
			  	username = $('#newUser').find('input[name=username]').val().trim(),
			  	password = $('#newUser').find('input[name=password]').val().trim(),
			  	password2 = $('#newUser').find('input[name=password_confirm]').val().trim(),
			  	email = $('#newUser').find('input[name=email]').val().trim(),
			  	code = Array(password.length+1).join("*"),
			  	userExists = false,
			  	emailExists = false;
		  
			// NEEDS TO BE STYLED ******************************
			
			if (password != password2) {			
				$('#newUser').find('label[for=password]').html("<span>*</span>Passwords don't match silly")
				$('#newUser').find('label[for=password]').parent().parent('.error').css({display:'block'});
				error = true;
			} else { 
				$('#newUser').find('label[for=password]').html('').parent().parent('.error').css({display:'none'})
			}
			if (userExists) {
				error = true;
			}
			if (emailExists) {
				error = true;
			}
			else if (email.indexOf('@') < 0) {
				$('#newUser').find('label[for=email]').html("<span>*</span>Check that email")
				$('#newUser').find('label[for=email]').parent().parent('.error').css({display:'block'});
				error = true;
			}
			
			if (!error) {
				popupContent = '<h4>THIS CORRECT?!?</h4><table>'
					+ '<tr><td>Name: </td><td>'+name+'</td></tr>'
					+ '<tr><td>Username: </td><td>'+username+'</td></tr>'
					+ '<tr><td>Password: </td><td>'+code+'</td></tr>'
					+ '<tr><td>Email: </td><td>'+email+'</td></tr>'
					+ '</table>'
					+ '<input type="button" name="" value="Cancel" onclick="closePopup()"/>'
					+ '<input type="button" name="" value="Confirm" onclick=""/>';
			}
			break;
		}
		case 'new_add':
		{ 
			var newList,
				itemName = $('#add_menu').find('input[name=linkName]'),
				itemURL = $('#add_menu').find('input[name=linkURL]'),
				itemDesc = $('#add_menu').find('textarea[name=linkDesc]').val().trim(),
				itemTags = $('#add_menu').find('textarea[name=linkTags]').val().trim(),
				itemList = $('#linkList option:selected');
			
			if (itemList.text() == 'New List')
				var newList = $('#add_menu').find('input[name=newLinkList]').val().trim();
			
			if (itemName.val().trim() != '' && itemURL.val().trim() != '') {
				
				itemName.next('.error').html('').css({display:'none'});
				itemURL.next('.error').html('').css({display:'none'});
				
				popupContent = '<h6>You are adding a new favorite.</h6><table>'
				+ '<tr><td>Title: </td><td id="newItemName">'+itemName.val().trim()+'</td></tr>'
				+ '<tr><td>URL: </td><td id="newItemURL">'+itemURL.val().trim()+'</td></tr>'
				+ '<tr><td>Description:</td><td id="newItemDesc">'+itemDesc+'</td></tr>'
				+ '<tr><td>Tags: </td><td id="newItemTags">'+itemTags+'</td></tr>';
				listNew = false;
				if(newList) {
					var listNew = true;
					popupContent += '<tr><td>List:</td><td id="newItemList" class="new">'+newList+'</td></tr>';
				}
				else
					popupContent += '<tr><td>List:</td><td id="newItemList">'+itemList.text()+'</td></tr>';
			 	popupContent += '</table>'
			 	+ '<input type="button" name="cancelAdd" value="Cancel" onclick="closePopup()"/>'
				+ '<input type="button" name="confirmAdd" value="Confirm Add" onclick="submitLink('+listNew+')"/>';
			}
			else {
				if (itemName.val() == '') {
					itemName.next('.error').html("<span>*</span>Gotta give it a name").css({display:'block'});
					error = true;
				} else { itemName.next('.error').html('').css({display:'none'}); }
				if (itemURL.val() == '') {
					itemURL.next('.error').html("<span>*</span>It needs a url to work").css({display:'block'});
					error = true;
				} else { itemURL.next('.error').html('').css({display:'none'}); }
			}
			break;
		}
		case 'edit':
		{
			var editType = $('.edit').attr('title');
			/* edit list */
			if (editType == 'list') { 
				popupContent = '<h4>EDIT LIST: ';
				popupContent += $('#displayed_list').html().replace('<h4>','')
					+ '<input type="button" name="cancelList" value="Cancel" onclick="closePopup()"/>'
					+ '<input type="button" name="saveList" value="Save" onclick="popup(\'confirm_edit\')"/>';
			} 
			/* edit user account */
			else if (editType == 'account') { 
				popupContent = '<h4>EDIT ACCOUNT</h4>';
				popupContent += '<table><form method="post" action="">';
				var userInfo = $('#content').html();
				$(userInfo).find('tr').each(function() {
					var field_data = $(this).find('td:nth-child(2)').html();
					$(this).find('td:nth-child(2)').remove();
					if($(this).find('td').attr('id') == 'form_edit_pass') {
						popupContent += '<tr>'+$(this).html().replace('</td>','</td><td><input type="password" name="" value="'+field_data+'"/></td></tr>');
					} else if($(this).find('td').attr('id') == 'form_edit_email') {
						popupContent += '<tr>'+$(this).html().replace('</td>','</td><td><input type="email" name="" value="'+field_data+'"/></td></tr>');
					} else {
						popupContent += '<tr>'+$(this).html().replace('</td>','</td><td><input type="text" name="" value="'+field_data+'"/></td></tr>');
					}
				});
				popupContent += '<input type="button" name="submit_edit" value="Submit" onclick="popup(\'confirm_edit\')" /></form></table>';
			} else {
				popupContent = "EDIT...SOMETHING";
			}
			break;
		} 
		case 'confirm_edit':
		{
			// handle account and list ??
			var frameHTML = "YOUUU SURE?!";
			frameHTML += '<a href="#" id="close_popup" onclick="closePopup()"></a>';
			$('#frame').fadeOut(300).empty().html(frameHTML);
			frameFade();
			//error = true;
			break;
		} 
		case 'loading':
		{
			popupContent = "Submitting the addition, give us a second";
			break;
		}
		default:
		{
			error = true; 
			break;
		}
	}
	// if no errors, show popup
	if (!error) {
		$('body').append('<div id="popup" title="'+kind+'"><div id="frame"></div></div>');
		if(kind != 'loading') {
			popupContent += '<a href="#" id="close_popup" onclick="closePopup()"></a>';
		}
		$('#frame').html(popupContent);
		$('#popup').css({display:'block', opacity:0}).stop().animate({opacity:1});
		frameFade();		
	} 
	// if error, give explanation 
	else {
		// set error to string to show as 'error' popup
		// currently UNUSED****************************
		if ( error != true ) {
			$('#frame').append('<a href="#" id="close_popup" onclick="closePopup()"></a></div></div>');
			$('#frame').append(error);
			frameFade();
		}
		// no error report
		//else
			//$('#frame').html("Sorry, what were we doing?");
	}
	setTimeout(function() {$('#popup').fadeOut(300).remove();}, 1000 * 120);
	return false;
}
function closePopup() {
	$('#popup').fadeOut(300).delay(500).remove();	
}
function frameFade() {
	$('#frame').css({ 
		position: 'absolute',  
		top: document.documentElement.clientHeight/2-$('#frame').height()/2,  
		left: document.documentElement.clientWidth/2-$('#frame').width()/2,
		display: 'block',
		opacity: 0
	}).stop().animate({opacity:1});
	updateColor($.cookie('color'));
}