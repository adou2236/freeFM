export default {
    formatTime(time) {
        var intime = time.toFixed(0)
        var min = Math.floor(intime/60);
        var sec = intime%60;
        if(sec<10)
            sec='0'+sec;
        return min + ":" + sec
    }
}
