//----------------------------------------------------------------------------------
//
// CRUNKCWCTRL Objet Window Control
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
CRunkcwctrl.CND_ISICONIC=0;
CRunkcwctrl.CND_ISMAXIMIZED=1;
CRunkcwctrl.CND_ISVISIBLE=2;
CRunkcwctrl.CND_ISAPPACTIVE=3;
CRunkcwctrl.CND_HASFOCUS=4;
CRunkcwctrl.CND_ISATTACHEDTODESKTOP=5;
CRunkcwctrl.CND_LAST=6;
CRunkcwctrl.ACT_SETBACKCOLOR=23;
CRunkcwctrl.EXP_GETXPOSITION=0;
CRunkcwctrl.EXP_GETYPOSITION=1;
CRunkcwctrl.EXP_GETXSIZE=2;
CRunkcwctrl.EXP_GETYSIZE=3;
CRunkcwctrl.EXP_GETSCREENXSIZE=4;
CRunkcwctrl.EXP_GETSCREENYSIZE=5;
CRunkcwctrl.EXP_GETSCREENDEPTH=6;
CRunkcwctrl.EXP_GETCLIENTXSIZE=7;
CRunkcwctrl.EXP_GETCLIENTYSIZE=8;
CRunkcwctrl.EXP_GETTITLE=9;
CRunkcwctrl.EXP_GETBACKCOLOR=10;
CRunkcwctrl.EXP_GETXFRAME=11;
CRunkcwctrl.EXP_GETYFRAME=12;
CRunkcwctrl.EXP_GETWFRAME=13;
CRunkcwctrl.EXP_GETHFRAME=14;		

function CRunkcwctrl()
{	
}
CRunkcwctrl.prototype=CServices.extend(new CRunExtension(),
{
	getNumberOfConditions:function()
	{
		return CRunkcwctrl.CND_LAST;
	},

	// Conditions
	// --------------------------------------------------
	condition:function(num, cnd)
	{
		switch (num)
		{
			case CRunkcwctrl.CND_ISICONIC:
				return false;
			case CRunkcwctrl.CND_ISMAXIMIZED:
				return false;
			case CRunkcwctrl.CND_ISVISIBLE:
				return true;
			case CRunkcwctrl.CND_ISAPPACTIVE:
				return true;
			case CRunkcwctrl.CND_HASFOCUS:
				return this.rh.rhApp.bActivated;
			case CRunkcwctrl.CND_ISATTACHEDTODESKTOP:
				return false;
		}
		return false;
	},
	
	// Expressions
	// --------------------------------------------	
	getScreenWidth:function()
	{
		return screen.width;
	},
	getScreenHeight:function()
	{
		return screen.height;
	},
	getWindowWidth:function()
	{
		var winW = 630;
		if (document.body && document.body.offsetWidth) 
		{
		 	winW = document.body.offsetWidth;
		}
		if (document.compatMode=='CSS1Compat' &&
		    document.documentElement &&
		    document.documentElement.offsetWidth ) 
		{
		 	winW = document.documentElement.offsetWidth;
		}
		if (window.innerWidth && window.innerHeight) 
		{
		 	winW = window.innerWidth;
		}
		return winW;	
	},
	getWindowHeight:function()
	{
		return winH;
	},
	expression:function(num)
	{
		switch (num)
		{
			case CRunkcwctrl.EXP_GETXPOSITION:
				return (0);
			case CRunkcwctrl.EXP_GETYPOSITION:
				return (0);
			case CRunkcwctrl.EXP_GETXSIZE:
				return window.outerWidth;
			case CRunkcwctrl.EXP_GETYSIZE:
				return window.outerHeight;
			case CRunkcwctrl.EXP_GETSCREENXSIZE:
				return this.getScreenWidth();
			case CRunkcwctrl.EXP_GETSCREENYSIZE:
				return this.getScreenHeight();
			case CRunkcwctrl.EXP_GETSCREENDEPTH:
				return window.colorDepth;
			case CRunkcwctrl.EXP_GETCLIENTXSIZE:
				return window.innerWidth;					
			case CRunkcwctrl.EXP_GETCLIENTYSIZE:
				return window.innerHeight;
			case CRunkcwctrl.EXP_GETTITLE:
				return document.title;
			case CRunkcwctrl.EXP_GETBACKCOLOR:
				return (this.rh.rhApp.gaBorderColour);
			case CRunkcwctrl.EXP_GETXFRAME:
				return (0);
			case CRunkcwctrl.EXP_GETYFRAME:
				return (0);
			case CRunkcwctrl.EXP_GETWFRAME:
				return screen.availWidth;					
			case CRunkcwctrl.EXP_GETHFRAME:
				return screen.availHeight;
		}
		return 0;
	}
});

