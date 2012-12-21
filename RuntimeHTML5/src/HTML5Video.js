//----------------------------------------------------------------------------------
//
// CRunHTML5 Video
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

CRunHTML5Video.CND_ONERROR=0;
CRunHTML5Video.CND_ISPLAYING=1;
CRunHTML5Video.CND_LAST=2;

CRunHTML5Video.ACT_PAUSE=0;
CRunHTML5Video.ACT_SEEKTO=1;
CRunHTML5Video.ACT_URL=2;
CRunHTML5Video.ACT_SETWIDTH=3;
CRunHTML5Video.ACT_SETHEIGHT=4;
CRunHTML5Video.ACT_PLAY=5;
CRunHTML5Video.ACT_SETVOLUME=6;
CRunHTML5Video.ACT_SETLOOPING=7;
CRunHTML5Video.ACT_SETPLAYRATE=8;
CRunHTML5Video.ACT_SETCONTROLS=9;
CRunHTML5Video.ACT_LAST=10;

CRunHTML5Video.EXP_WIDTH=0;
CRunHTML5Video.EXP_HEIGHT=1;
CRunHTML5Video.EXP_ORIGINALWIDTH=2;
CRunHTML5Video.EXP_ORIGINALHEIGHT=3;
CRunHTML5Video.EXP_PLAYRATE=4;
CRunHTML5Video.EXP_URL=5;
CRunHTML5Video.EXP_GETVOLUME=6;
CRunHTML5Video.EXP_GETTIME=7;
CRunHTML5Video.EXP_GETLOADEDLENGTH=8;
CRunHTML5Video.EXP_GETLENGTH=9;
CRunHTML5Video.EXP_CANPLAY=10;
CRunHTML5Video.EXP_LAST=11;

CRunHTML5Video.FLAG_RESIZETOVIDEO=0x0001;
CRunHTML5Video.FLAG_PAUSEONSTART=0x0002;
CRunHTML5Video.FLAG_LOOPING=0x0004;
CRunHTML5Video.FLAG_CONTROLS=0x0010;
CRunHTML5Video.FLAG_DISPLAY=0x0020;


