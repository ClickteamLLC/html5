

// CAnim object
// -----------------------------------------------------------------
CAnim.ANIMID_STOP=0;
CAnim.ANIMID_WALK=1;
CAnim.ANIMID_RUN=2;
CAnim.ANIMID_APPEAR=3;
CAnim.ANIMID_DISAPPEAR=4;
CAnim.ANIMID_BOUNCE=5;
CAnim.ANIMID_SHOOT=6;
CAnim.ANIMID_JUMP=7;
CAnim.ANIMID_FALL=8;
CAnim.ANIMID_CLIMB=9;
CAnim.ANIMID_CROUCH=10;
CAnim.ANIMID_UNCROUCH=11;
CAnim.ANIMID_USER1=12;
CAnim.tableAnimTwoSpeeds=
[
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1 
];
function CAnim()
{
	this.anDirs=null;
	this.anTrigo=null;
	this.anAntiTrigo=null;
}
CAnim.prototype=
{
    load:function(file)
    {
        var debut=file.getFilePointer();
        
        var offsets=new Array(32);
        var n;
        for (n=0; n<32; n++)
        {
            offsets[n]=file.readAShort();
        }
        
        this.anDirs=new Array(32);
        this.anTrigo=new Array(32);
        this.anAntiTrigo=new Array(32);
        for (n=0; n<32; n++)
        {
            this.anDirs[n]=null;
            this.anTrigo[n]=0;
            this.anAntiTrigo[n]=0;
            if (offsets[n]!=0)
            {
                this.anDirs[n]=new CAnimDir();
                file.seek(debut+offsets[n]);
                this.anDirs[n].load(file);
            }
        }
    },
    enumElements:function(enumImages)
    {
        var n;
        for (n=0; n<32; n++)
        {
            if (this.anDirs[n]!=null)
            {
                this.anDirs[n].enumElements(enumImages);
            }
        }
    },
    approximate:function(nAnim)
    {      
		var d, d2, d3;
		var cpt1, cpt2;
		
		for (d=0; d<32; d++)
		{
            if (this.anDirs[d]==null)
            {
				for (d2=0, cpt1=d+1; d2<32; d2++, cpt1++)
				{
                    cpt1=cpt1&0x1F;
                    if (this.anDirs[cpt1]!=null)
                    {
                        this.anTrigo[d]=cpt1;
						break;
                    }
                }
				for (d3=0, cpt2=d-1; d3<32; d3++, cpt2--)
				{
                    cpt2=cpt2&0x1F;
                    if (this.anDirs[cpt2]!=null)
                    {
                        this.anAntiTrigo[d]=cpt2;
						break;
		            }
				}
				if (cpt1==cpt2 || d2<d3)
				{
                    this.anTrigo[d]|=0x40;		
                }
				else if (d3<d2)
				{
                    this.anAntiTrigo[d]|=0x40;
				}
            }
            else
            {
				if (nAnim<16)
				{
                    if (CAnim.tableAnimTwoSpeeds[nAnim]==0)
                    {
						this.anDirs[d].adMinSpeed=this.anDirs[d].adMaxSpeed;
                    }
				}
            }
		}
	}
}


