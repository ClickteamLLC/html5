
// COI Object
// -------------------------------------------------------------
COI.OILF_OCLOADED=0x0001;
COI.OILF_ELTLOADED=0x0002;
COI.OILF_TOLOAD=0x0004;
COI.OILF_TODELETE=0x0008;
COI.OILF_CURFRAME=0x0010;
COI.OILF_TORELOAD=0x0020;
COI.OILF_IGNORELOADONCALL=0x0040;
COI.OIF_LOADONCALL=0x0001;
COI.OIF_DISCARDABLE=0x0002;
COI.OIF_GLOBAL=0x0004;
COI.NUMBEROF_SYSTEMTYPES=7;
COI.OBJ_PLAYER=-7;
COI.OBJ_KEYBOARD=-6;
COI.OBJ_CREATE=-5;
COI.OBJ_TIMER=-4;
COI.OBJ_GAME=-3;
COI.OBJ_SPEAKER=-2;
COI.OBJ_SYSTEM=-1;
COI.OBJ_BOX=0;
COI.OBJ_BKD=1;
COI.OBJ_SPR=2;
COI.OBJ_TEXT=3;
COI.OBJ_QUEST=4;
COI.OBJ_SCORE=5;
COI.OBJ_LIVES=6;
COI.OBJ_COUNTER=7;
COI.OBJ_RTF=8;
COI.OBJ_CCA=9;
COI.NB_SYSOBJ=10;
COI.OBJ_PASTED=11;
COI.OBJ_LAST=10;
COI.KPX_BASE=32;
COI.OIFLAG_QUALIFIER=0x8000;
	    
function COI()
{
    this.oiHandle=0;
    this.oiType=0;
    this.oiFlags=0;			
    this.oiInkEffect=0;		
    this.oiInkEffectParam=0;
    this.oiName=null;
    this.oiOC=null;
    this.oiFileOffset=0;
    this.oiLoadFlags=0;
    this.oiLoadCount=0;
    this.oiCount=0;
}
COI.prototype=
{
    loadHeader:function(file)
    {
		this.oiHandle=file.readAShort();
		this.oiType=file.readAShort();
		this.oiFlags=file.readAShort();
		file.skipBytes(2);
		this.oiInkEffect=file.readAInt();
		this.oiInkEffectParam=file.readAInt();
    },
    load:function(file)
    {
		file.seek(this.oiFileOffset);
		
		switch (this.oiType)
		{
		    case 0:		
				this.oiOC=new COCQBackdrop();
				break;
		    case 1:
				this.oiOC=new COCBackground();
				break;
		    default:
				this.oiOC=new CObjectCommon();
				break;
		}			
		this.oiOC.load(file, this.oiType);
		this.oiLoadFlags=0;
    },
    unLoad:function()
    {
		this.oiOC=null;
    },
    enumElements:function(enumImages, enumFonts)
    {
		this.oiOC.enumElements(enumImages, enumFonts);
    }
}

