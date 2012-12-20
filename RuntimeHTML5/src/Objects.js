
// CObject
// ----------------------------------------------------------------
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

CObject.HOF_DESTROYED=0x0001;
CObject.HOF_TRUEEVENT=0x0002;
CObject.HOF_REALSPRITE=0x0004;
CObject.HOF_FADEIN=0x0008;
CObject.HOF_FADEOUT=0x0010;
CObject.HOF_OWNERDRAW=0x0020;
CObject.HOF_NOCOLLISION=0x2000;
CObject.HOF_FLOAT=0x4000;
CObject.HOF_STRING=0x8000;
function CObject()
{
	this.hoNumber=0;			
	this.hoNextSelected=0;	
    this.hoAdRunHeader=null;
    this.hoHFII=0;
    this.hoOi=0;
    this.hoNumPrev=0;
    this.hoNumNext=0;
    this.hoType=0;
    this.hoCreationId=0;
    this.hoOiList=null;
    this.hoEvents=0;		
    this.hoPrevNoRepeat=null;
    this.hoBaseNoRepeat=null;	
    this.hoMark1=0;
    this.hoMark2=0;
    this.hoMT_NodeName=null;
    this.hoEventNumber=0;   
    this.hoCommon=null;
    this.hoCalculX=0;
    this.hoX=0;
    this.hoCalculY=0;
    this.hoY=0;
    this.hoImgXSpot=0;
    this.hoImgYSpot=0;
    this.hoImgWidth=0;
    this.hoImgHeight=0;	
    this.hoOEFlags=0;
    this.hoFlags=0;
    this.hoSelectedInOR=0;
    this.hoOffsetValue=0;
    this.hoLayer=0;
    this.hoLimitFlags=0;
    this.hoNextQuickDisplay=0;
    this.hoCurrentParam=0;
    this.hoIdentifier=0;
    this.hoCallRoutine=false;    
    this.roc=null;       
    this.rom=null;
    this.roa=null;
    this.rov=null;
    this.ros=null;
}
CObject.prototype=
{
	setScale:function(fScaleX, fScaleY)
    {	    	
		if ( this.roc.rcScaleX != fScaleX || this.roc.rcScaleY != fScaleY )
		{
			if (fScaleX>=0)
			{
		    	this.roc.rcScaleX = fScaleX;
		 	}
		 	if (fScaleY>=0)
		 	{
		    	this.roc.rcScaleY = fScaleY;
		  	}
		    this.roc.rcChanged = true;

            var ifo = this.hoAdRunHeader.rhApp.imageBank.getImageInfoEx(this.roc.rcImage, this.roc.rcAngle, this.roc.rcScaleX, this.roc.rcScaleY);
            this.hoImgWidth=ifo.width;
            this.hoImgHeight=ifo.height;
            this.hoImgXSpot=ifo.xSpot;
            this.hoImgYSpot=ifo.ySpot;	
		}
    },
    shtCreate:function(p, x, y, dir)
    {
		var nLayer= this.hoLayer;
		var num=this.hoAdRunHeader.f_CreateObject(p.cdpHFII, p.cdpOi, x, y, dir, CRun.COF_NOMOVEMENT|CRun.COF_HIDDEN, nLayer, -1);
		if (num>=0)
		{
		    var pHo=this.hoAdRunHeader.rhObjectList[num];
		    if (pHo.rom!=null)
		    {
				pHo.roc.rcDir=dir;
				pHo.rom.initSimple(pHo, CMoveDef.MVTYPE_BULLET, false);		
				pHo.roc.rcSpeed=p.shtSpeed;
				pHo.rom.rmMovement.init2(this);
	
				if (nLayer!=-1)
				{
				    if ( (pHo.hoOEFlags & CObjectCommon.OEFLAG_SPRITES) != 0 )
				    {
						var layer=this.hoAdRunHeader.rhFrame.layers[nLayer];
						if ( (layer.dwOptions & (CLayer.FLOPT_TOHIDE|CLayer.FLOPT_VISIBLE)) != CLayer.FLOPT_VISIBLE )
						{
						    pHo.ros.obHide();
						}
				    }
				}
	
				// Met l'objet dans la liste des objets selectionnes
				// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				this.hoAdRunHeader.rhEvtProg.evt_AddCurrentObject(pHo);
		
				// Force l'animation SHOOT si definie
				// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				if ((this.hoOEFlags&CObjectCommon.OEFLAG_ANIMATIONS)!=0)
				{
				    if (this.roa.anim_Exist(CAnim.ANIMID_SHOOT))
				    {
						this.roa.animation_Force(CAnim.ANIMID_SHOOT);
						this.roa.animation_OneLoop();
				    }
				}		
		    }
		    else
		    {
				this.hoAdRunHeader.destroy_Add(pHo.hoNumber);
		    }
		}
	},

	fixedValue:function()
	{
		return (this.hoCreationId<<16)|(this.hoNumber&0xFFFF);		
	},
	
    init:function(ocPtr, cob)
    {    	
    },
    
    handle:function()
    {    	
    },
    
    display:function()
    {    	
    },
    
    
    kill:function(bFast)
    {
    },

	getSurface:function(context)
	{
		return false;
	},
	
    getCollisionMask:function(flags)
    {
		return null;	    	
    },
	
	setEffect:function(effect, effectParam)
	{
	},

	addSprite:function(x, y, i, layer, bShow)
	{
	},
	
	addOwnerDrawSprite:function(x, y, layer, bQD, bShow, index)
	{
	},
	
	delSprite:function()
	{
		return 0;
	},
	
	showSprite:function()
	{
	},
	
	hideSprite:function()
	{			
	},
	
	setTransparency:function(t)
	{			
	},
	
	getChildIndex:function()
	{	
		return -1;
	},
	
	getChildMaxIndex:function()
	{
		return 0;
	},
	
	setChildIndex:function(index)
	{
	}
}

// CActive class
// ----------------------------------------------------------------
function CActive()
{
	this.smoothing=false;
	this.image=null;
	this.bShown=false;
	this.nLayer=0;
	this.pLayer=null;
	this.startFade=0;
	this.sprite=null;
	this.bHandCursor=false;
	this.rcRotate=null;
	this.ptRotate=null;
	this.bVisible=true;
	this.scaleX=1.0;
	this.scaleY=1.0;
	this.angle=0;
	this.x=0;
	this.y=0;
	this.transitionImage=null;
}
CActive.prototype=CServices.extend(new CObject(),
{
    handle:function()
    {
        this.ros.handle();
        if (this.roc.rcChanged)
        {
            this.roc.rcChanged=false;
        }
    },
	addSprite:function(xx, yy, ii, layer, bShow)
	{
		this.nLayer=layer;
		this.pLayer=this.hoAdRunHeader.rhFrame.layers[layer];
	 	this.bShown=bShow;
		this.pLayer.planeSprites.addChild(this);
	},
	draw: function(context, xx, yy)
	{
		if (this.bShown)
		{
			var effect=this.ros.rsEffect;
			if (this.ros.rsFlags&CRSpr.RSFLAG_ROTATE_ANTIA)
				effect|=CRSpr.BOP_SMOOTHING;
			var image=this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(this.roc.rcImage);					
			if (image)
			{
				if (!this.transitionImage)
				{
	                context.renderImage(image, xx + this.hoX - this.hoAdRunHeader.rhWindowX + this.pLayer.x,
	                                                yy + this.hoY - this.hoAdRunHeader.rhWindowY + this.pLayer.y,
	                                                this.roc.rcAngle, this.roc.rcScaleX, this.roc.rcScaleY,
	                                                effect, this.ros.rsEffectParam);
				}
				else
				{
					context.renderSimpleImage(this.transitionImage, xx + this.hoX - this.hoAdRunHeader.rhWindowX + this.pLayer.x-image.xSpot,
		                                                yy + this.hoY - this.hoAdRunHeader.rhWindowY + this.pLayer.y-image.ySpot,
		                                                this.transitionImage.width*this.roc.rcScaleX, this.transitionImage.height*this.roc.rcScaleY, 
		                                                effect, this.ros.rsEffectParam);
				}
			}
		}
	},
	delSprite:function()
	{
		return this.pLayer.planeSprites.removeChild(this);
	},
	showSprite:function()
	{
		this.bShown=true;
	},
	hideSprite:function()
	{
		this.bShown=false;
	},
	getChildIndex:function()
	{
		return this.pLayer.planeSprites.getChildIndex(this);
	},
	getChildMaxIndex:function()
	{
		return this.pLayer.planeSprites.children.length;
	},
	setChildIndex:function(index)
	{
		if (index>=this.pLayer.planeSprites.children.length)
		{
			index=this.pLayer.planeSprites.children.length;
		}
		if (index<0)
		{
			index=0;
		}
		this.pLayer.planeSprites.setChildIndex(this, index);
	},
	
	setTransparency:function(t)
	{
		this.ros.rsEffect=CRSpr.BOP_BLEND;
		this.ros.rsEffectParam=t;
	}
	
	
});

// Sub application object
// ----------------------------------------------------------------
CCCA.CCAF_SHARE_GLOBALVALUES=0x00000001;
CCCA.CCAF_SHARE_LIVES=0x00000002;
CCCA.CCAF_SHARE_SCORES=0x00000004;
CCCA.CCAF_SHARE_WINATTRIB=0x00000008;
CCCA.CCAF_STRETCH=0x00000010;
CCCA.CCAF_POPUP=0x00000020;
CCCA.CCAF_CAPTION=0x00000040;
CCCA.CCAF_TOOLCAPTION=0x00000080;
CCCA.CCAF_BORDER=0x00000100;
CCCA.CCAF_WINRESIZE=0x00000200;
CCCA.CCAF_SYSMENU=0x00000400;
CCCA.CCAF_DISABLECLOSE=0x00000800;
CCCA.CCAF_MODAL=0x00001000;
CCCA.CCAF_DIALOGFRAME=0x00002000;
CCCA.CCAF_INTERNAL=0x00004000;
CCCA.CCAF_HIDEONCLOSE=0x00008000;
CCCA.CCAF_CUSTOMSIZE=0x00010000;
CCCA.CCAF_INTERNALABOUTBOX=0x00020000;
CCCA.CCAF_CLIPSIBLINGS=0x00040000;
CCCA.CCAF_SHARE_PLAYERCTRLS=0x00080000;
CCCA.CCAF_MDICHILD=0x00100000;
CCCA.CCAF_DOCKED=0x00200000;
CCCA.CCAF_DOCKING_AREA=0x00C00000;
CCCA.CCAF_DOCKED_LEFT=0x00000000;
CCCA.CCAF_DOCKED_TOP=0x00400000;
CCCA.CCAF_DOCKED_RIGHT=0x00800000;
CCCA.CCAF_DOCKED_BOTTOM=0x00C00000;
CCCA.CCAF_REOPEN=0x01000000;
CCCA.CCAF_MDIRUNEVENIFNOTACTIVE=0x02000000;

