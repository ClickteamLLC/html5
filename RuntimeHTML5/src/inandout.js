//----------------------------------------------------------------------------------
//
// CRunMvtinandout
//
//----------------------------------------------------------------------------------
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
CRunMvtinandout.MOVESTATUS_PREPAREOUT=0;
CRunMvtinandout.MOVESTATUS_MOVEOUT=1;
CRunMvtinandout.MOVESTATUS_WAITOUT=2;
CRunMvtinandout.MOVESTATUS_PREPAREIN=3;
CRunMvtinandout.MOVESTATUS_MOVEIN=4;
CRunMvtinandout.MOVESTATUS_WAITIN=5;
CRunMvtinandout.MOVESTATUS_POSITIONIN=6;
CRunMvtinandout.MOVESTATUS_POSITIONOUT=7;
CRunMvtinandout.ACTION_POSITIONIN=0;
CRunMvtinandout.ACTION_POSITIONOUT=1;
CRunMvtinandout.ACTION_MOVEIN=2;
CRunMvtinandout.ACTION_MOVEOUT=3;
CRunMvtinandout.MFLAG_OUTATSTART=0x00000001;
CRunMvtinandout.MFLAG_MOVEATSTART=0x00000002;
CRunMvtinandout.MFLAG_STOPPED=0x00000004;
CRunMvtinandout.MOVETYPE_LINEAR=0;
CRunMvtinandout.MOVETYPE_SMOOTH=1;

function CRunMvtinandout()
{
	this.m_direction=0;
	this.m_speed=0;
	this.m_flags=0;
	this.m_moveStatus=0;
	this.m_angle=0;
	this.m_maxPente=0;
	this.m_moveTimerStart=0;
	this.m_stopTimer=0;
	this.m_type=0;
	this.m_startX=0;
	this.m_startY=0;
	this.m_destX=0;
	this.m_destY=0;
}

