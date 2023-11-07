/*******************************************************************************
 * * * FileName: NOSCORM APIWrapper.js *
 ******************************************************************************/

var _Debug = false; // set this to false to turn debugging off
// and get rid of those annoying alert boxes.

// local variable definitions
var apiHandle = null;
var API = null;
var findAPITries = 0;
var parentWindow = null;
var interactionsCount = 0;

/*******************************************************************************
 * * * Function: doInitialize() * All functions are not implemented in this noscorm
 * apiwrapper.
 ******************************************************************************/
function doInitialize() {
	// do nothing

}

function doTerminate() {
	return "true";

}

function doGetValue(name) {

}

function doSetValue(name, value) {

}

function doCommit() {

}

/*******************************************************************************
 * * * Function LMSIsInitialized() * Inputs: none * Return: true if the LMS API
 * is currently initialized, otherwise false * * Description: * Determines if
 * the LMS API is currently initialized or not. *
 ******************************************************************************/
function LMSIsInitialized() {
	return false;
}

/*******************************************************************************
 * * * Function getAPIHandle() * Inputs: None * Return: value contained by
 * APIHandle * * Description: * Returns the handle to API object if it was
 * previously set, * otherwise it returns null *
 ******************************************************************************/
function getAPIHandle() {
	return null;
}

/*******************************************************************************
 * * * Function findAPI(win) * Inputs: win - a Window Object * Return: If an API
 * object is found, it's returned, otherwise null is returned * * Description: *
 * This function looks for an object named API in parent and opener windows *
 ******************************************************************************/
function findAPI(win) {
	return null;
}

/*
 * GetAPI -Searches all parent and opener windows relative to the current window
 * for the SCORM 2004 API Adapter. Returns a reference to the API Adapter if
 * found or null otherwise.
 */
function getAPI() {
	return null;

}
