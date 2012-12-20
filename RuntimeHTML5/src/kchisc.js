//----------------------------------------------------------------------------------
//
// CRunkchisc: high score object
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
CRunkchisc.SCR_HIDEONSTART = 0x0001;
CRunkchisc.SCR_NAMEFIRST = 0x0002;
CRunkchisc.SCR_CHECKONSTART = 0x0004;
CRunkchisc.SCR_DONTDISPLAYSCORES = 0x0008;
CRunkchisc.SCR_FULLPATH = 0x0010;

CRunkchisc.CND_ISPLAYER = 0;
CRunkchisc.CND_VISIBLE = 1;

CRunkchisc.ACT_ASKNAME = 0;
CRunkchisc.ACT_HIDE = 1;
CRunkchisc.ACT_SHOW = 2;
CRunkchisc.ACT_RESET = 3;
CRunkchisc.ACT_CHANGENAME = 4;
CRunkchisc.ACT_CHANGESCORE = 5;
CRunkchisc.ACT_SETPOSITION = 6;
CRunkchisc.ACT_SETXPOSITION = 7;
CRunkchisc.ACT_SETYPOSITION = 8;
CRunkchisc.ACT_INSERTNEWSCORE = 9;
CRunkchisc.ACT_SETCURRENTFILE = 10;

CRunkchisc.EXP_VALUE = 0;
CRunkchisc.EXP_NAME = 1;
CRunkchisc.EXP_GETXPOSITION = 2;
CRunkchisc.EXP_GETYPOSITION = 3;