// COIList object
// ----------------------------------------------------------------------
function COIList()
{
    this.oiMaxIndex=0;
    this.ois=0;
    this.oiMaxHandle=0;
    this.oiHandleToIndex=null;
    this.oiToLoad=null;
    this.oiLoaded=null;
    this.currentOI=0;
}
COIList.prototype=
{
	preLoad:function(file)
    {
		// Alloue la table de OI
		this.oiMaxIndex=file.readAInt();
		this.ois=new Array(this.oiMaxIndex);
		
		// Explore les chunks
		var index;
		this.oiMaxHandle=0;
		for (index=0; index<this.oiMaxIndex; index++)
		{
			var chID=0;
			var chFlags;
			var chSize;
		    var posEnd;
			while (chID!=0x7F7F)
		    {
				chID=file.readAShort();
				chFlags=file.readAShort();
				chSize = file.readAInt();
				if (chSize==0)
			    	continue;
				posEnd=file.getFilePointer()+chSize;
				
				switch(chID)
				{
			    case 0x4444:
					this.ois[index]=new COI();
					this.ois[index].loadHeader(file);
					if (this.ois[index].oiHandle>=this.oiMaxHandle)
				    	this.oiMaxHandle=(this.ois[index].oiHandle+1);
					break;
			    case 0x4445:
					this.ois[index].oiName=file.readAString();
					break;
			    case 0x4446:
					this.ois[index].oiFileOffset=file.getFilePointer();
					break;
				}
				file.seek(posEnd);
		    }
		}
		
		this.oiHandleToIndex=new Array(this.oiMaxHandle);
		for (index=0; index<this.oiMaxIndex; index++)
		{
		    this.oiHandleToIndex[this.ois[index].oiHandle] = index;
		}
	
		this.oiToLoad=new Array(this.oiMaxHandle);
		this.oiLoaded=new Array(this.oiMaxHandle);
		var n;
		for (n=0; n<this.oiMaxHandle; n++)
		{
		    this.oiToLoad[n]=0;
		    this.oiLoaded[n]=0;
		}
    },
	getOIFromHandle:function(handle)
	{
		return this.ois[this.oiHandleToIndex[handle]];
	},
	getOIFromIndex:function(index)
	{
		return this.ois[index];
	},
	resetOICurrent:function()
	{
		var n;
		for (n=0; n<this.oiMaxIndex; n++)
		{
    		this.ois[n].oiFlags&=~COI.OILF_CURFRAME;
		}
	},
	setOICurrent:function(handle)
	{
		this.ois[this.oiHandleToIndex[handle]].oiFlags|=COI.OILF_CURFRAME;
	},
	getFirstOI:function()
	{
		var n;
		for (n=0; n<this.oiMaxIndex; n++)
		{
    		if ((this.ois[n].oiFlags&COI.OILF_CURFRAME)!=0)
    		{
				this.currentOI=n;
				return this.ois[n];
    		}
		}
		return null;
	},
	getNextOI:function()
	{
		if (this.currentOI<this.oiMaxIndex)
		{
    		var n;
    		for (n=this.currentOI+1; n<this.oiMaxIndex; n++)
    		{
				if ((this.ois[n].oiFlags&COI.OILF_CURFRAME)!=0)
				{
	    			this.currentOI=n;
	    			return this.ois[n];
				}
    		}
		}
		return null;
	},

	resetToLoad:function()
	{
		var n;
		for (n=0; n<this.oiMaxHandle; n++)
		{
    		this.oiToLoad[n]=0;
		}
	},
	setToLoad:function(n)
	{
		this.oiToLoad[n]=1;
	},
	load:function(file)
	{
		var h;
		for (h=0; h<this.oiMaxHandle; h++)
		{
    		if (this.oiToLoad[h]!=0)
    		{
				if (this.oiLoaded[h]==0 || (this.oiLoaded[h]!=0 && (this.ois[this.oiHandleToIndex[h]].oiLoadFlags&COI.OILF_TORELOAD)!=0) )
				{
	    			this.ois[this.oiHandleToIndex[h]].load(file);
	    			this.oiLoaded[h]=1;
				}
    		}
    		else
    		{
				if (this.oiLoaded[h]!=0)
				{
	    			this.ois[this.oiHandleToIndex[h]].unLoad();
	    			this.oiLoaded[h]=0;
				}
    		}
		}
		this.resetToLoad();
	},
	enumElements:function(enumImages, enumFonts)
	{
		var h;
		for (h=0; h<this.oiMaxHandle; h++)
		{
    		if (this.oiLoaded[h]!=0)
    		{
				this.ois[this.oiHandleToIndex[h]].enumElements(enumImages, enumFonts);
    		}
		}
	}
}

// COC object
// -------------------------------------------------------------------
COC.OBSTACLE_NONE=0;
COC.OBSTACLE_SOLID=1;
COC.OBSTACLE_PLATFORM=2;
COC.OBSTACLE_LADDER=3;
COC.OBSTACLE_TRANSPARENT=4;
function COC()
{
}	

// COCBackground object
// -------------------------------------------------------------------
function COCBackground()
{
   	this.ocImage=0;
}
COCBackground.prototype=
{
    load:function(file, type)
    {
		file.skipBytes(4);		// ocDWSize
		this.ocObstacleType=file.readAShort();
		this.ocColMode=file.readAShort();
		this.ocCx=file.readAInt();
		this.ocCy=file.readAInt();
		this.ocImage=file.readAShort();
    },

    enumElements:function(enumImages, enumFonts)
    {
		if (enumImages!=null)
		{
		    var num=enumImages.enumerate(this.ocImage);
		    if (num!=-1)
		    {
				this.ocImage=num;
		    }
		}
    }
}

