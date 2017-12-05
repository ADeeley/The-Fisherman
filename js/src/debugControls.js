'use strict';
const DEBUG_DIV = 'debug_controls';

/**
 * Iterates over the properties of an objet and displays them to the debug
 * area of the page.
 * @param {String} object The object to be iterated over.
 */
function displayDebug(object) {
    let target = document.getElementById(DEBUG_DIV),
        debugData = '',
        property = '';

    for (property in object) {
        if (object.hasOwnProperty(property)) {
            debugData += property;
            debugData += ' ' + object[property] + ' ';
        }
    }
    console.log(debugData);
    target.innerHTML = debugData;
};


module.exports = {
    debugMode: true,
    displayDebug: displayDebug,
};
