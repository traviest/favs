// key press functions
$(document).keypress(function(k) {
	if(k.keyCode==27) { /* if escape key pressed */
		$('#menu_items').children().slideUp(300);
		closePopup();
	}
	else if(k.keyCode==13) {
		var userInput = $('#member_menu').find('input[name=username]').val(),
			passInput = $('#member_menu').find('input[name=password]').val();
		if (userInput != '' && userInput != undefined && passInput != '' && passInput != undefined)
			userLogIn();
		/*
		var searchInput = $('#friends_menu').find('input[name=search]').val();
		if (searchInput != '' && searchInput != undefined)
			searchUsers();
		*/
	}
});
// main functions 
function siteFunctions() {
	/*
	WebFontConfig = {
		google: { families: [ 'Viga::latin' ] }
	};
	(function() {
	var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	    	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		 wf.type = 'text/javascript';
		 wf.async = 'true';
		 var s = document.getElementsByTagName('script')[0];
		 s.parentNode.insertBefore(wf, s);
	 })();
	*/
	document.body.style.fontSize = $.cookie('fontsize');
	var username = $.cookie('username'),
		usercolor = $.cookie('color');
	
	menuSetUp(username);
	if (usercolor != '') updateColor(usercolor);	
	linksHover();
	
	if ($.cookie('username') != undefined) {
		$('#home_crumb a').attr('href','user.html');
	}
}
// resize text
function resizeText(multiplier) {
	if (document.body.style.fontSize == "" || multiplier == 0) {
		document.body.style.fontSize = "14px";
		$('#content').css({'margin-top': 80 });
	}
	if (multiplier == 1) {
		if (parseFloat(document.body.style.fontSize) < 20) {
			document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (multiplier) + "px";
			$('#content').css({'margin-top': 5 + parseInt($('#content').css('margin-top').replace('px',''))});
		}
	}
	else if(multiplier == -1) {
		if (parseFloat(document.body.style.fontSize) > 8) {
			document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (multiplier) + "px";
			$('#content').css({'margin-top': -5 + parseInt($('#content').css('margin-top').replace('px',''))});
		}
	}
	if (parseFloat(document.body.style.fontSize) < 10)
		$('.fonts').css({'margin-top':$('#header').height()+1});
	else if (parseFloat(document.body.style.fontSize) < 11)
		$('.fonts').css({'margin-top':$('#header').height()+5});
	else if (parseFloat(document.body.style.fontSize) < 14)
		$('.fonts').css({'margin-top':$('#header').height()+7});
	else if (parseFloat(document.body.style.fontSize) < 18)
		$('.fonts').css({'margin-top':$('#header').height()+10});
	else
		$('.fonts').css({'margin-top':$('#header').height()+15});
	
	$.cookie('fontsize',document.body.style.fontSize);
}
// updates page colors
function updateColor(color) {
	$('a').not('.tag').not('#icons h6 a').css('color',color);
	$('h1').css('color',color);
	$('#home_crumb > a').css('background-color',color);
	$('#icons h6 a').hover( function() {
		$(this).css('color',color);
		}, function() {
		$(this).css('color','#FFFFFF');
	});
	$('.fonts li').hover( function() {
		$(this).css('color',color);
		}, function() {
		$(this).css('color','#555');
	});
	$('.tag_count').css('background-color',color);
	$.cookie("color",color);
}
// handles link hover coloring
function linksHover() {
	var colorz;
	// all links - except tag page 'tags'
	$('a').not('.tag').hover( function() {
		colorz = $(this).css("color");
		$(this).css({color:'#000'});
	}, function() {
		if($.cookie('color')) 
			$(this).css({ color:$.cookie('color') });
		else
			$(this).css({ color:colorz });
	});
	$('#home_crumb > a').hover(function() {
		$(this).css({'background-color':'#000'});
	}, function() {
		if($.cookie('color')) 
			$(this).css({'background-color':$.cookie('color') });
		else
			$(this).css({'background-color':colorz });
	});
}
// login validation
function userLogIn() {
	var userInput = $('#member_menu').find('input[name=username]'),
		username = userInput.val(),
		passInput = $('#member_menu').find('input[name=password]'),
		password = passInput.val(),
		foundUser = false,
		theUser = "";
		
	$.get("xml/users.xml", function(l){
	
		if(username != null && username != "" && username != undefined) {
			userInput.next('.error').css({display:'none'});
			$(l).find('user').each(function() {
				if($(this).find('username').text() == username) {
					foundUser = true;
					theUser = $(this).find('username').text();
					userInput.next('.error').css({display:'none'});
				}
			});
			if(!foundUser) {
				userInput.next('.error').html("<span>*</span>Sure that's your username?").css({display:'block'});
				userInput.focus();
			}
		} 
		else
			userInput.next('.error').html("<span>*</span>Field Required").css({display:'block'});
		
		if(password != null && password != "" && password != undefined) {
			passInput.next('.error').css({display:'none'});
			$(l).find('user').each(function() {
				if( $(this).find('password').text() == password && $(this).find('username').text() == theUser ) {
					$.cookie('username',theUser,{expires:14});
					$.cookie('userId',$(this).find('id').text(),{expires:14});
					$.cookie('userPic',$(this).find('pic').text(),{expires:14});
					$.cookie('color',$(this).find('color').text(),{expires:14});
					window.location.replace('user.html');
					var userFound = true;
				}					
			}); // end find each
			if(!userFound) {
				passInput.next('.error').html("<span>*</span>Incorrect password").css({display:'block'});
					passInput.focus();
			}
		}
		else
			passInput.next('.error').html("<span>*</span>Field Required").css({display:'block'});
	}); // end get		
}
// reset user cookies for logout
function userLogOut() {
	$.cookie('username',null,{expires: -1});
	$.cookie('userId',null,{expires: -1});
	$.cookie('userPic',null,{expires:-1});
	$.cookie('color',null,{expires:-1});
	window.location.replace('index.html');
	
	/*
	when logging out, check for color cookie, 
		if exists, update in xml ???
	OR just use cookies for the color ???
	*/
}





