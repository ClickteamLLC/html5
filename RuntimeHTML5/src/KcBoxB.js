//----------------------------------------------------------------------------------
//
// CRunKcBoxB : Active System Box
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
CRunKcBoxB.FLAG_HYPERLINK = 0x00004000;
CRunKcBoxB.FLAG_CONTAINER = 0x00001000;
CRunKcBoxB.FLAG_CONTAINED = 0x00002000;
CRunKcBoxB.COLOR_NONE = 0xFFFF;
CRunKcBoxB.FLAG_BUTTON_PRESSED = 0x10000000;
CRunKcBoxB.FLAG_BUTTON_HIGHLIGHTED = 0x20000000;
CRunKcBoxB.FLAG_HIDEIMAGE = 0x01000000;
CRunKcBoxB.COLORFLAG_RGB= 0;
CRunKcBoxB.FLAG_CHECKED = 0;
CRunKcBoxB.COLOR_FLAGS = (CRunKcBoxB.COLORFLAG_RGB);
CRunKcBoxB.COLOR_BTNFACE = 15;
CRunKcBoxB.COLOR_3DLIGHT = 22;
CRunKcBoxB.FLAG_BUTTON = 0x00100000;
CRunKcBoxB.FLAG_CHECKBOX = 0x00200000;
CRunKcBoxB.FLAG_IMAGECHECKBOX = 0x00800000;
CRunKcBoxB.FLAG_DISABLED = 0x40000000;
CRunKcBoxB.FLAG_FORCECLIPPING = 0x02000000;
CRunKcBoxB.ALIGN_IMAGE_TOPLEFT = 0x00010000;
CRunKcBoxB.ALIGN_IMAGE_CENTER = 0x00020000;
CRunKcBoxB.ALIGN_IMAGE_PATTERN = 0x00040000;
CRunKcBoxB.ALIGN_TOP = 0x00000001;
CRunKcBoxB.ALIGN_VCENTER = 0x00000002;
CRunKcBoxB.ALIGN_BOTTOM = 0x00000004;
CRunKcBoxB.ALIGN_LEFT = 0x00000010;
CRunKcBoxB.ALIGN_HCENTER = 0x00000020;
CRunKcBoxB.ALIGN_RIGHT = 0x00000040;
CRunKcBoxB.ALIGN_MULTILINE = 0x00000100;
CRunKcBoxB.ALIGN_NOPREFIX = 0x00000200;
CRunKcBoxB.ALIGN_ENDELLIPSIS = 0x00000400;
CRunKcBoxB.ALIGN_PATHELLIPSIS = 0x00000800;
CRunKcBoxB.FLAG_SHOWBUTTONBORDER = 0x00400000;
CRunKcBoxB.bSysColorTab = false;
CRunKcBoxB.COLOR_GRADIENTINACTIVECAPTION = 25;//28;
CRunKcBoxB.sysColorTab=null;
CRunKcBoxB.DOCK_LEFT = 0x00000001;
CRunKcBoxB.DOCK_RIGHT = 0x00000002;
CRunKcBoxB.DOCK_TOP = 0x00000004;
CRunKcBoxB.DOCK_BOTTOM = 0x00000008;
CRunKcBoxB.DOCK_FLAGS = (CRunKcBoxB.DOCK_LEFT | CRunKcBoxB.DOCK_RIGHT | CRunKcBoxB.DOCK_TOP | CRunKcBoxB.DOCK_BOTTOM);
CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR=0;
CRunKcBoxB.TOOLTIP_TODISPLAY=0;
CRunKcBoxB.TOOLTIP_DISPLAYED=1;
CRunKcBoxB.TOOLTIP_HIDDEN=2;

CRunKcBoxB.CND_CLICKED = 0;
CRunKcBoxB.CND_ENABLED = 1;
CRunKcBoxB.CND_CHECKED = 2;
CRunKcBoxB.CND_LEFTCLICK = 3;
CRunKcBoxB.CND_RIGHTCLICK = 4;
CRunKcBoxB.CND_MOUSEOVER = 5;
CRunKcBoxB.CND_IMAGESHOWN = 6;
CRunKcBoxB.CND_DOCKED = 7;
	    
CRunKcBoxB.ACT_ACTION_SETDIM = 0;
CRunKcBoxB.ACT_ACTION_SETPOS = 1;	
CRunKcBoxB.ACT_ACTION_ENABLE = 2;
CRunKcBoxB.ACT_ACTION_DISABLE = 3;
CRunKcBoxB.ACT_ACTION_CHECK = 4;
CRunKcBoxB.ACT_ACTION_UNCHECK = 5;	
CRunKcBoxB.ACT_ACTION_SETCOLOR_NONE	= 6;
CRunKcBoxB.ACT_ACTION_SETCOLOR_3DDKSHADOW = 7;
CRunKcBoxB.ACT_ACTION_SETCOLOR_3DFACE = 8;
CRunKcBoxB.ACT_ACTION_SETCOLOR_3DHILIGHT = 9;
CRunKcBoxB.ACT_ACTION_SETCOLOR_3DLIGHT = 10;
CRunKcBoxB.ACT_ACTION_SETCOLOR_3DSHADOW = 11;
CRunKcBoxB.ACT_ACTION_SETCOLOR_ACTIVECAPTION = 12;
CRunKcBoxB.ACT_ACTION_SETCOLOR_APPWORKSPACE = 13; //mdi
CRunKcBoxB.ACT_ACTION_SETCOLOR_DESKTOP = 14;
CRunKcBoxB.ACT_ACTION_SETCOLOR_HIGHLIGHT = 15;
CRunKcBoxB.ACT_ACTION_SETCOLOR_INACTIVECAPTION = 16;
CRunKcBoxB.ACT_ACTION_SETCOLOR_INFOBK = 17;
CRunKcBoxB.ACT_ACTION_SETCOLOR_MENU = 18;
CRunKcBoxB.ACT_ACTION_SETCOLOR_SCROLLBAR = 19;
CRunKcBoxB.ACT_ACTION_SETCOLOR_WINDOW = 20;
CRunKcBoxB.ACT_ACTION_SETCOLOR_WINDOWFRAME = 21;	
CRunKcBoxB.ACT_ACTION_SETB1COLOR_NONE = 22;
CRunKcBoxB.ACT_ACTION_SETB1COLOR_3DDKSHADOW	= 23;
CRunKcBoxB.ACT_ACTION_SETB1COLOR_3DFACE = 24;
CRunKcBoxB.ACT_ACTION_SETB1COLOR_3DHILIGHT = 25;
CRunKcBoxB.ACT_ACTION_SETB1COLOR_3DLIGHT = 26;
CRunKcBoxB.ACT_ACTION_SETB1COLOR_3DSHADOW = 27;
CRunKcBoxB.ACT_ACTION_SETB1COLOR_ACTIVEBORDER = 28;
CRunKcBoxB.ACT_ACTION_SETB1COLOR_INACTIVEBORDER = 29;
CRunKcBoxB.ACT_ACTION_SETB1COLOR_WINDOWFRAME = 30;	
CRunKcBoxB.ACT_ACTION_SETB2COLOR_NONE = 31;
CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DDKSHADOW	= 32;
CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DFACE = 33;
CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DHILIGHT = 34;
CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DLIGHT = 35;
CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DSHADOW = 36;
CRunKcBoxB.ACT_ACTION_SETB2COLOR_ACTIVEBORDER = 37;
CRunKcBoxB.ACT_ACTION_SETB2COLOR_INACTIVEBORDER = 38;
CRunKcBoxB.ACT_ACTION_SETB2COLOR_WINDOWFRAME = 39;	
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_NONE = 40;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_3DHILIGHT = 41;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_3DSHADOW = 42;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_BTNTEXT = 43;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_CAPTIONTEXT = 44;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_GRAYTEXT = 45;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_HIGHLIGHTTEXT = 46;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_INACTIVECAPTIONTEXT = 47;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_INFOTEXT = 48;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_MENUTEXT = 49;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_WINDOWTEXT = 50;	
CRunKcBoxB.ACT_ACTION_SETCOLOR_OTHER = 51;
CRunKcBoxB.ACT_ACTION_SETB1COLOR_OTHER = 52;
CRunKcBoxB.ACT_ACTION_SETB2COLOR_OTHER = 53;
CRunKcBoxB.ACT_ACTION_TEXTCOLOR_OTHER = 54;	
CRunKcBoxB.ACT_ACTION_SETTEXT = 55;
CRunKcBoxB.ACT_ACTION_SETTOOLTIPTEXT = 56;	
CRunKcBoxB.ACT_ACTION_UNDOCK = 57;
CRunKcBoxB.ACT_ACTION_DOCK_LEFT = 58;
CRunKcBoxB.ACT_ACTION_DOCK_RIGHT = 59;
CRunKcBoxB.ACT_ACTION_DOCK_TOP = 60;
CRunKcBoxB.ACT_ACTION_DOCK_BOTTOM = 61;	
CRunKcBoxB.ACT_ACTION_SHOWIMAGE = 62;
CRunKcBoxB.ACT_ACTION_HIDEIMAGE = 63;	
CRunKcBoxB.ACT_ACTION_RESETCLICKSTATE = 64;	
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_NONE = 65;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_3DHILIGHT = 66;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_3DSHADOW = 67;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_BTNTEXT = 68;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_CAPTIONTEXT = 69;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_GRAYTEXT = 70;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_HIGHLIGHTTEXT = 71;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_INACTIVECAPTIONTEXT = 72;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_INFOTEXT = 73;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_MENUTEXT = 74;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_WINDOWTEXT = 75;
CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_OTHER = 76;	
CRunKcBoxB.ACT_ACTION_SETCMDID = 77;

