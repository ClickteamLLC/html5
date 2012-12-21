//----------------------------------------------------------------------------------
//
// CRunForEach
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
CRunForEach.CON_ONFOREACHLOOPSTRING = 0;
CRunForEach.CON_FOREACHLOOPISPAUSED = 1;
CRunForEach.CON_OBJECTISPARTOFLOOP = 2;
CRunForEach.CON_OBJECTISPARTOFGROUP = 3;
CRunForEach.CON_ONFOREACHLOOPOBJECT = 4;
CRunForEach.CON_LAST = 5;
CRunForEach.ACT_STARTFOREACHLOOPFOROBJECT = 0;
CRunForEach.ACT_PAUSEFOREACHLOOP = 1;
CRunForEach.ACT_RESUMEFOREACHLOOP = 2;
CRunForEach.ACT_SETFOREACHLOOPITERATION = 3;
CRunForEach.ACT_STARTFOREACHLOOPFORGROUP = 4;
CRunForEach.ACT_ADDOBJECTTOGROUP = 5;
CRunForEach.ACT_ADDFIXEDTOGROUP = 6;
CRunForEach.ACT_REMOVEOBJECTFROMGROUP = 7;
CRunForEach.ACT_REMOVEFIXEDFROMGROUP = 8;
CRunForEach.EXP_LOOPFV = 0;
CRunForEach.EXP_LOOPITERATION = 1;
CRunForEach.EXP_LOOPMAXITERATION = 2;
CRunForEach.EXP_GROUPSIZE = 3;

