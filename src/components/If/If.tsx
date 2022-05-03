export function If({ cond, children }) {
    if ($.isArray(children)) {
        console.warn(`"If" component can\`t render multi child`);
        return children[0];
    }
    return (cond && children) || null;
}