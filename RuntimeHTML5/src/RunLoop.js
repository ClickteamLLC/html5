
// CRun Object
// -----------------------------------------------------------------------
CRun.GAMEFLAGS_VBLINDEP=0x0002;
CRun.GAMEFLAGS_LIMITEDSCROLL=0x0004;
CRun.GAMEFLAGS_FIRSTLOOPFADEIN=0x0010;
CRun.GAMEFLAGS_LOADONCALL=0x0020;
CRun.GAMEFLAGS_REALGAME=0x0040;
CRun.GAMEFLAGS_PLAY=0x0080;
CRun.GAMEFLAGS_INITIALISING=0x0200;
CRun.DLF_DONTUPDATE=0x0002;
CRun.DLF_DRAWOBJECTS=0x0004;
CRun.DLF_RESTARTLEVEL=0x0008;
CRun.DLF_DONTUPDATECOLMASK=0x0010;
CRun.DLF_COLMASKCLIPPED=0x0020;
CRun.DLF_SKIPLAYER0=0x0040;
CRun.DLF_REDRAWLAYER=0x0080;
CRun.DLF_STARTLEVEL=0x0100;
CRun.GAME_XBORDER=480;
CRun.GAME_YBORDER=300;
CRun.COLMASK_XMARGIN=64;
CRun.COLMASK_YMARGIN=16;
CRun.WRAP_X=1;
CRun.WRAP_Y=2;
CRun.WRAP_XY=4;
CRun.RH3SCROLLING_SCROLL=0x0001;
CRun.RH3SCROLLING_REDRAWLAYERS=0x0002;
CRun.RH3SCROLLING_REDRAWALL=0x0004;
CRun.RH3SCROLLING_REDRAWTOTALCOLMASK=0x0008;
CRun.OBSTACLE_NONE=0;
CRun.OBSTACLE_SOLID=1;
CRun.OBSTACLE_PLATFORM=2;
CRun.OBSTACLE_LADDER=3;
CRun.OBSTACLE_TRANSPARENT=4;
CRun.COF_NOMOVEMENT=0x0001;
CRun.COF_HIDDEN=0x0002;
CRun.COF_FIRSTTEXT=0x0004;
CRun.MAX_FRAMERATE=10;
CRun.LOOPEXIT_NEXTLEVEL=1;
CRun.LOOPEXIT_PREVLEVEL=2;
CRun.LOOPEXIT_GOTOLEVEL=3;
CRun.LOOPEXIT_NEWGAME=4;
CRun.LOOPEXIT_PAUSEGAME=5;
CRun.LOOPEXIT_SAVEAPPLICATION=6;
CRun.LOOPEXIT_LOADAPPLICATION=7;
CRun.LOOPEXIT_SAVEFRAME=8;
CRun.LOOPEXIT_LOADFRAME=9;
CRun.LOOPEXIT_ENDGAME=-2;
CRun.LOOPEXIT_QUIT=100;
CRun.LOOPEXIT_RESTART=101;
CRun.BORDER_LEFT=1;
CRun.BORDER_RIGHT=2;
CRun.BORDER_TOP=4;
CRun.BORDER_BOTTOM=8;
CRun.BORDER_ALL=15;
CRun.MAX_INTERMEDIATERESULTS=128;
CRun.INTBAD=0x7FFFFFFF;

CRun.plMasks=
[
    0x00, 0x00, 0x00, 0x00,
    0xFF, 0x00, 0x00, 0x00,
    0xFF, 0xFF, 0x00, 0x00,
    0xFF, 0xFF, 0xFF, 0x00,
    0xFF, 0xFF, 0xFF, 0xFF
];
CRun.Table_InOut=
[
	0,						
	CRun.BORDER_LEFT,       
	CRun.BORDER_RIGHT,      
	0,						
	CRun.BORDER_TOP,            
	CRun.BORDER_TOP+CRun.BORDER_LEFT,
	CRun.BORDER_TOP+CRun.BORDER_RIGHT,
	0,
	CRun.BORDER_BOTTOM,                  
	CRun.BORDER_BOTTOM+CRun.BORDER_LEFT, 
	CRun.BORDER_BOTTOM+CRun.BORDER_RIGHT,
	0,
	0,
	0,
	0,
	0
];
CRun.bMoveChanged=false;

CRun.compareTo=function(pValue1, pValue2, comp)
{
    switch (comp)
    {
        case 0:	// COMPARE_EQ:
            return pValue1==pValue2;
        case 1:	// COMPARE_NE:
            return pValue1!=pValue2;
        case 2:	// COMPARE_LE:
            return pValue1<=pValue2;
        case 3:	// COMPARE_LT:
            return pValue1<pValue2;
        case 4:	// COMPARE_GE:
            return pValue1>=pValue2;
        case 5:	// COMPARE_GT:
            return pValue1>pValue2;
    }
    return false;
}

CRun.compareTer=function(value1, value2, comparaison)
{
    switch (comparaison)
    {
        case 0:	// COMPARE_EQ:
            return (value1 == value2);
        case 1:	// COMPARE_NE:
            return (value1 != value2);
        case 2:	// COMPARE_LE:
            return (value1 <= value2);
        case 3:	// COMPARE_LT:
            return (value1 < value2);
        case 4:	// COMPARE_GE:
            return (value1 >= value2);
        case 5:	// COMPARE_GT:
            return (value1 > value2);
    }
    return false;
}
    
function CRun(app)
{	
	this.rhApp=app;
	this.rhFrame=null;
    this.rhMaxOI=0;
    this.rhStopFlag=0;
    this.rhEvFlag=0;
    this.rhNPlayers=0;
    this.rhGameFlags=0;
    this.rhPlayer=0;
    this.rhQuit=0;
    this.rhQuitBis=0;
    this.rhReturn=0;
    this.rhQuitParam=0;
    this.rhNObjects=0;
    this.rhMaxObjects=0;
    this.rhOiList=null;
    this.rhEvtProg=null;
    this.rhLevelSx=0;
    this.rhLevelSy=0;
    this.rhWindowX=0;
    this.rhWindowY=0;
    this.rhVBLDeltaOld=0;
    this.rhVBLObjet=0;
    this.rhVBLOld=0;
    this.rhMT_VBLStep=0;
    this.rhMT_VBLCount=0;
    this.rhMT_MoveStep=0;
    this.rhLoopCount=0;
    this.rhTimer=0;
    this.rhTimerOld=0;
    this.rhTimerDelta=0;
    this.rhOiListPtr=0;
    this.rhObListNext=0;
    this.rhDestroyPos=0;
	this.rhMouseUsed=0;
    this.rh2OldPlayer=null;
	this.rh2NewPlayer=null;
	this.rh2InputMask=null;
	this.rh2MouseKeys=0;
	this.rh2CreationCount=0;
	this.rh2MouseX=0;
	this.rh2MouseY=0;
    this.rh2MouseSaveX=0;
	this.rh2MouseSaveY=0;
	this.rh2PauseCompteur=0;
	this.rh2PauseTimer=0;
	this.rh2PauseVbl=0;
	this.rh3DisplayX=0;
	this.rh3DisplayY=0;
	this.rh3WindowSx=0;
	this.rh3WindowSy=0;
	this.rh3CollisionCount=0; 
	this.rh3Scrolling=0;
    this.rh3XMinimum=0;
    this.rh3YMinimum=0;
    this.rh3XMaximum=0;
    this.rh3YMaximum=0;
    this.rh3XMinimumKill=0;
    this.rh3YMinimumKill=0;
    this.rh3XMaximumKill=0;
    this.rh3YMaximumKill=0;
    this.rh3Graine=0;
	this.rh4DemoMode=0;
//	this.rh4Demo=null;
	this.rh4PauseKey=0;
	this.rh4CurrentFastLoop=null;
	this.rh4EndOfPause=0;
	this.rh4MouseWheelDelta=0;
	this.rh4OnMouseWheel=0;
    this.rh4FastLoops=null;
	this.rh4ExpValue1=0;
	this.rh4ExpValue2=0;
    this.rh4KpxReturn=0; 
    this.rh4ObjectCurCreate=0;
    this.rh4ObjectAddCreate=0;
    this.rh4DoUpdate=0;
    this.rh4VBLDelta=0;	
    this.rh4LoopTheoric=0;
    this.rh4EventCount=0;
    this.rh4BackDrawRoutines=null;
    this.rh4WindowDeltaX=0;
    this.rh4WindowDeltaY=0;               
    this.rh4TimeOut=0;
    this.rh4TabCounter=0;
    this.rh4PosPile=0;
	this.rh4Results=null;
	this.rh4Operators=null;
	this.rh4OpeNull=null;
  	this.rh4CurToken=0;
	this.rh4Tokens=null;
	this.rh4FrameRateArray=null;
	this.rh4FrameRatePos=0;		
	this.rh4FrameRatePrevious=0; 
    this.rhDestroyList=null;
    this.rh4SaveFrame=0;
    this.rh4SaveFrameCount=0;
    this.rh4MvtTimerCoef=0;
	this.questionObjectOn=null;
	this.bOperande=false;
	this.rhWheelCount=0;
	this.rhObjectList=null;
	this.currentTabObject=null;
	this.buttonClickCount=-1;
	this.isColArray=new Array(2);
	this.flagFloat=false;
	this.fadeTimerDelta=0;
	this.rhJoystickMask=0xFF;
}
CRun.getObjectFont=function(hoPtr)
{
	var info=null;

	if (hoPtr.hoType>=COI.KPX_BASE)
	{
	    info=hoPtr.ext.getRunObjectFont();
	}
	else
	{
	    info=hoPtr.getFont();
	}
	if (info==null)
	{
	    info=new CFontInfo();
	}
	return info;
}
CRun.setObjectFont=function(hoPtr, pLf, pNewSize)
{
	if (hoPtr.hoType>=COI.KPX_BASE)
	{
	    hoPtr.ext.setRunObjectFont(pLf, pNewSize);
	}
	else
	{	    
	    hoPtr.setFont(pLf, pNewSize);
	}
}
CRun.getObjectTextColor=function(hoPtr)
{
	if (hoPtr.hoType>=COI.KPX_BASE)
	{
	    return hoPtr.ext.getRunObjectTextColor();
	}
	return hoPtr.getFontColor();
}
CRun.setObjectTextColor=function(hoPtr, rgb)
{
	if (hoPtr.hoType>=COI.KPX_BASE)
	{
	    hoPtr.ext.setRunObjectTextColor(rgb);
	}
	else
	{
	    hoPtr.setFontColor(rgb);
	}
}
CRun.objectShow=function(pHo)
{
	if (pHo.ros!=null)
	{
	    pHo.ros.obShow();
	    pHo.ros.rsFlags|=CRSpr.RSFLAG_VISIBLE;
	    pHo.ros.rsFlash=0;        
	}
}
CRun.objectHide=function(pHo)
{
	if (pHo.ros!=null)
	{
	    pHo.ros.obHide();
	    pHo.ros.rsFlags&=~CRSpr.RSFLAG_VISIBLE;
	    pHo.ros.rsFlash=0;        
	}
}
CRun.setXPosition=function(hoPtr, x)
{
	if (hoPtr.rom!=null)
	{
	    hoPtr.rom.rmMovement.setXPosition(x);
	}
	else
	{
	    if (hoPtr.hoX!=x)
	    {
			hoPtr.hoX=x;
			if (hoPtr.roc!=null)
			{
			    hoPtr.roc.rcChanged=true;
			    hoPtr.roc.rcCheckCollides=true;
			}
	    }
	}			    
}
CRun.setYPosition=function(hoPtr, y)
{
	if (hoPtr.rom!=null)
	{
	    hoPtr.rom.rmMovement.setYPosition(y);
	}
	else
	{
	    if (hoPtr.hoY!=y)
	    {
			hoPtr.hoY=y;
			if (hoPtr.roc!=null)
			{
			    hoPtr.roc.rcChanged=true;
			    hoPtr.roc.rcCheckCollides=true;
			}
	    }
	}			    
}
CRun.get_DirFromPente=function(x, y)
{
	if (x==0)
	{
	    if (y>=0) return 24;
	    return 8;
	}
	if (y==0)	
	{
	    if (x>=0) return 0;	
	    return 16;	
	}

	var dir;
	var flagX=false;
	var flagY=false;
	if (x<0)		
	{
	    flagX=true;
	    x=-x;
	}
	if (y<0)		
	{
	    flagY=true;
	    y=-y;
	}

	var d=(x*256)/y;
	var index;
	for (index=0; ; index+=2)
	{
	    if (d>=CMove.CosSurSin32[index]) 
		break;
	}		
	dir=CMove.CosSurSin32[index+1];

	if (flagY)
	{
	    dir=-dir+32;
	    dir&=31;
	}
	if (flagX)
	{
	    dir-=8;		
	    dir&=31;
	    dir=-dir;
	    dir&=31;
	    dir+=8;
	    dir&=31;
	}
	return dir;
}
    

