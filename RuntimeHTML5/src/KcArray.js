//----------------------------------------------------------------------------------
//
// CRunKcArray: array object
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
CRunKcArray.ARRAY_GLOBAL = 0x0008;    
CRunKcArray.ARRAY_TYPENUM = 0x0001;
CRunKcArray.ARRAY_TYPETXT = 0x0002;
CRunKcArray.INDEX_BASE1 = 0x0004;

CRunKcArray.ACT_SETINDEXA = 0;
CRunKcArray.ACT_SETINDEXB = 1;
CRunKcArray.ACT_SETINDEXC = 2;
CRunKcArray.ACT_ADDINDEXA = 3;
CRunKcArray.ACT_ADDINDEXB = 4;
CRunKcArray.ACT_ADDINDEXC = 5;
CRunKcArray.ACT_WRITEVALUE = 6;
CRunKcArray.ACT_WRITESTRING = 7;
CRunKcArray.ACT_CLEARARRAY = 8;
CRunKcArray.ACT_LOAD = 9;
CRunKcArray.ACT_LOADSELECTOR = 10;
CRunKcArray.ACT_SAVE	= 11;
CRunKcArray.ACT_SAVESELECTOR	= 12;
CRunKcArray.ACT_WRITEVALUE_X	= 13;
CRunKcArray.ACT_WRITEVALUE_XY = 14;
CRunKcArray.ACT_WRITEVALUE_XYZ = 15;
CRunKcArray.ACT_WRITESTRING_X = 16;
CRunKcArray.ACT_WRITESTRING_XY = 17;
CRunKcArray.ACT_WRITESTRING_XYZ = 18;

CRunKcArray.CND_INDEXAEND = 0;
CRunKcArray.CND_INDEXBEND = 1;
CRunKcArray.CND_INDEXCEND = 2;

CRunKcArray.EXP_INDEXA = 0;
CRunKcArray.EXP_INDEXB = 1;
CRunKcArray.EXP_INDEXC = 2;
CRunKcArray.EXP_READVALUE = 3;
CRunKcArray.EXP_READSTRING = 4;
CRunKcArray.EXP_READVALUE_X = 5;
CRunKcArray.EXP_READVALUE_XY = 6;
CRunKcArray.EXP_READVALUE_XYZ = 7;
CRunKcArray.EXP_READSTRING_X = 8;
CRunKcArray.EXP_READSTRING_XY = 9;
CRunKcArray.EXP_READSTRING_XYZ = 10;
CRunKcArray.EXP_DIMX = 11;
CRunKcArray.EXP_DIMY = 12;
CRunKcArray.EXP_DIMZ = 13;

