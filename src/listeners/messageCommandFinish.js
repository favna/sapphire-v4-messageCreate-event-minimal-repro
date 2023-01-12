const { Events, Listener, container } = require('@sapphire/framework');

module.exports = class CommandFinishedListener extends Listener {
	constructor(context, options) {
		super(context, {
			...options,
			event: Events.MessageCommandFinish,
			enabled: true,
		});
	}

	onLoad() {
		container.logger.info('MessageCommandFinish event listener is now loaded.');
	}

	async run(message, command) {
		const logChannel = message.client.channels.cache.get(process.env.TEST_CHANNEL_ID);

		const msg = `${message.author.tag} used \`e;${command.name}\` in #${message.channel.name}`;
		return logChannel.send({ content: msg });
	}
};

