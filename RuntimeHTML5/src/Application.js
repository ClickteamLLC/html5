
// CRunApp object
// -----------------------------------------------------------------
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
CRunApp.MAX_PLAYER=4;
CRunApp.RUNTIME_VERSION=0x0302;
CRunApp.MAX_KEY=8;
CRunApp.GA_NOHEADING=0x0002;
CRunApp.GA_SPEEDINDEPENDANT=0x0008;
CRunApp.GA_STRETCH=0x0010;
CRunApp.GA_MENUHIDDEN=0x0080;
CRunApp.GA_MENUBAR=0x0100;
CRunApp.GA_MAXIMISE=0x0200;
CRunApp.GA_MIX=0x0400;
CRunApp.GA_FULLSCREENATSTART = 0x0800;
CRunApp.GANF_SAMPLESOVERFRAMES=0x0001;
CRunApp.GANF_RUNFRAME=0x0004;
CRunApp.GANF_NOTHICKFRAME=0x0040;
CRunApp.GANF_DONOTCENTERFRAME=0x0080;
CRunApp.GANF_DISABLE_CLOSE=0x0200;
CRunApp.GANF_HIDDENATSTART=0x0400;
CRunApp.GAOF_JAVASWING=0x1000;
CRunApp.GAOF_JAVAAPPLET=0x2000;
CRunApp.SL_RESTART=0;
CRunApp.SL_STARTFRAME=1;
CRunApp.SL_FRAMEFADEINLOOP=2;
CRunApp.SL_FRAMELOOP=3;
CRunApp.SL_FRAMEFADEOUTLOOP=4;
CRunApp.SL_ENDFRAME=5;		
CRunApp.SL_QUIT=6;
CRunApp.SL_WAITFORMOCHI=7;
CRunApp.MAX_VK=203;
CRunApp.VK_LBUTTON=200;
CRunApp.VK_MBUTTON=201;
CRunApp.VK_RBUTTON=202;
CRunApp.CTRLTYPE_MOUSE=0;	
CRunApp.CTRLTYPE_JOY1=1;
CRunApp.CTRLTYPE_JOY2=2;
CRunApp.CTRLTYPE_JOY3=3;
CRunApp.CTRLTYPE_JOY4=4;
CRunApp.CTRLTYPE_KEYBOARD=5;
CRunApp.ARF_INGAMELOOP=0x0004;
CRunApp.BUILDFLAG_TEST=0x0080;
CRunApp.AH2OPT_WEBGL=0x10000;
CRunApp.AH2OPT_KEEPRESOURCESBETWEENFRAMES=0x8000;
CRunApp.MAX_TOUCHES=10;
CRunApp.FAKE_TOUCHIDENTIFIER=0xE64FA465;
function CRunApp(cName, cfile)
{
	this.canvasName=cName;
	this.canvas=document.getElementById(cName)

	this.frameOffsets=null;
	this.frameEffects=null;
	this.frameEffectParams=null;
	this.frameMaxIndex=0;
	this.framePasswords=null;
	this.appName=null;
	this.nGlobalValuesInit=0;
	this.globalValuesInitTypes=null;
	this.globalValuesInit=null;
	this.nGlobalStringsInit=0;
	this.globalStringsInit=null;
	this.OIList=null;
	this.imageBank=null;
	this.fontBank=null;
	this.soundBank=null;
	this.soundPlayer=null;
	this.appRunningState=0;
	this.lives=null;
	this.scores=null;
	this.playerNames=null;
	this.gValues=null;
	this.gStrings=null;
	this.startFrame=0;
	this.nextFrame=0;
	this.currentFrame=0;
	this.frame=null;
	this.file=null;
	this.parentApp=null;
	this.parentOptions=0;
	this.parentWidth=0;
	this.parentHeight=0;
	this.refTime=0;
	this.run=null;
	this.preloader=null;
	this.loadPreloader=false;
	this.displayPreloader=true;
		
	this.xOffset=0;
	this.yOffset=0;
	this.gaFlags=0;			
	this.gaNewFlags=0;		
	this.gaMode=0;			
	this.gaOtherFlags=0;		
	this.gaCxWin=0;			
	this.gaCyWin=0;			
	this.gaScoreInit=0;		
	this.gaLivesInit=0;		
	this.gaBorderColour=0;
	this.gaNbFrames=0;		
	this.gaFrameRate=0;		
	this.pcCtrlType=null;	
	this.pcCtrlKeys=null;	
	this.frameHandleToIndex=null;
	this.frameMaxHandle=0;
	this.cx=0;
	this.cy=0;
	this.mouseX=0;
	this.mouseY=0;
	this.bMouseIn=false;
	this.keyBuffer=null;
	
	this.cursorCount=0;
	this.sysEvents=null;
	this.quit=false;
	this.m_bLoading=false;
    this.extensionStorage=null;
	this.extLoader=null;
    this.embeddedFiles=null;
	this.bUnicode=false;
	this.xMouseOffset=0;
	this.yMouseOffset=0;
	this.deltaWheel=0;
	this.effect=0;
	this.effectParam=0;
	this.alpha=0;
	
	this.dwOptions=0;
	this.dwBuildType=0;
	this.dwBuildFlags=0;
	this.wScreenRatioTolerance=0;
	this.wScreenAngle=0;		
			
	this.file=cfile;
	this.frameColor=0;
	
	this.run=null;
	this.timer=0;
	this.imagesToLoad=0;
	this.imagesLoaded=0;
	this.bLoading=false;
	this.keyNew=false;
	this.subApps=new Array(0);
	this.preloaderType=-1;                        // HTML5PRELOADER_IMAGE (0) ou HTML5PRELOADER_FRAMENUM (1)
	this.preloaderCircleCenterX=0;
	this.preloaderCircleCenterY=0;
	this.preloaderCircleRadius=0;
	this.preloaderCircleThickness=0;
	this.preloaderCircleColor=0;
	this.preloaderBackColor=0;
	this.preloaderFrameNumber=0;        // première frame = 0
	this.bPreloader=false;
	this.transition=null;
	this.transitionManager=null;
	this.transitionDisplay=null;
	this.transitionOldSurface=null;
	this.bStartFadeIn=false;
	// Browser detection
	this.browserDetect=new BrowserDetect();
	this.touchesID=null;
	this.touchesX=null;
	this.touchesY=null;
	this.nTouches=0;
	
	this.joystick=null;
	this.joystickOn=0;

	this.accelerometer=0;	
	this.accX = 0;
	this.accY = 0;
	this.accZ = 0;
	this.accGravX = 0;
	this.accGravY = 0;
	this.accGravZ = 0;
}
CRunApp.prototype=
{	
	load: function()
	{
		this.file.seek(0);
		
		// Charge le mini-header
		var b=this.file.readBuffer(4);
		this.bUnicode=false;
		if (b[0]==80 && b[1]==65 && b[2]==77 && b[3]==85)	
		{
			this.bUnicode=true;
		} 
		this.file.setUnicode(this.bUnicode);
		this.file.skipBytes(2);	
		this.file.skipBytes(2);	
		this.file.skipBytes(4);	
		this.file.skipBytes(4);	
	
		// Reserve les objets
		this.OIList=new COIList();
		this.imageBank=new CImageBank(this);
		this.fontBank=new CFontBank(this);
		this.soundBank=new CSoundBank(this);
		this.soundPlayer=new CSoundPlayer(this);
	
		// Lis les chunks
		var posEnd;
		var nbPass=0, n;
		var chID=0;
		var chFlags;
		var chSize;
		while (chID!=0x7F7F)
		{
			chID=this.file.readAShort();
			chFlags=this.file.readAShort();
			chSize = this.file.readAInt();
		
			if (chSize == 0)
			{
				continue;
			}
			posEnd=this.file.getFilePointer()+chSize;
	
			switch(chID)
			{
			// CHUNK_APPHEADER
			case 0x2223:		
				this.loadAppHeader();
				// Buffer pour les offsets frame
				this.frameOffsets=new Array(this.gaNbFrames);
				this.frameEffects=new Array(this.gaNbFrames);
				this.frameEffectParams=new Array(this.gaNbFrames);
				// Pour les password
				this.framePasswords=new Array(this.gaNbFrames);
				for (n = 0; n < this.gaNbFrames; n++)
					this.framePasswords[n] = null;
				break;
			// CHUNK_APPHDR2
			case 0x2245:
				this.dwOptions=this.file.readAInt();
				this.dwBuildType=this.file.readAInt();
				this.dwBuildFlags=this.file.readAInt();
				this.wScreenRatioTolerance=this.file.readAShort();
				this.wScreenAngle=this.file.readAShort();	
				break;			
			// CHUNK_APPNAME
			case 0x2224:		
				this.appName=this.file.readAString();
				break;
			// CHUNK_GLOBALVALUES
			case 0x2232:	
				this.loadGlobalValues();
				break;
			// CHUNK_GLOBALSTRINGS
			case 0x2233:
				this.loadGlobalStrings();
				break;
			// CHUNK_FRAMEITEMS
			// CHUNK_FRAMEITEMS_2 
			case 0x2229:		
			case 0x223F:		
				this.OIList.preLoad(this.file);
				break;
			// CHUNK_FRAMEHANDLES
			case 0x222B:		
				this.loadFrameHandles(chSize);
				break;
			// CHUNK_HTML5PRELOADER 
			case 0x224A:
				this.preloaderType=this.file.readAInt();
				this.preloaderCircleCenterX=this.file.readAInt();
				this.preloaderCircleCenterY=this.file.readAInt();
				this.preloaderCircleRadius=this.file.readAInt();
				this.preloaderCircleThickness=this.file.readAInt();
				this.preloaderCircleColor=this.file.readAInt();
				this.preloaderBackColor=this.file.readAInt();
				this.preloaderFrameNumber=this.file.readAInt();
				this.loadPreloader=true;
				break;
			// CHUNK_FRAME
			case 0x3333:		
				// Repere les positions des frames dans le fichier
				this.frameOffsets[this.frameMaxIndex]=this.file.getFilePointer();
				var frID=0;
				var frFlags;
				var frFSize;
				while (frID!=0x7F7F)		// CHUNK_LAST
				{
					frID=this.file.readAShort();
					frFlags=this.file.readAShort();
					frSize = this.file.readAInt();
				
					if (frSize == 0)
					{
						continue;
					}
					var frPosEnd=this.file.getFilePointer()+frSize;
		
					switch (frID)
					{
					case 0x3336:	
						this.framePasswords[this.frameMaxIndex]=this.file.readAString();
						break;
					case 0x3349:
						this.frameEffects[this.frameMaxIndex]=this.file.readAInt();
						this.frameEffectParams[this.frameMaxIndex]=this.file.readAInt();
						break;
					}
					this.file.seek(frPosEnd);
				}
				this.frameMaxIndex++;
				break;
	        // CHUNK_EXTENSIONS2
	        case 0x2234:
	            this.extLoader = new CExtLoader(this);
	            this.extLoader.loadList(this.file);
	            break;
	        // CHUNK_BINARYFILES
	        case 0x2238:
	            var nFiles=this.file.readAInt();
	            this.embeddedFiles=new Array(nFiles);
	            for (n=0; n<nFiles; n++)
	            {
	                this.embeddedFiles[n]=new CEmbeddedFile(this);
	                this.embeddedFiles[n].preLoad();
	            }                    
	            break;
			// CHUNK_IMAGE
			case 0x6666:
				this.imageBank.preLoad(this.file);
				break;
			// CHUNK_FONT
			case 0x6667:
				this.fontBank.preLoad(this.file);
				break;
			// CHUNK_SOUNDS
			case 0x6668:
				this.soundBank.preLoad(this.file);
				break;
			}
		    
			// Positionne a la fin du chunk
			this.file.seek(posEnd);
		}

        this.context = new StandardRenderer(this.canvas)

		// Fixe le flags multiple samples
		this.soundPlayer.setMultipleSounds((this.gaFlags&CRunApp.GA_MIX)!=0);
	
		// Cree le sprite principal
		if (this.parentApp==null)
		{
			this.mainSprite=new Sprite();
		}
	},

    setParentApp: function(pApp, sFrame, options, sprite, width, height)
    {
        this.parentApp = pApp;
        this.parentOptions = options;
       	this.mainSprite=sprite;
        this.startFrame = sFrame;
        this.parentWidth = width;
        this.parentHeight = height;
    },		
	
	startApplication: function()
	{
//		if (this.gaFlags&CRunApp.GA_FULLSCREENATSTART)
//			this.enterFullScreen();
				
		this.sysEvents = new CArrayList();		
		
		this.keyBuffer=new Array(CRunApp.MAX_VK);
		var n;
		for (n=0; n<CRunApp.MAX_VK; n++)
			this.keyBuffer[n]=false;
		var that=this;
		window.addEventListener("keydown", function(e)
		{
			that.doKeyDown(e);
		}, false);
		window.addEventListener("keyup", function(e)
		{
			that.doKeyUp(e);
		}, false);
		
		this.canvas.application=this;
		if (this.parentApp==null)
		{
			this.canvas.addEventListener("mousemove", function(e)
			{
				that.mouseMove(e, that.canvas);
			}, false);	
			this.canvas.addEventListener("mousedown", function(e)
			{
				that.mouseDown(e);
			}, false);
			this.canvas.addEventListener("mouseup", function(e)
			{
				that.mouseUp(e);
			}, false);
			this.canvas.addEventListener("mouseout", function(e)
			{
				that.mouseOut(e);
			}, false);
			this.canvas.addEventListener("click", function(e)
			{
				that.click(e);
			}, false);
			this.canvas.addEventListener("dblclick", function(e)
			{
				that.dblClick(e);
			}, false);
			this.canvas.addEventListener("contextmenu", function(event)
			{
				event.preventDefault();
			}, false);		
			var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" 
			if (document.attachEvent) 
			    document.attachEvent("on"+mousewheelevt, function(e){that.mouseWheel(e);})
			else if (document.addEventListener) 
			    document.addEventListener(mousewheelevt, function(e){that.mouseWheel(e);}, false)

			document.onselectstart = function(){ return false; }
		
			this.touchable = 'createTouch' in document;
			this.touchCalls=new CArrayList();
			this.touchesID=new Array(CRunApp.MAX_TOUCHES);
			this.bTouchesLocked=new Array(CRunApp.MAX_TOUCHES);
			this.touchesLocked=new Array(CRunApp.MAX_TOUCHES);
			this.touchesX=new Array(CRunApp.MAX_TOUCHES);
			this.touchesY=new Array(CRunApp.MAX_TOUCHES);
			for (n=0; n<CRunApp.MAX_TOUCHES; n++)
			{
				this.touchesID[n]=0;
				this.touchesX[n]=0;
				this.touchesY[n]=0;
				this.bTouchesLocked[n]=false;
				this.touchesLocked[n]=0;
			}
			this.nTouches=0;
				
			if (this.touchable)
			{
				this.canvas.addEventListener( 'touchstart', function(e)
				{
					that.touchStart(e);
				}, false );
				this.canvas.addEventListener( 'touchmove', function(e)
				{
					that.touchMove(e);
					e.preventDefault();
				}, false );
				this.canvas.addEventListener( 'touchend', function(e)
				{
					that.touchEnd(e);
				}, false );
				this.canvas.addEventListener( 'touchcancel', function(e)
				{
					that.touchEnd(e);
				}, false );
			}
			
			window.setTimeout("updateApplication()", 1000/this.gaFrameRate);
		}		
		this.xMouseOffset=0;
		this.yMouseOffset=0;
		
		this.appRunningState=0;
		this.currentFrame=-2;
		
		this.run=new CRun(this);
	},

	imageHasLoaded:function()
	{
		this.imagesLoaded++;
	},

	stepApplication: function()
	{
		if (this.parentApp==null && this.loadPreloader)
		{
			if (this.preloader==null)
			{
				this.preloader=new CPreloader(this);
			}
			this.preloader.load();
			this.loadPreloader=!this.preloader.isLoaded;
			window.setTimeout("updateApplication()", 20);
			return;
		}

		var date=new Date();
		this.timer=date.getTime();		
		if (this.playApplication(false))
		{
			if (!this.loading)
			{
				if (this.parentApp==null)
				{
					if (this.transitionDisplay==null)
					{
						this.context.renderSolidColor(0, 0, this.gaCxWin, this.gaCyWin, this.frameColor);			
						this.mainSprite.draw(this.context, 0, 0);
						if (this.joystickOn)
							this.joystick.draw(this.context);
					}
					else
					{
						this.context.renderSimpleImage(this.transitionDisplay, 0, 0, this.gaCxWin, this.gaCyWin, 0, 0);
					}
				}
			}
			else
			{
				if (this.imagesLoaded>=this.imagesToLoad)
				{
					this.run.resume();
					this.loading=false;
					this.imagesToLoad=0;
					this.imagesLoaded=0;
					if (this.bStartFadeIn)
					{
						this.bStartFadeIn=false;
            			var quit=this.run.doRunLoop();
            			if (quit!=0)
			                this.appRunningState = CRunApp.SL_ENDFRAME;
			            else
			            {
		                    this.appRunningState = CRunApp.SL_FRAMELOOP;
                			this.startFrameFadeIn(this.transitionOldSurface);
                			this.transitionOldSurface=null;
	                	}
					}
				}
				else
				{
					if (this.preloader!=null && (this.frame.html5Options&CRunFrame.HTML5FOPT_DISPLAYPRELOADER)!=0)
						this.preloader.step();
				}
			}			
			if (this.parentApp==null)
			{
				date=new Date();
				var delta=date.getTime()-this.timer;
				delta=Math.max(1000/this.gaFrameRate-delta, 1);
				window.setTimeout("updateApplication()", delta);
			}
			return true;
		}
		else
		{
			this.endApplication();
			return false;
		}
	},

	drawSubApplication:function(cont, x, y)
	{
		if (!this.loading)
		{
			this.context.renderSolidColor(x, y, this.parentWidth, this.parentHeight, this.frameColor);			
			this.mainSprite.draw(this.context, 0, 0);
		}
	},
			
	playApplication: function(bOnlyRestartApp)
	{
		var bLoop=true;
		var bContinue=true;
		do
		{
			switch (this.appRunningState)
			{
			case CRunApp.SL_RESTART:	   
				this.initGlobal();
				this.nextFrame=this.startFrame;
				this.appRunningState=1;		    
				this.killGlobalData();
                if (bOnlyRestartApp)
                {
                    bLoop = false;
                    break;
                }
			case CRunApp.SL_STARTFRAME:	    
				this.startTheFrame();
				break;
            case CRunApp.SL_FRAMEFADEINLOOP:
                if (this.loopFrameFadeIn() == false)
                {
                    this.endFrameFadeIn();
                    if (this.appRunningState == CRunApp.SL_QUIT || this.appRunningState == CRunApp.SL_RESTART)
                        this.endFrame();
                }
                else
                    bLoop = false;
                break;
			case CRunApp.SL_FRAMELOOP:
				this.run.doRunLoop();
                if (this.run.rhQuit!=0)
                {
                    if (this.startFrameFadeOut())
                        this.appRunningState = CRunApp.SL_FRAMEFADEOUTLOOP;
                    else
                        this.endFrame();
                }
                else
                    bLoop = false;
                break;
            case CRunApp.SL_FRAMEFADEOUTLOOP:
                if (this.loopFrameFadeOut() == false)
                {
                    this.endFrameFadeOut();
                    if (this.appRunningState == CRunApp.SL_QUIT || this.appRunningState == CRunApp.SL_RESTART)
                        this.endFrame();
                }
                else
                    bLoop = false;
                break;
			case CRunApp.SL_ENDFRAME:
				this.endFrame();
				break;
			default:
				bLoop=false;
				break;
			}
		} while(bLoop==true);
    
		// Quit ?
		if ( this.appRunningState == CRunApp.SL_QUIT )
		{
			bContinue = false;
		}

		// Continue?
		return bContinue;
	},

	endApplication: function()
	{
		// Remove listeners
//		if (this.parentApp==null)
//		{
//			// Remove event handlers
//		}
		
		// Stop sounds 
		if (this.soundPlayer!=null)
		{
			this.soundPlayer.stopAllSounds();
		}
//		this.exitFullScreen();
	},
	
	startTheFrame: function()
	{
		// Charge la frame
		if ( this.nextFrame!=this.currentFrame )
		{
			this.frame=new CRunFrame(this);
			this.frame.loadFullFrame(this.nextFrame);
		}
		this.frameColor=this.frame.leBackground;
		this.currentFrame=this.nextFrame;
    
		// Init runtime variables
		this.frame.leX = this.frame.leY = 0;
		this.frame.leLastScrlX = this.frame.leLastScrlY = 0;
		this.frame.rhOK = false;

		// Creates display planes
		var n;
		if (this.parentApp!=null)
		{
			this.xOffset=0;
			this.yOffset=0;	
		}
		else
		{
			this.xOffset=this.gaCxWin/2-this.frame.leEditWinWidth/2;
			this.yOffset=this.gaCyWin/2-this.frame.leEditWinHeight/2;
		}
		for (n=0; n<this.frame.nLayers; n++)
		{
			this.frame.layers[n].createPlanes(this.xOffset, this.yOffset);
		}

//		flushKeyboard();

		this.run.setFrame(this.frame);
		this.run.initRunLoop(this.frame.fadeIn != null);
		this.appRunningState = CRunApp.SL_FRAMELOOP;
        if (this.frame.fadeIn != null)
        {
        	if (this.loading)
        	{
        		this.bStartFadeIn=true;
			}
			else
			{
    			var quit=this.run.doRunLoop();
    			if (quit!=0)
	                this.appRunningState = CRunApp.SL_ENDFRAME;
	            else
	            {
                    this.appRunningState = CRunApp.SL_FRAMELOOP;
        			this.startFrameFadeIn(this.transitionOldSurface);
        			this.transitionOldSurface=null;
            	}
           }
        }
        else
        {
        	this.transitionOldSurface=null;
        }
		if (this.loading)
			this.run.pause(true);
	},
	
	resetLayers:function()
	{
		if (this.parentApp!=null)
		{
			this.xOffset=0;
			this.yOffset=0;	
		}
		else
		{
			this.xOffset=this.gaCxWin/2-this.frame.leEditWinWidth/2;
			this.yOffset=this.gaCyWin/2-this.frame.leEditWinHeight/2;
		}
		var n;
		for (n=0; n<this.frame.nLayers; n++)
		{
			this.frame.layers[n].resetPlanes(this.xOffset, this.yOffset);
		}
	},
	
	endFrame:function()
	{
		var ul;
		ul= this.run.killRunLoop(false);

		if ( (this.gaNewFlags&CRunApp.GANF_RUNFRAME)!=0 )
		{
			this.appRunningState=CRunApp.SL_QUIT;
		}
		else 
		{
			switch(CServices.LOWORD(ul)) 
			{
			case 1:
				this.nextFrame=this.currentFrame+1;
				this.appRunningState=CRunApp.SL_STARTFRAME;
				break;
			case 2:			
				this.nextFrame=Math.max(0, this.currentFrame-1);
				this.appRunningState=CRunApp.SL_STARTFRAME;
				break;
			case 3:
				this.appRunningState=CRunApp.SL_STARTFRAME;
				if ( (CServices.HIWORD(ul)&0x8000)!=0 )
				{
					this.nextFrame=CServices.HIWORD(ul)&0x7FFF;
					if ( this.nextFrame>=this.gaNbFrames )
					{
						this.nextFrame=this.gaNbFrames-1;
					}
					if ( this.nextFrame<0 )
					{
						this.nextFrame=0;
					}
				}
				else						
				{
					if ( CServices.HIWORD(ul)<this.frameMaxHandle )
					{
						this.nextFrame=this.frameHandleToIndex[CServices.HIWORD(ul)];
						if ( this.nextFrame==-1 )
						{
							this.nextFrame=this.currentFrame+1;
						}
					}
					else
					{
						this.nextFrame=this.currentFrame+1;
					}
				}
				break;

			case 4:		
				this.appRunningState=CRunApp.SL_RESTART;
				this.nextFrame=this.startFrame;
				break;

			default:
				this.appRunningState=CRunApp.SL_QUIT;
				break;
			}
		}

		if ( this.appRunningState == CRunApp.SL_STARTFRAME )
		{
			// If invalid frame number, quit current game
			if ( this.nextFrame<0 || this.nextFrame>=this.gaNbFrames )
			{
				this.appRunningState = this.currentFrame;
			}
		}

		if ( this.appRunningState!=CRunApp.SL_STARTFRAME || this.nextFrame!=this.currentFrame )
		{
			var n;
			for (n=0; n<this.frame.nLayers; n++)
			{
				this.frame.layers[n].deletePlanes();
			}

			this.frame=null;
			this.currentFrame=-1;
		}
	},

    getTransitionManager:function()
    {
        if (this.transitionManager == null)
        {
            this.transitionManager = new CTransitionManager(this);
        }
        return this.transitionManager;
    },

    startFrameFadeIn:function(pOldSurf)
    {
        var pSf1 = null;
        var pSf2 = null;
        var pData = this.frame.fadeIn;

        if (pData != null)
        {
	    	pSf1=document.createElement("canvas");
	    	pSf1.width=this.gaCxWin;
	    	pSf1.height=this.gaCyWin;
	    	pSf2=document.createElement("canvas");
	    	pSf2.width=this.gaCxWin;
	    	pSf2.height=this.gaCyWin;
			var renderer=new StandardRenderer(pSf2);
			renderer.renderSolidColor(0, 0, this.gaCxWin, this.gaCyWin, this.frameColor);			
			this.mainSprite.draw(renderer, 0, 0);

            // Fill source surface                
			renderer=new StandardRenderer(pSf1);
            if ((pData.transFlags & CTransitionData.TRFLAG_COLOR) != 0)
				renderer.renderSolidColor(0, 0, this.gaCxWin, this.gaCyWin, pData.transColor);			
            else
            {
				renderer.renderSolidColor(0, 0, this.gaCxWin, this.gaCyWin, this.gaBorderColour);			
                if (pOldSurf != null)
                	renderer.renderSimpleImage(pOldSurf, 0, 0, pOldSurf.width, pOldSurf.height, 0, 0);
            }

            // Reset current surface
	    	this.transitionDisplay=document.createElement("canvas");
	    	this.transitionDisplay.width=this.gaCxWin;
	    	this.transitionDisplay.height=this.gaCyWin;
	    	var context=this.transitionDisplay.getContext("2d");
	    	context.drawImage(pSf1, 0, 0);
            this.transition = this.getTransitionManager().createTransition(pData, this.transitionDisplay, pSf1, pSf2);
            if (this.transition!=null)
            {
	            this.appRunningState = CRunApp.SL_FRAMEFADEINLOOP;
	            return true;
            }
        }
       	this.transitionDisplay=null;
        this.appRunningState = CRunApp.SL_FRAMELOOP;
        this.run.createRemainingFrameObjects();       	
       	return false;
    },

    loopFrameFadeIn:function()
    {
        if (this.transition != null)
        {
            if (this.transition.isCompleted())
            {
                return false;	
            }
            this.transition.stepDraw(CTrans.TRFLAG_FADEIN);
            return true;
        }
        return false;
    },

    endFrameFadeIn:function()
    {
        if (this.transition != null)
        {
            this.transition.end();
            this.transition = null;
            this.transitionDisplay=null;
            if (this.appRunningState == CRunApp.SL_FRAMEFADEINLOOP)
            {
                this.appRunningState = CRunApp.SL_FRAMELOOP;
            }
            this.run.createRemainingFrameObjects();
        }
        return true;
    },

    startFrameFadeOut:function()
    {
        var pSf1 = null;
        var pSf2 = null;
        var pData = this.frame.fadeOut;

        // V2 transitions
        if (pData != null)
        {
	    	pSf1=document.createElement("canvas");
	    	pSf1.width=this.gaCxWin;
	    	pSf1.height=this.gaCyWin;
	    	pSf2=document.createElement("canvas");
	    	pSf2.width=this.gaCxWin;
	    	pSf2.height=this.gaCyWin;
			var renderer=new StandardRenderer(pSf1);
			renderer.renderSolidColor(0, 0, this.gaCxWin, this.gaCyWin, this.frameColor);			
			this.mainSprite.draw(renderer, 0, 0);

            renderer=new StandardRenderer(pSf2);
            if ((pData.transFlags & CTransitionData.TRFLAG_COLOR) != 0)
				renderer.renderSolidColor(0, 0, this.gaCxWin, this.gaCyWin, pData.transColor);			
            else
				renderer.renderSolidColor(0, 0, this.gaCxWin, this.gaCyWin, 0x000000);			

	    	this.transitionDisplay=document.createElement("canvas");
	    	this.transitionDisplay.width=this.gaCxWin;
	    	this.transitionDisplay.height=this.gaCyWin;
	    	var context=this.transitionDisplay.getContext("2d");
	    	context.drawImage(pSf1, 0, 0);
            this.transition = this.getTransitionManager().createTransition(pData, this.transitionDisplay, pSf1, pSf2);
            if (this.transition!=null)
            {
	            this.appRunningState = CRunApp.SL_FRAMEFADEOUTLOOP;
	            return true;
	        }
        }
        this.transitionDisplay=null;
        return false;
    },

    loopFrameFadeOut:function()
    {
        if (this.transition != null)
        {
            if (this.transition.isCompleted())
            {
                this.endFrameFadeOut();
                return false;		// Stop
            }
            this.transition.stepDraw(CTrans.TRFLAG_FADEOUT);
        }
        return true;
    },

    endFrameFadeOut:function()
    {
        if (this.transition != null)
        {
            this.transitionOldSurface=this.transition.source2;
            this.transition.end();
            this.transition= null;
            this.transitionDisplay=null;
            if (this.appRunningState == CRunApp.SL_FRAMEFADEOUTLOOP)
            {
                this.appRunningState = CRunApp.SL_ENDFRAME;
            }
        }
        return true;
    },

	loadAppHeader:function()
	{
		this.file.skipBytes(4);		
		this.gaFlags=this.file.readAShort();
		this.gaNewFlags=this.file.readAShort();
		this.gaMode=this.file.readAShort();
		this.gaOtherFlags=this.file.readAShort();
		this.gaCxWin=this.file.readAShort();
		this.gaCyWin=this.file.readAShort();
		this.gaScoreInit=this.file.readAInt();
		this.gaLivesInit=this.file.readAInt();
		var n, m;
		this.pcCtrlType=new Array(CRunApp.MAX_PLAYER);
		for (n = 0; n < CRunApp.MAX_PLAYER; n++)
			this.pcCtrlType[n] = this.file.readAShort();	
		this.pcCtrlKeys=new Array(CRunApp.MAX_PLAYER*CRunApp.MAX_KEY); 
		for (n=0; n<CRunApp.MAX_PLAYER; n++)
		{
			for (m=0; m<CRunApp.MAX_KEY; m++)
			{
				this.pcCtrlKeys[n*CRunApp.MAX_KEY+m]=this.file.readAShort();	//CKeyConvert.getFlashKey(file.readAShort());
			}
		}
		this.gaBorderColour=this.file.readAColor();	
		this.gaNbFrames=this.file.readAInt();		
		this.gaFrameRate = this.file.readAInt();	
		this.file.skipBytes(1);	
		this.file.skipBytes(3);
	},

	loadGlobalValues:function()
	{
		this.nGlobalValuesInit=this.file.readAShort();
		this.globalValuesInit=new Array(this.nGlobalValuesInit);
		this.globalValuesInitTypes=new Array(this.nGlobalValuesInit);
		var n;
		for (n=0; n<this.nGlobalValuesInit; n++)
			this.globalValuesInit[n]=this.file.readAInt();
		this.file.readBytesAsArray(this.globalValuesInitTypes);
	},
	
	loadGlobalStrings:function()
	{
		this.nGlobalStringsInit=this.file.readAInt();
		this.globalStringsInit=new Array(this.nGlobalStringsInit);
		var n;
		for (n=0; n<this.nGlobalStringsInit; n++)
			this.globalStringsInit[n]=this.file.readAString();
	},

	loadFrameHandles:function(size)
	{
		this.frameMaxHandle=(size/2);
		this.frameHandleToIndex=new Array(this.frameMaxHandle);

		var n;
		for (n=0; n<this.frameMaxHandle; n++)
		{
			this.frameHandleToIndex[n]=this.file.readAShort();
		}
	},

	HCellToNCell:function(hCell)
	{
		if ( this.frameHandleToIndex == null || hCell == -1 || hCell >= this.frameMaxHandle)
		{
			return -1;
		}
		return this.frameHandleToIndex[hCell];
	},


	killGlobalData:function()
	{
		this.adGO=null;
	},
	
	initGlobal:function()
	{
		var n;

		// Vies et score
		if (this.parentApp==null || (this.parentApp!=null && (this.parentOptions&CCCA.CCAF_SHARE_LIVES)==0))
		{
			this.lives=new Array(CRunApp.MAX_PLAYER);
			for (n = 0; n < CRunApp.MAX_PLAYER; n++)
			{
				this.lives[n] = this.gaLivesInit ^ 0xFFFFFFFF;
			}
		}
		else
		{
			this.lives=null;
		}
		if (this.parentApp==null || (this.parentApp!=null && (this.parentOptions&CCCA.CCAF_SHARE_SCORES)==0))
		{
			this.scores=new Array(CRunApp.MAX_PLAYER);
			for (n = 0; n < CRunApp.MAX_PLAYER; n++)
			{
				this.scores[n] = this.gaScoreInit ^ 0xFFFFFFFF;
			}
		}
		else
		{
			this.scores=null;
		}
		this.playerNames=new Array(CRunApp.MAX_PLAYER);
		for (n = 0; n < CRunApp.MAX_PLAYER; n++)
		{
			this.playerNames[n] = "";
		}

		// Global values
		if (this.parentApp==null || (this.parentApp!=null && (this.parentOptions&CCCA.CCAF_SHARE_GLOBALVALUES)==0))
		{
			this.gValues=new Array(this.nGlobalValuesInit);
			for (n=0; n<this.nGlobalValuesInit; n++)
				this.gValues[n]=this.globalValuesInit[n];
		}
		else
			this.gValues=null;

		// Global strings
		if (this.parentApp==null || (this.parentApp!=null && (this.parentOptions&CCCA.CCAF_SHARE_GLOBALVALUES)==0))
		{
			this.gStrings=new Array(this.nGlobalStringsInit);
			for (n=0; n<this.nGlobalStringsInit; n++)
				this.gStrings[n]=this.globalStringsInit[n];
		}
		else
			this.gStrings=null;
	},

	getLives:function()
	{
		var app=this;
		while(app.lives==null)
			app=this.parentApp;
		return app.lives;
	},
	getScores:function()
	{
		var app=this;
		while(app.scores==null)
			app=this.parentApp;
		return app.scores;
	},
	getCtrlType:function()
	{
		var app=this;
		while(app.parentApp!=null && (app.parentOptions&CCCA.CCAF_SHARE_PLAYERCTRLS)!=0)
			app=app.parentApp;
		return app.pcCtrlType;
	},
	getCtrlKeys:function()
	{
		var app=this;
		while(app.parentApp!=null && (app.parentOptions&CCCA.CCAF_SHARE_PLAYERCTRLS)!=0)
			app=app.parentApp;
		return app.pcCtrlKeys;
	},
	getGlobalValues:function()
	{
		var app=this;
		while(app.gValues==null)
			app=app.parentApp;
		return app.gValues;
	},
	getNGlobalValues:function()
	{
		if (this.gValues!=null)
			return gValues.length;
		return 0;
	},
	getGlobalStrings:function()
	{
		var app=this;
		while(app.gStrings==null)
			app=app.parentApp;
		return app.gStrings;
	},
	getNGlobalStrings:function()
	{
		if (this.gStrings!=null)
			return gStrings.length;
		return 0;
	},
	checkGlobalValue:function(num)
	{
		var values=this.getGlobalValues();

		if (num<0 || num>1000)
			return null;
		var oldSize=values.length;
		if (num+1>oldSize)
		{
			var n;
			for (n=oldSize; n<num+1; n++)
				values.push(0);
		}
		return values;
	},
	getGlobalValueAt:function(num)
	{
		var values=this.checkGlobalValue(num);
		if (values!=null)
			return values[num];
		return 0;
	},
	setGlobalValueAt:function(num, value)
	{
		var values=this.checkGlobalValue(num);
		if (values!=null)
			values[num]=value;
	},
	addGlobalValueAt:function(num, value)
	{
		var values=this.checkGlobalValue(num);
		if (values!=null)
			values[num]+=value;
	},
	checkGlobalString:function(num)
	{ 
		var strings=this.getGlobalStrings();

		if (num<0 || num>1000)
			return null;
		var oldSize=strings.length;
		if (num+1>oldSize)
		{
			var n;
			for (n=oldSize; n<num+1; n++)
				strings.push("");
		}
		return strings;
	},
	getGlobalStringAt:function(num)
	{
		var strings=this.checkGlobalString(num);
		if (strings!=null)
			return strings[num];
		return "";
	},
	setGlobalStringAt:function(num, value)
	{
		var strings=this.checkGlobalString(num);
		if (strings!=null)
			strings[num]=value;
	},

	// Event handlers
	// -----------------------------------------------------
	doKeyDown:function(e)
	{
		if (e)
		{
			var code=e.keyCode;
			this.keyBuffer[code]=true;
			this.keyNew=true;
			if (this.run!=null && this.run.rhEvtProg!=null)
			    this.run.rhEvtProg.onKeyDown(code);				
			var n;	
			for (n=0; n<this.subApps.length; n++)
				this.subApps[n].doKeyDown(e);			
		}
	},
	doKeyUp:function(e)
	{
		if (e)
		{
			var code=e.keyCode;
			this.keyBuffer[code]=false;
			var n;	
			for (n=0; n<this.subApps.length; n++)
				this.subApps[n].doKeyUp(e);			
		}
	},
	getKeyState:function(code)
	{
		return this.keyBuffer[code];
	},
	setMouseOffsets:function(xOffset, yOffset)
	{
		this.xMouseOffset=xOffset;
		this.yMouseOffset=yOffset;
	},
	mouseMove:function(e, obj)
	{
  		if (e.pageX)
  		{   
    		this.mouseX= e.pageX;
    		this.mouseY= e.pageY;
    	}
  		else if (e.clientY)
  		{   
    		this.mouseX = e.clientX + document.body.scrollLeft+document.documentElement.scrollLeft;
    		this.mouseY = e.clientY + document.body.scrollTop+document.documentElement.scrollTop;
    	}

    	var top = 0;
    	var left = 0;
    	var objParent=obj;
    	while (objParent && objParent.tagName != 'BODY') 
    	{
        	top += objParent.offsetTop;
        	left += objParent.offsetLeft;
        	objParent = objParent.offsetParent;
    	}    	
		this.bMouseIn=true;
  		this.mouseX -= left;		
  		this.mouseY -= top;
  		this.mouseX-=this.xMouseOffset;
  		this.mouseY-=this.yMouseOffset;
		if (this.run!=null && this.run.rhEvtProg!=null)
		    this.run.rhEvtProg.onMouseMove();
				    
		var n;	
		for (n=0; n<this.subApps.length; n++)
			this.subApps[n].mouseMove(e, obj);			

		if (!this.touchable)
			this.touchMove( new CFakeTouch(e.pageX, e.pageY, this.canvas) );
	},
	mouseUp:function(e)
	{
		var code;
		if (e.which)
		{
			switch (e.which)
			{
				case 2:
					code=CRunApp.VK_MBUTTON;
					break;
				case 3:
					code=CRunApp.VK_RBUTTON;
					break;
				default:
					code=CRunApp.VK_LBUTTON;
					break;
			}
		}
		else
		{
			switch (e.button)
			{
				case 2:
					code=CRunApp.VK_RBUTTON;
					break;
				case 4:
					code=CRunApp.VK_MBUTTON;
					break;
				default:
					code=CRunApp.VK_LBUTTON;
					break;
			}
		}
		this.mouseMove(e, this.canvas);
		this.bMouseIn=true;
		this.keyBuffer[code]=false;

		var n;	
		for (n=0; n<this.subApps.length; n++)
			this.subApps[n].mouseUp(e);			

		if (!this.touchable)
			this.touchEnd( new CFakeTouch(e.pageX, e.pageY, this.canvas) );
	},
	mouseDown:function(e)
	{
		var code;
		if (e.which)
		{
			switch (e.which)
			{
				case 2:
					code=CRunApp.VK_MBUTTON;
					break;
				case 3:
					code=CRunApp.VK_RBUTTON;
					break;
				default:
					code=CRunApp.VK_LBUTTON;
					break;
			}
		}
		else
		{
			switch (e.button)
			{
				case 2:
					code=CRunApp.VK_RBUTTON;
					break;
				case 4:
					code=CRunApp.VK_MBUTTON;
					break;
				default:
					code=CRunApp.VK_LBUTTON;
					break;
			}
		}
		this.mouseMove(e, this.canvas);
		this.bMouseIn=true;
		this.keyNew=true;
		this.keyBuffer[code]=true;
		if (this.run!=null && this.run.rhEvtProg!=null)
		   	this.run.rhEvtProg.onMouseButton(code-CRunApp.VK_LBUTTON, 1);
		var n;	
		for (n=0; n<this.subApps.length; n++)
			this.subApps[n].mouseDown(e);
		
		if (!this.touchable)
			this.touchStart( new CFakeTouch(e.pageX, e.pageY, this.canvas) );
	},
	mouseOut:function(e)
	{
		this.bMouseIn=false;
		this.keyBuffer[CRunApp.VK_LBUTTON]=0;
		this.keyBuffer[CRunApp.VK_MBUTTON]=0;
		this.keyBuffer[CRunApp.VK_RBUTTON]=0;
		var n;	
		for (n=0; n<this.subApps.length; n++)
			this.subApps[n].mouseOut(e);		
		if (!this.touchable)
			this.touchEnd( new CFakeTouch(e.pageX, e.pageY, this.canvas) );				
	},
	click:function(e)
	{
//		if (this.run!=null && this.run.rhEvtProg!=null)
//		   	this.run.rhEvtProg.onMouseButton(0, 1);
		var n;	
		for (n=0; n<this.subApps.length; n++)
			this.subApps[n].click(e);			
	},
	dblClick:function(e)
	{
		if (this.run!=null && this.run.rhEvtProg!=null)
		   	this.run.rhEvtProg.onMouseButton(0, 2);
		var n;	
		for (n=0; n<this.subApps.length; n++)
			this.subApps[n].dblClick(e);			
	},
	mouseWheel:function(e)
	{
		this.bMouseIn=true;
		if ((typeof e.wheelDelta!='undefined'))
    		this.deltaWheel=e.wheelDelta/40;
    	else
    		this.deltaWheel=-e.detail;
		if (this.run!=null && this.run.rhEvtProg!=null)
			this.run.onMouseWheel(this.deltaWheel);
	},
	
	touchStart:function(event)
	{
		var bOnlyOnce=true;
		var n, m;
		for (n = 0; n < event.changedTouches.length; n++) 
		{
    		var touch = event.changedTouches[n];
    		
    		for (m=0; m<CRunApp.MAX_TOUCHES; m++)
    		{
    			if (this.touchesID[m]==0)			
    			{
    				this.touchesID[m]=touch.identifier;
    				this.bTouchesLocked[m]=false;
    				
		    		for (o=0; o<this.touchCalls.size(); o++)
		    		{
    					if (this.touchCalls.get(o).touchStarted(touch))
    					{
    						this.bTouchesLocked[m]=true;
    						this.touchesLocked[m]=o;
    						break;
    					}
    				}
    				
    				if (!this.bTouchesLocked[m])
    				{
						this.touchesX[m]=this.getTouchX(touch);
						this.touchesY[m]=this.getTouchY(touch);
					}
    				break;
    			}
    		}
    		if (touch.identifier!=CRunApp.FAKE_TOUCHIDENTIFER)
    		{
    			if (bOnlyOnce)    			
    			{
    				bOnlyOnce=false;
	    			this.touchToMouse();
					this.bMouseIn=true;
					this.keyNew=true;
					this.keyBuffer[CRunApp.VK_LBUTTON]=true;
					if (this.run!=null && this.run.rhEvtProg!=null)
					   	this.run.rhEvtProg.onMouseButton(0, 1);
					var n;	
					for (n=0; n<this.subApps.length; n++)
						this.subApps[n].mouseDown(e);
				}						
			}    			
   		}	
	},
	touchMove:function(event)
	{
		var bOnlyOnce=true;
		var n, m, o;
		for (n = 0; n < event.changedTouches.length; n++) 
		{
    		var touch = event.changedTouches[n];

    		for (m=0; m<CRunApp.MAX_TOUCHES; m++)
    		{    		
    			if (this.touchesID[m]==touch.identifier)
    			{
    				if (this.bTouchesLocked[m])
    				{
    					for (o=0; o<this.touchCalls.size(); o++)
    					{
    						if (o==this.touchesLocked[m])
    						{
		    					this.touchCalls.get(o).touchMoved(touch);
		    					break;
		    				}
		    			}
					}
					else
					{
    					for (o=0; o<this.touchCalls.size(); o++)
		    					this.touchCalls.get(o).touchMoved(touch);
						this.touchesX[m]=this.getTouchX(touch);
						this.touchesY[m]=this.getTouchY(touch);
					}
    				break;
				}
    		}
    		if (touch.identifier!=CRunApp.FAKE_TOUCHIDENTIFER)
    		{
    			if (bOnlyOnce)
    			{
    				bOnlyOnce=false;
	    			this.touchToMouse();
					if (this.run!=null && this.run.rhEvtProg!=null)
					    this.run.rhEvtProg.onMouseMove();						    
					var n;	
					for (n=0; n<this.subApps.length; n++)
						this.subApps[n].mouseMove(e, obj);
				}
			}			
   		}	
	},
	touchEnd:function(event)
	{
		var bOnlyOnce=true;
		var n, m, o;
		for (n = 0; n < event.changedTouches.length; n++) 
		{
    		var touch = event.changedTouches[n];

    		for (m=0; m<CRunApp.MAX_TOUCHES; m++)
    		{
    			if (this.touchesID[m]==touch.identifier)
    			{
    				this.touchesID[m]=0;

    				if (this.bTouchesLocked[m])
    				{
    					for (o=0; o<this.touchCalls.size(); o++)
    					{
    						if (o==this.touchesLocked[m])
    						{
		    					this.touchCalls.get(o).touchEnded(touch);
		    					break;
		    				}
		    			}
					}
					else
					{
    					for (o=0; o<this.touchCalls.size(); o++)
		    					this.touchCalls.get(o).touchEnded(touch);
					}
    			}
    		}
    		if (touch.identifier!=CRunApp.FAKE_TOUCHIDENTIFER)
    		{
    			if (bOnlyOnce)
    			{
    				bOnlyOnce=false;
					this.keyBuffer[CRunApp.VK_LBUTTON]=false;
					var n;	
					for (n=0; n<this.subApps.length; n++)
						this.subApps[n].mouseUp(e);						    		
				}
			}
    	}
	},

	touchToMouse:function()
	{
		var n;
		for (n=0; n<CRunApp.MAX_TOUCHES; n++)
		{
			if (this.touchesID[n]!=0)
			{
				this.mouseX=this.touchesX[n];
				this.mouseY=this.touchesY[n];
				break;
			}
		}
	},
	
	getTouchX:function(touch)
	{
    	var x=touch.pageX;
    	var objParent=touch.target;
    	while (objParent && objParent.tagName != 'BODY') 
    	{
        	x -= objParent.offsetLeft;
        	objParent = objParent.offsetParent;
    	}
    	return x-this.xMouseOffset;    	
	},

	getTouchY:function(touch)
	{
    	var y=touch.pageY;
    	var objParent=touch.target;
    	while (objParent && objParent.tagName != 'BODY') 
    	{
        	y -= objParent.offsetTop;
        	objParent = objParent.offsetParent;
    	}    	
  		return y-this.yMouseOffset;
	},

	addTouchCall:function(object)
	{
		this.touchCalls.add(object);
	},
	
	removeTouchCall:function(object)
	{
		this.touchCalls.removeObject(object);
	},
	
	// Embedded files
	// ----------------
    getEmbeddedFile:function(path)
    {
        if (this.embeddedFiles != null)
        {
	        var n;
	    	var pos=path.lastIndexOf("\\");
	        if (pos < 0)
	            pos = path.lastIndexOf('/');
			if (pos>=0)
				path=path.substring(pos+1);
        
            for (n = 0; n < this.embeddedFiles.length; n++)
            {
                if (this.embeddedFiles[n].path==path)
                {
                    return this.embeddedFiles[n];
                }
            }
        }
        return null;
    },
    
	showCursor:function(count)
	{
		this.cursorCount=count;
		if (this.cursorCount>=0)
			this.canvas.style.cursor="auto";
		else
			this.canvas.style.cursor="none";
	},
	
	// Full screen
	// ----------------------------------
	enterFullScreen:function() 
	{
        if (this.canvas.requestFullScreen) 
        	this.canvas.requestFullScreen();
        else if (this.canvas.webkitRequestFullScreen) 
            this.canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        else if(this.canvas.mozRequestFullScreen)
            this.canvas.mozRequestFullScreen();
   },
   
   exitFullScreen:function()
   {
       	if (document.cancelFullScreen) 
          	document.cancelFullScreen();
        else if (document.webkitCancelFullScreen) 
        	document.webkitCancelFullScreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
   },
	   
	startJoystick:function(type, flags)
	{
        if (this.joystick == null)
        {
            this.joystick = new CJoystick(this);
            this.joystick.loadImages();
            this.joystick.reset(flags);
			this.joystickOn=1;
			if (this.touchCalls.indexOf(this.joystick)<0)
			{
				this.touchCalls.add(this.joystick);
			}
		}
	},
	startAccJoystick:function()
	{
		this.startAccelerometer();
		this.joystickOn=2;
	},
	endJoystick:function()
	{
		if (this.joystick!=null)
		{
			if (this.joystickOn==1)
			{
				this.touchCall.removeIndex(this.joystick);
			}
			this.joystick=null;
		}
		if (this.joystickOn==2)
			this.endAccelerometer();
		this.joystickOn=0;
	},	
	startAccelerometer:function()
	{
		if (this.accelerometer==0)
		{
	        var that=this;
	        if(window.DeviceMotionEvent)
	        {
		        window.ondevicemotion=function(event)
	        	{
	        		that.accX = event.acceleration.y/9.780318;
	    			that.accY = event.acceleration.x/9.780318;
	    			that.accZ = event.acceleration.z/9.780318;
	        		that.accGravX = event.accelerationIncludingGravity.y/9.780318;
	    			that.accGravY = event.accelerationIncludingGravity.x/9.780318;
	    			that.accGravZ = event.accelerationIncludingGravity.z/9.780318;
	        	};
			}        
		}
		this.accelerometer++;		
	},
	endAccelerometer:function()
	{
		this.accelerometer--;
		if (this.accelerometer<=0)
		{
			window.ondevicemotion=null;
			this.accelerometer=0;
		}
	},
	getJoystick:function()
	{
		var joystick=0;
		if (this.accGravX<-0.2)
			joystick|=0x04;
        if (this.accGravX>0.2)
            joystick |= 0x08;
        if (this.accGravY< -0.2)
            joystick |= 0x01;
        if (this.accGravY> 0.2)
            joystick |= 0x02;
        return joystick;
	}	
}

