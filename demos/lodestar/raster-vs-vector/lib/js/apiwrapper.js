/*******************************************************************************
**
** FileName: APIWrapper.js
**
*******************************************************************************/

/*******************************************************************************
** ls
** Advanced Distributed Learning (ADL) grants you ("Licensee") a non-
** exclusive, royalty free, license to use, modify and redistribute this
** software in source and binary code form, provided that i) this copyright
** notice and license appear on all copies of the software; and ii) Licensee does
** not utilize the software in a manner which is disparaging to ADL.
**
** This software is provided "AS IS," without a warranty of any kind.  ALL
** EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
** IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-
** INFRINGEMENT, ARE HEREBY EXCLUDED.  ADL AND ITS LICENSORS SHALL NOT BE LIABLE
** FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
** DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES.  IN NO EVENT WILL ADL  OR ITS
** LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR DATA, OR FOR DIRECT,
** INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER
** CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING OUT OF THE USE OF
** OR INABILITY TO USE SOFTWARE, EVEN IF ADL  HAS BEEN ADVISED OF THE POSSIBILITY
** OF SUCH DAMAGES.
**
*******************************************************************************/

/*******************************************************************************
** This file is part of the ADL Sample API Implementation intended to provide
** an elementary example of the concepts presented in the ADL Sharable
** Content Object Reference Model (SCORM).
**
** The purpose in wrapping the calls to the API is to (1) provide a
** consistent means of finding the LMS API implementation within the window
** hierarchy and (2) to validate that the data being exchanged via the
** API conforms to the defined CMI data types.
**
** This is just one possible example for implementing the API guidelines for
** runtime communication between an LMS and executable content components.
** There are several other possible implementations.
**
** Usage: Executable course content can call the API Wrapper
**      functions as follows:
**
**    javascript:
**          var result = doInitialize();
**          if (result != true) 
**          {
**             // handle error
**          }
**
**    authorware
**          result := ReadURL("javascript:doInitialize()", 100)
**
*******************************************************************************/

var _Debug = false;  // set this to false to turn debugging off
                     // and get rid of those annoying alert boxes.

// Define exception/error codes
var _NoError = 0;
var _GeneralException = 101;
var _GeneralInitializationFailure = 102;
var _AlreadyInitialized = 103;
var _ContentInstanceTerminated = 104;
var _GeneralTerminationFailure = 111;
var _TerminationBeforeInitialization = 112;
var _TerminationAfterTermination = 113;
var _ReceivedDataBeforeInitialization = 122;
var _ReceivedDataAfterTermination = 123;
var _StoreDataBeforeInitialization = 132;
var _StoreDataAfterTermination = 133;
var _CommitBeforeInitialization = 142;
var _CommitAfterTermination = 143;
var _GeneralArgumentError = 201;
var _GeneralGetFailure = 301;
var _GeneralSetFailure = 351;
var _GeneralCommitFailure = 391;
var _UndefinedDataModelElement = 401;
var _UnimplementedDataModelElement = 402;
var _DataModelElementValueNotInitialized = 403;
var _DataModelElementIsReadOnly = 404;
var _DataModelElementIsWriteOnly = 405;
var _DataModelElementTypeMismatch = 406;
var _DataModelElementValueOutOfRange = 407;


// local variable definitions
var apiHandle = undefined;
var API =  undefined;
var findAPITries = 0;


/*******************************************************************************
**
** Function: doInitialize()
** Inputs:  None
** Return:  CMIBoolean true if the initialization was successful, or
**          CMIBoolean false if the initialization failed.
**
** Description:
** Initialize communication with LMS by calling the Initialize
** function which will be implemented by the LMS.
**
*******************************************************************************/
function doInitialize()
{
   var api = getAPIHandle();
   
   if (api == undefined)
   {
	   if(_Debug){
      alert("Unable to locate the LMS's API Implementation.\nInitialize was not successful.");
	   }
      return "false";
   }

   var result = api.Initialize("");

   if (result.toString() != "true")
   {
      var err = ErrorHandler();
   }

   return result.toString();
}

/*******************************************************************************
**
** Function doTerminate()
** Inputs:  None
** Return:  CMIBoolean true if successful
**          CMIBoolean false if failed.
**
** Description:
** Close communication with LMS by calling the Terminate
** function which will be implemented by the LMS
**
*******************************************************************************/
function doTerminate()
{  
   var api = getAPIHandle();
   if (api == undefined)
   {
      
	   if(_Debug){
		alert("Unable to locate the LMS's API Implementation.\nTerminate was not successful.");
	   }
	  
      return "false";
   }
   else
   {
      // call the Terminate function that should be implemented by the API

      var result = api.Terminate("");
      if (result.toString() != "true")
      {
         var err = ErrorHandler();
      }

   }

   return result.toString();
}

