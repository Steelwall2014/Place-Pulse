var locs;

var uiLocked = true;

function onStreetViewChoice() {
    if (uiLocked) return;
    uiLocked = true;
	$.ajax({
		type: 'POST',
		url: '/study/vote/' + study_id + '/',
		data: {
            study_id: study_id,
            left: locs[0].id,
            right: locs[1].id,
            choice: $(this).hasClass('left') ? 'left' : 'right'
		},
		success: function(data) {
	    	newPrompt();
		}
	});
}

function newPrompt() {
	$.ajax({
		url: '/study/getpair/' + study_id,
		type: 'GET',
		success: function(data) {
		    
		    locs = data.locs;
		    
		    function getSVURL(lat,lng) {
		        // TODO: re-add this SV-specific data: &fov=90&heading=235&pitch=10
		        return "http://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + lng + "&sensor=false";
		    }
		    
		    $('#sv1 img.place').attr('src',getSVURL(data.locs[0].loc[0],data.locs[0].loc[1]));
		    $('#sv2 img.place').attr('src',getSVURL(data.locs[1].loc[0],data.locs[1].loc[1]));
		    
		    uiLocked = false;
		}
	});
	
    $('img.place').click(onStreetViewChoice);

}


function init() {
	newPrompt();
}