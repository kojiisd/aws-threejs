var apigClient = apigClientFactory.newClient();

var params = {
    // This is where any modeled request parameters should be added.
    // The key is the parameter name, as it is defined in the API in API Gateway.
        "Content-Type": "application/x-www-form-urlencoded"
};

var body = {

    "label_id": "id",
    "label_range": "timestamp",
    "id": [
    "H"
    ],
    "aggregator": "latest",
    "time_from": "2017-07-23T16:00:00.000",
    "time_to": "2017-07-23T16:06:00.000",
    "params": {
    "range": "timestamp"
    }
};

var additionalParams = {
    // If there are any unmodeled query parameters or headers that must be
    //   sent with the request, add them here.
    headers: {
    },
    queryParams: {
    }
};
$(document).ready(function(){
    $("#getData").click(function() {
        apigClient.rootPost(params, body, additionalParams)
        .then(function(result){
            var resultObjArray= new Array();
            // Add success callback code here.
            var resultJson = JSON.parse(result.data);
            for (var index = 0; index < resultJson.length; index++) {
                var resultObj = new Object();
                resultObj.id = resultJson[index].id;
                resultObj.score = resultJson[index].score
                resultObjArray[index] = resultObj;
            }
    
            for (var index = 0; index < resultObjArray.length; index++) {
                var resultObj = resultObjArray[index];
                if (resultObj.score != 0) {
                    $('#' + resultObj.id).css('background-color', 'rgba(255,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')')
                }
            }
    
        }).catch( function(result){
            // Add error callback code here.
            alert("Failed");
            alert(JSON.stringify(result));
        });
    });
});
