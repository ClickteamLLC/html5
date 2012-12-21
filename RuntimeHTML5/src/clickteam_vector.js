//----------------------------------------------------------------------------------
//
// CRUNMVTVECTOR
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
MOVEATSTART = 1;
HANDLE_DIRECTION = 2;
ToDegrees = 57.295779513082320876798154814105;
ToRadians = 0.017453292519943295769236907684886;

function CRunMvtclickteam_vector()
{
    this.m_dwFlags=0;
    this.m_dwVel=0;
    this.m_dwVelAngle=0;
    this.m_dwAcc=0;
    this.m_dwAccAngle=0;
    this.r_Stopped=false ;
    this.handleDirection= false;
    this.posX = 0;
    this.posY = 0;
    this.velX = 0;
    this.velY = 0;
    this.accX = 0;
    this.accY = 0;
    this.angle = 0;
    this.minSpeed = -1;
    this.maxSpeed = -1;
}

CRunMvtclickteam_vector.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        file.skipBytes(1);
        this.m_dwFlags = file.readAInt();
        this.m_dwVel = file.readAInt();
        this.m_dwVelAngle = file.readAInt();
        this.m_dwAcc = file.readAInt();
        this.m_dwAccAngle = file.readAInt();

        //*** General variables
        this.r_Stopped = ((this.m_dwFlags & MOVEATSTART) == 0);
        this.handleDirection = ((this.m_dwFlags & HANDLE_DIRECTION) != 0);

        var vel = this.m_dwVel;
        var velAngle = this.m_dwVelAngle * ToRadians;

        var acc = this.m_dwAcc * 0.01;
        var accAngle = this.m_dwAccAngle * ToRadians;

        this.posX = this.ho.hoX;
        this.posY = this.ho.hoY;

        this.velX = vel * Math.cos(velAngle);
        this.velY = -vel * Math.sin(velAngle);

        this.accX = acc * Math.cos(accAngle);
        this.accY = -acc * Math.sin(accAngle);
    },

    move:function()
    {
        //*** Object needs to be moved?
        if (!this.r_Stopped)
        {
            //*** Update internal variables
            var calculs;
            calculs = this.accX;
            if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
            {
                calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
            }
            this.velX += calculs;
            calculs = this.accY;
            if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
            {
                calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
            }
            this.velY += calculs;
            calculs = this.velX;
            if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
            {
                calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
            }
            this.posX += calculs * 0.01;
            calculs = this.velY;
            if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
            {
                calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
            }
            this.posY += calculs * 0.01;

            //*** Code the handle the min / max speed control
            this.checkSpeed();

            //*** Calculate the current direction
            this.angle = Math.atan2(-this.velY, this.velX);
            if (this.angle < 0)
            {
                this.angle += 2 * Math.PI;
            }

            if (this.handleDirection)
            {
				this.ho.roc.rcDir=(CServices.floatToInt(((this.angle + (Math.PI/32) )*32)/(Math.PI*2) ))%32;
            }

            //*** Update MMF2 with the new position
            this.animations(CAnim.ANIMID_WALK);
            this.ho.hoX = CServices.floatToInt(this.posX + 0.5);
            this.ho.hoY = CServices.floatToInt(this.posY + 0.5);
            this.collisions();

            //*** Indicate the object has been moved
            return true;
        }
        this.animations(CAnim.ANIMID_STOP);
        this.collisions();
        return false;
    },

    reset:function()
    {
        var vel = this.m_dwVel;
        var velAngle = this.m_dwVelAngle * ToRadians;

        var acc = this.m_dwAcc / 100.0;
        var accAngle = this.m_dwAccAngle * ToRadians;

        this.posX = this.ho.hoX;
        this.posY = this.ho.hoY;

        this.velX = vel * Math.cos(velAngle);
        this.velY = -vel * Math.sin(velAngle);

        this.accX = acc * Math.cos(accAngle);
        this.accY = -acc * Math.sin(accAngle);
    },

    checkSpeed:function()
    {
        //*** Code the handle the min / max speed control
        if (this.maxSpeed != -1)
        {
            if (this.velX * this.velX + this.velY * this.velY > this.maxSpeed * this.maxSpeed)
            {
                this.recalculateAngle();
                //*** Recalculate velocity components
                this.velX = this.maxSpeed * Math.cos(this.angle);
                this.velY = -this.maxSpeed * Math.sin(this.angle);
                return true;
            }
        }
        else if (this.minSpeed != -1)
        {
            if (this.velX * this.velX + this.velY * this.velY < this.minSpeed * this.minSpeed)
            {
                this.recalculateAngle();
                //*** Recalculate velocity components
                this.velX = this.minSpeed * Math.cos(this.angle);
                this.velY = -this.minSpeed * Math.sin(this.angle);
                return true;
            }
        }
        return false;
    },

    recalculateAngle:function()
    {
        this.angle = Math.atan2(-this.velY, this.velX);
        if (this.angle < 0)
        {
            this.angle += 2 * Math.PI;
        }
    },

    setPosition:function(x, y)
    {
        this.posX -= this.ho.hoX - x;
        this.posY -= this.ho.hoY - y;

        this.ho.hoX = CServices.floatToInt(x);
        this.ho.hoY = CServices.floatToInt(y);
    },

    setXPosition:function(x)
    {
        this.posX -= this.ho.hoX - x;
        this.ho.hoX = CServices.floatToInt(x);
    },

    setYPosition:function(y)
    {
        this.posY -= this.ho.hoY - y;
        this.ho.hoY = CServices.floatToInt(y);
    },

    stop:function(bCurrent)
    {
        this.r_Stopped = true;
    },

    reverse:function()
    {
        this.velX *= -1;
        this.velY *= -1;
        this.recalculateAngle();
    },

    start:function()
    {
        this.r_Stopped = false;
    },

    setSpeed:function(speed)
    {
        this.velX = speed * Math.cos(this.angle);
        this.velY = -speed * Math.sin(this.angle);

        if (this.checkSpeed())
        {
            this.recalculateAngle();
        }
    },

    setMaxSpeed:function(speed)
    {
        this.maxSpeed = speed;
        if (this.checkSpeed())
        {
            this.recalculateAngle();
        }
    },

    setGravity:function(gravity)
    {
        var accAngle = Math.atan2(-this.accY, this.accX);
        var acc = gravity * 0.01;

        this.accX = acc * Math.cos(accAngle);
        this.accY = -acc * Math.sin(accAngle);
    },

    actionEntry:function(action)
    {
        var param;
        var vel;
        var accAngle;
        var acc;
        var flo;
        switch (action)
        {
            case 3845:	    // SET_Vector_X = 3845,
                param = this.getParamDouble();
                this.posX = param;
                break;
            case 3846:	    // SET_Vector_Y,
                param = this.getParamDouble();
                this.posY = param;
                break;
            case 3847:	    // SET_Vector_XY,
                param = this.getParamDouble();
                break;
            case 3848:	    // SET_Vector_AddDistX,
                param = this.getParamDouble();
                this.posX += 0.01 * param;
                break;
            case 3849:	    // SET_Vector_AddDistY,
                param = this.getParamDouble();
                this.posY -= 0.01 * param;
                break;
            case 3850:	    // SET_Vector_Dir,
                param = this.getParamDouble();
                this.angle = (param) * ToRadians;
                vel = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
                this.velX = vel * Math.cos(this.angle);
                this.velY = -vel * Math.sin(this.angle);
                break;
            case 3851:	    // SET_Vector_RotateTowardsAngle,
                param = this.getParamDouble();
                break;
            case 3852:	    // SET_Vector_RotateTowardsPoint,
                param = this.getParamDouble();
                break;
            case 3853:	    // SET_Vector_RotateTowardsObject,
                param = this.getParamDouble();
                break;
            case 3854:	    // SET_Vector_Speed,
                param = this.getParamDouble();
                vel = param;
                this.velX = vel * Math.cos(this.angle);
                this.velY = -vel * Math.sin(this.angle);
                if (this.checkSpeed())
                {
                    this.recalculateAngle();
                }
                break;
            case 3855:	    // SET_Vector_SpeedX,
                param = this.getParamDouble();
                this.velX = param;
                if (this.checkSpeed())
                {
                    this.recalculateAngle();
                }
                break;
            case 3856:	    // SET_Vector_SpeedY,
                param = this.getParamDouble();
                this.velY = param;
                if (this.checkSpeed())
                {
                    this.recalculateAngle();
                }
                break;
            case 3857:	    // SET_Vector_AddSpeedX,
                param = this.getParamDouble();
                this.velX += 0.01 * param;
                if (this.checkSpeed())
                {
                    this.recalculateAngle();
                }
                break;
            case 3858:	    // SET_Vector_AddSpeedY,
                param = this.getParamDouble();
                this.velY -= 0.01 * param;
                if (this.checkSpeed())
                {
                    this.recalculateAngle();
                }
                break;
            case 3859:	    // SET_Vector_MinSpeed,
                param = this.getParamDouble();
                this.minSpeed = param;
                if (this.checkSpeed())
                {
                    this.recalculateAngle();
                }
                break;
            case 3860:	    // SET_Vector_MaxSpeed,
                param = this.getParamDouble();
                this.maxSpeed = param;
                if (this.checkSpeed())
                {
                    this.recalculateAngle();
                }
                break;
            case 3861:	    // SET_Vector_Gravity,
                param = this.getParamDouble();
                accAngle = Math.atan2(-this.accY, this.accX);
                acc = param * 0.01;
                this.accX = acc * Math.cos(accAngle);
                this.accY = -acc * Math.sin(accAngle);
                break;
            case 3862:	    // SET_Vector_GravityDir,
                param = this.getParamDouble();
                accAngle = param * ToRadians;
                acc = Math.sqrt(this.accX * this.accX + this.accY * this.accY);
                this.accX = acc * Math.cos(accAngle);
                this.accY = -acc * Math.sin(accAngle);
                break;
            case 3863:	    // SET_Vector_BounceCoeff,
                param = this.getParamDouble();
                break;
            case 3864:	    // SET_Vector_ForceBounce,
                param = this.getParamDouble();
                this.angle = param * ToRadians * 2;
                this.posX -= this.velX * 0.01;
                this.posY -= this.velY * 0.01;
                this.angle -= Math.atan2(-this.velY, this.velX);
                vel = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
                this.velX = vel * Math.cos(this.angle);
                this.velY = -vel * Math.sin(this.angle);
                break;

            case 3865:	    // GET_Vector_X,
                return this.posX;
            case 3866:	    // GET_Vector_Y,
                return this.posY;
            case 3867:	    // GET_Vector_Dir,
                flo = (this.angle * ToDegrees);
                if (flo < 0)
                {
                    flo += 360;
                }
                return flo;
            case 3868:	    // GET_Vector_Speed,
                return Math.sqrt(this.velX * this.velX + this.velY * this.velY);
            case 3869:	    // GET_Vector_SpeedX,
                return this.velX;
            case 3870:	    // GET_Vector_SpeedY,
                return this.velY;
            case 3871:	    // GET_Vector_MinSpeed,
                return this.minSpeed;
            case 3872:	    // GET_Vector_MaxSpeed,
                return this.maxSpeed;
            case 3873:	    // GET_Vector_Gravity,
                return (100 * Math.sqrt(this.accX * this.accX + this.accY * this.accY));
            case 3874:	    // GET_Vector_GravityDir,
                flo = (Math.atan2(-this.accY, this.accX) * ToDegrees);
                if (flo < 0)
                {
                    flo += 360;
                }
                return flo;
            case 3875:	    // GET_Vector_BounceCoef
                return 0;

        }
        return 0;
    },

    getSpeed:function()
    {
        return (Math.sqrt(this.velX * this.velX + this.velY * this.velY));
    },

    getGravity:function()
    {
        return 100 * Math.sqrt(this.accX * this.accX + this.accY * this.accY);
    }
});