// COCQBackdrop object
// ------------------------------------------------------------------
COCQBackdrop.LINEF_INVX=0x0001;
COCQBackdrop.LINEF_INVY=0x0002;
function COCQBackdrop()
{
	this.ocBorderSize=0;			
	this.ocBorderColor=0;
	this.ocShape=0;			
	this.ocFillType=0;
	this.ocLineFlags=0;
	this.ocColor1=0;
	this.ocColor2=0;
	this.ocGradientFlags=0;
	this.ocImage=0;			
}
COCQBackdrop.prototype=
{
    load:function(file, type)
    {
		file.skipBytes(4);	
		this.ocObstacleType=file.readAShort();
		this.ocColMode=file.readAShort();
		this.ocCx=file.readAInt();
		this.ocCy=file.readAInt();
		this.ocBorderSize=file.readAShort();
		this.ocBorderColor=file.readAColor();
		this.ocShape=file.readAShort();
		
		this.ocFillType=file.readAShort();
		if (this.ocShape==1)
		{
		    this.ocLineFlags=file.readAShort();
		}
		else
		{
		    switch (this.ocFillType)
		    {
			case 1:	
			    this.ocColor1=this.ocColor2=file.readAColor();
			    break;
			case 2:	
			    this.ocColor1=file.readAColor();
			    this.ocColor2=file.readAColor();
			    this.ocGradientFlags=file.readAInt();
			    break;
			case 3:	
			    this.ocImage=file.readAShort();
			    break;
		    }
		}
    },
  
    enumElements:function(enumImages, enumFonts)
	{
		if (this.ocFillType==3)		
		{
		    if (enumImages!=null)
		    {
				var num=enumImages.enumerate(this.ocImage);
				if (num!=-1)
				{
			    	ocImage=num;
				}
		    }
		}
    }   
}

// CObjectCommon object
// -------------------------------------------------------------------
CObjectCommon.OEFLAG_DISPLAYINFRONT=0x0001;
CObjectCommon.OEFLAG_BACKGROUND=0x0002;
CObjectCommon.OEFLAG_BACKSAVE=0x0004;
CObjectCommon.OEFLAG_RUNBEFOREFADEIN=0x0008;
CObjectCommon.OEFLAG_MOVEMENTS=0x0010;
CObjectCommon.OEFLAG_ANIMATIONS=0x0020;
CObjectCommon.OEFLAG_TABSTOP=0x0040;
CObjectCommon.OEFLAG_WINDOWPROC=0x0080;
CObjectCommon.OEFLAG_VALUES=0x0100;
CObjectCommon.OEFLAG_SPRITES=0x0200;
CObjectCommon.OEFLAG_INTERNALBACKSAVE=0x0400;
CObjectCommon.OEFLAG_SCROLLINGINDEPENDANT=0x0800;
CObjectCommon.OEFLAG_QUICKDISPLAY=0x1000;
CObjectCommon.OEFLAG_NEVERKILL=0x2000;
CObjectCommon.OEFLAG_NEVERSLEEP=0x4000;
CObjectCommon.OEFLAG_MANUALSLEEP=0x8000;
CObjectCommon.OEFLAG_TEXT=0x10000;
CObjectCommon.OEFLAG_DONTCREATEATSTART=0x20000;
CObjectCommon.OCFLAGS2_DONTSAVEBKD=0x0001;
CObjectCommon.OCFLAGS2_SOLIDBKD=0x0002;
CObjectCommon.OCFLAGS2_COLBOX=0x0004;
CObjectCommon.OCFLAGS2_VISIBLEATSTART=0x0008;
CObjectCommon.OCFLAGS2_OBSTACLESHIFT=4;
CObjectCommon.OCFLAGS2_OBSTACLEMASK=0x0030;
CObjectCommon.OCFLAGS2_OBSTACLE_SOLID=0x0010;
CObjectCommon.OCFLAGS2_OBSTACLE_PLATFORM=0x0020;
CObjectCommon.OCFLAGS2_OBSTACLE_LADDER=0x0030;
CObjectCommon.OCFLAGS2_AUTOMATICROTATION=0x0040;
CObjectCommon.OEPREFS_BACKSAVE=0x0001;
CObjectCommon.OEPREFS_SCROLLINGINDEPENDANT=0x0002;
CObjectCommon.OEPREFS_QUICKDISPLAY=0x0004;
CObjectCommon.OEPREFS_SLEEP=0x0008;
CObjectCommon.OEPREFS_LOADONCALL=0x0010;
CObjectCommon.OEPREFS_GLOBAL=0x0020;
CObjectCommon.OEPREFS_BACKEFFECTS=0x0040;
CObjectCommon.OEPREFS_KILL=0x0080;
CObjectCommon.OEPREFS_INKEFFECTS=0x0100;
CObjectCommon.OEPREFS_TRANSITIONS=0x0200;
CObjectCommon.OEPREFS_FINECOLLISIONS=0x0400;
CObjectCommon.prototype=COC;