CRunMvtinandout.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        file.skipBytes(1);
        this.m_type=file.readAInt();
        this.m_direction=file.readAInt();
        this.m_speed=file.readAInt();
        this.m_flags=file.readAInt();
        this.m_destX=file.readAInt();
        this.m_destY=file.readAInt();
    	this.m_angle=(this.m_direction*Math.PI)/180.0;
        this.m_maxPente=0;

        if ((this.m_flags&CRunMvtinandout.MFLAG_MOVEATSTART)!=0)
        {
            if ((this.m_flags&CRunMvtinandout.MFLAG_OUTATSTART)==0)
            {
                this.m_moveStatus=CRunMvtinandout.MOVESTATUS_PREPAREOUT;
            }
            else
            {
                this.m_moveStatus=CRunMvtinandout.MOVESTATUS_PREPAREIN;
            }
            this.m_flags&=~CRunMvtinandout.MFLAG_STOPPED;
    	}
        else
        {
            if ((this.m_flags&CRunMvtinandout.MFLAG_OUTATSTART)==0)
            {
            	this.m_moveStatus=CRunMvtinandout.MOVESTATUS_WAITIN;
            }
            else
            {
            	this.m_moveStatus=CRunMvtinandout.MOVESTATUS_WAITOUT;
            }
        }
    },

    move:function()
    {
        // Calcule la position de sortie
        if (this.m_maxPente==0)
        {
            var maxPente;
            var x=0, y=0, rightX, bottomY;
            this.m_startX=this.ho.hoX;
            this.m_startY=this.ho.hoY;

            if (this.m_destX!=0 || this.m_destY!=0)
            {
                var vX=this.m_destX-this.m_startX;
                var vY=this.m_destY-this.m_startY;
                maxPente=Math.sqrt(vX*vX+vY*vY);
                if (maxPente==0.0)
                {
                    this.m_angle=0.0;
                }
                else
                {
                    this.m_angle=Math.acos(vX/maxPente);
                    if (this.m_destY>this.m_startY)
                    {
                        this.m_angle=2.0*Math.PI-this.m_angle;
                    }
                }
            }
            else
            {
                for (maxPente=0; maxPente<100000; maxPente+=5)
                {
                    x=CServices.floatToInt(Math.cos(this.m_angle)*maxPente+this.m_startX);
                    y=CServices.floatToInt(-Math.sin(this.m_angle)*maxPente+this.m_startY);
                    rightX=x+this.ho.hoImgWidth;
                    bottomY=y+this.ho.hoImgHeight;
                    if (x>this.ho.hoAdRunHeader.rhLevelSx)
                    {
                        break;
                    }
                    if (y>this.ho.hoAdRunHeader.rhLevelSy)
                    {
                        break;
                    }
                    if (rightX<0)
                    {
                        break;
                    }
                    if (bottomY<0)
                    {
                        break;
                    }
                }
                this.m_destX=x;
                this.m_destY=y;
            }
            if (maxPente==0)
            {
                maxPente=5;
            }
            this.m_maxPente=maxPente;
        }

        var bRet=false;
        if ((this.m_flags&CRunMvtinandout.MFLAG_OUTATSTART)!=0)
        {
            this.m_flags&=~CRunMvtinandout.MFLAG_OUTATSTART;
            this.ho.hoX=this.m_destX;
            this.ho.hoY=this.m_destY;
            bRet=true;
        }

        // Stopped?
        if ((this.m_flags&CRunMvtinandout.MFLAG_STOPPED)!=0)
        {
            this.animations(CAnim.ANIMID_STOP);
            this.collisions();
			return this.ho.roc.rcChanged;
        }

		var pente;
		var deltaTime;
        switch(this.m_moveStatus)
        {
        case CRunMvtinandout.MOVESTATUS_PREPAREOUT:
            this.ho.hoX=this.m_startX;
            this.ho.hoY=this.m_startY;
            this.m_moveTimerStart=this.ho.hoAdRunHeader.rhTimer;
            this.m_moveStatus=CRunMvtinandout.MOVESTATUS_MOVEOUT;
            break;
        case CRunMvtinandout.MOVESTATUS_MOVEOUT:
            {
                deltaTime=CServices.floatToInt(this.ho.hoAdRunHeader.rhTimer-this.m_moveTimerStart);
                if (deltaTime>=this.m_speed)
                {
                    this.ho.hoX=this.m_destX;
                    this.ho.hoY=this.m_destY;
                    this.m_moveStatus=CRunMvtinandout.MOVESTATUS_WAITOUT;
                }
                else
                {
                    switch (this.m_type)
                    {
                    case CRunMvtinandout.MOVETYPE_LINEAR:
                        {
                            pente=(this.m_maxPente*(Number(deltaTime)/Number(this.m_speed)));
                            this.ho.hoX=CServices.floatToInt(Math.cos(this.m_angle)*pente+this.m_startX);
                            this.ho.hoY=CServices.floatToInt(-Math.sin(this.m_angle)*pente+this.m_startY);
                        }
                        break;
                    case CRunMvtinandout.MOVETYPE_SMOOTH:
                        {
                            pente=this.m_maxPente-Math.cos(Math.PI/2*(Number(deltaTime)/Number(this.m_speed)))*this.m_maxPente;
                            this.ho.hoX=CServices.floatToInt(Math.cos(this.m_angle)*pente+this.m_startX);
                            this.ho.hoY=CServices.floatToInt(-Math.sin(this.m_angle)*pente+this.m_startY);
                        }
                        break;
                    }
                }
                this.ho.roc.rcDir=CServices.floatToInt((this.m_direction*32)/360);
                this.ho.roc.rcSpeed=100;
                this.animations(CAnim.ANIMID_WALK);
                bRet=true;
            }
            break;
        case CRunMvtinandout.MOVESTATUS_WAITOUT:
            this.animations(CAnim.ANIMID_STOP);
			bRet=this.ho.roc.rcChanged;
            break;
        case CRunMvtinandout.MOVESTATUS_POSITIONOUT:
            this.ho.hoX=this.m_destX;
            this.ho.hoY=this.m_destY;
            this.m_moveStatus=CRunMvtinandout.MOVESTATUS_WAITOUT;
            bRet=true;
            break;
        case CRunMvtinandout.MOVESTATUS_PREPAREIN:
            this.ho.hoX=this.m_destX;
            this.ho.hoY=this.m_destY;
            this.m_moveTimerStart=this.ho.hoAdRunHeader.rhTimer;
            this.m_moveStatus=CRunMvtinandout.MOVESTATUS_MOVEIN;
            break;
        case CRunMvtinandout.MOVESTATUS_MOVEIN:
            {
                deltaTime=CServices.floatToInt(this.ho.hoAdRunHeader.rhTimer-this.m_moveTimerStart);
                if (deltaTime>=this.m_speed)
                {
                    this.ho.hoX=this.m_startX;
                    this.ho.hoY=this.m_startY;
                    this.m_moveStatus=CRunMvtinandout.MOVESTATUS_WAITIN;
                }
                else
                {
                    switch (this.m_type)
                    {
                    case CRunMvtinandout.MOVETYPE_LINEAR:
                        {
                            pente=(this.m_maxPente-(this.m_maxPente*(Number(deltaTime)/Number(this.m_speed))));
                            this.ho.hoX=CServices.floatToInt(Math.cos(this.m_angle)*pente+this.m_startX);
                            this.ho.hoY=CServices.floatToInt(-Math.sin(this.m_angle)*pente+this.m_startY);
                        }
                        break;
                    case CRunMvtinandout.MOVETYPE_SMOOTH:
                        {
                            pente=this.m_maxPente-Math.sin(Math.PI/2*(Number(deltaTime)/Number(this.m_speed)))*this.m_maxPente;
                            this.ho.hoX=CServices.floatToInt(Math.cos(this.m_angle)*pente+this.m_startX);
                            this.ho.hoY=CServices.floatToInt(-Math.sin(this.m_angle)*pente+this.m_startY);
                        }
                        break;
                    }
                }
                this.ho.roc.rcDir=(CServices.floatToInt(((this.m_direction*32)/360+16)))%32;
                this.ho.roc.rcSpeed=100;
                this.animations(CAnim.ANIMID_WALK);
                bRet=true;
            }
            break;
        case CRunMvtinandout.MOVESTATUS_WAITIN:
            this.animations(CAnim.ANIMID_STOP);
			bRet=this.ho.roc.rcChanged;
            break;
        case CRunMvtinandout.MOVESTATUS_POSITIONIN:
            this.ho.hoX=this.m_startX;
            this.ho.hoY=this.m_startY;
            this.m_moveStatus=CRunMvtinandout.MOVESTATUS_WAITIN;
            bRet=true;
            break;
        }

        // detects the this.collisions
        this.collisions();

        // The object has been moved
        return bRet;
    },

    stop:function(bCurrent)
    {
        this.m_flags|=CRunMvtinandout.MFLAG_STOPPED;
        this.m_stopTimer=this.ho.hoAdRunHeader.rhTimer;
    },

    start:function()
    {
        if ((this.m_flags&CRunMvtinandout.MFLAG_STOPPED)!=0)
        {
            this.m_flags&=~CRunMvtinandout.MFLAG_STOPPED;
            this.m_moveTimerStart+=this.ho.hoAdRunHeader.rhTimer-this.m_stopTimer;
        }
        if (this.m_moveStatus==CRunMvtinandout.MOVESTATUS_WAITOUT)
        {
            this.m_moveStatus=CRunMvtinandout.MOVESTATUS_PREPAREIN;
        }
        else if (this.m_moveStatus==CRunMvtinandout.MOVESTATUS_WAITIN)
        {
            this.m_moveStatus=CRunMvtinandout.MOVESTATUS_PREPAREOUT;
        }
    },

    getSpeed:function()
    {
        return this.ho.roc.rcSpeed;
	},

    actionEntry:function(action)
    {
        var param;
        switch (action)
        {
            case CRunMvtinandout.ACTION_POSITIONIN:
                this.m_moveStatus=CRunMvtinandout.MOVESTATUS_POSITIONIN;
                this.m_flags&=~CRunMvtinandout.MFLAG_STOPPED;
                break;
            case CRunMvtinandout.ACTION_POSITIONOUT:
                this.m_moveStatus=CRunMvtinandout.MOVESTATUS_POSITIONOUT;
                this.m_flags&=~CRunMvtinandout.MFLAG_STOPPED;
                break;
            case CRunMvtinandout.ACTION_MOVEIN:
                this.m_moveStatus=CRunMvtinandout.MOVESTATUS_PREPAREIN;
                this.m_flags&=~CRunMvtinandout.MFLAG_STOPPED;
                break;
            case CRunMvtinandout.ACTION_MOVEOUT:
                this.m_moveStatus=CRunMvtinandout.MOVESTATUS_PREPAREOUT;
                this.m_flags&=~CRunMvtinandout.MFLAG_STOPPED;
                break;
            default:
                break;
        }
        return 0;
    }
});