function CCCA()
{
    this.flags=0;
    this.odOptions=0;
    this.subApp=null;
    this.oldX=0;
    this.oldY=0;
    this.level=-1;
    this.oldLevel=-1;
	this.layer=null;
	this.bVisible=true;
}
CCCA.prototype=CServices.extend(new CObject(),
{
//    init:function(ocPtr, cob)
    startCCA:function(ocPtr, bInit, nStartFrame)
    {        
        var defCCA= ocPtr.ocObject;

        this.hoImgWidth = defCCA.odCx;
        this.hoImgHeight = defCCA.odCy;
        this.odOptions = defCCA.odOptions;

        if ((this.odOptions & CCCA.CCAF_STRETCH) != 0)
        {
            this.odOptions |= CCCA.CCAF_CUSTOMSIZE;
        }

        if (nStartFrame == -1)
        {
            nStartFrame = 0;
            if ((this.odOptions & CCCA.CCAF_INTERNAL) != 0)
            {
                nStartFrame = defCCA.odNStartFrame;
            }
        }

        // Change l'extension
        if (defCCA.odName==null || defCCA.odName.length!=0)
        	return;
        if ((this.odOptions & CCCA.CCAF_INTERNAL) == 0)
            return;
        if (nStartFrame >= this.hoAdRunHeader.rhApp.gaNbFrames)
            return;
        if (nStartFrame == this.hoAdRunHeader.rhApp.currentFrame)
            return;

        if ((ocPtr.ocFlags2 & CObjectCommon.OCFLAGS2_VISIBLEATSTART)!=0)
			this.bVisible=true;
        else
        	this.bVisible=false;
        this.appSprite=new Sprite();
        this.appSprite.x=this.hoX-this.hoAdRunHeader.rhWindowX;
        this.appSprite.y=this.hoY-this.hoAdRunHeader.rhWindowY;
		this.hoAdRunHeader.rhApp.mainSprite.addChild(this);
        this.oldX=this.hoX;
        this.oldY=this.hoY;

        this.subApp = new CRunApp(this.hoAdRunHeader.rhApp.canvasName, this.hoAdRunHeader.rhApp.file);
        this.subApp.setParentApp(this.hoAdRunHeader.rhApp, nStartFrame, this.odOptions, this.appSprite, this.hoImgWidth, this.hoImgHeight);

        this.subApp.load();
        this.subApp.startApplication();
    	this.subApp.setMouseOffsets(this.hoAdRunHeader.rhApp.xMouseOffset+this.appSprite.x, this.hoAdRunHeader.rhApp.yMouseOffset+this.appSprite.y);
        this.subApp.stepApplication();
        this.hoAdRunHeader.rhApp.subApps.push(this.subApp);
    },
    
    init:function(ocPtr, cob)
    {
        this.startCCA(ocPtr, true, -1);
    }, 
    
    handle:function()
    {
        this.rom.move();
        if (this.subApp != null)
        {
            if (this.oldX != this.hoX || this.oldY != this.hoY)
            {
            	this.appSprite.x=this.hoX-this.hoAdRunHeader.rhWindowX;
            	this.appSprite.y=this.hoY-this.hoAdRunHeader.rhWindowY;	            	
            	this.oldX=this.hoX;
            	this.oldY=this.hoY;
            	this.subApp.setMouseOffsets(this.appSprite.x, this.appSprite.y);
            }
            if (this.subApp.stepApplication()==false)
            {
            	this.destroyObject();
                this.subApp = null;
                return;
            }
            this.oldLevel = this.level;
            this.level = this.subApp.currentFrame;
        }
    },

	draw:function(context, xx, yy)
	{
		if (!this.bVisible) return;
		if (this.subApp!=null)
		{
			this.subApp.drawSubApplication(context, this.appSprite.x, this.appSprite.y);
		}
	},
	
    kill:function(bFast)
    {
        if (this.subApp != null)
        {
            switch (this.subApp.appRunningState)
            {
                case 3:	    // SL_FRAMELOOP:
                    this.subApp.endFrame();
                    break;
            }
            this.destroyObject();
            this.subApp.endApplication();
            this.subApp = null;
        }
    },
    
    destroyObject:function()
    {
    	var n;
    	for (n=0; n<this.hoAdRunHeader.rhApp.subApps.length; n++)
    	{
    		if (this.hoAdRunHeader.rhApp.subApps[n]==this.subApp)
    		{
    			this.hoAdRunHeader.rhApp.subApps.splice(n, 1);
    			break;
    		}
    	}
		this.hoAdRunHeader.rhApp.mainSprite.removeChild(this.appSprite);
    },
    
    restartApp:function()
    {
        if (this.subApp != null)
        {
            if (this.subApp.run != null)
            {
                this.subApp.run.rhQuit = CRun.LOOPEXIT_NEWGAME;
                return;
            }
            this.kill(true);
        }
        this.startCCA(this.hoCommon, false, -1);
    },

    endApp:function()
    {
        if (this.subApp != null)
        {
            if (this.subApp.run != null)
            {
                this.subApp.run.rhQuit = CRun.LOOPEXIT_ENDGAME;
            }
        }
    },

    hide:function()
    {
    	this.bVisible=false;
    },

    show:function()
    {
    	this.bVisible=true;
    },

    jumpFrame:function(frame)
    {
        if (this.subApp != null)
        {
            if (this.subApp.run != null)
            {
            	if (frame>=0 && frame<4096)
            	{
	                this.subApp.run.rhQuit = CRun.LOOPEXIT_GOTOLEVEL;
	                this.subApp.run.rhQuitParam = 0x8000 | frame;
	            }
            }
        }
    },

    nextFrame:function()
    {
        if (this.subApp != null)
        {
            if (this.subApp.run != null)
            {
                this.subApp.run.rhQuit = CRun.LOOPEXIT_NEXTLEVEL;
            }
        }
    },

    previousFrame:function()
    {
        if (this.subApp != null)
        {
            if (this.subApp.run != null)
            {
                this.subApp.run.rhQuit = CRun.LOOPEXIT_PREVLEVEL;
            }
        }
    },

    restartFrame:function()
    {
        if (this.subApp != null)
        {
            if (this.subApp.run != null)
            {
                this.subApp.run.rhQuit = CRun.LOOPEXIT_RESTART;
            }
        }
    },

    pause:function()
    {
        if (this.subApp != null)
        {
            if (this.subApp.run != null)
            {
                this.subApp.run.pause();
            }
	    }
	},
	
    resume:function()
    {
        if (this.subApp != null)
        {
            if (this.subApp.run != null)
            {
                this.subApp.run.resume();
            }
        }
    },

    setGlobalValue:function(number, value)
    {
        if (this.subApp != null)
        {
            this.subApp.setGlobalValueAt(number, value);
        }
    },

    setGlobalString:function(number, value)
    {
        if (this.subApp != null)
        {
            this.subApp.setGlobalStringAt(number, value);
        }
    },

    isPaused:function()
    {
        if (this.subApp != null)
        {
            if (this.subApp.run != null)
            {
                return this.subApp.run.rh2PauseCompteur != 0;
            }
        }
        return false;
    },

    appFinished:function()
    {
        return this.subApp == null;
    },

    isVisible:function()
    {
    	return this.bVisible;
    },

    frameChanged:function()
    {
        return this.level != this.oldLevel;
    },

    getGlobalString:function(num)
    {
        if (this.subApp != null)
        {
            return this.subApp.getGlobalStringAt(num);
        }
        return "";
    },

    getGlobalValue:function(num)
    {
        if (this.subApp != null)
        {
            return this.subApp.getGlobalValueAt(num);
        }
        return 0;
    },

    getFrameNumber:function()
    {
        return this.level + 1;
    },

    bringToFront:function()
    {
        if (this.subApp != null)
        {
        	if (this.bVisible)
        	{
        		hoAdRunHeader.rhApp.planeControls.removeChild(this);
        		hoAdRunHeader.rhApp.planeControls.addChild(this);
        	}
        }
    }
});

// CRCom object
// --------------------------------------------------------------------
function CRCom()
{
    this.rcPlayer=0;	
    this.rcMovementType=0;
    this.rcAnim=0;			
    this.rcImage=-1;		
    this.rcScaleX=1.0;					
    this.rcScaleY=1.0;
    this.rcAngle=0;
    this.rcDir=0;
    this.rcSpeed=0;
    this.rcMinSpeed=0;
    this.rcMaxSpeed=0;
    this.rcChanged=false;
    this.rcCheckCollides=false;

    this.rcOldX=0;
    this.rcOldY=0;
    this.rcOldImage=-1;
    this.rcOldAngle=0;
    this.rcOldDir=0;
    this.rcOldX1=0;
    this.rcOldY1=0;
    this.rcOldX2=0;
    this.rcOldY2=0;
}
CRCom.prototype=
{
    init:function()
    {
        rcScaleX = 1.0;
        rcScaleY = 1.0;
        rcAngle=0;
        rcMovementType = -1;
    },
    kill:function(bFast)
    {
    }
}

// CCounter object
// ---------------------------------------------------------------
CCounter.CPTDISPFLAG_INTNDIGITS=0x000F;		
CCounter.CPTDISPFLAG_FLOATNDIGITS=0x00F0;		
CCounter.CPTDISPFLAG_FLOATNDIGITS_SHIFT=4
CCounter.CPTDISPFLAG_FLOATNDECIMALS=0xF000;	
CCounter.CPTDISPFLAG_FLOATNDECIMALS_SHIFT=12;
CCounter.CPTDISPFLAG_FLOAT_FORMAT=0x0200;		
CCounter.CPTDISPFLAG_FLOAT_USENDECIMALS=0x0400;
CCounter.CPTDISPFLAG_FLOAT_PADD=0x0800;		
function CCounter()
{
	this.type=0;
	this.rsValue=0;
	this.rsMini=0;
	this.rsMaxi=0;
	this.rsBoxCx=0;
	this.rsBoxCy=0;			
	this.bShown=false;
	this.bQuickDisplay=false;
	this.rsColor1=0;
	this.rsColor2=0
	this.rsOldFrame=0;
	this.nIndex=0;
	this.displayFlags=0;
	this.bDeleted=false;
	this.bFloat=false;
	this.plane=null;
	this.pLayer=null;
	this.fontString=null;
	this.fontHeight=0;
	this.font=null;
	this.bAddedToPlane=false;	
}

