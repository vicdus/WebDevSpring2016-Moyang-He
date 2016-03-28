(function () {
    var form = require("./models/form.mock.json");
    //console.log(form);
    var yo = form.filter(function(form){
        return form.userId == 123;
    });

    console.log(yo)

})();