var GLOBAL = {

set: function(key, value) {
   this[key] = value;
},

get: function(key) {
   return this[key];
},

getArea: function(areaId) {

   return this.get('AREA_'+areaId);
},

getSpeciality: function(id) {
   return this.get('SPECIALITY_' + id);
},

getAreas: function(zoneId) {
    var zones = this.get('ZONE_LIST');
    var zone = zones[zoneId];
    return zone.areas;
},

teachers: {},

setTeacher: function(teacher) {

    var areaId = teacher.areaId;

    if (this.teachers[areaId] == null) {
        this.teachers[areaId] = [];
    }
    
    this.teachers[areaId].push(teacher);
},

getTeachers: function(areaId) {
    console.log('get teachers in area: ' + areaId);
    if (this.teachers[areaId] == null) {
        this.teachers[areaId] = [];
    }
    
    return this.teachers[areaId];

}


};



function initPage() {

	var userId = GLOBAL.get('userId');
		
	if (userId<1) {
	   $('#DIV_USER_MENU').css("display", "inline");
	   $('#DIV_USER_MENU').css("visibility", "visible");
	}
	
	loadAreaData();
	loadOccupations();
	loadEducations();
	
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

