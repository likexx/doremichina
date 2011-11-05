

var PAGE = {

createTeacherSummary:function(t) {
    var s = '<div id="DIV_TEACHER_SUMMARY_' + t.id +'">' +t.name;
    for(var i=0;i<t.rating;++i) {
       s+='<img src="./images/star.png"/>';
    }
    s+='<br/>专长:';
    
    var sIds = t.specialities.split(',');

    for(var i in sIds) {
        var id = sIds[i];
        var speciality = GLOBAL.getSpeciality(id);
        s+=speciality.name + ',';
    }    
    
    s+='</div><br/>';
    return s;
},

onSelectArea:function(areaDivName, areaId, showTeachers) {

   var content="";
   if (showTeachers) {
       var teachers = GLOBAL.getTeachers(areaId);
    
       for(i in teachers) {
           var teacher = teachers[i];
           content += this.createTeacherSummary(teacher);
       }
       
       $('#DIV_TEACHERS_LIST').html(content);
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
       
       console.log(listContent);
       
       $('#'+zoneDivName).html(listContent);
},



showRegistration:function() {

    var content='<div style="border-radius:9px;border:2px solid #CCCCCC;"><table><tr><td>'+
                '用户名</td><td><input id="registration_username" type="text"/><span id="reg_username_error" style="color:red;"/></td></tr>' +
                '<tr><td>密码</td><td><input id="registration_password" type="password"/><span id="reg_password_error" style="color:red;"/></td></tr>' +
                '<tr><td>重复密码</td><td><input id="registration_password_retype" type="password"/></td></tr>' +
                '<tr><td>电子邮件</td><td><input id="registration_email" type="text"/><span id="reg_email_error" style="color:red;"/></td></tr>' +
                '<tr><td>注册类型 </td><td><INPUT TYPE=RADIO NAME="registration_type" VALUE="1">教师 ' +
                '<INPUT TYPE=RADIO NAME="registration_type" VALUE="2">普通用户<span id="reg_type_error" style="color:red;"/></td></tr>' + 
                '<tr><td>地区</td><td>' +
                '<div id="REG_ZONE_LIST"></div>' +               
                '<div id="REG_AREA_LIST"></div><span id="reg_area_error" style="color:red;"/></td></tr>' +               
                '<tr><td colspan="2"><input type="button" onclick="REGISTRATION.registerUser();" value="注册"/></td></tr></table>';
                
    $('#DIV_USER_MENU').html(content);
    this.showZoneList('REG_ZONE_LIST', 'REG_AREA_LIST', false);
},

showTeacherRegistration: function() {

    var occupations = GLOBAL.get('OCCUPATIONS');
    
    var occupationList = '<select>';
    for(i in occupations) {
      occupationList += '<option value="' + i +'">' + occupations[i] + '</option>';
    }
    occupationList+='</select>';

    var educationList='<select>';
    var educations = GLOBAL.get('EDUCATIONS');
    for(i in educations) {
      educationList += '<option value="' + i +'">' + educations[i] + '</option>';
    }
    educationList+='</select>';

    var yearList='<select>';
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
                '<tr><td>联系电话</td><td><input id="reg_teacher_phonenumber" type="text"/><span id="reg_teacher_phonenumber_error" style="color:red;"/></td></tr>' +
                '<tr><td>QQ</td><td><input id="reg_teacher_qq" type="text"/></td></tr>' +
                '<tr><td colspan="2"><b>请列出不超过三项专长技能，以便学生参考查找</b></td></tr><tr><td>' +
                '专长1</td><td><input id="reg_teacher_speciality_1" type="text"/></td></tr>' +               
                '<tr><td>专长2</td><td><input id="reg_teacher_speciality_2" type="text"/></td></tr>' +               
                '<tr><td>专长3</td><td><input id="reg_teacher_speciality_3" type="text"/></td><tr/>' +               
                '<tr><td colspan="2"><b>请从最近毕业时间开始，填写你的教育背景，以便学生对你有更好的了解。最多填三个近期院校</b></td></tr>' +
                '<tr><td colspan="2">毕业时间'+yearList + '  学位'+educationList + '毕业院校<input type="text" id="reg_teacher_graduationschool_1"/></td></tr>' +
                '<tr><td colspan="2">毕业时间'+yearList + '  学位'+educationList + '毕业院校<input type="text" id="reg_teacher_graduationschool_2"/></td></tr>' +
                '<tr><td colspan="2">毕业时间'+yearList + '  学位'+educationList + '毕业院校<input type="text" id="reg_teacher_graduationschool_3"/></td></tr>' +
                '<tr><td colspan="2">若还有额外信息，可在下栏补充，请勿超过500字</td></tr>' +
                '<tr><td colspan="2"><textarea id="reg_teacher_additional_info" rows=10 cols=50></textarea></td></tr>' +
                '<tr><td colspan="2"><input type="button" onclick="REGISTRATION.registerTeacherInfo();" value="补充教师信息"/></td></tr></table>';

    $('#DIV_USER_MENU').html(content);

}

};