//----------------------------------------------------------------------------------
//
// CRunkcpict: Picture Object
//
//----------------------------------------------------------------------------------

//this.kcpict = CRunkcpict; /* export to extension loader */

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
