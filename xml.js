//URL of the web form to be submitted via HTTP POST
var url = ""
 
$.ajax({
    url: url,
    type: "POST",
    crossDomain: true,
    //web form fields and values
    //add additional standard or master pool fields here
    //field names can be viewed by appending &show_field_names=1 to the web form URL ($url defined above) within your internet browser      
    data: {act:"insert", output_format:"xml_v2", fname:"Firstname", email:"testatexample.com"},
    dataType: "xml",
    success:function(xml) {
 
        if ($(xml).find('HTTP_STATUS_CODE').text() == "200") {
 
            //web form completed successfully
            //at this point you may need the returned id
            alert($(xml).find('id').text());
            //or the encoded id
            alert($(xml).find('id_encoded').text());
 
        } else {
 
            //POST not accepted - submission errors have occured i.e. missing mandatory fields or fields supplied in an invalid format
             
            //$(xml).find('error_string').text() contains the full result in a formatted string
            alert($(xml).find('error_string').text());
 
            //----------OR----------
 
            //you can loop through each element if you would like to
            //$(xml).find('data > mandatory > element > field_description') contains mandatory fields
            $(xml).find('data > mandatory > element > field_description').each(function() {
                alert($(this).text());
            });
 
            //$(xml).find('data > invalid_format > element > field_description') contains fields supplied in an invalid format
            $(xml).find('data > invalid_format > element > field_description').each(function() {
                alert($(this).text());
            });
 
        }
    },
 
    error:function(xhr,status,error){
        alert(status);
    }
     
});