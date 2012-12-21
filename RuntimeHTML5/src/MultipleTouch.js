//----------------------------------------------------------------------------------
//
// CRUNMULTIPLETOUCH
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
CRunMultipleTouch.CND_NEWTOUCH=0;
CRunMultipleTouch.CND_ENDTOUCH=1;
CRunMultipleTouch.CND_NEWTOUCHANY=2;
CRunMultipleTouch.CND_ENDTOUCHANY=3;
CRunMultipleTouch.CND_TOUCHMOVED=4;
CRunMultipleTouch.CND_TOUCHACTIVE=5;
CRunMultipleTouch.CND_LAST=6;
CRunMultipleTouch.ACT_SETORIGINX=0;
CRunMultipleTouch.ACT_SETORIGINY=1;
CRunMultipleTouch.EXP_GETNUMBER=0;
CRunMultipleTouch.EXP_GETLAST=1;
CRunMultipleTouch.EXP_MTGETX=2;
CRunMultipleTouch.EXP_MTGETY=3;
CRunMultipleTouch.EXP_GETLASTNEWTOUCH=4;
CRunMultipleTouch.EXP_GETLASTENDTOUCH=5;
CRunMultipleTouch.EXP_GETORIGINX=6;
CRunMultipleTouch.EXP_GETORIGINY=7;
CRunMultipleTouch.EXP_GETDELTAX=8;
CRunMultipleTouch.EXP_GETDELTAY=9;
CRunMultipleTouch.EXP_GETTOUCHANGLE=10;
CRunMultipleTouch.EXP_GETDISTANCE = 11;

function CRunMultipleTouch()
{
	this.newTouchCount=0;
	this.endTouchCount=0;
	this.movedTouchCount=0;
	this.touchesID=null;
	this.touchesX=null;
	this.touchesY=null;
	this.startX=null;
	this.startY=null;
	this.dragX=null;
	this.dragY=null;
	this.touchesNew=null;
	this.touchesEnd=null;
	this.lastTouch=0;
	this.lastNewTouch=0;
	this.lastEndTouch=0;
	this.maxTouches=0;
}

