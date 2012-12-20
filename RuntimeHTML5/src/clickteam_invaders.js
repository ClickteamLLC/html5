//----------------------------------------------------------------------------------
//
// CRUNMVTINVADERS
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
CRunMvtclickteam_invaders.IDENTIFIER=2;

function CRunMvtclickteam_invaders()
{
}
CRunMvtclickteam_invaders.prototype=CServices.extend(new CRunMvtExtension(),
{
    initialize:function(file)
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_invaders.IDENTIFIER));
        if (data == null)
        {
            file.skipBytes(1);
            var m_dwFlagMoveAtStart = file.readAInt();
            var m_dwFlagAutoSpeed = file.readAInt();
            var m_dwInitialDirection = file.readAInt();
            var m_dwDX = file.readAInt();
            var m_dwDY = file.readAInt();
            var m_dwSpeed = file.readAInt();
            var m_dwGroup = file.readAInt();

            data = new CRunMvtGlobalDataInvader();
            data.count = 0;

            if (m_dwFlagMoveAtStart == 1)
            {
                data.isMoving = true;
            }
            else
            {
                data.isMoving = false;
            }

            data.autoSpeed = m_dwFlagAutoSpeed == 1;
            data.dx = m_dwDX;
            data.dy = m_dwDY;
            data.minX = 0;
            data.maxX = this.ho.hoAdRunHeader.rhLevelSx;
            data.initialSpeed = m_dwSpeed;
            if (m_dwInitialDirection == 0)
            {
                data.cdx = -data.dx;
            }
            else
            {
                data.cdx = data.dx;
            }
            data.speed = 101 - data.initialSpeed;

            data.myList = new CArrayList();
            this.rh.addStorage(data, CRunMvtclickteam_invaders.IDENTIFIER);
        }
        //*** Adds this object to the end of our list
        data.count++;
        data.myList.add(this.ho);
    },

    kill:function()
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_invaders.IDENTIFIER));
        if (data != null)
        {
            var n;
            for (n = 0; n < data.myList.size(); n++)
            {
                var obj = (data.myList.get(n));
                if (obj == (this.ho))
                {
                    data.myList.removeIndex(n);
                    break;
                }
            }
            data.count--;
            if (data.count == 0)
            {
                this.rh.delStorage(CRunMvtclickteam_invaders.IDENTIFIER);
            }
        }
    },

    move:function()
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_invaders.IDENTIFIER));
        if (data != null)
        {
            if (!data.isMoving)
            {
                return false;
            }
            if (data.myList.size() > 0)
            {
                var myObject = (data.myList.get(0));
                if (myObject == this.ho)
                {
                    data.frames++;
                    if (data.frames % data.speed == 0)
                    {
                        data.cdy = 0;

                        //*** Loop over all objects to ensure non have left the playing field
                        var index;
                        var hoPtr;
                        for (index = 0; index < data.myList.size(); index++)
                        {
                            hoPtr = (data.myList.get(index));
                            if ((hoPtr.hoX < data.minX + hoPtr.hoImgXSpot) && data.cdx < 0)
                            {
                                data.cdx = data.dx;
                                data.cdy = data.dy;
                                break;
                            }
                            else if (hoPtr.hoX > (data.maxX + hoPtr.hoImgXSpot - hoPtr.hoImgWidth) && data.cdx > 0)
                            {
                                data.cdx = -data.dx;
                                data.cdy = data.dy;
                                break;
                            }
                        }

                        //*** Loop over all objects and move them
                        for (index = 0; index < data.myList.size(); index++)
                        {
                            hoPtr = (data.myList.get(index));
                            if (data.cdy != 0)
                            {
                                hoPtr.hoY = (hoPtr.hoY + data.cdy);
						        this.ho.roc.rcAnim = CAnim.ANIMID_WALK;
                                if (hoPtr.roa!=null)
                                {
                                	hoPtr.roa.animations();
                                }
                                this.moveIt();
                            }
                            else
                            {
                                hoPtr.hoX = (hoPtr.hoX + data.cdx);
						        this.ho.roc.rcAnim = CAnim.ANIMID_WALK;
                                if (hoPtr.roa!=null)
                                {
                                	hoPtr.roa.animations();
                                }
                                this.moveIt();
                            }
                        }
                    }
                }
            }
            //*** Objects have been moved return true
            if (data.frames % data.speed == 0)
            {
                return true;
            }
        }
        //** The object has not been moved
        return false;
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

    stop:function(bCurrent)
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_invaders.IDENTIFIER));
        if (data != null)
        {
            data.isMoving = false;
        }
	},

    reverse:function()
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_invaders.IDENTIFIER));
        if (data != null)
        {
            data.cdx *= -1;
        }
    },

    start:function()
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_invaders.IDENTIFIER));
        if (data != null)
        {
            data.isMoving = true;
        }
    },

    setSpeed:function(speed)
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_invaders.IDENTIFIER));
        if (data != null)
        {
            data.speed = 101 - speed;
            if (data.speed < 1)
            {
                data.speed = 1;
            }
        }
    },

    actionEntry:function(action)
    {
        var data = (this.rh.getStorage(CRunMvtclickteam_invaders.IDENTIFIER));
        if (data == null)
        {
            return 0;
        }

        var param;
        switch (action)
        {
            case 3745:		// SET_INVADERS_SPEED = 3745,
                param = this.getParamDouble();
                data.speed = param;
                if (data.speed < 1)
                {
                    data.speed = 1;
                }
                break;
            case 3746:		// SET_INVADERS_STEPX,
                param = this.getParamDouble();
                data.dx = param;
                break;
            case 3747:		// SET_INVADERS_STEPY,
                param = this.getParamDouble();
                data.dy = param;
                break;
            case 3748:		// SET_INVADERS_LEFTBORDER,
                param = this.getParamDouble();
                data.minX = param;
                break;
            case 3749:		// SET_INVADERS_RIGHTBORDER,
                param = this.getParamDouble();
                data.maxX = param;
                break;
            case 3750:		// GET_INVADERS_SPEED,
                return data.speed;
            case 3751:		// GET_INVADERS_STEPX,
                return data.dx;
            case 3752:		// GET_INVADERS_STEPY,
                return data.dy;
            case 3753:		// GET_INVADERS_LEFTBORDER,
                return data.minX;
            case 3754:		// GET_INVADERS_RIGHTBORDER,
                return data.maxX;
        }
        return 0;
    }
});

function CRunMvtGlobalDataInvader()
{
    this.count=0;
    this.tillSpeedIncrease=0;
    this.dx = 1;
    this.dy = 0;
    this.cdx = 0;
    this.cdy = 0;
    this.speed = 0;
    this.frames = 0;
    this.initialSpeed = 0;
    this.minX = 0;
    this.maxX = 640;
    this.isMoving = false;
    this.autoSpeed = false;
    this.myList = null;		
}

