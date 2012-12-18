//----------------------------------------------------------------------------------
//
// CRunAdvDir: Advanced Direction object
//
//----------------------------------------------------------------------------------
CRunAdvDir.CND_COMPDIST = 0;
CRunAdvDir.CND_COMPDIR = 1;
CRunAdvDir.ACT_SETNUMDIR= 0;
CRunAdvDir.ACT_GETOBJECTS = 1;
CRunAdvDir.ACT_ADDOBJECTS = 2;
CRunAdvDir.ACT_RESET = 3;
CRunAdvDir.EXP_GETNUMDIR = 0;
CRunAdvDir.EXP_DIRECTION = 1;
CRunAdvDir.EXP_DISTANCE = 2;
CRunAdvDir.EXP_DIRECTIONLONG = 3;
CRunAdvDir.EXP_DISTANCELONG = 4;
CRunAdvDir.EXP_ROTATE = 5;
CRunAdvDir.EXP_DIRDIFFABS = 6;
CRunAdvDir.EXP_DIRDIFF = 7;
CRunAdvDir.EXP_GETFIXEDOBJ = 8;
CRunAdvDir.EXP_GETDISTOBJ = 9;
CRunAdvDir.EXP_XMOV = 10;
CRunAdvDir.EXP_YMOV = 11;
CRunAdvDir.EXP_DIRBASE = 12;

this.AdvDir=CRunAdvDir;

