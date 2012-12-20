//----------------------------------------------------------------------------------
//
// CRUNINVENTORY
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
Inventory.CND_NAMEDITEMSELECTED=0;
Inventory.CND_NAMEDCOMPARENITEMS=1;
Inventory.CND_ITEMSELECTED=2;
Inventory.CND_COMPARENITEMS=3;
Inventory.CND_NAMEDITEMPRESENT=4;
Inventory.CND_ITEMPRESENT=5;
Inventory.CND_NAMEDHILIGHTED=6;
Inventory.CND_HILIGHTED=7;
Inventory.CND_CANADD=8;
Inventory.CND_NAMEDCANADD=9;
Inventory.CND_LAST=10;
Inventory.ACT_NAMEDADDITEM=0;
Inventory.ACT_NAMEDADDNITEMS=1;
Inventory.ACT_NAMEDDELITEM=2;
Inventory.ACT_NAMEDDELNITEMS=3;
Inventory.ACT_NAMEDHIDEITEM=4;
Inventory.ACT_NAMEDSHOWITEM=5;
Inventory.ACT_ADDITEM=6;
Inventory.ACT_ADDNITEMS=7;
Inventory.ACT_DELITEM=8;
Inventory.ACT_DELNITEMS=9;
Inventory.ACT_HIDEITEM=10;
Inventory.ACT_SHOWITEM=11;
Inventory.ACT_LEFT=12;
Inventory.ACT_RIGHT=13;
Inventory.ACT_UP=14;
Inventory.ACT_DOWN=15;
Inventory.ACT_SELECT=16;
Inventory.ACT_CURSOR=17;
Inventory.ACT_NAMEDSETSTRING=18;
Inventory.ACT_SETSTRING=19;
Inventory.ACT_ACTIVATE=20;
Inventory.ACT_NAMEDSETMAXIMUM=21;
Inventory.ACT_SETMAXIMUM=22;
Inventory.ACT_SETPOSITION=23;
Inventory.ACT_SETPAGE=24;
Inventory.ACT_ADDPROPERTY=25;
Inventory.ACT_NAMEDSETPROPMINMAX=26;
Inventory.ACT_SETPROPMINMAX=27;
Inventory.ACT_NAMEDADDPROPERTY=28;
Inventory.ACT_ADDGRIDITEM=29;
Inventory.ACT_ADDGRIDNITEMS=30;
Inventory.ACT_NAMEDADDGRIDITEM=31;
Inventory.ACT_NAMEDADDGRIDNITEMS=32;
Inventory.ACT_HILIGHTDROP=33;
Inventory.ACT_NAMEDHILIGHTDROP=34;
Inventory.ACT_SAVE=35;
Inventory.ACT_LOAD=36;
Inventory.ACT_ADDLISTITEM=37;
Inventory.ACT_ADDLISTNITEMS=38;
Inventory.ACT_NAMEDADDLISTITEM=39;
Inventory.ACT_NAMEDADDLISTNITEMS=40;
Inventory.EXP_NITEM=0;
Inventory.EXP_NAMEOFHILIGHTED=1;
Inventory.EXP_NAMEOFSELECTED=2;
Inventory.EXP_POSITION=3;
Inventory.EXP_PAGE=4;
Inventory.EXP_TOTAL=5;
Inventory.EXP_DISPLAYED=6;
Inventory.EXP_NUMOFSELECTED=7;
Inventory.EXP_NUMOFHILIGHTED=8;
Inventory.EXP_NAMEOFNUM=9;
Inventory.EXP_MAXITEM=10;
Inventory.EXP_NUMBERMAXITEM=11;
Inventory.EXP_NUMBERNITEM=12;
Inventory.EXP_GETPROPERTY=13;
Inventory.EXP_NUMBERGETPROPERTY=14;

Inventory.IFLAG_CURSOR=0x0001;
Inventory.IFLAG_HSCROLL=0x0002;
Inventory.IFLAG_VSCROLL=0x0004;
Inventory.IFLAG_SORT=0x0010;
Inventory.IFLAG_MOUSE=0x0020;
Inventory.IFLAG_FORCECURSOR=0x0040;
Inventory.IFLAG_CURSORBYACTION=0x0080;
Inventory.IFLAG_DISPLAYGRID=0x0100;
Inventory.INVTYPE_LIST=0;
Inventory.INVTYPE_GRID=1;

Inventory.VK_LEFT= 1;
Inventory.VK_RIGHT= 2;
Inventory.VK_UP= 3;
Inventory.VK_DOWN= 4;
Inventory.VK_RETURN= 5;
Inventory.inventory=null;
Inventory.SX_SEPARATION=8;
Inventory.SY_SEPARATION=8;


function CRunInventory()
{
	this.type=0;
	this.number=0;
	this.itemSx=0;
	this.itemSy=0;
	this.flags=0;
	this.textAlignment=0;
	this.logFont=null;
	this.fontColor=0;
	this.scrollColor=0;
	this.scrollColor2=0;
	this.cursorColor=0;
	this.gridColor=0;
	this.cursorType=0;
	this.pDisplayString=null;

	this.displayList=new CArrayList();
	this.objectList=new CArrayList();
	this.slider=null;
	this.nColumns=0;
	this.nLines=0;
	this.position=0;
	this.xCursor=0;
	this.yCursor=0;
	this.bUpdateList=false;
	this.bRedraw=false;
	this.displayQuantity=0;
	this.showQuantity=0;
	this.oldKey=0;
	this.selectedCount=0;
	this.oldBMouse=false;
	this.bActivated=false;
	this.pNameSelected=null;
	this.pNameHilighted=null;
	this.maximum=0;
	this.numSelected=0;
	this.numHilighted=0;
	this.pGrid=null;
	this.rcDrop=new CRect();
	this.bDropItem=false;
	this.scrollX=0;
	this.scrollY=0;
	this.scrollPosition=0;
	this.oldBHidden=false;
	this.font=null;
    this.conditionString=null;
}

