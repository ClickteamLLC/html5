// CMoveDef object
// ----------------------------------------------------------------
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

CMoveDef.MVTYPE_STATIC=0;
CMoveDef.MVTYPE_MOUSE=1;
CMoveDef.MVTYPE_RACE=2;
CMoveDef.MVTYPE_GENERIC=3;
CMoveDef.MVTYPE_BALL=4;
CMoveDef.MVTYPE_TAPED=5;
CMoveDef.MVTYPE_PLATFORM=9;
CMoveDef.MVTYPE_DISAPPEAR=11;
CMoveDef.MVTYPE_APPEAR=12;
CMoveDef.MVTYPE_BULLET=13;
CMoveDef.MVTYPE_EXT=14;
function CMoveDef()
{
    this.mvType=100;
    this.mvControl=0;
    this.mvMoveAtStart=0;
    this.mvDirAtStart=0;
    this.mvOpt=0;
}
CMoveDef.prototype=
{
	setData:function(t, c, m, d, mo)
    {
        this.mvType=t;
        this.mvControl=c;
        this.mvMoveAtStart=m;
        this.mvDirAtStart=d;
        this.mvOpt=mo;
    }
}

// CMoveDefList object
// ----------------------------------------------------------------
function CMoveDefList()
{
	this.nMovements=0;
	this.moveList=null;
}
CMoveDefList.prototype=
{
    load:function(file)
    {
        var debut=file.getFilePointer();
        this.nMovements=file.readAInt();
        this.moveList=new Array(this.nMovements);
        var n;
        for (n=0; n<this.nMovements; n++)
        {
            file.seek(debut+4+16*n); 
            
            var moduleNameOffset=file.readAInt();
            var mvtID=file.readAInt();
            var dataOffset=file.readAInt();
            var dataLength=file.readAInt();
        
            file.seek(debut+dataOffset);
            var control=file.readAShort();
            var type=file.readAShort();
            var move=file.readAByte();
            var mo=file.readAByte();
            file.skipBytes(2);	           
            var dirAtStart=file.readAInt();
            switch (type)
            {
                case 0:
                    this.moveList[n]=new CMoveDefStatic();
                    break;
                case 1:
                    this.moveList[n]=new CMoveDefMouse();
                    break;
                case 2:
                    this.moveList[n]=new CMoveDefRace();
                    break;
                case 3:
                    this.moveList[n]=new CMoveDefGeneric();
                    break;
                case 4:
                    this.moveList[n]=new CMoveDefBall();
                    break;
                case 5:
                    this.moveList[n]=new CMoveDefPath();
                    break;
                case 9:
                    this.moveList[n]=new CMoveDefPlatform();
                    break;
                case 14:
                    this.moveList[n]=new CMoveDefExtension();
                    break;
            }
            this.moveList[n].setData(type, control, move, dirAtStart, mo);
            this.moveList[n].load(file, dataLength-12);
            if (type==14)
            {
                file.seek(debut+moduleNameOffset);
                var name=file.readAString();
				name=name.substring(0, name.length-4);
				name=name.toLowerCase();
                this.moveList[n].setModuleName(name, mvtID);
            }
        }
    }
}

// CMoveDefBall object
// ------------------------------------------------------------------
function CMoveDefBall()
{
	this.mbSpeed=0;
	this.mbBounce=0;
	this.mbAngles=0;
	this.mbSecurity=0;
	this.mbDecelerate=0;
}
CMoveDefBall.prototype=CServices.extend(new CMoveDef(),
{	
    load:function(file, length)
    {
        this.mbSpeed=file.readAShort();
        this.mbBounce=file.readAShort();
        this.mbAngles=file.readAShort();
        this.mbSecurity=file.readAShort();
        this.mbDecelerate=file.readAShort();       
    }   
});

// CMoveDefGeneric object
// -----------------------------------------------------------------
function CMoveDefGeneric()
{
	this.mgSpeed=0;
	this.mgAcc=0;
	this.mgDec=0;
	this.mgBounceMult=0;
	this.mgDir=0;
}
CMoveDefGeneric.prototype=CServices.extend(new CMoveDef(),
{
    load:function(file, length)
    {
        this.mgSpeed=file.readAShort();
        this.mgAcc=file.readAShort();
        this.mgDec=file.readAShort();
        this.mgBounceMult=file.readAShort();
        this.mgDir=file.readAInt();        
    }
});

// CMoveDefMouse object
// -----------------------------------------------------------------
function CMoveDefMouse()
{
    this.mmDx=0;      				
    this.mmFx=0;
    this.mmDy=0;
    this.mmFy=0;
    this.mmFlags=0;
}
CMoveDefMouse.prototype=CServices.extend(new CMoveDef(),
{
    load:function(file, length)
    {
        this.mmDx=file.readShort();
        this.mmFx=file.readShort();
        this.mmDy=file.readShort();
        this.mmFy=file.readShort();
        this.mmFlags=file.readAShort();
    }
});

// CMoveDefPath object
// -----------------------------------------------------------------
function CMoveDefPath()
{
    this.mtNumber=0;	 
    this.mtMinSpeed=0; 
    this.mtMaxSpeed=0;
    this.mtLoop=0;	
    this.mtRepos=0;	
    this.mtReverse=0;
    this.steps=null;
}
CMoveDefPath.prototype=CServices.extend(new CMoveDef(),
{
    load:function(file, length)
    {
        this.mtNumber=file.readAShort();
        this.mtMinSpeed=file.readAShort();
        this.mtMaxSpeed=file.readAShort();
        this.mtLoop=file.readAByte();	
        this.mtRepos=file.readAByte();
        this.mtReverse=file.readAByte();
        file.skipBytes(1);

        this.steps=new Array(this.mtNumber);
        var n, next;
        var debut;
        for (n=0; n<this.mtNumber; n++)
        {
            debut=file.getFilePointer();
            this.steps[n]=new CPathStep();
            file.readUnsignedByte();
            next=file.readUnsignedByte();
            this.steps[n].load(file);
            file.seek(debut+next);
        }
    }
});

// CPathStep object
// ----------------------------------------------------------
function CPathStep()
{
    this.mdSpeed=0;
    this.mdDir=0;
    this.mdDx=0;
    this.mdDy=0;
    this.mdCosinus=0;
    this.mdSinus=0;
    this.mdLength=0;
    this.mdPause=0;
    this.mdName=null;
}
CPathStep.prototype=
{
    load:function(file)
    {
        this.mdSpeed=file.readAByte();
        this.mdDir=file.readAByte();
        this.mdDx=file.readShort();
        this.mdDy=file.readShort();
        this.mdCosinus=file.readShort();
        this.mdSinus=file.readShort();
        this.mdLength=file.readAShort();
        this.mdPause=file.readAShort();
        var name=file.readAString();
        if (name.length>0)
            this.mdName=name;
    }       
}

// CMoveDefPlatform object
// -------------------------------------------------------------
function CMoveDefPlatform()
{
    this.mpSpeed=0;
    this.mpAcc=0;	
    this.mpDec=0;	
    this.mpJumpControl=0;
    this.mpGravity=0;
    this.mpJump=0;
}
CMoveDefPlatform.prototype=CServices.extend(new CMoveDef(),
{
    load:function(file, length)
    {
        this.mpSpeed=file.readAShort();
        this.mpAcc=file.readAShort();	
        this.mpDec=file.readAShort();	
        this.mpJumpControl=file.readAShort();
        this.mpGravity=file.readAShort();
        this.mpJump=file.readAShort();        
    }
});

// CMoveDefRace object
// ------------------------------------------------------------
function CMoveDefRace()
{
    this.mrSpeed=0;
    this.mrAcc=0;	
    this.mrDec=0;	
    this.mrRot=0;	
    this.mrBounceMult=0;
    this.mrAngles=0;
    this.mrOkReverse=0;
}
CMoveDefRace.prototype=CServices.extend(new CMoveDef(),
{
    load:function(file, length)
    {
        this.mrSpeed=file.readAShort();
        this.mrAcc=file.readAShort();	
        this.mrDec=file.readAShort();	
        this.mrRot=file.readAShort();	
        this.mrBounceMult=file.readAShort();
        this.mrAngles=file.readAShort();
        this.mrOkReverse=file.readAShort();        
    }
});

// CMoveDefStatic object
// ------------------------------------------------------------
function CMoveDefStatic()
{
}
CMoveDefStatic.prototype=CServices.extend(new CMoveDef(),
{
    load:function(file, length)
    {	        
    }	
});

// CMoveDefStatic object
// ------------------------------------------------------------
function CMoveDefExtension()
{
	this.moduleName=null;
	this.mvtID=0;
	this.data=0;
}
CMoveDefExtension.prototype=CServices.extend(new CMoveDef(),
{
    load:function(file, length)
    {	        
		file.skipBytes(14);
		this.data=file.getFilePointer();
    },	
    setModuleName:function(name, id)
    {
        this.moduleName=name;
        this.mvtID=id;
    }
});

// CMove object
// ------------------------------------------------------------
CMove.Cosinus32=
[
	256,251,236,212,181,142,97,49,
	0,-49,-97,-142,-181,-212,-236,-251,
	-256,-251,-236,-212,-181,-142,-97,-49,
	0,49,97,142,181,212,236,251 
];
CMove.Sinus32=
[
	0,-49,-97,-142,-181,-212,-236,-251,
	-256,-251,-236,-212,-181,-142,-97,-49,
	0,49,97,142,181,212,236,251,
	256,251,236,212,181,142,97,49 
];
CMove.accelerators=
[
	0x0002,0x0003,0x0004,0x0006,0x0008,0x000a,0x000c,0x0010,0x0014,0x0018,
	0x0030,0x0038,0x0040,0x0048,0x0050,0x0058,0x0060,0x0068,0x0070,0x0078,
	0x0090,0x00A0,0x00B0,0x00c0,0x00d0,0x00e0,0x00f0,0x0100,0x0110,0x0120,
	0x0140,0x0150,0x0160,0x0170,0x0180,0x0190,0x01a0,0x01b0,0x01c0,0x01e0,
	0x0200,0x0220,0x0230,0x0250,0x0270,0x0280,0x02a0,0x02b0,0x02d0,0x02e0,
	0x0300,0x0310,0x0330,0x0350,0x0360,0x0380,0x03a0,0x03b0,0x03d0,0x03e0,
	0x0400,0x0460,0x04c0,0x0520,0x05a0,0x0600,0x0660,0x06c0,0x0720,0x07a0,
	0x0800,0x08c0,0x0980,0x0a80,0x0b40,0x0c00,0x0cc0,0x0d80,0x0e80,0x0f40,
	0x1000,0x1990,0x1332,0x1460,0x1664,0x1800,0x1999,0x1b32,0x1cc6,0x1e64,
	0x2000,0x266c,0x2d98,0x3404,0x3a70,0x40dc,0x4748,0x4db4,0x5400,0x6400,
	0x6400
];
CMove.Joy2Dir= 
[
	-1,	
	8,	
	24,	
	-1,	
	16,	
	12,	
	20,	
	16,	
	0,	
	4,	
	28,	
	0,	
	-1,	
	8,	
	24,	
	-1	
];
CMove.CosSurSin32=[2599,0,844,31,479,30,312,29,210,28,137,27,78,26,25,25,0,24];
CMove.mvap_TableDirs=
[
	0,-2, 	0,2, 	0,-4, 	0,4, 	0,-8, 	0,8, 	-4,0, 	-8,0, 	0,0,
	-2,-2,	2,2,	-4,-4,	4,4,	-8,-8,	8,8,	-4,4,	-8,8,	0,0,
	-2,0,	2,0,	-4,0,	4,0,	-8,0,	8,0,	0,4,	0,8,	0,0,
	-2,2,	2,-2,	-4,4,	4,-4,	-8,8,	8,-8,	4,4,	8,8,	0,0,
	0,2,	0,-2,	0,4,	0,-4,	0,8,	0,-8,	4,0,	8,0,	0,0,
	2,2,	-2,-2,	4,4,	-4,-4,	8,8,	-8,-8,	4,-4,	8,-8,	0,0,
	2,0,	-2,0,	4,0,	-4,0,	8,0,	-8,0,	0,-4,	0,-8,	0,0,
	2,-2,	-2,2,	4,-4,	-4,4,	8,-8,	-8,8,	-4,-4,	-8,-8,	0,0	
];
CMove.MVTOPT_8DIR_STICK=0x01;
CMove.getDeltaX=function(pente, angle)
{
	return (pente*CMove.Cosinus32[angle])/256;
}
CMove.getDeltaY=function(pente, angle)
{
	return (pente*CMove.Sinus32[angle])/256;
}
function CMove()
{
    this.hoPtr=null;
    this.rmAcc=0;
    this.rmDec=0; 
    this.rmCollisionCount=0;
    this.rmStopSpeed=0;
    this.rmAccValue=0;	
    this.rmDecValue=0;	
	this.rmOpt=0;
}

