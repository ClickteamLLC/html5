//----------------------------------------------------------------------------------
//
// CRunJoystickControl : virtual joystick
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
CRunJoystickControl.ACT_STARTACCELEROMETER=0;
CRunJoystickControl.ACT_STOPACCELEROMETER=1;
CRunJoystickControl.ACT_STARTSTOPTOUCH=2;
CRunJoystickControl.ACT_SETJOYPOSITION=3;
CRunJoystickControl.ACT_SETFIRE1POSITION=4;
CRunJoystickControl.ACT_SETFIRE2POSITION=5;
CRunJoystickControl.ACT_SETXJOYSTICK=6;
CRunJoystickControl.ACT_SETYJOYSTICK=7;
CRunJoystickControl.ACT_SETXFIRE1=8;
CRunJoystickControl.ACT_SETYFIRE1=9;
CRunJoystickControl.ACT_SETXFIRE2=10;
CRunJoystickControl.ACT_SETYFIRE2=11;
CRunJoystickControl.ACT_SETJOYMASK=12;
CRunJoystickControl.EXP_XJOYSTICK=0;
CRunJoystickControl.EXP_YJOYSTICK=1;
CRunJoystickControl.EXP_XFIRE1=2;
CRunJoystickControl.EXP_YFIRE1=3;
CRunJoystickControl.EXP_XFIRE2=4;
CRunJoystickControl.EXP_YFIRE2=5;
CRunJoystickControl.POS_NOTDEFINED=0x80000000;