CRunInventory.prototype = CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return Inventory.CND_LAST;
    },

	createRunObject:function(file, cob, version)
    {
		this.ho.hoImgWidth=file.read();
		this.ho.hoImgHeight=file.read();
		this.number=file.readShort();
		this.itemSx=file.readShort();
		this.itemSy=file.readShort();
		this.flags=file.read();
		this.textAlignment=file.read();
		this.logFont=file.readLogFont();
		this.fontColor=file.readColor();
		this.scrollColor=file.readColor();
		this.displayQuantity=file.read();
		this.showQuantity=file.read();
		this.scrollColor2=file.readColor();
		this.maximum=file.read();
		this.cursorColor=file.readColor();
		this.cursorType=file.read();
		this.type=file.readShort();
		this.gridColor=file.readColor();
		this.pDisplayString=file.readString();
		this.nColumns=Math.max(this.ho.hoImgWidth/this.itemSx, 1);
		this.nLines=Math.max(this.ho.hoImgHeight/this.itemSy, 1);
		this.selectedCount=-1;
		this.numSelected=-1;
		this.numHilighted=-1;
		this.position=0;
		this.bDropItem=false;
		this.oldBHidden=false;
		this.bUpdateList=true;

		if (Inventory.inventory==null)
		{
			Inventory.inventory=new CRunInventoryList ()
		}

		if (this.type==Inventory.INVTYPE_LIST)
		{
			this.slider=new CRunInventoryScrollBar (sliderSprite);
			this.SetSlider();
		}
		this.UpdateDisplayList();
        return true;
    },

	SetSlider:function() 
	{
		var x, y;
		if ((this.flags&Inventory.IFLAG_HSCROLL)!=0)
		{
			x=0;
			y=this.ho.hoImgHeight-CRunInventoryScrollBar.SY_SLIDER;
			this.slider.Initialise(this.rh, x, y, this.ho.hoImgWidth, CRunInventoryScrollBar.SY_SLIDER, this.scrollColor, this.scrollColor2, this);
		}
		else if ((this.flags&Inventory.IFLAG_VSCROLL)!=0)
		{
			x=this.ho.hoImgWidth-CRunInventoryScrollBar.SX_SLIDER;
			y=0;
			this.slider.Initialise(this.rh, x, y, CRunInventoryScrollBar.SX_SLIDER, this.ho.hoImgHeight, this.scrollColor, this.scrollColor2, this);
		}
	},
	
	obHide:function(hoPtr) 
	{
		hoPtr.ros.obHide();
	},

	obShow:function(hoPtr) 
	{
		hoPtr.ros.obShow();
	},

	GetFixedValue:function(pHo) 
	{
		return (pHo.hoCreationId<<16)|(pHo.hoNumber&0xFFFF);
	},

	GetHO:function(fixedValue) 
	{
		var hoPtr=this.rh.rhObjectList[fixedValue&0xFFFF];
		if (hoPtr!=null && hoPtr.hoCreationId==fixedValue>>16)
		{
			return hoPtr;
		}
		return null;
	},

	showHide:function(bHidden) 
	{
		var n;
		var hoPtr;
		if (!bHidden)
		{
			for (n=0; n<this.objectList.size(); n++)
			{
				hoPtr=this.GetHO((this.objectList.get(n)));
				if (hoPtr!=null)
				{
					this.obShow(hoPtr);
				}
			}
		}
		else
		{
			for (n=0; n<this.objectList.size(); n++)
			{
				hoPtr=this.GetHO((this.objectList.get(n)));
				if (hoPtr!=null)
				{
					this.obHide(hoPtr);
				}
			}
		}
	},

	CenterDisplay:function(pos) 
	{
		var size=this.nColumns*this.nLines;
		if (pos<this.position)
		{
			this.position=pos;
		}
		else if (pos>=this.position+size)
		{
			this.position=Math.max(0, pos-size+1);
		}
	},

	UpdateDisplayList:function() 
	{
		this.displayList.clear();
		this.objectList.clear();
		var n;
		if (this.type==Inventory.INVTYPE_GRID)
		{
			if (this.pGrid==null)
			{
				this.pGrid=new Array(this.nColumns*this.nLines);
			}
			for (n=this.nColumns*this.nLines-1; n>=0; n--)
				this.pGrid[n]=0;
		}

		var pItem;
		for (pItem=Inventory.inventory.FirstItem(this.number); pItem!=null; pItem=Inventory.inventory.NextItem(this.number))
		{
			var pName=pItem.GetName();
			var objectNum=0;
			for (var nObject=0; nObject<this.rh.rhNObjects; objectNum++, nObject++)
			{
				while(this.rh.rhObjectList[objectNum]==null) objectNum++;
				var hoPtr=this.rh.rhObjectList[objectNum];
				if (hoPtr.hoType==2)
				{
					var pOiList=hoPtr.hoOiList;
					if (pOiList.oilName==pName)
					{
						if (pItem.GetQuantity()>=this.showQuantity)
						{
							if ((pItem.GetFlags()&CRunInventoryItem.FLAG_VISIBLE)!=0)
							{
								this.displayList.add(pItem);
								var fix=this.GetFixedValue(hoPtr);
								this.objectList.add(fix);
								if (this.type==Inventory.INVTYPE_GRID)
								{
									var sx=(hoPtr.hoImgWidth+this.itemSx-1)/this.itemSx;
									var sy=(hoPtr.hoImgHeight+this.itemSy-1)/this.itemSy;
									var x, y;
									for (y=0; y<sy; y++)
									{
										for (x=0; x<sx; x++)
										{
											this.pGrid[(pItem.y+y)*this.nColumns+pItem.x+x]=fix;
										}
									}
									var index=hoPtr.getChildMaxIndex();
									hoPtr.setChildIndex(index-1);
								}
							}
							else
							{
								this.obHide(hoPtr);
							}
							break;
						}
						else
						{
							this.obHide(hoPtr);
						}
					}
				}
			}
		}
		if (this.type==Inventory.INVTYPE_LIST && this.displayList.size()>2 && (this.flags&Inventory.IFLAG_SORT)!=0)
		{
			var bFlag=true;
			while(bFlag==true)
			{
				bFlag=false;
				for (n=0; n<this.displayList.size()-1; n++)
				{
					var pItem1=(this.displayList.get(n));
					var pItem2=(this.displayList.get(n+1));
					var pName1=pItem1.GetName();
					var pName2=pItem2.GetName();
					if (pName1==pName2)
					{
						this.displayList.swap(n, n+1);
						this.objectList.swap(n, n+1);
						bFlag=true;
					}
				}
			}
		}
		this.bUpdateList=true;
		this.ho.redraw();
	},


	SetPosition:function(pHo, x, y) 
	{
		pHo.hoX=x+pHo.hoImgXSpot;
		pHo.hoY=y+pHo.hoImgYSpot;
		pHo.rom.rmMoveFlag=true;	
		pHo.roc.rcChanged=true;
		pHo.roc.rcCheckCollides=true;
	},

	CheckDisplayList:function() 
	{
		var bRet=false;
		var o;
		for (o=0; o<this.displayList.size(); o++)
		{
			var pItem=(this.displayList.get(o));
			var fixedValue=(this.objectList.get(o));
			var hoPtr=this.GetHO(fixedValue);
			if (hoPtr==null)
			{
				this.displayList.removeObject(o);
				this.objectList.removeObject(o);
				o--;
				bRet=true;
			}
		}
		return bRet;
	},

	Scroll:function(tpe, slide)
	{
		var pos=this.position;
		if (this.slider.bHorizontal==false)
		{
			switch(tpe)
			{
			case CRunInventoryScrollBar.SCROLL_UP:
				pos--;
				break;
			case CRunInventoryScrollBar.SCROLL_PAGEUP:
				pos-=this.nColumns;
				break;
			case CRunInventoryScrollBar.SCROLL_PAGEDOWN:
				pos+=this.nColumns;
				break;
			case CRunInventoryScrollBar.SCROLL_DOWN:
				pos++;
				break;
			case CRunInventoryScrollBar.SCROLL_SLIDE:
				pos=slide;
				break;
			}
		}
		else
		{
			switch(tpe)
			{
			case CRunInventoryScrollBar.SCROLL_UP:
				pos--;
				break;
			case CRunInventoryScrollBar.SCROLL_PAGEUP:
				pos-=this.nLines;
				break;
			case CRunInventoryScrollBar.SCROLL_PAGEDOWN:
				pos+=this.nLines;
				break;
			case CRunInventoryScrollBar.SCROLL_DOWN:
				pos++;
				break;
			case CRunInventoryScrollBar.SCROLL_SLIDE:
				pos=slide;
				break;
			}
		}
		if (pos<0)
		{
			pos=0;
		}
		if (pos>this.displayList.size()-this.nColumns*this.nLines)
		{
			pos=this.displayList.size()-this.nColumns*this.nLines;
		}
		if (pos!=this.position)
		{
			this.position=pos;
			this.slider.SetPosition(this.position, Math.min(this.displayList.size()-this.position, this.nLines*this.nColumns), this.displayList.size()); 
			this.bRedraw=true;
			this.bUpdateList=true;
		}
	},
	CleanList:function()
	{
		var n;
		for (n=0; n<this.objectList.size(); n++)
		{
			var fixed=(this.objectList.get(n));
			if (this.GetHO(fixed)==null)
			{
				var pItem =(this.displayList.get(n));
				Inventory.inventory.list.removeObject(pItem);
			}
		}
	},

	GetGridRect:function(x, y, pRc) 
	{
		var fix=this.pGrid[y*this.nColumns+x];
		if (fix!=0)
		{
			var xx, yy;
			for (xx=0; xx<x; xx++)
			{
				if (this.pGrid[y*this.nColumns+xx]==fix)
				{
					break;
				}
			}
			pRc.left=xx*this.itemSx;
			for (xx=x; xx<this.nColumns; xx++)
			{
				if (this.pGrid[y*this.nColumns+xx]!=fix)
				{
					break;
				}
			}
			pRc.right=xx*this.itemSx;
			for (yy=0; yy<y; yy++)
			{
				if (this.pGrid[yy*this.nColumns+x]==fix)
				{
					break;
				}
			}
			pRc.top=yy*this.itemSy;
			for (yy=y; yy<this.nLines; yy++)
			{
				if (this.pGrid[yy*this.nColumns+x]!=fix)
				{
					break;
				}
			}
			pRc.bottom=yy*this.itemSy;
		}
		else
		{
			pRc.left=x*this.itemSx;
			pRc.right=pRc.left+this.itemSx;
			pRc.top=y*this.itemSy;
			pRc.bottom=pRc.top+this.itemSy;
		}
		return fix;
	},

	getKeys:function()
    {    	
        var key=0;
/*       
        if (this.rh.rhApp.this.getKeystate(38))
            key = Inventory.VK_UP;
		if (this.rh.rhApp.this.getKeystate(40))
            key = Inventory.VK_DOWN;
		if (this.rh.rhApp.this.getKeystate(37))
            key = Inventory.VK_LEFT;
		if (this.rh.rhApp.this.getKeystate(39))
            key = Inventory.VK_RIGHT;
		if (this.rh.rhApp.this.getKeystate(13))
            key = Inventory.VK_RETURN;
*/            
        return key;
    },
    handleRunObject:function()
    {
		var ret=0;
		var bUpdate=false;

		this.CleanList();
		if (this.bUpdateList)
		{
			this.UpdateDisplayList();
			ret=REFLAG_DISPLAY;
		}
		else
		{
			if (this.CheckDisplayList())
			{
				ret=REFLAG_DISPLAY;
			}
		}
		if (this.bRedraw)
		{
			ret=REFLAG_DISPLAY;
			this.bRedraw=false;
		}

		var bHidden=(this.ho.ros.rsFlags&CRSpr.RSFLAG_HIDDEN)!=0;
		if (bHidden!=this.oldBHidden)
		{
			this.oldBHidden=bHidden;
			this.showHide(bHidden);
		}
		if (bHidden)
		{
			return ret;
		}

        var fix;
        var x, y, xx, yy;
        var bFlag;
		var pItem;
		var hoPtr;
		var bMouse;
		var key;
		this.numHilighted=-1;
		this.pNameHilighted="";
        if (this.type == Inventory.INVTYPE_LIST)
		{
			if (this.position>0 && this.position>Math.max(0, this.displayList.size()-this.nLines*this.nColumns))
			{
				this.position=Math.max(this.displayList.size()-this.nLines*this.nColumns, 0);
				bUpdate=true;
			}
			if (this.position+this.yCursor*this.nColumns+this.xCursor>=this.displayList.size())
			{
				this.xCursor=0;
				this.yCursor=0;
				bUpdate=true;
			}
			if (this.displayList.size()>0)
			{
				xx=this.rh.rh2MouseX-this.ho.hoX;
				yy=this.rh.rh2MouseY-this.ho.hoY;
				x=xx;
				y=yy;
				bFlag=false;
				if ((this.flags&Inventory.IFLAG_MOUSE)!=0)
				{
					if (x>=0 && y>=0 && x<this.ho.hoImgWidth && y<this.ho.hoImgHeight)
					{
						if (this.slider.IsMouseInBar(xx, yy)==false)
						{
							x/=this.itemSx;
							y/=this.itemSy;
							if (x<this.nColumns && y<this.nLines)
							{
								var o=this.position+y*this.nColumns+x;
								if (o<this.position+this.displayList.size())
								{
									bFlag=true;
									if (this.xCursor!=x || this.yCursor!=y)
									{
										this.xCursor=x;
										this.yCursor=y;
										bUpdate=true;
									}
									pItem=(this.displayList.get(o));
									this.pNameHilighted=pItem.GetName();
									this.numHilighted=o;
								}
							}
						}
					}
				}
// FRANCOIS				bMouse=this.rh.rhApp.this.getKeystate(260);
				if (bMouse!=this.oldBMouse)
				{
					this.oldBMouse=bMouse;
					if (bMouse==true && (this.flags&Inventory.IFLAG_MOUSE)!=0)
					{
						this.scrollX=x*this.itemSx;
						this.scrollY=y*this.itemSy;
						this.scrollPosition=this.position;
						this.pNameSelected=this.pNameHilighted;
						this.numSelected=this.position+this.yCursor*this.nColumns+this.xCursor;
						this.selectedCount=this.rh.rh4EventCount;
						pItem=(this.displayList.get(this.position+this.yCursor*this.nColumns+this.xCursor));
						hoPtr=this.GetHO((this.objectList.get(this.position+this.yCursor*this.nColumns+this.xCursor)));
                        this.conditionString=pItem.GetName();
						this.ho.generateEvent(Inventory.CND_NAMEDITEMSELECTED, 0);
						this.ho.generateEvent(Inventory.CND_ITEMSELECTED, hoPtr.hoOi);
					}
					if ((this.flags&Inventory.IFLAG_CURSOR)!=0 && x>=0 && y>=0 && x<this.ho.hoImgWidth && y<this.ho.hoImgHeight)
					{
						this.bActivated=true;
						this.xCursor=x/this.itemSx;
						this.yCursor=y/this.itemSy;
						bUpdate=true;
					}
					else
					{
						this.bActivated=false;
						bUpdate=true;
					}
				}
				if (bMouse)
				{
					if (this.slider.IsDragging()==false && this.slider.IsMouseInBar(xx, yy)==false)
					{
						if ((this.flags&Inventory.IFLAG_VSCROLL)!=0)
						{
							if (yy<this.scrollY)
								this.position=this.scrollPosition-((yy-this.scrollY-this.itemSy)/this.itemSy)*this.nColumns;
							else
								this.position=this.scrollPosition-((yy-this.scrollY)/this.itemSy)*this.nColumns;
							if (this.position<0)
								this.position=0;
							if (this.position>Math.max(0, this.displayList.size()-this.nLines*this.nColumns))
								this.position=Math.max(this.displayList.size()-this.nLines*this.nColumns, 0);
							bUpdate=true;
						}
						else if ((this.flags&Inventory.IFLAG_HSCROLL)!=0)
						{
							if (xx<this.scrollX)
								this.position=this.scrollPosition-((xx-this.scrollX-this.itemSx)/this.itemSx)*this.nLines;
							else
								this.position=this.scrollPosition-((xx-this.scrollX)/this.itemSx)*this.nLines;
							if (this.position<0)
								this.position=0;
							if (this.position>Math.max(0, this.displayList.size()-this.nLines*this.nColumns))
								this.position=Math.max(this.displayList.size()-this.nLines*this.nColumns, 0);
							bUpdate=true;
						}
					}
				}
				if (this.bActivated)
				{
					bFlag=true;
				}
                key= this.getKeys();
				if (this.bActivated && (this.flags&Inventory.IFLAG_CURSOR)!=0)
				{
					if (key!=this.oldKey)
					{
						this.oldKey=key;
						switch(key)
						{
						case Inventory.VK_UP:
							this.yCursor--;
							if (this.yCursor<0)
							{
								this.yCursor++;
								this.position=Math.max(this.position-this.nColumns, 0);
							}
							break;
						case Inventory.VK_DOWN:
							this.yCursor++;
							if (this.yCursor>=this.nLines)
							{
								this.yCursor--;
								this.position=Math.min(this.position+this.nColumns, this.displayList.size()-this.nColumns*this.nLines);
								this.position=Math.max(this.position, 0);
							}
							break;
						case Inventory.VK_RIGHT:
							this.xCursor++;
							if (this.xCursor>=this.nColumns)
							{
								this.xCursor--;
								this.position=Math.min(this.position+1, this.displayList.size()-this.nColumns*this.nLines);
								this.position=Math.max(this.position, 0);
							}
							break;
						case Inventory.VK_LEFT:
							this.xCursor--;
							if (this.xCursor<0)
							{
								this.xCursor++;
								this.position=Math.max(this.position-1, 0);
							}
							break;
						case Inventory.VK_RETURN:
							{
								this.pNameSelected=this.pNameHilighted;
								this.selectedCount=this.rh.rh4EventCount;
								this.numSelected=this.position+this.yCursor*this.nColumns+this.xCursor;
								pItem=(this.displayList.get(this.position+this.yCursor*this.nColumns+this.xCursor));
								hoPtr=this.GetHO((this.objectList.get(this.position+this.yCursor*this.nColumns+this.xCursor)));
                                this.conditionString=pItem.GetName();
								this.ho.generateEvent(Inventory.CND_NAMEDITEMSELECTED, 0);
								this.ho.generateEvent(Inventory.CND_ITEMSELECTED, hoPtr.hoOi);
							}
							break;
						}
						bUpdate=true;
					}
				}
				if ((this.flags&Inventory.IFLAG_CURSORBYACTION)==0)
				{
					if (bFlag)
					{
						if ((this.flags&Inventory.IFLAG_FORCECURSOR)==0)
						{
							this.flags|=Inventory.IFLAG_FORCECURSOR;
							bUpdate=true;
						}
					}
					else
					{
						if ((this.flags&Inventory.IFLAG_FORCECURSOR)!=0)
						{
							this.flags&=~Inventory.IFLAG_FORCECURSOR;
							bUpdate=true;
						}
					}
				}
			}

			if (bUpdate)
			{
				if (this.slider.bInitialised)
				{
					this.slider.SetPosition(this.position, Math.min(this.displayList.size()-this.position, this.nLines*this.nColumns), this.displayList.size()); 
				}
			}
			if (this.slider.bInitialised)
			{
				this.slider.Handle(xx, yy);	
			}
		}
		else
		{
			// Grid display
			x=this.rh.rh2MouseX-this.ho.hoX;
			y=this.rh.rh2MouseY-this.ho.hoY;
			bFlag=false;
			if ((this.flags&Inventory.IFLAG_MOUSE)!=0)
			{
				if (x>=0 && y>=0 && x<this.ho.hoImgWidth && y<this.ho.hoImgHeight)
				{
					x/=this.itemSx;
					y/=this.itemSy;
					if (x<this.nColumns && y<this.nLines)
					{
						bFlag=true;
						if (this.xCursor!=x || this.yCursor!=y)
						{
							this.xCursor=x;
							this.yCursor=y;
							ret=REFLAG_DISPLAY;
						}
						o=y*this.nColumns+x;
						var fixed=this.pGrid[o];
						if (fixed!=0) 
						{
							var n;
							for (n=0; n<this.objectList.size(); n++)
								if (fixed==(this.objectList.get(n)))
									break;
							if (n<this.objectList.size())
							{
								pItem=(this.displayList.get(n));
								this.pNameHilighted=pItem.GetName();
								this.numHilighted=o;
							}
						}
					}
				}
			}
// FRANCOIS			bMouse=this.rh.rhApp.this.getKeystate(260);
			if (bMouse!=this.oldBMouse)
			{
				this.oldBMouse=bMouse;
				if (bMouse && (this.flags&Inventory.IFLAG_MOUSE)!=0)
				{
					fix=this.pGrid[this.yCursor*this.nColumns+this.xCursor];
					if (fix!=0)
					{
						this.pNameSelected=this.pNameHilighted;
						this.numSelected=this.yCursor*this.nColumns+this.xCursor;
						this.selectedCount=this.rh.rh4EventCount;
						hoPtr=this.GetHO(fix);
                        this.conditionString=hoPtr.hoOiList.oilName;
						this.ho.generateEvent(Inventory.CND_NAMEDITEMSELECTED, 0);
						this.ho.generateEvent(Inventory.CND_ITEMSELECTED, hoPtr.hoOi);
					}
				}
				if ((this.flags&Inventory.IFLAG_CURSOR)!=0 && x>=0 && y>=0 && x<this.ho.hoImgWidth && y<this.ho.hoImgHeight)
				{
					this.bActivated=true;
					this.xCursor=x/this.itemSx;
					this.yCursor=y/this.itemSy;
					ret=REFLAG_DISPLAY;
				}
				else
				{
					this.bActivated=false;
					ret=REFLAG_DISPLAY;
				}
			}
			if (this.bActivated)
			{
				bFlag=true;
			}
			key=this.getKeys();
			if (this.bActivated && (this.flags&Inventory.IFLAG_CURSOR)!=0)
			{
				if (key!=this.oldKey)
				{
					this.oldKey=key;
					switch(key)
					{
					case Inventory.VK_UP:
						if (this.yCursor>0)
						{
							y=this.yCursor-1;
							fix=this.pGrid[y*this.nColumns+this.xCursor];
							if (fix!=0)
							{
								while (y>0)
								{
									if (this.pGrid[(y-1)*this.nColumns+this.xCursor]!=fix)
									{
										break;
									}
									y--;
								}
							}
							this.yCursor=y;
						}
						break;
					case Inventory.VK_DOWN:
						if (this.yCursor<this.nLines-1)
						{
							fix=this.pGrid[this.yCursor*this.nColumns+this.xCursor];
							y=this.yCursor+1;
							if (fix!=0)
							{
								while (this.pGrid[y*this.nColumns+this.xCursor]==fix && y<this.nLines-1)
									y++;
							}
							this.yCursor=y;
						}
						break;
					case Inventory.VK_RIGHT:
						if (this.xCursor<this.nColumns-1)
						{
							fix=this.pGrid[this.yCursor*this.nColumns+this.xCursor];
							x=this.xCursor+1;
							if (fix!=0)
							{
								while (this.pGrid[this.yCursor*this.nColumns+x]==fix && x>0)
									x++;
							}
							this.xCursor=x;
						}
						break;
					case Inventory.VK_LEFT:
						if (this.xCursor>0)
						{
							x=this.xCursor-1;
							fix=this.pGrid[this.yCursor*this.nColumns+x];
							if (fix!=0)
							{
								while (x>0)
								{
									if (this.pGrid[this.yCursor*this.nColumns+x-1]!=fix)
									{
										break;
									}
									x--;
								}
							}
							this.xCursor=x;
						}
						break;
					case Inventory.VK_RETURN:
						{
							this.pNameSelected=this.pNameHilighted;
							this.selectedCount=this.rh.rh4EventCount;
							this.numSelected=this.position+this.yCursor*this.nColumns+this.xCursor;
							pItem=(this.displayList.get(this.position+this.yCursor*this.nColumns+this.xCursor));
                            if (pItem!=null)
                            {
							    hoPtr=this.GetHO((this.objectList.get(this.position + this.yCursor * this.nColumns + this.xCursor)));
                                this.conditionString=pItem.GetName();
							    this.ho.generateEvent(Inventory.CND_NAMEDITEMSELECTED, 0);
							    this.ho.generateEvent(Inventory.CND_ITEMSELECTED, hoPtr.hoOi);
                            }
						}
						break;
					}
					ret=REFLAG_DISPLAY;
				}
			}
			if ((this.flags&Inventory.IFLAG_CURSORBYACTION)==0)
			{
				if (bFlag)
				{
					if ((this.flags&Inventory.IFLAG_FORCECURSOR)==0)
					{
						this.flags|=Inventory.IFLAG_FORCECURSOR;
						ret=REFLAG_DISPLAY;
					}
				}
				else
				{
					if ((this.flags&Inventory.IFLAG_FORCECURSOR)!=0)
					{
						this.flags&=~Inventory.IFLAG_FORCECURSOR;
						ret=REFLAG_DISPLAY;
					}
				}
			}
		}
		if (bUpdate)
		{
			this.bUpdateList=true;
			ret=REFLAG_DISPLAY;
		}
		return ret;
    },


    displayRunObject:function(context, xDraw, yDraw)
    {
		sprite.graphics.clear();
		sprite.x=this.ho.hoX-this.rh.rhWindowX+pLayer.x;
		sprite.y=this.ho.hoY-this.rh.rhWindowY+pLayer.y;
		
		var rc;
		var x, y;
		var o;
		var xObject;
		var yObject;
		var sx;
		var sy;
		if (this.type==Inventory.INVTYPE_LIST)
		{
			if (this.displayList.size()==0)
			{
				return;
			}

			var count=0;
			for (o=0; o<this.displayList.size(); o++)
			{
				var hoPtr=this.GetHO((this.objectList.get(o)));
				if (hoPtr!=null)
				{
					if (o>=this.position && o<this.position+this.nLines*this.nColumns)
					{
						var pItem=(this.displayList.get(o));
						this.obShow(hoPtr);

						var line=(o-this.position)/this.nColumns;
						var column=(o-this.position)-line*this.nColumns;		
						xObject=column*this.itemSx+this.itemSx/2-hoPtr.hoImgWidth/2;
						yObject=line*this.itemSy+this.itemSy/2-hoPtr.hoImgHeight/2;

						if (o==this.position+this.xCursor+this.yCursor*this.nColumns)
						{
							rc=new CRect();
							rc.left=column*this.itemSx;
							rc.top=line*this.itemSy;
							rc.right=rc.left+this.itemSx-1;
							rc.bottom=rc.top+this.itemSy-1;
							if ((this.flags&Inventory.IFLAG_FORCECURSOR)!=0 && this.cursorType>0) 
							{
								if (this.cursorType==1)
								{
									sprite.graphics.lineStyle(1, this.cursorColor);	
									sprite.graphics.drawRect(rc.left, rc.top, rc.right-rc.left, rc.bottom-rc.top);
								}
								else
								{
									sprite.graphics.beginFill(this.cursorColor);
									sprite.graphics.drawRect(rc.left, rc.top, rc.right-rc.left, rc.bottom-rc.top);
									sprite.graphics.endFill();
								}
							}
						}

						if (this.maximum>1)
						{
							var rcText;
							var dtFlags;
                            var text=pItem.GetDisplayString();
                            var temp=null;
                            var pos=text.indexOf("%q");
                            if (pos>=0)
                            {
                                temp=text.substring(0, pos);
                                temp+=pItem.GetQuantity().toString();
                                temp+=text.substring(pos+2);
                                text = temp;
                            }
                            pos=text.indexOf("%m");
                            if (pos>=0)
                            {
                                temp=text.substring(0, pos);
                                temp+=pItem.GetMaximum().toString();
                                temp+=text.substring(pos+2);
                            }
                            text=temp;

							texts[count].text=text;
							texts[count].embedFonts=bEmbedFont;
							texts[count].setTextFormat(textFormats[count]);
							texts[count].width=this.itemSx;
							texts[count].height=this.itemSy;
							texts[count].multiline=false;
							texts[count].wordWrap=false;
							var sxText=texts[count].textWidth;
							var syText=texts[count].textHeight;
							
							if ((this.textAlignment&0x00000001)!=0)       // TEXT_ALIGN_LEFT)
							{								
								textFormats[count].align=TextFormatAlign.LEFT;
								texts[count].x=column*this.itemSx;
								xObject=(column+1)*this.itemSx-hoPtr.hoImgWidth;
							}
							else if ((this.textAlignment&0x00000002)!=0)  //TEXT_ALIGN_HCENTER)
							{
								textFormats[count].align=TextFormatAlign.CENTER;
								texts[count].x=column*this.itemSx;
							}
							else											// (this.textAlignment&TEXT_ALIGN_RIGHT)
							{
								xObject=column*this.itemSx;
								textFormats[count].align=TextFormatAlign.LEFT;
								texts[count].x=xObject+hoPtr.hoImgWidth+Inventory.SX_SEPARATION;
							}
							if ((this.textAlignment&0x00000008)!=0)       //TEXT_ALIGN_TOP)
							{
								sy=this.ho.hoImgHeight+Inventory.SY_SEPARATION+syText;
								texts[count].y=line*this.itemSy+this.itemSy/2-sy/2;
								yObject=texts[count].y+syText+Inventory.SY_SEPARATION;
							}
							else if ((this.textAlignment&0x00000010)!=0)  //TEXT_ALIGN_VCENTER)
							{
								texts[count].y=line*this.itemSy+this.itemSy/2-syText/2;
								yObject=line*this.itemSy+this.itemSy/2-hoPtr.hoImgHeight/2;
							}
							else											// (this.textAlignment&TEXT_ALIGN_BOTTOM)
							{
								sy=this.ho.hoImgHeight+Inventory.SY_SEPARATION+syText;
								yObject=line*this.itemSy+this.itemSy/2-sy/2;
								texts[count].y=yObject+hoPtr.hoImgHeight+Inventory.SY_SEPARATION;
							}
							texts[count].setTextFormat(textFormats[count]);
							if (pItem.GetQuantity()>=this.displayQuantity)
								texts[count].visible=true;
							else
								texts[count].visible=false;
						}
//						if (this.bUpdateList)
						{
							this.SetPosition(hoPtr, this.ho.hoX+xObject, this.ho.hoY+yObject);
						}
						count++;
					}
					else
					{
						this.obHide(hoPtr);
					}
				}
			}
			this.SetSlider();
			this.slider.DrawBar();
		}
		else
		{
			if ((this.flags&Inventory.IFLAG_DISPLAYGRID)!=0)
			{
				rc=new CRect();
				for (y=0; y<this.nLines; y++)
				{
					for (x=0; x<this.nColumns; x++)
					{
						this.GetGridRect(x, y, rc);
						sprite.graphics.lineStyle(1, this.gridColor);	
						sprite.graphics.drawRect(rc.left, rc.top, rc.right-rc.left, rc.bottom-rc.top);									
					}
				}		

				if (this.bDropItem==false)
				{
					this.GetGridRect(this.xCursor, this.yCursor, rc);
				}
				else
				{
					rc.copyRect(this.rcDrop);
				}
				if (this.bDropItem || ((this.flags&Inventory.IFLAG_FORCECURSOR)!=0 && this.cursorType>0)) 
				{
					sprite.graphics.beginFill(this.cursorColor);
					sprite.graphics.drawRect(rc.left, rc.top, rc.right-rc.left, rc.bottom-rc.top);
					sprite.graphics.endFill();
				}
			}
//				if (this.bUpdateList)
			{
				for (o=0; o<this.displayList.size(); o++)
				{
					hoPtr=this.GetHO((this.objectList.get(o)));
					if (hoPtr!=null)
					{
						pItem=(this.displayList.get(o));
						this.obShow(hoPtr);

						sx=(hoPtr.hoImgWidth+this.itemSx-1)/this.itemSx;
						sy=(hoPtr.hoImgHeight+this.itemSy-1)/this.itemSy;
						rc=new CRect();
						this.GetGridRect(pItem.x, pItem.y, rc);
						xObject=this.ho.hoX+(rc.left+rc.right)/2-sx+this.rh.rhWindowX-hoPtr.hoImgWidth/2;
						yObject=this.ho.hoY+(rc.top+rc.bottom)/2-sy+this.rh.rhWindowY-hoPtr.hoImgHeight/2;
						this.SetPosition(hoPtr, xObject, yObject);
					}
				}
			}
		}
		this.bUpdateList=false;
		this.bDropItem=false;
    },

    getRunObjectFont:function()
    {
        return this.logFont;
    }

    public override function setRunObjectFont(fi:CFontInfo, rc)
    {
        this.logFont = fi;
		var n;
		for (n=0; n<this.nLines*this.nColumns; n++)
			computeTextFormat(textFormats[n]);
        if (rc!=null)
        {
        	this.ho.hoImgWidth=rc.right-rc.left;
        	this.ho.hoImgHeight=rc.bottom-rc.top;
        }
		this.ho.redraw();
    }

    public override function getRunObjectTextColor() 
    {
        return this.fontColor;
    }

    public override function setRunObjectTextColor(rgb)
    {
        this.fontColor = rgb;
		var n;
		for (n=0; n<this.nLines*this.nColumns; n++)
			computeTextFormat(textFormats[n]);
		this.ho.redraw();
    }



	public override function condition(num, cnd) 
	{
		switch(num)
		{
			case Inventory.CND_NAMEDITEMSELECTED:
				return RCND_NAMEDITEMSELECTED(cnd);
			case Inventory.CND_NAMEDCOMPARENITEMS:
				return RCND_NAMEDCOMPARENITEMS(cnd);
			case Inventory.CND_ITEMSELECTED:
				return RCND_ITEMSELECTED(cnd);
			case Inventory.CND_COMPARENITEMS:
				return RCND_COMPARENITEMS(cnd);
			case Inventory.CND_NAMEDITEMPRESENT:
				return RCND_NAMEDITEMPRESENT(cnd);
			case Inventory.CND_ITEMPRESENT:
				return RCND_ITEMPRESENT(cnd);
			case Inventory.CND_NAMEDHILIGHTED:
				return RCND_NAMEDHILIGHTED(cnd);
			case Inventory.CND_HILIGHTED:
				return RCND_HILIGHTED(cnd);
			case Inventory.CND_CANADD:
				return RCND_CANADD(cnd);
			case Inventory.CND_NAMEDCANADD:
				return RCND_NAMEDCANADD(cnd);												
		}
		return false;
	}

	private function RCND_NAMEDITEMSELECTED(cnd) 
	{
		var pName=cnd.getParamExpString(this.rh, 0);
        if (pName == this.conditionString)
		{
			if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT)!=0)
			{
				return true;
			}

			if (this.rh.rh4EventCount == this.selectedCount)
			{
				return true;
			}
		}
		return false;
	}
	private function RCND_NAMEDCOMPARENITEMS(cnd) 
	{
		var pItem=Inventory.inventory.GetItem(this.number, cnd.getParamExpString(this.rh, 0));
		if (pItem!=null)
		{
            var value=(pItem.GetQuantity());
            return cnd.compareValues(this.rh, 0, value);
		}
		return false;
	}
	private function RCND_ITEMSELECTED(cnd) 
	{
		var oi=cnd.getParamObject(this.rh, 0).oi;

		if (oi==this.rh.rhEvtProg.rhCurParam0)
		{
			if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT)!=0)
			{
				return true;
			}

			if (this.rh.rh4EventCount == this.selectedCount)
			{
				return true;
			}
		}
		return false;
	}
	private function RCND_COMPARENITEMS(cnd) 
	{
		var oi=cnd.getParamObject(this.rh, 0).oi;

		var n;
		for (n=0; n<this.objectList.size(); n++)
		{
			var hoPtr=this.GetHO((this.objectList.get(n)));
			if (hoPtr.hoOi==oi)
			{
				var pItem=(this.displayList.get(n));
				var value=(pItem.GetQuantity());
				return cnd.compareValues(this.rh, 1, value);
			}
		}
		return false;
	}
	private function RCND_NAMEDITEMPRESENT(cnd) 
	{
		var pItem=Inventory.inventory.GetItem(this.number, cnd.getParamExpString(this.rh, 0));
		if (pItem!=null)
		{
			if (pItem.GetQuantity()>0)
			{
				return true;
			}
		}
		return false;
	}
	private function RCND_ITEMPRESENT(cnd) 
	{
		var oi=cnd.getParamObject(this.rh, 0).oi;

		var n;
		for (n=0; n<this.objectList.size(); n++)
		{
			var hoPtr=this.GetHO((this.objectList.get(n)));
			if (hoPtr.hoOi==oi)
			{
				var pItem=(this.displayList.get(n));
				if (pItem.GetQuantity()>0)
				{
					return true;
				}
			}
		}
		return false;
	}
	private function RCND_NAMEDHILIGHTED(cnd) 
	{
		var pName=cnd.getParamExpString(this.rh, 0);
		if (this.pNameHilighted!=null)
		{
			if (pName==this.pNameHilighted)
			{
				return true;
			}
		}
		return false;
	}
	private function RCND_HILIGHTED(cnd) 
	{
		var oiList=cnd.getParamObject(this.rh, 0).oiList;
		var pOiList=this.rh.rhOiList[oiList];
		if (this.pNameHilighted!=null)
		{
			if (pOiList.oilName==this.pNameHilighted)
			{
				return true;
			}
		}
		return false;
	}

	private function RCND_CANADD(cnd) 
	{
		if (this.type!=Inventory.INVTYPE_GRID)
		{
			return false;
		}

		var xx=cnd.getParamExpression(this.rh, 1);
		var yy=cnd.getParamExpression(this.rh, 2);

		if (xx<0 || xx>=this.nColumns || yy<0 || yy>=this.nLines)
		{
			return false;
		}

		var hoPtr;
		var pOiList=this.rh.rhOiList[cnd.getParamObject(this.rh, 0).oiList];
		var this.number=pOiList.oilObject;
		if (this.number>=0)
		{
			hoPtr=this.rh.rhObjectList[this.number];
			var sx=(hoPtr.hoImgWidth+this.itemSx-1)/this.itemSx;
			var sy=(hoPtr.hoImgHeight+this.itemSy-1)/this.itemSy;
			if (xx+sx>this.nColumns || yy+sy>this.nLines)
			{
				return false;
			}
			var x, y;
			for (y=0; y<sy; y++)
			{
				for (x=0; x<sx; x++)
				{
					if (this.pGrid[(yy+y)*this.nColumns+xx+x]!=0)
					{
						return false;
					}
				}
			}
			this.rcDrop.left=xx*this.itemSx;
			this.rcDrop.right=this.rcDrop.left+this.itemSx;
			this.rcDrop.top=yy*this.itemSy;
			this.rcDrop.bottom=this.rcDrop.top+this.itemSy;
			this.bDropItem=true;
			return true;
		}
		return false;
	}
	private function GridCanAdd(pName, xx, yy, bDrop) 
	{
		if (this.type!=Inventory.INVTYPE_GRID)
		{
			return false;
		}
		if (xx<0 || xx>=this.nColumns || yy<0 || yy>=this.nLines)
		{
			return false;
		}

		var hoPtr;
		var n;
		for (n=0; n<this.rh.rhOiList.length; n++)
		{
			if (this.rh.rhOiList[n].oilName==pName)
			{
                var this.number = this.rh.rhOiList[n].oilObject;
				if (this.number>=0)
				{
					hoPtr=this.rh.rhObjectList[this.number];
					var sx=(hoPtr.hoImgWidth+this.itemSx-1)/this.itemSx;
					var sy=(hoPtr.hoImgHeight+this.itemSy-1)/this.itemSy;
					if (xx+sx>this.nColumns || yy+sy>this.nLines)
					{
						return false;
					}
					var x, y;
					for (y=0; y<sy; y++)
					{
						for (x=0; x<sx; x++)
						{
							if (this.pGrid[(yy+y)*this.nColumns+xx+x]!=0)
							{
								return false;
							}
						}
					}
					if (bDrop)
					{
						this.rcDrop.left=xx*this.itemSx;
						this.rcDrop.right=this.rcDrop.left+this.itemSx;
						this.rcDrop.top=yy*this.itemSy;
						this.rcDrop.bottom=this.rcDrop.top+this.itemSy;
						this.bDropItem=true;
					}
					return true;
				}
			}
		}
		return false;
	}
	private function RCND_NAMEDCANADD(cnd) 
	{
		if (this.type==Inventory.INVTYPE_GRID)
		{
			var name=cnd.getParamExpString(this.rh, 0);
			var xx=cnd.getParamExpression(this.rh, 1);
			var yy=cnd.getParamExpression(this.rh, 2);
			return GridCanAdd(name, xx, yy, true);
		}
		return false;
	}





    public override function action(num, act)
    {
        switch (num)
        {
            case Inventory.ACT_NAMEDADDITEM:
                RACT_NAMEDADDITEM(act);
                break;
            case Inventory.ACT_NAMEDADDNITEMS:
                RACT_NAMEDADDNITEMS(act);
                break;
            case Inventory.ACT_NAMEDDELITEM:
                RACT_NAMEDDELITEM(act);
                break;
            case Inventory.ACT_NAMEDDELNITEMS:
                RACT_NAMEDDELNITEMS(act);
                break;
            case Inventory.ACT_NAMEDHIDEITEM:
                RACT_NAMEDHIDEITEM(act);
                break;
            case Inventory.ACT_NAMEDSHOWITEM:
                RACT_NAMEDSHOWITEM(act);
                break;
            case Inventory.ACT_ADDITEM:
                RACT_ADDITEM(act);
                break;
            case Inventory.ACT_ADDNITEMS:
                RACT_ADDNITEMS(act);
                break;
            case Inventory.ACT_DELITEM:
                RACT_DELITEM(act);
                break;
            case Inventory.ACT_DELNITEMS:
                RACT_DELNITEMS(act);
                break;
            case Inventory.ACT_HIDEITEM:
                RACT_HIDEITEM(act);
                break;
            case Inventory.ACT_SHOWITEM:
                RACT_SHOWITEM(act);
                break;
            case Inventory.ACT_LEFT:
                RACT_LEFT(act);
                break;
            case Inventory.ACT_RIGHT:
                RACT_RIGHT(act);
                break;
            case Inventory.ACT_UP:
                RACT_UP(act);
                break;
            case Inventory.ACT_DOWN:
                RACT_DOWN(act);
                break;
            case Inventory.ACT_SELECT:
                RACT_SELECT(act);
                break;
            case Inventory.ACT_CURSOR:
                RACT_CURSOR(act);
                break;
            case Inventory.ACT_NAMEDSETSTRING:
                RACT_NAMEDSETSTRING(act);
                break;
            case Inventory.ACT_SETSTRING:
                RACT_SETSTRING(act);
                break;
            case Inventory.ACT_ACTIVATE:
                RACT_ACTIVATE(act);
                break;
            case Inventory.ACT_NAMEDSETMAXIMUM:
                RACT_NAMEDSETMAXIMUM(act);
                break;
            case Inventory.ACT_SETMAXIMUM:
                RACT_SETMAXIMUM(act);
                break;
            case Inventory.ACT_this.SetPosition:
                RACT_this.SetPosition(act);
                break;
            case Inventory.ACT_SETPAGE:
                RACT_SETPAGE(act);
                break;
            case Inventory.ACT_ADDPROPERTY:
                RACT_ADDPROPERTY(act);
                break;
            case Inventory.ACT_NAMEDSETPROPMINMAX:
                RACT_NAMEDSETPROPMINMAX(act);
                break;
            case Inventory.ACT_SETPROPMINMAX:
                RACT_SETPROPMINMAX(act);
                break;
            case Inventory.ACT_NAMEDADDPROPERTY:
                RACT_NAMEDADDPROPERTY(act);
                break;
            case Inventory.ACT_ADDGRIDITEM:
                RACT_ADDGRIDITEM(act);
                break;
            case Inventory.ACT_ADDGRIDNITEMS:
                RACT_ADDGRIDNITEMS(act);
                break;
            case Inventory.ACT_NAMEDADDGRIDITEM:
                RACT_NAMEDADDGRIDITEM(act);
                break;
            case Inventory.ACT_NAMEDADDGRIDNITEMS:
                RACT_NAMEDADDGRIDNITEMS(act);
                break;
            case Inventory.ACT_HILIGHTDROP:
                RACT_HILIGHTDROP(act);
                break;
            case Inventory.ACT_NAMEDHILIGHTDROP:
                RACT_NAMEDHILIGHTDROP(act);
                break;
            case Inventory.ACT_SAVE:
                RACT_SAVE(act);
                break;
            case Inventory.ACT_LOAD:
                RACT_LOAD(act);
                break;
            case Inventory.ACT_ADDLISTITEM:
                RACT_ADDLISTITEM(act);
                break;
            case Inventory.ACT_ADDLISTNITEMS:
                RACT_ADDLISTNITEMS(act);
                break;
            case Inventory.ACT_NAMEDADDLISTITEM:
                RACT_NAMEDADDLISTITEM(act);
                break;
            case Inventory.ACT_NAMEDADDLISTNITEMS:
                RACT_NAMEDADDLISTNITEMS(act);
                break;
        }
    }

	private function FindItem(pName) 
	{
		var n;
		var hoPtr;
		for (n=0; n<this.objectList.size(); n++)
		{
			hoPtr=this.GetHO((this.objectList.get(n)));
			if (pName==hoPtr.hoOiList.oilName)
			{
				return (this.displayList.get(n));
			}
		}
		return null;
	}
	private function FindHO(pName) 
	{
		var n;
		var hoPtr;
		for (n=0; n<this.objectList.size(); n++)
		{
			hoPtr=this.GetHO((this.objectList.get(n)));
			if (pName==hoPtr.hoOiList.oilName)
			{
				return hoPtr;
			}
		}
		return null;
	}

	private function RACT_NAMEDADDPROPERTY(act) 
	{
		var pItem=act.getParamExpString(this.rh, 0);
		var pProperty=act.getParamExpString(this.rh, 1);
		var value=act.getParamExpression(this.rh, 2);
		Inventory.inventory.AddProperty(this.number, pItem, pProperty, value);
		return;
	}
	private function RACT_NAMEDSETPROPMINMAX(act) 
	{
		var pItem=act.getParamExpString(this.rh, 0);
		var pProperty=act.getParamExpString(this.rh, 1);
		var min=act.getParamExpression(this.rh, 2);
		var max=act.getParamExpression(this.rh, 3);
		Inventory.inventory.SetPropertyMinimum(this.number, pItem, pProperty, min);
		Inventory.inventory.SetPropertyMaximum(this.number, pItem, pProperty, max);
		return;
	}

	private function RACT_NAMEDADDLISTITEM(act) 
	{
		if (this.type==Inventory.INVTYPE_LIST)
		{
			var pName=act.getParamExpString(this.rh, 0);
			var pos=act.getParamExpression(this.rh, 1);
			var namePos="";
            var pItem;
			if (pos>=0 && pos<this.displayList.size())
			{
				pItem=(this.displayList.get(pos));
				namePos=pItem.pName;
			}
			pItem=Inventory.inventory.AddItemToPosition(this.number, namePos, pName, 1, this.maximum, this.pDisplayString);
			var bAbsent=true;
			var n;
			for (n=0; n<this.displayList.size(); n++)
			{
				if (pItem==(this.displayList.get(n)))
				{
					bAbsent=false;
					break;
				}
			}
			this.UpdateDisplayList();
			if (bAbsent)
			{
				for (n=0; n<this.displayList.size(); n++)
				{
					if (pItem==(this.displayList.get(n)))
					{
						this.CenterDisplay(n);
						break;
					}
				}
			}
		}
		return;
	}
	private function RACT_NAMEDADDLISTNITEMS(act) 		
	{
		if (this.type==Inventory.INVTYPE_LIST)
		{
			var pName=act.getParamExpString(this.rh, 0);
			var pos=act.getParamExpression(this.rh, 1);
			var this.number=act.getParamExpression(this.rh, 2);
			var namePos="";
            var pItem;
			if (pos>=0 && pos<this.displayList.size())
			{
				pItem=(this.displayList.get(pos));
				namePos=pItem.pName;
			}
			pItem=Inventory.inventory.AddItemToPosition(this.number, namePos, pName, this.number, this.maximum, this.pDisplayString);
			var bAbsent=true;
			var n;
			for (n=0; n<this.displayList.size(); n++)
			{
				if (pItem==(this.displayList.get(n)))
				{
					bAbsent=false;
					break;
				}
			}
			this.UpdateDisplayList();
			if (bAbsent)
			{
				for (n=0; n<this.displayList.size(); n++)
				{
					if (pItem==(this.displayList.get(n)))
					{
						this.CenterDisplay(n);
						break;
					}
				}
			}
		}
		return;
	}
	private function RACT_NAMEDADDITEM(act) 		
	{
		var pItem;
		var param1=act.getParamExpString(this.rh, 0);
		if (this.type==Inventory.INVTYPE_LIST)
		{
			pItem=Inventory.inventory.AddItem(this.number, param1, 1, this.maximum, this.pDisplayString);
			var bAbsent=true;
			var n;
			for (n=0; n<this.displayList.size(); n++)
			{
				if (pItem==(this.displayList.get(n)))
				{
					bAbsent=false;
					break;
				}
			}
			this.UpdateDisplayList();
			if (bAbsent)
			{
				for (n=0; n<this.displayList.size(); n++)
				{
					if (pItem==(this.displayList.get(n)))
					{
						this.CenterDisplay(n);
						break;
					}
				}
			}
		}
		else
		{
			var x, y;
			for (y=0; y<this.nLines; y++)
			{
				for (x=0; x<this.nColumns; x++)
				{
					if (GridCanAdd(param1, x, y, false))
					{
						pItem=Inventory.inventory.AddItem(this.number, param1, 1, this.maximum, this.pDisplayString);
						pItem.x=x;
						pItem.y=y;
						this.UpdateDisplayList();
						return;
					}
				}
			}
		}
		return;
	}
			
	private function RACT_NAMEDADDNITEMS(act) 		
	{
		var param1=act.getParamExpString(this.rh, 0);
		var param2=act.getParamExpression(this.rh, 1);
		if (param2>=0)
		{
			var pItem;
			if (this.type==Inventory.INVTYPE_LIST)
			{
				pItem=Inventory.inventory.AddItem(this.number, param1, param2, this.maximum, this.pDisplayString);
				var bAbsent=true;
				var n;
				for (n=0; n<this.displayList.size(); n++)
				{
					if (pItem==(this.displayList.get(n)))
					{
						bAbsent=false;
						break;
					}
				}
				this.UpdateDisplayList();
				if (bAbsent)
				{
					for (n=0; n<this.displayList.size(); n++)
					{
						if (pItem==(this.displayList.get(n)))
						{
							this.CenterDisplay(n);
							break;
						}
					}
				}
			}
			else
			{
				var x, y;
				for (y=0; y<this.nLines; y++)
				{
					for (x=0; x<this.nColumns; x++)
					{
						if (GridCanAdd(param1, x, y, false))
						{
							pItem=Inventory.inventory.AddItem(this.number, param1, param2, this.maximum, this.pDisplayString);
							pItem.x=x;
							pItem.y=y;
							this.UpdateDisplayList();
							return;
						}
					}
				}
			}
		}
		return;
	}
			
	private function RACT_NAMEDSETMAXIMUM(act) 		
	{
		var param1=act.getParamExpString(this.rh, 0);
		var param2=act.getParamExpression(this.rh, 1);
		if (param2>=0)
		{
			Inventory.inventory.SetMaximum(this.number, param1, param2);
			this.UpdateDisplayList();
		}
		return;
	}
			
	private function RACT_NAMEDDELITEM(act) 		
	{
		var param1=act.getParamExpString(this.rh, 0);
		var hoPtr=FindHO(param1);
		if (Inventory.inventory.SubQuantity(this.number, param1, 1))
		{
			if (hoPtr!=null)
			{
				this.obHide(hoPtr);
			}
		}
		this.UpdateDisplayList();
        return;
	}
			
	private function RACT_NAMEDDELNITEMS(act) 		
	{
		var param1=act.getParamExpString(this.rh, 0);
		var param2=act.getParamExpression(this.rh, 1);
		if (param2>=0)
		{
			var hoPtr=FindHO(param1);
			if (Inventory.inventory.SubQuantity(this.number, param1, param2))
			{
				if (hoPtr!=null)
				{
					this.obHide(hoPtr);
				}
			}
			this.UpdateDisplayList();
		}
		return;
	}
	private function RACT_NAMEDHIDEITEM(act) 		
	{
		var param1=act.getParamExpString(this.rh, 0);
		Inventory.inventory.SetFlags(this.number, param1, ~CRunInventoryItem.FLAG_VISIBLE, 0);
		this.UpdateDisplayList();
		return;
	}
	private function RACT_NAMEDSHOWITEM(act) 		
	{
		var param1=act.getParamExpString(this.rh, 0);
		Inventory.inventory.SetFlags(this.number, param1, -1, CRunInventoryItem.FLAG_VISIBLE);
		this.UpdateDisplayList();
		return;
	}
	private function RACT_ADDLISTITEM(act) 		
	{
		if (this.type==Inventory.INVTYPE_LIST)
		{
			var hoPtr=act.getParamObject(this.rh, 0);;
			var pName=hoPtr.hoOiList.oilName;

			var pos=act.getParamExpression(this.rh, 1);
			var namePos="";
            var pItem;
			if (pos>=0 && pos<this.displayList.size())
			{
				pItem=(this.displayList.get(pos));
				namePos=pItem.pName;
			}
			pItem=Inventory.inventory.AddItemToPosition(this.number, namePos, pName, 1, this.maximum, this.pDisplayString);
			var bAbsent=true;
			var n;
			for (n=0; n<this.displayList.size(); n++)
			{
				if (pItem==(this.displayList.get(n)))
				{
					bAbsent=false;
					break;
				}
			}
			this.UpdateDisplayList();
			if (bAbsent)
			{
				for (n=0; n<this.displayList.size(); n++)
				{
					if (pItem==(this.displayList.get(n)))
					{
						this.CenterDisplay(n);
						break;
					}
				}
			}
		}
		return;
	}
	private function RACT_ADDLISTNITEMS(act) 		
	{
		if (this.type==Inventory.INVTYPE_LIST)
		{
			var hoPtr=act.getParamObject(this.rh, 0);
			var pName=hoPtr.hoOiList.oilName;
			var pos=act.getParamExpression(this.rh, 1);
			var this.number=act.getParamExpression(this.rh, 2);
			var namePos="";
            var pItem;
			if (pos>=0 && pos<this.displayList.size())
			{
				pItem=(this.displayList.get(pos));
				namePos=pItem.pName;
			}
			pItem=Inventory.inventory.AddItemToPosition(this.number, namePos, pName, this.number, this.maximum, this.pDisplayString);
			var bAbsent=true;
			var n;
			for (n=0; n<this.displayList.size(); n++)
			{
				if (pItem==(this.displayList.get(n)))
				{
					bAbsent=false;
					break;
				}
			}
			this.UpdateDisplayList();
			if (bAbsent)
			{
				for (n=0; n<this.displayList.size(); n++)
				{
					if (pItem==(this.displayList.get(n)))
					{
						this.CenterDisplay(n);
						break;
					}
				}
			}
		}
		return;
	}
	private function RACT_ADDITEM(act) 		
	{
		var hoPtr=act.getParamObject(this.rh, 0);
		var pOiList=hoPtr.hoOiList;
		var pItem;
		if (this.type==Inventory.INVTYPE_LIST)
		{
			pItem=Inventory.inventory.AddItem(this.number, pOiList.oilName, 1, this.maximum, this.pDisplayString);
			var bAbsent=true;
			var n;
			for (n=0; n<this.displayList.size(); n++)
			{
				if (pItem==(this.displayList.get(n)))
				{
					bAbsent=false;
					break;
				}
			}
			this.UpdateDisplayList();
			if (bAbsent)
			{
				for (n=0; n<this.displayList.size(); n++)
				{
					if (pItem==(this.displayList.get(n)))
					{
						this.CenterDisplay(n);
						break;
					}
				}
			}
		}
		else
		{
			var x, y;
			for (y=0; y<this.nLines; y++)
			{
				for (x=0; x<this.nColumns; x++)
				{
					if (GridCanAdd(pOiList.oilName, x, y, false))
					{
						pItem=Inventory.inventory.AddItem(this.number, pOiList.oilName, 1, this.maximum, this.pDisplayString);
						pItem.x=x;
						pItem.y=y;
						this.UpdateDisplayList();
						return;
					}
				}
			}
		}
		return;
	}
	private function RACT_ADDPROPERTY(act) 		
	{
		var hoPtr=CObject(act.getParamObject(this.rh, 0));
		var pProperty=act.getParamExpString(this.rh, 1);
		var value=act.getParamExpression(this.rh, 2);

		var pOiList=hoPtr.hoOiList;
		Inventory.inventory.AddProperty(this.number, pOiList.oilName, pProperty, value);
		return;
	}
	private function RACT_SETPROPMINMAX(act) 		
	{
		var hoPtr=act.getParamObject(this.rh, 0);
		var pProperty=act.getParamExpString(this.rh, 1);
		var min=act.getParamExpression(this.rh, 2);
		var max=act.getParamExpression(this.rh, 3);

		var pOiList=hoPtr.hoOiList;
		Inventory.inventory.SetPropertyMinimum(this.number, pOiList.oilName, pProperty, min);
		Inventory.inventory.SetPropertyMaximum(this.number, pOiList.oilName, pProperty, max);
		return;
	}
	private function RACT_ADDNITEMS(act) 		
	{
        var param2 = act.getParamExpression(this.rh, 1);
        if (param2 >= 0)
		{
			var hoPtr=act.getParamObject(this.rh, 0);
			var pOiList=hoPtr.hoOiList;
			var pItem;
			if (this.type==Inventory.INVTYPE_LIST)
			{
				pItem=Inventory.inventory.AddItem(this.number, pOiList.oilName, param2, this.maximum, this.pDisplayString);
				var bAbsent=true;
				var n;
				for (n=0; n<this.displayList.size(); n++)
				{
					if (pItem==(this.displayList.get(n)))
					{
						bAbsent=false;
						break;
					}
				}
				this.UpdateDisplayList();
				if (bAbsent)
				{
					for (n=0; n<this.displayList.size(); n++)
					{
						if (pItem==(this.displayList.get(n)))
						{
							this.CenterDisplay(n);
							break;
						}
					}
				}
			}
			else
			{
				var x, y;
				for (y=0; y<this.nLines; y++)
				{
					for (x=0; x<this.nColumns; x++)
					{
						if (GridCanAdd(pOiList.oilName, x, y, false))
						{
							pItem=Inventory.inventory.AddItem(this.number, pOiList.oilName, param2, this.maximum, this.pDisplayString);
							pItem.x=x;
							pItem.y=y;
							this.UpdateDisplayList();
							return;
						}
					}
				}
			}
		}
		return;
	}
	private function RACT_SETMAXIMUM(act) 		
	{
        var param2 = act.getParamExpression(this.rh, 1);
		if (param2>=0)
		{
			var hoPtr=act.getParamObject(this.rh, 0);
			var pOiList=hoPtr.hoOiList;
			Inventory.inventory.SetMaximum(this.number, pOiList.oilName, param2);
			this.UpdateDisplayList();
		}
		return;
	}
	private function RACT_DELITEM(act) 		
	{
		var hoPtr=act.getParamObject(this.rh, 0);
		var pOiList=hoPtr.hoOiList;
		hoPtr=FindHO(pOiList.oilName);
		if (Inventory.inventory.SubQuantity(this.number, pOiList.oilName, 1))
		{
			if (hoPtr!=null)
			{
				this.obHide(hoPtr);
			}
		}
		this.UpdateDisplayList();
		return;
	}
	private function RACT_DELNITEMS(act) 		
	{
		var param2=act.getParamExpression(this.rh, 1);
		if (param2>=0)
		{
			var hoPtr=act.getParamObject(this.rh, 0);
			var pOiList=hoPtr.hoOiList;
			hoPtr=FindHO(pOiList.oilName);
			if (Inventory.inventory.SubQuantity(this.number, pOiList.oilName, param2))
			{
				if (hoPtr!=null)
				{
					this.obHide(hoPtr);
				}
			}
			this.UpdateDisplayList();
		}
		return;
	}
	private function RACT_HIDEITEM(act) 		
	{
		var hoPtr=act.getParamObject(this.rh, 0);
		var pOiList=hoPtr.hoOiList;
		Inventory.inventory.SetFlags(this.number, pOiList.oilName, ~CRunInventoryItem.FLAG_VISIBLE, 0);
		this.UpdateDisplayList();
		return;
	}
	private function RACT_SHOWITEM(act) 		
	{
		var hoPtr=act.getParamObject(this.rh, 0);
		var pOiList=hoPtr.hoOiList;
		Inventory.inventory.SetFlags(this.number, pOiList.oilName, -1, CRunInventoryItem.FLAG_VISIBLE);
		this.UpdateDisplayList();
		return;
	}

	private function RACT_LEFT(act) 		
	{
		if (this.displayList.size()>0)
		{
			this.xCursor--;
			if (this.xCursor<0)
			{
				this.xCursor++;
				this.position=Math.max(this.position-1, 0);
			}
			this.bRedraw=true;
		}
		return;
	}
	private function RACT_RIGHT(act) 		
	{
		if (this.displayList.size()>0)
		{
			this.xCursor++;
			if (this.xCursor>=this.nColumns)
			{
				this.xCursor--;
				this.position=Math.min(this.position+1, this.displayList.size()-this.nColumns*this.nLines);
			}
			this.bRedraw=true;
		}
		return;
	}
	private function RACT_UP(act) 		
	{
		if (this.displayList.size()>0)
		{
			this.yCursor--;
			if (this.yCursor<0)
			{
				this.yCursor++;
				this.position=Math.max(this.position-this.nColumns, 0);
			}
			this.bRedraw=true;
		}
		return;
	}
	private function RACT_DOWN(act) 		
	{
		if (this.displayList.size()>0)
		{
			this.yCursor++;
			if (this.yCursor>=this.nLines)
			{
				this.yCursor--;
				this.position=Math.min(this.position+this.nColumns, this.displayList.size()-this.nColumns*this.nLines);
			}
			this.bRedraw=true;
		}
		return;
	}
	private function RACT_SELECT(act) 		
	{
		if (this.displayList.size()>0)
		{
			this.selectedCount=this.rh.rh4EventCount;
			var pItem=(this.displayList.get(this.position+this.yCursor*this.nColumns+this.xCursor));
			var hoPtr=this.GetHO((this.objectList.get(this.position+this.yCursor*this.nColumns+this.xCursor)));
			this.conditionString=pItem.GetName();
			this.ho.generateEvent(Inventory.CND_NAMEDITEMSELECTED, 0);
			this.ho.generateEvent(Inventory.CND_ITEMSELECTED, hoPtr.hoOi);
			this.bRedraw=true;
		}
		return;
	}
	private function RACT_CURSOR(act) 		
	{
        var param1 = act.getParamExpression(this.rh, 0);
		if (param1==0)
		{
			this.flags&=~(Inventory.IFLAG_FORCECURSOR|Inventory.IFLAG_CURSORBYACTION);
		}
		else
		{
			this.flags|=Inventory.IFLAG_FORCECURSOR|Inventory.IFLAG_CURSORBYACTION;
		}
		this.bRedraw=true;
		return;
	}
	private function RACT_ACTIVATE(act) 		
	{
        var param1 = act.getParamExpression(this.rh, 0);
        if (param1 != 0)
		{
			this.bActivated=true;
			this.flags|=Inventory.IFLAG_CURSOR|Inventory.IFLAG_FORCECURSOR;
		}
		else
		{
			this.bActivated=false;
			this.flags&=~(Inventory.IFLAG_CURSOR|Inventory.IFLAG_FORCECURSOR);
		}
		this.bRedraw=true;
		return;
	}
	private function RACT_NAMEDSETSTRING(act) 		
	{
		Inventory.inventory.SetDisplayString(this.number, act.getParamExpString(this.rh, 0), act.getParamExpString(this.rh, 1));
		this.UpdateDisplayList();
		return;
	}
	private function RACT_SETSTRING(act) 		
	{
		var hoPtr=act.getParamObject(this.rh, 0);
		var pOiList=hoPtr.hoOiList;
		Inventory.inventory.SetDisplayString(this.number, pOiList.oilName, act.getParamExpString(this.rh, 1));
		this.UpdateDisplayList();
		return;
	}
	private function RACT_this.SetPosition(act) 		
	{
		var param1=act.getParamExpression(this.rh, 1);
		if (this.type==Inventory.INVTYPE_LIST)
		{
			if (param1<0)
				param1=0;
			var last=Math.max(this.displayList.size()-this.nLines*this.nColumns, 0);
			if (param1>last)
				param1=last;
			this.position=last;
			this.bRedraw=true;
		}
		return;
	}
	private function RACT_SETPAGE(act) 		
	{
		var param1=act.getParamExpression(this.rh, 1);
		if (this.type==Inventory.INVTYPE_LIST)
		{
			param1=this.nLines*this.nColumns;
			if (param1<0)
				param1=0;
			var last=Math.max(this.displayList.size()-this.nLines*this.nColumns, 0);
			if (param1>last)
				param1=last;
			this.position=last;
			this.bRedraw=true;
		}
		return;
	}
	private function RACT_ADDGRIDITEM(act) 		
	{
		if (this.type==Inventory.INVTYPE_GRID)
		{
			var hoPtr=act.getParamObject(this.rh, 0);
			var x=act.getParamExpression(this.rh, 1);
			var y=act.getParamExpression(this.rh, 2);
			var pOiList=hoPtr.hoOiList;
			if (GridCanAdd(pOiList.oilName, x, y, false))
			{
				var pItem=FindItem(pOiList.oilName);
				if (pItem==null)
				{
					pItem=Inventory.inventory.AddItem(this.number, pOiList.oilName, 1, this.maximum, this.pDisplayString);
				}
				else if (pItem.x==x && pItem.y==y)
				{
					Inventory.inventory.AddItem(this.number, pOiList.oilName, 1, this.maximum, this.pDisplayString);
				}
				pItem.x=x;
				pItem.y=y;
				this.UpdateDisplayList();
			}
		}
		return;
	}
	private function RACT_ADDGRIDNITEMS(act) 		
	{
		if (this.type==Inventory.INVTYPE_GRID)
		{
			var hoPtr=act.getParamObject(this.rh, 0);
			var this.number=act.getParamExpression(this.rh, 1);
			var x=act.getParamExpression(this.rh, 2);
			var y=act.getParamExpression(this.rh, 3);
			var pOiList=hoPtr.hoOiList;
			if (GridCanAdd(pOiList.oilName, x, y, false))
			{
				var pItem=FindItem(pOiList.oilName);
				if (pItem==null)
				{
					pItem=Inventory.inventory.AddItem(this.number, pOiList.oilName, this.number, this.maximum, this.pDisplayString);
				}
				else if (pItem.x==x && pItem.y==y)
				{
					Inventory.inventory.AddItem(this.number, pOiList.oilName, this.number, this.maximum, this.pDisplayString);
				}
				pItem.x=x;
				pItem.y=y;
				this.UpdateDisplayList();
			}
		}
		return;
	}
	private function RACT_NAMEDADDGRIDITEM(act) 		
	{
		if (this.type==Inventory.INVTYPE_GRID)
		{
			var pName=act.getParamExpString(this.rh, 0);
			var x=act.getParamExpression(this.rh, 1);
			var y=act.getParamExpression(this.rh, 2);
			if (GridCanAdd(pName, x, y, false))
			{
				var pItem=FindItem(pName);
				if (pItem==null)
				{
					pItem=Inventory.inventory.AddItem(this.number, pName, 1, this.maximum, this.pDisplayString);
				}
				else if (pItem.x==x && pItem.y==y)
				{
					Inventory.inventory.AddItem(this.number, pName, 1, this.maximum, this.pDisplayString);
				}
				pItem.x=x;
				pItem.y=y;
				this.UpdateDisplayList();
			}
		}
		return;
	}
	private function RACT_NAMEDADDGRIDNITEMS(act) 		
	{
		if (this.type==Inventory.INVTYPE_GRID)
		{
			var pName=act.getParamExpString(this.rh, 0);
			var this.number=act.getParamExpression(this.rh, 1);
			var x=act.getParamExpression(this.rh, 2);
            var y = act.getParamExpression(this.rh, 3);
			if (GridCanAdd(pName, x, y, false))
			{
				var pItem=FindItem(pName);
				if (pItem==null)
				{
					pItem=Inventory.inventory.AddItem(this.number, pName, this.number, this.maximum, this.pDisplayString);
				}
				else if (pItem.x==x && pItem.y==y)
				{
					Inventory.inventory.AddItem(this.number, pName, this.number, this.maximum, this.pDisplayString);
				}
				pItem.x=x;
				pItem.y=y;
				this.UpdateDisplayList();
			}
		}
		return;
	}
				
	private function HilightDrop(pName, xx, yy) 
	{
		if (xx<0 || xx>=this.nColumns || yy<0 || yy>=this.nLines)
		{
			return;
		}

		var hoPtr;
		var n;		
		for (n=0; n<this.rh.rhOiList.length; n++)
		{
			if (this.rh.rhOiList[n].oilName==pName)
			{
				var this.number=this.rh.rhOiList[n].oilObject;
				if (this.number>=0)
				{
					hoPtr=this.rh.rhObjectList[this.number];
					var sx=(hoPtr.hoImgWidth+this.itemSx-1)/this.itemSx;
					var sy=(hoPtr.hoImgHeight+this.itemSy-1)/this.itemSy;
					if (xx+sx<=this.nColumns && yy+sy<=this.nLines)
					{
						this.rcDrop.left=xx*this.itemSx;
						this.rcDrop.right=this.rcDrop.left+this.itemSx*sx;
                        this.rcDrop.top = yy*this.itemSy;
						this.rcDrop.bottom=this.rcDrop.top+this.itemSy*sy;
						this.bDropItem=true;
						this.xCursor=xx;
						this.yCursor=yy;
						this.ho.redraw();
					}
				}
			}
		}
	}				
	private function RACT_HILIGHTDROP(act) 		
	{
		if (this.type==Inventory.INVTYPE_GRID)
		{
			var hoPtr=act.getParamObject(this.rh, 0);
			var x=act.getParamExpression(this.rh, 1);
			var y=act.getParamExpression(this.rh, 2);
			var pOiList=hoPtr.hoOiList;
			HilightDrop(pOiList.oilName, x, y);
		}
		return;
	}
	private function RACT_NAMEDHILIGHTDROP(act) 		
	{
		if (this.type==Inventory.INVTYPE_GRID)
		{
			var pName=act.getParamExpString(this.rh, 0);
			var x=act.getParamExpression(this.rh, 1);
			var y=act.getParamExpression(this.rh, 2);
			HilightDrop(pName, x, y);
		}
		return;
	}

    private function cleanName(name) 
    {
        var pos = name.lastIndexOf('\\');
        if (pos < 0)
        {
            pos = name.lastIndexOf('/');
        }
        if (pos >= 0 && pos + 1 < name.length)
        {
            name = name.substring(pos + 1);
        }
        return name;
    }
    private function RACT_SAVE(act) 		
	{
        var path=cleanName(act.getParamFilename(this.rh, 0));
		try
		{
			var sharedObject:SharedObject=SharedObject.getLocal(path);
			sharedObject.data.Inventory.inventory=Inventory.inventory;
			sharedObject.flush();
		}
		catch(error:Error)
		{	                	
		}
        return;
	}
    private function RACT_LOAD(act) 		
	{
        var path=cleanName(act.getParamFilename(this.rh, 0));
		var sharedObject:SharedObject=SharedObject.getLocal(path);
		if (sharedObject.data.Inventory.inventory!=null)
		{
			Inventory.inventory=sharedObject.data.Inventory.inventory;
			this.UpdateDisplayList();
		}
		return;
	}					
					
					
	



    public override function expression(num) 
    {
        switch (num)
        {
            case Inventory.EXP_NITEM:
                return REXP_NITEM();
            case Inventory.EXP_NAMEOFHILIGHTED:
                return REXP_NAMEOFHILIGHTED();
            case Inventory.EXP_NAMEOFSELECTED:
                return REXP_NAMEOFSELECTED();
            case Inventory.EXP_POSITION:
                return REXP_POSITION();
            case Inventory.EXP_PAGE:
                return REXP_PAGE();
            case Inventory.EXP_TOTAL:
                return REXP_TOTAL();
            case Inventory.EXP_DISPLAYED:
                return REXP_DISPLAYED();
            case Inventory.EXP_NUMOFSELECTED:
                return REXP_NUMOFSELECTED();
            case Inventory.EXP_NUMOFHILIGHTED:
                return REXP_NUMOFHILIGHTED();
            case Inventory.EXP_NAMEOFNUM:
                return REXP_NAMEOFNUM();
            case Inventory.EXP_MAXITEM:
                return REXP_MAXITEM();
            case Inventory.EXP_NUMBERMAXITEM:
                return REXP_NUMBERMAXITEM();
            case Inventory.EXP_NUMBERNITEM:
                return REXP_NUMBERNITEM();
            case Inventory.EXP_GETPROPERTY:
                return REXP_GETPROPERTY();
            case Inventory.EXP_NUMBERGETPROPERTY:
                return REXP_NUMBERGETPROPERTY();
        }
        return (0);
    }

			
	private function REXP_NITEM()
	{
		var pName=this.ho.getExpParam();
		var pItem=Inventory.inventory.GetItem(this.number, pName);
		if (pItem!=null)
		{
			return (pItem.GetQuantity());
		}
		return (0);
	}
	private function REXP_GETPROPERTY()
	{
		var pName=this.ho.getExpParam();
		var pProperty=this.ho.getExpParam();
		var pItem=Inventory.inventory.GetItem(this.number, pName);
		if (pItem!=null)
		{
			return (pItem.GetProperty(pProperty));
		}
		return (0);
	}
	private function REXP_MAXITEM()
	{
		var pName = this.ho.getExpParam();
		var pItem=Inventory.inventory.GetItem(this.number, pName);
		if (pItem!=null)
		{
			return (pItem.GetMaximum());
		}
		return (0);
	}
	private function REXP_NUMBERNITEM()
	{
        var num = this.ho.getExpParam();
		if (num>=0 && num<this.displayList.size())
		{
			var pItem=(this.displayList.get(num));
			if (pItem!=null)
			{
				return (pItem.GetQuantity());
			}
		}
		return (0);
	}
	private function REXP_NUMBERGETPROPERTY()
	{
        var num = this.ho.getExpParam();
        var pProperty = this.ho.getExpParam();
		if (num>=0 && num<this.displayList.size())
		{
			var pItem=(this.displayList.get(num));
			if (pItem!=null)
			{
				return (pItem.GetProperty(pProperty));
			}
		}
        return (0);
    }
	private function REXP_NUMBERMAXITEM()
	{
        var num = this.ho.getExpParam();
		if (num>=0 && num<this.displayList.size())
		{
			var pItem=(this.displayList.get(num));
			if (pItem!=null)
			{
				return (pItem.GetMaximum());
			}
		}
        return (0);
    }
	private function REXP_NAMEOFHILIGHTED( )
	{
		var ret=(0);
		if (this.pNameHilighted!=null)
			ret.forceString(this.pNameHilighted);
		else
			ret.forceString("");
		return ret;
	}
	private function REXP_NAMEOFSELECTED()
	{
		var ret=(0);
		if (this.pNameSelected!=null)
			ret.forceString(this.pNameSelected);
		else
			ret.forceString("");
		return ret;
	}
	private function REXP_POSITION()
	{
		return (this.position);
	}
	private function REXP_PAGE()
	{
		return (this.position/(this.nLines*this.nColumns));
	}
	private function REXP_TOTAL()
	{
		return (this.displayList.size());
	}
	private function REXP_DISPLAYED()
	{
		return (Math.min(this.displayList.size()-this.position, this.nLines*this.nColumns));
	}
	private function REXP_NUMOFSELECTED()
	{
		return (this.numSelected);
	}
	private function REXP_NUMOFHILIGHTED()
	{
		return (this.numHilighted);
	}
	private function REXP_NAMEOFNUM()
	{
		var ret=(0);
		ret.forceString("");
			var num = this.ho.getExpParam();
			if (num>=0 && num<this.displayList.size())
			{
				var pItem=(this.displayList.get(num));
				ret.forceString(pItem.GetName());
			}
            return ret;
		}
 });