// validate and confirm signup credentials
function confirmSignUp() {
	
}



// search for users
function searchUsers() {
	//var searched_name = $('#friends_menu').find('input[name=search]').val().toLowerCase().trim(),
	var searched_name = $('#searcher').find('input[name=search]').val().toLowerCase().trim(),
		foundUsers = new Array();
		
	if (searched_name == '' || searched_name == undefined)
		var html = '<h4>All Users</h4>\n<ol class="results">';
	else
		var html = '<h4>Search results for '+ searched_name +'</h4>\n<ol class="results">';
		
    var getUserInfo = $.get("xml/users.xml",function(u) {
        $(u).find('user').each(function() {
            if ($(this).find('username').text().toLowerCase().indexOf(searched_name) > -1)
                foundUsers.push($(this).find('username').text());
        });
    });
    getUserInfo.complete(function() { 
        if (foundUsers.length > 0) {
            foundUsers.sort();
            for (var i = 0; i < foundUsers.length; i++) {
                html += '<li><a href="user.html?u=' + foundUsers[i] + '">' + foundUsers[i] + '</a></li>';
            }
        } else {
            html += '<li>No users found</li>';
        } 
        // show friends match
        // show all users match
        changeContent(html+'</ol>');
        $('#liveResults').empty().css({display:'none'});
    });
}
function liveSearch(str) {
	var html = '<ol>',
		foundUsers = new Array();
	
	if (str == '' || str == undefined) {
		$('#liveResults').empty().css({display:'none'});
	}
	else {
		var getUserInfo = $.get("xml/users.xml",function(u) {
		    $(u).find('user').each(function() {
		        if ($(this).find('username').text().toLowerCase().indexOf(str) > -1)
		            foundUsers.push($(this).find('username').text());
		    });
		});
		getUserInfo.complete(function() { 
		    if (foundUsers.length > 0) {
		        foundUsers.sort();
		        for (var i = 0; i < foundUsers.length; i++) {
		            html += '<li><a href="user.html?u=' + foundUsers[i] + '">' + foundUsers[i] + '</a></li>';
		        }
		    } else {
		        html += '<li>No users found</li>';
		    }  
		    $('#menu_items').children().slideUp(250);
		    $('#liveResults').empty().append(html+'</ol>').slideDown(250);
		    updateColor($.cookie('color'));
		    //changeContent(html+'</ol>');
		});
	}
}
/* update page content / alter breadcrumb to show user transitioning / results */
	// for friend search - alter content of current page
	// use this elsewhere…?
