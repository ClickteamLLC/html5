//----------------------------------------------------------------------------------
//
// CRUNLAYER : Objet layer
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
CRunLayer.X_UP=0;
CRunLayer.X_DOWN=1;
CRunLayer.Y_UP=2;
CRunLayer.Y_DOWN=3;
CRunLayer.ALT_UP=4;
CRunLayer.ALT_DOWN=5;    

function CRunLayer()
{
    this.holdFValue;
    this.wCurrentLayer;
}
CRunLayer.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 12;
    },

    createRunObject:function(file, cob, version)
    {
        this.wCurrentLayer = this.ho.hoLayer;
        return false;
    },

    // Conditions
    // --------------------------------------------------
    condition:function(num, cnd)
    {
        switch (num)
        {
            case 0:
                return this.cndAtBack(cnd);
            case 1:
                return this.cndAtFront(cnd);
            case 2:
                return this.cndAbove(cnd);
            case 3:
                return this.cndBelow(cnd);
            case 4:
                return this.cndBetween(cnd);
            case 5:
                return this.cndAtBackObj(cnd);
            case 6:
                return this.cndAtFrontObj(cnd);
            case 7:
                return this.cndAboveObj(cnd);
            case 8:
                return this.cndBelowObj(cnd);
            case 9:
                return this.cndBetweenObj(cnd);
            case 10:
                return this.cndIsLayerVisible(cnd);
            case 11:
                return this.cndIsLayerVisibleByName(cnd);
        }
        return false;
    },

    cndAtBack:function(cnd)
    {
        var param1 = cnd.getParamExpression(this.rh, 0);
        return this.cndAtBackRout(param1);
    },

    cndAtBackRout:function(param1)
    {
        var nLayer = this.wCurrentLayer;	
		var pObject;
		var oMini=null;
		var pMini=100000;
		var p;
		for (pObject=this.ho.getFirstObject(); pObject!=null; pObject=this.ho.getNextObject())
		{
			if (pObject.ros!=null && pObject.hoLayer==nLayer)
			{		
				p=pObject.getChildIndex();			
				if (p>=0 && p<pMini)
				{
					oMini=pObject;
					pMini=p;
				}
			}
		}
		
		if (oMini!=null)
		{
            var FValue = (oMini.hoCreationId << 16) + (oMini.hoNumber&0xFFFF);

            if (param1 == 0)
            {
                param1 = this.holdFValue;
            }

            // Returns TRUE if the object is the first sprite (= if it's fixed value is the same as the one of the first sprite)
            if (param1 == FValue)
            {
                return true;
            }
		}		
		return false;
    },

    cndAtFront:function(cnd)
    {
        var param1 = cnd.getParamExpression(this.rh, 0);
        return this.cndAtFrontRout(param1);
    },

    cndAtFrontRout:function(param1)
    {
        var nLayer = this.wCurrentLayer;

		var pObject;
		var oMaxi=null;
		var pMaxi=-1;
		var p;
		for (pObject=this.ho.getFirstObject(); pObject!=null; pObject=this.ho.getNextObject())
		{
			if (pObject.ros!=null && pObject.hoLayer==nLayer)
			{		
				p=pObject.getChildIndex();			
				if (p>=0 && p>pMaxi)
				{
					oMaxi=pObject;
					pMaxi=p;
				}
			}
		}
		
		if (oMaxi!=null)
		{
            var FValue = (oMaxi.hoCreationId << 16) + (oMaxi.hoNumber&0xFFFF);

            if (param1 == 0)
            {
                param1 = this.holdFValue;
            }

            // Returns TRUE if the object is the last sprite (= if it's fixed value is the same as the one of the last sprite)
            if (param1 == FValue)
            {
                return true;
            }
        }
        return false;	
    },

    cndAbove:function(cnd)
    {
        var param1 = cnd.getParamExpression(this.rh, 0);
        var param2 = cnd.getParamExpression(this.rh, 1);
        return this.cndAboveRout(param1, param2);
    },

    cndAboveRout:function(param1, param2)
    {
        var roPtr1 = null;
        var roPtr2 = null;
        var FValue1;
        var FValue2;

        if (param1 == 0)
        {
            param1 = this.holdFValue;
        }

        if (param2 == 0)
        {
            param2 = this.holdFValue;
        }

        for (roPtr1=this.ho.getFirstObject(); roPtr1!=null; roPtr1=this.ho.getNextObject())
        {
            FValue1 = (roPtr1.hoCreationId << 16) + (roPtr1.hoNumber&0xFFFF);
            if (roPtr1.ros!=null && param1 == FValue1)
            {
                //We have a match, get the second object
		        for (roPtr2=this.ho.getFirstObject(); roPtr2!=null; roPtr2=this.ho.getNextObject())
		        {
		            FValue2 = (roPtr2.hoCreationId << 16) + (roPtr2.hoNumber&0xFFFF);
                    if (roPtr2.ros!=null && param2 == FValue2)
                    {
	                    if (roPtr1.hoLayer != roPtr2.hoLayer)			// Different layer?
	                    {
	                        return (roPtr1.hoLayer>roPtr2.hoLayer);
	                    }
						var i1=roPtr1.getChildIndex();
						var i2=roPtr2.getChildIndex();
						if (i1>=0 && i2>=0)
						{
		                    if (i1>i2)
		                    {
		                        return true;
		                    }
						}
						return false;
                    }
                }
            }
        }
        return false;
    },

    cndBelow:function(cnd)
    {
        var param1 = cnd.getParamExpression(this.rh, 0);
        var param2 = cnd.getParamExpression(this.rh, 1);
        return this.cndBelowRout(param1, param2);
    },

    cndBelowRout:function(param1, param2)
    {
        var roPtr1 = null;
        var roPtr2 = null;
        var FValue1;
        var FValue2;

        if (param1 == 0)
        {
            param1 = this.holdFValue;
        }

        if (param2 == 0)
        {
            param2 = this.holdFValue;
        }

        for (roPtr1=this.ho.getFirstObject(); roPtr1!=null; roPtr1=this.ho.getNextObject())
        {
            FValue1 = (roPtr1.hoCreationId << 16) + (roPtr1.hoNumber&0xFFFF);
            if (roPtr1.ros!=null && param1 == FValue1)
            {
                //We have a match, get the second object
		        for (roPtr2=this.ho.getFirstObject(); roPtr2!=null; roPtr2=this.ho.getNextObject())
		        {
		            FValue2 = (roPtr2.hoCreationId << 16) + (roPtr2.hoNumber&0xFFFF);
                    if (roPtr2.ros!=null && param2 == FValue2)
                    {
	                    if (roPtr1.hoLayer != roPtr2.hoLayer)			// Different layer?
	                    {
	                        return (roPtr1.hoLayer<roPtr2.hoLayer);
	                    }
						var i1=roPtr1.getChildIndex();
						var i2=roPtr2.getChildIndex();
						if (i1>=0 && i2>=0)
						{
		                    if (i1<i2)
		                    {
		                        return true;
		                    }
						}
						return false;
                    }
                }
            }
        }
        return false;
    },

    cndBetween:function(cnd)
    {
        var p1 = cnd.getParamExpression(this.rh, 0);
        var p2 = cnd.getParamExpression(this.rh, 1);
        var p3 = cnd.getParamExpression(this.rh, 2);

        var roPtr1 = null;
        var roPtr2 = null;
        var sprPtr1 = null;
        var sprPtr2 = null;
        var sprPtr3 = null;
        var FValue1;
        var FValue2;

        if (p1 == 0)
        {
            p1 = this.holdFValue;
        }	
        if (p2 == 0)
        {
            p2 = this.holdFValue;
        }	
        if (p3 == 0)
        {
            p3 = this.holdFValue;
        }

        var bFound2 = false;
        var bFound3 = false;
        for (roPtr1=this.ho.getFirstObject(); roPtr1!=null; roPtr1=this.ho.getNextObject())
        {
            FValue1 = (roPtr1.hoCreationId << 16) + (roPtr1.hoNumber&0xFFFF);
            if (roPtr1.ros!=null && p1 == FValue1)
            {
            	sprPtr1=roPtr1;
            	break;
            }
        }
		if (sprPtr1!=null)
		{	            	
            //We have a match, get the second object
	        for (roPtr2=this.ho.getFirstObject(); roPtr2!=null; roPtr2=this.ho.getNextObject())
	        {
	            FValue2 = (roPtr2.hoCreationId << 16) + (roPtr2.hoNumber&0xFFFF);
                if (roPtr2.ros!=null && p2 == FValue2)
                {
                    sprPtr2 = roPtr2;
                }	
                if (roPtr2.ros!=null && p3 == FValue2)
                {
                    sprPtr3 = roPtr2;
                }
                if (sprPtr2!=null && sprPtr3!=null)
                {
                	break;
                }
            }
            if ((sprPtr1 != null) && (sprPtr2 != null) && (sprPtr3 != null))
            {
                // MMF2
                var n1=sprPtr1.getChildIndex();
                var n2=sprPtr2.getChildIndex();
                var n3=sprPtr3.getChildIndex();
                if (n1>=0 && n2>=0 && n3>=0)
                {
	                if ((n3 > n1 && n1 > n2) || (n2 > n1 && n1 > n3))
	                {
	                    return true;
	                }
	            }
            }
        }
        return false;
    },

    cndAtBackObj:function(cnd)
    {
        var param1= cnd.getParamObject(this.rh, 0);
        return this.lyrProcessCondition(param1, null, 0);
    },

    cndAtFrontObj:function(cnd)
    {
        var param1= cnd.getParamObject(this.rh, 0);
        return this.lyrProcessCondition(param1, null, 1);
    },

    cndAboveObj:function(cnd)
    {
        var param1= cnd.getParamObject(this.rh, 0);
        var param2= cnd.getParamObject(this.rh, 1);
        return this.lyrProcessCondition(param1, param2, 2);
    },

    cndBelowObj:function(cnd)
    {
        var param1= cnd.getParamObject(this.rh, 0);
        var param2= cnd.getParamObject(this.rh, 1);
        return this.lyrProcessCondition(param1, param2, 3);
    },

    cndBetweenObj:function(cnd)
    {
        var IsAbove = false;
        var IsBelow = false;

        var ObjectA= cnd.getParamObject(this.rh, 0);
        var ObjectB= cnd.getParamObject(this.rh, 1);
        var ObjectC= cnd.getParamObject(this.rh, 2);

        var IsBetween = false;

        // Is Object A between Object B and Object C?
        if (IsAbove = this.lyrProcessCondition(ObjectA, ObjectB, 2))
        {
            if (IsBelow = this.lyrProcessCondition(ObjectA, ObjectC, 3))
            {
                IsBetween = true;
            }
        }

        if (!IsBetween)
        {
            IsAbove = false;

            this.lyrResetEventList(this.lyrGetOILfromEVP(ObjectA));
            if (IsBelow = this.lyrProcessCondition(ObjectA, ObjectB, 3))
            {
                if (IsAbove = this.lyrProcessCondition(ObjectA, ObjectC, 2))
                {
                    IsBetween = true;
                }
            }
        }
        return IsBetween;
    },

    cndIsLayerVisible:function(cnd)
    {
        var param1 = cnd.getParamExpression(this.rh, 0);
        if (param1 > 0 && param1 <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[param1 - 1];
            return pLayer.bVisible;
        }
        return false;
    },

    // Returns index of layer (1-based) or 0 if layer not found
    FindLayerByName:function(pName)
    {
        if (pName != null)
        {
            var nLayer;
            for (nLayer = 0; nLayer < this.ho.hoAdRunHeader.rhFrame.nLayers; nLayer++)
            {
                var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer];
                if (pLayer.pName!=null && CServices.compareStringsIgnoreCase(pName, pLayer.pName))
                {
                    return (nLayer + 1);
                }
            }
        }
        return 0;
    },

    cndIsLayerVisibleByName:function(cnd)
    {
        var param1 = cnd.getParamExpString(this.rh, 0);

        var nLayer = this.FindLayerByName(param1);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            return pLayer.bVisible;
        }
        return false;
    },

    // Actions
    // -------------------------------------------------
    action:function(num, act)
    {
        switch (num)
        {
            case 0:
                this.actBackOne(act);
                break;
            case 1:
                this.actForwardOne(act);
                break;
            case 2:
                this.actSwap(act);
                break;
            case 3:
                this.actSetObj(act);
                break;
            case 4:
                this.actBringFront(act);
                break;
            case 5:
                this.actSendBack(act);
                break;
            case 6:
                this.actBackN(act);
                break;
            case 7:
                this.actForwardN(act);
                break;
            case 8:
                this.actReverse(act);
                break;
            case 9:
                this.actMoveAbove(act);
                break;
            case 10:
                this.actMoveBelow(act);
                break;
            case 11:
                this.actMoveToN(act);
                break;
            case 12:
                this.actSortByXUP(act);
                break;
            case 13:
                this.actSortByYUP(act);
                break;
            case 14:
                this.actSortByXDOWN(act);
                break;
            case 15:
                this.actSortByYDOWN(act);
                break;
            case 16:
                this.actBackOneObj(act);
                break;
            case 17:
                this.actForwardOneObj(act);
                break;
            case 18:
                this.ctSwapObj(act);
                break;
            case 19:
                this.actBringFrontObj(act);
                break;
            case 20:
                this.actSendBackObj(act);
                break;
            case 21:
                this.actBackNObj(act);
                break;
            case 22:
                this.actForwardNObj(act);
                break;
            case 23:
                this.actMoveAboveObj(act);
                break;
            case 24:
                this.actMoveBelowObj(act);
                break;
            case 25:
                this.actMoveToNObj(act);
                break;
            case 26:
                this.actSortByALTUP(act);
                break;
            case 27:
	            this.actSortByALTDOWN(act);
                break;
            case 28:
                this.actSetLayerX(act);
                break;
            case 29:
                this.actSetLayerY(act);
                break;
            case 30:
                this.actSetLayerXY(act);
                break;
            case 31:
                this.actShowLayer(act);
                break;
            case 32:
                this.actHideLayer(act);
                break;
            case 33:
                this.actSetLayerXByName(act);
                break;
            case 34:
                this.actSetLayerYByName(act);
                break;
            case 35:
                this.actSetLayerXYByName(act);
                break;
            case 36:
                this.actShowLayerByName(act);
                break;
            case 37:
                this.actHideLayerByName(act);
                break;
            case 38:
                this.actSetCurrentLayer(act);
                break;
            case 39:
                this.actSetCurrentLayerByName(act);
                break;
            case 40:
                this.actSetLayerCoefX(act);
                break;
            case 41:
                this.actSetLayerCoefY(act);
                break;
            case 42:
                this.actSetLayerCoefXByName(act);
                break;
            case 43:
                this.actSetLayerCoefYByName(act);
                break;
			case 44:
				this.actSetLayerEffect(act);
				break;
			case 46:
				this.actSetLayerAlpha(act);
				break;
			case 47:
				this.actSetLayerRGB(act);
				break;
			case 48:
				this.actSetLayerEffectByName(act);
				break;
			case 50:
				this.actSetLayerAlphaByName(act);
				break;
			case 51:
				this.actSetLayerRGBByName(act);
				break;
        }
    },

    actBackOne:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        this.actBackOneRout(param1);
    },

    actBackOneRout:function(param1)
    {
        var sprPtr1;
        var sprPtr2;
        if ((sprPtr1 = this.lyrGetSprite(param1)) != null)
        {
        	var index=sprPtr1.getChildIndex();
        	sprPtr1.setChildIndex(index-1);
        }
    },

    actForwardOne:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        this.actForwardOneRout(param1);
    },

    actForwardOneRout:function(param1)
    {
        var sprPtr1;

        if ((sprPtr1 = this.lyrGetSprite(param1)) != null)
        {
        	var index=sprPtr1.getChildIndex();
        	sprPtr1.setChildIndex(index+1);
        }
    },

    actSwap:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        this.actSwapRout(param1, param2);
    },

    actSwapRout:function(param1, param2)
    {
        var sprPtr1;
        var sprPtr2;

        if ((sprPtr1 = this.lyrGetSprite(param1)) != null)
        {
            if ((sprPtr2 = this.lyrGetSprite(param2)) != null)
            {
                if (sprPtr1.hoLayer==sprPtr2.hoLayer)
                {
                    this.lyrSwapThem(sprPtr1, sprPtr2, true);
                }
            }
        }
    },

    actSetObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        this.holdFValue = this.lyrGetFVfromOIL(roPtr.hoOiList);
    },

    actBringFront:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        this.actBringFrontRout(param1);
    },

    actBringFrontRout:function(param1)
    {
        var pSpr = this.lyrGetSprite(param1);		// (npSpr)roPtr->roc.rcSprite;
        if (pSpr != null)
        {
        	pSpr.setChildIndex(100000);
        }
    },

    actSendBack:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        this.actSendBackRout(param1);
    },

    actSendBackRout:function(param1)
    {
        var pSpr = this.lyrGetSprite(param1);		// (npSpr)roPtr->roc.rcSprite;
        if (pSpr != null)
        {
        	pSpr.setChildIndex(0);
        }	
    },

    actBackN:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        this.actBackNRout(param1, param2);
    },

    actBackNRout:function(param1, param2)
    {
        var sprPtr1;
        sprPtr1 = this.lyrGetSprite(param1);
        if (sprPtr1 != null)
        {
        	var index=sprPtr1.getChildIndex();
        	index-=param2;
        	if (index<0)
        	{
        		index=0;
        	}
        	sprPtr1.setChildIndex(index);
        }
    },

    actForwardN:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        this.actForwardNRout(param1, param2);
    },

    actForwardNRout:function(param1, param2)
    {
        var sprPtr1;
        sprPtr1 = this.lyrGetSprite(param1);
        
        if (sprPtr1 != null)
        {
        	var index=sprPtr1.getChildIndex();
        	index+=param2;
        	sprPtr1.setChildIndex(index);
        }
    },

    actReverse:function(act)
    {
        var sprPtr1;	
        var nLayer = this.wCurrentLayer;
		var objects=new Array(this.ho.hoAdRunHeader.rhNObjects);
		var count=0;
		for (sprPtr1=this.ho.getFirstObject(); sprPtr1!=null; sprPtr1=this.ho.getNextObject());
		{
			if (sprPtr1.ros!=null && sprPtr1.hoLayer==nLayer)
			{
				objects[count++]=sprPtr1;
			}					
		}	

		var n;
		for (n=count-1; n>=0; n--)
		{
			objects[n].setChildIndex(100000);
		}
    },

    actMoveAbove:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        this.actMoveAboveRout(param1, param2);
    },

    actMoveAboveRout:function(param1, param2)
    {
        var sprPtr1;
        var sprPtr2;

		sprPtr1 = this.lyrGetSprite(param1);
        if (sprPtr1 != null)
        {
        	sprPtr2 = this.lyrGetSprite(param2);
            if (sprPtr2 != null)
            {
                if (sprPtr1.hoLayer == sprPtr2.hoLayer)
                {
                	var index=sprPtr2.getChildIndex();
                	sprPtr1.setChildIndex(index+1);
                }
            }
        }
    },

    actMoveBelow:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        this.actMoveBelowRout(param1, param2);
    },

    actMoveBelowRout:function(param1, param2)
    {
        var sprPtr1;
        var sprPtr2;

		sprPtr1 = this.lyrGetSprite(param1);
        if (sprPtr1 != null)
        {
        	sprPtr2 = this.lyrGetSprite(param2);
            if (sprPtr2 != null)
            {
                if (sprPtr1.hoLayer == sprPtr2.hoLayer)
                {
                	var index=sprPtr2.getChildIndex();
                	sprPtr1.setChildIndex(index-1);
                }
            }
        }
    },

    actMoveToN:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        this.actMoveToNRout(param1, param2);
    },

    actMoveToNRout:function(param1, param2)
    {
        var sprPtr1;
        sprPtr1 = this.lyrGetSprite(param1);
        if (sprPtr1 != null)
        {
        	sprPtr1.setChildIndex(param2);
        }
    },

    actSortByXUP:function(act)
    {
        this.lyrSortBy(CRunLayer.X_UP, 0, 0);
    },

    actSortByYUP:function(act)
    {
        this.lyrSortBy(CRunLayer.Y_UP, 0, 0);
    },

    actSortByXDOWN:function(act)
    {
        this.lyrSortBy(CRunLayer.X_DOWN, 0, 0);
    },

    actSortByYDOWN:function(act)
    {
        this.lyrSortBy(CRunLayer.Y_DOWN, 0, 0);
    },

    actBackOneObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        var oilPtr = roPtr.hoOiList;
        if (roPtr!=null)
        {
	        this.actBackOneRout(this.lyrGetFVfromOIL(oilPtr));
        }
    },

    actForwardOneObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        if (roPtr!=null)
        {
	        this.actForwardOneRout(this.lyrGetFVfromOIL(roPtr.hoOiList));
        }
    },

    actSwapObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        var roPtr2 = act.getParamObject(this.rh, 1);
        if (roPtr!=null && roPtr2!=null)
        {		
        	this.actSwapRout(this.lyrGetFVfromOIL(roPtr.hoOiList), this.lyrGetFVfromOIL(roPtr2.hoOiList));
        }
    },

    actBringFrontObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        if (roPtr!=null)
        {
	        this.actBringFrontRout(this.lyrGetFVfromOIL(roPtr.hoOiList));
        }
    },

    actSendBackObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        if (roPtr!=null)
        {
	        this.actSendBackRout(this.lyrGetFVfromOIL(roPtr.hoOiList));
        }
    },

    actBackNObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        if (roPtr!=null)
        {
	        this.actBackNRout(this.lyrGetFVfromOIL(roPtr.hoOiList), param2);
        }
    },

    actForwardNObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        if (roPtr!=null)
        {
	        this.actForwardNRout(this.lyrGetFVfromOIL(roPtr.hoOiList), param2);
        }
    },

    actMoveAboveObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        var roPtr2 = act.getParamObject(this.rh, 1);
        if (roPtr!=null && roPtr2!=null)
        {
        	this.actMoveAboveRout(this.lyrGetFVfromOIL(roPtr.hoOiList), this.lyrGetFVfromOIL(roPtr2.hoOiList));
        }
    },

    actMoveBelowObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        var roPtr2 = act.getParamObject(this.rh, 1);
        if (roPtr!=null && roPtr2!=null)
        {
	        this.actMoveBelowRout(this.lyrGetFVfromOIL(roPtr.hoOiList), this.lyrGetFVfromOIL(roPtr2.hoOiList));
        }
    },

    actMoveToNObj:function(act)
    {
        var roPtr = act.getParamObject(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        if (roPtr!=null)
        {
        	this.actMoveToNRout(this.lyrGetFVfromOIL(roPtr.hoOiList), param2);
        }
    },

    actSortByALTUP:function(act)
    {
        var param1 = act.getParamAltValue(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        this.lyrSortBy(CRunLayer.ALT_UP, param2, param1);
    },

    actSortByALTDOWN:function(act)
    {
        var param1 = act.getParamAltValue(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        this.lyrSortBy(CRunLayer.ALT_DOWN, param2, param1);
    },

    actSetLayerX:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        if (param1 > 0 && param1 <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[param1 - 1];
            var newX = -param2;
            if (pLayer.x != newX || pLayer.dx != 0)
            {
                pLayer.dx = newX-pLayer.x;
                this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

    actSetLayerY:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        if (param1 > 0 && param1 <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[param1 - 1];
            var newY = -param2;
            if (pLayer.y != newY || pLayer.dy != 0)
            {
                pLayer.dy = newY-pLayer.y;
                this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

    actSetLayerXY:function(act)
    {
        var nLayer = act.getParamExpression(this.rh, 0);
        var newX = act.getParamExpression(this.rh, 1);
        var newY = act.getParamExpression(this.rh, 2);

        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            if (pLayer.x != newX || pLayer.dx != 0 || pLayer.y != newY || pLayer.dy != 0)
            {
                pLayer.dx = newX;
                pLayer.dy = newY;
                this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

    actShowLayer:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        if (param1 > 0 && param1 <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
        	this.ho.hoAdRunHeader.showLayer(param1-1);
        }
    },

    actHideLayer:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        if (param1 > 0 && param1 <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
        	this.ho.hoAdRunHeader.hideLayer(param1-1);
        }
    },

    actSetLayerXByName:function(act)
    {
        var param1 = act.getParamExpString(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);

        var nLayer = this.FindLayerByName(param1);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            var newX = -param2;
            if (pLayer.x != newX || pLayer.dx != 0)
            {
                pLayer.dx = newX;
                this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

    actSetLayerYByName:function(act)
    {
        var param1 = act.getParamExpString(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);

        var nLayer = this.FindLayerByName(param1);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            var newY = -param2;
            if (pLayer.y != newY || pLayer.dy != 0)
            {
                pLayer.dy = newY;
                this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

    actSetLayerXYByName:function(act)
    {
        var param1 = act.getParamExpString(this.rh, 0);
        var newX = act.getParamExpression(this.rh, 1);
        var newY = act.getParamExpression(this.rh, 2);

        var nLayer = this.FindLayerByName(param1);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            if (pLayer.x != newX || pLayer.dx != 0 || pLayer.y != newY || pLayer.dy != 0)
            {
                pLayer.dx = newX;
                pLayer.dy = newY;
                this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

    actShowLayerByName:function(act)
    {
        var param1 = act.getParamExpString(this.rh, 0);

        var nLayer = this.FindLayerByName(param1);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
        	this.ho.hoAdRunHeader.showLayer(nLayer-1);
        }
    },

    actHideLayerByName:function(act)
    {
        var param1 = act.getParamExpString(this.rh, 0);

        var nLayer = this.FindLayerByName(param1);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
        	this.ho.hoAdRunHeader.hideLayer(nLayer-1);
        }
    },

    actSetCurrentLayer:function(act)
    {
        var nLayer = act.getParamExpression(this.rh, 0);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            this.wCurrentLayer = (nLayer - 1);
        }
    },

    actSetCurrentLayerByName:function(act)
    {
        var name = act.getParamExpString(this.rh, 0);
        var nLayer = this.FindLayerByName(name);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            this.wCurrentLayer = (nLayer - 1);
        }
    },

    actSetLayerCoefX:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var newCoef = act.getParamExpDouble(this.rh, 1);

        if (param1 > 0 && param1 <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[param1 - 1];
            if (pLayer.xCoef != newCoef)
            {
                pLayer.xCoef = newCoef;
                this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

    actSetLayerCoefY:function(act)
    {
        var param1 = act.getParamExpression(this.rh, 0);
        var newCoef = act.getParamExpDouble(this.rh, 1);

        if (param1 > 0 && param1 <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[param1 - 1];
            if (pLayer.yCoef != newCoef)
            {
                pLayer.yCoef = newCoef;
                this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

    actSetLayerCoefXByName:function(act)
    {
        var param1 = act.getParamExpString(this.rh, 0);
        var newCoef = act.getParamExpDouble(this.rh, 1);

        var nLayer = this.FindLayerByName(param1);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            if (pLayer.xCoef != newCoef)
            {
                pLayer.xCoef = newCoef;
                this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

    actSetLayerCoefYByName:function(act)
    {
        var param1 = act.getParamExpString(this.rh, 0);
        var newCoef = act.getParamExpDouble(this.rh, 1);

        var nLayer = this.FindLayerByName(param1);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            if (pLayer.yCoef != newCoef)
            {
                pLayer.yCoef = newCoef;
         		this.ho.hoAdRunHeader.scrollLayers();
            }
        }
    },

	actSetLayerEffect:function(act)
	{
	},
	
	actSetLayerEffectByName:function(act)
	{
	},
	actSetLayerAlpha:function(act)
	{
	},
	actSetLayerAlphaByName:function(act)
	{
	},
	actSetLayerRGB:function(act)
	{
	},
	actSetLayerRGBByName:function(act)
	{
	},
	
	
    // Expressions
    // --------------------------------------------
    expression:function(num)
    {
        switch (num)
        {
            case 0:
                return this.expGetFV();
            case 1:
                return this.expGetTopFV();
            case 2:
                return this.expGetBottomFV();
            case 3:
                return this.expGetDesc();
            case 4:
                return this.expGetDesc10();
            case 5:
                return this.expGetNumLevels();
            case 6:
                return this.expGetLevel();
            case 7:
                return this.expGetLevelFV();
            case 8:
                return this.expGetLayerX();
            case 9:
                return this.expGetLayerY();
            case 10:
                return this.expGetLayerXByName();
            case 11:
                return this.expGetLayerYByName();
            case 12:
                return this.expGetLayerCount();
            case 13:
                return this.expGetLayerName();
            case 14:
                return this.expGetLayerIndex();
            case 15:
                return this.expGetCurrentLayer();
            case 16:
                return this.expGetLayerCoefX();
            case 17:
                return this.expGetLayerCoefY();
            case 18:
                return this.expGetLayerCoefXByName();
            case 19:
                return this.expGetLayerCoefYByName();
			case 20:
				return this.expGetLayerEffectParam();
			case 21:
				return this.expGetLayerAlpha();
			case 22:
				return this.expGetLayerRGB();
			case 23:
				return this.expGetLayerEffectParamByName();
			case 24:
				return this.expGetLayerAlphaByName();
			case 25:
				return this.expGetLayerRGBByName();		
        }
        return null;
    },

    expGetFV:function()
    {
        var roPtr;
        var oilPtr;

        var FValue = 0;
        var objName = this.ho.getExpParam();

        if (objName.length==0)
        {
            return (this.holdFValue);
        }

		for (roPtr=this.ho.getFirstObject(); roPtr!=null; roPtr=this.ho.getNextObject());
		{
			if (roPtr.ros!=null)
			{
            	oilPtr = roPtr.hoOiList;

            	if (CServices.compareStringsIgnoreCase(objName, oilPtr.oilName))
            	{
                	FValue = (roPtr.hoCreationId << 16) + (roPtr.hoNumber&0xFFFF);
                	return (FValue);
             	}
			}	
        }
        return (0);
    },

    expGetTopFV:function()
    {
        var nLayer = this.wCurrentLayer;

        var roPtr;
		var oMaxi=null;
		var iMaxi=-1;
		var i;
		for (roPtr=this.ho.getFirstObject(); roPtr!=null; roPtr=this.ho.getNextObject())
		{
			if (roPtr.ros!=null && roPtr.hoLayer==nLayer)
			{
				i=roPtr.getChildIndex();
				if (i>iMaxi)
				{
					iMaxi=i;
					oMaxi=roPtr;
				}		
			}
		}	
		if (oMaxi!=null)
		{
            return ((oMaxi.hoCreationId << 16) + (oMaxi.hoNumber&0xFFFF));
		}			
		return (0);
    },

    expGetBottomFV:function()
    {
        var nLayer = this.wCurrentLayer;

        var roPtr;
		var oMini=null;
		var iMini=1000000;
		var i;
		for (roPtr=this.ho.getFirstObject(); roPtr!=null; roPtr=this.ho.getNextObject())
		{
			if (roPtr.ros!=null && roPtr.hoLayer==nLayer)
			{
				i=roPtr.getChildIndex();
				if (i<iMini)
				{
					iMini=i;
					oMini=roPtr;
				}		
			}
		}	
		if (oMini!=null)
		{
            return ((oMini.hoCreationId << 16) + (oMini.hoNumber&0xFFFF));
		}			
		return (0);
    },

    expGetDesc:function()
    {
        var lvlN = this.ho.getExpParam();
        var ps = this.lyrGetList(lvlN, 1);
        return ps;
    },

    expGetDesc10:function()
    {
        var lvlN = this.ho.getExpParam();
        var ps = this.lyrGetList(lvlN, 10);
        return ps;
    },

    expGetNumLevels:function()
    {
        var nLayer = this.wCurrentLayer;	
		if (nLayer>=0 || nLayer<this.ho.hoAdRunHeader.rhFrame.nLayers)
		{
			var layer=this.ho.hoAdRunHeader.rhFrame.layers[nLayer];
			return (layer.planeSprites.numChildren);
		}
        return (0);
    },

    expGetLevel:function()
    {
        var roPtr;
        var FindFixed = this.ho.getExpParam();	
        if (FindFixed == 0)
        {
            FindFixed = this.holdFValue;
        }	
		roPtr=this.lyrGetSprite(FindFixed);
		if (roPtr!=null)
		{
			return (roPtr.getChildIndex());
		}
		return (0);
    },

    expGetLevelFV:function()
    {
        var nLayer = this.wCurrentLayer;

        var roPtr;
        var FValue = 0;
        var FindLevel = this.ho.getExpParam();

		for (roPtr=this.ho.getFirstObject(); roPtr!=null; roPtr=this.ho.getNextObject())
		{
			if (roPtr.ros!=null && roPtr.hoLayer==nLayer)
			{
				var i=roPtr.getChildIndex();
				if (i==FindLevel)
				{
                    FValue = (roPtr.hoCreationId << 16) + (roPtr.hoNumber&0xFFFF);
                    break;
				}
			}
		}
		return (FValue);
    },

    expGetLayerX:function()
    {
        var nLayer = this.ho.getExpParam();

        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            return (-(pLayer.x + pLayer.dx));
        }
        return (0);
    },

    expGetLayerY:function()
    {
        var nLayer = this.ho.getExpParam();

        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            return (-(pLayer.y + pLayer.dy));
        }
        return (0);
    },

    expGetLayerXByName:function()
    {
        var pName = this.ho.getExpParam();

        var nLayer = this.FindLayerByName(pName);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            return (-(pLayer.x + pLayer.dx));
        }
        return (0);
    },

    expGetLayerYByName:function()
    {
        var pName = this.ho.getExpParam();

        var nLayer = this.FindLayerByName(pName);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            return (-(pLayer.y + pLayer.dy));
        }
        return (0);
    },

    expGetLayerCount:function()
    {
        return (this.ho.hoAdRunHeader.rhFrame.nLayers);
    },

    expGetLayerName:function()
    {
        var nLayer = this.ho.getExpParam();
		var ret="";
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            ret=pLayer.pName;
        }
        return ret;
    },

    expGetLayerIndex:function()
    {
        var pName = this.ho.getExpParam();
        var ret=(this.FindLayerByName(pName));
        return ret;
    },

    expGetCurrentLayer:function()
    {
        return (this.wCurrentLayer + 1);
    },

    expGetLayerCoefX:function()
    {
        var nLayer = this.ho.getExpParam();
		var ret=0;
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            ret=pLayer.xCoef;
        }
        return ret;
    },

    expGetLayerCoefY:function()
    {
        var nLayer = this.ho.getExpParam();
		var ret=(0);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            ret=pLayer.yCoef;
        }
        return ret;
    },

    expGetLayerCoefXByName:function()
    {
        var pName = this.ho.getExpParam();

        var nLayer = this.FindLayerByName(pName);
		var ret=(0);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            ret=pLayer.xCoef;
        }
        return ret;
    },

    expGetLayerCoefYByName:function()
    {
        var pName = this.ho.getExpParam();

        var nLayer = this.FindLayerByName(pName);
		var ret=(0);
        if (nLayer > 0 && nLayer <= this.ho.hoAdRunHeader.rhFrame.nLayers)
        {
            var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer - 1];
            ret=pLayer.yCoef;
        }
        return ret;
    },

	expGetLayerEffectParam:function()
	{
		this.ho.getExpParam();
		return (0);
	},
	expGetLayerEffectParamByName:function()
	{
		this.ho.getExpParam();
		return (0);
	},
	expGetLayerAlpha:function()
	{
		this.ho.getExpParam();
		return 255;
	},
	expGetLayerAlphaByName:function()
	{
		this.ho.getExpParam();
		return 255;
	},
	expGetLayerRGB:function()
	{
		this.ho.getExpParam();
		return 0xFFFFFF;
	},
	expGetLayerRGBByName:function()
	{
		this.ho.getExpParam();
		return 0xFFFFFF;
	},
	
    // SORT ROUTINES
    // --------------------------------------------------------
    // Exchange 2 sprites in the linked list
    lyrSwapSpr:function(sp1, sp2)
    {
        // Security
        if (sp1 == sp2)
        {
            return;
        }

        // Cannot swap sprites from different layers
        if (sp1.hoLayer != sp2.hoLayer)
        {
            return;
        }

		var i1=sp1.getChildIndex();
		var i2=sp2.getChildIndex();
		if (i1>=0 && i2>=0)
		{
			sp1.setChildIndex(i2);
			sp2.setChildIndex(i1);
        }
    },

    lyrSwapThem:function(sprPtr1, sprPtr2, bRedraw)
    {
        // Exchange sprites
        this.lyrSwapSpr(sprPtr1, sprPtr2);	
        return true;
    },

    lyrGetSprite:function(fixedValue)
    {
        var roPtr;

        if (fixedValue == 0)
        {
            fixedValue = this.holdFValue;
        }

        var fValue;
        for (roPtr=this.ho.getFirstObject(); roPtr!=null; roPtr=this.ho.getNextObject())
        {
            fValue = (roPtr.hoCreationId << 16) + roPtr.hoNumber;
            if (roPtr.ros!=null && fixedValue == fValue)
            {
                return roPtr;
            }
        }
        return null;
    },

    lyrGetROfromFV:function(fixedValue)
    {
    	return this.lyrGetSprite(fixedValue);
    },

    lyrSortBy:function(flag, altDefaultVal, altValue)
    {
    	// Cree la liste des sprites
        var nLayer = this.wCurrentLayer;
        var spriteList= new CArrayList();
        var tmp;
        var pSprite;
        for (pSprite=this.ho.getFirstObject(); pSprite!=null; pSprite=this.ho.getNextObject())
        {
        	if (pSprite.ros!=null)
        	{
	        	if (pSprite.hoLayer==nLayer)
	        	{	        		
	            	tmp = new CRunLayerSortData();
	            	if (pSprite.getChildIndex()>=0)
	            	{
	            		tmp.object=pSprite;
		            	tmp.cmpFlag = flag;	
		                tmp.sprX = pSprite.hoX;
	                	tmp.sprY = pSprite.hoY;	
						tmp.sprAlt = altDefaultVal;
		                if (pSprite.rov != null)
		                {
		                	if (pSprite.rov.rvValues!=null)
		                	{
		                		if (pSprite.rov.rvValues[altValue]!=null)
		                		{
			                        tmp.sprAlt = pSprite.rov.rvValues[altValue];
		                		}
		                	}
		                }
		            	spriteList.add(tmp);
		            }
	            }
	        }
        }

        // TRI (a bulle en attendant mieux)
        var count = 0;
        var n;
        do
        {
            count = 0;
            for (n = 0; n < spriteList.size() - 1; n++)
            {
                if (this.isGreater(spriteList.get(n), spriteList.get(n + 1)))
                {
                    tmp = spriteList.get(n + 1);
                    spriteList.set(n + 1, spriteList.get(n));
                    spriteList.set(n, tmp);
                    count++;
                }
            }
        } while (count != 0);

		// Rearrange the sprites
		for (count=0; count<spriteList.size(); count++)
		{
			tmp=spriteList.get(count);
			pSprite=tmp.object;
			pSprite.setChildIndex(1000000);
		}
        return false;
    },

    isGreater:function(item1, item2)
    {
        // MMF2
        var p1 = item1.object;
        var p2 = item2.object;
        if (p1.hoLayer != p2.hoLayer)
        {
            return (p1.hoLayer < p2.hoLayer);
        }
        switch (item1.cmpFlag)
        {
            case 0:     // CRunLayer.X_UP
                return item1.sprX < item2.sprX;
            case 1:     // CRunLayer.X_DOWN
                return item1.sprX > item2.sprX;
            case 2:     // CRunLayer.Y_UP:
                return item1.sprY < item2.sprY;
            case 3:     // CRunLayer.Y_DOWN:
                return item1.sprY > item2.sprY;
            case 4:     // CRunLayer.ALT_UP:
                return item1.sprAlt < item2.sprAlt;
            case 5:     // CRunLayer.ALT_DOWN:
                return item1.sprAlt > item2.sprAlt;
        }
        return false;
    },

    lyrGetList:function(lvlStart, iteration)
    {
        var szList = "Lvl\tName\tFV\n\n";
        var szReturn;
        var nLayer = this.wCurrentLayer;

        var hoPtr;
        var oilPtr;

        var fValue = 0;
        var lvlCount = 0;

		for (hoPtr=this.ho.getFirstObject(); hoPtr!=null; hoPtr=this.ho.getNextObject())
		{
			if (hoPtr.ros!=null && hoPtr.hoLayer==nLayer)
			{
	            while (hoPtr!= null && hoPtr.ros!=null && (this.ho.hoLayer==nLayer) && (++lvlCount < (lvlStart + iteration)))
            	{
                	if (lvlCount >= lvlStart)
                	{
                        oilPtr = hoPtr.hoOiList;
                        fValue = (hoPtr.hoCreationId << 16) + (hoPtr.hoNumber&0xFFFF);
                        var buffer = lvlCount.toString();
                        buffer+="\t";
                        buffer+=oilPtr.oilName;
                        buffer+="\t";
                        buffer+=fValue.toString();
                        buffer+="\n";
                        szList+=buffer;
                    }
                    else
                    {
                        lvlCount--;
                    }
                }
                hoPtr=this.ho.getNextObject();
            }
            break;
        }
        return szList;
    },

    lyrGetFVfromEVP:function(evp)
    {
        var oilPtr=this.ho.hoAdRunHeader.rhOiList[evp.oiList];

        var hoPtr;
        if (oilPtr.oilCurrentOi != -1)
        {
            hoPtr = this.ho.hoAdRunHeader.rhObjectList[oilPtr.oilCurrentOi];
        }
        else
        {
            if (oilPtr.oilObject >= 0)
            {
                hoPtr = this.ho.hoAdRunHeader.rhObjectList[oilPtr.oilObject];
            }
            else
            {
                return 0;
            }
        }
        return (hoPtr.hoCreationId << 16) + (hoPtr.hoNumber&0xFFFF);
    },

    lyrGetROfromEVP:function(evp)
    {
        var oilPtr = this.ho.hoAdRunHeader.rhOiList[evp.oiList];

        if (oilPtr.oilEventCount == this.ho.hoAdRunHeader.rhEvtProg.rh2EventCount)
        {
            return this.ho.hoAdRunHeader.rhObjectList[oilPtr.oilListSelected];
        }
        else
        {
            if (oilPtr.oilObject >= 0)
            {
                return this.ho.hoAdRunHeader.rhObjectList[oilPtr.oilObject];
            }
            else
            {
                return null;
            }
        }
    },

    lyrGetOILfromEVP:function(evp)
    {
        if (evp.oiList < 0)
        {
            return null;
        }
        return this.ho.hoAdRunHeader.rhOiList[evp.oiList];
    },

    lyrGetFVfromOIL:function(oilPtr)
    {
        var hoPtr;

        if (oilPtr.oilEventCount == this.ho.hoAdRunHeader.rhEvtProg.rh2EventCount)
        {
            hoPtr = this.ho.hoAdRunHeader.rhObjectList[oilPtr.oilListSelected];
        }
        else
        {
            if (oilPtr.oilObject >= 0)
            {
                hoPtr = this.ho.hoAdRunHeader.rhObjectList[oilPtr.oilObject];
            }
            else
            {
                return 0;
            }
        }
        return (hoPtr.hoCreationId << 16) + (hoPtr.hoNumber&0xFFFF);
    },

    lyrResetEventList:function(oilPtr)
    {
        if (oilPtr.oilEventCount == this.ho.hoAdRunHeader.rhEvtProg.rh2EventCount)
        {
            oilPtr.oilEventCount = -1;
        }
        return;
    },

    lyrProcessCondition:function(param1, param2, cond)
    {
        var lReturn;

        var oilPtr1 = this.lyrGetOILfromEVP(param1);
        if (oilPtr1 == null)
        {
            return false;
        }
        var roPtr1;
        if ((roPtr1 = this.lyrGetROfromEVP(param1)) == null)
        {
            return false;
        }

        var oilPtr2 = null;
        var roPtr2 = null;	
        if (param2 != null)
        {
            oilPtr2 = this.lyrGetOILfromEVP(param2);
            if ((roPtr2 = this.lyrGetROfromEVP(param2)) == null)
            {
                return false;
            }
        }

        //We only build a list for the primary parameter (param1)
        //Save the first object
        //Save the number selected
        var RootObj = -1;
        var NumCount = 0;
        var bMatch;

        var FValue1 = -1;
        var FValue2 = -1;

        var bPassed = false;

        var roTempPtr;
        var roTempNumber = 0;
        var i, j;
        var Loop2;
        var DoLevel2;
        if (oilPtr1.oilEventCount == this.ho.hoAdRunHeader.rhEvtProg.rh2EventCount)
        {
            if (param2 != null)
            {
                FValue1 = this.lyrGetFVfromOIL(this.lyrGetOILfromEVP(param1));
                for (i = 1; i <= oilPtr1.oilNumOfSelected; i++)
                {
                    bMatch = false;

                    FValue2 = this.lyrGetFVfromOIL(this.lyrGetOILfromEVP(param2));
	
                    if (oilPtr2.oilEventCount == this.ho.hoAdRunHeader.rhEvtProg.rh2EventCount)
                    {
                        Loop2 = oilPtr2.oilNumOfSelected;
                        DoLevel2 = true;
                    }
                    else
                    {
                        Loop2 = oilPtr2.oilNObjects;
                        DoLevel2 = false;
                    }

                    for (j = 1; j <= Loop2; j++)
                    {
                        lReturn = this.doCondition(cond, FValue1, FValue2);
                        if (lReturn)
                        {
                            bMatch = true;
                        }

                        if (DoLevel2)
                        {
                            if (roPtr2.hoNextSelected > -1)
                            {
                                roPtr2 = this.ho.hoAdRunHeader.rhObjectList[roPtr2.hoNextSelected];
                                FValue2 = (roPtr2.hoCreationId << 16) + (roPtr2.hoNumber&0xFFFF);
                            }
                        }
                        else
                        {
                            if (roPtr2.hoNumNext > -1)
                            {
                                roPtr2 = this.ho.hoAdRunHeader.rhObjectList[roPtr2.hoNumNext];
                                FValue2 = (roPtr2.hoCreationId << 16) + (roPtr2.hoNumber&0xFFFF);
                            }
                        }
                    }

                    if (bMatch)
                    {
                        bPassed = true;
                        NumCount++;

                        if (RootObj == -1)
                        {
                            RootObj = roPtr1.hoNumber;
                        }
                        else
                        {
                            roTempPtr = this.ho.hoAdRunHeader.rhObjectList[roTempNumber];
                            roTempPtr.hoNextSelected = roPtr1.hoNumber;
                        }
                        roTempNumber = roPtr1.hoNumber;
                    }

                    if (roPtr1.hoNextSelected > -1)
                    {
                        roPtr1 = this.ho.hoAdRunHeader.rhObjectList[roPtr1.hoNextSelected];
                        FValue1 = (roPtr1.hoCreationId << 16) + (roPtr1.hoNumber&0xFFFF);
                    }
                }
            }
            else
            {
                FValue1 = this.lyrGetFVfromOIL(this.lyrGetOILfromEVP(param1));
                for (i = 1; i <= oilPtr1.oilNumOfSelected; i++)
                {
                    bMatch = false;

                    lReturn = this.doCondition(cond, FValue1, FValue2);
                    if (lReturn)
                    {
                        bPassed = true;
                        NumCount++;
                        if (RootObj == -1)
                        {
                            RootObj = roPtr1.hoNumber;
                        }
                        else
                        {
                            roTempPtr = this.ho.hoAdRunHeader.rhObjectList[roTempNumber];
                            roTempPtr.hoNextSelected = roPtr1.hoNumber;
                        }

                        roTempNumber = roPtr1.hoNumber;
                    }

                    if (roPtr1.hoNextSelected > -1)
                    {
                        roPtr1 = this.ho.hoAdRunHeader.rhObjectList[roPtr1.hoNextSelected];
                        FValue1 = (roPtr1.hoCreationId << 16) + (roPtr1.hoNumber&0xFFFF);
                    }
                }
            }
        }
        else
        {
            if (param2 != null)
            {
                FValue1 = this.lyrGetFVfromOIL(this.lyrGetOILfromEVP(param1));
                for (i = 1; i <= oilPtr1.oilNObjects; i++)
                {
                    bMatch = false;

                    FValue2 = this.lyrGetFVfromOIL(this.lyrGetOILfromEVP(param2));

                    if (oilPtr2.oilEventCount == this.ho.hoAdRunHeader.rhEvtProg.rh2EventCount)
                    {
                        Loop2 = oilPtr2.oilNumOfSelected;
                        DoLevel2 = true;
                    }
                    else
                    {
                        Loop2 = oilPtr2.oilNObjects;
                        DoLevel2 = false;
                    }

                    for (j = 1; j <= Loop2; j++)
                    {
                        lReturn = this.doCondition(cond, FValue1, FValue2);
                        if (lReturn)
                        {
                            bMatch = true;
                        }

                        if (DoLevel2)
                        {
                            if (roPtr2.hoNextSelected > -1)
                            {
                                roPtr2 = this.ho.hoAdRunHeader.rhObjectList[roPtr2.hoNextSelected];
                                FValue2 = (roPtr2.hoCreationId << 16) + (roPtr2.hoNumber&0xFFFF);
                            }
                        }
                        else
                        {
                            if (roPtr2.hoNumNext > -1)
                            {
                                roPtr2 = this.ho.hoAdRunHeader.rhObjectList[roPtr2.hoNumNext];
                                FValue2 = (roPtr2.hoCreationId << 16) + (roPtr2.hoNumber&0xFFFF);
                            }
                        }
                    }

                    if (bMatch)
                    {
                        bPassed = true;
                        NumCount++;
                        if (RootObj == -1)
                        {
                            RootObj = roPtr1.hoNumber;
                        }
                        else
                        {
                            roTempPtr = this.ho.hoAdRunHeader.rhObjectList[roTempNumber];
                            roTempPtr.hoNextSelected = roPtr1.hoNumber;
                        }
                        roTempNumber = roPtr1.hoNumber;
                    }

                    if (roPtr1.hoNumNext > -1)
                    {
                        roPtr1 = this.ho.hoAdRunHeader.rhObjectList[roPtr1.hoNumNext];
                        FValue1 = (roPtr1.hoCreationId << 16) + roPtr1.hoNumber;
                    }
                }
            }
            else
            {
                FValue1 = this.lyrGetFVfromOIL(this.lyrGetOILfromEVP(param1));
                for (i = 1; i <= oilPtr1.oilNObjects; i++)
                {
                    bMatch = false;

                    lReturn = this.doCondition(cond, FValue1, FValue2);
                    if (lReturn)
                    {
                        bPassed = true;
                        NumCount++;
                        if (RootObj == -1)
                        {
                            RootObj = roPtr1.hoNumber;
                        }
                        else
                        {
                            roTempPtr = this.ho.hoAdRunHeader.rhObjectList[roTempNumber];
                            roTempPtr.hoNextSelected = roPtr1.hoNumber;
                        }
                        roTempNumber = roPtr1.hoNumber;
                    }

                    if (roPtr1.hoNumNext > -1)
                    {
                        roPtr1 = this.ho.hoAdRunHeader.rhObjectList[roPtr1.hoNumNext];
                        FValue1 = (roPtr1.hoCreationId << 16) + (roPtr1.hoNumber&0xFFFF);
                    }
                }
            }
        }

        oilPtr1.oilListSelected = RootObj;
        oilPtr1.oilNumOfSelected = NumCount;

        if (bPassed)
        {
            oilPtr1.oilEventCount = this.ho.hoAdRunHeader.rhEvtProg.rh2EventCount;
            roTempPtr = this.ho.hoAdRunHeader.rhObjectList[roTempNumber];
            roTempPtr.hoNextSelected = -1;
        }
        return bPassed;
    },

    doCondition:function(cond, param1, param2)
    {
        switch (cond)
        {
            case 0:
                return this.cndAtBackRout(param1);
            case 1:
                return this.cndAtFrontRout(param1);
            case 2:
                return this.cndAboveRout(param1, param2);
            case 3:
                return this.cndBelowRout(param1, param2);
        }
        return false;
    }
});

function CRunLayerSortData()
{
    this.object=null;
    this.sprX=0;
    this.sprY=0;
    this.sprAlt=0;
    this.cmpFlag=0;
}

	

