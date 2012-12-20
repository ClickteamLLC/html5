//----------------------------------------------------------------------------------
//
// CRUNMVTPRESENTAION
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

CRunMvtclickteam_presentation.IDENTIFIER=3;

//*** Fly In/Out effects
CRunMvtclickteam_presentation.FLYEFFECT_NONE = 0;
CRunMvtclickteam_presentation.FLYEFFECT_APPEAR=1;
CRunMvtclickteam_presentation.FLYEFFECT_BOTTOM=2;
CRunMvtclickteam_presentation.FLYEFFECT_LEFT=3;
CRunMvtclickteam_presentation.FLYEFFECT_RIGHT=4;
CRunMvtclickteam_presentation.FLYEFFECT_TOP=5;

//*** Movement status
CRunMvtclickteam_presentation.STOPPED = 0;
CRunMvtclickteam_presentation.ENTRANCE=1;
CRunMvtclickteam_presentation.EXIT=2;

//*** Speed
CRunMvtclickteam_presentation.SPEED_VERYSLOW = 0;
CRunMvtclickteam_presentation.SPEED_SLOW=1;
CRunMvtclickteam_presentation.SPEED_MEDIUM=2;
CRunMvtclickteam_presentation.SPEED_FAST=3;
CRunMvtclickteam_presentation.SPEED_VERYFAST=4;

//*** Global settings
CRunMvtclickteam_presentation.GLOBAL_AUTOCONTROL = 1;
CRunMvtclickteam_presentation.GLOBAL_AUTOFRAMEJUMP = 2;
CRunMvtclickteam_presentation.GLOBAL_AUTOCOMPLETE = 4;

function CRunMvtclickteam_presentation()
{
    this.m_dwEntranceType=0;
    this.m_dwEntranceSpeed=0;
    this.m_dwEntranceOrder=0;
    this.m_dwExitType=0;
    this.m_dwExitSpeed=0;
    this.m_dwExitOrder=0;
    this.m_dwFlagsGlobalSettings=0;
    
    this.pLPHO=null;
    this.initialX=0;
    this.initialY=0;
    this.startEntranceX=0;
    this.startEntranceY=0;
    this.entranceEffect=0;
    this.entranceOrder=0;
    this.entranceSpeed=0;
    this.entranceSpeedX=0;
    this.entranceSpeedY=0;
    this.finalExitX=0;
    this.finalExitY=0;
    this.exitEffect=0;
    this.exitOrder=0;
    this.exitSpeed=0;
    this.exitSpeedX=0;
    this.exitSpeedY=0;
    this.isMoving=0;
}

