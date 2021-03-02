//私訊他人
/** 
 * Provides a dialog to whisper specific players. If you have tokens selected, it will automatically default to try and whisper those players.
 * @Author: Nelson#3570
 */

let applyChanges = false;

let users = game.users.filter(user => user.active);
let checkOptions = ""
let playerTokenIds = users.map(u => u.character?.id).filter(id => id !== undefined);
let selectedPlayerIds = canvas.tokens.controlled.map(token => {
    if (playerTokenIds.includes(token.actor.id)) return token.actor.id;
});

// Build checkbox list for all active players
users.forEach(user => {
    let checked = !!user.character && selectedPlayerIds.includes(user.character.id) && 'checked';
    checkOptions += `
    <br>
    <input type="checkbox" name="${user.id}" id="${user.id}" value="${user.name}" ${checked}>\n
    <label for="${user.id}">${user.name}</label>
  `
});

new Dialog({
    title: "Whisper",
    content: `私訊對像:  ${checkOptions} <br>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea><br>擲骰格式[[1d100]]<br>`,
    buttons: {
        whisper: {
            label: "進行私訊",
            callback: (html) => createMessage(html)
        }
    }
}).render(true);

function createMessage(html) {
    var targets = [];
    console.log(html)
    // build list of selected players ids for whispers target
    for (let user of users) {
        if (html.find('[name="' + user.id + '"]')[0].checked) {
            applyChanges = true;
            targets.push(user.id);
        }
        var messageText = html.find('[name="message"]')[0].value
    }
    if (!applyChanges) return;
    ChatMessage.create({
        content: '正在向某人低語'
    });
    ChatMessage.create({
        content: messageText,
        whisper: targets
    });
}