function CRunHTML5Video()
{
	this.video=null;
	this.url=null;
	this.flags=0;
	this.bLoaded=false;
	this.lastX=-1;
	this.lastY=-1;
	this.lastWidth=-1;
	this.lastHeight=-1;
}
CRunHTML5Video.prototype=CServices.extend(new CRunControl(),
{
    getNumberOfConditions:function()
    {
        return CRunHTML5Video.CND_LAST;
    },

    createRunObject:function(file, cob, version)
    {
        this.ho.hoImgWidth = file.readAInt();
        this.ho.hoImgHeight = file.readAInt();
        this.flags = file.readAInt();
        this.url=file.readAString();

        this.video=document.createElement("video");
	    this.video.preload="auto";
        this.video.autoplay=(this.flags&CRunHTML5Video.FLAG_PAUSEONSTART)==0;
        this.video.loop=(this.flags&CRunHTML5Video.FLAG_PAUSEONSTART)==0;
	    if (this.url!="")
	    {
	        var that=this;
			this.video.addEventListener("loadeddata", function(e)
			{
				that.bLoaded=true;
				that.video.removeEventListener('loadeddata', arguments.callee, false);				
			}, false);
	        this.video.src=this.url;
	        this.video.load();
	    }

        this.setElement(this.video);
		this.video.controls=(this.flags&CRunHTML5Video.FLAG_CONTROLS)!=0;

		if (this.flags&CRunHTML5Video.FLAG_DISPLAY)
		{
//		this.videoDiv = document.createElement('div');
// 		document.body.appendChild(this.videoDiv);		
//		this.videoDiv.appendChild(this.video);
//  	this.videoDiv.setAttribute("style", "display:none;");		
			this.element.style.visibility = 'hidden';
		}

        return true;
    },

    displayRunObject:function(context, xDraw, yDraw)
    {
    	if (this.flags&CRunHTML5Video.FLAG_DISPLAY)
    	{
    		var x=this.ho.hoX-this.rh.rhWindowX+this.ho.pLayer.x+xDraw;
    		var y=this.ho.hoY-this.rh.rhWindowY+this.ho.pLayer.y+yDraw;
			context.renderSimpleImage(this.video, x, y, this.ho.hoImgWidth, this.ho.hoImgHeight, 0, 0);
		}    	
	},
	
	handleRunObject:function()
	{	
		if (this.flags&CRunHTML5Video.FLAG_RESIZETOVIDEO)
		{
			if (this.video.videoWidth!=0 && this.video.videoHeight!=0)
			{
				this.ho.hoImgWidth=this.video.videoWidth;
				this.ho.hoImgHeight=this.video.videoHeight;
				this.flags&=~CRunHTML5Video.FLAG_RESIZETOVIDEO;
			}
		}
    	if ((this.flags&CRunHTML5Video.FLAG_DISPLAY)==0)
    	{
    		CRunControl.prototype.handleRunObject.call(this);
    	}
		return 0;
	},

	condition:function(num, cnd)
	{
        switch (num)
        {
    		case CRunHTML5Video.CND_ONERROR:
    			return this.video.error!=null; 
    		case CRunHTML5Video.CND_ISPLAYING:
    			return this.cndPlaying();
		}
		return false;
	},
	
	cndPlaying:function()
	{
		if (this.bLoaded==true && this.video.paused==false && this.video.ended==false)
			return true;
		return false;
	},
	
	actStartURL:function(act)
	{
		this.url=act.getParamExpString(this.rh, 0);	
		this.bLoaded=false;
        var that=this;
		this.video.addEventListener("loadeddata", function(e)
		{
			that.bLoaded=true;
			that.video.removeEventListener('loadeddata', arguments.callee, false);				
		}, false);
        this.video.src=this.url;
        this.video.load();
	},
	
    action:function(num, act)
    {
        switch (num)
        {
            case CRunHTML5Video.ACT_PAUSE:
             	this.video.pause();
             	break;
            case CRunHTML5Video.ACT_SEEKTO:
            	var time=act.getParamExpression(this.rh, 0);
            	if (time>=0)
            		this.video.currentTime=time/1000;
            	break;
            case CRunHTML5Video.ACT_URL:
            	this.actStartURL(act);
            	break;
            case CRunHTML5Video.ACT_SETWIDTH:
            	var w=act.getParamExpression(this.rh, 0);
            	if (w>=0)
            	{
                    this.setWidth(w);
            		this.flags&=~CRunHTML5Video.FLAG_RESIZETOVIDEO;
            	}
            	break;
            case CRunHTML5Video.ACT_SETHEIGHT:

            	var h=act.getParamExpression(this.rh, 0);
            	if (h>=0)
            	{
                    this.setHeight(h);
            		this.flags&=~CRunHTML5Video.FLAG_RESIZETOVIDEO;
            	}
            	break;
            case CRunHTML5Video.ACT_PLAY:
            	this.video.play();
            	break;
            case CRunHTML5Video.ACT_SETVOLUME:
            	var vol=act.getParamExpression(this.rh, 0);
            	vol=Math.max(0, Math.min(100, vol));
            	this.video.volume=vol;
            	break;
            case CRunHTML5Video.ACT_SETLOOPING:
            	var l=act.getParamExpression(this.rh, 0);
            	this.video.loop=(l!=0)
            	break;
            case CRunHTML5Video.ACT_SETCONTROLS:
            	var c=act.getParamExpression(this.rh, 0);
            	this.video.controls=(c!=0)
            	break;
            case CRunHTML5Video.ACT_SETPLAYRATE:
            	this.video.playbackRate=act.getParamExpression(this.rh, 0);
            	break;			

        }
    },

    expression:function(num)
    {
        switch (num)
        {
            case CRunHTML5Video.EXP_WIDTH:
            	return is.video.width;
            case CRunHTML5Video.EXP_HEIGHT:
            	return this.video.height;
            case CRunHTML5Video.EXP_ORIGINALWIDTH:
            	return this.video.videoWidth;
            case CRunHTML5Video.EXP_ORIGINALHEIGHT:
            	return this.video.videoHeight;
            case CRunHTML5Video.EXP_PLAYRATE:
            	return this.video.playbackRate;
            case CRunHTML5Video.EXP_URL:
            	return this.video.src;            	
            case CRunHTML5Video.EXP_GETVOLUME:
            	return Math.floor(this.video.volume*100);
            case CRunHTML5Video.EXP_GETTIME:
            	return Math.floor(this.video.currentTime*1000);
            case CRunHTML5Video.EXP_GETLENGTH:
            	return Math.floor(this.video.duration*1000);
            case CRunHTML5Video.EXP_GETLOADEDLENGTH:
            	var tr=this.video.buffered;
            	if (tr.length>=1)
            	{
            		return Math.floor((tr.end(tr.length-1)-tr.start(true.length-1))*1000);
            	}
            	return 0;
            case CRunHTML5Video.EXP_CANPLAY:
                return this.video.canPlayType(this.ho.getExpParam());
        }
        return 0;
    }
});