CRunMvtclickteam_presentation.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        file.skipBytes(1);
        this.m_dwEntranceType = file.readAInt();
        this.m_dwEntranceSpeed = file.readAInt();
        this.m_dwEntranceOrder = file.readAInt();
        this.m_dwExitType = file.readAInt();
        this.m_dwExitSpeed = file.readAInt();
        this.m_dwExitOrder = file.readAInt();
        this.m_dwFlagsGlobalSettings = file.readAInt();

        var data = (this.rh.getStorage(CRunMvtclickteam_presentation.IDENTIFIER));
        if (data == null)
        {
            data = new CRunMvtGlobalPres();
            data.count = 1;
            this.rh.addStorage(data, CRunMvtclickteam_presentation.IDENTIFIER);
            data.myList = new CArrayList();
        }

        // Store pointer to edit data
        this.pLPHO = this.ho;
        this.initialX = this.ho.hoX;
        this.initialY = this.ho.hoY;
        this.isMoving = CRunMvtclickteam_presentation.STOPPED;

        //*** Adds this object to the end of our list
        data.myList.add(this);

        data.autoControl = ((this.m_dwFlagsGlobalSettings & CRunMvtclickteam_presentation.GLOBAL_AUTOCONTROL) != 0);
        data.autoFrameJump = ((this.m_dwFlagsGlobalSettings & CRunMvtclickteam_presentation.GLOBAL_AUTOFRAMEJUMP) != 0);
        data.autoComplete = ((this.m_dwFlagsGlobalSettings & CRunMvtclickteam_presentation.GLOBAL_AUTOCOMPLETE) != 0);
    },

    reset:function(data)
    {
        //*******************************************
        //*** Entrance parameters *******************
        //*******************************************
        this.entranceEffect = this.m_dwEntranceType;
        this.entranceOrder = this.m_dwEntranceOrder;

        if (this.entranceOrder == 0 && this.entranceEffect != CRunMvtclickteam_presentation.FLYEFFECT_NONE)
        {
            this.isMoving = CRunMvtclickteam_presentation.ENTRANCE;
        }

        if (this.entranceOrder > data.finalOrder && this.entranceEffect != CRunMvtclickteam_presentation.FLYEFFECT_NONE)
        {
            data.finalOrder = this.entranceOrder;
        }

        switch (this.m_dwEntranceSpeed)
        {
            case 0:	    // CRunMvtclickteam_presentation.SPEED_VERYSLOW:
                this.entranceSpeed = 1;
                break;
            case 1:	    // CRunMvtclickteam_presentation.SPEED_SLOW:
                this.entranceSpeed = 2;
                break;
            case 2:	    // CRunMvtclickteam_presentation.SPEED_MEDIUM:
                this.entranceSpeed = 4;
                break;
            case 3:	    // CRunMvtclickteam_presentation.SPEED_FAST:
                this.entranceSpeed = 8;
                break;
            case 4:	    // CRunMvtclickteam_presentation.SPEED_VERYFAST:
                this.entranceSpeed = 16;
                break;
        }

        switch (this.entranceEffect)
        {
            case 0:	    // CRunMvtclickteam_presentation.FLYEFFECT_NONE:
                this.entranceOrder = -1;
                break;
            case 1:	    // CRunMvtclickteam_presentation.FLYEFFECT_APPEAR:
                this.startEntranceX = this.initialX;
                this.startEntranceY = -10 - this.pLPHO.hoImgWidth + this.pLPHO.hoImgXSpot;
                this.entranceSpeedX = 0;
                this.entranceSpeedY = 0;
                break;
            case 2:	    // CRunMvtclickteam_presentation.FLYEFFECT_BOTTOM:
                this.startEntranceX = this.initialX;
                this.startEntranceY = this.pLPHO.hoAdRunHeader.rhLevelSy + 10 - this.pLPHO.hoImgYSpot;
                this.entranceSpeedX = 0;
                this.entranceSpeedY = this.entranceSpeed;
                break;
            case 3:	    // CRunMvtclickteam_presentation.FLYEFFECT_LEFT:
                this.startEntranceX = -10 - this.pLPHO.hoImgWidth + this.pLPHO.hoImgXSpot;
                this.startEntranceY = this.initialY;
                this.entranceSpeedX = this.entranceSpeed;
                this.entranceSpeedY = 0;
                break;
            case 4:	    // CRunMvtclickteam_presentation.FLYEFFECT_RIGHT:
                this.startEntranceX = this.pLPHO.hoAdRunHeader.rhLevelSx + 10 - this.pLPHO.hoImgXSpot;
                this.startEntranceY = this.initialY;
                this.entranceSpeedX = this.entranceSpeed;
                this.entranceSpeedY = 0;
                break;
            case 5:	    // CRunMvtclickteam_presentation.FLYEFFECT_TOP:
                this.startEntranceX = this.initialX;
                this.startEntranceY = -10 - this.pLPHO.hoImgHeight + this.pLPHO.hoImgYSpot;
                this.entranceSpeedX = 0;
                this.entranceSpeedY = this.entranceSpeed;
                break;
        }

        //*******************************************
        //*** Exit parameters ***********************
        //*******************************************
        this.exitEffect = this.m_dwExitType;
        this.exitOrder = this.m_dwExitOrder;

        if (this.exitOrder == 0 && this.exitEffect != CRunMvtclickteam_presentation.FLYEFFECT_NONE)
        {
            this.isMoving = CRunMvtclickteam_presentation.EXIT;
        }

        if (this.exitOrder > data.finalOrder && this.exitEffect != CRunMvtclickteam_presentation.FLYEFFECT_NONE)
        {
            data.finalOrder = this.exitOrder;
        }

        switch (this.m_dwExitSpeed)
        {
            case 0:	    // CRunMvtclickteam_presentation.SPEED_VERYSLOW:
                this.exitSpeed = 1;
                break;
            case 1:	    // CRunMvtclickteam_presentation.SPEED_SLOW:
                this.exitSpeed = 2;
                break;
            case 2:	    // CRunMvtclickteam_presentation.SPEED_MEDIUM:
                this.exitSpeed = 4;
                break;
            case 3:	    // CRunMvtclickteam_presentation.SPEED_FAST:
                this.exitSpeed = 8;
                break;
            case 4:	    // CRunMvtclickteam_presentation.SPEED_VERYFAST:
                this.exitSpeed = 16;
                break;
        }

        switch (this.exitEffect)
        {
            case 0:	    // CRunMvtclickteam_presentation.FLYEFFECT_NONE:
                this.exitOrder = -1;
                break;
            case 1:	    // CRunMvtclickteam_presentation.FLYEFFECT_APPEAR:
                this.finalExitX = this.initialX;
                this.finalExitY = -10 - this.pLPHO.hoImgHeight;
                this.exitSpeedX = 0;
                this.exitSpeedY = 0;
                break;
            case 2:	    // CRunMvtclickteam_presentation.FLYEFFECT_BOTTOM:
                this.finalExitX = this.initialX;
                this.finalExitY = this.pLPHO.hoAdRunHeader.rhLevelSy + 10 - this.pLPHO.hoImgYSpot;
                this.exitSpeedX = 0;
                this.exitSpeedY = this.exitSpeed;
                break;
            case 3:	    // CRunMvtclickteam_presentation.FLYEFFECT_LEFT:
                this.finalExitX = -10 - this.pLPHO.hoImgWidth + this.pLPHO.hoImgXSpot;
                this.finalExitY = this.initialY;
                this.exitSpeedX = this.exitSpeed;
                this.exitSpeedY = 0;
                break;
            case 4:	    // CRunMvtclickteam_presentation.FLYEFFECT_RIGHT:
                this.finalExitX = this.pLPHO.hoAdRunHeader.rhLevelSx + 10 - this.pLPHO.hoImgXSpot;
                this.finalExitY = this.initialY;
                this.exitSpeedX = this.exitSpeed;
                this.exitSpeedY = 0;
                break;
            case 5:	    // CRunMvtclickteam_presentation.FLYEFFECT_TOP:
                this.finalExitX = this.initialX;
                this.finalExitY = -10 - this.pLPHO.hoImgHeight + this.pLPHO.hoImgYSpot;
                this.exitSpeedX = 0;
                this.exitSpeedY = this.exitSpeed;
                break;
        }

        //**************************************
        //*** Calculate the initial position ***
        //**************************************
        if (this.exitOrder == -1)
        {
            if (this.entranceOrder != -1)
            {
                this.pLPHO.hoX = this.startEntranceX;
                this.pLPHO.hoY = this.startEntranceY;
                this.pLPHO.roc.rcChanged=true;
            }
        }
        else if (this.entranceOrder != -1 && this.exitOrder != -1)
        {
            if (this.exitOrder > this.entranceOrder)
            {
                this.pLPHO.hoX = this.startEntranceX;
                this.pLPHO.hoY = this.startEntranceY;
                this.pLPHO.roc.rcChanged=true;
            }
        }
    },
    
    moveToEnd:function()
    {
        if (this.entranceOrder != -1 && this.exitOrder == -1)
        {
            this.pLPHO.hoX = this.initialX;
            this.pLPHO.hoY = this.initialY;
            this.pLPHO.roc.rcChanged=true;
        }
        else if (this.entranceOrder == -1 && this.exitOrder != -1)
        {
            this.pLPHO.hoX = this.finalExitX;
            this.pLPHO.hoY = this.finalExitY;
            this.pLPHO.roc.rcChanged=true;
        }
        else if (this.entranceOrder != -1 && this.exitOrder != -1)
        {
            if (this.entranceOrder > this.exitOrder)
            {
                this.pLPHO.hoX = this.initialX;
                this.pLPHO.hoY = this.initialY;
            }
            else
            {
                this.pLPHO.hoX = this.finalExitX;
                this.pLPHO.hoY = this.finalExitY;
            }
            this.pLPHO.roc.rcChanged=true;
        }
    },

    checkKeyPresses:function(data)
    {
        //*** Has the user pressed a key so we need to increase / decrease the order?

        //*******************************
        //*** Check move foward keys    *
        //*******************************
        if (data.keyNext == 0)
        {
            if (this.ho.hoAdRunHeader.rhApp.getKeyState(40))	    // VK_DOWN
            {
                data.keyNext = 40;			// VK_DOWN;
                this.moveForward();
            }
            else if (this.ho.hoAdRunHeader.rhApp.getKeyState(39))	// VK_RIGHT
            {
                data.keyNext = 39;			// VK_RIGHT;
                this.moveForward();
            }
        }
        else if (this.ho.hoAdRunHeader.rhApp.getKeyState(data.keyNext) == false)
        {
            data.keyNext = 0;
        }

        //*******************************
        //*** Check move backwards keys *
        //*******************************
        if (data.keyPrev == 0)
        {
            if (this.ho.hoAdRunHeader.rhApp.getKeyState(38))	// VK_UP
            {
                data.keyPrev = 38;		// VK_UP;
                moveBack();
            }
            else if (this.ho.hoAdRunHeader.rhApp.getKeyState(37))	// VK_LEFT
            {
                data.keyPrev = 37;		// VK_LEFT;
                moveBack();
            }
        }
        else if (this.ho.hoAdRunHeader.rhApp.getKeyState(data.keyPrev) == false)
        {
            data.keyPrev = 0;
        }
    },

    kill:function()
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_presentation.IDENTIFIER));
        if (data != null)
        {
            data.count--;
            if (data.count == 0)
            {
                this.rh.delStorage(CRunMvtclickteam_presentation.IDENTIFIER);
            }
        }
    },

    move:function()
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_presentation.IDENTIFIER));
        if (data == null)
        {
            return false;
        }

        //************************
        //*** Reset workaround ***
        //************************
        var p;
        if (data.reset)
        {
            if (this.ho.hoImgHeight != 0)
            {
                var index;
                for (index = 0; index < data.myList.size(); index++)
                {
                    p = (data.myList.get(index));
                    p.reset(data);
                    if (data.resetToEnd)
                    {
                        p.moveToEnd();
                    }
                }
                if (data.resetToEnd)
                {
                    data.orderPosition = data.finalOrder;
                }
                data.reset = false;
                data.resetToEnd = false;
            }
            else
            {
                return false;
            }
        }

        if (data.myList.size() > 0)
        {
            p = (data.myList.get(0));
            if (p == this)
            {
                this.checkKeyPresses(data);
            }
        }

        //************************
        //*** Move Object ********
        //************************
        var calculs;
        if (this.isMoving == CRunMvtclickteam_presentation.ENTRANCE)
        {
            this.animations(CAnim.ANIMID_WALK);

            //*** Entrance movement
            switch (this.entranceEffect)
            {
                case 1:	    // CRunMvtclickteam_presentation.FLYEFFECT_APPEAR:
                    this.ho.hoX = this.initialX;
                    this.ho.hoY = this.initialY;
                    this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    break;
                case 2:	    // CRunMvtclickteam_presentation.FLYEFFECT_BOTTOM:
                    calculs = this.entranceSpeedY;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.ho.hoY -= Math.min(calculs, Math.abs(this.initialY - this.ho.hoY));
                    if (this.ho.hoY == this.initialY)
                    {
                        this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    }
                    break;
                case 3:	    // CRunMvtclickteam_presentation.FLYEFFECT_LEFT:
                    calculs = this.entranceSpeedX;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.ho.hoX += Math.min(calculs, Math.abs(this.initialX - this.ho.hoX));
                    if (this.ho.hoX == this.initialX)
                    {
                        this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    }
                    break;
                case 4:	    // CRunMvtclickteam_presentation.FLYEFFECT_RIGHT:
                    calculs = this.entranceSpeedX;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.ho.hoX -= Math.min(calculs, Math.abs(this.initialX - this.ho.hoX));
                    if (this.ho.hoX == this.initialX)
                    {
                        this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    }
                    break;
                case 5:	    // CRunMvtclickteam_presentation.FLYEFFECT_TOP:
                    calculs = this.entranceSpeedY;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.ho.hoY += Math.min(calculs, Math.abs(this.initialY - this.ho.hoY));
                    if (this.ho.hoY == this.initialY)
                    {
                        this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    }
                    break;
            }
            this.collisions();
            return true;
        }
        else if (this.isMoving == CRunMvtclickteam_presentation.EXIT)
        {
            this.animations(CAnim.ANIMID_WALK);

            //*** Exit movement
            switch (this.exitEffect)
            {
                case 1:	    // CRunMvtclickteam_presentation.FLYEFFECT_APPEAR:
                    this.ho.hoY = this.finalExitY;
                    this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    break;
                case 2:	    // CRunMvtclickteam_presentation.FLYEFFECT_BOTTOM:
                    calculs = this.exitSpeedY;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.ho.hoY += Math.min(calculs, Math.abs(this.finalExitY - this.ho.hoY));
                    if (this.ho.hoY >= this.finalExitY)
                    {
                        this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    }
                    break;
                case 3:	    // CRunMvtclickteam_presentation.FLYEFFECT_LEFT:
                    calculs = this.exitSpeedX;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.ho.hoX -= Math.min(calculs, Math.abs(this.finalExitX - this.ho.hoX));
                    if (this.ho.hoX <= this.finalExitX)
                    {
                        this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    }
                    break;
                case 4:	    // CRunMvtclickteam_presentation.FLYEFFECT_RIGHT:
                    calculs = this.exitSpeedX;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.ho.hoX += Math.min(calculs, Math.abs(this.finalExitX - this.ho.hoX));
                    if (this.ho.hoX >= this.finalExitX)
                    {
                        this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    }
                    break;
                case 5:	    // CRunMvtclickteam_presentation.FLYEFFECT_TOP:
                    calculs = this.exitSpeedY;
                    if ((this.ho.hoAdRunHeader.rhFrame.leFlags & CRunFrame.LEF_TIMEDMVTS) != 0)
                    {
                        calculs = calculs * this.ho.hoAdRunHeader.rh4MvtTimerCoef;
                    }
                    this.ho.hoY -= Math.min(calculs, Math.abs(this.finalExitY - this.ho.hoY));
                    if (this.ho.hoY <= this.finalExitY)
                    {
                        this.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    }
                    break;
            }
            this.collisions();
            return true;
        }
        this.animations(CAnim.ANIMID_STOP);
        this.collisions();

        //** The object has not been moved
        return this.ho.roc.rcChanged;
    },

    moveForward:function()
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_presentation.IDENTIFIER));
        if (data != null)
        {
            var index;
            var p;
            for (index = 0; index < data.myList.size(); index++)
            {
                p = (data.myList.get(index));

                //*** Find any objects that did not complete from the last move and complete them!
                if (data.autoComplete)
                {
                    if (p.entranceOrder == data.orderPosition && p.isMoving != CRunMvtclickteam_presentation.STOPPED)
                    {
                        p.pLPHO.hoX = p.initialX;
                        p.pLPHO.hoY = p.initialY;
                        p.isMoving = CRunMvtclickteam_presentation.STOPPED;
                        p.pLPHO.roc.rcChanged=true;
                    }
                    if (p.exitOrder == data.orderPosition && p.isMoving != CRunMvtclickteam_presentation.STOPPED)
                    {
                        p.pLPHO.hoX = p.finalExitX;
                        p.pLPHO.hoY = p.finalExitY;
                        p.isMoving = CRunMvtclickteam_presentation.STOPPED;
                        p.pLPHO.roc.rcChanged=true;
                    }
                }

                //*** Find any objects to move at this order : Entrance
                if (p.entranceOrder == (data.orderPosition + 1))
                {
                    p.pLPHO.hoX = p.startEntranceX;
                    p.pLPHO.hoY = p.startEntranceY;
                    p.isMoving = CRunMvtclickteam_presentation.ENTRANCE;
                    p.pLPHO.roc.rcChanged=true;
                }
                //*** Find any objects to move at this order : Exit
                if (p.exitOrder == (data.orderPosition + 1))
                {
                    p.isMoving = CRunMvtclickteam_presentation.EXIT;
                }
            }
            data.orderPosition++;

            if (data.orderPosition > data.finalOrder && data.autoFrameJump == true)
            {
                this.ho.hoAdRunHeader.rhQuit = CRun.LOOPEXIT_NEXTLEVEL;
            }
        }
    },

    moveBack:function()
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_presentation.IDENTIFIER));
        if (data != null)
        {
            var index;
            var p;
            for (index = 0; index < data.myList.size(); index++)
            {
                p = (data.myList.get(index));

                //*** Find any objects from the last move and reset them!
                if (p.entranceOrder == data.orderPosition)
                {
                    p.pLPHO.hoX = p.startEntranceX;
                    p.pLPHO.hoY = p.startEntranceY;
                    p.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    p.pLPHO.roc.rcChanged=true;
                }
                if (p.exitOrder == data.orderPosition)
                {
                    p.pLPHO.hoX = p.initialX;
                    p.pLPHO.hoY = p.initialY;
                    p.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    p.pLPHO.roc.rcChanged=true;
                }
            }
            data.orderPosition--;

            if (data.orderPosition < 0)
            {
                if (data.autoFrameJump && this.ho.hoAdRunHeader.rhApp.currentFrame != 0)
                {
                    data.resetToEnd = true;
                    this.ho.hoAdRunHeader.rhQuit = CRun.LOOPEXIT_PREVLEVEL;
                }
                else
                {
                    data.orderPosition = 0;
                }
            }
        }
    },

    setPosition:function(x, y)
    {
        this.ho.hoX = x;
        this.ho.hoY = y;
    },

    setXPosition:function(x)
    {
        this.ho.hoX = x;
    },

    setYPosition:function(y)
    {
        this.ho.hoY = y;
    },

    actionEntry:function(action)
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_presentation.IDENTIFIER));
        if (data == null)
        {
            return 0;
        }

        var param;
        var index;
        var p;
        switch (action)
        {
            case 3945:		// SET_PRESENTATION_Next = 3945,
                this.moveForward();
                break;
            case 3946:		// SET_PRESENTATION_Prev,
                this.moveBack();
                break;
            case 3947:		// SET_PRESENTATION_ToStart,
                for (index = 0; index < data.myList.size(); index++)
                {
                    p = (data.myList.get(index));
                    p.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    p.reset(data);
                }
                data.orderPosition = 0;
                break;
            case 3948:		// SET_PRESENTATION_ToEnd,
                for (index = 0; index < data.myList.size(); index++)
                {
                    p = (data.myList.get(index));
                    p.isMoving = CRunMvtclickteam_presentation.STOPPED;
                    p.moveToEnd();
                }
                data.orderPosition = data.finalOrder;
                break;
            case 3949:		// GET_PRESENTATION_Index,
                return data.orderPosition;
            case 3950:		// GET_PRESENTATION_LastIndex
                return data.finalOrder;
        }
        return 0;
    }
});

function CRunMvtGlobalPres()
{
    this.count=0;
    this.orderPosition=0;
    this.finalOrder= -1;
    this.keyNext= 0;
    this.keyPrev= 0;
    this.reset = true;
    this.resetToEnd = false;
    this.autoControl = true;
    this.autoFrameJump = true;
    this.autoComplete = true;
    this.myList = null;
}

