// CTransitioncctrans : point d'entree des transitions standard
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

CTransitionCCTrans.identifiers=
[
    "BAND",
    "SE00",
    "SE10",
    "SE12",
    "DOOR",
    "SE03",
    "MOSA",
    "SE05",
    "SE06",
    "SCRL",
    "SE01",
    "SE07",
    "SE09",
    "SE13",
    "SE08",
    "SE02",
    "ZIGZ",
    "SE04",
    "ZOOM",
    "SE11",
    "FADE"
];
function CTransitionCCTrans()
{	
}
CTransitionCCTrans.prototype=CServices.extend(new CTransition(),
{
    getTrans:function(data)
    {
        // Extrait l'identifier
        var id=data.transID;
        var idChars="";
        idChars+=String.fromCharCode(id&0xFF);
        id>>=8;
        idChars+=String.fromCharCode(id&0xFF);
        id>>=8;
        idChars+=String.fromCharCode(id&0xFF);
        id>>=8;
        idChars+=String.fromCharCode(id&0xFF);
        
        // Recherche dans la liste
        var n;
        for (n=0; n<CTransitionCCTrans.identifiers.length; n++)
        {
            if (idChars==CTransitionCCTrans.identifiers[n])
            {
                break;
            }
        }
        
        // Cree la transition
        var trans=null;
        switch (n)
        {
            case 0:
                trans=new CTransBand();
                break;
            case 1:
                trans=new CTransAdvancedScrolling();
                break;
            case 2:
                trans=new CTransBack();
                break;
            case 3:
                trans=new CTransCell();
                break;
            case 4:
                trans=new CTransDoor();
                break;
            case 5:
                trans=new CTransLine();
                break;
            case 6:
                trans=new CTransMosaic();
                break;
            case 7:
                trans=new CTransOpen();
                break;
            case 8:
                trans=new CTransPush();
                break;
            case 9:
                trans=new CTransScroll();
                break;
            case 10:
                trans=new CTransSquare();
                break;
            case 11:
                trans=new CTransStretch();
                break;
            case 12:
                trans=new CTransStretch2();
                break;
            case 13:
                trans=new CTransTrame();
                break;
            case 14:
                trans=new CTransTurn();
                break;
            case 15:
                trans=new CTransTurn2();
                break;
            case 16:
                trans=new CTransZigZag();
                break;
            case 17:
                trans=new CTransZigZag2();
                break;
            case 18:
                trans=new CTransZoom();
                break;
            case 19:
                trans=new CTransZoom2();
                break;
            case 20:
                trans=new CTransFade();
                break;
        }
        return trans;
    }
});
	
// CTransAdvancedScrolling
//----------------------------------------------------------------------------------
function CTransAdvancedScrolling()
{	
    this.dwStyle=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
    this.m_style=0;
}
CTransAdvancedScrolling.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.dwStyle=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
		// 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;

            if ( this.dwStyle!=8 )
                this.m_style = this.dwStyle;
            else
                this.m_style=Math.floor(Math.random()*8);                
       	}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);													// completed
        }
        else
        {
            var w, h;

            switch(this.m_style)
            {
                case 0:
                    // Scrolling (To right, to left and to down)
                    /////////////////////////////////////////////

                    w = this.m_source2Width/3 * elapsedTime / this.m_duration;
                    h = this.m_source2Height;
                    this.blit(this.source2,0,0,this.m_source2Width/3-w,0,w,h);					// Left Side
                    this.blit(this.source2,this.m_source2Width-w,0,2*this.m_source2Width/3,0,w,h);	// Right Side

                    w = this.m_source2Width/3;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.blit(this.source2,w,0,w,this.m_source2Height-h,w,h);					// Top side
                    break;
                case 1:
                    // Scrolling (To right, to left and to up)
                    /////////////////////////////////////////////

                    w = this.m_source2Width/3 * elapsedTime / this.m_duration;
                    h = this.m_source2Height;
                    this.blit(this.source2,0,0,this.m_source2Width/3-w,0,w,h);					// Left Side
                    this.blit(this.source2,this.m_source2Width-w,0,2*this.m_source2Width/3,0,w,h);	// Right Side

                    w = this.m_source2Width/3;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.blit(this.source2,w,this.m_source2Height-h,w,0,w,h);					// Bottom side
                    break;
                case 2:
                    // To right, to left and to up
                    ////////////////////////////////

                    w = this.m_source2Width/3 * elapsedTime / this.m_duration;
                    h = this.m_source2Height;
                    this.blit(this.source2,0,0,this.m_source2Width/3-w,0,w,h);					// Left Side
                    this.blit(this.source2,this.m_source2Width-w,0,2*this.m_source2Width/3,0,w,h);	// Right Side

                    w = this.m_source2Width/3;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.blit(this.source2,w,0,w,0,w,h);									// Top side
                    break;
                case 3:
                    // To right, to left and to down
                    /////////////////////////////////

                    w = this.m_source2Width/3 * elapsedTime / this.m_duration;
                    h = this.m_source2Height;
                    this.blit(this.source2,0,0,this.m_source2Width/3-w,0,w,h);					// Left Side
                    this.blit(this.source2,this.m_source2Width-w,0,2*this.m_source2Width/3,0,w,h);	// Right Side

                    w = this.m_source2Width/3;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.blit(this.source2,w,this.m_source2Height-h,w,this.m_source2Height-h,w,h);	// Bottom side
                    break;
                case 4:
                    // To right, to left, to down and to up
                    ////////////////////////////////////////

                    w = this.m_source2Width/3 * elapsedTime / this.m_duration;
                    h = this.m_source2Height;
                    this.blit(this.source2,0,0,this.m_source2Width/3-w,0,w,h);					// Left Side
                    this.blit(this.source2,this.m_source2Width-w,0,2*this.m_source2Width/3,0,w,h);	// Right Side

                    w = this.m_source2Width/3;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    this.blit(this.source2,w,0,w,this.m_source2Height/2-h,w,h);					// Top side
                    this.blit(this.source2,w,this.m_source2Height-h,w,this.m_source2Height/2,w,h);	// Bottom side
                    break;
                case 5:
                    // To right, to left, to down and to up
                    ////////////////////////////////////////

                    w = this.m_source2Width/3 * elapsedTime / this.m_duration;
                    h = this.m_source2Height;
                    this.blit(this.source2,0,0,this.m_source2Width/3-w,0,w,h);					// Left Side
                    this.blit(this.source2,this.m_source2Width-w,0,2*this.m_source2Width/3,0,w,h);	// Right Side

                    w = this.m_source2Width/3;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    this.blit(this.source2,w,0,w,0,w,h);									// Top side
                    this.blit(this.source2,w,this.m_source2Height-h,w,this.m_source2Height-h,w,h);	// Bottom side
                    break;
                case 6:
                    // Scrolling (3 bands)
                    ///////////////////////

                    w = this.m_source2Width/3;
                    h = this.m_source2Height * elapsedTime / this.m_duration;

                    this.blit(this.source2,0,this.m_source2Height-h,0,0,w,h);					// Band 1
                    this.blit(this.source2,w,0,w,this.m_source2Height-h,w,h);					// Band 2
                    this.blit(this.source2,w*2,this.m_source2Height-h,w*2,0,w,h);				// Band 3
                    break;
                case 7:
                    // Scrolling (7 bands)
                    ///////////////////////

                    w = this.m_source2Width/7;
                    h = this.m_source2Height * elapsedTime / this.m_duration;

                    this.blit(this.source2,0,this.m_source2Height-h,0,0,w,h);					// Band 1
                    this.blit(this.source2,w,0,w,this.m_source2Height-h,w,h);					// Band 2
                    this.blit(this.source2,w*2,this.m_source2Height-h,w*2,0,w,h);				// Band 3
                    this.blit(this.source2,w*3,0,w*3,this.m_source2Height-h,w,h);				// Band 4
                    this.blit(this.source2,w*4,this.m_source2Height-h,w*4,0,w,h);				// Band 5
                    this.blit(this.source2,w*5,0,w*5,this.m_source2Height-h,w,h);				// Band 6
                    this.blit(this.source2,w*6,this.m_source2Height-h,w*6,0,w*2,h);				// Band 7
                    break;
                default:
                    this.blit(this.source2);
                    break;
            }
		}
		return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransBack()
{	
    this.dwStyle=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
}
CTransBack.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.dwStyle=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        // 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);												// completed
        }
        else
        {
            var w, h;
            this.blit(this.source2);

            switch(this.dwStyle)
            {
                // OPEN
                case 0:
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    w = this.m_source2Width/2 - w;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 - h;
                    this.stretch(this.source1, 0, 0, w, h, 0, 0, this.m_source2Width/2, this.m_source2Height/2);

                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 - h;
                    this.stretch(this.source1,this.m_source2Width/2+w,0,this.m_source2Width/2-w,h,this.m_source2Width/2,0,this.m_source2Width/2,this.m_source2Height/2);

                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    w = this.m_source2Width/2 - w;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    this.stretch(this.source1,0,this.m_source2Height/2+h,w,this.m_source2Height/2-h,0,this.m_source2Height/2,this.m_source2Width/2,this.m_source2Height/2);

                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    this.stretch(this.source1,this.m_source2Width/2+w,this.m_source2Height/2+h,this.m_source2Width/2-w,this.m_source2Height/2-h,this.m_source2Width/2,this.m_source2Height/2,this.m_source2Width/2,this.m_source2Height/2);
                    break;
                // SLIDE
                case 1:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    w = this.m_source2Width - w;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    h = this.m_source2Height - h;
                    this.blit(this.source1,0,0,this.m_source2Width-w,this.m_source2Height-h,w,h);
                    break;
                // SLIDE
                case 2:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    h = this.m_source2Height - h;
                    this.blit(this.source1,w,0,0,this.m_source2Height-h,this.m_source2Width-w,h);
                    break;
                // SLIDE
                case 3:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    w = this.m_source2Width - w;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.blit(this.source1,0,h,this.m_source2Width-w,0,w,this.m_source2Height-h);
                    break;
                // SLIDE
                case 4:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.blit(this.source1,w,h,0,0,this.m_source2Width-w,this.m_source2Height-h);
                    break;
                // OPEN (SCROLLING)
                case 5:
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    w = this.m_source2Width/2 - w;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 - h;
                    this.blit(this.source1,w-this.m_source2Width/2,h-this.m_source2Height/2,0,0,this.m_source2Width/2,this.m_source2Height/2);

                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 - h;
                    this.blit(this.source1,this.m_source2Width/2+w,h-this.m_source2Height/2,this.m_source2Width/2,0,this.m_source2Width/2,this.m_source2Height/2);

                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    w = this.m_source2Width/2 - w;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    this.blit(this.source1,w-this.m_source2Width/2,this.m_source2Height/2+h,0,this.m_source2Height/2,this.m_source2Width/2,this.m_source2Height/2);

                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    this.blit(this.source1,this.m_source2Width/2+w,this.m_source2Height/2+h,this.m_source2Width/2,this.m_source2Height/2,this.m_source2Width/2,this.m_source2Height/2);
                    break;
                // SLIDE
                case 6:
                    w = this.m_source2Width;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 - h;
                    this.blit(this.source1,0,h-this.m_source2Height/2,0,0,this.m_source2Width,this.m_source2Height/2);
                    this.blit(this.source1,0,this.m_source2Height-h,0,this.m_source2Height/2,this.m_source2Width,this.m_source2Height/2);
                    break;
                // SLIDE
                case 7:
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    w = this.m_source2Width/2 - w;
                    h = this.m_source2Height;
                    this.blit(this.source1,w-this.m_source2Width/2,0,0,0,this.m_source2Width/2,this.m_source2Height);
                    this.blit(this.source1,this.m_source2Width-w,0,this.m_source2Width/2,0,this.m_source2Width/2,this.m_source2Height);
                    break;
            }
		}
		return null;
    },
    end:function()
    {
        this.finish();
    }
});

