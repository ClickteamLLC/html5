
/* Renderer implementation using 2D canvas context
 */
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
function StandardRenderer(element)
{
    if (! (this._context = element.getContext('2d')))
        throw new Error("Failed to init standard renderer");

    this._context.imageSmoothingEnabled = true;
};

StandardRenderer.prototype = CServices.extend(new Renderer(),
{
    renderSolidColor: function(x, y, w, h, color, inkEffect, inkEffectParam)
    {
        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);

        context.fillStyle = CServices.getColorString(color);
        context.fillRect(x, y, w, h);
    },

    renderSolidColorEllipse: function(x, y, w, h, color, inkEffect, inkEffectParam)
    {
        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);

        context.fillStyle = CServices.getColorString(color);

        CServices.createEllipse(context, x, y, w, h);
        context.fill();
    },

    renderGradient: function(x, y, w, h, color1, color2, vertical, inkEffect, inkEffectParam)
    { 
        if(color1 == color2)
            return this.renderSolidColor(x, y, w, h, color1, inkEffect, inkEffectParam);

        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);

        configureGradient(context, x, y, w, h, vertical, color1, color2);

        context.fillRect(x, y, w, h);
    },

    renderGradientEllipse: function (x, y, w, h, color1, color2, vertical, inkEffect, inkEffectParam)
    {
        if(color1 == color2)
            return this.renderSolidColorEllipse(x, y, w, h, color1, inkEffect, inkEffectParam);

        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);

        configureGradient(context, x, y, w, h, vertical, color1, color2);

        CServices.createEllipse(context, x, y, w, h);
        this._context.fill();
    },

    renderImage: function(image, x, y, angle, scaleX, scaleY, inkEffect, inkEffectParam)
    {
        if(! (image instanceof CImage))
            throw new Error("renderImage: bad image type: " + (typeof image));

        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);
		context.imageSmoothingEnabled=(inkEffect&CRSpr.BOP_SMOOTHING)!=0;
		
		if (angle==0 && scaleX==1 && scaleY==1)
		{
	        if (image.mosaic == 0)
	        {
				context.drawImage(image.img, x-image.xSpot, y-image.ySpot);
	        }
	        else
	        {
	            context.drawImage(image.app.imageBank.mosaics[image.mosaic],
	                              image.mosaicX, image.mosaicY,
	                              image.width, image.height, x-image.xSpot, y-image.ySpot,
	                              image.width, image.height);
	        }
		}
		else
		{
	        context.save();
	
	        context.translate(x, y);
	
	        if(angle != 0)
	            context.rotate(-angle * 0.0174532925);
	
	        context.scale(Math.max(0.001, scaleX), Math.max(0.001, scaleY));				
	        context.translate(-image.xSpot, -image.ySpot);
	
	        if (image.mosaic == 0)
	        {
				context.drawImage(image.img, 0, 0, image.width, image.height,
	                              0, 0, image.width, image.height);
	        }
	        else
	        {
	            context.drawImage(image.app.imageBank.mosaics[image.mosaic],
	                              image.mosaicX, image.mosaicY,
	                              image.width, image.height, 0, 0,
	                              image.width, image.height);
	        }
	
	        context.restore();				
	    }
    },

	renderSimpleImage:function(image, x, y, width, height, inkEffect, inkEffectParam)
	{
        setInkEffect(this._context, inkEffect, inkEffectParam);
		this._context.drawImage(image, x, y, width, height);		
	},		

    renderPattern: function(image, x, y, w, h, inkEffect, inkEffectParam)
    {
        if(! (image instanceof CImage))
            throw new Error("renderPattern: bad image type: " + (typeof image));

        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);

    	context.save();
    	context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x+w, y);
		context.lineTo(x+w, y+h);
		context.lineTo(x, y+h);
		context.lineTo(x, y);
		context.clip();

        var iSx = image.width;
        var iSy = image.height;
        var widthX = Math.floor(w / iSx) + 1;
        var heightY = Math.floor(h / iSy) + 1;
        var nX, nY;
        for (nX = 0; nX < widthX; nX++)
        {
            for (nY = 0; nY < heightY; nY++)
            {
		        if (image.mosaic == 0)
		        {
					context.drawImage(image.img, x+nX*iSx, y+nY*iSy);
		        }
		        else
		        {
		            context.drawImage(image.app.imageBank.mosaics[image.mosaic],
		                              image.mosaicX, image.mosaicY,
		                              image.width, image.height, x+nX*iSx, y+nY*iSy,
		                              image.width, image.height);
		        }
            }
        }
		context.restore();      
    },

    renderPatternEllipse: function(image, x, y, w, h, inkEffect, inkEffectParam)
    {
        if(! (image instanceof CImage))
            throw new Error("renderPatternEllipse: bad image type: " + (typeof image));

        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);

        if (image.mosaic == 0)
        {
	        context.fillStyle = context.createPattern(image.img, 'repeat');
        }
        else
        {
        	if (!image.pattern)
        	{
		    	image.pattern=document.createElement("canvas");
		    	image.pattern.width=image.width;
		    	image.pattern.height=image.height;
		    	var context=image.pattern.getContext("2d");
	            context.drawImage(image.app.imageBank.mosaics[image.mosaic],
	                              image.mosaicX, image.mosaicY,
	                              image.width, image.height, 0, 0,
	                              image.width, image.height);
        	}
	        context.fillStyle = context.createPattern(image.pattern, 'repeat');
        }
        CServices.createEllipse(context, x, y, w, h);
        this._context.fill();
    },

    renderLine: function(xA, yA, xB, yB, color, thickness, inkEffect, inkEffectParam)
    {
        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);

        context.strokeStyle = CServices.getColorString(color);
        context.lineCap = 'round';
        context.lineWidth = thickness;

        context.beginPath();
            context.moveTo(xA, yA);
            context.lineTo(xB, yB);
        context.closePath();

        context.stroke();
    },

    renderRect: function(x, y, w, h, color, thickness, inkEffect, inkEffectParam)
    {
        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);

        context.strokeStyle = CServices.getColorString(color);
        context.lineWidth=thickness;
        context.strokeRect(x, y, w, h);
    },

    renderEllipse: function(x, y, w, h, thickness, color, inkEffect, inkEffectParam)
    {
        var context = this._context;

        setInkEffect(context, inkEffect, inkEffectParam);
        context.lineWidth=thickness;
        context.strokeStyle = CServices.getColorString(color);

        CServices.createEllipse(context, x, y, w, h);
        this._context.stroke();
    },

    pushClip: function()
    {
        var context = this._context;

        var clip = Renderer.prototype.pushClip.apply(this, arguments);

        context.beginPath();
        context.rect(clip.x, clip.y, clip.w, clip.h);
        context.clip();
    },

    popClip: function()
    {
        var context = this._context;

        Renderer.prototype.popClip.apply(this, arguments);

        if(this.clips.length > 0)
        {
            var clip = this.clips[this.clips.length - 1];

            context.beginPath();
            context.rect(clip.x, clip.y, clip.w, clip.h);
            context.clip();
        }
        else
        {
            context.resetClip();
        }
    }
});


