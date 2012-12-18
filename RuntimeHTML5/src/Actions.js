
// CAct object
// ----------------------------------------------------------
CAct.ACTFLAGS_REPEAT=0x0001;

CAct.create=function(app)
{
    var debut=app.file.getFilePointer();

    var size=app.file.readAShort()
    var act=null;      
    var c=app.file.readAInt();       
    switch (c)
    {
        case ((0<<16)|0xFFFF):					
            act=new ACT_SKIP();
            break;
        case ((1<<16)|0xFFFF):		// ACT_SKIPMONITOR			
            act=new ACT_SKIP();
            break;
        case ((3<<16)|0xFFFF):					
            act=new ACT_SETVARG();
            break;
        case ((4<<16)|0xFFFF):					
            act=new ACT_SUBVARG();
            break;
        case ((5<<16)|0xFFFF):					
            act=new ACT_ADDVARG();
            break;
        case ((6<<16)|0xFFFF):				
            act=new ACT_GRPACTIVATE();
            break;
        case ((7<<16)|0xFFFF):			
            act=new ACT_GRPDEACTIVATE();
            break;
        case ((14<<16)|0xFFFF):				
            act=new ACT_STARTLOOP();
            break;
        case ((15<<16)|0xFFFF):				
            act=new ACT_STOPLOOP();
            break;
        case ((16<<16)|0xFFFF):			
            act=new ACT_SETLOOPINDEX();
            break;
        case ((17<<16)|0xFFFF):				
            act=new ACT_RANDOMIZE();
            break;
        case ((19<<16)|0xFFFF):			
            act=new ACT_SETGLOBALSTRING();
            break;
        case ((23<<16)|0xFFFF):			
            act=new ACT_SKIP();
            break;
        case ((24<<16)|0xFFFF):			
            act=new ACT_SKIP();
            break;
        case ((0<<16)|0xFFFE):				
            act=new ACT_PLAYSAMPLE();
            break;
        case ((1<<16)|0xFFFE):				
            act=new ACT_STOPSAMPLE();
            break;
        case ((4<<16)|0xFFFE):		 	
            act=new ACT_PLAYLOOPSAMPLE();
            break;
        case ((6<<16)|0xFFFE):			
            act=new ACT_STOPSPESAMPLE();
            break;
        case ((7<<16)|0xFFFE):				
            act=new ACT_PAUSESAMPLE();
            break;
        case ((8<<16)|0xFFFE):			
            act=new ACT_RESUMESAMPLE();
            break;
        case ((11<<16)|0xFFFE):				
            act=new ACT_PLAYCHANNEL();
            break;
        case ((12<<16)|0xFFFE):			
            act=new ACT_PLAYLOOPCHANNEL();
            break;
        case ((13<<16)|0xFFFE):			
            act=new ACT_PAUSECHANNEL();
            break;
        case ((14<<16)|0xFFFE):			
            act=new ACT_RESUMECHANNEL();
            break;
        case ((15<<16)|0xFFFE):				
            act=new ACT_STOPCHANNEL();
            break;
        case ((16<<16)|0xFFFE):			
            act=new ACT_SETCHANNELPOS();
            break;
        case ((17<<16)|0xFFFE):			
            act=new ACT_SETCHANNELVOL();
            break;
        case ((18<<16)|0xFFFE):				// SETCHANNELPAN
            act=new ACT_SKIP();
        	break;
        case ((19<<16)|0xFFFE):			
            act=new ACT_SETSAMPLEPOS();
        	break;
    	case ((20<<16)|0xFFFE):			
            act=new ACT_SETSAMPLEMAINVOL();
        	break;
        case ((21<<16)|0xFFFE):				
            act=new ACT_SETSAMPLEVOL();
        	break;
        case ((22<<16)|0xFFFE):			
            act=new ACT_SKIP();
        	break;
        case ((23<<16)|0xFFFE):				
            act=new ACT_SKIP();
        	break;
        case ((24<<16)|0xFFFE):			
            act=new ACT_PAUSEALLCHANNELS();
            break;
        case ((25<<16)|0xFFFE):			
            act=new ACT_RESUMEALLCHANNELS();
            break;
        case ((30<<16)|0xFFFE):					
            act=new ACT_LOCKCHANNEL();
            break;
        case ((31<<16)|0xFFFE):				
            act=new ACT_UNLOCKCHANNEL();
            break;
        case ((32<<16)|0xFFFE):				
            act=new ACT_SETCHANNELFREQ();
            break;
        case ((33<<16)|0xFFFE):				
            act=new ACT_SETSAMPLEFREQ();
            break;
        case ((0<<16)|0xFFFD):		       
            act=new ACT_NEXTLEVEL();
            break;
        case ((1<<16)|0xFFFD):		       
            act=new ACT_PREVLEVEL();
            break;
        case ((2<<16)|0xFFFD):		     	
            act=new ACT_GOLEVEL();
            break;
        case ((3<<16)|0xFFFD):		           
            act=new ACT_PAUSEKEY();
            break;
        case ((4<<16)|0xFFFD):		         
            act=new ACT_ENDGAME();
            break;
        case ((5<<16)|0xFFFD):		     
            act=new ACT_RESTARTGAME();
            break;
        case ((6<<16)|0xFFFD):		    
            act=new ACT_RESTARTLEVEL();
            break;
        case ((7<<16)|0xFFFD):			    
            act=new ACT_CDISPLAY();
            break;
        case ((8<<16)|0xFFFD):			    
            act=new ACT_CDISPLAYX();
            break;
        case ((9<<16)|0xFFFD):			    
            act=new ACT_CDISPLAYY();
            break;
        case ((14<<16)|0xFFFD):			
            act=new ACT_FULLSCREENMODE();
            break;
        case ((15<<16)|0xFFFD):			
            act=new ACT_WINDOWEDMODE();
            break;
        case ((17<<16)|0xFFFD):			
            act=new ACT_PAUSEKEY();
            break;
        case ((18<<16)|0xFFFD):				
            act=new ACT_PAUSEANYKEY();
            break;
        case ((21<<16)|0xFFFD):			
            act=new ACT_SETVIRTUALWIDTH();
            break;
        case ((22<<16)|0xFFFD):		 
            act=new ACT_SETVIRTUALHEIGHT();
            break;
        case ((23<<16)|0xFFFD):		 
            act=new ACT_SETFRAMEBDKCOLOR();
            break;
        case ((24<<16)|0xFFFD):		 
            act=new ACT_DELCREATEDBKDAT();
            break;
        case ((25<<16)|0xFFFD):		 
            act=new ACT_DELALLCREATEDBKD();
            break;
        case ((26<<16)|0xFFFD):			
            act=new ACT_SETFRAMEWIDTH();
            break;
        case ((27<<16)|0xFFFD):			
            act=new ACT_SETFRAMEHEIGHT();
            break;
        case ((31<<16)|0xFFFD):				
            act=new ACT_PLAYDEMO();
            break;
		case ((32<<16)|0xFFFD): 		// ACT_SETFRAMEEFFECT				
			act=new ACT_SKIP();
			break;
		case ((33<<16)|0xFFFD):		
			act=new ACT_SKIP();
			break;
		case ((34<<16)|0xFFFD):				
			act=new ACT_SKIP();
			break;
		case ((35<<16)|0xFFFD):			// ACT_SETFRAMEALPHACOEF			
			act=new ACT_SKIP();
			break;
		case ((36<<16)|0xFFFD): 		// ACT_SETFRAMERGBCOEF				
			act=new ACT_SKIP();
			break;
        case ((0<<16)|0xFFFC):		        
            act=new ACT_SETTIMER();
            break;
        case ((0<<16)|0xFFFA):				
            act=new ACT_HIDECURSOR();
            break;
        case ((1<<16)|0xFFFA):				
            act=new ACT_SHOWCURSOR();
            break;
        case ((0<<16)|0xFFF9):			  	
            act=new ACT_SETSCORE();
            break;
        case ((1<<16)|0xFFF9):		      	
            act=new ACT_SETLIVES();
            break;
        case ((2<<16)|0xFFF9):		      	
            act=new ACT_NOINPUT();
            break;
        case ((3<<16)|0xFFF9):		      	
            act=new ACT_RESTINPUT();
            break;
        case ((4<<16)|0xFFF9):			  	
            act=new ACT_ADDSCORE();
            break;
        case ((5<<16)|0xFFF9):		      	
            act=new ACT_ADDLIVES();
            break;
        case ((6<<16)|0xFFF9):			  	
            act=new ACT_SUBSCORE();
            break;
        case ((7<<16)|0xFFF9):		      	
            act=new ACT_SUBLIVES();
            break;
        case ((8<<16)|0xFFF9):			  	
            act=new ACT_SETINPUT();
            break;
        case ((9<<16)|0xFFF9):		    	
            act=new ACT_SETINPUTKEY();
            break;
        case ((10<<16)|0xFFF9):			
            act=new ACT_SETPLAYERNAME();
            break;
        case ((0<<16)|0xFFFB):						
            act=new ACT_CREATE();
            break;
        case (( (80+0)<<16)|3):			  	 
            act=new ACT_STRDESTROY();
            break;
        case (( (80+1)<<16)|3):				 
            act=new ACT_STRDISPLAY();
            break;
        case (( (80+2)<<16)|3):		 
            act=new ACT_STRDISPLAYDURING();
            break;
        case (( (80+3)<<16)|3):		     
            act=new ACT_STRSETCOLOUR();
            break;
        case (( (80+4)<<16)|3):			   		 
            act=new ACT_STRSET();
            break;
        case (( (80+5)<<16)|3):			   		 
            act=new ACT_STRPREV();
            break;
        case (( (80+6)<<16)|3):			   		 
            act=new ACT_STRNEXT();
            break;
        case (( (80+7)<<16)|3):		 
            act=new ACT_STRDISPLAYSTRING();
            break;
        case (( (80+8)<<16)|3):			 
            act=new ACT_STRSETSTRING();
            break;
	    case (((80+0)<<16)|2):		
			act=new ACT_SPRPASTE();
			break;
        case (((80+1)<<16)|2):				
            act=new ACT_EXTSPRFRONT();
            break;
        case (((80+2)<<16)|2):					
            act=new ACT_EXTSPRBACK();
            break;
        case (((80+3)<<16)|2):				
            act=new ACT_SPRADDBKD();
            break;	
        case (((80+4)<<16)|2):				
            act=new ACT_SPRREPLACECOLOR();
            break;	
        case (((80+5)<<16)|2):				
            act=new ACT_SPRSETSCALE();
            break;
        case (((80+6)<<16)|2):			
            act=new ACT_SPRSETSCALEX();
            break;
        case (((80+7)<<16)|2):			
            act=new ACT_SPRSETSCALEY();
            break;
        case (((80+8)<<16)|2):				
            act=new ACT_SPRSETANGLE();
            break;
        case (( (80+0)<<16)|7):				
            act=new ACT_CSETVALUE();
            break;
        case (( (80+1)<<16)|7):				
            act=new ACT_CADDVALUE();
            break;
        case (( (80+2)<<16)|7):				
            act=new ACT_CSUBVALUE();
            break;
        case (( (80+3)<<16)|7):					
            act=new ACT_CSETMIN();
            break;
        case (( (80+4)<<16)|7):					
            act=new ACT_CSETMAX();
            break;
        case (( (80+5)<<16)|7):				
            act=new ACT_CSETCOLOR1();
            break;
        case (( (80+6)<<16)|7):				
            act=new ACT_CSETCOLOR2();
            break;
        case (( (80+0)<<16)|4):				    
            act=new ACT_QASK();
            break;
        case (((80+0)<<16)|9):						
            act=new ACT_CCARESTARTAPP();
            break;
        case (((80+1)<<16)|9):						
            act=new ACT_CCARESTARTFRAME();
            break;
        case (((80+2)<<16)|9):						
            act=new ACT_CCANEXTFRAME();
            break;
        case (((80+3)<<16)|9):					
            act=new ACT_CCAPREVIOUSFRAME();
            break;
        case (((80+4)<<16)|9):							
            act=new ACT_CCAENDAPP();
            break;
        case (((80+6)<<16)|9):						
            act=new ACT_CCAJUMPFRAME();
            break;
        case (((80+7)<<16)|9):					
            act=new ACT_CCASETGLOBALVALUE();
            break;
        case (((80+8)<<16)|9):								
            act=new ACT_CCASHOW();
            break;
        case (((80+9)<<16)|9):								
            act=new ACT_CCAHIDE();
            break;
        case (((80+10)<<16)|9):					
            act=new ACT_CCASETGLOBALSTRING();
            break;
        case (((80+11)<<16)|9):							
            act=new ACT_CCAPAUSEAPP();
            break;
        case (((80+12)<<16)|9):						
            act=new ACT_CCARESUMEAPP();
            break;
        // Actions pour les objets extensions 
        default:
        {
            switch (c&0xFFFF0000)
            {
                case (1 <<16):				 
                    act=new ACT_EXTSETPOS();
                    break;
                case (2 <<16):							        
                    act=new ACT_EXTSETX();
                    break;
                case (3 <<16):							        
                    act=new ACT_EXTSETY();
                    break;
                case (4 <<16):							        
                    act=new ACT_EXTSTOP();
                    break;
                case (5 <<16):						        
                    act=new ACT_EXTSTART();
                    break;
                case (6 <<16):						        
                    act=new ACT_EXTSPEED();
                    break;
                case (7 <<16):						        
                    act=new ACT_EXTMAXSPEED();
                    break;
                case (8 <<16):							        
                    act=new ACT_EXTWRAP();
                    break;
                case (9 <<16):						        
                    act=new ACT_EXTBOUNCE();
                    break;
                case (10<<16):						        
                    act=new ACT_EXTREVERSE();
                    break;
                case (11<<16):						        
                    act=new ACT_EXTNEXTMOVE();
                    break;
                case (12<<16):						        
                    act=new ACT_EXTPREVMOVE();
                    break;
                case (13<<16):						        
                    act=new ACT_EXTSELMOVE();
                    break;
                case (14<<16):						        
                    act=new ACT_EXTLOOKAT();
                    break;
                case (15<<16):						        
                    act=new ACT_EXTSTOPANIM();
                    break;
                case (16<<16):					        
                    act=new ACT_EXTSTARTANIM();
                    break;
                case (17<<16):					        
                    act=new ACT_EXTFORCEANIM();
                    break;
                case (18<<16):						        
                    act=new ACT_EXTFORCEDIR();
                    break;
                case (19<<16):					        
                    act=new ACT_EXTFORCESPEED();
                    break;
                case (20<<16):				        
                    act=new ACT_EXTRESTANIM();
                    break;
                case (21<<16):						        
                    act=new ACT_EXTRESTDIR();
                    break;
                case (22<<16):					        
                    act=new ACT_EXTRESTSPEED();
                    break;
                case (23<<16):								
                    act=new ACT_EXTSETDIR();
                    break;
                case (24<<16):								
                    act=new ACT_EXTDESTROY();
                    break;
                case (25<<16):								
                    act=new ACT_EXTSHUFFLE();
                    break;
                case (26<<16):									
                    act=new ACT_EXTHIDE();
                    break;
                case (27<<16):									
                    act=new ACT_EXTSHOW();
                    break;
                case (28<<16):						
                    act=new ACT_EXTDISPLAYDURING();
                    break;
                case (29<<16):								
                    act=new ACT_EXTSHOOT();
                    break;
                case (30<<16):							
                    act=new ACT_EXTSHOOTTOWARD();
                    break;
                case (31<<16):								
                    act=new ACT_EXTSETVAR();
                    break;
                case (32<<16):								
                    act=new ACT_EXTADDVAR();
                    break;
                case (33<<16):								
                    act=new ACT_EXTSUBVAR();
                    break;
                case (34<<16):							
                    act=new ACT_EXTDISPATCHVAR();
                    break;
                case (35<<16):								
                    act=new ACT_EXTSETFLAG();
                    break;
                case (36<<16):								
                    act=new ACT_EXTCLRFLAG();
                    break;
                case (37<<16):								
                    act=new ACT_EXTCHGFLAG();
                    break;
				case (38 << 16):  
					act = new ACT_EXTINKEFFECT();
					break;						
                case (39<<16):			
                    act=new ACT_EXTSETSEMITRANSPARENCY();
                    break;
                case (40<<16):					
                    act=new ACT_EXTFORCEFRAME();
                    break;
                case (41<<16):					
                    act=new ACT_EXTRESTFRAME();
                    break;
                case (42<<16):				
                    act=new ACT_EXTSETACCELERATION();
                    break;
                case (43<<16):				
                    act=new ACT_EXTSETDECELERATION();
                    break;
                case (44<<16):				
                    act=new ACT_EXTSETROTATINGSPEED();
                    break;
                case (45<<16):				
                    act=new ACT_EXTSETDIRECTIONS();
                    break;
                case (46<<16):					
                    act=new ACT_EXTBRANCHNODE();
                    break;
                case (47<<16):					
                    act=new ACT_EXTSETGRAVITY();
                    break;
                case (48<<16):						
                    act=new ACT_EXTGOTONODE();
                    break;
                case (49<<16):					
                    act=new ACT_EXTSETVARSTRING();
                    break;
                case (50<<16):					
                    act=new ACT_EXTSETFONTNAME();
                    break;
                case (51<<16):					
                    act=new ACT_EXTSETFONTSIZE();
                    break;
                case (52<<16):						
                    act=new ACT_EXTSETBOLD();
                    break;
                case (53<<16):					
                    act=new ACT_EXTSETITALIC();
                    break;
                case (54<<16):					
                    act=new ACT_EXTSETUNDERLINE();
                    break;
                case (55<<16):					
                    act=new ACT_SKIP();
                    break;
                case (56<<16):					
                    act=new ACT_EXTSETTEXTCOLOR();
                    break;
                case (57<<16):						
                    act=new ACT_EXTSPRFRONT();
                    break;
                case (58<<16):						
                    act=new ACT_EXTSPRBACK();
                    break;
                case (59<<16):					
                    act=new ACT_EXTMOVEBEFORE();
                    break;
                case (60<<16):					
                    act=new ACT_EXTMOVEAFTER();
                    break;
                case (61<<16):					
                    act=new ACT_EXTMOVETOLAYER();
                    break;
                case (62<<16):				//  ACT_EXTADDTODEBUGGER		
                    act=new ACT_SKIP();
                    break;
				case (63 << 16):  
					act = new ACT_EXTSETEFFECT();
					break;					
				case (64 << 16):  //  ACT_EXTSETEFFECTPARAM
					act = new ACT_SKIP();
					break;
				case (65 << 16):  
					act=new ACT_EXTSETALPHACOEF();
					break;
				case (66 << 16):  
					act = new ACT_EXTSETRGBCOEF();
					break;					
				case (67 << 16):  // ACT_EXTSETEFFECTPARAMTEXTURE
					act = new ACT_SKIP();
					break;
										
                default:                                    
					act=new CActExtension();
                    break;
            }
        }
    }
    
    if (act!=null)
    {
        act.evtCode=c;
        act.evtOi=app.file.readShort(); 
        act.evtOiList=app.file.readShort(); 
        act.evtFlags=app.file.readAByte(); 
        act.evtFlags2=app.file.readAByte(); 
        act.evtNParams=app.file.readAByte(); 
        act.evtDefType=app.file.readAByte(); 

        if (act.evtNParams>0)
        {
            act.evtParams=new Array(act.evtNParams);
            var n;
            for (n=0; n<act.evtNParams; n++)
            {
                act.evtParams[n]=CParam.create(app);
            }
        }
    }
    app.file.seek(debut+size);	        
    return act;
}
function CAct()
{
}