CMove.prototype=
{	
    newMake_Move:function(speed, angle)
    {
        this.hoPtr.hoAdRunHeader.rh3CollisionCount++;
		this.rmCollisionCount=this.hoPtr.hoAdRunHeader.rh3CollisionCount;
		this.hoPtr.rom.rmMoveFlag=false;
	
		if (speed==0)
		{
            this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr);
            return false;
		}

        var x, y;
		var speedShift;
		if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
		{
            speedShift=Math.floor(speed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef*32.0);
		}
		else
		{
            speedShift=speed<<5;
		}
		while(speedShift>0x0800)
		{
            x=this.hoPtr.hoX<<16|this.hoPtr.hoCalculX&0x0000FFFF;
            y=this.hoPtr.hoY<<16|this.hoPtr.hoCalculY&0x0000FFFF;
            x+= CMove.Cosinus32[angle] * 0x0800;
            y+= CMove.Sinus32[angle] * 0x0800;
            this.hoPtr.hoCalculX=x&0x0000FFFF;
            this.hoPtr.hoX=x>>16;
            this.hoPtr.hoCalculY=y&0x0000FFFF;
            this.hoPtr.hoY=y>>16;
            
            if (this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr))
			{
				return true;	
			}
			if (this.hoPtr.rom.rmMoveFlag)
            {
                break;
            }
            speedShift-=0x0800;
		};
		if (!this.hoPtr.rom.rmMoveFlag)
		{
            x=this.hoPtr.hoX<<16|this.hoPtr.hoCalculX&0x0000FFFF;
            y=this.hoPtr.hoY<<16|this.hoPtr.hoCalculY&0x0000FFFF;
            x+= CMove.Cosinus32[angle] * speedShift;
            y+= CMove.Sinus32[angle] * speedShift;
            this.hoPtr.hoCalculX=x&0x0000FFFF;
            this.hoPtr.hoX=x>>16;
            this.hoPtr.hoCalculY=y&0x0000FFFF;
            this.hoPtr.hoY=y>>16;
		
            if (this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr))	
			{
				return true;	
			}
		}
		this.hoPtr.roc.rcChanged=true;
		if (!this.hoPtr.rom.rmMoveFlag)
            this.hoPtr.hoAdRunHeader.rhVBLObjet=0;	

		return this.hoPtr.rom.rmMoveFlag;
    },    

    moveAtStart:function(mvPtr)
    {
        if (mvPtr.mvMoveAtStart==0)
        {
            this.stop();
        }
    },
    
	getAccelerator:function(acceleration)
	{
        if (acceleration<=100)
        {
            return CMove.accelerators[acceleration];
        }
        return acceleration<<8;
   },

    mv_Approach:function(bStickToObject)
    {
    	if (bStickToObject)
    	{
    		this.mb_Approach(false);
    		return;
    	}
    	
    	var flag=false;
    	
    	switch(this.hoPtr.hoAdRunHeader.rhEvtProg.rhCurCode&0xFFFF0000)
		{
            case (-12<<16):         // CNDL_EXTOUTPLAYFIELD:
                var x=this.hoPtr.hoX-this.hoPtr.hoImgXSpot;
                var y=this.hoPtr.hoY-this.hoPtr.hoImgYSpot;
                var dir=this.hoPtr.hoAdRunHeader.quadran_Out(x, y, x+this.hoPtr.hoImgWidth, y+this.hoPtr.hoImgHeight);
                x=this.hoPtr.hoX;
                y=this.hoPtr.hoY;
                if ((dir&CRun.BORDER_LEFT)!=0)
                    x=this.hoPtr.hoImgXSpot;
                if ((dir&CRun.BORDER_RIGHT)!=0)
                    x=this.hoPtr.hoAdRunHeader.rhLevelSx-this.hoPtr.hoImgWidth+this.hoPtr.hoImgXSpot;
                if ((dir&CRun.BORDER_TOP)!=0)
                    y=this.hoPtr.hoImgYSpot;
                if ((dir&CRun.BORDER_BOTTOM)!=0)
                    y=this.hoPtr.hoAdRunHeader.rhLevelSy-this.hoPtr.hoImgHeight+this.hoPtr.hoImgYSpot;
                this.hoPtr.hoX=x;
                this.hoPtr.hoY=y;
				return;
		    case (-13<<16):	    // CNDL_EXTCOLBACK:
		    case (-14<<16):	    // CNDL_EXTCOLLISION:	
				var index=(this.hoPtr.roc.rcDir>>2)*18;
				do
				{
				    if (this.tst_Position(this.hoPtr.hoX+CMove.mvap_TableDirs[index], this.hoPtr.hoY+CMove.mvap_TableDirs[index+1], flag))
				    {
						this.hoPtr.hoX+=CMove.mvap_TableDirs[index];
						this.hoPtr.hoY+=CMove.mvap_TableDirs[index+1];
						return;
				    }
				    index+=2;
				}while(CMove.mvap_TableDirs[index]!=0 || CMove.mvap_TableDirs[index+1]!=0);
	
				if (flag==false)
				{
				    this.hoPtr.hoX=this.hoPtr.roc.rcOldX;
				    this.hoPtr.hoY=this.hoPtr.roc.rcOldY;
				    this.hoPtr.roc.rcImage=this.hoPtr.roc.rcOldImage;
				    this.hoPtr.roc.rcAngle=this.hoPtr.roc.rcOldAngle;
				    return;
				}
				break;
		    default:
				break;
		}
   },

    mb_Approach:function(flag)
    { 	
    	switch(this.hoPtr.hoAdRunHeader.rhEvtProg.rhCurCode&0xFFFF0000)
		{
            case (-12<<16):         // CNDL_EXTOUTPLAYFIELD:
                var x=this.hoPtr.hoX-this.hoPtr.hoImgXSpot;
                var y=this.hoPtr.hoY-this.hoPtr.hoImgYSpot;
                var dir=this.hoPtr.hoAdRunHeader.quadran_Out(x, y, x+this.hoPtr.hoImgWidth, y+this.hoPtr.hoImgHeight);
                x=this.hoPtr.hoX;
                y=this.hoPtr.hoY;
                if ((dir&CRun.BORDER_LEFT)!=0)
                    x=this.hoPtr.hoImgXSpot;
                if ((dir&CRun.BORDER_RIGHT)!=0)
                    x=this.hoPtr.hoAdRunHeader.rhLevelSx-this.hoPtr.hoImgWidth+this.hoPtr.hoImgXSpot;
                if ((dir&CRun.BORDER_TOP)!=0)
                    y=this.hoPtr.hoImgYSpot;
                if ((dir&CRun.BORDER_BOTTOM)!=0)
                    y=this.hoPtr.hoAdRunHeader.rhLevelSy-this.hoPtr.hoImgHeight+this.hoPtr.hoImgYSpot;
                this.hoPtr.hoX=x;
                this.hoPtr.hoY=y;
				return;
			
		    case (-13<<16):	    // CNDL_EXTCOLBACK:
		    case (-14<<16):	    // CNDL_EXTCOLLISION:	
				var pt=new CPoint();
				if (this.mbApproachSprite(this.hoPtr.hoX, this.hoPtr.hoY, this.hoPtr.roc.rcOldX, this.hoPtr.roc.rcOldY, flag, pt))
				{
				    this.hoPtr.hoX=pt.x;
				    this.hoPtr.hoY=pt.y;
				    return;
				}		
				var index=(this.hoPtr.roc.rcDir>>2)*18;
				do
				{
				    if (this.tst_Position(this.hoPtr.hoX+CMove.mvap_TableDirs[index], this.hoPtr.hoY+CMove.mvap_TableDirs[index+1], flag))
				    {
						this.hoPtr.hoX+=CMove.mvap_TableDirs[index];
						this.hoPtr.hoY+=CMove.mvap_TableDirs[index+1];
						return;
				    }
				    index+=2;
				}while(CMove.mvap_TableDirs[index]!=0 || CMove.mvap_TableDirs[index+1]!=0);
	
				if (flag==false)
				{
				    this.hoPtr.hoX=this.hoPtr.roc.rcOldX;
				    this.hoPtr.hoY=this.hoPtr.roc.rcOldY;
				    this.hoPtr.roc.rcImage=this.hoPtr.roc.rcOldImage;
				    this.hoPtr.roc.rcAngle=this.hoPtr.roc.rcOldAngle;
				    return;
				}
				break;
		    default:
				break;			
		}
	},

    tst_SpritePosition:function(x, y, htFoot, planCol, flag)
    {
		var sprOi;
		sprOi=-1;
		if (flag)
		{
	    	sprOi=this.hoPtr.hoOi;
		}
		var oilPtr=this.hoPtr.hoOiList;

		if ((oilPtr.oilLimitFlags&0x000F)!=0)
		{
            var xx=x-this.hoPtr.hoImgXSpot;
            var yy=y-this.hoPtr.hoImgYSpot;
            if ((this.hoPtr.hoAdRunHeader.quadran_Out(xx, yy, xx+this.hoPtr.hoImgWidth, yy+this.hoPtr.hoImgHeight)&oilPtr.oilLimitFlags)!=0) 
                return false;
		}

		if ((oilPtr.oilLimitFlags&0x0010)!=0)
		{
            if (this.hoPtr.hoAdRunHeader.colMask_TestObject_IXY(this.hoPtr, this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY, x, y, htFoot, planCol))
				return false;
		}

		if (oilPtr.oilLimitList==-1) 
            return true;

		// Demande les collisions a cette position...
		var list=this.hoPtr.hoAdRunHeader.objectAllCol_IXY(this.hoPtr, this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY, x, y, oilPtr.oilColList);	
		if (list==null) 
            return true;
	
		var lb=this.hoPtr.hoAdRunHeader.rhEvtProg.limitBuffer;
		var index;
		for (index=0; index<list.size(); index++)
		{
		    var hoSprite=list.get(index);	
		    var oi=hoSprite.hoOi;
		    if (oi!=sprOi)
		    {
				var ll;
				for (ll=oilPtr.oilLimitList; lb[ll]>=0; ll++)
				{
				    if (lb[ll]==oi) 
				    	return false;	
				}
		    }
		}
		return true;
    },

    tst_Position:function(x, y, flag)
    {
		var sprOi;

        sprOi=-1;
		if (flag)
            sprOi=this.hoPtr.hoOi;
		var oilPtr=this.hoPtr.hoOiList;

		if ((oilPtr.oilLimitFlags&0x000F)!=0)
		{
            var xx=x-this.hoPtr.hoImgXSpot;
            var yy=y-this.hoPtr.hoImgYSpot;
            var dir=this.hoPtr.hoAdRunHeader.quadran_Out(xx, yy, xx+this.hoPtr.hoImgWidth, yy+this.hoPtr.hoImgHeight);
            if ((dir&oilPtr.oilLimitFlags)!=0)
                return false;
		}

		if ((oilPtr.oilLimitFlags&0x0010)!=0)
		{
            if (this.hoPtr.hoAdRunHeader.colMask_TestObject_IXY(this.hoPtr, this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY, x, y, 0, CRunFrame.CM_TEST_PLATFORM))
				return false;
		}

		if (oilPtr.oilLimitList==-1) 
            return true;

		var list=this.hoPtr.hoAdRunHeader.objectAllCol_IXY(this.hoPtr, this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY, x, y, oilPtr.oilColList);
		if (list==null) 
            return true;

		var lb=this.hoPtr.hoAdRunHeader.rhEvtProg.limitBuffer;
		var index;
		for (index=0; index<list.size(); index++)
		{
		    var hoSprite=list.get(index);
		    var oi=hoSprite.hoOi;
		    if (oi!=sprOi)
		    {
				var ll;
				for (ll=oilPtr.oilLimitList; lb[ll]>=0; ll++)
				{
				    if (lb[ll]==oi) return false;
				}
		    }
		}
		return true;
	},

    mpApproachSprite:function(destX, destY, maxX, maxY, htFoot, planCol, ptFinal)
    {
		var presX=destX;
		var presY=destY;
		var loinX=maxX;
		var loinY=maxY;
	
		var x=CServices.floatToInt((presX+loinX)/2);
		var y=CServices.floatToInt((presY+loinY)/2);
		var oldX, oldY;
	
		do
		{
            if (this.tst_SpritePosition(x+this.hoPtr.hoAdRunHeader.rhWindowX, y+this.hoPtr.hoAdRunHeader.rhWindowY, htFoot, planCol, false))	
            {
                loinX=x;
                loinY=y;
                oldX=x;
                oldY=y;
                x=CServices.floatToInt((loinX+presX)/2);
                y=CServices.floatToInt((loinY+presY)/2);
                if (x==oldX && y==oldY)
                {
                    if (loinX!=presX || loinY!=presY)
                    {
                        if (this.tst_SpritePosition(presX+this.hoPtr.hoAdRunHeader.rhWindowX, presY+this.hoPtr.hoAdRunHeader.rhWindowY, htFoot, planCol, false))
                        {
                            x=presX;
                            y=presY;
                        }
                    }
                    ptFinal.x=x;
                    ptFinal.y=y;
                    return true;
                }
            }
            else
            {
                presX=x;
                presY=y;
                oldX=x;
                oldY=y;
                x=CServices.floatToInt((loinX+presX)/2);
                y=CServices.floatToInt((loinY+presY)/2);
                if (x==oldX && y==oldY)
                {
                    if (loinX!=presX || loinY!=presY)
                    {
                        if (this.tst_SpritePosition(loinX+this.hoPtr.hoAdRunHeader.rhWindowX, loinY+this.hoPtr.hoAdRunHeader.rhWindowY, htFoot, planCol, false))
                        {
                            ptFinal.x=loinX;
                            ptFinal.y=loinY;
                            return true;
                        }
                    }
                    ptFinal.x=x;
                    ptFinal.y=y;
                    return false;
                }
            }
		} while(true);
   },

    mbApproachSprite:function(destX, destY, maxX, maxY, flag, ptFinal)
    {
		var presX=destX;
		var presY=destY;
		var loinX=maxX;
		var loinY=maxY;
	
		var x=CServices.floatToInt((presX+loinX)/2);
		var y=CServices.floatToInt((presY+loinY)/2);
		var oldX, oldY;

		do
		{
            if (this.tst_Position(x, y, flag))	
            {
                loinX=x;
                loinY=y;
                oldX=x;
                oldY=y;
                x=CServices.floatToInt((loinX+presX)/2);
                y=CServices.floatToInt((loinY+presY)/2);
                if (x==oldX && y==oldY)
                {
                    if (loinX!=presX || loinY!=presY)
                    {
                        if (this.tst_Position(presX, presY, flag))
                        {
                            x=presX;
                            y=presY;
                        }
                    }
                    ptFinal.x=x;
                    ptFinal.y=y;
                    return true;
                }
            }
            else
            {
                presX=x;
                presY=y;
                oldX=x;
                oldY=y;
                x=CServices.floatToInt((loinX+presX)/2);
                y=CServices.floatToInt((loinY+presY)/2);
                if (x==oldX && y==oldY)
                {
                    if (loinX!=presX || loinY!=presY)
                    {
                        if (this.tst_Position(loinX, loinY, flag))
                        {
                            ptFinal.x=loinX;
                            ptFinal.y=loinY;
                            return true;
                        }
                    }
                    ptFinal.x=x;
                    ptFinal.y=y;
                    return false;
                }
            }
		} while(true);		
   },

    setAcc:function(acc)
    {
		if (acc>250) acc=250;
		if (acc<0) acc=0;
		this.rmAcc=acc;
		this.rmAccValue=this.getAccelerator(acc);
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_EXT)
		    this.movement.setAcc(acc);
    },
    setDec:function(dec)
    {
		if (dec>250) dec=250;
		if (dec<0) dec=0;
		this.rmDec=dec;
		this.rmDecValue=this.getAccelerator(dec);
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_EXT)
		    this.movement.setDec(dec);
    },
    setRotSpeed:function(speed)
    {
		if (speed>250) speed=250;
		if (speed<0) speed=0;
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_RACE)
		    this.setRotSpeed(speed);
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_EXT)
		    this.movement.setRotSpeed(speed);
    },    
    
    set8Dirs:function(dirs)
    {
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_GENERIC)
		    this.set8DirsGeneric(dirs);
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_EXT)
		    this.movement.set8Dirs(dirs);
    },    
         
    setGravity:function(gravity)
    {
		if (gravity>250) gravity=250;
		if (gravity<0) gravity=0;
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_PLATFORM)
		    this.setGravity(gravity);
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_EXT)
		    this.movement.setGravity(gravity);
    },
        
    getSpeed:function()
    {
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_EXT)
		    return this.movement.getSpeed();
		return this.hoPtr.roc.rcSpeed;
    },
    getAcc:function()
    {
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_EXT)
		    return this.movement.getAcceleration();
		return this.rmAcc;
    },
    getDec:function()
    {
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_EXT)
		    return this.movement.getDeceleration();
		return this.rmDec;
    },
    getGravity:function()
    {
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_PLATFORM)
		    return this.mp.MP_Gravity;
		if (this.hoPtr.roc.rcMovementType==CMoveDef.MVTYPE_EXT)
		    return this.mvt.movement.getGravity();
		return 0;
    },
    kill:function(bFast)
    {
    } 
  
}


// CMoveBall object
// -----------------------------------------------------------------------
CMoveBall.rebond_List=
[
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,            
    30,31,0,1,4,3,2,1,0,31,30,29,28,27,26,25,24,23,22,21,20,24,25,26,27,27,28,28,28,28,29,29,         
    24,23,22,21,20,19,18,17,16,15,14,13,12,16,17,18,19,19,20,20,20,20,21,21,22,23,24,25,28,27,26,25,  
    0,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,20,21,22,22,23,24,24,24,24,25,26,27,28,29,30,   
    8,7,6,5,4,8,9,10,11,11,12,12,12,12,13,13,14,15,16,17,20,19,18,17,16,15,14,13,12,11,10,9,          
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,            
    16,15,14,13,12,11,10,9,8,12,13,14,15,15,16,16,16,16,17,17,18,19,20,21,24,23,22,21,20,19,18,17,    
    16,17,18,19,20,21,22,23,24,23,22,21,20,19,18,17,16,17,18,19,20,21,22,23,24,23,22,21,20,19,18,17,  
    3,3,4,4,4,4,5,5,6,7,8,9,12,11,10,9,8,7,6,5,4,3,2,1,0,31,30,29,	28,0,1,2,                         
    0,0,1,1,2,3,4,5,8,7,6,5,4,3,2,1,0,31,30,29,28,27,26,25,24,28,29,30,31,31,0,0,                     
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,            
    0,31,30,29,28,27,26,25,24,25,26,27,28,29,30,31,0,31,30,29,28,27,25,25,24,25,26,27,28,29,30,31,    
    0,4,5,6,7,7,8,8,8,8,9,9,10,11,12,13,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,                       
    0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,                                  
    16,15,14,13,12,11,10,9,8,9,10,11,12,13,14,15,16,15,14,13,12,11,10,9,8,9,10,11,12,13,14,15,        
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31           
];
CMoveBall.MaskBounce=[0xFFFFFFFC, 0xFFFFFFFE, 0xFFFFFFFF];
CMoveBall.PlusAngles=[-4,4,-2,2,-1,1];
CMoveBall.PlusAnglesTry=[-4,4,-4,4,-4,4];