CRunMultipleTouch.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return CRunMultipleTouch.CND_LAST;
    },
    
    createRunObject:function(file, cob, version)
    {
        this.maxTouches = CRunApp.MAX_TOUCHES;
        this.touchesID=new Array(this.maxTouches);
        this.touchesX = new Array(this.maxTouches);
        this.touchesY = new Array(this.maxTouches);
        this.startX = new Array(this.maxTouches);
        this.startY = new Array(this.maxTouches);
        this.dragX = new Array(this.maxTouches);
        this.dragY = new Array(this.maxTouches);
        this.touchesNew = new Array(this.maxTouches);
        this.touchesEnd = new Array(this.maxTouches);

        this.newTouchCount = -1;
        this.endTouchCount = -1;
        this.movedTouchCount = -1;
        this.lastNewTouch = -1;
        this.lastEndTouch = -1;
        this.lastTouch = -1;

        var n;
        for (n = 0; n < this.maxTouches; n++)
        {
            this.touchesID[n] = 0;
            this.touchesX[n] = -1;
            this.touchesY[n] = -1;
            this.touchesNew[n] = 0;
            this.touchesEnd[n] = 0;
            this.startX[n] = 0;
            this.startY[n] = 0;
            this.dragX[n] = 0;
            this.dragY[n] = 0;
        }
        this.rh.rhApp.addTouchCall(this);
        return true;
    },

    destroyRunObject:function(bFast)
    {
        this.rh.rhApp.removeTouchCall(this);
    },

    handleRunObject:function()
    {
		if (this.rh.rhApp.keyBuffer[CRunApp.VK_LBUTTON])
		{
		 	this.ho.generateEvent(CRunMultipleTouch.CND_TOUCHMOVED, 0);
		}
    	
        var n;
        for (n = 0; n < this.maxTouches; n++)
        {
            if (this.touchesNew[n] > 0)
            {
                this.touchesNew[n]--;
            }
            if (this.touchesEnd[n] > 0)
            {
                this.touchesEnd[n]--;
            }
        }
        return 0;
    },
    
    touchStarted:function(touch)
    {
        var n;
        for (n=0; n<this.maxTouches; n++)
        {
	        if (this.touchesID[n]==touch.identifier)
	        {
		        break;
	        }
	        if (this.touchesID[n]==0)
	        {
		        break;
	        }
        }
        if (n<this.maxTouches && this.touchesID[n]==0)
        {
	        this.touchesID[n]=touch.identifier;
	        this.touchesX[n]=this.rh.rhApp.getTouchX(touch);
            this.touchesY[n] = this.rh.rhApp.getTouchY(touch);
            this.startX[n] = this.touchesX[n];
            this.startY[n] = this.touchesY[n];
            this.dragX[n] = this.touchesX[n];
            this.dragY[n] = this.touchesY[n];
	        this.touchesNew[n]=2;
	        this.lastTouch=n;
	        this.lastNewTouch=n;
	        this.newTouchCount=this.ho.getEventCount();
	        this.ho.generateEvent(CRunMultipleTouch.CND_NEWTOUCH, 0);
	        this.ho.generateEvent(CRunMultipleTouch.CND_NEWTOUCHANY, 0);
        }
        return false;
    },

    touchMoved:function(touch)
    {
        var n;
        for (n=0; n<this.maxTouches; n++)
        {
	        if (this.touchesID[n]==touch.identifier)
	        {
		        this.touchesX[n]=this.rh.rhApp.getTouchX(touch);
		        this.touchesY[n]=this.rh.rhApp.getTouchY(touch);
		        this.dragX[n]=this.touchesX[n]
		        this.dragY[n]=this.touchesY[n]
		        this.lastTouch=n;
		        this.ho.generateEvent(CRunMultipleTouch.CND_TOUCHMOVED, 0);
	        }
        }
        return false;
    },

    touchEnded:function(touch)
    {
        var n;
        for (n=0; n<this.maxTouches; n++)
        {
	        if (this.touchesID[n]==touch.identifier)
	        {
		        this.touchesX[n]=this.rh.rhApp.getTouchX(touch);
		        this.touchesY[n]=this.rh.rhApp.getTouchY(touch);
		        this.dragX[n]=this.touchesX[n]
		        this.dragY[n]=this.touchesY[n]
		        this.touchesID[n]=0;
		        this.touchesEnd[n]=2;
		        this.lastTouch=n;
		        this.lastEndTouch=n;
		        this.endTouchCount=this.ho.getEventCount();
		        this.ho.generateEvent(CRunMultipleTouch.CND_ENDTOUCH, 0);
		        this.ho.generateEvent(CRunMultipleTouch.CND_ENDTOUCHANY, 0);
	        }
        }
        return false;
    },

    condition:function(num, cnd)
    {
        switch (num)
        {
	        case CRunMultipleTouch.CND_NEWTOUCH:
		        return this.cndNewTouch(cnd);
	        case CRunMultipleTouch.CND_ENDTOUCH:
		        return this.cndEndTouch(cnd);
	        case CRunMultipleTouch.CND_NEWTOUCHANY:
		        return this.cndNewTouchAny(cnd);
	        case CRunMultipleTouch.CND_ENDTOUCHANY:
		        return this.cndEndTouchAny(cnd);
	        case CRunMultipleTouch.CND_TOUCHMOVED:
		        return this.cndTouchMoved(cnd);
	        case CRunMultipleTouch.CND_TOUCHACTIVE:
		        return this.cndTouchActive(cnd);
        }
        return false;
    },

    cndNewTouch:function(cnd)
    {
        var touch=cnd.getParamExpression(this.rh, 0);
        var bTest=false;
        if (touch<0)
        {
	        bTest=true;
        }
        if (touch>=0 && touch<this.maxTouches)
        {
	        if (this.touchesNew[touch]!=0)
	        {
		        bTest=true;
	        }
        }
        if (bTest)
        {
	        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0)
	        {
		        return true;
	        }
	        if (this.ho.getEventCount()==this.newTouchCount)
	        {
		        return true;
	        }
        }
        return false;
    },

    cndNewTouchAny:function(cnd)
    {
        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0)
        {
	        return true;
        }
        if (this.ho.getEventCount() == this.newTouchCount)
        {
	        return true;
        }
        return false;
    },

    cndEndTouchAny:function(cnd)
    {
        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0)
        {
	        return true;
        }
        if (this.ho.getEventCount() == this.newTouchCount)
        {
	        return true;
        }
        return false;
    },

    cndEndTouch:function(cnd)
    {
        var touch=cnd.getParamExpression(this.rh, 0);
        var bTest=false;
        if (touch<0)
        {
	        bTest=true;
        }
        if (touch>=0 && touch<this.maxTouches)
        {
	        if (this.touchesEnd[touch]!=0)
	        {
		        bTest=true;
	        }
        }
        if (bTest)
        {
	        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0)
	        {
		        return true;
	        }
	        if (this.ho.getEventCount() == this.endTouchCount)
	        {
		        return true; 
	        }
        }
        return false;
    },

    cndTouchMoved:function(cnd)
    {
        var touch=cnd.getParamExpression(this.rh, 0);
        var bTest=false;
        if (touch<0)
        {
	        bTest=true;
        }
        if (touch==this.lastTouch)
        {
	        bTest=true;
        }
        if (bTest)
        {
	        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0)
	        {
		        return true;
	        }
	        if (this.ho.getEventCount() == this.movedTouchCount)
	        {
		        return true;
	        }
        }
        return false;
    },

    cndTouchActive:function(cnd)
    {
        var touch=cnd.getParamExpression(this.rh, 0);
        if (touch>=0 && touch<this.maxTouches)
        {
	        if (this.touchesID[touch]!=0)
	        {
		        return true;
	        }
        }
        return false;
    },

    action:function(num, act)
    {
        switch (num)
        {
	        case CRunMultipleTouch.ACT_SETORIGINX:
		        this.setOriginX(act);
		        break;
	        case CRunMultipleTouch.ACT_SETORIGINY:
		        this.setOriginY(act);
		        break;
        }
    },

    setOriginX:function(act)
    {
        var touch=act.getParamExpression(this.rh, 0);
        var coord=act.getParamExpression(this.rh, 1);

        if (touch>=0 && touch<this.maxTouches)						   
        {
	        this.startX[touch]=coord-this.rh.rhWindowX;
        }							   
    },
    setOriginY:function(act)
    {
        var touch=act.getParamExpression(this.rh, 0);
        var coord=act.getParamExpression(this.rh, 1);

        if (touch>=0 && touch<this.maxTouches)						   
        {
	        this.startY[touch]=coord-this.rh.rhWindowY;
        }							   
    },

    expression:function(num)
    {
        switch (num)
        {
	        case CRunMultipleTouch.EXP_GETNUMBER:
		        return this.expGetNumber();
	        case CRunMultipleTouch.EXP_GETLAST:
		        return this.lastTouch;
	        case CRunMultipleTouch.EXP_MTGETX:
		        return this.expGetX();
	        case CRunMultipleTouch.EXP_MTGETY:
		        return this.expGetY();
	        case CRunMultipleTouch.EXP_GETLASTNEWTOUCH:
		        return this.lastNewTouch;
	        case CRunMultipleTouch.EXP_GETLASTENDTOUCH:
		        return this.lastEndTouch;
	        case CRunMultipleTouch.EXP_GETORIGINX:
		        return this.expGetOriginX();
	        case CRunMultipleTouch.EXP_GETORIGINY:
		        return this.expGetOriginY();
	        case CRunMultipleTouch.EXP_GETDELTAX:
		        return this.expGetDeltaX();
	        case CRunMultipleTouch.EXP_GETDELTAY:
		        return this.expGetDeltaY();
	        case CRunMultipleTouch.EXP_GETTOUCHANGLE:
		        return this.expGetAngle();
	        case CRunMultipleTouch.EXP_GETDISTANCE:
		        return this.expGetDistance();
        }
        return 0;
    },

    expGetNumber:function()
    {
        var count=0;
        var  n;
        for (n=0; n<this.maxTouches; n++)
        {
	        if (this.touchesID[n]!=0)
	        {
		        count++;
	        }
        }
        return count;
    },
    expGetX:function()
    {
        var touch=this.ho.getExpParam();
        if (touch>=0 && touch<this.maxTouches)
        {
	        return this.touchesX[touch]+this.rh.rhWindowX;
        }
        return -1;
    },
    expGetY:function()
    {
        var touch=this.ho.getExpParam();
        if (touch>=0 && touch<this.maxTouches)
        {
	        return this.touchesY[touch]+this.rh.rhWindowY;
        }
        return -1;
    },
    expGetOriginX:function()
    {
        var touch=this.ho.getExpParam();
        if (touch>=0 && touch<this.maxTouches)
        {
	        return this.startX[touch]+this.rh.rhWindowX;
        }
        return -1;
    },
    expGetOriginY:function()
    {
        var touch=this.ho.getExpParam();
        if (touch>=0 && touch<this.maxTouches)
        {
	        return this.startY[touch]+this.rh.rhWindowY;
        }
        return -1;
    },
    expGetDeltaX:function()
    {
        var touch=this.ho.getExpParam();
        if (touch>=0 && touch<this.maxTouches)
        {
	        return this.dragX[touch]-this.startX[touch];
        }
        return -1;
    },
    expGetDeltaY:function()
    {
        var touch=this.ho.getExpParam();
        if (touch>=0 && touch<this.maxTouches)
        {
	        return this.dragY[touch]-this.startY[touch];
        }
        return -1;
    },
    expGetAngle:function()
    {
        var touch=this.ho.getExpParam();
        if (touch>=0 && touch<this.maxTouches)
        {
	        var deltaX=this.dragX[touch]-this.startX[touch];
	        var deltaY=this.dragY[touch]-this.startY[touch];
	        var angle=Math.atan2(-deltaY,deltaX)*57.295779513082320876798154814105;
	        if (angle<0)
	        {
		        angle=360.0+angle;
	        }
	        return angle;
        }
        return -1;
    },
    expGetDistance:function()
    {
        var touch=this.ho.getExpParam();
        if (touch>=0 && touch<this.maxTouches)
        {
	        var deltaX=this.dragX[touch]-this.startX[touch];
	        var deltaY=this.dragY[touch]-this.startY[touch];
	        var distance=Math.sqrt(deltaX*deltaX+deltaY*deltaY);
	        return Math.floor(distance);
        }
        return -1;
    }
});