CCounter.prototype=CServices.extend(new CObject(),
{
    init:function(ocPtr, cob)
    {        
		this.rsFont = -1;
		this.rsColor1 = 0;
		this.rsColor2 = 0;
		this.hoImgWidth = this.hoImgHeight = 1;
	
		if (this.hoCommon.ocCounters==null)
		{
		    this.hoImgWidth = this.rsBoxCx = 1;
		    this.hoImgHeight = this.rsBoxCy = 1;
		}
		else
		{
		    var ctPtr=this.hoCommon.ocCounters;
		    this.hoImgWidth = this.rsBoxCx = ctPtr.odCx;
		    this.hoImgHeight = this.rsBoxCy = ctPtr.odCy;
			this.displayFlags=ctPtr.odDisplayFlags;
		    this.type=ctPtr.odDisplayType;
		    switch (this.type) 
		    {
			case 5:
				var nFont=this.rsFont;
				if ( nFont == -1 )
					nFont = ctPtr.odFont;
				this.font=this.hoAdRunHeader.rhApp.fontBank.getFontFromHandle(nFont);
				this.fontHeight=this.font.getHeight();
				this.fontString=this.font.getFont();
			    this.rsColor1= ctPtr.ocColor1;
			    break;
			case 2:
			case 3:
			    this.rsColor1 = ctPtr.ocColor1;
			    this.rsColor2 = ctPtr.ocColor2;
			    break;
			case 1:	
				break;
			case 4:
				break;				
		    }
		}

		var cPtr=this.hoCommon.ocObject;
		this.rsMini = cPtr.ctMini;
		this.rsMaxi = cPtr.ctMaxi;
		this.rsValue=cPtr.ctInit;
		this.bFloat=false;
    },

    kill:function()
    {
    },
    
    handle:function()
    {
        this.ros.handle();
        if (this.roc.rcChanged)
        {
            this.roc.rcChanged=false;
        }        
    },
    
	getFont:function()
	{
		var adCta=this.hoCommon.ocCounters;
		if (this.type==5)	
		{
		    var nFont= rsFont;
		    if ( nFont == -1 )
				nFont = adCta.odFont;
		    return this.hoAdRunHeader.rhApp.fontBank.getFontInfoFromHandle(nFont);
		}
		return null;
	},
	
	setFont:function(font, size)
	{
		if (this.type==5)
		{
		    this.rsFont=this.hoAdRunHeader.rhApp.fontBank.addFont(font);
			this.font=this.hoAdRunHeader.rhApp.fontBank.getFontFromHandle(this.rsFont);
			this.fontString=this.font.getFont();
			this.fontHeight=this.font.getHeight();
		    if ( size != null )
		    {
				this.hoImgWidth = this.rsBoxCx = size.right - size.left;
				this.hoImgHeight = this.rsBoxCy = size.bottom - size.top;
		    }
	        this.computeNewDisplay();
		}
	},
	
	getFontColor:function()
	{
		return this.rsColor1;
	},
	
	setFontColor:function(rgb)
	{
		this.rsColor1=rgb;
        this.computeNewDisplay();
	},
	
	cpt_ToFloat:function(pValue)
    {
		if (this.bFloat==false)
		{
		    if (CServices.isInt(pValue)) 
				return;
			this.bFloat=true;
		}
    },
    
    cpt_Change:function(pValue)
    {
		if (this.bFloat==false)
		{
		    var value=CServices.floatToInt(pValue);
		    if (value<this.rsMini) 
				value=this.rsMini;
		    if (value>this.rsMaxi) 
				value=this.rsMaxi;
		    if (value!=Math.round(this.rsValue))
		    {
				this.rsValue=value;
				this.roc.rcChanged=true;
				this.computeNewDisplay();
		    }
		}
		else
		{
		    if (pValue<this.rsMini) 
				pValue=this.rsMini;
		    if (pValue>this.rsMaxi) 
				pValue=this.rsMaxi;
		    if (pValue!=this.rsValue)
		    {
				this.rsValue=pValue;
				this.roc.rcChanged=true;
				this.computeNewDisplay();
		    }
		}
	},
	
    cpt_Add:function(pValue)
    {
		this.cpt_ToFloat(pValue);
		this.cpt_Change(this.rsValue+pValue);
    },
    
    cpt_Sub:function(pValue)
    {
		this.cpt_ToFloat(pValue);
		this.cpt_Change(this.rsValue-pValue);
    },
    
    cpt_SetMin:function(value)
    {
		this.rsMini=value;
		this.cpt_Change(this.rsValue);
    },
    
    cpt_SetMax:function(value)
    {
		this.rsMaxi=value;
		this.cpt_Change(this.rsValue);
    },
    
    cpt_SetColor1:function(rgb)
    {
		this.rsColor1=rgb;
        this.computeNewDisplay();
    },
    
    cpt_SetColor2:function(rgb)
    {
		this.rsColor2=rgb;
        this.computeNewDisplay();
    },
    
    cpt_GetValue:function()
    {
		return this.rsValue;
    },
    
    cpt_GetMin:function()
    {
		return this.rsMini;
    },
    
    cpt_GetMax:function()
    {
		return this.rsMaxi;
    },
    
    cpt_GetColor1:function()
    {
		return this.rsColor1;
    },
    
    cpt_GetColor2:function()
    {
		return this.rsColor2;
    },
    
	addOwnerDrawSprite:function(xx, yy, layer, quickDisplay, shown, index)
	{
		if ( this.hoCommon.ocCounters==null )
		    return;
		if (this.bAddedToPlane==true)
			return;
			
		this.bAddedToPlane=true;
		this.bQuickDisplay=quickDisplay;
		this.bShown=shown;

		this.pLayer=this.hoAdRunHeader.rhFrame.layers[layer];
		if (this.bQuickDisplay)
			this.plane=this.pLayer.planeQuickDisplay;
		else
			this.plane=this.pLayer.planeSprites;

		if (index<0)
			this.plane.addChild(this);
		else
			this.plane.addChildIndex(this, index);
				
		this.computeNewDisplay();
	},
	
	delSprite:function()
	{
		if ( this.hoCommon.ocCounters==null )
		    return -1;
		if (this.bAddedToPlane==false)
			return -1;
		
		this.bAddedToPlane=false;
		var index=this.plane.getChildIndex(this);
		this.plane.removeChild(this);
		return index;
	},
	
	getChildIndex:function()
	{
		if (this.bAddedToPlane)
		{
			return this.plane.getChildIndex(this);
		}
		return -1;
	},
	
	getChildMaxIndex:function()
	{
		if (this.bAddedToPlane)
			return this.plane.numChildren;
		return -1;
	},
	
	setChildIndex:function(index)
	{
		if (this.bAddedToPlane)
			this.plane.setChildIndex(this, index);
	},
	
	showSprite:function()
	{
		if ( this.hoCommon.ocCounters==null )
		    return;

		if (this.bShown==false)
		{
			this.bShown=true;				
			this.computeNewDisplay();
		}
	},
	
	hideSprite:function()
	{
		if ( this.hoCommon.ocCounters==null )
		    return;

		if (this.bShown==true)
		{
			this.bShown=false;
		}
	},
	
	computeNewDisplay:function()
	{
		var image;
    	var s;
    	var nbl;
		
		var adCta=this.hoCommon.ocCounters;
		switch (this.type) 
		{
		    case 4:
				if ( this.rsMaxi <= this.rsMini )
				    this.rsOldFrame = 0;
				else
				    this.rsOldFrame = Math.floor(((this.rsValue - this.rsMini) * adCta.nFrames) / (this.rsMaxi - this.rsMini));
				this.rsOldFrame=Math.min(this.rsOldFrame, adCta.nFrames-1);
		    	image=this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(adCta.frames[this.rsOldFrame]);
				this.hoImgWidth = image.width;
				this.hoImgHeight = image.height;
				this.hoImgXSpot = image.xSpot;
				this.hoImgYSpot = image.ySpot;
				break;
		    case 2:
		    case 3:
                nbl = this.rsBoxCx;
                if (adCta.odDisplayType == CDefCounters.CTA_VBAR)
                    nbl = this.rsBoxCy;
                if (this.rsMaxi <= this.rsMini)
                    this.rsOldFrame = 0;
                else
                    this.rsOldFrame = (((this.rsValue- this.rsMini) * nbl) / (this.rsMaxi - this.rsMini));
                if (adCta.odDisplayType == CDefCounters.CTA_HBAR)
                {
                    this.hoImgYSpot = 0;
                    this.hoImgHeight = this.rsBoxCy;
                    this.hoImgWidth = this.rsOldFrame;
                    if ((adCta.odDisplayFlags & CDefCounters.BARFLAG_INVERSE) != 0)
                        this.hoImgXSpot = this.rsOldFrame - this.rsBoxCx;
                    else
                        this.hoImgXSpot = 0;
                }
                else
                {
                    this.hoImgXSpot = 0;
                    this.hoImgWidth = this.rsBoxCx;
                    this.hoImgHeight = this.rsOldFrame;
                    if ((adCta.odDisplayFlags & CDefCounters.BARFLAG_INVERSE) != 0)
                        this.hoImgYSpot = this.rsOldFrame - this.rsBoxCy;
                    else
                        this.hoImgYSpot = 0;
                }
				break;						    
		    case 1:
		   		if (this.bFloat==false)
		   			s=CServices.intToString(this.rsValue, this.displayFlags);
		   		else			   		
					s=CServices.doubleToString(this.rsValue, this.displayFlags);					
				var i;
			    var c;
			    var img;
				var ifo;
				var dx=0, dy=0;
								    
				for (i=s.length-1; i>=0; i--)
				{
			    	c=s.charCodeAt(i);
			    	img=0;
				    if ( c == 45 )
						img = adCta.frames[10];	
				    else if ( c == 46 )	
						img = adCta.frames[12];	
				    else if ( c == 43 ) 
						img = adCta.frames[11];
			    	else if ( c == 101 || c == 69 )
						img = adCta.frames[13];	
				    else if ( c>=48 && c<=57 )
						img = adCta.frames[c-48];
					if (img>=0)
					{
					    ifo=this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(img);
					    dx+=ifo.width;
					    dy=Math.max(dy, ifo.height);
					}
				}
				this.hoImgXSpot=dx;
				this.hoImgYSpot=dy;
				this.hoImgWidth=dx;
				this.hoImgHeight=dy;
				break;
			case 5: 
		   		if (this.bFloat==false)
		   			s=CServices.intToString(this.rsValue, this.displayFlags);
		   		else			   		
					s=CServices.doubleToString(this.rsValue, this.displayFlags);					
				var w;
				if (this.textSurface!=null)
					w=this.textSurface.measureText(s, this.font);
				else
				{
					var ts=new CTextSurface(this.hoAdRunHeader.rhApp, 16, 16);
					w=ts.measureText(s, this.font);
				}
				this.hoImgXSpot=w;
				this.hoImgYSpot=this.rsBoxCy/2+this.fontHeight/2;
				this.hoImgWidth=w;
				this.hoImgHeight=this.fontHeight;
				if (this.textSurface==null)
					this.textSurface=new CTextSurface(this.hoAdRunHeader.rhApp, this.hoImgWidth, this.hoImgHeight);
				else
				{
					if (this.hoImgWidth>this.textSurface.width || this.hoImgHeight>this.textSurface.height)
						this.textSurface.resize(this.hoImgWidth, this.hoImgHeight);
				}
				var rect=new CRect(0, 0, 1000, 1000);
				this.textSurface.setText(s, CServices.DT_LEFT|CServices.DT_TOP, rect, this.font, this.rsColor1);	
				break;
    	}
	},
	
	draw: function(context, xx, yy)
	{
		if (!this.bShown) return;
		
		var image;
		var color1, color2;
    	var s;

		var adCta=this.hoCommon.ocCounters;
		var x=xx+this.hoX-this.hoImgXSpot-this.hoAdRunHeader.rhWindowX+this.pLayer.x;
		var y=yy+this.hoY-this.hoImgYSpot-this.hoAdRunHeader.rhWindowY+this.pLayer.y;
		var cx=this.hoImgWidth;
		var cy=this.hoImgHeight;
		switch (this.type) 
		{
	    case 4:
	    	image=this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(adCta.frames[this.rsOldFrame]);
            context.renderImage(image, x+image.xSpot, y+image.ySpot, 0, 1.0, 1.0, this.ros.rsEffect, this.ros.rsEffectParam);
			break;
	    case 2:	
	    case 3:	
            var color1 = this.rsColor1;
            var color2 = this.rsColor2;
            switch (adCta.ocFillType)
            {
            case 1:		
                context.renderSolidColor(x, y, cx, cy, color1, this.ros.rsEffect, this.ros.rsEffectParam);
                break;
            case 2:
                if ((adCta.odDisplayFlags & CDefCounters.BARFLAG_INVERSE) != 0)
                {
                    dl = color1;
                    color1 = color2;
                    color2 = dl;
                }
                var bVertical = adCta.ocGradientFlags != 0;
                context.renderGradient(x, y, cx, cy, color1, color2, bVertical, this.ros.rsEffect, this.ros.rsEffectParam);
				break;
			}	    
			break;
	    case 1:
	   		if (this.bFloat==false)
	   			s=CServices.intToString(this.rsValue, this.displayFlags);
	   		else			   		
				s=CServices.doubleToString(this.rsValue, this.displayFlags);					
            var i, img, ifo;
            for (i = 0; i < s.length; i++)
            {
                var c = s.charCodeAt(i);
                img = 0;
                if (c == 45) 
                    img = adCta.frames[10];	
                else if (c == 46 || c==44)
                    img = adCta.frames[12];	
                else if (c == 43)
                    img = adCta.frames[11];	
                else if (c == 69 || c == 101)
                    img = adCta.frames[13];
                else if (c >= 48 && c <= 57)
                    img = adCta.frames[c - 48];
                ifo = this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(img);
                context.renderImage(ifo, x+ifo.xSpot, y+ifo.ySpot, 1.0, 1.0, 1.0, this.ros.rsEffect, this.ros.rsEffectParam);
                x += ifo.width;
            }
            break;
		case 5: 
			this.textSurface.draw(context, x, y, this.ros.rsEffect, this.ros.rsEffectParam);
			break;
		}								
	}	
});

