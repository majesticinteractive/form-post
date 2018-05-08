<?php
//URL of the web form to be submitted via HTTP POST
$url = "";

//associative array containing web form fields and values
$arr_fields = array(
                    'act'=>"insert",
                    'output_format'=>"xml_v2",
                    'fname'=>"Firstname",
                    'email'=>"testatexample.com"
                    //add additional standard or master pool fields here
                    //field names can be viewed by appending &show_field_names=1 to the web form URL ($url defined above) within your internet browser
                    );

//build your POST fields string
$fields_string = http_build_query($arr_fields);

//CURL POST
try {
    //initialise CURL
    $ch = curl_init();
    //set CURL options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POST, count($arr_fields));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
    //execute CURL POST
    $result = curl_exec($ch);
    if (!$result) {
        //CURL submission error - add custom error logging here
        var_dump($result);
        exit();
    }
    //close connection
    curl_close($ch);
} catch (Exception $e) {
    //CURL error - add custom error logging here
    var_dump($e);
    exit();
}

//uncomment to view the actual xml returned
//header("Content-type:text/xml; charset=utf-8");
//echo $result;
//exit();

//process the result
$obj = new SimpleXMLElement($result);

if ($obj->HTTP_STATUS_CODE == "200") {

    //web form completed successfully
    //at this point you may need the returned id
    echo $obj->id;
    //or the encoded id
    echo $obj->id_encoded;

} else {

    //POST not accepted - submission errors have occured i.e. missing mandatory fields or fields supplied in an invalid format

    //$obj->data->error_string returns the full result in a formatted string
    $form_errors = $obj->data->error_string;
    //each error is separated by a line break (PHP_EOL)
    echo str_replace(PHP_EOL, "", $form_errors);

    //----------OR----------

    //you can loop through each element if you would like to
    //$obj->data->mandatory contains mandatory fields
    if (isset($obj->data->mandatory)) {
        foreach ($obj->data->mandatory->element as $element) {
            echo $element->field_description;
        }
    }

    //$obj->data->invalid_format contains fields supplied in an invalid format
    if (isset($obj->data->invalid_format)) {
        foreach ($obj->data->invalid_format->element as $element) {
            echo $element->field_description;
        }
    }

}