function CObjectCommon()
{
	this.ocOEFlags=0;		
	this.ocQualifiers=null;	
	this.ocFlags2=0;		
	this.ocOEPrefs=0;		
	this.ocIdentifier=0;	
	this.ocBackColor=0;		
	this.ocMovements=null; 
	this.ocValues=null;    
	this.ocStrings=null;   
	this.ocAnimations=null;
	this.ocCounters=null; 
	this.ocObject=null;   
	this.ocExtension=0;
	this.ocVersion=0;
	this.ocID=0;
	this.ocPrivate=0;
	this.ocFadeIn=null;
	this.ocFadeOut=null;
}
CObjectCommon.prototype=
{
    load:function(file, type)
    {
		// Position de debut
		var debut=file.getFilePointer();
		this.ocQualifiers=new Array(8); 

		// Lis le header
		var n;
		file.skipBytes(4);			
		var oMovements=file.readAShort();
		var oAnimations=file.readAShort();
		file.skipBytes(2);		 
		var oCounter=file.readAShort(); 
		var oData=file.readAShort();
		file.skipBytes(2);	
		this.ocOEFlags=file.readAInt();
		for (n=0; n<8; n++)
		{
		    this.ocQualifiers[n]=file.readShort();	    
		}
		var oExtension=file.readAShort();	    
		var oValues=file.readAShort();		   
		var oStrings=file.readAShort();        
		this.ocFlags2=file.readAShort();
		this.ocOEPrefs=file.readAShort();
		this.ocIdentifier=file.readAInt();
		this.ocBackColor=file.readAColor();
		var oFadeIn=file.readAInt();		 
		var oFadeOut=file.readAInt();		 
		this.ocFadeIn=null;
		this.ocFadeOut=null;
		
		if (oMovements!=0)
		{
		    file.seek(debut+oMovements);
			this.ocMovements=new CMoveDefList();
			this.ocMovements.load(file);
		}
        if (oValues!=0)
        {
			file.seek(debut+oValues);
			this.ocValues=new CDefValues();
            this.ocValues.load(file);
        }
        if (oStrings!=0)
        {
            file.seek(debut+oStrings);
            this.ocStrings=new CDefStrings();
            this.ocStrings.load(file);
        }
        if (oAnimations!=0)
        {
            file.seek(debut+oAnimations);
            this.ocAnimations=new CAnimHeader();
            this.ocAnimations.load(file);
        }
        if (oCounter!=0)
        {
            file.seek(debut+oCounter);
            this.ocObject=new CDefCounter();
            this.ocObject.load(file);
        }
		if (oExtension!=0)
		{
            file.seek(debut+oExtension);
		    var size=file.readAInt();
		    file.skipBytes(4);
		    this.ocVersion=file.readAInt();
		    this.ocID=file.readAInt();
		    this.ocPrivate=file.readAInt();
		    size-=20;
		    if (size!=0)
		    {
				this.ocExtension=file.getFilePointer();
		    }
		}
        if (oFadeIn!=0)
        {
            file.seek(debut+oFadeIn);
            this.ocFadeIn=new CTransitionData();
            this.ocFadeIn.load(file);
        }
        if (oFadeOut!=0)
        {
            file.seek(debut+oFadeOut);
            this.ocFadeOut=new CTransitionData();
            this.ocFadeOut.load(file);
        }

        if (oData!=0)
        {
            file.seek(debut+oData);
            switch (type)
            {
                case 3:  
                case 4:   
                    this.ocObject=new CDefTexts();
                    this.ocObject.load(file);
                    break;
                
                case 5:  
                case 6:  
                case 7:  
                    this.ocCounters=new CDefCounters();
                    this.ocCounters.load(file);
                    break;
                
                case 8:  
                    this.ocObject=new CDefRtf();
                    this.ocObject.load(file);
				    this.ocOEFlags&=~(CObjectCommon.OEFLAG_SPRITES|CObjectCommon.OEFLAG_QUICKDISPLAY|CObjectCommon.OEFLAG_BACKSAVE);
                    break;
                case 9:         // OBJ_CCA
                    this.ocObject=new CDefCCA();
                    this.ocObject.load(file);
                    break;
            }
        }
    },
    enumElements:function(enumImages, enumFonts)
    {
		if (this.ocAnimations!=null)
        {
            this.ocAnimations.enumElements(enumImages);
        }
		if (this.ocObject!=null)
		{
		    this.ocObject.enumElements(enumImages, enumFonts);
		}
		if (this.ocCounters!=null)
		{
		    this.ocCounters.enumElements(enumImages, enumFonts);
		}
    }	
}

