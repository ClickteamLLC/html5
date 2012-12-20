//----------------------------------------------------------------------------------
//
// CRUNMVTREGPOLYGON : Movement polyone!
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

CRunMvtclickteam_regpolygon.MFLAG1_MOVEATSTART=1;

function CRunMvtclickteam_regpolygon()
{
    this.m_dwCX=0;
    this.m_dwCY=0;
    this.m_dwNumSides=0;
    this.m_dwRadius=0;
    this.m_dwFlags=0;
    this.m_dwRotAng=0;
    this.m_dwVel=0;

    this.r_Stopped=false;
    this.r_OnEnd=0;
    this.r_CX=0;
    this.r_CY=0;
    this.r_Sides=0;
    this.r_Vel=0;
    this.r_CurrentAngle=0;
    this.r_SideRemainder=0;
    this.r_Radius=0;
    this.r_CurrentX=0;
    this.r_CurrentY=0;
    this.r_SideSize=0;
    this.r_TurnAngle=0;
}

CRunMvtclickteam_regpolygon.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        // Version number
        file.skipBytes(1);
        this.m_dwCX = file.readAInt();
        this.m_dwCY = file.readAInt();
        this.m_dwNumSides = file.readAInt();
        this.m_dwRadius = file.readAInt();
        this.m_dwFlags = file.readAInt();
        this.m_dwRotAng = file.readAInt();
        this.m_dwVel = file.readAInt();

        //*** General variables
        var r_StartAngle = this.m_dwRotAng * (Math.PI / 180.0);

        this.r_Stopped = ((this.m_dwFlags & CRunMvtclickteam_regpolygon.MFLAG1_MOVEATSTART) == 0);
        this.r_CX = this.m_dwCX;
        this.r_CY = this.m_dwCY;
        this.r_Sides = this.m_dwNumSides;
        this.r_Vel = this.m_dwVel / 50.0;
        this.r_Radius = this.m_dwRadius;

        this.r_CurrentX = this.r_CX + this.r_Radius * Math.cos(r_StartAngle);
        this.r_CurrentY = this.r_CY - this.r_Radius * Math.sin(r_StartAngle);
        this.r_SideSize = 2 * this.r_Radius * Math.sin(Math.PI / this.r_Sides);
        this.r_TurnAngle = (2.0 / this.r_Sides) * Math.PI;
        this.r_CurrentAngle = Math.PI * (0.5 + (1.0 / this.r_Sides)) + r_StartAngle;
        this.r_SideRemainder = this.r_SideSize;

        this.ho.roc.rcSpeed = Math.abs(this.m_dwVel);

        if (this.r_Vel < 0.0)
        {
            this.r_CurrentAngle = this.r_CurrentAngle + Math.PI * (1.0 - (2.0 / this.r_Sides));
            this.r_TurnAngle += 2 * Math.PI * (1.0 - (2.0 / this.r_Sides));
            this.r_Vel *= -1;
        }
    },

    reset:function()
    {
        //*** General variables
        var r_StartAngle = this.m_dwRotAng * (Math.PI / 180.0);

        this.r_CX = this.m_dwCX;
        this.r_CY = this.m_dwCY;
        this.r_Sides = this.m_dwNumSides;
        this.r_Vel = this.m_dwVel / 50.0;
        this.r_Radius = this.m_dwRadius;

        this.r_CurrentX = this.r_CX + this.r_Radius * Math.cos(r_StartAngle);
        this.r_CurrentY = this.r_CY - this.r_Radius * Math.sin(r_StartAngle);
        this.r_SideSize = 2 * this.r_Radius * Math.sin(Math.PI / this.r_Sides);
        this.r_TurnAngle = (2.0 / this.r_Sides) * Math.PI;
        this.r_CurrentAngle = Math.PI * (0.5 + (1.0 / this.r_Sides)) + r_StartAngle;
        this.r_SideRemainder = this.r_SideSize;

        if (this.r_Vel < 0.0)
        {
            this.r_CurrentAngle = this.r_CurrentAngle + Math.PI * (1.0 - (2.0 / this.r_Sides));
            this.r_TurnAngle += 2 * Math.PI * (1.0 - (2.0 / this.r_Sides));
            this.r_Vel *= -1;
        }
    },

    move:function()
    {
        //*** Object needs to be moved?
        if (!this.r_Stopped)
        {
            var toMove = this.r_Vel;
            if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
            {
                toMove = toMove * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
            }

            var complete = false;

            while (complete == false)
            {
                if (toMove >= this.r_SideRemainder)
                {
                    //*** move to the next vertex and turn the angle ready to move along next section
                    this.r_CurrentX += this.r_SideRemainder * Math.cos(this.r_CurrentAngle);
                    this.r_CurrentY -= this.r_SideRemainder * Math.sin(this.r_CurrentAngle);
                    toMove -= this.r_SideRemainder;
                    this.r_SideRemainder = this.r_SideSize;
                    this.r_CurrentAngle += this.r_TurnAngle;
                }
                else
                {
                    //*** move along the side
                    this.r_CurrentX += toMove * Math.cos(this.r_CurrentAngle);
                    this.r_CurrentY -= toMove * Math.sin(this.r_CurrentAngle);
                    this.r_SideRemainder -= toMove;
                    complete = true;
                }
            }
            //*** Move object, run animation and collision detection
            this.animations(CAnim.ANIMID_WALK);
            this.ho.hoX = CServices.floatToInt(this.r_CurrentX);
            this.ho.hoY = CServices.floatToInt(this.r_CurrentY);
            this.collisions();

            //*** Indicate the object has been moved
            return true;
        }
        this.animations(CAnim.ANIMID_STOP);
        this.collisions();
        return false;
    },

    setPosition:function(x, y)
    {
        this.r_CurrentX -= this.ho.hoX - x;
        this.r_CurrentY -= this.ho.hoY - y;

        this.r_CX -= this.ho.hoX - x;
        this.r_CY -= this.ho.hoY - y;

        this.ho.hoX = CServices.floatToInt(x);
        this.ho.hoY = CServices.floatToInt(y);
    },

    setXPosition:function(x)
    {
        this.r_CurrentX -= this.ho.hoX - x;
        this.r_CX -= this.ho.hoX - x;

        this.ho.hoX = CServices.floatToInt(x);
    },

    setYPosition:function(y)
    {
        this.r_CurrentY -= this.ho.hoY - y;
        this.r_CY -= this.ho.hoY - y;

        this.ho.hoY = CServices.floatToInt(y);
    },

    stop:function(bCurrent)
    {
        this.r_Stopped = true;
	},

    reverse:function()
    {
        this.r_CurrentAngle += Math.PI;
        this.r_TurnAngle = 2 * Math.PI - this.r_TurnAngle;
        this.r_SideRemainder = this.r_SideSize - this.r_SideRemainder;
    },

    start:function()
    {
        this.r_Stopped = false;
    },

    setSpeed:function(speed)
    {
        this.r_Vel = Math.abs(speed) / 50.0;
    },

    actionEntry:function(action)
    {
        var param;
        switch (action)
        {
            case 3445:	    // SET_CENTRE_X = 3445,
                param = this.getParamDouble();
                this.r_CurrentX += param - this.r_CX;
                this.r_CX = param;
                break;
            case 3446:	    // SET_CENTRE_Y,
                param = this.getParamDouble();
                this.r_CurrentY += param - this.r_CY;
                this.r_CY = param;
                break;
            case 3447:	    // SET_NUMSIDES,
                param = this.getParamDouble();
                this.m_dwNumSides = Math.max(param, 0);
                this.reset();
                break;
            case 3448:	    // SET_RADIUS,
                param = this.getParamDouble();
                this.m_dwRadius = Math.max(param, 0);
                this.reset();
                break;
            case 3449:	    // SET_ROTATION_ANGLE,
                param = this.getParamDouble();
                this.m_dwRotAng = Math.max(param, 0);
                this.reset();
                break;
            case 3450:	    // SET_VELOCITY,
                param = this.getParamDouble();
                this.r_Vel = Math.abs(param) / 50.0;
                break;
            case 3451:	    // GET_CENTRE_X,
                return this.r_CX;
            case 3452:	    // GET_CENTRE_Y,
                return this.r_CY;
            case 3453:	    // GET_NUMSIDES,
                return this.r_Sides;
            case 3454:	    // GET_RADIUS,
                return this.r_Radius;
            case 3455:	    // GET_ROTATION_ANGLE,
                return this.m_dwRotAng;
            case 3456:	    // GET_VELOCITY
                return this.r_Vel * 50;
        }
        return 0;
    },

    getSpeed:function()
    {
        return (this.r_Vel * 50);
    }
});