CLoop.FLFLAG_STOP=0x0001;    
function CLoop()
{
    this.flags=0;
    this.name=null;
    this.index=0;
}

// System object
// ------------------------------------------------------------------
function ACT_ADDVARG()
{	
}
ACT_ADDVARG.prototype=
{
	execute:function(rhPtr)
	{
		var num;
		if (this.evtParams[0].code==52) 
			num=(rhPtr.get_EventExpressionInt(this.evtParams[0])-1);
		else
			num=this.evtParams[0].value;		   
		var value=rhPtr.get_EventExpressionAny(this.evtParams[1]);
		rhPtr.rhApp.addGlobalValueAt(num, value);
	}
}

function ACT_GRPACTIVATE()
{	
}
ACT_GRPACTIVATE.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		var evg=p.pointer;
		var evgPtr=rhPtr.rhEvtProg.events[evg];
		var evtPtr=evgPtr.evgEvents[0];

		var grpPtr=evtPtr.evtParams[0];
		var bFlag=(grpPtr.grpFlags&PARAM_GROUP.GRPFLAGS_GROUPINACTIVE)!=0;
		grpPtr.grpFlags&=~PARAM_GROUP.GRPFLAGS_GROUPINACTIVE;

		if (bFlag)
			this.grpActivate(rhPtr, evg);
	},
	grpActivate:function(rhPtr, evg)
	{
		var evgPtr=rhPtr.rhEvtProg.events[evg];
		var evtPtr=evgPtr.evgEvents[0];
		var grpPtr=evtPtr.evtParams[0];
		var cpt;
		var bQuit=false;

		if ((grpPtr.grpFlags&PARAM_GROUP.GRPFLAGS_PARENTINACTIVE)==0)
		{
			evgPtr.evgFlags&=~CEventGroup.EVGFLAGS_INACTIVE;

			for (evg++, bQuit=false, cpt=1; ;)
			{
				evgPtr=rhPtr.rhEvtProg.events[evg];
				evtPtr=evgPtr.evgEvents[0];
				switch (evtPtr.evtCode)
				{
					case ((-10<<16)|65535):
						grpPtr=evtPtr.evtParams[0];
						if (cpt==1)
							grpPtr.grpFlags&=~PARAM_GROUP.GRPFLAGS_PARENTINACTIVE;
						if ((grpPtr.grpFlags&PARAM_GROUP.GRPFLAGS_GROUPINACTIVE)==0)
						{
							evg=this.grpActivate(rhPtr, evg);
							continue;
						}
						else
							cpt++;
						break;
					case ((-11<<16)|65535):
						cpt--;
						if (cpt==0)
						{
							evgPtr.evgFlags&=~CEventGroup.EVGFLAGS_INACTIVE;
							bQuit=true;
							evg++;
						}
						break;
					case ((-23<<16)|65535):
						if (cpt==1)
						{
							evgPtr.evgFlags&=~CEventGroup.EVGFLAGS_INACTIVE;
							evgPtr.evgFlags&=~CEventGroup.EVGFLAGS_ONCE;
						}
						break;
					default:
						if (cpt==1)
							evgPtr.evgFlags&=~CEventGroup.EVGFLAGS_INACTIVE;
						break;
				}
				if (bQuit)
					break;
				evg++;
			}
		}
		else
		{
			for (evg++, bQuit=false, cpt=1; ; evg++)
			{
				evgPtr=rhPtr.rhEvtProg.events[evg];
				evtPtr=evgPtr.evgEvents[0];
				switch (evtPtr.evtCode)
				{
					case ((-10<<16)|65535):	    
						cpt++;
						break;
					case ((-11<<16)|65535):	    
						cpt--;
						if (cpt==0)
						{
							bQuit=true;
							evg++;
						}
						break;
				}
				if (bQuit)
					break;
			}
		}
		return evg;
	}	    
}