function CMoveBall()
{
    this.MB_StartDir=0;
    this.MB_Angles=0;
    this.MB_Securite=0;
    this.MB_SecuCpt=0;
    this.MB_Bounce=0;
    this.MB_Speed=0;
    this.MB_MaskBounce=0;
    this.MB_LastBounce=0;
    this.MB_Blocked=false;
}
CMoveBall.prototype=CServices.extend(new CMove(),
{
    init:function(ho, mvPtr)
    {
        this.hoPtr=ho;
        var mbPtr=mvPtr;
        
		this.hoPtr.hoCalculX=0;
		this.hoPtr.hoCalculY=0;
		this.hoPtr.roc.rcSpeed=mbPtr.mbSpeed;
		this.hoPtr.roc.rcMaxSpeed=mbPtr.mbSpeed;
		this.hoPtr.roc.rcMinSpeed=mbPtr.mbSpeed;
		this.MB_Speed=mbPtr.mbSpeed<<8;
		var dec=mbPtr.mbDecelerate;						//; Deceleration
		if (dec!=0)
		{
            dec=this.getAccelerator(dec);
            this.hoPtr.roc.rcMinSpeed=0;							//; Vitesse mini= 0
		}
		this.rmDecValue=dec;
		this.MB_Bounce=mbPtr.mbBounce;				//; Randomizator
		this.MB_Angles=mbPtr.mbAngles;				//; Securite 0.100
		this.MB_MaskBounce=CMoveBall.MaskBounce[this.MB_Angles];
		this.MB_Blocked=false;
		this.MB_LastBounce=-1;
	
		this.MB_Securite=(100-mbPtr.mbSecurity)/8;
		this.MB_SecuCpt=this.MB_Securite;
		this.moveAtStart(mvPtr);
		this.hoPtr.roc.rcChanged=true;	        
    },
    
    move:function()
    {
		this.hoPtr.rom.rmBouncing=false;
		this.hoPtr.hoAdRunHeader.rhVBLObjet=1;

		this.hoPtr.roc.rcAnim=CAnim.ANIMID_WALK;
        if (this.hoPtr.roa!=null)
            this.hoPtr.roa.animate();

		if (this.rmDecValue!=0)
		{
            var speed=this.MB_Speed;
            if (speed>0)
            {
				var dSpeed=this.rmDecValue;
				if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                    dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                speed-=dSpeed;
                if (speed<0) 
                    speed=0;
                this.MB_Speed=speed;
                speed>>=8;
                this.hoPtr.roc.rcSpeed=speed;
            }
		}
		this.newMake_Move(this.hoPtr.roc.rcSpeed, this.hoPtr.roc.rcDir);
    },
    stop:function()
    {
		if (this.rmStopSpeed==0)
		{
            this.rmStopSpeed=this.hoPtr.roc.rcSpeed|0x8000;
            this.hoPtr.roc.rcSpeed=0;
            this.MB_Speed=0;
            this.hoPtr.rom.rmMoveFlag=true;
		}
    },
    
    start:function()
    {
		var speed=this.rmStopSpeed;
		if (speed!=0)
		{
            speed&=0x7FFF;
            this.hoPtr.roc.rcSpeed=speed;
            this.MB_Speed=speed<<8;
            this.rmStopSpeed=0;
            this.hoPtr.rom.rmMoveFlag=true;
		}
    },
    bounce:function()
    {
		if (this.rmStopSpeed!=0) 
            return;

		if (this.hoPtr.hoAdRunHeader.rhLoopCount==this.MB_LastBounce) 
            return;
		this.MB_LastBounce=this.hoPtr.hoAdRunHeader.rhLoopCount;

		if (this.rmCollisionCount==this.hoPtr.hoAdRunHeader.rh3CollisionCount)
		{
            this.mb_Approach(this.MB_Blocked);
		}

		var x=this.hoPtr.hoX;
		var y=this.hoPtr.hoY;
		var rebond=0;
		x-=8;
		y-=8;
		if (this.tst_Position(x, y, this.MB_Blocked)==false)
            rebond|=0x01;
		x+=16;
		if (this.tst_Position(x, y, this.MB_Blocked)==false)
            rebond|=0x02;
		y+=16;
		if (this.tst_Position(x, y, this.MB_Blocked)==false)
            rebond|=0x04;
		x-=16;
		if (this.tst_Position(x, y, this.MB_Blocked)==false)
            rebond|=0x08;

		var dir=CMoveBall.rebond_List[rebond*32+this.hoPtr.roc.rcDir];
		dir&=this.MB_MaskBounce;
		if (!this.mvb_Test(dir)) 
		{
            var angles=CMoveBall.PlusAnglesTry[this.MB_Angles*2+1];
            var angles2=angles;
            var bFlag=false;
            do 
            {
                dir-=angles;
                dir&=31;
                if (this.mvb_Test(dir)) 
                {
                    bFlag=true;
                    break;
                }
                dir+=2*angles;
                dir&=31;
                if (this.mvb_Test(dir)) 
                {
                    bFlag=true;
                    break;
                }
                dir-=angles;
                dir&=31;
                angles+=angles2;
            } while(angles<=16);

            if (bFlag==false)
            {
                this.MB_Blocked=true;
                this.hoPtr.roc.rcDir=this.hoPtr.hoAdRunHeader.random(32) & this.MB_MaskBounce;
                this.hoPtr.rom.rmBouncing=true;
                this.hoPtr.rom.rmMoveFlag=true;
                return;
            }
		}

		this.MB_Blocked=false;
		this.hoPtr.roc.rcDir=dir;
		var rnd=this.hoPtr.hoAdRunHeader.random(100);
		if (rnd<this.MB_Bounce)
		{
            rnd>>=2;			
            if (rnd<25)
            {
                rnd-=12;
                rnd&=31;
                rnd&=this.MB_MaskBounce;
                if (this.mvb_Test(rnd))
                {
                    this.hoPtr.roc.rcDir=rnd;
                    this.hoPtr.rom.rmBouncing=true;
                    this.hoPtr.rom.rmMoveFlag=true;
                    return;
                }
            }
		}

		dir=this.hoPtr.roc.rcDir&0x0007;
		if (this.MB_SecuCpt!=12)	
		{
            if (dir==0)
            {
                this.MB_SecuCpt--;
                if (this.MB_SecuCpt<0)
                {
                    dir=this.hoPtr.roc.rcDir+CMoveBall.PlusAngles[this.hoPtr.hoAdRunHeader.random(2)+this.MB_Angles*2];
                    dir &= 31;
                    if (this.mvb_Test(dir))
                    {
                        this.hoPtr.roc.rcDir=dir;
                        this.MB_SecuCpt=this.MB_Securite;
                    }
                }
            }
            else
            {
                this.MB_SecuCpt=this.MB_Securite;
            }
		}
		this.hoPtr.rom.rmBouncing=true;
		this.hoPtr.rom.rmMoveFlag=true;        
   },

    mvb_Test:function(dir)
    {
        var calculX=this.hoPtr.hoX<<16|this.hoPtr.hoCalculX&0x0000FFFF;
        var calculY=this.hoPtr.hoY<<16|this.hoPtr.hoCalculY&0x0000FFFF;
		var x=(CMove.Cosinus32[dir]<<11)+calculX;
		var y=(CMove.Sinus32[dir]<<11)+calculY;
		x>>>=16;
		y>>>=16;
        return this.tst_Position(x, y, false);
	},
	setDir:function(dir)
	{	
	},
    setSpeed:function(speed)
    {
		if (speed<0) 
            speed=0;
		if (speed>250) 
            speed=250;
		this.hoPtr.roc.rcSpeed=speed;
		this.MB_Speed=speed<<8;
		this.rmStopSpeed=0;
		this.hoPtr.rom.rmMoveFlag=true;
    },
    setMaxSpeed:function(speed)
    {
		this.setSpeed(speed);
    },
    
    reverse:function()
    {        
		if (this.rmStopSpeed==0)
		{
            this.hoPtr.rom.rmMoveFlag=true;
            this.hoPtr.roc.rcDir+=16;
            this.hoPtr.roc.rcDir&=31;
		}
    },
    setXPosition:function(x)
    {        
		if (this.hoPtr.hoX!=x)
		{
		    this.hoPtr.hoX=x;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;
		}
    },   
    setYPosition:function(y)
    {
		if (this.hoPtr.hoY!=y)
		{
		    this.hoPtr.hoY=y;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;
		}
    }
});

// CMoveBuller object
// --------------------------------------------------------------
function CMoveBullet()
{
    this.MBul_Wait=false;
    this.MBul_ShootObject=null;
}
CMoveBullet.prototype=CServices.extend(new CMove(),
{
    init:function(ho, mvPtr)
    {
        this.hoPtr=ho;
		if (this.hoPtr.ros!=null)			
		    this.hoPtr.ros.setColFlag(false);
		if ( this.hoPtr.ros!=null )
		{
		    this.hoPtr.ros.rsFlags&=~CRSpr.RSFLAG_VISIBLE;
		    this.hoPtr.ros.obHide();
		}
		this.MBul_Wait=true;
		this.hoPtr.hoCalculX=0;
		this.hoPtr.hoCalculY=0;
		if (this.hoPtr.roa!=null)
		    this.hoPtr.roa.init_Animation(CAnim.ANIMID_WALK);
		this.hoPtr.roc.rcSpeed=0;
		this.hoPtr.roc.rcCheckCollides=true;
		this.hoPtr.roc.rcChanged=true;
    },
    init2:function(parent)
    {
		this.hoPtr.roc.rcMaxSpeed=this.hoPtr.roc.rcSpeed;
		this.hoPtr.roc.rcMinSpeed=this.hoPtr.roc.rcSpeed;				
		this.MBul_ShootObject=parent;	
    },
    move:function()
    {
		if (this.MBul_Wait)
		{
		    if (this.MBul_ShootObject.roa!=null)
		    {			    	
				if (this.MBul_ShootObject.roa.raAnimOn==CAnim.ANIMID_SHOOT) 
				    return;
		    }
		    this.startBullet();
		}

        if (this.hoPtr.roa!=null)
            this.hoPtr.roa.animate();
		this.newMake_Move(this.hoPtr.roc.rcSpeed, this.hoPtr.roc.rcDir);

		if (this.hoPtr.hoX<-64 || this.hoPtr.hoX>this.hoPtr.hoAdRunHeader.rhLevelSx+64 || this.hoPtr.hoY<-64 || this.hoPtr.hoY>this.hoPtr.hoAdRunHeader.rhLevelSy+64)
		{
		    this.hoPtr.hoCallRoutine=false;
		    this.hoPtr.hoAdRunHeader.destroy_Add(this.hoPtr.hoNumber);
		}	
		if (this.hoPtr.roc.rcCheckCollides)
		{
            this.hoPtr.roc.rcCheckCollides=false;
            this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr);
		}        
    },
    startBullet:function()
    {
		if (this.hoPtr.ros!=null)
		    this.hoPtr.ros.setColFlag(true);
		if ( this.hoPtr.ros!=null )
		{
		    this.hoPtr.ros.rsFlags|=CRSpr.RSFLAG_VISIBLE;
		    this.hoPtr.ros.obShow();
		}
		this.MBul_Wait=false;
		this.MBul_ShootObject=null;
    },	
    setXPosition:function(x)
    {        
		if (this.hoPtr.hoX!=x)
		{
		    this.hoPtr.hoX=x;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;
		}
    },
    setYPosition:function(y)
    {
		if (this.hoPtr.hoY!=y)
		{
		    this.hoPtr.hoY=y;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;	
		}
    },
	setDir:function(dir)
	{	
	},
	reverse:function(dir)
	{	
	},
    stop:function()
    {
    },
    start:function()
    {
    },
    bounce:function()
    {
    },
    setSpeed:function(speed)
    {
    },
    setMaxSpeed:function(speed)
    {
    }
});

// CMoveDisappear object
// ----------------------------------------------------------------
function CMoveDisappear()
{
}
CMoveDisappear.prototype=CServices.extend(new CMove(),
{
    init:function(ho, mvPtr)
    {
		this.hoPtr=ho;
    },
    move:function()
    {
		if ((this.hoPtr.hoFlags&CObject.HOF_FADEOUT)==0)
		{
		    if (this.hoPtr.roa!=null)
		    {
				this.hoPtr.roa.animate();
				if (this.hoPtr.roa.raAnimForced!=CAnim.ANIMID_DISAPPEAR+1)
				{
				    this.hoPtr.hoAdRunHeader.destroy_Add(this.hoPtr.hoNumber);
				}
		    }
		}
    },
    setXPosition:function(x)
    {        
		if (this.hoPtr.hoX!=x)
		{
		    this.hoPtr.hoX=x;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		}
    },
    setYPosition:function(y)
    {
		if (this.hoPtr.hoY!=y)
		{
		    this.hoPtr.hoY=y;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		}
    },
	setDir:function(dir)
	{	
	},
	reverse:function(dir)
	{	
	},
    stop:function()
    {
    },
    start:function()
    {
    },
    bounce:function()
    {
    },
    setSpeed:function(speed)
    {
    },
    setMaxSpeed:function(speed)
    {
    }
});