// CDefCCA object
// ---------------------------------------------------------
function CDefCCA()
{
	this.odCx=0;	
	this.odCy=0;
	this.odVersion=0;
	this.odNStartFrame=0;
	this.odOptions=0;
	this.odName=null;
}
CDefCCA.prototype=
{
    load:function(file)
    {
        file.skipBytes(4);
        this.odCx=file.readAInt();
        this.odCy=file.readAInt();
        this.odVersion=file.readAShort();
        this.odNStartFrame=file.readAShort();
        this.odOptions=file.readAInt();
        file.skipBytes(4+4);                  // odFree+pad bytes
        this.odName=file.readAString();
    },
    enumElements:function(enumImages, enumFonts)
    {
    }		
}

// CDefCounter object 
// ----------------------------------------------------------
function CDefCounter()
{
   	this.ctInit=0;
	this.ctMini=0;
	this.ctMaxi=0;
}
CDefCounter.prototype=
{	
	load:function(file)
	{
    	file.skipBytes(2); 
    	this.ctInit=file.readAInt();
    	this.ctMini=file.readAInt();
    	this.ctMaxi=file.readAInt();
	},
	enumElements:function(enumImages, enumFonts)
	{
	}		
}

// CDefCounters object
// --------------------------------------------------------------
CDefCounters.CTA_HIDDEN=0;
CDefCounters.CTA_DIGITS=1;
CDefCounters.CTA_VBAR=2;
CDefCounters.CTA_HBAR=3;
CDefCounters.CTA_ANIM=4;
CDefCounters.CTA_TEXT=5;    
CDefCounters.BARFLAG_INVERSE=0x0100;
    
function CDefCounters()
{
	this.odCx=0;
	this.odCy=0;
	this.odPlayer=0;
	this.odDisplayType=0;
	this.odDisplayFlags=0;
	this.odFont=0;
	this.ocBorderSize=0;
	this.ocBorderColor=0;
	this.ocShape=0;
	this.ocFillType=0;
	this.ocLineFlags=0;
	this.ocColor1=0;
	this.ocColor2=0;
	this.ocGradientFlags=0;
	this.nFrames=0;
	this.frames=null;
}
CDefCounters.prototype=
{
    load:function(file)
    {
        file.skipBytes(4); 
        this.odCx=file.readAInt();
        this.odCy=file.readAInt();
        this.odPlayer=file.readAShort();
        this.odDisplayType=file.readAShort();
        this.odDisplayFlags=file.readAShort();
        this.odFont=file.readAShort();

        switch (this.odDisplayType)
        {
            case 0:        
                break;
            case 1:        
            case 4:        
                this.nFrames=file.readAShort();
                this.frames=new Array(this.nFrames);
                var n;
                for (n=0; n<this.nFrames; n++)
                {
                    this.frames[n]=file.readAShort();
                }
                break;
            case 2:    
            case 3:    
            case 5:    
                this.ocBorderSize=file.readAShort();
                this.ocBorderColor=file.readAColor();
                this.ocShape=file.readAShort();
                this.ocFillType=file.readAShort();
                if (this.ocShape==1)
                    this.ocLineFlags=file.readAShort();
                else
                {
                    switch (this.ocFillType)
                    {
                        case 1:	
                            this.ocColor1=file.readAColor();
                            break;
                        case 2:	
                            this.ocColor1=file.readAColor();
                            this.ocColor2=file.readAColor();
                            this.ocGradientFlags=file.readAInt();
                            break;
                        case 3:	
                            break;
                    }
                }
                break;
        }     
	},

    enumElements:function(enumImages, enumFonts)
    {
		var num;
		switch(this.odDisplayType)
		{
	     	case 1: 
	        case 4: 
				var n;
				for (n=0; n<this.nFrames; n++)
				{
			    	if (enumImages!=null)
			    	{
						num=enumImages.enumerate(this.frames[n]); 
/*						if (num!=-1)
						{
				    		this.frames[n]=num;
						}
*/			    	}
				}
				break;
	        case 5:        
				if (enumFonts!=null)
				{
			    	num=enumFonts.enumerate(this.odFont);
/*			    	if (num!=-1)
			    	{
						this.odFont=num;
			    	}
*/				}
				break;
		}
    }
}