function ACT_GRPDEACTIVATE()
{	
}
ACT_GRPDEACTIVATE.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		var evg=p.pointer;
		var evgPtr=rhPtr.rhEvtProg.events[evg];
		var evtPtr=evgPtr.evgEvents[0];

		var grpPtr=evtPtr.evtParams[0];
		var bFlag=(grpPtr.grpFlags&PARAM_GROUP.GRPFLAGS_GROUPINACTIVE)==0;
		grpPtr.grpFlags|=PARAM_GROUP.GRPFLAGS_GROUPINACTIVE;

		if (bFlag==true && (grpPtr.grpFlags&PARAM_GROUP.GRPFLAGS_PARENTINACTIVE)==0)
			this.grpDeactivate(rhPtr, evg);
	},
	grpDeactivate:function(rhPtr, evg)
	{
		var evgPtr=rhPtr.rhEvtProg.events[evg];
		var evtPtr=evgPtr.evgEvents[0];
		var grpPtr=evtPtr.evtParams[0];

		evgPtr.evgFlags|=CEventGroup.EVGFLAGS_INACTIVE;

		var cpt;
		var bQuit, bFlag;

		for (evg++, bQuit=false, cpt=1; ;)
		{
			evgPtr=rhPtr.rhEvtProg.events[evg];
			evtPtr=evgPtr.evgEvents[0];
			switch (evtPtr.evtCode)
			{
				case ((-10<<16)|65535):
					grpPtr=evtPtr.evtParams[0];
					bFlag=(grpPtr.grpFlags&PARAM_GROUP.GRPFLAGS_PARENTINACTIVE)==0;
					if (cpt==1)
						grpPtr.grpFlags|=PARAM_GROUP.GRPFLAGS_PARENTINACTIVE;
					if (bFlag!=false && (grpPtr.grpFlags&PARAM_GROUP.GRPFLAGS_GROUPINACTIVE)==0)
					{
						evg=this.grpDeactivate(rhPtr, evg);
						continue;
					}
					else
						cpt++;
					break;
				case ((-11<<16)|65535):
					cpt--;
					if (cpt==0)
					{
						evgPtr.evgFlags|=CEventGroup.EVGFLAGS_INACTIVE;
						bQuit=true;
						evg++;
					}
					break;
				default:
					if (cpt==1)
						evgPtr.evgFlags|=CEventGroup.EVGFLAGS_INACTIVE;
					break;
			}
			if (bQuit)
				break;

			evg++;
		}
		return evg;
		}
}

function ACT_RANDOMIZE()
{	
}
ACT_RANDOMIZE.prototype=
{
	execute:function(rhPtr)
	{
		var seed=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		rhPtr.rh3Graine=seed;	
	}
}

function ACT_SETGLOBALSTRING()
{	
}
ACT_SETGLOBALSTRING.prototype=
{
	execute:function(rhPtr)
	{
		var num;
		if (this.evtParams[0].code==59) 
			num=(rhPtr.get_EventExpressionInt(this.evtParams[0])-1);	
		else
			num=this.evtParams[0].value;
		   
		var string=rhPtr.get_EventExpressionString(this.evtParams[1]);
		rhPtr.rhApp.setGlobalStringAt(num, string);	        
	}
}

function ACT_SETLOOPINDEX()
{	
}
ACT_SETLOOPINDEX.prototype=
{
	execute:function(rhPtr)
	{
		var name=rhPtr.get_EventExpressionString(this.evtParams[0]);
		if (name.length==0) 
			return;
		var number=rhPtr.get_EventExpressionInt(this.evtParams[1]);

		var pLoop;
		var n;	
		for (n=0; n<rhPtr.rh4FastLoops.size(); n++)
		{
			pLoop=rhPtr.rh4FastLoops.get(n);
			if (CServices.compareStringsIgnoreCase(pLoop.name, name))
			{
				pLoop.index=number;
				return;
			}
		}
	}
}

function ACT_SETVARG()
{	
}
ACT_SETVARG.prototype=
{
	execute:function(rhPtr)
	{
		var num;
		if (this.evtParams[0].code==52) 
			num=(rhPtr.get_EventExpressionInt(this.evtParams[0])-1);
		else
			num=this.evtParams[0].value;
		   
		var value=rhPtr.get_EventExpressionAny(this.evtParams[1]);
		rhPtr.rhApp.setGlobalValueAt(num, value);
	}
}

function ACT_SKIP()
{	
}
ACT_SKIP.prototype=
{
	execute:function(rhPtr)
	{
	}
}

function ACT_STOPLOOP()
{	
}
ACT_STOPLOOP.prototype=
{
	execute:function(rhPtr)
	{
		var name=rhPtr.get_EventExpressionString(this.evtParams[0]);
		if (name.length==0) 
			return;

		var pLoop;
		var n;	
		for (n=0; n<rhPtr.rh4FastLoops.size(); n++)
		{
			pLoop=rhPtr.rh4FastLoops.get(n);
			if (CServices.compareStringsIgnoreCase(pLoop.name, name))
				pLoop.flags|=CLoop.FLFLAG_STOP;
		}        
	}
}

function ACT_SUBVARG()
{	
}
ACT_SUBVARG.prototype=
{
	execute:function(rhPtr)
	{
		var num;
		if (this.evtParams[0].code==52) 
			num=(rhPtr.get_EventExpressionInt(this.evtParams[0])-1);
		else
			num=this.evtParams[0].value;
		   
		var value=rhPtr.get_EventExpressionAny(this.evtParams[1]);
		rhPtr.rhApp.addGlobalValueAt(num, -value);
	}
}

function ACT_STARTLOOP()
{	
}
ACT_STARTLOOP.prototype=
{
	execute:function(rhPtr)
	{
		var name=rhPtr.get_EventExpressionString(this.evtParams[0]);
		if (name.length==0) 
			return;
		var number=rhPtr.get_EventExpressionInt(this.evtParams[1]);

		var pLoop;
		var bInfinite=false;
		var index;
		for (index=0; index<rhPtr.rh4FastLoops.size(); index++)
		{
			pLoop=rhPtr.rh4FastLoops.get(index);
			if (CServices.compareStringsIgnoreCase(pLoop.name, name))
				break;
		}
		if (index==rhPtr.rh4FastLoops.size())
		{
			var loop=new CLoop();
			rhPtr.rh4FastLoops.add(loop);
			index=rhPtr.rh4FastLoops.size()-1;
			loop.name=name;
			loop.flags=0;
		}
		pLoop=rhPtr.rh4FastLoops.get(index);
		pLoop.flags&=~CLoop.FLFLAG_STOP;

		bInfinite=false;
		if (number<0)
		{
			bInfinite=true;
			number=10;
		}
		var save=rhPtr.rh4CurrentFastLoop;
		var actionLoop=rhPtr.rhEvtProg.rh2ActionLoop;				
		var actionLoopCount=rhPtr.rhEvtProg.rh2ActionLoopCount;		
		var eventGroup=rhPtr.rhEvtProg.rhEventGroup;
		for (pLoop.index=0; pLoop.index<number; pLoop.index++)
		{
			rhPtr.rh4CurrentFastLoop=pLoop.name;
			rhPtr.rhEvtProg.rh2ActionOn=false;
			rhPtr.rhEvtProg.handle_GlobalEvents(((-16<<16)|65535));	
			if ((pLoop.flags&CLoop.FLFLAG_STOP)!=0)
				break;
			if (bInfinite) 
				number=pLoop.index+10;
		}
//			rhPtr.rhEvtProg.rhEventGroup=eventGroup;
		rhPtr.rhEvtProg.rh2ActionLoopCount=actionLoopCount;			
		rhPtr.rhEvtProg.rh2ActionLoop=actionLoop;					
		rhPtr.rh4CurrentFastLoop=save;
		rhPtr.rhEvtProg.rh2ActionOn=true;
		
		rhPtr.rh4FastLoops.removeIndex(index);
	}
}



// Keyboard object
// ------------------------------------------------------------------
function ACT_HIDECURSOR()
{	
}
ACT_HIDECURSOR.prototype=
{
	execute:function(rhPtr)
	{
		if (rhPtr.rhMouseUsed==0)
			rhPtr.hideMouse();
	}
}

function ACT_SHOWCURSOR()
{	
}
ACT_SHOWCURSOR.prototype=
{
	execute:function(rhPtr)
	{
		if (rhPtr.rhMouseUsed==0)
			rhPtr.showMouse();
	}
}

// Speaker object
// ------------------------------------------------------------------
function ACT_LOCKCHANNEL()
{	
}
ACT_LOCKCHANNEL.prototype=
{
	execute:function(rhPtr)
	{
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		rhPtr.rhApp.soundPlayer.lockChannel(channel-1);
	}
}

function ACT_PAUSEALLCHANNELS()
{	
}
ACT_PAUSEALLCHANNELS.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rhApp.soundPlayer.pause();
	}
}

function ACT_PAUSECHANNEL()
{	
}
ACT_PAUSECHANNEL.prototype=
{
	execute:function(rhPtr)
	{
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		rhPtr.rhApp.soundPlayer.pauseChannel(channel-1);
	}
}

function ACT_PAUSESAMPLE()
{	
}
ACT_PAUSESAMPLE.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		rhPtr.rhApp.soundPlayer.pauseSample(p.sndHandle);
	}
}

function ACT_PLAYCHANNEL()
{	
}
ACT_PLAYCHANNEL.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		var bPrio=(p.sndFlags&PARAM_SAMPLE.PSOUNDFLAG_UNINTERRUPTABLE)!=0;
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		rhPtr.rhApp.soundPlayer.play(p.sndHandle, 1, channel-1, bPrio);
	}
}

function ACT_PLAYLOOPCHANNEL()
{	
}
ACT_PLAYLOOPCHANNEL.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		var bPrio=(p.sndFlags&PARAM_SAMPLE.PSOUNDFLAG_UNINTERRUPTABLE)!=0;
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		var nLoops=rhPtr.get_EventExpressionInt(this.evtParams[2]);
		rhPtr.rhApp.soundPlayer.play(p.sndHandle, nLoops, channel-1, bPrio);
	}
}