function CTransBand()
{	
   	this.bpNbBands=0;
    this.bpDirection=0;
    this.m_wbande=0;
    this.m_rw=0;
    this.m_prc=null;
}
CTransBand.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.bpNbBands=file.readAShort();
        this.bpDirection=file.readAShort();
        this.start(data, display, source, dest);
    },
    stepDraw:function(flag)
    {
        var sw = this.source1.width;
        var sh = this.source1.height;
        var n;
        
        // 1st time? create surface
        if ( this.m_starting )
        {
            // Security...
            if ( this.bpNbBands == 0 )
                 this.bpNbBands = 1;

            switch (this.bpDirection) 
            {
                case CTrans.LEFT_RIGHT:
                case CTrans.RIGHT_LEFT:
                    this.m_wbande = (sw + this.bpNbBands - 1)/ this.bpNbBands;
                    if ( this.m_wbande == 0 )
                    {
                        this.m_wbande = 1;
                        this.bpNbBands = sw;
                    }
                    break;
                default:
                    this.m_wbande = (sh + this.bpNbBands - 1) / this.bpNbBands;
                    if ( this.m_wbande == 0 )
                    {
                        this.m_wbande = 1;
                        this.bpNbBands = sh;
                    }
                    break;
            }
            this.m_rw = 0;
            this.m_starting = false;
        }

        // Attention, passer la transparence en parametre...
        if ( this.bpNbBands <= 0 || this.m_wbande <= 0 || this.m_duration == 0 )
            this.blit(this.source2);	// termine
        else
        {
            var rw = this.m_wbande * this.getDeltaTime() / this.m_duration;
            if ( rw > this.m_rw )
            {
                var x=0, y=0, w=0, h=0;
                for (n=0; n<this.bpNbBands; n++)
                {
                    switch (this.bpDirection) 
                    {
                        case CTrans.LEFT_RIGHT:
                            x = this.m_rw + n * this.m_wbande;
                            y = 0;
                            w = rw - this.m_rw;
                            h = sh;
                            break;
                        case CTrans.RIGHT_LEFT:
                            x = sw - (this.m_rw + n * this.m_wbande) - (rw-this.m_rw);
                            y = 0;
                            w = rw - this.m_rw;
                            h = sh;
                            break;
                        case CTrans.TOP_BOTTOM:
                            x = 0;
                            y = this.m_rw + n * this.m_wbande;
                            w = sw;
                            h = rw - this.m_rw;
                            break;
                        case CTrans.BOTTOM_TOP:
                            x = 0;
                            y = sh - (this.m_rw + n * this.m_wbande) - (rw-this.m_rw);
                            w = sw;
                            h = rw - this.m_rw;
                            break;
                    }
                    this.blit(this.source2, x, y, x, y, w, h);
                }
            }
            this.m_rw = rw;
        }
        return this.m_prc;
    },
    end:function()
    {
        this.finish();
    }  
});


function CTransCell()
{	
   	this.dwPos=0;
    this.dwPos2=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
}
CTransCell.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.dwPos=file.readAInt();
        this.dwPos2=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);					// completed
        }
        else
        {
            var x, y, w, h, i, j, w2, h2;
            var width, height;

            width = this.m_source2Width / this.dwPos;
            height = this.m_source2Height / this.dwPos2;
            w = this.m_source2Width / this.dwPos;
            h = this.m_source2Height / this.dwPos2;

            for ( i=0 ; i<this.dwPos ; i++ )
            {
                for ( j=0 ; j<this.dwPos2 ; j++ )
                {
                    x = ( i * width );
                    y = ( j * height );

                    w2 = w * elapsedTime / this.m_duration;
                    h2 = h * elapsedTime / this.m_duration;
                    this.stretch(this.source2,x+(w-w2)/2,y+(h-h2)/2,w2,h2,x+(w-w2)/2,y+(h-h2)/2,w2,h2);
                }
            }
		}
		return null;
    },
    end:function()
    {
        this.finish();
    }
});