// CMoveGeneric object
// ---------------------------------------------------------------------
function CMoveGeneric()
{
    this.MG_Bounce=0;
    this.MG_OkDirs=0;
    this.MG_BounceMu=0;
    this.MG_Speed=0;
    this.MG_LastBounce=0;
    this.MG_DirMask=0;
}
CMoveGeneric.prototype=CServices.extend(new CMove(),
{	
    init:function(ho, mgPtr)
    {
        this.hoPtr=ho;
        
		this.hoPtr.hoCalculX=0;
		this.hoPtr.hoCalculY=0;
		this.MG_Speed=0;
		this.hoPtr.roc.rcSpeed=0;
		this.MG_Bounce=0;
		this.MG_LastBounce=-1;
		this.hoPtr.roc.rcPlayer=mgPtr.mvControl;
		this.rmAcc=mgPtr.mgAcc;
		this.rmAccValue=this.getAccelerator(this.rmAcc);
		this.rmDec=mgPtr.mgDec;
		this.rmDecValue=this.getAccelerator(this.rmDec);
		this.hoPtr.roc.rcMaxSpeed=mgPtr.mgSpeed;
		this.hoPtr.roc.rcMinSpeed=0;
		this.MG_BounceMu=mgPtr.mgBounceMult;
		this.MG_OkDirs=mgPtr.mgDir;
		this.rmOpt=mgPtr.mvOpt;
		this.hoPtr.roc.rcChanged=true;
    },

    move:function()
    {
		var direction;
		var autorise;
		var speed, speed8, dir;

		this.hoPtr.hoAdRunHeader.rhVBLObjet=1;
	
		direction=this.hoPtr.roc.rcDir;
		this.hoPtr.roc.rcOldDir=direction;
	
		if (this.MG_Bounce==0)
        {
            this.hoPtr.rom.rmBouncing=false;	

            autorise=0;
            {
				var j=this.hoPtr.hoAdRunHeader.rhPlayer[this.hoPtr.roc.rcPlayer-1]&15;
				if (j!=0)
				{
                    dir=CMove.Joy2Dir[j];
                    if (dir!=-1)
                    {
                        var flag=1<<dir;
                        if ((flag&this.MG_OkDirs)!=0)
                        {
                            autorise=1; 
                            direction=dir;
                        }
                    }
				}
            }

            var dSpeed;
            speed=this.MG_Speed;
            if (autorise==0)
            {
                if (speed!=0)
                {
                    dSpeed=this.rmDecValue;
                    if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                        dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                    speed-=dSpeed;
                    if (speed<=0) 
                        speed=0;
                }
            }
            else
            {
                speed8=speed>>8;
                if (speed8<this.hoPtr.roc.rcMaxSpeed)
                {
                    dSpeed=this.rmAccValue;
                    if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                        dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                    speed+=dSpeed;
                    speed8=speed>>8;
                    if (speed8>this.hoPtr.roc.rcMaxSpeed)
                    {
                        speed=this.hoPtr.roc.rcMaxSpeed<<8;
                    }
                }
            }
            this.MG_Speed=speed;
            this.hoPtr.roc.rcSpeed=speed>>8;

            this.hoPtr.roc.rcDir=direction;					

            this.hoPtr.roc.rcAnim=CAnim.ANIMID_WALK;	
            if (this.hoPtr.roa!=null)
                this.hoPtr.roa.animate();

            if (this.newMake_Move(this.hoPtr.roc.rcSpeed, this.hoPtr.roc.rcDir)==false) 
                return;

            if (this.hoPtr.roc.rcSpeed==0)	
            {
				speed=this.MG_Speed;
				if (speed==0) 
                    return;
				if (this.hoPtr.roc.rcOldDir==this.hoPtr.roc.rcDir) 
                    return;
				this.hoPtr.roc.rcSpeed=speed>>8;
				this.hoPtr.roc.rcDir=this.hoPtr.roc.rcOldDir;
				if (this.newMake_Move(this.hoPtr.roc.rcSpeed, this.hoPtr.roc.rcDir)==false) 
                    return;	
            }
        }
       
        while(true)
        {
            if (this.MG_Bounce==0) 
                return;
            if (this.hoPtr.hoAdRunHeader.rhVBLObjet==0) 
                return;
            speed=this.MG_Speed;
            speed-=this.rmDecValue;
            if (speed>0)
            {
				this.MG_Speed=speed;	
				speed>>=8;
				this.hoPtr.roc.rcSpeed=speed;
				dir=this.hoPtr.roc.rcDir;	
				if (this.MG_Bounce!=0)
				{
                    dir+=16;
                    dir&=31;
				}
				if (this.newMake_Move(speed, dir)==false) 
                    return;
                continue;
            }
            else
            {
				this.MG_Speed=0;
				this.hoPtr.roc.rcSpeed=0;
				this.MG_Bounce=0;
            }
            break;        
        };      
    },

    bounce:function()
    {
		if (this.rmCollisionCount==this.hoPtr.hoAdRunHeader.rh3CollisionCount)
		{
            this.mv_Approach((this.rmOpt&CMove.MVTOPT_8DIR_STICK)!=0);
		}
		if (this.hoPtr.hoAdRunHeader.rhLoopCount==this.MG_LastBounce) 
            return;
		this.MG_LastBounce=this.hoPtr.hoAdRunHeader.rhLoopCount;
		this.MG_Bounce++;
		if (this.MG_Bounce>=12)
		{
            this.stop();
            return;
		}
		this.hoPtr.rom.rmBouncing=true;
		this.hoPtr.rom.rmMoveFlag=true;					
    },

    reverse:function()
    {        
    },

	setDir:function(dir)
	{	
	},

    stop:function()
    {
		this.hoPtr.roc.rcSpeed=0;
		this.MG_Bounce=0;
		this.MG_Speed=0;
		this.hoPtr.rom.rmMoveFlag=true;
		if (this.rmCollisionCount==this.hoPtr.hoAdRunHeader.rh3CollisionCount)
		{
            this.mv_Approach((this.rmOpt&CMove.MVTOPT_8DIR_STICK)!=0);
            this.MG_Bounce=0;
		}
    },

    start:function()
	{
		this.hoPtr.rom.rmMoveFlag=true;
		this.rmStopSpeed=0;
   },

    setMaxSpeed:function(speed)
    {
        if (speed<0) speed=0;
        if (speed>250) speed=250;
		this.hoPtr.roc.rcMaxSpeed=speed;
		if (this.hoPtr.roc.rcSpeed>speed)
		{
            this.hoPtr.roc.rcSpeed=speed;
            this.MG_Speed=speed<<8;
		}
		this.hoPtr.rom.rmMoveFlag=true;
    },

    setSpeed:function(speed)
    {
        if (speed<0) speed=0;
        if (speed>250) speed=250;
		if (speed>this.hoPtr.roc.rcMaxSpeed)
		{
            speed=this.hoPtr.roc.rcMaxSpeed;
		}
		this.hoPtr.roc.rcSpeed=speed;
		this.MG_Speed=speed<<8;
		this.hoPtr.rom.rmMoveFlag=true;
	},
	setXPosition:function(x)
    {        
		if (this.hoPtr.hoX!=x)
		{
		    this.hoPtr.hoX=x;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;
		}
    },
    setYPosition:function(y)
    {
		if (this.hoPtr.hoY!=y)
		{
		    this.hoPtr.hoY=y;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;
		}
    },
    set8DirsGeneric:function(dirs)
    {
		this.MG_OkDirs=dirs;
    }   
});

// CMoveMouse object
// ------------------------------------------------------------
function CMoveMouse()
{
    this.MM_DXMouse=0;
    this.MM_DYMouse=0;
    this.MM_FXMouse=0;
    this.MM_FYMouse=0;
    this.MM_Stopped=0;
    this.MM_OldSpeed=0;
}
CMoveMouse.prototype=CServices.extend(new CMove(),
{	
    init:function(ho, mmPtr)
    {
        this.hoPtr=ho;
        
        this.hoPtr.roc.rcPlayer=mmPtr.mvControl;
		this.MM_DXMouse=mmPtr.mmDx+this.hoPtr.hoX;
		this.MM_DYMouse=mmPtr.mmDy+this.hoPtr.hoY;
		this.MM_FXMouse=mmPtr.mmFx+this.hoPtr.hoX;
		this.MM_FYMouse=mmPtr.mmFy+this.hoPtr.hoY;
		this.hoPtr.roc.rcSpeed=0;
		this.MM_OldSpeed=0;
		this.MM_Stopped=0;
		this.hoPtr.roc.rcMinSpeed=0;
		this.hoPtr.roc.rcMaxSpeed=100;
		this.rmOpt=mmPtr.mvOpt;
		this.moveAtStart(mmPtr);
		this.hoPtr.roc.rcChanged=true;
    },

    move:function()
    {
		var newX=this.hoPtr.hoX;
		var newY=this.hoPtr.hoY;
		var deltaX, deltaY, flags, speed, dir, index;

		if (this.rmStopSpeed==0) 
        {
            if (this.hoPtr.hoAdRunHeader.rh2InputMask[this.hoPtr.roc.rcPlayer-1]!=0) 
            {
                newX=this.hoPtr.hoAdRunHeader.rh2MouseX;
                if (newX<this.MM_DXMouse)
                    newX=this.MM_DXMouse;
                if (newX>this.MM_FXMouse)
                    newX=this.MM_FXMouse;

                newY=this.hoPtr.hoAdRunHeader.rh2MouseY;	
                if (newY<this.MM_DYMouse)
                    newY=this.MM_DYMouse;
                if (newY>this.MM_FYMouse)
                    newY=this.MM_FYMouse;

                deltaX=newX-this.hoPtr.hoX;
                deltaY=newY-this.hoPtr.hoY;
                flags=0;		
                if (deltaX<0)	
                {
                    deltaX=-deltaX;
                    flags|=0x01;
                }
                if (deltaY<0)	
                {
                    deltaY=-deltaY;
                    flags|=0x02;
                }
                speed=(deltaX+deltaY)<<2;
                if (speed>250) speed=250;
                this.hoPtr.roc.rcSpeed=speed;
                if (speed!=0) 
                {
                    deltaX<<=8;	
                    if (deltaY==0) 
                        deltaY=1;
                    deltaX/=deltaY;
                    for (index=0; ; index+=2)
                    {
                        if (deltaX>=CMove.CosSurSin32[index]) 
                            break;
                    }		
                    dir=CMove.CosSurSin32[index+1];		
                    if ((flags&0x02)!=0)
                    {
                        dir=-dir+32;	
                        dir&=31;
                    }
                    if ((flags&0x01)!=0)
                    {
                        dir-=8;			
                        dir&=31;
                        dir=-dir;
                        dir&=31;
                        dir+=8;
                        dir&=31;
                    }
                    this.hoPtr.roc.rcDir=dir;
                }
            }
        }
	
		if (this.hoPtr.roc.rcSpeed!=0)
		{
            this.MM_Stopped=0;
            this.MM_OldSpeed=this.hoPtr.roc.rcSpeed;
		}
		this.MM_Stopped++;
		if (this.MM_Stopped>10)
            this.MM_OldSpeed=0;
		this.hoPtr.roc.rcSpeed=this.MM_OldSpeed;
		if (this.hoPtr.roa!=null)
            this.hoPtr.roa.animate();;

		this.hoPtr.hoX=newX;		
		this.hoPtr.hoY=newY;
		this.hoPtr.roc.rcChanged=true;
		this.hoPtr.hoAdRunHeader.rh3CollisionCount++;	
		this.rmCollisionCount=this.hoPtr.hoAdRunHeader.rh3CollisionCount;
		this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr);        
    },
    
    stop:function()
    {
		if (this.rmCollisionCount==this.hoPtr.hoAdRunHeader.rh3CollisionCount)
		{
            this.mv_Approach((this.rmOpt&CMove.MVTOPT_8DIR_STICK)!=0);
		}
		this.hoPtr.roc.rcSpeed=0;
    },
    start:function()
    {
		this.rmStopSpeed=0;
		this.hoPtr.rom.rmMoveFlag=true;
    },
    bounce:function()
    {
		this.stop();
    },
    reverse:function()
    {        
    },
	setDir:function(dir)
	{	
	},
    setXPosition:function(x)
    {        
		if (this.hoPtr.hoX!=x)
		{
		    this.hoPtr.hoX=x;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;	
		}
    },
    setYPosition:function(y)
    {
		if (this.hoPtr.hoY!=y)
		{
		    this.hoPtr.hoY=y;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;			
		}
    }
});