function CFakeTouch(x, y, t)
{
	this.changedTouches=new Array(1);
	this.changedTouches[0]={pageX:x, pageY:y, target:t, identifier:CRunApp.FAKE_TOUCHIDENTIFIER};
}

// CRunFrame object
// ----------------------------------------------------------------
CRunFrame.LEF_DISPLAYNAME=0x0001;
CRunFrame.LEF_GRABDESKTOP=0x0002;
CRunFrame.LEF_KEEPDISPLAY=0x0004;
CRunFrame.LEF_TOTALCOLMASK=0x0020;
CRunFrame.LEF_RESIZEATSTART=0x0100;
CRunFrame.LEF_NOSURFACE=0x0800;
CRunFrame.LEF_TIMEDMVTS=0x8000;
CRunFrame.CM_TEST_OBSTACLE=0;
CRunFrame.CM_TEST_PLATFORM=1;
CRunFrame.CM_OBSTACLE=0x0001;
CRunFrame.CM_PLATFORM=0x0002;
CRunFrame.HEIGHT_PLATFORM=6;
CRunFrame.HTML5FOPT_DISPLAYPRELOADER=0x0100;
CRunFrame.IPHONEOPT_JOYSTICK_FIRE1 = 0x0001;
CRunFrame.IPHONEOPT_JOYSTICK_FIRE2 = 0x0002;
CRunFrame.IPHONEOPT_JOYSTICK_LEFTHAND = 0x0004;
CRunFrame.JOYSTICK_NONE = 0x0000;
CRunFrame.JOYSTICK_TOUCH = 0x0001;
CRunFrame.JOYSTICK_ACCELEROMETER = 0x0002;
CRunFrame.JOYSTICK_EXT = 0x0003;
function CRunFrame(a)
{
	this.app=a;
	this.rhPtr=null;

	this.leWidth=0;		
	this.leHeight=0;	
	this.leBackground=0;
	this.leFlags=0;

	this.leVirtualRect=null;
	this.leEditWinWidth=0;
	this.leEditWinHeight=0;
	this.frameName=null;
	this.nLayers=0;
	this.layers=null;
	this.LOList=null;
	this.evtProg=null;
	this.maxObjects=0;

	this.leX=0;
	this.leY=0;
	this.leLastScrlX=0;
	this.leLastScrlY=0;

	this.startLeX=0;
	this.startLeY=0;
	this.m_wRandomSeed=0;
	this.m_dwMvtTimerBase=0;
    this.mosaicHandles= null;
    this.mosaicX= null;
    this.mosaicY= null;
    this.mosaicMaxHandle=0;
	this.fadeIn=null;
	this.fadeOut=null;
	this.joystick=0;
	this.html5Options=0;
}
CRunFrame.prototype=
{
	loadFullFrame:function(index)
	{
		// Positionne le fichier
		this.app.file.seek(this.app.frameOffsets[index]);

		// Charge la frame
		this.evtProg=new CEventProgram();
		this.LOList=new CLOList();
		this.leVirtualRect=new CRect();

		var chID=0, chFlags, chSize;
		var posEnd;
		var nOldFrameWidth=0;
		var nOldFrameHeight=0;
		this.m_wRandomSeed=-1;
		while (chID!=0x7F7F)
		{
			chID=this.app.file.readAShort();
			chFlags=this.app.file.readAShort();
			chSize = this.app.file.readAInt();
			if (chSize==0)
			{
				continue;
			}
			this.posEnd=this.app.file.getFilePointer()+chSize;
			switch(chID)
			{
			case 0x3334:
				this.loadHeader();
				if ( this.app.parentApp!=null && (this.app.parentOptions & CCCA.CCAF_DOCKED) != 0 )
				{
					this.leEditWinWidth = this.app.cx;
					this.leEditWinHeight = this.app.cy;
				}
				else
				{
					this.leEditWinWidth=Math.min(this.app.gaCxWin, this.leWidth);
					this.leEditWinHeight=Math.min(this.app.gaCyWin, this.leHeight);
				}
				break;
	    
            // CHUNK_MOSAICIMAGETABLE
            case 0x3348:
                var number = chSize / (3 * 2);
                this.mosaicHandles = new Array(number);
                this.mosaicX = new Array(number);
                this.mosaicY = new Array(number);
                this.mosaicMaxHandle = 0;
                var n;
                for (n = 0; n < number; n++)
                {
                    this.mosaicHandles[n] = this.app.file.readAShort();
                    this.mosaicMaxHandle = Math.max(this.mosaicMaxHandle, this.mosaicHandles[n]);
                    this.mosaicX[n] = this.app.file.readAShort();
                    this.mosaicY[n] = this.app.file.readAShort();
                }
                this.mosaicMaxHandle++;
                break;

			// CHUNK_FRAME_HTML5_OPTIONS
			case 0x334A:
				this.joystick=this.app.file.readAShort();
				this.html5Options=this.app.file.readAShort();
				break;
				
			case 0x3342:
				this.leVirtualRect.load(this.app.file);
				break;

			case 0x3344:
				this.m_wRandomSeed=this.app.file.readAShort();
				break;
                
            case 0x3347:
                this.m_dwMvtTimerBase=this.app.file.readAInt();
                break;
	    
			case 0x3335:
				this.frameName=this.app.file.readAString();
				break;
	    
            // CHUNK_FRAMEFADEIN
            case 0x333B:
                this.fadeIn = new CTransitionData();
                this.fadeIn.load(this.app.file);
                break;

            // CHUNK_FRAMEFADEOUT
            case 0x333C:
                this.fadeOut = new CTransitionData();
                this.fadeOut.load(this.app.file);
                break;

			case 0x3341:
				this.loadLayers();
				break;

			case 0x3345:
				this.loadLayerEffects();
				break;
			
			case 0x3338:
				this.LOList.load(this.app);
				break;
	    
			case 0x333D:
				this.evtProg.load(this.app);
				this.maxObjects=this.evtProg.maxObjects;
				break;
			}
			// Positionne a la fin du chunk
			this.app.file.seek(this.posEnd);
		}
	
		this.app.OIList.resetToLoad();
		var n;
		for (n=0; n<this.LOList.nIndex; n++)
		{
			var loTemp=this.LOList.getLOFromIndex(n);
			this.app.OIList.setToLoad(loTemp.loOiHandle);
		}

		this.app.imageBank.resetToLoad();
		this.app.fontBank.resetToLoad();
		this.app.OIList.load(this.app.file);
		this.app.OIList.enumElements(this.app.imageBank, this.app.fontBank);
		this.app.imageBank.load(this.app.file);
		this.app.fontBank.load(this.app.file);
		this.evtProg.enumSounds(this.app.soundBank);
		this.app.soundBank.load();

		this.app.OIList.resetOICurrent();
		for (n=0; n<this.LOList.nIndex; n++)
		{
			var lo=this.LOList.list[n];
			if (lo.loType>=COI.OBJ_SPR)
			{
				this.app.OIList.setOICurrent(lo.loOiHandle);
			}
		}
	},

	loadLayers:function()
	{
		this.nLayers=this.app.file.readAInt();
		this.layers=new Array(this.nLayers);

		var n;
		for (n=0; n<this.nLayers; n++)
		{
			this.layers[n]=new CLayer(this.app);
			this.layers[n].load(this.app.file);
		}
	},
	
	loadLayerEffects:function()
	{
		var l;
		for (l=0; l<this.nLayers; l++)
		{
			this.layers[l].effect=this.app.file.readAInt();
			this.layers[l].effectParam=this.app.file.readAInt();
			this.app.file.skipBytes(12);				
		}
	},

	loadHeader:function()
	{
		this.leWidth=this.app.file.readAInt();
		this.leHeight=this.app.file.readAInt();
		this.leBackground=this.app.file.readAColor();
		this.leFlags=this.app.file.readAInt();
	}	
}

