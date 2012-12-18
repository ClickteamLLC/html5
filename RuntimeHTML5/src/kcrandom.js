//----------------------------------------------------------------------------------
//
// CRunkcrandom: Randomizer object
// 
//----------------------------------------------------------------------------------
this.kcrandom=CRunkcrandom;

CRunkcrandom.CND_RAND_EVENT	=	0;
CRunkcrandom.CND_RAND_EVENT_GROUP	= 1;
CRunkcrandom.CND_RAND_EVENT_GROUP_CUST =	2;
CRunkcrandom.ACT_NEW_SEED	=	0;
CRunkcrandom.ACT_SET_SEED	=	1;
CRunkcrandom.ACT_TRIGGER_RAND_EVENT_GROUP	=	2;
CRunkcrandom.ACT_TRIGGER_RAND_EVENT_GROUP_CUST =	3;
CRunkcrandom.EXP_RANDOM			=		0;
CRunkcrandom.EXP_RANDOM_MIN_MAX		=	1;
CRunkcrandom.EXP_GET_SEED		=		2;
CRunkcrandom.EXP_RANDOM_LETTER		=	3;
CRunkcrandom.EXP_RANDOM_ALPHANUM	=		4;
CRunkcrandom.EXP_RANDOM_CHAR		=		5;
CRunkcrandom.EXP_ASCII_TO_CHAR		=	6;
CRunkcrandom.EXP_CHAR_TO_ASCII		=	7;
CRunkcrandom.EXP_TO_UPPER		=		8;
CRunkcrandom.EXP_TO_LOWER		=		9;

