const { Listener } = require('@sapphire/framework');

class ReadyListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready'
    });
  }

  run(client) {
    const { username, id } = client.user;
    this.container.logger.info(`[READY] Successfully logged in as ${username} (${id})`);
    this.container.logger.info(`Bot owner ID is set to: ${process.env.OWNER_ID}`);
    const logChannel = client.channels.cache.get(process.env.TEST_CHANNEL_ID);
    this.container.logger.info(`Testing log channel is set to: #${logChannel?.name}`);
  }
}

module.exports = {
  ReadyListener
};
