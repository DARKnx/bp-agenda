const formatMessage = (message: string) => {
    const parts = message.split('*'); 
    let formattedMessage = [];
  
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        formattedMessage.push(parts[i]);
      } else {
        formattedMessage.push("<strong>" + parts[i] + "</strong>");
      }
    }
    return formattedMessage.join('')
  }

export default formatMessage;