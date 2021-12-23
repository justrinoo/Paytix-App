import PushNotification from 'react-native-push-notification';

class Notifications {
  constructor() {
    PushNotification.createChannel(
      {
        channelId: 'verificationEmail',
        channelName: 'Verification Email Account',
        channelDescription: "Don't Forget to Activate your email.",
      },
      created => console.log('Create channel Returned =>', created),
    );
    PushNotification.createChannel(
      {
        channelId: 'TicketUser',
        channelName: 'Reminder Ticket!',
        channelDescription: 'You have some tickets!',
      },
      created => console.log('Create channel Returned =>', created),
    );
  }
  verificationEmailAccount(title, message) {
    PushNotification.localNotification({
      channelId: 'verificationEmail',
      title: title,
      message: message,
      largeIcon: 'ic_launcher',
    });
  }
  reminderSomeTicket(title, message) {
    PushNotification.localNotification({
      channelId: 'verificationEmail',
      title: title,
      message: message,
      largeIcon: 'ic_launcher',
    });
  }
}

export default new Notifications();