function CTransDoor()
{	
    this.m_direction=0;
    this.m_wbande=0;
    this.m_rw=0;
}
CTransDoor.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.m_direction=file.readAShort();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        // 1st time? create surface
        if ( this.m_starting )
        {
            switch (this.m_direction) 
            {
                case CTrans.CENTER_LEFTRIGHT:
                case CTrans.LEFTRIGHT_CENTER:
                    this.m_wbande = this.source1.width / 2;
                    break;
                default:
                    this.m_wbande = this.source1.height / 2;
                    break;
            }
            this.m_rw = 0;
            this.m_starting = false;
        }

        // Attention, passer la transparence en parametre...
        if ( this.m_wbande == 0 )
            this.blit(this.source2);	// termine
        else
        {
            var	x=0, y=0, w=0, h=0;
            var rw = this.m_wbande * this.getDeltaTime() / this.m_duration;
            if ( rw > this.m_rw )
            {
                // 1st band
                switch(this.m_direction) 
                {
                    case CTrans.CENTER_LEFTRIGHT:
                        x = this.source1.width / 2 - rw;
                        y = 0;
                        w = rw - this.m_rw;
                        h = this.source2.height;
                        break;
                    case CTrans.LEFTRIGHT_CENTER:
                        x = this.m_rw;
                        y = 0;
                        w = rw - this.m_rw;
                        h = this.source2.height;
                        break;
                    case CTrans.CENTER_TOPBOTTOM:
                        x = 0;
                        y = this.source1.height / 2 - rw;
                        w = this.source2.width;
                        h = rw - this.m_rw;
                        break;
                    case CTrans.TOPBOTTOM_CENTER:
                        x = 0;
                        y = this.m_rw;
                        w = this.source2.width;
                        h = rw - this.m_rw;
                        break;
                }
                this.blit(this.source2, x, y, x, y, w, h);

                // 2nd band
                switch(this.m_direction) 
                {
                    case CTrans.CENTER_LEFTRIGHT:
                        x = this.source1.width / 2 + this.m_rw;
                        break;
                    case CTrans.LEFTRIGHT_CENTER:
                        x = this.source1.width - rw;
                        break;
                    case CTrans.CENTER_TOPBOTTOM:
                        y = this.source1.height / 2 + this.m_rw;
                        break;
                    case CTrans.TOPBOTTOM_CENTER:
                        y = this.source1.height - rw;
                        break;
                }
                this.blit(this.source2, x, y, x, y, w, h);
            }
		}
        return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransFade()
{	
}
CTransFade.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        // 1st time? create surface
        if ( this.m_starting )
        {
            this.m_starting = false;
        }

        var fadeCoef;

        // Fade in
        if ( (flag & CTrans.TRFLAG_FADEIN)!=0 )
        {
            fadeCoef = this.getDeltaTime() / this.m_duration;
	        this.destContext.globalAlpha = fadeCoef;
            this.blit(this.source2);
        }
        // Fade out
        else
        {
            fadeCoef = 1.0- this.getDeltaTime()/this.m_duration;
	        this.destContext.globalAlpha = fadeCoef;
            this.blit(this.source2);
        }
        return null;
    },
    end:function()
    {
        this.destContext.globalAlpha = 1.0;
        this.finish();
    }
});


