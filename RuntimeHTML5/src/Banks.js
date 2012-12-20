// CImageBank object
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
function CImageBank(a)
{
    this.app=a;
    this.file=null;
    this.images=null;
    this.nHandlesReel=0;
    this.nHandlesTotal=0;
    this.nImages=0;
    this.offsetsToImage=null;
    this.handleToIndex=null;
    this.useCount=null;
	this.rcInfo=null;
	this.hsInfo=null;
	this.apInfo=null;
	this.pIfo=null;
    this.mosaics=null;
    this.oldMosaics=null;	
    this.mosaicLoaded=null;	
}
CImageBank.prototype=
{
    preLoad:function(f)
    {
		this.file=f;
	
		this.nHandlesReel=this.file.readAShort();
		this.offsetsToImage=new Array(this.nHandlesReel);
		
		var nImg=this.file.readAShort();
		var n;
		var offset;
		var image=new CImage();
		for (n=0; n<nImg; n++)
		{
		    offset=this.file.getFilePointer();
		    image.loadHandle(this.file);
		    this.offsetsToImage[image.handle]=offset;
		}
		
		this.useCount=new Array(this.nHandlesReel);
		var n;
		for (n=0; n<this.nHandlesReel; n++)
		    this.useCount[n]=0;
		this.handleToIndex=null;
		this.nHandlesTotal=this.nHandlesReel;
		this.nImages=0;
		this.images=null;
    },
    getImageFromHandle:function(handle)
    {
		if (handle>=0 && handle<this.nHandlesTotal)
		    if (this.handleToIndex[handle]!=-1)
			return this.images[this.handleToIndex[handle]];
		return null;
    },
    getImageFromIndex:function(index)
    {
		if (index>=0 && index<this.nImages)
		    return this.images[index];
		return null;
    },
    resetToLoad:function()
    {
    	if ((this.app.dwOptions&CRunApp.AH2OPT_KEEPRESOURCESBETWEENFRAMES)==0)
    	{
			var n;
			for (n=0; n<this.nHandlesReel; n++)
			{
			    this.useCount[n]=0;
			}
		}			
    },
    
    setToLoad:function(handle)
    {
		this.useCount[handle]++;
    },
    
    enumerate:function(num)
    {
		this.setToLoad(num);
		return -1;
    },

	loadMosaic:function(handle)
    {
        if (this.mosaics[handle]==null)
        {
        	if (this.oldMosaics!=null && handle<this.oldMosaics.length && this.oldMosaics[handle]!=null)
        	{
        		this.mosaics[handle]=this.oldMosaics[handle];
        	}
        	else
        	{
		        this.mosaics[handle]=1;
		        var name = "M"+CServices.formatDiscName(handle, "png");
		        var image=new Image();
	        	var that=this;
	        	image.onload=function()
	        	{
	        		that.mosaicHasLoaded(this, handle);
	        	}     
	        	this.app.imagesToLoad++;
	        	this.app.loading=true;
		        image.src=name;
		    }
	   	}
    },
    
    mosaicHasLoaded:function(image, handle)
    {
    	this.mosaics[handle]=document.createElement("canvas");
    	this.mosaics[handle].setAttribute('width', image.width);
    	this.mosaics[handle].setAttribute('height', image.height);
    	var context=this.mosaics[handle].getContext("2d");
    	context.drawImage(image, 0, 0, image.width, image.height);    	    
		this.app.imagesLoaded++;
   	},
   	
    load:function(file)
    {
		var n;
		
        // Reset mosaics
        if (this.app.frame.mosaicMaxHandle > 0)
        {
        	var size=this.app.frame.mosaicMaxHandle;
            if (this.mosaics!=null)
            {
            	this.oldMosaics=new Array(this.mosaics.length);
            	for (n=0; n<this.mosaics.length; n++)
            		this.oldMosaics[n]=this.mosaics[n];
            	size=Math.max(size, this.mosaics.length);
            }
           	this.mosaics=new Array(size);
           	for (n = 0; n < size; n++)
                this.mosaics[n] = null;
        }

		this.nImages=0;
		for (n=0; n<this.nHandlesReel; n++)
		{
		    if (this.useCount[n]!=0)
				this.nImages++;
		}
	
		var newImages=new Array(this.nImages);
		var count=0;
		var h;
		for (h=0; h<this.nHandlesReel; h++)
		{
		    if (this.useCount[h]!=0)
		    {
				if (this.images!=null && this.handleToIndex[h]!=-1 && this.images[this.handleToIndex[h]]!=null)
				{
				    newImages[count]=this.images[this.handleToIndex[h]];
				    newImages[count].useCount=this.useCount[h];
				    if (this.mosaics!=null && this.oldMosaics!=null)
				    {
				    	var handle=newImages[count].mosaic;
				    	if (handle>0)
				    		this.mosaics[handle]=this.oldMosaics[handle];
				    }
				}
				else
				{
				    newImages[count]=new CImage();
				    file.seek(this.offsetsToImage[h]);
				    newImages[count].load(this.app);
				    newImages[count].useCount=this.useCount[h];
				}
				count++;
		    }
/*          else
            {
            }
*/            
		}
		this.images=newImages;
	
		this.handleToIndex=new Array(this.nHandlesReel);
		for (n=0; n<this.nHandlesReel; n++)
		{
		    this.handleToIndex[n]=-1;
		}
		for (n=0; n<this.nImages; n++)
		{
		    this.handleToIndex[this.images[n].handle]=n;
		}
		this.nHandlesTotal=this.nHandlesReel;
		this.resetToLoad();
		
		this.oldMosaics=null;
    },
    
    delImage:function(handle)
    {
		var img=this.getImageFromHandle(handle);
		if (img!=null)
		{
		    img.useCount--;
		    if (img.useCount<=0)
		    {
				var n;
				for (n=0; n<this.nImages; n++)
				{
				    if (this.images[n]==img)
				    {
						this.images[n]=null;
						this.handleToIndex[handle]=-1;
						break;
				    }
				}
		    }
		}
    },
/*    
    addImageCompare:function(newImage, xSpot, ySpot, xAP, yAP)
    { 	
		var i;
        var width=newImage.width;
        var height=newImage.height;
		for (i=0; ithis.<nImages; i++)
		{
            if (this.images[i]!=null)
            {
                if (this.images[i].xSpot==xSpot && this.images[i].ySpot==ySpot && this.images[i].xAP==xAP && this.images[i].yAP==yAP)
                {
                    if (width==this.images[i].img.width && height==this.images[i].img.height)
                    {
                        // Prend les pixels de la nouvelle image
                        if (newPixels==null)
                        {
                        	var newRect:Rectangle=new Rectangle(0, 0, width, height);
                        	newPixels=newImage.getPixels(newRect);
                        }

                        // Prend les pixels de l'image de la banque
                        var oldRect:Rectangle=new Rectangle(0, 0, width, height);
                        var oldPixels:ByteArray=images[i].img.getPixels(oldRect);

                        // Comparaison
                        var bEqual:Boolean=true;
                        var x:int, y:int;
                        for (y=0; y<height; y++)
                        {
                            for (x=0; x<width; x++)
                            {
                                if (newPixels[y*width+x]!=oldPixels[y*width+x])
                                {
                                    bEqual=false;
                                    break;
                                }
                            }
                            if (bEqual==false)
                            {
                            	break;
                            }
                        }

                        // Image trouvee
                        if (bEqual)
                        {
                            images[i].useCount++;
                            return images[i].handle;
                        }
                    }
                }
            }
		}
		return addImage(newImage, xSpot, ySpot, xAP, yAP, 1);		
    },
*/    
    addImage:function(image)
    {   	
		var h;
		
		// Cherche un handle libre
		var hFound=-1;
		for (h=this.nHandlesReel; h<this.nHandlesTotal; h++)
		{
		    if (this.handleToIndex[h]==-1)
		    {
				hFound=h;
				break;
		    }		
		}
	
		// Rajouter un handle
		if (hFound==-1)
		{
			this.handleToIndex.push(0);
		    hFound=this.nHandlesTotal++;
		}
		
		// Cherche une image libre
		var i;
		var iFound=-1;
		for (i=0; i<this.nImages; i++)
		{
		    if (this.images[i]==null)
		    {
				iFound=i;
				break;
		    }
		}		
		
		// Rajouter une image?
		if (iFound==-1)
		{
			this.images.push(0);
		    iFound=this.nImages++;
		}
		
		// Ajoute la nouvelle image
		this.handleToIndex[hFound]=iFound;
		this.images[iFound]=image;
		this.useCount[hFound]=1;
		
		return hFound;
    },
    loadImageList:function(handles)
    {
		var h;
	
		for (h=0; h<handles.length; h++)
		{
            if (handles[h]>=0 && handles[h]<this.nHandlesTotal)
            {
                if (this.offsetsToImage[handles[h]]!=0)
                {
	        	    if (this.getImageFromHandle(handles[h])==null)
                    {	
                       	var i;
                        var iFound=-1;
                        for (i=0; i<this.nImages; i++)
                        {
                            if (this.images[i]==null)
                            {
                                iFound=i;
                                break;
                            }
                        }		
                        if (iFound==-1)
                        {
                            var newImages=new Array(this.nImages+10);
                            for (i=0; i<this.nImages; i++)
                            {
                                newImages[i]=this.images[i];
                            }
                            for (; i<this.nImages+10; i++)
                            {
                                newImages[i]=null;
                            }
                            iFound=this.nImages;
                            this.nImages+=10;
                            this.images=newImages;
                        }
                        this.handleToIndex[handles[h]]=iFound;
                        this.images[iFound]=new CImage();
                        this.images[iFound].useCount=1;
                        this.file.seek(this.offsetsToImage[handles[h]]);
                        this.images[iFound].load(this.app);
                    }
                }
            }
		}                
    },
    
    getImageInfoEx:function(nImage, nAngle, fScaleX, fScaleY)
    {
		var ptei;
		if (this.pIfo==null)
		{
        	this.pIfo=new CImage();
       	}
       	
        ptei = this.getImageFromHandle(nImage);
		if ( ptei != null )
		{
			var cx= ptei.width;
			var cy= ptei.height;
			var hsx= ptei.xSpot;
			var hsy= ptei.ySpot;
			var asx= ptei.xAP;
			var asy= ptei.yAP;
	
			if ( nAngle == 0 )
			{
				if ( fScaleX != 1.0 )
				{
					hsx = hsx * fScaleX;
					asx = asx * fScaleX;
					cx = cx * fScaleX;
				}
	
				if ( fScaleY != 1.0 )
				{
					hsy = hsy * fScaleY;
					asy = asy * fScaleY;
					cy = cy * fScaleY;
				}
			}
			else
			{
				if ( fScaleX != 1.0 )
				{
					hsx = hsx * fScaleX;
					asx = asx * fScaleX;
					cx = cx * fScaleX;
				}
	
				if ( fScaleY != 1.0 )
				{
					hsy = hsy * fScaleY;
					asy = asy * fScaleY;
					cy = cy * fScaleY;
				}
	
				if (this.rcInfo==null)
				{
					this.rcInfo=new CRect();
				}
				if (this.hsInfo==null)
				{
					this.hsInfo=new CPoint();
				}
				if (this.apInfo==null)
				{
					this.apInfo=new CPoint();
				}
				this.hsInfo.x = hsx;
				this.hsInfo.y = hsy;
				this.apInfo.x = asx;
				this.apInfo.y = asy;
				this.rcInfo.left = this.rcInfo.top = 0;
				this.rcInfo.right = cx;
				this.rcInfo.bottom = cy;
				this.doRotateRect(this.rcInfo, this.hsInfo, this.apInfo, nAngle);
				cx = this.rcInfo.right;
				cy = this.rcInfo.bottom;
				hsx = this.hsInfo.x;
				hsy = this.hsInfo.y;
				asx = this.apInfo.x;
				asy = this.apInfo.y;
			}		
			this.pIfo.width = cx;
			this.pIfo.height = cy;
			this.pIfo.xSpot = hsx;
			this.pIfo.ySpot = hsy;
			this.pIfo.xAP = asx;
			this.pIfo.yAP = asy;
	
            return this.pIfo;
		}
		return ptei;
	},

	doRotateRect:function(prc, pHotSpot, pActionPoint, fAngle)
	{
		var x, y;	
		var cosa, sina;
	
		if ( fAngle == 90.0 )
		{
			cosa = 0.0;
			sina = 1.0;
		}
		else if ( fAngle == 180.0 )
		{
			cosa = -1.0;
			sina = 0.0;
		}
		else if ( fAngle == 270.0 )
		{
			cosa = 0.0;
			sina = -1.0;
		}
		else
		{
			var arad= fAngle * Math.PI / 180.0;
			cosa = Math.cos(arad);
			sina = Math.sin(arad);
		}
	
		var topLeftX;
		var topLeftY;
	
		var nhxcos;
		var nhxsin;
		var nhycos;
		var nhysin;
		if ( pHotSpot == null )
		{
			nhxcos = nhxsin = nhycos = nhysin = 0.0;
			topLeftX = topLeftY = 0;
		}
		else
		{
			nhxcos = -pHotSpot.x * cosa;
			nhxsin = -pHotSpot.x * sina;
			nhycos = -pHotSpot.y * cosa;
			nhysin = -pHotSpot.y * sina;
			topLeftX = nhxcos + nhysin;
			topLeftY = nhycos - nhxsin;
		}
	
		var topRightX;
		var topRightY;
	
		if ( pHotSpot == null )
			x = prc.right;
		else
			x = prc.right - pHotSpot.x;
		nhxcos = x * cosa;
		nhxsin = x * sina;
		topRightX = nhxcos + nhysin;
		topRightY = nhycos - nhxsin;
	
		var bottomRightX
		var bottomRightY;
	
		if ( pHotSpot == null )
			y = prc.bottom;
		else
			y = prc.bottom - pHotSpot.y;
		nhycos = y * cosa;
		nhysin = y * sina;
		bottomRightX = nhxcos + nhysin;
		bottomRightY = nhycos - nhxsin;
	
		var bottomLeftX;
		var bottomLeftY;
		bottomLeftX = topLeftX + bottomRightX - topRightX;
		bottomLeftY = topLeftY + bottomRightY - topRightY;
	
		var xmin = Math.min(topLeftX, Math.min(topRightX, Math.min(bottomRightX, bottomLeftX)));
		var ymin= Math.min(topLeftY, Math.min(topRightY, Math.min(bottomRightY, bottomLeftY)));
		var xmax= Math.max(topLeftX, Math.max(topRightX, Math.max(bottomRightX, bottomLeftX)));
		var ymax= Math.max(topLeftY, Math.max(topRightY, Math.max(bottomRightY, bottomLeftY)));
	
		if ( pActionPoint != null )
		{
			if ( pHotSpot == null )
			{
				x = pActionPoint.x;
				y = pActionPoint.y;
			}
			else
			{
				x = pActionPoint.x - pHotSpot.x;
				y = pActionPoint.y - pHotSpot.y;
			}
			pActionPoint.x = (x * cosa + y * sina) - xmin;
			pActionPoint.y = (y * cosa - x * sina) - ymin;
		}
	
		if ( pHotSpot != null )
		{
			pHotSpot.x = -xmin;
			pHotSpot.y = -ymin;
		}
	
		prc.right = xmax - xmin;
		prc.bottom = ymax - ymin;
	}
}