// CMovePath object
// --------------------------------------------------------------
function CMovePath()
{
    this.MT_Speed=0;
    this.MT_Sinus=0;
    this.MT_Cosinus=0;
    this.MT_Longueur=0;
    this.MT_XOrigin=0;
    this.MT_YOrigin=0;
    this.MT_XDest=0;
    this.MT_YDest=0;
    this.MT_MoveNumber=0;
    this.MT_Direction=false;
    this.MT_Movement=null;
    this.MT_Calculs=0;
    this.MT_XStart=0;
    this.MT_YStart=0;
    this.MT_Pause=0;
    this.MT_GotoNode=null;
    this.MT_FlagBranch=false;
}
CMovePath.prototype=CServices.extend(new CMove(),
{	
    init:function(ho, mtPtr)
    {
        this.hoPtr=ho;
        
		this.MT_XStart=this.hoPtr.hoX;		
		this.MT_YStart=this.hoPtr.hoY;
	
		this.MT_Direction=false;				
		this.MT_Pause=0;
		this.hoPtr.hoMark1=0;

		this.MT_Movement=mtPtr;
		this.hoPtr.roc.rcMinSpeed=mtPtr.mtMinSpeed;	
		this.hoPtr.roc.rcMaxSpeed=mtPtr.mtMaxSpeed;
		this.MT_Calculs=0;
		this.MT_GotoNode=null;
	    this.mtGoAvant(0);
		this.moveAtStart(mtPtr);
		this.hoPtr.roc.rcSpeed=this.MT_Speed;
		this.hoPtr.roc.rcChanged=true;
		if (this.MT_Movement.steps.length==0)
		    this.stop();
    },
    
    move:function()
    {
		this.hoPtr.hoMark1=0;
	
		this.hoPtr.roc.rcAnim=CAnim.ANIMID_WALK;
		if (this.hoPtr.roa!=null)
            this.hoPtr.roa.animate();

		if (this.MT_Speed==0)
		{
            var pause=this.MT_Pause;
            if (pause==0)
            {
                this.hoPtr.roc.rcSpeed=0;
                this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr);
                return;
            }
            pause-=this.hoPtr.hoAdRunHeader.rhTimerDelta;
            if (pause>0)
            {
                this.MT_Pause=pause;
                this.hoPtr.roc.rcSpeed=0;
                this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr);	
                return;
            }
            this.MT_Pause=0;
            this.MT_Speed=this.rmStopSpeed&0x7FFF;
            this.rmStopSpeed=0;
			this.hoPtr.roc.rcSpeed=this.MT_Speed;
		}

		var calculs;
        if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
            calculs=256.0*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
		else
            calculs=0x100;
		this.hoPtr.hoAdRunHeader.rhMT_VBLCount=calculs;

        var breakMtNewSpeed;
        while(true)
        {
        	breakMtNewSpeed=false;
            this.hoPtr.hoAdRunHeader.rhMT_VBLStep=calculs;
            calculs*=this.MT_Speed;
            calculs<<=5;  
            if (calculs<=0x80000)
				this.hoPtr.hoAdRunHeader.rhMT_MoveStep=calculs;
            else
            {
				calculs=0x80000>>>5;
				calculs/=this.MT_Speed;
				this.hoPtr.hoAdRunHeader.rhMT_VBLStep=calculs;                
				this.hoPtr.hoAdRunHeader.rhMT_MoveStep=0x80000;
            }
            while(true)
            {
                this.MT_FlagBranch=false;
                var flag=this.mtMove(this.hoPtr.hoAdRunHeader.rhMT_MoveStep);
                if (flag==true && this.MT_FlagBranch==false)
                {
                	breakMtNewSpeed=true;
                	break;
                }	
				if (this.hoPtr.hoAdRunHeader.rhMT_VBLCount==this.hoPtr.hoAdRunHeader.rhMT_VBLStep)
                {
                	breakMtNewSpeed=true;
                	break;
                }	
				if (this.hoPtr.hoAdRunHeader.rhMT_VBLCount>this.hoPtr.hoAdRunHeader.rhMT_VBLStep)
				{
                    this.hoPtr.hoAdRunHeader.rhMT_VBLCount-=this.hoPtr.hoAdRunHeader.rhMT_VBLStep;
                    calculs=this.hoPtr.hoAdRunHeader.rhMT_VBLCount;	
                    break;
                }
				calculs=this.hoPtr.hoAdRunHeader.rhMT_VBLCount*MT_Speed;
				calculs<<=5;
                this.mtMove(calculs);
            	breakMtNewSpeed=true;
            	break;
            };
            if (breakMtNewSpeed)
            {
            	break;
            }
        };
    },

    mtMove:function(step)
    {
		step+=this.MT_Calculs;
		var step2=step>>>16;
		if (step2<this.MT_Longueur)
		{
            this.MT_Calculs=step;
            var x=(step2*this.MT_Cosinus)/16384+this.MT_XOrigin;	
            var y=(step2*this.MT_Sinus)/16384+this.MT_YOrigin;		

            this.hoPtr.hoX=x;
            this.hoPtr.hoY=y;
            this.hoPtr.roc.rcChanged=true;
            this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr);	
            return this.hoPtr.rom.rmMoveFlag;
		}

		step2-=this.MT_Longueur;
		step=(step2<<16)|(step&0xFFFF);
		if (this.MT_Speed!=0)
            step/=this.MT_Speed;
		step>>=5;
		this.hoPtr.hoAdRunHeader.rhMT_VBLCount+=step&0xFFFF;
	
		this.hoPtr.hoX=this.MT_XDest;
		this.hoPtr.hoY=this.MT_YDest;
		this.hoPtr.roc.rcChanged=true;
		this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr);	
		if (this.hoPtr.rom.rmMoveFlag) 
            return true;	
            
		this.hoPtr.hoMark1=this.hoPtr.hoAdRunHeader.rhLoopCount;
		this.hoPtr.hoMT_NodeName=null;

		// Passe au node suivant
		var number=this.MT_MoveNumber;
		this.MT_Calculs=0;	
		if (this.MT_Direction==false)
		{			
            number++;
            if (number<this.MT_Movement.mtNumber)
            {
                this.hoPtr.hoMT_NodeName=this.MT_Movement.steps[number].mdName;
                
                if (this.MT_GotoNode!=null)
                {
                    if (this.MT_Movement.steps[number].mdName!=null)
                    {
                        if (CServices.compareStringsIgnoreCase(this.MT_GotoNode, this.MT_Movement.steps[number].mdName))
                        {
                            this.MT_MoveNumber=number;
                            this.mtMessages();
                            return this.mtTheEnd();	
                        }
                    }
                }                   
                this.mtGoAvant(number);
                this.mtMessages();
                return this.hoPtr.rom.rmMoveFlag;
            }
            this.hoPtr.hoMark2=this.hoPtr.hoAdRunHeader.rhLoopCount;
            this.MT_MoveNumber=number;
            if (this.MT_Direction)
            {
                this.mtMessages();
                return this.hoPtr.rom.rmMoveFlag;
            }
            if (this.MT_Movement.mtReverse!=0)
            {
                this.MT_Direction=true;
                number--;
                this.hoPtr.hoMT_NodeName=this.MT_Movement.steps[number].mdName;
                this.mtGoArriere(number);
                this.mtMessages();
                return this.hoPtr.rom.rmMoveFlag;
            }
            this.mtReposAtEnd();
            if (this.MT_Movement.mtLoop==0)	
            {
                this.mtTheEnd();	
                this.mtMessages();
                return this.hoPtr.rom.rmMoveFlag;
            }
            number=0;
            this.mtGoAvant(number);
            this.mtMessages();
            return this.hoPtr.rom.rmMoveFlag;
		}
		else
		{
            if (this.MT_GotoNode!=null)
            {
                if (this.MT_Movement.steps[number].mdName!=null)
                {
                    if (CServices.compareStringsIgnoreCase(this.MT_GotoNode, this.MT_Movement.steps[number].mdName))
                    {
                        this.mtMessages();
                        return this.mtTheEnd();			//; Fin du mouvement
                    }
                }
            }                
            this.hoPtr.hoMT_NodeName=this.MT_Movement.steps[number].mdName;
            this.MT_Pause=this.MT_Movement.steps[number].mdPause;
            number--;
            if (number>=0)		
            {
                this.mtGoArriere(number);
                this.mtMessages();
                return this.hoPtr.rom.rmMoveFlag;
            }
            this.mtReposAtEnd();
            if (this.MT_Direction==false)
            {
                this.mtMessages();
                return this.hoPtr.rom.rmMoveFlag;
            }
            if (this.MT_Movement.mtLoop==0)
            {
                this.mtTheEnd();	
                this.mtMessages();
                return this.hoPtr.rom.rmMoveFlag;
            }
            number=0;		
            this.MT_Direction=false;
            this.mtGoAvant(number);
            this.mtMessages();
            return this.hoPtr.rom.rmMoveFlag;
		}
    },    
    mtGoAvant:function(number)
    {
		if (number>=this.MT_Movement.steps.length)
		    this.stop();
		else
		{
		    this.MT_Direction=false;
		    this.MT_MoveNumber=number;
		    this.MT_Pause=this.MT_Movement.steps[number].mdPause;
		    this.MT_Cosinus=this.MT_Movement.steps[number].mdCosinus;
		    this.MT_Sinus=this.MT_Movement.steps[number].mdSinus;
		    this.MT_XOrigin=this.hoPtr.hoX;
		    this.MT_YOrigin=this.hoPtr.hoY;
		    this.MT_XDest=this.hoPtr.hoX+this.MT_Movement.steps[number].mdDx;
		    this.MT_YDest=this.hoPtr.hoY+this.MT_Movement.steps[number].mdDy;
		    this.hoPtr.roc.rcDir=this.MT_Movement.steps[number].mdDir;
		    this.mtBranche();
		}
    },
    mtGoArriere:function(number)
    {
		if (number>=this.MT_Movement.steps.length)
		    this.stop();
		else
		{
		    this.MT_Direction=true;
		    this.MT_MoveNumber=number;
		    this.MT_Cosinus=-this.MT_Movement.steps[number].mdCosinus;
		    this.MT_Sinus=-this.MT_Movement.steps[number].mdSinus;
		    this.MT_XOrigin=this.hoPtr.hoX;
		    this.MT_YOrigin=this.hoPtr.hoY;
		    this.MT_XDest=this.hoPtr.hoX-this.MT_Movement.steps[number].mdDx;
		    this.MT_YDest=this.hoPtr.hoY-this.MT_Movement.steps[number].mdDy;
		    var dir=this.MT_Movement.steps[number].mdDir;
		    dir+=16;
		    dir&=31;
		    this.hoPtr.roc.rcDir=dir;
		    this.mtBranche();
		}
    },

    mtBranche:function()
    {
		this.MT_Longueur=this.MT_Movement.steps[this.MT_MoveNumber].mdLength;
		var speed=this.MT_Movement.steps[this.MT_MoveNumber].mdSpeed;

		var pause=this.MT_Pause;
		if (pause!=0)
		{
            this.MT_Pause=pause*20;	
            speed|=0x8000;
            this.rmStopSpeed=speed;		
		}
		if (this.rmStopSpeed!=0)
            speed=0;			
		if (speed!=this.MT_Speed || speed!=0)
		{
            this.MT_Speed=speed;
            this.hoPtr.rom.rmMoveFlag=true;
            this.MT_FlagBranch=true;
		}
		this.hoPtr.roc.rcSpeed=this.MT_Speed;
    },
    mtMessages:function()
    {
		if (this.hoPtr.hoMark1==this.hoPtr.hoAdRunHeader.rhLoopCount)
		{
            this.hoPtr.hoAdRunHeader.rhEvtProg.rhCurParam0=0;
		    this.hoPtr.hoAdRunHeader.rhEvtProg.handle_Event(this.hoPtr, (-20<<16)|(this.hoPtr.hoType&0xFFFF) );	    // CNDL_EXTPATHNODE
            this.hoPtr.hoAdRunHeader.rhEvtProg.handle_Event(this.hoPtr, (-35<<16)|(this.hoPtr.hoType&0xFFFF) );	    // CNDL_EXTPATHNODENAME
		}
		if (this.hoPtr.hoMark2==this.hoPtr.hoAdRunHeader.rhLoopCount)
		{
            this.hoPtr.hoAdRunHeader.rhEvtProg.rhCurParam0=0;
		    this.hoPtr.hoAdRunHeader.rhEvtProg.handle_Event(this.hoPtr, (-21<<16)|(this.hoPtr.hoType&0xFFFF) );   // CNDL_EXTENDPATH
		}
    },

    mtTheEnd:function()
    {
		this.MT_Speed=0;
		this.rmStopSpeed=0;
		this.hoPtr.rom.rmMoveFlag=true;
        this.MT_FlagBranch=false;
		return true;
    },
    mtReposAtEnd:function()
    {
		if (this.MT_Movement.mtRepos!=0)
		{
            this.hoPtr.hoX=this.MT_XStart;
            this.hoPtr.hoY=this.MT_YStart;
            this.hoPtr.roc.rcChanged=true;
		}
    },
    
    mtBranchNode:function(pName)
    {
		var number;
		for (number=0; number<this.MT_Movement.mtNumber; number++)
		{
            if (this.MT_Movement.steps[number].mdName!=null)
            {
                if (CServices.compareStringsIgnoreCase(pName, this.MT_Movement.steps[number].mdName))
                {
                    if (this.MT_Direction==false)
                    {
                        this.mtGoAvant(number);
                        this.hoPtr.hoMark1=this.hoPtr.hoAdRunHeader.rhLoopCount;
                        this.hoPtr.hoMT_NodeName=this.MT_Movement.steps[number].mdName;
                        this.hoPtr.hoMark2=0;
                        this.mtMessages();
                    }
                    else
                    {
                        if (number>0)
                        {
                            number--;
                            this.mtGoArriere(number);
                            this.hoPtr.hoMark1=this.hoPtr.hoAdRunHeader.rhLoopCount;
                            this.hoPtr.hoMT_NodeName=this.MT_Movement.steps[number].mdName;
                            this.hoPtr.hoMark2=0;
                            this.mtMessages();
                        }
                    }
                    this.hoPtr.rom.rmMoveFlag=true;
                    return;
                }
            }
        }
    },    
    mtGotoNode:function(pName)
    {
		var number;

		for (number=0; number<this.MT_Movement.mtNumber;  number++)
		{
            if (this.MT_Movement.steps[number].mdName!=null)
            {
                if (CServices.compareStringsIgnoreCase(pName, this.MT_Movement.steps[number].mdName))
                {
                    if (number==this.MT_MoveNumber)
                    {
                        if (this.MT_Calculs==0)	
                            return;						
                    }

                    this.MT_GotoNode=pName;

                    if (this.MT_Direction==false)
                    {
                        if (number>this.MT_MoveNumber)
                        {
                            if (this.MT_Speed!=0)
                                return;
                            if ((this.rmStopSpeed&0x8000)!=0)
                                this.start();
                            else
                                this.mtGoAvant(this.MT_MoveNumber);
                            return;
                        }
                        else
                        {
                            if (this.MT_Speed!=0)
                            {
                                this.reverse();
                                return;
                            }
                            if ((this.rmStopSpeed&0x8000)!=0)
                            {
                                this.start();
                                this.reverse();
                            }
                            else
                                this.mtGoArriere(MT_MoveNumber-1);
                            return;
                        }
                    }
                    else
                    {
                        if (number<=this.MT_MoveNumber)
                        {
                            if (this.MT_Speed!=0)
                                return;
                            if ((this.rmStopSpeed&0x8000)!=0)
                                this.start();
                            else
                            {
                                this.mtGoArriere(this.MT_MoveNumber-1);
                            }
                            return;
                        }
                        else
                        {
                            if (this.MT_Speed!=0)
                            {
                                this.reverse();
                                return;
                            }
                            if ((this.rmStopSpeed&0x8000)!=0)
                            {
                                this.start();
                                this.reverse();
                            }
                            else
                                this.mtGoAvant(this.MT_MoveNumber);
                            return;
                        }
                    }
                }
            }
        }
    },

    stop:function()
    {
		if (this.rmStopSpeed==0)
		{
            this.rmStopSpeed=this.MT_Speed|0x8000;
		}
		this.MT_Speed=0;
		this.hoPtr.rom.rmMoveFlag=true;
    },
    start:function()
    {
		if ((this.rmStopSpeed & 0x8000)!=0)
		{
            this.MT_Speed=this.rmStopSpeed&0x7FFF;
            this.MT_Pause=0;	
            this.rmStopSpeed=0;
            this.hoPtr.rom.rmMoveFlag=true;
		}
    }, 
    reverse:function()
    {
		if (this.rmStopSpeed==0)
		{
            this.hoPtr.rom.rmMoveFlag=true;
            var number=this.MT_MoveNumber;
            if (this.MT_Calculs==0)	
            {
                this.MT_Direction=!this.MT_Direction;
                if (this.MT_Direction)
                {
                    if (number==0)
                    {
                        this.MT_Direction=!this.MT_Direction;
                        return;
                    }
                    number--;
                    this.mtGoArriere(number);
                }
                else
                {
                    this.mtGoAvant(number);
                }
            }
            else
            {
                this.MT_Direction=!this.MT_Direction;
                this.MT_Cosinus=-this.MT_Cosinus;
                this.MT_Sinus=-this.MT_Sinus;
                var x1=this.MT_XOrigin;	
                var x2=this.MT_XDest;
                this.MT_XOrigin=x2;
                this.MT_XDest=x1;
                x1=this.MT_YOrigin;
                x2=this.MT_YDest;
                this.MT_YOrigin=x2;
                this.MT_YDest=x1;
                this.hoPtr.roc.rcDir+=16;	
                this.hoPtr.roc.rcDir&=31;
                var calcul=this.MT_Calculs>>>16;
                calcul=this.MT_Longueur-calcul;
                this.MT_Calculs=(calcul<<16)|(this.MT_Calculs&0xFFFF);
            }
		}       
    },

    setXPosition:function(x)
    {
		var x2=this.hoPtr.hoX;
		this.hoPtr.hoX=x;
	
		x2-=this.MT_XOrigin;
		x-=x2;
		x2=this.MT_XDest-this.MT_XOrigin+x;
		this.MT_XDest=x2;
		x2=this.MT_XOrigin;
		this.MT_XOrigin=x;
		x2-=x;
		this.MT_XStart-=x2;
		this.hoPtr.rom.rmMoveFlag=true;
		this.hoPtr.roc.rcChanged=true;
		this.hoPtr.roc.rcCheckCollides=true;	
    },
    setYPosition:function(y)
    {
		var y2=this.hoPtr.hoY;
		this.hoPtr.hoY=y;
	
		y2-=this.MT_YOrigin;
		y-=y2;
		y2=this.MT_YDest-this.MT_YOrigin+y;
		this.MT_YDest=y2;
		y2=this.MT_YOrigin;
		this.MT_YOrigin=y;
		y2-=y;
		this.MT_YStart-=y2;
		this.hoPtr.rom.rmMoveFlag=true;
		this.hoPtr.roc.rcChanged=true;
		this.hoPtr.roc.rcCheckCollides=true;
    },
    
    setSpeed:function(speed)
    {
		if (speed<0) 
            speed=0;
		if (speed>250) 
            speed=250;
		this.MT_Speed=speed;
		this.hoPtr.roc.rcSpeed=speed;
		this.hoPtr.rom.rmMoveFlag=true;
    },
    setMaxSpeed:function(speed)
    {
		this.setSpeed(speed);   
    },
	setDir:function(dir)
	{
	}  
});