CRun.prototype=
{
	setFrame:function(f)
	{
		this.rhFrame=f;
	},
    allocRunHeader:function()
    {
		this.rhObjectList=new Array(this.rhFrame.maxObjects);
        this.rhEvtProg=this.rhFrame.evtProg;
        
		this.rhMaxOI=0;
		var oi;
		for (oi=this.rhApp.OIList.getFirstOI(); oi!=null; oi=this.rhApp.OIList.getNextOI())
		{
	    	if ( oi.oiType>=COI.OBJ_SPR )
	    	{
				this.rhMaxOI++;
	    	}
		}

		if (this.rhFrame.m_wRandomSeed==-1)
		{
		    this.rh3Graine = this.rhApp.timer&0xFFFF;			
		}
		else
		{
		    this.rh3Graine=this.rhFrame.m_wRandomSeed;			
		}
	
		var no=Math.round(this.rhFrame.maxObjects/32+1);
		this.rhDestroyList=new Array(no);

		this.rh4FastLoops=new CArrayList();
		this.rh4CurrentFastLoop="";
	
		this.rhMaxObjects=this.rhFrame.maxObjects;

		this.rhNPlayers=this.rhEvtProg.nPlayers;
        this.rhWindowX=this.rhFrame.leX;
		this.rhWindowY=this.rhFrame.leY;
		this.rhLevelSx=this.rhFrame.leVirtualRect.right;
		if ( this.rhLevelSx==-1 )
	    	this.rhLevelSx=0x7FFFF000;	
		this.rhLevelSy=this.rhFrame.leVirtualRect.bottom;
		if ( this.rhLevelSy == -1 )
	    	this.rhLevelSy = 0x7FFFF000;	
		this.rhNObjects=0;
		this.rhStopFlag=0;
		this.rhQuit=0;
		this.rhQuitBis=0;
		this.rhGameFlags&=(CRun.GAMEFLAGS_PLAY);
		this.rhGameFlags|=CRun.GAMEFLAGS_LIMITEDSCROLL;
        this.rh4FrameRatePos=0;
        this.rh4FrameRatePrevious=0;
        this.rh4FrameRateArray=new Array(CRun.MAX_FRAMERATE);
		this.rh4BackDrawRoutines=null;
        this.rh4SaveFrame=0;
        this.rh4SaveFrameCount=-3;
        this.rhWheelCount=-1;
        
		this.rhGameFlags|=CRun.GAMEFLAGS_REALGAME;

		this.rh4Results=new Array(CRun.MAX_INTERMEDIATERESULTS);
		this.rh4Operators=new Array(CRun.MAX_INTERMEDIATERESULTS);
		this.rh4OpeNull=new EXP_ZERO();
		this.rh4OpeNull.code=0;

    	this.rh2OldPlayer=new Array(4);	
		this.rh2NewPlayer=new Array(4);	
		this.rh2InputMask=new Array(4);	
		this.rhPlayer=new Array(4);		
//		this.rhEvtProg.rh2CurrentClick = -1;
		this.rh4MvtTimerCoef=0;
		
		var n;
		for (n=0; n<CRun.MAX_FRAMERATE; n++)
			this.rh4FrameRateArray[n]=50;
		this.rhFrame.rhOK=true;
    },

    freeRunHeader:function()
    {
        this.rhFrame.rhOK=false;

        this.rhObjectList=null;
		this.rhOiList=null;
		this.rhDestroyList=null;
		this.rh4CurrentFastLoop=null;
		this.rh4FastLoops=null;
		this.rh4BackDrawRoutines=null;
	
		var n;
		for (n=0; n<CRun.MAX_INTERMEDIATERESULTS; n++)
		    this.rh4Results[n]=0;
		this.rh4OpeNull=null;	
    },
	
    initRunLoop:function(bFade)
    {
		this.allocRunHeader();

        this.rhApp.joystickOn=0;
    	if (this.rhApp.parentApp==null)
    	{
	        if(window.DeviceMotionEvent)
	        {   		
	            if (this.rhFrame.joystick == CRunFrame.JOYSTICK_EXT)
	            {
	                if (this.rhApp.joystick == null)
	                {
	                    this.rhApp.joystick = new CJoystick(this.rhApp);
	                    this.rhApp.joystick.loadImages();
	                }
	                this.rhApp.joystick.reset(0);
	                this.rhApp.startJoystick();
	            }
	            else if (this.rhFrame.joystick!=CRunFrame.JOYSTICK_NONE)
	            {
	                var flags = 0;
	                if ((this.rhFrame.html5Options & CRunFrame.IPHONEOPT_JOYSTICK_FIRE1) != 0)
	                {
	                    flags = CJoystick.JFLAG_FIRE1;
	                }
	                if ((this.rhFrame.html5Options & CRunFrame.IPHONEOPT_JOYSTICK_FIRE2) != 0)
	                {
	                    flags |= CJoystick.JFLAG_FIRE2;
	                }
	                if ((this.rhFrame.html5Options & CRunFrame.IPHONEOPT_JOYSTICK_LEFTHAND) != 0)
	                {
	                    flags |= CJoystick.JFLAG_LEFTHANDED;
	                }
	                if (this.rhFrame.joystick == CRunFrame.JOYSTICK_TOUCH)
	                {
	                    flags |= CJoystick.JFLAG_JOYSTICK;
	                }
	                if ((flags & (CJoystick.JFLAG_FIRE1 | CJoystick.JFLAG_FIRE2 | CJoystick.JFLAG_JOYSTICK)) != 0)
	                {
	                	this.rhApp.startJoystick(flags);
	                    this.rhApp.joystick.reset(flags);
	                }
	
	                // Accelerometer joystick
	                if (this.rhFrame.joystick == CRunFrame.JOYSTICK_ACCELEROMETER)
	                {
	                    this.rhApp.startAccJoystick();
	                }
	            }
	        }
        }
	    this.rhJoystickMask=0xFF;
	    	
		if (bFade) 
		    this.rhGameFlags|=CRun.GAMEFLAGS_FIRSTLOOPFADEIN;

		this.initAsmLoop();			

		this.resetFrameLayers(-1, false);
        
		this.prepareFrame();

		this.drawLevel();
		this.hideShowLayers();
		
        this.createFrameObjects(bFade);		
	
		this.loadGlobalObjectsData();

		this.rhEvtProg.prepareProgram();
		this.rhEvtProg.assemblePrograms(this);		

	    this.captureMouse();
		this.rhQuitParam = 0;
		this.f_InitLoop();
//TODO		rhEvtProg.HandleKeyRepeat();
    },

    doRunLoop:function()
    {
		if (this.rh2PauseCompteur>0)
		{		
	    	if (this.rhQuit==CRun.LOOPEXIT_PAUSEGAME)
	    	{
				if (this.rhApp.keyNew==true)
				{
					if (this.rh4PauseKey>=0)
					{
						if (this.rhApp.keyBuffer[this.rh4PauseKey])
						{
							this.resume();
							this.rhQuit=0;
				            this.rh4EndOfPause = this.rhLoopCount;	    
							this.rhEvtProg.handle_GlobalEvents((-8<<16)|0xFFFD);				
						}
					}
					else
					{
						if (this.rhApp.keyNew)
						{
							this.resume();
							this.rhQuit=0;
				            this.rh4EndOfPause = this.rhLoopCount;	    
							this.rhEvtProg.handle_GlobalEvents((-8<<16)|0xFFFD);				
						}
					}
				}
				this.rhApp.keyNew=false;	
	    	}
			if (this.questionObjectOn!=null)
			{
				this.questionObjectOn.handleQuestion();
			}
/*			if (rhHiscore!=null)
			{
				rhHiscore.ext.handleRunObject();
				return 0;
			}
*/			
			return 0;
		}	    	

		// Appel du jeu
		this.rhApp.appRunFlags |= CRunApp.ARF_INGAMELOOP;
		var quit=this.f_GameLoop();
		this.rhApp.appRunFlags &= ~CRunApp.ARF_INGAMELOOP;

        // Si fin de FADE IN, detruit les sprites
        if ((this.rhGameFlags & CRun.GAMEFLAGS_FIRSTLOOPFADEIN) != 0)
        {
            var date=new Date();
            this.fadeTimerDelta = date.getTime() - this.rhTimerOld;
            // TODO rhFrame.fadeVblDelta = rhApp.newGetCptVbl() - rhVBLOld;
            this.y_KillLevel(true);
            this.rhEvtProg.unBranchPrograms();
        }

		if (quit==CRun.LOOPEXIT_NEXTLEVEL || quit==CRun.LOOPEXIT_PREVLEVEL || quit==CRun.LOOPEXIT_GOTOLEVEL)
		{
	    	this.rhApp.transitionOldSurface=document.createElement("canvas");
	    	this.rhApp.transitionOldSurface.width=this.rhApp.gaCxWin;
	    	this.rhApp.transitionOldSurface.height=this.rhApp.gaCyWin;
			var renderer=new StandardRenderer(this.rhApp.transitionOldSurface);
			renderer.renderSolidColor(0, 0, this.rhApp.gaCxWin, this.rhApp.gaCyWin, this.rhApp.frameColor);			
			this.rhApp.mainSprite.draw(renderer, 0, 0);			
		}
		
		if ( quit != 0 ) 
		{
		    var frame=0;
		    switch (quit)
		    {
			case 5:	
			    this.pause();
				this.rhApp.keyNew=false;
			    quit=0;
			    break;

			case 101:
			    if (this.rhFrame.fade) 
					break;
			    this.f_StopSamples();
			    this.killFrameObjects();
			    this.y_KillLevel(false);
			    this.resetFrameLayers(-1, false);
			    this.rhEvtProg.unBranchPrograms();
				this.freeMouse();
			    this.freeRunHeader();			    

			    this.rhFrame.leX = this.rhFrame.leLastScrlX = this.rh3DisplayX=0;
			    this.rhFrame.leY = this.rhFrame.leLastScrlY = this.rh3DisplayY=0;
				this.rhApp.resetLayers();
				this.allocRunHeader();
			    this.initAsmLoop(); 
				this.resetFrameLayers(-1, false);
			    this.drawLevel();
			    this.prepareFrame(); 
			    this.createFrameObjects(false); 
			    this.loadGlobalObjectsData();
				this.rhEvtProg.prepareProgram();
			    this.rhEvtProg.assemblePrograms(this); 
			    this.f_InitLoop();
//				this.rhEvtProg.HandleKeyRepeat();
				this.captureMouse();
			    quit=0;
			    this.rhQuitParam = 0;
			    break;

			case 100:
			case -2:
			    this.rhEvtProg.handle_GlobalEvents(((-4<<16)|65533));	
				break;

	    	}
		}
		this.rhQuit=quit;
		return quit;
	},

    killRunLoop:function(bLeaveSamples)
    {
		var quitParam;

		// Filtre les codes internes
		if (this.rhQuit>100)
		{ 
		    this.rhQuit=CRun.LOOPEXIT_ENDGAME;
		}
		quitParam = this.rhQuitParam;
		this.saveGlobalObjectsData();
		this.killFrameObjects();
	
		this.y_KillLevel(bLeaveSamples);
		this.rhEvtProg.unBranchPrograms();
		this.freeRunHeader();
		this.freeMouse();
		this.resetFrameLayers(-1, true);
        this.rhApp.endJoystick();
		
		return (CServices.MAKELONG(this.rhQuit, quitParam));
    },
    initAsmLoop:function()
    {
    	var i;
		for (i=0; i<this.rhMaxObjects; i++)
		    this.rhObjectList[i]=null;
    },
    prepareFrame:function()
    {
        var oiPtr;
        var ocPtr;
        var n,type;

        this.rhGameFlags|=CRun.GAMEFLAGS_LOADONCALL;
		this.rhGameFlags|=CRun.GAMEFLAGS_INITIALISING;

    	this.rh2CreationCount=0;

    	var loPtr;
    	var count=0;
		this.rhOiList=new Array(this.rhMaxOI);
        for (oiPtr=this.rhApp.OIList.getFirstOI(); oiPtr!=null; oiPtr=this.rhApp.OIList.getNextOI())
        {
            type=oiPtr.oiType;
            if ( type>=COI.OBJ_SPR )
            {
                this.rhOiList[count]=new CObjInfo();
                this.rhOiList[count].copyData(oiPtr);
            
				this.rhOiList[count].oilHFII=-1;
				if (type==COI.OBJ_TEXT || type==COI.OBJ_QUEST)
				{
                    for (loPtr=this.rhFrame.LOList.first_LevObj(); loPtr!=null; loPtr=this.rhFrame.LOList.next_LevObj())
                    {
						if (loPtr.loOiHandle==this.rhOiList[count].oilOi)
						{
                            this.rhOiList[count].oilHFII=loPtr.loHandle;
                            break;
						}
            	    }
				}
            	count++;

	    		ocPtr = oiPtr.oiOC;
	    		if ((ocPtr.ocOEFlags&CObjectCommon.OEFLAG_MOVEMENTS)!=0 && ocPtr.ocMovements!=null) 
	    		{
                    for (n=0; n<ocPtr.ocMovements.nMovements; n++)
                    {
		    			var mvPtr=ocPtr.ocMovements.moveList[n];
		    			if (mvPtr.mvType==CMoveDef.MVTYPE_MOUSE)
		    			{
		                 	this.rhMouseUsed|=1<<(mvPtr.mvControl-1);
		    			}
	                }
	    		}
	   		}
        }

		var i;
        for (i=0; i<this.rhFrame.nLayers; i++)
		{
            this.rhFrame.layers[i].nZOrderMax = 1;
		}
		return 0;
    },
    
    createRemainingFrameObjects:function()
    {
        var error = 0;
        var num;
        var oiPtr;
        var ocPtr;
        var type;
        var n;
        var creatFlags;
        var loPtr;

        this.rhGameFlags &= ~CRun.GAMEFLAGS_FIRSTLOOPFADEIN;

        for (n = 0, loPtr=this.rhFrame.LOList.first_LevObj(); loPtr!=null; n++, loPtr = this.rhFrame.LOList.next_LevObj())
        {
            oiPtr = this.rhApp.OIList.getOIFromHandle(loPtr.loOiHandle);
            ocPtr = oiPtr.oiOC;
            type = oiPtr.oiType;

            if (type < COI.KPX_BASE)
            {
                continue;
            }
            if ((ocPtr.ocOEFlags & CObjectCommon.OEFLAG_RUNBEFOREFADEIN) != 0)
            {
                continue;
            }

            creatFlags = 0;

            // Objet pas dans le bon mode || cree au milieu du jeu-> SKIP
            if (loPtr.loParentType != CLO.PARENT_NONE)
            {
                continue;
            }

            // Objet iconise non texte -> SKIP
            if ((ocPtr.ocFlags2 & CObjectCommon.OCFLAGS2_VISIBLEATSTART) == 0)
            {
                if (type != COI.OBJ_TEXT)
                {
                    continue;
                }
                creatFlags |= CRun.COF_HIDDEN;
            }

            // Creation de l'objet                
            if ((ocPtr.ocOEFlags & CObjectCommon.OEFLAG_DONTCREATEATSTART) == 0)
            {
                this.f_CreateObject(loPtr.loHandle, loPtr.loOiHandle, 0x80000000, 0x80000000, -1, creatFlags, -1, -1);
            }
        }
        this.rhEvtProg.assemblePrograms(this);

        // Remet le timer
        var date=new Date();
        this.rhTimerOld = date.getTime() - this.fadeTimerDelta;
        // TODO rhVBLOld = (rhApp.newGetCptVbl() - rhFrame.fadeVblDelta);
    },
    
    createFrameObjects:function(fade)
    {
        var oiPtr;
        var ocPtr;
        var type;
        var n;
        var creatFlags;
        var loPtr;

        for (n=0, loPtr=this.rhFrame.LOList.first_LevObj(); loPtr!=null; n++, loPtr=this.rhFrame.LOList.next_LevObj())
        {
            oiPtr=this.rhApp.OIList.getOIFromHandle(loPtr.loOiHandle);
            ocPtr = oiPtr.oiOC;
            type=oiPtr.oiType;
		
            creatFlags=0;

            if ( loPtr.loParentType!=CLO.PARENT_NONE) 
                continue;

            if (type==COI.OBJ_TEXT) 
                creatFlags|=CRun.COF_FIRSTTEXT;

            if ( (ocPtr.ocFlags2 & CObjectCommon.OCFLAGS2_VISIBLEATSTART) == 0 )
            {
				if ( type==COI.OBJ_QUEST ) 
                    continue;
                creatFlags|=CRun.COF_HIDDEN;
            }
            if (fade)
            {
                if (type >= COI.KPX_BASE)
                {
                    if ((ocPtr.ocOEFlags & CObjectCommon.OEFLAG_RUNBEFOREFADEIN) == 0)
                    {
                        continue;
                    }
                }
            }
        
	    	if ((ocPtr.ocOEFlags&CObjectCommon.OEFLAG_DONTCREATEATSTART)==0)
	    	{
				this.f_CreateObject(loPtr.loHandle, loPtr.loOiHandle, 0x80000000, 0x80000000, -1, creatFlags, -1, -1);
	    	}
        }
        this.rhGameFlags&=~CRun.GAMEFLAGS_INITIALISING;
    },
    killFrameObjects:function()
    {
		var n;
		for (n=0; n<this.rhMaxObjects && this.rhNObjects!=0; n++)
		{
		    this.f_KillObject(n, true);
		}
    },

    y_KillLevel:function(bLeaveSamples)
    {
		if (!bLeaveSamples)
		{
		    if ( (this.rhApp.gaNewFlags & CRunApp.GANF_SAMPLESOVERFRAMES) == 0 )
		    {
				this.rhApp.soundPlayer.stopAllSounds();
		    }
		    else
		    {
		    	this.rhApp.soundPlayer.keepCurrentSounds();
		    }
		}
    },
    resetFrameLayers:function(nLayer, bDeleteFrame)
    {
		var i, nLayers;

		if ( nLayer == -1 )
		{
		    i = 0;
		    nLayers = this.rhFrame.nLayers;
		}
		else
		{
		    i = nLayer;
		    nLayers = (nLayer+1);
		}

		for (i=0; i<nLayers; i++)
		{
		    var pLayer=this.rhFrame.layers[i];
    		
			pLayer.reset();
			pLayer.deleteBackObjects();
			if (bDeleteFrame)
			{
				pLayer.deletePlanes();
			}
		}
    },

    captureMouse:function()
    {
		if (this.rhMouseUsed!=0)
		{
		    this.setCursorCount(-1);
		}
    },
    freeMouse:function()
    {
		if (this.rhMouseUsed!=0)
		{
		    this.setCursorCount(0);
		}
    },
    setCursorCount:function(count)
    {
		if (count>=0)
		    this.rhApp.showCursor(1);
		else
		    this.rhApp.showCursor(-1);
    },
    showMouse:function()
    {
		this.rhApp.showCursor(1);
    },
    hideMouse:function()
    {
    	this.rhApp.showCursor(-1);
    },

    saveGlobalObjectsData:function()
    {
		var hoPtr;
		var oilPtr;	
		var oil, obj;
		var oiPtr;
		var name;
		var o;

		for (oil=0; oil<this.rhOiList.length; oil++)
		{
		    oilPtr=this.rhOiList[oil];
	
		    o=oilPtr.oilObject;
		    if ( oilPtr.oilOi!=0x7FFF && o>=0 )
		    {
				oiPtr=this.rhApp.OIList.getOIFromHandle(oilPtr.oilOi);

				if ((oiPtr.oiFlags&COI.OIF_GLOBAL)!=0)
				{
				    hoPtr=this.rhObjectList[o];
				    
				    if (oilPtr.oilType!=COI.OBJ_TEXT && oilPtr.oilType!=COI.OBJ_COUNTER && hoPtr.rov==null)
						continue;

				    name=oilPtr.oilName+oilPtr.oilType.toString();

				    if (this.rhApp.adGO==null)
				    {
						this.rhApp.adGO=new CArrayList();
				    }

				    var flag= false;
				    var save=null;
				    for (obj=0; obj<this.rhApp.adGO.size(); obj++)
				    {
						save=this.rhApp.adGO.get(obj);
						if (name==save.name)
						{
					    	flag=true;
					    	break;
						}
				    }
				    if (flag==false)
				    {
						save=new CSaveGlobal();
						save.name=name;
						save.objects=new CArrayList();
						this.rhApp.adGO.add(save);
				    }
				    else
				    {
						save.objects.clear();
				    }

				    var n;
				    while(true)
				    {
						hoPtr=this.rhObjectList[o];
					
						if ( oilPtr.oilType == COI.OBJ_TEXT )
						{
						    var saveText=new CSaveGlobalText();
						    saveText.text=hoPtr.rsTextBuffer;
						    saveText.rsMini=hoPtr.rsMini;
						    save.objects.add(saveText);
						}
						else if ( oilPtr.oilType==COI.OBJ_COUNTER )
						{
						    var saveCounter=new CSaveGlobalCounter();
						    saveCounter.value=hoPtr.rsValue;
						    saveCounter.rsMini=hoPtr.rsMini;
						    saveCounter.rsMaxi=hoPtr.rsMaxi;
						    saveCounter.rsMiniDouble=hoPtr.rsMiniDouble;
						    saveCounter.rsMaxiDouble=hoPtr.rsMaxiDouble;
						    save.objects.add(saveCounter);
						}
						else
						{
						    var saveValues=new CSaveGlobalValues();
						    saveValues.flags=hoPtr.rov.rvValueFlags;
						    saveValues.values=new Array(CRVal.VALUES_NUMBEROF_ALTERABLE);
						    for (n=0; n<CRVal.VALUES_NUMBEROF_ALTERABLE; n++)
						    {
							    saveValues.values[n]=hoPtr.rov.rvValues[n];
						    }
						    saveValues.strings=new Array(CRVal.STRINGS_NUMBEROF_ALTERABLE);
						    for (n=0; n<CRVal.STRINGS_NUMBEROF_ALTERABLE; n++)
						    {
							    saveValues.strings[n]=hoPtr.rov.rvStrings[n];
						    }
						    save.objects.add(saveValues);
						}

						o=hoPtr.hoNumNext;
						if ( (o&0x80000000)!=0 ) 
						    break;
				    }
				}
			}
		}
    },

    loadGlobalObjectsData:function()
    {
		var hoPtr;
		var oilPtr;	
		var oil, obj;
		var oiPtr;
		var name;
		var o;
	
	 	if (this.rhApp.adGO==null) 
		    return;
	
		for (oil=0; oil<this.rhOiList.length; oil++)
		{
		    oilPtr=this.rhOiList[oil];
	
		    o=oilPtr.oilObject;
		    if ( oilPtr.oilOi!=0x7FFF && o>=0 )
		    {
				oiPtr=this.rhApp.OIList.getOIFromHandle(oilPtr.oilOi);

				if ((oiPtr.oiFlags&COI.OIF_GLOBAL)!=0)
				{
		    		name=oilPtr.oilName+oilPtr.oilType.toString();

				    for (obj=0; obj<this.rhApp.adGO.size(); obj++)
				    {
						var save=this.rhApp.adGO.get(obj);
						if (name==save.name)
						{
						    var count=0;
						    while(true)
						    {
								hoPtr=this.rhObjectList[o];
							
								if (oilPtr.oilType==COI.OBJ_TEXT)
								{
								    var saveText=save.objects.get(count);
								    hoPtr.rsTextBuffer=saveText.text;
								    hoPtr.rsMini=saveText.rsMini;
									hoPtr.roc.rcChanged=true;
									hoPtr.bTxtChanged=true;
								}
								else if ( oilPtr.oilType == COI.OBJ_COUNTER )
								{
								    var saveCounter=save.objects.get(count);
								    hoPtr.rsValue=saveCounter.value;
								    hoPtr.rsMini=saveCounter.rsMini;
								    hoPtr.rsMaxi=saveCounter.rsMaxi;
								    hoPtr.rsMiniDouble=saveCounter.rsMiniDouble;
								    hoPtr.rsMaxiDouble=saveCounter.rsMaxiDouble;
								    hoPtr.bCounterChanged=true;
								    hoPtr.roc.rcChanged=true;
								}
								else
								{
								    var saveValues=save.objects.get(count);
								    hoPtr.rov.rvValueFlags=saveValues.flags;
								    var n;
								    for (n=0; n<CRVal.VALUES_NUMBEROF_ALTERABLE; n++)
								    {
									    hoPtr.rov.rvValues[n]=saveValues.values[n];
								    }
								    for (n=0; n<CRVal.STRINGS_NUMBEROF_ALTERABLE; n++)
								    {
									    hoPtr.rov.rvStrings[n]=saveValues.strings[n];
								    }
								}
							
								o=hoPtr.hoNumNext;
								if ( (o&0x80000000)!=0 ) 
								    break;
							
								count++;
								if ( count>=save.objects.size() )
								    break;
						    }
						    break;
						}
		    		}
				}
	    	}
		}	
    },
    
    f_CreateObject:function(hlo, oi, coordX, coordY, initDir, flags, nLayer, numCreation)
    {
        while(true)
        {
            var cob=new CCreateObjectInfo();	

            var loPtr=null;
            if (hlo!=-1)
                loPtr=this.rhFrame.LOList.getLOFromHandle(hlo);

            var oiPtr=this.rhApp.OIList.getOIFromHandle(oi);
            var ocPtr=oiPtr.oiOC;

            if ((ocPtr.ocFlags2&CObjectCommon.OCFLAGS2_VISIBLEATSTART)==0)
            {
                flags|=CRun.COF_HIDDEN;
            }
        
            if (this.rhNObjects>=this.rhMaxObjects) 
                break;

            var hoPtr=null;
            var proto=new CObject();
            switch (oiPtr.oiType)
            {
                case 2:     
                    hoPtr=new CActive();
                    break;
                case 3:     
                    hoPtr=new CText();
                    break;
                case 4:     
                    hoPtr=new CQuestion();
                    break;
                case 5:     
                    hoPtr=new CScore();
                    break;
                case 6:     
                    hoPtr=new CLives();
                    break;
                case 7:     
                    hoPtr=new CCounter();
                    break;
                case 8:     
//	                    hoPtr=new CRtf();
                    break;
                case 9:     
                    hoPtr=new CCCA();
                    break;
                default:    
		    		hoPtr=new CExtension(oiPtr.oiType, this);
					if (hoPtr.ext==null)
					{
						hoPtr=null;
					}
                    break;
            }
            if (hoPtr==null)
                break;
			hoPtr.prototype=proto;
			
            if (numCreation<0)
            {
                for (numCreation=0; numCreation<this.rhMaxObjects; numCreation++)
                {
                    if (this.rhObjectList[numCreation]==null)
                    {
                        break;
                    }
                }
            }
            if (numCreation>=this.rhMaxObjects)
                return -1;
            this.rhObjectList[numCreation]=hoPtr;
            this.rhNObjects++;
            hoPtr.hoIdentifier=ocPtr.ocIdentifier;
            hoPtr.hoOEFlags=ocPtr.ocOEFlags;

            if (numCreation>this.rh4ObjectCurCreate)
                this.rh4ObjectAddCreate++;

            hoPtr.hoNumber=numCreation;
            this.rh2CreationCount++;
            if (this.rh2CreationCount==0)
                this.rh2CreationCount=1;
            hoPtr.hoCreationId=this.rh2CreationCount;
            hoPtr.hoOi=oi;		
            hoPtr.hoHFII=hlo;	
            hoPtr.hoType=oiPtr.oiType;
            this.oi_Insert(hoPtr);
            hoPtr.hoAdRunHeader=this;
            hoPtr.hoCallRoutine=true;

            hoPtr.hoCommon=ocPtr;

            var x=coordX;									// X
            if (x==0x80000000) 
                x=loPtr.loX;
            cob.cobX=x;
            hoPtr.hoX=x;

            var y=coordY;									// Y
            if (y==0x80000000) 
                y=loPtr.loY;
            cob.cobY=y;
            hoPtr.hoY=y;

            if ( loPtr != null )
            {
				if ( nLayer == -1 )
                {
                    nLayer = loPtr.loLayer;
                }
            }
            else
				nLayer = 0;
            cob.cobLayer = nLayer;
            hoPtr.hoLayer = nLayer;

            var pLayer= this.rhFrame.layers[nLayer];
            pLayer.nZOrderMax++;
            cob.cobZOrder = pLayer.nZOrderMax;

            cob.cobFlags=flags;
            cob.cobDir=initDir;
            cob.cobLevObj=loPtr;

            hoPtr.roc=null;                
            if ((hoPtr.hoOEFlags&(CObjectCommon.OEFLAG_ANIMATIONS|CObjectCommon.OEFLAG_MOVEMENTS|CObjectCommon.OEFLAG_SPRITES))!=0)
            {
                hoPtr.roc=new CRCom();
                hoPtr.roc.init();
            }

            hoPtr.rom=null;
            if ((hoPtr.hoOEFlags&CObjectCommon.OEFLAG_MOVEMENTS)!=0)
            {
                hoPtr.rom=new CRMvt();
                if ((cob.cobFlags&CRun.COF_NOMOVEMENT)==0)
                {
                    hoPtr.rom.init(0, hoPtr, ocPtr, cob, -1);
                }
            }

            hoPtr.roa=null;
            if ((hoPtr.hoOEFlags&CObjectCommon.OEFLAG_ANIMATIONS)!=0)
            {
                hoPtr.roa=new CRAni();
                hoPtr.roa.init(hoPtr);
            }

            hoPtr.ros=null;
            if ((hoPtr.hoOEFlags&CObjectCommon.OEFLAG_SPRITES)!=0)
            {
                hoPtr.ros=new CRSpr();
                hoPtr.ros.init1(hoPtr, ocPtr, cob);
            }

            hoPtr.rov=null;
            if ((hoPtr.hoOEFlags&CObjectCommon.OEFLAG_VALUES)!=0)
            {
                hoPtr.rov=new CRVal();
                hoPtr.rov.init(hoPtr, ocPtr, cob);
            }

		    hoPtr.init(ocPtr, cob);

            if ((hoPtr.hoOEFlags&CObjectCommon.OEFLAG_SPRITES)!=0)
            {
                hoPtr.ros.init2(true);
            }

	        return numCreation;			
        }
        return -1;
    },
    
    f_KillObject:function(nObject, bFast)
    {
		var hoPtr=this.rhObjectList[nObject];
        if (hoPtr==null)
            return;

		if (bFast==true && hoPtr.hoCreationId==0)
		{
            this.rhObjectList[nObject]=null;
            this.rhNObjects--;
            return;
		}

		this.killShootPtr(hoPtr);

        if (hoPtr.rom!=null)
            hoPtr.rom.kill(bFast);
		if (hoPtr.rov!=null)
            hoPtr.rov.kill(bFast);
        if (hoPtr.ros!=null)
            hoPtr.ros.kill(bFast);
        if (hoPtr.roc!=null)
            hoPtr.roc.kill(bFast);
        
		hoPtr.kill(bFast);

		this.oi_Delete(hoPtr);

        this.rhObjectList[nObject]=null;

        this.rhNObjects--;
    },
    
    destroy_Add:function(hoNumber)
    {
    	var pos=Math.floor(hoNumber/32);
    	var bit=1<<(hoNumber&31);
    	this.rhDestroyList[pos]|=bit;
		this.rhDestroyPos++;
    },

    destroy_List:function()
    {
		if ( this.rhDestroyPos == 0 ) 
            return;

        var nob=0;
        var dw;
        var count;
        while(nob<this.rhMaxObjects)
        {
            dw=this.rhDestroyList[nob/32];
            if (dw!=0)
            {
                for (count=0; dw!=0 && count<32; count++)
                {
                    if ((dw&1)!=0)
                    {
						var pHo= this.rhObjectList[nob+count];
						if ( pHo != null )
						{
						    if ( pHo.hoOiList.oilNObjects == 1 )
						    {	
						    	this.rhEvtProg.handle_Event(pHo, (pHo.hoType | (-33<<16)));	    
						    }
						}
						this.f_KillObject(nob+count, false);
                        this.rhDestroyPos--;
                    }
                    dw=dw>>1;
                }
				this.rhDestroyList[nob/32]=0;
				if (this.rhDestroyPos==0)
				{
		    		return;
			  	}
        	}
        	nob+=32;
    	}
	},
    
    killShootPtr:function(hoSource)
    {
		var count=0;
		var nObject;
		var hoPtr;	
		for (nObject=0; nObject<this.rhNObjects; nObject++)
		{
		    while(this.rhObjectList[count]==null)
				count++;
		    hoPtr=this.rhObjectList[count];
		    count++;
	
		    if (hoPtr.rom!=null)
		    {
				if (hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_BULLET)
				{
				    var mBullet=hoPtr.rom.rmMovement;
				    if (mBullet.MBul_ShootObject==hoSource && mBullet.MBul_Wait==true)
				    {
						mBullet.startBullet();
				    }
				}
		    }
		}
    },
    
    oi_Insert:function(pHo)
    {
		var oi = pHo.hoOi;

        var num;
        for (num=0; num<this.rhMaxOI; num++)
        {
            if (this.rhOiList[num].oilOi==oi)
            {
                break;
            }
        }
        var poil=this.rhOiList[num];
        
		if ( (poil.oilObject & 0x80000000) != 0 )
		{
            poil.oilObject = pHo.hoNumber;
            pHo.hoNumPrev = (num | 0x80000000);
            pHo.hoNumNext = 0x80000000;
		}
		else
		{
            var pHo2= this.rhObjectList[poil.oilObject];
            pHo.hoNumPrev = pHo2.hoNumPrev;
            pHo2.hoNumPrev = pHo.hoNumber;
            pHo.hoNumNext = pHo2.hoNumber;
            poil.oilObject = pHo.hoNumber;
		}

		pHo.hoEvents = poil.oilEvents;				
		pHo.hoOiList = poil;						
		pHo.hoLimitFlags = poil.oilLimitFlags;
		if ( pHo.hoHFII == -1 )				
            pHo.hoHFII = poil.oilHFII;
		else
		{
            if ( poil.oilHFII == -1 )
            	poil.oilHFII = pHo.hoHFII;	
		}
		poil.oilNObjects += 1;				
    },
    
    oi_Delete:function(pHo)
    {
		var poil= pHo.hoOiList;
		poil.oilNObjects -= 1;

		var pHo2;
		if ( (pHo.hoNumPrev&0x80000000)==0 )
		{
            pHo2= this.rhObjectList[pHo.hoNumPrev];
            if ( (pHo.hoNumNext&0x80000000)==0 )
            {
                var pHo3= this.rhObjectList[pHo.hoNumNext];
                if ( pHo2 != null )
                    pHo2.hoNumNext = pHo.hoNumNext;
                if ( pHo3 != null )
                    pHo3.hoNumPrev = pHo.hoNumPrev;
            }
            else
            {
                if ( pHo2 != null )
                    pHo2.hoNumNext = 0x80000000;
            }
		 }
		 else
		 {
            if ( (pHo.hoNumNext&0x80000000)==0 )
            {
                pHo2= this.rhObjectList[pHo.hoNumNext];
                if ( pHo2 != null )
                {
                    pHo2.hoNumPrev = pHo.hoNumPrev;
                    poil.oilObject = pHo2.hoNumber;
                }
            }
            else
            {
                poil.oilObject = 0x80000000;
            }
		}
	},

    pause:function(bKeepSounds)
    {
		if (this.rh2PauseCompteur==0)
		{
			this.rh2PauseCompteur=1;
			
		    this.rh2PauseTimer=this.rhApp.timer;

		    var count=0;
		    var no;
		    for (no=0; no<this.rhNObjects; no++)
		    {
				while (this.rhObjectList[count]==null)
			    	count++;
				var hoPtr=this.rhObjectList[count];
				count++;
				if (hoPtr.hoType>=COI.KPX_BASE)
				{
			    	hoPtr.ext.pauseRunObject();
				}
		    }
			
			if (bKeepSounds)
				this.rhApp.soundPlayer.pause();
		   
// TODO		   Mouse.show();		   
//		   	this.rhApp.keyNew=false;
	 	}
	},
    
    resume:function()
    {
		if (this.rh2PauseCompteur!=0)
		{
		    this.rh2PauseCompteur=0;
	    	this.captureMouse();
	    	
			var count=0;
			var no;
			for (no=0; no<this.rhNObjects; no++)
			{
			    while (this.rhObjectList[count]==null)
					count++;
			    var hoPtr=this.rhObjectList[count];
			    count++;
			    if (hoPtr.hoType>=COI.KPX_BASE)
			    {
					hoPtr.ext.continueRunObject();
			    }
			}

			this.rhApp.soundPlayer.resume();
                
// TODO     this.rhApp.flushKeyboard();
                
			var tick=this.rhApp.timer;
			tick-=this.rh2PauseTimer;
			this.rhTimerOld+=tick;	
			this.rh4PauseKey=0;
		}
    },

    f_StopSamples:function()
    {
		this.rhApp.soundPlayer.stopAllSounds();
    },

/* TODO    
    public function sendKey(keyCode, bState:Boolean):void
    {
		var count=0;
		var no;
		for (no=0; no<rhNObjects; no++)
		{
		    while (rhObjectList[count]==null)
				count++;
		    var hoPtr:CObject=rhObjectList[count];
		    count++;
		    if (hoPtr is CCCA)
		    {
				var cca:CCCA=CCCA(hoPtr);
				cca.sendKey(keyCode, bState);
		    }
		}	
    }
*/    

    find_HeaderObject:function(hlo)
    {
        var count=0;
        var nObjects;
        for (nObjects=0; nObjects<this.rhNObjects; nObjects++)
		{
            while(this.rhObjectList[count]==null)
                count++;
            if (hlo==this.rhObjectList[count].hoHFII)
                return rhObjectList[count];
            count++;	
		}
		return null;
    },
    
    f_UpdateWindowPos:function(newX, newY)
    {
		var pLayer;

		var noMove=0;
		this.rh4WindowDeltaX=newX-this.rhWindowX;
		if (this.rh4WindowDeltaX!=0)
		    noMove++;
		this.rh4WindowDeltaY=newY-this.rhWindowY;
		if (this.rh4WindowDeltaY!=0)
		    noMove++;

		if ( noMove == 0 )
		{
			var i;
		    for (i=0; i<this.rhFrame.nLayers; i++)
		    {
				pLayer= this.rhFrame.layers[i];
				if ( pLayer.dx != 0 || pLayer.dy != 0 )
				{ 
				    noMove++; 
				    break; 
				}
		    }
		}

		var nOldX = this.rhWindowX;
		var nOldY = this.rhWindowY;
		var nNewX = newX;
		var nNewY = newY;
		var nDeltaX = this.rh4WindowDeltaX;
		var nDeltaY = this.rh4WindowDeltaY;

		this.rhWindowX = newX;								
		this.rh3XMinimum = newX - CRun.COLMASK_XMARGIN;
		if ( this.rh3XMinimum < 0 )
		    this.rh3XMinimum = this.rh3XMinimumKill;

		this.rhWindowY = newY;								
		this.rh3YMinimum = newY - CRun.COLMASK_YMARGIN;
		if ( this.rh3YMinimum < 0 )
			this.rh3YMinimum = this.rh3YMinimumKill;

		this.rh3XMaximum = newX + this.rh3WindowSx + CRun.COLMASK_XMARGIN;	
		if ( this.rh3XMaximum > this.rhLevelSx )
		    this.rh3XMaximum = this.rh3XMaximumKill;

		this.rh3YMaximum = newY + this.rh3WindowSy + CRun.COLMASK_YMARGIN;
		if ( this.rh3YMaximum > this.rhLevelSy )
		    this.rh3YMaximum = this.rh3YMaximumKill;
	
		var count=0;
		var nObjects
		for (nObjects=0; nObjects<this.rhNObjects; nObjects++)
		{
		    while(this.rhObjectList[count]==null)
				count++;
		    var pHo=this.rhObjectList[count];
			count++;
	    
		    if (noMove!=0)
		    {
				if ((pHo.hoOEFlags&CObjectCommon.OEFLAG_SCROLLINGINDEPENDANT)!=0)
				{
				    var x=nDeltaX;
				    var y=nDeltaY;
		
				    if (pHo.rom==null)
				    {
						pHo.hoX+=x;
						pHo.hoY+=y;
				    }
				    else
				    {
						x+=pHo.hoX;
						y+=pHo.hoY;
						pHo.rom.rmMovement.setXPosition(x);
						pHo.rom.rmMovement.setYPosition(y);
				    }
				}
				else
				{
				    var nLayer = pHo.hoLayer;
				    if ( nLayer < this.rhFrame.nLayers )
				    {
						var oldLayerDx = nOldX;
						var oldLayerDy = nOldY;
						var newLayerDx = nNewX;
						var newLayerDy = nNewY;

						pLayer=this.rhFrame.layers[nLayer];
						if ( (pLayer.dwOptions & CLayer.FLOPT_XCOEF) != 0 )
						{
						    oldLayerDx = pLayer.xCoef * oldLayerDx;
						    newLayerDx = pLayer.xCoef * newLayerDx;
						}
						if ( (pLayer.dwOptions & CLayer.FLOPT_YCOEF) != 0 )
						{
						    oldLayerDy = pLayer.yCoef * oldLayerDy;
						    newLayerDy = pLayer.yCoef * newLayerDy;
						}

						// Equivalent
						var nX = (pHo.hoX + oldLayerDx) - newLayerDx + nDeltaX - pLayer.dx;
						var nY = (pHo.hoY + oldLayerDy) - newLayerDy + nDeltaY - pLayer.dy;
			
						if ((pHo.hoOEFlags&CObjectCommon.OEFLAG_MOVEMENTS)==0)
						{
						    pHo.hoX = nX;
						    pHo.hoY = nY;
						}
						else
						{
						    pHo.rom.rmMovement.setXPosition(nX);
						    pHo.rom.rmMovement.setYPosition(nY);
						}
		    		}
				}
	    	}
		}		
    },

    y_GetLadderAt:function(nLayer, x, y)
    {
    	x-=this.rhWindowX;
    	y-=this.rhWindowY;
    	
    	var nl;
    	var nLayers;
		if ( nLayer == -1 )
		{
		    nl = 0;
		    nLayers = this.rhFrame.nLayers;
		}
		else
		{
		    nl = nLayer;
		    nLayers = (nLayer+1);
		}
		for (; nl<nLayers; nl++)
		{
		    var pLayer=this.rhFrame.layers[nl];
		    var rc=pLayer.getLadderAt(x, y);
		    if (rc!=null)
		    {
		    	return rc;			    	
		    }
		}
		return null;
    },
    
    f_InitLoop:function()
    {
		var tick=this.rhApp.timer;
		this.rhTimerOld=tick;
		this.rhTimer=0;
		
		this.rhLoopCount=0;
		this.rh4LoopTheoric=0;
	//	rh2PushedEvents=0;

		this.rhQuit=0;	
		this.rhQuitBis=0;
		this.rhDestroyPos=0;
	
		var n;
		for (n=0; n<(this.rhMaxObjects+31)/32; n++)	
		    this.rhDestroyList[n]=0;

		this.rh3WindowSx=this.rhFrame.leEditWinWidth;
		this.rh3WindowSy=this.rhFrame.leEditWinHeight;
	
		this.rh3XMinimumKill=-CRun.GAME_XBORDER;
		this.rh3YMinimumKill=-CRun.GAME_YBORDER;
		this.rh3XMaximumKill=this.rhLevelSx+CRun.GAME_XBORDER;
		this.rh3YMaximumKill=this.rhLevelSy+CRun.GAME_YBORDER;

		var dx=this.rhWindowX;
		this.rh3DisplayX=dx;
		dx-=CRun.COLMASK_XMARGIN;
		if (dx<0)
		    dx=this.rh3XMinimumKill;
		this.rh3XMinimum=dx;

		var dy=this.rhWindowY;	
		this.rh3DisplayY=dy;
		dy-=CRun.COLMASK_YMARGIN;
		if (dy<0)
		    dy=this.rh3YMinimumKill;
		this.rh3YMinimum=dy;

		var wx=this.rhWindowX;
		wx+=this.rh3WindowSx+CRun.COLMASK_XMARGIN;
		if (wx>this.rhLevelSx)
		    wx=this.rh3XMaximumKill;
		this.rh3XMaximum=wx;

		var wy=this.rhWindowY;	
		wy+=this.rh3WindowSy+CRun.COLMASK_YMARGIN;
		if (wy>this.rhLevelSy)
		    wy=this.rh3YMaximumKill;
		this.rh3YMaximum=wy;

		this.rh3Scrolling=0;
		this.rh4DoUpdate=0;
		this.rh4EventCount=0;	
		this.rh4TimeOut=0;
			
		this.rh2PauseCompteur=0;

        this.rh4FakeKey=0;
        for (n=0; n<4; n++)
        {
            this.rhPlayer[n]=0;
            this.rh2OldPlayer[n]=0;
            this.rh2InputMask[n]=0xFF;
        }
		this.rh2MouseKeys=0;

		this.rhEvtProg.rh2ActionEndRoutine=false;
		this.rh4EndOfPause=-1;
		this.rh4OnMouseWheel=-1;
		this.rh4LoadCount=-1;
		this.rhEvtProg.rh4CheckDoneInstart=false;
		this.rh4PauseKey=0;
    
// TODO rh4DemoMode=CDemoRecord.DEMONOTHING;
//      rh4Demo=null;
	
		for (n=0; n<CRun.MAX_FRAMERATE; n++)
		    this.rh4FrameRateArray[n]=20;
		this.rh4FrameRatePos=0;
    },
    
    f_GameLoop:function()
	{
        this.rhApp.soundPlayer.checkSounds();

    	var timerBase=this.rhApp.timer;
    	var delta = timerBase-this.rhTimerOld;
		var oldtimer= this.rhTimer;
		this.rhTimer = delta;
		delta -= oldtimer;
		this.rhTimerDelta = delta;
		this.rh4TimeOut += delta;
		this.rhLoopCount += 1;
        this.rh4MvtTimerCoef=(this.rhTimerDelta*this.rhFrame.m_dwMvtTimerBase)/1000.0;
    
		this.rh4FrameRateArray[this.rh4FrameRatePos]=delta;
		this.rh4FrameRatePos++;
		if (this.rh4FrameRatePos>=CRun.MAX_FRAMERATE)
            this.rh4FrameRatePos=0;

        var n;
        for (n=0; n<4; n++)
        {
            this.rh2OldPlayer[n] = this.rhPlayer[n];
        }
        this.joyTest();
        if (this.rhApp.joystickOn==1)
            this.rhPlayer[0] = this.rhApp.joystick.getJoystick()&this.rhJoystickMask;
        else if (this.rhApp.joystickOn==2)
            this.rhPlayer[0] = this.rhApp.getJoystick()&this.rhJoystickMask;
    
		if ( this.rhMouseUsed!=0 )
		{
		    this.getMouseCoords();
    
            this.rh2MouseKeys = 0;

        	if ( this.rhApp.keyBuffer[CRunApp.VK_LBUTTON] )
				this.rh2MouseKeys |= 0x10;				//00010000B;

           	if ( this.rhApp.keyBuffer[CRunApp.VK_RBUTTON] )
				this.rh2MouseKeys |= 0x20;				//00100000B;
				
            var mouseUsed = this.rhMouseUsed;
            for (n=0; n<this.rhNPlayers; n++)
            {
				if ((this.mouseUsed&1)!=0)
				{
				    var key=(this.rhPlayer[n]&0xCF);		//11001111B;
				    key|=this.rh2MouseKeys;
				    this.rhPlayer[n]=key;
				}
				mouseUsed >>= 1;
        	}
		}
		else
		{
            this.getMouseCoords();
		}
	
        var b;
        for (n=0; n<4; n++)
        {
            b=(this.rhPlayer[n]&CRun.plMasks[this.rhNPlayers*4+n]);
            b&=this.rh2InputMask[n];
            this.rhPlayer[n]=b;
            b^=this.rh2OldPlayer[n];
            this.rh2NewPlayer[n]=b;
            if (b!=0)
            {
				b&=this.rhPlayer[n];
				if ((b&0xF0)!=0)
				{
		            this.rhEvtProg.rhCurOi=n;
                    b=this.rh2NewPlayer[n];
                    if ((b&0xF0)!=0)
                    {
	                    this.rhEvtProg.rhCurParam0=b;
                        this.rhEvtProg.handle_GlobalEvents(((-4<<16)|0xFFF9));	// CNDL_JOYPRESSED);
                    }
                    if ((b&0x0F)!=0)
                    {
                        this.rhEvtProg.rhCurParam0=b;
                        this.rhEvtProg.handle_GlobalEvents(((-4<<16)|0xFFF9));	// CNDL_JOYPRESSED);
                    }
				}
				else
				{
					 var num=this.rhEvtProg.listPointers[this.rhEvtProg.rhEvents[-COI.OBJ_PLAYER]+4];		// -NUM_JOYPRESSEZD
					 if ( num!=0 )
					 {
	                     this.rhEvtProg.rhCurParam0=b;
			             this.rhEvtProg.computeEventList(num, null);
					 }
				}
	     	}
        }
    		
		if ( this.rhNObjects != 0 )	
		{
            var cptObject = this.rhNObjects;
            var count=0;
            do 
            {
                this.rh4ObjectAddCreate = 0;
                while(this.rhObjectList[count]==null)
                    count++;
                var pObject= this.rhObjectList[count];

                pObject.hoPrevNoRepeat = pObject.hoBaseNoRepeat;	
                pObject.hoBaseNoRepeat = null;		
                if (pObject.hoCallRoutine)
                {
                    this.rh4ObjectCurCreate = count;
                    pObject.handle();
                }
                cptObject += this.rh4ObjectAddCreate;
                count++;
                cptObject--;
            } while (cptObject != 0);
		}
		this.rh3CollisionCount++; 

		this.rhEvtProg.compute_TimerEvents();	
		if ( this.rhEvtProg.rhEventAlways )				
		{
	        if ( (this.rhGameFlags&CRun.GAMEFLAGS_FIRSTLOOPFADEIN)==0 )
	             this.rhEvtProg.computeEventList(0, null);
		}
		this.rhEvtProg.handle_PushedEvents();

		this.destroy_List();
		this.doScroll();		
//		this.modif_ChangedObjects();

		this.rhEvtProg.rh2CurrentClick = -1;
		this.rh4EventCount++;
		this.rh4FakeKey = 0;

		if ( this.rhQuit == 0 )
		{
            return this.rhQuitBis;
  		}

		if ( this.rhQuit == CRun.LOOPEXIT_NEXTLEVEL ||
	            this.rhQuit == CRun.LOOPEXIT_PREVLEVEL ||
	            this.rhQuit == CRun.LOOPEXIT_ENDGAME ||
	            this.rhQuit == CRun.LOOPEXIT_GOTOLEVEL ||
                this.rhQuit == CRun.LOOPEXIT_QUIT ||
                this.rhQuit == CRun.LOOPEXIT_NEWGAME)
		{
			this.rhEvtProg.handle_GlobalEvents((-2<<16)|0xFFFD);
		}
		return this.rhQuit;
	},

/*    modif_ChangedObjects:function()
    {
        var count=0;
        var no;
        for (no=0; no<this.rhNObjects; no++)		// Des objets à voir?
		{
            while(this.rhObjectList[count]==null)
                count++;
            var pHo=this.rhObjectList[count];
            count++;

            if ( (pHo.hoOEFlags & (CObjectCommon.OEFLAG_ANIMATIONS|CObjectCommon.OEFLAG_MOVEMENTS|CObjectCommon.OEFLAG_SPRITES)) != 0 )
            {
                if ( pHo.roc.rcChanged )
                {
                    pHo.roc.rcChanged=false;
                }
            }
		}
    },
*/    
    joyTest:function()
    {
		var i;
	
		for (i=0; i<4; i++)
            this.rhPlayer[i] = 0;

//		var ctrlType=this.rhApp.getCtrlType();
		var ctrlKeys=this.rhApp.getCtrlKeys();
	
		for (i=0; i<4; i++)
		{		
        	var k;
            for (k=0; k<CRunApp.MAX_KEY; k++)
            {
				if (this.rhApp.keyBuffer[ctrlKeys[i*CRunApp.MAX_KEY+k]])
                	this.rhPlayer[i]|=1<<k;
            }
		}
   },

    getMouseCoords:function()
    {
        this.rh2MouseX=this.rhApp.mouseX+this.rhWindowX;
        this.rh2MouseY=this.rhApp.mouseY+this.rhWindowY;
    },
        
    newHandle_Collisions:function(pHo)
    {
    	pHo.rom.rmMoveFlag=false;
		CRun.bMoveChanged=false;
		pHo.rom.rmEventFlags = 0;

		var cadran, cadran1, cadran2;
		var chgDir;
		if ( (pHo.hoLimitFlags & CObjInfo.OILIMITFLAGS_QUICKBORDER) != 0 )
		{
            cadran1= this.quadran_In(pHo.roc.rcOldX1, pHo.roc.rcOldY1, pHo.roc.rcOldX2, pHo.roc.rcOldY2);
            if ( cadran1 != 0 )	
            {
                cadran2= this.quadran_In(pHo.hoX - pHo.hoImgXSpot, pHo.hoY - pHo.hoImgYSpot, pHo.hoX - pHo.hoImgXSpot + pHo.hoImgWidth, pHo.hoY - pHo.hoImgYSpot + pHo.hoImgHeight);
                if ( cadran2 == 0 )
                {
                    chgDir= (cadran1 ^ cadran2);
                    if ( chgDir != 0 )
                    {
                        pHo.rom.rmEventFlags |= CRMvt.EF_GOESINPLAYFIELD;
		                this.rhEvtProg.rhCurParam0=chgDir;
	                    this.rhEvtProg.handle_Event(pHo, (-11<<16) | (pHo.hoType&0xFFFF) );   
                    }
                }
            }

            cadran= this.quadran_In(pHo.hoX - pHo.hoImgXSpot, pHo.hoY - pHo.hoImgYSpot, pHo.hoX - pHo.hoImgXSpot + pHo.hoImgWidth, pHo.hoY - pHo.hoImgYSpot + pHo.hoImgHeight);
            if ( (cadran & pHo.rom.rmWrapping) != 0 )
            {
                if ( (cadran & CRun.BORDER_LEFT) != 0 )  
                    pHo.rom.rmMovement.setXPosition(pHo.hoX + this.rhLevelSx);	
                else if ( (cadran & CRun.BORDER_RIGHT) != 0 )
                    pHo.rom.rmMovement.setXPosition(pHo.hoX - this.rhLevelSx);	

                if ( (cadran & CRun.BORDER_TOP) != 0 )
                    pHo.rom.rmMovement.setYPosition(pHo.hoY + this.rhLevelSy);	
                else if ( (cadran & CRun.BORDER_BOTTOM) != 0 )
                    pHo.rom.rmMovement.setYPosition(pHo.hoY - this.rhLevelSy);	
            }

            cadran1 = this.quadran_Out(pHo.roc.rcOldX1, pHo.roc.rcOldY1, pHo.roc.rcOldX2, pHo.roc.rcOldY2);
            if ( cadran1 != CRun.BORDER_ALL )		// Si deja completement dehors, on ne teste pas
            {
                cadran2= this.quadran_Out(pHo.hoX - pHo.hoImgXSpot, pHo.hoY - pHo.hoImgYSpot, 
                                          pHo.hoX - pHo.hoImgXSpot + pHo.hoImgWidth, pHo.hoY - pHo.hoImgYSpot + pHo.hoImgHeight);

                chgDir= (~cadran1 & cadran2);
                if ( chgDir != 0 )
                {
                    pHo.rom.rmEventFlags |= CRMvt.EF_GOESOUTPLAYFIELD;
                    this.rhEvtProg.rhCurParam0 = chgDir;		// ou LOWORD?
                    this.rhEvtProg.handle_Event(pHo, (-12<<16) | (pHo.hoType&0xFFFF) );  // CNDL_EXTOUTPLAYFIELD 
                }
            }
		}

		if ( (pHo.hoLimitFlags & CObjInfo.OILIMITFLAGS_QUICKBACK) != 0 )
		{
		    if ( pHo.roc.rcMovementType == CMoveDef.MVTYPE_PLATFORM )
		    {
				pHo.rom.rmMovement.mpHandle_Background();
		    }
		    else
		    {
				if ( this.colMask_TestObject_IXY(pHo, pHo.roc.rcImage, pHo.roc.rcAngle, pHo.roc.rcScaleX, pHo.roc.rcScaleY, pHo.hoX, pHo.hoY, 0, CRunFrame.CM_TEST_PLATFORM) )
				{
				    this.rhEvtProg.handle_Event(pHo, ( (-13<<16) | (pHo.hoType&0xFFFF) ));
				}
		    }
		}

		if ( (pHo.hoLimitFlags & CObjInfo.OILIMITFLAGS_ONCOLLIDE) != 0 )
		{
		    var cnt= this.objectAllCol_IXY(pHo, pHo.roc.rcImage, pHo.roc.rcAngle, pHo.roc.rcScaleX, pHo.roc.rcScaleY, pHo.hoX, pHo.hoY, pHo.hoOiList.oilColList); 
		    if ( cnt != null )
		    {
				var obj;
				for (obj=0; obj<cnt.size(); obj++)
				{
				    var pHox= cnt.get(obj);
				    if ( (pHox.hoFlags & CObject.HOF_DESTROYED) == 0 )	
				    {
						var type = pHo.hoType;
						var pHo_esi= pHo;
						var pHo_ebx= pHox;
						if ( pHo_esi.hoType > pHo_ebx.hoType )
						{
						    pHo_esi = pHox;
						    pHo_ebx = pHo;
						    type = pHo_esi.hoType;
						}
						this.rhEvtProg.rhCurParam0 = pHo_ebx.hoOi;
						this.rhEvtProg.rh1stObjectNumber = pHo_ebx.hoNumber;
						this.rhEvtProg.handle_Event(pHo_esi, (-14<<16)|(type&0xFFFF) );	 
				    }
				}
    		}
		}	
		return CRun.bMoveChanged;
   	},

    objectAllCol_IXY:function(pHo, newImg, newAngle, newScaleX, newScaleY, newX, newY, pOiColList)
    {
		var list=null;
		
		var rectX1 = newX - pHo.hoImgXSpot;
		var rectX2 = rectX1 + pHo.hoImgWidth;
		var rectY1 = newY - pHo.hoImgYSpot;
		var rectY2 = rectY1 + pHo.hoImgHeight;

		var image1;
		var pMask2;
		var image2;
		if ((pHo.hoFlags&CObject.HOF_NOCOLLISION)!=0 || (pHo.hoFlags&CObject.HOF_DESTROYED)!=0)
		{
			return list;
		}
		var bMask1=false;
		var pMask1=null;
		var image;
		var nLayer=-1;
		if (pHo.hoType==COI.OBJ_SPR && (pHo.ros.rsFlags&CRSpr.RSFLAG_COLBOX)==0)
		{
			bMask1=true;
		}
		if (pHo.hoType==COI.OBJ_SPR)
		{
			nLayer=pHo.ros.rsLayer;
		}							
		
		var oldHoFlags = pHo.hoFlags;
		pHo.hoFlags |= CObject.HOF_NOCOLLISION;
		var count=0;
		var i;
		var pHox;
		var xHox, yHox;
		if (pOiColList!=null)
		{
			var nOi=0;
			for (nOi=0; nOi<pOiColList.length; nOi+=2)
			{
				var pOil=this.rhOiList[pOiColList[nOi+1]];
				var object=pOil.oilObject;
				while((object&0x80000000)==0)
				{
					pHox=this.rhObjectList[object];
					object=pHox.hoNumNext;
					
					if ((pHox.hoFlags&CObject.HOF_NOCOLLISION)==0 && (pHo.hoFlags&CObject.HOF_DESTROYED)==0)
					{					
						xHox=pHox.hoX-pHox.hoImgXSpot;
						yHox=pHox.hoY-pHox.hoImgYSpot;
						if ( xHox < rectX2 && 
							xHox + pHox.hoImgWidth > rectX1 && 
							yHox < rectY2 && 
							yHox + pHox.hoImgHeight > rectY1 )
						{
							switch(pHox.hoType)
							{
								case COI.OBJ_SPR:
									if (nLayer<0 || (nLayer>=0 && nLayer==pHox.ros.rsLayer))
									{
										if ((pHox.ros.rsFlags&CRSpr.RSFLAG_RAMBO)!=0)
										{
											if (bMask1==false || (pHox.ros.rsFlags&CRSpr.RSFLAG_COLBOX)!=0)
											{
												if (list==null)
												{
													list=new CArrayList();
												}
												list.add(pHox);
												break;
											}
											if (pMask1==null)
											{
												image=this.rhApp.imageBank.getImageFromHandle(newImg);
												if (image!=null)
												{
													pMask1=image.getMask(0, newAngle, newScaleX, newScaleY);
												}
											}
											image2=this.rhApp.imageBank.getImageFromHandle(pHox.roc.rcImage);
											if (image2!=null)
											{
												pMask2=image2.getMask(0, pHox.roc.rcAngle, pHox.roc.rcScaleX, pHox.roc.rcScaleY);
											}
											if (pMask1!=null && pMask2!=null)
											{									
												if (pMask1.testMask(rectX1, rectY1, 0, pMask2, xHox, yHox, 0))
												{
													if (list==null)
													{
														list=new CArrayList();
													}
													list.add(pHox);
													break;
												}
											}									
										}
									}
									break;
								case COI.OBJ_TEXT:
								case COI.OBJ_COUNTER:
								case COI.OBJ_LIVES:
								case COI.OBJ_SCORE:
								case COI.OBJ_CCA:
									if (list==null)
									{
										list=new CArrayList();
									}
									list.add(pHox);
									break;
								default:
									if (list==null)
									{
										list=new CArrayList();
									}
									list.add(pHox);
									break;
							}
						}
					}									
				}
			}
		}
		else
		{
			for (i=0; i<this.rhNObjects; i++)
			{
			    while(this.rhObjectList[count]==null)
					count++;
			    pHox=this.rhObjectList[count];
			    count++;

				if ((pHox.hoFlags&CObject.HOF_NOCOLLISION)==0)
				{					
					xHox=pHox.hoX-pHox.hoImgXSpot;
					yHox=pHox.hoY-pHox.hoImgYSpot;
					if ( xHox < rectX2 && 
					     xHox + pHox.hoImgWidth > rectX1 && 
					     yHox < rectY2 && 
					     yHox + pHox.hoImgHeight > rectY1 )
					{
						switch(pHox.hoType)
						{
							case COI.OBJ_SPR:
								if (nLayer<0 || (nLayer>=0 && nLayer==pHox.ros.rsLayer))
								{
									if ((pHox.ros.rsFlags&CRSpr.RSFLAG_RAMBO)!=0)
									{
										if (bMask1==false || (pHox.ros.rsFlags&CRSpr.RSFLAG_COLBOX)!=0)
										{
										    if (list==null)
										    {
												list=new CArrayList();
										    }
										    list.add(pHox);
										    break;
										}
										if (pMask1==null)
										{
											image=this.rhApp.imageBank.getImageFromHandle(newImg);
											if (image!=null)
											{
												pMask1=image.getMask(0, newAngle, newScaleX, newScaleY);
											}
										}
										image2=this.rhApp.imageBank.getImageFromHandle(pHox.roc.rcImage);
										if (image2!=null)
										{
											pMask2=image2.getMask(0, pHox.roc.rcAngle, pHox.roc.rcScaleX, pHox.roc.rcScaleY);
										}
										if (pMask1!=null && pMask2!=null)
										{									
											if (pMask1.testMask(rectX1, rectY1, 0, pMask2, xHox, yHox, 0))
											{
											    if (list==null)
											    {
													list=new CArrayList();
											    }
											    list.add(pHox);
											    break;
											}
										}									
									}
								}
								break;
							case COI.OBJ_TEXT:
							case COI.OBJ_COUNTER:
							case COI.OBJ_LIVES:
							case COI.OBJ_SCORE:
							case COI.OBJ_CCA:
							    if (list==null)
							    {
									list=new CArrayList();
							    }
							    list.add(pHox);
								break;
							default:
							    if (list==null)
							    {
									list=new CArrayList();
							    }
							    list.add(pHox);
								break;
						}
					}
				}									
		    }
		}
		// Remettre anciens flags
		pHo.hoFlags = oldHoFlags;    
		return list;
   },
    
    colMask_TestObject_IXY:function(pHo, newImg, newAngle, newScaleX, newScaleY, newX, newY, htFoot, plan)
    {    	
    	var image;
    	var mask;
		var x1;
		var y1;
		var x2;
		var y2;
    	
    	var pLayer=this.rhFrame.layers[pHo.hoLayer];
    	switch (pHo.hoType)
    	{
    		case COI.OBJ_SPR:
				if ((pHo.ros.rsFlags&CRSpr.RSFLAG_COLBOX)==0)
				{
	    			image=this.rhApp.imageBank.getImageFromHandle(pHo.roc.rcImage);
	    			if (image!=null)
	    			{
	    				mask=image.getMask(CMask.GCMF_OBSTACLE, newAngle, newScaleX, newScaleY);
	    				return pLayer.testMask(mask, newX-this.rhWindowX, newY-this.rhWindowY, htFoot, plan)!=null;
	    			}
	   			}
	   			else
	   			{
	    			x1=newX-pHo.hoImgXSpot-this.rhWindowX;
    				y1=newY-pHo.hoImgYSpot-this.rhWindowY;
    				x2=x1+pHo.hoImgWidth;
    				y2=y1+pHo.hoImgHeight;
    				return pLayer.testRect(x1, y1, x2, y2, htFoot, plan)!=null; 
	   			}
    			return false;			
//    		case COI.OBJ_TEXT:
//    		case COI.OBJ_SCORE:
//    		case COI.OBJ_LIVES:
//    		case COI.OBJ_CCA:
    		default:
    			x1=newX-pHo.hoImgXSpot-this.rhWindowX;
    			y1=newY-pHo.hoImgYSpot-this.rhWindowY;
    			x2=x1+pHo.hoImgWidth;
    			y2=y1+pHo.hoImgHeight;
    			return pLayer.testRect(x1, y1, x2, y2, htFoot, plan)!=null; 
    	}
    },
    colMask_Test_Rect:function(x1, y1, sx, sy, layer, plan)
    {
    	var pLayer;
    	var nLayerMax=layer;
    	if (layer==-1)
    	{
    		layer=0;
    		nLayerMax=this.rhFrame.nLayers;
    	}
    	
		var n;
		var x2=x1+sx;
		var y2=y1+sy;
     	for (n=layer; n<nLayerMax; n++)
     	{
     		pLayer=this.rhFrame.layers[n];
     		if (pLayer.testRect(x1-this.rhWindowX+pLayer.x, y1-this.rhWindowY+pLayer.y, x2-this.rhWindowX+pLayer.x, y2-this.rhWindowY+pLayer.y, 0, plan)!=null)
     		{
     			return true;
     		}
     	}
     	return false;    	
    },
    colMask_Test_XY:function(newX, newY, layer, plan)
    {
    	var pLayer;
    	var nLayerMax=layer;
    	if (layer==-1)
    	{
    		layer=0;
    		nLayerMax=this.rhFrame.nLayers;
    	}
     	
		var n;
     	for (n=layer; n<nLayerMax; n++)
     	{
     		pLayer=this.rhFrame.layers[n];
     		if (pLayer.testPoint(newX-this.rhWindowX+pLayer.x, newY-this.rhWindowY+pLayer.y, plan))
     		{
     			return true;
     		}
     	}    	
    	return false; 
    },

	getObjectAtXY:function(x, y)
	{
        // Explore les sprites en collision
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		var count=0;
		var i;
		var pHox;
		var x1, y1, x2, y2;
		var currentHo=null;
		var currentIndex=-1;
		var index;
		
		for (i=0; i<this.rhNObjects; i++)
		{
		    while(this.rhObjectList[count]==null)
				count++;
		    pHox=this.rhObjectList[count];
		    count++;

			x1=pHox.hoX-pHox.hoImgXSpot;
			y1=pHox.hoY-pHox.hoImgYSpot;
			x2=x1+pHox.hoImgWidth;
			y2=y1+pHox.hoImgHeight;
			if (x>=x1 && x<x2 && y>=y1 && y<y2)
			{
	            if ((pHox.hoFlags & CObject.HOF_DESTROYED) == 0)
	            {
					if (pHox.hoType==COI.OBJ_SPR)
					{
						if ((pHox.ros.rsFlags&CRSpr.RSFLAG_COLBOX)==0)
						{
							var image=this.rhApp.imageBank.getImageFromHandle(pHox.roc.rcImage);
							var mask=image.getMask(CMask.GCMF_OBSTACLE, pHox.roc.rcAngle, pHox.roc.rcScaleX, pHox.roc.rcScaleY);
							if (mask.testPoint(x1, y1, x, y))
							{
								index=pHox.getChildIndex();
								if (index>currentIndex)
								{
									currentIndex=index;
									currentHo=pHox;
								}
							}
						}
						else
						{
							index=pHox.getChildIndex();
							if (index>currentIndex)
							{
								currentIndex=index;
								currentHo=pHox;
							}
						}
					}
	            }
			}
		}
		return currentHo;
	},
 
 	
    quadran_Out:function(x1, y1, x2, y2)
    {
		var cadran = 0;
		if ( x1 < 0 )
            cadran |= CRun.BORDER_LEFT;
		if ( y1 < 0 )
            cadran |= CRun.BORDER_TOP;
		if ( x2 > this.rhLevelSx )
            cadran |= CRun.BORDER_RIGHT;
		if ( y2 > this.rhLevelSy )
            cadran |= CRun.BORDER_BOTTOM;
		return CRun.Table_InOut[cadran];
    },

    quadran_In:function(x1, y1, x2, y2)
    {
		var cadran = 15;
		if ( x1 < this.rhLevelSx )
            cadran &= ~CRun.BORDER_RIGHT;
		if ( y1 < this.rhLevelSy )
            cadran &= ~CRun.BORDER_BOTTOM;
		if ( x2 > 0 )
            cadran &= ~CRun.BORDER_LEFT;
		if ( y2 > 0 )
            cadran &= ~CRun.BORDER_TOP;
		return CRun.Table_InOut[cadran];
    },
    
    random:function(wMax)
    {
        var calcul=this.rh3Graine*31415+1;
        calcul&=0x0000FFFF;
		this.rh3Graine = calcul;
		return ((calcul*wMax)>>>16);
    },

    get_Direction:function(dir)
    {
		if (dir==0 || dir==-1)
		{
            return this.random(32);
		}

		var loop;
        var found=0;
		var count=0;
		var dirShift=dir;
		for (loop=0; loop<32; loop++)
		{
            if ((dirShift&1)!=0)
            {
                count++;
                found=loop;
            }
            dirShift>>>=1;
		}

		if (count==1)
		{
            return found;
		}

		count=this.random(count);
		dirShift=dir;
		for (loop=0; loop<32; loop++)
		{
            if ((dirShift&1)!=0)
            {
                count--;
                if (count<0)
                { 
                    return loop;
                }
            }
            dirShift>>>=1;
		}
		return 0;
    },

    get_EventExpressionAny:function(pExp)
    {
        this.rh4Tokens = pExp.tokens;
        this.rh4CurToken = 0;
        this.flagFloat=false;
        return this.getExpression();
    },

    get_EventExpressionInt:function(pExp)
    {
        this.rh4Tokens = pExp.tokens;
        this.rh4CurToken = 0;
        this.flagFloat=false;
        return this.getExpression();
    },

    get_EventExpressionDouble:function(pExp)
    {
        this.rh4Tokens = pExp.tokens;
        this.rh4CurToken = 0;
        this.flagFloat=false;
        return this.getExpression();
    },

    get_EventExpressionString:function(pExp)
    {
        this.rh4Tokens = pExp.tokens;
        this.rh4CurToken = 0;
        this.flagFloat=false;
        return this.getExpression();
    },
    
	get_ExpressionInt:function()
	{
        this.flagFloat=false;
		var value=this.getExpression();
		if (value<0)
			return Math.ceil(value);
		else
			return Math.floor(value);
	},
	
    getExpression:function()
    {
        var ope;
        var pileStart = this.rh4PosPile;
        this.rh4Operators[this.rh4PosPile] = this.rh4OpeNull;
        do
        {
            this.rh4PosPile++;
            this.bOperande=true;
            this.rh4Tokens[this.rh4CurToken].evaluate(this);
            this.bOperande=false;
            this.rh4CurToken++;

            do
            {
                ope = this.rh4Tokens[this.rh4CurToken];
                if (ope.code > 0 && ope.code < 0x00140000)
                {
                    if (ope.code > this.rh4Operators[this.rh4PosPile - 1].code)
                    {
                        this.rh4Operators[this.rh4PosPile] = ope;
                        this.rh4CurToken++;

                        this.rh4PosPile++;
                        this.bOperande=true;
                        this.rh4Tokens[this.rh4CurToken].evaluate(this);
                        this.bOperande=false;
                        this.rh4CurToken++;
                    }
                    else
                    {
                        this.rh4PosPile--;
                        this.rh4Operators[this.rh4PosPile].evaluate(this);
                    }
                }
                else
                {
                    this.rh4PosPile--;
                    if (this.rh4PosPile == pileStart)
                    {
                        break;
                    }
                    this.rh4Operators[this.rh4PosPile].evaluate(this);
                }
            } while (true);
        } while (this.rh4PosPile > pileStart + 1);
        return this.rh4Results[pileStart + 1];
    },

    getCurrentResult:function()
    {
        return this.rh4Results[this.rh4PosPile];
    },

    getPreviousResult:function()
    {
        return this.rh4Results[this.rh4PosPile - 1];
    },

    getNextResult:function()
    {
        return this.rh4Results[this.rh4PosPile + 1];
    },

    update_PlayerObjects:function(joueur, type, value)
    {
		joueur++;

		var count=0;
		var no;
		for (no=0; no<this.rhNObjects; no++)
		{
		    while(this.rhObjectList[count]==null)
				count++;
		    var pHo=this.rhObjectList[count];
		    if (pHo.hoType==type)
		    {
				switch(type)
				{
				    case 5:
						if (pHo.rsPlayer==joueur)
						{
						    pHo.setValue(value);
						}
						break;
				    case 6:	
						if (pHo.rsPlayer==joueur)
						{
						    pHo.setValue(value);
						}
						break;
				}
		    }
		    count++;
		}
    },
   
    actPla_FinishLives:function(joueur, live)
    {
		var lives=this.rhApp.getLives();
		if (live==lives[joueur])
		{ 
	    	return;
	 	}

		if (live==0)
		{
		    if (lives[joueur]!=0)
		    {
				this.rhEvtProg.push_Event(0, ((-5<<16)|0xFFF9), 0, null, joueur);
		    }
		}

		lives[joueur]=live;
		this.update_PlayerObjects(joueur, COI.OBJ_LIVES, live);
    },
    
    getMouseOnObjectsEDX:function(oiList, nega)
    {
		var pHo=this.rhEvtProg.evt_FirstObject(oiList);
		if (pHo==null)
		{
		    if (nega) 
		    {
				return true;
		    }
		    return false;
		}
        var cpt=this.rhEvtProg.evtNSelectedObjects;

		var count=0;
		var i;
		var pHox;
		var x1, y1, x2, y2;
		var list=new CArrayList();
		for (i=0; i<this.rhNObjects; i++)
		{
		    while(this.rhObjectList[count]==null)
				count++;
		    pHox=this.rhObjectList[count];
		    count++;

			x1=pHox.hoX-pHox.hoImgXSpot;
			y1=pHox.hoY-pHox.hoImgYSpot;
			x2=x1+pHox.hoImgWidth;
			y2=y1+pHox.hoImgHeight;
			if (this.rh2MouseX>=x1 && this.rh2MouseX<x2 && this.rh2MouseY>=y1 && this.rh2MouseY<y2)
			{
	            if ((pHox.hoFlags & CObject.HOF_DESTROYED) == 0)
	            {
					if (pHox.hoType==COI.OBJ_SPR)
					{
						if ((pHox.ros.rsFlags&CRSpr.RSFLAG_COLBOX)==0)
						{
							var image=this.rhApp.imageBank.getImageFromHandle(pHox.roc.rcImage);
							var mask=image.getMask(CMask.GCMF_OBSTACLE, pHox.roc.rcAngle, pHox.roc.rcScaleX, pHox.roc.rcScaleY);
							if (mask.testPoint(x1, y1, this.rh2MouseX, this.rh2MouseY))
							{
								list.add(pHox);								
							}
						}
						else
						{
							list.add(pHox);
						}
					}
					else
					{
						list.add(pHox);
					}
	            }
			}
		}

		if (list.size()==0)
		{
		    if (nega)
		    { 
				return true;
		    }
		    return false;
		}

		if (nega==false)
		{
		    do
		    {
				for (count=0; count<list.size(); count++)
				{
				    pHox=list.get(count);
				    if (pHox==pHo)
						break;
				}
				if (count==list.size())
				{
				    cpt--;						//; Pas trouve dans la liste-> on le vire
				    this.rhEvtProg.evt_DeleteCurrentObject();
				}
				pHo=this.rhEvtProg.evt_NextObject();
		    }while(pHo!=null);
		    return cpt!=0;
		}
		else
		{
		    do
		    {
				for (count=0; count<list.size(); count++)
				{
				    pHox=list.get(count);
				    if (pHox==pHo)
						return false;
				}
				pHo=this.rhEvtProg.evt_NextObject();
		    }while(pHo!=null);
		    return true;
		}
   },
    

    txtDisplay:function(pe, oi, txtNumber)
    {	
        var pEvp=pe.evtParams[0];
        var pInfo=new CPositionInfo();
		if (pEvp.read_Position(this, 0x10, pInfo))
		{
		    var count=0;
		    var no;
		    for (no=0; no<this.rhNObjects; no++)
		    {
				while(this.rhObjectList[count]==null)
			    	count++;
				var pHo=this.rhObjectList[count];
				count++;

				if (pHo.hoType==COI.OBJ_TEXT && pHo.hoOi==oi && pHo.hoX==pInfo.x && pHo.hoY==pInfo.y)
				{
				    pHo.ros.obShow();			
				    pHo.hoFlags&=~CObject.HOF_NOCOLLISION;
				    pHo.rsMini=-2;
				    pHo.txtChange(txtNumber);
				    pHo.ros.rsFlash=0;
				    pHo.ros.rsFlags|=CRSpr.RSFLAG_VISIBLE;
				    return pHo.hoNumber;
				}
		    }
		    var num=this.f_CreateObject(-1, oi, pInfo.x, pInfo.y, 0, 0, this.rhFrame.nLayers-1, -1);
		    if (num>=0)
		    {
				this.rhObjectList[num].txtChange(txtNumber);
				return num;
		    }
		}
		return -1;
    },

    txtDoDisplay:function(pe, txtNumber)
    {
		if ((pe.evtOiList&0x8000)==0)
		{
		    return this.txtDisplay(pe, pe.evtOi, txtNumber);
		}

		if ((pe.evtOiList&0x7FFF)==0x7FFF) 
		    return -1;
		var qoi=pe.evtOiList&0x7FFF;
		var  qoil=this.rhEvtProg.qualToOiList[qoi];
		var count=0;
		while(count<qoil.qoiList.length)
		{
		    this.txtDisplay(pe, qoil.qoiList[count], txtNumber);
		    count+=2;
		};
		return -1;
    },
    
    init_Disappear:function(hoPtr)
    {
		var bFlag=false;
		var dw=0;

		if ((hoPtr.hoOEFlags&CObjectCommon.OEFLAG_ANIMATIONS)!=0)
		{
			if (hoPtr.ros!=null)
			{
				if (hoPtr.ros.initFadeOut())
				{
					return;
				}
			}
			if (hoPtr.roa!=null)
			{
			    if (hoPtr.roa.anim_Exist(CAnim.ANIMID_DISAPPEAR))
			    {
					dw=1;
			    }
			}
		}
	    if (dw==0)
	    {
			bFlag=true;
	    }
	
		if (bFlag)
		{
		    hoPtr.hoCallRoutine=false;
		    this.destroy_Add(hoPtr.hoNumber);
		    return;
		}

		if (hoPtr.ros!=null)
		{
		    hoPtr.ros.setColFlag(false);
		    hoPtr.hoFlags|=CObject.HOF_NOCOLLISION;
		}
		if (hoPtr.rom!=null)
		{
		    hoPtr.rom.initSimple(hoPtr, CMoveDef.MVTYPE_DISAPPEAR, false);
		    hoPtr.roc.rcSpeed=0;
		}
		if ((dw&1)!=0)
		{
		    hoPtr.roa.animation_Force(CAnim.ANIMID_DISAPPEAR);
		    hoPtr.roa.animation_OneLoop();
		}
    },

    isMouseOn:function()
    {
        if (this.rhApp.cursorCount>0)
        {
            return true;
        }
        return false;
    },
    getYMouse:function()
    {
		if (this.rhMouseUsed!=0)
		{
		    return 0;
		}
		return this.rh2MouseY;
    },
    getRGBAt:function(hoPtr, x, y)
    {
		var rgb = 0;
		if ( hoPtr.roc.rcImage!=-1 )
		{
		    var image=this.rhApp.imageBank.getImageFromHandle(hoPtr.roc.rcImage);
		    rgb=image.getPixel(x, y);
		    rgb=swapRGB(rgb);
		}
        return rgb;
    },

	drawLevel:function()
	{
		var plo;
		var rc=new CRect();
		var nLayer;
		       
		for ( nLayer=0; nLayer<this.rhFrame.nLayers; nLayer++)
		{
		    var pLayer= this.rhFrame.layers[nLayer];

		    var bWrapHorz= ((pLayer.dwOptions & CLayer.FLOPT_WRAP_HORZ) != 0);
		    var bWrapVert= ((pLayer.dwOptions & CLayer.FLOPT_WRAP_VERT) != 0);

			if (nLayer==0)
			{
				var sx=this.rhFrame.leWidth;
				if (bWrapHorz)
				{
					sx*=2;
				}
				var sy=this.rhFrame.leHeight;
				if (bWrapVert)
				{
					sy*=2;
				}				
//				pLayer.fillBack(sx, sy, rhFrame.leBackground);
			}

    		var nLOs = pLayer.nBkdLOs;
    		var i;
			for (i=0; i<nLOs; i++)
			{
			    plo=this.rhFrame.LOList.getLOFromIndex(pLayer.nFirstLOIndex+i);			
				var typeObj = plo.loType;

				if ( typeObj < COI.OBJ_SPR )
				{
				    rc.left = plo.loX;
				    rc.top = plo.loY;
				}
				else
				{
					continue;
				}

				var bi;
				bi=new CBackInstance(this.rhApp, rc.left, rc.top, plo, null, 0);
				bi.addInstance(0, pLayer);

				if (bWrapHorz)
				{
					bi=new CBackInstance(this.rhApp, this.rhFrame.leWidth+rc.left, rc.top, plo, null, 0);
					bi.addInstance(1, pLayer);
					if (rc.left+bi.width>this.rhFrame.leWidth)
					{
						bi=new CBackInstance(this.rhApp, rc.left-this.rhFrame.leWidth, rc.top, plo, null, 0);
						bi.addInstance(4, pLayer);
					}
					if (bWrapVert)
					{
						bi=new CBackInstance(this.rhApp, rc.left, this.rhFrame.leHeight+rc.top, plo, null, 0);
						bi.addInstance(2, pLayer);
						bi=new CBackInstance(this.rhApp, this.rhFrame.leWidth+rc.left, this.rhFrame.leHeight+rc.top, plo, null, 0);
						bi.addInstance(3, pLayer);
						if (rc.top+bi.height>this.rhFrame.leHeight)
						{
							bi=new CBackInstance(this.rhApp, rc.left, rc.top-this.rhFrame.leHeight, plo, null, 0);
							bi.addInstance(5, pLayer);
						}
					}							
				}
				else if (bWrapVert)
				{
					bi=new CBackInstance(rhApp, rc.left, this.rhFrame.leHeight+rc.top, plo, null, 0);
					bi.addInstance(2, pLayer);
					if (rc.top+bi.height>this.rhFrame.leHeight)
					{
						bi=new CBackInstance(this.rhApp, rc.left, rc.top-this.rhFrame.leHeight, plo, null, 0);
						bi.addInstance(5, pLayer);
					}
				}
			}
		}
	},

	scrollLayers:function()
	{
		var l;
		var layer;
		
        var x= this.rh3DisplayX;
        var y= this.rh3DisplayY;
		
		var dx, dy;
		for (l=0; l<this.rhFrame.nLayers; l++)
		{
			layer=this.rhFrame.layers[l];
            dx=x*layer.xCoef+layer.dx;
            dy=y*layer.yCoef+layer.dy;
			
		    var bWrapHorz= ((layer.dwOptions & CLayer.FLOPT_WRAP_HORZ) != 0);
		    var bWrapVert= ((layer.dwOptions & CLayer.FLOPT_WRAP_VERT) != 0);
		    if (bWrapHorz)
		    {
				if (dx<0)
				{
					dx=dx%this.rhFrame.leWidth+this.rhFrame.leWidth;
				}
		    	if (dx>this.rhFrame.leWidth)
		    	{
		    		dx=dx%this.rhFrame.leWidth;
		    	}
		    }
		    if (bWrapVert)
		    {
				if (dy<0)
				{
					dy=dy%this.rhFrame.leHeight+this.rhFrame.leHeight;
				}
		    	if (dy>this.rhFrame.leHeight)
		    	{
		    		dy=dy%this.rhFrame.leHeight;
		    	}
		    }
			layer.x=dx;
			layer.y=dy;
			layer.planeBack.x=-dx+this.rhApp.xOffset;
			layer.planeBack.y=-dy+this.rhApp.yOffset;
			layer.planeQuickDisplay.x=-dx+this.rhApp.xOffset;				
			layer.planeQuickDisplay.y=-dy+this.rhApp.yOffset;
			layer.planeSprites.x=-dx+this.rhApp.xOffset;
			layer.planeSprites.y=-dy+this.rhApp.yOffset;								
		} 		
		this.rhFrame.leX=this.rh3DisplayX;
		this.rhFrame.leY=this.rh3DisplayY;			
	},
	
	hideLayer:function(nLayer)
	{
		if (nLayer>=0 && nLayer<this.rhFrame.nLayers)
		{
			var layer=this.rhFrame.layers[nLayer];
			layer.hide();
		}
	},
	showLayer:function(nLayer)
	{
		if (nLayer>=0 && nLayer<this.rhFrame.nLayers)
		{
			var layer=this.rhFrame.layers[nLayer];
			layer.show();
		}		
	},
	hideShowLayers:function()
	{
		var n;
		for (n=0; n<this.rhFrame.nLayers; n++)
		{
			var layer=this.rhFrame.layers[n];
			if (layer.dwOptions&CLayer.FLOPT_TOHIDE)
			{
				layer.hide();					
			}
		}
	},
	
    setDisplay:function(x, y, nLayer, flags)
    {
        x -= this.rh3WindowSx / 2;
        y -= this.rh3WindowSy / 2;

        var xf= x;
        var yf= y;

        if (nLayer != -1 && nLayer < this.rhFrame.nLayers)
        {
            var pLayer= this.rhFrame.layers[nLayer];
            if (pLayer.xCoef > 1.0)
            {
                var dxf= (xf - this.rhWindowX);
                dxf /= pLayer.xCoef;
                xf = this.rhWindowX + dxf;
            }
            if (pLayer.yCoef > 1.0)
            {
                var dyf= (yf - this.rhWindowY);
                dyf /= pLayer.yCoef;
                yf = this.rhWindowY + dyf;
            }
        }

        x = xf;
        y = yf;

        if (x < 0)
        {
            x = 0;
        }
        if (y < 0)
        {
            y = 0;
        }
        var x2 = x + this.rh3WindowSx;
        var y2 = y + this.rh3WindowSy;
        if (x2 > this.rhLevelSx)
        {
            x2 = this.rhLevelSx - this.rh3WindowSx;
            if (x2 < 0)
            {
                x2 = 0;
            }
            x = x2;
        }
        if (y2 > this.rhLevelSy)
        {
            y2 = this.rhLevelSy - this.rh3WindowSy;
            if (y2 < 0)
            {
                y2 = 0;
            }
            y = y2;
        }

        if ((flags & 1) != 0)
        {
            if (x != this.rhWindowX)
            {
                this.rh3DisplayX = x;
                this.rh3Scrolling |= CRun.RH3SCROLLING_SCROLL;
            }
        }
        if ((flags & 2) != 0)
        {
            if (y != this.rhWindowY)
            {
                this.rh3DisplayY = y;
                this.rh3Scrolling |= CRun.RH3SCROLLING_SCROLL;
            }
        }
    },

    updateWindowPos:function(newX, newY)
    {
        var noMove = 0;
        this.rh4WindowDeltaX = newX - this.rhWindowX;
        if (this.rh4WindowDeltaX != 0)
        {
            noMove++;
        }
        this.rh4WindowDeltaY = newY - this.rhWindowY;
        if (this.rh4WindowDeltaY != 0)
        {
            noMove++;
        }

        var pLayer;
        var i;
        if (noMove == 0)
        {
            for (i = 0; i < this.rhFrame.nLayers; i++)
            {
                pLayer = this.rhFrame.layers[i];
                if (pLayer.dx != 0 || pLayer.dy != 0)
                {
                    noMove++;
                    break;
                }
            }
        }

        var nOldX = this.rhWindowX;
        var nOldY = this.rhWindowY;
        var nNewX = newX;
        var nNewY = newY;
        var nDeltaX = this.rh4WindowDeltaX;
        var nDeltaY = this.rh4WindowDeltaY;

        this.rhWindowX = newX;									
        this.rh3XMinimum = newX - CRun.COLMASK_XMARGIN;
        if (this.rh3XMinimum < 0)
        {
            this.rh3XMinimum = this.rh3XMinimumKill;
        }

        this.rhWindowY = newY;									
        this.rh3YMinimum = newY - CRun.COLMASK_YMARGIN;
        if (this.rh3YMinimum < 0)
        {
            this.rh3YMinimum = this.rh3YMinimumKill;
        }

        this.rh3XMaximum = newX + this.rh3WindowSx + CRun.COLMASK_XMARGIN;
        if (this.rh3XMaximum > this.rhLevelSx)
        {
            this.rh3XMaximum = this.rh3XMaximumKill;
        }

        this.rh3YMaximum = newY + this.rh3WindowSy + CRun.COLMASK_YMARGIN;
        if (this.rh3YMaximum > this.rhLevelSy)
        {
            this.rh3YMaximum = this.rh3YMaximumKill;
        }


        var count = 0;
        var nObjects;
        for (nObjects = 0; nObjects < this.rhNObjects; nObjects++)
        {
            while (this.rhObjectList[count] == null)
                count++;
            var pHo= this.rhObjectList[count];
            count++;

            if (noMove != 0)
            {
                if ((pHo.hoOEFlags & CObjectCommon.OEFLAG_SCROLLINGINDEPENDANT) != 0)
                {
                    var x = nDeltaX;
                    var y = nDeltaY;

                    if (pHo.rom == null)
                    {
                        pHo.hoX += x;
                        pHo.hoY += y;
                    }
                    else
                    {
                        x += pHo.hoX;
                        y += pHo.hoY;
                        pHo.rom.rmMovement.setXPosition(x);
                        pHo.rom.rmMovement.setYPosition(y);
                    }
                }
                else
                {
                    var nLayer = pHo.hoLayer;
                    if (nLayer < this.rhFrame.nLayers)
                    {
                        var oldLayerDx = nOldX;
                        var oldLayerDy = nOldY;
                        var newLayerDx = nNewX;
                        var newLayerDy = nNewY;

                        pLayer = this.rhFrame.layers[nLayer];
                        if ((pLayer.dwOptions & CLayer.FLOPT_XCOEF) != 0)
                        {
                            oldLayerDx = (pLayer.xCoef * oldLayerDx);
                            newLayerDx = (pLayer.xCoef * newLayerDx);
                        }
                        if ((pLayer.dwOptions & CLayer.FLOPT_YCOEF) != 0)
                        {
                            oldLayerDy = (pLayer.yCoef * oldLayerDy);
                            newLayerDy = (pLayer.yCoef * newLayerDy);
                        }

                        var nX = (pHo.hoX + oldLayerDx) - newLayerDx + nDeltaX - pLayer.dx;
                        var nY = (pHo.hoY + oldLayerDy) - newLayerDy + nDeltaY - pLayer.dy;

                        if ((pHo.hoOEFlags & CObjectCommon.OEFLAG_MOVEMENTS) == 0)
                        {
                            pHo.hoX = nX;
                            pHo.hoY = nY;
                        }
                        else
                        {
                            pHo.rom.rmMovement.setXPosition(nX);
                            pHo.rom.rmMovement.setYPosition(nY);
                        }
                    }
                }
            }
        }
    },

	doScroll:function()
	{
        if ((this.rh3Scrolling & CRun.RH3SCROLLING_SCROLL) != 0)
        {
            this.rh3Scrolling = 0;

            if (this.rhFrame.leX != this.rh3DisplayX || this.rhFrame.leY != this.rh3DisplayY)
            {
                this.scrollLayers();
                this.updateWindowPos(this.rhFrame.leX, this.rhFrame.leY);
            }
            this.rh3DisplayX = this.rhWindowX;
            this.rh3DisplayY = this.rhWindowY;
        }			
	},
	
	activeToBackdrop:function(pHo, colType)
	{
		var pLayer=this.rhFrame.layers[pHo.hoLayer];
		var image=this.rhApp.imageBank.getImageFromHandle(pHo.roc.rcImage);
		var bi=new CBackInstance(this.rhApp, pHo.hoX-this.rhWindowX+pLayer.x, pHo.hoY-this.rhWindowY+pLayer.y, null, image, colType);
		bi.setEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
		bi.addInstance(0, pLayer);
		
		var bWrapHorz= ((pLayer.dwOptions & CLayer.FLOPT_WRAP_HORZ) != 0);
		var bWrapVert= ((pLayer.dwOptions & CLayer.FLOPT_WRAP_VERT) != 0);

		if (bWrapHorz)
		{
			bi=new CBackInstance(this.rhApp, this.rhFrame.leWidth+pHo.hoX-this.rhWindowX+pLayer.x, pHo.hoY-this.rhWindowY+pLayer.y, null, image, colType);
			bi.setEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
			bi.addInstance(1, pLayer);
			if (pHo.hoX+bi.width>this.rhFrame.leWidth)
			{
				bi=new CBackInstance(this.rhApp, pHo.hoX-this.rhWindowX+pLayer.x-this.rhFrame.leWidth, pHo.hoY-this.rhWindowY+pLayer.y, null, image, colType);
				bi.setEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
				bi.addInstance(4, pLayer);
			}
			if (bWrapVert)
			{
				bi=new CBackInstance(this.rhApp, pHo.hoX-this.rhWindowX+pLayer.x, this.rhFrame.leHeight+pHo.hoY-this.rhWindowY+pLayer.y, null, image, colType);
				bi.setEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
				bi.addInstance(2, pLayer);
				bi=new CBackInstance(this.rhApp, this.rhFrame.leWidth+pHo.hoX-this.rhWindowX+pLayer.x, this.rhFrame.leHeight+pHo.hoY-this.rhWindowY+pLayer.y, null, image, colType);
				bi.setEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
				bi.addInstance(3, pLayer);
				if (pHo.hoY+bi.height>this.rhFrame.leHeight)
				{
					bi=new CBackInstance(this.rhApp, pHo.hoX-this.rhWindowX+pLayer.x, pHo.hoY-this.rhWindowY+pLayer.y-this.rhFrame.leHeight, null, image, colType);
					bi.setEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
					bi.addInstance(5, pLayer);
				}
			}							
		}
		else if (bWrapVert)
		{
			bi=new CBackInstance(this.rhApp, pHo.hoX-this.rhWindowX+pLayer.x, this.rhFrame.leHeight+pHo.hoY-this.rhWindowY+pLayer.y, null, image, colType);
			bi.setEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
			bi.addInstance(2, pLayer);
			if (pHo.hoY+bi.height>this.rhFrame.leHeight)
			{
				bi=new CBackInstance(this.rhApp, pHo.hoX-this.rhWindowX+pLayer.x, pHo.hoY-this.rhWindowY+pLayer.y-this.rhFrame.leHeight, null, image, colType);
				bi.setEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
				bi.addInstance(5, pLayer);
			}
		}
	},
		
	addBackdrop:function(srceImage, x, y, layer, colType)
	{
		var pLayer=this.rhFrame.layers[layer];
		var bi=new CBackInstance(this.rhApp, x-this.rhWindowX+pLayer.x, y-this.rhWindowX+pLayer.y, null, srceImage, colType);
		bi.addInstance(0, pLayer);	
		var bWrapHorz= ((pLayer.dwOptions & CLayer.FLOPT_WRAP_HORZ) != 0);
		var bWrapVert= ((pLayer.dwOptions & CLayer.FLOPT_WRAP_VERT) != 0);
		
		// Wrap
		if (bWrapHorz)
		{
			bi=new CBackInstance(this.rhApp, this.rhFrame.leWidth+x-this.rhWindowX+pLayer.x, y-this.rhWindowY+pLayer.y, null, srceImage, colType);
			bi.addInstance(1, pLayer);
			if (x+bi.width>this.rhFrame.leWidth)
			{
				bi=new CBackInstance(this.rhApp, x-this.rhWindowX+pLayer.x-this.rhFrame.leWidth, y-this.rhWindowY+pLayer.y, null, srceImage, colType);
				bi.addInstance(4, pLayer);
			}
			if (bWrapVert)
			{
				bi=new CBackInstance(this.rhApp, x-this.rhWindowX+pLayer.x, this.rhFrame.leHeight+y-this.rhWindowY+pLayer.y, null, srceImage, colType);
				bi.addInstance(2, pLayer);
				bi=new CBackInstance(this.rhApp, this.rhFrame.leWidth+x-this.rhWindowX+pLayer.x, this.rhFrame.leHeight+y-this.rhWindowY+pLayer.y, null, srceImage, colType);
				bi.addInstance(3, pLayer);
				if (y+bi.height>this.rhFrame.leHeight)
				{
					bi=new CBackInstance(this.rhApp, x-this.rhWindowX+pLayer.x, y-this.rhWindowY+pLayer.y-this.rhFrame.leHeight, null, srceImage, colType);
					bi.addInstance(5, pLayer);
				}
			}							
		}
		else if (bWrapVert)
		{
			bi=new CBackInstance(this.rhApp, x-this.rhWindowX+pLayer.x, this.rhFrame.leHeight+y-this.rhWindowY+pLayer.y, null, srceImage, colType);
			bi.addInstance(2, pLayer);
			if (y+bi.height>this.rhFrame.leHeight)
			{
				bi=new CBackInstance(this.rhApp, x-this.rhWindowX+pLayer.x, y-this.rhWindowY+pLayer.y-this.rhFrame.leHeight, null, srceImage, colType);
				bi.addInstance(5, pLayer);
			}
		}
		
	},
	deleteAllBackdrop2:function(layer)
	{
		if (layer<0 || layer>=this.rhFrame.nLayers)
		{
			return;
		}
		var pLayer=this.rhFrame.layers[layer];
		pLayer.deleteAddedBackdrops();
	},
	deleteBackdropAt:function(layer, xx, yy, fine)
	{
		if (layer<0 || layer>=this.rhFrame.nLayers)
		{
			return;
		}
		var pLayer=this.rhFrame.layers[layer];
		pLayer.deleteAddedBackdropsAt(xx-this.rhWindowX, yy-this.rhWindowY, fine);
	},
	
    getStorage:function(id)
    {
        if (this.rhApp.extensionStorage != null)
        {
            var n;
            for (n = 0; n < this.rhApp.extensionStorage.size(); n++)
            {
                var e = this.rhApp.extensionStorage.get(n);
                if (e.id == id)
                {
                    return e;
                }
            }
        }
        return null;
    },

    delStorage:function(id)
    {
        if (this.rhApp.extensionStorage != null)
        {
            var n;
            for (n = 0; n < this.rhApp.extensionStorage.size(); n++)
            {
                var e = this.rhApp.extensionStorage.get(n);
                if (e.id == id)
                {
                    this.rhApp.extensionStorage.removeIndex(n);
                }
            }
        }
    },

    addStorage:function(data, id)
    {
        var e= this.getStorage(id);
        if (e == null)
        {
            if (this.rhApp.extensionStorage == null)
            {
                this.rhApp.extensionStorage = new CArrayList();
            }
            data.id = id;
            this.rhApp.extensionStorage.add(data);
        }
    },
    
	getXMouse:function()
    {
		if (this.rhMouseUsed!=0)
		    return 0;
		return this.rh2MouseX;
    },
    
    getYMouse:function()
    {
		if (this.rhMouseUsed!=0)
		    return 0;
		return this.rh2MouseY;
    },
    
    onMouseWheel:function(delta)
    {
		this.rhWheelCount=this.rh4EventCount;
    	if (delta<0)
        	this.rhEvtProg.handle_GlobalEvents(((-12 << 16) | 0xFFFA));		// CNDL_ONMOUSEHWEELDOWN
     	else
        	this.rhEvtProg.handle_GlobalEvents(((-11 << 16) | 0xFFFA));		// CNDL_ONMOUSEHWEELUP
	}    
}

