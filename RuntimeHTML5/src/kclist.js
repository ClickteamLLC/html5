
/* List object (James) */
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
CRunkclist.LIST_FREEFLAG        = 0x0001,
CRunkclist.LIST_VSCROLLBAR      = 0x0002,
CRunkclist.LIST_SORT            = 0x0004,
CRunkclist.LIST_BORDER          = 0x0008,
CRunkclist.LIST_HIDEONSTART     = 0x0010,
CRunkclist.LIST_SYSCOLOR        = 0x0020,
CRunkclist.LIST_3DLOOK          = 0x0040,
CRunkclist.LIST_SCROLLTONEWLINE = 0x0080;

this.kclist = CRunkclist;

function CRunkclist()
{
    this.list =
    {
        doubleClickEvent: -1,
        selectionChangedEvent: -1,
        oneBased: true,
        background: null,
        foreground: null,
        flags: 0
    };
};

CRunkclist.prototype = CServices.extend(new CRunControl(),
{
    getIndex: function(act, index, verify)
    {
        index = (act ? act.getParamExpression(this.rh, index)
                        : this.ho.getExpParam()) -
                                (this.list.oneBased ? 1 : 0);

        if (verify && (index < 0 || index >= this.element.options.length))
            throw new Error("Bad index: " + index);

        return index;
    },

    fixIndex: function(index)
    {
        return index + (this.list.oneBased ? 1 : 0);
    },

    updateColor: function(e)
    {
        if(e === undefined)
            e = this.element;

        if(this.list.flags & CRunkclist.LIST_SYSCOLOR)
            return;

        e.style.backgroundColor = CServices.getColorString(this.list.background);
        e.style.color = CServices.getColorString(this.list.foreground);
    },

    sort: function(e)
    {
        Array.prototype.sort.call(e.options, function(a, b)
        {
            return a.value > b.value;
        });
    },

    getNumberOfConditions: function()
    {
        return 5;
    },

    createRunObject: function(file, cob, version)
    {
        this.ho.hoImgWidth = file.readAShort();
        this.ho.hoImgHeight = file.readAShort();

        var list = this.list;

        var fontInfo = this.ho.hoAdRunHeader.rhApp.bUnicode ?
                        file.readLogFont() : file.readLogFont16();

        list.foreground = file.readAColor();
        
        file.skipBytes(40); /* text style */
        file.skipBytes(16 * 4); /* custom colors */

        list.background = file.readAColor();

        list.flags = file.readAInt();

        var e = document.createElement('select');

        var lineCount = file.readShort();

        list.oneBased = file.readAInt() == 1;

        file.skipBytes(4 * 3); /* lSecu */

        while((lineCount --) > 0)
        {
            e.add(new Option(file.readAString()));
        }

        if(list.flags & CRunkclist.LIST_SORT)
            this.sort(e);

        e.multiple = 'multiple';

        if(list.flags & CRunkclist.LIST_3DLOOK)
        {
            e.style.borderStyle = 'inset';
            e.style.borderWidth = '2px';
        }
        else
        {
            e.style.borderStyle = 'solid';

            if(list.flags & CRunkclist.LIST_BORDER)
            {
                e.style.borderWidth = '1px';
                e.style.borderColor = '#000000';
            }
            else
            {  
                e.style.borderWidth = '0px';
            }
        }

        if (list.flags & CRunkclist.LIST_HIDEONSTART)
            e.style.visibility = 'hidden';

        this.updateColor(e);

        this.setFont(fontInfo);
        this.setElement(e);

        var that = this;

        e.ondblclick = function()
        {
            that.list.doubleClickEvent = that.ho.getEventCount();
            that.ho.generateEvent(2, 0);
        };

        e.onchange = function()
        {
            that.list.selectionChangedEvent = that.ho.getEventCount();
            that.ho.generateEvent(3, 0);
        };
    },

	handleRunObject:function()
	{
		return CRunExtension.REFLAG_DISPLAY;
	},
	
	displayRunObject:function(context, xx, yy)
	{
		this.setPosition(this.ho.hoX, this.ho.hoY);	
        return 0;		
	},
	
    condition: function(num, cnd)
    {
        switch(num)
        {
            case 0: /* Is visible? */
                return this.element.style.visibility != 'hidden';

            case 1: /* Is enabled? */
                return !this.element.disabled;

            case 2: /* Double clicked */

                return (this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 ||
                            (this.ho.getEventCount() ==
                                this.list.doubleClickEvent);

            case 3: /* Selection changed */

                return (this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 ||
                            (this.ho.getEventCount() ==
                                this.list.selectionChangedEvent);

            case 4: /* Has focus */
                return document.activeElement == this.element;
        };
    },

    action: function(num, act)
    {
        try
        {
            switch(num)
            {
            case 0: /* Load list */

                var filename = act.getParamExpString(this.rh, 0);

                this.element.options.length = 0;

                try
                {
                    var file, efile = this.rh.rhApp.getEmbeddedFile(filename);

                    if (efile)
                        file = efile.open();

                    if (!file)
                    {
                        file = new CFile();
                        file.openFile(filename);

                        if (file.ccfBytes.length == 0)
                            file = null;
                    }

                    if (!file)
                        break;

                    var lines = file.ccfBytes.split("\r\n");

                    if (lines.length == 1
                            && lines[0].length == file.ccfBytes.length)
                    {
                        lines = file.ccfBytes.split("\n");
                    }

                    for(var i = 0; i < lines.length; ++ i)
                        this.element.add(new Option(lines[i]));

                    if(this.list.flags & CRunkclist.LIST_SORT)
                        this.sort(this.element);
                }
                catch(e)
                {
                    if(document.debug)
                        throw e;

                    this.element.options.length = 0;
                }

                break;

            case 1: /* Load drives list */
                break;

            case 2: /* Load directory list */
                break;
                
            case 3: /* Load files list */
                break;
                
            case 4: /* Save list */
                break;

            case 5: /* Reset */

                this.element.options.length = 0;
                break;

            case 6: /* Add line */

                this.element.add(new Option(act.getParamExpString(this.rh, 0)));
                
                if(this.list.flags & CRunkclist.LIST_SORT)
                    this.sort(this.element);

                break;

            case 7: /* Insert line */

                var position = this.getIndex(act, 0, true),
                    line = act.getParamExpString(this.rh, 0);

                this.element.add(line, position);
                
                if(this.list.flags & CRunkclist.LIST_SORT)
                    this.sort(this.element);

                break;

            case 8: /* Delete line */

                this.element.remove(this.getIndex(act, 0, true));
                break;

            case 9: /* Set current line */

                this.element.selectedIndex = this.getIndex(act, 0, true);
                break;

            case 10: /* Show */

                this.element.style.visibility = 'visible';
                break;

            case 11: /* Hide */

                this.element.style.visibility = 'hidden';
                break;

            case 12: /* Activate */

                this.element.focus();
                break;

            case 13: /* Enable */

                this.element.disabled = false;
                break;

            case 14: /* Disable */

                this.element.disabled = true;
                break;

            case 15: /* Set position */

                var position = act.getParamPosition(this.rh, 0);
                this.setPosition(position.x, position.y);

                break;

            case 16: /* Set X position */

                this.setX(act.getParamExpression(this.rh, 0));
                break;

            case 17: /* Set Y position */

                this.setY(act.getParamExpression(this.rh, 0));
                break;

            case 18: /* Set size */

                this.setSize(act.getParamExpression(this.rh, 0),
                                    act.getParamExpression(this.rh, 1));

                break;

            case 19: /* Set width */

                this.setWidth(act.getParamExpression(this.rh, 0));
                break;

            case 20: /* Set height */

                this.setHeight(act.getParamExpression(this.rh, 0));
                break;

            case 21: /* Deactivate */

                this.element.blur();
                break;

            case 22: /* Scroll to top */

                this.element.selectedIndex = 0;
                break;

            case 23: /* Scroll to line */

                this.element.selectedIndex = this.getIndex(act, 0, true);
                break;

            case 24: /* Scroll to end */

                this.element.selectedIndex = this.element.options.length - 1;
                break;

            case 25: /* Set color */

                this.list.foreground = act.getParamColor();
                this.updateColor();

                break;

            case 26: /* Set background color */

                this.list.background = act.getParamColor();
                this.updateColor();

                break;

            case 27: /* Load font list */

                break;

            case 28: /* Load font size list */

                break;

            case 29: /* Set line data */

                var index = this.getIndex(act, 0, true),
                    data = act.getParamExpString(this.rh, 1);

                this.element.options[index].setAttribute('data-mmf', data);

                break;
                
            case 30: /* Change line */

                var index = this.getIndex(act, 0, true),
                    text = act.getParamExpString(this.rh, 1);

                this.element.options[index].text = text;

                break;
            };
        }
        catch(e)
        {
        }
    },

    expression: function(num)
    {
        switch(num)
        {
        case 0: /* Get selection index */
            return this.fixIndex(this.element.selectedIndex);

        case 1: /* Get selection text */
            return this.element.options[this.element.selectedIndex].text;

        case 2: /* Get selection directory */
            return '';

        case 3: /* Get selection drive */
            return '';

        case 4: /* Get line text */

            try
            {  return this.element.options[this.getIndex(null, 0, true)].text;
            }
            catch(e)
            {  return '';
            }

        case 5: /* Get line directory */

            this.ho.getExpParam();
            return '';

        case 6: /* Get line drive */

            this.ho.getExpParam();
            return '';

        case 7: /* Get number of lines */
            return this.element.options.length;

        case 8: /* Get X */
            return this.ho.hoX;

        case 9: /* Get Y */
            return this.ho.hoY;

        case 10: /* Get width */
            return this.ho.hoImgWidth;

        case 11: /* Get height */
            return this.ho.hoImgHeight;

        case 12: /* Get color */
            return this.list.foreground;

        case 13: /* Get background color */
            return this.list.background;

        case 14: /* Find string */

            var string = this.ho.getExpParam(),
                startIndex = this.getIndex(null, 0, false);

            if(startIndex >= this.element.options.length)
                return -1;

            if(startIndex < 0)
                startIndex = 0;

            for(var i = startIndex; i < this.element.options.length; ++ i)
                if(this.element.options[i].text.indexOf(string) !== -1)
                    return this.fixIndex(i);

            return -1;

        case 15: /* Find string exact */

            var string = this.ho.getExpParam(),
                startIndex = this.getIndex(null, 0, false);

            if(startIndex >= this.element.options.length)
                return -1;

            if(startIndex < 0)
                startIndex = 0;

            for(var i = startIndex; i < this.element.options.length; ++ i)
                if(this.element.options[i].text.toLowerCase() == string)
                    return this.fixIndex(i);

            return -1;

        case 16: /* Get last index */
            return this.element.options.length - (this.list.oneBased ? 0 : 1);

        case 17: /* Get line data */

            try
            {  return this.element.options
                        [this.getIndex(null, 0, true)].getAttribute ('data-mmf');
            }
            catch(e)
            {  return '';
            }
        };
    },

	getRunObjectTextColor: function()
	{
		return this.list.foreground;
	},
	
	setRunObjectTextColor: function(rgb)
	{		
        this.list.foreground = rgb;
        this.updateColor();
	}		

});