function configureGradient(context, x, y, w, h, vertical, color1, color2)
{
    var gradient = vertical ?
            context.createLinearGradient(x, y, x, y + h)
          : context.createLinearGradient(x, y, x + w, y);

    gradient.addColorStop(0, CServices.getColorString(color1));
    gradient.addColorStop(1, CServices.getColorString(color2));

    context.fillStyle = gradient;
}

function setInkEffect(context, effect, effectParam)
{
    if (effect === undefined)
    {
        context.globalAlpha = 1.0;
        context.composite = 'source-over';

        return;
    }

    var effectMasked=effect&CRSpr.BOP_MASK;

	context.imageSmoothingEnabled=(effect&CRSpr.BOP_SMOOTHING)!=0;		
    context.globalAlpha=1.0;
    var r=255;
    var g=255;
    var b=255;
    if ((effect & CRSpr.BOP_RGBAFILTER) != 0)
    {
        r=((effectParam&0xFFFFFF)>>>16)&0xFF;
        g=((effectParam&0xFFFFFF)>>>8)&0xFF;
        b=(effectParam&0xFFFFFF)&0xFF;
        context.globalAlpha = (((effectParam >>> 24) & 0xFF) / 255.0);
    }
    else if (effectMasked == CRSpr.BOP_BLEND)
    {
        context.globalAlpha = ((128 - effectParam) / 128.0);
    }
    switch(effectMasked)
    {
        case CRSpr.BOP_ADD:
            context.composite= "lighter";
            break;
        case CRSpr.BOP_XOR:
            context.composite= "xor";
            break;
        default: 
            context.composite= "source-over";
            break;
    }
}


