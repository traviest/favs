(function() {
	var userId,
		listId,
		listItemNum,
		tags,
		title,
		url,
		desc;
	
	//php does date
	
	if ($.cookie('userId') == '' || $.cookie('userId') == undefined) {
	
	}
	else {
	
		var userLists = new Array();
		var	getUsersLists = $.get("xml/lists.xml",function(l) {
			$(l).find('list').each(function() {
				if($.cookie('userId') == $(this).attr('userId'))
					var listInfo = new Array();
					listInfo['id'] = $(this).find('id').text();
					listInfo['title'] = $(this).find('title').text();
					userLists.push(listTitle);
			});
		});
		getUsersLists.complete(function() {
			var menu_html;
			
			// open dialogen box, shows input and/or errors
			//        allows review, and cancel or submit
			
			
			// menu js build function for new add
			
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
				//????????????
				//+ '<input type="button" name="linkSubmit" value="Submit" onclick="popup(\'new_add\')" />'
			+ '</form>';
			
			
			
			
			$('body').append('<div id="new_fav_popup" title="'+kind+'"><div id="new_fav_frame"></div></div>');
			if(kind != 'loading') {
				popupContent += '<a href="#" id="close_popup" onclick="closePopup()"></a>';
			}
			$('#new_fav_frame').html(popupContent);
			$('#new_fav_popup').css({display:'block', opacity:0}).stop().animate({opacity:1});
			frameFade();		
			
		});
	}
	// js functions
	
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
	
	
	
	
	
	
	
});