function CRunJoystickControl()
{
	this.bAccelerometer=false;
	this.bJoystick=false;
	this.xJoystick=0;
	this.yJoystick=0;
	this.xFire1=0;
	this.yFire1=0;
	this.xFire2=0;
	this.yFire2=0;	
}
CRunJoystickControl.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 0;
    },

    createRunObject:function(file, cob, version)
    {
        this.xJoystick=CRunJoystickControl.POS_NOTDEFINED;
        this.yJoystick=CRunJoystickControl.POS_NOTDEFINED;
        this.xFire1=CRunJoystickControl.POS_NOTDEFINED;
        this.yFire1=CRunJoystickControl.POS_NOTDEFINED;
        this.xFire2=CRunJoystickControl.POS_NOTDEFINED;
        this.yFire2=CRunJoystickControl.POS_NOTDEFINED;
        this.bAccelerometer=false;
        this.bJoystick=false;

        return true;
    },    
    destroyRunObject:function(bFast)
    {
        if (this.bJoystick)
        {
//            this.rh.rhApp.bJoystickOn=false;
        }
        if (this.bAccelerometer)
        {
//            ho.hoAdRunHeader.stopJoystickAcc();
        }
    },

    action:function(num, act)
    {
        switch (num)
        {
	        case CRunJoystickControl.ACT_STARTACCELEROMETER:
		        this.startAccelerometer(act);
		        break;
	        case CRunJoystickControl.ACT_STOPACCELEROMETER:
		        this.stopAccelerometer(act);
		        break;
	        case CRunJoystickControl.ACT_STARTSTOPTOUCH:
		        this.startStopTouch(act);
		        break;
	        case CRunJoystickControl.ACT_SETJOYPOSITION:
		        this.setJoyPosition(act);
		        break;
	        case CRunJoystickControl.ACT_SETFIRE1POSITION:
		        this.setFire1Position(act);
		        break;
	        case CRunJoystickControl.ACT_SETFIRE2POSITION:
		        this.setFire2Position(act);
		        break;
	        case CRunJoystickControl.ACT_SETXJOYSTICK:
		        this.setXJoystick(act);
		        break;
	        case CRunJoystickControl.ACT_SETYJOYSTICK:
		        this.setYJoystick(act);
		        break;
	        case CRunJoystickControl.ACT_SETXFIRE1:
		        this.setXFire1(act);
		        break;
	        case CRunJoystickControl.ACT_SETYFIRE1:
		        this.setYFire1(act);
		        break;
	        case CRunJoystickControl.ACT_SETXFIRE2:
		        this.setXFire2(act);
		        break;
	        case CRunJoystickControl.ACT_SETYFIRE2:
		        this.setYFire2(act);
		        break;
	        case CRunJoystickControl.ACT_SETJOYMASK:
		        this.setJoyMask(act);
		        break;
        }
    },

    startAccelerometer:function(act)
    {
        var rhApp=this.ho.hoAdRunHeader.rhApp;
        if (rhApp.parentApp!=null)
        {
	        return;
        }
        if (rhApp.frame.joystick!=CRunFrame.JOYSTICK_EXT)
        {
	        return;
        }

        if (this.bAccelerometer==false)
        {
	        this.bAccelerometer=true;
            this.rh.startJoystickAcc();
        }
    },
    stopAccelerometer:function(act)
    {
        if (this.bAccelerometer==true)
        {
	        this.bAccelerometer=false;
            this.rh.stopJoystickAcc();
        }
    },
    startStopTouch:function(act)
    {
        var rhApp=this.rh.rhApp;
        if (rhApp.parentApp!=null)
        {
	        return;
        }
        if (rhApp.frame.joystick!=CRunFrame.JOYSTICK_EXT)
        {
	        return;
        }

        var joy=act.getParamExpression(this.rh, 0);
        var fire1=act.getParamExpression(this.rh, 1);
        var fire2=act.getParamExpression(this.rh, 2);
        var leftHanded=act.getParamExpression(this.rh, 3);

        var flags=0;
        if (fire1!=0)
        {
	        flags=CJoystick.JFLAG_FIRE1;
        }
        if (fire2!=0)
        {
	        flags|=CJoystick.JFLAG_FIRE2;
        }
        if (joy!=0)
        {
	        flags|=CJoystick.JFLAG_JOYSTICK;
        }
        if (leftHanded!=0)
        {
	        flags|=CJoystick.JFLAG_LEFTHANDED;
        }
        if ((flags&(CJoystick.JFLAG_FIRE1|CJoystick.JFLAG_FIRE2|CJoystick.JFLAG_JOYSTICK))!=0)
        {
        	rhApp.startJoystick(flags);
            rhApp.joystick.reset(flags);
	        if (this.xJoystick!=CRunJoystickControl.POS_NOTDEFINED)
	        {
		        ho.hoAdRunHeader.joystick.setXPosition(CJoystick.JFLAG_JOYSTICK, this.xJoystick);
	        }
	        else 
	        {
		        this.xJoystick=ho.hoAdRunHeader.joystick.imagesX[CJoystick.KEY_JOYSTICK];
	        }

	        if (this.yJoystick!=CRunJoystickControl.POS_NOTDEFINED)
	        {
		        ho.hoAdRunHeader.joystick.setYPosition(CJoystick.JFLAG_JOYSTICK, this.yJoystick);
	        }
	        else 
	        {
		        this.yJoystick=ho.hoAdRunHeader.joystick.imagesY[CJoystick.KEY_JOYSTICK];
	        }

	        if (this.xFire1!=CRunJoystickControl.POS_NOTDEFINED)
	        {
		        ho.hoAdRunHeader.joystick.setXPosition(CJoystick.JFLAG_FIRE1, this.xFire1);
	        }
	        else 
	        {
		        this.xFire1=ho.hoAdRunHeader.joystick.imagesX[CJoystick.KEY_FIRE1];
	        }
	
	        if (this.yFire1!=CRunJoystickControl.POS_NOTDEFINED)
	        {
		        ho.hoAdRunHeader.joystick.setYPosition(CJoystick.JFLAG_FIRE1, this.yFire1);
	        }
	        else 
	        {
		        this.yFire1=ho.hoAdRunHeader.joystick.imagesY[CJoystick.KEY_FIRE1];
	        }

	        if (this.xFire2!=CRunJoystickControl.POS_NOTDEFINED)
	        {
		        ho.hoAdRunHeader.joystick.setXPosition(CJoystick.JFLAG_FIRE2, this.xFire2);
	        }
	        else 
	        {
		        this.xFire2=ho.hoAdRunHeader.joystick.imagesX[CJoystick.KEY_FIRE2];
	        }
	
	        if (this.yFire2!=CRunJoystickControl.POS_NOTDEFINED)
	        {
		        ho.hoAdRunHeader.joystick.setXPosition(CJoystick.JFLAG_FIRE2, this.yFire2);
	        }
	        else 
	        {
		        this.yFire2=ho.hoAdRunHeader.joystick.imagesY[CJoystick.KEY_FIRE2];
	        }	
	        this.bJoystick=true;
        }
        else
        {
	        rhApp.stopJoystick();
	        this.bJoystick=false;
        }
    },
    
    setJoyPosition:function(act)
    {
        var pos=act.getParamPosition(this.rh, 0);
        this.xJoystick=pos.x;
        this.yJoystick=pos.y;
        if (this.bJoystick)
        {
	        this.rh.rhApp.joystick.setXPosition(CJoystick.JFLAG_JOYSTICK, this.xJoystick);
	        this.rh.rhApp.joystick.setYPosition(CJoystick.JFLAG_JOYSTICK, this.yJoystick);
        }
    },
    setFire1Position:function(act)
    {
        var pos=act.getParamPosition(this.rh, 0);
        this.xFire1=pos.x;
        this.yFire1=pos.y;
        if (this.bJoystick)
        {
	        this.rh.rhApp.joystick.setXPosition(CJoystick.JFLAG_FIRE1, this.xFire1);
	        this.rh.rhApp.joystick.setYPosition(CJoystick.JFLAG_FIRE1, this.yFire1);
        }
    },
    setFire2Position:function(act)
    {
        var pos=act.getParamPosition(this.rh, 0);
        this.xFire2=pos.x;
        this.yFire2=pos.y;
        if (this.bJoystick)
        {
	        this.rh.rhApp.joystick.setXPosition(CJoystick.JFLAG_FIRE2, this.xFire2);
	        this.rh.rhApp.joystick.setYPosition(CJoystick.JFLAG_FIRE2, this.yFire2);
        }
    },
    setXJoystick:function(act)
    {
        this.xJoystick=act.getParamExpression(this.rh, 0);
        if (this.bJoystick)
        {
	        this.rh.rhApp.joystick.setXPosition(CJoystick.JFLAG_JOYSTICK, this.xJoystick);
        }
    },
    setYJoystick:function(act)
    {
        this.yJoystick=act.getParamExpression(this.rh, 0);
        if (this.bJoystick)
        {
	        this.rh.rhApp.joystick.setYPosition(CJoystick.JFLAG_JOYSTICK, this.yJoystick);
        }
    },
    setXFire1:function(act)
    {
        this.xFire1=act.getParamExpression(this.rh, 0);
        if (this.bJoystick)
        {
	        this.rh.rhApp.joystick.setXPosition(CJoystick.JFLAG_FIRE1, this.xFire1);
        }
    },
    setYFire1:function(act)
    {
        this.yFire1=act.getParamExpression(this.rh, 0);
        if (this.bJoystick)
        {
	        this.rh.rhApp.joystick.setYPosition(CJoystick.JFLAG_FIRE1, this.yFire1);
        }
    },
    setXFire2:function(act)
    {
        this.xFire2=act.getParamExpression(this.rh, 0);
        if (this.bJoystick)
        {
	        this.rh.rhApp.joystick.setXPosition(CJoystick.JFLAG_FIRE2, this.xFire2);
        }
    },
    setYFire2:function(act)
    {
        this.yFire2=act.getParamExpression(this.rh, 0);
        if (this.bJoystick)
        {
	        this.rh.rhApp.joystick.setXPosition(CJoystick.JFLAG_FIRE2, this.yFire2);
        }
    },
    setJoyMask:function(act)
    {
        ho.hoAdRunHeader.rhJoystickMask=act.getParamExpression(this.rh, 0);
    },
    
    expression:function(num)
    {
        switch (num)
        {
            case CRunJoystickControl.EXP_XJOYSTICK:
                return this.xJoystick;
            case CRunJoystickControl.EXP_YJOYSTICK:
                return this.yJoystick;
            case CRunJoystickControl.EXP_XFIRE1:
                return this.xFire1;
            case CRunJoystickControl.EXP_YFIRE1:
                return this.yFire1;
            case CRunJoystickControl.EXP_XFIRE2:
                return this.xFire2;
            case CRunJoystickControl.EXP_YFIRE2:
                return this.yFire2;
        }
        return 0;
    }
    

});
