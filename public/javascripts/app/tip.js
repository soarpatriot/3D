/**
 * all types tip generate
 * @param type
 * @param layout
 * @param message
 */
function generate(type,layout,message) {
    var n = noty({
        text: message,
        type: type,
        dismissQueue: false,
        layout: layout,
        theme: 'defaultTheme'
    });
    setTimeout(function(){
        n.close();
    },3000);
}

/**
 * success tip
 * @param message
 */
function success(message){
    generate('success','topCenter',message);
}

/**
 * error tip
 * @param message
 */
function error(message){
    generate('error','topCenter',message);
}

