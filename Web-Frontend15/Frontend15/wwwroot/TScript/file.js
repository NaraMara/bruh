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
    var character;
    var game;
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
});
var Game = /** @class */ (function () {
    function Game(Char) {
        this.Char = Char;
        this.isHeroTurn = true;
        this.Enemies = [];
        this.StartGame();
    }
    Game.prototype.StartGame = function () {
        $('#profile').find('.card-title').html(this.Char.name);
        $('#profile').find('.card-text').html(this.Char.motto);
    };
    Game.prototype.NextStep = function () {
    };
    return Game;
}());
var Unit = /** @class */ (function () {
    function Unit(name, MaxHP, MaxMana) {
        this.name = name;
        this.MaxHP = MaxHP;
        this.MaxMana = MaxMana;
        this.MoveSet = [];
        this._HP = MaxHP;
        this._mana = MaxMana;
    }
    Object.defineProperty(Unit.prototype, "hp", {
        get: function () {
            return this._HP;
        },
        set: function (n) {
            this._HP += n;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Unit.prototype, "mana", {
        get: function () {
            return this._mana;
        },
        set: function (n) {
            this._mana += n;
        },
        enumerable: false,
        configurable: true
    });
    return Unit;
}());
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(name, MaxHP, MaxMana) {
        var _this = _super.call(this, name, MaxHP, MaxMana) || this;
        _this.name = name;
        _this.MaxHP = MaxHP;
        _this.MaxMana = MaxMana;
        return _this;
    }
    return Enemy;
}(Unit));
var Move = /** @class */ (function () {
    function Move(percName, description) {
        this.percName = percName;
        this.description = description;
    }
    return Move;
}());
//Пример способности
var TridentStike = /** @class */ (function (_super) {
    __extends(TridentStike, _super);
    function TridentStike(percName, description) {
        var _this = _super.call(this, percName, description) || this;
        _this.percName = percName;
        _this.description = description;
        return _this;
    }
    TridentStike.prototype.Execute = function (targets) {
        targets.hp = -80;
    };
    return TridentStike;
}(Move));
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(name, MaxHP, MaxMana, selector, motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana) || this;
        _this.selector = selector;
        _this.motto = motto;
        return _this;
    }
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
        return _this;
    }
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