// CImage Object
// ----------------------------------------------------------------------------
CImage.maxRotatedMasks=10;
function CImage()
{
	this.app=null;
    this.handle=0;
    this.width=0;
    this.height=0;
    this.xSpot=0;
    this.ySpot=0;
    this.xAP=0;
    this.yAP=0;
    this.useCount=0;
    this.img=null;    
    this.maskNormal=null;
    this.maskPlatform=null;    
	this.maskRotation=null;
	this.filePointer=null;
	this.mosaic=0;
	this.mosaicX=0;
	this.mosaicY=0;
    this.texID=-1;
    this.texCoords=null;
}
CImage.createFromFile=function(application, fileName)
{
	var image=new CImage();
	image.app=application;
	image.img=new Image();
    image.img.onload=function()
    {
    	image.app.imageHasLoaded();
    	image.width=image.img.width;
    	image.height=image.img.height;
    }     
    application.imagesToLoad++;
    application.loading=true;
    image.img.src=fileName;
	return image;
}
CImage.prototype=
{
    loadHandle:function(file)
    {
    	this.filePointer=file.getFilePointer();
		this.handle=file.readAShort();
		file.skipBytes(12);
    },
	load:function(a)
    {
    	this.app=a;
    	this.filePointer=a.file.getFilePointer();
    	
		this.handle=a.file.readAShort();
        this.width=a.file.readAShort();
        this.height=a.file.readAShort();
		this.xSpot=a.file.readShort();
		this.ySpot=a.file.readShort();
		this.xAP=a.file.readShort();
		this.yAP=a.file.readShort();
        
        this.mosaic=0;
        if (this.app.frame.mosaicHandles != null)
        {
            if (this.app.frame.mosaicHandles[this.handle] != 0)
            {
                this.mosaic=this.app.frame.mosaicHandles[this.handle];
                this.app.imageBank.loadMosaic(this.mosaic);
                this.mosaicX = this.app.frame.mosaicX[this.handle];
                this.mosaicY = this.app.frame.mosaicY[this.handle];
                return;
            }
        }

        this.img=new Image();
        var that=this;
        this.img.onload=function()
        {
        	that.app.imageHasLoaded();
        }     
        this.app.imagesToLoad++;
        this.app.loading=true;
        var name = CServices.formatDiscName(this.handle, "png");        
        this.img.src=name;
    },
    createElement:function()
    {
        var e = document.createElement('div');

        e.style.width = this.width + 'px';
        e.style.height = this.height + 'px';

        e.style.backgroundRepeat = 'no-repeat';
        
        if (this.mosaic == 0)
        {
            e.style.backgroundImage = "url('" + this.img.src + "')";
        }
        else
        {
            e.style.backgroundPosition = '-' + this.mosaicX + 'px -' + this.mosaicY + 'px';
            e.style.backgroundImage = "url('M" + CServices.formatDiscName(this.mosaic, "png") + "')";
        }

        return e;
    },
    getPixel:function(x, y)
    {
    	if (this.mosaic)
    	{
          	var canvas=this.app.imageBank.mosaics[this.mosaic];
          	var context=canvas.getContext("2d");
			var imgd = context.getImageData(+this.mosaicX+x, this.mosaicY+y, 1, 1);
			return (imgd.data[0]<<16)|(imgd.data[1]<<8)||imgd.data[2];    		
    	}
    	else
    	{
    		var context=this.img.getContext("2d");
			var imgd = context.getImageData(x, y, 1, 1);
			return (imgd.data[0]<<16)|(imgd.data[1]<<8)||imgd.data[2];    		
    	}
    },
    getMask:function(flags, angle, scaleX, scaleY)
    {
        if ((flags & CMask.GCMF_PLATFORM) == 0)
        {
    		if (this.maskNormal==null)
    		{
    			this.maskNormal=new CMask();
    			this.maskNormal.createMask(this.app, this, flags);
    		}
        	if (angle==0 && scaleX==1.0 && scaleY==1.0)
        	{
    			return this.maskNormal;
        	}
        	
        	var rMask;
        	if (this.maskRotation==null)
        	{
        		this.maskRotation=new CArrayList();
        	}
        	var n;
        	var tick=0x7FFFFFFF;
        	var nOldest=-1;
        	for (n=0; n<this.maskRotation.size(); n++)
        	{
        		rMask=this.maskRotation.get(n);
        		if (angle==rMask.angle && scaleX==rMask.scaleX && scaleY==rMask.scaleY)
        		{
        			return rMask.mask; 
        		}
        		if (rMask.tick<tick)
        		{
        			tick=rMask.tick;
        			nOldest=n;
        		}
        	}
        	if (this.maskRotation.size()<this.maxRotatedMasks)
        	{
        		nOldest=-1;
        	}
    		rMask=new CRotatedMask();
			rMask.mask=new CMask();
			rMask.mask.createRotatedMask(this.maskNormal, angle, scaleX, scaleY);
        	rMask.angle=angle;
        	rMask.scaleX=scaleX;
        	rMask.scaleY=scaleY;
        	rMask.tick=this.app.timer;
        	if (nOldest<0)
        	{
        		this.maskRotation.add(rMask);
        	}
        	else
        	{
        		this.maskRotation.set(nOldest, rMask);
        	}
        	return rMask.mask;
        }
        else
        {
    		if (this.maskPlatform==null)
    		{
	    		if (this.maskNormal==null)
	    		{
	    			this.maskNormal=new CMask();
	    			this.maskNormal.createMask(this.app, this, 0);
	    		}
    			this.maskPlatform=new CMask();
    			this.maskPlatform.createMask(this.app, this, flags);
    		}
    		return this.maskPlatform;
        }
    }
}