// CAnimHeader object
// -----------------------------------------------------------------
CAnimHeader.tableApprox=
[
    CAnim.ANIMID_APPEAR,CAnim.ANIMID_WALK,CAnim.ANIMID_RUN,0,		// 0  ANIMID_STOP
    CAnim.ANIMID_RUN,CAnim.ANIMID_STOP,0,0,                           // 1  ANIMID_WALK
    CAnim.ANIMID_WALK,CAnim.ANIMID_STOP,0,0,                          // 2  ANIMID_RUN
    CAnim.ANIMID_STOP,CAnim.ANIMID_WALK,CAnim.ANIMID_RUN,0,		// 3  ANIMID_APPEAR
    CAnim.ANIMID_STOP,0,0,0,                                          // 4  ANIMID_DISAPPEAR
    CAnim.ANIMID_STOP,CAnim.ANIMID_WALK,CAnim.ANIMID_RUN,0,		// 5  ANIMID_BOUNCE
    CAnim.ANIMID_STOP,CAnim.ANIMID_WALK, CAnim.ANIMID_RUN,0,		// 6  ANIMID_SHOOT
    CAnim.ANIMID_WALK, CAnim.ANIMID_RUN, CAnim.ANIMID_STOP,0,		// 7  ANIMID_JUMP
    CAnim.ANIMID_STOP, CAnim.ANIMID_WALK, CAnim.ANIMID_RUN,0,		// 8  ANIMID_FALL
    CAnim.ANIMID_WALK, CAnim.ANIMID_RUN, CAnim.ANIMID_STOP,0,		// 9  ANIMID_CLIMB
    CAnim.ANIMID_STOP,CAnim.ANIMID_WALK,CAnim.ANIMID_RUN,0,		// 10 ANIMID_CROUCH
    CAnim.ANIMID_STOP,CAnim.ANIMID_WALK,CAnim.ANIMID_RUN,0,		// 11 ANIMID_UNCROUCH
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];
function CAnimHeader()
{
	this.ahAnimMax=0;
	this.ahAnims=null;
	this.ahAnimExists=null;
}
CAnimHeader.prototype=
{
    load:function(file)
    {
        var debut=file.getFilePointer();
        
        file.skipBytes(2);          // ahSize
        this.ahAnimMax=file.readAShort();
        
        var offsets=new Array(this.ahAnimMax);
        var n;
        for (n=0; n<this.ahAnimMax; n++)
        {
            offsets[n]=file.readAShort();
        }
    
        this.ahAnims=new Array(this.ahAnimMax);
        this.ahAnimExists=new Array(this.ahAnimMax);
        for (n=0; n<this.ahAnimMax; n++)
        {
            this.ahAnims[n]=null;
            this.ahAnimExists[n]=0;
            if (offsets[n]!=0)
            {
                this.ahAnims[n]=new CAnim();
                file.seek(debut+offsets[n]);
                this.ahAnims[n].load(file);
                this.ahAnimExists[n]=1;
            }
        }
		var cptAnim;
		for (cptAnim=0; cptAnim<this.ahAnimMax; cptAnim++)
		{
            if (this.ahAnimExists[cptAnim]==0)
            {
				var bFlag=false;
				if (cptAnim<12)
				{
                    for (n=0; n<4; n++)
                    {
						var a=this.ahAnimExists[CAnimHeader.tableApprox[cptAnim*4+n]];
                    	if (a!=0)
						{
                        	this.ahAnims[cptAnim]=this.ahAnims[CAnimHeader.tableApprox[cptAnim*4+n]];
                        	bFlag=true;
                        	break;
						}		
                	}
				}
				if (bFlag==false)
				{
                    for (n=0; n<this.ahAnimMax; n++)
                    {
                    	if (this.ahAnimExists[n]!=0)
						{
                        	this.ahAnims[cptAnim]=this.ahAnims[n];
                        	break;
						}
                	}
				}
        	}
            else
            {
                this.ahAnims[cptAnim].approximate(cptAnim);
            }
        }     
    },

    enumElements:function(enumImages)
    {
        var n;
        for (n=0; n<this.ahAnimMax; n++)
        {
            if (this.ahAnimExists[n]!=0)
            {		
                this.ahAnims[n].enumElements(enumImages);
            }
        }
    }	
}

