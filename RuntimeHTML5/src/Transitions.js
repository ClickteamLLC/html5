
// CTRANSITIONDATA : données transitions
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

CTransitionData.TRFLAG_COLOR=0x0001;
function CTransitionData()
{    
   	this.dllName="";
    this.transID=0;
    this.transDuration=0;
    this.transFlags=0;
    this.transColor=0;
    this.dataOffset=0;	
}
CTransitionData.prototype=
{
    load:function(file) 
    {
        var debut=file.getFilePointer();
        
        file.skipBytes(4);
        this.transID=file.readAInt();
        this.transDuration=file.readAInt();
        this.transFlags=file.readAInt();
        this.transColor=file.readAColor();
        
        var nameOffset=file.readAInt();
        var paramOffset=file.readAInt();
        file.seek(debut+nameOffset);
        this.dllName=file.readAString();  
        this.dllName=this.dllName.substr(0, this.dllName.indexOf('.'));      
        this.dataOffset=(debut+paramOffset);
    }
}

// CTRANSITIONS : interface avec la dll
//----------------------------------------------------------------------------------
function CTransition()
{
}
CTransition.prototype=
{
    getTrans:function(data)
    {
    	return null;
    }
}

// CTRANS : interface avec un effet de transition
//----------------------------------------------------------------------------------
CTrans.LEFT_RIGHT=0;
CTrans.RIGHT_LEFT=1;
CTrans.TOP_BOTTOM=2;
CTrans.BOTTOM_TOP=3;
CTrans.CENTER_LEFTRIGHT=0;
CTrans.LEFTRIGHT_CENTER=1;
CTrans.CENTER_TOPBOTTOM=2;
CTrans.TOPBOTTOM_CENTER=3;
CTrans.TOP_LEFT=0;
CTrans.TOP_RIGHT=1;
CTrans.BOTTOM_LEFT=2;
CTrans.BOTTOM_RIGHT=3;
CTrans.CENTER=4;
CTrans.DIR_HORZ=0;
CTrans.DIR_VERT=1;
CTrans.TRFLAG_FADEIN=0x0001;
CTrans.TRFLAG_FADEOUT=0x0002;
function CTrans()
{
    this.m_initTime=0;
    this.m_currentTime=0;
    this.m_endTime=0;
    this.m_duration=0;
    this.m_overflow=false;
    this.m_running=false;
    this.m_starting=false;
    this.source1=null;
    this.source2=null;
    this.dest=null;
    this.destContext=null;
}
CTrans.prototype=
{
    start:function(data, display, debut, fin)
    {
        this.dest=display;
        this.destContext=this.dest.getContext("2d");
        this.source1=debut;
        this.source2=fin;
        
		var date=new Date();
		this.m_initTime=date.getTime();		
		this.m_duration = data.transDuration;
		if ( this.m_duration == 0 )
            this.m_duration = 1;
		this.m_currentTime = this.m_initTime;
		this.m_endTime = this.m_initTime + this.m_duration;
		this.m_running = true;
		this.m_starting = true;        
    },
    
    finish:function()
    {
    },
    
    isCompleted:function()
    {
		if ( this.m_running )
		{
			var date=new Date();
            return (date.getTime() >= this.m_endTime);			
		}		
		return true;        
    },
    
    getDeltaTime:function()
    {
		var date=new Date();
		this.m_currentTime = date.getTime();
		if ( this.m_currentTime > this.m_endTime )
            this.m_currentTime = this.m_endTime;
		return (this.m_currentTime - this.m_initTime);
    },
    
    getTimePos:function()
    {
		return this.m_currentTime - this.m_initTime;
    },
    
    setTimePos:function(msTimePos)
    {
		this.m_initTime = (this.m_currentTime - this.msTimePos);
		this.m_endTime = this.m_initTime + this.m_duration;
    },    
    
    blit:function(source, xDest, yDest, xSrce, ySrce, width, height)
    {
    	if (this.m_objectFadeOut)
	    	this.destContext.globalCompositeOperation="source-atop";
    	if (arguments.length==1)
	        this.destContext.drawImage(source, 0, 0);
	    else if (width>0 && height>0)
            this.destContext.drawImage(source, xSrce, ySrce, width, height, xDest, yDest, width, height);
    },
    
    stretch:function(source, xDest, yDest, wDest, hDest, xSrce, ySrce, wSrce, hSrce)
    {
    	if (this.m_objectFadeOut)
    		this.destContext.globalCompositeOperation="source-atop";
        if (wDest>0 && hDest>0 && wSrce>0 && hSrce>0)
            this.destContext.drawImage(source, xSrce, ySrce, wSrce, hSrce, xDest, yDest, wDest, hDest);
    },
    
    stepDraw:function(flag)
    {    	
    },
    
    end:function()
    {    	
    },    
    
    init:function(data, file, display, source, dest)
    {
    }
  
}