function ACT_PLAYLOOPSAMPLE()
{	
}
ACT_PLAYLOOPSAMPLE.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		var nLoops=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		var bPrio=(p.sndFlags&PARAM_SAMPLE.PSOUNDFLAG_UNINTERRUPTABLE)!=0;
		rhPtr.rhApp.soundPlayer.play(p.sndHandle, nLoops, -1, bPrio);        
	}
}

function ACT_PLAYSAMPLE()
{	
}
ACT_PLAYSAMPLE.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		var bPrio=(p.sndFlags&PARAM_SAMPLE.PSOUNDFLAG_UNINTERRUPTABLE)!=0;
			rhPtr.rhApp.soundPlayer.play(p.sndHandle, 1, -1, bPrio);
	}
}

function ACT_RESUMEALLCHANNELS()
{	
}
ACT_RESUMEALLCHANNELS.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rhApp.soundPlayer.resume();
	}
}

function ACT_RESUMECHANNEL()
{	
}
ACT_RESUMECHANNEL.prototype=
{
	execute:function(rhPtr)
	{
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		rhPtr.rhApp.soundPlayer.resumeChannel(channel-1);
	}
}

function ACT_RESUMESAMPLE()
{	
}
ACT_RESUMESAMPLE.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		rhPtr.rhApp.soundPlayer.resumeSample(p.sndHandle);
	}
}

function ACT_SETCHANNELPOS()
{	
}
ACT_SETCHANNELPOS.prototype=
{
	execute:function(rhPtr)
	{
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var position=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		if (position>=0)
			rhPtr.rhApp.soundPlayer.setPositionChannel(channel-1, position);
	}
}

function ACT_SETCHANNELFREQ()
{	
}
ACT_SETCHANNELFREQ.prototype=
{
	execute:function(rhPtr)
	{
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var freq=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		if (freq>=0)
			rhPtr.rhApp.soundPlayer.setFrequencyChannel(channel-1, freq);
	}
}

function ACT_SETCHANNELVOL()
{	
}
ACT_SETCHANNELVOL.prototype=
{
	execute:function(rhPtr)
	{
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var volume=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		if (volume>=0 && volume<=100)
			rhPtr.rhApp.soundPlayer.setVolumeChannel(channel-1, volume);
	}
}

function ACT_RESUMESAMPLE()
{	
}
ACT_RESUMESAMPLE.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		rhPtr.rhApp.soundPlayer.resumeSample(p.sndHandle);
	}
}

function ACT_SETSAMPLEMAINVOL()
{	
}
ACT_SETSAMPLEMAINVOL.prototype=
{
	execute:function(rhPtr)
	{
		var volume=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		if (volume>=0 && volume<=100)
			rhPtr.rhApp.soundPlayer.setMainVolume(volume);
	}
}

function ACT_SETSAMPLEPOS()
{	
}
ACT_SETSAMPLEPOS.prototype=
{
	execute:function(rhPtr)
	{
		var sample=this.evtParams[0].sndHandle;
		var position=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		if (position>=0)
			rhPtr.rhApp.soundPlayer.setPositionSample(sample, position);
	}
}

function ACT_SETSAMPLEFREQ()
{	
}
ACT_SETSAMPLEFREQ.prototype=
{
	execute:function(rhPtr)
	{
		var sample=this.evtParams[0].sndHandle;
		var freq=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		if (freq>=0)
			rhPtr.rhApp.soundPlayer.setFrequencySample(sample, freq);
	}
}

function ACT_SETSAMPLEVOL()
{	
}
ACT_SETSAMPLEVOL.prototype=
{
	execute:function(rhPtr)
	{
		var sample=this.evtParams[0].sndHandle;
		var volume=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		if (volume>=0 && volume<=100)
			rhPtr.rhApp.soundPlayer.setVolumeSample(sample, volume);
	}
}

function ACT_STOPCHANNEL()
{	
}
ACT_STOPCHANNEL.prototype=
{
	execute:function(rhPtr)
	{
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		rhPtr.rhApp.soundPlayer.stopChannel(channel-1);
	}
}

function ACT_STOPSAMPLE()
{	
}
ACT_STOPSAMPLE.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rhApp.soundPlayer.stopAllSounds();
	}
}

function ACT_STOPSPESAMPLE()
{	
}
ACT_STOPSPESAMPLE.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[0];
		rhPtr.rhApp.soundPlayer.stopSample(p.sndHandle);
	}
}

function ACT_UNLOCKCHANNEL()
{	
}
ACT_UNLOCKCHANNEL.prototype=
{
	execute:function(rhPtr)
	{
		var channel=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		rhPtr.rhApp.soundPlayer.unlockChannel(channel-1);
	}
}

// String object
// ------------------------------------------------------------------
function ACT_STRDESTROY()
{	
}
ACT_STRDESTROY.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo!=null)
		{
			if ((pHo.rsHidden&CRun.COF_FIRSTTEXT)!=0)		
			{
				pHo.ros.obHide();	
				pHo.ros.rsFlags&=~CRSpr.RSFLAG_VISIBLE;
				pHo.hoFlags|=CObject.HOF_NOCOLLISION;
			}
			else
			{
				pHo.hoFlags|=CObject.HOF_DESTROYED;	
				rhPtr.destroy_Add(pHo.hoNumber);
			}
		}
	}
}

function ACT_STRDISPLAY()
{	
}
ACT_STRDISPLAY.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[1];
		rhPtr.txtDoDisplay(this, p.value);	        
	}
}

function ACT_STRDISPLAYDURING()
{	
}
ACT_STRDISPLAYDURING.prototype=
{
	execute:function(rhPtr)
	{
		var p=this.evtParams[1];
		var num=rhPtr.txtDoDisplay(this, p.value);		        
		if (num>=0)
		{
			var p2=this.evtParams[2];
			var hoPtr=rhPtr.rhObjectList[num];
			hoPtr.ros.rsFlash=p2.timer;
			hoPtr.ros.rsFlashCpt=p2.timer;
		}        
	}
}

function ACT_STRDISPLAYSTRING()
{	
}
ACT_STRDISPLAYSTRING.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo!=null)
		{
			pHo.txtChange(-1);
		}        
	}
}

function ACT_STRNEXT()
{	
}
ACT_STRNEXT.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo!=null)
		{
			var num=pHo.rsMini+1;
			pHo.txtChange(num);
		}        
	}
}

function ACT_STRPREV()
{	
}
ACT_STRPREV.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo!=null)
		{
			var num=pHo.rsMini-1;
			if (num<0) 
				num=0;
			pHo.txtChange(num);
		}        
	}
}

function ACT_STRSET()
{	
}
ACT_STRSET.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo!=null)
		{
			var text;
			if (this.evtParams[0].code==31)
				text=this.evtParams[0].value;
			else
				text=rhPtr.get_EventExpressionInt(this.evtParams[0])-1;
			pHo.txtChange(text)			
		}        
	}
}

function ACT_STRSETCOLOUR()
{	
}
ACT_STRSETCOLOUR.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo!=null)
		{
			var color;
			if (this.evtParams[0].code==24)
				color=this.evtParams[0].color;
			else
			{
				color=rhPtr.get_EventExpressionInt(this.evtParams[0]);
				color=CServices.swapRGB(color);
			}
			CRun.setObjectTextColor(pHo, color);        
		}
	}
}

function ACT_STRSETSTRING()
{	
}
ACT_STRSETSTRING.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo!=null)
		{
			var text=rhPtr.get_EventExpressionString(this.evtParams[0]);
			if (pHo.rsTextBuffer==null || (pHo.rsTextBuffer!=null && text!=pHo.rsTextBuffer))
			{
				pHo.txtSetString(text);
				pHo.txtChange(-1);
			}
		}        
	}
}

// Counter object
// ------------------------------------------------------------------
function ACT_CADDVALUE()
{	
}
ACT_CADDVALUE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		var pValue=rhPtr.get_EventExpressionAny(this.evtParams[0]);
		pHo.cpt_Add(pValue);
	}
}

function ACT_CSETCOLOR1()
{	
}
ACT_CSETCOLOR1.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var color;
		if (this.evtParams[0].code==CParam.PARAM_EXPRESSIONNUM)
		{
			color=rhPtr.get_EventExpressionInt(this.evtParams[0]);
			color=CServices.swapRGB(color);
		}
		else
			color=this.evtParams[0].color;
		
		pHo.cpt_SetColor1(color);        
	}
}

function ACT_CSETCOLOR2()
{	
}
ACT_CSETCOLOR2.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var color;
		if (this.evtParams[0].code==CParam.PARAM_EXPRESSIONNUM)
		{
			color=rhPtr.get_EventExpressionInt(this.evtParams[0]);
			color=CServices.swapRGB(color);
		}
		else
			color=this.evtParams[0].color;
		
		pHo.cpt_SetColor2(color);        
	}
}

function ACT_CSETMAX()
{	
}
ACT_CSETMAX.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var pValue=rhPtr.get_EventExpressionAny(this.evtParams[0]);
		pHo.cpt_SetMax(pValue);
	}
}

function ACT_CSETMIN()
{	
}
ACT_CSETMIN.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var pValue=rhPtr.get_EventExpressionAny(this.evtParams[0]);
		pHo.cpt_SetMin(pValue);
	}
}

function ACT_CSETVALUE()
{	
}
ACT_CSETVALUE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var pValue=rhPtr.get_EventExpressionAny(this.evtParams[0]);
		pHo.cpt_ToFloat(pValue);
		pHo.cpt_Change(pValue);
	}
}

function ACT_CSUBVALUE()
{	
}
ACT_CSUBVALUE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var pValue=rhPtr.get_EventExpressionAny(this.evtParams[0]);
		pHo.cpt_Sub(pValue);
	}
}

// Sub-application object
// ------------------------------------------------------------------
function ACT_CCAENDAPP()
{	
}
ACT_CCAENDAPP.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.endApp();	        
	}
}

function ACT_CCAHIDE()
{	
}
ACT_CCAHIDE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.hide();	        
	}
}

function ACT_CCAJUMPFRAME()
{	
}
ACT_CCAJUMPFRAME.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var frame=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		pHo.jumpFrame(frame);	        
	}
}

function ACT_CCANEXTFRAME()
{	
}
ACT_CCANEXTFRAME.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.nextFrame();	        
	}
}

function ACT_CCAPAUSEAPP()
{	
}
ACT_CCAPAUSEAPP.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.pause();	        
	}
}

function ACT_CCAPREVIOUSFRAME()
{	
}
ACT_CCAPREVIOUSFRAME.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.previousFrame();	        
	}
}

function ACT_CCARESTARTAPP()
{	
}
ACT_CCARESTARTAPP.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.restartApp();	        
	}
}

function ACT_CCARESTARTFRAME()
{	
}
ACT_CCARESTARTFRAME.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.restartFrame();	        
	}
}

function ACT_CCARESUMEAPP()
{	
}
ACT_CCARESUMEAPP.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.resume();	        
	}
}

function ACT_CCASETGLOBALSTRING()
{	
}
ACT_CCASETGLOBALSTRING.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var number=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var s=rhPtr.get_EventExpressionString(this.evtParams[1]);
		
		pHo.setGlobalString(number, s);
	}
}

