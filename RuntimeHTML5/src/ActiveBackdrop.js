//----------------------------------------------------------------------------------
//
// CRUNACTIVEBACKDROP
//
//----------------------------------------------------------------------------------
this.ActiveBackdrop = CRunActiveBackdrop;

function CRunActiveBackdrop()
{
	this.nImages=0;
	this.imageList=null;
	this.flags=0;
	this.currentImage=0;
	this.pLayer=null;
}
CRunActiveBackdrop.prototype=CServices.extend(new CRunExtension(),
{
	getNumberOfConditions:function()
	{
		return 1;
	},
	
	createRunObject:function(file, cob, version)
	{
		this.ho.hoImgWidth = file.readAInt();
		this.ho.hoImgHeight = file.readAInt();
		this.nImages=file.readAShort();
		this.flags=file.readAInt();
		this.imageList=new Array(this.nImages);
		var n;
		for (n=0; n<this.nImages; n++)
		{
			this.imageList[n]=file.readAShort();
		}
		if (this.nImages>0)
		{
			this.ho.loadImageList(this.imageList);
			this.currentImage=0;
		}
		else
		{
			this.currentImage=-1;
		}

		this.nLayer=this.ho.hoLayer;
		this.pLayer=this.rh.rhFrame.layers[this.nLayer];
	 	this.bShown=true;
		this.bAddedToPlane=true;
		this.plane=this.pLayer.planeBack;
		this.plane.addChild(this.ho);		
		this.getZoneInfos();
		return false;
	},
	destroyRunObject:function(bFast)
	{
		this.plane.removeChild(this.ho);
	},
	displayRunObject:function(context, xDraw, yDraw)
	{
        if (this.currentImage>=0)
        {
	        var x=this.ho.hoX-this.rh.rhWindowX+xDraw+this.pLayer.x;
	        var y=this.ho.hoY-this.rh.rhWindowY+yDraw+this.pLayer.y;
			var image=this.rh.rhApp.imageBank.getImageFromHandle(this.imageList[this.currentImage]);
			image.draw(context, x, y);				
		}		
	},
	getZoneInfos:function()
	{
		if (this.currentImage>=0)
		{
			var image=this.ho.getImage(this.imageList[this.currentImage]);
			this.ho.hoImgWidth=image.width;
			this.ho.hoImgHeight=image.height;
		}
		else
		{
			this.ho.hoImgWidth=1;
			this.ho.hoImgHeight=1;
		}
	},
	
	condition:function(num, cnd)
	{
		switch (num)
		{
			case 0:
				return this.ho.bShown;
		}
		return false;
	},
	
	action:function(num, act)
	{   
		switch (num)
		{        
			case 0:
				this.actSetImage(act);
				break;
			case 1:
				this.actSetX(act);
				break;
			case 2:
				this.actSetY(act);
				break;
			case 3:
				this.actShow(act);
				break;
			case 4:
				this.actHide(act);
				break;
		}
	},
	
	actSetImage:function(act)
	{
		var image=act.getParamExpression(this.rh, 0);
		if (image>=0 && image<this.nImages)
		{
			this.currentImage=image;
			this.getZoneInfos();
		}			
	},
	actSetX:function(act)
	{
		ho.hoX=act.getParamExpression(rh, 0);
	},
	actSetY:function(act)
	{
		ho.hoY=act.getParamExpression(rh, 0);
	},
	actHide:function(act)
	{
		this.ho.bShown=false;
	},
	actShow:function(act)
	{
		this.ho.bShown=true;
	},

	expression:function(num)
	{
		switch (num)
		{
			case 0:
				return this.currentImage;
			case 1:
				return this.ho.hoX;
			case 2:
				return this.ho.hoY;
		}
		return 0;
	}
});