// CAnimDir object
// -----------------------------------------------------------------
function CAnimDir()
{
	this.adMinSpeed=0;			
	this.adMaxSpeed=0;			
	this.adRepeat=0;				
	this.adRepeatFrame=0;			
	this.adNumberOfFrame=0;		
	this.adFrames=null;
}
CAnimDir.prototype=
{
    load:function(file)
    {
        this.adMinSpeed=file.readAByte();
        this.adMaxSpeed=file.readAByte();
        this.adRepeat=file.readAShort();
        this.adRepeatFrame=file.readAShort();
        this.adNumberOfFrame=file.readAShort();
    
        this.adFrames=new Array(this.adNumberOfFrame);
        var n;
        for (n=0; n<this.adNumberOfFrame; n++)
        {
            this.adFrames[n]=file.readAShort();
        }
    },
    enumElements:function(enumImages)
    {
        var n;
        for (n=0; n<this.adNumberOfFrame; n++)
        {
		    if (enumImages!=null)
		    {
				var num=enumImages.enumerate(this.adFrames[n]);
				if (num!=-1)
				{
				    this.adFrames[n]=num;
				}
		    }
        }
    }
}

// CRAni object
// -----------------------------------------------------------------
CRAni.anim_Defined=
[
	CAnim.ANIMID_STOP,
	CAnim.ANIMID_WALK,
	CAnim.ANIMID_RUN,
	CAnim.ANIMID_BOUNCE,
	CAnim.ANIMID_SHOOT,
	CAnim.ANIMID_JUMP,
	CAnim.ANIMID_FALL,
	CAnim.ANIMID_CLIMB,
	CAnim.ANIMID_CROUCH,
	CAnim.ANIMID_UNCROUCH,
	12,
	13,
	14,
	15,
	-1 
];
function CRAni()
{
    this.hoPtr=null;
    this.raAnimForced=0;				// Flags if forced
    this.raAnimDirForced=0;
    this.raAnimSpeedForced=0;
    this.raAnimStopped=false;
    this.raAnimOn=0;				// Current animation
    this.raAnimOffset=null;
    this.raAnimDir=0;				// Direction of current animation
    this.raAnimPreviousDir=0;                       // Previous OK direction
    this.raAnimDirOffset=null;
    this.raAnimSpeed=0;
    this.raAnimMinSpeed=0;                          // Minimum speed of movement
    this.raAnimMaxSpeed=0;                          // Maximum speed of movement
    this.raAnimDeltaSpeed=0;
    this.raAnimCounter=0;                           // Animation speed counter
    this.raAnimDelta=0;				// Speed counter
    this.raAnimRepeat=0;				// Number of repeats
    this.raAnimRepeatLoop=0;			// Looping picture
    this.raAnimFrame=0;				// Current frame
    this.raAnimNumberOfFrame=0;                     // Number of frames
    this.raAnimFrameForced=0;
    this.raRoutineAnimation=0;
	this.raOldAngle=-1;
}
CRAni.prototype=
{
    init:function(ho)
    {
        this.hoPtr=ho;

		this.raRoutineAnimation=0;
		this.init_Animation(CAnim.ANIMID_WALK);
	
		if (this.anim_Exist(CAnim.ANIMID_APPEAR))
		{
            this.raRoutineAnimation=1;
            this.animation_Force(CAnim.ANIMID_APPEAR);
            this.animation_OneLoop();
            this.animations();
		}
		else
		{
            var i;
            for (i=0; CRAni.anim_Defined[i]>=0; i++)
            {
				if (this.anim_Exist(CRAni.anim_Defined[i])) 
                    break;
            }
            if (CRAni.anim_Defined[i]<0)
            {
            	if (this.anim_Exist(CAnim.ANIMID_DISAPPEAR))
                {
                    this.raRoutineAnimation=2;
                    this.animation_Force(CAnim.ANIMID_DISAPPEAR);
                    this.animation_OneLoop();
                    this.animations();
				}
            }
		}
    },
    
    init_Animation:function(anim)
    {
		this.hoPtr.roc.rcAnim=anim;
		this.raAnimStopped=false;
		this.raAnimForced=0;
		this.raAnimDirForced=0;
		this.raAnimSpeedForced=0;
		this.raAnimFrameForced=0;
		this.raAnimCounter=0;
		this.raAnimFrame=0;
		this.raAnimOffset=null;
		this.raAnimDirOffset=null;
		this.raAnimOn=-1;
		this.raAnimMinSpeed=-1;
		this.raAnimPreviousDir=-1;
        this.raAnimOffset=null;
        this.raAnimDirOffset=null;
		this.animations();
    },

    check_Animate:function()
    {
		this.animIn(0);
    },

    extAnimations:function(anim)
    {
		this.hoPtr.roc.rcAnim=anim;
		this.animate();
    },

    animate:function()
    {
        switch(this.raRoutineAnimation)
        {
            case 0:
                return this.animations();
            case 1:
                this.anim_Appear();
                return false;
            case 2:
                this.anim_Disappear();
                return false;
        }
		return false;
    },

    animations:function()
    {
    	var x=this.hoPtr.hoX;	
		this.hoPtr.roc.rcOldX=x;
		x-=this.hoPtr.hoImgXSpot;
		this.hoPtr.roc.rcOldX1=x;
		x+=this.hoPtr.hoImgWidth;
		this.hoPtr.roc.rcOldX2=x;
	
		var y=this.hoPtr.hoY;
		this.hoPtr.roc.rcOldY=y;
		y-=this.hoPtr.hoImgYSpot;
		this.hoPtr.roc.rcOldY1=y;
		y+=this.hoPtr.hoImgHeight;
		this.hoPtr.roc.rcOldY2=y;
	
		this.hoPtr.roc.rcOldImage=this.hoPtr.roc.rcImage;
		this.hoPtr.roc.rcOldAngle=this.hoPtr.roc.rcAngle;
	
		return this.animIn(1);
    },

    animIn:function(vbl)
    {
		var ocPtr=this.hoPtr.hoCommon;

		var speed=this.hoPtr.roc.rcSpeed;
		var anim=this.hoPtr.roc.rcAnim;

		if (this.raAnimSpeedForced!=0)	
		{
            speed=this.raAnimSpeedForced-1;
		}
		if (anim==CAnim.ANIMID_WALK)		
		{
            if (speed==0)
            {
            	anim=CAnim.ANIMID_STOP;
            }
            if (speed>=75)
            {
            	anim=CAnim.ANIMID_RUN;
            }
		}
		if (this.raAnimForced!=0)
		{
            anim=this.raAnimForced-1;
		}
		if (anim!=this.raAnimOn)
		{	
            this.raAnimOn=anim;
            if (anim>=ocPtr.ocAnimations.ahAnimMax)
            {
            	anim=ocPtr.ocAnimations.ahAnimMax-1;
            }
            var anPtr=ocPtr.ocAnimations.ahAnims[anim];
            if (anPtr!=this.raAnimOffset)
            {
				this.raAnimOffset=anPtr;
				this.raAnimDir=-1;	
				this.raAnimFrame=0;	
            }
		}

		var frame;
		var ifo;
		var dir=this.hoPtr.roc.rcDir;	
		var bAngle=false;

		if (this.raAnimDirForced!=0)	
		{
            dir=this.raAnimDirForced-1;
		}
		var adPtr;
		if (this.raAnimDir!=dir)
		{
            this.raAnimDir=dir;

            adPtr=this.raAnimOffset.anDirs[dir];
            if (adPtr==null)
            {
				if ((this.raAnimOffset.anAntiTrigo[dir]&0x40)!=0)
                {
                    dir=this.raAnimOffset.anAntiTrigo[dir]&0x3F;
                }
                else if ((this.raAnimOffset.anTrigo[dir]&0x40)!=0)
                {
                    dir=this.raAnimOffset.anTrigo[dir]&0x3F;
                }
                else
                {
					var offset=dir;
					if (this.raAnimPreviousDir<0)
					{
						dir=this.raAnimOffset.anTrigo[dir]&0x3F;;
					}
					else
					{
						dir-=this.raAnimPreviousDir;
						dir&=31;
						if (dir>15)
						{
							dir=this.raAnimOffset.anTrigo[offset]&0x3F;;
						}
						else
						{
							dir=this.raAnimOffset.anAntiTrigo[offset]&0x3F;
						}
					}
                }		
                adPtr=this.raAnimOffset.anDirs[dir];
            }
            else
            {
                this.raAnimPreviousDir=dir;
				adPtr=this.raAnimOffset.anDirs[dir];
            }
            
            if (this.raAnimOffset.anDirs[0]!=null && (this.hoPtr.hoCommon.ocFlags2 & CObjectCommon.OCFLAGS2_AUTOMATICROTATION) != 0)
            {
                this.hoPtr.roc.rcAngle=(this.raAnimDir*360)/32;
                adPtr=this.raAnimOffset.anDirs[0];
                this.raAnimDirOffset=null;
				bAngle=true;
            }

            if (this.raAnimDirOffset!=adPtr)
            {		
				this.raAnimDirOffset=adPtr;
				this.raAnimRepeat=adPtr.adRepeat;		
				this.raAnimRepeatLoop=adPtr.adRepeatFrame;
		
				var minSpeed=adPtr.adMinSpeed;
				var maxSpeed=adPtr.adMaxSpeed;
		
				if (minSpeed!=this.raAnimMinSpeed || maxSpeed!=this.raAnimMaxSpeed)	
				{
                    this.raAnimMinSpeed=minSpeed;
                    this.raAnimMaxSpeed=maxSpeed;
                    maxSpeed-=minSpeed;
                    this.raAnimDeltaSpeed=maxSpeed;
                    this.raAnimDelta=minSpeed;
                    this.raAnimSpeed=-1;
				}

				this.raAnimNumberOfFrame=adPtr.adNumberOfFrame;
				if (this.raAnimFrameForced!=0 && this.raAnimFrameForced-1>=this.raAnimNumberOfFrame)
                    this.raAnimFrameForced=0;
				if (this.raAnimFrame>=this.raAnimNumberOfFrame)
                    this.raAnimFrame=0;
				frame=adPtr.adFrames[this.raAnimFrame];
				if (this.raAnimStopped==false)
				{
                    this.hoPtr.roc.rcImage=frame;
                    ifo=this.hoPtr.hoAdRunHeader.rhApp.imageBank.getImageInfoEx(frame, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY);
                    if (ifo!=null)
                    {
	                    this.hoPtr.hoImgWidth=ifo.width;
	                    this.hoPtr.hoImgHeight=ifo.height;
	                    this.hoPtr.hoImgXSpot=ifo.xSpot;
	                    this.hoPtr.hoImgYSpot=ifo.ySpot;
	                }
                    this.hoPtr.roc.rcChanged=true;
                    this.hoPtr.roc.rcCheckCollides=true;
				}
				if (this.raAnimNumberOfFrame==1)	
				{
                    if (this.raAnimMinSpeed==0)
                    {
						this.raAnimNumberOfFrame=0;
                    }
                    frame=this.hoPtr.roc.rcImage;	
                    if (frame==0) 
                        return false;

                    ifo=this.hoPtr.hoAdRunHeader.rhApp.imageBank.getImageInfoEx(frame, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY);
                    if (ifo!=null)
                    {
	                    this.hoPtr.hoImgWidth=ifo.width;
	                    this.hoPtr.hoImgHeight=ifo.height;
	                    this.hoPtr.hoImgXSpot=ifo.xSpot;
	                    this.hoPtr.hoImgYSpot=ifo.ySpot;
	                }
                    return false;
				}
            }
		}

		if (vbl==0 && this.raAnimFrameForced==0) 
            return false;	
		if (bAngle==false && this.raAnimNumberOfFrame==0) 
            return false;		

		var delta=this.raAnimDeltaSpeed;
		if (speed!=this.raAnimSpeed)
		{
            this.raAnimSpeed=speed;
		
            if (delta==0)
            {
            	this.raAnimDelta=this.raAnimMinSpeed;
            	if (this.raAnimSpeedForced!=0)
                    this.raAnimDelta=this.raAnimSpeedForced-1;
            }
            else
            {
				var deltaSpeed=this.hoPtr.roc.rcMaxSpeed-this.hoPtr.roc.rcMinSpeed;
                if (deltaSpeed==0)
				{	
					if (this.raAnimSpeedForced!=0)
					{
						delta*=speed;	
						delta/=100;
						delta+=this.raAnimMinSpeed;
						if (delta>this.raAnimMaxSpeed)
							delta=this.raAnimMaxSpeed;
						this.raAnimDelta=delta;
					}
					else
					{
	                    delta/=2;
	                    delta+=this.raAnimMinSpeed;
	                    this.raAnimDelta=delta;	
					}
				}
				else
				{
                    delta*=speed;
                    delta/=deltaSpeed;
                    delta+=this.raAnimMinSpeed;
                    if (delta>this.raAnimMaxSpeed)
						delta=this.raAnimMaxSpeed;
	                this.raAnimDelta=delta;
				}
            }
		}

		adPtr=this.raAnimDirOffset;
		frame=this.raAnimFrameForced;
		var counter;
		if (frame==0)
		{
            if (this.raAnimDelta==0) 
                return false;		
            if (this.raAnimStopped) 
                return false;		

            counter=this.raAnimCounter;
            frame=this.raAnimFrame;
            var aDelta=this.raAnimDelta;
            if ((this.hoPtr.hoAdRunHeader.rhFrame.leFlags&CRunFrame.LEF_TIMEDMVTS)!=0)
                aDelta=aDelta*this.hoPtr.hoAdRunHeader.rh4MvtTimerCoef;           
            counter+=aDelta;
            while (counter>100)
            {
				counter-=100;
				frame++;
				if (frame>=this.raAnimNumberOfFrame)
				{
                    frame=this.raAnimRepeatLoop;
                    if (this.raAnimRepeat!=0)
                    {
                    	this.raAnimRepeat--;
                    	if (this.raAnimRepeat==0)
                    	{
							this.raAnimFrame=this.raAnimNumberOfFrame;
                            this.raAnimNumberOfFrame=0;
                            if (this.raAnimForced!=0)
                            {
                            	this.raAnimForced=0;
                            	this.raAnimDirForced=0;
								this.raAnimSpeedForced=0;
                            }
                            if ((this.hoPtr.hoAdRunHeader.rhGameFlags&CRun.GAMEFLAGS_INITIALISING)!=0)
                                return false;
							if (bAngle)
							{
								this.hoPtr.roc.rcChanged=true;
								this.hoPtr.roc.rcCheckCollides=true;
								ifo=this.hoPtr.hoAdRunHeader.rhApp.imageBank.getImageInfoEx(this.hoPtr.roc.rcImage, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY);
								if (ifo!=null)$
								{
									this.hoPtr.hoImgWidth=ifo.width;
									this.hoPtr.hoImgHeight=ifo.height;
									this.hoPtr.hoImgXSpot=ifo.xSpot;
									this.hoPtr.hoImgYSpot=ifo.ySpot;									
								}
							}
						    var cond=(-2 <<16);	    // CNDL_EXTANIMENDOF;
                            cond|=(this.hoPtr.hoType&0xFFFF);
                            this.hoPtr.hoAdRunHeader.rhEvtProg.rhCurParam0=this.hoPtr.roa.raAnimOn;
                            return this.hoPtr.hoAdRunHeader.rhEvtProg.handle_Event(this.hoPtr, cond);
						}
                    }
				}
            };
            this.raAnimCounter=counter;
        }
        else
        {
            frame--;
        }
		this.raAnimFrame=frame;
		this.hoPtr.roc.rcChanged=true;
		this.hoPtr.roc.rcCheckCollides=true;
        var image=adPtr.adFrames[frame];
        if (this.hoPtr.roc.rcImage!=image || this.raOldAngle!=this.hoPtr.roc.rcAngle)
        {
			this.hoPtr.roc.rcImage=image;
			this.raOldAngle=this.hoPtr.roc.rcAngle;
			if (image<0) 
	            return false;								//; Securite pour jeux casses
			ifo=this.hoPtr.hoAdRunHeader.rhApp.imageBank.getImageInfoEx(image, this.hoPtr.roc.rcAngle, this.hoPtr.roc.rcScaleX, this.hoPtr.roc.rcScaleY);
			if (ifo!=null)
			{
				this.hoPtr.hoImgWidth=ifo.width;
				this.hoPtr.hoImgHeight=ifo.height;
				this.hoPtr.hoImgXSpot=ifo.xSpot;
				this.hoPtr.hoImgYSpot=ifo.ySpot;
			}
        }
		return false;
    },
    
    anim_Exist:function(animId)
    {
		var ahPtr=this.hoPtr.hoCommon.ocAnimations;             
		if (ahPtr.ahAnimExists[animId]==0)
            return false;
		return true;
    },

    animation_OneLoop:function()
    {
		if (this.raAnimRepeat==0)
		{
            this.raAnimRepeat=1;				
		}
    },
    
    animation_Force:function(anim)
    {
		this.raAnimForced=anim+1;
  		this.animIn(0);
    },
    
    animation_Restore:function()
    {
		this.raAnimForced=0;
		this.animIn(0);
    },
    	
    animDir_Force:function(dir)
    {
		dir&=31;
		this.raAnimDirForced=dir+1;
		this.animIn(0);
    },

    animDir_Restore:function()
    {
		this.raAnimDirForced=0;
		this.animIn(0);
    },
    
    animSpeed_Force:function(speed)
    {
		if (speed<0) speed=0;
		if (speed>100) speed=100;
		this.raAnimSpeedForced=speed+1;
        this.animIn(0);
    },
    
    animSpeed_Restore:function()
    {
		this.raAnimSpeedForced=0;
		this.animIn(0);
    },
    
    anim_Restart:function()
    {
		this.raAnimOn=-1;
		this.animIn(0);
    },   

    animFrame_Force:function(frame)
    {
		if (frame>=this.raAnimNumberOfFrame)
            frame=this.raAnimNumberOfFrame-1;
		if (frame<0) 
            frame=0;
		this.raAnimFrameForced=frame+1;
		this.animIn(0);
    },
    
    animFrame_Restore:function()
    {
		this.raAnimFrameForced=0;
		this.animIn(0);
    },

    anim_Appear:function()
    {
		this.animIn(1);
	
		if (this.raAnimForced!=CAnim.ANIMID_APPEAR+1)
		{
            if (this.anim_Exist(CAnim.ANIMID_STOP) || this.anim_Exist(CAnim.ANIMID_WALK) || this.anim_Exist(CAnim.ANIMID_RUN))
            {
				this.raRoutineAnimation=0;
				this.animation_Restore();
            }
            else
            {
				this.raRoutineAnimation=2;
            	this.hoPtr.hoAdRunHeader.init_Disappear(this.hoPtr);
            }
		}
	},

    anim_Disappear:function()
    {
		if ((this.hoPtr.hoFlags&CObject.HOF_FADEOUT)==0)
		{
            this.animIn(1);									// Un cran d'animations
            if (this.raAnimForced!=CAnim.ANIMID_DISAPPEAR+1)
            {
                this.hoPtr.hoAdRunHeader.destroy_Add(this.hoPtr.hoNumber);
            }
		}
    }       
}