function CRunkcrandom()
{
    this.currentGroupName=null;
    this.currentPercentMax=0;
    this.currentPosition=0;
    this.currentRandom=0;
    this.globalPercentMax=0;
    this.globalPosition=0;
    this.globalRandom=0;
    this.lastSeed=0;
    this.rand=null;
}
CRunkcrandom.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 3;
    },
    createRunObject:function(file, cob, version)
    {
        this.lastSeed = this.newseed();
        return true;
    },
    newseed:function()
    {
    	var date=new Date();
        var seed = date.getTime();       
        this.rand = new Random(seed);
        return seed;
    },
    setseed:function(pSeed)
    {
        this.rand = new Random(pSeed);
    },
    _random:function(max)
    {
        return this.rand.Next(max);
    },
    _randommm:function(min, max)
    {
        return this.rand.Next(min, max);
    },

    condition:function(num, cnd)
    {
        switch (num)
        {
            case CRunkcrandom.CND_RAND_EVENT:
                return this.RandomEvent(cnd.getParamExpression(this.rh, 0));
            case CRunkcrandom.CND_RAND_EVENT_GROUP:
                return this.RandomEventGroup(cnd.getParamExpression(this.rh, 0));
            case CRunkcrandom.CND_RAND_EVENT_GROUP_CUST:
                return this.RandomEventGroupCustom(cnd.getParamExpString(this.rh, 0), cnd.getParamExpression(this.rh, 1));
        }
        return false;//won't happen
    },

    RandomEvent:function(p)
    {
        if (this._random(100) < p)
            return true;
        return false;
    },
    RandomEventGroup:function(p)
    {
        this.globalPosition += p;
        if ((this.globalRandom >= this.globalPosition - p) &&
                (this.globalRandom < this.globalPosition))
            return true;
        return false;
    },
    RandomEventGroupCustom:function(name, p)
    {
        if (this.currentGroupName==name)
        {
            this.currentPosition += p;
            if ((this.currentRandom >= this.currentPosition - p) &&
                (this.currentRandom < this.currentPosition))
                return true;
        }
        return false;
    },

    action:function(num, act)
    {
        switch (num)
        {
            case CRunkcrandom.ACT_NEW_SEED:
                this.lastSeed = this.newseed();
                break;
            case CRunkcrandom.ACT_SET_SEED:
                this.SetSeed(act.getParamExpression(this.rh, 0));
                break;
            case CRunkcrandom.ACT_TRIGGER_RAND_EVENT_GROUP:
                this.TriggerRandomEventGroup(act.getParamExpression(this.rh, 0));
                break;
            case CRunkcrandom.ACT_TRIGGER_RAND_EVENT_GROUP_CUST:
                this.TriggerRandomEventGroupCustom(act.getParamExpString(this.rh, 0), act.getParamExpression(this.rh, 1));
                break;
        }
    },

    SetSeed:function(pSeed)
    {
        this.lastSeed = pSeed;
        this.setseed(pSeed);
    },

    TriggerRandomEventGroup:function(pPercentMax)
    {
        this.globalPercentMax = pPercentMax;
        if (this.globalPercentMax <= 0)
        {
            this.globalPercentMax = 100;
        }
        this.globalRandom = this._random(this.globalPercentMax);
        this.globalPosition = 0;
        this.ho.generateEvent(CRunkcrandom.CND_RAND_EVENT_GROUP, this.ho.getEventParam());
    },

    TriggerRandomEventGroupCustom:function(name, pPercentMax)
    {
        var lastPercentMax = this.currentPercentMax;
        var lastRandom = this.currentRandom;
        var lastPosition = this.currentPosition;
        var lastGroupName = this.currentGroupName;

        this.currentGroupName = name;
        this.currentPercentMax = pPercentMax;
        if (this.currentPercentMax <= 0)
            this.currentPercentMax = 100;
        this.currentRandom = this._random(this.currentPercentMax);
        this.currentPosition = 0;
        this.ho.generateEvent(CRunkcrandom.CND_RAND_EVENT_GROUP_CUST, this.ho.getEventParam());
        this.currentPercentMax = lastPercentMax;
        this.currentRandom = lastRandom;
        this.currentPosition = lastPosition;
        this.currentGroupName = lastGroupName;
    },

    expression:function(num)
    {
        switch (num)
        {
            case CRunkcrandom.EXP_RANDOM:
                return (this._random(this.ho.getExpParam()));
            case CRunkcrandom.EXP_RANDOM_MIN_MAX:
                return (this._randommm(this.ho.getExpParam(), this.ho.getExpParam()));
            case CRunkcrandom.EXP_GET_SEED:
                return (this.lastSeed);
            case CRunkcrandom.EXP_RANDOM_LETTER:
                return this.GetRandomLetter();
            case CRunkcrandom.EXP_RANDOM_ALPHANUM:
                return this.GetRandomAlphaNum();
            case CRunkcrandom.EXP_RANDOM_CHAR:
                return this.GetRandomChar();
            case CRunkcrandom.EXP_ASCII_TO_CHAR:
                return this.GetAsciiToChar(this.ho.getExpParam());
            case CRunkcrandom.EXP_CHAR_TO_ASCII:
                return this.GetCharToAscii(this.ho.getExpParam());
            case CRunkcrandom.EXP_TO_UPPER:
                return (this.ho.getExpParam().toUpperCase());
            case CRunkcrandom.EXP_TO_LOWER:
                return (this.ho.getExpParam().toLowerCase());
        }
        return (0);//won't be used
    },

    GetRandomLetter:function()
    {
        var b = this._randommm(97, 122);
        return String.fromCharCode(b);
    },
    GetRandomAlphaNum:function()
    {
        var b = this._random(36);
        if (b < 10)
        {
            b += 48;
        }
        else
        {
            b += 87;
        }
        return String.fromCharCode(b);
    },
    GetRandomChar:function()
    {
        var b = this._random(256);
        return String.fromCharCode(b);
    },
    GetAsciiToChar:function(ascii)
    {
        return String.fromCharCode(ascii);
    },
    GetCharToAscii:function(c)
    {
        if (c.Length > 0)
        {
            return c.charCodeAt(0);
        }
        return 0;
    }
});
	
function Random(s)
{
	this.seed=s;
}
Random.prototype=
{	
	getRandom:function()
	{
		this.seed = (this.seed*9301+49297) % 233280;
		return this.seed/(233280.0);
	},
	
	Next:function(val1, val2)
	{
		if (val1==undefined && val2==undefined)
			return this.getRandom();
		if (val2==undefined)
			return Math.floor(this.getRandom()*val1);		
		return Math.floor(this.getRandom()*(val2-val1)+val1);
	}	
}
	
