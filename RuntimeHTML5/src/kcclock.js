//----------------------------------------------------------------------------------
//
// CRunkcclock: date & time object
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

CRunkcclock.CND_CMPCHRONO = 0;
CRunkcclock.CND_NEWSECOND = 1;
CRunkcclock.CND_NEWMINUTE = 2;
CRunkcclock.CND_NEWHOUR = 3;
CRunkcclock.CND_NEWDAY= 4;
CRunkcclock.CND_NEWMONTH = 5;
CRunkcclock.CND_NEWYEAR = 6;
CRunkcclock.CND_CMPCOUNTDOWN = 7;
CRunkcclock.CND_VISIBLE = 8;
CRunkcclock.ACT_SETCENTIEMES = 0;
CRunkcclock.ACT_SETSECONDES = 1;
CRunkcclock.ACT_SETMINUTES = 2;
CRunkcclock.ACT_SETHOURS = 3;
CRunkcclock.ACT_SETDAYOFWEEK = 4;
CRunkcclock.ACT_SETDAYOFMONTH = 5;
CRunkcclock.ACT_SETMONTH = 6;
CRunkcclock.ACT_SETYEAR = 7;
CRunkcclock.ACT_RESETCHRONO = 8;
CRunkcclock.ACT_STARTCHRONO = 9;
CRunkcclock.ACT_STOPCHRONO = 10;
CRunkcclock.ACT_SHOW = 11;
CRunkcclock.ACT_HIDE = 12;
CRunkcclock.ACT_SETPOSITION = 13;
CRunkcclock.ACT_SETCOUNTDOWN = 14;
CRunkcclock.ACT_STARTCOUNTDOWN = 15;
CRunkcclock.ACT_STOPCOUNTDOWN = 16;
CRunkcclock.ACT_SETXPOSITION = 17;
CRunkcclock.ACT_SETYPOSITION = 18;
CRunkcclock.ACT_SETXSIZE = 19;
CRunkcclock.ACT_SETYSIZE = 20;
CRunkcclock.EXP_GETCENTIEMES = 0;
CRunkcclock.EXP_GETSECONDES = 1;
CRunkcclock.EXP_GETMINUTES = 2;
CRunkcclock.EXP_GETHOURS = 3;
CRunkcclock.EXP_GETDAYOFWEEK = 4;
CRunkcclock.EXP_GETDAYOFMONTH = 5;
CRunkcclock.EXP_GETMONTH = 6;
CRunkcclock.EXP_GETYEAR = 7;
CRunkcclock.EXP_GETCHRONO = 8;
CRunkcclock.EXP_GETCENTERX = 9;
CRunkcclock.EXP_GETCENTERY = 10;
CRunkcclock.EXP_GETHOURX = 11;
CRunkcclock.EXP_GETHOURY = 12;
CRunkcclock.EXP_GETMINUTEX = 13;
CRunkcclock.EXP_GETMINUTEY = 14;
CRunkcclock.EXP_GETSECONDX = 15;
CRunkcclock.EXP_GETSECONDY = 16;
CRunkcclock.EXP_GETCOUNTDOWN = 17;
CRunkcclock.EXP_GETXPOSITION = 18;
CRunkcclock.EXP_GETYPOSITION = 19;
CRunkcclock.EXP_GETXSIZE = 20;
CRunkcclock.EXP_GETYSIZE = 21;
CRunkcclock.ANALOG_CLOCK = 0;
CRunkcclock.DIGITAL_CLOCK = 1;
CRunkcclock.INVISIBLE = 2;
CRunkcclock.CALENDAR = 3;
CRunkcclock.CLOCK = 0;
CRunkcclock.STOPWATCH = 1;
CRunkcclock.COUNTDOWN = 2;
CRunkcclock.SHORTDATE = 0;
CRunkcclock.LONGDATE = 1;
CRunkcclock.FIXEDDATE = 2;

CRunkcclock.months=
[
    0,
    267840000,
    509760000,
    777600000,
    1123200000,
    1304640000,
    1563840000,
    1831680000,
    2099520000,
    2358720000,
    2626560000,
    2885760000
];
CRunkcclock.szRoman=
[
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII"
];

this.kcclock = CRunkcclock; /* export to extension loader */

function CRunkcclock()
{
    this.ADJ = 3;
    this.sType=0;
    this.sClockMode=0;
    this.sClockBorder=false;
    this.sAnalogClockLines=false;
    this.sAnalogClockMarkerType=0;
    this.sFont=null;
    this.crFont=0;
    this.sAnalogClockSeconds=false;
    this.crAnalogClockSeconds=0;
    this.sAnalogClockMinutes=false;
    this.crAnalogClockMinutes=0;
    this.sAnalogClockHours=false;
    this.crAnalogClockHours=0;
    this.sDigitalClockType=0;
    this.sCalendarType=0;
    this.sCalendarFormat=0;
    this.lCountdownStart=0;
    this.sMinWidth=0;
    this.sMinHeight=0;
    this.sVisible=false;
    this.lastRecordedTime=null;
    this.sDisplay=false;
    this.sUpdateCounter=0;
    this.dChronoCounter=0;
    this.dChronoStart=0;
    this.lChrono=0;
    this.sEventCount=0;
    this.sCenterX=0;
    this.sCenterY=0;
    this.sHourX=0;
    this.sHourY=0;
    this.sMinuteX=0;
    this.sMinuteY=0;
    this.sSecondX=0;
    this.sSecondY=0;
    this.initialTime=null;
    this.startTimer=null;
    this.fontString=null;
    this.measureSurf=null;
    this.textSurface=null;
    this.textSurfaces=null;
    
};

