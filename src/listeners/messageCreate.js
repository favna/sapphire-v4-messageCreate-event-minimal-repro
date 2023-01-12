const { Events, Listener, container } = require('@sapphire/framework');
const { ChannelType } = require('discord.js');

module.exports = class MessageCreateListener extends Listener {
	constructor(context, options) {
		super(context, { ...options, event: Events.MessageCreate, enabled: true });
	}

	onLoad() {
		container.logger.info('MessageCreate event listener is loaded.');
	}

	async run(message) {
		// this if check serves use case for my modmail bot
		if (message.channel.type !== ChannelType.DM) return;
		//
		// only listen for messages from bot owner as this is just minimal testing reproduction
		if (message.author.id !== process.env.OWNER_ID) return;

		// check if message is partial
		let msg = message;
		if (message.partial) {
			message.fetch()
			.then(fullMessage => {
				msg = fullMessage;
			})
			.catch(error => {
				console.log('Something went wrong when fetching the message: ', error);
			});
		}

		const logChannel = message.client.channels.cache.get(process.env.TEST_CHANNEL_ID);
		container.logger.info(`Testing log channel is set to: #${logChannel.name}`);
		return logChannel.send({ content: `${message.author.tag} sent a message in my DMs.` });
	}
};