function CRunForEach()
{
    this.name=null;
    this.fvs=new CArrayList();
    this.loopIndex=0;
    this.loopMax=0;
    this.paused=false;
    this.forEachLoops=null; // Name => ForEachLoop lookup
    this.pausedLoops=null; // Name => Paused ForEachLoop lookup
    this.groups=null;// Groupname => CArrayList of objects
    this.currentForEach=null;
    this.currentGroup=null;
    this.selection=null;
    this.currentLooped=null;

    //Variables for the ObjectSelection framework to access
    this.populateLoop=null; //To fill with all currently selected objects
    this.partOfLoop=null; //To access the loop in question
    this.partOfGroup=null; //To access the group in question
    this.oiToCheck=0;	
}
CRunForEach.prototype = CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return CRunForEach.CON_LAST;
    },

	createRunObject:function(file, cob, version)
    {
        this.currentGroup = null;

        this.forEachLoops = new Array();
        this.pausedLoops = new Array();
        this.groups = new Array();

        this.selection = new ObjectSelection (this.rh.rhApp);

        return true;
    },
    
    condition:function(num, cnd)
    {
        switch (num)
        {
            case CRunForEach.CON_ONFOREACHLOOPSTRING:
                return cnd.getParamExpString(this.rh, 0)==this.currentForEach.name;

            case CRunForEach.CON_FOREACHLOOPISPAUSED:
            {
                var loop = this.forEachLoops[cnd.getParamExpString(this.rh, 0)];
                return loop != null && loop.paused == true;
            }

            case CRunForEach.CON_OBJECTISPARTOFLOOP:
            {
                var param = cnd.getParamObject (this.rh, 0);

                if ((partOfLoop = this.forEachLoops[cnd.getParamExpString (this.rh, 1)]) == null)
                    return false;

                this.oiToCheck = param.oi;

                return this.selection.filterObjects(this, this.oiToCheck, (cnd.evtFlags2 & CEvent.EVFLAG2_NOT) != 0, this.filterPartOfLoop);
            }

            case CRunForEach.CON_OBJECTISPARTOFGROUP:
            {
                var param = cnd.getParamObject (rh, 0);

                if ((this.partOfGroup = this.groups[cnd.getParamExpString(this.rh, 1)]) == null)
                    return false;

                this.oiToCheck = param.oi;

                return this.selection.filterObjects(this, this.oiToCheck, (cnd.evtFlags2 & CEvent.EVFLAG2_NOT) != 0, this.filterPartOfGroup);
            }

            case CRunForEach.CON_ONFOREACHLOOPOBJECT:

                if(this.currentForEach != null && cnd.getParamExpString(this.rh, 0)==this.currentForEach.name)
                {
                    this.selection.selectOneObject(this.currentLooped);
                    return true;
                }

                return false;
        }

        return false;
    },

    action:function(num, act)
    {
        switch (num)
        {
            case CRunForEach.ACT_STARTFOREACHLOOPFOROBJECT:
            {
                var loopName = act.getParamExpString (this.rh, 0);
                var objectType = act.getParamObject (this.rh, 1);

                if(objectType == null)
                    break;

                var oi = objectType.hoOi;

                var loop = new ForEachLoop ();
                this.populateLoop = loop;

                //Populate the current foreachloop with all the fixed values of the currently selected objects
                this.selection.filterObjects(this, oi, false, filterGetSelected);

                loop.name = loopName;
                loop.loopMax = loop.fvs.size();

                this.executeForEachLoop (loop);

                break;
            }
            case CRunForEach.ACT_PAUSEFOREACHLOOP:
            {
                var loop = this.forEachLoops[act.getParamExpString (this.rh, 0)];
                if(loop != null){
                    loop.paused = true;
                }
                break;
            }
            case CRunForEach.ACT_RESUMEFOREACHLOOP:
            {
                var loopName = act.getParamExpString (this.rh, 0);
                var loop = this.forEachLoops[loopName];
                if(loop != null)
                {
                    loop.paused = false;
                    this.pausedLoops.splice(loopName, 1);
                    this.executeForEachLoop(loop);
                }
                break;
            }
            case CRunForEach.ACT_SETFOREACHLOOPITERATION:
            {
                var loop = this.forEachLoops[act.getParamExpString(this.rh, 0)];
                if(loop != null)
                {
                    loop.loopIndex = act.getParamExpression(this.rh, 1);
                }
                break;
            }
            case CRunForEach.ACT_STARTFOREACHLOOPFORGROUP:
            {
                var loopName = act.getParamExpString (this.rh, 0);
                var group = this.groups[act.getParamExpString (this.rh, 1)];
                if(group != null)
                {
                    var loop = new ForEachLoop ();
                    loop.name = loopName;
                    loop.loopMax = group.size();
					var i;
					for(i=0; i<group.length; i++)
					{
						if (group[i])
						{
                    		loop.fvs.add(group);
                    	}
                    }
                    this.executeForEachLoop (loop);
                }
                break;
            }
            case CRunForEach.ACT_ADDOBJECTTOGROUP:
            {
                if(this.ho.hoAdRunHeader.rhEvtProg.rh2ActionLoopCount != 0)
                    return;

                var object = act.getParamObject (this.rh, 0);
                this.currentGroup = act.getParamExpString (this.rh, 1);
                var group = this.groups[this.currentGroup];

                if(object == null)
                    break;

                //Create group if it doesn't exist
                if(group == null)
                {
                    group = new CArrayList();
                    this.groups[currentGroup]=group;
                }

                this.selection.filterObjects(this, object.hoOi, false, filterGetSelectedForGroup);
                this.currentGroup = null;

                break;
            }
            case CRunForEach.ACT_ADDFIXEDTOGROUP:
            {
                var fixed = act.getParamExpression (this.rh, 0);
                var groupName = act.getParamExpString (this.rh, 1);
                var group = this.groups[groupName];

                if(fixed == 0)
                    break;

                //Create group if it doesn't exist
                if(group == null)
                {
                    group = new CArrayList();
                    this.groups[groupName]=group;
                }

                group.add (fixed);
                break;
            }
            case CRunForEach.ACT_REMOVEOBJECTFROMGROUP:
            {
                var object = act.getParamObject (this.rh, 0);
                var groupName = act.getParamExpString (this.rh, 1);
                var group = this.groups[groupName];

                if(group == null || object == null)
                    break;

                group.removeObject (object.fixedValue ());

                //Delete group if empty
                if(group.size() == 0)
                    this.groups.splice(groupName, 1);

                break;
            }
            case CRunForEach.ACT_REMOVEFIXEDFROMGROUP:
            {
                var fixed = act.getParamExpression (this.rh, 0);
                var groupName = act.getParamExpString (this.rh, 1);
                var group = this.groups[groupName];

                if(group == null || fixed == 0)
                    break;

                group.removeObject (fixed);

                //Delete group if empty
                if(group.size() == 0)
                    this.groups.splice(groupName, 1);

                break;
            }
        }
    },

    executeForEachLoop:function(loop)
    {
        //Store current loop
        var prevLoop = this.currentForEach;
        this.forEachLoops[loop.name]=loop;
        this.currentForEach = loop;
        for(;loop.loopIndex < loop.loopMax; ++loop.loopIndex)
        {
            //Was the loop paused?
            if(loop.paused)
            {
                //Move the fastloop to the 'paused' table
                this.pausedLoops[loop.name]=loop;
                this.forEachLoops.splice(loop.name, 1);
                break;
            }
            this.ho.generateEvent (CRunForEach.CON_ONFOREACHLOOPSTRING, 0);

            this.currentLooped = this.ho.getObjectFromFixed (loop.fvs.get (loop.loopIndex));
            if(this.currentLooped != null)
                this.ho.generateEvent (CRunForEach.CON_ONFOREACHLOOPOBJECT, 0);
        }
        //Release the loop?
        if(!loop.paused)
            this.forEachLoops.splice(loop.name, 1);

        //Restore the previous loop (in case of nested loops)
        this.currentForEach = prevLoop;
    },
    
    expression:function(num)
    {
        switch(num)
        {
            case CRunForEach.EXP_LOOPFV:
            {
                var loop = this.forEachLoops[this.ho.getExpParam()];
                if(loop == null)
                    break;
                return loop.fvs.get(loop.loopIndex);
            }
            case CRunForEach.EXP_LOOPITERATION:
            {
                var loop = this.forEachLoops[this.ho.getExpParam()];
                if(loop == null)
                    break;
                return loop.loopIndex;
            }
            case CRunForEach.EXP_LOOPMAXITERATION:
            {
                var loop = this.forEachLoops[this.ho.getExpParam()];
                if(loop == null)
                    break;
                return loop.loopMax;
            }
            case CRunForEach.EXP_GROUPSIZE:
            {
                var group = this.groups[this.ho.getExpParam()];
                if(group == null)
                    break;
                return group.size();
            }
        }
        return 0;
    }    
    
});

