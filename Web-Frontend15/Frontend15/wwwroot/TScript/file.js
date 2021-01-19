var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
$(function () {
    $('#FighterPopup').modal({
        backdrop: 'static',
        keyboard: true
    });
    var seletctedHero;
    var pewds = new Pewds("Pewdiepie", 100, 100, "pewds", "Leave your memes on the reddit 19 year olds");
    var phil = new Phil("Phil Swift", 100, 100, "phil", "I SAWED THAT BOAT IN HALF AND REAPAIRED IT ONLY WITH FLEX TAPE");
    var tyler = new Tyler("Tyler1", 100, 100, "tyler", "IAM TYLER MOT*****G ONE");
    var game;
    var perk1;
    var perk2;
    var perk3;
    var enemy1;
    var enemy2;
    var enemy3;
    $('.hero').click(function () {
        if ($("#Message,#SelectButton").hasClass("show") == false) {
            $("#Message,#SelectButton").addClass("show");
        }
        $('.hero').removeClass("border-primary");
        $(this).addClass("border-primary");
        seletctedHero = $(this).attr("id");
        switch (seletctedHero) {
            case "pewds":
                {
                    pewds.Greet();
                    break;
                }
            case "tyler":
                {
                    tyler.Greet();
                    break;
                }
            case "phil":
                {
                    phil.Greet();
                    break;
                }
            default:
                break;
        }
    });
    $('#ConfirmCharacter').click(function () {
        $('#FighterPopup').modal('hide');
        switch (seletctedHero) {
            case "pewds":
                {
                    game = new Game(pewds);
                    pewds.setUpPerks();
                    perk1 = pewds.perk1;
                    perk2 = pewds.perk2;
                    perk3 = pewds.perk3;
                    break;
                }
            case "tyler":
                {
                    game = new Game(tyler);
                    break;
                }
            case "phil":
                {
                    game = new Game(phil);
                    break;
                }
            default:
                break;
        }
    });
    $('.perk').click(function () {
        if (game.isHeroTurn) {
            $('.perk').removeClass('border-primary');
            $(this).addClass("border-primary");
            var selectedPerk = $(this).attr("Id");
            switch (selectedPerk) {
                case "perk1":
                    {
                        game.chosenPerk = game.Char.perk1;
                    }
                case "perk2":
                    {
                        game.chosenPerk = game.Char.perk2;
                    }
                case "perk3":
                    {
                        game.chosenPerk = game.Char.perk3;
                    }
                default:
                    break;
            }
            game.isPerkChosen = true;
        }
    });
    $('.Enemy').click(function () {
        console.log("trigirred ");
        if (game.isHeroTurn) {
            if (game.isPerkChosen) {
                if (game.chosenPerk.isOneDirected) {
                }
                else {
                    game.chosenPerk.Execute(game.enemies);
                    console.log("YEAS");
                }
            }
        }
    });
});
var Game = /** @class */ (function () {
    function Game(Char) {
        this.Char = Char;
        //-------------------------------------------------------------------
        this._isHeroTurn = true;
        //------------------------------------------------------------------
        //-------------------------------------------------------------------
        this._isPerkChosen = false;
        //------------------------------------------------------------------
        this._targets = [];
        //------------------------------------------------------------------
        this.enemies = [];
        this.StartGame();
    }
    Game.prototype.StartGame = function () {
        $('#profile').find('.card-title').html(this.Char.name);
        $('#profile').find('.card-text').html(this.Char.motto);
        this.enemies.push(this.CreateEnemy());
        console.log(this.enemies[0].name);
        console.log(this.enemies[0].discription);
        $('#enemy1').find('.card-title').html(this.enemies[0].name);
        $('#enemy1').find('.card-text').html(this.enemies[0].discription);
        this.ClearEnemyCards();
    };
    Object.defineProperty(Game.prototype, "isHeroTurn", {
        get: function () { return this._isHeroTurn; },
        set: function (flag) { this._isHeroTurn = flag; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "isPerkChosen", {
        get: function () { return this._isPerkChosen; },
        set: function (flag) {
            this._isPerkChosen = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "chosenPerk", {
        get: function () { return this._chosenPerk; },
        set: function (move) {
            this._chosenPerk = move;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "targets", {
        get: function () { return this._targets; },
        set: function (t) {
            this._targets = t;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.CreateEnemy = function () {
        var enemy = new Enemy("Regular bandit", 100, 0, "Weakass bandit ");
        return enemy;
    };
    Game.prototype.NextStep = function () {
    };
    Game.prototype.ClearEnemyCards = function () {
        /*  for (let i=0; i < this.enemies.length; i++) {
              if (this.enemies[i].isAlive)
                  $('#enemy' + i).removeClass("d-none")
          }
          */
        if (this.enemies[0].isAlive)
            $('#enemy1').removeClass("d-none");
    };
    return Game;
}());
var Unit = /** @class */ (function () {
    function Unit(name, MaxHP, MaxMana) {
        this.name = name;
        this.MaxHP = MaxHP;
        this.MaxMana = MaxMana;
        this.isAlive = true;
        this.MoveSet = [];
        this._HP = MaxHP;
        this._mana = MaxMana;
    }
    Unit.prototype.Death = function () {
        console.log("DEATH...not yet implimented");
    };
    Unit.prototype.getDamage = function (amount) {
        if (this._HP - amount < 0)
            this.Death();
        else
            this._HP -= amount;
    };
    Unit.prototype.getHeal = function (amount) {
        if (this._HP + amount > this.MaxHP)
            this._HP = this.MaxHP;
        else
            this._HP = this._HP + amount;
    };
    Unit.prototype.lostMana = function (amount) {
        if (this._mana - amount < 0)
            this._mana = 0;
        else
            this._mana = this._HP - amount;
    };
    Unit.prototype.getMana = function (amount) {
        if (this._mana + amount > this.MaxMana)
            this._mana = this.MaxMana;
        else
            this._mana = this._mana + amount;
    };
    return Unit;
}());
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(name, MaxHP, MaxMana, discription) {
        var _this = _super.call(this, name, MaxHP, MaxMana) || this;
        _this.name = name;
        _this.MaxHP = MaxHP;
        _this.MaxMana = MaxMana;
        _this.discription = discription;
        return _this;
    }
    return Enemy;
}(Unit));
var SimpleBandit = /** @class */ (function (_super) {
    __extends(SimpleBandit, _super);
    function SimpleBandit(name, MaxHP, MaxMana, discription) {
        var _this = _super.call(this, name, MaxHP, MaxMana, discription) || this;
        _this.name = name;
        _this.MaxHP = MaxHP;
        _this.MaxMana = MaxMana;
        _this.discription = discription;
        _this.move1 = new Stab("simple stab", "weakass stab ", true);
        _this.move2 = new SimpleSelfHeal("simple self heal", "weakass heal ", true);
        _this.MoveSet.push(_this.move1);
        return _this;
    }
    return SimpleBandit;
}(Enemy));
var Move = /** @class */ (function () {
    function Move(percName, description, _isOneDirected) {
        this.percName = percName;
        this.description = description;
        this._isOneDirected = _isOneDirected;
    }
    Move.prototype.Execute = function (targets) {
    };
    Object.defineProperty(Move.prototype, "isOneDirected", {
        get: function () { return this._isOneDirected; },
        enumerable: false,
        configurable: true
    });
    return Move;
}());
var Stab = /** @class */ (function (_super) {
    __extends(Stab, _super);
    function Stab(percName, description, _isOneDirected) {
        var _this = _super.call(this, percName, description, _isOneDirected) || this;
        _this.percName = percName;
        _this.description = description;
        _this._isOneDirected = _isOneDirected;
        return _this;
    }
    Stab.prototype.Execute = function (targets) {
        targets[0].getDamage(20);
    };
    return Stab;
}(Move));
var SimpleSelfHeal = /** @class */ (function (_super) {
    __extends(SimpleSelfHeal, _super);
    function SimpleSelfHeal(percName, description, _isOneDirected) {
        var _this = _super.call(this, percName, description, _isOneDirected) || this;
        _this.percName = percName;
        _this.description = description;
        _this._isOneDirected = _isOneDirected;
        return _this;
    }
    SimpleSelfHeal.prototype.Execute = function (targets) {
        targets[0].getHeal(30);
    };
    return SimpleSelfHeal;
}(Move));
var TridentStike = /** @class */ (function (_super) {
    __extends(TridentStike, _super);
    function TridentStike(percName, description, _isOneDirected) {
        var _this = _super.call(this, percName, description, _isOneDirected) || this;
        _this.percName = percName;
        _this.description = description;
        _this._isOneDirected = _isOneDirected;
        return _this;
    }
    TridentStike.prototype.Execute = function (targets) {
        for (var i = 0; i < targets.length; i++) {
            targets[i].getDamage(80);
        }
    };
    TridentStike.prototype.BackLog = function () {
        console.log("Hero deals 80 damage ");
    };
    return TridentStike;
}(Move));
var SKRATTAR = /** @class */ (function (_super) {
    __extends(SKRATTAR, _super);
    function SKRATTAR(percName, description, _isOneDirected) {
        var _this = _super.call(this, percName, description, _isOneDirected) || this;
        _this.percName = percName;
        _this.description = description;
        _this._isOneDirected = _isOneDirected;
        return _this;
    }
    SKRATTAR.prototype.Execute = function (targets) {
        for (var i = 0; i < targets.length; i++) {
            targets[i].getDamage(30);
            console.log("Hero deals 80 damage " + targets[i].name);
        }
    };
    return SKRATTAR;
}(Move));
var SKIP = /** @class */ (function (_super) {
    __extends(SKIP, _super);
    function SKIP(percName, description, _isOneDirected) {
        var _this = _super.call(this, percName, description, _isOneDirected) || this;
        _this.percName = percName;
        _this.description = description;
        _this._isOneDirected = _isOneDirected;
        return _this;
    }
    SKIP.prototype.Execute = function (targets) {
        targets[0].getHeal(30);
        targets[0].getMana(30);
    };
    return SKIP;
}(Move));
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(name, MaxHP, MaxMana, selector, motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana) || this;
        _this.selector = selector;
        _this.motto = motto;
        return _this;
    }
    Object.defineProperty(Character.prototype, "perk1", {
        get: function () { return this._perk1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "perk2", {
        get: function () { return this._perk2; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "perk3", {
        get: function () { return this._perk3; },
        enumerable: false,
        configurable: true
    });
    Character.prototype.Greet = function () {
        console.log(this.motto);
        $('#Message').html(this.motto);
    };
    return Character;
}(Unit));
var Pewds = /** @class */ (function (_super) {
    __extends(Pewds, _super);
    function Pewds(name, MaxHP, MaxMana, selector, motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana, selector, motto) || this;
        _this.name = name;
        _this.selector = selector;
        _this.motto = motto;
        _this._perk1 = new TridentStike("Trident strike", "deals 80 damage to one enemy", true);
        _this._perk2 = new SKRATTAR("SKRATTAR DU!!! FLÖRAR DU!!!", "deals 30 damage to all enemies", false);
        _this._perk3 = new SKIP("Skip turn ", "Restore some HP/mana", false);
        return _this;
    }
    Pewds.prototype.setUpPerks = function () {
        $("#perk1").find('.card-title').html(this._perk1.percName);
        $("#perk1").find('.card-text').html(this._perk1.description);
        $("#perk2").find('.card-title').html(this._perk2.percName);
        $("#perk2").find('.card-text').html(this._perk2.description);
        $("#perk3").find('.card-title').html(this._perk3.percName);
        $("#perk3").find('.card-text').html(this._perk3.description);
    };
    return Pewds;
}(Character));
var Phil = /** @class */ (function (_super) {
    __extends(Phil, _super);
    function Phil(name, MaxHP, MaxMana, selector, motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana, selector, motto) || this;
        _this.name = name;
        _this.selector = selector;
        _this.motto = motto;
        return _this;
    }
    return Phil;
}(Character));
var Tyler = /** @class */ (function (_super) {
    __extends(Tyler, _super);
    function Tyler(name, MaxHP, MaxMana, selector, motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana, selector, motto) || this;
        _this.name = name;
        _this.selector = selector;
        _this.motto = motto;
        return _this;
    }
    return Tyler;
}(Character));
//# sourceMappingURL=file.js.map