// CFontBank object
// -----------------------------------------------------------------
function CFontBank(a)
{
	this.app=a;
    this.file=null;
    this.fonts=null;
    this.offsetsToFonts=null;
    this.nFonts=0;
    this.handleToIndex=null;
    this.maxHandlesReel=0;
    this.maxHandlesTotal=0;
    this.useCount=null;
    this.nullFont=new CFont();
    this.nullFont.createDefaultFont();
}
CFontBank.prototype=
{
    preLoad:function(file)
    {
		var number=file.readAInt();
		var n;
		
		this.maxHandlesReel=0;
		var debut=file.getFilePointer();
		var temp=new CFont();
		for (n=0; n<number; n++)
		{
		    temp.loadHandle(file);
		    this.maxHandlesReel=Math.max(this.maxHandlesReel, temp.handle+1);
		}
		file.seek(debut);
		this.offsetsToFonts=new Array(this.maxHandlesReel);
		for (n=0; n<number; n++)
		{
		    debut=file.getFilePointer();
		    temp.loadHandle(file);
		    this.offsetsToFonts[temp.handle]=debut;
		}	    
		this.useCount=new Array(this.maxHandlesReel);
		var n;
		for (n=0; n<this.maxHandlesReel; n++)
		    this.useCount[n]=0;
		this.handleToIndex=null;
		this.maxHandlesTotal=this.maxHandlesReel;
		this.nFonts=0;
		this.fonts=null;
    },
    
    load:function(file)
    {
		var n;
		this.nFonts=0;
		for (n=0; n<this.maxHandlesReel; n++)
		{
		    if (this.useCount[n]!=0)
		    {
				this.nFonts++;
		    }
		}
	
		var newFonts=new Array(this.nFonts);
		var count=0;
		var h;
		for (h=0; h<this.maxHandlesReel; h++)
		{
		    if (this.useCount[h]!=0)
		    {
				if (this.fonts!=null && this.handleToIndex[h]!=-1 && this.fonts[this.handleToIndex[h]]!=null)
				{
				    newFonts[count]=this.fonts[this.handleToIndex[h]];
				    newFonts[count].useCount=this.useCount[h];
				}
				else
				{
				    newFonts[count]=new CFont();
				    file.seek(this.offsetsToFonts[h]);
				    newFonts[count].load(file);
				    newFonts[count].useCount=this.useCount[h];
				}
				count++;
		    }
		}
		this.fonts=newFonts;

		this.handleToIndex=new Array(this.maxHandlesReel);
		for (n=0; n<this.maxHandlesReel; n++)
		{
		    this.handleToIndex[n]=-1;
		}
		for (n=0; n<this.nFonts; n++)
		{
		    this.handleToIndex[this.fonts[n].handle]=n;
		}
		this.maxHandlesTotal=this.maxHandlesReel;
	
		this.resetToLoad();	
    },
    
    getFontFromHandle:function(handle)
    {
		if (handle==-1)
		{
		    return this.nullFont;
		}
		if (handle>=0 && handle<this.maxHandlesTotal)
		    if (this.handleToIndex[handle]!=-1)
				return this.fonts[this.handleToIndex[handle]];
		return null;
    },
    
    getFontFromIndex:function(index)
    {
		if (index>=0 && index<this.nFonts)
		    return this.fonts[index];
		return null;
    }, 
    
    getFontInfoFromHandle:function(handle)
    {
		var font=this.getFontFromHandle(handle);
		return font.getFontInfo();
    }, 
    
    resetToLoad:function()
    {
    	if ((this.app.dwOptions&CRunApp.AH2OPT_KEEPRESOURCESBETWEENFRAMES)==0)
    	{
			var n;
			for (n=0; n<this.maxHandlesReel; n++)
			{
			    this.useCount[n]=0;
			}
		}
    },
    
    setToLoad:function(handle)
    {
		if (handle==-1)
		{
		    if (this.nullFont==null)
		    {
				this.nullFont=new CFont();
				this.nullFont.createDefaultFont();		
		    }
		    return;
		}
		this.useCount[handle]++;
    },

    enumerate:function(num)
    {
		this.setToLoad(num);
		return -1;
    },
    
    addFont:function(info)
    {
		var h;
	
		// Cherche une fonte identique
		var n;
		for (n=0; n<this.nFonts; n++)
		{
		    if (this.fonts[n]==null) continue;
		    if (this.fonts[n].lfHeight!=info.lfHeight) continue;
		    if (this.fonts[n].lfWeight!=info.lfWeight) continue; 
		    if (this.fonts[n].lfItalic!=info.lfItalic) continue; 
		    if (this.fonts[n].lfFaceName!=info.lfFaceName) continue;
		    break;
		}
		if (n<this.nFonts)
		{
		    return this.fonts[n].handle;
		}
	
		var hFound=-1;
		for (h=this.maxHandlesReel; h<this.maxHandlesTotal; h++)
		{
		    if (this.handleToIndex[h]==-1)
		    {
				this.hFound=h;
				break;
		    }		
		}

		if (hFound==-1)
		{
		    var newHToI=new Array(this.maxHandlesTotal+10);
		    for (h=0; h<this.maxHandlesTotal; h++)
		    {
				newHToI[h]=this.handleToIndex[h];
		    }
		    for (; h<this.maxHandlesTotal+10; h++)
		    {
				newHToI[h]=-1;
		    }
		    hFound=this.maxHandlesTotal;
		    this.maxHandlesTotal+=10;
		    this.handleToIndex=newHToI;
		}
	
		var f;
		var fFound=-1;
		for (f=0; f<this.nFonts; f++)
		{
		    if (this.fonts[f]==null)
		    {
				fFound=f;
				break;
		    }
		}		
	
		if (fFound==-1)
		{
			fFound=this.nFonts;
			this.fonts.push(null);
		}
	
		this.handleToIndex[hFound]=fFound;
		this.fonts[fFound]=new CFont();
		this.fonts[fFound].handle=hFound;
		this.fonts[fFound].lfHeight=info.lfHeight; 
		this.fonts[fFound].lfWeight=info.lfWeight; 
		this.fonts[fFound].lfItalic=info.lfItalic; 
		this.fonts[fFound].lfFaceName=info.lfFaceName;
			
		return hFound;
    }
}

