//----------------------------------------------------------------------------------
//
// CRUNCALCRECT
//
//----------------------------------------------------------------------------------
this.CalcRect=CRunCalcRect;

CRunCalcRect.ACT_SetFont = 0;
CRunCalcRect.ACT_SetText = 1;
CRunCalcRect.ACT_SetMaxWidth = 2;
CRunCalcRect.ACT_CalcRect = 3;
CRunCalcRect.EXP_GetWidth = 0;
CRunCalcRect.EXP_GetHeight = 1;
CRunCalcRect.MAX_HEIGHTS= 40;
CRunCalcRect.aHeightNormalToLF=
[
    0, // 0
    1, // 1
    2, // 2
    3, // 3
    5, // 4
    7, // 5
    8, // 6
    9, // 7
    11, // 8
    12, // 9
    13, // 10
    15, // 11
    16, // 12
    17, // 13
    19, // 14
    20, // 15
    21, // 16
    23, // 17
    24, // 18
    25, // 19
    27, // 20
    28, // 21
    29, // 22
    31, // 23
    32, // 24
    33, // 25
    35, // 26
    36, // 27
    37, // 28
    39, // 29
    40, // 30
    41, // 31
    43, // 32
    44, // 33
    45, // 34
    47, // 35
    48, // 36
    49, // 37
    51, // 38
    52		// 39
];
		

function CRunCalcRect()
{
    this.text = "";
    this.fontName= "";
    this.fontHeight= 10;
    this.fontBold= false;
    this.fontItalic= false;
    this.fontUnderline= false;
    this.maxWidth= 10000;
    this.calcWidth= 0;
    this.calcHeight= 0;
}
CRunCalcRect.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 0;
    },

    createRunObject:function(file, cob, version)
    {
        return true;
    },

    action:function(num, act)
    {
        switch (num)
        {
            case CRunCalcRect.ACT_SetFont:
                this.SetFont(act.getParamExpString(this.rh, 0),
                        act.getParamExpression(this.rh, 1),
                        act.getParamExpression(this.rh, 2));
                break;

            case CRunCalcRect.ACT_SetText:
                this.SetText(act.getParamExpString(this.rh, 0));
                break;

            case CRunCalcRect.ACT_SetMaxWidth:
                this.SetMaxWidth(act.getParamExpression(this.rh, 0));
                break;

            case CRunCalcRect.ACT_CalcRect:
                this.CalcRect();
                break;
        }
    },
	
    expression:function(num)
    {
    	var ret;
        switch (num)
        {
            case CRunCalcRect.EXP_GetWidth:
                return this.GetWidth();

            case CRunCalcRect.EXP_GetHeight:
                return this.GetHeight();
        }
        return (0);//won't be used
    },

    CalcRect:function()
    {
    	var font=new CFontInfo();
		font.lfHeight=this.fontHeight; 
		font.lfWeight=this.fontBold?700:400;
		font.lfItalic=this.fontItalic?1:0;
		var rc=new CRect();
		rc.right=this.maxWidth;
		rc.bottom=10000;
		this.calcHeight=CServices.drawText(this.rh.rhApp.context, this.text, CServices.DT_CALCRECT|CServices.DT_LEFT, rc, font, null);    	
        this.calcWidth=rc.right;
    },

    GetHeight:function()
    {
        return (this.calcHeight);
    },

    GetWidth:function()
    {
        return (this.calcWidth);
    },

    SetFont:function(name, height, style)
    {
        this.fontName = name;
        this.fontHeight = this.heightNormalToLF(height);
        this.fontBold = (style & 1) == 1;
        this.fontItalic = (style & 2) == 2;
        this.fontUnderline = (style & 4) == 4;
    },

    SetMaxWidth:function(width)
    {
        if (width <= 0)
            this.maxWidth = 10000;
        else
            this.maxWidth = width;
    },

    SetText:function(text)
    {
        this.text = text;
    },

    heightNormalToLF:function(height)
    {
        if (height < CRunCalcRect.MAX_HEIGHTS)
        {
            return CRunCalcRect.aHeightNormalToLF[height];
        }
        var nLogVert = 96;
        return (height * nLogVert) / 72;
    }
});

