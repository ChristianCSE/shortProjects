
//age
$(function(){
    var $select = $('.ages');
    $select.append( $("<option> </option>").val(0).html("") );
    for (var i=18; i<=100 ;i++){
        $select.append( $("<option> </option>").val(i).html(i) );
    }
	});

//gender
$(function(){
var arr = ["", "F", "M", "M&F", "None"];
var $select = $(".gender");
$.each( arr, function(key, value) {
        $select.append($('<option></option>').val(value).html(value));
     }
);
});

//distance
$(function(){
    var $select = $(".distance");
    $select.append($('<option></option>').val(0).html(" "));
    for (i=2;i<=150;i++){

        $select.append($('<option></option>').val(i).html(i + ' miles'));
    }
});


//home state
$(function(){
	var abbr = new Array("", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY");
	var fullState =  new Array("Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming");
	var abrrFull = new Object();
	var len = abbr.length;
	var $select = $(".statefrom");
	for(var i = 0; i < len; i++)
	{
		abrrFull[fullState[i]]  = abbr[i];
 	}
	$.each( abrrFull, function(key, value) {
		  $select.append($('<option></option>').val(key).html(value));
		}
	);
});

//religion
$(function(){
	var religion = ["","Christianity","Atheism",  "Islam", "Hinduism", "Buddhism", "Sikhism", "Judaism", "Baha'ism", "Confucianism", "Jainism", "Shintoism", "Other"]
	var len = religion.length;
	$select = $(".religion");
$.each( religion, function(key, value) {
        $select.append($('<option></option>').val(value).html(value));
     });
});

//politics
$(function(){
	var politics = ["", "Conservative", "Liberal", "Progressive", "Libertarian", "None"];
	var len = politics.length;
	$select = $(".politics");
$.each( politics, function(key, value) {
        $select.append($('<option></option>').val(value).html(value));
     });
});

//height
$(function(){
	$select = $(".height");
	$select.append( $("<option> </option>").val(0).html("") );
	for(var i = 5; i < 7; i++){
		for(var j = 0; j < 12; j++){
			var ftinch = i + "'" + j + "''";
			$select.append($('<option></option>').val(ftinch).html(ftinch));
		}
		}
});