// CFont object
// ------------------------------------------------------
function CFont()
{
    this.useCount=0;
    this.handle=0;
    this.lfHeight=0; 
    this.lfWeight=0; 
    this.lfItalic=0; 
    this.lfFaceName=null;
    this.font=null;
}
CFont.prototype=
{
    loadHandle:function(file)
    {
		this.handle=file.readAInt();
        if (file.bUnicode==false)
        {
            file.skipBytes(0x48);
        }
        else
        {
            file.skipBytes(0x68);
        }
    },
    
    load:function(file)
    {
		this.handle=file.readAInt();
		var debut=file.getFilePointer();
		file.skipBytes(12);
	
		this.lfHeight=file.readAInt(); 
		if (this.lfHeight<0)
		    this.lfHeight=-this.lfHeight;
		file.readAInt(); 
		file.readAInt(); 
		file.readAInt(); 
		this.lfWeight=file.readAInt(); 
		this.lfItalic=file.readAByte(); 
		file.readAByte(); 
		file.readAByte(); 
		file.readAByte(); 
		file.readAByte(); 
		file.readAByte(); 
		file.readAByte(); 
		file.readAByte(); 
		this.lfFaceName=file.readAString();
		
        if (file.bUnicode==false)
        {
            file.seek(debut+0x48);
        }
        else
        {
            file.seek(debut+0x68);
        }
    },
    
    getFontInfo:function()
    {
		var info=new CFontInfo();
		info.lfHeight=this.lfHeight; 
		info.lfWeight=this.lfWeight; 
		info.lfItalic=this.lfItalic; 
		info.lfFaceName=this.lfFaceName;
		return info;
    },
    
    createDefaultFont:function()
    {
		this.lfFaceName="Arial";
		this.lfHeight=13;
		this.lfWeight=400;
		this.lfItalic=0;
    },
 
 	getHeight:function()
 	{
 		return this.lfHeight;
 	},
 	
	getFont:function()
	{
		if (this.font==null)
		{
			if (this.lfItalic)
				this.font="italic ";
			else
				this.font="normal "
			
			var weight=Math.floor(this.lfWeight/100)*100;
			weight=Math.max(weight, 100);
			weight=Math.min(weight, 900);
			this.font+=weight+" ";
		
			var height=CServices.heightNormalToLF(this.lfHeight);		
			this.font+=height+"px ";
			this.font+=this.lfFaceName;
		}
		return this.font;
	}    
}