function CRunAdvDir()
{
    this.CurrentObject=0;
    this.EventCount=0;
    this.NumDir=0;
    this.Distance=new CArrayList();
    this.Fixed=new CArrayList();
    this.Last=new CPoint();
}
CRunAdvDir.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 2;
    },
	
    fixString:function(input)
    {
    	var i;
        for (i = 0; i < input.length; i++)
        {
            if (input.charCodeAt(i) < 10)
            {
                return input.substring(0, i);
            }
        }
        return input;
    },

    createRunObject:function(file, cob, version)
    {
    	file.setUnicode(false);
        file.skipBytes(8);
        this.EventCount = -1;
        var temp=file.readAString(32);
        temp=this.fixString(temp);
        this.NumDir=parseFloat(temp);
        return true;
    },

    condition:function(num, cnd)
    {
        switch (num)
        {
            case CRunAdvDir.CND_COMPDIST:
                return this.CompDist(cnd.getParamPosition(this.rh, 0), cnd.getParamPosition(this.rh, 1), cnd.getParamExpression(this.rh, 2));
            case CRunAdvDir.CND_COMPDIR:
                return this.CompDir(cnd.getParamPosition(this.rh, 0), cnd.getParamPosition(this.rh, 1), cnd.getParamExpression(this.rh, 2), cnd.getParamExpression(this.rh, 3));
        }
        return false;
    },

    CompDist:function(p1, p2, v)
    {
        var x1 = p1.posX;
        var y1 = p1.posY;
        var x2 = p2.posX;
        var y2 = p2.posY;

        if (Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2))) <= v)
        {
            return true;
        }
        return false;
    },

    cndlMin:function(v1, v2, v3)
    {
        return Math.min(v1, Math.min(v2, v3));
    },

    CompDir:function(p1, p2, dir, offset)
    {
        var x1 = p1.posX;
        var y1 = p1.posY;
        var x2 = p2.posX;
        var y2 = p2.posY;

        while (dir >= this.NumDir)
        {
            dir -= this.NumDir;
        }
        while (dir < 0)
        {
            dir += this.NumDir;
        }

        var dir2 = (((((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI) * -1) / 360) * this.NumDir);

        while (dir2 >= this.NumDir)
        {
            dir2 -= this.NumDir;
        }
        while (dir2 < 0)
        {
            dir2 += this.NumDir;
        }

        if (cndlMin(Math.abs(dir - dir2), Math.abs(dir - dir2 - this.NumDir), Math.abs(dir - dir2 + this.NumDir)) < offset)
        {
            return true;
        }
        return false;
    },

    action:function(num, act)
    {   
        switch (num)
        {        
            case CRunAdvDir.ACT_SETNUMDIR:
                this.SetNumDir(act.getParamExpression(this.rh, 0));
                break;        
            case CRunAdvDir.ACT_GETOBJECTS:       
                this.GetObjects(act.getParamObject(this.rh, 0), act.getParamPosition(this.rh, 1));
                break;
            case CRunAdvDir.ACT_ADDOBJECTS:       
                this.AddObjects(act.getParamObject(this.rh, 0));
                break;
            case CRunAdvDir.ACT_RESET:
                this.CurrentObject = 0;
                break;
        }
    },

    SetNumDir:function(n)
    {
        this.NumDir = n;
    },

    GetObjects:function(object, position)
    {
        var rhPtr= this.ho.hoAdRunHeader;
        
        //resetting if another event
        if (this.EventCount != rhPtr.rh4EventCount)
        {
            this.CurrentObject = 0;
            this.EventCount = rhPtr.rh4EventCount;
        }
        var x1 = position.x;
        var y1 = position.y;
        this.Last.x = position.x;
        this.Last.y = position.y;
        var x2 = object.hoX;
        var y2 = object.hoY;
        while (this.CurrentObject >= this.Distance.size())
        {
            this.Distance.add(null);
            this.Fixed.add(null);
        }
        this.Distance.set(this.CurrentObject, Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) );
        this.Fixed.set(this.CurrentObject, ((object.hoCreationId << 16) + object.hoNumber));
        this.CurrentObject++;
    },

    AddObjects:function(object)
    {
        var x1 = this.Last.x;
        var y1 = this.Last.y;
        var x2 = object.hoX;
        var y2 = object.hoY;
        while (this.CurrentObject >= this.Distance.size())
        {
            this.Distance.add(null);
            this.Fixed.add(null);
        }
        this.Distance.set(this.CurrentObject, Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) );
        this.Fixed.set(this.CurrentObject, (object.hoCreationId << 16) + object.hoNumber );
        this.CurrentObject++;
    },

    expression:function(num)
    {
        switch (num)
        {
            case CRunAdvDir.EXP_GETNUMDIR:
                return this.NumDir;
            case CRunAdvDir.EXP_DIRECTION:
                return this.Direction(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
            case CRunAdvDir.EXP_DISTANCE:
                return this.getDistance(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
            case CRunAdvDir.EXP_DIRECTIONLONG:
                return this.LongDir(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
            case CRunAdvDir.EXP_DISTANCELONG:
                return this.LongDist(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
            case CRunAdvDir.EXP_ROTATE:
                return this.Rotate(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
            case CRunAdvDir.EXP_DIRDIFFABS:
                return this.DirDiffAbs(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunAdvDir.EXP_DIRDIFF:
                return this.DirDiff(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunAdvDir.EXP_GETFIXEDOBJ:
                return this.GetFixedObj(this.ho.getExpParam());
            case CRunAdvDir.EXP_GETDISTOBJ:
                return this.GetDistObj(this.ho.getExpParam());
            case CRunAdvDir.EXP_XMOV:
                return this.XMov(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunAdvDir.EXP_YMOV:
                return this.YMov(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunAdvDir.EXP_DIRBASE:
                return this.DirBase(this.ho.getExpParam(), this.ho.getExpParam());
        }
        return 0;
    },

    Direction:function(x1, y1, x2, y2)
    {
        //Just doing simple math now.
        var r= (((((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI) * -1) / 360) * this.NumDir);

        while (r >= this.NumDir)
        {
            r -= this.NumDir;
        }
        while (r < 0)
        {
            r += this.NumDir;
        }

        return r;
    },

    getDistance:function(x1, y1, x2, y2)
    {
        var r= Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return r;
    },

    LongDir:function(x1, y1, x2, y2)
    {
        //Just doing simple math now.
        var r = (((((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI) * -1) / 360) * this.NumDir);
        if (r < this.NumDir / 2)
        {
            r += 0.5;
        }
        if (r > this.NumDir / 2)
        {
            r -= 0.5;
        }
        while (r >= this.NumDir)
        {
            r -= this.NumDir;
        }
        while (r < 0)
        {
            r += this.NumDir;
        }

        return CServices.floatToInt(r);
    },

    LongDist:function(x1, y1, x2, y2)
    {
        return CServices.floatToInt((Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))));
    },

    Rotate:function(angle, angletgt, rotation)
    {
        if (rotation < 0)
        {
            rotation *= -1;
            angletgt += this.NumDir / 2;
        }

        while (angletgt < 0)
        {
            angletgt += this.NumDir;
        }
        while (angletgt >= this.NumDir)
        {
            angletgt -= this.NumDir;
        }

        if (Math.abs((angle - angletgt)) <= rotation)
        {
            angle = angletgt;
        }
        if (Math.abs((angle - angletgt - this.NumDir)) <= rotation)
        {
            angle = angletgt;
        }
        if (Math.abs((angle - angletgt + this.NumDir)) <= rotation)
        {
            angle = angletgt;
        }

        if (angletgt != angle)
        {
            if (angle - angletgt >= 0 && angle - angletgt < this.NumDir / 2)
            {
                angle -= rotation;
            }
            if (angle - angletgt >= this.NumDir / 2)
            {
                angle += rotation;
            }
            if (angle - angletgt <= 0 && angle - angletgt > this.NumDir / -2)
            {
                angle += rotation;
            }
            if (angle - angletgt <= this.NumDir / -2)
            {
                angle -= rotation;
            }
        }

        while (angle >= this.NumDir)
        {
            angle -= this.NumDir;
        }
        while (angle < 0)
        {
            angle += this.NumDir;
        }

        return angle;
    },

    explMin:function(v1, v2, v3)
    {
        return Math.min(v1, Math.min(v2, v3));
    },

    lSMin:function(v1, v2, v3)
    {
        if (Math.abs(v1) <= Math.abs(v2) && Math.abs(v1) <= Math.abs(v3))
        {
            return v1;
        }
        if (Math.abs(v2) <= Math.abs(v1) && Math.abs(v2) <= Math.abs(v3))
        {
            return v2;
        }
        if (Math.abs(v3) <= Math.abs(v1) && Math.abs(v3) <= Math.abs(v2))
        {
            return v3;
        }
        return 0;
    },

    DirDiffAbs:function(p1, p2)
    {
        return this.explMin(Math.abs(p1 - p2), Math.abs(p1 - p2 - this.NumDir), Math.abs(p1 - p2 + this.NumDir));
    },

    DirDiff:function(p1, p2)
    {
        return this.lSMin(p1 - p2, p1 - p2 - this.NumDir, p1 - p2 + this.NumDir);
    },

    GetFixedObj:function(p1)
    {
        if (p1 >= this.CurrentObject || p1 < 0)
        {
            p1 = this.CurrentObject - 1;
        }
        var r = 0;
        if (this.CurrentObject > 0)
        {
            var Fixes= new CArrayList();// = (long *)malloc(sizeof(long) * rdPtr->this.CurrentObject);
            var i;
            for (i = 0; i < this.CurrentObject; i++)
            {
                Fixes.add(this.Fixed.get(i));
            }
            for (i = 0; i <= p1; i++)
            {
                var ClosestID = -1;
                var k;
                for (k = 0; k < this.CurrentObject; k++)
                {
                    if (Fixes.get(k) != null)
                    {
                        if (ClosestID == -1)
                        {
                            ClosestID = k;
                        }
                        else
                        {
                            var dAtK= (this.Distance.get(k));
                            var dAtClosestID= (this.Distance.get(ClosestID));
                            if (dAtK < dAtClosestID)
                            {
                                ClosestID = k;
                            }
                        }
                    }
                }
                if (ClosestID != -1)
                {
                    Fixes.set(ClosestID, null);
                    r = this.Fixed.get(ClosestID);
                }
            }
        }
        return CServices.floatToInt(r);
    },

    GetDistObj:function(p1)
    {
        if (p1 >= this.CurrentObject || p1 < 0)
        {
            p1 = this.CurrentObject - 1;
        }
        var r = 0;
        if (this.CurrentObject > 0)
        {
            var Fixes= new CArrayList();
            var i;
            for (i = 0; i < this.CurrentObject; i++)
            {
                Fixes.add(this.Fixed.get(i));
            }
            for (i = 0; i <= p1; i++)
            {
                var ClosestID = -1;
                var k;
                for (k = 0; k < this.CurrentObject; k++)
                {
                    if (Fixes.get(k) != null)
                    {
                        if (ClosestID == -1)
                        {
                            ClosestID = k;
                        }
                        else
                        {
                            var dAtK= this.Distance.get(k);
                            var dAtClosestID= this.Distance.get(ClosestID);
                            if (dAtK < dAtClosestID)
                            {
                                ClosestID = k;
                            }
                        }
                    }
                }
                if (ClosestID != -1)
                {
                    Fixes.set(ClosestID, null);
                    r = this.Distance.get(ClosestID);
                }
            }
        }
        return CServices.floatToInt(r);
    },

    XMov:function(dir, speed)
    {
        var r;
        dir = ((dir * 360) / this.NumDir);
        if (dir == 270 || dir == 90)
        {
            r = 0;
        }
        else
        {
            var angle= (dir * Math.PI * 2) / 360;
            r = Math.cos(angle * -1) * speed;
        }
        return r;
    },

    YMov:function(dir, speed)
    {
        var r;
        dir = ((dir * 360) / this.NumDir);
        if (dir == 180 || dir == 0)
        {
            r = 0;
        }
        else
        {
            var angle= ((dir * Math.PI * 2) / 360);
            r = (Math.sin(angle * -1) * speed);
        }
        return r;
    },

    DirBase:function(p1, p2)
    {
        var r= (p1 * p2) / this.NumDir;
        return r;
    }
});

