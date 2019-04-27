const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
var prefix = "?";
 
client.login('NTcxNzQ4ODM1MTk0MzA2NTYw.XMS3_g.vKFofBMoAtZTrYGP3gN0hDlWKiQ');
 
client.on('ready', () => {
    client.user.setGame("?help | Menu d'aide :trackball: ");
    console.log("Je suis prêt !!!");
});

client.on('message', message => {
    if (message.content === "ping"){
        message.repky("pong");
        console.log("ping pong");
    }

    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#D9F200')
            .addField(":white_check_mark:   Commandes du Bot de la Include Network")
            .addField(":loudspeaker:  Général !", " Toutes les commandes Global pour les joueurs ! .")
            .addField(" serveur : Pour savoir tout sur le serveur .")
            .addField(" staff : Pour connaitre au mieux notre équipe ! .")
            .addField(":tools:  Modération !", " Toutes les commandes Adminsitrative ! .")
            .addField("?ban : Permet de ban des membres ")
            .addField("?kick : Permet de kick des membres ")
            .addField("?mute : Permet de mute des membres ")
            .addField("?unmute : Permet de démute des membres ")
            .addField("?warn : Permet de warn des membres ")
            .addField("?unwarn : Permet de unwarn des membres ")
            .setFooter("Bot dédié à la Include | By Alfred :zap: ")
        message.channel.sendEmbed(help_embed)
        //message.channel.sendMessage("Voici , les commandes du bot , elle sont très utiles . :\n ?help , pour avoir toutes les commandes ");
        console.log("Commande Help demandée");
    }
});

client.on('message', message =>{
    if(message.content === "serveur"){
        message.reply(':heart: **__Notre serveur__** , se base sur un DarkRP beaucoup plus poussé , il relève du Sérious RP et a pour but de vous faire redécouvrir un vrai RP . Si vous avez des questions ou des suggestions le concernant faites le nous savoir . `Bien cordialement , Include Network`');
        console.log('répond');
    }
});

client.on('message', message =>{
    if(message.content === "staff"){
            message.reply(':heart: **__Notre Equipe** , elle se compose de __Alfred__ = **Fondateur du Network** , __Twinky ( Léna )__ = **Fondatrice Network** , __Carrédas__ = **Fondateur Network** , __Flykill__ = **Responsable Serveur | SantosRP** , toute cette petite équipe est là pour vous , merci de nous demandez en cas de besoin mineure ou même gros problème majeure . `Bien cordialement , Include Network`');
            console.log('répond');
    }
});

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('556834682902151198').send(embed)
    member.addRole('556833759131861028')
 
});
 
client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('556834682902151198').send(embed)
 
});

/*Kick*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return messaSge.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été exclu du Network , merci à lui pour sont passage. :white_check_mark:')
    }
});

/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :crown:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a été banni du Network , merci à lui pour sont passage. :white_check_mark:')
    }
});

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})
client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    //unmute
    if(args[0].toLowerCase() === prefix + "unmute"){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let member = message.mentions.members.first()
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
        if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unmute ce membre.")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
        message.channel.send(member + ' a été unmute :white_check_mark:')
    }
})