// CScore object
// ------------------------------------------------------------
function CScore()
{
	this.rsPlayer=0;
	this.rsValue=0;
	this.rsBoxCx=0;
	this.rsBoxCy=0;			
	this.rsFont=0;	
	this.rsColor1=0;
	this.type=0;
	this.bShown=true;
	this.nLayer=0;
	this.nIndex=0;
	this.plane=null;
	this.displayFlags=0;
	this.pLayer=null;
	this.bAddedToFrame=false;
	this.colorString=null;
	this.fontString=null;
	this.fontHeight=0;
	this.alpha=1.0;
	this.composite="source-over";
}

CScore.prototype=CServices.extend(new CObject(),
{
    init:function(ocPtr, cob)
    {        
		this.rsFont = -1;
		this.rsColor1 = 0;
		this.hoImgWidth = this.hoImgHeight = 1;		
		
		var adCta=this.hoCommon.ocCounters;
		this.hoImgWidth = this.rsBoxCx = adCta.odCx;
		this.hoImgHeight = this.rsBoxCy = adCta.odCy;
	    this.type=adCta.odDisplayType;
		this.rsColor1= adCta.ocColor1;
		this.rsPlayer = adCta.odPlayer;
		this.rsValue=this.hoAdRunHeader.rhApp.getScores()[this.rsPlayer-1];
		this.displayFlags=adCta.odDisplayFlags;
		
		if (this.type==5) 
		{
			var nFont=this.rsFont;
			if ( nFont == -1 )
			    nFont = adCta.odFont;
			this.font=this.hoAdRunHeader.rhApp.fontBank.getFontFromHandle(nFont);
			this.fontString=this.font.getFont();
			this.fontHeight=this.font.getHeight();
		}
    },
    
    kill:function()
    {
    },

    handle:function()
    {
        this.ros.handle();
        if (this.roc.rcChanged)
        {
            this.roc.rcChanged=false;
        }        
    },
    
	getFont:function()
	{
		var adCta=this.hoCommon.ocCounters;
		if (adCta.odDisplayType==5)	
		{
		    var nFont= this.rsFont;
		    if ( nFont == -1 )
				nFont = adCta.odFont;
		    return this.hoAdRunHeader.rhApp.fontBank.getFontInfoFromHandle(nFont);
		}
		return null;
	},
	
	setFont:function(font, size)
	{
		if (type==5)	
		{
		    this.rsFont=hoAdRunHeader.rhApp.fontBank.addFont(font);
			var font=this.hoAdRunHeader.rhApp.fontBank.getFontFromHandle(this.rsFont);
			this.fontString=font.getFont();
			this.fontHeight=font.getHeight();
		    if ( size != null )
		    {
				this.hoImgWidth = this.rsBoxCx = size.right - size.left;
				this.hoImgHeight = this.rsBoxCy = size.bottom - size.top;
		    }
		    this.computeNewDisplay();
		}
	},
	
	getFontColor:function()
	{
		return this.rsColor1;
	},
	
	setFontColor:function(rgb)
	{
		this.rsColor1=rgb;
	    this.computeNewDisplay();
	},

	addOwnerDrawSprite:function(xx, yy, layer, quickDisplay, shown, index)
	{
		if ( this.hoCommon.ocCounters==null )
		    return;
		if (this.bAddedToPlane==true)
			return;
			
		this.bAddedToPlane=true;
		this.bShown=shown;

		this.pLayer=this.hoAdRunHeader.rhFrame.layers[layer];
		if (quickDisplay)
			this.plane=this.pLayer.planeQuickDisplay;
		else
			this.plane=this.pLayer.planeSprites;

		if (index<0)
			this.plane.addChild(this);
		else
			this.plane.addChildIndex(this, index);
				
		this.computeNewDisplay();
	},
	
	delSprite:function()
	{
		if ( this.hoCommon.ocCounters==null )
		    return -1;
		if (this.bAddedToPlane==false)
			return -1;
		
		this.bAddedToPlane=false;
		var index=this.plane.getChildIndex(this);
		this.plane.removeChild(this);
		return index;
	},
	
	getChildIndex:function()
	{
		if (this.bAddedToPlane)
		{
			return this.plane.getChildIndex(this);
		}
		return -1;
	},
	
	getChildMaxIndex:function()
	{
		if (this.bAddedToPlane)
			return this.plane.numChildren;
		return -1;
	},
	
	setChildIndex:function(index)
	{
		if (this.bAddedToPlane)
			this.plane.setChildIndex(this, index);
	},
	
	showSprite:function()
	{
		if ( this.hoCommon.ocCounters==null )
		    return;

		if (this.bShown==false)
		{
			this.bShown=true;				
		    this.computeNewDisplay();
		}
	},
	
	hideSprite:function()
	{
		if ( this.hoCommon.ocCounters==null )
		    return;

		if (this.bShown==true)
		{
			this.bShown=false;
		}
	},
	
	setValue:function(value)
	{
		if (value!=this.rsValue)
		{
			this.rsValue=value;
			this.computeNewDisplay();
		}
	},
	
	computeNewDisplay:function()
	{
        this.hoImgWidth = this.hoImgHeight = 1;
        if (this.hoCommon.ocCounters == null)
            return;
        var adCta = this.hoCommon.ocCounters;
		
        var img;
        var s = CServices.intToString(this.rsValue, this.displayFlags);
        switch (adCta.odDisplayType)
        {
            case 1:	    
				var i;
			    var c;
			    var img;
				var ifo;
				var dx=0, dy=0;
								    
				for (i=s.length-1; i>=0; i--)
				{
			    	c=s.charCodeAt(i);
			    	img=0;
				    if ( c == 45 )
						img = adCta.frames[10];	
				    else if ( c == 46 )	
						img = adCta.frames[12];	
				    else if ( c == 43 ) 
						img = adCta.frames[11];
			    	else if ( c == 101 || c == 69 )
						img = adCta.frames[13];	
				    else if ( c>=48 && c<=57 )
						img = adCta.frames[c-48];
					if (img>=0)
					{
					    ifo=this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(img);
					    dx+=ifo.width;
					    dy=Math.max(dy, ifo.height);
					}
				}
				this.hoImgXSpot=dx;
				this.hoImgYSpot=dy;
				this.hoImgWidth=dx;
				this.hoImgHeight=dy;
				break;

            case 5:	 
				var w;
				if (this.textSurface!=null)
					w=this.textSurface.measureText(s, this.font);
				else
				{
					var ts=new CTextSurface(this.hoAdRunHeader.rhApp, 8, 8);
					w=ts.measureText(s, this.font);
				}
				this.hoImgXSpot=w;
				this.hoImgYSpot=this.rsBoxCy/2+this.fontHeight/2;
				this.hoImgWidth=w;
				this.hoImgHeight=this.fontHeight;	
				if (this.textSurface==null)
					this.textSurface=new CTextSurface(this.hoAdRunHeader.rhApp, this.hoImgWidth, this.hoImgHeight);
				else
				{
					if (this.hoImgWidth>this.textSurface.width || this.hoImgHeight>this.textSurface.height)
						this.textSurface.resize(this.hoImgWidth, this.hoImgHeight);
				}
				var rect=new CRect(0, 0, 1000, 1000);
				this.textSurface.setText(s, CServices.DT_LEFT|CServices.DT_TOP, rect, this.font, this.colorString);	
                break;
        }
	},

	draw:function(context, xx, yy)
	{
		if (!this.bShown) return;
		
		this.globalAlpha=this.alpha;
		this.globalCompositeOperation=this.composite;
		
		var image;
		var color1, color2;
    	var s;

		var adCta=this.hoCommon.ocCounters;
		var x=xx+this.hoX-this.hoImgXSpot-this.hoAdRunHeader.rhWindowX+this.pLayer.x;
		var y=yy+this.hoY-this.hoImgYSpot-this.hoAdRunHeader.rhWindowY+this.pLayer.y;
		s=CServices.intToString(this.rsValue, this.displayFlags);
		switch (this.type) 
		{
	    case 1:
            var i, img, ifo;
            for (i = 0; i < s.length; i++)
            {
                var c = s.charCodeAt(i);
                img = 0;
                if (c == 45) 
                    img = adCta.frames[10];	
                else if (c == 46 || c==44)
                    img = adCta.frames[12];	
                else if (c == 43)
                    img = adCta.frames[11];	
                else if (c == 69 || c == 101)
                    img = adCta.frames[13];
                else if (c >= 48 && c <= 57)
                    img = adCta.frames[c - 48];
                ifo = this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(img);
                context.renderImage(ifo, x+ifo.xSpot, y+ifo.ySpot, 0, 1.0, 1.0, this.ros.rsEffect, this.ros.rsEffectParam);
                x += ifo.width;
            }
            break;
		case 5: 
			this.textSurface.draw(context, x, y, this.ros.rsEffect, this.ros.rsEffectParam);
			break;
		}								
	}		    
});

