//----------------------------------------------------------------------------------
//
// CRUNMVTCIRCULAR : Movement circular!
//
//----------------------------------------------------------------------------------
/* Copyright (c) 1996-2012 Clickteam
*
* This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
* 
* Permission is hereby granted to any person obtaining a legal copy 
* of Clickteam Multimedia Fusion 2 to use or modify this source code for 
* debugging, optimizing, or customizing applications created with 
* Clickteam Multimedia Fusion 2. 
* Any other use of this source code in prohibited.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/
CRunMvtclickteam_circular.MFLAG1_MOVEATSTART=1;
CRunMvtclickteam_circular.ONEND_STOP=0;
CRunMvtclickteam_circular.ONEND_RESET=1;
CRunMvtclickteam_circular.ONEND_REVERSE_VEL=2;
CRunMvtclickteam_circular.ONEND_REVERSE_DIR=3;

function CRunMvtclickteam_circular()
{
    this.m_dwCX=0;
    this.m_dwCY=0;
    this.m_dwStartAngle=0;
    this.m_dwRadius=0;
    this.m_dwRmin=0;
    this.m_dwRmax=0;
    this.m_dwFlags=0;
    this.m_dwOnEnd=0;
    this.m_dwSpiVel=0;
    this.m_dwAngVel=0;
    
    this.r_Stopped=false;
    this.r_OnEnd=0;
    this.r_CX=0;
    this.r_CY=0;
    this.r_Rmin=0;
    this.r_Rmax=0;
    this.r_AngVel=0;
    this.r_SpiVel=0;
    this.r_CurrentRadius=0;
    this.r_CurrentAngle=0;
}

CRunMvtclickteam_circular.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        file.skipBytes(1);
        this.m_dwCX = file.readAInt();
        this.m_dwCY = file.readAInt();
        this.m_dwRadius = file.readAInt();
        this.m_dwStartAngle = file.readAInt();
        this.m_dwRmin = file.readAInt();
        this.m_dwRmax = file.readAInt();
        this.m_dwFlags = file.readAInt();
        this.m_dwOnEnd = file.readAInt();
        this.m_dwAngVel = file.readAInt();
        this.m_dwSpiVel = file.readAInt();

        //*** General variables
        this.r_Stopped = ((this.m_dwFlags & CRunMvtclickteam_circular.MFLAG1_MOVEATSTART) == 0);
        this.r_OnEnd = this.m_dwOnEnd;

        this.r_CX = this.m_dwCX;
        this.r_CY = this.m_dwCY;
        this.r_Rmin = this.m_dwRmin;
        this.r_Rmax = this.m_dwRmax;
        this.r_AngVel = this.m_dwAngVel / 50.0 * (Math.PI / 180.0);
        this.r_SpiVel = this.m_dwSpiVel / 50.0;
        this.r_CurrentAngle = this.m_dwStartAngle * (Math.PI / 180.0);
        this.r_CurrentRadius = this.m_dwRadius;
        this.ho.roc.rcSpeed = this.m_dwAngVel;
    },

    move:function()
    {
        var calculs;

        //*** Object needs to be moved?
        if (!this.r_Stopped)
        {
            this.animations(CAnim.ANIMID_WALK);
            this.ho.hoX = CServices.floatToInt(this.r_CX + this.r_CurrentRadius * Math.cos(this.r_CurrentAngle));
            this.ho.hoY = CServices.floatToInt(this.r_CY - this.r_CurrentRadius * Math.sin(this.r_CurrentAngle));
            this.collisions();

            calculs = this.r_AngVel;
            if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
            {
                calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
            }
            this.r_CurrentAngle += calculs;

            if (this.r_CurrentAngle < 0)
            {
                this.r_CurrentAngle += 2 * Math.PI;
            }
            else if (this.r_CurrentAngle > 2 * Math.PI)
            {
                this.r_CurrentAngle -= 2 * Math.PI;
            }

            if (Math.abs(this.r_SpiVel) > 0.00001)
            {
                calculs = this.r_SpiVel;
                if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                {
                    calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                }
                this.r_CurrentRadius += calculs;

                if (this.r_CurrentRadius < this.r_Rmin || this.r_CurrentRadius > this.r_Rmax)
                {
                    if (this.r_OnEnd == CRunMvtclickteam_circular.ONEND_STOP)
                    {
                        this.r_Stopped = true;
                    }
                    else if (this.r_OnEnd == CRunMvtclickteam_circular.ONEND_REVERSE_VEL)
                    {
                        this.r_SpiVel *= -1;
                    }
                    else if (this.r_OnEnd == CRunMvtclickteam_circular.ONEND_REVERSE_DIR)
                    {
                        this.r_AngVel *= -1;
                        this.r_SpiVel *= -1;
                    }
                    else if (this.r_OnEnd == CRunMvtclickteam_circular.ONEND_RESET)
                    {
                        this.reset();
                    }
                }
            }
            //*** Indicate the object has been moved
            return true;
        }
        this.animations(CAnim.ANIMID_STOP);
        this.collisions();

        //*** The object has not been moved
        return false;
    },

    reset:function()
    {
        this.r_CX = this.m_dwCX;
        this.r_CY = this.m_dwCY;
        this.r_Rmin = this.m_dwRmin;
        this.r_Rmax = this.m_dwRmax;
        this.r_AngVel = this.m_dwAngVel / 50.0 * (Math.PI / 180.0);
        this.r_SpiVel = this.m_dwSpiVel / 50.0;
        this.r_CurrentAngle = this.m_dwStartAngle * (Math.PI / 180.0);
        this.r_CurrentRadius = this.m_dwRadius;
    },

    setPosition:function(x, y)
    {
        this.r_CX -= this.ho.hoX - x;
        this.r_CY -= this.ho.hoY - y;

        this.ho.hoX = x;
        this.ho.hoY = y;
    },

    setXPosition:function(x)
    {
        this.r_CX -= this.ho.hoX - x;
        this.ho.hoX = x;
    },

    setYPosition:function(y)
    {
        this.r_CY -= this.ho.hoY - y;
        this.ho.hoY = y;
    },

    stop:function(bCurrent)
    {
        this.r_Stopped = true;
    },

    reverse:function()
    {
        this.r_AngVel *= -1;
    },

    start:function()
    {
        this.r_Stopped = false;
    },

    setSpeed:function(speed)
    {
        //*** Linear motion components;
        this.r_AngVel = (speed) / 50.0 * (Math.PI / 180.0);
        this.ho.roc.rcSpeed = speed;
	},

    actionEntry:function(action)
    {
        var param;
        switch (action)
        {
            case 3345:		// SET_CENTRE_X = 3345,
                param = this.getParamDouble();
                this.r_CX = param;
                return 0;
            case 3346:		// SET_CENTRE_Y,
                param = this.getParamDouble();
                this.r_CY = param;
                return 0;
            case 3347:		// SET_ANGSPEED,
                param = this.getParamDouble();
                this.r_AngVel = param / 50.0 * (Math.PI / 180.0);
                this.ho.roc.rcSpeed = param;
                return 0;
            case 3348:		// SET_CURRENTANGLE,
                param = this.getParamDouble();
                this.r_CurrentAngle = param * (Math.PI / 180.0);
                return 0;
            case 3349:		// SET_RADIUS,
                param = this.getParamDouble();
                this.r_CurrentRadius = Math.max(param, 0);
                return 0;
            case 3350:		// SET_SPIRALVEL,
                param = this.getParamDouble();
                this.r_SpiVel = param / 50.0;
                return 0;
            case 3351:		// SET_MINRADIUS,
                param = this.getParamDouble();
                this.r_Rmin = Math.max(param, 0);
                return 0;
            case 3352:		// SET_MAXRADIUS,
                param = this.getParamDouble();
                this.r_Rmax = Math.max(param, 0);
                return 0;
            case 3353:		// SET_ONCOMPLETION,
                param = this.getParamDouble();
                var onEnd = param;
                if (onEnd >= CRunMvtclickteam_circular.ONEND_STOP && onEnd <= CRunMvtclickteam_circular.ONEND_REVERSE_DIR)
                {
                    this.r_OnEnd = onEnd;
                }
                return 0;
            case 3354:		// GET_CENTRE_X,
                return this.r_CX;
            case 3355:		// GET_CENTRE_Y,
                return this.r_CY;
            case 3356:		// GET_ANGSPEED,
                return this.r_AngVel * 50.0 * (180.0 / Math.PI);
            case 3357:		// GET_CURRENTANGLE,
                return this.r_CurrentAngle * (180 / Math.PI);
            case 3358:		// GET_RADIUS,
                return this.r_CurrentRadius;
            case 3359:		// GET_SPIRALVEL,
                return this.r_SpiVel * 50;
            case 3360:		// GET_MINRADIUS,
                return this.r_Rmin;
            case 3361:		// GET_MAXRADIUS
                return this.r_Rmax;
        }
        return 0;
    },

    getSpeed:function()
    {
        return this.ho.roc.rcSpeed;
    }  
});


