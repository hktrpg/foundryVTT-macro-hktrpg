//let diyMacro = new Macro.create({name:"XX"});

function createMacro(data) {
    Macro.create({
        name: data.name,
        command: data.command,
        img: "icons/svg/dice-target.svg",
        permission: {
            default: 3
        },
        scope: "global",
        sort: 100001,
        type: "script"
    })
}
//彈出選項讓人選擇滙入那個
//game.user.assignHotbarMacro(diyMacro, 4);
let a = game.macros.filter((m) => true);
//a.name='23'
console.log('game.macros AAAAAAAA', game.macros.filter((m) => true))
//game.user.assignHotbarMacro(diyMacro, 4);