CRunkcclock.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 9;
    },

    createRunObject:function(file, cob, version)
    {
        this.ho.setX(cob.cobX);
        this.ho.setY(cob.cobY);
        this.ho.hoImgXSpot = 0;
        this.ho.hoImgYSpot = 0;
        this.ho.setWidth(file.readAShort());
        this.ho.setHeight(file.readAShort());
        file.skipBytes(4 * 16);
        this.sType = file.readAShort();
        this.sClockMode = file.readAShort();
        this.sClockBorder = (file.readAShort() == 0) ? false : true;
        this.sAnalogClockLines = (file.readAShort() == 0) ? false : true;
        this.sAnalogClockMarkerType = file.readAShort();
        this.sFont= file.readLogFont();
        if ((this.sFont.lfHeight == 8) && (this.sFont.lfFaceName.toUpperCase()=="SYSTEM"))
        {
        	this.sFont.init();
//            this.sFont.lfHeight = 13; 
//            this.sFont.lfWeight = 700;
        }
        this.fontString=this.sFont.getFont();
        this.crFont = file.readAColor();
        file.skipBytes(40);
        this.sAnalogClockSeconds = (file.readAShort() == 0) ? false : true;
        this.crAnalogClockSeconds = file.readAColor();
        this.sAnalogClockMinutes = (file.readAShort() == 0) ? false : true;
        this.crAnalogClockMinutes = file.readAColor();
        this.sAnalogClockHours = (file.readAShort() == 0) ? false : true;
        this.crAnalogClockHours = file.readAColor();
        this.sDigitalClockType = file.readAShort();
        this.sCalendarType = file.readAShort();
        this.sCalendarFormat = file.readAShort();
        file.skipBytes(40);
        var sCountDownHours= file.readAShort();
        var sCountDownMinutes= file.readAShort();
        var sCountDownSeconds= file.readAShort();
        this.lCountdownStart = (sCountDownHours * 360000) + (sCountDownMinutes * 6000) + (sCountDownSeconds * 100);
        this.sMinWidth = file.readAShort();
        this.sMinHeight = file.readAShort();
        this.sDisplay = true;
    	this.initialTime = new Date();
    	this.startTimer = new Date();
    	this.lastRecordedTime = new Date();
    	this.dChronoCounter=0;
    	this.dChronoStart=0;

        return true;
    },
    
    handleRunObject:function()
    {
        var ret = 0;
        if (this.sDisplay)
        {
            this.sDisplay = false;
            ret = CRunExtension.REFLAG_DISPLAY;
        }
        var dCurrentChronoCounter;

        this.sUpdateCounter = 0;

        var cTime=this.getCurrentTime();
        
        dCurrentChronoCounter = Math.floor(CRunkcclock.months[cTime.getMonth()] + (cTime.getDate()-1)*8640000 + cTime.getHours()*360000 + cTime.getMinutes()*6000 + cTime.getSeconds()*100+ cTime.getMilliseconds()/10.0);
        if ((dCurrentChronoCounter < this.dChronoCounter) || ((dCurrentChronoCounter > (this.dChronoCounter + 200)) && (this.dChronoCounter != 0)))
        {
            if (this.dChronoStart != 0)
            {
                this.lChrono += Math.abs(this.dChronoCounter - this.dChronoStart);
                this.dChronoStart = dCurrentChronoCounter;
            }
        }
        this.dChronoCounter = dCurrentChronoCounter;
        switch (this.sType)
        {
            case CRunkcclock.ANALOG_CLOCK:
            case CRunkcclock.DIGITAL_CLOCK:
            case CRunkcclock.INVISIBLE:
                if (this.lastRecordedTime.getSeconds() != cTime.getSeconds())
                {
                    this.sEventCount = this.rh.rh4EventCount;
                    this.lastRecordedTime.setSeconds(cTime.getSeconds());
                    this.ho.pushEvent(CRunkcclock.CND_NEWSECOND, this.ho.getEventParam());
                    ret = CRunExtension.REFLAG_DISPLAY;
                    if (this.lastRecordedTime.getMinutes() != cTime.getMinutes())
                    {
                        this.sEventCount = this.rh.rh4EventCount;
                        this.lastRecordedTime.setMinutes(cTime.getMinutes());
                        this.ho.pushEvent(CRunkcclock.CND_NEWMINUTE, this.ho.getEventParam());
                        if (this.lastRecordedTime.getHours() != cTime.getHours())
                        {
                            this.sEventCount = this.rh.rh4EventCount;
                            this.lastRecordedTime.setHours(cTime.getHours());
                            this.ho.pushEvent(CND_NEWHOUR, ho.getEventParam());
                        }
                    }
                }
                break;
            case CRunkcclock.CALENDAR:
                if (this.lastRecordedTime.getHours() != cTime.getHours())
                {
                    this.lastRecordedTime.setHours(cTime.getHours());
                    if (this.lastRecordedTime.getDate() != cTime.getDate())
                    {
                        this.sEventCount = this.rh.rh4EventCount;
                        this.lastRecordedTime.setDate(cTime.getDate());
                        this.ho.pushEvent(CRunkcclock.CND_NEWDAY, ho.getEventParam());
                        ret = CRunExtension.REFLAG_DISPLAY;
                        if (this.lastRecordedTime.getMonth() != cTime.getMonth())
                        {
                            this.sEventCount = this.rh.rh4EventCount;
                            this.lastRecordedTime.setMonth(cTime.getMonth());
                            this.ho.pushEvent(CRunkcclock.CND_NEWMONTH, this.ho.getEventParam());
                            if (this.lastRecordedTime.fullYear != cTime.fullYear)
                            {
                                this.sEventCount = this.rh.rh4EventCount;
                                this.lastRecordedTime.fullYear=cTime.fullYear;
                                this.ho.pushEvent(CRunkcclock.CND_NEWYEAR, this.ho.getEventParam());
                            }
                        }
                    }
                }
                break;
            default:
                break;
        }
        this.lastRecordedTime.setTime(cTime.getTime());
        return ret;
    },
    
    displayRunObject:function(context, xDraw, yDraw)
    {
        var rhPtr= this.ho.hoAdRunHeader;
        var rc= new CRect();
        var rcNewRect;

        rc.left = xDraw+this.ho.hoX;
        rc.right = rc.left+this.ho.hoImgWidth;
        rc.top = yDraw+this.ho.hoY;
        rc.bottom = rc.top+this.ho.hoImgHeight;
        var hour = this.lastRecordedTime.getHours();
        var hsecond = Math.floor(this.lastRecordedTime.getMilliseconds() / 10);
        var minute = this.lastRecordedTime.getMinutes();
        var second = this.lastRecordedTime.getSeconds();
        var day = this.lastRecordedTime.getDate();
        var year = this.lastRecordedTime.getFullYear();
        var month = (this.lastRecordedTime.getMonth() + 1);
        var dayofweek = (this.lastRecordedTime.getDay());
        var lCurrentChrono;
        var usHour, usMinute, usSecond;
		var dChronoStop;
		
        switch (this.sType)
        {
            case CRunkcclock.ANALOG_CLOCK: 
                if (CRunkcclock.CLOCK == this.sClockMode)
                {
                    if (hour > 11)
                    {
                        hour -= 12;
                    }
                    if (this.sAnalogClockMarkerType != 2)
                    {
                        rcNewRect = new CRect();
                        rcNewRect.left = rc.left + (this.sMinWidth / 2);
                        rcNewRect.right = rc.right - (this.sMinWidth / 2);
                        rcNewRect.top = rc.top + (this.sMinHeight / 2);
                        rcNewRect.bottom = rc.bottom - (this.sMinHeight / 2);
                        this.RunDisplayAnalogTime(context, hour, minute, second, rcNewRect);
                    }
                    else
                    {
                        this.RunDisplayAnalogTime(context, hour, minute, second, rc);
                    }
                }
                else
                {	
                    if (this.dChronoStart != 0)
                    {
                        dChronoStop = CRunkcclock.months[month - 1] + ((day-1) * 8640000) + (hour * 360000) + (minute * 6000) + (second * 100) + hsecond;
                        lCurrentChrono = this.lChrono + (dChronoStop - this.dChronoStart);
                    }
                    else
                    {
                        lCurrentChrono = this.lChrono;
                    }

                    // Countdown
                    if (CRunkcclock.COUNTDOWN == this.sClockMode)
                    {
                        lCurrentChrono = this.lCountdownStart - lCurrentChrono;
                        if (lCurrentChrono < 0)
                        {
                            lCurrentChrono = 0;
                        }
                    }

                    // Compute hours, minutes & seconds
                    usHour = Math.floor(lCurrentChrono / 360000);
                    if (usHour > 11)
                    {
                        usHour -= 12;
                    }
                    usMinute = Math.floor((lCurrentChrono - (usHour * 360000)) / 6000);
                    usSecond = Math.floor((lCurrentChrono - (usHour * 360000) - (usMinute * 6000)) / 100);

                    // Display
                    if (this.sAnalogClockMarkerType != 2)
                    {
                        rcNewRect = new CRect();
                        rcNewRect.left = rc.left + (this.sMinWidth / 2);
                        rcNewRect.right = rc.right - (this.sMinWidth / 2);
                        rcNewRect.top = rc.top + (this.sMinHeight / 2);
                        rcNewRect.bottom = rc.bottom - (this.sMinHeight / 2);
                        this.RunDisplayAnalogTime(context, usHour, usMinute, usSecond, rcNewRect);
                    }
                    else
                    {
                        this.RunDisplayAnalogTime(context, usHour, usMinute, usSecond, rc);
                    }
                }
                break;

            case CRunkcclock.DIGITAL_CLOCK: // Digital clock
            {
                var szTime;
                var szTrailing;
                var sHours;
                var sMinutes;
                var sSeconds;
                switch (this.sDigitalClockType)
                {
                    case 0:
                        if (CRunkcclock.CLOCK == this.sClockMode)
                    	{
	                        if (hour > 11)
	                        {
	                            hour -= 12;
	                        }
                        	sHours=hour.toString();
                        	sHours=this.checkNumberOfDigits(sHours);
							sMinutes=minute.toString();
							sMinutes=this.checkNumberOfDigits(sMinutes);
							szTime=sHours+":"+sMinutes;	                            	 
                            this.RunDisplayDigitalTime(context, szTime, rc);
                        }
                        else
                        {
                            if (this.dChronoStart != 0)
                            {
                                dChronoStop = CRunkcclock.months[month - 1] + ((day-1) * 8640000) + (hour * 360000) + (minute * 6000) + (second * 100) + hsecond;
                                lCurrentChrono = this.lChrono + (dChronoStop - this.dChronoStart);
                            }
                            else
                            {
                                lCurrentChrono = this.lChrono;
                            }
                            // Countdown
                            if (CRunkcclock.COUNTDOWN == this.sClockMode)
                            {
                                lCurrentChrono = this.lCountdownStart - lCurrentChrono;
                                if (lCurrentChrono < 0)
                                {
                                    lCurrentChrono = 0;
                                }
                            }
                            // Compute hours, minutes & seconds
                            usHour = Math.floor(lCurrentChrono / 360000);
                            if (usHour > 11)
                            {
                                usHour -= 12;
                            }
                            usMinute = Math.floor((lCurrentChrono - (usHour * 360000)) / 6000);
                            sHours=usHour.toString();
                            sHours=this.checkNumberOfDigits(sHours);
                            sMinutes=usMinute.toString();
                            sMinutes=this.checkNumberOfDigits(sMinutes);
                            szTime=sHours+":"+sMinutes;
                            this.RunDisplayDigitalTime(context, szTime, rc);
                        }
                        break;

                    case 1:
                        if (CRunkcclock.CLOCK == this.sClockMode)
                        {
                            // Display
                            if (hour > 12) // avant, c'etait 11, donc on affichait 00 PM pour midi
                            {
                                hour -= 12;
                            }
                            sHours=hour.toString();
                            sHours=this.checkNumberOfDigits(sHours);
                            sMinutes=minute.toString();
                            sMinutes=this.checkNumberOfDigits(sMinutes);
                            sSeconds=second.toString();
                            sSeconds=this.checkNumberOfDigits(sSeconds);
                            szTime=sHours+":"+sMinutes+":"+sSeconds;
                            this.RunDisplayDigitalTime(context, szTime, rc);
                        }
                        else
                        {
                            // Get current chrono
                            if (this.dChronoStart != 0)
                            {
                                dChronoStop = CRunkcclock.months[month - 1] + ((day-1) * 8640000) + (hour * 360000) + (minute * 6000) + (second * 100) + hsecond;
                                lCurrentChrono = this.lChrono + (dChronoStop - this.dChronoStart);
                            }
                            else
                            {
                                lCurrentChrono = this.lChrono;
                            }
                            // Countdown
                            if (CRunkcclock.COUNTDOWN == this.sClockMode)
                            {
                                lCurrentChrono = this.lCountdownStart - lCurrentChrono;
                                if (lCurrentChrono < 0)
                                {
                                    lCurrentChrono = 0;
                                }
                            }
                            // Compute hours, minutes & seconds
                            usHour = Math.floor(lCurrentChrono / 360000);
                            if (usHour > 11)
                            {
                                usHour -= 12;
                            }
                            usMinute = Math.floor((lCurrentChrono - (usHour * 360000)) / 6000);
                            usSecond = Math.floor((lCurrentChrono - (usHour * 360000) - (usMinute * 6000)) / 100);

                            // Display
                            if (usHour > 11)
                            {
                                usHour -= 12;
                            }
                            sHours=usHour.toString();
                            sHours=this.checkNumberOfDigits(sHours);
                            sMinutes=usMinute.toString();
                            sMinutes=this.checkNumberOfDigits(sMinutes);
                            sSeconds=usSecond.toString();
                            sSeconds=this.checkNumberOfDigits(sSeconds);
                            szTime=sHours+":"+sMinutes+":"+sSeconds;
                            this.RunDisplayDigitalTime(context, szTime, rc);
                        }
                        break;

                    case 2:
                        if (CRunkcclock.CLOCK == this.sClockMode)
                        {
                        	sHours=hour.toString();
                        	sHours=this.checkNumberOfDigits(sHours);
							sMinutes=minute.toString();
							sMinutes=this.checkNumberOfDigits(sMinutes);
							szTime=sHours+":"+sMinutes;	                            	 
                            this.RunDisplayDigitalTime(context, szTime, rc);
                        }
                        else
                        {
                            // Get current chrono
                            if (this.dChronoStart != 0)
                            {
                                dChronoStop = CRunkcclock.months[month - 1] + ((day-1) * 8640000) + (hour * 360000) + (minute * 6000) + (second * 100) + hsecond;
                                lCurrentChrono = this.lChrono + (dChronoStop - this.dChronoStart);
                            }
                            else
                            {
                                lCurrentChrono = this.lChrono;
                            }

                            // Countdown
                            if (CRunkcclock.COUNTDOWN == this.sClockMode)
                            {
                                lCurrentChrono = this.lCountdownStart - lCurrentChrono;
                                if (lCurrentChrono < 0)
                                {
                                    lCurrentChrono = 0;
                                }
                            }

                            // Compute hours, minutes & seconds
                            usHour = Math.floor(lCurrentChrono / 360000);
                            usMinute = Math.floor((lCurrentChrono - (usHour * 360000)) / 6000);

                            // Display
                            sHours=usHour.toString();
                            sHours=this.checkNumberOfDigits(sHours);
                            sMinutes=usMinute.toString();
                            sMinutes=this.checkNumberOfDigits(sMinutes);
                            szTime=sHours+":"+sMinutes;
                            this.RunDisplayDigitalTime(context, szTime, rc);
                        }
                        break;

                    case 3:
                        if (CRunkcclock.CLOCK == this.sClockMode)
                        {
                            sHours=hour.toString();
                            sHours=this.checkNumberOfDigits(sHours);
                            sMinutes=minute.toString();
                            sMinutes=this.checkNumberOfDigits(sMinutes);
                            sSeconds=second.toString();
                            sSeconds=this.checkNumberOfDigits(sSeconds);
                            szTime=sHours+":"+sMinutes+":"+sSeconds;
                            this.RunDisplayDigitalTime(context, szTime, rc);
                        }
                        else
                        {
							
                            // Get current chrono
                            if (this.dChronoStart != 0)
                            {
                                dChronoStop = CRunkcclock.months[month - 1] + ((day-1) * 8640000) + (hour * 360000) + (minute * 6000) + (second * 100) + hsecond;
                                lCurrentChrono = this.lChrono + (dChronoStop - this.dChronoStart);
                            }
                            else
                            {
                                lCurrentChrono = this.lChrono;
                            }

                            // Countdown
                            if (CRunkcclock.COUNTDOWN == this.sClockMode)
                            {
                                lCurrentChrono = this.lCountdownStart - lCurrentChrono;
                                if (lCurrentChrono < 0)
                                {
                                    lCurrentChrono = 0;
                                }
                            }

                            // Compute hours, minutes & seconds
                            usHour = Math.floor(lCurrentChrono / 360000);
                            usMinute = Math.floor((lCurrentChrono - (usHour * 360000)) / 6000);
                            usSecond = Math.floor((lCurrentChrono - (usHour * 360000) - (usMinute * 6000)) / 100);

                            // Display
                            sHours=usHour.toString();
                            sHours=this.checkNumberOfDigits(sHours);
                            sMinutes=usMinute.toString();
                            sMinutes=this.checkNumberOfDigits(sMinutes);
                            sSeconds=usSecond.toString();
                            sSeconds=this.checkNumberOfDigits(sSeconds);
                            szTime=sHours+":"+sMinutes+":"+sSeconds;
                            this.RunDisplayDigitalTime(context, szTime, rc);
                        }
                        break;

                    default:
                        break;
                }
                break;
            }

            case CRunkcclock.CALENDAR: // Calendar
                var szDate;
                var formatString;
                switch (this.sCalendarType)
                {
                    case CRunkcclock.SHORTDATE:
                    	formatString="dd/mm/yyyy";
                        break;

                    case CRunkcclock.LONGDATE:
                    	formatString="dddd dd mmmm yyyy";
                        break;

                    case CRunkcclock.FIXEDDATE:
                    	switch (this.sCalendarFormat)
                    	{
                    		case 0:
                    			formatString="dd/mm/yyyy";
                    			break;
                    		case 1:
                    			formatString="dd mmmm yyyy";
                    			break;
                    		case 2:
                    			formatString="dd mmmm, yyyy";
                    			break;
                    		case 3:
                    			formatString="mmmm dd, yyyy";
                    			break;
                    		case 4:
                    			formatString="dd-mmm-yyyy";
                    			break;
                    		case 5:
                    			formatString="mmmm, yyyy";
                    			break;
                    		case 6:
                    			formatString="mmm-yy";
                    			break;
                    	}
                        break;

                    default:
                        break;
                }
                szDate=this.lastRecordedTime.format(formatString);
                this.RunDisplayCalendar(context, szDate, rc);
                break;

            default:
                break;
        }
    },

	checkNumberOfDigits:function(s)
	{
		if (s.length<2)
		{
			s="0"+s;
		}
		return s;
	},
	
    RunDisplayAnalogTime:function(context, sHour, sMinutes, sSeconds, rc)
    {
        var pntPoints=new Array(3);
        var n;
        pntPoints[0]=new CPoint();
        pntPoints[1]=new CPoint();
        pntPoints[2]=new CPoint();
        var sRayon;
        var a;
        
        // Set center
        pntPoints[0].y = rc.top + ((rc.bottom - rc.top) / 2);
        pntPoints[0].x = rc.left + ((rc.right - rc.left) / 2);
        this.sCenterY = pntPoints[0].x;
        this.sCenterX = pntPoints[0].y;

        // Set radius
        if ((rc.right - rc.left) > (rc.bottom - rc.top))
        {
            sRayon = ((rc.bottom - rc.top) / 2);
        }
        else
        {
            sRayon = ((rc.right - rc.left) / 2);
        }
        sRayon--;

        // Display hours
		context.lineCap='round';
        if (true == this.sAnalogClockHours)
        {
            pntPoints[1].x = pntPoints[0].x + (Math.cos(( ((sHour)+Number(sMinutes)/60.0) * 0.523) - 1.570) * (sRayon / 1.5));
            pntPoints[1].y = pntPoints[0].y + (Math.sin(( ((sHour)+Number(sMinutes)/60.0) * 0.523) - 1.570) * (sRayon / 1.5));
            this.sHourX = pntPoints[1].x;
            this.sHourY = pntPoints[1].y;
            context.renderLine(pntPoints[0].x, pntPoints[0].y, pntPoints[1].x, pntPoints[1].y, this.crAnalogClockHours, 2, 0, 0);
        }
        // Display minutes
        if (true == this.sAnalogClockMinutes)
        {
            pntPoints[1].x = pntPoints[0].x + (Math.cos(((sMinutes) * 0.104) - 1.570) * sRayon);
            pntPoints[1].y = pntPoints[0].y + (Math.sin(((sMinutes) * 0.104) - 1.570) * sRayon);
            this.sMinuteX = pntPoints[1].x;
            this.sMinuteY = pntPoints[1].y;
            context.renderLine(pntPoints[0].x, pntPoints[0].y, pntPoints[1].x, pntPoints[1].y, this.crAnalogClockMinutes, 2, 0, 0);
        }
        // Display seconds
        if (true == this.sAnalogClockSeconds)
        {
            pntPoints[1].x = pntPoints[0].x + (Math.cos((Number(sSeconds) * 0.104) - 1.570) * sRayon);
            pntPoints[1].y = pntPoints[0].y + (Math.sin((Number(sSeconds) * 0.104) - 1.570) * sRayon);
            this.sSecondX = pntPoints[1].x;
            this.sSecondY = pntPoints[1].y;
            context.renderLine(pntPoints[0].x, pntPoints[0].y, pntPoints[1].x, pntPoints[1].y, this.crAnalogClockSeconds, 1, 0, 0);
        }

        // Draw lines
        if (true == this.sAnalogClockLines)
        {
            for (a = 1; a < 13; a++)
            {
                pntPoints[1].x = pntPoints[0].x + (Math.cos((a * 0.523) - 1.570) * (sRayon * 0.9));
                pntPoints[1].y = pntPoints[0].y + (Math.sin((a * 0.523) - 1.570) * (sRayon * 0.9));
                pntPoints[2].x = pntPoints[0].x + (Math.cos((a * 0.523) - 1.570) * sRayon);
                pntPoints[2].y = pntPoints[0].y + (Math.sin((a * 0.523) - 1.570) * sRayon);
	            context.renderLine(pntPoints[1].x, pntPoints[1].y, pntPoints[2].x, pntPoints[2].y, this.crFont, 1, 0, 0);
            }
        }

        // Draw markers
        if (this.sAnalogClockMarkerType != 2)
        {
            var szString;
            var textWidth;
            var textHeight;
            var rcFont = new CRect();

            // Display
            var a;
            if (this.textSurfaces==null)
            	this.textSurfaces=new Array(13);
            if (!this.measureSurf)
           		this.measureSurf=new CTextSurface(this.rh.rhApp, 2, 2);
            for (a = 1; a < 13; a++)
            {
                var x, y;
                if (0 == this.sAnalogClockMarkerType)
                {
                    szString = a.toString();
                }
                else
                {
                    szString = CRunkcclock.szRoman[a - 1];
                }
                textWidth = this.measureSurf.measureText(szString, this.sFont);
                textHeight = this.sFont.lfHeight;

                x = pntPoints[0].x + (Math.cos((a * 0.523) - 1.570) * sRayon);
                y = pntPoints[0].y + (Math.sin((a * 0.523) - 1.570) * sRayon);
                switch (a)
                {
                    case 1:
                    case 2:
                        rcFont.left = x;
                        rcFont.bottom = y;
                        rcFont.right = rcFont.left + textWidth;
                        rcFont.top = rcFont.bottom - textHeight;
                        break;

                    case 3:
                        rcFont.left = x + 2;
                        rcFont.top = y - (textHeight / 2);
                        rcFont.right = rcFont.left + textWidth;
                        rcFont.bottom = rcFont.top + textHeight;
                        break;

                    case 4:
                    case 5:
                        rcFont.left = x;
                        rcFont.top = y;
                        rcFont.right = rcFont.left + textWidth;
                        rcFont.bottom = rcFont.top + textHeight;
                        break;

                    case 6:
                        rcFont.left = x - (textWidth / 2);
                        rcFont.top = y + 1;
                        rcFont.right = rcFont.left + textWidth;
                        rcFont.bottom = rcFont.top + textHeight;
                        break;

                    case 7:
                    case 8:
                        rcFont.right = x;
                        rcFont.top = y;
                        rcFont.left = rcFont.right - textWidth;
                        rcFont.bottom = rcFont.top + textHeight;
                        break;

                    case 9:
                        rcFont.right = x - 2;
                        rcFont.top = y - (textHeight / 2);
                        rcFont.left = rcFont.right - textWidth;
                        rcFont.bottom = rcFont.top + textHeight;
                        break;

                    case 10:
                    case 11:
                        rcFont.right = x;
                        rcFont.bottom = y;
                        rcFont.left = rcFont.right - textWidth;
                        rcFont.top = rcFont.bottom - textHeight;
                        break;

                    case 12:
                        rcFont.left = x - (textWidth / 2);
                        rcFont.bottom = y - 1;
                        rcFont.right = rcFont.left + textWidth;
                        rcFont.top = rcFont.bottom - textHeight;
                        break;
                }
                if (!this.textSurfaces[a])
                {
                	this.textSurfaces[a]=new CTextSurface(this.rh.rhApp, textWidth, textHeight);
					this.textSurfaces[a].setText(szString, CServices.DT_LEFT|CServices.DT_TOP, null, this.sFont, this.crFont);
                }
                var X = rcFont.left + (rcFont.right - rcFont.left) / 2 - textWidth / 2;
                var Y = rcFont.top + (rcFont.bottom - rcFont.top) / 2 + textHeight / 2 - textHeight+2;
				this.textSurfaces[a].draw(context, X, Y);
            }
        }

        // Draw border if needed
        if (true == this.sClockBorder)
        {
		    context.renderEllipse(pntPoints[0].x-sRayon, pntPoints[0].y-sRayon, sRayon*2, sRayon*2, 1, this.crFont, 0, 0);
		    context.renderEllipse(pntPoints[0].x-sRayon, pntPoints[0].y-sRayon, sRayon*2+1, sRayon*2+1, 1, this.crFont, 0, 0);
        }
    },

    RunDisplayDigitalTime:function(context, szTime, rc)
    {
        // Display text
        if (!this.measureSurf)
        	this.measureSurf=new CTextSurface(this.rh.rhApp, 2, 2);
        var width=this.measureSurf.measureText(szTime, this.sFont);
        var height=this.sFont.lfHeight;
        var X = rc.left + (rc.right - rc.left) / 2 - width / 2;
        var Y = rc.top + (rc.bottom - rc.top) / 2 -  height / 2 ;
        if (this.textSurface==null)
        {
        	this.textSurface=new CTextSurface(this.rh.rhApp, width, height);
        	this.textSurface.setText(szTime, CServices.DT_TOP|CServices.DT_LEFT, null, this.sFont, this.crFont);
        }
        this.textSurface.draw(context, X, Y);
        if (true == this.sClockBorder)
        {
		    context.renderRect(rc.left + 1, rc.top + 1, rc.right - rc.left, rc.bottom - rc.top, this.crFont, 2, 0, 0);
        }
    },

    RunDisplayCalendar:function(context, szDate, rc)
    {
        if (!this.measureSurf)
        	this.measureSurf=new CTextSurface(this.rh.rhApp, 2, 2);
        var width=this.measureSurf.measureText(szDate, this.sFont);
        var height=this.sFont.lfHeight;
        var X = rc.left + (rc.right - rc.left) / 2 - width / 2;
        var Y = rc.top + (rc.bottom - rc.top) / 2 - height / 2 ;
        if (this.textSurface==null)
        {
        	this.textSurface=new CTextSurface(this.rh.rhApp, width, height);
        	this.textSurface.setText(szDate, CServices.DT_TOP|CServices.DT_LEFT, null, this.sFont, this.crFont);
        }
        this.textSurface.draw(context, X, Y);
    },

    getCurrentTime:function()
    {
        //output = initialTime + (currentTime - startTimer)
        var output= new Date();
        output.setTime(this.initialTime.getTime() + (output.getTime() - this.startTimer.getTime()));
        return output;
    },

    changeTime:function(date)
    {
        this.initialTime.setTime(date.getTime());
        this.lastRecordedTime.setTime(date.getTime());
        this.startTimer = new Date();
    },

	condition:function(num, cnd)
	{
        switch (num)
        {
            case CRunkcclock.CND_CMPCHRONO:
                return this.CmpChrono(cnd);
            case CRunkcclock.CND_NEWSECOND:
                return this.NewSecond();
            case CRunkcclock.CND_NEWMINUTE:
                return this.NewSecond();
            case CRunkcclock.CND_NEWHOUR:
                return this.NewSecond();
            case CRunkcclock.CND_NEWDAY:
                return this.NewSecond();
            case CRunkcclock.CND_NEWMONTH:
                return this.NewSecond();
            case CRunkcclock.CND_NEWYEAR:
                return this.NewSecond();
            case CRunkcclock.CND_CMPCOUNTDOWN:
                return this.CmpCountdown(cnd);
            case CRunkcclock.CND_VISIBLE:
                return this.IsVisible();
        }
        return false;
	},
	
    CmpChrono:function(cnd)
    {
        if (this.dChronoStart != 0)
        {
            var c= this.getCurrentTime();
            var dChronoStop = Math.floor(CRunkcclock.months[c.getMonth()] +
                    ((c.getDate()-1) * 8640000) + (c.getHours() * 360000) +
                    (c.getMinutes() * 6000) + (c.getSeconds() * 100) + (c.getMilliseconds() / 10));
            return this.compareTime(cnd, 0, ((this.lChrono + (dChronoStop - this.dChronoStart)) * 10));
        }
        else
        {
            return this.compareTime(cnd, 0, this.lChrono * 10);
        }
    }, 
    
    compareTime:function(cnd, num, t)
    {
        var value2=cnd.evtParams[num].timer;
        var comp = cnd.evtParams[num].comparaison;
        switch (comp)
        {
            case 0:	// COMPARE_EQ:
                return value1==value2;
            case 1:	// COMPARE_NE:
                return value1!=value2;
            case 2:	// COMPARE_LE:
                return value1<=value2;
            case 3:	// COMPARE_LT:
                return value1<value2;
            case 4:	// COMPARE_GE:
                return value1>=value2;
            case 5:	// COMPARE_GT:
                return value1>value2;
        }
        return false;
    },

    NewSecond:function()
    {
        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0)
        {
            return true;
        }
        if (this.rh.rh4EventCount == sEventCount)
        {
            return true;
        }
        return false;
    },

    CmpCountdown:function(cnd)
    {
        var lCurrentChrono;
        if (dChronoStart != 0)
        {
            var c= this.getCurrentTime();
            var dChronoStop = Math.floor(CRunkcclock.months[c.getMonth()] +
                    ((c.getDate()-1)*8640000) + (c.getHours() * 360000) +
                    (c.getMinutes() * 6000) + (c.getSeconds() * 100) + (c.getMilliseconds() / 10));
            lCurrentChrono = lCountdownStart - (this.lChrono + (dChronoStop - this.dChronoStart));
        }
        else
        {
            lCurrentChrono = lCountdownStart - lChrono;
            return this.compareTime(cnd, 0, this.lChrono * 10);
        }
        if (lCurrentChrono < 0)
        {
            lCurrentChrono = 0;
        }
        return this.compareTime(cnd, 0, lCurrentChrono * 10);
    },

    IsVisible:function()
    {
        return this.ho.bShown;
    },
    
    
    action:function(num, act)
    {
        switch (num)
        {
            case CRunkcclock.ACT_SETCENTIEMES:
                this.SetCentiemes(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETSECONDES:
                this.SetSeconds(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETMINUTES:
                this.SetMinutes(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETHOURS:
                this.SetHours(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETDAYOFWEEK:
                this.SetDayOfWeek(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETDAYOFMONTH:
                this.SetDayOfMonth(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETMONTH:
                this.SetMonth(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETYEAR:
                this.SetYear(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_RESETCHRONO:
                this.ResetChrono();
                break;
            case CRunkcclock.ACT_STARTCHRONO:
                this.StartChrono();
                break;
            case CRunkcclock.ACT_STOPCHRONO:
                this.StopChrono();
                break;
            case CRunkcclock.ACT_SHOW:
                this.Show();
                break;
            case CRunkcclock.ACT_HIDE:
                this.Hide();
                break;
            case CRunkcclock.ACT_SETPOSITION:
                this.SetPosition(act.getParamPosition(rh, 0));
                break;
            case CRunkcclock.ACT_SETCOUNTDOWN:
                this.SetCountdown(act.getParamTime(rh, 0));
                break;
            case CRunkcclock.ACT_STARTCOUNTDOWN:
                this.StartCountdown();
                break;
            case CRunkcclock.ACT_STOPCOUNTDOWN:
                this.StopCountdown();
                break;
            case CRunkcclock.ACT_SETXPOSITION:
                this.SetXPosition(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETYPOSITION:
                this.SetYPosition(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETXSIZE:
                this.SetXSize(act.getParamExpression(rh, 0));
                break;
            case CRunkcclock.ACT_SETYSIZE:
                this.SetYSize(act.getParamExpression(rh, 0));
                break;
        }
    },

    SetCentiemes:function(hundredths)
    {
        if ((hundredths >= 0) && (hundredths < 100))
        {
            var c= this.getCurrentTime();
            c.setMilliseconds(hundredths * 10);
            this.changeTime(c);
            this.ho.redraw();
        }
    },

    SetSeconds:function(secs)
    {
        if ((secs >= 0) && (secs < 60))
        {
            var c= this.getCurrentTime();
            c.setSeconds(secs);
            this.changeTime(c);
            this.ho.redraw();
        }
    },

    SetMinutes:function(mins)
    {
        if ((mins >= 0) && (mins < 60))
        {
            var c= this.getCurrentTime();
            c.setMinutes(mins);
            this.changeTime(c);
            this.ho.redraw();
        }
    },

    SetHours:function(hours)
    {
        if ((hours >= 0) && (hours < 24))
        {
            var c= this.getCurrentTime();
            c.setHours(hours);
            this.changeTime(c);
            this.ho.redraw();
        }
    },

    SetDayOfWeek:function(day)
    {
    },

    SetDayOfMonth:function(day)
    {
        if ((day >= 1) && (day < 32)) //1 based from c++
        {
            var c= this.getCurrentTime();
            c.setDate(day);
            this.changeTime(c);
            this.ho.redraw();
        }
    },

    SetMonth:function(month)
    {
        if ((month >= 1) && (month < 13)) //1 based from c++
        {
            var c= this.getCurrentTime();
            c.setMonth(month - 1);
            this.changeTime(c);
            this.ho.redraw();
        }
    },

    SetYear:function(year)
    {
        if ((year > 1979) && (year < 2100)) //y2.1k
        {
            var c= this.getCurrentTime();
            c.setFullYear(year);
            this.changeTime(c);
            this.ho.redraw();
        }
    },

    ResetChrono:function()
    {
        this.dChronoStart = 0;
        this.lChrono = 0;
        this.ho.redraw();
    },

    StartChrono:function()
    {
        if (this.dChronoStart == 0)
        {
            var c= this.getCurrentTime();
            var month=c.getMonth();
            var day=c.getDate();
            this.dChronoStart = Math.floor(CRunkcclock.months[c.getMonth()] +
                    ((c.getDate()-1) * 8640000) + (c.getHours() * 360000) +
                    (c.getMinutes() * 6000) + (c.getSeconds() * 100) + (c.getMilliseconds() / 10));
        }
    },

    StopChrono:function()
    {
        if (this.dChronoStart != 0)
        {
            var c= this.getCurrentTime();
            var dChronoStop = Math.floor(CRunkcclock.months[c.getMonth()] +
                    ((c.getDate()-1) * 8640000) + (c.getHours() * 360000) +
                    (c.getMinutes() * 6000) + (c.getSeconds() * 100) + (c.getMilliseconds() / 10));
            this.lChrono += (dChronoStop - this.dChronoStart);
            this.dChronoStart = 0;
        }
    },

    Show:function()
    {
    	this.ho.showSprite();
    },

    Hide:function()
    {
    	this.ho.hideSprite();
    },

    SetPosition:function(pos)
    {
        this.ho.setPosition(pos.x, pos.y);
        this.ho.redraw();
    },

    SetCountdown:function(time)
    {
        this.lCountdownStart = time / 10;
        this.dChronoStart = 0;
        this.lChrono = 0;
        this.ho.redraw();
    },

    StartCountdown:function()
    {
        if (this.dChronoStart == 0)
        {
            var c= this.getCurrentTime();
            this.dChronoStart = Math.floor(CRunkcclock.months[c.getMonth()] +
                    ((c.getDate()-1) * 8640000) + (c.getHours() * 360000) +
                    (c.getMinutes() * 6000) + (c.getSeconds() * 100) + (c.getMilliseconds() / 10));
        }
    },

    StopCountdown:function()
    {
        if (this.dChronoStart != 0)
        {
            var c= this.getCurrentTime();
            var dChronoStop = Math.floor(CRunkcclock.months[c.getMonth()] +
                    ((c.getDate()-1) * 8640000) + (c.getHours() * 360000) +
                    (c.getMinutes() * 6000) + (c.getSeconds() * 100) + (c.getMilliseconds() / 10));
            this.lChrono += (dChronoStop - this.dChronoStart);
            this.dChronoStart = 0;
        }
    },

    SetXPosition:function(x)
    {
        this.ho.setX(x);
        this.ho.redraw();
    },

    SetYPosition:function(y)
    {
        this.ho.setY(y);
        this.ho.redraw();
    },

    SetXSize:function(w)
    {
        this.ho.setWidth(w);
        this.ho.redraw();
    },

    SetYSize:function(h)
    {
        this.ho.setHeight(h);
        this.ho.redraw();
    },


    expression:function(num)
    {
        switch (num)
        {
            case CRunkcclock.EXP_GETCENTIEMES:
                return this.GetCentiemes();
            case CRunkcclock.EXP_GETSECONDES:
                return this.GetSeconds();
            case CRunkcclock.EXP_GETMINUTES:
                return this.GetMinutes();
            case CRunkcclock.EXP_GETHOURS:
                return this.GetHours();
            case CRunkcclock.EXP_GETDAYOFWEEK:
                return this.GetDayOfWeek();
            case CRunkcclock.EXP_GETDAYOFMONTH:
                return this.GetDayOfMonth();
            case CRunkcclock.EXP_GETMONTH:
                return this.GetMonth();
            case CRunkcclock.EXP_GETYEAR:
                return this.GetYear();
            case CRunkcclock.EXP_GETCHRONO:
                return this.GetChrono();
            case CRunkcclock.EXP_GETCENTERX:
                return this.GetCentreX();
            case CRunkcclock.EXP_GETCENTERY:
                return this.GetCentreY();
            case CRunkcclock.EXP_GETHOURX:
                return this.GetHourX();
            case CRunkcclock.EXP_GETHOURY:
                return this.GetHourY();
            case CRunkcclock.EXP_GETMINUTEX:
                return this.GetMinuteX();
            case CRunkcclock.EXP_GETMINUTEY:
                return this.GetMinuteY();
            case CRunkcclock.EXP_GETSECONDX:
                return this.GetSecondX();
            case CRunkcclock.EXP_GETSECONDY:
                return this.GetSecondY();
            case CRunkcclock.EXP_GETCOUNTDOWN:
                return this.GetCountdown();
            case CRunkcclock.EXP_GETXPOSITION:
                return this.GetXPosition();
            case CRunkcclock.EXP_GETYPOSITION:
                return this.GetYPosition();
            case CRunkcclock.EXP_GETXSIZE:
                return this.GetXSize();
            case CRunkcclock.EXP_GETYSIZE:
                return this.GetYSize();
        }
        return 0;
    },

    GetCentiemes:function()
    {
        return Math.floor(this.getCurrentTime().getMilliseconds() / 10);
    },

    GetSeconds:function()
    {
        return this.getCurrentTime().getSeconds();
    },

    GetMinutes:function()
    {
        return this.getCurrentTime().getMinutes();
    },

    GetHours:function()
    {
        return this.getCurrentTime().getHours();
    },

    GetDayOfWeek:function()
    {
        return this.getCurrentTime().getDay();
    },

    GetDayOfMonth:function()
    {
        return this.getCurrentTime().getDate();
    },

    GetMonth:function()
    {
        return this.getCurrentTime().getMonth() + 1;
    },

    GetYear:function()
    {
        return this.getCurrentTime().getFullYear();
    },

    GetChrono:function()
    {
        if (this.dChronoStart != 0)
        {
            var c= this.getCurrentTime();
            var dChronoStop = Math.floor(CRunkcclock.months[c.getMonth()] +
                    ((c.getDate()-1) * 8640000) + (c.getHours() * 360000) +
                    (c.getMinutes() * 6000) + (c.getSeconds() * 100) + (c.getMilliseconds() / 10));
            return this.lChrono + (dChronoStop - this.dChronoStart);
        }
        else
        {
            return this.lChrono;
        }
    },

    GetCentreX:function()
    {
        if (CRunkcclock.ANALOG_CLOCK == this.sType)
        {
            return this.sCenterX + this.rh.rhWindowX;
        }
        else
        {
            return 0;
        }
    },

    GetCentreY:function()
    {
        if (CRunkcclock.ANALOG_CLOCK == this.sType)
        {
            return this.sCenterY + this.rh.rhWindowY;
        }
        else
        {
            return 0;
        }
    },

    GetHourX:function()
    {
        if (CRunkcclock.ANALOG_CLOCK == this.sType)
        {
            return this.sHourX + this.rh.rhWindowX;
        }
        else
        {
            return 0;
        }
    },

    GetHourY:function()
    {
        if (CRunkcclock.ANALOG_CLOCK == this.sType)
        {
            return this.sHourY + this.rh.rhWindowY;
        }
        else
        {
            return 0;
        }
    },

    GetMinuteX:function()
    {
        if (CRunkcclock.ANALOG_CLOCK == this.sType)
        {
            return this.sMinuteX + this.rh.rhWindowX;
        }
        else
        {
            return 0;
        }
    },

    GetMinuteY:function()
    {
        if (CRunkcclock.ANALOG_CLOCK == this.sType)
        {
            return this.sMinuteY + this.rh.rhWindowY;
        }
        else
        {
            return 0;
        }
    },

    GetSecondX:function()
    {
        if (CRunkcclock.ANALOG_CLOCK == this.sType)
        {
            return this.sSecondX + this.rh.rhWindowX;
        }
        else
        {
            return 0;
        }
    },

    GetSecondY:function()
    {
        if (CRunkcclock.ANALOG_CLOCK == this.sType)
        {
            return this.sSecondY + this.rh.rhWindowY;
        }
        else
        {
            return 0;
        }
    },

    GetCountdown:function()
    {
        var lCurrentChrono;
        if (this.dChronoStart != 0)
        {
            var c= this.getCurrentTime();
            var dChronoStop = Math.floor(CRunkcclock.months[c.getMonth()] +
                    ((c.getDate()-1) * 8640000) + (c.getHours() * 360000) +
                    (c.getMinutes() * 6000) + (c.getSeconds() * 100) + (c.getMilliseconds() / 10));
            lCurrentChrono = this.lCountdownStart - (this.lChrono + (dChronoStop - this.dChronoStart));
            if (lCurrentChrono < 0)
            {
                lCurrentChrono = 0;
            }
            return lCurrentChrono;
        }
        else
        {
            lCurrentChrono = this.lCountdownStart - this.lChrono;
            if (lCurrentChrono < 0)
            {
                lCurrentChrono = 0;
            }
            return lCurrentChrono;
        }
    },

    GetXPosition:function()
    {
        return this.ho.getX();
    },

    GetYPosition:function()
    {
        return this.ho.getY();
    },

    GetXSize:function()
    {
        return this.ho.getWidth();
    },

    GetYSize:function()
    {
        return this.ho.getHeight();
    }

});


var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};