// CSoundPlayer object
// ----------------------------------------------------------------
CSoundPlayer.NCHANNELS=32;
function CSoundPlayer(a)
{
    this.app=a;
    this.channels=null;
    this.bMultipleSounds = false;
    this.bOn = true;
    this.volumes=null;
    this.bLocked=null;
    this.pans=null;
    this.mainVolume=0;
    this.mainPan=0;
    
    this.channels = new Array(CSoundPlayer.NCHANNELS);
    this.volumes = new Array(CSoundPlayer.NCHANNELS);
    this.bLocked = new Array(CSoundPlayer.NCHANNELS);
    this.bOn = true;
    this.bMultipleSounds = true;
    var n;
    for (n = 0; n < CSoundPlayer.NCHANNELS; n++)
    {
        this.channels[n] = null;
        this.volumes[n] = 100;
        this.bLocked[n]=false;
    }
    this.mainVolume = 100;
    this.mainPan = 0;
    
    var sound=new Audio();
    var canPlay=new Array(4);
  	canPlay[0]=sound.canPlayType('audio/ogg');
  	canPlay[1]=sound.canPlayType('audio/aac'); 
  	canPlay[2]=sound.canPlayType('audio/mpeg'); 
  	canPlay[3]=sound.canPlayType('audio/wav');
  	this.playableFormats=0;
  	for (n=0; n<4; n++)
  	{
  		if (canPlay[n]=='probably')
  			this.playableFormats|=(1<<n);
  	}
  	if (this.playableFormats==0)
  	{
	  	for (n=0; n<4; n++)
	  	{
	  		if (canPlay[n]=='maybe')
	  			this.playableFormats|=(1<<n);
	  	}
	}
}
CSoundPlayer.prototype=
{
    reset:function()
    {
        var n;
        for (n = 0; n < CSoundPlayer.NCHANNELS; n++)
        {
            this.bLocked[n] = false;
        }
    },
    lockChannel:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            this.bLocked[channel] = true;
        }
    },
    unlockChannel:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            this.bLocked[channel] = false;
        }
    },
    
    play:function(handle, nLoops, channel, bPrio)
    {
        var n;
    	
        if (this.bOn == false)
	        return;
    	
        var sound = this.app.soundBank.getSoundFromHandle(handle);
        if (sound == null)
	        return;
        if (this.bMultipleSounds == false)
            channel = 0;
/*      	else
        {
            for (n = 0; n < CSoundPlayer.NCHANNELS; n++)
            {
                if (this.channels[n] == sound)
                {
                	sound=sound.createFromSound();
                    break;
                }
            }
        }
*/   	
        if (channel < 0)
        {
	        for (n = 0; n < CSoundPlayer.NCHANNELS; n++)
	        {
		        if (this.channels[n] == null && this.bLocked[n]==false)
		        {
			        break;
		        }
	        }
	        if (n == CSoundPlayer.NCHANNELS)
	        {
		        for (n = 0; n < CSoundPlayer.NCHANNELS; n++)
		        {
			        if (this.bLocked[n]==false)
			        {
				        if (this.channels[n] != null)
				        {
					        if (this.channels[n].bUninterruptible == false)
					        {
                                break;
					        }
				        }
			        }
		        }
	        }
	        channel = n;
	        if (channel>=0 && channel< CSoundPlayer.NCHANNELS)
	        {
		        this.volumes[channel]=this.mainVolume;
	        }
        }
        if (channel < 0 || channel >= CSoundPlayer.NCHANNELS)
	        return;

        if (this.channels[channel] != null)
        {
	        if (this.channels[channel].bUninterruptible == true)
		        return;
            if (this.channels[channel] != sound)
            {
                this.channels[channel].stop();
                this.channels[channel]=null;
            }
        }
	    for (n = 0; n < CSoundPlayer.NCHANNELS; n++)
	    {
	    	if (this.channels[n]==sound)
	    	{
                this.channels[n].stop();
                this.channels[n]=null;
	    	}
	    }
        this.channels[channel] = sound;
        sound.play(nLoops, bPrio, this.volumes[channel]);
    },

    setMultipleSounds:function(bMultiple)
    {
        this.bMultipleSounds = bMultiple;
    },
    
    keepCurrentSounds:function()
    {
        var n;
        for (n = 0; n < CSoundPlayer.NCHANNELS; n++)
        {
            if (this.channels[n] != null)
            {
                if (this.channels[n].isPlaying())
                {
                    this.app.soundBank.setToLoad(this.channels[n].handle);
                }
            }
        }
    },
    
    setOnOff:function(bState)
    {
        if (bState != bOn)
        {
            this.bOn = bState;
            if (this.bOn == false)
                this.stopAllSounds();
        }
    },

    getOnOff:function()
    {
        return this.bOn;
    },

    stopAllSounds:function()
    {
        var n;
        for (n = 0; n < CSoundPlayer.NCHANNELS; n++)
        {
            if (this.channels[n] != null)
            {
                this.channels[n].stop();
                this.channels[n] = null;
            }
        }
    },
    
    stopSample:function(handle)
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].handle == handle)
                {
                    this.channels[c].stop();
                    this.channels[c] = null;
                }
            }
        }
    },
    
    stopChannel:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                this.channels[channel].stop();
                this.channels[channel] = null;
            }
        }
    },
    
    isSamplePaused:function(handle)
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].handle == handle)
                {
                    return this.channels[c].isPaused();
                }
            }
        }
        return false;
    },
    
    isSoundPlaying:function()
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].isPlaying())
                	return true;
            }
        }
        return false;
    },
    
    isSamplePlaying:function(handle)
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].handle == handle)
                {
                    return this.channels[c].isPlaying();
                }
            }
        }
        return false;
    },
    
    isChannelPlaying:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                return this.channels[channel].isPlaying();
            }
        }
        return false;
    },
    
    isChannelPaused:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                return this.channels[channel].isPaused();
            }
        }
        return false;
    },
    
    pause:function()
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                this.channels[c].pause();
            }
        }
    },
    
    pauseChannel:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                this.channels[channel].pause();
            }
        }
    },
    
    pauseSample:function(handle)
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].handle == handle)
                {
                    this.channels[c].pause();
                }
            }
        }
    },
    
    resume:function()
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                this.channels[c].resume();
            }
        }
    },
    
    resumeChannel:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                this.channels[channel].resume();
            }
        }
    },
    
    resumeSample:function(handle)
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].handle == handle)
                {
                    this.channels[c].resume();
                }
            }
        }
   	},
   	
    setVolumeChannel:function(channel, volume)
    {
        if (volume<0) volume=0;
        if (volume > 100) volume = 100;

        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            this.volumes[channel] = volume;
            if (this.channels[channel] != null)
            {
                this.channels[channel].setVolume(volume);
            }
        }
    },
    
    setFrequencyChannel:function(channel, freq)
    {
        if (freq<0) freq=0;
        if (freq>100000) freq= 100000;

        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                this.channels[channel].setPitch(freq/42000);
            }
        }        
    },
    
    setFrequencySample:function(handle, freq)
    {
        if (freq<0) freq=0;
        if (freq>100000) freq= 100000;

        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].handle == handle)
                {
	                this.channels[c].setPitch(freq/42000);
                }
            }
        }
    },

    setPositionChannel:function(channel, pos)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                this.channels[channel].setPosition(pos);
            }
        }
    },
    
    setPositionSample:function(handle, pos)
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].handle == handle)
                {
	                this.channels[c].setPosition(pos);
                }
            }
        }
    },

    getVolumeChannel:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                return this.volumes[channel];
            }
        }
        return 0;
    },
    
    setVolumeSample:function(handle, volume)
    {
        if (volume < 0) volume = 0;
        if (volume > 100) volume = 100;

        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].handle == handle)
                {
                    this.volumes[c] = volume;
                    this.channels[c].setVolume(volume);
                }
            }
        }
    },
    
    setMainVolume:function(volume)
    {
        var n;
        this.mainVolume=volume;
        for (n = 0; n < CSoundPlayer.NCHANNELS; n++)
        {
        	this.volumes[n]=volume;
            if (this.channels[n] != null)
            {
            	this.channels[n].setVolume(volume);
            }
        }
    },
    
    getMainVolume:function()
    {
        return this.mainVolume;
    },

    getChannel:function(name)
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
	        if (this.channels[c] != null)
	        {
		        if (this.channels[c].name==name)
		        {
			        return c;
		        }
	        }
        }
        return -1;
    },

    getDurationChannel:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                return this.channels[channel].getDuration();
            }
        }
        return 0;
   	},
   	
    getPositionChannel:function(channel)
    {
        if (channel >= 0 && channel < CSoundPlayer.NCHANNELS)
        {
            if (this.channels[channel] != null)
            {
                return this.channels[channel].getPosition();
            }
        }
        return 0;
   	},
   	
    getVolumeSample:function(name)
    {
        var channel = this.getChannel(name);
        if (channel >= 0)
        {
            return this.volumes[channel];
        }
        return 0;
    },
    
    getDurationSample:function(name)
    {
        var channel = this.getChannel(name);
        if (channel >= 0)
        {
            return this.channels[channel].getDuration();
        }
        return 0;
    },
    
    getPositionSample:function(name)
    {
        var channel = this.getChannel(name);
        if (channel >= 0)
        {
            return this.channels[channel].getPosition();
        }
        return 0;
    },
    
    checkSounds:function()
    {
        var c;
        for (c = 0; c < CSoundPlayer.NCHANNELS; c++)
        {
            if (this.channels[c] != null)
            {
                if (this.channels[c].checkSound())
                {
                    this.channels[c] = null;
                }
            }
        }
    }
}   

