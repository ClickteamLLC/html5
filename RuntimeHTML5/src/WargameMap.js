//----------------------------------------------------------------------------------
//
// CRunWargameMap: Wargame Map object
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
this.WargameMap=CRunWargameMap;

CRunWargameMap.SETS_OPEN_SET = 1;
CRunWargameMap.SETS_CLOSED_SET = 2;
CRunWargameMap.INF_TILE_COST = 99;

CRunWargameMap.CND_COMPARETILECOST = 0;
CRunWargameMap.CND_TILEIMPASSABLE	= 1;
CRunWargameMap.CND_PATHEXISTS = 2;
CRunWargameMap.CND_COMPAREPATHCOST = 3;
CRunWargameMap.CND_COMPAREPATHLENGTH = 4;
CRunWargameMap.CND_COMPARECOSTTOPOINT = 5;
CRunWargameMap.CND_COMPAREPOINTDIRECTION = 6;
CRunWargameMap.CND_COMPARECOSTTOCURRENT = 7;
CRunWargameMap.CND_COMPARECURRENTDIRECTION = 8;
CRunWargameMap.CND_ENDOFPATH = 9;

CRunWargameMap.ACT_SETWIDTH = 0;
CRunWargameMap.ACT_SETHEIGHT = 1;
CRunWargameMap.ACT_SETCOST = 2;
CRunWargameMap.ACT_CALCULATEPATH = 3;
CRunWargameMap.ACT_NEXTPOINT = 4;
CRunWargameMap.ACT_PREVPOINT = 5;
CRunWargameMap.ACT_RESETPOINT = 6;
CRunWargameMap.ACT_CALCULATELOS = 7;

CRunWargameMap.EXP_GETWIDTH = 0;
CRunWargameMap.EXP_GETHEIGHT = 1;
CRunWargameMap.EXP_GETTILECOST = 2;
CRunWargameMap.EXP_GETPATHCOST = 3;
CRunWargameMap.EXP_GETPATHLENGTH = 4;
CRunWargameMap.EXP_GETCOSTTOPOINT	= 5;
CRunWargameMap.EXP_GETPOINTDIRECTION = 6;
CRunWargameMap.EXP_GETPOINTX = 7;
CRunWargameMap.EXP_GETPOINTY = 8;
CRunWargameMap.EXP_GETSTARTX = 9;
CRunWargameMap.EXP_GETSTARTY = 10;
CRunWargameMap.EXP_GETDESTX = 11;
CRunWargameMap.EXP_GETDESTY = 12;
CRunWargameMap.EXP_GETCURRENTINDEX = 13;
CRunWargameMap.EXP_GETCOSTTOCURRENT = 14;
CRunWargameMap.EXP_GETCURRENTDIRECTION = 15;
CRunWargameMap.EXP_GETCURRENTX = 16;
CRunWargameMap.EXP_GETCURRENTY = 17;
CRunWargameMap.EXP_GETCOSTATPOINT	= 18;
CRunWargameMap.EXP_GETCOSTATCURRENT = 19;