// CSoundBank object
// -----------------------------------------------------------------

function CSoundBank(a)
{
    this.app=a;
    this.sounds=null;
    this.nHandlesReel=0;
    this.nHandlesTotal=0;
    this.nSounds=0;
    this.offsetsToSounds=null;
    this.handleToIndex=null;
    this.useCount=null;
    this.file=null;
//  this.bChrome=navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}
CSoundBank.prototype=
{
    preLoad:function(f)
    {
    	this.file=f;

		this.nHandlesReel=this.file.readAShort();
		this.offsetsToSounds=new Array(this.nHandlesReel);
		
		var nSons=this.file.readAShort();
		var n;
		var sound=new CSound(this.app);
		var offset;
		for (n=0; n<nSons; n++)
		{
			offset=this.file.getFilePointer();
		    sound.loadHandle();
		    this.offsetsToSounds[sound.handle]=offset;
		}
		
		this.useCount=new Array(this.nHandlesReel);
		this.handleToIndex=new Array(this.nHandlesReel);
		var n;
		for (n=0; n<this.nHandlesReel; n++)
		{
		    this.useCount[n]=0;
		    this.handleToIndex[n]=-1;
   		}
		this.nHandlesTotal=this.nHandlesReel;
		this.nSounds=0;
		this.sounds=null;
    },
    
    getSoundFromHandle:function(handle)
    {
		if (handle>=0 && handle<this.nHandlesTotal)
		    if (this.handleToIndex[handle]!=-1)
			return this.sounds[this.handleToIndex[handle]];
		return null;
    },
    checkLoad:function()
    {
    	var index;
    	for (index=0; index<this.nSounds; index++)
    	{
    		if (this.sounds[index]!=null)
    		{
    			this.sounds[index].checkLoad();
    		}
    	}
    },
    getSoundFromIndex:function(index)
    {
		if (index>=0 && index<this.nSounds)
		    return this.sounds[index];
		return null;
    },
    
    resetToLoad:function()
    {
    	if ((this.app.dwOptions&CRunApp.AH2OPT_KEEPRESOURCESBETWEENFRAMES)==0)
    	{
			var n;
			for (n=0; n<this.nHandlesReel; n++)
			    this.useCount[n]=0;
		}
    },
    	    
    setToLoad:function(handle)
    {
		this.useCount[handle]++;
    },

    enumerate:function(num)
    {
		this.setToLoad(num);
		return -1;
    },

	
    load:function()
    {
		var n;
		
		this.nSounds=0;
		for (n=0; n<this.nHandlesReel; n++)
		{
		    if (this.useCount[n]!=0)
				this.nSounds++;
		}
	
		var newSounds=new Array(this.nSounds);
		var count=0;
		var h;
		for (h=0; h<this.nHandlesReel; h++)
		{
		    if (this.useCount[h]!=0)
		    {
				if (this.sounds!=null && this.handleToIndex[h]!=-1 && this.sounds[this.handleToIndex[h]]!=null)
				{
				    newSounds[count]=this.sounds[this.handleToIndex[h]];
				    newSounds[count].useCount=this.useCount[h];
				}
				else
				{
				    newSounds[count]=new CSound(this.app);
                    this.file.seek(this.offsetsToSounds[h]);
                    newSounds[count].load();
				    newSounds[count].useCount=this.useCount[h];
				}
				count++;
		    }
		}
		this.sounds=newSounds;
	
		this.handleToIndex=new Array(this.nHandlesReel);
		for (n=0; n<this.nHandlesReel; n++)
		    this.handleToIndex[n]=-1;
		for (n=0; n<this.nSounds; n++)
		    this.handleToIndex[this.sounds[n].handle]=n;
		this.nHandlesTotal=this.nHandlesReel;
		
		this.resetToLoad();
    }    
}

// CSound object
// -----------------------------------------------------------------
function CSound(a)
{
    this.application=a;
    this.type=0;
    this.file=a.file;
	this.handle=-1;
	this.sound=null;
	this.useCount=0;
	this.bUninterruptible=false;
	this.nLoops=0;
	this.numSound=0;
	this.name=null;
    this.bPaused=false;
    this.bPlaying=false;
    this.frequency=0;
}
CSound.prototype=
{
    loadHandle:function()
    {
        this.handle = this.file.readAShort();
        this.file.skipBytes(5);
        var l = this.file.readAShort();
        if (this.file.bUnicode == false)
            this.file.skipBytes(l);
		else
            this.file.skipBytes(l * 2);
    },
   
   	createFromSound:function()
    {
    	if (HTMLMediaElement.mozLoadFrom)
    	{    		
	        var snd = new CSound(this.application);
	        snd.handle = this.handle;
	        snd.sound = HTMLMediaElement.mozLoadFrom(this.sound);
	        snd.name = this.name;
	        snd.type = this.type;
	        snd.song = this.song;
	        snd.type=this.type;
	        return snd;
	   	}
	   	return this;	   	
    },
   
    load:function()
    {
        this.handle = this.file.readAShort();
        this.type = this.file.readAByte();
        this.frequency=this.file.readAInt();
        var l = this.file.readAShort();
        this.name = this.file.readAString(l);
        
        this.sound=null;
        var playableFormats=this.application.soundPlayer.playableFormats&this.type;
        var format;
        for (format=0; format<4; format++)
        {
        	if (playableFormats&(1<<format))
        	{
        		break;
        	}
        }
        if (format<4)
        {
	        var ext="";
	        switch(format)
	        {
	        	case 0:
	        		ext="ogg";
	        		break;
	        	case 1:
	        		ext="aac";
	        		break;
	        	case 2:
	        		ext="mp3";
	        		break;
	        	case 3:
	        		ext="wav"
	        		break;	        
        	}
	        this.sound=new Audio();
    	    this.sound.preload="auto";
	        this.application.imagesToLoad++;
	        this.application.loading=true;
	        var that=this;
			this.sound.addEventListener("loadeddata", function(e)
			{
        		that.application.imageHasLoaded();
				that.sound.removeEventListener('loadeddata', arguments.callee, false);
			}, false);		
 	        this.sound.src= CServices.formatDiscName(this.handle, ext);
	        this.sound.load();
	        this.sound.autoplay=false;
	   	}
    },
	play:function(nl, bPrio, v)
	{		
		if (this.sound)
		{
			this.nLoops=nl;
			if (this.nLoops==0)
			{
				this.nLoops=10000000;
			}
			this.sound.volume=(v / 100.0);
			this.sound.playbackRate=1.0;
			if (this.application.browserDetect.browser!="Explorer")
				this.sound.load();
			else				
				this.sound.currentTime=0;
			this.bPaused=false;
			this.bPlaying=true;
			this.sound.play();
		}	
	},

    stop:function()
    {
    	if (this.sound)
    	{
	    	this.sound.pause();
	        this.bUninterruptible = false;
	        this.bPlaying=false;
	    }
    },
    
    setVolume:function(v)
    {
    	if (this.sound)
       		this.sound.volume = (v / 100.0);
    },
    
    pause:function()
    {
    	if (this.sound)
    		this.sound.pause();
    	this.bPaused=true;
    },
    
    resume:function()
    {
    	if (this.sound)
    		this.sound.play();
    	this.bPaused=false;
    },
    
    isPaused:function()
    {
    	return this.bPaused;
    },
    
    isPlaying:function()
    {
    	if (this.sound && this.bPlaying)
    	{
    		return !this.bPaused;
    	}
    	return false;
    },
    
    getDuration:function()
    {
    	if (this.sound && this.sound.duration!=undefined && isNaN(this.sound.duration)==false && this.sound.duration!=Infinity)
    	{
    		return Math.floor(this.sound.duration*1000);
    	}
    	return 0;
    },
    
    getPosition:function()
    {
    	if (this.sound)
    		return Math.floor(this.sound.currentTime*1000);
    	return 0;
    },
    
    setPosition:function(t)
    {
    	if (this.sound)
    		this.sound.currentTime=t/1000;
    },
    
    setPitch:function(t)
    {
    	if (this.sound)
    		this.sound.playbackRate=t;
    },
    
    checkSound:function()
    {
    	if (this.bPlaying==true && this.bPaused==false)
    	{
            if (this.sound.ended)
            {
                if (this.nLoops > 0)
                {
                    this.nLoops--;
                    if (this.nLoops > 0)
                    {
                    	this.sound.currentTime=0;
                    	this.sound.play();
                        return false;
                    }
                }
                this.bUninterruptible = false;
                this.bPlaying=false;
                return true;
            }
        }
        return false;
    }
   
}
    

    