function ACT_CCASETGLOBALVALUE()
{	
}
ACT_CCASETGLOBALVALUE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var number=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var value=rhPtr.get_EventExpressionAny(this.evtParams[1]);
		
		pHo.setGlobalValue(number, value);
	}
}

function ACT_CCASHOW()
{	
}
ACT_CCASHOW.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.show();	        
	}
}


// Player object
// ------------------------------------------------------------------
function ACT_ADDLIVES()
{	
}
ACT_ADDLIVES.prototype=
{
	execute:function(rhPtr)
	{
		var value=rhPtr.get_EventExpressionInt(this.evtParams[0]);	
		var joueur=this.evtOi;			
		value=rhPtr.rhApp.getLives()[joueur]+value;
		rhPtr.actPla_FinishLives(joueur, value);
	}
}

function ACT_NOINPUT()
{	
}
ACT_NOINPUT.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rh2InputMask[this.evtOi]=0;
	}
}

function ACT_RESTINPUT()
{	
}
ACT_RESTINPUT.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rh2InputMask[this.evtOi]=0xFF;	
	}
}

function ACT_SETINPUT()
{	
}
ACT_SETINPUT.prototype=
{
	execute:function(rhPtr)
	{
		var input=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		if (input>CRunApp.CTRLTYPE_KEYBOARD)
			return;
		if (input==CRunApp.CTRLTYPE_MOUSE)
			input=CRunApp.CTRLTYPE_KEYBOARD;
		var joueur=this.evtOi;
		if ( joueur>=4 )
			return;
		rhPtr.rhApp.getCtrlType()[joueur]=input;

	}
}

function ACT_SETINPUTKEY()
{	
}
ACT_SETINPUTKEY.prototype=
{
	execute:function(rhPtr)
	{
		var touche=rhPtr.get_EventExpressionInt(this.evtParams[0]);	
		if (touche>=8)	
			return;
		var joueur=this.evtOi;
		if ( joueur >= 4 ) 
			return;
		var key=evtParams[1].key;
		rhPtr.rhApp.pcCtrlKeys[joueur*CRunApp.MAX_KEY+touche]=param.key;        
	}
}

function ACT_SETLIVES()
{	
}
ACT_SETLIVES.prototype=
{
	execute:function(rhPtr)
	{
		var value=rhPtr.get_EventExpressionInt(this.evtParams[0]);	
		var joueur=this.evtOi;		
		rhPtr.actPla_FinishLives(joueur, value);
	}
}

function ACT_SETPLAYERNAME()
{	
}
ACT_SETPLAYERNAME.prototype=
{
	execute:function(rhPtr)
	{
		var joueur= this.evtOi;
		if ( joueur>=CRunApp.MAX_PLAYER )
			return;
		var pString=rhPtr.get_EventExpressionString(this.evtParams[0]);
		rhPtr.rhApp.playerNames[joueur]=pString;
	}
}

function ACT_SETSCORE()
{	
}
ACT_SETSCORE.prototype=
{
	execute:function(rhPtr)
	{
		var value=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var joueur=this.evtOi;	
		var scores=rhPtr.rhApp.getScores();
		scores[joueur]=value;	
		
		rhPtr.update_PlayerObjects(joueur, COI.OBJ_SCORE, scores[joueur]);        
	}
}

function ACT_SUBLIVES()
{	
}
ACT_SUBLIVES.prototype=
{
	execute:function(rhPtr)
	{
		var value=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var joueur=this.evtOi;		
		value=rhPtr.rhApp.getLives()[joueur]-value;
		rhPtr.actPla_FinishLives(joueur, value);
	}
}

function ACT_SUBSCORE()
{	
}
ACT_SUBSCORE.prototype=
{
	execute:function(rhPtr)
	{
 		var value=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var joueur=this.evtOi;	
		var scores=rhPtr.rhApp.getScores();
		scores[joueur]-=value;		
		rhPtr.update_PlayerObjects(joueur, COI.OBJ_SCORE, scores[joueur]);        
	}
}

function ACT_ADDSCORE()
{	
}
ACT_ADDSCORE.prototype=
{
	execute:function(rhPtr)
	{
 		var value=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var joueur=this.evtOi;	
		var scores=rhPtr.rhApp.getScores();
		scores[joueur]+=value;		
		rhPtr.update_PlayerObjects(joueur, COI.OBJ_SCORE, scores[joueur]);        
	}
}


// Timer object
// -------------------------------------------------------------------
function ACT_SETTIMER()
{	
}
ACT_SETTIMER.prototype=
{
	execute:function(rhPtr)
	{
		var newTime;
		if (this.evtParams[0].code==22)
			newTime=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		else
			newTime=this.evtParams[0].timer;
		
		var time=rhPtr.rhApp.timer;
		rhPtr.rhTimer=newTime;
		rhPtr.rhTimerOld=time-rhPtr.rhTimer;

		rhPtr.rhEvtProg.restartTimerEvents();
	}
}

// Storyboard object
// -------------------------------------------------------------------
function ACT_CDISPLAY()
{	
}
ACT_CDISPLAY.prototype=
{
	execute:function(rhPtr)
	{
		var position=this.evtParams[0];
		var pInfo=new CPositionInfo();
		position.read_Position(rhPtr, 0, pInfo);
		rhPtr.setDisplay(pInfo.x, pInfo.y, pInfo.layer, 3);
	}
}

function ACT_CDISPLAYX()
{	
}
ACT_CDISPLAYX.prototype=
{
	execute:function(rhPtr)
	{
		var x=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		rhPtr.setDisplay(x, 0, -1, 1);
	}
}

function ACT_CDISPLAYY()
{	
}
ACT_CDISPLAYY.prototype=
{
	execute:function(rhPtr)
	{
		var y=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		rhPtr.setDisplay(0, y, -1, 2);
	}
}

function ACT_SETFRAMEBDKCOLOR()
{	
}
ACT_SETFRAMEBDKCOLOR.prototype=
{
	execute:function(rhPtr)
	{
		var color;
		if ( this.evtParams[0].code==24)		// PARAM_COLOUR
			color=this.evtParams[0].color;
		else
		{
			color=rhPtr.get_EventExpressionInt(this.evtParams[0]);
			color=CServices.swapRGB(color);
		}
		rhPtr.rhFrame.leBackground = color;
		rhPtr.rhApp.frameColor=color;
	}
}

function ACT_CDISPLAYY()
{	
}
ACT_CDISPLAYY.prototype=
{
	execute:function(rhPtr)
	{
		var y=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		rhPtr.setDisplay(0, y, -1, 2);
	}
}

function ACT_DELALLCREATEDBKD()
{	
}
ACT_DELALLCREATEDBKD.prototype=
{
	execute:function(rhPtr)
	{
		var layer=rhPtr.get_EventExpressionInt(this.evtParams[0])-1;
		rhPtr.deleteAllBackdrop2(layer);
	}
}

function ACT_DELCREATEDBKDAT()
{	
}
ACT_DELCREATEDBKDAT.prototype=
{
	execute:function(rhPtr)
	{
		var layer=rhPtr.get_EventExpressionInt(this.evtParams[0])-1;
		var x=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		var y=rhPtr.get_EventExpressionInt(this.evtParams[2]);
		var bFineDetection=rhPtr.get_EventExpressionInt(this.evtParams[3])!=0;
	        
		rhPtr.deleteBackdropAt(layer, x, y, bFineDetection);
	}
}

function ACT_ENDGAME()
{	
}
ACT_ENDGAME.prototype=
{
	execute:function(rhPtr)
	{
//		rhPtr.rhQuit=CRun.LOOPEXIT_ENDGAME;	No effect in HTML5
	}
}

function ACT_GOLEVEL()
{	
}
ACT_GOLEVEL.prototype=
{
	execute:function(rhPtr)
	{
		var level;
		if (this.evtParams[0].code==26)  	    
		{
			level=this.evtParams[0].value;
			if (rhPtr.rhApp.HCellToNCell(level)==-1) 
				return;
		}
		else
		{
			level=rhPtr.get_EventExpressionInt(this.evtParams[0])-1;
			if (level<0 || level>=4096) 
				return;		
			if (rhPtr.rhApp.bShiftFrameNumber)
				level++;
			level|=0x8000;
		}
		rhPtr.rhQuit=CRun.LOOPEXIT_GOTOLEVEL;
		rhPtr.rhQuitParam=level;
	}
}

function ACT_NEXTLEVEL()
{	
}
ACT_NEXTLEVEL.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rhQuit=CRun.LOOPEXIT_NEXTLEVEL;
	}
}

function ACT_PAUSEKEY()
{	
}
ACT_PAUSEKEY.prototype=
{
	execute:function(rhPtr)
	{
       	rhPtr.rh4PauseKey=this.evtParams[0].key;
		rhPtr.rhQuit=CRun.LOOPEXIT_PAUSEGAME;	       		        
	}
}

function ACT_FULLSCREENMODE()
{	
}
ACT_FULLSCREENMODE.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rhApp.enterFullScreen();
	}
}

function ACT_WINDOWEDMODE()
{	
}
ACT_WINDOWEDMODE.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rhApp.exitFullScreen();
	}
}

function ACT_PAUSEANYKEY()
{	
}
ACT_PAUSEANYKEY.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rh4PauseKey=-1;
		rhPtr.rhQuit=CRun.LOOPEXIT_PAUSEGAME;
	}
}

function ACT_PLAYDEMO()
{	
}
ACT_PLAYDEMO.prototype=
{
	execute:function(rhPtr)
	{
// TODO		
/*		var pFilename:String;
		if ( evtParams[0].code==63 )	    // PARAM_FILENAME2
			pFilename=(PARAM_STRING(evtParams[0])).string;
		else
			pFilename=rhPtr.get_EventExpressionString(evtParams[0]);

		if (rhPtr.rh4Demo==null)
		{
			rhPtr.rh4Demo=new CDemoRecord(rhPtr, pFilename);
			rhPtr.rh4Demo.startPlaying();
		}
*/		
	}
}

function ACT_PREVLEVEL()
{	
}
ACT_PREVLEVEL.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rhQuit=CRun.LOOPEXIT_PREVLEVEL;
	}
}

function ACT_SETFRAMEHEIGHT()
{	
}
ACT_SETFRAMEHEIGHT.prototype=
{
	execute:function(rhPtr)
	{
		var newHeight= rhPtr.get_EventExpressionInt(this.evtParams[0]);

		var nOldHeight= rhPtr.rhFrame.leHeight;
		rhPtr.rhFrame.leHeight = newHeight;

		if ( nOldHeight == rhPtr.rhFrame.leVirtualRect.bottom )
			rhPtr.rhFrame.leVirtualRect.bottom = rhPtr.rhLevelSy = newHeight;

		var n;
		for (n=0; n<rhPtr.rhFrame.nLayers; n++)
			rhPtr.rhFrame.layers[n].resetLevelBackground();
		rhPtr.drawLevel();
	}
}

