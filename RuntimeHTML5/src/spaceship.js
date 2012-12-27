//----------------------------------------------------------------------------------
//
// CRunMvtspaceship : Movement spaceship!
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

function CRunMvtspaceship()
{
    this.m_dwPower=0;
    this.m_dwRotationSpeed=0;
    this.m_dwInitialSpeed=0;
    this.m_dwInitialDir=0;
    this.m_dwDeceleration=0;
    this.m_dwGravity=0;
    this.m_dwGravityDir=0;
    this.m_dwPlayer=0;
    this.m_dwButton=0;
    this.m_dwFlags=0;
    
    this.m_X=0;
    this.m_Y=0;
    this.m_xVector=0;
    this.m_yVector=0;
    this.m_xGravity=0;
    this.m_yGravity=0;
    this.m_deceleration=0;
    this.m_power=0;
    this.m_button=0;
    this.m_rotationSpeed=0;
    this.m_rotCounter=0;
    this.m_gravity=0;
    this.m_gravityAngle=0;
    this.m_bStop=false;
    this.m_autoReactor=false;
    this.m_autoRotateRight=false;
    this.m_autoRotateLeft=false;
    this.m_initialSpeed=0;
}

CRunMvtspaceship.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        // Charge les données
        var version = file.readAByte();
        this.m_dwPower = file.readAInt();
        this.m_dwRotationSpeed = file.readAInt();
        this.m_dwInitialSpeed = file.readAInt();
        this.m_dwInitialDir = file.readAInt();
        this.m_dwDeceleration = file.readAInt();
        this.m_dwGravity = file.readAInt();
        this.m_dwGravityDir = file.readAInt();
        this.m_dwPlayer = file.readAInt();
        this.m_dwButton = file.readAInt();
        this.m_dwFlags = file.readAInt();

        // Initialisations
        this.m_X = this.ho.hoX;
        this.m_Y = this.ho.hoY;

        // Finds the initial speed vectors
        this.ho.roc.rcSpeed = this.m_dwInitialSpeed;
        this.ho.roc.rcDir = this.dirAtStart(this.m_dwInitialDir);
        var angle = (this.ho.roc.rcDir * 2 * Math.PI) / 32.0;
        this.m_xVector = this.ho.roc.rcSpeed * Math.cos(angle);
        this.m_yVector = -this.ho.roc.rcSpeed * Math.sin(angle);

        // Calculates the vectors
        this.m_gravity = this.m_dwGravity;
        this.m_gravityAngle = this.dirAtStart(this.m_dwGravityDir);
        angle = (this.m_gravityAngle * 2 * Math.PI) / 32.0;
        this.m_xGravity = this.m_gravity * Math.cos(angle);
        this.m_yGravity = -this.m_gravity * Math.sin(angle);

        // Other values
        this.m_deceleration = this.m_dwDeceleration;
        this.m_rotationSpeed = this.m_dwRotationSpeed;
        this.m_power = this.m_dwPower;
        this.m_button = this.m_dwButton;
        this.m_bStop = false;
        this.ho.roc.rcPlayer = this.m_dwPlayer;
        this.m_rotCounter = 0;

        this.m_autoReactor = false;
        this.m_autoRotateRight = false;
        this.m_autoRotateLeft = false;
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
        var anim = CAnim.ANIMID_WALK;

        if (this.m_bStop == false)
        {
            // Get the joystick
            var j = this.rh.rhPlayer[this.ho.roc.rcPlayer];

            // Rotation of the ship
            if ((j & 15) != 0 || (this.m_autoRotateRight || this.m_autoRotateLeft))
            {
                var rotSpeed = this.m_rotationSpeed;
                if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                {
                    rotSpeed = CServices.floatToInt(( Number(rotSpeed)) * this.ho.hoAdRunHeader.rh4MvtTimerCoef);
                }
                this.m_rotCounter += rotSpeed;
                if (this.m_rotCounter >= 100)
                {
                    this.m_rotCounter -= 100;
                    if ((j & 0x04) != 0 || this.m_autoRotateLeft)
                    {
                        this.m_autoRotateLeft = false;
                        this.ho.roc.rcDir += 1;
                        if (this.ho.roc.rcDir >= 32)
                        {
                            this.ho.roc.rcDir -= 32;
                        }
                    }
                    if ((j & 0x08) != 0 || this.m_autoRotateRight)
                    {
                        this.m_autoRotateRight = false;
                        this.ho.roc.rcDir -= 1;
                        if (this.ho.roc.rcDir < 0)
                        {
                            this.ho.roc.rcDir += 32;
                        }
                    }
                }
            }

            // Movement of the ship
            var mask = 0x01;
            switch (this.m_button)
            {
                case 0:
                    mask = 0x01;
                    break;
                case 1:
                    mask = 0x10;
                    break;
                case 2:
                    mask = 0x20;
                    break;
            }

            var calculs;
            var angle;
            if ((j & mask) != 0 || (this.m_autoReactor))
            {
                angle= (this.ho.roc.rcDir * 2 * Math.PI) / 32.0;

                calculs = this.m_power;
                if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                {
                    calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                }

                var m_xPower = calculs * Math.cos(angle);
                var m_yPower = -calculs * Math.sin(angle);

                this.m_xVector += m_xPower / 150.0;
                this.m_yVector += m_yPower / 150.0;

                anim = CAnim.ANIMID_JUMP;

                // switch off automatic reactor (as have applied it)
                this.m_autoReactor = false;
            }

            // Gravity
            calculs = this.m_xGravity;
            if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
            {
                calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
            }
            this.m_xVector += calculs / 150.0;
            calculs = this.m_yGravity;
            if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
            {
                calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
            }
            this.m_yVector += calculs / 150.0;

            // Deceleration
            angle= this.getAngle(this.m_xVector, this.m_yVector);	// Get the angle and vector
            var vector = this.getVector(this.m_xVector, this.m_yVector);	// Get the angle and vector
            calculs = this.m_deceleration;
            if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
            {
                calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
            }
            vector -= calculs / 250.0;
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

            this.ho.roc.rcSpeed = CServices.floatToInt(vector);
        }

        // Performs the animation
        if (this.ho.roc.rcSpeed > 100)
        {
            this.ho.roc.rcSpeed = 100;
        }
        this.animations(anim);

        // detects the this.collisions
        this.ho.hoX = CServices.floatToInt(this.m_X);
        this.ho.hoY = CServices.floatToInt(this.m_Y);
        this.collisions();

        return true;
    },

    modf:function(value)
    {
        var i = CServices.floatToInt(value);
        return value - i;
    },

    setPosition:function(x, y)
    {
        this.ho.hoX = x;
        this.ho.hoY = y;

        var dummy, frac;
        frac = this.modf(this.m_X);
        this.m_X = x + frac;
        frac = this.modf(this.m_Y);
        this.m_Y = y + frac;
    },

    setXPosition:function(x)
    {
        this.ho.hoX = x;
        var dummy, frac;
        frac = this.modf(this.m_X);
        this.m_X = x + frac;
    },

    setYPosition:function(y)
    {
        this.ho.hoY = y;
        var dummy, frac;
        frac = this.modf(this.m_Y);
        this.m_Y = y + frac;
    },

    stop:function(bCurrent)
    {
        this.m_bStop = true;
    },

    bounce:function(bCurrent)
    {
        if (bCurrent)
        {
            var pt= new CPoint();
            this.approachObject(this.ho.hoX, this.ho.hoY, this.ho.roc.rcOldX, this.ho.roc.rcOldY, 0, CColMask.CM_TEST_PLATFORM, pt);
            this.ho.hoX = pt.x;
            this.ho.hoY = pt.y;
            this.m_X = pt.x;
            this.m_Y = pt.y;
        }
        this.m_xVector = -this.m_xVector;
        this.m_yVector = -this.m_yVector;
    },

    reverse:function()
    {
        this.m_xVector = -this.m_xVector;
        this.m_yVector = -this.m_yVector;
    },

    start:function()
    {
        this.m_bStop = false;
    },

    setSpeed:function(speed)
    {
        if (speed < 0)
        {
            speed = 0;
        }
        if (speed > 100)
        {
            speed = 100;
        }

        var angle = (this.ho.roc.rcDir * 2 * Math.PI) / 32.0;
        this.ho.roc.rcSpeed = speed;
        this.m_xVector = speed * Math.cos(angle);
        this.m_yVector = -speed * Math.sin(angle);
    },

    setDir:function(dir)
    {
        var angle = this.getAngle(this.m_xVector, this.m_yVector);	// Get the angle and vector
        var vector = this.getVector(this.m_xVector, this.m_yVector);
        angle = (dir * 2 * Math.PI) / 32.0;
        this.ho.roc.rcDir = dir;
        this.m_xVector = vector * Math.cos(angle);					// Restores X and Y speeds
        this.m_yVector = -vector * Math.sin(angle);
    },

    setDec:function(dec)
    {
        if (dec < 0)
        {
            dec = 0;
        }
        if (dec > 100)
        {
            dec = 100;
        }
        this.m_deceleration = dec;
	},

    setRotSpeed:function(speed)
    {
        if (speed < 0)
        {
            speed = 0;
        }
        if (speed > 100)
        {
            speed = 100;
        }
        this.m_rotationSpeed = speed;
	},

    setGravity:function(gravity)
    {
        if (gravity < 0)
        {
            gravity = 0;
        }
        if (gravity > 100)
        {
            gravity = 100;
        }

        this.m_gravity = gravity;
        var angle = (this.m_gravityAngle * 2 * Math.PI) / 32.0;
        this.m_xGravity = this.m_gravity * Math.cos(angle);
        this.m_yGravity = -this.m_gravity * Math.sin(angle);
    },

    actionEntry:function(action)
    {
        var param;
        switch (action)
        {
            case 0:		// SPACE_SETPOWER:
                param = CServices.floatToInt(this.getParamDouble());
                if (param < 0)
                {
                    param = 10;
                }
                if (param > 100)
                {
                    param = 100;
                }
                this.m_power = param;
                break;
            case 1:		// SPACE_SETSPEED:
                param = CServices.floatToInt(this.getParamDouble());
                this.setSpeed(param);
                break;
            case 2:		// SPACE_SETDIR:
                param = CServices.floatToInt(this.getParamDouble());
                this.setDir(param);
                break;
            case 3:		// SPACE_SETDEC:
                param = CServices.floatToInt(this.getParamDouble());
                this.setDec(param);
                break;
            case 4:		// SPACE_SETROTSPEED:
                param = CServices.floatToInt(this.getParamDouble());
                this.setRotSpeed(param);
                break;
            case 5:		// SPACE_SETGRAVITY:
                param = CServices.floatToInt(this.getParamDouble());
                this.setGravity(param);
                break;
            case 6:		// SPACE_SETGRAVITYDIR:
                param = CServices.floatToInt(this.getParamDouble());
                var angle2 = (param * 2 * Math.PI) / 32.0;
                this.m_xGravity = this.m_gravity * Math.cos(angle2);
                this.m_yGravity = -this.m_gravity * Math.sin(angle2);
                break;
            case 7:		// SPACE_APPLYREACTOR:
                this.m_autoReactor = true;
                break;
            case 10:		// SPACE_APPLYROTATERIGHT:
                this.m_autoRotateRight = true;
                break;
            case 11:		// SPACE_APPLYROTATELEFT:
                this.m_autoRotateLeft = true;
                break;
            case 12:		// SPACE_GETGRAVITY:
                return this.m_gravity;
            case 13:		// SPACE_GETGRAVITYDIR:
                return this.m_gravityAngle;
            case 14:		// SPACE_GETDECELERATION:
                return this.m_deceleration;
            case 15:		// PACE_GETROTATIONSPEED:
                return this.m_rotationSpeed;
            case 16:		// SPACE_GETTHRUSTPOWER:
                return this.m_power;
        }
        return 0;
    },

    getSpeed:function()
    {
        return this.ho.roc.rcSpeed;
    },

    getAcceleration:function()
    {
        return CServices.floatToInt(this.m_power);
    },

    getDeceleration:function()
    {
        return CServices.floatToInt(this.m_deceleration);
    },

    getGravity:function()
    {
        return CServices.floatToInt(this.m_gravity);
    }
});
