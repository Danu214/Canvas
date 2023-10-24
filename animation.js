const animation = (obj) => {
    const {clear , update , render} = obj
    let pTimestamp = 0;

    const tick = (timestamp) => {
        requestAnimationFrame(tick)

        const diff = timestamp - pTimestamp;
        pTimestamp = timestamp
        const fps = 1000 / diff
        const secondPart = diff / 1000

        const params = {
            timestamp,
            pTimestamp,
            diff,
            fps,
            secondPart
        }
        update(params);
        clear();
        render(params)


    }
    requestAnimationFrame(tick)
}