function CRunWargameMap()
{
    this.mapWidth=0;
    this.mapHeight=0;
	this.oddColumnsHigh=false;
	this.map=null;
	this.path=null; 
	this.iterator=0;
	this.startX=0;
	this.startY=0;
	this.destX=0;
	this.destY=0;
}
CRunWargameMap.prototype=CServices.extend(new CRunExtension(),
{

    getNumberOfConditions:function()
    {
        return 10;
    },

    createRunObject:function(file, cob, version)
    {
        file.setUnicode(false);
        this.ho.hoX = cob.cobX;
        this.ho.hoY = cob.cobY;
        this.ho.hoImgWidth = 32;
        this.ho.hoImgHeight = 32;
        this.mapWidth = file.readAInt();
        this.mapHeight = file.readAInt();
        this.oddColumnsHigh = (file.readAByte() == 0) ? false : true;
        this.map = new Array(this.mapWidth * this.mapHeight);
        this.fillMap(1);
		return true;
    },
    
    fillMap:function(v)
    {
    	var i;
        for (i = 0; i < this.map.length; i++)
        {
            this.map[i] = v;
        }
    },
    
    heuristic:function(x1, y1, x2, y2, oddColumnConstant)
    {
        var xdist = Math.abs(x1 - x2);
        var ydist = Math.abs(y1 - y2);
        var additional;	// This is the number of steps we must move vertically.
        // The principle of the this.heuristic is that for every two columns we move across,
        // we can move one row down simultaneously. This means we can remove the number of rows
        // calculated from the absolute difference between rows.
        // The result is that we have an efficient and correct this.heuristic for the quickest this.path.

        // If we're in a low column, we move down a row on every odd column rather than even columns.
        if (((x1 % 2) ^ oddColumnConstant) == 1)
            additional = ydist - ((xdist + 1) / 2);
        else
            additional = ydist - (xdist / 2);
        if (additional > 0)
            return xdist + additional;
        return xdist;
    },
    resort:function(openHeap, fCost)
    {
        var r = new CArrayList();
        var i, j;
        for (i = 0; i < openHeap.size(); i++)
        {
            if (r.size() == 0)
            {
                r.add(openHeap.get(i));
            } 
            else 
            {
                var insertAt = r.size();
                for (j = r.size() - 1; j >= 0; j--)
                {
                    if (fCost[(openHeap.get(i))] < fCost[(r.get(j))])
                    {
                        insertAt = j;
                    }
                }
                r.insert(insertAt, openHeap.get(i));
            }
        }
        return r;
    },
    ConstructPath:function(gCost, parent, x1, y1, x2, y2)
    {
        var rPath = new CArrayList();
        var pos = x2 + y2 * this.mapWidth;
        var finishPos = x1 + y1 * this.mapWidth;
        // Add the current (destination) point
        var point = new CRunWargameMapPathPoint(x2, y2, gCost[pos]);
        rPath.add(point);
        // Go backwards through the this.path
        while (pos != finishPos)
        {
            pos = parent[pos];
            point = new CRunWargameMapPathPoint(pos % this.mapWidth, CServices.floatToInt(pos / this.mapWidth), gCost[pos]);
            rPath.insert(0, point);
        }
        return rPath;
    },
    Pathfinder:function(x1, y1, x2, y2)
    {
        var oddColumnConstant = this.oddColumnsHigh ? 1 : 0;
        var sets = new Array(this.mapWidth * this.mapHeight);
        var fCost = new Array(this.mapWidth * this.mapHeight);
        var gCost = new Array(this.mapWidth * this.mapHeight);
        var hCost = new Array(this.mapWidth * this.mapHeight);
        var parent = new Array(this.mapWidth * this.mapHeight);
        var openHeap = new CArrayList(); //Integer
        sets[x1 + y1 * this.mapWidth] = CRunWargameMap.SETS_OPEN_SET;
        openHeap.add((x1 + y1 * this.mapWidth));
        while (!openHeap.isEmpty())
        {
            // Grab the cheapest 
            var current = ((openHeap.get(0))); //0 is the top
            var currentX = current % this.mapWidth;
            var currentY = CServices.floatToInt(Math.floor(current / this.mapWidth));
            if ((currentX == x2) && (currentY == y2))
            {
                // We're done!
                return this.ConstructPath(gCost, parent, x1, y1, x2, y2);
            }
            // Remove from open set and add to closed set
            openHeap.removeIndex(0);
            sets[current] = CRunWargameMap.SETS_CLOSED_SET;
            // Is this column high? 1 if high, -1 if not.
            var sideColumnConstant = ((currentX % 2) ^ oddColumnConstant) * 2 - 1;
            // Get the neighbouring coordinates
            var neighbours=new Array(6);
            neighbours[0]=new CRunWargameMapPair(currentX - 1, currentY);
            neighbours[1]=new CRunWargameMapPair(currentX - 1, currentY + sideColumnConstant);
            neighbours[2]=new CRunWargameMapPair(currentX, currentY - 1);
            neighbours[3]=new CRunWargameMapPair(currentX, currentY + 1);
            neighbours[4]=new CRunWargameMapPair(currentX + 1, currentY);
            neighbours[5]=new CRunWargameMapPair(currentX + 1, currentY + sideColumnConstant);

            // and walk through them
            var i;
            for (i = 0; i < 6; i++)
            {
                // Out of bounds?
                if ((neighbours[i].first >= this.mapWidth) || (neighbours[i].first < 0) || 
                    (neighbours[i].second >= this.mapHeight) || (neighbours[i].second < 0))
                    continue;
                var next = neighbours[i].first + neighbours[i].second * this.mapWidth;
                // In closed set?
                if (sets[next] == CRunWargameMap.SETS_CLOSED_SET)
                    continue;
                // Impassable?
                if (this.map[next] >= CRunWargameMap.INF_TILE_COST)
                    continue;
                // Calculate the cost to travel to this tile
                var g = gCost[current] + this.map[next];
                // Is this not in the open set?
                if (sets[next] != CRunWargameMap.SETS_OPEN_SET)
                {
                    // Add to open set
                    sets[next] = CRunWargameMap.SETS_OPEN_SET;
                    hCost[next] = this.heuristic(neighbours[i].first, neighbours[i].second, x2, y2, oddColumnConstant);
                    parent[next] = current;
                    gCost[next] = g;
                    fCost[next] = g + hCost[next];
                    // Add to heap
                    openHeap.insert(0, next);
                    openHeap = this.resort(openHeap, fCost);
                }
                // Did we find a quicker this.path to this tile?
                else if (g < gCost[current])
                {
                    parent[next] = current;
                    gCost[next] = g;
                    fCost[next] = g + hCost[next];
                    // We need to this.resort the queue now it's been updated
                    openHeap = this.resort(openHeap, fCost);
                }
            }
        }
        return null;
    },
    my_max:function(x, y)
    {
        return (x < y) ? y : x;
    },
    WithinBounds:function(x, y)
    { //1-based
        if ((x > 0) && (x <= this.mapWidth) && (y > 0) && (y <= this.mapHeight))
        {
            return true;
        }
        return false;
    },
    PointWithinBounds:function(x)
    { //1-based
        if (this.path == null)
            return false;
        return (x <= this.path.size() - 1);
    },
    GetTileFromArray:function(x, y)
    {
        return this.map[x + (y * this.mapWidth)];
    },
    SetTileInArray:function(x, y, value)
    {
        this.map[x + (y * this.mapWidth)] = value;
    },
    GetStraightLinePath:function(x1, y1, x2, y2)
    {
        var cost = 0, cumulativeCost = 0;
        var xstep = (x1 < x2) ? 1 : -1;
        var ystep = (y1 < y2) ? 1 : -1;
        var rPath = new CArrayList();
            var point;
        // If the X coordinates are the same, our this.path is simple.
        if (x1 == x2)
        {
            while (true)
            {
                cost = this.GetTileFromArray(x1, y1);
                if (cost >= CRunWargameMap.INF_TILE_COST)
                {
                    // Fail...
                    return null;
                }
                cumulativeCost += cost;
                point = new CRunWargameMapPathPoint(x1, y1, cumulativeCost);
                rPath.insert(rPath.size(), point);
                if (y1 == y2)
                {
                    // Finished!
                    return rPath;
                }
                y1 += ystep;
            }
        }
        var verticalMovement = 0, adjustedWidth = 0;
        var incrementColumn = this.oddColumnsHigh ? 1 : 0;

        // Calculate the vertical distance we should be travelling.
        // Are we going in the / direction?
        if (((x1 < x2) && (y1 > y2)) || ((x1 > x2) && (y1 < y2)))
        {
            // Reverse the columns that we increment on.
            incrementColumn = 1 - incrementColumn;
        }
        // When the Y position is equal, the rightmost column must be high.
        else if ((y1 == y2) && ((this.my_max(x1, x2) & 1) == incrementColumn))
        {
            incrementColumn = 1 - incrementColumn;
        }

        // Move the X coordinates left so that they lie on low columns.
        adjustedWidth = x2 - (((x2 & 1) != incrementColumn) ? 1 : 0);
        adjustedWidth -= x1 - (((x1 & 1) != incrementColumn) ? 1 : 0);
        verticalMovement = Math.abs(adjustedWidth) / 2;
        if (Math.abs(y2 - y1) != verticalMovement)
        {
            // Not a straight line. For shame.
            return null;
        }
        // If we're going backwards, reverse the columns we increment on. (Maybe for the second time!)
        if (x1 > x2)
        {
            incrementColumn = 1 - incrementColumn;
        }
        // Move in the X dimension.
        while (true)
        {
            cost = this.GetTileFromArray(x1, y1);
            if (cost >= CRunWargameMap.INF_TILE_COST)
            {
                // Fail...
                return null;
            }
            cumulativeCost += cost;
            point = new CRunWargameMapPathPoint(x1, y1, cumulativeCost);
            rPath.insert(rPath.size(), point);
            if (x1 == x2)
            {
                // Finished!
                return rPath;
            }
            x1 += xstep;
            // Do we need to change the Y position?
            if ((x1 & 1) == incrementColumn)
            {
                y1 += ystep;
            }
        }
        return null;
    },

	xor:function(a, b)
	{
		if (a==false)
		{
			return b;
		}
		if (b==false)
		{
			return true;
		}
		return false;
	},
	
    IsHighColumn:function(column, oddColumnsHighL)
    {
        return ((oddColumnsHighL && ((column % 2) == 1)) || (!oddColumnsHighL && ((column % 2) == 0)));
    },

    GetKeypadStyleDirection:function(pointIndex)
    {
        if (pointIndex == 0)
        {
            return 0;
        }
        var current = (this.path.get(pointIndex));
        var last = (this.path.get(pointIndex - 1));

        switch (current.x - last.x)
        {
            case 0:
                // Same column. This means either north or south - simple.
                return (current.y < last.y) ? 8 : 2;

            case -1:
                // We've moved a column west.
                // In high columns, at the south-east Y positions are not equal.
                // but in low columns, at the south-east Y positions are equal.
                // Use XOR to negate the equality for high columns.
                return this.xor(current.y == last.y, this.IsHighColumn(current.x, this.oddColumnsHigh)) ? 1 : 7;

            case 1:
                // We've moved a column east.
                return this.xor(current.y == last.y, this.IsHighColumn(current.x, this.oddColumnsHigh)) ? 3 : 9;
        }
        // If we reached here something went wrong somewhere (how helpful)
        return 0;
    },

	condition:function(num, cnd)
	{
        switch (num)
        {
            case CRunWargameMap.CND_COMPARETILECOST:
                return this.cCompareTileCost(cnd.getParamExpression(this.rh, 0), cnd.getParamExpression(this.rh, 1), cnd);
            case CRunWargameMap.CND_TILEIMPASSABLE:
                return this.cTileImpassable(cnd.getParamExpression(this.rh, 0), cnd.getParamExpression(this.rh, 1));
            case CRunWargameMap.CND_PATHEXISTS:
                return this.cPathExists();
            case CRunWargameMap.CND_COMPAREPATHCOST:
                return this.cComparePathCost(cnd);
            case CRunWargameMap.CND_COMPAREPATHLENGTH:
                return this.cComparePathLength(cnd);
            case CRunWargameMap.CND_COMPARECOSTTOPOINT:
                return this.cCompareCostToPoint(cnd.getParamExpression(this.rh, 0), cnd);
            case CRunWargameMap.CND_COMPAREPOINTDIRECTION:
                return this.cComparePointDirection(cnd.getParamExpression(this.rh, 0), cnd);
            case CRunWargameMap.CND_COMPARECOSTTOCURRENT:
                return this.cCompareCostToCurrent(cnd);
            case CRunWargameMap.CND_COMPARECURRENTDIRECTION:
                return this.cCompareCurrentDirection(cnd);
            case CRunWargameMap.CRunWargameMap.CND_ENDOFPATH:
                return this.cEndOfPath();
        }
        return false;//won't happen
	},

    cCompareTileCost:function(x, y, cnd)
    {
        if (this.WithinBounds(x, y))
        {
            return cnd.compareValues(this.rh, 2, (this.GetTileFromArray(x - 1, y - 1)));
        }
        return cnd.compareValues(this.rh, 2, (CRunWargameMap.INF_TILE_COST));
    },

    cTileImpassable:function(x, y)
    {
        if (this.WithinBounds(x, y))
        {
            return (this.GetTileFromArray(x - 1, y - 1) >= CRunWargameMap.INF_TILE_COST) ? true : false;
        }
        return true;
    },

    cPathExists:function()
    {
        if (this.path != null)
        {
            return true;
        }
        return false;
    },

    cComparePathCost:function(cnd)
    {
        if (this.path == null)
        {
            return cnd.compareValues(this.rh, 0, (0));
        }
        return cnd.compareValues(this.rh, 0, (((this.path.get(this.path.size() - 1))).cumulativeCost));
    },

    cComparePathLength:function(cnd)
    {
        if (this.path == null)
        {
            return cnd.compareValues(this.rh, 0, (0));
        }
        return cnd.compareValues(this.rh, 0, (this.path.size() - 1));
    },

    cCompareCostToPoint:function(pointIndex, cnd)
    {
        if (this.path == null)
        {
            return cnd.compareValues(this.rh, 1, (0));
        }
        if (!this.PointWithinBounds(pointIndex))
        {
            return cnd.compareValues(this.rh, 1, (0));
        }
        return cnd.compareValues(this.rh, 1, (((this.path.get(pointIndex))).cumulativeCost));
    },

    cComparePointDirection:function(pointIndex, cnd)
    {
        if (this.path == null)
        {
            return cnd.compareValues(this.rh, 1, (0));
        }
        if (!this.PointWithinBounds(pointIndex))
        {
            return cnd.compareValues(this.rh, 1, (0));
        }
        return cnd.compareValues(this.rh, 1, (this.GetKeypadStyleDirection(pointIndex)));
    },

    cCompareCostToCurrent:function(cnd)
    {
        if (this.path == null)
        {
            return cnd.compareValues(this.rh, 0, (0));
        }
        return cnd.compareValues(this.rh, 0, (((this.path.get(this.iterator))).cumulativeCost));
    },

    cCompareCurrentDirection:function(cnd)
    {
        if (this.path == null)
        {
            return cnd.compareValues(this.rh, 0, (0));
        }
        if (!this.PointWithinBounds(this.iterator))
        {
            return cnd.compareValues(this.rh, 0, (0));
        }
        return cnd.compareValues(this.rh, 0, (this.GetKeypadStyleDirection(this.iterator)));
    },

    cEndOfPath:function()
    {
        if (this.path == null)
        {
            return true;
        }
        if (this.iterator >= this.path.size() - 1)
        {
            return true;
        }
        return false;
    },


    action:function(num, act)
    {
        switch (num)
        {
            case CRunWargameMap.ACT_SETWIDTH:
                this.aSetWidth(act.getParamExpression(this.rh, 0));
                break;        
            case CRunWargameMap.ACT_SETHEIGHT:       
                this.aSetHeight(act.getParamExpression(this.rh, 0));
                break;
            case CRunWargameMap.ACT_SETCOST:       
                this.aSetCost(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                break;
            case CRunWargameMap.ACT_CALCULATEPATH:
                this.aCalculatePath(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                break;
            case CRunWargameMap.ACT_NEXTPOINT:
                this.aNextPoint();
                break;
            case CRunWargameMap.ACT_PREVPOINT:
                this.aPrevPoint();
                break;
            case CRunWargameMap.ACT_RESETPOINT:
                this.aResetPoint();
                break;
            case CRunWargameMap.ACT_CALCULATELOS:
                this.aCalculateLOS(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                break;
        }
    },

    aSetWidth:function(w)
    {
        this.mapWidth = w;
        this.map = new Array(w * this.mapHeight);
        this.fillMap(0);
    },

    aSetHeight:function(h)
    {
        this.mapHeight = h;
        this.map = new Array(h * this.mapWidth);
        this.fillMap(0);
    },

    aSetCost:function(x, y, cost)
    {
        if (this.WithinBounds(x, y))
        {
            if (cost > 255)
            {
                cost = 255;
            }
            this.SetTileInArray(x - 1, y - 1, cost);
        }
    },

    aCalculatePath:function(startXL, startYL, destXL, destYL)
    {
        this.startX = startXL;
        this.startY = startYL;
        this.destX = destXL;
        this.destY = destYL;
        this.path = this.Pathfinder(startXL - 1, startYL - 1, destXL - 1, destYL - 1);
        this.iterator = 0;
    },

    aNextPoint:function()
    {
        if ((this.path != null) && (this.iterator < this.path.size() - 1))
        {
            this.iterator++;
        }
    },

    aPrevPoint:function()
    {
        if (this.iterator > 0)
        {
            this.iterator--;
        }
    },

    aResetPoint:function()
    {
        this.iterator = 0;
    },

    aCalculateLOS:function(startXL, startYL, destXL, destYL)
    {
        this.startX = startXL;
        this.startY = startYL;
        this.destX = destXL;
        this.destY = destYL;
        this.path = this.GetStraightLinePath(startXL - 1, startYL - 1, destXL - 1, destYL - 1);
        this.iterator = 0;
    },
	
    expression:function(num)
    {
    	var ret;
        switch (num)
        {
            case CRunWargameMap.EXP_GETWIDTH:
                return (this.mapWidth);
            case CRunWargameMap.EXP_GETHEIGHT:
                return (this.mapHeight);
            case CRunWargameMap.EXP_GETTILECOST:
                return this.eGetTileCost(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunWargameMap.EXP_GETPATHCOST:
                return this.eGetPathCost();
            case CRunWargameMap.EXP_GETPATHLENGTH:
                return this.eGetPathLength();
            case CRunWargameMap.EXP_GETCOSTTOPOINT:
                return this.eGetCostToPoint(this.ho.getExpParam());
            case CRunWargameMap.EXP_GETPOINTDIRECTION:
                return this.eGetPointDirection(this.ho.getExpParam());
            case CRunWargameMap.EXP_GETPOINTX:
                return this.eGetPointX(this.ho.getExpParam());
            case CRunWargameMap.EXP_GETPOINTY:
                return this.eGetPointY(this.ho.getExpParam());
            case CRunWargameMap.EXP_GETSTARTX:
                return (this.startX);
            case CRunWargameMap.EXP_GETSTARTY:
                return (this.startY);
            case CRunWargameMap.EXP_GETDESTX:
                return (this.destX);
            case CRunWargameMap.EXP_GETDESTY:
                return (this.destY);
            case CRunWargameMap.EXP_GETCURRENTINDEX:
                return (this.iterator);
            case CRunWargameMap.EXP_GETCOSTTOCURRENT:
                return this.eGetCostToCurrent();
            case CRunWargameMap.EXP_GETCURRENTDIRECTION:
                return this.eGetCurrentDirection();
            case CRunWargameMap.EXP_GETCURRENTX:
                return this.eGetCurrentX();
            case CRunWargameMap.EXP_GETCURRENTY:
                return this.eGetCurrentY();
            case CRunWargameMap.EXP_GETCOSTATPOINT:
                return this.eGetCostAtPoint(this.ho.getExpParam());
            case CRunWargameMap.EXP_GETCOSTATCURRENT:
                return this.eGetCostAtCurrent();
        }
        return (0);//won't be used
    },
    
    eGetTileCost:function(x, y)
    {
        if (this.map == null)
        {
            return (0);
        }
        if (!this.WithinBounds(x, y))
        {
            return (0);
        }
        return (this.GetTileFromArray(x - 1, y - 1));
    },

    eGetPathCost:function()
    {
        if (this.path == null)
        {
            return (0);
        }
        return (((this.path.get(this.path.size() - 1))).cumulativeCost);
    },

    eGetPathLength:function()
    {
        if (this.path == null)
        {
            return (0);
        }
        return (this.path.size() - 1);
    },

    eGetCostToPoint:function(pointIndex)
    {
        if (this.path == null)
        {
            return (0);
        }
        if (!this.PointWithinBounds(pointIndex))
        {
            return (0);
        }
        return (((this.path.get(pointIndex))).cumulativeCost);
    },

    eGetPointDirection:function(pointIndex)
    {
        if (this.path == null)
        {
            return (0);
        }
        if (!this.PointWithinBounds(pointIndex))
        {
            return (0);
        }
        return (this.GetKeypadStyleDirection(pointIndex));
    },

    eGetPointX:function(pointIndex)
    {
        if (this.path == null)
        {
            return (0);
        }
        if (!this.PointWithinBounds(pointIndex))
        {
            return (0);
        }
        return (((this.path.get(pointIndex))).x + 1);
    },

    eGetPointY:function(pointIndex)
    {
        if (this.path == null)
        {
            return (0);
        }
        if (!this.PointWithinBounds(pointIndex))
        {
            return (0);
        }
        return (((this.path.get(pointIndex))).y + 1);
    },

    eGetCostToCurrent:function()
    {
        if (this.path == null)
        {
            return (0);
        }
        return (((this.path.get(this.iterator))).cumulativeCost);
    },

    eGetCurrentDirection:function()
    {
        if (this.path == null)
        {
            return (0);
        }
        if (this.iterator == 0)
        {
            return (0);
        }
        return (this.GetKeypadStyleDirection(this.iterator));
    },

    eGetCurrentX:function()
    {
        if (this.path == null)
        {
            return (0);
        }
        return (((this.path.get(this.iterator))).x + 1);
    },

    eGetCurrentY:function()
    {
        if (this.path == null)
        {
            return (0);
        }
        return (((this.path.get(this.iterator))).y + 1);
    },

    eGetCostAtPoint:function(pointIndex)
    {
        if (this.path == null)
        {
            return (0);
        }
        if (!this.PointWithinBounds(pointIndex))
        {
            return (0);
        }
        var p = (this.path.get(pointIndex));
        return (this.GetTileFromArray(p.x, p.y));
    },

    eGetCostAtCurrent:function()
    {
        if (this.path == null)
        {
            return (0);
        }
        var p = (this.path.get(this.iterator));
        return (this.GetTileFromArray(p.x, p.y));
    }
        
});

function CRunWargameMapPair(f, s)
{
	this.first=f;
	this.second=s;
}
function CRunWargameMapPathPoint(xx, yy, cc)
{
    this.x = xx;
    this.y = yy;
    this.cumulativeCost = cc;
}
	