CRunKcBoxB.EXP_COLOR_BACKGROUND = 0;
CRunKcBoxB.EXP_COLOR_BORDER1 = 1;
CRunKcBoxB.EXP_COLOR_BORDER2 = 2;
CRunKcBoxB.EXP_COLOR_TEXT = 3;	
CRunKcBoxB.EXP_COLOR_3DDKSHADOW = 4;
CRunKcBoxB.EXP_COLOR_3DFACE = 5;
CRunKcBoxB.EXP_COLOR_3DHILIGHT = 6;
CRunKcBoxB.EXP_COLOR_3DLIGHT = 7;
CRunKcBoxB.EXP_COLOR_3DSHADOW = 8;
CRunKcBoxB.EXP_COLOR_ACTIVEBORDER = 9;
CRunKcBoxB.EXP_COLOR_ACTIVECAPTION = 10;
CRunKcBoxB.EXP_COLOR_APPWORKSPACE = 11;
CRunKcBoxB.EXP_COLOR_DESKTOP = 12;
CRunKcBoxB.EXP_COLOR_BTNTEXT = 13;
CRunKcBoxB.EXP_COLOR_CAPTIONTEXT = 14;
CRunKcBoxB.EXP_COLOR_GRAYTEXT = 15;
CRunKcBoxB.EXP_COLOR_HIGHLIGHT = 16;
CRunKcBoxB.EXP_COLOR_HIGHLIGHTTEXT = 17;
CRunKcBoxB.EXP_COLOR_INACTIVEBORDER = 18;
CRunKcBoxB.EXP_COLOR_INACTIVECAPTION = 19;
CRunKcBoxB.EXP_COLOR_INACTIVECAPTIONTEXT = 20;
CRunKcBoxB.EXP_COLOR_INFOBK = 21;
CRunKcBoxB.EXP_COLOR_INFOTEXT = 22;
CRunKcBoxB.EXP_COLOR_MENU = 23;
CRunKcBoxB.EXP_COLOR_MENUTEXT = 24;
CRunKcBoxB.EXP_COLOR_SCROLLBAR = 25;
CRunKcBoxB.EXP_COLOR_WINDOW = 26;
CRunKcBoxB.EXP_COLOR_WINDOWFRAME = 27;
CRunKcBoxB.EXP_COLOR_WINDOWTEXT = 28;
CRunKcBoxB.EXP_GETTEXT = 29;
CRunKcBoxB.EXP_GETTOOLTIPTEXT = 30;
CRunKcBoxB.EXP_GETWIDTH = 31;
CRunKcBoxB.EXP_GETHEIGHT = 32;
CRunKcBoxB.EXP_COLOR_HYPERLINK = 33;
CRunKcBoxB.EXP_GETX = 34;
CRunKcBoxB.EXP_GETY = 35;
CRunKcBoxB.EXP_SYSTORGB = 36;

this.KcBoxB = CRunKcBoxB;

