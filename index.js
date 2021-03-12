//let diyMacro = new Macro.create({name:"XX"});
Macro.create({
    name: 'XXX',
    command: "some Thing",
    img: "icons/svg/dice-target.svg",
    permission: {
        default: 3
    },
    scope: "global",
    sort: 100001,
    type: "script"
})
//game.user.assignHotbarMacro(diyMacro, 4);
let a = game.macros.filter((m) => true);
//a.name='23'
console.log('game.macros AAAAAAAA', game.macros.filter((m) => true))
//game.user.assignHotbarMacro(diyMacro, 4);