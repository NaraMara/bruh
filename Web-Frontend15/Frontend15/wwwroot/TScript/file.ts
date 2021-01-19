$(function () {
    $('#FighterPopup').modal({
        backdrop: 'static',
        keyboard: true

    });
    let seletctedHero: string;
    let pewds: Pewds = new Pewds("Pewdiepie", 100, 100, "pewds", "Leave your memes on the reddit 19 year olds")
    let phil: Phil=new Phil("Phil Swift",100,100,"phil","I SAWED THAT BOAT IN HALF AND REAPAIRED IT ONLY WITH FLEX TAPE")
    let tyler: Tyler = new Tyler("Tyler1", 100, 100, "tyler", "IAM TYLER MOT*****G ONE")
    let game: Game;
    let perk1: Move;
    let perk2: Move;
    let perk3: Move;
    let enemy1: Enemy;
    let enemy2: Enemy;
    let enemy3: Enemy;

    $('.hero').click(function () {
        if ($("#Message,#SelectButton").hasClass("show") == false)
        {
            $("#Message,#SelectButton").addClass("show")
        }
        $('.hero').removeClass("border-primary");
        $(this).addClass("border-primary");
        seletctedHero = $(this).attr("id");
        switch (seletctedHero) {
            case "pewds":
                {
                    pewds.Greet()
                    break;
                }
            case "tyler":
                {
                    tyler.Greet()
                    break;
                }
            case "phil": 
                {
                    phil.Greet()
                    break;
                }
            default:
                break;
        }
        
    })


    $('#ConfirmCharacter').click(function () {

        $('#FighterPopup').modal('hide');
       
        switch (seletctedHero) {
            case "pewds":
                {
                     
                    game = new Game(pewds);
                    pewds.setUpPerks();
                    perk1 = pewds.perk1
                    perk2 = pewds.perk2
                    perk3 = pewds.perk3
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
            $('.perk').removeClass('border-primary')
            $(this).addClass("border-primary");
            let selectedPerk = $(this).attr("Id")
            switch (selectedPerk) {
                case "perk1":
                    {
                        game.chosenPerk = game.Char.perk1
                    }
                case "perk2":
                    {
                        game.chosenPerk = game.Char.perk2
                    }
                case "perk3":
                    {
                        game.chosenPerk = game.Char.perk3
                    }
                default:
                    break;
            }            
            game.isPerkChosen = true;

        }
    })
    $('.Enemy').click(function () {
        console.log("trigirred ")
        if (game.isHeroTurn) {

            if (game.isPerkChosen) {
                if (game.chosenPerk.isOneDirected) {

                } else {
                    game.chosenPerk.Execute(game.enemies)
                    console.log("YEAS")
                }

            }
        }

    })
 

});

    
class Game {
    constructor(public Char: Character) { this.StartGame() }
    public StartGame(): void {
        $('#profile').find('.card-title').html(this.Char.name)
        $('#profile').find('.card-text').html(this.Char.motto)
        this.enemies.push(this.CreateEnemy())
        console.log(this.enemies[0].name)
        console.log(this.enemies[0].discription)
        $('#enemy1').find('.card-title').html(this.enemies[0].name)
        $('#enemy1').find('.card-text').html(this.enemies[0].discription) 
        this.ClearEnemyCards();
    }
    //-------------------------------------------------------------------
    private _isHeroTurn: boolean = true;
    public get isHeroTurn():boolean { return this._isHeroTurn }
    public set isHeroTurn(flag:boolean) {this._isHeroTurn=flag}
    //------------------------------------------------------------------
    
    //-------------------------------------------------------------------
    private _isPerkChosen: boolean = false;
    public set isPerkChosen(flag: boolean) {
        this._isPerkChosen = flag;
    }
    public get isPerkChosen(): boolean { return this._isPerkChosen }
    //------------------------------------------------------------------
    private _chosenPerk: Move;
    public set chosenPerk(move: Move) {
        this._chosenPerk = move;
    }
    public get chosenPerk(): Move {return this._chosenPerk}
    //------------------------------------------------------------------
    private _targets: Enemy[] = [];
    public set targets(t: Enemy[]) {
        this._targets = t;
    }
    public get targets(): Enemy[] { return this._targets }
    //------------------------------------------------------------------
    public enemies: Enemy[] = [];
    private CreateEnemy(): Enemy {
        let enemy = new Enemy("Regular bandit", 100, 0,"Weakass bandit ")
        return enemy
    }
    public NextStep(): void {

         
    }
    public ClearEnemyCards(): void   {
      /*  for (let i=0; i < this.enemies.length; i++) {
            if (this.enemies[i].isAlive)
                $('#enemy' + i).removeClass("d-none")
        }
        */
        if (this.enemies[0].isAlive)
            $('#enemy1').removeClass("d-none")
         
    }
}
class Unit {
    constructor(public name: string, protected MaxHP: number, protected MaxMana: number) {
        this._HP = MaxHP;
        this._mana = MaxMana;
    }

    public isAlive=true;
    public MoveSet: Move[] = [];
    protected _HP: number;
    protected _mana: number;

    public Death(): void {
        console.log("DEATH...not yet implimented")
    }
    public getDamage(amount:number): void {        
        if (this._HP - amount < 0)
            this.Death()
        else this._HP -= amount;
    }
    public getHeal(amount: number): void {
        if (this._HP + amount > this.MaxHP)
            this._HP = this.MaxHP;
        else this._HP = this._HP + amount;
    }
    public lostMana(amount: number): void {
        if (this._mana - amount < 0)
            this._mana = 0;
        else this._mana= this._HP - amount;
    }
    public getMana(amount: number): void {
        if (this._mana + amount > this.MaxMana)
            this._mana = this.MaxMana;
        else this._mana = this._mana + amount;
    }
    

}
class Enemy extends Unit {
    constructor(public name: string, protected MaxHP: number, protected MaxMana: number, public discription : string ) {

        super(name, MaxHP, MaxMana);

    }
     
}
class SimpleBandit extends Enemy{
    public move1: Stab = new Stab("simple stab", "weakass stab ", true);
    public move2: SimpleSelfHeal = new SimpleSelfHeal("simple self heal", "weakass heal ", true);
    constructor(public name: string, protected MaxHP: number, protected MaxMana: number, public discription: string) {
        super(name, MaxHP, MaxMana,discription)

        this.MoveSet.push(this.move1);
    }

}

class Move {
    constructor(public percName: string, public description: string, protected readonly _isOneDirected: boolean) { }
    public Execute(targets: Unit[]): void {
         
    }

    public get isOneDirected(): boolean { return this._isOneDirected } 
}
class Stab extends Move {
    constructor(public percName: string, public description: string, protected readonly _isOneDirected: boolean) {
        super(percName, description, _isOneDirected);
    }
    public Execute(targets: Unit[]): void {
        targets[0].getDamage(20);
    }


}
class SimpleSelfHeal extends Move {
    constructor(public percName: string, public description: string, protected readonly _isOneDirected: boolean) {
        super(percName, description, _isOneDirected);
    }
    public Execute(targets: Unit[]): void {
        targets[0].getHeal(30);
    }
}
 
class TridentStike extends Move {
    constructor(public percName: string, public description: string, protected readonly _isOneDirected: boolean) {
        super(percName, description, _isOneDirected);
    }
    public Execute(targets: Unit[]): void {
        for (let i = 0; i < targets.length; i++) {
            targets[i].getDamage(80);
        }
    }
    public BackLog() {
        
        console.log("Hero deals 80 damage ")
    }
    
}
class SKRATTAR extends Move {
    constructor(public percName: string, public description: string, protected readonly _isOneDirected: boolean) {
        super(percName, description, _isOneDirected);
    }
    public Execute(targets: Unit[]): void {
        for (let i = 0; i < targets.length; i++) {
            targets[i].getDamage(30);
            console.log("Hero deals 80 damage " + targets[i].name)
        }
    }
     

}
class SKIP extends Move {
    constructor(public percName: string, public description: string, protected readonly _isOneDirected: boolean) {
        super(percName, description, _isOneDirected);
    }
    public Execute(targets: Unit[]): void {
        targets[0].getHeal(30);
        targets[0].getMana(30);
    }


}
class Character extends Unit {

    protected game: Game

    protected _perk1: Move;
    protected _perk2: Move;
    protected _perk3: Move;
    public get perk1(): Move { return this._perk1 }
    public get perk2(): Move { return this._perk2 } 
    public get perk3(): Move { return this._perk3 } 

    constructor(name: string, MaxHP: number, MaxMana: number, protected selector: string, public motto: string) {
        super(name, MaxHP, MaxMana);
   
    }
    public Greet(): void {
        console.log(this.motto)
        $('#Message').html(this.motto)
    }
}
class Pewds extends Character {
    
    
    constructor(public name: string, MaxHP: number, MaxMana: number, protected selector: string, public motto: string) {
        super(name, MaxHP, MaxMana, selector, motto);
        this._perk1 = new TridentStike("Trident strike", "deals 80 damage to one enemy", true)
        this._perk2 = new SKRATTAR("SKRATTAR DU!!! FLÖRAR DU!!!", "deals 30 damage to all enemies", false)
        this._perk3 = new SKIP("Skip turn ", "Restore some HP/mana", false)
        
    }

    public setUpPerks(): void {

        $("#perk1").find('.card-title').html(this._perk1.percName)
        $("#perk1").find('.card-text').html(this._perk1.description)
         
        $("#perk2").find('.card-title').html(this._perk2.percName)
        $("#perk2").find('.card-text').html(this._perk2.description)

        $("#perk3").find('.card-title').html(this._perk3.percName)
        $("#perk3").find('.card-text').html(this._perk3.description)

    }
    
}
class Phil extends Character {
    constructor(public name: string, MaxHP: number, MaxMana: number, protected selector: string, public motto: string) {
        super(name, MaxHP, MaxMana, selector, motto);
    }
    
}
class Tyler extends Character {
    constructor(public name: string, MaxHP: number, MaxMana: number, protected selector: string, public motto: string) {
        super(name, MaxHP, MaxMana, selector, motto);
    }
   
}
 
