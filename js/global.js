var GLOBAL = {

USERMENU_DEFAULT_TEXT: "<span id='login_error' style='color:red;'></span>用户名<input id='login_username' type='text'> 密码<input id='login_password' type='password'> <input onclick='REGISTRATION.login();' type='button' value='登录'>  | <span onclick='PAGE.showRegistration();' style='cursor:pointer;'>快速加入</span>",

set: function(key, value) {
   this[key] = value;
},

get: function(key) {
   return this[key];
},

getArea: function(areaId) {

   return this.get('AREA_'+areaId);
},

getZone: function(zoneId) {
	
	var zones = this.get('ZONE_LIST');
    var zone = zones[zoneId];
    return zone;
},

getSpeciality: function(id) {
	var specialities = this.get("SPECIALITIES");
    return specialities[id];
},

getAreas: function(zoneId) {
    var zones = this.get('ZONE_LIST');
    var zone = zones[zoneId];
    return zone.areas;
},

};

function initPage() {

	var userId = GLOBAL.get('userId');

	if (userId<1) {
	   $('#DIV_USER_INFO_UPDATE').css("display", "inline");
	   $('#DIV_USER_INFO_UPDATE').css("visibility", "visible");
	} else {
		
		PAGE.showLoggedInUserMenu();
	}
	
	loadAreaData();
	loadOccupations();
	loadEducations();
	loadSpecialities();
	
}


function loadAreaData() {
	$.ajax({
        type: "GET",
		url: "config/area.xml",
		dataType: "xml",
		success: function(xml) {

            var zoneList={};

            $(xml).find('zone').each(function(){
				var id= $(this).attr('id');
			    var name = $(this).attr('name');

			    var areas = {};
			    
			    $(this).find('area').each(function() {
			      var areaId = $(this).attr('id');
			      var areaName = $(this).attr('name');
			      areas[areaId] = {
			          zoneId: id,
			          name: areaName
			      };
			      GLOBAL.set('AREA_' + areaId, areas[areaId]);
			    });
			    
			    zoneList[id] = {
			      name: name,
			      areas: areas
			    };
			});
			
			GLOBAL.set('ZONE_LIST',zoneList);
			
            PAGE.showZoneList('DIV_ZONE_LIST', 'DIV_AREA_LIST', true);			
			
		}
	});

}


function loadOccupations() {
    $.ajax({
        type: "GET",
        url: "config/occupation.xml",
        dataType: "xml",
        success: function(xml) {

            var jobs={};

            $(xml).find('occupation').each(function(){
                var id= $(this).attr('id');
                var name = $(this).attr('name');
                
                jobs[id] = name;
            });
            
            GLOBAL.set('OCCUPATIONS',jobs);
            
        }
    });

}

function loadEducations() {
    $.ajax({
        type: "GET",
        url: "config/education.xml",
        dataType: "xml",
        success: function(xml) {

            var educations={};

            $(xml).find('education').each(function(){
                var id= $(this).attr('id');
                var name = $(this).attr('name');
                
                educations[id] = name;
            });
            
            GLOBAL.set('EDUCATIONS',educations);
            
        }
    });

}

function loadSpecialities() {
    $.ajax({
        type: "GET",
        url: "config/specialities.xml",
        dataType: "xml",
        success: function(xml) {

            var specialities={};

            $(xml).find('speciality').each(function(){
                var id= $(this).attr('id');
                var name = $(this).attr('name');
                
                specialities[id] = name;
            });
            
            GLOBAL.set('SPECIALITIES',specialities);
            
        }
    });

}