// CCreateObjectInfo object
// --------------------------------------------------------------
CCreateObjectInfo.COF_HIDDEN=0x0002;
function CCreateObjectInfo()
{    
    this.cobLevObj=null;	
    this.cobLevObjSeg=0;
    this.cobFlags=0;
    this.cobX=0;
    this.cobY=0;
    this.cobDir=0;
    this.cobLayer=0;
    this.cobZOrder=0;
}

// CObjInfo object
// ---------------------------------------------------------------
CObjInfo.OILIMITFLAGS_BORDERS=0x000F;
CObjInfo.OILIMITFLAGS_BACKDROPS=0x0010;
CObjInfo.OILIMITFLAGS_ONCOLLIDE=0x0080;
CObjInfo.OILIMITFLAGS_QUICKCOL=0x0100;
CObjInfo.OILIMITFLAGS_QUICKBACK=0x0200;
CObjInfo.OILIMITFLAGS_QUICKBORDER=0x0400;
CObjInfo.OILIMITFLAGS_QUICKSPR=0x0800;
CObjInfo.OILIMITFLAGS_QUICKEXT=0x1000;
CObjInfo.OILIMITFLAGS_ALL=0xFFFF;
function CObjInfo()
{
    this.oilOi=0;  	
    this.oilListSelected=0;               
    this.oilType=0;
    this.oilObject=0;
    this.oilEvents=0;
    this.oilWrap=0;	
    this.oilNextFlag=false;
    this.oilNObjects=0;
    this.oilActionCount=0;
    this.oilActionLoopCount=0;
    this.oilCurrentRoutine=0;
    this.oilCurrentOi=0;
    this.oilNext=0;
    this.oilEventCount=0;
    this.oilNumOfSelected=0;
    this.oilOEFlags=0;
    this.oilLimitFlags=0;
    this.oilLimitList=0;
    this.oilOIFlags=0;
    this.oilOCFlags2=0;
    this.oilInkEffect=0;
    this.oilEffectParam=0;
    this.oilHFII=0;
    this.oilBackColor=0;
    this.oilQualifiers=null;
    this.oilName=null;	
    this.oilEventCountOR=0;
	this.oilColList=null;
}
CObjInfo.prototype=
{
    copyData:function(oiPtr)
    {
    	this.oilOi=oiPtr.oiHandle;			
    	this.oilType=oiPtr.oiType;			

    	this.oilOIFlags=oiPtr.oiFlags;			
        var ocPtr=oiPtr.oiOC;
        this.oilOCFlags2=ocPtr.ocFlags2;		
    	this.oilInkEffect=oiPtr.oiInkEffect;		
    	this.oilEffectParam=oiPtr.oiInkEffectParam;	
    	this.oilOEFlags=ocPtr.ocOEFlags;
    	this.oilBackColor=ocPtr.ocBackColor;			
		this.oilEventCount=0;
    	this.oilObject=-1;
    	this.oilLimitFlags=CObjInfo.OILIMITFLAGS_ALL;	
    	if ( oiPtr.oiName!=null )
        {
            this.oilName=oiPtr.oiName;
        }
        var q;
        this.oilQualifiers=new Array(8);
        for (q=0; q<8; q++) 
            this.oilQualifiers[q]=ocPtr.ocQualifiers[q];
    }
}

// Global object saving classes
// ----------------------------------------------------------
function CSaveGlobal()
{
    this.name=null;
    this.objects=null;
}
function CSaveGlobalCounter()
{
	this.value=null;
	this.rsMini=0;
	this.rsMaxi=0;
	this.rsMiniDouble=0;
	this.rsMaxiDouble=0;
}
function CSaveGlobalText()
{
	this.text=null;
	this.rsMini=0;    
}
function CSaveGlobalValues()
{
    this.values=null;
    this.strings=null;
    this.flags=0;
}