function ACT_SETFRAMEWIDTH()
{	
}
ACT_SETFRAMEWIDTH.prototype=
{
	execute:function(rhPtr)
	{
		var newWidth= rhPtr.get_EventExpressionInt(this.evtParams[0]);

		var nOldWidth= rhPtr.rhFrame.leWidth;
		rhPtr.rhFrame.leWidth = newWidth;

		if ( nOldWidth == rhPtr.rhFrame.leVirtualRect.right )
			rhPtr.rhFrame.leVirtualRect.right = rhPtr.rhLevelSx = newWidth;

		var n;
		for (n=0; n<rhPtr.rhFrame.nLayers; n++)
			rhPtr.rhFrame.layers[n].resetLevelBackground();
		rhPtr.drawLevel();
	}
}

function ACT_SETVIRTUALHEIGHT()
{	
}
ACT_SETVIRTUALHEIGHT.prototype=
{
	execute:function(rhPtr)
	{
		var newHeight= rhPtr.get_EventExpressionInt(this.evtParams[0]);

		if ( newHeight < rhPtr.rhFrame.leHeight )
			newHeight = rhPtr.rhFrame.leHeight;
		if ( newHeight>0x7FFFF000 )
			newHeight = 0x7FFFF000;

		if ( rhPtr.rhFrame.leVirtualRect.bottom != newHeight )
			rhPtr.rhFrame.leVirtualRect.bottom = rhPtr.rhLevelSy = newHeight;
	}
}

function ACT_SETVIRTUALWIDTH()
{	
}
ACT_SETVIRTUALWIDTH.prototype=
{
	execute:function(rhPtr)
	{
		var newWidth= rhPtr.get_EventExpressionInt(this.evtParams[0]);

		if ( newWidth < rhPtr.rhFrame.leWidth )
			newWidth = rhPtr.rhFrame.leWidth;
		if ( newWidth>0x7FFFF000 )
			newWidth = 0x7FFFF000;

		if ( rhPtr.rhFrame.leVirtualRect.right != newWidth )
			rhPtr.rhFrame.leVirtualRect.right = rhPtr.rhLevelSx = newWidth;
	}
}

// Active object
// ---------------------------------------------------------------------
function ACT_SPRFRONT()
{	
}
ACT_SPRFRONT.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null)
			return;
		var index=pHo.getChildMaxIndex();
		pHo.setChildIndex(index-1);
	}
}

function ACT_SPRPASTE()
{	
}
ACT_SPRPASTE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.roa!=null)
			pHo.roa.animIn(0);
		rhPtr.activeToBackdrop(pHo, this.evtParams[0].value);
	}
}

function ACT_SPRSETANGLE()
{	
}
ACT_SPRSETANGLE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var nAngle= rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var bAntiA= false;
		if (rhPtr.get_EventExpressionInt(this.evtParams[1])!=0)
			bAntiA=true;

		nAngle %= 360;
		if ( nAngle < 0 )
			nAngle += 360;

		var bOldAntiA= false;
		if ( (pHo.ros.rsFlags&CRSpr.RSFLAG_ROTATE_ANTIA)!= 0)
			bOldAntiA=true;
		if ( pHo.roc.rcAngle!=nAngle || bOldAntiA!=bAntiA )
		{
			pHo.roc.rcAngle=nAngle;
			pHo.ros.rsFlags &= ~CRSpr.RSFLAG_ROTATE_ANTIA;
			if ( bAntiA )
				pHo.ros.rsFlags |= CRSpr.RSFLAG_ROTATE_ANTIA;
			pHo.roc.rcChanged = true;

            var ifo= pHo.hoAdRunHeader.rhApp.imageBank.getImageInfoEx(pHo.roc.rcImage, pHo.roc.rcAngle, pHo.roc.rcScaleX, pHo.roc.rcScaleY);
            pHo.hoImgWidth=ifo.width;
            pHo.hoImgHeight=ifo.height;
            pHo.hoImgXSpot=ifo.xSpot;
            pHo.hoImgYSpot=ifo.ySpot;	
		}
	}
}

function ACT_SPRREPLACECOLOR()
{	
	this.replace=null;
}
ACT_SPRREPLACECOLOR.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		pHo.roa.animIn(0);

		var oldColor;
		if (this.evtParams[0].code==24)
			oldColor=this.evtParams[0].color;
		else
		{
			oldColor=rhPtr.get_EventExpressionInt(this.evtParams[0]);
			oldColor=CServices.swapRGB(oldColor);
		}

		var newColor;
		if (this.evtParams[1].code==24)	    // PARAM_COLOUR)
			newColor=evtParams[1].color;
		else
		{
			newColor=rhPtr.get_EventExpressionInt(this.evtParams[1]);
			newColor=CServices.swapRGB(newColor);
		}
	   	if (this.replace==null)
	   		this.replace=new CReplaceColor();
        this.replace.replaceColor(rhPtr, pHo, newColor, oldColor);
	}
}


function ACT_SPRSETSCALE()
{	
}
ACT_SPRSETSCALE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var fScale= rhPtr.get_EventExpressionDouble(this.evtParams[0]);
		if (fScale<0)
			fScale=0;
			
		var bResample=false;
		if (rhPtr.get_EventExpressionInt(this.evtParams[1])!=0)
			bResample=true;
			
		pHo.ros.rsFlags &= ~CRSpr.RSFLAG_ROTATE_ANTIA;
		if ( bResample )
			pHo.ros.rsFlags |= CRSpr.RSFLAG_ROTATE_ANTIA;			
		pHo.setScale(fScale, fScale);
	}
}

function ACT_SPRSETSCALEX()
{	
}
ACT_SPRSETSCALEX.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var fScale= rhPtr.get_EventExpressionDouble(this.evtParams[0]);
		if (fScale<0)
			fScale=0;
			
		var bResample=false;
		if (rhPtr.get_EventExpressionInt(evtParams[1])!=0)
			bResample=true;
		pHo.ros.rsFlags &= ~CRSpr.RSFLAG_ROTATE_ANTIA;
		if ( bResample )
			pHo.ros.rsFlags |= CRSpr.RSFLAG_ROTATE_ANTIA;			

		pHo.setScale(fScale, pHo.roc.rcScaleY);
	}
}

function ACT_SPRSETSCALEY()
{	
}
ACT_SPRSETSCALEY.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var fScale= rhPtr.get_EventExpressionDouble(this.evtParams[0]);
		if (fScale<0)
			fScale=0;

		var bResample=false;
		if (rhPtr.get_EventExpressionInt(evtParams[1])!=0)
			bResample=true;
		pHo.ros.rsFlags &= ~CRSpr.RSFLAG_ROTATE_ANTIA;
		if ( bResample )
			pHo.ros.rsFlags |= CRSpr.RSFLAG_ROTATE_ANTIA;			

		pHo.setScale(pHo.roc.rcScaleX, fScale);
	}
}

function ACT_SPRADDBKD()
{	
}
ACT_SPRADDBKD.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		// Un cran d'animation sans effet
		if (pHo.roa!=null)
			pHo.roa.animIn(0);

		rhPtr.activeToBackdrop(pHo, this.evtParams[0].value);
	}
}

// Question object
// ---------------------------------------------------------------------
function ACT_QASK()
{	
}
ACT_QASK.prototype=
{
	execute:function(rhPtr)
	{
		if ((this.evtOiList&0x8000)==0)
		{
			this.qstCreate(rhPtr, this.evtOi);
			return;
		}

		if ((this.evtOiList&0x7FFF)!=0x7FFF)
		{
			var qoil=rhPtr.rhEvtProg.qualToOiList[this.evtOiList&0x7FFF];	    
			var qoi;
			for (qoi=0; qoi<qoil.qoiList.length; qoi+=2)
				this.qstCreate(rhPtr, qoil.qoiList[qoi]);
		}        
	},
	qstCreate:function(rhPtr, oi)
	{
		var c=this.evtParams[0];
		var info=new CPositionInfo();
		
		if (c.read_Position(rhPtr, 0x10, info))
		{
			rhPtr.f_CreateObject(c.cdpHFII, oi, info.x, info.y, info.dir, 0, rhPtr.rhFrame.nLayers-1, -1);
		}
	}	    
}

function ACT_RESTARTGAME()
{	
}
ACT_RESTARTGAME.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rhQuit=CRun.LOOPEXIT_NEWGAME;
	}
}

function ACT_RESTARTLEVEL()
{	
}
ACT_RESTARTLEVEL.prototype=
{
	execute:function(rhPtr)
	{
		rhPtr.rhQuit=CRun.LOOPEXIT_RESTART;
	}
}


// Create object
// ---------------------------------------------------------------------
function ACT_CREATE()
{	
}
ACT_CREATE.prototype=
{
	execute:function(rhPtr)
	{
		var pEvp=this.evtParams[0];
		var pInfo=new CPositionInfo();
		if (pEvp.read_Position(rhPtr, 0x11, pInfo))
		{
			if (pInfo.bRepeat)
			{
				this.evtFlags|=CAct.ACTFLAGS_REPEAT;	
				rhPtr.rhEvtProg.rh2ActionLoop=true;
			}
			else
			{
				this.evtFlags&=~CAct.ACTFLAGS_REPEAT;	
			}
			var number=rhPtr.f_CreateObject(pEvp.cdpHFII, pEvp.cdpOi, pInfo.x, pInfo.y, pInfo.dir, 0, pInfo.layer, -1);
			if (number>=0)
			{
				var pHo=rhPtr.rhObjectList[number];
				rhPtr.rhEvtProg.evt_AddCurrentObject(pHo);
			}
		}
	}
}

// Common object actions
// -----------------------------------------------------------------
function ACT_EXTADDVAR()
{	
}
ACT_EXTADDVAR.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var num;
		if (this.evtParams[0].code==53)
			num=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		else
			num=this.evtParams[0].value;

		if (num>=0 && num<CRVal.VALUES_NUMBEROF_ALTERABLE)
		{
			if (pHo.rov!=null)
			{
				var pValue2=rhPtr.get_EventExpressionAny(this.evtParams[1]);
				pHo.rov.rvValues[num]+=pValue2;
			}
		}        		
	}
}

function ACT_EXTBOUNCE()
{	
}
ACT_EXTBOUNCE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rom!=null)
			pHo.rom.rmMovement.bounce();
	}
}

function ACT_EXTBRANCHNODE()
{	
}
ACT_EXTBRANCHNODE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var pName=rhPtr.get_EventExpressionString(this.evtParams[0]);

		if (pHo.roc.rcMovementType==CMoveDef.MVTYPE_TAPED)
		{    
			pHo.rom.rmMovement.mtBranchNode(pName);
		}
	}
}

function ACT_EXTCHGFLAG()
{	
}
ACT_EXTCHGFLAG.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rov!=null)
		{
			var number=rhPtr.get_EventExpressionInt(this.evtParams[0]);
			var mask=1<<number;
			if ((pHo.rov.rvValueFlags&mask)!=0)
				pHo.rov.rvValueFlags&=~mask;
			else
				pHo.rov.rvValueFlags|=mask;
		}	
	}
}

function ACT_EXTCLRFLAG()
{	
}
ACT_EXTCLRFLAG.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rov!=null)
		{
			var number=rhPtr.get_EventExpressionInt(this.evtParams[0]);
			pHo.rov.rvValueFlags&=~(1<<number);
		}	
	}
}