/*******************************************************************************
**
** Function doGetValue(name)
** Inputs:  name - string representing the cmi data model defined category or
**             element (e.g. cmi.core.student_id)
** Return:  The value presently assigned by the LMS to the cmi data model
**       element defined by the element or category identified by the name
**       input value.
**
** Description:
** Wraps the call to the GetValue method
**
*******************************************************************************/
function doGetValue(name)
{
   var api = getAPIHandle();
   if (api == undefined)
   {
      
	   if(_Debug){
		alert("Unable to locate the LMS's API Implementation.\nGetValue was not successful.");
	   }
      return "";
   }
   else
   {
	  var value = api.GetValue(name);
      var errCode = api.GetLastError().toString();
      if (errCode != _NoError)
      {
         // an error was encountered so display the error description
         var errDescription = api.GetErrorString(errCode);
         //alert("GetValue("+name+") failed. \n"+ errDescription);
         return errCode;
      }
      else
      {
         
         return value.toString();
      }
   }
}

/*******************************************************************************
**
** Function doSetValue(name, value)
** Inputs:  name -string representing the data model defined category or element
**          value -the value that the named element or category will be assigned
** Return:  CMIBoolean true if successful
**          CMIBoolean false if failed.
**
** Description:
** Wraps the call to the SetValue function
**
*******************************************************************************/
function doSetValue(name, value)
{
   var api = getAPIHandle();
   if (api == undefined)
   {
      if(_Debug){
		alert("Unable to locate the LMS's API Implementation.\nSetValue was not successful.");
	  }
      return;
   }
   else
   {
      var result = api.SetValue(name, value);
      if(_Debug){
    	  alert("result from doSetValue: " + result.toString() );
      }
      if (result.toString() != "true")
      {
         var err = ErrorHandler();
		 result = err;
      }
	  
   }

   return result;
}

/*******************************************************************************
**
** Function doCommit()
** Inputs:  None
** Return:  None
**
** Description:
** Call the Commit function 
**
*******************************************************************************/
function doCommit()
{
   var api = getAPIHandle();
   if (api == undefined)
   {
	   
	   if(_Debug){
      alert("Unable to locate the LMS's API Implementation.\nCommit was not successful.");
	   }
      return "false";
   }
   else
   {
      var result = api.Commit("");
      if (result != "true")
      {
         var err = ErrorHandler();
      }
   }

   return result.toString();
}

/*******************************************************************************
**
** Function doGetLastError()
** Inputs:  None
** Return:  The error code that was set by the last LMS function call
**
** Description:
** Call the GetLastError function 
**
*******************************************************************************/
function doGetLastError()
{
   var api = getAPIHandle();
   if (api == undefined)
   {
      
	   if(_Debug){
		alert("Unable to locate the LMS's API Implementation.\nGetLastError was not successful.");
	   }
      //since we can't get the error code from the LMS, return a general error
      return _GeneralError;
   }
   
   if(_Debug){
	alert(api.GetLastError().toString());
   }

   return api.GetLastError().toString();
}

/*******************************************************************************
**
** Function doGetErrorString(errorCode)
** Inputs:  errorCode - Error Code
** Return:  The textual description that corresponds to the input error code
**
** Description:
** Call the GetErrorString function 
**
********************************************************************************/
function doGetErrorString(errorCode)
{
   var api = getAPIHandle();
   if (api == undefined)
   {
      
	   if(_Debug){
	   alert("Unable to locate the LMS's API Implementation.\nGetErrorString was not successful.");
	   }
   }

   return api.GetErrorString(errorCode).toString();
}

/*******************************************************************************
**
** Function doGetDiagnostic(errorCode)
** Inputs:  errorCode - Error Code(integer format), or null
** Return:  The vendor specific textual description that corresponds to the 
**          input error code
**
** Description:
** Call the LMSGetDiagnostic function
**
*******************************************************************************/
function doGetDiagnostic(errorCode)
{
   var api = getAPIHandle();
   if (api == undefined)
   {
	   
	   if(_Debug){
      alert("Unable to locate the LMS's API Implementation.\nGetDiagnostic was not successful.");
	   }
   }

   return api.GetDiagnostic(errorCode).toString();
}

/*******************************************************************************
**
** Function LMSIsInitialized()
** Inputs:  none
** Return:  true if the LMS API is currently initialized, otherwise false
**
** Description:
** Determines if the LMS API is currently initialized or not.
**
*******************************************************************************/
function LMSIsInitialized()
{
   // there is no direct method for determining if the LMS API is initialized
   // for example an LMSIsInitialized function defined on the API so we'll try
   // a simple LMSGetValue and trap for the LMS Not Initialized Error

   var api = getAPIHandle();
   if (api == undefined)
   {
      if(_Debug){
	   alert("Unable to locate the LMS's API Implementation.\nLMSIsInitialized() failed.");
	  }
      return false;
   }
   else
   {
      var value = api.GetValue("cmi.learner_name");
      var errCode = api.GetLastError().toString();
      if (errCode > 0)
      {
         return false;
      }
      else
      {
         return true;
      }
   }
}

