

var REGISTRATION = {

selectedZone:null,
selectedArea:null,

resetErrors: function() {
        $('#reg_username_error').html('');
        $('#reg_password_error').html('');
        $('#reg_type_error').html('');
        $('#reg_area_error').html('');
},

processBasicRegistrationResult: function(value) {
this.resetErrors();
switch(value) {
 case '1':
        $('#reg_username_error').html('(用户名已经存在)');
        break;
 case '2':
        $('#reg_username_error').html('(用户名太长)');
        break;
 case '3':
        $('#reg_password_error').html('(密码必须4-15位)');
        break;
 case '4':
        $('#reg_username_error').html('(请填写必须的资料)');
        break;
 case '5':
        $('#reg_username_error').html('(数据库错误)');
        break;
 default:
        PAGE.showTeacherRegistration();
        break;
 }

},

processBasicUpdateResult: function(value) {

	switch(value) {
	 case '1':
	        $('#update_name_error').html('(用户名已经存在)');
	        break;
	 case '2':
	        $('#update_name_error').html('(用户名太长)');
	        break;
	 case '3':
	        $('#update_password_error').html('(密码必须4-15位)');
	        break;
	 case '4':
	        $('#update_error').html('(请填写必须的资料)');
	        break;
	 case '5':
	        $('#update_error').html('(数据库错误)');
	        break;
	 default:
	        PAGE.showLoggedInUserMenu(true);
	        break;
	 }

},

processUserLoginResult: function(value) {

	switch(value) {
	 case '0':
	        $('#login_error').html('登录失败    ');
	        break;
	 default:
	        PAGE.showLoggedInUserMenu(true);
	        break;
	 }

},

processTeacherRegistrationResult: function(value) {

	switch(value) {
	 case '100':
	        $('#reg_realname_error').html('用户不存在');
	        break;
	 case '101':
	        $('#reg_realname_error').html('(请填入至少一项专长)');
	        break;
	 case '102':
	        $('#reg_mobilenumber_error').html('(请填入至少一种联系方式)');
	        break;
	 default:
		 	PAGE.showLoggedInUserMenu();
	        break;
	 }

},

processTeacherUpdateResult: function(value) {

	switch(value) {
	 case '100':
	        $('#teacher_update_error').html('用户不存在');
	        break;
	 case '101':
	        $('#teacher_update_error').html('(请填入至少一项专长)');
	        break;
	 case '102':
	        $('#teacher_update_error').html('(请填入至少一种联系方式)');
	        break;
	 default:
            $('#teacher_update_error').html("修改完成");
	        break;
	 }

},

login: function() {
    $('#login_error').html('');
	var username=$('#login_username').val();
	var password=$('#login_password').val();
	var loginInfo = {
			username:username,
			password:password
	};
	
	$.post('./login.php',loginInfo, function(data) {REGISTRATION.processUserLoginResult(data);});
},

registerUser: function() {

    var username = $('#registration_username').val();
    var password = $('#registration_password').val();
    var password2 = $('#registration_password_retype').val();
    var nickname = $('#registration_nickname').val();
    var email = $('#registration_email').val();
    
    var type = $('input:radio[name=registration_type]:checked').val();
    
    if (password!=password2) {
        this.resetErrors();
        $('#reg_password_error').html('(密码设置不一致)');
        return;
    }
    
    if (password.length < 4 || password.length>15) {
        this.resetErrors();
        $('#reg_password_error').html('(密码必须是4-15位)');
        return;
    }
    
    if (type==null || type==undefined) {
        this.resetErrors();
        $('#reg_type_error').html('(请选择用户类型)');
        return;
    }
    
    if (this.selectedZone==null || this.selectedArea == null) {
        this.resetErrors();
        $('#reg_area_error').html('(请选择所在地区)');
        return;
    }
    
    var userBasicInfo = {
        username: username,
        password: password,
        nickname: nickname,
        email: email,
        type: type,
        zone: this.selectedZone,
        area: this.selectedArea
    };
    
    $.post('./registerUser.php',userBasicInfo, function(data) {REGISTRATION.processBasicRegistrationResult(data);});
    
},

updateUserBasicInfo: function() {
	
    var password = $('#update_password').val();
    var password2 = $('#update_password_retype').val();
    var nickname = $('#update_nickname').val();
    var email = $('#update_email').val();

    $('#update_password_error').html('');
    $('#update_error').html('');
    $('#update_email_error').html('');
    
    if (password!=password2) {
        this.resetErrors();
        $('#update_password_error').html('(密码设置不一致)');
        return;
    }
    
    if ((password.length > 0 && password.length<4) || password.length>15) {
        this.resetErrors();
        $('#update_password_error').html('(密码必须是4-15位)');
        return;
    }
    
    if (this.selectedZone==null || this.selectedArea == null) {
    	this.selectedZone = 0;
    	this.selectedArea = 0;
    }
    
    var userBasicInfo = {
        password: password,
        nickname: nickname,
        email: email,
        zone: this.selectedZone,
        area: this.selectedArea
    };
    
    $.post('./updateUserBasicInfo.php',userBasicInfo, function(data) {REGISTRATION.processBasicUpdateResult(data);});
	
},

registerTeacherInfo: function() {
	
    var realname = $('#reg_teacher_realname').val();
    var occupation = $('#reg_teacher_occupation').val();
    var mobileNumber = $('#reg_teacher_mobile').val();
    var phoneNumber = $('#reg_teacher_phonenumber').val();
    var qq = $('#reg_teacher_qq').val();
    
    var spec1 = $('#reg_teacher_speciality_1').val();
    var spec2 = $('#reg_teacher_speciality_2').val();
    var spec3 = $('#reg_teacher_speciality_3').val();

    var gradyear1 = $('#reg_teacher_gradyear1').val();
    var degree1 = $('#reg_teacher_education1').val();
    var school1 = $('#reg_teacher_school_1').val();

    var gradyear2 = $('#reg_teacher_gradyear2').val();
    var degree2 = $('#reg_teacher_education2').val();
    var school2 = $('#reg_teacher_school_2').val();

    var gradyear3 = $('#reg_teacher_gradyear3').val();
    var degree3 = $('#reg_teacher_education3').val();
    var school3 = $('#reg_teacher_school_3').val();
    
    var addInfo = $('#reg_teacher_additional_info').val();
    
    var teacherInfo = {
    	realname: realname,
    	occupation: occupation,
    	mobile_number: mobileNumber,
    	phone_number: phoneNumber,
    	qq: qq,
    	speciality_1: spec1,
    	speciality_2: spec2,
    	speciality_3: spec3,
    	gradyear_1: gradyear1,
    	degree_1: degree1,
    	school_1: school1,
    	gradyear_2: gradyear2,
    	degree_2: degree2,
    	school_2: school2,
    	gradyear_3: gradyear3,
    	degree_3: degree3,
    	school_3: school3,
    	additional_info: addInfo
    		
    };
    
    $.post('./registerTeacher.php',teacherInfo, function(data) {REGISTRATION.processTeacherRegistrationResult(data);});

},

updateTeacherInfo: function() {
	
    var realname = $('#teacher_update_realname').val();
    var occupation = $('#teacher_update_occupation').val();
    var mobileNumber = $('#teacher_update_mobile').val();
    var phoneNumber = $('#teacher_update_phonenumber').val();
    var qq = $('#teacher_update_qq').val();
    
    var spec1 = $('#teacher_update_speciality_1').val();
    var spec2 = $('#teacher_update_speciality_2').val();
    var spec3 = $('#teacher_update_speciality_3').val();

    var gradyear1 = $('#teacher_update_gradyear_1').val();
    var degree1 = $('#teacher_update_degree_1').val();
    var school1 = $('#teacher_update_school_1').val();

    var gradyear2 = $('#teacher_update_gradyear_2').val();
    var degree2 = $('#teacher_update_degree_2').val();
    var school2 = $('#teacher_update_school_2').val();

    var gradyear3 = $('#teacher_update_gradyear_3').val();
    var degree3 = $('#teacher_update_degree_3').val();
    var school3 = $('#teacher_update_school_3').val();
    
    var info = $('#teacher_update_info').val();
    
    var teacherInfo = {
    	realname: realname,
    	occupation: occupation,
    	mobile_number: mobileNumber,
    	phone_number: phoneNumber,
    	qq: qq,
    	speciality_1: spec1,
    	speciality_2: spec2,
    	speciality_3: spec3,
    	gradyear_1: gradyear1,
    	degree_1: degree1,
    	school_1: school1,
    	gradyear_2: gradyear2,
    	degree_2: degree2,
    	school_2: school2,
    	gradyear_3: gradyear3,
    	degree_3: degree3,
    	school_3: school3,
    	info: info
    		
    };
    
    $.post('./updateTeacherInfo.php',teacherInfo, function(data) {REGISTRATION.processTeacherUpdateResult(data);});

}

};