//----------------------------------------------------------------------------------
//
// CRUNMVTSINWAVE
//
//----------------------------------------------------------------------------------
this.clickteam_sinewave=CRunMvtclickteam_sinewave;

CRunMvtclickteam_sinewave.MFLAG1_MOVEATSTART = 1;
CRunMvtclickteam_sinewave.ONEND_STOP = 0;
CRunMvtclickteam_sinewave.ONEND_RESET = 1;
CRunMvtclickteam_sinewave.ONEND_BOUNCE = 2;
CRunMvtclickteam_sinewave.ONEND_REVERSE = 3;

function CRunMvtclickteam_sinewave()
{
    this.m_dwFlags=0;
    this.m_dwSpeed=0;
    this.m_dwFinalX=0;
    this.m_dwFinalY=0;
    this.m_dwAmp=0;
    this.m_dwAngVel=0;
    this.m_dwStartAngle=0;
    this.m_dwOnEnd=0;
    
    //*** General variables
    this.r_CurrentX=0;
    this.r_CurrentY=0;
    this.r_Stopped=false;
    this.r_OnEnd=0;

    //*** Line motion variables
    this.r_Speed=0;
    this.r_StartX=0;
    this.r_StartY=0;
    this.r_FinalX=0;
    this.r_FinalY=0;
    this.r_Dx=0;
    this.r_Dy=0;
    this.r_Steps=0;
    this.r_Angle=0;

    //*** Sine motion variables
    this.r_Amp=0;
    this.r_AngVel=0;
    this.r_CurrentAngle=0;
    this.r_Cx=0;
    this.r_Cy=0;
}

CRunMvtclickteam_sinewave.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        file.skipBytes(1);
        this.m_dwFlags = file.readAInt();
        this.m_dwSpeed = file.readAInt();
        this.m_dwFinalX = file.readAInt();
        this.m_dwFinalY = file.readAInt();
        this.m_dwAmp = file.readAInt();
        this.m_dwAngVel = file.readAInt();
        this.m_dwStartAngle = file.readAInt();
        this.m_dwOnEnd = file.readAInt();

        this.r_StartX = this.ho.hoX;
        this.r_StartY = this.ho.hoY;
        this.r_FinalX = this.m_dwFinalX;
        this.r_FinalY = this.m_dwFinalY;
        this.r_CurrentX = this.r_StartX;
        this.r_CurrentY = this.r_StartY;
        this.r_Amp = this.m_dwAmp;
        this.r_AngVel = (this.m_dwAngVel * (Math.PI / 180.0)) / 50.0;
        this.r_CurrentAngle = this.m_dwStartAngle * (Math.PI / 180.0);