// CMovePlatform object
// -----------------------------------------------------------------
CMovePlatform.MPJC_NOJUMP=0;
CMovePlatform.MPJC_DIAGO=1;
CMovePlatform.MPJC_BUTTON1=2;
CMovePlatform.MPJC_BUTTON2=3;
CMovePlatform.MPTYPE_WALK=0;
CMovePlatform.MPTYPE_CLIMB=1;
CMovePlatform.MPTYPE_JUMP=2;
CMovePlatform.MPTYPE_FALL=3;
CMovePlatform.MPTYPE_CROUCH=4;
CMovePlatform.MPTYPE_UNCROUCH=5;
function CMovePlatform()
{
    this.MP_Type=0;
    this.MP_Bounce=0;
    this.MP_BounceMu=0;
    this.MP_XSpeed=0;
    this.MP_Gravity=0;
    this.MP_Jump=0;
    this.MP_YSpeed=0;
    this.MP_XMB=0;
    this.MP_YMB=0;
    this.MP_HTFOOT=0;
    this.MP_JumpControl=0;
    this.MP_JumpStopped=0;
    this.MP_PreviousDir=0;
    this.MP_ObjectUnder=null;
    this.MP_XObjectUnder=0;
    this.MP_YObjectUnder=0;
    this.MP_NoJump=false;
}
CMovePlatform.prototype=CServices.extend(new CMove(),
{	
    init:function(ho, mpPtr)
    {
        this.hoPtr=ho;
        
        this.hoPtr.hoCalculX=0;
		this.hoPtr.hoCalculY=0;
		this.MP_XSpeed=0;
		this.hoPtr.roc.rcSpeed=0;
		this.MP_Bounce=0;
		this.hoPtr.roc.rcPlayer=mpPtr.mvControl;
		this.rmAcc=mpPtr.mpAcc;				
		this.rmAccValue=this.getAccelerator(this.rmAcc);
		this.rmDec=mpPtr.mpDec;				
		this.rmDecValue=this.getAccelerator(this.rmDec);
		this.hoPtr.roc.rcMaxSpeed=mpPtr.mpSpeed;	
		this.hoPtr.roc.rcMinSpeed=0;				
	
		this.MP_Gravity=mpPtr.mpGravity;		
		this.MP_Jump=mpPtr.mpJump;			
		var jump=mpPtr.mpJumpControl;
		if (jump>3) 
            jump=CMovePlatform.MPJC_DIAGO;
		this.MP_JumpControl=jump;
		this.MP_YSpeed=0;			
	
		this.MP_JumpStopped=0;
        this.MP_ObjectUnder=null;
        
		this.moveAtStart(mpPtr);
		this.MP_PreviousDir=this.hoPtr.roc.rcDir;
		this.hoPtr.roc.rcChanged=true;
		this.MP_Type=CMovePlatform.MPTYPE_WALK;        
    },

    move:function()
    {
		var x, y;
		this.hoPtr.hoAdRunHeader.rhVBLObjet=1;
		var joyDir=this.hoPtr.hoAdRunHeader.rhPlayer[this.hoPtr.roc.rcPlayer-1];
		this.calcMBFoot();

		var xSpeed=this.MP_XSpeed;
		var speed8, dSpeed;
		if (this.MP_JumpStopped==0)
		{
            if (xSpeed<=0)
            {
                if ((joyDir&4)!=0)		
                {
                    dSpeed=this.rmAccValue;
                    if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                        dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                    xSpeed-=dSpeed;
                    speed8=xSpeed/256;
                    if (speed8<-this.hoPtr.roc.rcMaxSpeed)
                        xSpeed=-this.hoPtr.roc.rcMaxSpeed*256;
                }
                else if (xSpeed<0)
                {
                    dSpeed=this.rmDecValue;
                    if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                        dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                    xSpeed+=dSpeed;
                    if (xSpeed>0) 
                        xSpeed=0;
                }
                if ((joyDir&8)!=0)			
                    xSpeed=-xSpeed;
            }
            if (xSpeed>=0)
            {
                if ((joyDir&8)!=0)							
                {
                    dSpeed=this.rmAccValue;
                    if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                        dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                    xSpeed+=dSpeed;
                    speed8=xSpeed/256;
                    if (speed8>this.hoPtr.roc.rcMaxSpeed)
                        xSpeed=this.hoPtr.roc.rcMaxSpeed*256;
                }
                else if (xSpeed>0)
                {
                    dSpeed=this.rmDecValue;
                    if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                        dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                    xSpeed-=dSpeed;
                    if (xSpeed<0) 
                        xSpeed=0;
                }
                if ((joyDir&4)!=0)
                {
                    xSpeed=-xSpeed;
                }
            }
            this.MP_XSpeed=xSpeed;
		}

		var ySpeed=this.MP_YSpeed;
        var flag=false;
        while(true)
        {
            switch (this.MP_Type)
            {
                case 2:     // MPTYPE_FALL:
                case 3:     // MPTYPE_JUMP:
                    dSpeed=this.MP_Gravity<<5;
                    if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                        dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;                    
                    ySpeed=ySpeed+dSpeed;  
                    if (ySpeed>0xFA00) 
                        ySpeed=0xFA00;
                    break;
                case 0:     // MPTYPE_WALK:
                    if ((joyDir&1)!=0)
                    {
                        if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB-4)==CRun.INTBAD) 
                            break;
                        this.MP_Type=CMovePlatform.MPTYPE_CLIMB;
                        flag=true;
                        continue;
                    }
                    if ((joyDir&2)!=0)
                    {
                        if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB+4)==CRun.INTBAD) 
                            break;
                        this.MP_Type=CMovePlatform.MPTYPE_CLIMB;
                        flag=true;
                        continue;
                    }
                    break;
                case 1:         // MPTYPE_CLIMB:
                    if (flag==false)
                    {
                        this.MP_JumpStopped=0;
                        if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB)==CRun.INTBAD) 
                            if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB-4)==CRun.INTBAD)
                                break;
                    }
                    if (ySpeed<=0)
                    {
                        if ((joyDir&1)!=0)		
                        {
                            dSpeed=this.rmAccValue;
                            if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                                dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                            ySpeed-=dSpeed;
                            speed8=ySpeed/256;	
                            if (speed8<-this.hoPtr.roc.rcMaxSpeed)
                                ySpeed=-this.hoPtr.roc.rcMaxSpeed*256;
                        }
                        else
                        {
                            dSpeed=this.rmDecValue;
                            if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                                dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                            ySpeed+=dSpeed;
                            if (ySpeed>0) 
                                ySpeed=0;
                        }
                        if ((joyDir&2)!=0)			
                            ySpeed=-ySpeed;
                    }
                    if (ySpeed>=0)
                    {
                        if ((joyDir&2)!=0)							
                        {
                            dSpeed=this.rmAccValue;
                            if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                                dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                            ySpeed+=dSpeed;
                            speed8=ySpeed/256;		
                            if (speed8>this.hoPtr.roc.rcMaxSpeed)
                                ySpeed=this.hoPtr.roc.rcMaxSpeed*256;
                        }
                        else
                        {
                            dSpeed=this.rmDecValue;
                            if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                                dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                            ySpeed-=dSpeed;
                            if (ySpeed<0) 
                                ySpeed=0;
                        }
                        if ((joyDir&1)!=0)
                            ySpeed=-ySpeed;
                    }
                    break;
            }            
            break;
        }
        this.MP_YSpeed=ySpeed;

		var dir=0;
		if (xSpeed<0) 
            dir=16;
		var sX=xSpeed;
		var sY=ySpeed;
		if (sY!=0)
		{
            var flags=0;	
            if (sX<0)	
            {
                flags|=1;
                sX=-sX;
            }
            if (sY<0)	
            {
                flags|=2;
                sY=-sY;
            }	
            sX<<=8;		
            sX=sX/sY;
            var i;
            for (i=0; ; i+=2)
            {
                if (sX>=CMove.CosSurSin32[i]) 
                    break;
            }
            dir=CMove.CosSurSin32[i+1];
            if ((flags&0x02)!=0)
            {
                dir=-dir+32;
                dir&=31;
            }
            if ((flags&0x01)!=0)
            {
                dir-=8;
                dir&=31;
                dir=-dir;
                dir&=31;
                dir+=8;
                dir&=31;
            }
		}

		sX=xSpeed;
		var cosinus=CMove.Cosinus32[dir];
		var sinus=CMove.Sinus32[dir];
		if (cosinus<0) 
            cosinus=-cosinus;
		if (sinus<0) 
            sinus=-sinus;
		if (cosinus<sinus)
		{
            cosinus=sinus;
            sX=ySpeed;
		}
		if (sX<0)					
            sX=-sX;
		sX=sX/cosinus;
		if (sX>250) 
            sX=250;
		this.hoPtr.roc.rcSpeed=sX;

		switch (this.MP_Type)
		{
            case 1: 
				if (ySpeed<0)
                    this.hoPtr.roc.rcDir=8;
				else if (ySpeed>0)
                    this.hoPtr.roc.rcDir=24;    
				break;
            case 3:  
				this.hoPtr.roc.rcDir=dir;
				break;
            default:
				if (xSpeed<0)
                    this.hoPtr.roc.rcDir=16;
                else if (xSpeed>0)
                    this.hoPtr.roc.rcDir=0;
				break;
		}

		switch (this.MP_Type)
		{
            case 4:      // MPTYPE_CROUCH:
				this.hoPtr.roc.rcAnim=CAnim.ANIMID_CROUCH;
				break;
            case 5:     // MPTYPE_UNCROUCH:
				this.hoPtr.roc.rcAnim=CAnim.ANIMID_UNCROUCH;
				break;
            case 3:     // MPTYPE_FALL:
				this.hoPtr.roc.rcAnim=CAnim.ANIMID_FALL;
				break;
            case 2:     // MPTYPE_JUMP:
				this.hoPtr.roc.rcAnim=CAnim.ANIMID_JUMP;
				break;
            case 1:     // MPTYPE_CLIMB:
				this.hoPtr.roc.rcAnim=CAnim.ANIMID_CLIMB;
				break;
            default:
				this.hoPtr.roc.rcAnim=CAnim.ANIMID_WALK;
				break;
		}

        if (this.hoPtr.roa!=null)
            this.hoPtr.roa.animate();
		this.calcMBFoot();

		this.newMake_Move(this.hoPtr.roc.rcSpeed, dir);

		if ( (this.MP_Type==CMovePlatform.MPTYPE_WALK || this.MP_Type==CMovePlatform.MPTYPE_CLIMB) && this.MP_NoJump==false )
		{
            var bJump=false;
            var j=this.MP_JumpControl;
            if (j!=0)
            {
                j--;
                if (j==0)
                {
                    if ( (joyDir&5)==5 ) 
                        bJump=true;				
                    if ( (joyDir&9)==9 ) 
                        bJump=true;				
                }
                else
                {
                    j<<=4;
                    if ((joyDir&j)!=0)
                        bJump=true;
                }
            }
            if (bJump)
            {
                this.MP_YSpeed=-this.MP_Jump<<8;          
                this.MP_Type=CMovePlatform.MPTYPE_JUMP;
            }
		} 
		switch (this.MP_Type)
		{
            case 2:         // MPTYPE_JUMP:
				if (this.MP_YSpeed>=0)
                    this.MP_Type=CMovePlatform.MPTYPE_FALL;
				break;

            case 3:         // MPTYPE_FALL:
				if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB)!=CRun.INTBAD) 
				{
                    this.MP_YSpeed=0;
                    this.MP_Type=CMovePlatform.MPTYPE_CLIMB;
                    this.hoPtr.roc.rcDir=8;
				}
				break;

            case 0:         // MPTYPE_WALK:
				if ((joyDir&3)!=0 && (joyDir&12)==0)
				{
                    if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB)!=CRun.INTBAD) 
                    {
                        this.MP_Type=CMovePlatform.MPTYPE_CLIMB;
                        this.MP_XSpeed=0;
                        break;
                    }
				}
				if ((joyDir&2)!=0)
				{
                    if (this.hoPtr.roa!=null)
                    {
                        if (this.hoPtr.roa.anim_Exist(CAnim.ANIMID_CROUCH))	
                        {
                            this.MP_XSpeed=0;
                            this.MP_Type=CMovePlatform.MPTYPE_CROUCH;
                        }
                    }
				}

				if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB)!=CRun.INTBAD) 
                    break;

				if (this.tst_SpritePosition(this.hoPtr.hoX, this.hoPtr.hoY+10, this.MP_HTFOOT, CRunFrame.CM_TEST_PLATFORM, true)==false) 
				{
                    x=this.hoPtr.hoX-this.hoPtr.hoAdRunHeader.rhWindowX;		
                    y=this.hoPtr.hoY-this.hoPtr.hoAdRunHeader.rhWindowY;
                    var d=y+this.MP_HTFOOT-1;	
                    var pt=new CPoint();
                    this.mpApproachSprite(x, d, x, y, this.MP_HTFOOT, CRunFrame.CM_TEST_PLATFORM, pt);

                    this.hoPtr.hoX=pt.x+this.hoPtr.hoAdRunHeader.rhWindowX;
                    this.hoPtr.hoY=pt.y+this.hoPtr.hoAdRunHeader.rhWindowY;
				    this.MP_NoJump=false;
				}
				else
				{
                    this.MP_Type=CMovePlatform.MPTYPE_FALL;
				}
				break;

            case 1:         // MPTYPE_CLIMB:
				if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB)==CRun.INTBAD)
				{
                    if (this.MP_YSpeed<0)
                    {
                        for (sY=0; sY<32; sY++)
                        {
                            if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB+sY)!=CRun.INTBAD)
                            {
                                this.hoPtr.hoY+=sY;
                                break;
                            }
                        }
                    }
                    this.MP_YSpeed=0;
				}
				if ((joyDir&12)!=0)
				{
                    this.MP_Type=CMovePlatform.MPTYPE_WALK;
                    this.MP_YSpeed=0;
				}
				break;
	
            case 4:         // MPTYPE_CROUCH:
				if ((joyDir&2)==0)
				{
                    if (hoPtr.roa!=null)
                    {
						if (this.hoPtr.roa.anim_Exist(CAnim.ANIMID_UNCROUCH))
						{
                            this.MP_Type=CMovePlatform.MPTYPE_UNCROUCH;
                            this.hoPtr.roc.rcAnim=CAnim.ANIMID_UNCROUCH;
                            this.hoPtr.roa.animate();
                            this.hoPtr.roa.raAnimRepeat=1;	
                            break;
						}
                    }
                    this.MP_Type=CMovePlatform.MPTYPE_WALK;
				}
				break;

            case 5:         // MPTYPE_UNCROUCH:
                if (this.hoPtr.roa!=null)
                {
                    if (this.hoPtr.roa.raAnimNumberOfFrame==0)
                    {
                        this.MP_Type=CMovePlatform.MPTYPE_WALK;
                    }
                }
				break;
		}
	
		if (this.MP_Type==CMovePlatform.MPTYPE_WALK || this.MP_Type==CMovePlatform.MPTYPE_CROUCH || this.MP_Type==CMovePlatform.MPTYPE_UNCROUCH)
		{
            do
            {
				var pOiColList=null;
				if (this.hoPtr.hoOiList!=null)
				{
					pOiColList=this.hoPtr.hoOiList.oilColList;
				}
                if (this.hoPtr.hoAdRunHeader.objectAllCol_IXY(this.hoPtr, this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY, this.hoPtr.hoX, this.hoPtr.hoY, pOiColList)==null) 
                {
				    var list=this.hoPtr.hoAdRunHeader.objectAllCol_IXY(this.hoPtr, this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY, this.hoPtr.hoX, this.hoPtr.hoY+1, pOiColList);
				    if (list!=null && list.size()==1) 
				    {
						var pHo2=list.get(0);
						if (this.MP_ObjectUnder==null || this.MP_ObjectUnder!=pHo2)
						{
						    if (this.hoPtr.hoOi!=pHo2.hoOi)
						    {
								this.MP_ObjectUnder=pHo2;
								this.MP_XObjectUnder=pHo2.hoX;
								this.MP_YObjectUnder=pHo2.hoY;
								break;
						    }
						}
						var dx=pHo2.hoX-this.MP_XObjectUnder;
						var dy=pHo2.hoY-this.MP_YObjectUnder;
						this.MP_XObjectUnder=pHo2.hoX;
						this.MP_YObjectUnder=pHo2.hoY;

						this.hoPtr.hoX+=dx;
						this.hoPtr.hoY+=dy;
		                this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr);
						this.hoPtr.roc.rcChanged=true;				
						break;
				    }
                }
				this.MP_ObjectUnder=null;
            }while(false);		
		}
		else
		{
            this.MP_ObjectUnder=null;
		}
   },

    mpStopIt:function()
    {
		this.hoPtr.roc.rcSpeed=0;
		this.MP_XSpeed=0;
		this.MP_YSpeed=0;	
    },
    bounce:function()
    {
		this.stop();
    },
    stop:function()
    {
		this.MP_Bounce=0;
	
		if (this.rmCollisionCount!=this.hoPtr.hoAdRunHeader.rh3CollisionCount) 
		{
            this.mpStopIt();
            return;
		}
		this.hoPtr.rom.rmMoveFlag=true;	
		var scrX=this.hoPtr.hoX-this.hoPtr.hoAdRunHeader.rhWindowX;
		var scrY=this.hoPtr.hoY-this.hoPtr.hoAdRunHeader.rhWindowY;
		var x,y, dir;

		switch (this.hoPtr.hoAdRunHeader.rhEvtProg.rhCurCode&0xFFFF0000)
		{
            case (-12<<16):         // CNDL_EXTOUTPLAYFIELD:
				x=this.hoPtr.hoX-this.hoPtr.hoImgXSpot;
				y=this.hoPtr.hoY-this.hoPtr.hoImgYSpot;
				dir=this.hoPtr.hoAdRunHeader.quadran_Out(x, y, x+this.hoPtr.hoImgWidth, y+this.hoPtr.hoImgHeight);
				
				x=this.hoPtr.hoX;
				y=this.hoPtr.hoY;
				if ((dir&CRun.BORDER_LEFT)!=0)
				{
                    x=this.hoPtr.hoImgXSpot;
				    this.MP_XSpeed=0;
				    this.MP_NoJump=true;
				}
				if ((dir&CRun.BORDER_RIGHT)!=0)
				{
                    x=this.hoPtr.hoAdRunHeader.rhLevelSx-this.hoPtr.hoImgWidth+this.hoPtr.hoImgXSpot;
				    this.MP_XSpeed=0;
				    this.MP_NoJump=true;
				}
				if ((dir&CRun.BORDER_TOP)!=0)
				{
                    y=this.hoPtr.hoImgYSpot;
				    this.MP_YSpeed=0;
				    this.MP_NoJump=false;
				}
				if ((dir&CRun.BORDER_BOTTOM)!=0)
				{
                    y=this.hoPtr.hoAdRunHeader.rhLevelSy-this.hoPtr.hoImgHeight+this.hoPtr.hoImgYSpot;
				    this.MP_YSpeed=0;
				    this.MP_NoJump=false;
				}
				this.hoPtr.hoX=x;
				this.hoPtr.hoY=y;
				if (this.MP_Type==CMovePlatform.MPTYPE_JUMP)
				    this.MP_Type=CMovePlatform.MPTYPE_FALL;
				else
				    this.MP_Type=CMovePlatform.MPTYPE_WALK;
				this.MP_JumpStopped=0;
				return;
				
		    case (-13<<16):	    // CNDL_EXTCOLBACK:
		    case (-14<<16):	    // CNDL_EXTCOLLISION:
				this.MP_NoJump=false;
				var pt=new CPoint();
				if (this.MP_Type==CMovePlatform.MPTYPE_FALL)
				{
				    this.mpApproachSprite(scrX, scrY, this.hoPtr.roc.rcOldX-this.hoPtr.hoAdRunHeader.rhWindowX, this.hoPtr.roc.rcOldY-this.hoPtr.hoAdRunHeader.rhWindowY, this.MP_HTFOOT, CRunFrame.CM_TEST_PLATFORM, pt);			
		
				    this.hoPtr.hoX=pt.x+this.hoPtr.hoAdRunHeader.rhWindowX;
				    this.hoPtr.hoY=pt.y+this.hoPtr.hoAdRunHeader.rhWindowY;
				    this.MP_Type=CMovePlatform.MPTYPE_WALK;
				    this.hoPtr.roc.rcChanged=true;
		
				    if (this.tst_SpritePosition(this.hoPtr.hoX, this.hoPtr.hoY+1, 0, CRunFrame.CM_TEST_PLATFORM, true))
				    {
						this.hoPtr.roc.rcSpeed=0;
						this.MP_XSpeed=0;
				    }
				    else
				    {
						this.MP_JumpStopped=0;
						this.hoPtr.roc.rcSpeed=Math.abs(this.MP_XSpeed/256);
						this.MP_YSpeed=0;	
				    }
				    return;
				}
				if (this.MP_Type==CMovePlatform.MPTYPE_WALK)
				{
				    if(this.mpApproachSprite(scrX, scrY, scrX, scrY-this.MP_HTFOOT, 0, CRunFrame.CM_TEST_PLATFORM, pt))
				    {
						this.hoPtr.hoX=pt.x+this.hoPtr.hoAdRunHeader.rhWindowX;
						this.hoPtr.hoY=pt.y+this.hoPtr.hoAdRunHeader.rhWindowY;
						this.hoPtr.roc.rcChanged=true;
						return;
				    }
				    if(this.mpApproachSprite(scrX, scrY, this.hoPtr.roc.rcOldX-this.hoPtr.hoAdRunHeader.rhWindowX, this.hoPtr.roc.rcOldY-this.hoPtr.hoAdRunHeader.rhWindowY, 0, CRunFrame.CM_TEST_PLATFORM, pt))
				    {
						this.hoPtr.hoX=pt.x+this.hoPtr.hoAdRunHeader.rhWindowX;
						this.hoPtr.hoY=pt.y+this.hoPtr.hoAdRunHeader.rhWindowY;
						this.hoPtr.roc.rcChanged=true;
						this.mpStopIt();
						return;
				    }
				}				
				if (this.MP_Type==CMovePlatform.MPTYPE_JUMP)
				{
				    if(this.mpApproachSprite(scrX, scrY, scrX, scrY-this.MP_HTFOOT, 0, CRunFrame.CM_TEST_PLATFORM, pt))	
				    {
						this.hoPtr.hoX=pt.x+this.hoPtr.hoAdRunHeader.rhWindowX;
						this.hoPtr.hoY=pt.y+this.hoPtr.hoAdRunHeader.rhWindowY;
						this.hoPtr.roc.rcChanged=true;
						return;
				    }
				    this.MP_JumpStopped=1;
				    this.MP_XSpeed=0;	
				}
				if (this.MP_Type==CMovePlatform.MPTYPE_CLIMB)
				{
				    if(this.mpApproachSprite(scrX, scrY, this.hoPtr.roc.rcOldX-this.hoPtr.hoAdRunHeader.rhWindowX, this.hoPtr.roc.rcOldY-this.hoPtr.hoAdRunHeader.rhWindowY, 0, CRunFrame.CM_TEST_PLATFORM, pt))
				    {
						this.hoPtr.hoX=pt.x+this.hoPtr.hoAdRunHeader.rhWindowX;
						this.hoPtr.hoY=pt.y+this.hoPtr.hoAdRunHeader.rhWindowY;
						this.hoPtr.roc.rcChanged=true;
						this.mpStopIt();
						return;
				    }
				}
				this.hoPtr.roc.rcImage=this.hoPtr.roc.rcOldImage;
				this.hoPtr.roc.rcAngle=this.hoPtr.roc.rcOldAngle;
				if (this.tst_SpritePosition(this.hoPtr.hoX, this.hoPtr.hoY, 0, CRunFrame.CM_TEST_PLATFORM, true))
				    return;

				this.hoPtr.hoX=this.hoPtr.roc.rcOldX;
				this.hoPtr.hoY=this.hoPtr.roc.rcOldY;
				this.hoPtr.roc.rcChanged=true;
				break;
	 	}	 		
    },

    setXPosition:function(x)
    {        
		if (this.hoPtr.hoX!=x)
		{
		    this.hoPtr.hoX=x;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;	
		}
    },
    setYPosition:function(y)
    {
		if (this.hoPtr.hoY!=y)
		{
		    this.hoPtr.hoY=y;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;	
		}
    },

    setSpeed:function(speed)
    {
        if (speed<0) speed=0;
        if (speed>250) speed=250;
		if (speed>this.hoPtr.roc.rcMaxSpeed)
		{
            speed=this.hoPtr.roc.rcMaxSpeed;
		}
		this.hoPtr.roc.rcSpeed=speed;
		this.MP_XSpeed=this.hoPtr.roc.rcSpeed*CMove.Cosinus32[this.hoPtr.roc.rcDir];
		this.MP_YSpeed=this.hoPtr.roc.rcSpeed*CMove.Sinus32[this.hoPtr.roc.rcDir];
		this.hoPtr.rom.rmMoveFlag=true;        
    },

    setMaxSpeed:function(speed)
    {
        if (speed<0) speed=0;
        if (speed>250) speed=250;
    	this.hoPtr.roc.rcMaxSpeed=speed;
		speed<<=8;
		if (this.MP_XSpeed>speed)
            this.MP_XSpeed=speed;
		this.hoPtr.rom.rmMoveFlag=true;
    },

    setGravity:function(gravity)
    {
		this.MP_Gravity=gravity;
    },
    
    setDir:function(dir)
    {
		this.hoPtr.roc.rcDir=dir;
		this.MP_XSpeed=this.hoPtr.roc.rcSpeed*CMove.Cosinus32[dir];
		this.MP_YSpeed=this.hoPtr.roc.rcSpeed*CMove.Sinus32[dir];
    },
    
    calcMBFoot:function()
    {
		var ifo;

		if (this.hoPtr.roc.rcImage!=0)
            ifo=this.hoPtr.hoAdRunHeader.rhApp.imageBank.getImageInfoEx(this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY);
		else
		{
            ifo=new CImage();
            ifo.width=this.hoPtr.hoImgWidth;
            ifo.height=this.hoPtr.hoImgHeight;
            ifo.xSpot=this.hoPtr.hoImgXSpot;
            ifo.ySpot=this.hoPtr.hoImgYSpot;
		}
		this.MP_XMB=0;		
		this.MP_YMB=ifo.height-ifo.ySpot;		
		this.MP_HTFOOT=((ifo.height*2)+ifo.height)>>>3;	
    },

    check_Ladder:function(nLayer, x, y)
    {
        var prc= this.hoPtr.hoAdRunHeader.y_GetLadderAt(nLayer, x, y);
		if ( prc!=null )
		{
		    return prc.top;
		}
		return CRun.INTBAD;
    },

    mpHandle_Background:function()
    {
		this.calcMBFoot();
		if (this.check_Ladder(this.hoPtr.hoLayer, this.hoPtr.hoX+this.MP_XMB, this.hoPtr.hoY+this.MP_YMB)!=CRun.INTBAD) 
            return;	

		if (this.hoPtr.hoAdRunHeader.colMask_TestObject_IXY(this.hoPtr, this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY, this.hoPtr.hoX, this.hoPtr.hoY, 0, CRunFrame.CM_TEST_OBSTACLE)==false)
		{
            if (this.MP_Type==CMovePlatform.MPTYPE_JUMP && this.MP_YSpeed<0) 
                return;

            if (this.hoPtr.hoAdRunHeader.colMask_TestObject_IXY(this.hoPtr, this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY, this.hoPtr.hoX, this.hoPtr.hoY, this.MP_HTFOOT, CRunFrame.CM_TEST_PLATFORM)==false) 
                return; 
		}
		this.hoPtr.hoAdRunHeader.rhEvtProg.handle_Event(this.hoPtr, (-13<<16)|(this.hoPtr.hoType&0xFFFF) );
    }
});