// CLives object
// ------------------------------------------------------------
function CLives()
{
	this.rsPlayer=0;
	this.rsValue=0;
	this.rsBoxCx=0;
	this.rsBoxCy=0;			
	this.rsFont=0;	
	this.rsColor1=0;
	this.type=0;
	this.bShown=true;
	this.nLayer=0;
	this.nIndex=0;
	this.plane=null;
	this.displayFlags=0;
	this.pLayer=null;
	this.bAddedToFrame=false;
	this.colorString=null;
	this.fontString=null;
	this.fontHeight=0;
	this.alpha=1.0;
	this.composite="source-over";
}

CLives.prototype=CServices.extend(new CObject(),
{
    init:function(ocPtr, cob)
    {        
		this.rsFont = -1;
		this.rsColor1 = 0;
		this.hoImgWidth = this.hoImgHeight = 1;		
		
		var adCta=this.hoCommon.ocCounters;
		this.hoImgWidth = this.rsBoxCx = adCta.odCx;
		this.hoImgHeight = this.rsBoxCy = adCta.odCy;
	    this.type=adCta.odDisplayType;
		this.rsColor1= adCta.ocColor1;
		this.rsPlayer = adCta.odPlayer;
		this.rsValue=this.hoAdRunHeader.rhApp.getLives()[this.rsPlayer-1];
		this.displayFlags=adCta.odDisplayFlags;
		
		if (this.type==5) 
		{
			var nFont=this.rsFont;
			if ( nFont == -1 )
			    nFont = adCta.odFont;
			this.font=this.hoAdRunHeader.rhApp.fontBank.getFontFromHandle(nFont);
			this.fontString=this.font.getFont();
			this.fontHeight=this.font.getHeight();
		}
    },
    
    kill:function()
    {
    },

    handle:function()
    {
        this.ros.handle();
        if (this.roc.rcChanged)
        {
            this.roc.rcChanged=false;
        }        
    },
    
	getFont:function()
	{
		var adCta=this.hoCommon.ocCounters;
		if (adCta.odDisplayType==5)	
		{
		    var nFont= this.rsFont;
		    if ( nFont == -1 )
				nFont = adCta.odFont;
		    return this.hoAdRunHeader.rhApp.fontBank.getFontInfoFromHandle(nFont);
		}
		return null;
	},
	
	setFont:function(font, size)
	{
		if (type==5)	
		{
		    this.rsFont=hoAdRunHeader.rhApp.fontBank.addFont(font);
			var font=this.hoAdRunHeader.rhApp.fontBank.getFontFromHandle(this.rsFont);
			this.fontString=font.getFont();
			this.fontHeight=font.getHeight();
		    if ( size != null )
		    {
				this.hoImgWidth = this.rsBoxCx = size.right - size.left;
				this.hoImgHeight = this.rsBoxCy = size.bottom - size.top;
		    }
		    this.computeNewDisplay();
		}
	},
	
	getFontColor:function()
	{
		return this.rsColor1;
	},
	
	setFontColor:function(rgb)
	{
		this.rsColor1=rgb;
	    this.computeNewDisplay();
	},

	addOwnerDrawSprite:function(xx, yy, layer, quickDisplay, shown, index)
	{
		if ( this.hoCommon.ocCounters==null )
		    return;
		if (this.bAddedToPlane==true)
			return;
			
		this.bAddedToPlane=true;
		this.bShown=shown;

		this.pLayer=this.hoAdRunHeader.rhFrame.layers[layer];
		if (quickDisplay)
			this.plane=this.pLayer.planeQuickDisplay;
		else
			this.plane=this.pLayer.planeSprites;

		if (index<0)
			this.plane.addChild(this);
		else
			this.plane.addChildIndex(this, index);
				
		this.computeNewDisplay();
	},
	
	delSprite:function()
	{
		if ( this.hoCommon.ocCounters==null )
		    return -1;
		if (this.bAddedToPlane==false)
			return -1;
		
		this.bAddedToPlane=false;
		var index=this.plane.getChildIndex(this);
		this.plane.removeChild(this);
		return index;
	},
	
	getChildIndex:function()
	{
		if (this.bAddedToPlane)
		{
			return this.plane.getChildIndex(this);
		}
		return -1;
	},
	
	getChildMaxIndex:function()
	{
		if (this.bAddedToPlane)
			return this.plane.numChildren;
		return -1;
	},
	
	setChildIndex:function(index)
	{
		if (this.bAddedToPlane)
			this.plane.setChildIndex(this, index);
	},
	
	showSprite:function()
	{
		if ( this.hoCommon.ocCounters==null )
		    return;

		if (this.bShown==false)
		{
			this.bShown=true;				
		    this.computeNewDisplay();
		}
	},
	
	hideSprite:function()
	{
		if ( this.hoCommon.ocCounters==null )
		    return;

		if (this.bShown==true)
		{
			this.bShown=false;
		}
	},
	
	setValue:function(value)
	{
		if (value!=this.rsValue)
		{
			this.rsValue=value;
			this.computeNewDisplay();
		}
	},
	
	computeNewDisplay:function()
	{
        this.hoImgWidth = this.hoImgHeight = 1;
        if (this.hoCommon.ocCounters == null)
            return;
        var adCta = this.hoCommon.ocCounters;
		
        switch (adCta.odDisplayType)
        {
            case 4:	 
                if (this.rsValue != 0)
                {
                    ifo = this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(adCta.frames[0]);
                    var lg = this.rsValue * ifo.width;
                    if (lg <= this.rsBoxCx)
                    {
                        this.hoImgWidth = lg;
                        this.hoImgHeight = ifo.height;
                    }
                    else
                    {
                        this.hoImgWidth = this.rsBoxCx;
                        this.hoImgHeight = ((this.rsBoxCx / ifo.width) + this.rsValue - 1) * ifo.height;
                    }
                    break;
                }
                this.hoImgWidth = this.hoImgHeight = 1;	
                break;
            case 1:	    
				var i;
			    var c;
			    var img;
				var ifo;
				var dx=0, dy=0;
		        var s = CServices.intToString(this.rsValue, this.displayFlags);								    
				for (i=s.length-1; i>=0; i--)
				{
			    	c=s.charCodeAt(i);
			    	img=0;
				    if ( c == 45 )
						img = adCta.frames[10];	
				    else if ( c == 46 )	
						img = adCta.frames[12];	
				    else if ( c == 43 ) 
						img = adCta.frames[11];
			    	else if ( c == 101 || c == 69 )
						img = adCta.frames[13];	
				    else if ( c>=48 && c<=57 )
						img = adCta.frames[c-48];
					if (img>=0)
					{
					    ifo=this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(img);
					    dx+=ifo.width;
					    dy=Math.max(dy, ifo.height);
					}
				}
				this.hoImgXSpot=dx;
				this.hoImgYSpot=dy;
				this.hoImgWidth=dx;
				this.hoImgHeight=dy;
				break;

            case 5:	 
		        var s = CServices.intToString(this.rsValue, this.displayFlags);								    
				var w;
				if (this.textSurface!=null)
					w=this.textSurface.measureText(s, this.font);
				else
				{
					var ts=new CTextSurface(this.hoAdRunHeader.rhApp, 8, 8);
					w=ts.measureText(s, this.font);
				}
				this.hoImgXSpot=w;
				this.hoImgYSpot=this.rsBoxCy/2+this.fontHeight/2;
				this.hoImgWidth=w;
				this.hoImgHeight=this.fontHeight;	
				if (this.textSurface==null)
					this.textSurface=new CTextSurface(this.hoAdRunHeader.rhApp, this.hoImgWidth, this.hoImgHeight);
				else
				{
					if (this.hoImgWidth>this.textSurface.width || this.hoImgHeight>this.textSurface.height)
						this.textSurface.resize(this.hoImgWidth, this.hoImgHeight);
				}
				var rect=new CRect(0, 0, 1000, 1000);
				this.textSurface.setText(s, CServices.DT_LEFT|CServices.DT_TOP, rect, this.font, this.colorString);	
                break;
        }
	},

	draw:function(context, xx, yy)
	{
		if (!this.bShown) return;
		
		this.globalAlpha=this.alpha;
		this.globalCompositeOperation=this.composite;
				
		var image;
		var color1, color2;
    	var s;

		var adCta=this.hoCommon.ocCounters;
		var x=xx+this.hoX-this.hoImgXSpot-this.hoAdRunHeader.rhWindowX+this.pLayer.x;
		var y=yy+this.hoY-this.hoImgYSpot-this.hoAdRunHeader.rhWindowY+this.pLayer.y;
		switch (this.type) 
		{
	    case 1:
            var i, img, ifo;
			s=CServices.intToString(this.rsValue, this.displayFlags);
            for (i = 0; i < s.length; i++)
            {
                var c = s.charCodeAt(i);
                img = 0;
                if (c == 45) 
                    img = adCta.frames[10];	
                else if (c == 46 || c==44)
                    img = adCta.frames[12];	
                else if (c == 43)
                    img = adCta.frames[11];	
                else if (c == 69 || c == 101)
                    img = adCta.frames[13];
                else if (c >= 48 && c <= 57)
                    img = adCta.frames[c - 48];
                ifo = this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(img);
                context.renderImage(ifo, x+ifo.xSpot, y+ifo.ySpot, 0, 1.0, 1.0, this.ros.rsEffect, this.ros.rsEffectParam);
                x += ifo.width;
            }
            break;
        case 4:	    
            if (this.rsValue != 0)
            {
                var x2 = x+this.hoImgWidth;
                var y2 = y+this.hoImgHeight;
                var x1=x;
                var y1=y;
                var vInt=this.rsValue;
                var ifo = this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(adCta.frames[0]);
                for (y = y1; y < y2 && vInt > 0; y += ifo.height)
                {
                    for (x = x1; x < x2 && vInt > 0; x += ifo.width, vInt -= 1)
                    {
                        context.renderImage(ifo, x+ifo.xSpot, y+ifo.ySpot, 0, 1.0, 1.0, this.ros.rsEffect, this.ros.rsEffectParam);
                    }
                }
            }
            break;
		case 5: 
			this.textSurface.draw(context, x, y, this.ros.rsEffect, this.ros.rsEffectParam);
			break;
		}								
	}
});

