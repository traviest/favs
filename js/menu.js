/* builds menu information */
function menuSetUp(username) {
	var menu_items = '',
		menu_html = '',
		menu_timer;
		
	var userLists = new Array(),
		userFriends = new Array();
		friendsName = new Array();  
		
		 /* BUILD FRIENDS LIST (have max count of ?? ) 
		 all show in popup from user page */
		//*****************************************************
		
	var	getUsersLists = $.get("xml/lists.xml",function(l) {
		$(l).find('list').each(function() {
			var listUser = $(this).attr('userId'),
				listTitle = $(this).find('title').text();
			if($.cookie('userId') == listUser)
				userLists.push(listTitle);
		});
	});
	var findFriends = $.get("xml/friends.xml",function(f) {
		$(f).find('friend').each(function() {
			if($(this).find('mainuser').text() == $.cookie('userId')) {
				userFriends.push($(this).find('trackeduser').text());
			}
		});
	});
	getUsersLists.complete(function() {
		findFriends.complete(function() {
			var friendInfo = $.get("xml/users.xml",function(l) {
				$(l).find('user').each(function() {
					for(x = 0; x < userFriends.length; x++) {
						if(userFriends[x] == $(this).find('id').text())
							friendsName.push($(this).find('username').text());
					}
				});
			});
			friendInfo.complete(function() {
				if(username != 'none' && username != '' && username != undefined) {
				
					menu_items += '<a href="#" id="account_link">'+$.cookie('username')+'</a>';
					menu_html += '<div id="account_menu">';
					var image = $.cookie('userPic');
					if(image == undefined || image == null || image == '')
						menu_html += '<img src="img/user_s.png"/>';
					else
						menu_html += '<img src="img/users/'+image+'"/>';
					menu_html += '<p>User: <a href="user.html">'+$.cookie('username')+'</a></p>'
						+ '<div class="separator"></div>'
						+ '<a href="settings.html">Account Settings</a>'
						+ '<a href="#" onclick="userLogOut()">Log Out</a>'
					+ '</div>';
					menu_items += '<a href="#" id="friends_link">Friends</a>'
						+ '<a href="#" id="lists_link">Lists</a>'
						+ '<a href="#" id="add_link">Add</a>';
					menu_html += '<div id="friends_menu">'
						+ '<ol>';
						for(x = 0; x < friendsName.length; x++)
							menu_html += '<li><h6><a href="user.html?u='+friendsName[x]+'">'+friendsName[x]+'</a></h6></li>';
					menu_html += '</ol>';
					/*
					menu_html += '<form method="" action="">'
						+ '<input type="search" name="search" value="" placeholder="username" onkeyup="liveSearch(this.value)"/>'
						+ '<input type="button" name="user_go" value="Search" onclick="searchUsers()"/>'
						+ '</form>'
						+ '<div id="liveResults"></div>'
					*/
					menu_html += '</div>';
					menu_html += '<ol id="lists_menu">';
						for(x = 0; x < userLists.length; x++)
							menu_html += '<li><a href="list.html?title='+userLists[x]+'">'+userLists[x]+'</a></li>';
					menu_html += '</ol>';
					menu_html += '<form method="" action="" name="addLink" id="add_menu">'
						+ '<input type="text" name="linkName" value="" placeholder="Title"/>'
						+ '<label for="linkName" class="error"></label>'
						+ '<input type="url" name="linkURL" value="" placeholder="URL"/>'
						+ '<label for="linkURL" class="error"></label>'
						+ '<textarea name="linkDesc" placeholder="Description"></textarea>'
						+ '<textarea name="linkTags" placeholder="Tags (separate by commas)"></textarea>'
						+ '<label for="linkList" id="linkListLabel">Add to List:</label>'
						+ '<select name="linkList" id="linkList">'
						for(x = 0; x < userLists.length; x++) {
							menu_html += '<option';
							if(userLists[x] == 'Favs') { menu_html += ' selected="selected"'; }
							menu_html += '>'+userLists[x]+'</option>';
						}
						menu_html += '<option>New List</option>'
						+ '</select>'
						+ '<input type="text" name="newLinkList" id="newLinkList" value="" placeholder="New List Title"/>'
						+ '<input type="button" name="linkSubmit" value="Submit" onclick="popup(\'new_add\')" />'
					+ '</form>';
					menu_items += '<a href="#" id="color_link">Color</a>';
					menu_html += '<div id="color_menu"></div>';
				}
				else {
					
					menu_items += '<a href="#" id="member_link">SignIn</a>';
					menu_html += '<div id="member_menu">'
						+ '<form method="" action="">'
							+ '<input type="text" name="username" value="" placeholder="username" required="required" />'
							+ '<label for="username" class="error"></label>'
							+ '<input type="password" name="password" value="" placeholder="password" required="required" />'
							+ '<label for="password" class="error"></label>'
							+ '<input type="button" name="login_submit" value="Sign In" id="login_submit" onclick="userLogIn()"/>'
						+ '</form>'
						+ '<div class="separator"></div>'
						+ '<p>New here? <a href="#" onclick="popup(\'signup\')">Sign Up</a></p>'
					+ '</div>';
					menu_items += '<a href="#" id="color_link">Color</a>';
					menu_html += '<div id="color_menu"></div>';
				}
				
				$('#nav').html(menu_items);
				$('#menu_items').html(menu_html);
				
				if(!$.cookie('username'))
					$('#color_menu').css({left:'10px'});
					
				if($.cookie('color'))
					updateColor($.cookie('color'));
					
				linksHover();
				/* intialize color picker */
				var farb = $.farbtastic('#color_menu', updateColor)
				if($.cookie('color'))
					farb.setColor($.cookie('color'));
				
				/* navigation menu controls  */
				$('#nav > a').click(function() {
					$('#liveResults').slideUp(250);
					$('.selected').not($(this)).removeClass('selected');
					var changeMenu = "#" + $(this).attr("id").replace("link","menu");
					
					//if( changeMenu == '#friends_menu' ) 
					//	$('#liveResults').css({top: $('#friends_menu').height() + 30});
					
					$('#menu_items').children().not(changeMenu).slideUp(250);
					$(changeMenu).slideToggle(250);
					$(this).toggleClass('selected');
					return false;
					menu_timer = resetTimer(menu_timer);
				});
				$('#nav > a').hover(function() {menu_timer = resetTimer(menu_timer);});
				$('#menu_items').children().click(function() {menu_timer = resetTimer(menu_timer);});
				
				/* formatting */
				$('#newLinkList').css({display:'none'});
				
				$('#linkList').change(function() {
					if($('#linkList option:selected').text() == 'New List') {
						$('#newLinkList').css({display:'block', opacity:0}).stop().animate({opacity: 1});
					} else {
						$('#newLinkList').css({ display:'none'});
					}
				});
				
			}); // end get user
		}); // get friends
	}); // get lists
}
function resetTimer(timer) {
	clearTimeout(timer);
	timer = setTimeout(function() {
		$('.selected').removeClass('selected');
		$('#menu_items').children().slideUp(300);
	}, 120 * 1000);
	return timer;
}