// Embedded Files
// ------------------------------------------------------------
function CEmbeddedFile(a)
{
	this.app=a;	
}
CEmbeddedFile.prototype=
{
    preLoad:function()
    {
        var l=this.app.file.readAShort();
        this.path=this.app.file.readAString(l);
    	var pos=this.path.lastIndexOf("\\");
		if (pos>=0)
		{
			this.path=this.path.substring(pos+1);
		}			
        var length = this.app.file.readAInt();
        this.offset = this.app.file.getFilePointer();
        this.app.file.skipBytes(length);
    },
    open:function()
    {
    	return this.app.file.createFromFile(this.offset)
    }
}

// Preloader
// -------------------------------------------------------------
function CPreloader(a)
{
	this.app=a;
	this.isLoaded=false;
	if (this.app.preloaderType==0)			// TYPE_IMAGE
	{
		this.subApp=null;
		this.context=this.app.context;
		this.radius=this.app.preloaderCircleRadius;
		this.color=this.app.preloaderCircleColor;
		this.xCenter=this.app.preloaderCircleCenterX;
		if (this.xCenter<0)
			this.xCenter=this.app.gaCxWin/2;
		this.yCenter=this.app.preloaderCircleCenterY;
		if (this.yCenter<0)
			this.yCenter=this.app.gaCyWin/2;
		this.currentAngle=0;
		this.size=this.app.preloaderCircleThickness;
		
        this.image=new Image();
        var that=this;
        this.image.onload=function()
        {
        	that.isLoaded=true;
        }     
        this.image.src="Preloader.png";		
	}
	else
	{
        this.appSprite=new Sprite();
        this.appSprite.x=0;
        this.appSprite.y=0;
        this.subApp = new CRunApp(this.app.canvasName, this.app.file);
        this.subApp.setParentApp(this.app, this.app.preloaderFrameNumber, 0, this.appSprite, this.app.gaCxWin, this.app.gaCyWin);
		this.subApp.bPreloader=true;
		
        this.subApp.load();
        this.subApp.startApplication();
    	this.subApp.setMouseOffsets(0, 0);
        this.subApp.stepApplication();
	}
}
CPreloader.prototype=
{
	load:function()
	{
		if (this.subApp!=null)
		{
			if (this.subApp.imagesLoaded>=this.subApp.imagesToLoad)
			{
				this.isLoaded=true;
				this.subAppStopped=false;
			}
		}			
	},
	
	step:function()
	{
		if (this.subApp==null)
		{
			this.context.renderSimpleImage(this.image, this.xCenter-this.image.width/2, this.yCenter-this.image.height/2, this.image.width, this.image.height, 0, 0);
			
			var angle= this.app.imagesLoaded/this.app.imagesToLoad*2*Math.PI-Math.PI/2;
			var a;
			var x1, y1, x2, y2;
			if (this.currentAngle<angle)
			{
				for (a=this.currentAngle; a<=angle; a+=0.001)
				{
					x1=this.xCenter+Math.cos(a)*(this.radius-this.size);
					y1=this.yCenter-Math.sin(a)*(this.radius-this.size);
					x2=this.xCenter+Math.cos(a)*this.radius;
					y2=this.yCenter-Math.sin(a)*this.radius;
					this.context.renderLine(x1, y1, x2, y2, this.color, 1, 0, 0);	
	
					var n;
					for (n=0; n<3; n++)
					{
						x1=this.xCenter+Math.cos(a)*(this.radius-this.size-n);
						y1=this.yCenter-Math.sin(a)*(this.radius-this.size-n);
						x2=this.xCenter+Math.cos(a)*(this.radius-this.size-n-1);
						y2=this.yCenter-Math.sin(a)*(this.radius-this.size-n-1);
						this.context.renderLine(x1, y1, x2, y2, this.color, 1, 0, 0);
	
						x1=this.xCenter+Math.cos(a)*(this.radius+n);
						y1=this.yCenter-Math.sin(a)*(this.radius+n);
						x2=this.xCenter+Math.cos(a)*(this.radius+n+1);
						y2=this.yCenter-Math.sin(a)*(this.radius+n+1);
						this.context.renderLine(x1, y1, x2, y2, this.color, 1, 0, 0);
					}				
				}
				this.currentAngle=angle;
			}
		}
		else
		{
			if (!this.subAppStopped)
			{
	            if (this.subApp.stepApplication()==false)
	            	this.subAppStopped=true;
	            else
	            	this.subApp.drawSubApplication(this.context, 0, 0);
	        }
		}
	}
}

