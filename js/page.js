

var PAGE = {

createTeacherSummary:function(t) {
    var s = '<div id="DIV_TEACHER_SUMMARY_' + t.id +'"  onclick="PAGE.showTeacherDetails(\'' + t.id +'\');" onmouseover="this.style.backgroundColor=\'#DDDDDD\';" style="cursor:pointer;" onmouseout="this.style.backgroundColor=\'#FFFFFF\';">' +t.name;
    for(var i=0;i<t.rating;++i) {
       s+='<img src="./images/star.png"/>';
    }
    s+='<br/>专长:';
    console.log(t);
    var sIds = t.specialities.split(',');

    for(var i in sIds) {
        var id = sIds[i];
        var speciality = GLOBAL.getSpeciality(id);
        if (speciality != undefined && speciality != null) {
        	s+=speciality + ',';
        }
    }    
    
    s+='</div><br/>';
    return s;
},

showTeacherDetails:function(id) {
	$('#DIV_DISPLAY_CANVAS').html('');
	var d=new Date();
	
	var params = {
			teacher_id: id
	}
	
	$.post('./teacherDetails.php', params, function(data){
		$('#DIV_DISPLAY_CANVAS').html(data);
		REVIEW.loadReviews(id);
	});
	
},

setReviewSpecValue:function(spec, value) {
	for(var i=1;i<=value;++i){
		var elementName = 'new_review_spec' + spec + '_rating_v' + i;
//		$('#'+elementName).html('★');
		$('#'+elementName).css('color','red');
	}
},

resetReviewSpecValue:function(spec, value) {
	for(var i=1;i<=value;++i){
		var elementName = 'new_review_spec' + spec + '_rating_v' + i;
		$('#'+elementName).css('color','');
	}
},

saveReviewSpecValue:function(spec, value) {
	var elementName = '';
	for(var i=1;i<=5;++i){
		elementName = 'new_review_spec' + spec + '_rating_v' + i;
		document.getElementById(elementName).onmouseout=function(){};
		document.getElementById(elementName).onmouseover=function(){};
		PAGE.resetReviewSpecValue(spec, i);
//		$('#'+elementName).mouseout(function(){});
//		$('#'+elementName).mouseover(function(){});
	}

	elementName = 'new_review_spec' + spec + '_rating';
	$('#'+elementName).val(value);
	console.log(elementName +': ' + $('#'+elementName).val());
	PAGE.setReviewSpecValue(spec, value);
},

onSelectArea:function(areaDivName, areaId, showTeachers) {

    $('#DIV_TEACHERS_LIST').html("搜索中...");

   if (showTeachers) {
	    var info = {
	    	'area': areaId	
	    }
	   
		$.post('./findteachers.php', info, function(data) {
			var d = YAHOO.lang.JSON.parse(data);
            var teachers = d.teachers;
			var content="";
 	        for(i in teachers) {
		        var teacher = teachers[i];
		        content += PAGE.createTeacherSummary(teacher);
		    }
	        if (content.length==0) {
	        	content = '未能在该地区找到符合条件的音乐教师';
	        }

		    $('#DIV_TEACHERS_LIST').html(content);

		});
	   
   }

   var area = GLOBAL.getArea(areaId);
   var areas = GLOBAL.getAreas(area.zoneId);
   for(var id in areas) {
        if (id != areaId) {
            $('#' + areaDivName + id).css('color', 'black');
        } else {
            $('#' + areaDivName + id).css('color', 'red');
        }
   
   }
},

showAreaList:function(zoneId, areaDivName, showTeachers) {
    var zones = GLOBAL.get('ZONE_LIST');
    var zone = zones[zoneId];
    var areas = zone.areas;
    
    var content = "";
    $('#DIV_TEACHERS_LIST').html("搜索中...");

    if (showTeachers) {
	    var info = {
	    	'zone': zoneId	
	    }
	   
		$.post('./findteachers.php', info, function(data) {
			var d = YAHOO.lang.JSON.parse(data);
            var teachers = d.teachers;
			var content="";
 	        for(i in teachers) {
		        var teacher = teachers[i];
		        content += PAGE.createTeacherSummary(teacher);
		    }
	        if (content.length==0) {
	        	content = '未能在该地区找到符合条件的音乐教师';
	        }
		    $('#DIV_TEACHERS_LIST').html(content);

		});
	   
   }
    
    for(var areaId in areas) {
        var area = areas[areaId];
        if (showTeachers) {
            content+='<span id="' +areaDivName + areaId + '" style="cursor:pointer;" onclick="PAGE.onSelectArea(' + '\'' + areaDivName +'\',' + areaId + ','+ showTeachers + ');">'+area.name + "</span>  ";    
        } else {
            // not showing teachers, should be in registration
            content+='<span id="' +areaDivName + areaId + '" style="cursor:pointer;" onclick="REGISTRATION.selectedArea=' + areaId + ';PAGE.onSelectArea(' + '\'' + areaDivName +'\',' + areaId + ','+ showTeachers + ');">'+area.name + "</span>  ";    
        }
    }

    $('#'+areaDivName).html(content);
    
    // set current zone name to red, others to black
       for(var id in zones) {
            if (id != zoneId) {
                $('#' +areaDivName +'_ZONE_'+id).css('color', 'black');
            } else {
                $('#' +areaDivName +'_ZONE_'+id).css('color', 'red');
            }
       }
    
},

showZoneList:function(zoneDivName,areaDivName,showTeachers) {
       // show city list
       var listContent = "";
       var zones = GLOBAL.get('ZONE_LIST');
       
       for(var zoneId in zones) {
           var zone = zones[zoneId];
           if (showTeachers) {
               listContent += '<span id="' + areaDivName + '_ZONE_' + zoneId + '"  style="cursor:pointer;" onmousedown="PAGE.showAreaList(' + zoneId + ',\'' + areaDivName + '\',' + showTeachers+ ');">' + zone.name + '</span>  ';       
           } else {
               // not showing teachers, should be in registration step
               listContent += '<span id="' + areaDivName + '_ZONE_' + zoneId + '"  style="cursor:pointer;" onmousedown="REGISTRATION.selectedZone = ' + zoneId + '; PAGE.showAreaList(' + zoneId + ',\'' + areaDivName + '\',' + showTeachers+ ');">' + zone.name + '</span>  ';       
           }
       }
       
       $('#'+zoneDivName).html(listContent);
},

showLoggedInUserMenu: function(showUserInfo) {
	var d = new Date();
	
	$.get('./getuser.php?d=' + d.getTime(), function(data) {

		var user = YAHOO.lang.JSON.parse(data);
		
		GLOBAL.set('userId', user.id);
		
		var content = user.name + "&nbsp;&nbsp;<span style='cursor:pointer;' onclick='PAGE.loadUserUpdateData();'>个人资料</span>&nbsp;&nbsp;<span style='cursor:pointer;' onclick='PAGE.logout();'>退出登录</span>";
		
		$('#DIV_USER_MENU').html(content);
		
		PAGE.clearUserUpdatePanel();
		
		if (showUserInfo == true) {
			PAGE.showUserInfoUpdatePanel(user);
		}

	});

},

logout: function() {

	var d = new Date();
	
	$.get('./logout.php?d=' + d.getTime(), function(data) {
		PAGE.clearUserUpdatePanel();
		var content = GLOBAL.USERMENU_DEFAULT_TEXT;
		GLOBAL.set('userId', 0);		
		$('#DIV_USER_MENU').html(content);
		
	});
	
},

clearUserUpdatePanel: function() {
    $('#DIV_USER_INFO_UPDATE').html('');
    $('#DIV_USER_INFO_UPDATE').css("display", "none");
    $('#DIV_USER_INFO_UPDATE').css("visibility", "hidden");
},

loadUserUpdateData: function() {
	
	var d = new Date();
	
	$.get('./getuser.php?d=' + d.getTime(), function(data) {

		var user = YAHOO.lang.JSON.parse(data);
		
		GLOBAL.set('userId', user.id);

		PAGE.showUserInfoUpdatePanel(user);

	});
	
},

showUserInfoUpdatePanel: function(data) {
	
	   $('#DIV_USER_INFO_UPDATE').css("display", "inline");
	   $('#DIV_USER_INFO_UPDATE').css("visibility", "visible");

	   var content = "<div style='background-color:#DDDDDD;border-radius:5px;border:1px solid #CCCCCC;'><span style='color:blue;border-radius:5px;border:1px solid #CCCCCC;cursor:pointer;float:right;text-align:right;' onclick='PAGE.clearUserUpdatePanel();'>关闭</span><table><tr style='vertical-align:text-top;'>";
       content +='<td><div id="div_update_user_basic_info" style="width:420px; border-radius:9px;border:1px solid #CCCCCC;"><table>'+
	                '<tr><td>输入新密码</td><td><input id="update_password" type="password"/><span id="update_password_error" style="color:red;"/></td></tr>' +
	                '<tr><td>重复新密码</td><td><input id="update_password_retype" type="password"/></td></tr>' +
	                '<tr><td>昵称(其它用户所看到的名字)</td><td><input id="update_nickname" type="text" value="' + data.name + '"/><span id="update_name_error" style="color:red;"/></td></tr>' +
	                '<tr><td>电子邮件</td><td><input id="update_email" type="text" value="' + data.email + '"/><span id="update_email_error" style="color:red;"/></td></tr>' +
	                '<tr><td>重新选择地区<br/>(当前:' + GLOBAL.getZone(data.zone).name +','+ GLOBAL.getArea(data.area).name + ')</td><td>' +
	                '<div id="UPDATE_ZONE_LIST"></div>' +               
	                '<div id="UPDATE_AREA_LIST"></div><span id="reg_area_error" style="color:red;"/></td></tr>' +               
	                '<tr><td colspan="2"><input type="button" onclick="REGISTRATION.updateUserBasicInfo();" value="修改资料"/><span id="update_error"/></td></tr></table></div></td>';
	  
       if (data.type==1) {
    	   content+= '<td><div id="div_update_teacher_info" style="border-radius:9px;border:1px solid #CCCCCC;"></div></td>';
    		var d = new Date();
    		
    		$.get('./getteacherinfo.php?d=' + d.getTime(), function(data) {

    			var teacher = YAHOO.lang.JSON.parse(data);
    			PAGE.showTeacherInfoPanel(teacher);

    		});
       }
       
	    content+="</tr></table></div>";
	    
	    $('#DIV_USER_INFO_UPDATE').html(content);
	    this.showZoneList('UPDATE_ZONE_LIST', 'UPDATE_AREA_LIST', false);
	
},

createOptionsList: function(values, matchingValue) {
	var list='';
    for(i in values) {
        list += '<option value="' + i +'"';
        if(i==matchingValue) {
      	  list+=' selected';
        }
        list += '>' + values[i] + '</option>';
	}
	return list;
},

createYearsList: function(max, min, matchingValue) {
	var list='';
    for(var i = max; i>=min; --i) {
        list += '<option value="' + i +'"';
        if(i==matchingValue) {
      	  list+=' selected';
        }
        list += '>' + i + '</option>';
	}
	return list;
},

showTeacherInfoPanel:function(teacher) {
	
	    var occupations = GLOBAL.get('OCCUPATIONS');
	    var occupationList = '<select id="teacher_update_occupation">' + 
	                         this.createOptionsList(occupations, teacher.occupation) +
	                         '</select>';

	    var educations = GLOBAL.get('EDUCATIONS');
	    var eduList1 = '<option value="">--</option>' + this.createOptionsList(educations, teacher.degree1);
	    var eduList2 = '<option value="">--</option>' + this.createOptionsList(educations, teacher.degree2);
	    var eduList3 = '<option value="">--</option>' + this.createOptionsList(educations, teacher.degree3);
	    
	    var specialities = GLOBAL.get('SPECIALITIES');
	    var specList1=  this.createOptionsList(specialities, teacher.speciality1);
	    var specList2=  this.createOptionsList(specialities, teacher.speciality2);
	    var specList3=  this.createOptionsList(specialities, teacher.speciality3);

	    var date = new Date();
	    var currentYear = date.getFullYear();
	    var earliestYear = currentYear-100;

	    var yearList1=this.createYearsList(currentYear, earliestYear, teacher.gradyear1);
	    var yearList2=this.createYearsList(currentYear, earliestYear, teacher.gradyear2);
	    var yearList3=this.createYearsList(currentYear, earliestYear, teacher.gradyear3);

       var content ='<table>'+
       '<tr><td>真实姓名</td><td><input id="teacher_update_realname" type="text" value="' + teacher.realName + '"/></td></tr>' +
       '<tr><td>职业</td><td>' + occupationList + '</td></tr>' +
       '<tr><td>手机号码</td><td><input id="teacher_update_mobile" type="text" value="' + teacher.mobileNumber + '"/></td></tr>' +
       '<tr><td>联系电话</td><td><input id="teacher_update_phonenumber" type="text" value="' + teacher.phoneNumber + '"/></td></tr>' +
       '<tr><td>QQ</td><td><input id="teacher_update_qq" type="text" value="' + teacher.qq + '"/></td></tr>' +
       '<tr><td>专长1</td><td><select id="teacher_update_speciality_1"><option value="">--</option>' + specList1 + '</select></td></tr>' +               
       '<tr><td>专长2</td><td><select id="teacher_update_speciality_2"><option value="">--</option>' + specList2 + '</select></td></tr>' +               
       '<tr><td>专长3</td><td><select id="teacher_update_speciality_3"><option value="">--</option>' + specList3 + '</select></td><tr/>' +   
       '<tr><td colspan="2">学位 <select id="teacher_update_degree_1">' + eduList1 + '</select> 毕业时间<select id="teacher_update_gradyear_1">' + yearList1 + '</select> 学校<input id="teacher_update_school_1" type="text" value="' + teacher.school1 + '"/></td><tr/>' +   
       '<tr><td colspan="2">学位 <select id="teacher_update_degree_2">' + eduList1 + '</select> 毕业时间<select id="teacher_update_gradyear_2">' + yearList2 + '</select> 学校<input id="teacher_update_school_1" type="text" value="' + teacher.school2 + '"/></td><tr/>' +   
       '<tr><td colspan="2">学位 <select id="teacher_update_degree_3">' + eduList1 + '</select> 毕业时间<select id="teacher_update_gradyear_3">' + yearList3 + '</select> 学校<input id="teacher_update_school_1" type="text" value="' + teacher.school3 + '"/></td><tr/>' +   
       '<tr><td colspan="2"><textarea id="teacher_update_info" rows="8" cols="70">' + teacher.info + '</textarea></td><tr/>' +   
       '<tr><td colspan="2"><input type="button" onclick="REGISTRATION.updateTeacherInfo();" value="修改教师相关信息"/><span id="teacher_update_error"/></td></tr></table></div>';
       
	    $('#div_update_teacher_info').html(content);

	
},

showRegistration:function() {

   $('#DIV_USER_INFO_UPDATE').css("display", "inline");
   $('#DIV_USER_INFO_UPDATE').css("visibility", "visible");

	var content='<div style="border-radius:9px;border:2px solid #CCCCCC;"><table><tr><td>'+
                '登录用户名</td><td><input id="registration_username" type="text"/><span id="reg_username_error" style="color:red;"/></td></tr>' +
                '<tr><td>密码</td><td><input id="registration_password" type="password"/><span id="reg_password_error" style="color:red;"/></td></tr>' +
                '<tr><td>重复密码</td><td><input id="registration_password_retype" type="password"/></td></tr>' +
                '<tr><td>昵称(其它用户所看到的名字)</td><td><input id="registration_nickname" type="text"/></td></tr>' +
                '<tr><td>电子邮件</td><td><input id="registration_email" type="text"/><span id="reg_email_error" style="color:red;"/></td></tr>' +
                '<tr><td>请选择"教师"如果你是音乐专业人士 </td><td><INPUT TYPE=RADIO NAME="registration_type" VALUE="1">教师 ' +
                '<INPUT TYPE=RADIO NAME="registration_type" VALUE="2" checked>普通用户<span id="reg_type_error" style="color:red;"/></td></tr>' + 
                '<tr><td>地区</td><td>' +
                '<div id="REG_ZONE_LIST"></div>' +               
                '<div id="REG_AREA_LIST"></div><span id="reg_area_error" style="color:red;"/></td></tr>' +               
                '<tr><td colspan="2"><input type="button" onclick="REGISTRATION.registerUser();" value="注册"/></td></tr></table>';
                
    $('#DIV_USER_INFO_UPDATE').html(content);
    this.showZoneList('REG_ZONE_LIST', 'REG_AREA_LIST', false);
},

showTeacherRegistration: function() {

    var occupations = GLOBAL.get('OCCUPATIONS');
    
    var occupationList = '<select id="reg_teacher_occupation">';
    for(i in occupations) {
      occupationList += '<option value="' + i +'">' + occupations[i] + '</option>';
    }
    occupationList+='</select>';

    var educationList='<option value="">--</option>';
    var educations = GLOBAL.get('EDUCATIONS');
    for(i in educations) {
      educationList += '<option value="' + i +'">' + educations[i] + '</option>';
    }
    educationList+='</select>';

    var specList='';
    var specialities = GLOBAL.get('SPECIALITIES');
    for(i in specialities) {
      specList += '<option value="' + i +'">' + specialities[i] + '</option>';
    }
    
    var yearList='';
    var date = new Date();
    var currentYear = date.getFullYear();
    var earliestYear = currentYear-100;
    for(var year=currentYear; year>=earliestYear; --year) {
        yearList+='<option value="' + year + '">' + year + '</option>';
    }
    yearList+='</select>';

    var content='<div style="border-radius:9px;border:2px solid #CCCCCC;"><table><tr><td>'+
                '真实姓名(会员可见)</td><td><input id="reg_teacher_realname" type="text"/><span id="reg_teacher_realname_error" style="color:red;"/></td></tr>' +
                '<tr><td>职业</td><td>' + occupationList + '<span id="reg_teacher_occupation_error" style="color:red;"/></td></tr>' +
                '<tr><td>手机号码</td><td><input id="reg_teacher_mobile" type="text"/><span id="reg_teacher_mobilenumber_error" style="color:red;"/></td></tr>' +
                '<tr><td>联系电话</td><td><input id="reg_teacher_phonenumber" type="text"/><span id="reg_teacher_phonenumber_error" style="color:red;"/></td></tr>' +
                '<tr><td>QQ</td><td><input id="reg_teacher_qq" type="text"/></td></tr>' +
                '<tr><td colspan="2"><b>请列出不超过三项专长技能，以便学生参考查找</b></td></tr><tr><td>' +
                '专长1</td><td><select id="reg_teacher_speciality_1"><option value="">--</option>' + specList + '</select></td></tr>' +               
                '<tr><td>专长2</td><td><select id="reg_teacher_speciality_2"><option value="">--</option>' + specList + '</select></td></tr>' +               
                '<tr><td>专长3</td><td><select id="reg_teacher_speciality_3"><option value="">--</option>' + specList + '</select></td><tr/>' +               
                '<tr><td colspan="2"><b>请从最近毕业时间开始，填写你的教育背景，以便学生对你有更好的了解。最多填三个近期院校</b></td></tr>' +
                '<tr><td colspan="2">毕业时间<select id="reg_teacher_gradyear1"><option value="0">--</option>'+yearList + '  学位<select id="reg_teacher_education1">'+educationList + '毕业院校<input type="text" id="reg_teacher_school_1"/></td></tr>' +
                '<tr><td colspan="2">毕业时间<select id="reg_teacher_gradyear2"><option value="0">--</option>'+yearList + '  学位<select id="reg_teacher_education2">'+educationList + '毕业院校<input type="text" id="reg_teacher_school_2"/></td></tr>' +
                '<tr><td colspan="2">毕业时间<select id="reg_teacher_gradyear3"><option value="0">--</option>'+yearList + '  学位<select id="reg_teacher_education3">'+educationList + '毕业院校<input type="text" id="reg_teacher_school_3"/></td></tr>' +
                '<tr><td colspan="2">若还有额外信息，可在下栏补充，请勿超过500字</td></tr>' +
                '<tr><td colspan="2"><textarea id="reg_teacher_additional_info" rows=10 cols=50></textarea></td></tr>' +
                '<tr><td colspan="2"><input type="button" onclick="REGISTRATION.registerTeacherInfo();" value="补充教师信息"/></td></tr></table>';

    $('#DIV_USER_INFO_UPDATE').html(content);

}

};