// CDefRtf object
// ----------------------------------------------------------
function CDefRtf()
{
   	this.odDWSize=0;
	this.odVersion=0;	
	this.odOptions=0;	
	this.odBackColor=0; 	
	this.odCx=0;		
	this.odCy=0;
	this.text=null;
}
CDefRtf.prototype=
{
    load:function(file)
    {
        this.odDWSize=file.readAInt();
        this.odVersion=file.readAInt();
        this.odOptions=file.readAInt();
        this.odBackColor=file.readAColor();
        this.odCx=file.readAInt();
        this.odCy=file.readAInt();
        
        file.skipBytes(4);
        var size=file.readAInt();
        this.text=file.readAString(size);
    },
    enumElements:function(enumImages, enumFonts)
    {
    }	
}

// CDefText object
// -------------------------------------------------------------------
CDefText.TSF_LEFT=0x0000;
CDefText.TSF_HCENTER=0x0001;
CDefText.TSF_RIGHT=0x0002;
CDefText.TSF_VCENTER=0x0004;
CDefText.TSF_HALIGN=0x000F;
CDefText.TSF_CORRECT=0x0100;
CDefText.TSF_RELIEF=0x0200;
function CDefText()
{
   	this.tsFont=0; 
	this.tsFlags=0;
	this.tsColor=0;
	this.tsText=null;
}
CDefText.prototype=
{
    load:function(file)
    {
        this.tsFont=file.readShort();
        this.tsFlags=file.readAShort();
        this.tsColor=file.readAColor();
        this.tsText=file.readAString();
    },
    enumElements:function(enumImages, enumFonts)
    {
		if (enumFonts!=null)
		{
		    var num=enumFonts.enumerate(this.tsFont);
/*		    if (num!=-1)
		    {
				this.tsFont=num;
		    }
*/		    
		}
    }    
}

// CDefTexts object
// -------------------------------------------------------------------
function CDefTexts()
{
	this.otCx=0;
	this.otCy=0;
	this.otNumberOfText=0;
	this.otTexts=null;
}
CDefTexts.prototype=
{
    load:function(file)
    {
        var debut=file.getFilePointer();
        file.skipBytes(4);          // Size
        this.otCx=file.readAInt();
        this.otCy=file.readAInt();
        this.otNumberOfText=file.readAInt();
        
        this.otTexts=new Array(this.otNumberOfText);
        var offsets=new Array(this.otNumberOfText);
        var n;
        for (n=0; n<this.otNumberOfText; n++)
        {
            offsets[n]=file.readAInt();
        }
        for (n=0; n<this.otNumberOfText; n++)
        {
            this.otTexts[n]=new CDefText();
            file.seek(debut+offsets[n]);
            this.otTexts[n].load(file);
        }
    },
    enumElements:function(enumImages, enumFonts)
    {	
		var n;
		for (n=0; n<this.otNumberOfText; n++)
		{
		    this.otTexts[n].enumElements(enumImages, enumFonts);
		}
    }
}