function ACT_EXTDESTROY()
{	
}
ACT_EXTDESTROY.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.hoType==3)
		{
			var pText=pHo;
			if ((pText.rsHidden&CRun.COF_FIRSTTEXT)!=0)			
			{
				pHo.ros.obHide();								
				pHo.ros.rsFlags&=~CRSpr.RSFLAG_VISIBLE;
				pHo.hoFlags|=CObject.HOF_NOCOLLISION;
			}
			else
			{
				pHo.hoFlags|=CObject.HOF_DESTROYED;				
				rhPtr.destroy_Add(pHo.hoNumber);
			}
			return;
		}
		if ((pHo.hoFlags&CObject.HOF_DESTROYED)==0)
		{
			pHo.hoFlags|=CObject.HOF_DESTROYED;
			if ( (pHo.hoOEFlags&CObjectCommon.OEFLAG_ANIMATIONS)!=0 || (pHo.hoOEFlags&CObjectCommon.OEFLAG_SPRITES)!=0)
			{
				rhPtr.init_Disappear(pHo);
			}
			else
			{
				pHo.hoCallRoutine=false;
				rhPtr.destroy_Add(pHo.hoNumber);
			}
		}
	}
}

function ACT_EXTDISPATCHVAR()
{	
}
ACT_EXTDISPATCHVAR.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var num;
		if (this.evtParams[0].code==53)
			num=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		else
			num=this.evtParams[0].value;

		var pBuffer=this.evtParams[2];
		if (rhPtr.rhEvtProg.rh2ActionLoopCount==0)
			pBuffer.value=rhPtr.get_EventExpressionInt(this.evtParams[1]);
		else
			pBuffer.value++;
		if (pHo.rov!=null)
			pHo.rov.rvValues[num]=pBuffer.value;
	}
}

function ACT_EXTDISPLAYDURING()
{	
}
ACT_EXTDISPLAYDURING.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.ros!=null)
		{
			pHo.ros.obHide();
			pHo.ros.rsFlags&=~CRSpr.RSFLAG_VISIBLE;

			pHo.ros.rsFlash=this.evtParams[0].timer;
			pHo.ros.rsFlashCpt=this.evtParams[0].timer;	
		}
	}
}

function ACT_EXTFORCEANIM()
{	
}
ACT_EXTFORCEANIM.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var ani;
		if (this.evtParams[0].code==10)	    
			ani=this.evtParams[0].value;
		else
			ani=rhPtr.get_EventExpressionInt(this.evtParams[0]);

		pHo.roa.animation_Force(ani);
		pHo.roc.rcChanged=true;	
	}
}

function ACT_EXTFORCEDIR()
{	
}
ACT_EXTFORCEDIR.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var ani;
		if (this.evtParams[0].code==29)
			ani=rhPtr.get_Direction(this.evtParams[0].value );
		else
			ani=rhPtr.get_EventExpressionInt(this.evtParams[0]);

		pHo.roa.animDir_Force(ani);
		pHo.roc.rcChanged=true;		
	}
}

function ACT_EXTFORCEFRAME()
{	
}
ACT_EXTFORCEFRAME.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var frame=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		pHo.roa.animFrame_Force(frame);
		pHo.roc.rcChanged=true;         
	}
}

function ACT_EXTFORCESPEED()
{	
}
ACT_EXTFORCESPEED.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var speed;
		speed=rhPtr.get_EventExpressionInt(this.evtParams[0]);

		pHo.roa.animSpeed_Force(speed);
	}
}

function ACT_EXTGOTONODE()
{	
}
ACT_EXTGOTONODE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var pName=rhPtr.get_EventExpressionString(this.evtParams[0]);

		if (pHo.roc.rcMovementType==CMoveDef.MVTYPE_TAPED)
		{    
			pHo.rom.rmMovement.mtGotoNode(pName);
		}
	}
}

function ACT_EXTHIDE()
{	
}
ACT_EXTHIDE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		CRun.objectHide(pHo);
	}
}

function ACT_EXTINKEFFECT()
{	
}
ACT_EXTINKEFFECT.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
				
		if (pHo.ros != null)
		{
			var p= this.evtParams[0];
			var param1=p.value1;
			var param2=p.value2;
			if (param1==CRSpr.BOP_BLEND)
				param2=0;
			pHo.ros.modifSpriteEffect(param1, param2);
		}
	}
}

function ACT_EXTLOOKAT()
{	
}
ACT_EXTLOOKAT.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var position=this.evtParams[0];
		var pInfo=new CPositionInfo();
		if (position.read_Position(rhPtr, 0, pInfo))
		{
			var x=pInfo.x;
			var y=pInfo.y;
			x-=pHo.hoX;
			y-=pHo.hoY;
			var dir=CRun.get_DirFromPente(x, y);
			dir&=31;
			if (pHo.roc.rcDir!=dir)
			{
				pHo.roc.rcDir=dir;
				pHo.roc.rcChanged=true;
				pHo.rom.rmMovement.setDir(dir);
			}
		}        
	}
}

function ACT_EXTMAXSPEED()
{	
}
ACT_EXTMAXSPEED.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var s=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		if (pHo.rom!=null)
			pHo.rom.rmMovement.setMaxSpeed(s);
	}
}

function ACT_EXTMOVEAFTER()
{	
}
ACT_EXTMOVEAFTER.prototype=
{
	execute:function(rhPtr)
	{
 		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.ros!=null)
		{
			var pHo2=rhPtr.rhEvtProg.get_ParamActionObjects(this.evtParams[0].oiList, this);
			if ( pHo2 == null )
				return;
			var pos;
			var pos1=pHo2.getChildIndex();
			var pos2=pHo.getChildIndex();
			if (pos2<pos1)
				pHo.setChildIndex(pos1+1);
		}
	}
}

function ACT_EXTMOVEBEFORE()
{	
}
ACT_EXTMOVEBEFORE.prototype=
{
	execute:function(rhPtr)
	{
 		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.ros!=null)
		{
			var pHo2=rhPtr.rhEvtProg.get_ParamActionObjects(this.evtParams[0].oiList, this);
			if ( pHo2 == null )
				return;
			var pos1=pHo2.getChildIndex();
			var pos2=pHo.getChildIndex();
			if (pos1<pos2)
				pHo.setChildIndex(pos1);
		}
	}
}

function ACT_EXTMOVETOLAYER()
{	
}
ACT_EXTMOVETOLAYER.prototype=
{
	execute:function(rhPtr)
	{
 		var hoPtr=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (hoPtr==null) 
			return;

		if (hoPtr.ros!=null)
		{
			var nLayer= rhPtr.get_EventExpressionInt(this.evtParams[0]);

			if ( nLayer > 0 && nLayer <= rhPtr.rhFrame.nLayers && hoPtr.hoLayer!=nLayer-1)
			{
				nLayer -= 1;
				
				var pLayer=rhPtr.rhFrame.layers[nLayer];
				if (hoPtr.ros!=null)
				{
					hoPtr.hoLayer=nLayer;
					hoPtr.ros.rsLayer=nLayer;
					hoPtr.delSprite();
					hoPtr.ros.createSprite(false);
				}
			}
		}
	}
}

function ACT_EXTNEXTMOVE()
{	
}
ACT_EXTNEXTMOVE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rom!=null)
			pHo.rom.nextMovement(pHo);
	}
}

function ACT_EXTPREVMOVE()
{	
}
ACT_EXTPREVMOVE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rom!=null)
			pHo.rom.previousMovement(pHo);
	}
}

function ACT_EXTRESTANIM()
{	
}
ACT_EXTRESTANIM.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		pHo.roa.animation_Restore();
		pHo.roc.rcChanged=true;
	}
}

function ACT_EXTRESTDIR()
{	
}
ACT_EXTRESTDIR.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		pHo.roa.animDir_Restore();
		pHo.roc.rcChanged=true;
	}
}

function ACT_EXTRESTFRAME()
{	
}
ACT_EXTRESTFRAME.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		pHo.roa.animFrame_Restore();
		pHo.roc.rcChanged=true;
	}
}

function ACT_EXTRESTSPEED()
{	
}
ACT_EXTRESTSPEED.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		pHo.roa.animSpeed_Restore();
	}
}
function ACT_EXTREVERSE()
{	
}
ACT_EXTREVERSE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rom!=null)
			pHo.rom.rmMovement.reverse();
	}
}

function ACT_EXTSELMOVE()
{	
}
ACT_EXTSELMOVE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var n;
		if (this.evtParams[0].code==22)	
			n=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		else
			n=this.evtParams[0].value;
		if (pHo.rom!=null)
			pHo.rom.selectMovement(pHo, n);
	}
}

function ACT_EXTSETACCELERATION()
{	
}
ACT_EXTSETACCELERATION.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var acc=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		pHo.rom.rmMovement.setAcc(acc);
	}
}

function ACT_EXTSETALPHACOEF()
{	
}
ACT_EXTSETALPHACOEF.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		if (pHo.ros == null)
			return;

		var alpha= CServices.clamp(255-rhPtr.get_EventExpressionInt(this.evtParams[0]), 0, 255);
		var wasSemi = ((pHo.ros.rsEffect & CRSpr.BOP_RGBAFILTER) == 0);
		pHo.ros.rsEffect = (pHo.ros.rsEffect & CRSpr.BOP_MASK) | CRSpr.BOP_RGBAFILTER;
		
		var rgbaCoeff= 0x00FFFFFF;
		
		if (!wasSemi)
			rgbaCoeff = pHo.ros.rsEffectParam;
		
		var alphaPart= alpha << 24;
		var rgbPart= (rgbaCoeff & 0x00FFFFFF);
		pHo.ros.rsEffectParam = alphaPart | rgbPart;
		
		pHo.ros.modifSpriteEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
	}
}

function ACT_EXTSETBOLD()
{	
}
ACT_EXTSETBOLD.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var bFlag=rhPtr.get_EventExpressionInt(this.evtParams[0]);

		var info=CRun.getObjectFont(pHo);
		if (bFlag!=0)
			info.lfWeight=700;
		else
			info.lfWeight=400;
		
		CRun.setObjectFont(pHo, info, null);        
	}
}

function ACT_EXTSETDECELERATION()
{	
}
ACT_EXTSETDECELERATION	.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var dec=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		pHo.rom.rmMovement.setDec(dec);
	}
}

function ACT_EXTSETDIR()
{	
}
ACT_EXTSETDIR.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var dir;
		if (this.evtParams[0].code==29)
			dir=rhPtr.get_Direction(this.evtParams[0].value);
		else
			dir=rhPtr.get_EventExpressionInt(this.evtParams[0]);

		dir&=31;
		if (pHo.roc.rcDir!=dir)
		{
			pHo.roc.rcDir=dir;
			pHo.roc.rcChanged=true;
			pHo.rom.rmMovement.setDir(dir);

			if (pHo.hoType==2)	
				pHo.roa.animIn(0);
		}
	}
}

function ACT_EXTSETDIRECTIONS()
{	
}
ACT_EXTSETDIRECTIONS.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var dirs=this.evtParams[0].value;
		pHo.rom.rmMovement.set8Dirs(dirs);        
	}
}