//	this.r_Stopped = (bool)( 1 - m_pMvt->this.m_dwFlags);
        this.r_Stopped = ((this.m_dwFlags & CRunMvtclickteam_sinewave.MFLAG1_MOVEATSTART) == 0);
        this.r_OnEnd = this.m_dwOnEnd;

        //*** Linear motion components;
        this.r_Speed = this.m_dwSpeed;
        this.ho.roc.rcSpeed = this.r_Speed;

        if (this.r_Speed != 0)
        {
            this.r_Angle = Math.atan2((this.r_FinalY - this.r_StartY), (this.r_FinalX - this.r_StartX));

            this.r_Cx = Math.cos(this.r_Angle + Math.PI * 0.5);
            this.r_Cy = Math.sin(this.r_Angle + Math.PI * 0.5);

            this.r_Dx = Math.cos(this.r_Angle) * (this.r_Speed / 50.0);
            this.r_Dy = Math.sin(this.r_Angle) * (this.r_Speed / 50.0);

            if (Math.abs(this.r_Dx) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalX - this.r_StartX) / this.r_Dx);
            }
            else if (Math.abs(this.r_Dy) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalY - this.r_StartY) / this.r_Dy);
            }
            else
            {
                this.r_Steps = 0.0;
            }
        }
        else
        {
            this.r_Dx = 0;
            this.r_Dy = 0;
            this.r_Steps = 0.0;
        }
    },

    move:function()
    {
        //*** Object needs to be moved?
        if (this.r_Speed != 0 && !this.r_Stopped)
        {
            if (this.r_Steps > 0.0)
            {
                var calculs;

                //*** Ensure angle is in the range 0 to 360 degrees
                if (this.r_CurrentAngle < 0)
                {
                    this.r_CurrentAngle += 2 * Math.PI;
                }
                else if (this.r_CurrentAngle >= 2 * Math.PI)
                {
                    this.r_CurrentAngle -= 2 * Math.PI;
                }

                var angVel = this.r_AngVel;
                if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                {
                    angVel = angVel * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                }
                var dx = this.r_Dx;
                if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                {
                    dx = dx * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                }
                var dy = this.r_Dy;
                if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                {
                    dy = dy * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                }

				var amp;
                if (this.r_Steps > 1.0)
                {
                    //*** This is not the final section of movement
                    this.r_CurrentX += dx;
                    this.r_CurrentY += dy;
                    this.r_CurrentAngle -= angVel;
                    calculs = 1.0;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.r_Steps -= calculs;
                    if (this.r_Steps<0.1)
                    {
                    	this.r_Steps=0.1;
                    }
                }
                else
                {
                    //**** Final section of movement, handle movement completion
                    this.r_CurrentX += this.r_Steps * dx;
                    this.r_CurrentY += this.r_Steps * dy;
                    this.r_CurrentAngle -= this.r_Steps * angVel;
                    calculs = 1.0;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.r_Steps -= calculs;
                    if (this.r_Steps<0.1)
                    {
                    	this.r_Steps=0.1;
                    }

                    this.animations(CAnim.ANIMID_WALK);

                    if (this.r_OnEnd == CRunMvtclickteam_sinewave.ONEND_STOP)
                    {
                        amp = this.r_Amp * Math.sin(this.r_CurrentAngle);

                        //*** Move object, run animation and collision detection
                        this.ho.hoX = CServices.floatToInt(this.r_CurrentX + this.r_Cx * amp);
                        this.ho.hoY = CServices.floatToInt(this.r_CurrentY + this.r_Cy * amp);
                        this.r_Stopped = true;
                    }
                    else if (this.r_OnEnd == CRunMvtclickteam_sinewave.ONEND_RESET)
                    {
                        this.reset();
                    }
                    else if (this.r_OnEnd == CRunMvtclickteam_sinewave.ONEND_BOUNCE)
                    {
                        this.bounce(false);
                    }
                    else if (this.r_OnEnd == CRunMvtclickteam_sinewave.ONEND_REVERSE)
                    {
                        this.reverse();
                    }

                    this.collisions();
                    return true;
                }

                //*** Sine motion amplitude
                amp = this.r_Amp * Math.sin(this.r_CurrentAngle);

                //*** Move object, run animation and collision detection
                this.animations(CAnim.ANIMID_WALK);
                this.ho.hoX = CServices.floatToInt(this.r_CurrentX + this.r_Cx * amp);
                this.ho.hoY = CServices.floatToInt(this.r_CurrentY + this.r_Cy * amp);
                this.collisions();

                //*** Indicate the object has been moved
                return true;
            }
        }
        this.animations(CAnim.ANIMID_STOP);
        this.collisions();

        //*** The object has not been moved
        return false;
    },

    reset:function()
    {
        this.ho.hoX = this.r_StartX;
        this.ho.hoY = this.r_StartY;

        this.r_CurrentX = this.r_StartX;
        this.r_CurrentY = this.r_StartY;
        this.r_CurrentAngle = (this.m_dwStartAngle) * (Math.PI / 180.0);

        if (this.r_Speed != 0)
        {
            this.r_Angle = Math.atan2((this.r_FinalY - this.r_StartY), (this.r_FinalX - this.r_StartX));

            this.r_Cx = Math.cos(this.r_Angle + Math.PI / 2);
            this.r_Cy = Math.sin(this.r_Angle + Math.PI / 2);

            this.r_Dx = Math.cos(this.r_Angle) * (this.r_Speed / 50.0);
            this.r_Dy = Math.sin(this.r_Angle) * (this.r_Speed / 50.0);

            if (Math.abs(this.r_Dx) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalX - this.r_StartX) / this.r_Dx);
            }
            else if (Math.abs(this.r_Dy) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalY - this.r_StartY) / this.r_Dy);
            }
            else
            {
                this.r_Steps = 0.0;
            }
        }
        else
        {
            this.r_Steps = 0.0;
        }
    },

    setPosition:function(x, y)
    {
        this.r_CurrentX -= this.ho.hoX - x;
        this.r_CurrentY -= this.ho.hoY - y;

        this.ho.hoX = CServices.floatToInt(x);
        this.ho.hoY = CServices.floatToInt(y);
    },

    setXPosition:function(x)
    {
        this.r_CurrentX -= this.ho.hoX - x;
        this.ho.hoX = CServices.floatToInt(x);
    },

    setYPosition:function(y)
    {
        this.r_CurrentY -= this.ho.hoY - y;
        this.ho.hoY = CServices.floatToInt(y);
    },

    stop:function(bCurrent)
    {
        this.r_Stopped = true;
    },

    bounce:function(bCurrent)
    {
        var amp = this.r_Amp * Math.sin(this.r_CurrentAngle);
        this.ho.hoX = CServices.floatToInt(this.r_CurrentX + this.r_Cx * amp);
        this.ho.hoY = CServices.floatToInt(this.r_CurrentY + this.r_Cy * amp);

        var tmpX = this.r_FinalX;
        var tmpY = this.r_FinalY;

        this.r_FinalX = this.r_StartX;
        this.r_FinalY = this.r_StartY;

        this.r_StartX = tmpX;
        this.r_StartY = tmpY;

        this.r_Angle += Math.PI;

        if (this.r_Speed != 0)
        {
            this.r_Dx *= -1;
            this.r_Dy *= -1;

            if (Math.abs(this.r_Dx) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalX - this.r_CurrentX) / this.r_Dx);
            }
            else if (Math.abs(this.r_Dy) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalY - this.r_CurrentY) / this.r_Dy);
            }
            else
            {
                this.r_Steps = 0.0;
            }
        }
        else
        {
            this.r_Dx = 0;
            this.r_Dy = 0;
            this.r_Steps = 0.0;
        }
    },

    reverse:function()
    {
        //*** Finish moving the object first *****
        var amp = this.r_Amp * Math.sin(this.r_CurrentAngle);
        this.ho.hoX = CServices.floatToInt(this.r_CurrentX + this.r_Cx * amp);
        this.ho.hoY = CServices.floatToInt(this.r_CurrentY + this.r_Cy * amp);

        var tmpX = this.r_FinalX;
        var tmpY = this.r_FinalY;

        this.r_FinalX = this.r_StartX;
        this.r_FinalY = this.r_StartY;

        this.r_StartX = tmpX;
        this.r_StartY = tmpY;

        this.r_AngVel *= -1;
        this.r_Angle += Math.PI;

        if (this.r_Speed != 0)
        {
            this.r_Dx *= -1;
            this.r_Dy *= -1;

            if (Math.abs(this.r_Dx) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalX - this.r_CurrentX) / this.r_Dx);
            }
            else if (Math.abs(this.r_Dy) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalY - this.r_CurrentY) / this.r_Dy);
            }
            else
            {
                this.r_Steps = 0.0;
            }
        }
        else
        {
            this.r_Dx = 0;
            this.r_Dy = 0;
            this.r_Steps = 0.0;
        }
    },

    start:function()
    {
        this.r_Stopped = false;
    },

    setSpeed:function(speed)
    {
        if (speed < 0)
        {
            speed = 0; //** Do not allow negative speed
        }
        //*** Linear motion components;
        this.r_Speed = speed;
        this.ho.roc.rcSpeed = this.r_Speed;

        if (this.r_Speed != 0)
        {
            this.r_Dx = Math.cos(this.r_Angle) * (this.r_Speed / 50.0);
            this.r_Dy = Math.sin(this.r_Angle) * (this.r_Speed / 50.0);

            if (Math.abs(this.r_Dx) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalX - this.r_CurrentX) / this.r_Dx);
            }
            else if (Math.abs(this.r_Dx) > 0.0001)
            {
                this.r_Steps = Math.abs((this.r_FinalY - this.r_CurrentY) / this.r_Dy);
            }
            else
            {
                this.r_Steps = 0.0;
            }
        }
        else
        {
            this.r_Dx = 0;
            this.r_Dy = 0;
            this.r_Steps = 0.0;
        }
    },

    actionEntry:function(action)
    {
        var param;
        switch (action)
        {
            case 3545:	    // SET_SINEWAVE_SPEED = 3545,
                param = this.getParamDouble();
                setSpeed(param);
                break;
            case 3546:	    // SET_SINEWAVE_STARTX,
                param = this.getParamDouble();
                this.r_StartX = param;
                break;
            case 3547:	    // SET_SINEWAVE_STARTY,
                param = this.getParamDouble();
                this.r_StartY = param;
                break;
            case 3548:	    // SET_SINEWAVE_FINALX,
                param = this.getParamDouble();
                this.r_FinalX = param;
                break;
            case 3549:	    // SET_SINEWAVE_FINALY,
                param = this.getParamDouble();
                this.r_FinalY = param;
                break;
            case 3550:	    // SET_SINEWAVE_AMPLITUDE,
                param = this.getParamDouble();
                this.r_Amp = Math.max(param, 0);
                break;
            case 3551:	    // SET_SINEWAVE_ANGVEL,
                param = this.getParamDouble();
                this.r_AngVel = param * (Math.PI / 180.0) / 50.0;
				break;
            case 3552:	    // SET_SINEWAVE_STARTANG,
                param = this.getParamDouble();
                this.m_dwStartAngle = CServices.floatToInt(Math.max(param * (Math.PI / 180.0), 0));
                break;
            case 3553:	    // SET_SINEWAVE_CURRENTANGLE,
                param = this.getParamDouble();
                this.r_CurrentAngle = Math.max(param * (Math.PI / 180.0), 0);
                break;
            case 3554:	    // GET_SINEWAVE_SPEED,
                return this.ho.roc.rcSpeed;
            case 3555:	    // GET_SINEWAVE_STARTX,
                return this.r_Cx;
            case 3556:	    // GET_SINEWAVE_STARTY,
                return this.r_StartY;
            case 3557:	    // GET_SINEWAVE_FINALX,
                return this.r_FinalX;
            case 3558:	    // GET_SINEWAVE_FINALY,
                return this.r_FinalY;
            case 3559:	    // GET_SINEWAVE_AMPLITUDE,
                return this.r_Amp;
            case 3560:	    // GET_SINEWAVE_ANGVEL,
                return this.r_AngVel * 50.0 * (180.0 / Math.PI);
            case 3561:	    // GET_SINEWAVE_STARTANG,
                return this.m_dwStartAngle;
            case 3562:	    // GET_SINEWAVE_CURRENTANGLE,
                return this.r_CurrentAngle * (180.0 / Math.PI);
            case 3563:	    // RESET_SINEWAVE,
                this.reset();
                break;
            case 3564:	    // SET_SINEWAVE_ONCOMPLETION
                param = this.getParamDouble();
                var option = param;
                if (option == CRunMvtclickteam_sinewave.ONEND_STOP)
                {
                    this.r_OnEnd = CRunMvtclickteam_sinewave.ONEND_STOP;
                }
                else if (option == CRunMvtclickteam_sinewave.ONEND_RESET)
                {
                    this.r_OnEnd = CRunMvtclickteam_sinewave.ONEND_RESET;
                }
                else if (option == CRunMvtclickteam_sinewave.ONEND_BOUNCE)
                {
                    this.r_OnEnd = CRunMvtclickteam_sinewave.ONEND_BOUNCE;
                }
                else if (option == CRunMvtclickteam_sinewave.ONEND_REVERSE)
                {
                    this.r_OnEnd = CRunMvtclickteam_sinewave.ONEND_REVERSE;
                }
                break;
        }
        return 0;
    },
    
    getSpeed:function()
    {
        return this.ho.roc.rcSpeed;
    }
});
