const randomColor = () => {
    var colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

export default randomColor