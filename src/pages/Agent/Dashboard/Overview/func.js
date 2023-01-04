import { withdraw } from '../../../../state/slices/agents/dispatches';

export const hideAmount = (action, content, func) => {
    let star = '*';
    for (let i = 1; i < content.length; i++) {
        star += '*';
        func(star);
    }
    if (action === true) {
        func(star);
    } else {
        func(content);
    }
};
