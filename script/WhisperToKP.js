let users = game.users.filter(user => user.active && user.isGM);
new Dialog({
    title: "Whisper",
    content: `<label for="message">信息:</label>
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
    // build list of selected players ids for whispers target
    for (let user of users) {
        targets.push(user.id);
        var messageText = html.find('[name="message"]')[0].value
    }

    ChatMessage.create({
        content: '正在向KP低語'
    });

    ChatMessage.create({
        content: messageText,
        whisper: targets
    });
}