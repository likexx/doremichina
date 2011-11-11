
var REVIEW = {
		
	postReview:function() {
		var teacher_id=$('#new_review_teacher_id').val();
		var spec1_rating=$('#new_review_spec1_rating').val();
		var spec2_rating=$('#new_review_spec2_rating').val();
		var spec3_rating=$('#new_review_spec3_rating').val();
		var comment=$('#new_review_comment').val();
		
		var review = {
				"teacher_id":teacher_id,
				"spec1_rating":spec1_rating,
				"spec2_rating":spec2_rating,
				"spec3_rating":spec3_rating,
				"comment":comment
		};
		
		console.log(review);
		
	    $.post('./updateReview.php',review, function(data) {
	    	console.log(data);
			var d = YAHOO.lang.JSON.parse(data);

	    	REVIEW.loadReviews(d.teacher_id);
	    	});
		
	},	
	
	loadReviews:function(id) {
		
		var req = {
				id: id
		};
		
		$.post('./loadReviews.php?', req, function(data){
			var d = YAHOO.lang.JSON.parse(data);
			console.log(d);
			var spec1id = $('#review_teacher_spec1_value').val();
			var spec2id = $('#review_teacher_spec2_value').val();
			var spec3id = $('#review_teacher_spec3_value').val();
			
			var content = "";
			for(i in d.reviews){
				
				var r = d.reviews[i];
				var postDate = new Date(r.timestamp*1000);
				content += r.reviewername + '  日期:' + postDate.toLocaleDateString() + '<br/>';
				if (spec1id>0) {
					content += GLOBAL.getSpeciality(spec1id) + ':' + r.spec1_rating + '<br/>';
				}

				if (spec2id>0) {
					content += GLOBAL.getSpeciality(spec2id) + ':' + r.spec2_rating + '<br/>';
				}
				
				if (spec3id>0) {
					content += GLOBAL.getSpeciality(spec3id) + ':' + r.spec3_rating + '<br/>';
				}
				
                content += r.comment + '<hr>';
            }

            $('#DIV_TEACHER_DETAILS_REVIEWS').html(content);
        });	
    },

};