// CTRANSITIONMANAGER
//----------------------------------------------------------------------------------
function CTransitionManager(a)
{
	this.app=a;
}
CTransitionManager.prototype=
{
    startObjectFade:function(hoPtr, bFadeOut)
    {
        var pData=hoPtr.hoCommon.ocFadeIn;
        if (bFadeOut)
        {
            pData=hoPtr.hoCommon.ocFadeOut;
        }
        var img=null;
        var context;
        if ( (hoPtr.hoOEFlags & CObjectCommon.OEFLAG_ANIMATIONS) != 0 )
        {
            var image=this.app.imageBank.getImageFromHandle(hoPtr.roc.rcImage);
	    	img=document.createElement("canvas");
            img.width=image.width;
            img.height=image.height;
            var context=img.getContext("2d");
	        if (image.mosaic == 0)
				context.drawImage(image.img, 0, 0);
	        else
	        {
	            context.drawImage(this.app.imageBank.mosaics[image.mosaic],
	                              image.mosaicX, image.mosaicY,
	                              image.width, image.height, 0, 0,
	                              image.width, image.height);
	        }
        }
        else if (hoPtr.hoType>=32)
        {
	    	img=document.createElement("canvas");
    		img.width=hoPtr.hoImgWidth;
    		img.height=hoPtr.hoImgHeight;
    		var renderer=new StandardRendered(img);
    		if (!hoPtr.getSurface(renderer))
    			img=null;
        }
        if (img==null)
        {
            return null;
        }

        var width=img.width;
        var height=img.height;
        
        // L'image de fond
    	var display=document.createElement("canvas");
        display.width=width;
        display.height=height;
        
        // Les images de debut et de fin
    	var surface1=document.createElement("canvas");
        surface1.width=width;
        surface1.height=height;
    	var surface2=document.createElement("canvas");
        surface2.width=width;
        surface2.height=height;
        var context;
        if (bFadeOut)
        {
            // Source = image
            context=surface1.getContext("2d");
            context.drawImage(img, 0, 0);
            context=display.getContext("2d");
            context.drawImage(img, 0, 0);
            if ( (pData.transFlags & CTransitionData.TRFLAG_COLOR)!=0 )
            {
                this.copyColorMask(surface2, img, pData.transColor);
            }
        }
        // Fade in
        else
        {
            // Destination = image
            context=surface2.getContext("2d");
            context.drawImage(img, 0, 0);
            if ( (pData.transFlags & CTransitionData.TRFLAG_COLOR)!=0 )
            {
                this.copyColorMask(surface1, img, pData.transColor);
            }
        }

        // Charge la transition
        var pTrans=this.createTransition(pData, display, surface1, surface2);
        if (pTrans!=null)
        {
	        var trFlags=0;
	        if ((hoPtr.hoFlags&CObject.HOF_FADEOUT)!=0)
	        {
	        	pTrans.m_objectFadeOut=true;       	
	            trFlags |= CTrans.TRFLAG_FADEOUT;
	        }
	        else
	        {
	        	pTrans.m_objectFadeOut=false;       	        	
	            trFlags |= CTrans.TRFLAG_FADEIN;
	        }
	        hoPtr.transitionImage=display;
	        pTrans.stepDraw(trFlags);
	    }
        return pTrans;
    },
    copyColorMask:function(dest, source, couleur)
    {
        var context=dest.getContext("2d");
        context.drawImage(source, 0, 0);
        var width=source.width;
        var height=source.height;
        var pixels=context.getImageData(0, 0, width, height);
        var x, y, alpha;
        var color=couleur&0x00FFFFFF;
        var r=(couleur&0x00FF0000)>>16;
        var g=(couleur&0x0000FF00)>>8;
        var b=couleur&0x000000FF;
        for (y=0; y<height; y++)
        {
            for (x=0; x<width; x++)
            {
                if (pixels.data[(y*width+x)*4+3]!=0)
                {
                    pixels.data[(y*width+x)*4]=r;
                    pixels.data[(y*width+x)*4+1]=g;
                    pixels.data[(y*width+x)*4+2]=b;
                }
            }
        }
        context.putImageData(pixels, 0, 0);
    },
    createTransition:function(pData, display, surfaceStart, surfaceEnd)
    {
		var dllName=pData.dllName;
		
		var dll=null;
		
    	// STARTCUT
    	if (dllName=="CCTrans")
			dll=new CTransitionCCTrans();
		// ENDCUT
		
		if (dll!=null)
		{
			var trans=dll.getTrans(pData);
			this.app.file.seek(pData.dataOffset);
			trans.m_objectFadeOut=false;
			trans.init(pData, this.app.file, display, surfaceStart, surfaceEnd);	
		    return trans;
		}
		return null;
	}    
}

