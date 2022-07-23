import {message} from 'antd';
export function notifyUser(messageText,type) {
	message[type]({
		//message: type.charAt(0).toUpperCase() + type.slice(1),
		content:
		messageText
	  });
}

