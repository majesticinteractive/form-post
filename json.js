//URL of the web form to be submitted via HTTP POST
var url = "";
 
$.ajax({
    url: url,
    type: "POST",
    crossDomain: true,
    //web form fields and values
    //add additional standard or master pool fields here
    //field names can be viewed by appending &show_field_names=1 to the web form URL (url defined above) within your internet browser
    data: {act:"insert", output_format:"json_v2", fname:"Firstname", email:"testatexample.com"},
    dataType: "json",
    success:function(json) {
 
        //uncomment to view the actual json returned
        //alert(JSON.stringify(json));
 
        var obj = $.parseJSON(JSON.stringify(json));
        if (obj.HTTP_STATUS_CODE == "200") {
 
            //web form completed successfully
            //at this point you may need the returned id
            alert(obj.id);
            //or the encoded id
            alert(obj.id_encoded);
 
        } else {
 
            //POST not accepted - submission errors have occured i.e. missing mandatory fields or fields supplied in an invalid format
            //obj.data.error_string contains the full result in a formatted string
            alert(obj.data.error_string);
 
            //----------OR----------
 
            //you can loop through each element if you would like to
            //obj.data.mandatory contains mandatory fields
            if (obj.data.hasOwnProperty('mandatory')) {
                $.each(obj.data.mandatory, function (index, value) {
                    var obj2 = $.parseJSON(JSON.stringify(value));
                    alert(obj2.field_description);
                });
            }
 
            //$obj->data->invalid_format contains fields supplied in an invalid format
            if (obj.data.hasOwnProperty('invalid_format')) {
                $.each(obj.data.invalid_format, function (index, value) {
                    var obj2 = $.parseJSON(JSON.stringify(value));
                    alert(obj2.field_description);
                });
            }
 
        }
    },
 
    error:function(xhr,status,error){
        alert(status);
    }
     
});