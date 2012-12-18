//----------------------------------------------------------------------------------
//
// CRUNACCELEROMETER iPhone accelerometers
//
//----------------------------------------------------------------------------------
CRunAccelerometer.EXP_XDIRECT=0;
CRunAccelerometer.EXP_YDIRECT=1;
CRunAccelerometer.EXP_ZDIRECT=2;
CRunAccelerometer.EXP_XGRAVITY=3;
CRunAccelerometer.EXP_YGRAVITY=4;
CRunAccelerometer.EXP_ZGRAVITY=5;
CRunAccelerometer.EXP_XINSTANT=6;
CRunAccelerometer.EXP_YINSTANT=7;
CRunAccelerometer.EXP_ZINSTANT=8;
CRunAccelerometer.EXP_ORIENTATION=9;
CRunAccelerometer.CND_ORIENTATIONCHANGED = 0;
CRunAccelerometer.CND_LAST= 1;


function CRunAccelerometer()
{
	this.orientationCount=0;
	this.accX=0;
	this.accY=0;
	this.accZ=0;
	this.accGravX=0;
	this.accGravY=0;
	this.accGravZ=0;
}

CRunAccelerometer.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return CRunLocation.CND_LAST;
    },
    createRunObject:function(file, cob, version)
    {
        this.orientationCount = -1;
        this.orientation=0;
		this.rh.rhApp.startAccelerometer();        
        return true;
    },

    destroyRunObject:function(bFast)
    {
        this.rh.rhApp.endAccelerometer();;
    },

    handleRunObject:function()
    {
        return 0;
    },

    condition:function(num, cnd)
    {
        if (num==CRunAccelerometer.CND_ORIENTATIONCHANGED)
        {
	        return this.orientationChanged();
        }
        return false;
    },
    
    orientationChanged:function()
    {
        if ((ho.hoFlags & CObject.HOF_TRUEEVENT) != 0)
        {
	        return true;
        }
        if (ho.getEventCount() == this.orientationCount)
        {
	        return true;
        }
        return false;
    },
    
    expression:function(num)
    {
        var ret=0;

        switch (num)
        {
            case CRunAccelerometer.EXP_XDIRECT:
                ret = this.rh.rhApp.accX;
                break;
            case CRunAccelerometer.EXP_YDIRECT:
                ret = this.rh.rhApp.accY;
                break;
            case CRunAccelerometer.EXP_ZDIRECT:
                ret = this.rh.rhApp.accZ;
                break;
            case CRunAccelerometer.EXP_XGRAVITY:
                ret = this.rh.rhApp.accGravX;
                break;
            case CRunAccelerometer.EXP_YGRAVITY:
                ret = this.rh.rhApp.accGravY;
                break;
            case CRunAccelerometer.EXP_ZGRAVITY:
                ret = this.rh.rhApp.accGravZ;
                break;
            case CRunAccelerometer.EXP_XINSTANT:
                ret = this.rh.rhApp.accX;
                break;
            case CRunAccelerometer.EXP_YINSTANT:
                ret = this.rh.rhApp.accY;
                break;
            case CRunAccelerometer.EXP_ZINSTANT:
                ret = this.rh.rhApp.accZ;
                break;
            case CRunAccelerometer.EXP_ORIENTATION:
                return 0;
                
        }
        return ret;
    }
});
    

    
    