function changeContent(html) {
	var crumb = $('#breadcrumb').find('li:last-of-type').text();
	if(crumb != 'Search')
		$('#breadcrumb').append('<li><h6>Search</h6></li>');
	$('#content').empty().append(html);
	updateColor($.cookie('color'));
}





// add a new link
function submitLink(newList) {
	var newItemName = $('#newItemName').text(),
		newItemURL = $('#newItemURL').text(),
		newItemDesc = $('#newItemDesc').text(),
		newItemTags = $('#newItemTags').text().toLowerCase(),
		newItemList = $('#newItemList').text(),
		userId = $.cookie('userId');
	
	closePopup();
	
	if (newItemURL.indexOf("http://") < 0 || newItemURL.indexOf("https://") < 0)
		newItemURL = "http://"+newItemURL;

	if (userId != undefined && userId != null && userId != '') {
		var listId,
			listCount = 1,		// for new lists
			itemCount = 1;		// for new items list count num	

		var allLists = $.get("xml/lists.xml",function(l) {
			$(l).find('list').each(function() {
				if(userId == $(this).attr('userId')) {
					listCount++;
					if(newItemList == $(this).find('title').text())
						listId = $(this).find('id').text();
				} 
			});
		});
		allLists.complete(function() {
			if (newList) {
				listId = listCount;
				var listData = "userId="+userId+"&listId="+listId+"&listTitle="+newItemList;
				addList(listData);
				var linkData = "userId="+userId+"&listId="+listId+"&listItemNum=1&tags="+newItemTags+"&title="+newItemName+"&url="+newItemURL+"&desc="+newItemDesc;
				addLink(linkData);
				popup('loading');
				setTimeout(function() { window.location.reload(); }, 3000)
			} else {
				var listItems = $.get("xml/items.xml",function(i) {
					$(i).find('item').each(function() {
						if(listId == $(this).attr('listId'))
							itemCount++;
					});
				});
				listItems.complete(function() {
					var linkData = "userId="+userId+"&listId="+listId+"&listItemNum="+itemCount+
							"&tags="+newItemTags+"&title="+newItemName+"&url="+newItemURL+"&desc="+newItemDesc;
					addLink(linkData);
					popup('loading');
					setTimeout(function() { window.location.reload(); }, 3000)
				});
			}
		});
	}	
}
// submit link
function addLink(linkData) {
	$.get("php/addlink.php?"+linkData, function(data) {
			var error = data.errorMsg;
			if(error) { alert(error); }
	},'json');
}
// submit list
function addList(listData) {
	$.get("php/addlist.php?"+listData, function(data) {
			var error = data.errorMsg;
			if(error) { alert(error); }
	},'json');
}
// values using GET string of url 
function getValue(varname) {
	// First, we load the URL into a variable
	var url = window.location.href;
	// Next, split the url by the ?
	var qparts = url.split("?");
	// Check that there is a querystring, return "" if not
	if (qparts.length == 0)
		return "";
	// Then find the querystring, everything after the ?
	var query = qparts[1];
	// Initialize desired value with deaful
	var value = "";
	// Split the query string into variables (separates by &s)
	var vars = query.split("&");
	// Iterate through vars, checking each one for varname
	for (i=0; i<vars.length; i++) {
		// Split the variable by =, which splits name and value
		var parts = vars[i].split("=");
		// Check if the correct variable
		if (parts[0] == varname) {
			// Load value into variable
			value = parts[1];
			break;
		}
	}
	/*
	// Split the variable by =, which splits name and value
	var parts = vars[0].split("=");
	// Check if the correct variable
	if (parts[0] == varname) {
		// Load value into variable
		value = parts[1];
	}
	*/
	// Convert escape code
	value = unescape(value);
	// Convert "+"s to " "s
	value.replace(/\+/g," ");
	return value;
}