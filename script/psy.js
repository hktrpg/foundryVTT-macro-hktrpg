let applyChanges = false;
let GM = game.users.filter(user => user.active && user.isGM);
let users = []
game.actors.forEach(user => user.items.forEach(a => {
    if (a.name == "交際 (心理學)") {
        users.push(user)
    }
}));
let checkOptions = ""
let selectedPlayerIds = canvas.tokens.controlled.map(token => {
    return token.actor.id;
});
// Build checkbox list for all active players
users.forEach(user => {
    let checked = selectedPlayerIds.includes(user.id) && 'checked';
    checkOptions += `
    <br>
    <input type="checkbox" name="${user.id}" id="${user.id}" value="${user.name}" ${checked}>\n
    <label for="${user.id}">${user.name}</label>
  `
});

new Dialog({
    title: "心理學",
    content: `心理學使用者:  ${checkOptions} <br>
   `,
    buttons: {
        whisper: {
            label: "進行心理學",
            callback: (html) => createMessage(html)
        }
    }
}).render(true);

function createMessage(html) {
    var targets = [];
    var messageText = '進行心理學暗骰<hr>'
    // build list of selected players ids for whispers target
    for (let user of users) {
        if (html.find('[name="' + user.id + '"]')[0].checked) {
            user.items.forEach(a => {
                if (a.name == "交際 (心理學)") {
                    applyChanges = true;
                    let roll = new Roll("1d100").roll().total
                    if (roll <= a.base) //stuff
                        messageText += user.name + ' <span style="outline: 2px double  blue;">成功</span><br>' + '目標值:  <span style="outline: 1px solid  black;">' + a.base + '</span> vs 結果:  <span style="outline: 1px solid  black;">' + roll + '</span><br>' + '<hr>';
                    else {
                        messageText += user.name + ' <span style="outline:  2px double  red;">失敗</span><br>' + '目標值: <span style="outline: 1px solid  black;">' + a.base + '</span> vs 結果:  <span style="outline: 1px solid  red;">' + roll + '</span><br>' + '<hr>';
                    }
                }
            })
        }
    }
    if (!applyChanges) return;
    ChatMessage.create({
        content: '正在心理學暗骰'
    });
    ChatMessage.create({
        content: messageText,
        whisper: GM
    });
}