function CTransLine()
{	
    this.dwPos=0;
    this.dwStyle=0;
    this.dwScrolling=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
}
CTransLine.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.dwPos=file.readAInt();
        this.dwStyle=file.readAInt();
        this.dwScrolling=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        // 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);      // completed
        }
        else
        {
            var x, y, w, h;
            var i = 0;		// Loop
            var j = 0;		// Loop
            var linesize = 0;

            // Horizontal
            if ( this.dwStyle==0 )
            {
                linesize = this.m_source2Height / this.dwPos;
                for ( i=0 ; i<this.dwPos ; i++ )
                {
                    if ( j==0 )
                    {
                        x = 0;
                        y = (i * linesize);
                        w = this.m_source2Width * elapsedTime / this.m_duration;

                        // Last
                        if ( i==this.dwPos-1 )
                            h = this.m_source2Height;
                        else
                            h = (linesize+1.0);

                        // Without scrolling or with scrolling
                        if ( this.dwScrolling==0 )
                            this.blit(this.source2,x,y,x,y,w,h);
                        else
                            this.blit(this.source2,x,y,this.m_source2Width-w,y,w,h);

                        j = 1;
                    }
                    else
                    {
                        y = (i * linesize);//h;
                        w = this.m_source2Width * elapsedTime / this.m_duration;
                        x = this.m_source2Width - w;

                        // Last
                        if ( i==this.dwPos-1 )
                            h = this.m_source2Height;
                        else
                            h = (linesize+1.0);

                        // Without scrolling or with scrolling
                        if ( this.dwScrolling==0 )
                            this.blit(this.source2,x,y,x,y,w,h);
                        else
                            this.blit(this.source2,x,y,0,y,w,h);

                        j = 0;
                    }
                }
            }
            // Vertical
            else
            {
                linesize = this.m_source2Width / this.dwPos;
                for ( i=0 ; i<this.dwPos ; i++ )
                {
                    if ( j==0 )
                    {
                        x = (i * linesize);
                        y = 0;
                        h = this.m_source2Height * elapsedTime / this.m_duration;

                        // Last
                        if ( i==this.dwPos-1 )
                            w = this.m_source2Width;
                        else
                            w = (linesize+1);

                        // Without scrolling or with scrolling
                        if ( this.dwScrolling==0 )
                            this.blit(this.source2,x,y,x,y,w,h);
                        else
                            this.blit(this.source2,x,y,x,this.m_source2Height-h,w,h);

                        j = 1;
                    }
                    else
                    {
                        x = (i * linesize);
                        h = this.m_source2Height * elapsedTime / this.m_duration;
                        y = this.m_source2Height - h;

                        // Last
                        if ( i==this.dwPos-1 )
                            w = this.m_source2Width;
                        else
                            w = (linesize+1);

                        // Without scrolling or with scrolling
                        if ( this.dwScrolling==0 )
                            this.blit(this.source2,x,y,x,y,w,h);
                        else
                            this.blit(this.source2,x,y,x,0,w,h);
                        j = 0;
                    }
                }
            }
        }
		return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransMosaic()
{	
    // Parameters
    this.m_spotPercent;

    // Runtime
    this.m_spotSize=0;
    this.m_nbBlockPerLine=0;
    this.m_nbBlockPerCol=0;
    this.m_nbBlocks=0;
    this.m_lastNbBlocks=0;
    this.m_bitbuf=null;
}
CTransMosaic.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.m_spotPercent=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        // 1st time? create surface
        if ( this.m_starting )
        {
            var sw = this.source1.width;
            var sh = this.source1.height;
            
            // Spot size: voir si ca rend bien
            this.m_spotSize = Math.floor(((sw * this.m_spotPercent / 100) + (sh * this.m_spotPercent / 100)) / 2);
            if ( this.m_spotSize == 0 )
                this.m_spotSize = 1;

            // Calcul buffer bits
            var bufSize;
            this.m_nbBlockPerLine = ((sw + this.m_spotSize - 1) / this.m_spotSize);
            this.m_nbBlockPerCol = ((sh + this.m_spotSize - 1) /this.m_spotSize);
            this.m_nbBlocks = this.m_nbBlockPerLine * this.m_nbBlockPerCol;
            bufSize = Math.floor((this.m_nbBlocks + 7) / 8 + 2);	// 2 = security
            this.m_lastNbBlocks = 0;
            this.m_bitbuf = new Array(bufSize);
            var n;
            for (n=0; n<bufSize; n++)
            	this.m_bitbuf[n]=0;
            this.m_starting = false;
        }

        if ( this.m_bitbuf == null || this.m_nbBlockPerLine < 2 || this.m_nbBlockPerCol < 2 || this.m_duration == 0 )
            this.blit(this.source2);	// termine
        else
        {
            var NB_TRIES=1;
            var i;
            var l, xb=0, yb=0;
            var nbBlocks = Math.floor(this.m_nbBlocks * this.getDeltaTime() / this.m_duration);
            var nbCurrentBlocks = nbBlocks - this.m_lastNbBlocks;
            if ( nbCurrentBlocks != 0 )
            {
                this.m_lastNbBlocks = nbBlocks;
                for (l=0; l<nbCurrentBlocks; l++)
                {
                    // Get random block coordinates
                    for (i=0; i<NB_TRIES; i++)
                    {
                        xb = Math.floor(this.m_nbBlockPerLine * Math.random());
                        yb = Math.floor(this.m_nbBlockPerCol * Math.random());

                        var	nb, off;
                        var	mask;

                        nb = yb * this.m_nbBlockPerLine + xb;
                        off = Math.floor(nb/8);
                        mask = (1 << (nb&7));
                        if ( (this.m_bitbuf[off] & mask) == 0 )
                        {
                            this.m_bitbuf[off] |= mask;
                            break;
                        }

                        var pBuf=off; 
                        var	nbb = (this.m_nbBlocks+7)/8;
                        var	b;
                        var	r = false;
                        for (b=off; b<nbb; b++, pBuf++)
                        {
                            if ( this.m_bitbuf[pBuf] != -1 )
                            {
                                yb = Math.floor((b*8) / this.m_nbBlockPerLine);
                                xb = Math.floor((b*8) % this.m_nbBlockPerLine);
                                for (mask=1; mask!=0; mask<<=1)
                                {
                                    if ( (this.m_bitbuf[pBuf] & mask) == 0 )
                                    {
                                        this.m_bitbuf[pBuf] |= mask;
                                        r = true;
                                        break;
                                    }
                                    if ( ++xb >= this.m_nbBlockPerLine )
                                    {
                                        xb = 0;
                                        if ( ++yb >= this.m_nbBlockPerCol )
                                            break;
                                    }
                                }
                                if ( r )
                                    break;								
                            }
                        }
                        if ( r )
                            break;

                        pBuf = 0;
                        for (b=0; b<off; b++, pBuf++)
                        {
                            if ( this.m_bitbuf[pBuf] != 255 )
                            {
                                yb = Math.floor((b*8) / m_nbBlockPerLine);
                                xb = Math.floor((b*8) % m_nbBlockPerLine);
                                for (mask=1; mask!=0; mask<<=1)
                                {
                                    if ( (this.m_bitbuf[pBuf] & mask) == 0 )
                                    {
                                        this.m_bitbuf[pBuf] |= mask;
                                        r = true;
                                        break;
                                    }
                                    if ( ++xb >= this.m_nbBlockPerLine )
                                    {
                                        xb = 0;
                                        if ( ++yb >= this.m_nbBlockPerCol )
                                            break;
                                    }
                                }
                                if ( r )
                                    break;
                            }
                            if ( r )
                                break;

                            r = false;
                        }
                    }
                    if ( i < NB_TRIES )
                    {
                        this.blit(this.source2,Math.floor(xb*this.m_spotSize), Math.floor(yb*this.m_spotSize),Math.floor(xb*this.m_spotSize), Math.floor(yb*this.m_spotSize), this.m_spotSize, this.m_spotSize);
                    }
                }
            }
        }
        return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransOpen()
{	
    this.dwStyle=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
}
CTransOpen.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.dwStyle=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        // 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
		}

		var elapsedTime = this.getDeltaTime();

        var pourcentage = elapsedTime/this.m_duration;

        if ( pourcentage>1.0 )
        {
            this.blit(this.source2);					// completed
        }
        else
        {
            var x, y, w, h;

            if ( pourcentage<0.3 )
            {
                w = this.m_source2Width*2 * elapsedTime / this.m_duration;
                w *= 2;
                h = this.m_source2Height / 7;
                x = this.m_source2Width/2 - w/2;
                y = this.m_source2Height/2 - h/2;
                this.blit(this.source2,x,y,x,y,w,h);

                w = this.m_source2Width / 7;
                h = this.m_source2Height*2 * elapsedTime / this.m_duration;
                h *= 2;
                x = this.m_source2Width/2 - w/2;
                y = this.m_source2Height/2 - h/2;
                this.blit(this.source2,x,y,x,y,w,h);
            }
            else
            {
                x = this.m_source2Width/2;
                w = this.m_source2Width * elapsedTime / this.m_duration - x;
                h = this.m_source2Height/2;
                y = 0;
                this.blit(this.source2,x,y,x,y,w,h);

                y = this.m_source2Height/2;
                h = this.m_source2Height * elapsedTime / this.m_duration - y;
                w = this.m_source2Width/2;
                x = w;
                this.blit(this.source2,x,y,x,y,w,h);

                w = this.m_source2Width * elapsedTime / this.m_duration - this.m_source2Width/2;
                x = this.m_source2Width/2 - w;
                h = this.m_source2Height/2;
                y = h;
                this.blit(this.source2,x,y,x,y,w,h);

                h = this.m_source2Height * elapsedTime / this.m_duration - this.m_source2Height/2;
                y = this.m_source2Height/2 - h;
                w = this.m_source2Width/2;
                x = 0;
                this.blit(this.source2,x,y,x,y,w,h);
            }
        }
		return null;
    },
    end:function()
    {
        this.finish();
    }
});
 
 
function CTransPush()
{	
   	this.dwStyle=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
    this.m_refresh=0;
}
CTransPush.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.dwStyle=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        // 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
            this.m_refresh = false;
		}

		var elapsedTime = this.getDeltaTime();

        var pourcentage = elapsedTime/this.m_duration;
        if ( pourcentage>1.0 )
        {
            this.blit(this.source2);
        }
        else
        {
            var x, y, w, h;

            // First Scrolling
            if ( pourcentage<=0.5 )
            {
                switch(this.dwStyle)
                {
                    case 0:
                        w = this.m_source2Width * elapsedTime / this.m_duration * 2;
                        h = this.m_source2Height/2;
                        x = this.m_source2Width - w;
                        y = this.m_source2Height/2;
                        this.blit(this.source2,0,0,x,y,w,h);
                        break;
                    case 1:
                        w = this.m_source2Width * elapsedTime / this.m_duration * 2;
                        h = this.m_source2Height/2;
                        x = this.m_source2Width - w;
                        y = this.m_source2Height/2;
                        this.blit(this.source2,x,0,0,y,w,h);
                        break;
                    case 2:
                        w = this.m_source2Width * elapsedTime / this.m_duration * 2;
                        h = this.m_source2Height/2;
                        x = this.m_source2Width - w;
                        y = this.m_source2Height/2;
                        this.blit(this.source2,0,y,x,0,w,h);
                        break;
                    case 3:
                        w = this.m_source2Width * elapsedTime / this.m_duration * 2;
                        h = this.m_source2Height/2;
                        x = this.m_source2Width - w;
                        y = this.m_source2Height/2;
                        this.blit(this.source2,x,y,0,0,w,h);
                        break;
				}
            }

            // Second Scrolling
            if ( pourcentage>0.5 )
            {
                if ( this.m_refresh==false )
                {
                    if ( this.dwStyle<=1 )
                        this.blit(this.source2,0,0,0,this.m_source2Height/2,this.m_source2Width,this.m_source2Height/2);
                    else
                        this.blit(this.source2,0,this.m_source2Height/2,0,0,this.m_source2Width,this.m_source2Height/2);
                    this.m_refresh = true;
                }

                pourcentage = elapsedTime - this.m_duration/2.0;
                pourcentage /= this.m_duration / 2.0;
                pourcentage *= 1000;
                h = this.m_source2Height/2 * pourcentage / 1000; // Math.floor()?

                switch(this.dwStyle)
                {
                    case 0:
                    case 1:
                        this.stretch(this.source2, 0, h,this.m_source2Width, this.m_source2Height/2,0, this.m_source2Height/2, this.m_source2Width, this.m_source2Height/2);
                        this.stretch(this.source2, 0, 0, this.m_source2Width, h,0, this.m_source2Height/2-h, this.m_source2Width, h);
                        break;
                    case 2:
                    case 3:
                        this.stretch(this.source2, 0, this.m_source2Height/2-h,this.m_source2Width, this.m_source2Height/2,0, 0, this.m_source2Width, this.m_source2Height/2);
                        this.stretch(this.source2, 0, this.m_source2Height-h, this.m_source2Width, h, 0, this.m_source2Height/2, this.m_source2Width, h);
                        break;
				}
       		}
		}
		return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransScroll()
{	
   	this.m_direction;
    this.m_wbande;
    this.m_rw;
}
CTransScroll.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest) 
    {
        this.m_direction=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        var sw = this.source1.width;
		var sh = this.source1.height;

        // 1st time? create surface
        if ( this.m_starting )
        {
            switch (this.m_direction) 
            {
                case CTrans.LEFT_RIGHT:
                case CTrans.RIGHT_LEFT:
                    this.m_wbande = sw;
                    break;
                default:
                    this.m_wbande = sh;
                    break;
            }
            this.m_rw = 0;
            this.m_starting = false;
		}

        if ( this.m_duration == 0 )
            this.blit(this.source2);  // termine
        else
        {
            var rw = this.m_wbande * this.getDeltaTime() / this.m_duration;
            if ( rw > this.m_rw )
            {
                var x=0, y=0;

                switch (this.m_direction) 
                {
                    case CTrans.LEFT_RIGHT:
                        x = rw - sw;
                        y = 0;
                        break;
                    case CTrans.RIGHT_LEFT:
                        x = sw - rw;
                        y = 0;
                        break;
                    case CTrans.TOP_BOTTOM:
                        x = 0;
                        y = rw - sh;
                        break;
                    case CTrans.BOTTOM_TOP:
                        x = 0;
                        y = sh - rw;
                        break;
                }
                this.blit(this.source2, x, y, 0, 0, sw, sh);
                this.m_rw = rw;
            }
        }
        return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransSquare()
{	
	this.dwStyle=0;
    this.dwPos=0;
    this.dwStretch=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
}
CTransSquare.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest) 
    {
        this.dwStyle=file.readAInt();
        this.dwPos=file.readAInt();
        this.dwStretch=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        // 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
		}

		var elapsedTime = this.getDeltaTime();

        if ( elapsedTime/this.m_duration>1.0 )
        {
            this.blit(this.source2);													// completed
        }
        else
        {
            var x, y, w, h;
            var width, height;

            // Inside Square
            /////////////////

            width = this.m_source2Width * this.dwPos / 100;
            height = this.m_source2Height * this.dwPos / 100;

            w = width * elapsedTime / this.m_duration;
            h = height * elapsedTime / this.m_duration;
            x = this.m_source2Width/2 - w/2;
            y = this.m_source2Height/2 - h/2;
			
            // No Stretch
            if ( this.dwStretch==0 )
                this.blit(this.source2,x,y,x,y,w,h);
            else
                this.stretch(this.source2, x, y, w, h, this.m_source2Width/2-width/2, this.m_source2Height/2-height/2, width, height);

            // Outside Square
            //////////////////

            var pos = 100 - this.dwPos;
            width = this.m_source2Width * pos / 100;
            height = this.m_source2Height * pos / 100;

            w = width/2 * elapsedTime / this.m_duration;
            h = height/2 * elapsedTime / this.m_duration;
            this.blit(this.source2,0,0,0,0,this.m_source2Width,h);									// Up To Down
            this.blit(this.source2,0,0,0,0,w,this.m_source2Height);									// Left to Right
            this.blit(this.source2,0,this.m_source2Height-h,0,this.m_source2Height-h,this.m_source2Width,h);	// Down To Up
            this.blit(this.source2,this.m_source2Width-w,0,this.m_source2Width-w,0,w,this.m_source2Height);	// Right To Left
		}
		return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransStretch()
{	
    this.dwStyle=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
}
CTransStretch.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.dwStyle=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
		// 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);					// completed
        }
        else
        {
            var w, h;

            switch(this.dwStyle)
            {
                // Top Left
                case 0:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.stretch(this.source2, 0,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    break;
                // Top Right
                case 1:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.stretch(this.source2,this.m_source2Width-w,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    break;
                // Bottom Left
                case 2:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.stretch(this.source2,0,this.m_source2Height-h,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    break;
                // Bottom Right
                case 3:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.stretch(this.source2,this.m_source2Width-w,this.m_source2Height-h,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    break;
                // 4 corners
                case 4:
                    // Top Left
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    if ( h<5 )
                    h = 5;
                    this.stretch(this.source2,0,0,w,h,0,0,this.source1.width/2,this.source1.height/2);
                    // Top Right
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    if ( h<5 )
                        h = 5;
                    this.stretch(this.source2,this.m_source2Width-w,0,w,h,this.m_source2Width/2,0,this.m_source2Width/2,this.m_source2Height/2);
                    // Bottom Left
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    this.stretch(this.source2,0,this.m_source2Height-h,w,h,0,this.m_source2Height/2,this.m_source2Width/2,this.m_source2Height/2);
                    // Bottom Right
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    this.stretch(this.source2,this.m_source2Width-w,this.m_source2Height-h,w,h,this.m_source2Width/2,this.m_source2Height/2,this.m_source2Width/2,this.m_source2Height/2);
                    break;
                // Center
                case 5:
                    // Top Left
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    if ( h<5 )
                        h = 5;
                    this.stretch(this.source2,this.m_source2Width/2-w,this.m_source2Height/2-h,w,h,0,0,this.source1.width/2,this.source1.height/2);
                    // Top Right
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    if ( h<5 )
                        h = 5;
                    this.stretch(this.source2,this.m_source2Width/2,this.m_source2Height/2-h,w,h,this.m_source2Width/2,0,this.m_source2Width/2,this.m_source2Height/2);
                    // Bottom Left
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime /this. m_duration;
                    this.stretch(this.source2,this.m_source2Width/2-w,this.m_source2Height/2,w,h,0,this.m_source2Height/2,this.m_source2Width/2,this.m_source2Height/2);
                    // Bottom Right
                    w = this.m_source2Width/2 * elapsedTime / this.m_duration;
                    h = this.m_source2Height/2 * elapsedTime / this.m_duration;
                    this.stretch(this.source2,this.m_source2Width/2,this.m_source2Height/2,w,h,this.m_source2Width/2,this.m_source2Height/2,this.m_source2Width/2,this.m_source2Height/2);
                    break;
                // Top Middle
                case 6:
                    w = this.m_source2Width;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.stretch(this.source2,0,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    break;
                // Middle Left
                case 7:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    h = this.m_source2Height;
                    this.stretch(this.source2,0,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    break;
                // Middle Right
                case 8:
                    w = this.m_source2Width * elapsedTime / this.m_duration;
                    h = this.m_source2Height;
                    this.stretch(this.source2,this.m_source2Width-w,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    break;
                // Bottom Middle
                case 9:
                    w = this.m_source2Width;
                    h = this.m_source2Height * elapsedTime / this.m_duration;
                    this.stretch(this.source2,0,this.m_source2Height-h,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    break;
            }
		}
		return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransStretch2()
{	
	this.dwStyle=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
    this.m_phase=0;
}
CTransStretch2.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest)
    {
        this.dwStyle=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
		// 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
            this.m_phase = 0;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);					// completed
        }
        else
        {
            var w, h;

            switch(this.dwStyle)
            {
                // Top Left
                case 0:
                    if ( this.m_phase==0 )
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w = this.m_source2Width - w;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h = this.m_source2Height - h;

                        this.stretch(this.source1, 0,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w -= this.m_source2Width;
                        h = 2 * this.m_source2Height * elapsedTime /this.m_duration;
                        h -= this.m_source2Height;
                        this.stretch(this.source2,0,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Top Middle
                case 1:
                    if ( this.m_phase==0 )
                    {
                        w = this.m_source2Width;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h = this.m_source2Height - h;

                        this.stretch(this.source1,0,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = this.m_source2Width;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h -= this.m_source2Height;
                        this.stretch(this.source2,0,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Top Right
                case 2:
                    if ( this.m_phase==0 )
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w = this.m_source2Width - w;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h = this.m_source2Height - h;

                        this.stretch(this.source1,this.m_source2Width-w,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w -= this.m_source2Width;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h -= this.m_source2Height;
                        this.stretch(this.source2,this.m_source2Width-w,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Middle Left
                case 3:
                    if ( this.m_phase==0 )
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w = this.m_source2Width - w;
                        h = this.m_source2Height;

                        this.stretch(this.source1,0,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w -= this.m_source2Width;
                        h = this.m_source2Height;
                        this.stretch(this.source2,0,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Center H
                case 4:
                    if ( this.m_phase==0 )
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w = this.m_source2Width - w;
                        h = this.m_source2Height;

                        this.stretch(this.source1,this.m_source2Width/2-w/2,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w -= this.m_source2Width;
                        h = this.m_source2Height;
                        this.stretch(this.source2,this.m_source2Width/2-w/2,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Center V
                case 5:
                    if ( this.m_phase==0 )
                    {
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h = this.m_source2Height - h;
                        w = this.m_source2Width;

                        this.stretch(this.source1,0,this.m_source2Height/2-h/2,w,h, 0,0,this.m_source2Width,this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h -= this.m_source2Height;
                        w = this.m_source2Width;
                        this.stretch(this.source2,0,this.m_source2Height/2-h/2,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Center H+V
                case 6:
                    if ( this.m_phase==0 )
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w = this.m_source2Width - w;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h = this.m_source2Height - h;

                        this.stretch(this.source1,this.m_source2Width/2-w/2,this.m_source2Height/2-h/2,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w -= this.m_source2Width;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h -= this.m_source2Height;
                        this.stretch(this.source2,this.m_source2Width/2-w/2,this.m_source2Height/2-h/2,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Middle Right
                case 7:
                    if ( this.m_phase==0 )
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w = this.m_source2Width - w;
                        h = this.m_source2Height;

                        this.stretch(this.source1,this.m_source2Width-w,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w -= this.m_source2Width;
                        h = this.m_source2Height;
                        this.stretch(this.source2,this.m_source2Height-w,0,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Bottom Left
                case 8:
                    if ( this.m_phase==0 )
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w = this.m_source2Width - w;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h = this.m_source2Height - h;

                        this.stretch(this.source1,0,this.m_source2Height-h,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w -= this.m_source2Width;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h -= this.m_source2Height;
                        this.stretch(this.source2,0,this.m_source2Height-h,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Bottom Middle
                case 9:
                    if ( this.m_phase==0 )
                    {
                        w = this.m_source2Width;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h = this.m_source2Height - h;

                        this.stretch(this.source1,0,this.m_source2Height-h,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = this.m_source2Width;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h -= this.m_source2Height;
                        this.stretch(this.source2,0,this.m_source2Height-h,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
                // Bottom Right
                case 10:
                    if ( this.m_phase==0 )
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w = this.m_source2Width - w;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h = this.m_source2Height - h;

                        this.stretch(this.source1,this.m_source2Width-w,this.m_source2Height-h,w,h, 0,0,this.m_source2Width, this.m_source2Height);

                        if ( elapsedTime>=this.m_duration/2 )
                            this.m_phase = 1;
                    }
                    else
                    {
                        w = 2 * this.m_source2Width * elapsedTime / this.m_duration;
                        w -= this.m_source2Width;
                        h = 2 * this.m_source2Height * elapsedTime / this.m_duration;
                        h -= this.m_source2Height;
                        this.stretch(this.source2,this.m_source2Width-w,this.m_source2Height-h,w,h, 0,0,this.m_source2Width, this.m_source2Height);
                    }
                    break;
            }
        }
        return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransTrame()
{	
   	this.dwStyle=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
    this.m_index=0;
    this.m_index2=0;
}
CTransTrame.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest) 
    {
        this.dwStyle=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
		// 1st time?
		if ( this.m_starting )
		{	
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
            this.m_index = 0;
            this.m_index2 = 0;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);					// completed
        }
        else
        {
            var w, h, i, j, k;

            h = this.m_source2Height * elapsedTime / this.m_duration;
            w = this.m_source2Width * elapsedTime / this.m_duration;

            if ( this.dwStyle==0 )
            {
                k = h % 2;
                for ( i=0 ; i<this.m_source2Width ; i+=2 )
                {
                    for ( j=this.m_index ; j<h ; j++ )
                    {
                        this.blit(this.source2,i,j,i,j,1,1);
                    }
                    for ( j=this.m_source2Height-h-k ; j<this.m_source2Height-this.m_index ; j++ )
                    {
                        this.blit(this.source2,i+1,j+1,i+1,j+1,1,1);
                    }
                }
                if (h%2==0)
                    this.m_index=h;
                else
                    this.m_index=h-1;
            }

            if ( this.dwStyle==1 )
            {
                k = w % 2;
                for ( j=0 ; j<this.m_source2Height ; j++ )
                {
                    for ( i=this.m_index2 ; i<w ; i+=2 )
                    {
                        this.blit(this.source2,i+1,j,i+1,j,1,1);
                    }
                    for ( i=this.m_source2Width-w-k ; i<this.m_source2Width-this.m_index2 ; i+=2 )
                    {
                        this.blit(this.source2,i,j+1,i,j+1,1,1);
                    }
                }
                if (w%2==0)
                    this.m_index2=w;
                else
                    this.m_index2=w-1;
            }

            if ( this.dwStyle==2 )
            {
                k = h % 2;
                for ( i=0 ; i<this.m_source2Width ; i+=2 )
                {
                    for ( j=this.m_index ; j<h ; j+=2 )
                    {
                        this.blit(this.source2,i,j,i,j,1,1);
                    }
                    for ( j=this.m_source2Height-h-k ; j<this.m_source2Height-this.m_index ; j+=2 )
                    {
                        this.blit(this.source2,i+1,j+1,i+1,j+1,1,1);
                    }
                }

                k = w % 2;
                for ( j=0 ; j<this.m_source2Height ; j+=2 )
                {
                    for ( i=this.m_index2 ; i<w ; i+=2 )
                    {
                        this.blit(this.source2,i+1,j,i+1,j,1,1);
                    }
                    for ( i=this.m_source2Width-w-k ; i<this.m_source2Width-this.m_index2 ; i+=2 )
                    {
                        this.blit(this.source2,i,j+1,i,j+1,1,1);
                    }
                }
                if (h%2==0)
                    this.m_index=h;
                else
                    this.m_index=h-1;
                if (w%2==0)
                    this.m_index2=w;
                else
                    this.m_index2=w-1;
            }
        }
        return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransTurn()
{	
	this.dwPos=0;
    this.dwCheck1=0;
    this.dwCheck2=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
    this.m_angle=0;
}
CTransTurn.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest) 
    {
        this.dwPos=file.readAInt();
        this.dwCheck1=file.readAInt();
        this.dwCheck2=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
		// 1st time?
		if ( this.m_starting )
		{	
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
            this.m_angle = 0.0;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);			// completed
        }
        else
        {
            var x, y, w, h;
            var dist, xcenter, ycenter;

            xcenter = this.m_source2Width/2;
            ycenter = this.m_source2Height/2;

            this.m_angle = this.dwPos * 6.28318 * elapsedTime / this.m_duration;

            // Inverse ?
            if ( this.dwCheck2==1 )
            {
                this.m_angle = 6.28318 - this.m_angle;
            }

            dist = this.m_source2Width/2 - this.m_source2Width/2 * elapsedTime / this.m_duration;
            x = Math.floor( xcenter + Math.cos(this.m_angle) * dist );
            y = Math.floor( ycenter + Math.sin(this.m_angle) * dist );

            w = this.m_source2Width * elapsedTime / this.m_duration;
            h = this.m_source2Height * elapsedTime / this.m_duration;

            this.stretch(this.source1, 0, 0, this.m_source2Width, this.m_source2Height, 0, 0, this.source1.width, this.source1.height);

            // Full Image ?
            if ( this.wCheck1==1 )
                this.stretch(this.source2, x-w/2, y-h/2, w, h, 0, 0, this.m_source2Width, this.m_source2Height);
            else
                this.stretch(this.source2, x-w/2, y-h/2, w, h, this.m_source2Width-w, this.m_source2Height-h, w, h);
		}
		return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransTurn2()
{	
   	this.dwPos=0;
    this.dwCheck1=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
    this.m_curcircle=0;
}
CTransTurn2.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest) 
    {
        this.dwPos=file.readAInt();
        this.dwCheck1=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
		// 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
            this.m_curcircle = 0;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);				// completed
        }
        else
        {
            var x, y, xcenter, ycenter, dist;
            var angle = 0.0;

            xcenter = this.m_source2Width/2;
            ycenter = this.m_source2Height/2;

            angle = this.dwPos * 6.28318 * elapsedTime / this.m_duration;
            angle -= this.m_curcircle * 6.28318;
            if ( this.dwCheck1==1 )
                angle = 6.28318 - angle;

            dist = this.m_source2Width * elapsedTime / this.m_duration;
            x = Math.floor( xcenter + Math.cos(angle) * dist );
            y = Math.floor( ycenter + Math.sin(angle) * dist );

            this.blit(this.source2);
            this.blit(this.source1,x-this.m_source2Width/2,y-this.m_source2Height/2,0,0,this.m_source2Width,this.m_source2Height);

            if ( this.dwCheck1==0 )
            {
                if ( angle>=6.28318 )
                    this.m_curcircle++;
            }
            else
            {
                if ( angle<=0 )
                    this.m_curcircle++;
            }
		}
        return null;
    },
    end:function()
    {
        this.finish();
    }		
});


function CTransZigZag()
{	
	this.zpSpotPercent=0;
    this.zpStartPoint=0;
    this.zpDirection=0;
    this.m_spotSize=0;
    this.m_nbBlockPerLine=0;
    this.m_nbBlockPerCol=0;
    this.m_nbBlocks=0;
    this.m_lastNbBlocks=0;
    this.m_curx=0;
    this.m_cury=0;
    this.m_currentDirection=0;
    this.m_currentStartPoint=0;
    this.m_left=0;
    this.m_top=0;
    this.m_right=0;
    this.m_bottom=0;
}
CTransZigZag.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest) 
    {
        this.zpSpotPercent=file.readAInt();
        this.zpStartPoint=file.readAShort();
        this.zpDirection=file.readAShort();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        var sw = this.source1.width;
        var sh = this.source1.height;

        // 1st time? create surface
        if ( this.m_starting )
        {
            // Spot size: voir si ca rend bien
            this.m_spotSize = Math.floor(((sw * this.zpSpotPercent / 100) + (sh * this.zpSpotPercent / 100)) / 2);
            if ( this.m_spotSize == 0 )
                this.m_spotSize = 1;

            this.m_nbBlockPerLine = ((sw + this.m_spotSize - 1) / this.m_spotSize);
            this.m_nbBlockPerCol = ((sh + this.m_spotSize - 1) / this.m_spotSize);

            // Start point
            this.m_currentDirection = this.zpDirection;
            this.m_currentStartPoint = this.zpStartPoint;

            switch(this.zpStartPoint) 
            {
                case CTrans.TOP_LEFT:
                    this.m_curx = this.m_cury = 0;
                    break;
                case CTrans.TOP_RIGHT:
                    this.m_curx = sw - this.m_spotSize;
                    this.m_cury = 0;
                    break;
                case CTrans.BOTTOM_LEFT:
                    this.m_curx = 0;
                    this.m_cury = sh - this.m_spotSize;
                    break;
                case CTrans.BOTTOM_RIGHT:
                    this.m_curx = sw - this.m_spotSize;
                    this.m_cury = sh - this.m_spotSize;
                    break;
                case CTrans.CENTER:
                    this.m_curx = sw/2 - this.m_spotSize;
                    this.m_cury = sh/2 - this.m_spotSize;
                    if ( this.m_currentDirection == CTrans.DIR_HORZ )
                        this.m_currentStartPoint = CTrans.TOP_LEFT;
                    else
                        this.m_currentStartPoint = CTrans.TOP_RIGHT;
                    this.m_left = this.m_curx - this.m_spotSize;
                    this.m_top = this.m_cury - this.m_spotSize;
                    this.m_bottom = this.m_cury + this.m_spotSize*2;
                    this.m_right = this.m_curx + this.m_spotSize*2;

                    this.m_nbBlockPerLine = 2 + 2 * (this.m_curx + this.m_spotSize - 1)/this.m_spotSize;
                    this.m_nbBlockPerCol = 2 + 2 * (this.m_cury + this.m_spotSize - 1)/this.m_spotSize;
                    break;
            }
            this.m_nbBlocks = Math.floor(this.m_nbBlockPerLine * this.m_nbBlockPerCol);
            this.m_lastNbBlocks = 0;
            this.m_starting = false;
		}

        if ( this.m_spotSize >= sw || this.m_spotSize >= sh )
            this.blit(this.source2);	// termine
        else
        {
            // Compute number of spots to display in 1 step
            var l;
            var nbBlocks = Math.floor(this.m_nbBlocks * this.getDeltaTime() / this.m_duration);
            var nbCurrentBlocks = nbBlocks - this.m_lastNbBlocks;
            if ( nbCurrentBlocks != 0 )
            {
                this.m_lastNbBlocks = nbBlocks;
                for (l=0; l<nbCurrentBlocks; l++)
                {
                    // Blit current spot
                    this.blit(this.source2, this.m_curx, this.m_cury, this.m_curx, this.m_cury, this.m_spotSize, this.m_spotSize);

                    // Increment spot coordinates
                    if ( this.zpStartPoint == CTrans.CENTER )
                    {
                        switch(this.m_currentStartPoint) 
                        {
                            case CTrans.TOP_LEFT:
                                this.m_curx += this.m_spotSize;
                                if ( this.m_curx >= this.m_right )
                                {
                                    this.m_curx -= this.m_spotSize;
                                    this.m_cury += this.m_spotSize;
                                    this.m_currentStartPoint = CTrans.TOP_RIGHT;
                                    this.m_right += this.m_spotSize;
                                }
                                break;
                            case CTrans.TOP_RIGHT:
                                this.m_cury += this.m_spotSize;
                                if ( this.m_cury >= this.m_bottom )
                                {
                                    this.m_cury -= this.m_spotSize;
                                    this.m_curx -= this.m_spotSize;
                                    this.m_currentStartPoint = CTrans.BOTTOM_RIGHT;
                                    this.m_bottom += this.m_spotSize;
                                }
                                break;
                            case CTrans.BOTTOM_RIGHT:
                                this.m_curx -= this.m_spotSize;
                                if ( (this.m_curx+this.m_spotSize) <= this.m_left )
                                {
                                    this.m_curx += this.m_spotSize;
                                    this.m_cury -= this.m_spotSize;
                                    this.m_currentStartPoint = CTrans.BOTTOM_LEFT;
                                    this.m_left -= this.m_spotSize;
                                }
                                break;
                            case CTrans.BOTTOM_LEFT:
                                this.m_cury -= this.m_spotSize;
                                if ( (this.m_cury + this.m_spotSize) <=this.m_top )
                                {
                                    this.m_cury += this.m_spotSize;
                                    this.m_curx += this.m_spotSize;
                                    this.m_currentStartPoint = CTrans.TOP_LEFT;
                                    this.m_top -= this.m_spotSize;
                                }
                                break;
                        }
                    }
                    else 
                    {
                        switch (this.m_currentDirection) 
                        {
                            // Horizontal
                            case CTrans.DIR_HORZ:
                                switch(this.m_currentStartPoint) 
                                {
                                    case CTrans.TOP_LEFT:
                                        this.m_curx += this.m_spotSize;
                                        if ( this.m_curx >= sw )
                                        {
                                            this.m_curx -= this.m_spotSize;
                                            this.m_cury += this.m_spotSize;
                                            this.m_currentStartPoint = CTrans.TOP_RIGHT;
                                        }
                                        break;
                                    case CTrans.TOP_RIGHT:
                                        this.m_curx -= this.m_spotSize;
                                        if ( (this.m_curx+this.m_spotSize) <= 0 )
                                        {
                                            this.m_curx += this.m_spotSize;
                                            this.m_cury += this.m_spotSize;
                                            this.m_currentStartPoint = CTrans.TOP_LEFT;
                                        }
                                        break;
                                    case CTrans.BOTTOM_LEFT:
                                        this.m_curx +=this.m_spotSize;
                                        if ( this.m_curx >= sw )
                                        {
                                            this.m_curx -= this.m_spotSize;
                                            this.m_cury -= this.m_spotSize;
                                            this.m_currentStartPoint = CTrans.BOTTOM_RIGHT;
                                        }
                                        break;
                                    case CTrans.BOTTOM_RIGHT:
                                        this.m_curx -= this.m_spotSize;
                                        if ( (this.m_curx+this.m_spotSize) <= 0 )
                                        {
                                            this.m_curx += this.m_spotSize;
                                            this.m_cury -= this.m_spotSize;
                                            this.m_currentStartPoint = CTrans.BOTTOM_LEFT;
                                        }
                                        break;
                                }
                                break;

                            // Vertical
                            case CTrans.DIR_VERT:
                                switch(this.m_currentStartPoint) 
                                {
                                    case CTrans.TOP_LEFT:
                                        this.m_cury += this.m_spotSize;
                                        if ( this.m_cury >= sh )
                                        {
                                            this.m_cury -= this.m_spotSize;
                                            this.m_curx += this.m_spotSize;
                                            this.m_currentStartPoint = CTrans.BOTTOM_LEFT;
                                        }
                                        break;
                                    case CTrans.TOP_RIGHT:
                                        this.m_cury += this.m_spotSize;
                                        if ( this.m_cury >= sh )
                                        {
                                            this.m_cury -= this.m_spotSize;
                                            this.m_curx -= this.m_spotSize;
                                            this.m_currentStartPoint = CTrans.BOTTOM_RIGHT;
                                        }
                                        break;
                                    case CTrans.BOTTOM_LEFT:
                                        this.m_cury -= this.m_spotSize;
                                        if ( (this.m_cury + this.m_spotSize) <= 0 )
                                        {
                                            this.m_cury += this.m_spotSize;
                                            this.m_curx += this.m_spotSize;
                                            this.m_currentStartPoint = CTrans.TOP_LEFT;
                                        }
                                        break;
                                    case CTrans.BOTTOM_RIGHT:
                                        this.m_cury -= this.m_spotSize;
                                        if ( (this.m_cury + this.m_spotSize) <= 0 )
                                        {
                                            this.m_cury += this.m_spotSize;
                                            this.m_curx -= this.m_spotSize;
                                            this.m_currentStartPoint = CTrans.TOP_RIGHT;
                                        }
                                        break;
                                }
                                break;
                        }
                    }
                }
            }
        }
		return null;
    },
    end:function()
    {
        this.finish();
    }	
});


function CTransZigZag2()
{	
	this.dwStyle=0;
    this.dwPos=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
    this.m_linepos=0;
    this.m_dir=0;
}
CTransZigZag2.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest) 
    {
        this.dwStyle=file.readAInt();
        this.dwPos=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        // 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
            this.m_linepos = 0;
            this.m_dir = 0;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);					// completed
        }
        else
        {
            var x, y, w, h;
            var nb = 0.0;

            if ( this.dwStyle==0 )
            {
                nb = this.m_source2Height / this.dwPos;

                // TOP
                h = Math.floor( this.m_linepos * nb) + Math.floor(nb);
                y = 0;
                w = this.m_source2Width * elapsedTime / this.m_duration;
                w = w * this.dwPos / 2;
                w -= this.m_source2Width * this.m_linepos;
                if ( this.m_dir==0 )
                    x = 0;
                else
                    x = this.m_source2Width - w;
                this.blit(this.source2,x,y,x,y,w,h);

                // BOTTOM
                y = this.m_source2Height - h;
                if ( this.m_dir==1 )
                    x = 0;
                else
                    x = this.m_source2Width - w;
                this.blit(this.source2,x,y,x,y,w,h);

                // End of line
                if ( w>=this.m_source2Width )
                {
                    this.m_linepos++;
                    this.m_dir++;
                    if ( this.m_dir==2 )
                        this.m_dir = 0;
                }
            }
            else
            {
                nb = this.m_source2Width / this.dwPos;

                // LEFT
                w = Math.floor( this.m_linepos * nb) + Math.floor(nb);
                x = 0;
                h = this.m_source2Height * elapsedTime / this.m_duration;
                h = h * this.dwPos / 2;
                h -= this.m_source2Height * this.m_linepos;
                if ( this.m_dir==0 )
                    y = 0;
                else
                    y = this.m_source2Height - h;
                this.blit(this.source2,x,y,x,y,w,h);

                // RIGHT
                x = this.m_source2Width - w;
                if ( this.m_dir==1 )
                    y = 0;
                else
                    y = this.m_source2Height - h;
                this.blit(this.source2,x,y,x,y,w,h);

                // End of line
                if ( h>=this.m_source2Height )
                {
                    this.m_linepos++;
                    this.m_dir++;
                    if ( this.m_dir==2 )
                        this.m_dir = 0;
                }
            }
        }
        return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransZoom()
{	
}
CTransZoom.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest) 
    {
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {

        var sw = this.source1.width;
        var sh = this.source1.height;

        // 1st time? 
        if ( this.m_starting )
        {
            // Reset m_starting
            this.m_starting = false;
        }

        // Securites
        if ( this.m_duration == 0 )	// || etc... )
            this.blit(this.source2);
        else
        {
            var	nw, nh;
            var deltaTime = this.getDeltaTime();

            // Fade out
            if ( (flag & CTrans.TRFLAG_FADEOUT)!=0 )
            {
                nw = Math.floor(sw - sw * deltaTime / this.m_duration);
                nh = Math.floor(sh - sh * deltaTime / this.m_duration);

                // Fill background
                this.blit(this.source2);

                // Stretch new image
                this.stretch(this.source1, (sw-nw)/2, (sh-nh)/2, nw, nh, 0, 0, sw, sh);
            }

            // Fade in
            else
            {
                nw = Math.floor(sw * deltaTime / this.m_duration);
                nh = Math.floor(sh * deltaTime / this.m_duration);

                // Fill background
                this.blit(this.source1);
                
                // Stretch new image
                this.stretch(this.source2, (sw-nw)/2, (sh-nh)/2, nw, nh,0, 0, sw, sh);
            }
        }
        return null;
    },
    end:function()
    {
        this.finish();
    }
});


function CTransZoom2()
{	
	this.dwPos=0;
    this.m_source2Width=0;
    this.m_source2Height=0;
}
CTransZoom2.prototype=CServices.extend(new CTrans(),
{
    init:function(data, file, display, source, dest) 
    {
        this.dwPos=file.readAInt();
        this.start(data, display, source, dest);        
    },
    stepDraw:function(flag)
    {
        	// 1st time?
		if ( this.m_starting )
		{
            this.m_starting = false;
            this.m_source2Width = this.source2.width;
            this.m_source2Height = this.source2.height;
		}

		var elapsedTime = this.getDeltaTime();

        if ( (elapsedTime/this.m_duration)>1.0 )
        {
            this.blit(this.source2);		// completed
        }
        else
        {
            var x, y, w, h;

            if ( this.dwPos==0 )
            {
                w = this.m_source2Width * elapsedTime / this.m_duration;
                h = this.m_source2Height * elapsedTime / this.m_duration;
                x = this.m_source2Width/2 - w/2;
                y = this.m_source2Height/2 - h/2;

                this.stretch(this.source2,0,0,this.m_source2Width,this.m_source2Height,x,y,w,h);
            }
            else
            {
                w = this.m_source2Width * elapsedTime / this.m_duration;
                w = this.m_source2Width - w;
                h = this.m_source2Height * elapsedTime / this.m_duration;
                h = this.m_source2Height - h;
                x = this.m_source2Width/2 - w/2;
                y = this.m_source2Height/2 - h/2;

                this.stretch(this.source1,0,0,this.m_source2Width,this.m_source2Height,x,y,w,h);
            }
        }
        return null;
    },
    end:function()
    {
        this.finish();
    }
});