function CRunKcArray()
{
	this.pArray=null;
}
CRunKcArray.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 3;
    },

    createRunObject:function(file, cob, version)
    {
        var rhPtr= this.ho.hoAdRunHeader;

        var lDimensionX = file.readAInt();
        var lDimensionY = file.readAInt();
        var lDimensionZ = file.readAInt();
        var lFlags = file.readAInt();

        var pData = null;
        if ((lFlags & CRunKcArray.ARRAY_GLOBAL) != 0)
        {
            var pExtData= rhPtr.getStorage(this.ho.hoIdentifier);
            if (pExtData == null) //first global object of this type
            {
                this.pArray = new CRunKcArrayData(lFlags, lDimensionX, lDimensionY, lDimensionZ);
                pData = new CRunKcArrayCGlobalDataList();
                pData.AddObject(this);
                rhPtr.addStorage(pData, this.ho.hoIdentifier);
            }
            else
            {
                pData = pExtData;
                var found= pData.FindObject(this.ho.hoOiList.oilName);
                if (found != null) //found array object of same name
                {
                    this.pArray = found; //share data
                }
                else
                {
                    this.pArray = new CRunKcArrayData(lFlags, lDimensionX, lDimensionY, lDimensionZ);
                    pData.AddObject(this);
                }
            }
        }
        else
        {
            this.pArray = new CRunKcArrayData(lFlags, lDimensionX, lDimensionY, lDimensionZ);
        }
        return true;
    },

    // Conditions
    // --------------------------------------------------
    condition:function(num, cnd)
    {
        switch (num)
        {
            case CRunKcArray.CND_INDEXAEND:
                return this.EndIndexA();
            case CRunKcArray.CND_INDEXBEND:
                return this.EndIndexB();
            case CRunKcArray.CND_INDEXCEND:
                return this.EndIndexC();
        }
        return false;
    },

    EndIndexA:function()
    {
        if (this.pArray.lIndexA >= this.pArray.lDimensionX - 1)
        {
            return true;
        }
        return false;
    },

    EndIndexB:function()
    {
        if (this.pArray.lIndexB >= this.pArray.lDimensionY - 1)
        {
            return true;
        }
        return false;
    },

    EndIndexC:function()
    {
        if (this.pArray.lIndexC >= this.pArray.lDimensionZ - 1)
        {
            return true;
        }
        return false;
    },

    // Actions
    // -------------------------------------------------
    action:function(num, act)
    {
        switch (num)
        {
            case CRunKcArray.ACT_SETINDEXA:
                this.SetIndexA(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcArray.ACT_SETINDEXB:
                this.SetIndexB(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcArray.ACT_SETINDEXC:
                this.SetIndexC(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcArray.ACT_ADDINDEXA:
                this.IncIndexA();
                break;
            case CRunKcArray.ACT_ADDINDEXB:
                this.IncIndexB();
                break;
            case CRunKcArray.ACT_ADDINDEXC:
                this.IncIndexC();
                break;
            case CRunKcArray.ACT_WRITEVALUE:
                this.WriteValue(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcArray.ACT_WRITESTRING:
                this.WriteString(act.getParamExpString(this.rh, 0));
                break;
            case CRunKcArray.ACT_CLEARARRAY:
                this.ClearArray();
                break;
            case CRunKcArray.ACT_LOAD:
                this.load(this.parseName(act.getParamFilename(this.rh, 0)));
                break;
            case CRunKcArray.ACT_LOADSELECTOR:
                break;
            case CRunKcArray.ACT_SAVE:
                break;
            case CRunKcArray.ACT_SAVESELECTOR:
                break;
            case CRunKcArray.ACT_WRITEVALUE_X:
                this.WriteValue_X(act.getParamExpression(this.rh, 0),
                        act.getParamExpression(this.rh, 1));
                break;
            case CRunKcArray.ACT_WRITEVALUE_XY:
                this.WriteValue_XY(act.getParamExpression(this.rh, 0),
                        act.getParamExpression(this.rh, 1),
                        act.getParamExpression(this.rh, 2));
                break;
            case CRunKcArray.ACT_WRITEVALUE_XYZ:
                this.WriteValue_XYZ(act.getParamExpression(this.rh, 0),
                        act.getParamExpression(this.rh, 1),
                        act.getParamExpression(this.rh, 2),
                        act.getParamExpression(this.rh, 3));
                break;
            case CRunKcArray.ACT_WRITESTRING_X:
                this.WriteString_X(act.getParamExpString(this.rh, 0),
                        act.getParamExpression(this.rh, 1));
                break;
            case CRunKcArray.ACT_WRITESTRING_XY:
                this.WriteString_XY(act.getParamExpString(this.rh, 0),
                        act.getParamExpression(this.rh, 1),
                        act.getParamExpression(this.rh, 2));
                break;
            case CRunKcArray.ACT_WRITESTRING_XYZ:
                this.WriteString_XYZ(act.getParamExpString(this.rh, 0),
                        act.getParamExpression(this.rh, 1),
                        act.getParamExpression(this.rh, 2),
                        act.getParamExpression(this.rh, 3));
                break;
        }
    },
	parseName:function(name)
	{
		var pos=name.lastIndexOf("\\");
		if (pos>0)
		{
			name=name.substring(pos+1);
		}
		return name;	    			
	},	    
    SetIndexA:function(i)
    {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0)
        {
            this.pArray.lIndexA = i - 1;
        }
        else
        {
            this.pArray.lIndexA = i;
        }
    },

    SetIndexB:function(i)
    {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0)
        {
            this.pArray.lIndexB = i - 1;
        }
        else
        {
            this.pArray.lIndexB = i;
        }
    },

    SetIndexC:function(i)
    {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0)
        {
            this.pArray.lIndexC = i - 1;
        }
        else
        {
            this.pArray.lIndexC = i;
        }
    },

    IncIndexA:function()
    {
        this.pArray.lIndexA++;
    },

    IncIndexB:function()
    {
        this.pArray.lIndexB++;
    },

    IncIndexC:function()
    {
        this.pArray.lIndexC++;
    },

    WriteValue:function(value)
    {
        this.WriteValueXYZ(value, this.pArray.lIndexA, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    WriteString:function(value)
    {
        this.WriteStringXYZ(value, this.pArray.lIndexA, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    ClearArray:function()
    {
        this.pArray.clean();
    },

    WriteValue_X:function(value, x)
    {
        x -= this.pArray.oneBased();
        this.WriteValueXYZ(value, x, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    WriteValue_XY:function(value, x, y)
    {
        x -= this.pArray.oneBased();
        y -= this.pArray.oneBased();
        this.WriteValueXYZ(value, x, y, this.pArray.lIndexC);
    },

    WriteValue_XYZ:function(value, x, y, z)
    {
        x -= this.pArray.oneBased();
        y -= this.pArray.oneBased();
        z -= this.pArray.oneBased();
        this.WriteValueXYZ(value, x, y, z);
    },

    WriteValueXYZ:function(value, x, y, z)
    {
        //x,y,z should be fixed for 1-based index if used before this function
        if ((x < 0) || (y < 0) || (z < 0))
        {
            return;
        }
        if ((this.pArray.lFlags & CRunKcArray.ARRAY_TYPENUM) != 0)
        {
            // Expand if required
            if ((x >= this.pArray.lDimensionX) || (y >= this.pArray.lDimensionY) || (z >= this.pArray.lDimensionZ))
            {
                var newDimX = Math.max(this.pArray.lDimensionX, x + 1);
                var newDimY = Math.max(this.pArray.lDimensionY, y + 1);
                var newDimZ = Math.max(this.pArray.lDimensionZ, z + 1);
                this.pArray.expand(newDimX, newDimY, newDimZ);
            }
            //write
            this.pArray.lIndexA = x;
            this.pArray.lIndexB = y;
            this.pArray.lIndexC = z;
            this.pArray.numberArray[z*this.pArray.lDimensionY*this.pArray.lDimensionX+y*this.pArray.lDimensionX+x] = value;
        }
    },

    WriteString_X:function(value, x)
    {
        x -= this.pArray.oneBased();
        this.WriteStringXYZ(value, x, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    WriteString_XY:function(value, x, y)
    {
        x -= this.pArray.oneBased();
        y -= this.pArray.oneBased();
        this.WriteStringXYZ(value, x, y, this.pArray.lIndexC);
    },

    WriteString_XYZ:function(value, x, y, z)
    {
        x -= this.pArray.oneBased();
        y -= this.pArray.oneBased();
        z -= this.pArray.oneBased();
        this.WriteStringXYZ(value, x, y, z);
    },

    WriteStringXYZ:function(value, x, y, z)
    {
        //x,y,z should be fixed for 1-based index if used before this function
        if ((x < 0) || (y < 0) || (z < 0))
        {
            return;
        }
        if ((this.pArray.lFlags & CRunKcArray.ARRAY_TYPETXT) != 0)
        {
            // Expand if required
            if ((x >= this.pArray.lDimensionX) || (y >= this.pArray.lDimensionY) || (z >= this.pArray.lDimensionZ))
            {
                var newDimX = Math.max(this.pArray.lDimensionX, x + 1);
                var newDimY = Math.max(this.pArray.lDimensionY, y + 1);
                var newDimZ = Math.max(this.pArray.lDimensionZ, z + 1);
                this.pArray.expand(newDimX, newDimY, newDimZ);
            }
            //write
            this.pArray.lIndexA = x;
            this.pArray.lIndexB = y;
            this.pArray.lIndexC = z;
            this.pArray.stringArray[z*this.pArray.lDimensionY*this.pArray.lDimensionX+y*this.pArray.lDimensionX+x] = value;
        }
    },

    load:function(name)
    {
        var file = null;
        var efile = this.rh.rhApp.getEmbeddedFile(name);
        if (efile!=null)
        {
            file = efile.open();
        }
        if (file==null)
        {
	     	file=new CFile();
	        file.openFile(name);
	        if (file.ccfBytes.length==0)
	        {
	        	file=null;
	        }
    	}
    	
		var x, y, z;		
		if (file!=null)
		{
            var headerHead=file.readAString(9);
            var newArray;
            if (headerHead=="CNC ARRAY")
            {
                file.skipBytes(1);
                var version = file.readAShort();
                var revision = file.readAShort();
                if (((version == 1) || (version == 2)) && (revision == 0))
                {
                    var dimX = file.readAInt();
                    var dimY = file.readAInt();
                    var dimZ = file.readAInt();
                    var flags = file.readAInt();
                    //header read
                    if ((dimX >= 0) && (dimY >= 0) && (dimZ >= 0))
                    {
                        if ((flags & CRunKcArray.ARRAY_TYPENUM) != 0)
                        {
                            newArray = new Array(dimZ*dimY*dimX);
                            for (z = 0; z < dimZ; z++)
                            {
                                for (y = 0; y < dimY; y++)
                                {
                                    for (x = 0; x < dimX; x++)
                                    {
                                        newArray[z*dimY*dimX+y*dimX+x] = file.readAInt();
                                    }
                                }
                            }
                            //if no try error thus far
                            this.pArray.lFlags = flags;
                            this.pArray.lDimensionX = dimX;
                            this.pArray.lDimensionY = dimY;
                            this.pArray.lDimensionZ = dimZ;
                            this.pArray.lIndexA = 0;
                            this.pArray.lIndexB = 0;
                            this.pArray.lIndexC = 0;
                            this.pArray.numberArray = newArray;
                            //fin
                        }
                        else if ((flags & CRunKcArray.ARRAY_TYPETXT) != 0)
                        {
                            newArray = new Array(dimZ*dimY*dimX);                           
                            for (z = 0; z < dimZ; z++)
                            {
                                for (y = 0; y < dimY; y++)
                                {
                                    for (x = 0; x < dimX; x++)
                                    {
                                        var length = file.readAInt();
                                        if (length>0)
                                        {
                                            newArray[z*dimY*dimX+y*dimX+x] = file.readAString(length);
                                        }
                                    }
                                }
                            }
                            //if no try error thus far
                            this.pArray.lFlags = flags;
                            this.pArray.lDimensionX = dimX;
                            this.pArray.lDimensionY = dimY;
                            this.pArray.lDimensionZ = dimZ;
                            this.pArray.lIndexA = 0;
                            this.pArray.lIndexB = 0;
                            this.pArray.lIndexC = 0;
                            this.pArray.stringArray = newArray;
                            //fin
                        }
                    }
                }
            }
		}
    },

    // Expressions
    // --------------------------------------------
    expression:function(num)
    {
        switch (num)
        {
            case CRunKcArray.EXP_INDEXA:
                return this.IndexA();
            case CRunKcArray.EXP_INDEXB:
                return this.IndexB();
            case CRunKcArray.EXP_INDEXC:
                return this.IndexC();
            case CRunKcArray.EXP_READVALUE:
                return this.ReadValue();
            case CRunKcArray.EXP_READSTRING:
                return this.ReadString();
            case CRunKcArray.EXP_READVALUE_X:
                return this.ReadValue_X(this.ho.getExpParam());
            case CRunKcArray.EXP_READVALUE_XY:
                return this.ReadValue_XY(this.ho.getExpParam(),
                        this.ho.getExpParam());
            case CRunKcArray.EXP_READVALUE_XYZ:
                return this.ReadValue_XYZ(this.ho.getExpParam(),
                        this.ho.getExpParam(),
                        this.ho.getExpParam());
            case CRunKcArray.EXP_READSTRING_X:
                return this.ReadString_X(this.ho.getExpParam());
            case CRunKcArray.EXP_READSTRING_XY:
                return this.ReadString_XY(this.ho.getExpParam(),
                        this.ho.getExpParam());
            case CRunKcArray.EXP_READSTRING_XYZ:
                return this.ReadString_XYZ(this.ho.getExpParam(),
                        this.ho.getExpParam(),
                        this.ho.getExpParam());
            case CRunKcArray.EXP_DIMX:
                return this.Exp_DimX();
            case CRunKcArray.EXP_DIMY:
                return this.Exp_DimY();
            case CRunKcArray.EXP_DIMZ:
                return this.Exp_DimZ();
        }
        return (0);
    },

    IndexA:function()
    {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0)
        {
            return (this.pArray.lIndexA + 1);
        }
        else
        {
            return (this.pArray.lIndexA);
        }
    },

    IndexB:function()
    {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0)
        {
            return (this.pArray.lIndexB + 1);
        }
        else
        {
            return (this.pArray.lIndexB);
        }
    },

    IndexC:function()
    {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0)
        {
            return (this.pArray.lIndexC + 1);
        }
        else
        {
            return (this.pArray.lIndexC);
        }
    },

    ReadValue:function()
    {
        return this.ReadValueXYZ(this.pArray.lIndexA,
                this.pArray.lIndexB,
                this.pArray.lIndexC);
    },

    ReadString:function()
    {
        return this.ReadStringXYZ(this.pArray.lIndexA,
                this.pArray.lIndexB,
                this.pArray.lIndexC);
    },

    ReadValue_X:function(x)
    {
        return this.ReadValueXYZ(x - this.pArray.oneBased(),
                this.pArray.lIndexB,
                this.pArray.lIndexC);
    },

    ReadValue_XY:function(x, y)
    {
        return this.ReadValueXYZ(x - this.pArray.oneBased(),
                y - this.pArray.oneBased(),
                this.pArray.lIndexC);
    },

    ReadValue_XYZ:function(x, y, z)
    {
        return this.ReadValueXYZ(x - this.pArray.oneBased(),
                y - this.pArray.oneBased(),
                z - this.pArray.oneBased());
    },

    ReadValueXYZ:function(x, y, z)
    {
        //x y z should be fixed for 1-based, if so
        if ((x < 0) || (y < 0) || (z < 0))
        {
            return (0);
        }
        if ((this.pArray.lFlags & CRunKcArray.ARRAY_TYPENUM) != 0)
        {
            if ((x < this.pArray.lDimensionX) && (y < this.pArray.lDimensionY) && (z < this.pArray.lDimensionZ))
            {
                return (this.pArray.numberArray[z*this.pArray.lDimensionY*this.pArray.lDimensionX+y*this.pArray.lDimensionX+x]);
            }
        }
        return (0);
    },

    ReadString_X:function(x)
    {
        return this.ReadStringXYZ(x - this.pArray.oneBased(),
                this.pArray.lIndexB,
                this.pArray.lIndexC);
    },

    ReadString_XY:function(x, y)
    {
        return this.ReadStringXYZ(x - this.pArray.oneBased(),
                y - this.pArray.oneBased(),
                this.pArray.lIndexC);
    },

    ReadString_XYZ:function(x, y, z)
    {
        return this.ReadStringXYZ(x - this.pArray.oneBased(),
                y - this.pArray.oneBased(),
                z - this.pArray.oneBased());
    },

    ReadStringXYZ:function(x, y, z)
    {
    	var ret="";
		
        //x y z should be fixed for 1-based, if so
        if ((x >= 0) && (y >= 0) && (z >= 0))
        {
	        if ((this.pArray.lFlags & CRunKcArray.ARRAY_TYPETXT) != 0)
	        {
	            if ((x < this.pArray.lDimensionX) && (y < this.pArray.lDimensionY) && (z < this.pArray.lDimensionZ))
	            {
	                var r = this.pArray.stringArray[z*this.pArray.lDimensionY*this.pArray.lDimensionX+y*this.pArray.lDimensionX+x];
	                if (r != null)
	                {
	                	ret=r;
	                }
	            }
	        }
	    }
        return ret;
    },

    Exp_DimX:function()
    {
        return (this.pArray.lDimensionX);
    },

    Exp_DimY:function()
    {
        return (this.pArray.lDimensionY);
    },

    Exp_DimZ:function()
    {
        return (this.pArray.lDimensionZ);
    }
});

// Helper objects
// ----------------------------------------------------------------
function CRunKcArrayCGlobalDataList()
{
    this.dataList=new CArrayList();
    this.names=new CArrayList();
}
CRunKcArrayCGlobalDataList.prototype=
{
    FindObject:function(objectName)
    {
    	var i;
        for (i = 0; i < this.names.size(); i++)
        {
        	var s=this.names.get(i);
            if (s==objectName)
            {
                return this.dataList.get(i);
            }
        }
        return null;
    },
    AddObject:function(o)
    {
        this.dataList.add(o.pArray);
        this.names.add(o.ho.hoOiList.oilName);
    }
}

function CRunKcArrayData(flags, dimX, dimY, dimZ)
{
    this.lIndexA=0;
    this.lIndexB=0;
    this.lIndexC=0;
    dimX = Math.max(1, dimX);
    dimY = Math.max(1, dimY);
    dimZ = Math.max(1, dimZ);
	
    this.lFlags = flags;
    this.lDimensionX = dimX;
    this.lDimensionY = dimY;
    this.lDimensionZ = dimZ;
    if ((flags & 0x0001) != 0)          // ARRAY_TYPENUM
    {
        this.numberArray = new Array(dimZ*dimY*dimX);
    }
    else if ((flags & 0x0002) != 0)         // ARRAY_TYPETXT
    {
        this.stringArray = new Array(dimZ*dimY*dimX);
    }
}
CRunKcArrayData.prototype=
{
    oneBased:function()
    {
        if ((this.lFlags & 0x0004) != 0)     // INDEX_BASE1
        {
            return 1;
        }
        return 0;
    },
    expand:function(newX, newY, newZ)
    {
        //inputs should always be equal or larger than current dimensions
        var temp= new Array(this.lDimensionZ*this.lDimensionY*this.lDimensionX);
        var x, y, z;
        if (this.numberArray!=null)
        {
            for (z = 0; z < this.lDimensionZ; z++)
            {
                for (y = 0; y < this.lDimensionY; y++)
                {
                    for (x = 0; x < this.lDimensionX; x++)
                    {
                        temp[z*this.lDimensionY*this.lDimensionX+y*this.lDimensionX+x] = this.numberArray[z*this.lDimensionY*this.lDimensionX+y*this.lDimensionX+x];
                    }
                }
            }
            this.numberArray = new Array(newZ*newY*newX);
            for (z = 0; z < this.lDimensionZ; z++)
            {
                for (y = 0; y < this.lDimensionY; y++)
                {
                    for (x = 0; x < this.lDimensionX; x++)
                    {
                        this.numberArray[z*newY*newX+y*newX+x] = temp[z*this.lDimensionY*this.lDimensionX+y*this.lDimensionX+x];
                    }
                }
            }
        }
        else if (this.stringArray!=null)
        {
            for (z = 0; z < this.lDimensionZ; z++)
            {
                for (y = 0; y < this.lDimensionY; y++)
                {
                    for (x = 0; x < this.lDimensionX; x++)
                    {
                        temp[z*this.lDimensionY*this.lDimensionX+y*this.lDimensionX+x] = this.stringArray[z*this.lDimensionY*this.lDimensionX+y*this.lDimensionX+x];
                    }
                }
            }
            this.numberArray = new Array(newZ*newY*newX);
            for (z = 0; z < this.lDimensionZ; z++)
            {
                for (y = 0; y < this.lDimensionY; y++)
                {
                    for (x = 0; x < this.lDimensionX; x++)
                    {
                        this.stringArray[z*newY*newX+y*newX+x] = temp[z*this.lDimensionY*this.lDimensionX+y*this.lDimensionX+x];
                    }
                }
            }
        }
        this.lDimensionX = newX;
        this.lDimensionY = newY;
        this.lDimensionZ = newZ;
    },
    clean:function()
    {
    	var x, y, z;
        if ((this.lFlags & 0x0001) != 0)         // ARRAY_TYPENUM
        {
            for (z = 0; z < this.lDimensionZ; z++)
            {
                for (y = 0; y < this.lDimensionY; y++)
                {
                    for (x = 0; x < this.lDimensionX; x++)
                    {
                        this.numberArray[z*this.lDimensionY*this.lDimensionX+y*this.lDimensionX+x] = 0;
                    }
                }
            }
        }
        else if ((this.lFlags & 0x0002) != 0)        // ARRAY_TYPETXT
        {
            for (z = 0; z < this.lDimensionX; z++)
            {
                for (y = 0; y < this.lDimensionY; y++)
                {
                    for (x = 0; x < this.lDimensionX; x++)
                    {
                        this.stringArray[z*this.lDimensionY*this.lDimensionX+y*this.lDimensionX+x] = null;
                    }
                }
            }           
        }
    }
}
	