// CMoveRace object
// -----------------------------------------------------------
CMoveRace.RaceMask=
[
	0xFFFFFFF8,
	0xFFFFFFFC,
	0xFFFFFFFE,
	0xFFFFFFFF  
];
function CMoveRace()
{
    this.MR_Bounce=0;
    this.MR_BounceMu=0;
    this.MR_Speed=0;
    this.MR_RotSpeed=0;
    this.MR_RotCpt=0;
    this.MR_RotPos=0;
    this.MR_RotMask=0;
    this.MR_OkReverse=0;
    this.MR_OldJoy=0;
    this.MR_LastBounce=0;
}
CMoveRace.prototype=CServices.extend(new CMove(),
{	
    init:function(ho, mrPtr)
    {
		this.hoPtr=ho;
        
		this.MR_Speed=0;
		this.hoPtr.roc.rcSpeed=0;
		this.MR_Bounce=0;
		this.MR_LastBounce=-1;
		this.hoPtr.roc.rcPlayer=mrPtr.mvControl;
		this.rmAcc=mrPtr.mrAcc;
		this.rmAccValue=this.getAccelerator(mrPtr.mrAcc);
		this.rmDec=mrPtr.mrDec;
		this.rmDecValue=this.getAccelerator(mrPtr.mrDec);
		this.hoPtr.roc.rcMaxSpeed=mrPtr.mrSpeed;
		this.hoPtr.roc.rcMinSpeed=0;
		this.MR_BounceMu=mrPtr.mrBounceMult;
		this.MR_OkReverse=mrPtr.mrOkReverse;
		this.hoPtr.rom.rmReverse=0;
		this.rmOpt=mrPtr.mvOpt;
		this.MR_OldJoy=0;
	
		this.MR_RotMask=CMoveRace.RaceMask[mrPtr.mrAngles];
		this.MR_RotSpeed=mrPtr.mrRot;
		this.MR_RotCpt=0;
		this.MR_RotPos=this.hoPtr.roc.rcDir;
		this.hoPtr.hoCalculX=0;
		this.hoPtr.hoCalculY=0;
		this.moveAtStart(mrPtr);
	
		this.hoPtr.roc.rcChanged=true;
    },

    move:function()
    {
		var j;
		var add, accel, speed, dir, speed8;
        var dSpeed;

		this.hoPtr.hoAdRunHeader.rhVBLObjet=1;
	
		if (this.MR_Bounce==0)
        {
            this.hoPtr.rom.rmBouncing=false;

            j=this.hoPtr.hoAdRunHeader.rhPlayer[this.hoPtr.roc.rcPlayer-1]&0x0F;
	
            add=0;
            if ((j&0x08)!=0)
                add=-1;
            if ((j&0x04)!=0)
                add=1;
            if (add!=0)
            {
                dSpeed=this.MR_RotSpeed;
                if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                    dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;                
                this.MR_RotCpt+=dSpeed;
                while (this.MR_RotCpt>100)
                {
                    this.MR_RotCpt-=100;
                    this.MR_RotPos+=add;
                    this.MR_RotPos&=31;
                    this.hoPtr.roc.rcDir=this.MR_RotPos&this.MR_RotMask;
                };
				this.hoPtr.roc.rcChanged=true;
            }
	
            accel=0;
            if (this.hoPtr.rom.rmReverse!=0)
            {
                if ((j&0x01)!=0)
                    accel=1;
                if ((j&0x02)!=0)
                    accel=2;
            }
            else
            {
                if ((j&0x01)!=0)
                    accel=2;
                if ((j&0x02)!=0)
                    accel=1;
            }
            speed=this.MR_Speed;
            while(true)
            {
                if ((accel&1)!=0)
                {
                    if (this.MR_Speed==0)
                    {
                        if (this.MR_OkReverse==0) 
                            break;
                        if ((this.MR_OldJoy&0x03)!=0)
                            break;
                        this.hoPtr.rom.rmReverse^=1;
                        dSpeed=this.rmAccValue;
                        if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                            dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                        speed+=dSpeed;
                        speed8=speed>>8;
                        if (speed8>this.hoPtr.roc.rcMaxSpeed)
                        {
                            speed=this.hoPtr.roc.rcMaxSpeed<<8;
                            this.MR_Speed=speed;
                        }
                        this.MR_Speed=speed;
                        break;
                    }
                    dSpeed=this.rmDecValue;
                    if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                        dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                    speed-=dSpeed;
                    if (speed<0) 
                        speed=0;
                    this.MR_Speed=speed;
                }
                else if ((accel&2)!=0)
                {
                    dSpeed=this.rmAccValue;
                    if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                        dSpeed=dSpeed*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;
                    speed+=dSpeed;
                    speed8=speed>>8;
                    if (speed8>this.hoPtr.roc.rcMaxSpeed)
                    {
                        speed=this.hoPtr.roc.rcMaxSpeed<<8;
                        this.MR_Speed=speed;
                    }
                    this.MR_Speed=speed;
                }
                break;
            };
            this.MR_OldJoy=j;
	
            this.hoPtr.roc.rcSpeed=this.MR_Speed>>8;
            this.hoPtr.roc.rcAnim=CAnim.ANIMID_WALK;
            if (this.hoPtr.roa!=null)
                this.hoPtr.roa.animate();

            dir=this.hoPtr.roc.rcDir;
            if (this.hoPtr.rom.rmReverse!=0)
            {
                dir+=16;
                dir&=31;
            }
            if (this.newMake_Move(this.hoPtr.roc.rcSpeed, dir)==false) 
                return;		
        }
		do
		{
            if (this.MR_Bounce==0) 
                break;
            if (this.hoPtr.hoAdRunHeader.rhVBLObjet==0) 
                break;	
            speed=this.MR_Speed;
            speed-=this.rmDecValue;
            if (speed<=0)
            {
                this.MR_Speed=0;
                this.MR_Bounce=0;
                break;
            }
            this.MR_Speed=speed;
            speed>>=8;
            dir=this.hoPtr.roc.rcDir;
            if (this.MR_Bounce!=0)
            {	
                dir+=16;
                dir&=31;
            }
			if (this.newMake_Move(speed, dir)==false)
				break;
		} while(true);	
   },

    reverse:function()
    {        
    },
	setDir:function(dir)
	{	
	},

    stop:function()
    {
		this.MR_Bounce=0;
		this.MR_Speed=0;	
		this.hoPtr.rom.rmReverse=0;				
		if (this.rmCollisionCount==this.hoPtr.hoAdRunHeader.rh3CollisionCount)
		{
            this.mv_Approach((this.rmOpt&CMove.MVTOPT_8DIR_STICK)!=0);	
            this.hoPtr.rom.rmMoveFlag=true;
		}
    },
    start:function()
    {
		this.rmStopSpeed=0;
		this.hoPtr.rom.rmMoveFlag=true;	        
    },
    bounce:function()
    {
		if (this.rmCollisionCount==this.hoPtr.hoAdRunHeader.rh3CollisionCount)	
		{
            this.mv_Approach((this.rmOpt&CMove.MVTOPT_8DIR_STICK)!=0);
		}
		if (this.hoPtr.hoAdRunHeader.rhLoopCount!=this.MR_LastBounce)	
		{
            this.MR_Bounce=this.hoPtr.rom.rmReverse;				
            this.hoPtr.rom.rmReverse=0;						
            this.MR_Bounce++;
            if (this.MR_Bounce>=16)							
            {
            	this.stop();
				return;
            }
            this.hoPtr.rom.rmMoveFlag=true;
            this.hoPtr.rom.rmBouncing=true;		
		}	
    },
    
    setSpeed:function(speed)
    {
        if (speed<0) speed=0;
        if (speed>250) speed=250;
		if (speed>this.hoPtr.roc.rcMaxSpeed)
            speed=this.hoPtr.roc.rcMaxSpeed;
		speed<<=8; 
		this.MR_Speed=speed;
		this.hoPtr.rom.rmMoveFlag=true;        
    },
    setMaxSpeed:function(speed)
    {
        if (speed<0) speed=0;
        if (speed>250) speed=250;       
		this.hoPtr.roc.rcMaxSpeed=speed;
		speed<<=8;
		if (this.MR_Speed>speed)
		{
            this.MR_Speed=speed;
		}
		this.hoPtr.rom.rmMoveFlag=true;
    },
    
    setRotSpeed:function(speed)
    {
		this.MR_RotSpeed=speed;
    },
    setXPosition:function(x)
    {        
		if (this.hoPtr.hoX!=x)
		{
		    this.hoPtr.hoX=x;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;
		}
    },
    setYPosition:function(y)
    {
		if (this.hoPtr.hoY!=y)
		{
		    this.hoPtr.hoY=y;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		    this.hoPtr.roc.rcCheckCollides=true;	
		}
    },
    
    setDir:function(dir)
    {
		this.MR_RotPos=dir;
		this.hoPtr.roc.rcDir=dir&this.MR_RotMask;
    }
});

