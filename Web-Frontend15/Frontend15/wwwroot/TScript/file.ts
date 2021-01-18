$(function () {
    $('#FighterPopup').modal({
        backdrop: 'static',
        keyboard: true

    });
    let seletctedHero: string;
    let pewds: Pewds = new Pewds("Pewdiepie", 100, 100, "pewds", "Leave your memes on the reddit 19 year olds")
    let phil: Phil=new Phil("Phil Swift",100,100,"phil","I SAWED THAT BOAT IN HALF AND REAPAIRED IT ONLY WITH FLEX TAPE")
    let tyler: Tyler = new Tyler("Tyler1", 100, 100, "tyler", "IAM TYLER MOT*****G ONE")
    let character: Character;
    let game: Game;
   

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

    
class Game {
    constructor(public Char: Character) { this.StartGame() }
    public StartGame(): void {
        $('#profile').find('.card-title').html(this.Char.name)
        $('#profile').find('.card-text').html(this.Char.motto)

    }
    public isHeroTurn: boolean = true;
    public Enemies: Unit[] = [];
    public NextStep(): void {
         
    }
    
}
class Unit {
    constructor(public name: string, protected MaxHP: number, protected MaxMana: number) {
        this._HP = MaxHP;
        this._mana = MaxMana;
    }

    public isAlive:boolean;
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
        if (this._mana + amount > this.MaxMana)
            this._mana = this.MaxHP;
        else this._mana= this._HP + amount;
    }
    //public get hp(): number {
    //    return this._HP;
    //}
    //public set hp(n: number) {
    //    this._HP += n;
    //}
    //public get mana(): number {
    //    return this._mana;
    //}
    //public set mana(n: number) {
    //    this._mana += n;
    //}

}
class Enemy extends Unit {
    constructor(public name: string, protected MaxHP: number, protected MaxMana: number) {

        super(name, MaxHP, MaxMana);
    }
}
class Move {
    constructor(public percName: string, protected description:string ) { }
    
}
//Пример способности
class TridentStike  extends Move {
    constructor(public percName: string, protected description: string) {
        super(percName, description);
    }
    public Execute(targets: Unit): void {
        targets.hp=-80
    }
}
class Character extends Unit {
    
    
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
 
