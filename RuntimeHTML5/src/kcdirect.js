//----------------------------------------------------------------------------------
//
// CRunkcdirect: Direction Calculator object
//
//----------------------------------------------------------------------------------
CRunkcdirect.ACT_SET_TURN= 0;
CRunkcdirect.ACT_TURN_DIRECTIONS= 1;
CRunkcdirect.ACT_TURN_POS= 2;
CRunkcdirect.ACT_ADD_DIR= 3;
CRunkcdirect.ACT_DIR_SET= 4;
CRunkcdirect.EXP_XY_TO_DIR= 0;
CRunkcdirect.EXP_XY_TO_SPD= 1;
CRunkcdirect.EXP_DIR_TO_X= 2;
CRunkcdirect.EXP_DIR_TO_Y= 3;
CRunkcdirect.EXP_TURN_TOWARD= 4;

this.kcdirect = CRunkcdirect; /* export to extension loader */

function CRunkcdirect()
{
    this.angle_to_turn= 1;
    this.speed1= 20;
    this.speed2= 20;
    this.dir_to_add= 16;	
};

CRunkcdirect.prototype=CServices.extend(new CRunExtension(),
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
            case CRunkcdirect.ACT_SET_TURN: 
                this.SetTurn(act.getParamExpression(this.rh, 0));
                break;
            case CRunkcdirect.ACT_TURN_DIRECTIONS: 
                this.TurnToDirection(act.getParamExpression(this.rh, 0), act.getParamObject(this.rh, 1));
                break;
            case CRunkcdirect.ACT_TURN_POS: 
                this.TurnToPosition(act.getParamObject(this.rh, 0), act.getParamPosition(this.rh, 1));
                break;
            case CRunkcdirect.ACT_ADD_DIR: 
                CRunkcdirect.AddDir_act(act.getParamExpression(this.rh, 0), act.getParamObject(this.rh, 1));
                break;
            case CRunkcdirect.ACT_DIR_SET:
                this.AngleSet(act.getParamExpression(this.rh, 0));
                break;
        }
    },

    SetTurn:function(v)
    {
        this.angle_to_turn = v;
    },

    TurnToDirection:function(dir, object)
    {
    	if (object==null)
    	{
    		return;
    	}

        var goal_angle, direction;
        var cc;
        var cl;
        var angle;

        direction = object.roc.rcDir;
        goal_angle = dir;

        goal_angle = goal_angle % 32;
        if (goal_angle < 0)
        {
            goal_angle += 32;
        }

        cc = goal_angle - direction;
        if (cc < 0)
        {
            cc += 32;
        }
        cl = direction - goal_angle;
        if (cl < 0)
        {
            cl += 32;
        }
        if (cc < cl)
        {
            angle = cc;
        }
        else
        {
            angle = cl;
        }
        if (angle > this.angle_to_turn)
        {
            angle = this.angle_to_turn;
        }
        if (cl < cc)
        {
            angle = -angle;
        }

        direction += angle;
        if (direction >= 32)
        {
            direction -= 32;
        }
        if (direction <= -1)
        {
            direction += 32;
        }
        object.roc.rcDir = Math.floor(direction);

        object.roc.rcChanged = true;
        object.roc.rcCheckCollides = true;
    },

    TurnToPosition:function(object, position)
    {
    	if (object==null)
    	{
    		return;
    	}
    	
        var goal_angle, direction;
        var cc;
        var cl;
        var angle;
        var look_angle;
        var l1, l2;
        direction = object.roc.rcDir;

        l1 = position.x;
        l2 = position.y;

        l1 -= object.hoX;
        l2 -= object.hoY;

        look_angle = Math.atan2((-l2), l1);
        if (look_angle < 0.0)
        {
            look_angle = look_angle + 2.0 * 3.1416;
        }

        goal_angle = (look_angle * 32.0 / (2.0 * 3.1416) + 0.5);

        cc = goal_angle - direction;
        if (cc < 0)
        {
            cc += 32;
        }
        cl = direction - goal_angle;
        if (cl < 0)
        {
            cl += 32;
        }
        if (cc < cl)
        {
            angle = cc;
        }
        else
        {
            angle = cl;
        }
        if (angle > this.angle_to_turn)
        {
            angle = this.angle_to_turn;
        }
        if (cl < cc)
        {
            angle = -angle;
        }

        direction += angle;
        if (direction > 31)
        {
            direction -= 32;
        }
        if (direction < 0)
        {
            direction += 32;
        }
        object.roc.rcDir = Math.floor(direction);
        object.roc.rcChanged = true;
        object.roc.rcCheckCollides = true;
    },

    AddDir_act:function(speed, object)
    {
    	if (object==null)
    	{
    		return;
    	}

        var angle1, angle2;
        var x1, y1;
        var x2, y2;
        var x2_delta, y2_delta;
        var look_angle;
        var diff_ang;
        var final_dir;
        var final_speed;
        var direction1;
        var object_speed;
        var add_speed;
        add_speed = speed;

        object_speed = object.roc.rcSpeed;
        direction1 = object.roc.rcDir;
        angle1 = (direction1 * 2 * 3.1416 / 32);
        angle2 = (this.dir_to_add * 2 * 3.1416 / 32);

        x1 = object_speed * Math.cos(angle1);
        y1 = object_speed * Math.sin(angle1);

        x2_delta = add_speed * Math.cos(angle2);
        y2_delta = add_speed * Math.sin(angle2);
        x2 = x1 + x2_delta;
        y2 = y1 + y2_delta;

        if (Math.abs((this.dir_to_add - direction1) % 32) != 16)
        {
            look_angle = Math.atan2(y2, x2);
            diff_ang = look_angle - angle1;
            if (diff_ang > 3.1416)
            {
                diff_ang -= 2 * 3.1416;
            }
            else if (diff_ang < -3.1416)
            {
                diff_ang += 2 * 3.1416;
            }
            if (diff_ang < 0.0)
            {
                angle1 -= 3.1416 / 32;
            }
            else
            {
                angle1 += 3.1416 / 32;
            }

            x1 = object_speed * Math.cos(angle1);
            y1 = object_speed * Math.sin(angle1);

            x2 = x1 + x2_delta;
            y2 = y1 + y2_delta;
        }
        look_angle = Math.atan2(y2, x2);
        if (look_angle < 0.0)
        {
            look_angle = look_angle + 2.0 * 3.1416;
        }
        final_dir = (look_angle * 32.0 / (2.0 * 3.1416) + 0.5);
        if (final_dir >= 32)
        {
            final_dir -= 32;
        }
        object.roc.rcDir = CServices.floatToInt(final_dir);
        final_speed = CServices.floatToInt(Math.sqrt(x2 * x2 + y2 * y2) + .5);
        if (final_speed > 100)
        {
            final_speed = 100;
        }
        object.roc.rcSpeed = final_speed;
        object.roc.rcChanged = true;
        object.roc.rcCheckCollides = true;
    },

    AngleSet:function(angle)
    {
        this.dir_to_add = angle;
        this.dir_to_add = this.dir_to_add % 32;
        if (this.dir_to_add < 0)
        {
            this.dir_to_add += 32;
        }
    },

    expression:function(num)
    {
        switch (num)
        {
            case CRunkcdirect.EXP_XY_TO_DIR:
                return vXYtoDir(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunkcdirect.EXP_XY_TO_SPD:
                return this.XyToSpeed(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunkcdirect.EXP_DIR_TO_X:
                return this.DirectionToX(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunkcdirect.EXP_DIR_TO_Y:
                return this.DirectionToY(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunkcdirect.EXP_TURN_TOWARD:
                return this.TurnToward(this.ho.getExpParam(), this.ho.getExpParam());
        }
        return 0;
    },

    XYtoDir:function(x, y)
    {
        var angle;
        var iang;
        angle = Math.atan2((-y), x);
        if (angle < 0.0)
        {
            angle = angle + 2.0 * 3.1416;
        }
        iang = (angle * 32.0 / (2.0 * 3.1416) + 0.5);
        return CServices.floatToInt(iang);
    },

    XyToSpeed:function(x, y)
    {
        var ispeed;
        var speed;

        speed = Math.sqrt(x * x + y * y);
        ispeed = (speed + (speed < 0.0 ? -.5 : .5));

        return CServices.floatToInt(ispeed);
    },

    DirectionToX:function(dir, speed)
    {
        var x;
        var xval;

        dir = dir % 32;
        if (dir < 0)
        {
            dir += 32;
        }

        xval = speed * Math.cos(dir * 2 * 3.1416 / 32);
        x = (xval + (speed < 0 ? -.5 : .5));
        return CServices.floatToInt(x);
    },

    DirectionToY:function(dir, speed)
    {
        var y;
        var yval;

        dir = dir % 32;
        if (dir < 0)
        {
            dir += 32;
        }

        yval = speed * Math.sin(dir * 2 * 3.1416 / 32);
        y = (yval + (speed < 0 ? -.5 : .5));

        return CServices.floatToInt(-y);
    },

    TurnToward:function(direction, goal_angle)
    {
        var cc;
        var cl;
        var angle;

        goal_angle = goal_angle % 32;
        if (goal_angle < 0)
        {
            goal_angle += 32;
        }

        direction = direction % 32;
        if (direction < 0)
        {
            direction += 32;
        }

        cc = goal_angle - direction;
        if (cc < 0)
        {
            cc += 32;
        }
        cl = direction - goal_angle;
        if (cl < 0)
        {
            cl += 32;
        }
        if (cc < cl)
        {
            angle = cc;
        }
        else
        {
            angle = cl;
        }
        if (angle > this.angle_to_turn)
        {
            angle = this.angle_to_turn;
        }
        if (cl < cc)
        {
            angle = -angle;
        }
        direction += angle;
        return CServices.floatToInt(direction);
    }
});
	