// CMoveStatic object
// -----------------------------------------------------------
function CMoveStatic()
{
}
CMoveStatic.prototype=CServices.extend(new CMove(),
{	
    init:function(ho, mvPtr)
    {
        this.hoPtr=ho;
		this.hoPtr.roc.rcSpeed=0;
		this.hoPtr.roc.rcCheckCollides=true;	
		this.hoPtr.roc.rcChanged=true;
    },
    move:function()
    {
        if (this.hoPtr.roa!=null)
        {
			if (this.hoPtr.roa.animate())
			{
				return;
			}
        }
		if (this.hoPtr.roc.rcCheckCollides)	
		{
            this.hoPtr.roc.rcCheckCollides=false;
            this.hoPtr.hoAdRunHeader.newHandle_Collisions(this.hoPtr);
		}        
    },
    setXPosition:function(x)
    {        
		if (this.hoPtr.hoX!=x)
		{
		    this.hoPtr.hoX=x;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		}
	    this.hoPtr.roc.rcCheckCollides=true;	
    },
    setYPosition:function(y)
    {
		if (this.hoPtr.hoY!=y)
		{
		    this.hoPtr.hoY=y;
		    this.hoPtr.rom.rmMoveFlag=true;
		    this.hoPtr.roc.rcChanged=true;
		}
	    this.hoPtr.roc.rcCheckCollides=true;
    },
	setDir:function(dir)
	{	
	},
	reverse:function(dir)
	{	
	},
    stop:function()
    {
    },
    start:function()
    {
    },
    bounce:function()
    {
    },
    setSpeed:function(speed)
    {
    },
    setMaxSpeed:function(speed)
    {
    }
});

// CMoveExtension object
// -----------------------------------------------------------
function CMoveExtension(m)
{
    this.movement=m;
    this.callParam=0;
}
CMoveExtension.prototype=CServices.extend(new CMove(),
{	
    init:function(ho, mvPtr)
    {
        this.hoPtr=ho;

		var file=ho.hoAdRunHeader.rhApp.file.createFromFile(mvPtr.data);
        this.movement.initialize(file);
        this.hoPtr.roc.rcCheckCollides = true;
        this.hoPtr.roc.rcChanged = true;
    },
    kill:function()
    {
        this.movement.kill();
    },
    move:function()
    {
		if (this.movement.move())
		{
        	this.hoPtr.roc.rcChanged = true;
		}
    },
    stop:function()
    {
        this.movement.stop(this.rmCollisionCount == this.hoPtr.hoAdRunHeader.rh3CollisionCount);	    
    },
    start:function()
    {
        this.movement.start();
    },
    bounce:function()
    {
        this.movement.bounce(this.rmCollisionCount == this.hoPtr.hoAdRunHeader.rh3CollisionCount);    
    },
    setSpeed:function(speed)
    {
        this.movement.setSpeed(speed);
    },
    setMaxSpeed:function(speed)
    {
        this.movement.setMaxSpeed(speed);
    },
    reverse:function()
    {
        this.movement.reverse();
    },
    setXPosition:function(x)
    {
        this.movement.setXPosition(x);
        this.hoPtr.roc.rcChanged = true;
        this.hoPtr.roc.rcCheckCollides = true;
    },
    setYPosition:function(y)
    {
        this.movement.setYPosition(y);
        this.hoPtr.roc.rcChanged = true;
        this.hoPtr.roc.rcCheckCollides = true;
    },
    setDir:function(dir)
    {
        this.movement.setDir(dir);
        this.hoPtr.roc.rcChanged = true;
        this.hoPtr.roc.rcCheckCollides = true;
    },
    callMovement:function(func, param)
    {
        this.callParam = param;
        return this.movement.actionEntry(func);
    }    
});

// CRunMvtExtension object
// ---------------------------------------------------------------

function CRunMvtExtension()
{
	this.ho=null;
	this.rh=null;
}
CRunMvtExtension.prototype=
{
	init:function(hoPtr)
	{
	    this.ho = hoPtr;
	    this.rh = this.ho.hoAdRunHeader;
	},
	
	initialize:function(file)
	{	    	
	},
	
	kill:function()
	{	    	
	},
	
	move:function()
	{
		return false;	    	
	},
	
	setPosition:function(x, y)
	{	    	
	},
	
	setXPosition:function(x)
	{	    	
	},
	
	setYPosition:function(y)
	{			
	},
		
	stop:function(bCurrent)
	{	    	
	},
	
	bounce:function(bCurrent)
	{	    	
	},
	
	reverse:function()
	{	    	
	},
	
	start:function()
	{	    	
	},
	
	setSpeed:function(speed)
	{	    	
	},
	
	setMaxSpeed:function(speed)
	{	    	
	},
	
	setDir:function(dir)
	{	    	
	},
	
	setAcc:function(acc)
	{	    	
	},
	
	setDec:function(dec)
	{	    	
	},
	
	setRotSpeed:function(speed)
	{	    	
	},
	
	set8Dirs:function(dirs)
	{	    	
	},
	
	setGravity:function(gravity)
	{	    	
	},
	
	extension:function(func, param)
	{
		return 0;
	},
	
	actionEntry:function(action)
	{
		return 0;	
	},
	
	getSpeed:function()
	{
		return 0;
	},
	
	getAcceleration:function()
	{
		return 0;
	},
	
	getDeceleration:function()
	{
		return 0;
	},
	
	getGravity:function()
	{
		return 0;
	},
	
	dirAtStart:function(dir)
	{
	    return this.ho.rom.dirAtStart(this.ho, dir, 32);
	},
	
	animations:function(anm)
	{
	    this.ho.roc.rcAnim = anm;
	    if (this.ho.roa != null)
	    {
	        this.ho.roa.animate();
	    }
	},
	
	collisions:function()
	{
	    this.ho.hoAdRunHeader.rh3CollisionCount++;
	    this.ho.rom.rmMovement.rmCollisionCount = this.ho.hoAdRunHeader.rh3CollisionCount;
	    this.ho.hoAdRunHeader.newHandle_Collisions(this.ho);
	},
	
	approachObject:function(destX, destY, originX, originY, htFoot, planCol, ptDest)
	{
	    destX -= this.ho.hoAdRunHeader.rhWindowX;
	    destY -= this.ho.hoAdRunHeader.rhWindowY;
	    originX -= this.ho.hoAdRunHeader.rhWindowX;
	    originY -= this.ho.hoAdRunHeader.rhWindowY;
	    var bRet= this.ho.rom.rmMovement.mpApproachSprite(destX, destY, originX, originY, htFoot, planCol, ptDest);
	    ptDest.x += this.ho.hoAdRunHeader.rhWindowX;
	    ptDest.y += this.ho.hoAdRunHeader.rhWindowY;
	    return bRet;
	},
	
	moveIt:function()
	{
	    return this.ho.rom.rmMovement.newMake_Move(this.ho.roc.rcSpeed, this.ho.roc.rcDir);
	},
	
	testPosition:function(x, y, htFoot, planCol, flag)
	{
	    return this.ho.rom.rmMovement.tst_SpritePosition(x, y, htFoot, planCol, flag);
	},
	
	getJoystick:function(player)
	{
	    return this.ho.hoAdRunHeader.rhPlayer[player];
	},
	
	colMaskTestRect:function(x, y, sx, sy, layer, plan)
	{
	    return !this.ho.hoAdRunHeader.colMask_Test_Rect(x, y, sx, sy, layer, plan);
	},
	
	colMaskTestPoint:function(x, y, layer, plan)
	{
	    return !this.ho.hoAdRunHeader.colMask_Test_XY(x, y, layer, plan);
	},
	
	getParamDouble:function()
	{
	    return this.ho.rom.rmMovement.callParam;
	}	
}

// CRMvt object
// ---------------------------------------------------------------
CRMvt.EF_GOESINPLAYFIELD=0x0001;
CRMvt.EF_GOESOUTPLAYFIELD=0x0002;
CRMvt.EF_WRAP=0x0004;
function CRMvt()
{
    this.rmMvtNum=0;
    this.rmMovement=null;
    this.rmWrapping=0;
    this.rmMoveFlag=false;
    this.rmReverse=0;	
    this.rmBouncing=false;
    this.rmEventFlags=0;
}
CRMvt.prototype=
{
    init:function(nMove, hoPtr, ocPtr, cob, forcedType)
    {
		if (this.rmMovement!=null)
		    this.rmMovement.kill();

		if (cob!=null)
		{
            hoPtr.roc.rcDir=cob.cobDir;
		}
		this.rmWrapping=hoPtr.hoOiList.oilWrap;

		var mvPtr= null;
		hoPtr.roc.rcMovementType = -1;
		if ( ocPtr.ocMovements != null )
		{
            if (nMove<ocPtr.ocMovements.nMovements)
            {
				mvPtr=ocPtr.ocMovements.moveList[nMove];
				this.rmMvtNum=nMove;
                if (forcedType==-1)
                {
                    forcedType=mvPtr.mvType;
                }
				hoPtr.roc.rcMovementType=forcedType;	
                switch (forcedType)
                {
                    case 0:
                        this.rmMovement=new CMoveStatic();
                        break;
                    case 1:
                        this.rmMovement=new CMoveMouse();
                        break;
                    case 2:
                        this.rmMovement=new CMoveRace();
                        break;
                    case 3:
                        this.rmMovement=new CMoveGeneric();
                        break;
                    case 4:
                        this.rmMovement=new CMoveBall();
                        break;
                    case 5:
                        this.rmMovement=new CMovePath();
                        break;
                    case 9:
                        this.rmMovement=new CMovePlatform();
                        break;
                    case 14:
						this.rmMovement=this.loadMvtExtension(hoPtr, mvPtr);
						if (this.rmMovement==null)
						    this.rmMovement=new CMoveStatic();
                        break;
                }
				hoPtr.roc.rcDir=this.dirAtStart(hoPtr, mvPtr.mvDirAtStart, hoPtr.roc.rcDir);	
				this.rmMovement.init(hoPtr, mvPtr);   
            }
		}
		if (hoPtr.roc.rcMovementType==-1) 
		{
            hoPtr.roc.rcMovementType=0;
            this.rmMovement=new CMoveStatic();
            this.rmMovement.init(hoPtr, null);
            hoPtr.roc.rcDir=0;
		}        
    },
    loadMvtExtension:function(hoPtr, mvDef)
    {	    	
    	var extName= mvDef.moduleName;
/*    	
        var index = extName.indexOf('-');
        while (index > 0)
        {
            extName = extName.substring(0, index) + '_' + extName.substring(index+1, extName.length);
            index = extName.indexOf('-');
        }
*/
		var object=null;

    	// STARTCUT
		if (extName=="clickteam-circular")
			object=new CRunMvtclickteam_circular();
		else if (extName=="clickteam-dragdrop")
			object=new CRunMvtclickteam_dragdrop();
		else if (extName=="clickteam-invaders")
			object=new CRunMvtclickteam_invaders();
		else if (extName=="clickteam-presentation")
			object=new CRunMvtclickteam_presentation();
		else if (extName=="clickteam-regpolygon")
			object=new CRunMvtclickteam_regpolygon();
		else if (extName=="clickteam-simple_ellipse")
			object=new CRunMvtclickteam_simple_ellipse();
		else if (extName=="clickteam-sinewave")
			object=new CRunMvtclickteam_sinewave();
		else if (extName=="clickteam-vector")
			object=new CRunMvtclickteam_vector();
		else if (extName=="inandout")
			object=new CRunMvtinandout();
		else if (extName=="spaceship")
			object=new CRunMvtspaceship();
		else if (extName=="pinball")
			object=new CRunMvtpinball();
    	// ENDCUT   		
					
/*
		if (document.debug==undefined)
		{
	        if (!CRMvt.types[extName])
	        {
	            var extFile = new CFile();
	            extFile.openFile(document.srcPath + extName+ '.js');
	            (new Function(extFile.ccfBytes)).call(CRMvt.types);
	        }
			var type = CRMvt.types[extName];
			if (type)
				object=new type;
		}
		else
		{
			object=new window['CRunMvt' + extName];
		}
*/										
		if (object!=null)
		{
			object.init(hoPtr);
			var mvExt=new CMoveExtension(object);
			return mvExt;
		}
		return null;		
    },
    
    initSimple:function(hoPtr, forcedType, bRestore)
    {
		if (this.rmMovement!=null)
		    this.rmMovement.kill();

		hoPtr.roc.rcMovementType=forcedType;	
		switch (forcedType)
		{
		    case 11:
				this.rmMovement=new CMoveDisappear();
				break;
		    case 13:
				this.rmMovement=new CMoveBullet();
				break;
		}
		this.rmMovement.hoPtr=hoPtr;
		if (bRestore==false)
		{
		    this.rmMovement.init(hoPtr, null);
		}
    },

    kill:function(bFast)
    {
        this.rmMovement.kill();
    },
    
    move:function()
    {
        this.rmMovement.move();
    },

    nextMovement:function(hoPtr)
    {
		var ocPtr=hoPtr.hoCommon;
		if ( ocPtr.ocMovements != null )
		{
            if (this.rmMvtNum+1<ocPtr.ocMovements.nMovements)
            {
				this.kill(false);
				this.init(this.rmMvtNum+1, hoPtr, ocPtr, null, -1);
		    }
		}
    },
    previousMovement:function(hoPtr)
    {
		var ocPtr=hoPtr.hoCommon;
		if ( ocPtr.ocMovements != null )
		{
            if (this.rmMvtNum-1>=0)
            {
				this.kill(false);
				this.init(this.rmMvtNum-1, hoPtr, ocPtr, null, -1);
		    }
		}
    },
    selectMovement:function(hoPtr, mvt)
    {
		var ocPtr=hoPtr.hoCommon;
		if ( ocPtr.ocMovements != null )
		{
            if (mvt>=0 && mvt<ocPtr.ocMovements.nMovements)
            {
				this.kill(false);
				this.init(mvt, hoPtr, ocPtr, null, -1);
		    }
		}
    },

    dirAtStart:function(hoPtr, dirAtStart, dir)
    {
		if (dir<0 || dir>=32)
		{
            var cpt=0;
            var das=dirAtStart;
            var das2;
            var n;
            for (n=0; n<32; n++)
            {
                das2=das;
                das>>=1;
                if ((das2&1)!=0)
                    cpt++;
            }

            if (cpt==0)
                dir=0;
            else
            {
                cpt=hoPtr.hoAdRunHeader.random(cpt);
                das=dirAtStart;
                for (dir=0; ; dir++)
                {
                    das2=das;
                    das>>=1;
                    if ((das2&1)!=0)
                    {
                        cpt--;
                        if (cpt<0) 
                        {
                            break;
                        }
                    }
                }
            }
		}
		return dir;
    }
}





