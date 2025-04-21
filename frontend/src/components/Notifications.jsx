export async function askNotificationPermission() {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications');
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission status:', permission);
      if (permission !== 'granted') {
        console.warn('Notification permission not granted');
      }
    } catch (err) {
      console.error('Error requesting notification permission', err);
    }
  }
  
  /**
   * Display a notification immediately
   */
  export function showNotification(title, body) {
    console.log('Triggering notification:', title);
    if (Notification.permission !== 'granted') {
      console.warn('Cannot show notification: permission not granted');
      return;
    }
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg) {
          reg.showNotification(title, { body, icon: '/favicon.ico' });
        } else {
          new Notification(title, { body, icon: '/favicon.ico' });
        }
      });
    } else {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  }
  
  /**
   * Schedule a local notification at a specific timestamp
   */
  export function scheduleLocalNotification(title, body, timestamp) {
    const delay = timestamp - Date.now();
    console.log(`Scheduling notification '${title}' in ${delay}ms`);
    if (Notification.permission !== 'granted') {
      console.warn('Cannot schedule notification: permission not granted');
      return;
    }
    if (delay <= 0) {
      console.warn('Timestamp is in the past; showing notification now');
      return showNotification(title, body);
    }
    if (delay > 2_147_483_647) {
      console.warn('Delay too long to schedule with setTimeout');
      return;
    }
    setTimeout(() => {
      showNotification(title, body);
    }, delay);
  }
  