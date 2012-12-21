//----------------------------------------------------------------------------------
//
// CRunMvtpinball : movement pinball
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

CRunMvtpinball.EFLAG_MOVEATSTART=1;
CRunMvtpinball.MFLAG_STOPPED=1;

function CRunMvtpinball()
{
    this.m_dwInitialSpeed=0;
    this.m_dwDeceleration=0;
    this.m_dwGravity=0;
    this.m_dwInitialDir=0;
    this.m_dwFlags=0;

    this.m_gravity=0;
    this.m_xVector=0;
    this.m_yVector=0;
    this.m_angle=0;
    this.m_X=0;
    this.m_Y=0;
    this.m_deceleration=0;
    this.m_flags=0;
}

CRunMvtpinball.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        file.skipBytes(1);
        this.m_dwInitialSpeed = file.readAInt();
        this.m_dwDeceleration = file.readAInt();
        this.m_dwGravity = file.readAInt();
        this.m_dwInitialDir = file.readAInt();
        this.m_dwFlags = file.readAInt();

        // Initialisations
        this.m_X = this.ho.hoX;
        this.m_Y = this.ho.hoY;
        this.ho.roc.rcSpeed = this.m_dwInitialSpeed;

        // Finds the initial direction
        this.ho.roc.rcDir = this.dirAtStart(this.m_dwInitialDir);
        var angle = (this.ho.roc.rcDir * 2 * Math.PI) / 32.0;

        // Calculates the vectors
        this.m_gravity = this.m_dwGravity;
        this.m_deceleration = this.m_dwDeceleration;
        this.m_xVector = this.ho.roc.rcSpeed * Math.cos(angle);
        this.m_yVector = -this.ho.roc.rcSpeed * Math.sin(angle);

        // Move at start
        this.m_flags = 0;
        if ((this.m_dwFlags & CRunMvtpinball.EFLAG_MOVEATSTART) == 0)
        {
            this.m_flags |= CRunMvtpinball.MFLAG_STOPPED;
        }
    },

    getAngle:function(vX, vY)
    {
        var vector = Math.sqrt(vX * vX + vY * vY);
        if (vector == 0.0)
        {
            return 0.0;
        }
        var angle = Math.acos(vX / vector);
        if (vY > 0.0)
        {
            angle = 2.0 * Math.PI - angle;
        }
        return angle;
    },

    getVector:function(vX, vY)
    {
        return Math.sqrt(vX * vX + vY * vY);
    },

    move:function()
    {
        // Stopped?
        if ((this.m_flags & CRunMvtpinball.MFLAG_STOPPED) != 0)
        {
            this.animations(CAnim.ANIMID_STOP);
            this.collisions();
            return false;
        }

        // Increase Y speed
        this.m_yVector += this.m_gravity / 10.0;

        // Get the current vector of the ball
        var angle = this.getAngle(this.m_xVector, this.m_yVector);	// Get the angle and vector
        var vector = this.getVector(this.m_xVector, this.m_yVector);
        var calculs = this.m_deceleration;
        if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
        {
            calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
        }
        vector -= calculs / 50.0;
        if (vector < 0.0)
        {
            vector = 0.0;
        }
        this.m_xVector = vector * Math.cos(angle);					// Restores X and Y speeds
        this.m_yVector = -vector * Math.sin(angle);

        // Calculate the new position
        calculs = this.m_xVector;
        if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
        {
            calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
        }
        this.m_X = this.m_X + (calculs / 10.0);
        calculs = this.m_yVector;
        if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
        {
            calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
        }
        this.m_Y = this.m_Y + (calculs / 10.0);

        // Performs the animation
        this.ho.roc.rcSpeed = vector;
        if (this.ho.roc.rcSpeed > 100)
        {
            this.ho.roc.rcSpeed = 100;
        }
        this.ho.roc.rcDir = CServices.floatToInt((angle * 32) / (2.0 * Math.PI));
        this.animations(CAnim.ANIMID_WALK);

        // detects the this.collisions
        this.ho.hoX = CServices.floatToInt(this.m_X);
        this.ho.hoY = CServices.floatToInt(this.m_Y);
        this.collisions();

        // The object has been moved
        return true;
    },

    setPosition:function(x, y)
    {
        this.ho.hoX = CServices.floatToInt(x);
        this.ho.hoY = CServices.floatToInt(y);
        this.m_X = x;
        this.m_Y = y;
    },

    setXPosition:function(x)
    {
        this.ho.hoX = CServices.floatToInt(x);
        this.m_X = x;
    },

    setYPosition:function(y)
    {
        this.ho.hoY = CServices.floatToInt(y);
        this.m_Y = y;
    },

    stop:function(bCurrent)
    {
        this.m_flags |= CRunMvtpinball.MFLAG_STOPPED;
    },

    bounce:function(bCurrent)
    {
        if (!bCurrent)
        {
            this.m_xVector = -this.m_xVector;
            this.m_yVector = -this.m_yVector;
            return;
        }

        // Takes the object against the obstacle
        var pt= new CPoint();
        this.approachObject(this.ho.hoX, this.ho.hoY, this.ho.roc.rcOldX, this.ho.roc.rcOldY, 0, CColMask.CM_TEST_PLATFORM, pt);
        this.ho.hoX = pt.x;
        this.ho.hoY = pt.y;
        this.m_X = pt.x;
        this.m_Y = pt.y;

        // Get the current vector of the ball
        var angle = this.getAngle(this.m_xVector, this.m_yVector);
        var vector = this.getVector(this.m_xVector, this.m_yVector);

        // Finds the shape of the obstacle
        var a;
        var aFound = -1000;
        for (a = 0.0; a < 2.0 * Math.PI; a += Math.PI / 32.0)
        {
            var xVector = 16 * Math.cos(angle + a);
            var yVector = -16 * Math.sin(angle + a);
            var x = this.m_X + xVector;
            var y = this.m_Y + yVector;

            if (this.testPosition(x, y, 0, CColMask.CM_TEST_PLATFORM, false))
            {
                aFound = a;
                break;
            }
        }

        // If nothing is found, simply go backward
        if (aFound == -1000)
        {
            this.m_xVector = -this.m_xVector;
            this.m_yVector = -this.m_yVector;
        }
        else
        {
            // The angle is found, proceed with the bounce
            angle += aFound * 2;
            if (angle > 2.0 * Math.PI)
            {
                angle -= 2.0 * Math.PI;
            }

            // Restores the speed vectors
            this.m_xVector = vector * Math.cos(angle);
            this.m_yVector = -vector * Math.sin(angle);
        }
    },
    
    reverse:function()
    {
        this.m_xVector = -this.m_xVector;
        this.m_yVector = -this.m_yVector;
    },

    start:function()
    {
        this.m_flags &= ~CRunMvtpinball.MFLAG_STOPPED;
    },

    setSpeed:function(speed)
    {
        this.ho.roc.rcSpeed = speed;

        // Gets the current speed vector
        var angle = this.getAngle(this.m_xVector, this.m_yVector);
        var vector = this.getVector(this.m_xVector, this.m_yVector);

        // Changes the current x and y vectors
        this.m_xVector = speed * Math.cos(angle);
        this.m_yVector = -speed * Math.sin(angle);
    },

    setDir:function(dir)
    {
        this.ho.roc.rcDir = dir;

        // Get the current speed vector
        var angle = this.getAngle(this.m_xVector, this.m_yVector);
        var vector = this.getVector(this.m_xVector, this.m_yVector);

        // Converts the angle in 32 directions to a angle in radian
        angle = dir * 2.0 * Math.PI / 32.0;

        // Changes the speeds
        this.m_xVector = vector * Math.cos(angle);
        this.m_yVector = -vector * Math.sin(angle);
    },

    setGravity:function(gravity)
    {
        this.m_gravity = gravity;
    },

    actionEntry:function(action)
    {
        switch (action)
        {
            default:		// SET_INVADERS_SPEED = 3745,
                this.m_gravity = this.getParamDouble();
                break;
        }
        return 0;
    },

    getSpeed:function()
    {
        return this.ho.roc.rcSpeed;
    },

    getDeceleration:function()
    {
        return this.m_deceleration;
    },

    getGravity:function()
    {
        return this.m_gravity;
    }
});
