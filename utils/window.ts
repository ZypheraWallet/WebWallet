export function openPopupCentered(
    url: string,
    title: string,
    w: number,
    h: number
): Window | null {
    const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        screen.width;

    const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        screen.height;

    const left = dualScreenLeft + (width - w) / 2;
    const top = dualScreenTop + (height - h) / 2;

    const newWindow = window.open(
        url,
        title,
        `width=${w},height=${h},top=${top},left=${left}`
    );

    if (newWindow) {
        newWindow.focus();
    }

    return newWindow;
}