/*******************************************************************************
**
** Function ErrorHandler()
** Inputs:  None
** Return:  The current value of the LMS Error Code
**
** Description:
** Determines if an error was encountered by the previous API call
** and if so, displays a message to the user.  If the error code
** has associated text it is also displayed.
**
*******************************************************************************/
function ErrorHandler()
{
   var api = getAPIHandle();
   if (api == undefined)
   {
      
	   if(_Debug){
		alert("Unable to locate the LMS's API Implementation.\nCannot determine LMS error code.");
	   }
      return;
   }

   // check for errors caused by or from the LMS
   var errCode = api.GetLastError().toString();
   if (errCode != _NoError)
   {
      // an error was encountered so display the error description
      var errDescription = api.GetErrorString(errCode);

      if (_Debug == true)
      {
         errDescription += "\n";
         errDescription += api.GetDiagnostic(undefined);
         // by passing null to GetDiagnostic, we get any available diagnostics
         // on the previous error.
      }

      if(_Debug){
	  alert(errDescription);
	  }
   }

   return errCode;
}

/******************************************************************************
**
** Function getAPIHandle()
** Inputs:  None
** Return:  value contained by APIHandle
**
** Description:
** Returns the handle to API object if it was previously set,
** otherwise it returns null
**
*******************************************************************************/
function getAPIHandle()
{
   if (apiHandle == undefined)
   {
      apiHandle = getAPI();
   }

   return apiHandle;
}


/*******************************************************************************
**
** Function findAPI(win)
** Inputs:  win - a Window Object
** Return:  If an API object is found, it's returned, otherwise null is returned
**
** Description:
** This function looks for an object named API in parent and opener windows
**
*******************************************************************************/
function findAPI(win)
{
   while ((win.API_1484_11 == undefined) && (win.parent != null) && (win.parent != win))
   {
      findAPITries++;
      
      if (findAPITries > 500) 
      {
		  if(_Debug){
			alert("Error finding API -- too deeply nested.");
		  }
         return undefined;
      }
      
      win = win.parent;

   }
   return win.API_1484_11;
}



/*******************************************************************************
**
** Function getAPI()
** Inputs:  none
** Return:  If an API object is found, it's returned, otherwise null is returned
**
** Description:
** This function looks for an object named API, first in the current window's 
** frame hierarchy and then, if necessary, in the current window's opener window
** hierarchy (if there is an opener window).
**
*******************************************************************************/
/*function getAPI()
{
   var theAPI = findAPI(window);
   if ((theAPI == undefined) && (window.opener != null) && (typeof(window.opener) != undefined))
   {
      theAPI = findAPI(window.opener);
   }
   if (theAPI == undefined)
   {
      alert("Unable to find an API adapter");
   }
   return theAPI
}
*/

//created by Mike Rustici
var MAX_PARENTS_TO_SEARCH = 500; 
/*
ScanParentsForApi
-Searches all the parents of a given window until
 it finds an object named "API_1484_11". If an
 object of that name is found, a reference to it
 is returned. Otherwise, this function returns null.
*/
function ScanParentsForApi(win) 
{  
      /*
      Establish an outrageously high maximum number of
      parent windows that we are will to search as a
      safe guard against an infinite loop. This is 
      probably not strictly necessary, but different 
      browsers can do funny things with undefined objects.
      */
      var nParentsSearched = 0;
      /*
      Search each parent window until we either:
             -find the API, 
             -encounter a window with no parent (parent is null 
                        or the same as the current window)
             -or, have reached our maximum nesting threshold
      */
      while ( (win.API_1484_11 == undefined) && 
                  (win.parent != null) && (win.parent != win) && 
                  (nParentsSearched <= MAX_PARENTS_TO_SEARCH) 
              )
      { 
            nParentsSearched++; 
            win = win.parent;
      } 
      /*
      If the API doesn't exist in the window we stopped looping on, 
      then this will return null.
      */
      return win.API_1484_11; 
} 
/*
GetAPI
-Searches all parent and opener windows relative to the
 current window for the SCORM 2004 API Adapter.
 Returns a reference to the API Adapter if found or null
 otherwise.
*/
function getAPI() 
{
      var API = undefined; 

      //Search all the parents of the current window if there are any
      if ((window.parent != null) && (window.parent != window)) 

      { 
            API = ScanParentsForApi(window.parent); 
      } 
      /*
      If we didn't find the API in this window's chain of parents, 

      then search all the parents of the opener window if there is one

      */
      if ((API == undefined) && (window.top.opener != null))

      { 
            API = ScanParentsForApi(window.top.opener); 
      } 
	  
	  if(API != undefined){
      return API;
	  }
	  
	  return undefined;
}


