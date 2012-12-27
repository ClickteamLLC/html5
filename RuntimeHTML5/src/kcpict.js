//----------------------------------------------------------------------------------
//
// CRunkcpict: Picture Object
//
//----------------------------------------------------------------------------------
/* Copyright (c) 1996-2012 Clickteam
*
* This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
* 
* Permission is hereby granted to any person obtaining a legal copy 
* of Clickteam Multimedia Fusion 2 to use or modify this source code for 
* debugging, optimizing, or customizing applications created with 
* Clickteam Multimedia Fusion 2. 
* Any other use of this source code in prohibited.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/
CRunkcpict.ACT_LOADPICTURE = 0;
CRunkcpict.ACT_LOADPICTUREREQ = 1;
CRunkcpict.ACT_SHOW = 2; 
CRunkcpict.ACT_HIDE = 3;
CRunkcpict.ACT_IMAGERESIZEON = 4;
CRunkcpict.ACT_IMAGERESIZEOFF = 5;
CRunkcpict.ACT_LOADPICTURENAM = 6;
CRunkcpict.CND_PICTURELOADED = 0;
CRunkcpict.CND_VISIBLE = 1;
CRunkcpict.EXP_GETPICTURENAME = 0;
CRunkcpict.EXP_GETPICTUREXSIZE = 1;
CRunkcpict.EXP_GETPICTUREYSIZE = 2;
CRunkcpict.EXP_GETSCREENXSIZE = 3;
CRunkcpict.EXP_GETSCREENYSIZE = 4;
CRunkcpict.EXP_GETXPOS = 5;
CRunkcpict.EXP_GETYPOS = 6;

this.kcpict = CRunkcpict;

function CRunkcpict()
{
    
};

CRunkcpict.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 9;
    },

    createRunObject:function(file, cob, version)
    {
        return true;
    },
    
    handleRunObject:function()
    {
        var ret = 0;
        if (this.sDisplay)
        {
            this.sDisplay = false;
            ret = CRunExtension.REFLAG_DISPLAY;
        }
    },
    
    displayRunObject:function(context, xDraw, yDraw)
    {
        
    },

	condition:function(num, cnd)
	{
        switch (num)
        {
            case 0:
                return this.pictureLoaded;
            case 1:
                return this.isVisible;
        }
        return false;
	},
    
    action:function(num, act)
    {
        switch (num)
        {
            case 0:
                this.actLoadPicture(act);
                break;
            case 1:
                this.actLoadPictureReq(act);
                break;
            case 2:
                this.actShow(act);
                break;
            case 3:
                this.actHide(act);
                break;
            case 4:
                this.actImageResizeOn(act);
                break;
            case 5:
                this.actImageResizeOff(act);
                break;
            case 6:
                this.actLoadPictureName(act);
                break;
        }
    },

    expression:function(num)
    {
        switch (num)
        {
            case 0:
                return this.pictureName;
            case 1:
                return this.pictureXSize;
            case 2:
                return this.pictureYSize;
            case 3:
                return this.screenXSize;
            case 4:
                return this.screenYSize;
            case 5:
                return this.pictureXPos;
            case 6:
                return this.pictureYPos;
        }
        return 0;
    },

});