function CRunkchisc()
{
    this.NbScores=0;
    this.NameSize=0;
    this.Flags=0;
    this.Logfont=null;
    this.Colorref=0;
    this.Names=null;
    this.Scores=null;
    this.originalNames=null;
    this.originalScores=null;
    this.scrPlayer=null;
    this.iniName=null;
    this.started=0;
	this.newScore=0;
	this.askForScore=null;
	this.oldReturnKey;
	this.scoreSurfaces=null;
	this.textSurfaces=null;
}
CRunkchisc.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 2;
    },

    createRunObject:function(file, cob, version)
    {
        this.ho.setX(cob.cobX);
        this.ho.setY(cob.cobY);

        this.NbScores = file.readAShort();
        this.NameSize = file.readAShort();
        this.Flags = file.readAShort();
        if (this.ho.hoAdRunHeader.rhApp.bUnicode == false)
        {
            this.Logfont = file.readLogFont16();
        }
        else
        {
            this.Logfont = file.readLogFont();
        }
        this.Colorref = file.readAColor();
        file.readAString(40);
        var i;
       	this.Names=new Array(20);
       	this.originalNames=new Array(20);
        for (i = 0; i < 20; i++)
        {
            this.Names[i] = file.readAString(41);
            this.originalNames[i]=this.Names[i];
        }
        this.Scores=new Array(20);
        this.originalScores=new Array(20);
        for (i = 0; i < 20; i++)
        {
            this.Scores[i] = file.readAInt();
            this.originalScores[i]=this.Scores[i];
        }
        this.ho.setWidth(file.readAShort());
        this.ho.setHeight(file.readAShort());
        if ((this.Flags & CRunkchisc.SCR_HIDEONSTART) == 0)
            this.bShown= true;
		if ((cob.cobFlags&CRun.COF_HIDDEN)!=0)
			this.bShown=false;

        this.iniName = file.readAString(260);
        this.iniName=this.parseName(this.iniName);
        if (this.iniName.length==0)
        	this.iniName="Game.ini";
        this.ini=new CIni();
       	this.loadScores();
        
        this.scrPlayer=new Array(4);
        for (i=0; i<4; i++)
        	this.scrPlayer[i]=0;

 		this.askForScore=new CArrayList();
		this.oldReturnKey=false;
			
        return true;
    },
    loadScores:function()
    {
    	var a;
        for (a = 0; a < 20; a++)
        {
            this.Names[a] = this.ini.getPrivateProfileString(this.rh.rhApp.appName, "N" + a.toString(), this.Names[a], this.iniName);
            this.originalNames[a] = this.Names[a];
            // Get scores
            var r = this.ini.getPrivateProfileString(this.rh.rhApp.appName, "S" + a.toString(), this.Scores[a].toString(), this.iniName);
            if (r=="")
                this.Scores[a] = 0;
            else
                this.Scores[a] = parseInt(r);
            if (isNaN(this.Scores[a]))
            	this.Scores[a]=0;
            this.originalScores[a] = this.Scores[a];
        }
        this.textSurfaces=null;
        this.scoreSurfaces=null;
    },
    saveScores:function()
    {
    	var a;
        for (a = 0; a < this.NbScores; a++)
        {
            this.ini.writePrivateProfileString(this.rh.rhApp.appName, "N" + a.toString(), this.Names[a], this.iniName);
            this.ini.writePrivateProfileString(this.rh.rhApp.appName, "S" + a.toString(), this.Scores[a].toString(), this.iniName);
        }
        this.ini.saveIni();
    },
    parseName:function(name)
    {
    	var pos=name.lastIndexOf("\\");
    	if (pos>0)
    	{
    		name=name.substring(pos+1);
    	}
        var n;
		for (n=0; n<name.length; n++)
		{
			if (name.charCodeAt(n)==32)
			{
				name=name.substring(0, n)+name.substring(n+1);
				n--;
			}	
		}				
    	return name;	    			
    },	    
    destroyRunObject:function(bFast)
    {
        this.saveScores(this.iniName);
    },
	handleRunObject:function()
	{
        var a, b;
        var players = new Array(4);
        var TriOk=false;
        var rhPtr = this.ho.hoAdRunHeader;
        var score1, score2;
        if ((this.Flags & CRunkchisc.SCR_CHECKONSTART) != 0)
        {
            // Init player order
            for (a = 0; a < 4; a++)
            {
                players[a] = a;
            }
            // Sort player order (bigger score asked first)
            do
            {
                TriOk = true;
                for (a = 1; a < 4; a++)
                {
                    score1 = rhPtr.rhApp.getScores()[players[a]];
                    score2 = rhPtr.rhApp.getScores()[players[a - 1]];
                    if (score1 > score2)
                    {
                        b = players[a - 1];
                        players[a - 1] = players[a];
                        players[a] = b;
                        TriOk = false;
                    }
                }
            } while (false == TriOk);
	        this.textSurfaces=null;
    	    this.scoreSurfaces=null;
            this.started++;
            var shown = 0;
            // Check for hi-scores
            for (a = 0; a < rhPtr.rhNPlayers; a++)
            {
                if (this.CheckScore(players[a]) == true) //popup shown
                {
                    shown++;
                }
            }
            if (shown > 0)
            {
                return CRunExtension.REFLAG_ONESHOT + CRunExtension.REFLAG_DISPLAY;
            }
            if (this.started > 1)
            {
                return CRunExtension.REFLAG_ONESHOT + CRunExtension.REFLAG_DISPLAY;
            }
            return CRunExtension.REFLAG_DISPLAY; //keep handlerunobject running.
        }
        else
        {
            return CRunExtension.REFLAG_ONESHOT + CRunExtension.REFLAG_DISPLAY;
        }
        return 0;
	},
	createScores:function(context)
	{
		if (this.scoreSurfaces==null)
		{
			this.scoreSurfaces=new Array(this.NbScores);
			for (a=0; a<this.NbScores; a++)
			{			
				this.scoreSurfaces[a]=new CTextSurface(this.rh.rhApp, this.ho.hoImgWidth, this.ho.hoImgHeight/this.NbScores);
				this.scoreSurfaces[a].setText(this.Scores[a].toString(), CServices.DT_LEFT|CServices.DT_TOP, null, this.Logfont, this.Colorref);
			}
		}
	},
	displayRunObject:function(context, xDraw, yDraw)
	{
    	var x=this.ho.hoX-this.rh.rhWindowX+this.ho.pLayer.x+xDraw;
    	var y=this.ho.hoY-this.rh.rhWindowY+this.ho.pLayer.y+yDraw;
        var a;
        var localNames = new Array(20);
        var i;
        for (i = 0; i < 20; i++)
        {
            localNames[i] = this.Names[i];
            if (localNames[i].length > this.NameSize)
            {
                localNames[i] = localNames[i].substring(0, this.NameSize);
            }
        }
        var rhPtr = this.ho.hoAdRunHeader;
        var score;
        var rc=new CRect;
		if (this.textSurfaces==null)
		{
			this.textSurfaces=new Array(this.NbScores);
			for (a=0; a<this.NbScores; a++)
			{			
				this.textSurfaces[a]=new CTextSurface(this.rh.rhApp, this.ho.hoImgWidth, this.ho.hoImgHeight/this.NbScores);
				this.textSurfaces[a].setText(localNames[a], CServices.DT_LEFT|CServices.DT_TOP, null, this.Logfont, this.Colorref);
			}
		}
        if ((this.Flags & CRunkchisc.SCR_DONTDISPLAYSCORES) != 0)
        {
            // Compute coordinates
            rc.left = x;
            rc.right = x+ this.ho.hoImgWidth;
            rc.top = y;
            rc.bottom = y + (this.ho.hoImgHeight / this.NbScores);

            // draw names
            for (a = 0; a < this.NbScores; a++)
            {
            	this.textSurfaces[a].draw(context, rc.left, rc.top, 0, 0);
                rc.top += this.ho.hoImgHeight / this.NbScores;
                rc.bottom += this.ho.hoImgHeight / this.NbScores;
			}
        }
        else
        {
            // Draw text
            if (0 != (this.Flags & CRunkchisc.SCR_NAMEFIRST))
            {

                // Compute coordinates
                rc.left = x;
                rc.right = rc.left + ((this.ho.hoImgWidth / 4) * 3);
                rc.top = y;
                rc.bottom = rc.top + (this.ho.hoImgHeight / this.NbScores);

                // draw names
                for (a = 0; a < this.NbScores; a++)
                {
	            	this.textSurfaces[a].draw(context, rc.left, rc.top, 0, 0);
                    rc.top += this.ho.hoImgHeight / this.NbScores;
                    rc.bottom += this.ho.hoImgHeight / this.NbScores;
                }

                // Compute coordinates
                rc.left = x + ((this.ho.hoImgWidth / 4) * 3);
                rc.right = rc.left + (this.ho.hoImgWidth / 4);
                rc.top = y;
                rc.bottom = rc.top + (this.ho.hoImgHeight / this.NbScores);

                // draw scores
                this.createScores(context);
                for (a = 0; a < this.NbScores; a++)
                {
	            	this.scoreSurfaces[a].draw(context, rc.left, rc.top, 0, 0);
                    rc.top += this.ho.hoImgHeight / this.NbScores;
                    rc.bottom += this.ho.hoImgHeight / this.NbScores;
                }
            }
            else
            {
                // Compute coordinates
                rc.left = x;
                rc.right = rc.left + (ho.hoImgWidth / 4);
                rc.top = y;
                rc.bottom = rc.top + (ho.hoImgHeight / this.NbScores);

                // draw scores
                this.createScores();
                for (a = 0; a < this.NbScores; a++)
                {
	            	this.scoreSurfaces[a].draw(context, rc.left, rc.top, 0, 0);
                    rc.top += ho.hoImgHeight / this.NbScores;
                    rc.bottom += ho.hoImgHeight / this.NbScores;
                }

                // Compute coordinates
                rc.left = x + (ho.hoImgWidth / 4);
                rc.right = rc.left + ((ho.hoImgWidth / 4) * 3);
                rc.top = y;
                rc.bottom = rc.top + (ho.hoImgHeight / this.NbScores);

                // draw names
                for (a = 0; a < this.NbScores; a++)
                {
                	var width=context.measureText(localNames[a]).width;
					context.fillText(localNames[a], rc.right-width, rc.top);
                    rc.top += ho.hoImgHeight / this.NbScores;
                    rc.bottom += ho.hoImgHeight / this.NbScores;
                }
            }
        }
	},
    
    // Conditions
    // --------------------------------------------------
    condition:function(num, cnd)
    {
        switch (num)
        {
            case CRunkchisc.CND_ISPLAYER:
                return this.IsPlayerHiScore(cnd.getParamPlayer(this.rh, 0));
            case CRunkchisc.CND_VISIBLE:
                return this.IsVisible();	        
        }
    	return false;
    },
    IsPlayerHiScore:function(player)
    {
        var rhPtr = this.ho.hoAdRunHeader;
        var score = rhPtr.rhApp.scores[player];
        if ((score > this.Scores[this.NbScores - 1]) && (score != this.scrPlayer[player]))
        {
            this.scrPlayer[player] = score;
            return true;
        }
        return false;
    },

    IsVisible:function()
    {
        return this.bShown;
    },
    
    // Actions
    // -------------------------------------------------
    action:function(num, act)
    {
        switch (num)
        {
            case CRunkchisc.ACT_ASKNAME:
                this.CheckScore(act.getParamPlayer(this.rh, 0));
                break;
            case CRunkchisc.ACT_HIDE:
                this.hieSprite();
                break;
            case CRunkchisc.ACT_SHOW:
                this.showSprite();
                break;
            case CRunkchisc.ACT_RESET:
                this.Reset();
                break;
            case CRunkchisc.ACT_CHANGENAME:
                this.ChangeName(act.getParamExpression(this.rh, 0), act.getParamExpString(this.rh, 1));
                break;
            case CRunkchisc.ACT_CHANGESCORE:
                this.ChangeScore(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                break;
            case CRunkchisc.ACT_SETPOSITION:
                this.SetPosition(act);
                break;
            case CRunkchisc.ACT_SETXPOSITION:
                this.SetXPosition(act.getParamExpression(this.rh, 0));
                break;
            case CRunkchisc.ACT_SETYPOSITION:
                this.SetYPosition(act.getParamExpression(this.rh, 0));
                break;
            case CRunkchisc.ACT_INSERTNEWSCORE:
                this.InsertNewScore(act.getParamExpression(this.rh, 0), act.getParamExpString(this.rh, 1));
                break;
            case CRunkchisc.ACT_SETCURRENTFILE:
                this.SetCurrentFile(act.getParamExpString(this.rh, 0));
                break;            
        }
	},
	
    CheckScore:function(player) 
    {
        var rhPtr = this.ho.hoAdRunHeader;
        if (player < rhPtr.rhNPlayers)
        {
            this.newScore = rhPtr.rhApp.scores[player];
            if (this.newScore > this.Scores[this.NbScores - 1])
            {
            	this.rh.pause();
				var name=window.prompt("Hi-score", "Please enter your name");
				this.rh.resume();
				this.InsertNewScore(this.newScore, name);
                return true;
            }
        }
        return false;
    },

    Reset:function()
    {
    	var a;
        for (a = 0; a < 20; a++)
        {
            this.Names[a] = this.originalNames[a];
            this.Scores[a] = this.originalScores[a];
        }
        this.ho.redraw();
    },

    ChangeName:function(i, name) 
    {
        if ((i > 0) && (i <= this.NbScores))
        {
            this.Names[i - 1] = name;
            this.ho.redraw();
        }
    },

    ChangeScore:function(i, score)
    {
        if ((i > 0) && (i <= this.NbScores))
        {
            this.Scores[i - 1] = score;
            this.ho.redraw();
        }
    },

    SetPosition:function(act)
    {
    	var p=act.getParamPosition(this.rh, 0)
    	this.ho.setX(p.x);
    	this.ho.setY(p.y);
    },

    SetXPosition:function(x)
    {
    	this.ho.setX(x);
    },

    SetYPosition:function(y)
    {
    	this.ho.setY(y);
    },

    InsertNewScore:function(pScore, pName)
    {
        if (pScore > this.Scores[this.NbScores - 1])
        {
            this.Scores[19] = pScore;
            this.Names[19] = pName;
            var b;
            var TriOk;
            var score;
            var name;
            // Sort the hi-score table ws_visible
            do
            {
                TriOk = true;
                for (b = 1; b < 20; b++)
                {
                    if (this.Scores[b] > this.Scores[b - 1])
                    {
                        score = this.Scores[b - 1];
                        name = this.Names[b - 1];
                        this.Scores[b - 1] = this.Scores[b];
                        this.Names[b - 1] = this.Names[b];
                        this.Scores[b] = score;
                        this.Names[b] = name;
                        TriOk = false;
                    }
                }
            } while (false == TriOk);
            this.saveScores();
	        this.textSurfaces=null;
    	    this.scoreSurfaces=null;         
        }
    },

    SetCurrentFile:function(fileName)
    {
        this.ini.currentFileName = fileName;
        this.loadScores();
    },
    
	// EXPRESSIONS
	// -------------------------------------------------------------------------
    expression:function(num)
    {
        switch (num)
        {
            case CRunkchisc.EXP_VALUE:               
                return this.GetValue(this.ho.getExpParam());
            case CRunkchisc.EXP_NAME:
                return this.GetName(this.ho.getExpParam());
            case CRunkchisc.EXP_GETXPOSITION:
                return this.GetXPosition();
            case CRunkchisc.EXP_GETYPOSITION:
                return this.GetYPosition();            
        }
        return (0);
    },

    GetValue:function(i)
    {
        if ((i > 0) && (i <= this.NbScores))
        {
            return (this.Scores[i - 1]);
        }
        return (0);
    },
    GetName:function(i)
    {
        if ((i > 0) && (i <= this.NbScores))
        {
            return this.Names[i - 1];
        }
        return "";
    },
    GetXPosition:function()
    {
        return (this.ho.hoX);
    },
    GetYPosition:function()
    {
        return (this.ho.hoY);
    }
});
	