// Virtual joystick
// ----------------------------------------------------------------
CJoystick.KEY_JOYSTICK = 0;
CJoystick.KEY_FIRE1 = 1;
CJoystick.KEY_FIRE2 = 2;
CJoystick.KEY_NONE = -1;
CJoystick.MAX_TOUCHES = 3;
CJoystick.JFLAG_JOYSTICK = 0x0001;
CJoystick.JFLAG_FIRE1 = 0x0002;
CJoystick.JFLAG_FIRE2 = 0x0004;
CJoystick.JFLAG_LEFTHANDED = 0x0008;
CJoystick.JPOS_NOTDEFINED = 0x80000000;

function CJoystick(a)
{
    this.app=a;
    this.joyBack=null;
    this.joyFront=null;
    this.fire1U=null;
    this.fire2U=null;
    this.fire1D=null;
    this.fire2D=null;
    this.imagesX=new Array(3);
    this.imagesY=new Array(3);
    this.joystickX=0;
    this.joystickY=0;
    this.joystick=0;
    this.flags=0;
    this.touches = new Array(3);
    this.bSetPositions=false;
}
CJoystick.prototype=
{
	loadImages:function()
	{
		if (this.joyBack==null)
		{
	        this.joyBack=CImage.createFromFile(this.app, "joyback.png");
	        this.joyFront=CImage.createFromFile(this.app, "joyfront.png");
	        this.fire1U=CImage.createFromFile(this.app, "fire1U.png");
	        this.fire2U=CImage.createFromFile(this.app, "fire2U.png");
	        this.fire1D=CImage.createFromFile(this.app, "fire1D.png");
	        this.fire2D=CImage.createFromFile(this.app, "fire2D.png");
		}		
	},
	reset:function(f)
	{
		this.flags=f;
		if (this.joyBack!=null && this.joyBack.width!=0)
			this.setPositions();
		else
			this.bSetPositions=true;
	},
	setPositions:function()
	{
        var sx, sy;
        sx=this.app.gaCxWin;
        sy=this.app.gaCyWin;
        if ((this.flags&CJoystick.JFLAG_LEFTHANDED)==0)
        {
	        if ((this.flags&CJoystick.JFLAG_JOYSTICK)!=0)
	        {
		        this.imagesX[CJoystick.KEY_JOYSTICK]=16+this.joyBack.width/2;
		        this.imagesY[CJoystick.KEY_JOYSTICK]=sy-16-this.joyBack.height/2;
	        }
	        if ((this.flags&CJoystick.JFLAG_FIRE1)!=0 && (this.flags&CJoystick.JFLAG_FIRE2)!=0)
	        {
		        this.imagesX[CJoystick.KEY_FIRE1]=sx-this.fire1U.width/2-32;
		        this.imagesY[CJoystick.KEY_FIRE1]=sy-this.fire1U.height/2-16;
		        this.imagesX[CJoystick.KEY_FIRE2]=sx-this.fire2U.width/2-16;
		        this.imagesY[CJoystick.KEY_FIRE2]=sy-this.fire2U.height/2-this.fire1U.height-24;
	        }
	        else if ((this.flags&CJoystick.JFLAG_FIRE1)!=0)
	        {
		        this.imagesX[CJoystick.KEY_FIRE1]=sx-this.fire1U.width/2-16;
		        this.imagesY[CJoystick.KEY_FIRE1]=sy-this.fire1U.height/2-16;
	        }
	        else if ((this.flags&CJoystick.JFLAG_FIRE2)!=0)
	        {
		        this.imagesX[CJoystick.KEY_FIRE2]=sx-this.fire2U.width/2-16;
		        this.imagesY[CJoystick.KEY_FIRE2]=sy-this.fire2U.height/2-16;
	        }
        }
        else
        {
	        if ((this.flags&CJoystick.JFLAG_JOYSTICK)!=0)
	        {
		        this.imagesX[CJoystick.KEY_JOYSTICK]=sx-16-this.joyBack.width/2;
		        this.imagesY[CJoystick.KEY_JOYSTICK]=sy-16-this.joyBack.height/2;
	        }
	        if ((this.flags&CJoystick.JFLAG_FIRE1)!=0 && (this.flags&CJoystick.JFLAG_FIRE2)!=0)
	        {
		        this.imagesX[CJoystick.KEY_FIRE1]=this.fire1U.width/2+16+this.fire2U.width*2/3;
		        this.imagesY[CJoystick.KEY_FIRE1]=sy-this.fire1U.height/2-16;
		        this.imagesX[CJoystick.KEY_FIRE2]=this.fire2U.width/2+16;
		        this.imagesY[CJoystick.KEY_FIRE2]=sy-this.fire2U.height/2-this.fire1U.height-24;
	        }
	        else if ((this.flags&CJoystick.JFLAG_FIRE1)!=0)
	        {
		        this.imagesX[CJoystick.KEY_FIRE1]=this.fire1U.width/2+16;
		        this.imagesY[CJoystick.KEY_FIRE1]=sy-this.fire1U.height/2-16;
	        }
	        else if ((this.flags&CJoystick.JFLAG_FIRE2)!=0)
	        {
		        this.imagesX[CJoystick.KEY_FIRE2]=this.fire2U.width/2+16;
		        this.imagesY[CJoystick.KEY_FIRE2]=sy-this.fire2U.height/2-16;
	        }
        }
	},
    setXPosition:function(f, p)
    {
        if ((f&CJoystick.JFLAG_JOYSTICK)!=0)
        {
	        this.imagesX[CJoystick.KEY_JOYSTICK]=p;
        }
        else if ((f&CJoystick.JFLAG_FIRE1)!=0)
        {
	        this.imagesX[CJoystick.KEY_FIRE1]=p;
        }
        else if ((f&CJoystick.JFLAG_FIRE2)!=0)
        {
	        this.imagesX[CJoystick.KEY_FIRE2]=p;
        }
    },
    setYPosition:function(f, p)
    {
        if ((f&CJoystick.JFLAG_JOYSTICK)!=0)
        {
	        this.imagesY[CJoystick.KEY_JOYSTICK]=p;
        }
        else if ((f&CJoystick.JFLAG_FIRE1)!=0)
        {
	        this.imagesY[CJoystick.KEY_FIRE1]=p;
        }
        else if ((f&CJoystick.JFLAG_FIRE2)!=0)
        {
	        this.imagesY[CJoystick.KEY_FIRE2]=p;
        }
    },
    draw:function(context)
    {
    	if (this.bSetPositions)
    	{
    		this.bSetPositions=false;
    		this.setPositions();
    	}
    	
    	var x, y, width, height;
        if ((this.flags&CJoystick.JFLAG_JOYSTICK)!=0)
        {		
            x=this.imagesX[CJoystick.KEY_JOYSTICK]-this.joyBack.width/2;
            y=this.imagesY[CJoystick.KEY_JOYSTICK]-this.joyBack.height/2;
            context.renderImage(this.joyBack, x, y, 0, 1, 1, 0, 0);
            x=this.imagesX[CJoystick.KEY_JOYSTICK]+this.joystickX-this.joyFront.width/2;
            y=this.imagesY[CJoystick.KEY_JOYSTICK]+this.joystickY-this.joyFront.height/2;
            context.renderImage(this.joyFront, x, y, 0, 1, 1, 0, 0);
        }
        if ((this.flags&CJoystick.JFLAG_FIRE1)!=0)
        {
            var tex=((this.joystick&0x10)==0) ? this.fire1U : this.fire1D;
            x=this.imagesX[CJoystick.KEY_FIRE1]-tex.width/2;
            y=this.imagesY[CJoystick.KEY_FIRE1]-tex.height/2;
            context.renderImage(tex, x, y, 0, 1, 1, 0, 0);
        }
        if ((this.flags&CJoystick.JFLAG_FIRE2)!=0)
        {
            var tex=((this.joystick&0x20)==0) ? this.fire2U : this.fire2D;
            x=this.imagesX[CJoystick.KEY_FIRE2]-tex.width/2;
            y=this.imagesY[CJoystick.KEY_FIRE2]-tex.height/2;
            context.renderImage(tex, x, y, 0, 1, 1, 0, 0);
        }
    },
   
    touchStarted:function(touch)
    {
        var bFlag=false;
        var x=this.app.getTouchX(touch);
        var y=this.app.getTouchY(touch);
        var key=this.getKey(x, y);
        if (key!=CJoystick.KEY_NONE)
        {
	        this.touches[key]=touch.identifier;
	        if (key==CJoystick.KEY_JOYSTICK)
	        {
		        this.joystick&=0xF0;
		        bFlag=true;
	        }		
	        if (key==CJoystick.KEY_FIRE1)
	        {
		        this.joystick|=0x10;
		        bFlag=true;
	        }
	        else if (key==CJoystick.KEY_FIRE2)
	        {
		        this.joystick|=0x20;
		        bFlag=true;
	        }
        }
        return bFlag;
    },

    touchMoved:function(touch)
    {
        var x=this.app.getTouchX(touch);
        var y=this.app.getTouchY(touch);
        var key=this.getKey(x, y);
        if (touch.identifier==this.touches[CJoystick.KEY_JOYSTICK])
        {
	        this.joystickX=x-this.imagesX[CJoystick.KEY_JOYSTICK];
	        this.joystickY=y-this.imagesY[CJoystick.KEY_JOYSTICK];
	        if (this.joystickX<-this.joyBack.width/4)
	        {
		        this.joystickX=-this.joyBack.width/4;
	        }
	        if (this.joystickX>this.joyBack.width/4)
	        {
		        this.joystickX=this.joyBack.width/4;
	        }
	        if (this.joystickY<-this.joyBack.height/4)
	        {
		        this.joystickY=-this.joyBack.height/4;
	        }
	        if (this.joystickY>this.joyBack.height/4)
	        {
		        this.joystickY=this.joyBack.height/4;
	        }

	        this.joystick&=0xF0;
	        var h=Math.sqrt(this.joystickX*this.joystickX+this.joystickY*this.joystickY);
	        if (h>=this.joyBack.width/4)
	        {
		        var angle=Math.atan2(-this.joystickY, this.joystickX);
		        var j=0;
		        if (angle>=0.0)
		        {
			        if (angle<Math.PI/8)
				        j=8;
			        else if (angle<(Math.PI/8)*3)
				        j=9;
			        else if (angle<(Math.PI/8)*5)
				        j=1;
			        else if (angle<(Math.PI/8)*7)
				        j=5;
			        else 
				        j=4;					
		        }
		        else
		        {
			        if (angle>-Math.PI/8)
				        j=8;
			        else if (angle>-(Math.PI/8)*3)
				        j=0xA;
			        else if (angle>-(Math.PI/8)*5)
				        j=2;
			        else if (angle>-(Math.PI/8)*7)
				        j=6;
			        else
				        j=4;
		        }
		        this.joystick|=j;
	        }
        }
    },

    touchEnded:function(touch)
    {
        var n;
        for (n=0; n<CJoystick.MAX_TOUCHES; n++)
        {
	        if (this.touches[n]==touch.identifier)
	        {
		        this.touches[n]=0;
		        switch (n)
		        {
			        case CJoystick.KEY_JOYSTICK:
				        this.joystickX=0;
				        this.joystickY=0;
				        this.joystick&=0xF0;
				        break;
			        case CJoystick.KEY_FIRE1:
				        this.joystick&=~0x10;
				        break;
			        case CJoystick.KEY_FIRE2:
				        this.joystick&=~0x20;
				        break;
		        }
		        break;
	        }
        }	
    },
    getKey:function(x, y)
    {	
        if ((this.flags&CJoystick.JFLAG_JOYSTICK)!=0)
        {
	        if (x>=this.imagesX[CJoystick.KEY_JOYSTICK]-this.joyBack.width/2 && x<this.imagesX[CJoystick.KEY_JOYSTICK]+this.joyBack.width/2)
	        {
		        if (y>this.imagesY[CJoystick.KEY_JOYSTICK]-this.joyBack.height/2 && y<this.imagesY[CJoystick.KEY_JOYSTICK]+this.joyBack.height/2)
		        {
			        return CJoystick.KEY_JOYSTICK;
		        }
	        }
        }
        if ((this.flags&CJoystick.JFLAG_FIRE1)!=0)
        {
	        if (x>=this.imagesX[CJoystick.KEY_FIRE1]-this.fire1U.width/2 && x<this.imagesX[CJoystick.KEY_FIRE1]+this.fire1U.width/2)
	        {
		        if (y>this.imagesY[CJoystick.KEY_FIRE1]-this.fire1U.height/2 && y<this.imagesY[CJoystick.KEY_FIRE1]+this.fire1U.height/2)
		        {
			        return CJoystick.KEY_FIRE1;
		        }
	        }
        }
        if ((this.flags&CJoystick.JFLAG_FIRE2)!=0)
        {
	        if (x>=this.imagesX[CJoystick.KEY_FIRE2]-this.fire2U.width/2 && x<this.imagesX[CJoystick.KEY_FIRE2]+this.fire2U.width/2)
	        {
		        if (y>this.imagesY[CJoystick.KEY_FIRE2]-this.fire2U.height/2 && y<this.imagesY[CJoystick.KEY_FIRE2]+this.fire2U.height/2)
		        {
			        return CJoystick.KEY_FIRE2;
		        }
	        }
        }
        return CJoystick.KEY_NONE;
    },

    getJoystick:function()
    {
        return this.joystick;
    }
}