// CText object
// ------------------------------------------------------------
function CText()
{
	this.rsTextBuffer=null;
	this.currentText=null;
    this.rsMaxi=0;
	this.rsMini=0;
    this.rsFont=0;
    this.rsTextColor=0;
	this.nLayer=0;
	this.font=null;
	this.bShown=true;
	this.flags=0;
	this.rsHidden=0;
	this.pLayer=null;
	this.plane=null;
	this.bAddedToPlane=false;
	this.rect=new CRect();
	this.deltaY=0;
	this.rsBoxCx=0;
	this.rsBoxCy=0;
	this.textSurface=null;
}

CText.prototype=CServices.extend(new CObject(),
{
	init:function(ocPtr, cob)
	{	
		var txt=ocPtr.ocObject;
		this.hoImgWidth = txt.otCx;
		this.hoImgHeight = txt.otCy;
		this.rsBoxCx = txt.otCx;
		this.rsBoxCy = txt.otCy;
	
		this.rsMaxi = txt.otNumberOfText;
		this.rsTextColor=0;
		if (txt.otTexts.length>0)
			this.rsTextColor = txt.otTexts[0].tsColor;
		
		this.rsTextBuffer=null;
		this.rsFont = -1;
		this.rsMini=0;
		this.bShown=true;
		this.rsHidden=cob.cobFlags;
		if ( (cob.cobFlags&CRun.COF_FIRSTTEXT)!=0 )
		{
			if (txt.otTexts.length>0)
			{
		    	this.rsTextBuffer=txt.otTexts[0].tsText;
		 	}
		}				
        var nFont = this.rsFont;
        if (nFont == -1)
        {
            if (txt.otTexts.length > 0)
                nFont = txt.otTexts[0].tsFont;
        }
        this.font = this.hoAdRunHeader.rhApp.fontBank.getFontFromHandle(nFont);
        this.textSurface=new CTextSurface(this.hoAdRunHeader.rhApp, this.hoImgWidth, this.hoImgHeight);
	},
    
    kill:function()
    {
    },

    handle:function()
    {
        this.ros.handle();
        if (this.roc.rcChanged)
        {
            this.roc.rcChanged=false;
        }        
    },
    
	getFont:function()
	{
        var nFont= this.rsFont;
		if ( nFont == -1 )
		{
		    var txt=this.hoCommon.ocObject;
		    nFont = txt.otTexts[0].tsFont;
		}
	    return this.hoAdRunHeader.rhApp.fontBank.getFontInfoFromHandle(nFont);
	},
	
	setFont:function(f, size)
	{
		this.rsFont=this.hoAdRunHeader.rhApp.fontBank.addFont(f);
		this.font=this.hoAdRunHeader.rhApp.fontBank.getFontFromHandle(this.rsFont);
		if ( size != null )
		{
		    this.hoImgWidth = size.right - size.left;
		    this.hoImgHeight = size.bottom - size.top;
			this.textSurface.resize(this.hoImgWidth, this.hoImgHeight);	
		}
		this.roc.rcChanged=true;		
	    this.computeNewDisplay();
	},
	
	getFontColor:function()
	{
		return this.rsTextColor;
	},
	
	setFontColor:function(rgb)
	{
		this.rsTextColor=rgb;
        this.computeNewDisplay();
	},

	addOwnerDrawSprite:function(xx, yy, layer, quickDisplay, shown, index)
	{
		if (this.bAddedToPlane==true)
			return;
			
		this.bAddedToPlane=true;
		this.bShown=shown;

		this.pLayer=this.hoAdRunHeader.rhFrame.layers[layer];
		if (quickDisplay)
			this.plane=this.pLayer.planeQuickDisplay;
		else
			this.plane=this.pLayer.planeSprites;

		if (index<0)
			this.plane.addChild(this);
		else
			this.plane.addChildIndex(this, index);
				
		this.computeNewDisplay();
	},
	
	delSprite:function()
	{
		if (this.bAddedToPlane==false)
			return -1;
		
		this.bAddedToPlane=false;
		var index=this.plane.getChildIndex(this);
		this.plane.removeChild(this);
		return index;
	},
	
	getChildIndex:function()
	{
		if (this.bAddedToPlane)
		{
			return this.plane.getChildIndex(this);
		}
		return -1;
	},
	
	getChildMaxIndex:function()
	{
		if (this.bAddedToPlane)
			return this.plane.numChildren;
		return -1;
	},
	
	setChildIndex:function(index)
	{
		if (this.bAddedToPlane)
			this.plane.setChildIndex(this, index);
	},
	
	showSprite:function()
	{
		if (this.bShown==false)
		{
			this.bShown=true;				
		}
	},
	
	hideSprite:function()
	{
		if (this.bShown==true)
		{
			this.bShown=false;
		}
	},

    txtChange:function(num)
    {
        if (num < -1)
            num = -1;		
        if (num >= this.rsMaxi)
            num = this.rsMaxi - 1;
        if (num == this.rsMini)
            return false;

        this.rsMini = num;

        if (num >= 0)
        {
            var txt= this.hoCommon.ocObject;
            this.txtSetString(txt.otTexts[this.rsMini].tsText);
        }
		this.computeNewDisplay();
		
        if ((this.ros.rsFlags & CRSpr.RSFLAG_HIDDEN) != 0)
            return false;
            
        return true;
    },
    
    txtSetString:function(s)
    {
        this.rsTextBuffer = s;
        this.computeNewDisplay();
    },
    
    computeNewDisplay:function()
    {
        var txt = this.hoCommon.ocObject;
        var flags = txt.otTexts[0].tsFlags;

        this.hoImgXSpot = 0;
        this.hoImgYSpot = 0;
        this.rect.left=0;
        this.rect.top=0;
        this.rect.right=this.hoImgWidth;
        this.rect.bottom=this.hoImgHeight;

        var s;
        if (this.rsMini >= 0)
            s = txt.otTexts[this.rsMini].tsText;
        else
        {
            s = this.rsTextBuffer;
            if (s == null)
                s = "";
        }
		
        var dtflags = (flags & (CServices.DT_LEFT | CServices.DT_CENTER | CServices.DT_RIGHT |
                CServices.DT_TOP | CServices.DT_BOTTOM | CServices.DT_VCENTER |
                CServices.DT_SINGLELINE));
      	this.textSurface.setText(s, dtflags, this.rect, this.font, this.rsTextColor);  
    },
    
	draw:function(context, xx, yy)
	{
		if (!this.bShown) return;
		var x=xx+this.hoX-this.hoAdRunHeader.rhWindowX+this.pLayer.x;
		var y=yy+this.hoY-this.hoAdRunHeader.rhWindowY+this.pLayer.y;
		this.textSurface.draw(context, x, y, this.ros.rsEffect, this.ros.rsEffectParam);
	}
});