function ACT_EXTSETEFFECT()
{	
}
ACT_EXTSETEFFECT.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var effectName= this.evtParams[0].string;
		var effect= CRSpr.BOP_COPY;
		if (effectName != null && effectName.length!= 0)
		{
			if (effectName == "Add")
				effect = CRSpr.BOP_ADD;
			else if (effectName == "Invert")
				effect = CRSpr.BOP_INVERT;
			else if (effectName == "Sub")
				effect = CRSpr.BOP_SUB;
			else if (effectName == "Mono")
				effect = CRSpr.BOP_MONO;
			else if (effectName == "Blend")
				effect = CRSpr.BOP_BLEND;
			else if (effectName == "XOR")
				effect = CRSpr.BOP_XOR;
			else if (effectName == "OR")
				effect = CRSpr.BOP_OR;
			else if (effectName == "AND")
				effect = CRSpr.BOP_AND;				
		}
		pHo.ros.modifSpriteEffect(effect, pHo.ros.rsEffectParam);
	}
}

function ACT_EXTSETEFFECTPARAM()
{	
}
ACT_EXTSETEFFECTPARAM.prototype=
{
	execute:function(rhPtr)
	{
		
	}
}

function ACT_EXTSETFLAG()
{	
}
ACT_EXTSETFLAG.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rov!=null)
		{
			var number=rhPtr.get_EventExpressionInt(this.evtParams[0]);
			pHo.rov.rvValueFlags|=(1<<number);
		}	
	}
}

function ACT_EXTSETFONTNAME()
{	
}
ACT_EXTSETFONTNAME.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var name=rhPtr.get_EventExpressionString(this.evtParams[0]);
		var info=CRun.getObjectFont(pHo);
		info.lfFaceName=name;
		CRun.setObjectFont(pHo, info, null);
	}
}

function ACT_EXTSETFONTSIZE()
{	
}
ACT_EXTSETFONTSIZE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var newSize=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var bResize=rhPtr.get_EventExpressionInt(this.evtParams[1]);

		var lf=CRun.getObjectFont(pHo);

		var oldSize=lf.lfHeight;
		lf.lfHeight = newSize;

		if (bResize==0)
			CRun.setObjectFont(pHo, lf, null);
		else
		{
			if (newSize!=oldSize)
			{
				var rc=new CRect();
				var coef= 1.0;
				if ( oldSize != 0 )
					coef=newSize/oldSize;
				rc.right=Math.floor(pHo.hoImgWidth*coef);
				rc.bottom=Math.floor(pHo.hoImgHeight*coef);
				rc.left=0;
				rc.top=0;
				CRun.setObjectFont(pHo, lf, rc);
			}
		}
	}
}

function ACT_EXTSETGRAVITY()
{	
}
ACT_EXTSETGRAVITY.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var grav=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		pHo.rom.rmMovement.setGravity(grav);
	}
}

function ACT_EXTSETITALIC()
{	
}
ACT_EXTSETITALIC.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var bFlag=rhPtr.get_EventExpressionInt(this.evtParams[0]);

		var info=CRun.getObjectFont(pHo);
		info.lfItalic=bFlag;	
		CRun.setObjectFont(pHo, info, null);        
	}
}

function ACT_EXTSETPOS()
{	
}
ACT_EXTSETPOS.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var position=this.evtParams[0];
		var pInfo=new CPositionInfo();
		if (position.read_Position(rhPtr, 1, pInfo))
		{			
			CRun.setXPosition(pHo, pInfo.x);
			CRun.setYPosition(pHo, pInfo.y);
			if (pInfo.dir!=-1)
			{
				var dir=pInfo.dir&=31;
				if (pHo.roc.rcDir!=dir)
				{
					pHo.roc.rcDir=dir;
					pHo.roc.rcChanged=true;
					pHo.rom.rmMovement.setDir(dir);
					
					if (pHo.hoType==2)	
						pHo.roa.animIn(0);
				}			
			}
		}        
	}
}

function ACT_EXTSETRGBCOEF()
{	
}
ACT_EXTSETRGBCOEF.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		if (pHo.ros == null)
			return;
		
		var argb=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		var wasSemi= ((pHo.ros.rsEffect & CRSpr.BOP_RGBAFILTER) == 0);
		pHo.ros.rsEffect = (pHo.ros.rsEffect & CRSpr.BOP_MASK) | CRSpr.BOP_RGBAFILTER;
		
		var rgbaCoeff= pHo.ros.rsEffectParam;
		var alphaPart;
		if (wasSemi)
		{
			if (pHo.ros.rsEffectParam == -1)
				alphaPart = 0xFF000000;
			else
				alphaPart = (255 - (pHo.ros.rsEffectParam*2))<<24;
		}
		else
			alphaPart = rgbaCoeff & 0xFF000000;
		
		var rgbPart= CServices.swapRGB(argb & 0x00FFFFFF);
		var filter= alphaPart | rgbPart;
		pHo.ros.rsEffectParam = filter;
		
		pHo.ros.modifSpriteEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
	}
}

function ACT_EXTSETROTATINGSPEED()
{	
}
ACT_EXTSETROTATINGSPEED.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var speed=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		pHo.rom.rmMovement.setRotSpeed(speed);
	}
}

function ACT_EXTSETSEMITRANSPARENCY()
{	
}
ACT_EXTSETSEMITRANSPARENCY.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.ros!=null)
		{
			var val=rhPtr.get_EventExpressionInt(this.evtParams[0]);
			if (val<0) val=0;
			if (val>128) val=128;

			pHo.roc.rcChanged=true;
			pHo.ros.setSemiTransparency(val);
		}
	}
}

function ACT_EXTSETTEXTCOLOR()
{	
}
ACT_EXTSETTEXTCOLOR.prototype=
{
	execute:function(rhPtr)
	{
 		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var rgb;
		if (this.evtParams[0].code==22)
		{
			rgb=rhPtr.get_EventExpressionInt(this.evtParams[0]);
			rgb=CServices.swapRGB(rgb);
		}
		else
			rgb=this.evtParams[0].color;

		CRun.setObjectTextColor(pHo, rgb);        
	}
}

function ACT_EXTSETUNDERLINE()
{	
}
ACT_EXTSETUNDERLINE.prototype=
{
	execute:function(rhPtr)
	{
 		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var bFlag=rhPtr.get_EventExpressionInt(this.evtParams[0]);

		var info=CRun.getObjectFont(pHo);
		info.lfUnderline=bFlag;	
		CRun.setObjectFont(pHo, info, null);        
	}
}

function ACT_EXTSETVAR()
{	
}
ACT_EXTSETVAR.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var num;
		if (this.evtParams[0].code==53)
			num=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		else
			num=this.evtParams[0].value;

		if (num>=0 && num<CRVal.VALUES_NUMBEROF_ALTERABLE)
		{
			if (pHo.rov!=null)
			{
				var pValue2=rhPtr.get_EventExpressionAny(this.evtParams[1]);
				pHo.rov.rvValues[num]=pValue2;
			}
		}        
	}
}

function ACT_EXTSETVARSTRING()
{	
}
ACT_EXTSETVARSTRING.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		
		var num;
		if (this.evtParams[0].code==62)
			num=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		else
			num=this.evtParams[0].value;

		if (num>=0 && num<CRVal.STRINGS_NUMBEROF_ALTERABLE)
		{
			pHo.rov.rvStrings[num]=rhPtr.get_EventExpressionString(this.evtParams[1]);
		}        
	}
}

function ACT_EXTSETX()
{	
}
ACT_EXTSETX.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var x=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		CRun.setXPosition(pHo, Math.floor(x));
	}
}

function ACT_EXTSETY()
{	
}
ACT_EXTSETY.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var y=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		CRun.setYPosition(pHo, Math.floor(y));
	}
}

function ACT_EXTSHOOT()
{	
}
ACT_EXTSHOOT.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var pEvp=this.evtParams[0];
		var pInfo=new CPositionInfo();
		if (pEvp.read_Position(rhPtr, 0x11, pInfo))
		{
			pHo.shtCreate(pEvp, pInfo.x, pInfo.y, pInfo.dir);
		}        
	}
}

function ACT_EXTSHOOTTOWARD()
{	
}
ACT_EXTSHOOTTOWARD.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) return;

		var pInfo=new CPositionInfo();
		if (this.evtParams[0].read_Position(rhPtr, 0x11, pInfo))
		{
			var pInfoDest=new CPositionInfo();
			if (this.evtParams[1].read_Position(rhPtr, 0, pInfoDest))
			{
				var x2=pInfoDest.x;
				var y2=pInfoDest.y;
				var dir=CRun.get_DirFromPente(x2-pInfo.x, y2-pInfo.y);			
	
				pHo.shtCreate(this.evtParams[0], pInfo.x, pInfo.y, dir);
			}
		}        
	}
}

function ACT_EXTSHOW()
{	
}
ACT_EXTSHOW.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) return;       
		CRun.objectShow(pHo);
	}
}

function ACT_EXTSHUFFLE()
{	
}
ACT_EXTSHUFFLE.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) return;

		rhPtr.rhEvtProg.rh2ShuffleBuffer.add(pHo);
	}
}

function ACT_EXTSPEED()
{	
}
ACT_EXTSPEED.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		var s=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		if (pHo.rom!=null)
			pHo.rom.rmMovement.setSpeed(s);
	}
}

function ACT_EXTSPRBACK()
{	
}
ACT_EXTSPRBACK.prototype=
{
	execute:function(rhPtr)
	{
 		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) return;
		pHo.setChildIndex(0);
	}
}

function ACT_EXTSPRFRONT()
{	
}
ACT_EXTSPRFRONT.prototype=
{
	execute:function(rhPtr)
	{
 		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) return;
		var index=pHo.getChildMaxIndex();
		pHo.setChildIndex(index);
	}
}

function ACT_EXTSTART()
{	
}
ACT_EXTSTART.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rom!=null)
			pHo.rom.rmMovement.start();
	}
}

function ACT_EXTSTARTANIM()
{	
}
ACT_EXTSTARTANIM.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.roa.raAnimStopped=false;        
	}
}

function ACT_EXTSTOP()
{	
}
ACT_EXTSTOP.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rom!=null)
			pHo.rom.rmMovement.stop();
	}
}

function ACT_EXTSTOPANIM()
{	
}
ACT_EXTSTOPANIM.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;
		pHo.roa.raAnimStopped=true;        
	}
}

function ACT_EXTSUBVAR()
{	
}
ACT_EXTSUBVAR.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) return;

		var num;
		if (this.evtParams[0].code==53)
			num=rhPtr.get_EventExpressionInt(this.evtParams[0]);
		else
			num=this.evtParams[0].value;

		if (num>=0 && num<CRVal.VALUES_NUMBEROF_ALTERABLE)
		{
			if (pHo.rov!=null)
			{
				var pValue2=rhPtr.get_EventExpressionAny(this.evtParams[1]);
				pHo.rov.rvValues[num]-=pValue2;
			}
		}        
	}
}

function ACT_EXTWRAP()
{	
}
ACT_EXTWRAP.prototype=
{
	execute:function(rhPtr)
	{
		var pHo=rhPtr.rhEvtProg.get_ActionObjects(this);
		if (pHo==null) 
			return;

		if (pHo.rom!=null)
			pHo.rom.rmEventFlags|=CRMvt.EF_WRAP;	
	}
}
