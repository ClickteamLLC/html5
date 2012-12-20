//----------------------------------------------------------------------------------
//
// CRUNMVTSIMPLEELLIPSE
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

CRunMvtclickteam_simple_ellipse.MFLAG1_MOVEATSTART= 1;

function CRunMvtclickteam_simple_ellipse()
{
    this.m_dwCX=0;
    this.m_dwCY=0;
    this.m_dwRadiusX=0;
    this.m_dwRadiusY=0;
    this.m_dwStartAngle=0;
    this.m_dwFlags=0;
    this.m_dwAngVel=0;
    this.m_dwOffset=0;
    this.r_Stopped=false;
    this.r_CX=0;
    this.r_CY=0;
    this.r_radiusX=0;
    this.r_radiusY=0;
    this.r_AngVel=0;
    this.r_Offset=0;
    this.r_CurrentAngle=0;
}

CRunMvtclickteam_simple_ellipse.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        file.skipBytes(1);
        this.m_dwCX = file.readAInt();
        this.m_dwCY = file.readAInt();
        this.m_dwRadiusX = file.readAInt();
        this.m_dwRadiusY = file.readAInt();
        this.m_dwStartAngle = file.readAInt();
        this.m_dwFlags = file.readAInt();
        this.m_dwAngVel = file.readAInt();
        this.m_dwOffset = file.readAInt();

        this.r_Stopped = ((this.m_dwFlags & CRunMvtclickteam_simple_ellipse.MFLAG1_MOVEATSTART) == 0);

        this.r_CX = this.m_dwCX;
        this.r_CY = this.m_dwCY;
        this.r_AngVel = this.m_dwAngVel / 50.0 * (Math.PI / 180.0);
        this.r_Offset = this.m_dwOffset * (Math.PI / 180.0);
        this.r_CurrentAngle = this.m_dwStartAngle * (Math.PI / 180.0);
        this.r_radiusX = this.m_dwRadiusX;
        this.r_radiusY = this.m_dwRadiusY;

        this.ho.roc.rcSpeed = this.m_dwAngVel;
    },

    move:function()
	{ 
        //*** Object needs to be moved?
        if (!this.r_Stopped)
        {
            var x = this.r_radiusX * Math.cos(this.r_CurrentAngle);
            var y = this.r_radiusY * Math.sin(this.r_CurrentAngle);

            //*** Carry out 2D transform if needed
            if (Math.abs(this.r_Offset) > 0.0001)
            {
                var xprime = Math.cos(this.r_Offset) * x - y * Math.sin(this.r_Offset);
                var yprime = Math.sin(this.r_Offset) * x + y * Math.cos(this.r_Offset);

                x = xprime;
                y = yprime;
            }

            var calculs = this.r_AngVel;
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

            this.animations(CAnim.ANIMID_WALK);
            this.ho.hoX = CServices.floatToInt(this.r_CX + x);
            this.ho.hoY = CServices.floatToInt(this.r_CY - y);
            this.collisions();

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
        this.r_AngVel = this.m_dwAngVel / 50.0 * (Math.PI / 180.0);
        this.r_Offset = this.m_dwOffset * (Math.PI / 180.0);
        this.r_CurrentAngle = this.m_dwStartAngle * (Math.PI / 180.0);
        this.r_radiusX = this.m_dwRadiusX;
        this.r_radiusY = this.m_dwRadiusY;
    },

    setPosition:function(x, y)
    {
        this.r_CX -= this.ho.hoX - x;
        this.r_CY -= this.ho.hoY - y;

        this.ho.hoX = CServices.floatToInt(x);
        this.ho.hoY = CServices.floatToInt(y);
    },

    setXPosition:function(x)
    {
        this.r_CX -= this.ho.hoX - x;
        this.ho.hoX = CServices.floatToInt(x);
    },

    setYPosition:function(y)
    {
        this.r_CY -= this.ho.hoY - y;
        this.ho.hoY = CServices.floatToInt(y);
    },

    stop:function(bCurrent)
    {
        this.r_Stopped = true;
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
            case 3645:	    // SET_CENTRE_X = 3645,
                param = this.getParamDouble();
                this.r_CX = param;
                break;
            case 3646:	    // SET_CENTRE_Y,
                param = this.getParamDouble();
                this.r_CY = param;
                break;
            case 3647:	    // SET_RADIUS_X,
                param = this.getParamDouble();
                this.r_radiusX = param;
                break;
            case 3648:	    // SET_RADIUS_Y,
                param = this.getParamDouble();
                this.r_radiusY = param;
                break;
            case 3649:	    // SET_ANGSPEED,
                param = this.getParamDouble();
                this.r_AngVel = param / 50.0 * (Math.PI / 180.0);
                this.ho.roc.rcSpeed = param;
                break;
            case 3650:	    // SET_CURRENTANGLE,
                param = this.getParamDouble();
                this.r_CurrentAngle = param * (Math.PI / 180.0);
				break;
            case 3651:	    // SET_OFFSETANGLE,
                param = this.getParamDouble();
                this.r_Offset = param * (Math.PI / 180.0);
				break;
            case 3652:	    // GET_CENTRE_X,
                return this.r_CX;
            case 3653:	    // GET_CENTRE_Y,
                return this.r_CY;
            case 3654:	    // GET_RADIUS_X,
                return this.r_radiusX;
            case 3655:	    // GET_RADIUS_Y,
                return this.r_radiusY;
            case 3656:	    // GET_ANGSPEED,
                return this.r_AngVel * 50.0 * (180.0 / Math.PI);
            case 3657:	    // GET_CURRENTANGLE,
                return this.r_CurrentAngle * (180 / Math.PI);
            case 3658:	    // GET_OFFSETANGLE
                return this.r_Offset * (180 / Math.PI);
        }
        return 0;
    }
});
