let users = game.users.filter(user => user.active && user.isGM);
var targets = [];
for (let user of users) {
    targets.push(user.id);
}
ChatMessage.create({
    content: '暗骰進行中'

});
ChatMessage.create({
    content: '[[1d100]]',
    whisper: targets
});