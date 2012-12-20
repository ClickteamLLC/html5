//----------------------------------------------------------------------------------
//
// CRUNLOCATION : GPS
//
//----------------------------------------------------------------------------------
/* Copyright (c) 1996-2012 Clickteam
*
* This source code is part of the XXXX exporter for Clickteam Multimedia Fusion 2.
* 
* Permission is hereby granted to any person obtaining a legal copy 
* of Clickteam Multimedia Fusion 2 to use or modify this source code for 
* debugging, optimizing, or customizing applications created with 
* Clickteam Multimedia Fusion 2. Any other use of this source code in prohibited.
* 
* Any other use of this source code is prohibited. This source code may not be redistributed.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/

CRunLocation.CND_LOCENABLED=0;
CRunLocation.CND_NEWLOCATION=1;
CRunLocation.CND_LAST=2;
CRunLocation.ACT_GETLOCATION=0;
CRunLocation.ACT_SETDISTANCEFILTER=1;
CRunLocation.ACT_SETACCURACY=2;
CRunLocation.EXP_LATITUDE=0;
CRunLocation.EXP_LONGITUDE=1;
CRunLocation.EXP_ALTITUDE=2;
CRunLocation.EXP_COURSE=3;
CRunLocation.EXP_SPEED=4;
CRunLocation.EXP_TIMELAST=5;
CRunLocation.EXP_DISTANCEFILTER=6;
CRunLocation.EXP_ACCURACY = 7;

function CRunLocation()
{
	this.newLocationCount=0;
	this.distance=0;
	this.accuracy=0;
	this.altitude=0;
	this.latitude=0;
	this.longitude=0;
	this.course=0;
	this.speed=0;
	this.bEnabled=false;
	this.error=false;
}

CRunLocation.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return CRunLocation.CND_LAST;
    },

    createRunObject:function(file, cob, version)
    {
    	this.distance=file.readAInt();
        this.bEnabled=false;    
        if (navigator.geolocation)
        	this.bEnabled=true;
        this.accuracy=file.readAInt();
        this.getPosition();
        return true;
    },

    action:function(num, act)
    {
        switch (num)
        {
        	case CRunLocation.ACT_GETPOSITION:
        		this.getPosition();
        		break;
        	case CRunLocation.ACT_SETDISTANCEFILTER:
        		break;
        	case CRunLocation.ACT_SETACCURACY:
        		this.setAccuracy();
        		break;
        }
    },
    
    getOptions:function()
    {
    	return {enableHighAccuracy:(this.accuracy==0), timeout:100000, maximumAge:600000};
    },

	setAccuracy:function(act)
	{
		this.accuracy=act.getParamExpression(this.rh, 0);
	},
	
    getPosition:function()
    {
    	if (this.bEnabled)
    	{
    		this.error=false;
    		var options=this.getOptions();
	    	var that=this;
    		navigator.geolocation.getCurrentPosition
    		(
    			function(position)
    			{
    				that.longitude=position.coords.longitude;
    				that.latitude=position.coords.latitude;
    				that.altitude=position.coords.altitude;
    				that.speed=position.coords.speed;
			        that.newLocationCount=that.ho.getEventCount();
	        		that.ho.pushEvent(CRunLocation.CND_NEWLOCATION, 0);
	        	},
	        	function(error)
  				{
  					switch(error.code) 
    				{
    					case error.PERMISSION_DENIED:
					    case error.POSITION_UNAVAILABLE:
					    case error.TIMEOUT:
					    case error.UNKNOWN_ERROR:
					    	that.error=true;
							break;
		    		}
		    	},
		    	options
		    );
		}
	},

    cndNewLocation:function()
    {
        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0)
        {
	        return true;
        }
        if (this.ho.getEventCount() == this.newLocationCount)
        {
	        return true;
        }
        return false;
    },
		    	
    condition:function(num, cnd)
    {
        switch (num)
        {
	        case CRunLocation.CND_NEWLOCATION:
		        return this.cndNewLocation();
	        case CRunLocation.CND_LOCENABLED:
	        	if (this.bEnabled)
	        	{
	        		return !this.error;
	        	}
		        break;		        
        }
        return false;
    },

    expression:function(num)
    {
        switch (num)
        {
	        case CRunLocation.EXP_LATITUDE:
		        return this.latitude;
	        case CRunLocation.EXP_LONGITUDE:
		        return this.longitude;
	        case CRunLocation.EXP_ALTITUDE:
		        return this.altitude;
	        case CRunLocation.EXP_COURSE:
		        return 0;
	        case CRunLocation.EXP_SPEED:
		        return this.speed;
	        case CRunLocation.EXP_TIMELAST:
		        return 0;
	        case CRunLocation.EXP_DISTANCEFILTER:
		        return 0;
	        case CRunLocation.EXP_ACCURACY:
		        return this.accuracy;
        }
        return null;
    }

});


