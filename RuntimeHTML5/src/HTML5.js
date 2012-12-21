//----------------------------------------------------------------------------------
//
// CRUNHTML5
//
//----------------------------------------------------------------------------------
/* Copyright (c) 1996-2012 Clickteam
*
* This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
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
CRunHTML5.CND_JSCRIPT_ONERROR=0;
CRunHTML5.CND_ISPPRELOADER=1;
CRunHTML5.CND_MOUSEIN=2;
CRunHTML5.CND_ISIE=3;
CRunHTML5.CND_ISCHROME=4;
CRunHTML5.CND_ISFIREFOX=5;
CRunHTML5.CND_ISSAFARI=6;
CRunHTML5.CND_ISOPERA=7;
CRunHTML5.CND_LAST=8;
CRunHTML5.ACT_OPENURL_SELF=0;
CRunHTML5.ACT_OPENURL_PARENT=1;
CRunHTML5.ACT_OPENURL_TOP=2;
CRunHTML5.ACT_OPENURL_NEW=3;
CRunHTML5.ACT_OPENURL_TARGET=4;
CRunHTML5.ACT_JSCRIPT_RESETPARAMS=5;
CRunHTML5.ACT_JSCRIPT_ADDINTPARAM=6;
CRunHTML5.ACT_JSCRIPT_ADDFLOATPARAM=7;
CRunHTML5.ACT_JSCRIPT_ADDSTRPARAM=8;
CRunHTML5.ACT_JSCRIPT_CALLFUNCTION=9;
CRunHTML5.ACT_SAVECOOKIE=10;
CRunHTML5.EXP_JSCRIPT_GETINTRESULT=0;
CRunHTML5.EXP_JSCRIPT_GETFLOATRESULT=1;
CRunHTML5.EXP_JSCRIPT_GETSTRRESULT=2;
CRunHTML5.EXP_TOTAL=3;
CRunHTML5.EXP_LOADED=4;
CRunHTML5.EXP_PERCENT=5;
CRunHTML5.EXP_BROWSERNAME=6;
CRunHTML5.EXP_BROWSERVERSION=7;
CRunHTML5.EXP_BROWSEROS=8;
CRunHTML5.EXP_GETCOOKIE=9;

function CRunHTML5()
{
	this.parameters=null;
	this.ret=0;
	this.bError=false;
}

CRunHTML5.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return CRunHTML5.CND_LAST;
    },

    createRunObject:function(file, cob, version)
    {
    	
        return true;
    },

	condition:function(num, cnd)
	{
        switch (num)
        {
    		case CRunHTML5.CND_JSCRIPT_ONERROR:
    			return this.onError();
    		case CRunHTML5.CND_ISPRELOADER:
    			return this.isPreloader();
			case CRunHTML5.CND_MOUSEIN:
				return this.ho.hoAdRunHeader.rhApp.bMouseIn;
			case CRunHTML5.CND_ISIE:
				return this.rh.rhApp.browserDetect.browser=="Explorer";
			case CRunHTML5.CND_ISCHROME:
				return this.rh.rhApp.browserDetect.browser=="Chrome";
			case CRunHTML5.CND_ISFIREFOX:
				return this.rh.rhApp.browserDetect.browser=="Firefox";
			case CRunHTML5.CND_ISSAFARI:
				return this.rh.rhApp.browserDetect.browser=="Safari";
			case CRunHTML5.CND_ISOPERA:
				return this.rh.rhApp.browserDetect.browser=="Opera";
        }
        return false;
	},
	
	isPreloader:function()
	{
		return this.ho.hoAdRunHeader.rhApp.bPreloader;
	},
	onError:function()
	{
        if ((thhis.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0)
            return true;
        if (this.rh.rh4EventCount == this.onErrorCount)
            return true;
        return false;
	},
	
	action:function(num, act)
    {
        switch (num)
        {
			case CRunHTML5.ACT_OPENURL_SELF:
				this.actOpenURLSelf(act);
				break;
			case CRunHTML5.ACT_OPENURL_PARENT:
				this.actOpenURLParent(act);
				break;
			case CRunHTML5.ACT_OPENURL_TOP:
				this.actOpenURLTop(act);
				break;
			case CRunHTML5.ACT_OPENURL_NEW:
				this.actOpenURLNew(act);
				break;
			case CRunHTML5.ACT_OPENURL_TARGET:
				this.actOpenURLTarget(act);
				break;
			case CRunHTML5.ACT_JSCRIPT_RESETPARAMS:
				this.actResetParams();
				break;
			case CRunHTML5.ACT_JSCRIPT_ADDINTPARAM:
				this.actAddIntegerParam(act);
				break;
			case CRunHTML5.ACT_JSCRIPT_ADDFLOATPARAM:
				this.actAddFloatParam(act);
				break;
			case CRunHTML5.ACT_JSCRIPT_ADDSTRPARAM:
				this.actAddStringParam(act);
				break;
			case CRunHTML5.ACT_JSCRIPT_CALLFUNCTION:
				this.actCallFunction(act);
				break;
			case CRunHTML5.ACT_SAVECOOKIE:
				this.actSaveCookie(act);
				break;
        }
    },
    actSaveCookie:function(act)
    {
    	var cookieName=act.getParamExpString(this.rh, 0);
    	var days=act.getParamExpression(this.rh, 1);
    	var content=act.getParamExpString(this.rh, 2);

		var expires=new Date();
		if (days<=0)
			days=10000;
		expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * days));
		var cookie=cookieName+"="+escape(content)+"; path=/; expires=" + expires.toGMTString();
		document.cookie=cookie;     		
    },
	actOpenURLSelf:function(act)
	{
		var url=act.getParamExpString(this.rh, 0);
		window.open(url, "_self");
	},
	actOpenURLParent:function(act)
	{
		var url=act.getParamExpString(this.rh, 0);
		window.open(url, "_parent");
	},
	pactOpenURLTop:function(act)
	{
		var url=act.getParamExpString(this.rh, 0);
		window.open(url, "_top");		
	},
	actOpenURLNew:function(act)
	{
		var url=act.getParamExpString(this.rh, 0);
		window.open(url, "_blank");
	},
	actOpenURLTarget:function(act)
	{
		var url=act.getParamExpString(this.rh, 0);
		var target=act.getParamExpString(this.rh, 1);
		window.open(url, target);
	},
	
	actResetParams:function()
	{
		this.parameters=null;
	},
	actAddIntegerParam:function(act)
	{
		if (this.parameters==null)
			this.parameters=new Array();
		var p=act.getParamExpression(this.rh, 0);
		this.parameters.push(p);
	},
	actAddStringParam:function(act)
	{
		if (this.parameters==null)
			this.parameters=new Array();
		var p=act.getParamExpString(this.rh, 0);
		this.parameters.push(p);
	},
	actAddFloatParam:function(act)
	{
		if (this.parameters==null)
			this.parameters=new Array();
		var p=act.getParamExpDouble(this.rh, 0);
		this.parameters.push(p);
	},
	actCallFunction:function(act)
	{
		var func=act.getParamExpString(this.rh, 0);
		this.bError=false;
		this.ret=window[func](this.parameters[0], this.parameters[1], this.parameters[2], this.parameters[3], this.parameters[4],
			   					this.parameters[5], this.parameters[6], this.parameters[7], this.parameters[8], this.parameters[9], this.parameters[10]); 
		this.parameters=null;
	},

    expression:function(num)
    {
        switch (num)
        {
			case CRunHTML5.EXP_JSCRIPT_GETINTRESULT:
				return this.expGetIntResult();
			case CRunHTML5.EXP_JSCRIPT_GETFLOATRESULT:
				return this.expGetNumberResult();
			case CRunHTML5.EXP_JSCRIPT_GETSTRRESULT:
				return this.expGetStringResult();
			case CRunHTML5.EXP_TOTAL:
				return this.expTotal();
			case CRunHTML5.EXP_LOADED:
				return this.expLoaded();
			case CRunHTML5.EXP_PERCENT:
				return this.expPercent();
			case CRunHTML5.EXP_BROWSERNAME:
				return this.rh.rhApp.browserDetect.browser;
			case CRunHTML5.EXP_BROWSERVERSION:
				return this.rh.rhApp.browserDetect.version;
			case CRunHTML5.EXP_BROWSEROS:
				return this.rh.rhApp.browserDetect.OS;
			case CRunHTML5.EXP_GETCOOKIE:
				return this.expGetCookie();
        }
        return 0;
    },
    getCookie:function(name)
    {
   		var dc = document.cookie;	
    	var cname = name + "=";	
 
    	if (dc.length > 0) 
    	{	
      		var begin = dc.indexOf(cname);
      		if (begin != -1) 
      		{ 
        		begin += cname.length; 
        		end = dc.indexOf(";", begin);
        		if (end == -1) 
        			end = dc.length;
        		return unescape(dc.substring(begin, end));
        	}
        } 
        return null;
    },	
    expGetCookie:function()
    {
    	var cookieName=this.ho.getExpParam();
		var cookie=this.getCookie(cookieName);
		if (!cookie)
			cookie="";
		return cookie;
    },
    expTotal:function()
    {
    	return this.rh.rhApp.imagesToLoad;
    },
    expLoaded:function()
    {
    	return this.rh.rhApp.imagesLoaded;
    },
    expPercent:function()
    {
    	if (this.rh.rhApp.imagesToLoad!=0)
    	{
    		return (this.rh.rhApp.imagesLoaded*100)/this.rh.rhApp.imagesToLoad;
    	}
    	return 0;
    },
    expGetStringResult:function()
    {
    	if (typeof this.ret=="string")
    		return this.ret;
    	return "";
    },
    expGetNumberResult:function()
    {
    	if (typeof this.ret=="number")
    		return this.ret;
    	return "";
    },
    expGetIntResult:function()
    {
    	if (typeof this.ret=="number")
    		return CServices.floatToInt(this.ret);
    	return "";
    }
});