function CRunKcBoxB()
{
    this.wFont=null;
  	this.wUnderlinedFont=null;
    this.dwRtFlags=null;
    this.pText=null;
    this.pToolTip=null;
    this.rNumInObjList=0;	
    this.rNumInContList=0;	
    this.rContNum=0;			
    this.rContDx=0;			
    this.rContDy=0;
    this.rNumInBtnList=0;		
    this.rClickCount=0;
    this.rLeftClickCount=0;
    this.rRightClickCount=0;
    this.rData1_dwVersion=0;
    this.rData1_dwUnderlinedColor=0;
    this.rData_dwFlags=0;
    this.rData_fillColor=0;
    this.rData_borderColor1=0;
    this.rData_borderColor2=0;
    this.rData_wImage=null;
    this.rData_wFree=0;
    this.rData_textColor=0;
    this.rData_textMarginLeft=0;
    this.rData_textMarginTop=0;
    this.rData_textMarginRight=0;
    this.rData_textMarginBottom=0;
	this.oldKMouse=0;
	this.sxToolTip=0;
	this.syToolTip=0;
	this.toolTipStatus=0;
	this.toolTipTime=0;
	this.oldToolTipZone=0;
	this.displayText=false;
	this.textSurface=null;
	this.syText=0;
}
CRunKcBoxB.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 7;
    },

    createRunObject:function(file, cob, version)
    {
        var fprh = this.ho.hoAdRunHeader;

		var debut=file.getFilePointer();
		
        this.textNeedsRedraw = true;

		// Setup
		CRunKcBoxB.COLORFLAG_RGB=1<<31;
		CRunKcBoxB.FLAG_CHECKED=1<<31;
		CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR=1<<31;

        // Get FrameData        
        var pDataKcBoxAFrameData = null;
        var pExtData = this.rh.getStorage(this.ho.hoIdentifier);
        if (pExtData == null)
        {
            pData = new CRunKcBoxBFrameData();
            this.rh.addStorage(pData, this.ho.hoIdentifier);
        }
        else
        {
            pData = pExtData;
        }

        // Set up parameters
        this.ho.setX(cob.cobX);
        this.ho.setY(cob.cobY);
        this.ho.setWidth(file.readAShort());
        this.ho.setHeight(file.readAShort());
        this.textSurface = new CTextSurface
            (this.ho.hoAdRunHeader.rhApp, this.ho.hoImgWidth, this.ho.hoImgHeight);
		this.displayText=true;

        // Copy CDATA (memcpy(&rdPtr->rData, &edPtr->eData, sizeof(CDATA));)
        this.rData_dwFlags = file.readAInt();
        this.rData_fillColor = file.readAInt();
        this.rData_borderColor1 = file.readAInt();
        this.rData_borderColor2 = file.readAInt();

        //file.skipBytes(2);
        var imageList = new Array(1);
        imageList[0] = file.readShort();
        if (imageList[0] != -1)
        {
            this.ho.loadImageList(imageList);
            this.rData_wImage = this.ho.getImage(imageList[0]);
        }

        this.rData_wFree = file.readAShort();
        this.rData_textColor = file.readAInt();
        this.rData_textMarginLeft = file.readAShort();
        this.rData_textMarginTop = file.readAShort();
        this.rData_textMarginRight = file.readAShort();
        this.rData_textMarginBottom = file.readAShort();

        // Init font
        this.wFont = new CFontInfo();

		var textLf;
		if (this.ho.hoAdRunHeader.rhApp.bUnicode==false)
		{
        	textLf = file.readLogFont16();
  		}
  		else
  		{
        	textLf = file.readLogFont();
  		}
        if (textLf.lfFaceName != null)
        {
            this.wFont = textLf;
        }

        this.dwRtFlags = 0;
        this.pText = "";
        this.pToolTip = "";
        file.skipBytes(40);
        var position=file.getFilePointer()-debut;
		if ((position&0x07)!=0)
		{
			file.skipBytes(8-(position&0x07));
		}
        
        var textSize = file.readAInt();
		if (this.ho.hoAdRunHeader.rhApp.bUnicode)
		{
			textSize/=2;
		}
        if (textSize != 0)
        {
            var lText = file.readAString(textSize);
            textSize=lText.length;
            var i;
            for (i = textSize; i > 1; i--)
            {
                if ((lText.charAt(i - 1) == "n") && (lText.charAt(i - 2) == "\\"))
                {
                    var toolTipSize = textSize - i;
                    textSize = textSize - toolTipSize - 2;
                    if (toolTipSize != 0)
                    {
                        this.pToolTip=lText.substring(i);
                    }
                    lText = lText.substring(0, textSize);
                    break;
                }
            }
            if (textSize != 0)
            {
                this.pText = lText;
                var n;
				for (n=0; n<this.pText.length; n++)
				{
					if (this.pText.charCodeAt(n)==10)
					{
						this.pText=this.pText.substring(0, n)+this.pText.substring(n+1);
						n--;
					}	
				}				
            }
        }
		
        this.rNumInObjList = pData.AddObject(this); //up to here

        this.rNumInContList = -1;
        if ((this.rData_dwFlags & CRunKcBoxB.FLAG_CONTAINER) != 0)
        {
            this.rNumInContList = pData.AddContainer(this);
        }

        this.rContNum = -1;
        if ((this.rData_dwFlags & CRunKcBoxB.FLAG_CONTAINED) != 0)
        {
            this.rContNum = pData.GetContainer(this);
            if (this.rContNum != -1)
            {
                var rdPtrContKcBoxA = pData.pContainers.get(this.rContNum);
                this.rContDx = (this.ho.getX() - rdPtrCont.ho.getX());
                this.rContDy = (this.ho.getY() - rdPtrCont.ho.getY());
            }
        }
        this.rData1_dwVersion = file.readAInt();
        this.rData1_dwUnderlinedColor = file.readAInt();

        this.rh.delStorage(this.ho.hoIdentifier);
        this.rh.addStorage(pData, this.ho.hoIdentifier);

		this.oldKMouse=0;

		this.nLayer=this.ho.hoLayer;
		this.pLayer=this.rh.rhFrame.layers[this.nLayer];
	 	this.bShown=true;
		this.bAddedToPlane=true;
		this.plane=this.pLayer.planeBack;
		this.plane.addChild(this.ho);		
	
        return false;
    },

    destroyRunObject:function(bFast)
    {
		this.plane.removeChild(this.ho);

        var rhPtr = this.ho.hoAdRunHeader;

        var pDataKcBoxAFrameData = rhPtr.getStorage(this.ho.hoIdentifier);

        // Container?
        if ((this.rNumInContList != -1) && (pData != null))
        {
            pData.RemoveContainer(this);
        }

        // Remove from global list of objects
        if ((this.rNumInObjList != -1) && (pData != null))
        {
            pData.RemoveObjectFromList(this);
        }
        rhPtr.delStorage(this.ho.hoIdentifier);
        if (pData.IsEmpty() == false)
        {
            rhPtr.addStorage(pData, this.ho.hoIdentifier);
        }	
    },

    handleRunObject:function()
    {
        var rhPtr = this.ho.hoAdRunHeader;
        
		var time;
        var pDataKcBoxAFrameData = rhPtr.getStorage(this.ho.hoIdentifier);        
        var oldX = this.ho.getX();
        var oldY = this.ho.getY();
        var newX = oldX;
        var newY = oldY;
        var reCode = 0;
		var rdPtrCont;
		
        // Contained ? must update coordinates
        if ((this.rData_dwFlags & CRunKcBoxB.FLAG_CONTAINED) != 0)
        {
            // Not yet a container? search Medor, search!
            if (this.rContNum == -1)
            {
                if (pData != null)
                {
                    this.rContNum = pData.GetContainer(this);
                    if (this.rContNum != -1)
                    {
                        rdPtrCont = pData.pContainers.get(this.rContNum);
                        this.rContDx = (this.ho.getX() - rdPtrCont.ho.getX());
                        this.rContDy = (this.ho.getY() - rdPtrCont.ho.getY());
                    }
                }
            }

            if ((this.rContNum != -1) && (pData != null) && (this.rContNum < pData.pContainers.size()))
            {
                rdPtrCont = pData.pContainers.get(this.rContNum);
                if (rdPtrCont != null)
                {
                    newX = rdPtrCont.ho.getX() + this.rContDx;
                    newY = rdPtrCont.ho.getY() + this.rContDy;
                }
            }
        }

        if ((newX != oldX) || (newY != oldY))
        {
            this.ho.setX(newX);
            this.ho.setY(newY);

            reCode = CRunExtension.REFLAG_DISPLAY;
        }

        return reCode;	// REFLAG_ONESHOT+REFLAG_DISPLAY;	
    },

    displayRunObject:function(context, xDraw, yDraw)
    {
        // Get rhPtr
        var rhPtr = this.ho.hoAdRunHeader;

        var rc = new CRect();
        rc.left = this.ho.hoX-this.rh.rhWindowX+xDraw+this.pLayer.x;
        rc.top = this.ho.hoY-this.rh.rhWindowY+yDraw+this.pLayer.y;
        rc.right = rc.left+this.ho.hoImgWidth;
        rc.bottom = rc.top+this.ho.hoImgHeight;

		var hFn=this.wFont;
        this.DisplayObject(context, this.ho.hoAdRunHeader.rhApp, rc, this.pText, hFn);
    },

    BuildSysColorTable:function()
    {
        sysColorTab = new Array(CRunKcBoxB.COLOR_GRADIENTINACTIVECAPTION);
        sysColorTab[0] = 0xc8c8c8;
        sysColorTab[1] = 0x000000;
        sysColorTab[2] = 0x99b4d1;
        sysColorTab[3] = 0xbfcddb;//SystemColor.activeCaptionBorder;
        sysColorTab[4] = 0xf0f0f0;
        sysColorTab[5] = 0xffffff;
        sysColorTab[6] = 0x646464;//SystemColor.inactiveCaptionBorder;
        sysColorTab[7] = 0x000000;
        sysColorTab[8] = 0x000000;
        sysColorTab[9] = 0x000000;
        sysColorTab[10] = 0xb4b4b4;//new
        sysColorTab[11] = 0xf4f7fc;//new
        sysColorTab[12] = 0xababab;//mdi one, doesn't quite match. There is no java mdi background colour./ AppWorksapce
        sysColorTab[13] = 0x3399ff;//SystemColor.textText;
        sysColorTab[14] = 0xffffff; //new //SystemColor.textHighlight;
        sysColorTab[15] = 0xf0f0f0;//SystemColor.textHighlightText;
        sysColorTab[16] = 0xa0a0a0;//SystemColor.textInactiveText;
        sysColorTab[17] = 0x808080;
        sysColorTab[18] = 0x000000;
        sysColorTab[19] = 0x434e54;
        sysColorTab[20] = 0xffffff;
        sysColorTab[21] = 0x696969;
        sysColorTab[22] = 0xe3e3e3;
        sysColorTab[23] = 0x000000;
        sysColorTab[24] = 0xffffe1;
    },

    myGetSysColor:function(colorIndex)
    {
        // Build table
        if (!this.bSysColorTab)
        {
            this.BuildSysColorTable();
            this.bSysColorTab = true;
        }

        // Get color
        if (colorIndex < CRunKcBoxB.COLOR_GRADIENTINACTIVECAPTION)
        {
            return sysColorTab[colorIndex];
        }

        return 0;
    },

    fromC:function(c) 
    {
        var r = c&0x0000FF;
        var g = (c&0x00FF00)>>8;
        var b = (c&0xFF0000)>>16;
        return (r<<16)|(g<<8)|b;
    },

    DisplayObject:function(context, idAppApp, rc, pText, hFnt)
    {
        var x = rc.left;
        var y = rc.top;
        var w = rc.right - rc.left;
        var h = rc.bottom - rc.top;

        var oldrc = new CRect();
        oldrc.copyRect(rc);
        rc.left = rc.top = 0;
        rc.bottom = h;
        rc.right = w;

        // Background
        var color;
        if (this.rData_fillColor != CRunKcBoxB.COLOR_NONE)
        {
            var clr = this.rData_fillColor;
            if ((clr & CRunKcBoxB.COLORFLAG_RGB) != 0)
            {
                color = clr & ~CRunKcBoxB.COLOR_FLAGS;
                color = fromC(color);
            }
            else
            {
                color = this.myGetSysColor(clr);
            }
            context.renderSolidColor(x, y, w, h, color);
        }

        // Image
        if ((this.rData_wImage != null))
        {
        	if (((this.rData_dwFlags & CRunKcBoxB.FLAG_HIDEIMAGE) == 0))
	        {
	            var bDisplayImage = true;
	            if ((this.rData_dwFlags & (CRunKcBoxB.FLAG_BUTTON | CRunKcBoxB.FLAG_CHECKBOX | CRunKcBoxB.FLAG_IMAGECHECKBOX)) == (CRunKcBoxB.FLAG_BUTTON | CRunKcBoxB.FLAG_CHECKBOX | CRunKcBoxB.FLAG_IMAGECHECKBOX))
	            {
	                if ((this.rData_dwFlags & (CRunKcBoxB.FLAG_BUTTON_PRESSED | CRunKcBoxB.FLAG_CHECKED)) == 0)
	                {
	                    bDisplayImage = false;
	                }
	            }
	            if (bDisplayImage == true)
	            {
					var dx=0, dy=0;
	                var xc, yc, wc, hc;
	                xc = x;
	                wc = w;
	                yc = y;
	                hc = h;
	
	                if (wc > 0 && hc > 0)
	                {
	                    if ((this.rData_dwFlags & CRunKcBoxA.ALIGN_IMAGE_PATTERN) != 0)
	                    {
	                    	context.renderPattern(this.rData_wImage, xc, yc, wc, hc, 0, 0);
	                    }
	                    else
	                    {
		                    if ((this.rData_dwFlags & CRunKcBoxA.ALIGN_IMAGE_TOPLEFT) != 0)
		                    {
		                    	xc=x;
		                    	yc=y;
		                    }
		                    else if ((this.rData_dwFlags & CRunKcBoxA.ALIGN_IMAGE_CENTER) != 0)
		                    {
			                    xc=x + Math.floor((w - this.rData_wImage.width) / 2);
			                    yc=y + Math.floor((h - this.rData_wImage.height) / 2);
		                    }
	                    	context.renderImage(this.rData_wImage, xc, yc, 0, 1, 1, 0, 0);
	                    }
	                }
	
	                this.rData_dwFlags &= ~CRunKcBoxB.FLAG_FORCECLIPPING;
	
	                if ((this.rData_dwFlags & (CRunKcBoxB.FLAG_BUTTON_PRESSED | CRunKcBoxB.FLAG_CHECKED)) != 0 &&
	                        (this.rData_dwFlags & (CRunKcBoxB.FLAG_BUTTON | CRunKcBoxB.FLAG_CHECKBOX | CRunKcBoxB.FLAG_IMAGECHECKBOX)) != (CRunKcBoxB.FLAG_BUTTON | CRunKcBoxB.FLAG_CHECKBOX | CRunKcBoxB.FLAG_IMAGECHECKBOX))
	                {
	                    x -= 2;
	                    y -= 2;
	                }
	            }
	        }
        }
        
        // Text
        if ((pText.length != 0) && (this.rData_textColor != CRunKcBoxA.COLOR_NONE))
        {
            var textLocation = new CRect();
            textLocation.left = rc.left + this.rData_textMarginLeft;
            textLocation.top = rc.top + this.rData_textMarginTop;
            textLocation.right = rc.right - this.rData_textMarginRight;
            textLocation.bottom = rc.bottom - this.rData_textMarginBottom;

            if ((this.rData_dwFlags & CRunKcBoxA.FLAG_BUTTON) != 0 &&
                    (this.rData_dwFlags & (CRunKcBoxA.FLAG_BUTTON_PRESSED | CRunKcBoxA.FLAG_CHECKED)) != 0 &&
                    (this.rData_dwFlags & (CRunKcBoxA.FLAG_BUTTON | CRunKcBoxA.FLAG_CHECKBOX | CRunKcBoxA.FLAG_IMAGECHECKBOX)) != (CRunKcBoxA.FLAG_BUTTON | CRunKcBoxA.FLAG_CHECKBOX | CRunKcBoxA.FLAG_IMAGECHECKBOX))
            {
                textLocation.left += 2;
                textLocation.top += 2;
            }

            if ((this.rData_dwFlags & CRunKcBoxA.FLAG_DISABLED) != 0)
            {
                clr = myGetSysColor(20);	
                textLocation.left++;
                textLocation.top++;
                textLocation.right++;
                textLocation.bottom++;
	            this.drawText(context, pText, textLocation, hFnt, this.rData_dwFlags, false, clr);
            }
            else
            {
                clr = this.rData_textColor;
                var hyperlink = false;
                if ((this.rData_dwFlags & CRunKcBoxA.FLAG_HYPERLINK) != 0)
                {
                    if ((this.rData_dwFlags & (CRunKcBoxA.FLAG_BUTTON_HIGHLIGHTED | CRunKcBoxA.FLAG_BUTTON_PRESSED)) != 0)
                    {
                        clr = this.rData1_dwUnderlinedColor;		// COLORFLAG_RGB | 0x0000FF;
                        hyperlink = true;
                    }
                }

                if ((clr & CRunKcBoxA.COLORFLAG_RGB) != 0)
                {
                    clr &= ~CRunKcBoxA.COLOR_FLAGS;
                    clr = this.fromC(clr);
                }
                else
                {
                    clr = this.myGetSysColor(clr);
                }
	            this.drawText(context, pText, textLocation, hFnt, this.rData_dwFlags, hyperlink, clr);
            }
        }

        // Border
        var color1 = this.rData_borderColor1;
        var color2 = this.rData_borderColor2;
        var bDisplayBorder = true;
        if (bDisplayBorder == true)
        {
            if (color1 != CRunKcBoxA.COLOR_NONE)
            {
                if ((color1 & CRunKcBoxA.COLORFLAG_RGB) != 0)
                {
                    color1 &= ~CRunKcBoxA.COLOR_FLAGS;
                    color1 = this.fromC(color1);
                }
                else
                {
                    color1 = this.myGetSysColor(color1);
                }
                context.renderRect(x, y, w, h, color1, 1, 0, 0);
            }
            if (color2 != CRunKcBoxA.COLOR_NONE)
            {
                if ((color2 & CRunKcBoxA.COLORFLAG_RGB) != 0)
                {
                    color2 &= ~CRunKcBoxA.COLOR_FLAGS;
                    color2 = this.fromC(color2);
                }
                else
                {
                    color2 = this.myGetSysColor(color2);
                }
                context.renderRect(x, y, w-1, h-1, color2, 1, 0, 0);
            }
        }
    },

	drawText:function(context, text, textLocation, font, flags, hyperlink, clr)
	{
		if (this.displayText)
		{
			this.displayText=false;
			
			var flags=0;
			if ( (this.rData_dwFlags & CRunKcBoxA.ALIGN_LEFT)!=0 )
				flags=CServices.DT_LEFT;
			if ( (this.rData_dwFlags & CRunKcBoxA.ALIGN_HCENTER)!=0 )
				flags=CServices.DT_CENTER;
			if ( (this.rData_dwFlags & CRunKcBoxA.ALIGN_RIGHT)!=0 )
				flags=CServices.DT_RIGHT;
			if ( (this.rData_dwFlags & CRunKcBoxA.ALIGN_MULTILINE) == 0 )
				flags|=CServices.DT_SINGLELINE;
	
			if ( (this.rData_dwFlags & CRunKcBoxA.ALIGN_NOPREFIX)==0 )
			{
				var n;
				var temp;
				for (n=0; n<text.length; n++)
				{
					if (text.charAt(n)=="&")
					{
						temp=text.substring(0, n)+text.substring(n+1);
						if (temp.length>n && temp.charAt(n)=="&")
						{
							n++;
						}
						text=temp;
					}	
				}				
			} 
			var temp=new CRect(0, 0, textLocation.right-textLocation.left, textLocation.bottom-textLocation.top);
			this.syText=this.textSurface.setText(text, flags, temp, font, clr);
		}		
		var y=textLocation.top;
		if ( (this.rData_dwFlags & CRunKcBoxA.ALIGN_VCENTER)!=0 )
			y=Math.floor(textLocation.top+(textLocation.bottom-textLocation.top)/2-this.syText/2);
		if ( (this.rData_dwFlags & CRunKcBoxA.ALIGN_BOTTOM)!=0 )
			y=textLocation.bottom-this.syText;
		this.textSurface.draw(context, textLocation.left, y, 0, 0);
	},

    getRunObjectFont:function()
    {
        return this.wFont;
    },

    setRunObjectFont:function(fi, rc)
    {
        var rhPtr = this.ho.hoAdRunHeader;
        this.wFont = fi;

        if (rc != null)
        {
            this.ho.setWidth(rc.right);
            this.ho.setHeight(rc.bottom);
        }
        this.displayText=true;
        this.ho.redraw();
    },

    getRunObjectTextColor:function()
    {
        var clr = this.rData_textColor;
        if ((clr & CRunKcBoxB.COLORFLAG_RGB) != 0)
        {
            clr&=~CRunKcBoxB.COLORFLAG_RGB;
            return CServices.swapRGB(clr);
        }
        return this.myGetSysColor(clr);
    },

    setRunObjectTextColor:function(rgb)
    {
        this.rData_textColor = CServices.swapRGB(rgb)|CRunKcBoxB.COLORFLAG_RGB;
        this.displayText=true;
        this.ho.redraw();
    },

	// CONDITIONS
	// ------------------------------------------------------------------------	    
    condition:function(num, cnd)
    {
        switch (num)
        {
            case CRunKcBoxB.CND_ENABLED:
                return this.IsEnabled();
            case CRunKcBoxB.CND_MOUSEOVER:
                return this.MouseOver();
            case CRunKcBoxB.CND_IMAGESHOWN:
                return this.IsImageShown();
            case CRunKcBoxB.CND_DOCKED:
                return this.IsDocked();
        }
        return false;
    },

    IsEnabled:function()
    {
        return ((this.rData_dwFlags & CRunKcBoxB.FLAG_DISABLED) == 0);
    },

    MouseOver:function()
    {
        var rhPtr = this.ho.hoAdRunHeader;
        var pDataKcBoxAFrameData = rhPtr.getStorage(this.ho.hoIdentifier);
        if (pData != null)
        {
            return (this.rNumInObjList == pData.GetObjectFromList(this.rh.rh2MouseX, this.rh.rh2MouseY));
        }
        return false;
    },

    IsImageShown:function()
    {
        return ((this.rData_dwFlags & CRunKcBoxB.FLAG_HIDEIMAGE) == 0);
    },

    IsDocked:function()
    {
        return ((this.dwRtFlags & CRunKcBoxB.DOCK_FLAGS) != 0);
    },

    action:function(num, act)
    {
        switch (num)
        {
            case CRunKcBoxB.ACT_ACTION_SETDIM:
                this.SetDimensions(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                break;
            case CRunKcBoxB.ACT_ACTION_SETPOS:
                this.SetPosition(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                break;
            case CRunKcBoxB.ACT_ACTION_ENABLE:
                this.Enable();
                break;
            case CRunKcBoxB.ACT_ACTION_DISABLE:
                this.Disable();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_NONE:
                this.SetFillColor_None();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_3DDKSHADOW:
                this.SetFillColor_3DDKSHADOW();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_3DFACE:
                this.SetFillColor_3DFACE();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_3DHILIGHT:
                this.SetFillColor_3DHIGHLIGHT();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_3DLIGHT:
                this.SetFillColor_3DLIGHT();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_3DSHADOW:
                this.SetFillColor_3DSHADOW();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_ACTIVECAPTION:
                this.SetFillColor_ACTIVECAPTION();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_APPWORKSPACE:
                this.SetFillColor_APPWORKSPACE();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_DESKTOP:
                this.SetFillColor_DESKTOP();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_HIGHLIGHT:
                this.SetFillColor_HIGHLIGHT();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_INACTIVECAPTION:
                this.SetFillColor_INACTIVECAPTION();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_INFOBK:
                this.SetFillColor_INFOBK();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_MENU:
                this.SetFillColor_MENU();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_SCROLLBAR:
                this.SetFillColor_SCROLLBAR();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_WINDOW:
                this.SetFillColor_WINDOW();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_WINDOWFRAME:
                this.SetFillColor_WINDOWFRAME();
                break;
            case CRunKcBoxB.ACT_ACTION_SETCOLOR_OTHER:
                this.SetFillColor_Other(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcBoxB.ACT_ACTION_SETB1COLOR_NONE:
                this.SetB1Color_None();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB1COLOR_3DDKSHADOW:
                this.SetB1Color_3DDKSHADOW();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB1COLOR_3DFACE:
                this.SetB1Color_3DFACE();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB1COLOR_3DHILIGHT:
                this.SetB1Color_3DHIGHLIGHT();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB1COLOR_3DSHADOW:
                this.SetB1Color_3DSHADOW();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB1COLOR_ACTIVEBORDER:
                this.SetB1Color_ACTIVEBORDER();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB1COLOR_INACTIVEBORDER:
                this.SetB1Color_INACTIVEBORDER();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB1COLOR_WINDOWFRAME:
                this.SetB1Color_WINDOWFRAME();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB1COLOR_OTHER:
                this.SetB1Color_Other(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_NONE:
                this.SetB2Color_None();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DDKSHADOW:
                this.SetB2Color_3DDKSHADOW();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DFACE:
                this.SetB2Color_3DFACE();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DHILIGHT:
                this.SetB2Color_3DHIGHLIGHT();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DLIGHT:
                this.SetB2Color_3DLIGHT();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_3DSHADOW:
                this.SetB2Color_3DSHADOW();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_ACTIVEBORDER:
                this.SetB2Color_ACTIVEBORDER();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_INACTIVEBORDER:
                this.SetB2Color_INACTIVEBORDER();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_WINDOWFRAME:
                this.SetB2Color_WINDOWFRAME();
                break;
            case CRunKcBoxB.ACT_ACTION_SETB2COLOR_OTHER:
                this.SetB2Color_Other(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_NONE:
                this.SetTxtColor_None();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_3DHILIGHT:
                this.SetTxtColor_3DHIGHLIGHT();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_3DSHADOW:
                this.SetTxtColor_3DSHADOW();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_BTNTEXT:
                this.SetTxtColor_BTNTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_CAPTIONTEXT:
                this.SetTxtColor_CAPTIONTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_GRAYTEXT:
                this.SetTxtColor_GRAYTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_HIGHLIGHTTEXT:
                this.SetTxtColor_HIGHLIGHTTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_INACTIVECAPTIONTEXT:
                this.SetTxtColor_INACTIVECAPTIONTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_INFOTEXT:
                this.SetTxtColor_INFOTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_MENUTEXT:
                this.SetTxtColor_MENUTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_WINDOWTEXT:
                this.SetTxtColor_WINDOWTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_TEXTCOLOR_OTHER:
                this.SetTxtColor_Other(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_NONE:
                this.SetHyperlinkColor_None();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_3DHILIGHT:
                this.SetHyperlinkColor_3DHIGHLIGHT();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_3DSHADOW:
                this.SetHyperlinkColor_3DSHADOW();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_BTNTEXT:
                this.SetHyperlinkColor_BTNTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_CAPTIONTEXT:
                this.SetHyperlinkColor_CAPTIONTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_GRAYTEXT:
                this.SetHyperlinkColor_GRAYTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_HIGHLIGHTTEXT:
                this.SetHyperlinkColor_HIGHLIGHTTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_INACTIVECAPTIONTEXT:
                this.SetHyperlinkColor_INACTIVECAPTIONTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_INFOTEXT:
                this.SetHyperlinkColor_INFOTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_MENUTEXT:
                this.SetHyperlinkColor_MENUTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_WINDOWTEXT:
                this.SetHyperlinkColor_WINDOWTEXT();
                break;
            case CRunKcBoxB.ACT_ACTION_HYPERLINKCOLOR_OTHER:
                this.SetHyperlinkColor_Other(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcBoxB.ACT_ACTION_SETTEXT:
                this.SetText(act.getParamExpString(this.rh, 0));
                break;
            case CRunKcBoxB.ACT_ACTION_SETTOOLTIPTEXT:
                this.SetToolTipText(act.getParamExpString(this.rh, 0));
                break;
            case CRunKcBoxB.ACT_ACTION_UNDOCK:
                this.Undock();
                break;
            case CRunKcBoxB.ACT_ACTION_DOCK_LEFT:
                this.DockLeft();
                break;
            case CRunKcBoxB.ACT_ACTION_DOCK_RIGHT:
                this.DockRight();
                break;
            case CRunKcBoxB.ACT_ACTION_DOCK_TOP:
                this.DockTop();
                break;
            case CRunKcBoxB.ACT_ACTION_DOCK_BOTTOM:
                this.DockBottom();
                break;
            case CRunKcBoxB.ACT_ACTION_SHOWIMAGE:
                this.ShowImage();
                break;
            case CRunKcBoxB.ACT_ACTION_HIDEIMAGE:
                this.HideImage();
                break;
        }
    },

    SetDimensions:function(w, h)
    {
        // Set dimensions
        if ((this.ho.getWidth() != w) || (this.ho.getHeight() != h))
        {
            this.ho.setWidth(w);
            this.ho.setHeight(h);
            this.displayArray=null;
            this.ho.redraw();
        }
    },

    SetPosition:function(x, y)
    {
        if ((this.ho.getX() != x) || (this.ho.getY() != y))
        {
            this.ho.setX(x);
            this.ho.setY(y);

            // Container ? must update coordinates of contained objects
            if ((this.rData_dwFlags & CRunKcBoxB.FLAG_CONTAINER) != 0)
            {
                var rhPtr = this.ho.hoAdRunHeader;
                // Get FrameData
                var pDataKcBoxAFrameData = rhPtr.getStorage(this.ho.hoIdentifier);
                if (pData != null)
                {
                    pData.UpdateContainedPos();
                    rhPtr.delStorage(this.ho.hoIdentifier);
                    rhPtr.addStorage(pData, this.ho.hoIdentifier);
                }
            }
            this.ho.redraw();
        }
    },

    Enable:function()
    {
        if ((this.rData_dwFlags & CRunKcBoxB.FLAG_DISABLED) != 0)
        {
            this.rData_dwFlags &= ~CRunKcBoxB.FLAG_DISABLED;
            this.ho.redraw();
        }
    },

    Disable:function()
    {
        if ((this.rData_dwFlags & CRunKcBoxB.FLAG_DISABLED) == 0)
        {
            this.rData_dwFlags |= CRunKcBoxB.FLAG_DISABLED;
            this.ho.redraw();
        }
    },

    SetFillColor_None:function()
    {
        if (this.rData_fillColor != CRunKcBoxB.COLOR_NONE)
        {
            this.rData_fillColor = CRunKcBoxB.COLOR_NONE;
            this.ho.redraw();
        }
    },

    SetFillColor_3DDKSHADOW:function()
    {
        if (this.rData_fillColor != 21)
        {
            this.rData_fillColor = 21;
            this.ho.redraw();
        }
    },

    SetFillColor_3DFACE:function()
    {
        if (this.rData_fillColor != 15)
        {
            this.rData_fillColor = 15;
            this.ho.redraw();
        }
    },

    SetFillColor_3DHIGHLIGHT:function()
    {
        if (this.rData_fillColor != 20)
        {
            this.rData_fillColor = 20;
            this.ho.redraw();
        }
    },

    SetFillColor_3DLIGHT:function()
    {
        if (this.rData_fillColor != 22)
        {
            this.rData_fillColor = 22;
            this.ho.redraw();
        }
    },

    SetFillColor_3DSHADOW:function()
    {
        if (this.rData_fillColor != 16)
        {
            this.rData_fillColor = 16;
            this.ho.redraw();
        }
    },

    SetFillColor_ACTIVECAPTION:function()
    {
        if (this.rData_fillColor != 2)
        {
            this.rData_fillColor = 2;
            this.ho.redraw();
        }
    },

    SetFillColor_APPWORKSPACE:function()
    {
        if (this.rData_fillColor != 12)
        {
            this.rData_fillColor = 12;
            this.ho.redraw();
        }
    },

    SetFillColor_DESKTOP:function()
    {
        if (this.rData_fillColor != 1)
        {
            this.rData_fillColor = 1;
            this.ho.redraw();
        }
    },

    SetFillColor_HIGHLIGHT:function()
    {
        if (this.rData_fillColor != 13)
        {
            this.rData_fillColor = 13;
            this.ho.redraw();
        }
    },

    SetFillColor_INACTIVECAPTION:function()
    {
        if (this.rData_fillColor != 3)
        {
            this.rData_fillColor = 3;
            this.ho.redraw();
        }
    },

    SetFillColor_INFOBK:function()
    {
        if (this.rData_fillColor != 24)
        {
            this.rData_fillColor = 24;
            this.ho.redraw();
        }
    },

    SetFillColor_MENU:function()
    {
        if (this.rData_fillColor != 4)
        {
            this.rData_fillColor = 4;
            this.ho.redraw();
        }
    },

    SetFillColor_SCROLLBAR:function()
    {
        if (this.rData_fillColor != 0)
        {
            this.rData_fillColor = 0;
            this.ho.redraw();
        }
    },

    SetFillColor_WINDOW:function()
    {
        if (this.rData_fillColor != 5)
        {
            this.rData_fillColor = 5;
            this.ho.redraw();
        }
    },

    SetFillColor_WINDOWFRAME:function()
    {
        if (this.rData_fillColor != 6)
        {
            this.rData_fillColor = 6;
            this.ho.redraw();
        }
    },

    SetFillColor_Other:function(c)
    {
        if ((c & CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR) != 0)
        {
            c &= 0xFFFF;
        }
        else
        {
            c |= CRunKcBoxB.COLORFLAG_RGB;
        }
        if (this.rData_fillColor != c)
        {
            this.rData_fillColor = c;
            this.ho.redraw();
        }
    },

    SetB1Color_None:function()
    {
        if (this.rData_borderColor1 != CRunKcBoxB.COLOR_NONE)
        {
            this.rData_borderColor1 = CRunKcBoxB.COLOR_NONE;
            this.ho.redraw();
        }
    },

    SetB1Color_3DDKSHADOW:function()
    {
        if (this.rData_borderColor1 != 21)
        {
            this.rData_borderColor1 = 21;
            this.ho.redraw();
        }
    },

    SetB1Color_3DFACE:function()
    {
        if (this.rData_borderColor1 != 15)
        {
            this.rData_borderColor1 = 15;
            this.ho.redraw();
        }
    },

    SetB1Color_3DHIGHLIGHT:function()
    {
        if (this.rData_borderColor1 != 20)
        {
            this.rData_borderColor1 = 20;
            this.ho.redraw();
        }
    },

    SetB1Color_3DLIGHT:function()
    {
        if (this.rData_borderColor1 != 22)
        {
            this.rData_borderColor1 = 22;
            this.ho.redraw();
        }
    },

    SetB1Color_3DSHADOW:function()
    {
        if (this.rData_borderColor1 != 16)
        {
            this.rData_borderColor1 = 16;
            this.ho.redraw();
        }
    },

    SetB1Color_ACTIVEBORDER:function()
    {
        if (this.rData_borderColor1 != 10)
        {
            this.rData_borderColor1 = 10;
            this.ho.redraw();
        }
    },

    SetB1Color_INACTIVEBORDER:function()
    {
        if (this.rData_borderColor1 != 11)
        {
            this.rData_borderColor1 = 11;
            this.ho.redraw();
        }
    },

    SetB1Color_WINDOWFRAME:function()
    {
        if (this.rData_borderColor1 != 6)
        {
            this.rData_borderColor1 = 6;
            this.ho.redraw();
        }
    },

    SetB1Color_Other:function(c)
    {
        if ((c & CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR) != 0)
        {
            c &= 0xFFFF;
        }
        else
        {
            c |= CRunKcBoxB.COLORFLAG_RGB;
        }
        if (this.rData_borderColor1 != c)
        {
            this.rData_borderColor1 = c;
            this.ho.redraw();
        }
    },

    SetB2Color_None:function()
    {
        if (this.rData_borderColor2 != CRunKcBoxB.COLOR_NONE)
        {
            this.rData_borderColor2 = CRunKcBoxB.COLOR_NONE;
            this.ho.redraw();
        }
    },

    SetB2Color_3DDKSHADOW:function()
    {
        if (this.rData_borderColor2 != 21)
        {
            this.rData_borderColor2 = 21;
            this.ho.redraw();
        }
    },

    SetB2Color_3DFACE:function()
    {
        if (this.rData_borderColor2 != 15)
        {
            this.rData_borderColor2 = 15;
            this.ho.redraw();
        }
    },

    SetB2Color_3DHIGHLIGHT:function()
    {
        if (this.rData_borderColor2 != 20)
        {
            this.rData_borderColor2 = 20;
            this.ho.redraw();
        }
    },

    SetB2Color_3DLIGHT:function()
    {
        if (this.rData_borderColor2 != 22)
        {
            this.rData_borderColor2 = 22;
            this.ho.redraw();
        }
    },

    SetB2Color_3DSHADOW:function()
    {
        if (this.rData_borderColor2 != 16)
        {
            this.rData_borderColor2 = 16;
            this.ho.redraw();
        }
    },

    SetB2Color_ACTIVEBORDER:function()
    {
        if (this.rData_borderColor2 != 10)
        {
            this.rData_borderColor2 = 10;
            this.ho.redraw();
        }
    },

    SetB2Color_INACTIVEBORDER:function()
    {
        if (this.rData_borderColor2 != 11)
        {
            this.rData_borderColor2 = 11;
            this.ho.redraw();
        }
    },

    SetB2Color_WINDOWFRAME:function()
    {
        if (this.rData_borderColor2 != 6)
        {
            this.rData_borderColor2 = 6;
            this.ho.redraw();
        }
    },

    SetB2Color_Other:function(c)
    {
        if ((c & CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR) != 0)
        {
            c &= 0xFFFF;
        }
        else
        {
            c |= CRunKcBoxB.COLORFLAG_RGB;
        }
        if (this.rData_borderColor2 != c)
        {
            this.rData_borderColor2 = c;
            this.ho.redraw();
        }
    },

    SetTxtColor_None:function()
    {
        if (this.rData_textColor != CRunKcBoxB.COLOR_NONE)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = this.COLOR_NONE;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_3DHIGHLIGHT:function()
    {
        if (this.rData_textColor != 20)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 20;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_3DSHADOW:function()
    {
        if (this.rData_textColor != 16)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 16;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_BTNTEXT:function()
    {
        if (this.rData_textColor != 18)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 18;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_CAPTIONTEXT:function()
    {
        if (this.rData_textColor != 9)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 9;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_GRAYTEXT:function()
    {
        if (this.rData_textColor != 17)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 17;
        		this.displayText=true;
           this.ho.redraw();
        }
    },

    SetTxtColor_HIGHLIGHTTEXT:function()
    {
        if (this.rData_textColor != 14)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 14;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_INACTIVECAPTIONTEXT:function()
    {
        if (this.rData_textColor != 19)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 19;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_INFOTEXT:function()
    {
        if (this.rData_textColor != 23)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 23;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_MENUTEXT:function()
    {
        if (this.rData_textColor != 7)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 7;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_WINDOWTEXT:function()
    {
        if (this.rData_textColor != 8)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = 8;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetTxtColor_Other:function(c)
    {
        if ((c & CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR) != 0)
        {
            c &= 0xFFFF;
        }
        else
        {
            c |= CRunKcBoxB.COLORFLAG_RGB;
        }
        if (this.rData_textColor != c)
        {
            this.textNeedsRedraw = true;

            this.rData_textColor = c;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_None:function()
    {
        if (this.rData1_dwUnderlinedColor != CRunKcBoxB.COLOR_NONE)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = this.COLOR_NONE;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_3DHIGHLIGHT:function()
    {
        if (this.rData1_dwUnderlinedColor != 20)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 20;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_3DSHADOW:function()
    {
        if (this.rData1_dwUnderlinedColor != 16)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 16;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_BTNTEXT:function()
    {
        if (this.rData1_dwUnderlinedColor != 18)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 18;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_CAPTIONTEXT:function()
    {
        if (this.rData1_dwUnderlinedColor != 9)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 9;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_GRAYTEXT:function()
    {
        if (this.rData1_dwUnderlinedColor != 17)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 17;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_HIGHLIGHTTEXT:function()
    {
        if (this.rData1_dwUnderlinedColor != 14)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 14;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_INACTIVECAPTIONTEXT:function()
    {
        if (this.rData1_dwUnderlinedColor != 19)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 19;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_INFOTEXT:function()
    {
        if (this.rData1_dwUnderlinedColor != 23)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 23;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_MENUTEXT:function()
    {
        if (this.rData1_dwUnderlinedColor != 7)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 7;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_WINDOWTEXT:function()
    {
        if (this.rData1_dwUnderlinedColor != 8)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = 8;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetHyperlinkColor_Other:function(c)
    {
        if ((c & CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR) != 0)
        {
            c &= 0xFFFF;
        }
        else
        {
            c |= CRunKcBoxB.COLORFLAG_RGB;
        }
        if (this.rData1_dwUnderlinedColor != c)
        {
            this.textNeedsRedraw = true;

            this.rData1_dwUnderlinedColor = c;
       		this.displayText=true;
            this.ho.redraw();
        }
    },

    SetText:function(s)
    {
        if(s == this.pText)
            return;

        this.textNeedsRedraw = true;

        this.pText = s;
  		this.displayText=true;
        this.ho.redraw();
    },

    SetToolTipText:function(s)
    {
    },

    Undock:function()
    {
        if ((this.dwRtFlags & CRunKcBoxB.DOCK_FLAGS) != 0)
        {
            this.dwRtFlags &= ~CRunKcBoxB.DOCK_FLAGS;
        }
    },

    DockLeft:function()
    {
        if ((this.dwRtFlags & CRunKcBoxB.DOCK_LEFT) == 0)
        {
            this.dwRtFlags |= CRunKcBoxB.DOCK_LEFT;
            this.ho.reHandle();
        }
    },

    DockRight:function()
    {
        if ((this.dwRtFlags & CRunKcBoxB.DOCK_RIGHT) == 0)
        {
            this.dwRtFlags |= CRunKcBoxB.DOCK_RIGHT;
            this.ho.reHandle();
        }
    },

    DockTop:function()
    {
        if ((this.dwRtFlags & CRunKcBoxB.DOCK_TOP) == 0)
        {
            this.dwRtFlags |= CRunKcBoxB.DOCK_TOP;
            this.ho.reHandle();
        }
    },

    DockBottom:function()
    {
        if ((this.dwRtFlags & CRunKcBoxB.DOCK_BOTTOM) == 0)
        {
            this.dwRtFlags |= CRunKcBoxB.DOCK_BOTTOM;
            this.ho.reHandle();
        }
    },

    ShowImage:function()
    {
        if ((this.rData_dwFlags & CRunKcBoxB.FLAG_HIDEIMAGE) != 0)
        {
            this.rData_dwFlags &= ~CRunKcBoxB.FLAG_HIDEIMAGE;
            this.ho.redraw();
        }
    },

    HideImage:function()
    {
        if ((this.rData_dwFlags & CRunKcBoxB.FLAG_HIDEIMAGE) == 0)
        {
            this.rData_dwFlags |= CRunKcBoxB.FLAG_HIDEIMAGE;
            this.ho.redraw();
        }
    },

	// EXPRESSIONS
	// -------------------------------------------------------------------------
    expression:function(num)
    {
        switch (num)
        {
            case CRunKcBoxB.EXP_COLOR_BACKGROUND:
                return this.ExpColorBackground();
            case CRunKcBoxB.EXP_COLOR_BORDER1:
                return this.ExpColorBorder1();
            case CRunKcBoxB.EXP_COLOR_BORDER2:
                return this.ExpColorBorder2();
            case CRunKcBoxB.EXP_COLOR_TEXT:
                return this.ExpColorText();
            case CRunKcBoxB.EXP_COLOR_HYPERLINK:
                return this.ExpColorHyperlink();
            case CRunKcBoxB.EXP_COLOR_3DDKSHADOW:
                return this.ExpColor_3DDKSHADOW();
            case CRunKcBoxB.EXP_COLOR_3DFACE:
                return this.ExpColor_3DFACE();
            case CRunKcBoxB.EXP_COLOR_3DHILIGHT:
                return this.ExpColor_3DHILIGHT();
            case CRunKcBoxB.EXP_COLOR_3DLIGHT:
                return this.ExpColor_3DLIGHT();
            case CRunKcBoxB.EXP_COLOR_3DSHADOW:
                return this.ExpColor_3DSHADOW();
            case CRunKcBoxB.EXP_COLOR_ACTIVEBORDER:
                return this.ExpColor_ACTIVEBORDER();
            case CRunKcBoxB.EXP_COLOR_ACTIVECAPTION:
                return this.ExpColor_ACTIVECAPTION();
            case CRunKcBoxB.EXP_COLOR_APPWORKSPACE:
                return this.ExpColor_APPWORKSPACE();
            case CRunKcBoxB.EXP_COLOR_DESKTOP:
                return this.ExpColor_DESKTOP();
            case CRunKcBoxB.EXP_COLOR_BTNTEXT:
                return this.ExpColor_BTNTEXT();
            case CRunKcBoxB.EXP_COLOR_CAPTIONTEXT:
                return this.ExpColor_CAPTIONTEXT();
            case CRunKcBoxB.EXP_COLOR_GRAYTEXT:
                return this.ExpColor_GRAYTEXT();
            case CRunKcBoxB.EXP_COLOR_HIGHLIGHT:
                return this.ExpColor_HIGHLIGHT();
            case CRunKcBoxB.EXP_COLOR_HIGHLIGHTTEXT:
                return this.ExpColor_HIGHLIGHTTEXT();
            case CRunKcBoxB.EXP_COLOR_INACTIVEBORDER:
                return this.ExpColor_INACTIVEBORDER();
            case CRunKcBoxB.EXP_COLOR_INACTIVECAPTION:
                return this.ExpColor_INACTIVECAPTION();
            case CRunKcBoxB.EXP_COLOR_INACTIVECAPTIONTEXT:
                return this.ExpColor_INACTIVECAPTIONTEXT();
            case CRunKcBoxB.EXP_COLOR_INFOBK:
                return this.ExpColor_INFOBK();
            case CRunKcBoxB.EXP_COLOR_INFOTEXT:
                return this.ExpColor_INFOTEXT();
            case CRunKcBoxB.EXP_COLOR_MENU:
                return this.ExpColor_MENU();
            case CRunKcBoxB.EXP_COLOR_MENUTEXT:
                return this.ExpColor_MENUTEXT();
            case CRunKcBoxB.EXP_COLOR_SCROLLBAR:
                return this.ExpColor_SCROLLBAR();
            case CRunKcBoxB.EXP_COLOR_WINDOW:
                return this.ExpColor_WINDOW();
            case CRunKcBoxB.EXP_COLOR_WINDOWFRAME:
                return this.ExpColor_WINDOWFRAME();
            case CRunKcBoxB.EXP_COLOR_WINDOWTEXT:
                return this.ExpColor_WINDOWTEXT();
            case CRunKcBoxB.EXP_GETTEXT:
                return this.ExpGetText();
            case CRunKcBoxB.EXP_GETTOOLTIPTEXT.pText:
                return this.ExpGetToolTipText();
            case CRunKcBoxB.EXP_GETWIDTH:
                return this.ExpGetWidth();
            case CRunKcBoxB.EXP_GETHEIGHT:
                return this.ExpGetHeight();
            case CRunKcBoxB.EXP_GETX:
                return this.ExpGetX();
            case CRunKcBoxB.EXP_GETY:
                return this.ExpGetY();
            case CRunKcBoxB.EXP_SYSTORGB:
                return this.ExpSysToRGB();
        }
        return 0;
    },

    ExpColorBackground:function()
    {
        var clr = this.rData_fillColor;
        if ((clr & CRunKcBoxB.COLORFLAG_RGB) != 0)
        {
            clr &= 0xFFFFFF;
        }
        else
        {
            clr |= CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR;
        }
        return clr;
    },

    ExpColorBorder1:function()
    {
        var clr = this.rData_borderColor1;
        if ((clr & CRunKcBoxB.COLORFLAG_RGB) != 0)
        {
            clr &= 0xFFFFFF;
        }
        else
        {
            clr |= CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR;
        }
        return clr;
    },

    ExpColorBorder2:function()
    {
        var clr = this.rData_borderColor2;
        if ((clr & CRunKcBoxB.COLORFLAG_RGB) != 0)
        {
            clr &= 0xFFFFFF;
        }
        else
        {
            clr |= CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR;
        }
        return clr;
    },

    ExpColorText:function()
    {
        var clr = this.rData_textColor;
        if ((clr & CRunKcBoxB.COLORFLAG_RGB) != 0)
        {
            clr &= 0xFFFFFF;
        }
        else
        {
            clr |= CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR;
        }
        return clr;
    },

    ExpColorHyperlink:function()
    {
        var clr = this.rData1_dwUnderlinedColor;
        if ((clr & CRunKcBoxB.COLORFLAG_RGB) != 0)
        {
            clr &= 0xFFFFFF;
        }
        else
        {
            clr |= CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR;
        }
        return clr;
    },

    ExpColor_3DDKSHADOW:function()
    {
        return (21 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_3DFACE:function()
    {
        return (15 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_3DHILIGHT:function()
    {
        (20 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_3DLIGHT:function()
    {
        return (22 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_3DSHADOW:function()
    {
        return (16 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_ACTIVEBORDER:function()
    {
        return (10 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_ACTIVECAPTION:function()
    {
        return (2 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_APPWORKSPACE:function()
    {
        return (12 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_DESKTOP:function()
    {
        return (1 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_BTNTEXT:function()
    {
        return (18 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_CAPTIONTEXT:function()
    {
        return (9 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_GRAYTEXT:function()
    {
        return (17 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_HIGHLIGHT:function()
    {
        return (13 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_HIGHLIGHTTEXT:function()
    {
        return (14 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_INACTIVEBORDER:function()
    {
        return (11 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_INACTIVECAPTION:function()
    {
        return (3 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_INACTIVECAPTIONTEXT:function()
    {
        return (19 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_INFOBK:function()
    {
        return (24 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_INFOTEXT:function()
    {
        return (23 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_MENU:function()
    {
        return (4 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_MENUTEXT:function()
    {
        return (7 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_SCROLLBAR:function()
    {
        return (0 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_WINDOW:function()
    {
        return (5 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_WINDOWFRAME:function()
    {
        return (6 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpColor_WINDOWTEXT:function()
    {
        return (8 | CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR);
    },

    ExpGetText:function()
    {
        return this.pText;
    },

    ExpGetToolTipText:function()
    {
        return "";
    },

    ExpGetWidth:function()
    {
        return this.ho.getWidth();
    },

    ExpGetHeight:function()
    {
        return this.ho.getHeight();
    },

    ExpGetX:function()
    {
        return this.ho.getX();
    },

    ExpGetY:function()
    {
        return this.ho.getY();
    },

    ExpSysToRGB:function()
    {
        var rgb;
        var paramColor = this.ho.getExpParam();

        if ((paramColor & CRunKcBoxB.PARAMFLAG_SYSTEMCOLOR) != 0)
        {
            var sc = (paramColor & 0xFFFF);
            rgb = this.myGetSysColor(sc);
        }
        else
        {
            rgb = paramColor & 0xFFFFFF;
            rgb = this.fromC(rgb);
        }
        var r = (rgb&0xFF0000)>>16;
        var g = (rgb&0x00FF00)>>8;
        var b = (rgb&0x0000FF);
        return (b * 65536 + g * 256 + r);
    }
});

CRunKcBoxBFrameData.TYPE_OBJECT=0;
CRunKcBoxBFrameData.TYPE_CONTAINER=1;
CRunKcBoxBFrameData.FLAG_CONTAINED= 0x00002000;

function CRunKcBoxBFrameData()
{
    this.pObjects=null;
    this.pContainers=null;	    
}
CRunKcBoxBFrameData.prototype=
{
    IsEmpty:function()
    {
    	var i;
        if (this.pObjects != null)
        {
            for (i = 0; i < this.pObjects.size(); i++)
            {
                if (this.pObjects.get(i) != null)
                {
                    return false;
                }
            }
        }
        if (this.pContainers != null)
        {
            for (i = 0; i < this.pContainers.size(); i++)
            {
                if (this.pContainers.get(i) != null)
                {
                    return false;
                }
            }
        }
        return true;
    },
    AddObjAddr:function(t, reObject)
    {
    	var i;
        if (t == CRunKcBoxBFrameData.TYPE_OBJECT)
        {
           // 1st allocation
            if (this.pObjects == null)
            {
                this.pObjects = new CArrayList();
                this.pObjects.add(reObject);
                return 0;
            }
            // Search for free place
            for (i=0; i < this.pObjects.size(); i++)
            {
                if (this.pObjects.get(i) == null)
                {
                    this.pObjects.set(i, reObject);
                    return i;
                }
            }
            // Reallocation
            this.pObjects.add(reObject);
            return this.pObjects.size() - 1;
        }
        if (t == CRunKcBoxBFrameData.TYPE_CONTAINER)
        {
            if (this.pContainers == null)
            {
                this.pContainers = new CArrayList();
                this.pContainers.add(reObject);
                return 0;
            }
            // Search for free place
            for (i=0; i < this.pContainers.size(); i++)
            {
                if (this.pContainers.get(i) == null )
                {
                    this.pContainers.set(i, reObject);
                    return i;
                }
            }
            // Reallocation
            this.pContainers.add(reObject);
            return this.pContainers.size() - 1;
        }
        return 0; //won't happen
    },
    
    // Remove object from list
    RemoveObjAddr:function(t, reObject)
    {
    	var i;
        if (t == CRunKcBoxBFrameData.TYPE_OBJECT)
        {
            if (this.pObjects != null)
            {
                i = this.pObjects.indexOf(reObject);
                if (i != -1)
                {
                    this.pObjects.set(i, null);
                }                
            }
        }
        if (t == CRunKcBoxBFrameData.TYPE_CONTAINER)
        {
            if (this.pContainers != null)
            {
                i = this.pContainers.indexOf(reObject);
                if (i != -1)
                {
                    this.pContainers.set(i, null);
                } 
            }
        }
    },
    
    AddContainer:function(re)
    {
        return this.AddObjAddr(CRunKcBoxBFrameData.TYPE_CONTAINER, re);
    },
    AddObject:function(re)
    {
        return this.AddObjAddr(CRunKcBoxBFrameData.TYPE_OBJECT, re);
    },
    AddButton:function(re)
    {
        return this.AddObjAddr(CRunKcBoxBFrameData.TYPE_BUTTON, re);
    },
    RemoveContainer:function(re)
    {
        this.RemoveObjAddr(CRunKcBoxBFrameData.TYPE_CONTAINER, re);
    },
    RemoveObjectFromList:function(re)
    {
        this.RemoveObjAddr(CRunKcBoxBFrameData.TYPE_OBJECT, re);
    },
    GetContainer:function(re)
    {
        var left = re.ho.getX();
        var top = re.ho.getY();
        var right = re.ho.getX() + re.ho.getWidth();
        var bottom = re.ho.getY() + re.ho.getHeight();
		
		var i;
        if (this.pContainers != null)
        {
            for (i=0; i < this.pContainers.size(); i++)
            {
                if ((this.pContainers.get(i) != null) && (this.pContainers.get(i) != re))
                {
                    var reThisOne= this.pContainers.get(i);
                    if ((left >= reThisOne.ho.getX()) && 
                            (right <= reThisOne.ho.getX() + reThisOne.ho.getWidth()) && 
                            (top >= reThisOne.ho.getY()) && 
                            (bottom <= reThisOne.ho.getY() + reThisOne.ho.getHeight()))
                    {
                        return i;
                    }
                }
            } 
        }
        return -1;
    },
    GetObjectFromList:function(x, y)
    {
        var r = -1;
        var i;
        if (this.pObjects != null)
        {
            for (i = this.pObjects.size() - 1; i >= 0; i--)
            {
                if (this.pObjects.get(i) != null)
                {
                    var reThisOne= this.pObjects.get(i);
                    var rhPtr= reThisOne.ho.hoAdRunHeader;
                    if ((x >= reThisOne.ho.getX() - rhPtr.rhWindowX) &&
                             (x <= (reThisOne.ho.getX() - rhPtr.rhWindowX + reThisOne.ho.getWidth())) &&
                             (y >= (reThisOne.ho.getY() - rhPtr.rhWindowY)) &&
                             (y <= (reThisOne.ho.getY() - rhPtr.rhWindowY + reThisOne.ho.getHeight())))
                    {
                        r = i;
                        break;
                    }
                }
            }
        }
		return r;
    },
    UpdateContainedPos:function()
    {
    	var i;
    	var rdPtrCont;
		if (this.pObjects != null)
        {
            for (i=0; i < this.pObjects.size(); i++)
            {
                if (this.pObjects.get(i) != null)
                {
                    var reThisOne = this.pObjects.get(i);
                    // Contained ? must update coordinates
                    if ((reThisOne.rData_dwFlags & CRunKcBoxB.FLAG_CONTAINED) != 0)
                    {
                        // Not yet a container? search Medor, search!
                        if (reThisOne.rContNum == -1 )
                        {
                            reThisOne.rContNum = this.GetContainer(reThisOne);
                            if (reThisOne.rContNum != -1 )
                            {
                                rdPtrCont = this.pContainers.get(reThisOne.rContNum);
                                reThisOne.rContDx = (reThisOne.ho.getX() - rdPtrCont.ho.getX());
                                reThisOne.rContDy = (reThisOne.ho.getY() - rdPtrCont.ho.getY());
                            }
                        }

                        if ((reThisOne.rContNum != -1) && (reThisOne.rContNum < this.pContainers.size() ))
                        {
                            rdPtrCont = this.pContainers.get(reThisOne.rContNum);
                            if (rdPtrCont != null )
                            {
                                var newX = rdPtrCont.ho.getX() + reThisOne.rContDx;
                                var newY = rdPtrCont.ho.getY() + reThisOne.rContDy;
                                if ((newX != reThisOne.ho.getX()) || (newY != reThisOne.ho.getY()))
                                {
                                    reThisOne.ho.setX(newX);
                                    reThisOne.ho.setY(newY);
                                    reThisOne.ho.redraw();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