// CQuestion object
// -------------------------------------------------------------
function CQuestion()
{
	this.rsBoxCx=0;
	this.rsBoxCy=0;
	this.rcA=null;
	this.currentDown=0;
    this.xMouse=0;
    this.yMouse=0;
    this.textSurfaces=new Array();
}
CQuestion.prototype=CServices.extend(new CObject(),
{
	init:function(ocPtr, cob)
	{
	},
    
    kill:function()
    {
    },

    handle:function()
	{
		this.hoAdRunHeader.pause();
        this.hoAdRunHeader.questionObjectOn = this;
		var layer=this.hoAdRunHeader.rhFrame.layers[this.hoAdRunHeader.rhFrame.nLayers-1];
		layer.planeSprites.addChild(this);     
		this.computeTexts();  
	},
    destroyObject:function()
    {
		var layer=this.hoAdRunHeader.rhFrame.layers[this.hoAdRunHeader.rhFrame.nLayers-1];
		layer.planeSprites.removeChild(this);
    },
    handleQuestion:function()
    {
    	var current;
        var xMouse = this.hoAdRunHeader.rhApp.mouseX;
        var yMouse = this.hoAdRunHeader.rhApp.mouseY;

    	if (this.currentDown==0)
    	{
    		if (this.hoAdRunHeader.rhApp.keyBuffer[CRunApp.VK_LBUTTON])
    		{
    			current=this.getQuestion(xMouse, yMouse);
    			if (current!=0)
    			{
    				this.currentDown=current;
    			}
    		}
    	}
    	else
    	{
    		if (!this.hoAdRunHeader.rhApp.keyBuffer[CRunApp.VK_LBUTTON])
    		{
				if (this.getQuestion(xMouse, yMouse)==this.currentDown)
				{
		            this.hoAdRunHeader.rhEvtProg.rhCurParam0 = this.currentDown;
	                this.hoAdRunHeader.rhEvtProg.handle_Event(this, (((-80 - 3) << 16) | 4));

                    var defTexts = this.hoCommon.ocObject;
                    var ptts = defTexts.otTexts[this.currentDown];
                    var bCorrect = (ptts.tsFlags & CDefText.TSF_CORRECT) != 0;
		            if (bCorrect)
		            {
                      	this.hoAdRunHeader.rhEvtProg.handle_Event(this, (((-80 - 1) << 16) | 4));
		            }
		            else
		            {
                      	this.hoAdRunHeader.rhEvtProg.handle_Event(this, (((-80 - 2) << 16) | 4));
		            }
		            this.destroyObject();
			        this.hoAdRunHeader.questionObjectOn=null;
			        this.hoAdRunHeader.resume();
			        this.hoAdRunHeader.f_KillObject(this.hoNumber, true);
			        return;
				}
    			this.currentDown=0;
    		}
    	}
    },
    
    getQuestion:function(xMouse, yMouse)
    {
    	var i;
        if (this.rcA != null)
        {
            for (i = 1; i < this.rcA.length; i++)
            {
                if (xMouse >= this.rcA[i].left && xMouse < this.rcA[i].right)
                {
                    if (yMouse > this.rcA[i].top && yMouse < this.rcA[i].bottom)
                    {
                        return i;
                    }
                }
            }
        }
    	return 0;
    },
    
	border3D:function(context, rc, state)
	{
		var color1, color2;
		
		if (state)
		{
			color1 = 0x808080;
			color2 = 0xFFFFFF;
		}
		else
		{
			color2 = 0x808080;
			color1 = 0xFFFFFF;
		}
		
        context.renderRect(rc.left, rc.top, rc.right - rc.left,
                           rc.bottom - rc.top, 0x000000, 1);
		
		var pt = new Array(3);
		var n;
		for (n = 0; n < 3; n++)
		{
			pt[n] = new CPoint();
		}
		pt[0].x = rc.right - 1;
		if (state == false)
			pt[0].x -= 1;
		pt[0].y = rc.top + 1;
		pt[1].y = rc.top + 1;
		pt[1].x = rc.left + 1;
		pt[2].x = rc.left + 1;
		pt[2].y = rc.bottom;
		if (state == false)
			pt[2].y -= 1;
        context.renderLine(pt[0].x, pt[0].y, pt[1].x, pt[1].y, color1, 1);
        context.renderLine(pt[1].x, pt[1].y, pt[2].x, pt[2].y, color1, 1);
		
		if (state == false)
			pt[0].x -= 1;
		pt[0].y += 1;
		pt[1].x += 1;
		pt[1].y += 1;
		pt[2].x += 1;
		if (state == false)
			pt[2].y -= 1;
        context.renderLine(pt[0].x, pt[0].y, pt[1].x, pt[1].y, color1, 1);
        context.renderLine(pt[1].x, pt[1].y, pt[2].x, pt[2].y, color1, 1);
		
		if (state == false)
		{
			pt[0].x += 2;
			pt[1].x = rc.right - 1;
			pt[1].y = rc.bottom - 1;
			pt[2].y = rc.bottom - 1;
			pt[2].x -= 1;
            context.renderLine(pt[0].x, pt[0].y, pt[1].x, pt[1].y, color2, 1);
            context.renderLine(pt[1].x, pt[1].y, pt[2].x, pt[2].y, color2, 1);
			
			pt[0].x -= 1;
			pt[0].y += 1;
			pt[1].x -= 1;
			pt[1].y -= 1;
			pt[2].x += 1;
			pt[2].y -= 1;
            context.renderLine(pt[0].x, pt[0].y, pt[1].x, pt[1].y, color2, 1);
            context.renderLine(pt[1].x, pt[1].y, pt[2].x, pt[2].y, color2, 1);
        }
	},	
	
	redraw_Answer:function(context, number, state)
	{
		var rc = new CRect();
		
		rc.copyRect(this.rcA[number]);
		this.border3D(context, this.rcA[number], state); 
		rc.left += 2;
		rc.top += 2;
		rc.right -= 4;
		rc.bottom -= 4;
		if (state)
		{
			rc.left += 2;
			rc.top += 2;
		}
		this.textSurfaces[number].draw(context, 
									(rc.left+rc.right)/2-this.textSurfaces[number].width/2,
									(rc.top+rc.bottom)/2-this.textSurfaces[number].height/2,
									0, 0);
	},
	
	computeTexts:function()
	{
	    this.measureTextSurface=new CTextSurface(this.hoAdRunHeader.rhApp, 8, 8);

        var defTexts = this.hoCommon.ocObject;
        var prh = this.hoAdRunHeader;

        var ptta = defTexts.otTexts[1];
        var colorA = ptta.tsColor;
        var flgRelief = (ptta.tsFlags & CDefText.TSF_RELIEF) != 0;
        var fontAnswers = prh.rhApp.fontBank.getFontFromHandle(ptta.tsFont);
        this.xa_margin = Math.floor((this.measureTextSurface.measureText("X", fontAnswers)* 3) / 2); 
        this.hta = 4;
        this.lgBox = 64;
        var i, tm;
        for (i = 1; i < defTexts.otTexts.length; i++)
        {
            ptta = defTexts.otTexts[i];
            if (ptta.tsText.length > 0)
            {
                tm=this.measureTextSurface.measureText(ptta.tsText, fontAnswers);
                this.lgBox = Math.max(this.lgBox, tm + this.xa_margin * 2 + 4);
                this.hta = Math.max(this.hta, Math.floor((fontAnswers.getHeight() * 3) / 2)); 
            }
        }
        this.hte = Math.max(Math.floor(this.hta / 4), 2);
        this.lgBox += this.xa_margin * 2 + 4;
        var rc=new CRect(); 
        for (i = 1; i < defTexts.otTexts.length; i++)
        {
            ptta = defTexts.otTexts[i];
            this.textSurfaces[i]=new CTextSurface(prh.rhApp, this.lgBox, this.hta);
            rc.right=this.lgBox;
            rc.bottom=this.hta;
            this.textSurfaces[i].manualDrawText(ptta.tsText, CServices.DT_CENTER|CServices.DT_VCENTER, rc, colorA, fontAnswers, false, flgRelief, 0xFFFFFF);
        }

        var ptts = defTexts.otTexts[0];
        flgRelief=(ptts.tsFlags & CDefText.TSF_RELIEF) != 0;
        var fontQuestion = prh.rhApp.fontBank.getFontFromHandle(ptts.tsFont);
        var xq_margin = Math.floor((this.measureTextSurface.measureText("X", fontQuestion) * 3) / 2); 
        tm=this.measureTextSurface.measureText(ptts.tsText, fontQuestion);
        this.htq = Math.floor(fontQuestion.getHeight() * 3 / 2); 
        this.lgBox = Math.max(this.lgBox, tm + xq_margin * 2 + 4);
        if (this.lgBox > prh.rhApp.gaCxWin)
            this.lgBox = prh.rhApp.gaCxWin;
        else if (this.lgBox > prh.rhFrame.leWidth)
            this.lgBox = prh.rhFrame.leWidth;
        rc.right=this.lgBox;
        rc.bottom=this.htq;
		this.textSurfaces[0]=new CTextSurface(prh.rhApp, this.lgBox, this.htq);
        this.textSurfaces[0].manualDrawText(ptts.tsText, CServices.DT_CENTER|CServices.DT_VCENTER, 
        	                                rc, colorA, fontQuestion, false, 
        	                                flgRelief, 0xFFFFFF);
	},	
	draw:function(context, xDraw, yDraw)
	{
        var defTexts = this.hoCommon.ocObject;
        var prh = this.hoAdRunHeader;
        var x = this.hoX - prh.rhWindowX;  
        var y = this.hoY - prh.rhWindowY;  

        var rcQ = new CRect();
        rcQ.left = x;
        rcQ.top = y;
        var boxCx = this.lgBox;
        var boxCy = this.htq + 1 + (this.hta + this.hte) * (defTexts.otTexts.length - 1) + this.hte + 4;
        rcQ.right = x + boxCx;
        rcQ.bottom = y + boxCy;

	    context.renderSolidColor(rcQ.left, rcQ.top, rcQ.right-rcQ.left, rcQ.bottom-rcQ.top, 0xC0C0C0, 0, 0);
        this.border3D(context, rcQ, false); 

        rcQ.left += 2;
        rcQ.top += 2;
        rcQ.right -= 2;
        rcQ.bottom = rcQ.top + this.htq;	
		this.textSurfaces[0].draw(context, 
								(rcQ.left+rcQ.right)/2-this.textSurfaces[0].width/2,
								(rcQ.top+rcQ.bottom)/2-this.textSurfaces[0].height/2,
								0, 0);
        rcQ.top = rcQ.bottom;
        context.renderLine(rcQ.left, rcQ.top, rcQ.right, rcQ.bottom, 0x808080, 1, 0, 0);
        rcQ.top += 1;
        rcQ.bottom += 1;        
        context.renderLine(rcQ.left, rcQ.top, rcQ.right, rcQ.bottom, 0xFFFFFF, 1, 0, 0);

        if (this.rcA == null)
        {
            this.rcA = Array(defTexts.otTexts.length);
            for (i = 1; i < defTexts.otTexts.length; i++)
            {
                this.rcA[i] = new CRect();
                this.rcA[i].left = x + 2 + this.xa_margin;
                this.rcA[i].right = x + this.lgBox - 2 - this.xa_margin;
                this.rcA[i].top = y + 2 + this.htq + 1 + this.hte + (this.hta + this.hte) * (i - 1);
                this.rcA[i].bottom = this.rcA[i].top + this.hta;
            }
        }
        for (i = 1; i < defTexts.otTexts.length; i++)
        {
            var bFlag = (this.currentDown == i);
            this.redraw_Answer(context, i, bFlag);
        }
    }	
});

