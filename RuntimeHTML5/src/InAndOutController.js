//----------------------------------------------------------------------------------
//
// CRUNINANDOUTCONTROLLER
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
CRunInAndOutController.ACT_SETOBJECT=0;
CRunInAndOutController.ACT_SETOBJECTFIXED=1;
CRunInAndOutController.ACT_POSITIONIN=2;
CRunInAndOutController.ACT_POSITIONOUT=3;
CRunInAndOutController.ACT_MOVEIN=4;
CRunInAndOutController.ACT_MOVEOUT=5;
CRunInAndOutController.DLL_INANDOUT = "InAndOut";
CRunInAndOutController.ACTION_POSITIONIN=0;
CRunInAndOutController.ACTION_POSITIONOUT=1;
CRunInAndOutController.ACTION_MOVEIN=2;
CRunInAndOutController.ACTION_MOVEOUT=3;


function CRunInAndOutController()
{
	this.currentObject=null;
}

CRunInAndOutController.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 0;
    },

    createRunObject:function(file, cob, version)
    {
        return true;
    },

    action:function(num, act)
    {
        switch (num)
        {
            //*** Set Object
            case CRunInAndOutController.ACT_SETOBJECT:
                this.Action_SetObject_Object(act);
                break;
            case CRunInAndOutController.ACT_SETOBJECTFIXED:
                this.Action_SetObject_FixedValue(act);
                break;
            case CRunInAndOutController.ACT_POSITIONIN:
                this.RACT_POSITIONIN(act);
                break;
            case CRunInAndOutController.ACT_POSITIONOUT:
                this.RACT_POSITIONOUT(act);
                break;
            case CRunInAndOutController.ACT_MOVEIN:
                this.RACT_MOVEIN(act);
                break;
            case CRunInAndOutController.ACT_MOVEOUT:
                this.RACT_MOVEOUT(act);
                break;
        }
    },
    getCurrentObject:function(dllName)
    {
        // No need to search for the object if it's null
        if (this.currentObject == null)
        {
            return null;
        }

        // Enumerate objects
        var hoPtr;
        for (hoPtr = this.ho.getFirstObject(); hoPtr != null; hoPtr = this.ho.getNextObject())
        {
            if (hoPtr == this.currentObject)
            {
                // Check if the object can have movements
                if ((hoPtr.hoOEFlags & CObjectCommon.OEFLAG_MOVEMENTS) != 0)
                {
                    // Test if the object has a movement and this movement is an extension
                    if (hoPtr.roc.rcMovementType == CMoveDef.MVTYPE_EXT)
                    {
                        if (dllName != null)
                        {
                            var ocPtr= hoPtr.hoCommon;
                            var mvPtr= ocPtr.ocMovements.moveList[hoPtr.rom.rmMvtNum];
                            if (CServices.compareStringsIgnoreCase(dllName, mvPtr.moduleName))
                            {
                                return hoPtr;
                            }
                            else
                            {
                                return null;
                            }
                        }
                        else
                        {
                            return hoPtr;
                        }
                    }
                    return null;
                }
            }
        }
        this.currentObject = null;
        return null;
    },

    //*** Set Object
    Action_SetObject_Object:function(act)
    {
        var hoPtr = act.getParamObject(this.rh, 0);
        if ((hoPtr.hoOEFlags & CObjectCommon.OEFLAG_MOVEMENTS) != 0)
        {
            if (hoPtr.roc.rcMovementType == CMoveDef.MVTYPE_EXT)
            {
                this.currentObject = hoPtr;
            }
        }
    },

    Action_SetObject_FixedValue:function(act)
    {
        var fixed = act.getParamExpression(this.rh, 0);
        var hoPtr = this.ho.getObjectFromFixed(fixed);

        if (hoPtr != null)
        {
            if ((hoPtr.hoOEFlags & CObjectCommon.OEFLAG_MOVEMENTS) != 0)
            {
                if (hoPtr.roc.rcMovementType == CMoveDef.MVTYPE_EXT)
                {
                    this.currentObject = hoPtr;
                }
            }
        }
    },
    RACT_POSITIONIN:function(act)
    {
        var object=this.getCurrentObject(CRunInAndOutController.DLL_INANDOUT);
        if (object!=null)
            this.ho.callMovement(object, CRunInAndOutController.ACTION_POSITIONIN, 0);
    },
    RACT_POSITIONOUT:function(act)
    {
        var object=this.getCurrentObject(CRunInAndOutController.DLL_INANDOUT);
        if (object!=null)
            this.ho.callMovement(object, CRunInAndOutController.ACTION_POSITIONOUT, 0);
    },
    RACT_MOVEIN:function(act)
    {
        var object=this.getCurrentObject(CRunInAndOutController.DLL_INANDOUT);
        if (object!=null)
            this.ho.callMovement(object, CRunInAndOutController.ACTION_MOVEIN, 0);
    },
    RACT_MOVEOUT:function(act)
    {
        var object=this.getCurrentObject(CRunInAndOutController.DLL_INANDOUT);
        if (object!=null)
            this.ho.callMovement(object, CRunInAndOutController.ACTION_MOVEOUT, 0);
    },
});