function filterPartOfLoop(rdPtr, object)
{
    return rdPtr.partOfLoop.fvs.contains(object.fixedValue());
}

function filterPartOfGroup(rdPtr, object)
{
    return rdPtr.partOfGroup.contains(object.fixedValue());
}
//Adds all selected objects to the list of fixed values

function filterGetSelectedForGroup(rdPtr, object)
{
    var foreach = rdPtr;
    var array = foreach.groups[foreach.currentGroup];
    var currentFixed = object.fixedValue();

    if(array != null)
    {
    	var i;
        for(i = 0; i < array.size(); ++ i)
        {
            var fixedInArray = array.get(i);

            if(currentFixed == fixedInArray)
                return true;
        }
        array.add(currentFixed);
    }
    return true; //Don't filter out any objects
}

//Adds all selected objects to the current group
function filterGetSelected(rdPtr, object)
{
    rdPtr.populateLoop.addObject(object);
    return true; 
}


// OBJECT SELECTION CLASS
// ------------------------------------------------------------------------------
function ObjectSelection(runApp)
{
    this.rhPtr = runApp;
    this.run = this.rhPtr.run;
    this.eventProgram = this.rhPtr.frame.evtProg;
    this.ObjectList = this.run.rhObjectList;				//get a pointer to the mmf object list
    this.OiList = this.run.rhOiList;						//get a pointer to the mmf object info list
    this.QualToOiList = this.eventProgram.qualToOiList;	//get a pointer to the mmf qualifier to Oi list
}
ObjectSelection.prototype=
{
    //Selects *all* objects of the given object-type
    selectAll:function(Oi)
    {
        var pObjectInfo = this.GetOILFromOI(Oi);
        if(pObjectInfo == null)
            return;
        pObjectInfo.oilNumOfSelected = pObjectInfo.oilNObjects;
        pObjectInfo.oilListSelected = pObjectInfo.oilObject;
        pObjectInfo.oilEventCount = this.eventProgram.rh2EventCount;

        var i = pObjectInfo.oilObject;
        while((i&0x80000000)==0)
        {
            var pObject = this.ObjectList[i];
            pObject.hoNextSelected = pObject.hoNumNext;
            i = pObject.hoNumNext;
        }
    },

    //Resets all objects of the given object-type
    selectNone:function(Oi)
    {
        var pObjectInfo = this.GetOILFromOI(Oi);
        if(pObjectInfo == null)
            return;
        pObjectInfo.oilNumOfSelected = 0;
        pObjectInfo.oilListSelected = -1;
        pObjectInfo.oilEventCount = this.eventProgram.rh2EventCount;
    },

    //Resets the SOL and inserts only one given object
    selectOneObject:function(object)
    {
        var pObjectInfo = object.hoOiList;
        pObjectInfo.oilNumOfSelected = 1;
        pObjectInfo.oilEventCount = this.eventProgram.rh2EventCount;
        pObjectInfo.oilListSelected = object.hoNumber;
        this.ObjectList[object.hoNumber].hoNextSelected = -1;
    },

    //Resets the SOL and inserts the given list of objects
    selectObjects:function(Oi, objects)
    {
        var pObjectInfo = this.GetOILFromOI(Oi);

        if(pObjectInfo == null)
            return;

        pObjectInfo.oilNumOfSelected = objects.length;
        pObjectInfo.oilEventCount = eventProgram.rh2EventCount;

        if (objects.length==0)
            return;

		var i=0;
       	var prevNumber = objects[i].hoNumber;
       	pObjectInfo.oilListSelected = prevNumber;
		while(i<objects.length)
        {
            currentNumber = objects[i++].hoNumber;
            this.ObjectList[prevNumber].hoNextSelected = currentNumber;
            prevNumber = currentNumber;
        }
        this.ObjectList[prevNumber].hoNextSelected = -1;
    },

    //Run a custom filter on the SOL (via function callback)
    filterObjects:function(rdPtr, Oi, negate, filter)
    {
        if ((Oi & 0x8000) != 0)
        {
            return ((this.filterQualifierObjects(rdPtr, Oi & 0x7FFF, negate, filter) ? 1 : 0) ^ (negate ? 1 : 0)) != 0;
        }
        return ((this.filterNonQualifierObjects(rdPtr, Oi & 0x7FFF, negate, filter) ? 1 : 0) ^ (negate ? 1 : 0)) != 0;
    },
    
    //Filter qualifier objects
    filterQualifierObjects:function(rdPtr, Oi, negate, filter)
    {
        var CurrentQualToOiStart = this.QualToOiList[Oi];
        var CurrentQualToOi = CurrentQualToOiStart;

        var hasSelected = false;
        var i = 0;

        while(CurrentQualToOi.qoiList[1] >= 0)
        {
            var CurrentOi = this.GetOILFromOI(CurrentQualToOi.qoiList[1]);

            if (CurrentOi == null)
                continue;

            hasSelected = (((hasSelected ? 1 : 0) |
                (this.filterNonQualifierObjects(rdPtr, CurrentOi.oilOi, negate, filter) ? 1 : 0))) != 0;

            CurrentQualToOi = this.QualToOiList[Oi+i];
            ++i;
        }
        return hasSelected;
    },
    
    //Filter normal objects
    filterNonQualifierObjects:function(rdPtr, Oi, negate, filter)
    {
        var pObjectInfo = this.GetOILFromOI(Oi);
        if(pObjectInfo == null)
            return false;
        var hasSelected = false;
        if (pObjectInfo.oilEventCount != this.eventProgram.rh2EventCount)
        {
            this.selectAll(Oi);	//The SOL is invalid, must reset.
        }

        //If SOL is empty
        if(pObjectInfo.oilNumOfSelected <= 0)
        {
            return false;
        }

        var firstSelected = -1;
        var count = 0;
        var current = pObjectInfo.oilListSelected;
        var previous = null;

        while((current&0x80000000)==0)
        {
            var pObject = this.ObjectList[current];
            var filterResult = filter(rdPtr, pObject);
            var useObject = ((filterResult ? 1 : 0) ^ (negate ? 1 : 0)) != 0;
            hasSelected = ((hasSelected ? 1 : 0) | (useObject ? 1 : 0)) != 0;

            if(useObject)
            {
                if(firstSelected == -1)
                {
                    firstSelected = current;
                }

                if(previous != null)
                {
                    previous.hoNextSelected = current;
                }

                previous = pObject;
                count++;
            }
            current = pObject.hoNextSelected;
        }
        if(previous != null)
        {
            previous.hoNextSelected = -1;
        }

        pObjectInfo.oilListSelected = firstSelected;
        pObjectInfo.oilNumOfSelected = count;

        return hasSelected;
    },
    
    //Return the number of selected objects for the given object-type
    getNumberOfSelected:function(Oi)
    {
        if((Oi & 0x8000) != 0)
        {
            Oi &= 0x7FFF;	//Mask out the qualifier part
            var numberSelected = 0;

            var CurrentQualToOiStart = this.QualToOiList[Oi];
            var CurrentQualToOi = CurrentQualToOiStart;

            var i = 0;
            while((CurrentQualToOi.qoiList[1]&0x80000000)==0)
            {
                var CurrentOi = this.GetOILFromOI(CurrentQualToOi.qoiList[1]);
                if(CurrentOi == null)
                    return 0;
                numberSelected += CurrentOi.oilNumOfSelected;
                CurrentQualToOi = QualToOiList[Oi+i];
                ++i;
            }
            return numberSelected;
        }
        else
        {
            var pObjectInfo = this.GetOILFromOI(Oi);
            if(pObjectInfo == null)
                return 0;
            return pObjectInfo.oilNumOfSelected;
        }
    },
    
    objectIsOfType:function(obj, Oi)
    {
        if((Oi & 0x8000) != 0)
        {
            Oi &= 0x7FFF;	//Mask out the qualifier part
            var CurrentQualToOiStart = this.QualToOiList[Oi];
            var CurrentQualToOi = CurrentQualToOiStart;

            var i = 0;
            while((CurrentQualToOi.qoiList[1]&0x80000000)==0)
            {
                var CurrentOi = this.GetOILFromOI(CurrentQualToOi.qoiList[1]);
                if (CurrentOi == null)
                    return false;
                if(CurrentOi.oilOi == obj.hoOi)
                    return true;
                CurrentQualToOi = this.QualToOiList[Oi+i];
                ++i;
            }
            return false;
        }
        return (obj.hoOi == Oi);
    },
    
    //Returns the object-info structure from a given object-type
    GetOILFromOI:function(Oi)
    {
        for(i=0; i < this.run.rhMaxOI; ++i)
        {
            var oil = this.OiList[i];
            if(oil.oilOi == Oi)
                return oil;
        }
        return null;
    }
}

function ForEachLoop()
{
	this.name=null;
    this.fvs=new CArrayList();
    this.loopIndex=0;
    this.loopMax=0;
    this.paused=0;	
}
ForEachLoop.prototype=
{
    addObject:function(object)
    {
        this.fvs.add(object.fixedValue());
    },
    addFixed:function(fixed)
    {
        this.fvs.add(fixed);
    }
}