// CExtension object
// -------------------------------------------------------------
function CExtension(type, rhPtr)
{
    this.ext= rhPtr.rhApp.extLoader.loadRunObject(type);
    this.noHandle=false;
    this.privateData= 0;
    this.objectCount=0;
    this.objectNumber=0;
    this.bAddedToPlane=false;
    this.bShown=true;
    this.nLayer=0;
    this.pLayer=null;
    this.plane=null;
}
CExtension.prototype=CServices.extend(new CObject(),
{
    init:function(ocPtr, cob)
    {
        this.ext.init(this);

		var file=this.hoAdRunHeader.rhApp.file.createFromFile(ocPtr.ocExtension);
		this.privateData = ocPtr.ocPrivate;
		this.ext.createRunObject(file, cob, ocPtr.ocVersion);
    },

	addSprite:function(xx, yy, image, layer, bShown)
	{
		this.nLayer=layer;
		this.pLayer=this.hoAdRunHeader.rhFrame.layers[layer];
	 	this.bShown=bShown;
		if (this.bAddedToPlane==true)
			return;
		this.bAddedToPlane=true;
		this.plane=this.pLayer.planeSprites;
		this.plane.addChild(this);		
	},

	addOwnerDrawSprite:function(xx, yy, layer, bQuickDisplay, bShown)
	{
		this.nLayer=layer;
		this.pLayer=this.hoAdRunHeader.rhFrame.layers[layer];
	 	this.bShown=bShown;

		if (this.bAddedToPlane==true)
			return;					
		this.bAddedToPlane=true;

		if (bQuickDisplay)
			this.plane=this.pLayer.planeQuickDisplay;
		else
			this.plane=this.pLayer.planeSprites;

		this.plane.addChild(this);
	},
		
	delSprite:function()
	{
		return this.plane.removeChild(this);
	},	

    handle:function()
    {
        if ((this.hoOEFlags & 0x0200) != 0)	
            this.ros.handle();
        else if ((this.hoOEFlags & 0x0030) == 0x0010 || (this.hoOEFlags & 0x0030) == 0x0030) 
            this.rom.move();
        else if ((this.hoOEFlags & 0x0030) == 0x0020)
            this.roa.animate();
        
        var ret= 0;
        if (this.noHandle == false)
            ret = this.ext.handleRunObject();

        if ((ret & CRunExtension.REFLAG_ONESHOT) != 0)
            this.noHandle = true;
        if (this.roc != null)
        {
            if (this.roc.rcChanged)
            {
                ret |= CRunExtension.REFLAG_DISPLAY;
                this.roc.rcChanged = false;
            }
        }
    },

	draw:function(context, xDraw, yDraw)
	{
		if (this.bShown)
		{
			this.ext.displayRunObject(context, xDraw, yDraw);
		}
	},
	
   	kill:function(bFast)
    {
        this.ext.destroyRunObject(bFast);
    },

    getCollisionMask:function(flags)
    {
        return this.ext.getRunObjectCollisionMask(flags);
    },

    condition:function(num, cnd)
    {
        return this.ext.condition(num, cnd);
    },

    action:function(num, act)
    {
        this.ext.action(num, act);
    },

    expression:function(num)
    {
        return this.ext.expression(num);
    },
    
	setFocus:function(bFlag)
	{
		this.ext.setFocus(bFlag);
	},
	
	showSprite:function()
	{
		this.bShown=true;
	},

	hideSprite:function()
	{
		this.bShown=false;			
	},

	setChildIndex:function(index)
	{
		this.ext.setChildIndex(index);
	},

	getChildIndex:function()
	{
		return this.plane.getChildIndex(this);
	},

	getChildMaxIndex:function()
	{
		return this.plane.children.length;
	},

	setChildIndex:function(index)
	{
		if (index>=this.plane.children.length)
			index=this.plane.children.length;
		if (index<0)
			index=0;
		this.plane.setChildIndex(this, index);
	},
		
	pauseRunObject:function()
	{
		this.ext.pauseRunObject();			
	},

	continueRunObject:function()
	{
		this.ext.continueRunObject();			
	},
	
    loadImageList:function(list)
    {
        this.hoAdRunHeader.rhApp.imageBank.loadImageList(list);
    },

    getImage:function(handle)
    {
        return this.hoAdRunHeader.rhApp.imageBank.getImageFromHandle(handle);
    },

    getApplication:function()
    {
        return this.hoAdRunHeader.rhApp;
    },

    getX:function()
    {
        return this.hoX;
    },

    getY:function()
    {
        return this.hoY;
    },

    getWidth:function()
    {
        return this.hoImgWidth;
    },

    getHeight:function()
    {
        return this.hoImgHeight;
    },

    setX:function(x)
    {
        if (this.rom != null)
        {
            this.rom.rmMovement.setXPosition(x);
        }
        else
        {
            this.hoX = x;
            if (this.roc != null)
            {
                this.roc.rcChanged = true;
                this.roc.rcCheckCollides = true;
            }
        }
    },

    setY:function(y)
    {
        if (this.rom != null)
        {
            this.rom.rmMovement.setYPosition(y);
        }
        else
        {
            this.hoY = y;
            if (this.roc != null)
            {
                this.roc.rcChanged = true;
                this.roc.rcCheckCollides = true;
            }
        }
    },

    setWidth:function(width)
    {
        this.hoImgWidth = width;
    },

    setHeight:function(height)
    {
        this.hoImgHeight = height;
    },
	setSize:function(width, height)
	{
        this.hoImgWidth = width;
        this.hoImgHeight = height;
	},
    reHandle:function()
    {
        this.noHandle = false;
    },

    generateEvent:function(code, param)
    {
        if (this.hoAdRunHeader.rh2PauseCompteur == 0)
        {
            var p0= this.hoAdRunHeader.rhEvtProg.rhCurParam0;
            this.hoAdRunHeader.rhEvtProg.rhCurParam0 = param;

            code = (-(code + CEventProgram.EVENTS_EXTBASE + 1) << 16);
            code |= (this.hoType & 0xFFFF);
            this.hoAdRunHeader.rhEvtProg.handle_Event(this, code);

            this.hoAdRunHeader.rhEvtProg.rhCurParam0 = p0;
        }
    },

    pushEvent:function(code, param)
    {
        if (this.hoAdRunHeader.rh2PauseCompteur == 0)
        {
            code = (-(code + CEventProgram.EVENTS_EXTBASE + 1) << 16);
            code |= (this.hoType & 0xFFFF);
            this.hoAdRunHeader.rhEvtProg.push_Event(1, code, param, this, this.hoOi);
        }
    },

    pause:function()
    {
        this.hoAdRunHeader.pause();
    },

    resume:function()
    {
        this.hoAdRunHeader.resume();
    },

    redraw:function()
    {
    },

    destroy:function()
    {
        this.hoAdRunHeader.destroy_Add(this.hoNumber);
    },

    setPosition:function(x, y)
    {
        if (this.rom != null)
        {
            this.rom.rmMovement.setXPosition(x);
            this.rom.rmMovement.setYPosition(y);
        }
        else
        {
            this.hoX = x;
            this.hoY = y;
            if (this.roc != null)
            {
                this.roc.rcChanged = true;
                this.roc.rcCheckCollides = true;
            }
        }
    },

    getExtUserData:function()
    {
        return this.privateData;
    },

    setExtUserData:function(data)
    {
        this.privateData = data;
    },

    addBackdrop:function(img, x, y, typeObst, nLayer)
    {
    	this.hoAdRunHeader.addBackdrop(img, x, y, nLayer, typeObst);
    },

    getEventCount:function()
    {
        return this.hoAdRunHeader.rh4EventCount;
    },

    getExpParam:function()
    {
        this.hoAdRunHeader.rh4CurToken++;	
        return this.hoAdRunHeader.getExpression();
    },

    getEventParam:function()
    {
        return this.hoAdRunHeader.rhEvtProg.rhCurParam0;
    },

    callMovement:function(hoPtr, action, param)
    {
        if ((hoPtr.hoOEFlags & CObjectCommon.OEFLAG_MOVEMENTS) != 0)
        {
            if (hoPtr.roc.rcMovementType == CMoveDef.MVTYPE_EXT)
            {
                var mvPtr= hoPtr.rom.rmMovement;
                return mvPtr.callMovement(action, param);
            }
        }
        return 0;
    },

    getFirstObject:function()
    {
        this.objectCount = 0;
        this.objectNumber = 0;
        return this.getNextObject();
    },

    getNextObject:function()
    {
        if (this.objectNumber < this.hoAdRunHeader.rhNObjects)
        {
            while (this.hoAdRunHeader.rhObjectList[this.objectCount] == null)
                this.objectCount++;
            var hoPtr= this.hoAdRunHeader.rhObjectList[this.objectCount];
            this.objectNumber++;
            this.objectCount++;
            return hoPtr;
        }
        return null;
    },

    getObjectFromFixed:function(fixed)
    {
        var count= 0;
        var number;
        for (number = 0; number < this.hoAdRunHeader.rhNObjects; number++)
        {
            while (this.hoAdRunHeader.rhObjectList[count] == null)
                count++;
            var hoPtr= this.hoAdRunHeader.rhObjectList[count];
            count++;
            var id= (hoPtr.hoCreationId << 16) | (hoPtr.hoNumber & 0xFFFF);
            if (id == fixed)
                return hoPtr;
        }
        return null;
    },

    openHFile:function(path)
    {
        return hoAdRunHeader.rhApp.openHFile(path);
    },
	
	closeHFile:function(path)
	{
		hoAdRunHeader.rhApp.closeHFile(path);
	}
});
