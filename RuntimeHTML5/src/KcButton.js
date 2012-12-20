
/* Button object (James) */
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
CRunKcButton.BTNTYPE_PUSHTEXT = 0;
CRunKcButton.BTNTYPE_CHECKBOX = 1;
CRunKcButton.BTNTYPE_RADIOBTN = 2;
CRunKcButton.BTNTYPE_PUSHBITMAP = 3;
CRunKcButton.BTNTYPE_PUSHTEXTBITMAP = 4;
CRunKcButton.ALIGN_ONELINELEFT = 0;
CRunKcButton.ALIGN_CENTER = 1;
CRunKcButton.ALIGN_CENTERINVERSE = 2;
CRunKcButton.ALIGN_ONELINERIGHT = 3;
CRunKcButton.BTN_HIDEONSTART = 0x0001;
CRunKcButton.BTN_DISABLEONSTART = 0x0002;
CRunKcButton.BTN_TEXTONLEFT = 0x0004;
CRunKcButton.BTN_TRANSP_BKD = 0x0008;
CRunKcButton.BTN_SYSCOLOR = 0x0010;

function CRunKcButton()
{
    this.button =
    {
        clickedEvent: -1,
        background: null,
        foreground: null,
        flags: 0
    };
};

CRunKcButton.prototype = CServices.extend(new CRunControl(),
{
    update: function(e)
    {
        if (e === undefined)
            e = this.element;

        switch(this.button.type)
        {
            case CRunKcButton.BTNTYPE_CHECKBOX:

                e = this.button.checkboxLabel;

            case CRunKcButton.BTNTYPE_PUSHTEXT:

                while(e.firstChild)
                    e.removeChild(e.firstChild);

                e.appendChild(document.createTextNode(this.button.strings[0]));

                break;

            case CRunKcButton.BTNTYPE_RADIOBTN:

                var i = 0, that = this;

                this.eachElement(function()
                {
                    while(this.firstChild)
                        this.removeChild(this.firstChild);

                    this.appendChild(document.createTextNode(that.button.strings[i++]));
                    
                }, e, 'label');

                break;

            case CRunKcButton.BTNTYPE_PUSHTEXTBITMAP:
            case CRunKcButton.BTNTYPE_PUSHBITMAP:

                var disabled = false;

                this.eachElement(function()
                {
                    if(this.disabled)
                        disabled = true;

                }, e);

                var img = this.rh.rhApp.imageBank.getImageFromHandle
                (  
                     this.button.images
                        [disabled ? 2 : (this.button.bitmapMouseDown ? 1 : 0)]
                );
                
                if(img == null)
                    img = this.rh.rhApp.imageBank.getImageFromHandle(this.button.images[0]);

                while(e.firstChild)
                    e.removeChild(e.firstChild);

                var img_el = img.createElement();
                img_el.style.display = 'inline-block';

                if(this.button.type == CRunKcButton.BTNTYPE_PUSHTEXTBITMAP)
                {
                    e.appendChild(document.createTextNode(this.button.strings[0]));

                    switch(this.button.alignImageText)
                    {
                        case CRunKcButton.ALIGN_ONELINELEFT:

                            e.insertBefore(img_el, e.firstChild);
                            break;

                        case CRunKcButton.ALIGN_ONELINERIGHT:

                            e.appendChild(img_el);
                            break;

                        case CRunKcButton.ALIGN_CENTER:

                            e.insertBefore(document.createElement('br'), e.firstChild);
                            e.insertBefore(img_el, e.firstChild);
                            break;

                        case CRunKcButton.ALIGN_CENTERINVERSE:

                            e.appendChild(document.createElement('br'));
                            e.appendChild(img_el);
                            break;
                    };

                    break;
                }
                else
                {
                    e.appendChild(img_el);
                }

                break;
        };
    },

    updateColor: function(e)
    {
        if(this.button.flags & CRunKcButton.BTN_SYSCOLOR)
            return;

        if(this.button.type == CRunKcButton.BTNTYPE_PUSHBITMAP)
            return;

        if (e === undefined)
            e = this.element;

        if(this.button.flags & CRunKcButton.BTN_TRANSP_BKD)
            e.style.backgroundColor = 'transparent';
        else
            e.style.backgroundColor = CServices.getColorString(this.button.background);

        var that = this;

        this.eachElement(function()
        {
            this.style.color = CServices.getColorString(that.button.foreground);

        }, e, 'label');
    },

    eachElement: function(f, e, tag)
    {
        if(e === undefined)
            e = this.element;

        if(tag === undefined)
            tag = 'input';

        switch(this.button.type)
        {
            case CRunKcButton.BTNTYPE_PUSHTEXT:
            case CRunKcButton.BTNTYPE_PUSHTEXTBITMAP:

                if(f.call(e) === false)
                    return;

                break;

            case CRunKcButton.BTNTYPE_CHECKBOX:

                if(f.call ( tag == 'label' ? this.button.checkboxLabel
                                : this.button.checkbox ) === false)
                {
                    return;
                }

                break;

            case CRunKcButton.BTNTYPE_RADIOBTN:

                var nodeIndex = 0, node;

                for(;;)
                {
                    while((node = e.childNodes[nodeIndex])
                                .tagName.toLowerCase() != tag)
                    {
                        if((++ nodeIndex) >= e.childNodes.length)
                            break;
                    }

                    if(f.call(node) === false)
                        return;

                    if((++ nodeIndex) >= e.childNodes.length)
                        break;

                }

                break;
        };
    },

    getNumberOfConditions: function()
    {
        return 6;
    },

    createRunObject: function(file, cob, version)
    {
        this.ho.hoImgWidth = file.readAShort();
        this.ho.hoImgHeight = file.readAShort();

        var button = this.button;

        button.type = file.readAShort();
        button.radioCount = file.readAShort();
        button.flags = file.readAInt();

        var fontInfo = file.readLogFont();

        button.foreground = file.readAColor();
        button.background = file.readAColor();
        
        button.images = new Array(3);

        for(var i = 0; i < 3; ++ i)
            button.images[i] = file.readAShort();

        if(button.type == CRunKcButton.BTNTYPE_PUSHBITMAP
                || button.type == CRunKcButton.BTNTYPE_PUSHTEXTBITMAP)
        {
            this.ho.loadImageList(button.images);
        }

        if(button.type == CRunKcButton.BTNTYPE_PUSHBITMAP)
        {
            this.ho.hoImgWidth = 1;
            this.ho.hoImgHeight = 1;

            for(var i = 0; i < 3; ++ i)
            {
                var image = this.ho.hoAdRunHeader.rhApp.imageBank
                                .getImageFromHandle(button.images[i]);

                if(image)
                {
                    this.ho.hoImgWidth = Math.max(this.ho.hoImgWidth, image.width);
                    this.ho.hoImgHeight = Math.max(this.ho.hoImgHeight, image.height);
                }
            }
        }

        file.readAShort(); /* fourth word in image array */
        file.readAInt(); /* ebtnSecu */

        button.alignImageText = file.readAShort();

        if(button.type == CRunKcButton.BTNTYPE_RADIOBTN)
        {
            button.tooltip = '';

            var e = document.createElement('div'),
                group = 'mmf-radio-group-' + this.ho.hoHFII;

            button.strings = new Array(button.radioCount);

            for(var i = 0; i < button.radioCount; ++ i)
            {
                button.strings[i] = file.readAString();

                var box = document.createElement('input'),
                    label = document.createElement('label');

                box.setAttribute('name', group);

                box.type = 'radio';
                box.id = 'mmf-radio-' + this.ho.hoHFII + '-' + i;

                label.setAttribute('for', box.id);

                if(i > 0)
                    e.appendChild(document.createElement('br'));

                e.appendChild(box);
                e.appendChild(label);
            }
        }
        else
        {
            button.strings = [file.readAString()];
            button.tooltip = file.readAString();

            switch(button.type)
            {
                case CRunKcButton.BTNTYPE_CHECKBOX:

                    var e = document.createElement('div');
                    
                    button.checkbox = document.createElement('input');
                    button.checkbox.type = 'checkbox';
                    button.checkbox.id = 'mmf-checkbox-' + this.ho.hoHFII;

                    button.checkboxLabel = document.createElement('label');
                    button.checkboxLabel.setAttribute('for', button.checkbox.id);

                    if(button.flags & CRunKcButton.BTN_TEXTONLEFT)
                    {
                        e.appendChild(button.checkboxLabel);
                        e.appendChild(button.checkbox);
                    }
                    else
                    {
                        e.appendChild(button.checkbox);
                        e.appendChild(button.checkboxLabel);
                    }

                    break;

                case CRunKcButton.BTNTYPE_PUSHBITMAP:

                    var e = document.createElement('div');
                    break;

                default:

                    var e = document.createElement('button');
                    break;
            };
        }

        e.title = button.tooltip;

        if(button.flags & CRunKcButton.BTN_HIDEONSTART)
            e.style.visibility = 'hidden';

        if(button.flags & CRunKcButton.BTN_DISABLEONSTART)
        {
            this.eachElement(function()
            {
                this.disabled = true;
            }, e);
        }

        this.update(e);
        this.updateColor(e);

        this.setFont(fontInfo, e);
        this.setElement(e);

        var that = this;
		
        if(button.type == CRunKcButton.BTNTYPE_PUSHBITMAP
                || button.type == CRunKcButton.BTNTYPE_PUSHTEXTBITMAP)
        {
            e.onmousedown = function()
            {
                that.button.bitmapMouseDown = true;
                that.update();
            };

            e.onmouseup = function()
            {
                that.button.bitmapMouseDown = false;
                that.update();

                that.button.clickedEvent = that.ho.getEventCount();
                that.ho.generateEvent(1, 0);
            };
        }
        else
        {
            e.onclick = function()
            {
                that.button.clickedEvent = that.ho.getEventCount();
                that.ho.generateEvent(1, 0);
            }; 
        }
    },

    condition: function(num, cnd)
    {
        switch(num)
        {
            case 0: /* Box checked? */
                return this.button.type == CRunKcButton.BTNTYPE_CHECKBOX
                            && this.button.checkbox.checked;

            case 1: /* On click */
                return (this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 ||
                            (this.ho.getEventCount() ==
                                this.button.clickedEvent);

            case 2: /* Box not checked? */
                return this.button.type == CRunKcButton.BTNTYPE_CHECKBOX
                            && !this.button.checkbox.checked;

            case 3: /* Visible? */
                return this.button.visible;

            case 4: /* Enabled? */
                return this.button.enabled;

            case 5: /* Radio enabled? */
                
                if(this.button.type != CRunKcButton.BTNTYPE_RADIOBTN)
                    return false;

                if(index < 0 || index >= this.button.strings.length)
                    return false;

                var index = cnd.getParamExpression(this.rh, 0), i = 0, node;

                this.eachElement(function()
                {
                    if(i == index)
                    {
                        node = this;
                        return false;
                    }

                    ++ i;
                });

                return !node.disabled;
        };
    },

    action: function(num, act)
    {
        switch(num)
        {
        case 0: /* Change text */

            this.button.strings[0] = act.getParamExpString(this.rh, 0);
            this.update();

            break;

        case 1: /* Show */

            this.element.style.visibility = 'visible';
            break;

        case 2: /* Hide */

            this.element.style.visibility = 'hidden';
            break;

        case 3: /* Enable */

            this.eachElement(function()
            {
                this.disabled = false;
            });

            if(this.button.type == CRunKcButton.BTNTYPE_PUSHBITMAP
                    || this.button.type == CRunKcButton.BTNTYPE_PUSHTEXTBITMAP)
            {
                this.update(); /* change image */
            }

            break;

        case 4: /* Disable */

            this.eachElement(function()
            {
                this.disabled = true;
            });

            if(this.button.type == CRunKcButton.BTNTYPE_PUSHBITMAP
                    || this.button.type == CRunKcButton.BTNTYPE_PUSHTEXTBITMAP)
            {
                this.update();
            }

            break;

        case 5: /* Set position */

            var position = act.getParamPosition(this.rh, 0);
            this.setPosition(position.x, position.y);

            break;

        case 6: /* Set width */

            this.setWidth(act.getParamExpression(this.rh, 0));
            break;

        case 7: /* Set height */

            this.setHeight(act.getParamExpression(this.rh, 0));
            break;

        case 8: /* Change radio text */

            if(this.button.type != CRunKcButton.BTNTYPE_RADIOBTN)
                return;

            var index = act.getParamExpression(this.rh, 0),
                newText = act.getParamExpString(this.rh, 1);

            if(index < 0 && index >= this.button.strings.length)
                return;

            this.button.strings[index] = newText;
            this.update();

            break;

        case 9: /* Enable radio button */
        case 10: /* Disable radio button */

            if(this.button.type != CRunKcButton.BTNTYPE_RADIOBTN)
                return;

            var index = act.getParamExpression(this.rh, 0);

            if(index < 0 && index >= this.button.strings.length)
                return;

            this.eachElement(function()
            {
                if(i == index)
                {
                    this.disabled = (num == 10);
                    return false;
                }

                ++ i;
            });

            break;

        case 11: /* Select radio button */

            if(this.button.type != CRunKcButton.BTNTYPE_RADIOBTN)
                return;

            var index = act.getParamExpression(this.rh, 0);

            if(index < 0 && index >= this.button.strings.length)
                return;

            var i = 0;

            this.eachElement(function()
            {
                if(i == index)
                {
                    this.checked = true;
                    return false;
                }

                ++ i;
            });

            break;

        case 12: /* Set X position */

            this.setX(act.getParamExpression(this.rh, 0));
            break;

        case 13: /* Set Y position */

            this.setY(act.getParamExpression(this.rh, 0));
            break;

        case 14: /* Check */

            if(this.button.type == CRunKcButton.BTNTYPE_CHECKBOX)
                this.button.checkbox.checked = true;

            break;

        case 15: /* Uncheck */

            this.eachElement(function()
            {
                this.checked = false;
            });

            break;

        case 16: /* Set menu command ID */
            break;

        case 17: /* Set tooltip */

            this.button.tooltip = act.getParamExpString(this.rh, 0);

            if(this.element)
                this.element.title = this.button.tooltip;

            break;
        };
    },

    expression: function(num)
    {
        switch(num)
        {
        case 0: /* Get width */
            return this.ho.hoImgWidth;

        case 1: /* Get height */
            return this.ho.hoImgHeight;

        case 2: /* Get X */
            return this.ho.hoX;

        case 3: /* Get Y */
            return this.ho.hoY;

        case 4: /* Get selected radio index */
            
            if(this.button.type != CRunKcButton.BTNTYPE_RADIOBTN)
                return 0;

            var index = 0, found = false;

            this.eachElement(function()
            {
                if(this.checked)
                { 
                    found = true;
                    return false;
                }

                ++ index;
            });

            return found ? index : -1;

        case 5: /* Get text */

            var index = this.ho.getExpParam();

            if(index < 0 || index >= this.button.strings.length)
                return '';

            return this.button.strings[index];

        case 6: /* Get tooltip */
            return this.button.tooltip;
        };
    },
	
	getRunObjectTextColor: function()
	{
		return this.button.foreground;
	},
	
	setRunObjectTextColor: function(rgb)
	{		
        this.button.foreground = rgb;
        this.updateColor();
	},

    setFont: function(font, e)
    {
        if (e === undefined)
            e = this.element;

        CRunControl.prototype.setFont.call(this, font);

        this.eachElement(function()
        {
            this.style.font = e.style.font;

        }, e, 'label');
    }
});


