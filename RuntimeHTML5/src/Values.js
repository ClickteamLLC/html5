
// CDefStrings object
// --------------------------------------------------------------
function CDefStrings()
{
	this.nStrings=0;
	this.strings=null;
}
CDefStrings.prototype=
{
    load:function(file)
    {
        this.nStrings=file.readAShort();
        this.strings=new Array(this.nStrings);
        var n;
        for (n=0; n<this.nStrings; n++)
        {
            this.strings[n]=file.readAString();
        }
    }
}

// CDefValues object
// --------------------------------------------------------------
function CDefValues()
{
	this.nValues=0;
	this.values=null;
}
CDefValues.prototype=
{
    load:function(file)
    {
        this.nValues=file.readAShort();
        this.values=new Array(this.nValues);
        var n;
        for (n=0; n<this.nValues; n++)
        {
            this.values[n]=file.readAInt();
        }
    }
}

// CRVal object
// --------------------------------------------------------------
CRVal.VALUES_NUMBEROF_ALTERABLE=26;
CRVal.STRINGS_NUMBEROF_ALTERABLE=10;
function CRVal()
{    
    this.rvValueFlags=0;
    this.rvValues=null;
    this.rvStrings=null;
}
CRVal.prototype=
{
    init:function(ho, ocPtr, cob)
    {
        this.rvValueFlags=0;
		this.rvValues=new Array(CRVal.VALUES_NUMBEROF_ALTERABLE);
		this.rvStrings=new Array(CRVal.STRINGS_NUMBEROF_ALTERABLE);
		var n;
		for (n=0; n<CRVal.VALUES_NUMBEROF_ALTERABLE; n++)
		    this.rvValues[n]=0;
		for (n=0; n<CRVal.STRINGS_NUMBEROF_ALTERABLE; n++)
		    this.rvStrings[n]="";
	
		if (ocPtr.ocValues!=null)
		{
		    for (n=0; n<ocPtr.ocValues.nValues; n++)
				this.rvValues[n]=ocPtr.ocValues.values[n];
		}
		if (ocPtr.ocStrings!=null)
		{
		    for (n=0; n<ocPtr.ocStrings.nStrings; n++)
				this.rvStrings[n]=ocPtr.ocStrings.strings[n];
		}
    },
    kill:function(bFast)
    {
		var n;
		for (n=0; n<CRVal.VALUES_NUMBEROF_ALTERABLE; n++)
		    this.rvValues[n]=null;
		for (n=0; n<CRVal.STRINGS_NUMBEROF_ALTERABLE; n++)
		    this.rvStrings[n]=null;
    },
    getValue:function(n)
    {
		return this.rvValues[n];
    },
    getString:function(n)
    {
		return this.rvStrings[n];
    },
    setString:function(n, s)
    {
		this.rvStrings[n]=s;
    },
    setValue:function(n, v)
    {
		this.rvValues[n]=v;
    }
}


