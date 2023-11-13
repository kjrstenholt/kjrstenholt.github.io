var jetData = {};

/*******************************************************************************
**
** Function setJetValue(name, value)
** Inputs:  name -string representing the data element where data is stored 
**          value -the value that the named element will be assigned
** 
**
*******************************************************************************/
function setJetValue(name, value)
{
	value = parseFloat(value);
	jetData[name] = value;
  
}

/*******************************************************************************
**
** Function appendJetValue(name, value)
** Inputs:  name -string representing the data element where data is stored 
**          value -the value that the named element will append to existing value
** 
**
*******************************************************************************/
function appendJetValue(name, value)
{
	
	value = parseFloat(value);
	
		
		if (jetData[name] == undefined){
			
			jetData[name] = 0;
		}
		
		var oldValue = jetData[name];
		jetData[name] = oldValue +  value;
	
  
}

/*******************************************************************************
**
** Function getJetValue(name)
** Inputs:  name -string representing the data element where data is stored 
**          
* Return:  The value presently assigned to the element in jetData
** 
**
*******************************************************************************/
function getJetValue(name)
{
   	return jetData[name];
  
}


