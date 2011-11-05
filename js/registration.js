

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

registerUser: function() {

    var username = $('#registration_username').val();
    var password = $('#registration_password').val();
    var password2 = $('#registration_password_retype').val();
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
        email: email,
        type: type,
        zone: this.selectedZone,
        area: this.selectedArea
    };
    
    console.log(userBasicInfo);
    
    $.post('./registerUser.php',userBasicInfo, function(data) {REGISTRATION.processBasicRegistrationResult(data);});
    
}

};